#!/usr/bin/env python3
"""Build article-first Markdown mindmaps from content inventories; no answers are copied."""
import argparse
import collections
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = ROOT / 'plans/knowledge-tree'
GROUPS = {
    'java.types': ('Java', '类型与对象'),
    'java.metadata': ('Java', '泛型与函数式编程'),
    'java.collections': ('Java', '集合'),
    'java.concurrent': ('Java', '并发与任务执行'),
    'java.jvm': ('Java', 'JVM 与运行诊断'),
    'java.io': ('Java', 'I/O'),
    'spring': ('Java', 'Spring 框架'),
    'java.data-access': ('Java', '数据访问'),
    'algorithms': ('通用基础', '数据结构与算法'),
    'os': ('通用基础', '操作系统'),
    'network': ('通用基础', '计算机网络与 HTTP'),
    'database.sql': ('通用基础', '关系模型与 SQL'),
    'database.engine': ('通用基础', 'MySQL 索引与事务'),
    'cache': ('通用基础', '缓存与 Redis'),
    'middleware': ('通用基础', '消息与搜索'),
    'distributed': ('系统设计', '分布式一致性与可靠性'),
    'engineering': ('通用基础', '工程基础与验证'),
    'security': ('通用基础', '认证与应用安全'),
    'design': ('系统设计', '设计方法与模式'),
}
# Main teaching homes. Existing partial explanations remain supplementary links.
PLANNED = {
    'java.data-access.jdbc-flow': 'JDBC', 'java.data-access.jdbc-transaction': 'JDBC',
    'java.jvm.gc-algorithm': '垃圾回收算法', 'os.ipc': '进程间通信',
    'os.page-cache': '页缓存', 'os.reactor': 'Reactor',
    'algorithms.monotonic-stack': '单调栈', 'algorithms.intervals': '区间合并',
    'algorithms.bit-power': '快速幂', 'algorithms.union-find': '并查集',
    'algorithms.trie': 'Trie', 'network.websocket-sse': 'WebSocket 与 SSE',
    'database.sql.window': 'SQL 窗口函数', 'database.sql.schema-normalization': '数据库规范化',
    'database.engine.buffer-pool': 'Buffer Pool', 'database.engine.undo-redo': '事务日志',
    'database.engine.binlog': 'binlog', 'database.engine.replica-lag': 'MySQL 复制',
    'distributed.unique-id': '分布式 ID', 'distributed.load-balance': '负载均衡',
    'security.cors': 'CORS', 'design.pattern-strategy': '策略模式',
    'design.pattern-factory': '工厂方法模式', 'design.singleton': '单例模式',
    'engineering.linux-process': 'Linux 进程与端口', 'engineering.linux-log': 'Linux 日志检索',
    'engineering.load-test': '性能测试',
}
LINKS = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')


def read(name):
    return (BASE / name).read_text()


def article_title(url, fallback):
    path = (BASE / url.split('#')[0]).resolve()
    assert path.is_relative_to(ROOT) and path.exists(), url
    text = path.read_text()
    heading = re.search(r'^# (.+)$', text, re.M)
    return heading[1].strip() if heading else fallback


