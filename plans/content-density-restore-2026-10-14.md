# 恢复文章信息密度（2026-10-14）

本文是交给 Codex 的任务说明。目标是修复短句改写造成的知识丢失：保留短句，恢复改写时删掉的知识点。

## 1. 问题

2026-10-13 起，`AGENTS.md` 要求每句不超过 30 字，格式检查在 `--style-strict` 下要求长句提示清零。之后第 1c—14 批改写了全部 268 篇知识树文章。改写为了让句子变短，大量删除了解释、原因、例子和取值，留下抽象的名词句。文章读起来更费劲，面试需要的信息也少了。

用户反馈的例子是《大语言模型基础》（`docs/ai/llm/llm-basics.mdx`）。和改写前（`0a50ae1`）相比，它丢失了以下内容：

- 开头对 LLM 的定义，以及应用开发者要能解释的四个问题。
- 面试核心中可复述的完整结论，例如自回归生成的每一步怎样进行。
- 用量表的“说明”列：多轮对话每轮重发历史、输出单价高于输入、推理过程按输出计费。
- 上下文窗口的影响：窗口大不等于效果好，长材料增加费用和延迟，中间的信息容易被忽略。
- 生成过程中每一步的原因和后果：预填充决定首 Token 延迟，解码每步只新增一个 Token、复用 KV Cache，输出越长耗时越长。
- “模型调用本身不保存状态，多轮记忆来自程序重发历史”这一结论。
- 采样参数表的“常见取值”列，以及低温度仍不能逐字复现的原因（批处理、浮点计算顺序）。
- 训练阶段之后的能力边界清单：知识截止与私有数据、事实不可靠、精确计算、工具调用由程序执行。

字数没有明显变少（6152 → 6257 字符），因为新增的 API 字段表和链接占了篇幅。所以不能只用字数判断，要逐个核对知识点。

## 2. 规则变化

`AGENTS.md` 的“可读性”一节已经修改：

- 短句只降低单句的理解难度，不减少知识。拆句时保留对象、原因、结果、条件、数值和例子；写不下就增加句子。
- 解释机制时写出它做什么、为什么、对读者有什么影响。
- 单句以 30 字左右为宜，超过 50 字必须拆分。格式检查的长句阈值同步改为 50 字。
- 新增“错误的压缩 / 正确的拆分”对照示例。

## 3. 任务

逐篇恢复知识树文章的信息密度。每篇的做法：

1. 取改写前的版本作为对照：`git show 0a50ae1:<路径>`。下面 11 篇在 `0f2fb50` 中已经改过一轮，同时对照 `c373ce6:<路径>`：
   `docs/basic-knowledge/database/indices/b_plus_tree/index.mdx`、`docs/basic-knowledge/database/indices/clustered_index/index.mdx`、`docs/basic-knowledge/database/indices/composite-covering-back-table.mdx`、`docs/basic-knowledge/database/indices/index-review.mdx`、`docs/basic-knowledge/database/indices/index.mdx`、`docs/basic-knowledge/database/transaction/index.mdx`、`docs/basic-knowledge/database/transaction/innodb-locking-ranges.mdx`、`docs/basic-knowledge/database/transaction/mvcc-read-view-consistent-read.mdx`、`docs/basic-knowledge/java/data-access/connection-pool-capacity-timeout-leaks.mdx`、`docs/basic-knowledge/java/data-access/mybatis-mapping-executor-plugins.mdx`、`docs/basic-knowledge/network/tcp_handshake.mdx`。
2. 逐节列出对照版本中的知识点：定义、机制步骤、原因、后果、数值、常见取值、例子、能力边界、易错点。
3. 检查当前版本是否保留每个知识点。缺失的按新规则用短句补回。只有三种情况可以不补：事实错误、超出 `AGENTS.md` 的版本基线、相邻文章已经讲解（此时用一句结论加链接）。
4. 保留 `0a50ae1` 之后的有效改动：版本基线回退（Java 17/21、Spring Boot 2.7/3.x、MySQL 8.0、Redis 6/7 等）、中文章节锚点、卡片 ID、`knowledge.id`、面试来源注释、新增的面试题和补充的事实。
5. 检查当前版本中只剩名词的抽象句，例如“模型处理输入位置，生成后续解码所需的状态”。改写为具体对象加原因的句子。
6. 参考回答同样处理：第一句直接回答，后面给出推导依据，不压缩成关键词堆叠。

## 4. 批次顺序

1. AI 与 Agent（`docs/ai/`），从《大语言模型基础》开始。完成第一篇后先交用户确认写法，再继续。
2. 数据库、Redis、Java（含 JVM、并发、集合、Spring）。
3. 网络、操作系统、中间件、数据结构与算法。
4. 系统设计、安全、DevOps 和其余文章。

## 5. 验收

- 每篇的审计记录写入 `plans/audits/density-restore-2026-10-14/batch-N.md`，按文章列出：恢复的知识点、有意不恢复的知识点及理由。
- 抽查标准：对照版本中的每个知识点，在新版本中都能找到，或在审计记录中有删除理由。
- 每篇改写后通读一遍，确认句子一遍能读懂，且信息不少于对照版本。
- `node scripts/check-article-format.mjs --style-strict -- <本批文件>` 清零，`npm run build` 通过。
