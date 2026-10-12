import type {InterviewRoadmapData} from '../../components/InterviewRoadmap';

/**
 * Agent 开发面试路线。优先级参考 plans/audits/agentic-development/frequency
 * 中 142 篇 Agent / LLM 应用复盘的考点披露率；没有正文的主题标为建设中。
 */
export const agentInterviewRoadmap: InterviewRoadmapData = {
  id: 'agent',
  label: 'Agent 开发',
  title: 'Agent 开发面试路线',
  introduction:
    '这条路线面向 Agent 开发、大模型应用开发岗位，按考点整理阅读顺序和完成标准。主线是“模型提出动作、程序执行动作”：先掌握模型调用、工具和执行循环，再补 RAG、状态、评估与服务化。题目来自 2025-07 至 2026-09 的公开面试复盘。',
  reviewHint:
    '优先级来自公开复盘中的考点披露率，不代表某家公司一定会问。Agent 岗位同样会追问后端基础，项目经历是面试的主线：每个主题都要能结合自己的项目说明做了什么、为什么这样做、效果怎样验证。',
  phases: [
    {
      id: 'model-and-context',
      title: '模型与上下文',
      topics: [
        {
          id: 'llm-foundations',
          title: '大模型基础',
          depth: 'foundation',
          priority: 'must',
          firstRound: {
            outcomes: ['说明一次模型调用从分词、预填充到逐 Token 解码的过程，以及 Token 用量怎样计算。', '解释 temperature、top-p 的作用和幻觉的成因。'],
            questions: ['一次请求的 Token 用量包括哪些部分？', '什么是模型幻觉，怎样减少？'],
          },
          details: {
            outcomes: ['用自注意力和 KV Cache 解释长上下文为什么慢且贵。', '按输入、生成、输出和业务四层设计幻觉的缓解与兜底。'],
            interviewQuestions: ['KV Cache 为什么能加速推理？前缀缓存与它是什么关系？', '上线后幻觉导致业务出错，怎样兜底？什么情况需要用户确认？'],
          },
          articles: [
            {core: true, title: '大语言模型基础', href: '/docs/ai/llm/llm-basics'},
            {core: true, title: '模型幻觉', href: '/docs/ai/llm/hallucination'},
            {core: false, title: 'Transformer 与注意力机制', href: '/docs/ai/llm/transformer'},
          ],
        },
        {
          id: 'prompt-context',
          title: '提示词与上下文管理',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['写出包含任务、约束、示例和输出格式的提示词，并用评测样例迭代。', '说明每一轮上下文由哪些部分组成，按什么顺序组装。'],
            questions: ['Prompt 中静态内容和动态内容应该怎样排列？', '结构化输出怎样保证可解析？'],
          },
          details: {
            outcomes: ['上下文超出窗口时，选择截断、摘要或外部存储，并说明保留什么。', '用渐进式披露控制工具和文档的上下文开销。'],
            interviewQuestions: ['上下文过长时有哪些压缩策略？怎样避免压缩后丢失用户的重要需求？', '什么时候触发压缩？工具结果怎样压缩？'],
          },
          articles: [
            {core: true, title: '提示词工程', href: '/docs/ai/prompting/prompt-engineering'},
            {core: true, title: '上下文管理', href: '/docs/ai/prompting/context-management'},
            {core: false, title: '上下文压缩', href: '/docs/ai/prompting/context-compaction'},
          ],
        },
        {
          id: 'llm-api',
          title: '模型 API 与流式输出',
          depth: 'mechanism',
          priority: 'common',
          details: {
            outcomes: ['说明一次调用的消息结构、结束原因、错误类型和重试条件。', '用 SSE 实现流式输出，处理中断、取消和最终状态。'],
            interviewQuestions: ['流式输出是怎样实现的？SSE 返回的数据结构是什么？', '切换到另一家模型提供方，提示词和工具调用需要改哪些地方？'],
          },
          articles: [
            {core: true, title: 'LLM API（消息、角色、错误与用量）'},
            {core: true, title: '流式输出与 SSE'},
          ],
        },
      ],
    },
    {
      id: 'tools-and-agents',
      title: '工具与 Agent 架构',
      topics: [
        {
          id: 'tool-calling',
          title: '工具调用与 MCP',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['讲清 Function Calling 中模型和程序各自负责什么，工具结果怎样回到上下文。', '说明 MCP 的 Host、Client、Server 分工，以及与直接调用 API 的区别。'],
            questions: ['Function Calling 的完整调用链是什么？', 'MCP 和 Function Calling 有什么区别？'],
          },
          details: {
            outcomes: ['设计参数明确、错误可恢复的工具契约，处理工具很多时的选择问题。', '区分 Skill、MCP 和 CLI 工具的适用场景。'],
            interviewQuestions: ['怎样减少工具调用幻觉，保证参数可靠？', 'Skill 和 Tool 有什么区别？为什么 Skill 能减少 Token 消耗？'],
          },
          articles: [
            {core: true, title: 'Function Calling', href: '/docs/ai/tools/function-calling'},
            {core: true, title: 'MCP', href: '/docs/ai/tools/mcp'},
            {core: false, title: 'Agent Skills', href: '/docs/ai/tools/agent-skills'},
          ],
        },
        {
          id: 'agent-loop',
          title: '工作流与执行循环',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['判断一个任务该用固定工作流还是 Agent。', '实现有停止条件和预算的 ReAct 循环。'],
            questions: ['Workflow 和 Agent 有什么区别，怎样选择？', '怎样避免 Agent 陷入无限循环？'],
          },
          details: {
            outcomes: ['比较 ReAct 与 Plan-and-Execute 的适用场景和失败处理。'],
            interviewQuestions: ['ReAct 和 Plan-and-Execute 的核心差异是什么？开放场景中途新增子任务时谁更合适？'],
          },
          articles: [
            {core: true, title: '工作流与 Agent', href: '/docs/ai/agents/workflow-vs-agent'},
            {core: true, title: 'Agent 执行循环', href: '/docs/ai/agents/agent-loop'},
          ],
        },
        {
          id: 'harness-multi-agent',
          title: 'Harness 与多 Agent',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['说明模型之外的上下文、工具、状态、权限和验证模块怎样协作。', '用质量、耗时和成本证据说明多 Agent 拆分是否值得。'],
            interviewQuestions: ['如果让你从零设计一个 Coding Agent，你会怎么设计？', '多 Agent 怎样划分职责、隔离上下文和汇总结果？'],
          },
          articles: [
            {core: true, title: 'Agent Harness', href: '/docs/ai/agents/harness'},
            {core: true, title: '多 Agent 协作', href: '/docs/ai/agents/multi-agent'},
          ],
        },
        {
          id: 'agent-frameworks',
          title: '框架选型',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['说明 LangChain、LangGraph 和手写实现的区别，结合项目解释选择。', '讲清 LangGraph 的 State、节点、边、检查点和中断恢复。'],
            interviewQuestions: ['为什么自研 Agent 而不用成熟框架？', 'LangGraph 节点返回后是覆盖还是合并？中断后怎样恢复？'],
          },
          articles: [{core: true, title: 'Agent 框架选型', href: '/docs/ai/development/agent-frameworks'}],
        },
      ],
    },
    {
      id: 'rag',
      title: 'RAG',
      topics: [
        {
          id: 'rag-pipeline',
          title: 'RAG 链路',
          depth: 'mechanism',
          priority: 'must',
          firstRound: {
            outcomes: ['串起离线索引和在线检索、生成的完整链路。', '说明切分粒度和 Embedding 检索的原理与取舍。'],
            questions: ['请完整介绍一下 RAG 的流程。', 'RAG 和微调应该怎样选择？'],
          },
          details: {
            outcomes: ['用混合检索和重排序提升召回质量，解释 RRF 与 Rerank 的作用。', '处理知识库更新、删除和旧文档仍被召回的问题。'],
            interviewQuestions: ['BM25 和向量检索各自擅长什么？怎样融合？', 'HNSW 的原理是什么？'],
          },
          articles: [
            {core: true, title: '检索增强生成（RAG）', href: '/docs/ai/rag/'},
            {core: true, title: '文档解析与切分', href: '/docs/ai/rag/chunking'},
            {core: true, title: 'Embedding 与向量检索', href: '/docs/ai/rag/embedding-vector-search'},
            {core: false, title: '混合检索与重排序', href: '/docs/ai/rag/hybrid-search-rerank'},
          ],
        },
        {
          id: 'rag-advanced',
          title: '查询改写、引用与进阶 RAG',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: ['用查询改写和多路召回处理口语化、多意图的问题。', '要求回答附带引用，证据不足时拒答。', '说明 GraphRAG、Agentic RAG 适合的问题和构建代价。'],
            interviewQuestions: ['如何润色 query，目的是什么？', '为什么要用到图数据库？GraphRAG 解决什么问题？'],
          },
          articles: [
            {core: true, title: '查询改写'},
            {core: true, title: '引用与证据'},
            {core: false, title: 'GraphRAG 与 Agentic RAG'},
          ],
        },
      ],
    },
    {
      id: 'production',
      title: '状态、评估与上线',
      topics: [
        {
          id: 'agent-evaluation',
          title: '评估与观测',
          depth: 'scenario',
          priority: 'must',
          firstRound: {
            outcomes: ['为 Agent 定义成功标准和指标，构建评测集。', '用轨迹把 bad case 归因到模型、检索、工具或运行时。'],
            questions: ['怎样评估 Agent 系统的整体效果？', '怎样对 Bad Case 做归因？'],
          },
          details: {
            outcomes: ['分层评估 RAG 的检索与生成。', '用 LLM 评审开放式任务，并处理评审模型的偏差。'],
            interviewQuestions: ['RAG 系统怎样评测？', '用 LLM 评估结果，评估模型本身也有幻觉怎么办？'],
          },
          articles: [
            {core: true, title: 'Agent 评估', href: '/docs/ai/evaluation/agent-evaluation'},
            {core: false, title: 'RAG 评估', href: '/docs/ai/evaluation/rag-evaluation'},
          ],
        },
        {
          id: 'state-memory',
          title: '状态与记忆',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['说明检查点、恢复和副作用去重，让长任务在中断后继续。', '设计短期与长期记忆的写入、检索、更新和遗忘。'],
            interviewQuestions: ['Agent 执行中断后怎样恢复？重试时怎样避免重复执行副作用？', '一个完整的记忆系统应该怎样设计？'],
          },
          articles: [
            {core: true, title: 'Agent 状态与持久化执行', href: '/docs/ai/state/durable-execution'},
            {core: true, title: 'Agent 记忆', href: '/docs/ai/state/memory'},
          ],
        },
        {
          id: 'serving-cost',
          title: '延迟、成本与服务扩展',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['把端到端延迟拆到模型轮次、工具和排队，按收益顺序优化。', '控制 Token 成本，设计并发限制、限流和降级。'],
            interviewQuestions: ['Agent 链路包含 3 个工具且请求频繁，整体延迟高，怎样优化？', '为什么要限制 Agent 的并发？'],
          },
          articles: [{core: true, title: '延迟、成本与服务扩展', href: '/docs/ai/safety/latency-cost-scaling'}],
        },
        {
          id: 'agent-safety',
          title: '安全与权限',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['识别直接和间接提示注入，说明防护的层次。', '按风险对工具分级授权，在沙箱中执行代码和命令。'],
            interviewQuestions: ['网页和文档中的间接提示注入怎样防护？', 'Agent 执行危险操作前怎样做权限控制？'],
          },
          articles: [
            {core: true, title: '提示注入', href: '/docs/ai/safety/prompt-injection'},
            {core: true, title: '工具授权与执行沙箱', href: '/docs/ai/safety/tool-authorization-sandbox'},
            {core: false, title: 'AI 数据安全（敏感数据、检索权限、记忆污染）'},
          ],
        },
        {
          id: 'agent-design-cases',
          title: '系统设计题',
          depth: 'scenario',
          priority: 'common',
          details: {
            outcomes: ['从需求、模块、状态、权限、评估和成本六个方面展开一道 Agent 设计题。'],
            interviewQuestions: ['从零设计一个 Coding Agent。', '设计一个企业知识库问答系统，怎样处理权限和文档更新？', '设计一个客服 Agent，工具超时、重复请求和审批拒绝怎样处理？'],
          },
          articles: [
            {core: true, title: 'Agent Harness（含 Coding Agent 设计题）', href: '/docs/ai/agents/harness'},
            {core: true, title: '设计知识库问答系统'},
            {core: true, title: '设计客服 Agent'},
          ],
        },
      ],
    },
    {
      id: 'engineering',
      title: '工程基础与 AI 辅助开发',
      topics: [
        {
          id: 'backend-foundations',
          title: '后端基础追问',
          depth: 'foundation',
          priority: 'common',
          details: {
            outcomes: ['Agent 服务上线后仍是后端系统：能回答缓存、限流、幂等和网络连接的基础问题。'],
            interviewQuestions: ['Redis 为什么快？缓存和数据库怎样保持一致？', '限流有哪些算法？消息重复消费怎样处理？'],
          },
          articles: [
            {core: true, title: 'Redis 基础', href: '/docs/basic-knowledge/nosql/redis/'},
            {core: true, title: '缓存模式与一致性', href: '/docs/basic-knowledge/nosql/redis/cache-patterns-consistency'},
            {core: true, title: '限流与容量保护', href: '/docs/system-design/reliability/rate-limiting-capacity-protection'},
            {core: false, title: '幂等消费、重复与乱序', href: '/docs/basic-knowledge/middleware/idempotent-consumption-order-duplicates'},
            {core: false, title: 'HTTP 版本、连接复用与超时', href: '/docs/basic-knowledge/network/http-versions-connection-reuse-timeouts'},
          ],
        },
        {
          id: 'python-basics',
          title: 'Python 与异步编程',
          depth: 'foundation',
          priority: 'optional',
          details: {
            outcomes: ['用 asyncio 并发调用模型和工具，控制并发数和超时。', '用类型注解和 Pydantic 定义工具参数和结构化输出。'],
            interviewQuestions: ['asyncio 和多线程有什么区别？GIL 对 Agent 服务有什么影响？', '给 100 个任务，怎样把并发控制在 3 以内？'],
          },
          articles: [
            {core: true, title: 'Python 并发与 asyncio'},
            {core: true, title: '类型注解与 Pydantic'},
          ],
        },
        {
          id: 'ai-assisted-development',
          title: 'AI 辅助开发',
          depth: 'scenario',
          priority: 'optional',
          details: {
            outcomes: ['说明使用编码 Agent 完成任务的流程：需求、上下文、迭代、验证和评审。', '调试 AI 生成的代码，维护仓库指令文件。'],
            interviewQuestions: ['你平时怎样用 AI 写代码？怎样保证生成代码的质量？', 'AGENTS.md 这类规则文件应该写什么？'],
          },
          articles: [
            {core: true, title: 'AI 辅助开发', href: '/docs/ai/development/ai-assisted-development'},
            {core: true, title: 'AI 代码调试', href: '/docs/ai/development/ai-code-debugging'},
            {core: false, title: '仓库指令', href: '/docs/ai/development/repository-instructions'},
            {core: false, title: '编码 Agent 评测', href: '/docs/ai/development/coding-agent-evaluation'},
          ],
        },
      ],
    },
  ],
};
