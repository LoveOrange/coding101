import {createSlugger, parseMarkdownHeadingId} from '@docusaurus/utils';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

import type {Block, Inline, SectionIndex} from '../../src/learning/types';

export type ParsedHeading = SectionIndex & {depth: number; line: number};

export type ParsedCard = {
  anchor: string;
  question: string;
  companies: string[];
  checkpoints: Inline[][];
  /** Same-page anchors from the 相关内容 line. */
  related: string[];
  answer: Block[];
};

export type ParsedDoc = {
  headings: ParsedHeading[];
  cards: ParsedCard[];
  interviewAnchor?: string;
  minutes: number;
};

const NUMBER_RE = /^(\d+(?:\.\d+)*)\.?\s+/;

function plainHeading(text: string): string {
  return text
    .replace(/`/g, '')
    .replace(/\*\*|__/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
}

function splitNumber(title: string): {number?: string; title: string} {
  const match = NUMBER_RE.exec(title);
  return match ? {number: match[1], title: title.slice(match[0].length)} : {title};
}

/** Strip front matter and return the body lines. */
function bodyLines(source: string): string[] {
  const lines = source.split('\n');
  if (lines[0]?.trim() === '---') {
    const end = lines.indexOf('---', 1);
    if (end > 0) return lines.slice(end + 1);
  }
  return lines;
}

/* ---- Markdown → Block / Inline ---- */

type MdNode = {type: string; value?: string; url?: string; lang?: string; ordered?: boolean; children?: MdNode[]};

function toInline(nodes: MdNode[] = []): Inline[] {
  const out: Inline[] = [];
  for (const node of nodes) {
    switch (node.type) {
      case 'text':
        out.push(node.value ?? '');
        break;
      case 'inlineCode':
        out.push({t: 'code', v: node.value ?? ''});
        break;
      case 'strong':
        out.push({t: 'strong', c: toInline(node.children)});
        break;
      case 'emphasis':
        out.push({t: 'em', c: toInline(node.children)});
        break;
      case 'link': {
        const href = node.url ?? '';
        const children = toInline(node.children);
        if (/^(https?:|\/|#)/.test(href)) out.push({t: 'link', href, c: children});
        else out.push(...children);
        break;
      }
      case 'break':
        out.push('\n');
        break;
      case 'html':
        break;
      default:
        if (node.children) out.push(...toInline(node.children));
        else if (node.value) out.push(node.value);
    }
  }
  return out;
}

function toBlocks(nodes: MdNode[] = []): Block[] {
  const out: Block[] = [];
  for (const node of nodes) {
    switch (node.type) {
      case 'paragraph':
        out.push({t: 'p', c: toInline(node.children)});
        break;
      case 'code':
        out.push({t: 'code', lang: node.lang ?? undefined, v: node.value ?? ''});
        break;
      case 'list':
        out.push({
          t: 'list',
          ordered: Boolean(node.ordered),
          items: (node.children ?? []).map((item) =>
            (item.children ?? []).flatMap((child, index) =>
              index === 0 ? toInline(child.children ?? [child]) : ['\n', ...toInline(child.children ?? [child])],
            ),
          ),
        });
        break;
      case 'html':
        break;
      default:
        if (node.children) out.push(...toBlocks(node.children));
    }
  }
  return out;
}

const processor = unified().use(remarkParse);

function parseMarkdown(markdown: string): MdNode[] {
  return (processor.parse(markdown) as MdNode).children ?? [];
}

function parseList(lines: string[]): Inline[][] {
  const root = parseMarkdown(lines.join('\n'));
  const list = root.find((node) => node.type === 'list');
  if (!list) return [];
  return (list.children ?? []).map((item) => toInline(item.children?.[0]?.children ?? []));
}

/* ---- Document parsing ---- */

function estimateMinutes(lines: string[]): number {
  const text = lines.join('\n');
  const cjk = (text.match(/[㐀-鿿]/g) ?? []).length;
  const words = (text.replace(/[㐀-鿿]/g, ' ').match(/[A-Za-z0-9_]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 450 + words / 200));
}

function parseCard(heading: ParsedHeading, lines: string[]): ParsedCard {
  const companies: string[] = [];
  const related: string[] = [];
  const checkpointLines: string[] = [];
  const answerLines: string[] = [];
  let mode: 'none' | 'checkpoints' | 'answer' = 'none';

  for (const line of lines) {
    if (mode === 'answer') {
      if (/^\s*<\/details>/.test(line)) {
        mode = 'none';
        continue;
      }
      answerLines.push(line);
      continue;
    }
    if (/<summary>\s*参考回答\s*<\/summary>/.test(line)) {
      mode = 'answer';
      continue;
    }
    const company = /^\*\*出现公司\*\*[：:]\s*(.+)$/.exec(line);
    if (company) {
      companies.push(
        ...company[1]
          .split(/[、，,]/)
          .map((name) => name.trim())
          .filter(Boolean),
      );
      mode = 'none';
      continue;
    }
    const focus = /^\*\*考察重点\*\*[：:]?\s*(.*)$/.exec(line);
    if (focus) {
      mode = 'checkpoints';
      if (focus[1]) checkpointLines.push(`- ${focus[1]}`);
      continue;
    }
    const refs = /^\*\*相关内容\*\*[：:]\s*(.+)$/.exec(line);
    if (refs) {
      for (const match of refs[1].matchAll(/\]\(#([^)]+)\)/g)) related.push(decodeURIComponent(match[1]));
      mode = 'none';
      continue;
    }
    if (mode === 'checkpoints') {
      if (/^\s*[-*]\s+/.test(line) || (/^\s{2,}\S/.test(line) && checkpointLines.length)) checkpointLines.push(line);
      else if (line.trim() !== '') mode = 'none';
    }
  }

  return {
    anchor: heading.id,
    question: heading.title,
    companies,
    checkpoints: parseList(checkpointLines),
    related,
    answer: toBlocks(parseMarkdown(answerLines.join('\n'))),
  };
}

export function parseDoc(source: string): ParsedDoc {
  const lines = bodyLines(source);
  const slugger = createSlugger();
  const headings: ParsedHeading[] = [];
  let fence: string | null = null;

  lines.forEach((line, index) => {
    const fenceMatch = /^\s*(```|~~~)/.exec(line);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1];
      else if (fence === fenceMatch[1]) fence = null;
      return;
    }
    if (fence) return;
    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) return;
    const parsed = parseMarkdownHeadingId(match[2], 'classic');
    const text = plainHeading(parsed.text);
    const id = parsed.id ?? slugger.slug(text);
    const {number, title} = splitNumber(text.trim());
    headings.push({id, title, number, depth: match[1].length, line: index});
  });

  const cards: ParsedCard[] = [];
  let interviewAnchor: string | undefined;
  const interview = headings.find((heading) => heading.depth === 2 && heading.title === '面试题');
  if (interview) {
    interviewAnchor = interview.id;
    const nextH2 = headings.find((heading) => heading.depth <= 2 && heading.line > interview.line);
    const end = nextH2?.line ?? lines.length;
    const questions = headings.filter(
      (heading) => heading.depth === 3 && heading.line > interview.line && heading.line < end,
    );
    questions.forEach((question, index) => {
      const stop = questions[index + 1]?.line ?? end;
      cards.push(parseCard(question, lines.slice(question.line + 1, stop)));
    });
  }

  return {headings, cards, interviewAnchor, minutes: estimateMinutes(lines)};
}
