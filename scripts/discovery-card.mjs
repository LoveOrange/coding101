import assert from 'node:assert/strict';

/** Check that a static article entry reaches the matching, complete card. */
export function assertDiscoverableCard({link, card, cardId, anchor, site, articleUrl}) {
  const context = `${cardId}: ${articleUrl}`;
  assert(link, `Missing server-rendered question link ${context}`);
  assert(!('hidden' in link) && link['aria-hidden'] !== 'true', `Hidden question link ${context}`);
  assert.equal(link.id, anchor, `Lost question anchor ${context}`);
  assert(card, `Missing card detail ${context}`);
  assert.equal(card.id, cardId, `Mismatched card ID ${context}`);
  assert.equal(card.anchor, anchor, `Mismatched card anchor ${context}`);
  assert(card.question?.trim() && link.text.includes(card.question), `Missing readable question ${context}`);
  assert(card.checkpoints?.length > 0, `Missing card checkpoints ${context}`);
  assert(card.answer?.length > 0, `Missing card answer ${context}`);
  assert(link.href, `Missing card destination ${context}`);
  const destination = new URL(link.href, site);
  assert.equal(destination.origin, site.origin, `External card destination ${context}`);
  assert.equal(destination.pathname.replace(/\/$/, ''), new URL('review', site).pathname, `Wrong card route ${context}`);
  assert.equal(destination.searchParams.get('article'), card.articleId, `Wrong card article ${context}`);
  assert.equal(destination.searchParams.get('card'), cardId, `Wrong card destination ${context}`);
}
