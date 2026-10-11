import {Children, cloneElement, createContext, isValidElement, type ReactNode, useContext, useMemo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import {cardsInSection, moduleOf, RATING_LABELS, sectionLabel, topicsHref, useLearningIndex} from '../content';
import {useLearnerFeatures} from '../features';
import {useCurrentArticle} from './context';
import {useLearner} from '../store';
import type {ArticleIndex, CardIndex, CardState} from '../types';
import {Companies, PriorityDots} from '../ui';
import styles from './article.module.css';

export function reviewHref(article: ArticleIndex, card?: CardIndex): string {
  const params = new URLSearchParams({article: article.id});
  if (card) params.set('card', card.id);
  return `/review?${params.toString()}`;
}

/**
 * Domain / topic breadcrumb back into the knowledge tree. The topic level is
 * shown only when the topic groups several articles.
 */
export function TreeBreadcrumb({article, className}: {article: ArticleIndex; className?: string}) {
  const index = useLearningIndex();
  const module = moduleOf(index, article);
  if (!module) return null;
  const domainHref = `/topics?domain=${encodeURIComponent(module.domain.id)}`;
  return (
    <nav className={clsx(styles.crumbs, className)} aria-label="知识树位置">
      <Link to={domainHref}>{module.domain.label}</Link>
      {module.topic && module.topic.articleIds.length > 1 && (
        <>
          <span className={styles.crumbSep} aria-hidden="true">
            /
          </span>
          <Link to={topicsHref(article)}>{module.topic.label}</Link>
        </>
      )}
    </nav>
  );
}

export function ArticleMeta({article}: {article: ArticleIndex}) {
  const index = useLearningIndex();
  const module = moduleOf(index, article);
  return (
    <div className={styles.meta}>
      {module && <TreeBreadcrumb article={article} className={styles.metaCrumbs} />}
      <span>约 {article.minutes} 分钟</span>
      {article.cardIds.length > 0 && <span>{article.cardIds.length} 张卡</span>}
    </div>
  );
}

const CoreContext = createContext(false);

export function CoreSummary({title = '面试核心', children}: {title?: ReactNode; children: ReactNode}) {
  return (
    <CoreContext.Provider value>
      <div className={styles.core}>
        <div className={styles.coreHead}>
          {typeof title === 'string' ? <span className={styles.coreTitle}>{title}</span> : title}
          <span className={styles.coreHint}>先记住这几条，再读正文</span>
        </div>
        <div className={styles.coreBody}>{children}</div>
      </div>
    </CoreContext.Provider>
  );
}

/** A `## 面试核心` section, wrapped by the remark-article-blocks plugin. */
export function CoreSection({children}: {children: ReactNode}) {
  const [heading, ...body] = Children.toArray(children);
  const props = isValidElement<{id?: string; children?: ReactNode}>(heading) ? heading.props : {};
  const title = (
    <Heading as="h2" id={props.id} className={styles.coreTitle}>
      {props.children}
    </Heading>
  );
  return <CoreSummary title={title}>{body}</CoreSummary>;
}

/**
 * Inside 面试核心, a link to one of the article's question headings
 * (`[卡](#question-anchor)`) becomes the point's card chip, shown at the end
 * of the row. Returns undefined outside the block.
 */
export function useCoreItem(children: ReactNode): {className: string; content: ReactNode} | undefined {
  const inCore = useContext(CoreContext);
  const article = useCurrentArticle();
  const index = useLearningIndex();
  if (!inCore || !article) return undefined;

  const cards: CardIndex[] = [];
  const cardFor = (href: unknown) => {
    if (typeof href !== 'string' || !href.startsWith('#')) return undefined;
    const anchor = decodeURIComponent(href.slice(1));
    return article.cardIds.map((id) => index.cards[id]).find((card) => card.anchor === anchor);
  };
  const strip = (nodes: ReactNode): ReactNode[] =>
    Children.toArray(nodes).flatMap((node) => {
      if (!isValidElement<{href?: unknown; children?: ReactNode}>(node)) return [node];
      const card = cardFor(node.props.href);
      if (card) {
        cards.push(card);
        return [];
      }
      return node.type === 'p' ? [cloneElement(node, undefined, ...strip(node.props.children))] : [node];
    });
  const text = strip(children);

  return {
    className: styles.coreItem,
    content: (
      <>
        <span className={styles.coreText}>{text}</span>
        {cards.length > 0 && (
          <span className={styles.coreChips}>
            {cards.map((card) => (
              <CoreCardChip key={card.id} article={article} card={card} />
            ))}
          </span>
        )}
      </>
    ),
  };
}

export function CoreCardChip({article, card}: {article: ArticleIndex; card: CardIndex}) {
  return (
    <Link className={styles.coreChip} to={reviewHref(article, card)} title={card.question}>
      卡 · {card.label}
    </Link>
  );
}

function CardChip({article, card}: {article: ArticleIndex; card: CardIndex}) {
  return (
    <Link className={styles.chip} to={reviewHref(article, card)} title={card.question}>
      卡 · {card.question}
    </Link>
  );
}

export function SectionTags({article, sectionId}: {article: ArticleIndex; sectionId: string}) {
  const index = useLearningIndex();
  const cards = cardsInSection(index, article, sectionId);
  if (!cards.length) return null;
  return (
    <div className={styles.tags}>
      {article.priority && (
        <>
          <PriorityDots priority={article.priority} />
          <span className={styles.divider} />
        </>
      )}
      {cards.map((card) => (
        <CardChip key={card.id} article={article} card={card} />
      ))}
    </div>
  );
}

/** Heading ids that should show the card marker in the table of contents. */
export function useCardHeadings(article?: ArticleIndex): Set<string> {
  const index = useLearningIndex();
  return useMemo(() => {
    const ids = new Set<string>();
    if (!article) return ids;
    for (const cardId of article.cardIds) {
      for (const ref of index.cards[cardId].refs) {
        ids.add(ref.id);
        ids.add(ref.section);
      }
    }
    if (article.interviewAnchor && article.cardIds.length) ids.add(article.interviewAnchor);
    return ids;
  }, [article, index]);
}

export function TocLegend() {
  return (
    <div className={styles.legend}>
      <span className="c101-card-mark" aria-hidden="true" />
      有对应面试题卡片
    </div>
  );
}

function StatusDot({state}: {state?: CardState}) {
  if (!state || state.reps === 0) {
    return (
      <span className={styles.status}>
        <span className={clsx(styles.dot, styles.dotNone)} />
        未标记
      </span>
    );
  }
  const label = state.rating === 'good' ? '掌握' : RATING_LABELS[state.rating];
  return (
    <span className={styles.status}>
      <span className={clsx(styles.dot, styles[`dot_${state.rating}`])} />
      {label}
    </span>
  );
}

export function InterviewCards({article, headingId}: {article: ArticleIndex; headingId: string}) {
  const index = useLearningIndex();
  const learner = useLearner();
  const features = useLearnerFeatures();
  const section = article.sections.find((item) => item.id === headingId);
  const cards = article.cardIds.map((id) => index.cards[id]);
  return (
    <>
      <Heading as="h2" id={headingId} className={clsx(styles.interviewHeading, 'c101-interview')}>
        {section?.number ? `${section.number} · ` : ''}面试题卡片
      </Heading>
      <div className={clsx(styles.interview, 'c101-interview-cards')}>
        <div className={styles.interviewHead}>
          <div className={styles.interviewIntro}>
            <span className={styles.interviewTitle}>先想答案，再翻面</span>
            <span className={styles.interviewHint}>题目来自公开面经。点任意一张进入翻卡，可左右切换，看完回到这里。</span>
          </div>
          {cards.length > 0 && (
            <Link className={styles.flipAll} to={reviewHref(article)}>
              逐张翻看 {cards.length} 张 →
            </Link>
          )}
        </div>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.id} className={styles.card} to={reviewHref(article, card)}>
              <div className={styles.cardTop}>
                <span className={styles.cardLabel}>{card.label}</span>
                <PriorityDots priority={article.priority} />
              </div>
              <div className={styles.cardQuestion}>{card.question}</div>
              <Companies names={card.companies} tone="paper" />
              <div className={styles.cardFoot}>
                <span>
                  考察 {card.checkpointCount} 点
                  {card.refs.length > 0 && ` · 相关 ${card.refs.map((ref) => sectionLabel(ref.number)).filter(Boolean).join(' ')}`}
                </span>
                {features && <StatusDot state={learner.cards[card.id]} />}
              </div>
            </Link>
          ))}
        </div>
        {features && (
          <div className={styles.interviewNote}>
            <span className={clsx(styles.dot, styles.dotGreen)} />
            未标记的卡读完后明天进入复习；已标记的按状态安排
          </div>
        )}
      </div>
    </>
  );
}
