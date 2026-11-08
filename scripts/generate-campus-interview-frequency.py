#!/usr/bin/env python3
"""Validate and aggregate manually reviewed campus interview records.

This checks bookkeeping, not whether a human correctly read a post or interpreted
a question. A successful check never certifies source authenticity or articles.
"""

import argparse
import collections
import hashlib
import json
import pathlib
import urllib.parse

ROLES = ("frontend", "mobile", "testing", "go")
LABELS = {"frontend": "前端", "mobile": "移动端", "testing": "测试开发", "go": "Go 后端"}


def canonical(url):
    parsed = urllib.parse.urlsplit(url)
    host = parsed.netloc.lower()
    query = parsed.query
    if host in {"api-cdn.nowcoder.com", "m.nowcoder.com", "nowcoder.com"}:
        host = "www.nowcoder.com"
    if host == "www.nowcoder.com":
        query = ""
    return urllib.parse.urlunsplit(("https", host, parsed.path.rstrip("/"), query, ""))


def escape(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


def read_role(role, research_dir):
    folder = research_dir / role
    source_bytes = (folder / "source-reviews.json").read_bytes()
    taxonomy_bytes = (folder / "taxonomy.json").read_bytes()
    sources = json.loads(source_bytes)
    taxonomy = json.loads(taxonomy_bytes)
    points = {point["id"]: point for point in taxonomy}
    assert len(points) == len(taxonomy), f"{role}: duplicate point ID"
    assert sources, f"{role}: empty source review set"
    for point in taxonomy:
        assert point["label"] and point["scope"], f"{role}: point without label/scope"
        assert point.get("articlePath") is None or point["articlePath"].startswith("docs/"), point["id"]
    for key, source in sources.items():
        assert source["status"] in {"included", "supplemental", "excluded", "pending"}, key
        assert source["url"].startswith("https://") and source["title"] and source["reason"], key
        if source["status"] == "included":
            assert source["recruitmentType"] in {"校招", "实习", "校招及实习"}, f"{role}/{key}: unknown recruitment"
            for field in ("recruitmentEvidence", "roleEvidence", "bodyReview", "reviewedAt", "authorCompanyGroup"):
                assert source.get(field), f"{role}/{key}: missing {field}"
            assert not source.get("duplicateOf"), f"{role}/{key}: included duplicate"
        for question in source.get("questions", []):
            assert question["summary"] and question["locator"], f"{role}/{key}: empty evidence"
            assert set(question["pointIds"]) <= points.keys(), (role, key, set(question["pointIds"]) - points.keys())
            assert len(question["pointIds"]) == len(set(question["pointIds"])), (role, key, "duplicate question point")
    return sources, taxonomy, hashlib.sha256(source_bytes + b"\n" + taxonomy_bytes).hexdigest()


def aggregate(role, sources, taxonomy, fingerprint):
    included = {key: source for key, source in sources.items() if source["status"] == "included"}
    hit_sets = {key: {point for q in source.get("questions", []) for point in q["pointIds"]} for key, source in included.items()}
    strata = {"招聘类别": {}, "子方向": {}}
    for key, source in included.items():
        strata["招聘类别"].setdefault(source["recruitmentType"], []).append(key)
        for track in sorted(set(source.get("subtracks", []))):
            strata["子方向"].setdefault(track, []).append(key)
    rows = []
    for point in taxonomy:
        hits = [key for key, values in hit_sets.items() if point["id"] in values]
        rows.append({
            **point,
            "count": len(hits),
            "denominator": len(included),
            "sourceIds": hits,
            "authorCompanyGroups": sorted({included[key]["authorCompanyGroup"] for key in hits}),
            "strata": {dimension: {label: {"count": sum(key in hits for key in keys), "denominator": len(keys)} for label, keys in values.items()} for dimension, values in strata.items()},
        })
    result = {
        "role": role, "target": 100, "included": len(included),
        "statusCounts": dict(collections.Counter(s["status"] for s in sources.values())),
        "inputSha256": fingerprint, "strata": strata,
        "unmappedQuestions": [{"sourceId": key, "summary": q["summary"], "locator": q["locator"]} for key, source in included.items() for q in source.get("questions", []) if not q["pointIds"]],
        "points": rows,
    }
    state = "采样未完成，暂不作最终常见考点结论" if len(included) < 100 else "数量达到目标，仍须人工审核来源、去重与映射"
    lines = [f"# {LABELS[role]}面经考点出现记录", "", f"当前纳入 **{len(included)}/100** 篇；{state}。", "", "按一篇复盘计数，同篇同考点最多一次。比例仅描述本批便利样本；零命中不代表不考，不能据此推断市场概率。", "", f"输入指纹：`{fingerprint}`。生成脚本只校验结构并聚合人工标注，不自动判定提问内容。", "", "| 考点 | 命中／分母 | 样本出现率 | 来源 |", "| --- | ---: | ---: | --- |"]
    for row in sorted(rows, key=lambda r: (-r["count"], r["id"])):
        ratio = f"{100 * row['count'] / len(included):.1f}%" if included else "—"
        links = "、".join(f"[{key}](./sources.md#{key})" for key in row["sourceIds"]) or "—"
        lines.append(f"| {escape(row['label'])} | {row['count']}/{len(included)} | {ratio} | {links} |")
    lines += ["", "分招聘类别、子方向及作者与公司组的结果见 `point-frequency.json`；一篇可有多个子方向，各分母不能相加。宽泛问题与尚未映射的问题在 JSON 中保留，不能自动扩成未披露的追问。", ""]
    source_lines = [f"# {LABELS[role]}面经来源与问题依据", "", "这里只保存短释义、定位与原帖链接。文章状态由人工阅读记录决定；公司仅表示公开复盘中的自述，不是企业固定题库。", ""]
    for key, source in sources.items():
        source_lines += [f"## {key}", "", f"[{escape(source['title'])}]({source['url']})", "", f"状态：{source['status']}。{source['reason']}", "", f"招聘类别：{source.get('recruitmentType', '未注明')}；子方向：{'、'.join(source.get('subtracks', [])) or '未注明'}。", ""]
        for question in source.get("questions", []):
            point_ids = "、".join(question["pointIds"]) or "未映射，保留原始问题边界"
            source_lines.append(f"- {question['summary']}（定位：{question['locator']}；{point_ids}）")
        source_lines.append("")
    return {"point-frequency.json": json.dumps(result, ensure_ascii=False, indent=2) + "\n", "point-frequency.md": "\n".join(lines), "sources.md": "\n".join(source_lines)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--research-dir", type=pathlib.Path, required=True,
                        help="Directory containing the private per-role source records and taxonomies")
    parser.add_argument("--role", choices=ROLES, action="append")
    parser.add_argument("--check", action="store_true", help="Validate without rewriting generated files")
    parser.add_argument("--require-complete", action="store_true", help="Require 100 included sources per selected role; does not certify editorial completion")
    args = parser.parse_args()
    research_dir = args.research_dir.expanduser().resolve()
    if not research_dir.is_dir():
        parser.error(f"Research directory does not exist: {research_dir}")
    roles = args.role or ROLES
    datasets = {role: read_role(role, research_dir) for role in roles}
    seen_urls, seen_hashes = {}, {}
    for role, (sources, _, _) in datasets.items():
        for key, source in sources.items():
            if source["status"] != "included":
                continue
            identity = (role, key)
            url = canonical(source["url"])
            assert url not in seen_urls, f"Repeated main URL: {seen_urls.get(url)} and {identity}"
            seen_urls[url] = identity
            body_hash = source.get("bodySha256")
            if body_hash:
                assert body_hash not in seen_hashes, f"Repeated main body: {seen_hashes.get(body_hash)} and {identity}"
                seen_hashes[body_hash] = identity
    for role, (sources, taxonomy, fingerprint) in datasets.items():
        count = sum(source["status"] == "included" for source in sources.values())
        if args.require_complete:
            assert count >= 100, f"{role}: {count}/100, research incomplete"
        for filename, content in aggregate(role, sources, taxonomy, fingerprint).items():
            path = research_dir / role / filename
            if args.check:
                assert path.exists() and path.read_text() == content, f"Stale generated file: {path}"
            else:
                path.write_text(content)
        print(f"{role}: {count}/100 included; structural aggregation {'checked' if args.check else 'generated'}")


if __name__ == "__main__":
    main()
