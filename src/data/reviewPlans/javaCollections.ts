import type {ReviewPlan} from '../../components/Review/types';

export const javaCollectionsReview: ReviewPlan = {
  id: 'java-collections',
  title: 'Java 集合',
  href: '/docs/basic-knowledge/java/collections/',
  routeHref: '/java-interview-roadmap/?round=first#java-collections',
  steps: [
    {
      id: 'collections-selection',
      title: 'Java 集合框架',
      href: '/docs/basic-knowledge/java/collections/collection-interface-selection',
      scope: '先读第 1—6 节，掌握接口语义与基本选型。',
      outcome: '根据顺序、去重、键值查找和取出规则选择容器，并说明依据。',
      question: 'List、Set、Map 分别适合什么场景？',
      questionAnchor: 'review-question',
    },
    {
      id: 'collections-arraylist',
      title: 'ArrayList',
      href: '/docs/basic-knowledge/java/collections/arraylist-growth-memory-locality',
      scope:
        '先读第 1—5 节和第 7 节，掌握存储、操作成本和线程边界；subList 留到后续。',
      outcome:
        '解释随机访问、追加、扩容和中间插入的成本，区分单次操作与摊销复杂度。',
      question: 'ArrayList 怎样扩容，指定初始容量有什么作用？',
      questionAnchor: 'review-question',
    },
    {
      id: 'collections-hashmap',
      title: 'HashMap',
      href: '/docs/basic-knowledge/java/collections/hashmap-structure-lookup-path',
      scope:
        '先读第 1—5 节，掌握查找、键相等、冲突、扩容和使用边界；具体阈值与位运算推导后续再看。',
      outcome:
        '沿 put/get 解释定位与比较，说明键的相等性、扩容原因和共享修改限制。',
      question: '说明 HashMap 的 put 和 get 路径。',
      questionAnchor: 'review-question',
    },
  ],
};
