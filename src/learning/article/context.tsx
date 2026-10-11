import {createContext, type ReactNode, useContext} from 'react';

import type {ArticleIndex} from '../types';

const ArticleContext = createContext<ArticleIndex | undefined>(undefined);

export function ArticleProvider({article, children}: {article?: ArticleIndex; children: ReactNode}) {
  return <ArticleContext.Provider value={article}>{children}</ArticleContext.Provider>;
}

/** The knowledge-tree article being rendered, if the current doc is one. */
export function useCurrentArticle(): ArticleIndex | undefined {
  return useContext(ArticleContext);
}

export function articleByPermalink(articles: Record<string, ArticleIndex>, path: string): ArticleIndex | undefined {
  const clean = path.replace(/\/$/, '');
  return Object.values(articles).find((article) => article.permalink.replace(/\/$/, '') === clean);
}
