import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {loadFreshModule} from '@docusaurus/utils';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

const {default: remarkArticleBlocks} = await loadFreshModule(
  new URL('../plugins/remark-article-blocks/index.ts', import.meta.url).pathname,
);

test('collection self-test anchors remain visible when question source is replaced by cards', () => {
  for (const name of ['collection-interface-selection', 'arraylist-growth-memory-locality', 'hashmap-structure-lookup-path']) {
    const file = new URL(`../docs/basic-knowledge/java/collections/${name}.mdx`, import.meta.url);
    const tree = unified().use(remarkParse).parse(fs.readFileSync(file, 'utf8'));
    remarkArticleBlocks()(tree);

    const sourceIndex = tree.children.findIndex(node => node.name === 'InterviewQuestionList');
    const anchorIndex = tree.children.findIndex(node => node.value?.includes('<ReviewQuestionAnchor />'));
    assert(anchorIndex >= 0 && anchorIndex === sourceIndex - 2, `${name}: legacy navigation must precede the card section`);
    assert.equal(tree.children[anchorIndex + 1].depth, 2);
    const source = tree.children[sourceIndex];
    assert.equal(source.children[0].depth, 3);
    assert(source.children.some(node => node.value?.includes('<summary>参考回答</summary>')));
    assert.equal(tree.children[sourceIndex + 1].depth, 2, 'the next article section remains outside question source');
  }
});
