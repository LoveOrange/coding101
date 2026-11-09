import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const source = fs.readFileSync(new URL('../plugins/learning-content/parse.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
}).outputText.replace(/from '([^']+)'/g, (_, name) => `from '${import.meta.resolve(name)}'`);
const {parseDoc} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const selfTestComment = '<!-- 本题为本站原理自测，尚未核验对应公司面经，不作公司归属。 -->';

function article(attribution = '') {
  return `## 1. 面试题 {#面试题}

### 1.1 如何复用连接？ {#connection-reuse}

${attribution}

**考察重点**：连接的建立与归还。

**相关内容**：[连接复用](#连接复用)。

<details>
<summary>参考回答</summary>

使用完成后归还连接。

</details>
`;
}

test('only the standard comment identifies a self-test, without changing card content', () => {
  const [sourced] = parseDoc(article()).cards;
  const [selfTest] = parseDoc(article(selfTestComment)).cards;
  assert.equal(sourced.selfTest, false);
  assert.equal(selfTest.selfTest, true);
  assert.deepEqual({...selfTest, selfTest: false}, sourced);
  assert.equal(sourced.anchor, 'connection-reuse');
  assert.equal(sourced.explicitId, true);
  assert.equal('companies' in sourced, false);
  assert.equal(parseDoc(article('<!-- 本站自测。 -->')).cards[0].selfTest, false);
});

test('legacy company fields no longer affect self-test status or card data', () => {
  const [card] = parseDoc(article()).cards;
  for (const company of ['示例公司', '暂无已核验的公开来源（本站自测）']) {
    assert.deepEqual(parseDoc(article(`**出现公司**：${company}`)).cards[0], card);
  }
});

test('self-test comments are scoped to their own question', () => {
  const content = article(selfTestComment)
    + article().replace('## 1. 面试题 {#面试题}', '').replace('{#connection-reuse}', '{#another-question}');
  assert.deepEqual(parseDoc(content).cards.map(({selfTest}) => selfTest), [true, false]);
});

const {loadFreshModule} = await import('@docusaurus/utils');
const {cardTranslationErrors} = await loadFreshModule(new URL('../plugins/learning-content/translation.ts', import.meta.url).pathname);
const originalDns = parseDoc(fs.readFileSync(new URL('../docs/basic-knowledge/network/dns.mdx', import.meta.url), 'utf8'));
const englishDns = parseDoc(fs.readFileSync(new URL('../i18n/en/docusaurus-plugin-content-docs/current/basic-knowledge/network/dns.mdx', import.meta.url), 'utf8'), 'en');

test('real DNS translations retain shared question identities and localize reading anchors', () => {
  assert.equal(englishDns.cards.length, 4);
  assert.deepEqual(cardTranslationErrors(originalDns, englishDns), []);
  assert.deepEqual(englishDns.cards.map(c => c.anchor), originalDns.cards.map(c => c.anchor));
  assert.equal(englishDns.cards[1].related[0].anchor, 'negative-caching');
  assert.notEqual(englishDns.cards[1].related[0].anchor, originalDns.cards[1].related[0].anchor);
  assert.notEqual(englishDns.cards[0].question, originalDns.cards[0].question);
  assert(englishDns.cards.every(c => c.answer.length && c.checkpoints.length));
});

test('translation guards reject identity changes, lost answers, changed checks and wrong-language anchors', () => {
  for (const mutate of [
    doc => doc.cards.pop(),
    doc => doc.cards.push(doc.cards[0]),
    doc => doc.cards[0].anchor = 'translated-id',
    doc => doc.cards[0].explicitId = false,
    doc => doc.cards[0].checkpoints.push(['new point']),
    doc => doc.cards[0].answer = [],
    doc => doc.cards[0].selfTest = !doc.cards[0].selfTest,
    doc => doc.cards[0].related = [{anchor: '中文章节'}],
  ]) {
    const changed = structuredClone(englishDns);
    mutate(changed);
    assert(cardTranslationErrors(originalDns, changed).length > 0);
  }
});
