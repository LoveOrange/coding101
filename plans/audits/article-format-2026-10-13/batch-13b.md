# 文章格式审计：batch-13b

日期：2026-10-13。实际分支：`content/ai-batch-13`。

本批完成指定 12 篇文章的表达优化，新增 13 道本站原理自测。原有 43 道卡片全部保留。未提交 git。

## 工作区与分支

任务指定 `content/article-format-2026-10-13`。该分支已被 `coding101` 工作树占用。当前工作区为 `coding101-ai`，使用 `content/ai-batch-13`。开始时两个分支均指向 `0b7400bbe3d9ff8515dd82248c4ba82a49df8bac`。工作树当时干净。

已询问分支选择，执行期间未收到答复。随后说明按当前隔离工作树完成内容。没有切换或改动另一个工作树，也没有提交、合并或改写历史。分支差异保留为人工确认项。

## 表达与标识

- 完整阅读根目录 AGENTS.md、batch-1b 记录和指定两篇样例。
- 正文按确定结论、具体条件和短句重写。逐段通读后，补查标题、表格及考察重点。
- 普通二、三级标题使用概念名称。面试题保留问句，所有二、三级标题均有显式锚点。
- 保留 knowledge.id、全部已有显式锚点和卡片 ID。公司来源注释与公司归属逐项对照基线保留。
- 新增题目采用统一自测注释。未添加公司归属，也未删除或合并旧卡片。
- 面试核心保留 3—5 条可复述结论。参考回答首句直接回答，参数使用具体名称或取值。
- API 与持续更新文档以 2026-10-13 为核对日期。pgvector 迭代扫描明确注明从 0.8.0 起支持。
- 参考资料整理为连续列表。旧的厂商文档链接更新到当前文档域名。

## 每篇改动与依据

### 1. 模型幻觉

文件：[hallucination.mdx](../../../docs/ai/llm/hallucination.mdx)。

重写幻觉定义与分层校验。补入材料忠实度、事实正确性和来源冲突。置信信号改为需要校准的工程输入。参考回答直接说明证据、授权与实际状态。

新增题：`faithfulness-truth`。

修正：“模型没有不知道的机制”和“训练目标不惩罚编造”的绝对表述。删除低温度可以保障事实正确的暗示。引用存在与引用支持结论分开核验。

依据：

