#!/usr/bin/env python3
"""Aggregate manually reviewed interview evidence; never infer hits from keywords."""

import argparse
from collections import Counter, defaultdict
import hashlib
import json
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "plans/audits/agentic-development/frequency"


def load(name):
    return json.loads((DATA / name).read_text())


def validate(sources, taxonomy):
    ids = {s["id"] for s in sources}
    point_ids = {p["id"] for p in taxonomy}
    assert len(ids) == len(sources), "Duplicate source IDs"
    assert len(point_ids) == len(taxonomy), "Duplicate point IDs"
    urls = set()
    hashes = set()
    for source in sources:
        assert source["status"] in {"primary", "secondary", "excluded", "duplicate", "partial", "unreadable", "reference"}
        assert source["track"] in {"agent", "coding", "mixed", "none"}
        assert source["language"] in {"zh", "en"}
        assert urlparse(source["url"]).scheme in {"http", "https"}
        if source["status"] == "duplicate":
            assert source["duplicateOf"] in ids
            assert source["duplicateOf"] != source["id"]
        if source["status"] != "primary":
            assert not source["evidence"], source["id"]
        else:
            assert source["track"] != "none"
            assert source["url"] not in urls, source["id"]
            urls.add(source["url"])
            if source.get("bodySha256"):
                assert source["bodySha256"] not in hashes, source["id"]
                hashes.add(source["bodySha256"])
        evidence_ids = [e["pointId"] for e in source["evidence"]]
        assert len(evidence_ids) == len(set(evidence_ids)), source["id"]
        for evidence in source["evidence"]:
            assert evidence["pointId"] in point_ids, evidence
            assert evidence["paraphrase"].strip(), source["id"]


def aggregate(sources, taxonomy):
    primary = [s for s in sources if s["status"] == "primary"]
    coding = [s for s in primary if s["track"] in {"coding", "mixed"}]
    agent = [s for s in primary if s["track"] in {"agent", "mixed"}]
    cohorts = {
        "all": primary, "coding": coding, "agent": agent,
        "coding-practical": [s for s in coding if s["codingMode"] == "practical"],
        **{f"{name}-{lang}": [s for s in group if s["language"] == lang]
           for name, group in (("coding", coding), ("agent", agent)) for lang in ("zh", "en")},
    }
    result = {"statusCounts": dict(Counter(s["status"] for s in sources)),
              "primaryLanguages": dict(Counter(s["language"] for s in primary)),
              "primaryPlatforms": dict(Counter(s["platform"] for s in primary)),
              "primaryTracks": dict(Counter(s["track"] for s in primary)),
              "primaryWithoutPointHits": sum(not s["evidence"] for s in primary),
              "cohorts": {}}
    for name, group in cohorts.items():
        # A missing author is kept as an unresolved source, not merged with all anonymous posts.
        author_groups = {s["authorKey"] or s["id"] for s in group}
        rows = []
        for point in taxonomy:
            hits = [s for s in group if any(e["pointId"] == point["id"] for e in s["evidence"])]
            hit_groups = {s["authorKey"] or s["id"] for s in hits}
            rows.append({**point, "count": len(hits), "rate": round(len(hits)/len(group), 6) if group else 0,
                         "sourceIds": [s["id"] for s in hits], "authorGroupCount": len(hit_groups),
                         "authorGroupRate": round(len(hit_groups)/len(author_groups), 6) if author_groups else 0})
        result["cohorts"][name] = {"denominator": len(group), "sourceIds": [s["id"] for s in group],
                                   "authorGroupDenominator": len(author_groups),
                                   "unknownAuthorSources": sum(not s["authorKey"] for s in group),
                                   "points": sorted(rows, key=lambda r: (-r["count"], r["id"]))}
    result["inputSha256"] = {name: hashlib.sha256((DATA/name).read_bytes()).hexdigest()
                              for name in ("source-reviews.json", "taxonomy.json", "search-manifest.json")}
    return result


def cell(value):
    return str(value).replace("|", "／").replace("\n", " ")


def source_link(sid):
    return f"[{sid}](./sources.md#{sid.lower()})"


