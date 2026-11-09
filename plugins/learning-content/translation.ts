import type {ParsedDoc} from './parse';

/** Translations change presentation, never the identity or meaning of saved progress. */
export function cardTranslationErrors(original: ParsedDoc, translated: ParsedDoc): string[] {
  const errors: string[] = [];
  const source = new Map(original.cards.map((card) => [card.anchor, card]));
  const seen = new Set<string>();
  for (const card of translated.cards) {
    const id = card.anchor;
    if (!card.explicitId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) errors.push(`${id}: a stable explicit question ID is required`);
    if (seen.has(id)) errors.push(`${id}: duplicate translated question`);
    seen.add(id);
    const counterpart = source.get(id);
    if (!counterpart) {
      errors.push(`${id}: no original question with this ID`);
      continue;
    }
    if (card.checkpoints.length !== counterpart.checkpoints.length) errors.push(`${id}: checkpoint count changed; saved checks must keep their meaning and order`);
    if (!card.checkpoints.length || !card.answer.length || !card.related.length) errors.push(`${id}: translated focus, answer and related reading are required`);
    if (card.selfTest !== counterpart.selfTest || card.composite !== counterpart.composite) errors.push(`${id}: question type or attribution changed`);
    for (const ref of card.related) {
      if (!ref.path && ref.anchor && !translated.headings.some((heading) => heading.id === ref.anchor)) errors.push(`${id}: missing translated section #${ref.anchor}`);
    }
  }
  for (const id of source.keys()) if (!seen.has(id)) errors.push(`${id}: missing translated question`);
  return errors;
}
