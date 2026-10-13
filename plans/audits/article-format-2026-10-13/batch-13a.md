# 文章格式审计：batch-13a

日期：2026-10-13。实际分支：`content/ai-batch-13`。

本批完成指定 17 篇 AI 应用与 Agent 开发文章。新增 15 道本站自测，保留原有 57 道卡片。未提交 git。

工作区分支与任务指定分支不同。指定的 `content/article-format-2026-10-13` 已由另一工作树使用。开始时已询问并说明差异，随后在当前工作区继续。没有切换分支或移动提交。

## 表达与标识

- 完整阅读 AGENTS.md、batch-1b 及两篇指定样例。
- 每篇开头明确范围，重复机制改为一句结论加链接。
- 面试核心改为可直接复述的结论。参考回答先回答问题，再解释机制与边界。
- 逐段通读正文与参考回答，拆开长句。删除笼统限定、连续否定与来源元叙述。
- 普通二、三级标题改为概念或机制名称。已有显式锚点保持不变，原隐式标题补中文锚点。面试题保留完整问题与英文 ID。
- 与 HEAD 比对：17 篇的 knowledge.id、全部已有显式锚点、57 个已有卡片 ID 均保留。公司来源注释保持原文，没有删除或合并卡片。
- 新题统一使用本站自测注释，未新增公司归属。参考资料均为连续列表。
- 变化较快的接口写明核对日期。MCP 固定到 2025-11-25 规范；LangChain 按 v1 说明。

## 每篇改动与依据

### 1. Agent 执行循环

文件：[agent-loop.mdx](../../../docs/ai/agents/agent-loop.mdx)。

负责循环状态、工具反馈与停止条件。补入最终结果校验，区分模型结束输出与任务验收。预算、重复失败和主动停止分别说明。伪代码的轮数明确为示例配置。

新增题：`final-answer-validation`。