def frequency_markdown(result):
    lines = ["# Agentic Development 面试考点频率", "",
             "本表由人工证据标注生成。百分比是当前样本中的披露率，不是市场考察概率；汇编不进入分母。完整方法见 [README](./README.md)。", "",
             "## 1. 分母与重叠", "", "| 样本组 | 篇数 | 按已知作者合并后的组数 | 作者未知的篇数 |", "| --- | ---: | ---: | ---: |"]
    labels = {"all":"全部公开复盘", "coding":"AI 辅助开发", "agent":"Agent / LLM 应用开发", "coding-practical":"明确披露实作或演示的 AI 辅助开发", "coding-zh":"AI 辅助开发：中文", "coding-en":"AI 辅助开发：英文", "agent-zh":"Agent 应用：中文", "agent-en":"Agent 应用：英文"}
    for key, group in result["cohorts"].items():
        lines.append(f"| {labels[key]} | {group['denominator']} | {group['authorGroupDenominator']} | {group['unknownAuthorSources']} |")
    mixed = result["primaryTracks"].get("mixed", 0)
    lines += ["", f"两条路径有 {mixed} 篇重叠，不可相加。主样本有 {result['primaryWithoutPointHits']} 篇未披露足以标注具体考点的内容，仍保留在分母。按作者合并仅用于敏感性检查；未知作者各保留一组，不能声称已消除所有转载或同人重复。", ""]
    for index, (key, prefix) in enumerate((("coding", "C"), ("agent", "AR")), start=2):
        group = result["cohorts"][key]
        practical = {p["id"]: p for p in result["cohorts"]["coding-practical"]["points"]}
        zh = {p["id"]: p for p in result["cohorts"][key+"-zh"]["points"]}
        en = {p["id"]: p for p in result["cohorts"][key+"-en"]["points"]}
        lines += [f"## {index}. {labels[key]}", "", "| 考点 | 命中／分母 | 披露率 | 中文命中 | 英文命中 | 作者合并命中／组数 |", "| --- | ---: | ---: | ---: | ---: | ---: |"]
        for p in group["points"]:
            if p["id"][0] not in prefix:
                continue
            lines.append(f"| {p['id']} {p['name']} | {p['count']}/{group['denominator']} | {p['rate']:.1%} | {zh[p['id']]['count']} | {en[p['id']]['count']} | {p['authorGroupCount']}/{group['authorGroupDenominator']} |")
        if key == "coding":
            denom = result["cohorts"]["coding-practical"]["denominator"]
            lines += ["", f"实作／演示子样本共 {denom} 篇：" + "；".join(f"{practical[code]['name']} {practical[code]['count']}/{denom}" for code in ("C01","C02","C04","C05","C06","C07","C08")) + "。", "", "C00 只表示泛问使用经历；不能据此判断具体技能已被考查。实作子样本由正文披露的面试形式人工标注，未披露形式不等于没有实作。"]
        lines.append("")
    lines += ["## 4. 考点证据索引", "", "下列链接逐篇定位到转述和原帖。一个问题可涉及多个考点；同篇同考点只计一次。研究编码与知识树的 A01—A14 分组不是同一套编号。", ""]
    for p in sorted(result["cohorts"]["all"]["points"], key=lambda p:p["id"]):
        lines += [f"### {p['id']} {p['name']}", "", p["scope"], "", "、".join(source_link(s) for s in p["sourceIds"]) or "本样本无明确命中。", ""]
    return "\n".join(lines)


def sources_markdown(sources):
    labels = {"primary":"公开候选人复盘（主统计）", "secondary":"题目汇编及转述（补充材料）", "duplicate":"重复材料", "partial":"局部正文", "unreadable":"无法读取正文", "reference":"背景参考", "excluded":"排除材料"}
    lines = ["# 面经与题目材料索引", "", "公司为作者所述面试对象，不代表已获企业确认；补充汇编也不代表独立的真实面试事件。技术答案须另用官方资料核验。", ""]
    for status, label in labels.items():
        group = [s for s in sources if s["status"] == status]
        lines += [f"## {label}：{len(group)} 篇", ""]
        for s in group:
            lines += [f"### {s['id']}", "", f"[{cell(s['title'])}]({s['url']})", "",
                      f"{s['platform']} · {s['language']} · {cell(s['companyAsReported'])} · {s['track']} · 发布日期：{s.get('publishedDate') or '未统一核验'}", ""]
            if s["evidence"]:
                lines += ["；".join(f"**{e['pointId']}** {e['paraphrase']}" for e in s["evidence"]) + "。", ""]
            lines += [" ".join(s["notes"]), ""]
            if s.get("duplicateOf"):
                lines += [f"采用来源：{source_link(s['duplicateOf'])}。", ""]
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Verify inputs and generated files without writing")
    args = parser.parse_args()
    sources, taxonomy = load("source-reviews.json"), load("taxonomy.json")
    validate(sources, taxonomy)
    result = aggregate(sources, taxonomy)
    outputs = {"point-frequency.json": json.dumps(result, ensure_ascii=False, indent=2)+"\n",
               "point-frequency.md": frequency_markdown(result), "sources.md": sources_markdown(sources)}
    for name, content in outputs.items():
        if args.check:
            assert (DATA/name).read_text() == content, f"Stale generated file: {name}"
        else:
            (DATA/name).write_text(content)
    print(json.dumps({"checked" if args.check else "generated": list(outputs), "statusCounts": result["statusCounts"],
                      "denominators": {k:v["denominator"] for k,v in result["cohorts"].items()}}, ensure_ascii=False))


if __name__ == "__main__":
    main()
