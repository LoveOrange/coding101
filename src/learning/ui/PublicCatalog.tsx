import Link from '@docusaurus/Link';
import {useLearningIndex} from '../content';

/** Readable navigation before hydration and when JavaScript is unavailable. */
export function PublicCatalog({questions = false}: {questions?: boolean}) {
  const index = useLearningIndex();
  return (
    <main className="container padding-vert--lg">
      <h1>{questions ? '技术面试题库' : '技术主题'}</h1>
      <p>{questions
        ? '先独立回答，再打开文章中的考察重点和参考回答。每个主题列出一道自测题，文章中包含该主题的完整题目与原理讲解。'
        : '按领域查找技术文章，阅读原理、示例和使用边界，再用文末面试题检查理解。准备具体岗位时，可以先从岗位路线确定复习顺序。'}</p>
      <p><Link to="/articles/">浏览文章目录</Link> · <Link to="/interview-roadmaps/">选择岗位路线</Link></p>
      {index.domains.map((domain) => (
        <section key={domain.id} aria-labelledby={`catalog-${domain.id}`}>
          <h2 id={`catalog-${domain.id}`}>{domain.label}</h2>
          {domain.topics.map((topic) => (
            <section key={topic.id}>
              <h3>{topic.label}</h3>
              <ul>
                {topic.articleIds.map((id) => {
                  const article = index.articles[id];
                  const card = index.cards[article.cardIds[0]];
                  if (questions && !card) return null;
                  return <li key={id}>
                    <Link to={questions ? `${article.permalink}#${card.anchor}` : article.permalink}>
                      {questions ? card.question : article.title}
                    </Link>
                    {questions ? `（${article.title}）` : ` · ${article.cardIds.length} 道面试题`}
                  </li>;
                })}
              </ul>
            </section>
          ))}
        </section>
      ))}
    </main>
  );
}