def classify(url):
    p = url.split('#')[0]
    if '/java/algorithms/' in p or '/algorithms/' in p or '/data-structures/' in p:
        return GROUPS['algorithms']
    if any(t in p for t in ['test-pyramid', 'test-doubles', '/production/', '/tools-and-frameworks/']):
        return GROUPS['engineering']
    if '/security/' in p:
        return GROUPS['security']
    if 'zero-copy' in p or '/operating-system/' in p:
        return GROUPS['os']
    if '/network/' in p:
        return GROUPS['network']
    if '/database/sql/' in p or '/database/modeling/' in p:
        return GROUPS['database.sql']
    if '/database/' in p:
        return GROUPS['database.engine']
    if '/nosql/' in p:
        return GROUPS['cache']
    if '/middleware/' in p:
        return GROUPS['middleware']
    if '/java/' in p:
        for folder, key in [('language', 'java.types'), ('functional', 'java.metadata'), ('collections', 'java.collections'), ('concurrency', 'java.concurrent'), ('jvm', 'java.jvm'), ('io', 'java.io'), ('spring', 'spring'), ('data-access', 'java.data-access')]:
            if '/' + folder + '/' in p:
                return GROUPS[key]
        return ('Java', 'API 与测试')
    if '/system-design/' in p:
        for folder, topic in [('distributed-system', '复制与一致性'), ('distributed-data', '分布式业务流程'), ('reliability', '服务可靠性'), ('microservices', '架构与服务治理'), ('architecture', '架构与服务治理'), ('availability', '可用性与容量'), ('leadership', '架构决策与复盘'), ('ood', '面向对象设计'), ('patterns', '扩展与任务模式')]:
            if '/' + folder + '/' in p:
                return ('系统设计', topic)
        return ('系统设计', '设计方法')
    return GROUPS['engineering']


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    articles = collections.OrderedDict()
    points = {}

    def add(title, url=None, group=None, key=None, status='正文待核验'):
        key = key or (url.split('#')[0] if url else 'planned:' + title)
        if key not in articles:
            if url:
                title = article_title(url, title)
            articles[key] = dict(title=title, url=url, group=group or classify(url), status=status, cards=[])
        return articles[key]

    for line in read('m1-knowledge-points.md').splitlines():
        if not line.startswith('| `'):
            continue
        cells = line.split(' | ')
        point_id = cells[0][3:-1]
        assert point_id not in points
        question = cells[1].split('<br/>')[0]
        links = LINKS.findall(cells[3])
        group = GROUPS[point_id.rsplit('.', 1)[0]]
        if point_id in PLANNED:
            if point_id.startswith('design.pattern-') or point_id == 'design.singleton':
                group = ('系统设计', '面向对象设计')
            elif point_id in ['distributed.unique-id', 'distributed.load-balance']:
                group = ('系统设计', '扩展与任务模式')
            article = add(PLANNED[point_id], group=group, status='待补文章')
            other = links
        else:
            assert links, point_id
            title, url = links[0]
            # Use the technical home for shared content, independent of physical directory.
            group = classify(url)
            if point_id.startswith('java.metadata.'):
                group = GROUPS['java.metadata']
            article = add(title, url, group)
            other = links[1:]
        other = [(article_title(u, t), u) for t, u in other]
        card = dict(id=point_id, question=question, status=cells[4], related=other)
        article['cards'].append(card)
        points[point_id] = card
    assert len(points) == 287

    # Include the wider existing reading catalog without pretending it has vetted cards.
    for name in ['java.md', 'document-inventory.md']:
        for line in read(name).splitlines():
            for title, url in LINKS.findall(line):
                p = url.split('#')[0]
                if not p.startswith('../../docs/'):
                    continue
                if name == 'document-inventory.md':
                    if not any(t in p for t in ['/basic-knowledge/', '/system-design/', '/tools-and-frameworks/']):
                        continue
                    if any(t in p for t in ['/cases/', '/questions/', '/mit6.824/']):
                        continue
                    if '索引／导读' in line or '空正文' in line:
                        continue
                if p not in articles:
                    status = '草稿，待核验' if '草稿' in line else '正文待核验'
                    add(title, p, status=status)

    # AI planned article titles and scopes remain owned by its branch specification.
    ai_groups = {'llm/': '模型调用与上下文', 'rag/': '检索增强生成', 'agents/': '工具与执行', 'evaluation/': '评估与观测', 'security/': '安全与控制', 'serving/': '服务化与成本', 'frameworks/': '框架实践'}
    for line in read('agent.md').splitlines():
        match = re.match(r'\| `([^`]+/)` \| (.+?)／`([^`]+)` \|', line)
        if not match:
            continue
        folder, title, filename = match.groups()
        path = ROOT / 'docs/ai' / folder / filename
        url = '../../' + str(path.relative_to(ROOT)) if path.exists() else None
        add(title, url, ('AI 应用与 Agent', ai_groups[folder]), key='ai:' + folder + filename, status='正文待核验' if url else '待补文章')
    for title in ['代码库上下文', '开发反馈迭代', 'AI 代码调试', '仓库指令']:
        add(title, group=('AI 应用与 Agent', 'Agent 辅助开发'), status='待补文章')

    for line in read('system-design.md').splitlines():
        cells = line.split(' | ')
        if not line.startswith('| `') or len(cells) < 3:
            continue
        folder = cells[0][3:-1]
        for part in cells[1].split('；'):
            match = re.fullmatch(r'(.+?) `([^`]+\.mdx)`', part.strip())
            if not match:
                continue
            title, filename = match.groups()
            if any(a['title'] == title for a in articles.values()):
                continue
            url = '../../docs/system-design/' + folder + filename
            exists = (BASE / url).exists()
            add(title, url if exists else None, classify(url), status='正文待核验' if exists else '待补文章')

    # Preserve planned language articles, without creating dead file links.
    for line in read('java.md').splitlines():
        match = re.match(r'\| ([^|]+) \| `([^`]+\.mdx)` \|', line)
        if not match:
            continue
        title, path = match.groups()
        title = title.strip()
        if any(a['title'] == title for a in articles.values()):
            continue
        target = ROOT / 'docs/basic-knowledge/java' / path
        url = '../../' + str(target.relative_to(ROOT)) if target.exists() else None
        add(title, url, classify('../../docs/basic-knowledge/java/' + path), status='正文待核验' if url else '待补文章')

    branches = collections.OrderedDict((name, collections.OrderedDict()) for name in ['Java', '通用基础', '系统设计', 'AI 应用与 Agent'])
    for a in articles.values():
        branch, topic = a['group']
        branches[branch].setdefault(topic, []).append(a)
    for branch, order in [('Java', ['类型与对象', '泛型与函数式编程', '集合', 'I/O', '并发与任务执行', 'JVM 与运行诊断', 'Spring 框架', '数据访问', 'API 与测试']), ('通用基础', ['数据结构与算法', '操作系统', '计算机网络与 HTTP', '关系模型与 SQL', 'MySQL 索引与事务', '缓存与 Redis', '消息与搜索', '工程基础与验证', '认证与应用安全'])]:
        assert set(order) == branches[branch].keys()
        branches[branch] = collections.OrderedDict((t, branches[branch][t]) for t in order)

    def render(branch_names, title):
        lines = ['# ' + title, '']
        for branch in branch_names:
            lines.append('- ' + branch)
            for topic, items in branches[branch].items():
                lines.append('  - ' + topic)
                for a in items:
                    label = f'[{a["title"]}]({a["url"]})' if a['url'] else a['title']
                    lines.append(f'    - {label}（{a["status"]}）')
                    if not a['cards']:
                        # No fake flashcard IDs or invented published questions.
                        continue
                    for c in a['cards']:
                        label = c['question'] + '〔候选闪卡〕'
                        if c['status'] != '待核验':
                            label += '〔原覆盖评估：' + c['status'] + '〕'
                        if c['related']:
                            label += '；关联阅读：' + '、'.join(f'[{t}]({u})' for t, u in c['related'])
                        lines.append('      - ' + label + f' <!-- kp:{c["id"]} -->')
        return '\n'.join(lines) + '\n'

    outputs = {BASE / 'article-flashcard-tree.md': render(branches, 'Coding 101 文章与闪卡知识树')}
    for name, file in [('Java', 'java-mindmap.md'), ('通用基础', 'foundations-mindmap.md'), ('系统设计', 'system-design-mindmap.md'), ('AI 应用与 Agent', 'agent-mindmap.md')]:
        outputs[BASE / file] = render([name], name + ' 文章与闪卡')
    overview = ['# Coding 101 知识树总览', '']
    for branch, topics in branches.items():
        overview.append('- ' + branch)
        overview.extend('  - ' + topic for topic in topics)
    outputs[BASE / 'overview-mindmap.md'] = '\n'.join(overview) + '\n'
    practice = ['# 综合练习与面经题集合', '', '- 公开面经任务改编（答案与来源在原文，独立卡片待核验）']
    for number, title in re.findall(r'^### (5\.\d) (.+)$', read('agentic-development-knowledge-points.md'), re.M):
        # Explicit IDs avoid renderer-specific punctuation rules in generated heading anchors.
        practice.append(f'  - [{title}](./agentic-development-knowledge-points.md#practice-{number.replace(".", "-")})')
    practice.append('- 系统设计案例（来源属性与原子题分开管理）')
    for line in read('system-design.md').splitlines():
        cells = line.split(' | ')
        if len(cells) != 5:
            continue
        match = re.fullmatch(r'(.+?)／`([^`]+)`', cells[1])
        if not match:
            continue
        title, filename = match.groups()
        candidate = (ROOT / 'docs/system-design/cases' / filename).resolve()
        if candidate.exists():
            url = '../../' + str(candidate.relative_to(ROOT))
            label = f'[{article_title(url, title)}]({url})'
        else:
            label = title
        practice.append(f'  - {label}（{cells[4].removesuffix(" |")}）；组合范围：{cells[2]}')
    outputs[BASE / 'practice-mindmap.md'] = '\n'.join(practice) + '\n'

    # The root and its separately generated views must contain each M1 point exactly once.
    full = outputs[BASE / 'article-flashcard-tree.md']
    ids = re.findall(r'<!-- kp:([^ ]+) -->', full)
    assert len(ids) == len(set(ids)) == len(points)
    assert set(ids) == points.keys()
    assert len({a['url'] for a in articles.values() if a['url']}) == sum(bool(a['url']) for a in articles.values())
    for path, text in outputs.items():
        for line in text.splitlines()[2:]:
            assert re.match(r'^(?:  )*- ', line), (path, line)
        for _, link in LINKS.findall(text):
            assert (path.parent / link.split('#')[0]).exists(), link
        if args.check:
            assert path.exists() and path.read_text() == text, f'Regenerate {path.relative_to(ROOT)}'
        else:
            path.write_text(text)
    print(f'{len(points)} unique M1 card candidates; {len(articles)} article nodes ({sum(a["url"] is None for a in articles.values())} planned); {sum(len(v) for v in branches.values())} topics; {len(outputs)} Markdown views.')


if __name__ == '__main__':
    main()
