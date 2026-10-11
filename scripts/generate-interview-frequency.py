#!/usr/bin/env python3
"""Generate M1 sample frequencies from manually reviewed interview evidence."""
import argparse
import collections
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = ROOT / "plans/audits/java-campus/frequency"
INVENTORY = ROOT / "plans/knowledge-tree/m1-knowledge-points.md"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    inventory = INVENTORY.read_text()
    points = {}
    for line in inventory.splitlines():
        match = re.match(r"\| `([^`]+)` \| (.*?) \|", line)
        if match:
            assert match[1] not in points, f"Duplicate point: {match[1]}"
            points[match[1]] = match[2].split("<br/>")[0]
    assert len(points) == 287, f"Review inventory size change: {len(points)}"
    reviews = json.loads((BASE / "source-reviews.json").read_text())
    sources = {k: v for k, v in reviews.items() if v["status"] == "included"}
    assert 100 <= len(sources) <= 200
    assert len({s["url"] for s in sources.values()}) == len(sources)
    assert len({s["bodySha256"] for s in sources.values()}) == len(sources)
    source_ids = {k: f"F{i:03}" for i, k in enumerate(sources, 1)}
    groups = {s["authorCompanyGroup"] for s in sources.values()}
    strata = collections.Counter(s["recruitmentType"] for s in sources.values())
    for key, source in sources.items():
        assert source["url"].startswith("https://www.nowcoder.com/")
        assert "2024-01-01" <= source["displayDate"] <= "2026-10-05", key
        assert source["recruitmentType"] in {"校招", "实习", "未注明"}
        hits = [hit["pointId"] for hit in source["hits"]]
        assert len(set(hits)) == len(hits), key
        assert set(hits) <= points.keys(), (key, set(hits) - points.keys())
        assert all(hit["evidence"].strip() for hit in source["hits"])
    records = []
    for point_id in points:
        matched = [k for k, s in sources.items() if any(h["pointId"] == point_id for h in s["hits"])]
        matched_groups = {sources[k]["authorCompanyGroup"] for k in matched}
        records.append({
            "pointId": point_id,
            "count": len(matched), "denominator": len(sources),
            "percent": round(100 * len(matched) / len(sources), 1),
            "authorCompanyCount": len(matched_groups),
            "authorCompanyDenominator": len(groups),
            "byRecruitmentType": {
                kind: {"count": sum(sources[k]["recruitmentType"] == kind for k in matched), "denominator": total}
                for kind, total in strata.items()
            },
            "sourceKeys": matched,
        })
    data = {
        "asOf": "2026-10-05", "unit": "article", "sampleSize": len(sources),
        "authorCompanyGroups": len(groups), "recruitmentTypes": dict(strata),
        "pointCount": len(points), "points": records,
    }
    report = [
        "# M1 考点样本出现率", "",
        f"逐篇人工映射，分母为 {len(sources)} 篇；同篇同考点只计一次。含 {len(groups)} 个作者×公司组。口径及限制见[统计说明](./README.md)。本表由生成脚本维护。", "",
        "作者×公司列合并同一账号在同一公司的多篇复盘，仅用于观察多轮发帖的影响，不能当作独立面试流程数。", "",
        "| 考点 | 出现篇数／样本数 | 样本出现率 | 作者×公司 | 来源 |",
        "| --- | ---: | ---: | ---: | --- |",
    ]
    for p in records:
        refs = "、".join(f"[{source_ids[k]}](./sources.md#{source_ids[k].lower()})" for k in p["sourceKeys"]) or "未观察到"
        report.append(f'| <a id="{p["pointId"]}"></a>`{p["pointId"]}`<br/>{points[p["pointId"]]} | {p["count"]}/{p["denominator"]} | {p["percent"]:.1f}% | {p["authorCompanyCount"]}/{len(groups)} | {refs} |')
    ledger = [
        "# 面经样本与逐题依据", "",
        "来源均为公开用户复盘，未经公司认证。显示日期可能是发布或编辑日期，不自动等于面试日期。以下只保留问题释义，不把候选人的回答当作技术事实。", "",
        "未披露具体题目的复盘仍计入分母；命中为零表示无法映射本清单，不能推断没有考技术。未纳入页面及原因见[source-reviews.json](./source-reviews.json)。", "",
    ]
    for key, source in sources.items():
        sid = source_ids[key]
        title = source["title"].replace("[", "（").replace("]", "）")
        ledger.extend([
            f'<a id="{sid.lower()}"></a>', "", f"## {sid} · {source['company']}", "",
            f"[{title}]({source['url']}) · {source['recruitmentType']} · 页面显示 {source['displayDate']}", "",
            source["notes"], "",
        ])
        if source["hits"]:
            ledger.extend(f'- `{h["pointId"]}`：{h["evidence"]}。' for h in source["hits"])
        else:
            ledger.append("没有足够明确、可映射至当前考点的问题。")
        ledger.append("")
    by_id = {p["pointId"]: p for p in records}
    lines = []
    for line in inventory.splitlines():
        if line.startswith("| 知识点 ID |"):
            line = line.split(" 样本出现率 |")[0].rstrip()
            if not line.endswith("|"):
                line += " |"
            line += " 样本出现率 |"
        elif line.startswith("| --- | --- | --- | --- | --- |"):
            line = "| --- | --- | --- | --- | --- | --- |"
        else:
            match = re.match(r"\| `([^`]+)`", line)
            if match:
                p = by_id[match[1]]
                cells = line.split(" | ")[:5]
                # The fifth cell has the trailing pipe only before a frequency column is added.
                prefix = " | ".join(cells).rstrip().removesuffix(" |").rstrip()
                line = prefix + f' | [{p["count"]}/{p["denominator"]}（{p["percent"]:.1f}%）](../audits/java-campus/frequency/point-frequency.md#{p["pointId"]}) |'
        lines.append(line)
    outputs = {
        BASE / "point-frequency.json": json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        BASE / "point-frequency.md": "\n".join(report) + "\n",
        BASE / "sources.md": "\n".join(ledger),
        INVENTORY: "\n".join(lines) + "\n",
    }
    for path, content in outputs.items():
        if args.check:
            assert path.exists() and path.read_text() == content, f"Regenerate: {path.relative_to(ROOT)}"
        else:
            path.write_text(content)
    print(f"Validated {len(sources)} sources, {len(groups)} author-company groups, {len(points)} points; {sum(p['count'] > 0 for p in records)} nonzero.")


if __name__ == "__main__":
    main()
