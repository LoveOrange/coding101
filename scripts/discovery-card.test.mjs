import assert from 'node:assert/strict';
import test from 'node:test';
import {assertDiscoverableCard} from './discovery-card.mjs';

function fixture(base = 'https://example.com/') {
  const cardId = 'ai.llm.transformer#self-attention';
  return {
    site: new URL(base), articleUrl: new URL('docs/ai/llm/transformer/', base).href,
    cardId, anchor: 'self-attention',
    link: {id: 'self-attention', text: '自注意力如何计算？',
      href: new URL(`review/?article=ai%2Fllm%2Ftransformer&card=${encodeURIComponent(cardId)}`, base).href},
    card: {id: cardId, anchor: 'self-attention', articleId: 'ai/llm/transformer',
      question: '自注意力如何计算？', checkpoints: [['解释 Q、K、V']], answer: [{t: 'p', c: ['先计算权重，再汇总 V。']}]},
  };
}

test('static card links preserve question anchors and reach answers without duplicate article disclosures', () => {
  assertDiscoverableCard(fixture());
  assertDiscoverableCard(fixture('https://example.com/coding101/'));
});

test('missing, hidden or unreadable question entries fail discovery', () => {
  for (const link of [undefined, {...fixture().link, id: 'changed'}, {...fixture().link, hidden: ''},
    {...fixture().link, 'aria-hidden': 'true'}, {...fixture().link, text: '打开卡片'}]) {
    assert.throws(() => assertDiscoverableCard({...fixture(), link}));
  }
});

test('missing answer metadata or mismatched card identities fail discovery', () => {
  for (const card of [undefined, {...fixture().card, id: 'other'}, {...fixture().card, anchor: 'other'},
    {...fixture().card, checkpoints: []}, {...fixture().card, answer: []}]) {
    assert.throws(() => assertDiscoverableCard({...fixture(), card}));
  }
});

test('wrong routes, external destinations and mismatched article or card parameters fail discovery', () => {
  for (const href of [undefined, 'https://other.example/review/', '/account/', '/review/?article=other',
    '/review/?article=ai%2Fllm%2Ftransformer&card=other']) {
    assert.throws(() => assertDiscoverableCard({...fixture(), link: {...fixture().link, href}}));
  }
});
