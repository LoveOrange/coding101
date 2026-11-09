export type PublicArticle = {
  id: string;
  title: string;
  description: string;
  permalink: string;
  language: 'zh-Hans' | 'en';
  originalTitle?: string;
  originalPermalink?: string;
};

export type ArticleGroup = {
  id: string;
  title: string;
  description?: string;
  totalArticles: number;
  browsePermalink?: string;
  articles: PublicArticle[];
};

export type DiscoveryRole = {
  title: string;
  description: string;
  permalink: string;
  status?: 'building';
};
