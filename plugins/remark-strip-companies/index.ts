/**
 * Drops the `**出现公司**：…` line from rendered articles. Which companies asked
 * a question is paid data: Pro readers get it from the account service through
 * the card's company chip, so the static page must not carry it. The line stays
 * in the source for now (the content-side move is tracked in
 * plans/backend-architecture.md §6); the build parser still reads it to mark
 * site-authored self-tests.
 */

type Node = {type: string; value?: string; children?: Node[]};

function textOf(node: Node): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function isCompanyLine(node: Node): boolean {
  const first = node.children?.[0];
  return node.type === 'paragraph' && first?.type === 'strong' && textOf(first).trim() === '出现公司';
}

function strip(node: Node) {
  if (!node.children) return;
  node.children = node.children.filter((child) => !isCompanyLine(child));
  node.children.forEach(strip);
}

export default function remarkStripCompanies() {
  return (root: Node) => strip(root);
}
