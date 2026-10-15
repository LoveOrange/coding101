export type PublicArticle = {
  id: string;
  title: string;
  description: string;
  permalink: string;
};

export type ArticleGroup = {
  id: string;
  title: string;
  articles: PublicArticle[];
};