- [Why Language Models Hallucinate（OpenAI）](https://openai.com/index/why-language-models-hallucinate/)
- [Anthropic：Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

人工确认：无技术阻塞项。

### 2. 大语言模型基础

文件：[llm-basics.mdx](../../../docs/ai/llm/llm-basics.mdx)。

解释 Token 与用量明细，补充推理预算和未完成状态。区分预填充、解码、网络与排队延迟。训练阶段保留预训练、SFT、RLHF 与 DPO 的分工。

新增题：`reasoning-budget`。

修正：缓存命中量属于输入总量，推理量属于输出总量。修正“每轮必须重发历史”和“服务不保留状态”。删除词表越大就越省 Token 的推断。首 Token 延迟不再只归因于预填充。

依据：

- [OpenAI：Responses usage](https://developers.openai.com/api/reference/resources/responses/methods/create)
- [OpenAI：Reasoning models](https://developers.openai.com/api/docs/guides/reasoning)
- [OpenAI：Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)
- [Hugging Face：Generation strategies](https://huggingface.co/docs/transformers/generation_strategies)
- [Direct Preference Optimization](https://arxiv.org/abs/2305.18290)

人工确认：无技术阻塞项。

### 3. Transformer 与注意力机制

文件：[transformer.mdx](../../../docs/ai/llm/transformer.mdx)。

补入 RoPE、MHA/MQA/GQA 和 FlashAttention。说明 Q/K/V 形状、缩放假设和旧 Q 无需缓存的原因。保留 KV 容量估算，分别说明预填充与单步解码成本。

新增题：`position-rope`、`flash-attention`。

修正：所有 Transformer 都使用前置归一化的表述。区分原始 Transformer 与 Llama 结构。修正 KV Cache 让注意力变成常量成本的暗示。区分平方计算与中间矩阵存储。长上下文位置效应限定到实验条件。

依据：

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [RoFormer：Rotary Position Embedding](https://arxiv.org/abs/2104.09864)
- [LLaMA](https://arxiv.org/abs/2302.13971)
- [GQA: Training Generalized Multi-Query Transformer Models](https://arxiv.org/abs/2305.13245)
- [FlashAttention](https://arxiv.org/abs/2205.14135)
- [Hugging Face：Cache strategies](https://huggingface.co/docs/transformers/main/en/kv_cache)

人工确认：无技术阻塞项。

### 4. 上下文压缩

文件：[context-compaction.mdx](../../../docs/ai/prompting/context-compaction.mdx)。

明确窗口、摘要、工具清理与外部归档的代价。补入消息配对、未完成调用和副作用重放边界。保留约束原句、产物版本及已验证状态。

新增题：`compaction-tool-pairs`。

修正：“压缩一定丢信息”的笼统前提。摘要损失与去重、归档分别说明。旧工具结果优先从归档读取，避免盲目重跑写操作。

依据：

- [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic：Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing)
- [LangChain：Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)

人工确认：无技术阻塞项。

### 5. 上下文管理

文件：[context-management.mdx](../../../docs/ai/prompting/context-management.mdx)。

区分事实可靠性与指令权限。补入预算、状态冲突、授权撤回和跨会话隔离。原 SDK 风格片段改为明确的组装示意。

新增题：`context-trust-freshness`。

修正：删除将外部记忆直接拼入 system 的示范。缓存命中还受长度、期限和路由影响。明确变化位置之前的共同前缀仍可复用。

依据：

- [Anthropic：Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic：Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [OpenAI：Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- [Anthropic：Mitigate prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)

人工确认：无技术阻塞项。

### 6. 提示词工程

文件：[prompt-engineering.mdx](../../../docs/ai/prompting/prompt-engineering.mdx)。

按任务、示例、结构化输出和评测组织正文。补入拒答、截断、流式解析及开发集与留出集。扩充现有 structured-output、prompt-tuning 的回答。

新增题：无。补充内容进入已有卡片，避免重复问法。

修正：“传入工具 Schema 就保证参数结构”的表述。明确严格模式、支持的 Schema 子集和业务校验。推理模型与显式 CoT 的关系不再一概而论。

依据：

- [OpenAI：Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI：Reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)
- [OpenAI：Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)

人工确认：无技术阻塞项。

### 7. 文档解析与切分

文件：[chunking.mdx](../../../docs/ai/rag/chunking.mdx)。

补充长度单位、前缀预算、原文区间与跨块证据。父块回取检查权限和版本。表格保留表头、单位与合并单元格关系。

新增题：`cross-chunk-evidence`。

修正：删除通用的 10%–20% 重叠建议。修正输入超限必然截断的说法。切分方案变化时，指标按原文证据对齐。生成的上下文说明与原始引文分开保存。

依据：

- [LangChain：Text splitters](https://docs.langchain.com/oss/python/integrations/splitters)
- [LangChain：Split by tokens](https://docs.langchain.com/oss/python/integrations/splitters/split_by_token)
- [LlamaIndex：Node parsers](https://developers.llamaindex.ai/python/framework/module_guides/loading/node_parsers/)
- [Anthropic：Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval)
- [OpenAI：Embeddings input limits](https://developers.openai.com/api/reference/resources/embeddings/methods/create)
- [Azure Document Intelligence 4.0：Layout model](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0)

人工确认：无技术阻塞项。

### 8. Embedding 与向量检索

文件：[embedding-vector-search.mdx](../../../docs/ai/rag/embedding-vector-search.mdx)。

明确兼容嵌入空间和非对称编码。补入过滤后候选不足、迭代扫描、部分索引与精确搜索对照。保留单位向量距离关系和 HNSW 参数分工。

新增题：`filtered-ann`。

修正：查询与文档必须共享同一编码器权重的暗示。删除百万数据必用 ANN、内积总是最快等结论。HNSW 的存储、删除与复杂度不再写成通用保证。

依据：

- [pgvector](https://github.com/pgvector/pgvector)
- [hnswlib：Algorithm parameters](https://github.com/nmslib/hnswlib/blob/master/ALGO_PARAMS.md)
- [Faiss：MetricType and distances](https://github.com/facebookresearch/faiss/wiki/MetricType-and-distances)
- [Sentence Transformers：Asymmetric semantic search](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html)
- [Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)

人工确认：无技术阻塞项。

### 9. 混合检索与重排序

文件：[hybrid-search-rerank.mdx](../../../docs/ai/rag/hybrid-search-rerank.mdx)。

解释词项分析、分数尺度与 RRF。补入召回、重排、最终上下文的独立预算。说明去重、多跳证据覆盖、阈值校准与降级评估。

新增题：`candidate-budget`。

修正：删除混合检索、交叉编码器或大模型重排必然更准的保证。删除统一的候选数量和最终块数。RRF 仍需选择窗口与平滑常数，重排无法补回候选集外证据。

依据：

- [Elasticsearch：Reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)
- [Elasticsearch：BM25 similarity](https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity)
- [Sentence Transformers：Retrieve and re-rank](https://www.sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)
- [Sentence Transformers：Cross-Encoders](https://sbert.net/examples/cross_encoder/applications/README.html)

人工确认：无技术阻塞项。

### 10. 检索增强生成（RAG）

文件：[rag.mdx](../../../docs/ai/rag/rag.mdx)。

保留链路图，切分和检索细节改为相邻文章引用。补入查询改写、多跳停止条件、版本发布与权限缓存。说明托管检索删除的最终一致性。

新增题：`query-rewrite-multihop`。

修正： RAG 只管知识、微调只管行为的绝对分工。将“先删旧再写新”改为先准备新版本再切换。版本切换作为应用策略呈现，不承诺跨系统原子性。RAG 的检索数据源包含结构化系统。

依据：

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- [OpenAI：Retrieval](https://developers.openai.com/api/docs/guides/retrieval)
- [LangChain：Retrieval architectures](https://docs.langchain.com/oss/python/langchain/retrieval)
- [Elasticsearch：Aliases](https://www.elastic.co/docs/manage-data/data-store/aliases)
- [OpenAI：Optimizing LLM accuracy](https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy)

人工确认：无技术阻塞项。

### 11. Agent 评估

文件：[agent-evaluation.mdx](../../../docs/ai/evaluation/agent-evaluation.mdx)。

补入 pass@k/pass^k 的独立性条件和逐任务聚合。说明开发集、留出集、环境重置、实际状态验收和影子写入隔离。归因考虑失败严重程度。

新增题：`repeatability-metrics`、`eval-isolation`。

修正：重复次数能替代任务覆盖的暗示。交换答案顺序用于检测偏差，不承诺消除偏差。更换评审模型仍需人工校准。工具轨迹允许多种有效路径。

依据：

- [Anthropic：Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [OpenAI：Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Evaluating Large Language Models Trained on Code](https://arxiv.org/abs/2107.03374)
- [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685)

人工确认：无技术阻塞项。

### 12. RAG 评估

文件：[rag-evaluation.mdx](../../../docs/ai/evaluation/rag-evaluation.mdx)。

补入 Recall、Precision、MRR、NDCG 公式与例子。明确标注单位、重复块、无证据样本、误拒和引用覆盖率。增加无检索、实际检索、理想证据对照。

新增题：`oracle-context`。

修正：区分 Recall 与 Hit，明确指标分母。修正所有指标都依赖参考答案的说法。Faithfulness 与 Answer Relevancy 使用不同计算方法。删除仅凭检索高分就断定生成有错的结论。

依据：

- [Ragas：Faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/)
- [Ragas：Answer Relevancy](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/answer_relevance/)
- [Ragas：Context Recall](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/)
- [Stanford IR Book：Evaluation of ranked retrieval results](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html)
- [OpenAI：Optimizing LLM accuracy](https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy)

人工确认：无技术阻塞项。

## 相邻文章分工

- 大语言模型基础负责 Token、调用与采样；Transformer 负责计算与缓存。
- 上下文管理负责选择、顺序和信任边界；上下文压缩负责历史缩短与恢复。
- RAG 总览负责链路与知识生命周期；切分、向量检索和重排分别展开。
- Agent 评估负责通用评分与运行环境；RAG 评估负责证据与答案指标。

相邻机制缩为结论加链接。链接修复均在本批 12 篇内完成，未修改其他文章或 src/data。

## 验证

已完成逐段通读，并额外检查标题与表格的长句。两处旧隐式标题引用已更新为中文显式锚点。综合题关联到至少两个独立章节或文章。

要求的检查均通过：

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/ai/llm/hallucination.mdx \
  docs/ai/llm/llm-basics.mdx \
  docs/ai/llm/transformer.mdx \
  docs/ai/prompting/context-compaction.mdx \
  docs/ai/prompting/context-management.mdx \
  docs/ai/prompting/prompt-engineering.mdx \
  docs/ai/rag/chunking.mdx \
  docs/ai/rag/embedding-vector-search.mdx \
  docs/ai/rag/hybrid-search-rerank.mdx \
  docs/ai/rag/rag.mdx \
  docs/ai/evaluation/agent-evaluation.mdx \
  docs/ai/evaluation/rag-evaluation.mdx
npm run build
git diff --check
```

- 严格检查：12 篇，0 篇结构问题，0 篇文风提示。
- 构建退出码为 0，Docusaurus 成功生成静态文件。
- 文档链接、复习资源、岗位与面经数据检查通过。
- 稳定性比对通过：12 个 knowledge.id 与所有旧锚点保留。
- 卡片从 43 道增至 56 道，旧卡片 ID 和公司注释原样保留。
- 标题编号连续，显式锚点无重复，参考回答默认收起。
- Python 校验了 RRF 数值和检索指标例子。
- 同时验证单位向量距离关系与独立尝试成功概率。
- JSON Schema 示例能够解析，字段及 required 一致。
- 未运行 Docker 或模型性能实验，本批不新增基准结果。

全站格式检查仍报告本批之外的 6 篇结构问题、172 篇文风提示。这些是非阻断项，未扩大范围修改。构建另有原有博客作者、摘要与 Node localStorage 提示。共享 node_modules 的 webpack 缓存写入受到限制。缓存提示未影响构建，未修改外部权限或配置。Docusaurus 更新检查提示也已保留。

## 未完成与人工确认

内容无已知阻塞项。分支与任务指定不同，需要用户确认后续整合位置。本批没有性能基准或模型调用实验。文中数值例子仅用于公式说明，不作为效果承诺。