依据：[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)、[ReAct](https://arxiv.org/abs/2210.03629)、[Reflexion](https://arxiv.org/abs/2303.11366)、[Function calling](https://platform.openai.com/docs/guides/function-calling)。

修正：删除每一步必须使用强模型的泛化结论。规划与反思的收益改为待评测的工程选择。模型没有请求工具时，仍需验收结果。

人工确认：无。

### 2. Agent Harness

文件：[harness.mdx](../../../docs/ai/agents/harness.mdx)。

负责运行环境、任务状态、验证与 Hook。长任务通过外部记录衔接。快照与提交受当前授权约束。补入 Hook 的事件匹配及失败处理。

新增题：`hook-enforcement`。

依据：[Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)、[Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)、[Hooks reference](https://code.claude.com/docs/en/hooks)。

修正：Hook 的拦截效果取决于事件和返回语义。`PreToolUse` 的退出码 2 可阻止调用；`PostToolUse` 无法撤销已发生的动作。状态与工具反馈也会影响上下文。

人工确认：无。

### 3. 多 Agent 协作

文件：[multi-agent.mdx](../../../docs/ai/agents/multi-agent.mdx)。

负责角色拆分、任务分配与结果合并。补入必要任务和可选任务的失败策略。使用任务 ID 与尝试编号识别过期结果。共享目录的写入冲突单独说明。

新增题：`partial-results`。

依据：[Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)、[LangChain Multi-agent](https://docs.langchain.com/oss/python/langchain/multi-agent)、[A2A](https://a2a-protocol.org/latest/)。

修正：移除多 Agent 必然增加延迟或固定倍数消耗的断言。上下文独立不保证工作目录隔离。部分失败处理属于工程设计，未表述为协议自动保证。

人工确认：无。

### 4. 工作流与 Agent

文件：[workflow-vs-agent.mdx](../../../docs/ai/agents/workflow-vs-agent.mdx)。

负责控制流边界与选择条件。说明固定编排也可使用模型路由。沿确定流程、动态决策和混合编排组织正文。原有三题已覆盖当前主题，未重复加题。

新增题：无。

依据：[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)、[Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents)。

修正：有条件分支不等于 Agent。删除缺乏依据的业务占比及固定步骤数量。编排者分配子任务也可属于预定义工作流。

人工确认：无。

### 5. Agent 框架

文件：[agent-frameworks.mdx](../../../docs/ai/development/agent-frameworks.mdx)。

标题改为名词“Agent 框架”。负责框架职责、图执行与选择维度。补入并行 State 更新和 reducer。说明 `add_messages` 按消息 ID 更新的行为。中断恢复细节引用持久执行文章。

新增题：`parallel-state-reducer`。

依据：[LangChain v1 migration](https://docs.langchain.com/oss/python/migrate/langchain-v1)、[Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api)、[Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)、[Spring AI Tool Calling](https://docs.spring.io/spring-ai/reference/api/tools.html)。框架定位另保留对应官方文档。

修正：区分 v1 `create_agent`、Core 与 `langchain-classic`。消息 reducer 并非只追加。删除缺少核验依据的发布日和生命周期判断，也不把厂商 SDK 简化为只能接自家模型。

人工确认：无。本文未进行各框架的安装与集成测试。

### 6. AI 辅助开发

文件：[ai-assisted-development.mdx](../../../docs/ai/development/ai-assisted-development.mdx)。

负责需求拆分、上下文准备、迭代与验收。保留 LRU 示例，明确验收和代码审查的职责。调试、仓库指令和评测引用相邻文章。现有五题继续覆盖本篇范围。

新增题：无。

依据：[Claude Code Best practices](https://code.claude.com/docs/en/best-practices)、[Context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)、[Java 21 LinkedHashMap](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/LinkedHashMap.html)。

修正：访问顺序 LRU 的 `get` 会更新顺序。不能仅因它是读取接口，就建议用共享读锁替换互斥保护。

人工确认：无。

### 7. AI 代码调试

文件：[ai-code-debugging.mdx](../../../docs/ai/development/ai-code-debugging.mdx)。

负责复现、假设、最小修复与回归。补入修复前失败、修复后通过的对照。区分修复效果和已有行为覆盖。恢复方案保留用户改动。

新增题：`regression-before-after`。

依据：[Claude Code Best practices](https://code.claude.com/docs/en/best-practices)、[SWE-bench Evaluation](https://www.swebench.com/SWE-bench/guides/evaluation/)。

修正：取消直接退回上一个通过版本的笼统建议。测试通过只说明已验证范围，不能证明所有行为正确。

人工确认：无。

### 8. 编码 Agent 评测

文件：[coding-agent-evaluation.mdx](../../../docs/ai/development/coding-agent-evaluation.mdx)。

负责任务集、隔离环境、判分与成本指标。补入 `pass@k` 与 `pass^k`。公式明确独立同分布假设。区分开发集、留出集及环境、Agent、判分器失败。

新增题：`pass-at-k-vs-pass-power-k`。

依据：[Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)、[SWE-bench Evaluation](https://www.swebench.com/SWE-bench/guides/evaluation/)、[DORA metrics](https://dora.dev/guides/dora-metrics-four-keys/)。

修正：区分可见仓库测试与保密验收材料。新数据或内部数据只能降低污染风险。交付指标不直接证明 AI 的因果贡献。预算比较同时约束质量门槛。

人工确认：无。没有新增基准得分或性能倍数。

### 9. 仓库指令

文件：[repository-instructions.mdx](../../../docs/ai/development/repository-instructions.mdx)。

负责稳定规则、加载范围与变更验证。补入 Codex 从项目根目录到当前目录的发现顺序。说明全局文件、`AGENTS.override.md` 优先级和每目录单文件规则。记录默认 `project_doc_max_bytes` 为 32 KiB。

新增题：`instruction-loading`。

依据：[AGENTS.md](https://agents.md/)、[Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)。产品行为核对于 2026-10-13。

修正：文件存在不保证工具已加载。上下文压缩也不自动保证所有规则保留。跨工具协作需要分别验证发现规则。

人工确认：无。

### 10. Agent Skills

文件：[agent-skills.mdx](../../../docs/ai/tools/agent-skills.mdx)。

负责技能结构、渐进加载、脚本和评测。补入命中、相邻负例、无关任务的选择测试。执行成功率与选择准确性分别测量。

新增题：`skill-eval-cases`。

依据：[Agent Skills Specification](https://agentskills.io/specification)、[OpenAI Skill Evals](https://developers.openai.com/blog/eval-skills)、[OpenAI Skills](https://developers.openai.com/api/docs/guides/tools-skills)、[Build skills](https://developers.openai.com/codex/skills)。

修正：元数据并非统一注入系统提示。OpenAI Responses 的说明按用户提示上下文表述。删除固定 Token 数承诺。技能文件不授予执行权限，脚本内容也可被读取。

人工确认：无。

### 11. Function Calling

文件：[function-calling.mdx](../../../docs/ai/tools/function-calling.mdx)。

负责消息关联、工具契约和错误处理。补入严格 Schema、流式参数完成事件及调用依赖。示例保留 assistant 原响应，并逐一回传执行结果。

新增题：`strict-streaming-calls`。

依据：[OpenAI Function calling](https://platform.openai.com/docs/guides/function-calling)、[Anthropic Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)、[Writing effective tools](https://www.anthropic.com/engineering/writing-tools-for-agents)。接口核对于 2026-10-13。

修正：区分 Anthropic、Responses 和 Chat Completions 的字段。严格模式仍需业务授权；全部属性进入 `required`，可空值用 `null`。流式片段需收齐后再执行。`parallel_tool_calls=false` 将同轮函数调用限制为零或一次。

人工确认：无。代码是消息包装片段，未调用真实模型 API。

### 12. MCP

文件：[mcp.mdx](../../../docs/ai/tools/mcp.mdx)。

负责协议角色、能力协商、传输和安全。补入协议错误与工具错误、会话失效与重连。按 2025-11-25 规范说明分页、列表变更通知及版本头。

新增题：`mcp-errors-reconnect`。

依据：[MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)、[Transports](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)、[Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)、[Authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)、[Roots](https://modelcontextprotocol.io/specification/2025-11-25/client/roots)。

修正：校正客户端能力的方向。Roots 只表达范围，不能替代沙箱。Streamable HTTP 仍可使用 SSE；GET 可返回 405。断线不等于取消，重连不保证业务恰好执行一次。HTTP 授权按 OAuth 2.1 框架说明，禁止无条件透传令牌。

人工确认：无。未运行 MCP 客户端与服务端互操作实验。

### 13. Agent 状态与持久化执行

文件：[durable-execution.mdx](../../../docs/ai/state/durable-execution.mdx)。

负责检查点、恢复和外部副作用。补入 LangGraph 中断后的节点重启。说明幂等键绑定业务动作和参数。结果未知时，保留待核对状态及剩余预算。

新增题：`interrupt-node-replay`。

依据：[LangGraph Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)、[Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)、[Temporal Workflow Definition](https://docs.temporal.io/workflow-definition)、[Activity Definition](https://docs.temporal.io/activity-definition)、[Redis Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)、[Replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)。

修正：中断恢复会重新执行节点中位于中断前的代码。查询后重试本身无法保证原子性。内存检查点无法跨进程重启；Redis 复制也不等于零丢失。Temporal 的工作流重放与 Activity 重试分开说明。

人工确认：无。未执行崩溃恢复实验。

### 14. Agent 记忆

文件：[memory.mdx](../../../docs/ai/state/memory.mdx)。

负责记忆范围、写入、检索与冲突处理。补入用户隔离和删除流程。删除覆盖记录、索引、缓存及派生摘要。后台任务按删除标记阻止旧数据回写。

新增题：`memory-deletion-isolation`。

依据：[LangGraph Memory](https://docs.langchain.com/oss/python/langgraph/memory)、[Stores](https://docs.langchain.com/oss/python/langgraph/stores)、[MemGPT](https://arxiv.org/abs/2310.08560)、[Generative Agents](https://arxiv.org/abs/2304.03442)。

修正：短期记忆按任务范围划分，不等于只保存在内存。记忆不要求固定三层或统一向量化。新记录不自动覆盖可信旧事实。RAG 也可检索用户私有数据。

人工确认：无。删除流程是应用设计要求，未宣称框架自动完成。

### 15. 延迟、成本与服务扩展

文件：[latency-cost-scaling.mdx](../../../docs/ai/safety/latency-cost-scaling.mdx)。

负责延迟拆分、Token 成本、缓存和容量。补入提示缓存与业务结果缓存的不同边界。区分并发数与 RPM、TPM 配额。重试受预算和总截止时间约束。

新增题：`cache-boundaries`。

依据：[Latency optimization](https://platform.openai.com/docs/guides/latency-optimization)、[Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)、[Rate limits](https://platform.openai.com/docs/guides/rate-limits)。

修正：删除无依据的延迟量级和输入必然主导成本的断言。并行延迟按关键路径分析。二次输入增长明确全历史重发与固定增量条件。前缀变化只影响对应位置之后的命中；结果缓存还需身份与新鲜度校验。

人工确认：无。未运行吞吐或成本基准。

### 16. 提示注入

文件：[prompt-injection.mdx](../../../docs/ai/safety/prompt-injection.mdx)。

负责不可信内容进入指令链路的风险。补入结构化抽取后的注入传递。攻击成功率与正常任务误拒率分别评估。具体授权与沙箱机制引用相邻文章。

新增题：`structured-injection`。

依据：[OpenAI Agent safety](https://developers.openai.com/api/docs/guides/agent-builder-safety)、[OWASP Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)、[Indirect Prompt Injection 原论文](https://arxiv.org/abs/2302.12173)。

修正：风险源于语义上的信任越界，不能简化为消息角色不存在。普通对话也可能泄露已有敏感上下文。JSON、摘要和 Schema 约束均不能自动建立内容信任。

人工确认：无。

### 17. 工具授权与执行沙箱

文件：[tool-authorization-sandbox.mdx](../../../docs/ai/safety/tool-authorization-sandbox.mdx)。

负责动作授权、审批绑定、敏感数据和资源隔离。补入命令解释器、子进程、路径与网络绕过。执行阶段核对用户、参数和目标版本。已授权动作按范围执行。

新增题：`sandbox-command-boundaries`。

依据：[Claude Code sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing)、[MCP Security](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)、[gVisor Security](https://gvisor.dev/docs/architecture_guide/security/)、[Docker Security](https://docs.docker.com/engine/security/)、[Firecracker Design](https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md)。

修正：审批与执行的分阶段处理不是分布式两阶段提交。读取操作也可能有外泄风险。引用解引用时需重新授权。普通容器共享宿主内核；隔离方案按威胁模型选择，删除一概而论的性能和多租户判断。

人工确认：无。未进行沙箱穿透或主机配置实验。

## 引用调整

- [AI 索引](../../../docs/ai/index.mdx)和[Agent 岗位路线](../../../src/data/interviewRoadmaps/agent.ts)同步使用页面名“Agent 框架”。
- 本批正文和面试题链接同步到新的中文章节锚点。
- 既有显式锚点全部保留。没有扩大到其他文章的表达清理。

## 验证

```sh
node scripts/check-article-format.mjs --style-strict -- \
  docs/ai/agents/agent-loop.mdx \
  docs/ai/agents/harness.mdx \
  docs/ai/agents/multi-agent.mdx \
  docs/ai/agents/workflow-vs-agent.mdx \
  docs/ai/development/agent-frameworks.mdx \
  docs/ai/development/ai-assisted-development.mdx \
  docs/ai/development/ai-code-debugging.mdx \
  docs/ai/development/coding-agent-evaluation.mdx \
  docs/ai/development/repository-instructions.mdx \
  docs/ai/tools/agent-skills.mdx \
  docs/ai/tools/function-calling.mdx \
  docs/ai/tools/mcp.mdx \
  docs/ai/state/durable-execution.mdx \
  docs/ai/state/memory.mdx \
  docs/ai/safety/latency-cost-scaling.mdx \
  docs/ai/safety/prompt-injection.mdx \
  docs/ai/safety/tool-authorization-sandbox.mdx
npm run build
git diff --check
```

- 严格格式检查：17 篇，0 篇结构问题，0 篇文风提示。
- 与 HEAD 比对标识和公司来源注释通过。现有 72 道卡片，新增 15 道。
- 构建退出码为 0，Docusaurus 静态文件生成成功。文档链接、复习资源、岗位和面经数据检查通过。
- 全站检查仍有批次外 6 篇结构问题、225 篇文风提示。它们属于非阻断存量问题，本批未修改。
- 博客作者、摘要和 Node localStorage 仍有已有提示。Webpack 缓存写入受权限限制，更新检查也有提示。两者均未阻断构建，未修改目录权限或全局配置。
- `git diff --check` 通过。
- 本批不包含真实模型 API、Docker 或框架集成实验。协议与接口通过官方资料核对。

## 未完成与人工确认

内容无阻塞事项。分支归属需要合并本批工作时确认；当前改动留在 `content/ai-batch-13`，未提交或移动到其他工作树。
