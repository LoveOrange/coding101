/**
 * Wraps two article sections in theme elements, keeping their headings inside
 * so the TOC and anchors are unchanged:
 * - a "面试核心" h2 and its body become `<CoreSection>`, the dark summary block;
 * - each h3 under a "常见问题" h2 becomes a collapsible `<FaqItem>`; the first
 *   one starts open.
 */

type Node = {type: string; depth?: number; value?: string; children?: Node[]; [key: string]: unknown};

const CORE_TITLE = /面试核心/;
const FAQ_TITLE = /常见问题/;

function textOf(node: Node): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

function isHeading(node: Node | undefined, maxDepth: number): boolean {
  return node?.type === 'heading' && (node.depth ?? 7) <= maxDepth;
}

function element(name: string, children: Node[], attributes: Node[] = []): Node {
  return {type: 'mdxJsxFlowElement', name, attributes, children};
}

export default function remarkArticleBlocks() {
  return (root: Node) => {
    const input = root.children ?? [];
    const output: Node[] = [];
    let index = 0;

    // Collects nodes from `index` until the next heading at `maxDepth` or above.
    const takeUntil = (maxDepth: number): Node[] => {
      const taken: Node[] = [];
      while (index < input.length && !isHeading(input[index], maxDepth)) {
        taken.push(input[index]);
        index += 1;
      }
      return taken;
    };

    while (index < input.length) {
      const node = input[index];
      index += 1;
      const h2 = node.type === 'heading' && node.depth === 2 ? textOf(node) : undefined;

      if (h2 && CORE_TITLE.test(h2)) {
        output.push(element('CoreSection', [node, ...takeUntil(2)]));
        continue;
      }

      output.push(node);
      if (!h2 || !FAQ_TITLE.test(h2)) continue;

      output.push(...takeUntil(3));
      let first = true;
      while (isHeading(input[index], 3) && input[index].depth === 3) {
        const question = input[index];
        index += 1;
        const open = first ? [{type: 'mdxJsxAttribute', name: 'defaultOpen', value: null}] : [];
        output.push(element('FaqItem', [question, ...takeUntil(3)], open));
        first = false;
      }
    }
    root.children = output;
  };
}
