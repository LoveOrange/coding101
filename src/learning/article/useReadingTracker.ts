import {useEffect} from 'react';

import {outlineSections} from '../content';
import {learnerActions} from '../store';
import type {ArticleIndex} from '../types';

/**
 * Record how far the reader got through the article's level-2 sections and
 * queue the article's cards once the end of the article has been reached.
 */
export function useReadingTracker(article?: ArticleIndex) {
  useEffect(() => {
    if (!article) return undefined;
    const sections = outlineSections(article);
    const positions = new Map(sections.map((section, i) => [section.id, i]));
    let frame = 0;
    let furthest = -1;
    let reportedDone = false;

    const measure = () => {
      frame = 0;
      const root = document.querySelector('.theme-doc-markdown');
      if (!root) return;
      const line = window.innerHeight * 0.35;
      let current = -1;
      let currentId: string | undefined;
      root.querySelectorAll('h2[id]').forEach((heading) => {
        const position = positions.get(heading.id);
        if (position === undefined) return;
        if (heading.getBoundingClientRect().top < line) {
          current = position;
          currentId = heading.id;
        }
      });
      const done = root.getBoundingClientRect().bottom < window.innerHeight;
      if (current > furthest || (done && !reportedDone)) {
        furthest = Math.max(furthest, current);
        if (furthest < 0 && !done) return;
        learnerActions.recordReading(article.id, Math.max(furthest, 0), currentId, done);
        if (done && !reportedDone) {
          reportedDone = true;
          learnerActions.queueCards(article.cardIds);
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    const timer = window.setTimeout(measure, 600);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [article]);
}
