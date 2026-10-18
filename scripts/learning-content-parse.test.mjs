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
