import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const checker = fileURLToPath(new URL('./check-article-format.mjs', import.meta.url));
const selfTestComment = '<!-- 本题为本站原理自测，尚未核验对应公司面经，不作公司归属。 -->';
const article = `---
title: 连接池
knowledge:
  id: testing.connection-pool
---

连接池复用连接，并限制同时打开的连接数量。

## 1. 面试核心 {#core}

- 连接池通过复用连接减少建立连接的开销。[卡](#connection-reuse)
- 池容量限制同时打开的连接数量。
- 使用完成后将连接归还池中。

## 2. 连接复用 {#连接复用}

请求使用完成后归还连接。

## 3. 面试题 {#面试题}

### 3.1 连接池为什么复用连接？ {#connection-reuse}

${selfTestComment}

**考察重点**：连接的建立与归还。

**相关内容**：[连接复用](#连接复用)。

<details>
<summary>参考回答</summary>

复用连接减少重复建立连接的开销。

</details>

## 4. 参考资料 {#参考资料}

- [示例规范](https://example.com/spec)
`;

function check(t, content, flags = ['--strict', '--list']) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'coding101-article-format-test-'));
  t.after(() => fs.rmSync(dir, {recursive: true, force: true}));
  const file = path.join(dir, 'article.mdx');
  fs.writeFileSync(file, content);
  const result = spawnSync(process.execPath, [checker, ...flags, '--', file], {encoding: 'utf8'});
  assert.ifError(result.error);
  return result;
}

test('complete article passes structural checks', (t) => {
  const result = check(t, article);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /0 篇有结构问题，0 篇有文风提示/);
});

test('source-backed cards need no public company field or self-test comment', (t) => {
  const result = check(t, article.replace(selfTestComment, ''));
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test('legacy company text does not identify a self-test', (t) => {
  const result = check(t, article.replace(selfTestComment, '**出现公司**：暂无已核验的公开来源（本站自测）'));
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

const withStyleHints = article
  .replace('连接复用 {#连接复用}', '真正的连接池管理机制 {#连接复用}')
  .replace('请求使用完成后归还连接。', '一个请求在等待连接时会占用调用线程，如果连接池已经达到容量上限，就需要等待其他请求归还连接，因此连接池的等待超时应与请求的剩余预算一起设置。')
  .concat('\n- [补充规范](https://example.com/extra)\n');

test('style hints remain visible without failing strict checks', (t) => {
  const result = check(t, withStyleHints);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /标题模板/);
  assert.match(result.stdout, /长句待复核/);
  assert.match(result.stdout, /参考资料列表中间有空行/);
  assert.match(result.stdout, /不要求清零/);
});

test('legacy style-strict reports hints but only fails on structural errors', (t) => {
  const advisory = check(t, withStyleHints, ['--style-strict']);
  assert.equal(advisory.status, 0, advisory.stdout + advisory.stderr);
  assert.match(advisory.stdout, /长句待复核/);
  assert.match(advisory.stderr, /已弃用.*--strict --list/);

  const broken = check(t, withStyleHints.replace('**考察重点**', '**提示**'), ['--style-strict']);
  assert.equal(broken.status, 1, broken.stdout + broken.stderr);
  assert.match(broken.stdout, /缺少考察重点/);
});

test('necessary qualifiers and negations have no frequency quota', (t) => {
  const content = article.replace('请求使用完成后归还连接。',
    '等待连接时可能超时。不能把连接池容量等同于服务容量。通常要结合请求耗时设置等待预算。连接数较多不代表吞吐量更高。');
  const result = check(t, content);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /0 篇有文风提示/);
});

const structuralCases = [
  ['core section', '面试核心', '要点', /缺少面试核心/],
  ['references', '参考资料 {#参考资料}', '资料 {#参考资料}', /缺少参考资料/],
  ['questions section', '面试题 {#面试题}', '练习 {#面试题}', /缺少面试题/],
  ['card ID', ' {#connection-reuse}', '', /缺少显式 ID/],
  ['focus field', '**考察重点**', '**提示**', /缺少考察重点/],
  ['related content', '**相关内容**', '**扩展阅读**', /缺少相关内容/],
  ['answer summary', '<summary>参考回答</summary>', '<summary>提示</summary>', /缺少参考回答/],
  ['card link', '[卡](#connection-reuse)', '', /面试核心没有 \[卡\] 链接/],
  ['heading numbering', '## 2. 连接复用', '## 连接复用', /二级标题没有连续编号/],
  ['nonstandard attribution', selfTestComment, '<!-- 本站自测。 -->', /自测题缺少统一归属注释/],
  ['multiline attribution', selfTestComment, '<!--\n本站自测。\n-->', /自测题缺少统一归属注释/],
];

for (const [name, original, replacement, diagnostic] of structuralCases) {
  test(`strict checks reject missing or invalid ${name}`, (t) => {
    const result = check(t, article.replace(original, replacement));
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stdout, diagnostic);
  });
}
