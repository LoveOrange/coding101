# Agentic Development 面试考点频率

本表由人工证据标注生成。百分比是当前样本中的披露率，不是市场考察概率；汇编不进入分母。完整方法见 [README](./README.md)。

## 1. 分母与重叠

| 样本组 | 篇数 | 按已知作者合并后的组数 | 作者未知的篇数 |
| --- | ---: | ---: | ---: |
| 全部公开复盘 | 167 | 145 | 41 |
| AI 辅助开发 | 70 | 66 | 21 |
| Agent / LLM 应用开发 | 142 | 123 | 32 |
| 明确披露实作或演示的 AI 辅助开发 | 24 | 24 | 9 |
| AI 辅助开发：中文 | 49 | 45 | 13 |
| AI 辅助开发：英文 | 21 | 21 | 8 |
| Agent 应用：中文 | 123 | 105 | 24 |
| Agent 应用：英文 | 19 | 18 | 8 |

两条路径有 45 篇重叠，不可相加。主样本有 23 篇未披露足以标注具体考点的内容，仍保留在分母。按作者合并仅用于敏感性检查；未知作者各保留一组，不能声称已消除所有转载或同人重复。

## 2. AI 辅助开发

| 考点 | 命中／分母 | 披露率 | 中文命中 | 英文命中 | 作者合并命中／组数 |
| --- | ---: | ---: | ---: | ---: | ---: |
| C00 AI 辅助开发实践 | 23/70 | 32.9% | 22 | 1 | 22/66 |
| C06 测试与结果验证 | 17/70 | 24.3% | 11 | 6 | 17/66 |
| C07 代码及方案评审 | 14/70 | 20.0% | 13 | 1 | 14/66 |
| C05 AI 代码调试 | 13/70 | 18.6% | 4 | 9 | 13/66 |
| C01 需求约束与验收标准 | 11/70 | 15.7% | 6 | 5 | 11/66 |
| C08 AI 辅助编码中的算法与实现 | 11/70 | 15.7% | 2 | 9 | 11/66 |
| C04 提示与反馈迭代 | 9/70 | 12.9% | 7 | 2 | 9/66 |
| C02 代码库理解与检索 | 8/70 | 11.4% | 2 | 6 | 8/66 |
| C03 开发任务分解与计划 | 5/70 | 7.1% | 5 | 0 | 5/66 |
| C09 编码 Agent 评测与效能 | 5/70 | 7.1% | 5 | 0 | 5/66 |
| C10 仓库指令 | 2/70 | 2.9% | 2 | 0 | 2/66 |

实作／演示子样本共 24 篇：需求约束与验收标准 9/24；代码库理解与检索 6/24；提示与反馈迭代 6/24；AI 代码调试 10/24；测试与结果验证 8/24；代码及方案评审 5/24；AI 辅助编码中的算法与实现 11/24。

C00 只表示泛问使用经历；不能据此判断具体技能已被考查。实作子样本由正文披露的面试形式人工标注，未披露形式不等于没有实作。

## 3. Agent / LLM 应用开发

| 考点 | 命中／分母 | 披露率 | 中文命中 | 英文命中 | 作者合并命中／组数 |
| --- | ---: | ---: | ---: | ---: | ---: |
| A20 Agent 架构与 Harness | 43/142 | 30.3% | 40 | 3 | 39/123 |
| R01 RAG 用途、流程与选型 | 43/142 | 30.3% | 30 | 13 | 41/123 |
| A11 多 Agent 协作 | 39/142 | 27.5% | 35 | 4 | 37/123 |
| A04 Agent 执行循环与工作流 | 38/142 | 26.8% | 37 | 1 | 34/123 |
| A16 Agent 评测 | 35/142 | 24.6% | 30 | 5 | 30/123 |
| A06 上下文组织 | 33/142 | 23.2% | 32 | 1 | 29/123 |
| A08 Agent 记忆 | 32/142 | 22.5% | 32 | 0 | 31/123 |
| A19 Agent 框架选型 | 32/142 | 22.5% | 28 | 4 | 30/123 |
| A10 Agent Skills | 31/142 | 21.8% | 31 | 0 | 30/123 |
| A18 延迟成本与服务扩展 | 31/142 | 21.8% | 26 | 5 | 29/123 |
| R03 召回与向量检索 | 27/142 | 19.0% | 22 | 5 | 27/123 |
| A07 上下文压缩 | 26/142 | 18.3% | 26 | 0 | 26/123 |
| A09 MCP | 26/142 | 18.3% | 24 | 2 | 26/123 |
| A02 工具契约与调用链 | 24/142 | 16.9% | 22 | 2 | 22/123 |
| A12 状态恢复与失败处理 | 24/142 | 16.9% | 24 | 0 | 23/123 |
| R02 文档解析与切分 | 20/142 | 14.1% | 16 | 4 | 20/123 |
| R05 RAG 评测与排错 | 20/142 | 14.1% | 17 | 3 | 19/123 |
| A27 提示词设计 | 19/142 | 13.4% | 12 | 7 | 19/123 |
| A01 模型基础与生成参数 | 17/142 | 12.0% | 12 | 5 | 17/123 |
| A03 工具选择与意图路由 | 17/142 | 12.0% | 15 | 2 | 16/123 |
| A13 工具授权与数据安全 | 16/142 | 11.3% | 13 | 3 | 13/123 |
| R04 混合检索与重排序 | 16/142 | 11.3% | 15 | 1 | 16/123 |
| A28 模型幻觉 | 14/142 | 9.9% | 12 | 2 | 14/123 |
| R06 知识更新与证据可信度 | 12/142 | 8.5% | 11 | 1 | 12/123 |
| A05 规划与执行 | 11/142 | 7.7% | 11 | 0 | 11/123 |
| A17 Agent 可观测性 | 11/142 | 7.7% | 10 | 1 | 11/123 |
| A26 结构化输出 | 7/142 | 4.9% | 6 | 1 | 7/123 |
| A15 提示注入 | 4/142 | 2.8% | 3 | 1 | 4/123 |
| A14 执行沙箱 | 3/142 | 2.1% | 3 | 0 | 3/123 |

## 4. 考点证据索引

下列链接逐篇定位到转述和原帖。一个问题可涉及多个考点；同篇同考点只计一次。研究编码与知识树的 A01—A14 分组不是同一套编号。

### A01 模型基础与生成参数

模型结构、Token 与采样等基础

[E065](./sources.md#e065)、[E249](./sources.md#e249)、[E385](./sources.md#e385)、[E437](./sources.md#e437)、[E477](./sources.md#e477)、[E498](./sources.md#e498)、[Z036](./sources.md#z036)、[Z051](./sources.md#z051)、[Z128](./sources.md#z128)、[Z165](./sources.md#z165)、[Z169](./sources.md#z169)、[Z175](./sources.md#z175)、[Z184](./sources.md#z184)、[Z204](./sources.md#z204)、[Z223](./sources.md#z223)、[Z225](./sources.md#z225)、[Z233](./sources.md#z233)

### A02 工具契约与调用链

参数、执行、结果回传及校验

[E249](./sources.md#e249)、[E498](./sources.md#e498)、[Z021](./sources.md#z021)、[Z038](./sources.md#z038)、[Z039](./sources.md#z039)、[Z043](./sources.md#z043)、[Z050](./sources.md#z050)、[Z051](./sources.md#z051)、[Z053](./sources.md#z053)、[Z060](./sources.md#z060)、[Z063](./sources.md#z063)、[Z064](./sources.md#z064)、[Z142](./sources.md#z142)、[Z147](./sources.md#z147)、[Z151](./sources.md#z151)、[Z154](./sources.md#z154)、[Z155](./sources.md#z155)、[Z169](./sources.md#z169)、[Z186](./sources.md#z186)、[Z204](./sources.md#z204)、[Z225](./sources.md#z225)、[Z227](./sources.md#z227)、[Z244](./sources.md#z244)、[Z246](./sources.md#z246)

### A03 工具选择与意图路由

能力检索、意图判断及歧义处理

[E472](./sources.md#e472)、[E498](./sources.md#e498)、[Z003](./sources.md#z003)、[Z024](./sources.md#z024)、[Z039](./sources.md#z039)、[Z075](./sources.md#z075)、[Z107](./sources.md#z107)、[Z146](./sources.md#z146)、[Z147](./sources.md#z147)、[Z153](./sources.md#z153)、[Z154](./sources.md#z154)、[Z165](./sources.md#z165)、[Z176](./sources.md#z176)、[Z236](./sources.md#z236)、[Z244](./sources.md#z244)、[Z245](./sources.md#z245)、[Z248](./sources.md#z248)

### A04 Agent 执行循环与工作流

Workflow、ReAct、循环和停止

[E328](./sources.md#e328)、[Z005](./sources.md#z005)、[Z006](./sources.md#z006)、[Z018](./sources.md#z018)、[Z035](./sources.md#z035)、[Z038](./sources.md#z038)、[Z043](./sources.md#z043)、[Z051](./sources.md#z051)、[Z064](./sources.md#z064)、[Z092](./sources.md#z092)、[Z102](./sources.md#z102)、[Z111](./sources.md#z111)、[Z116](./sources.md#z116)、[Z125](./sources.md#z125)、[Z129](./sources.md#z129)、[Z134](./sources.md#z134)、[Z143](./sources.md#z143)、[Z144](./sources.md#z144)、[Z147](./sources.md#z147)、[Z151](./sources.md#z151)、[Z153](./sources.md#z153)、[Z155](./sources.md#z155)、[Z159](./sources.md#z159)、[Z162](./sources.md#z162)、[Z164](./sources.md#z164)、[Z168](./sources.md#z168)、[Z172](./sources.md#z172)、[Z176](./sources.md#z176)、[Z178](./sources.md#z178)、[Z204](./sources.md#z204)、[Z220](./sources.md#z220)、[Z227](./sources.md#z227)、[Z239](./sources.md#z239)、[Z240](./sources.md#z240)、[Z241](./sources.md#z241)、[Z243](./sources.md#z243)、[Z244](./sources.md#z244)、[Z247](./sources.md#z247)

### A05 规划与执行

计划分解、执行及重规划

[Z006](./sources.md#z006)、[Z064](./sources.md#z064)、[Z082](./sources.md#z082)、[Z097](./sources.md#z097)、[Z116](./sources.md#z116)、[Z142](./sources.md#z142)、[Z147](./sources.md#z147)、[Z169](./sources.md#z169)、[Z204](./sources.md#z204)、[Z220](./sources.md#z220)、[Z247](./sources.md#z247)

### A06 上下文组织

材料选择、消息组装、隔离和预算

[E179](./sources.md#e179)、[Z006](./sources.md#z006)、[Z038](./sources.md#z038)、[Z050](./sources.md#z050)、[Z051](./sources.md#z051)、[Z058](./sources.md#z058)、[Z063](./sources.md#z063)、[Z065](./sources.md#z065)、[Z082](./sources.md#z082)、[Z087](./sources.md#z087)、[Z088](./sources.md#z088)、[Z091](./sources.md#z091)、[Z092](./sources.md#z092)、[Z102](./sources.md#z102)、[Z116](./sources.md#z116)、[Z142](./sources.md#z142)、[Z151](./sources.md#z151)、[Z152](./sources.md#z152)、[Z153](./sources.md#z153)、[Z155](./sources.md#z155)、[Z162](./sources.md#z162)、[Z164](./sources.md#z164)、[Z165](./sources.md#z165)、[Z168](./sources.md#z168)、[Z169](./sources.md#z169)、[Z175](./sources.md#z175)、[Z176](./sources.md#z176)、[Z186](./sources.md#z186)、[Z225](./sources.md#z225)、[Z236](./sources.md#z236)、[Z240](./sources.md#z240)、[Z246](./sources.md#z246)、[Z248](./sources.md#z248)

### A07 上下文压缩

窗口超限、摘要及关键信息保留

[Z001](./sources.md#z001)、[Z014](./sources.md#z014)、[Z021](./sources.md#z021)、[Z025](./sources.md#z025)、[Z043](./sources.md#z043)、[Z050](./sources.md#z050)、[Z058](./sources.md#z058)、[Z063](./sources.md#z063)、[Z075](./sources.md#z075)、[Z082](./sources.md#z082)、[Z087](./sources.md#z087)、[Z092](./sources.md#z092)、[Z106](./sources.md#z106)、[Z116](./sources.md#z116)、[Z117](./sources.md#z117)、[Z141](./sources.md#z141)、[Z143](./sources.md#z143)、[Z152](./sources.md#z152)、[Z153](./sources.md#z153)、[Z154](./sources.md#z154)、[Z162](./sources.md#z162)、[Z166](./sources.md#z166)、[Z174](./sources.md#z174)、[Z186](./sources.md#z186)、[Z211](./sources.md#z211)、[Z246](./sources.md#z246)

### A08 Agent 记忆

短长期数据、存取、冲突和生命周期

[Z006](./sources.md#z006)、[Z014](./sources.md#z014)、[Z043](./sources.md#z043)、[Z050](./sources.md#z050)、[Z063](./sources.md#z063)、[Z064](./sources.md#z064)、[Z075](./sources.md#z075)、[Z084](./sources.md#z084)、[Z091](./sources.md#z091)、[Z102](./sources.md#z102)、[Z106](./sources.md#z106)、[Z116](./sources.md#z116)、[Z126](./sources.md#z126)、[Z134](./sources.md#z134)、[Z142](./sources.md#z142)、[Z143](./sources.md#z143)、[Z144](./sources.md#z144)、[Z147](./sources.md#z147)、[Z152](./sources.md#z152)、[Z153](./sources.md#z153)、[Z154](./sources.md#z154)、[Z155](./sources.md#z155)、[Z166](./sources.md#z166)、[Z174](./sources.md#z174)、[Z204](./sources.md#z204)、[Z211](./sources.md#z211)、[Z223](./sources.md#z223)、[Z225](./sources.md#z225)、[Z234](./sources.md#z234)、[Z239](./sources.md#z239)、[Z241](./sources.md#z241)、[Z245](./sources.md#z245)

### A09 MCP

工具接入、接口差异和协议职责

[E180](./sources.md#e180)、[E249](./sources.md#e249)、[Z024](./sources.md#z024)、[Z034](./sources.md#z034)、[Z039](./sources.md#z039)、[Z051](./sources.md#z051)、[Z053](./sources.md#z053)、[Z058](./sources.md#z058)、[Z060](./sources.md#z060)、[Z063](./sources.md#z063)、[Z075](./sources.md#z075)、[Z080](./sources.md#z080)、[Z082](./sources.md#z082)、[Z091](./sources.md#z091)、[Z092](./sources.md#z092)、[Z116](./sources.md#z116)、[Z141](./sources.md#z141)、[Z144](./sources.md#z144)、[Z154](./sources.md#z154)、[Z168](./sources.md#z168)、[Z174](./sources.md#z174)、[Z175](./sources.md#z175)、[Z204](./sources.md#z204)、[Z219](./sources.md#z219)、[Z223](./sources.md#z223)、[Z225](./sources.md#z225)

### A10 Agent Skills

能力组织、渐进加载和工具关系

[Z003](./sources.md#z003)、[Z035](./sources.md#z035)、[Z038](./sources.md#z038)、[Z039](./sources.md#z039)、[Z053](./sources.md#z053)、[Z060](./sources.md#z060)、[Z063](./sources.md#z063)、[Z065](./sources.md#z065)、[Z075](./sources.md#z075)、[Z091](./sources.md#z091)、[Z092](./sources.md#z092)、[Z097](./sources.md#z097)、[Z129](./sources.md#z129)、[Z141](./sources.md#z141)、[Z144](./sources.md#z144)、[Z151](./sources.md#z151)、[Z153](./sources.md#z153)、[Z165](./sources.md#z165)、[Z167](./sources.md#z167)、[Z168](./sources.md#z168)、[Z174](./sources.md#z174)、[Z178](./sources.md#z178)、[Z179](./sources.md#z179)、[Z210](./sources.md#z210)、[Z216](./sources.md#z216)、[Z220](./sources.md#z220)、[Z225](./sources.md#z225)、[Z236](./sources.md#z236)、[Z241](./sources.md#z241)、[Z244](./sources.md#z244)、[Z245](./sources.md#z245)

### A11 多 Agent 协作

拆分、协调、通信、冲突及 A2A 基础

[E179](./sources.md#e179)、[E180](./sources.md#e180)、[E249](./sources.md#e249)、[E299](./sources.md#e299)、[Z005](./sources.md#z005)、[Z006](./sources.md#z006)、[Z018](./sources.md#z018)、[Z034](./sources.md#z034)、[Z039](./sources.md#z039)、[Z043](./sources.md#z043)、[Z053](./sources.md#z053)、[Z058](./sources.md#z058)、[Z063](./sources.md#z063)、[Z064](./sources.md#z064)、[Z078](./sources.md#z078)、[Z084](./sources.md#z084)、[Z102](./sources.md#z102)、[Z116](./sources.md#z116)、[Z121](./sources.md#z121)、[Z129](./sources.md#z129)、[Z141](./sources.md#z141)、[Z152](./sources.md#z152)、[Z154](./sources.md#z154)、[Z162](./sources.md#z162)、[Z165](./sources.md#z165)、[Z168](./sources.md#z168)、[Z174](./sources.md#z174)、[Z175](./sources.md#z175)、[Z176](./sources.md#z176)、[Z204](./sources.md#z204)、[Z210](./sources.md#z210)、[Z212](./sources.md#z212)、[Z223](./sources.md#z223)、[Z225](./sources.md#z225)、[Z236](./sources.md#z236)、[Z240](./sources.md#z240)、[Z244](./sources.md#z244)、[Z245](./sources.md#z245)、[Z248](./sources.md#z248)

### A12 状态恢复与失败处理

检查点、重试、取消、幂等及人工介入

[E385](./sources.md#e385)、[Z024](./sources.md#z024)、[Z025](./sources.md#z025)、[Z034](./sources.md#z034)、[Z038](./sources.md#z038)、[Z058](./sources.md#z058)、[Z064](./sources.md#z064)、[Z078](./sources.md#z078)、[Z087](./sources.md#z087)、[Z092](./sources.md#z092)、[Z102](./sources.md#z102)、[Z106](./sources.md#z106)、[Z129](./sources.md#z129)、[Z143](./sources.md#z143)、[Z153](./sources.md#z153)、[Z155](./sources.md#z155)、[Z166](./sources.md#z166)、[Z169](./sources.md#z169)、[Z176](./sources.md#z176)、[Z179](./sources.md#z179)、[Z195](./sources.md#z195)、[Z204](./sources.md#z204)、[Z236](./sources.md#z236)、[Z245](./sources.md#z245)

### A13 工具授权与数据安全

权限、敏感数据、副作用及隔离

[E180](./sources.md#e180)、[E299](./sources.md#e299)、[E498](./sources.md#e498)、[Z003](./sources.md#z003)、[Z005](./sources.md#z005)、[Z038](./sources.md#z038)、[Z050](./sources.md#z050)、[Z051](./sources.md#z051)、[Z082](./sources.md#z082)、[Z102](./sources.md#z102)、[Z107](./sources.md#z107)、[Z142](./sources.md#z142)、[Z166](./sources.md#z166)、[Z195](./sources.md#z195)、[Z229](./sources.md#z229)、[Z243](./sources.md#z243)

### A14 执行沙箱

运行环境及文件、进程等执行边界

[Z063](./sources.md#z063)、[Z092](./sources.md#z092)、[Z220](./sources.md#z220)

### A15 提示注入

外部材料中的恶意指令及防护

[E299](./sources.md#e299)、[Z005](./sources.md#z005)、[Z018](./sources.md#z018)、[Z142](./sources.md#z142)

### A16 Agent 评测

任务指标、数据集、失败分类及回归

[E065](./sources.md#e065)、[E249](./sources.md#e249)、[E299](./sources.md#e299)、[E472](./sources.md#e472)、[E477](./sources.md#e477)、[Z014](./sources.md#z014)、[Z024](./sources.md#z024)、[Z039](./sources.md#z039)、[Z058](./sources.md#z058)、[Z082](./sources.md#z082)、[Z087](./sources.md#z087)、[Z088](./sources.md#z088)、[Z091](./sources.md#z091)、[Z092](./sources.md#z092)、[Z097](./sources.md#z097)、[Z106](./sources.md#z106)、[Z129](./sources.md#z129)、[Z144](./sources.md#z144)、[Z147](./sources.md#z147)、[Z151](./sources.md#z151)、[Z152](./sources.md#z152)、[Z154](./sources.md#z154)、[Z164](./sources.md#z164)、[Z165](./sources.md#z165)、[Z169](./sources.md#z169)、[Z171](./sources.md#z171)、[Z196](./sources.md#z196)、[Z216](./sources.md#z216)、[Z223](./sources.md#z223)、[Z225](./sources.md#z225)、[Z229](./sources.md#z229)、[Z239](./sources.md#z239)、[Z241](./sources.md#z241)、[Z245](./sources.md#z245)、[Z248](./sources.md#z248)

### A17 Agent 可观测性

中间结果、轨迹、监控和故障定位

[E477](./sources.md#e477)、[Z018](./sources.md#z018)、[Z021](./sources.md#z021)、[Z051](./sources.md#z051)、[Z064](./sources.md#z064)、[Z092](./sources.md#z092)、[Z129](./sources.md#z129)、[Z151](./sources.md#z151)、[Z227](./sources.md#z227)、[Z239](./sources.md#z239)、[Z246](./sources.md#z246)

### A18 延迟成本与服务扩展

模型、缓存、并发、部署和成本取舍

[E180](./sources.md#e180)、[E299](./sources.md#e299)、[E315](./sources.md#e315)、[E472](./sources.md#e472)、[E477](./sources.md#e477)、[Z003](./sources.md#z003)、[Z018](./sources.md#z018)、[Z038](./sources.md#z038)、[Z043](./sources.md#z043)、[Z050](./sources.md#z050)、[Z051](./sources.md#z051)、[Z053](./sources.md#z053)、[Z064](./sources.md#z064)、[Z102](./sources.md#z102)、[Z106](./sources.md#z106)、[Z116](./sources.md#z116)、[Z118](./sources.md#z118)、[Z129](./sources.md#z129)、[Z142](./sources.md#z142)、[Z143](./sources.md#z143)、[Z168](./sources.md#z168)、[Z169](./sources.md#z169)、[Z176](./sources.md#z176)、[Z186](./sources.md#z186)、[Z195](./sources.md#z195)、[Z204](./sources.md#z204)、[Z216](./sources.md#z216)、[Z233](./sources.md#z233)、[Z234](./sources.md#z234)、[Z241](./sources.md#z241)、[Z248](./sources.md#z248)

### A19 Agent 框架选型

框架、自研方案及迁移的选择依据

[E179](./sources.md#e179)、[E180](./sources.md#e180)、[E249](./sources.md#e249)、[E315](./sources.md#e315)、[Z003](./sources.md#z003)、[Z005](./sources.md#z005)、[Z006](./sources.md#z006)、[Z014](./sources.md#z014)、[Z025](./sources.md#z025)、[Z034](./sources.md#z034)、[Z035](./sources.md#z035)、[Z039](./sources.md#z039)、[Z050](./sources.md#z050)、[Z058](./sources.md#z058)、[Z065](./sources.md#z065)、[Z087](./sources.md#z087)、[Z102](./sources.md#z102)、[Z106](./sources.md#z106)、[Z129](./sources.md#z129)、[Z134](./sources.md#z134)、[Z166](./sources.md#z166)、[Z167](./sources.md#z167)、[Z168](./sources.md#z168)、[Z174](./sources.md#z174)、[Z175](./sources.md#z175)、[Z181](./sources.md#z181)、[Z204](./sources.md#z204)、[Z213](./sources.md#z213)、[Z220](./sources.md#z220)、[Z227](./sources.md#z227)、[Z234](./sources.md#z234)、[Z236](./sources.md#z236)

### A20 Agent 架构与 Harness

端到端模块和运行时设计；宽口径主题

[E079](./sources.md#e079)、[E179](./sources.md#e179)、[E385](./sources.md#e385)、[E438](./sources.md#e438)、[Z001](./sources.md#z001)、[Z003](./sources.md#z003)、[Z005](./sources.md#z005)、[Z006](./sources.md#z006)、[Z014](./sources.md#z014)、[Z018](./sources.md#z018)、[Z021](./sources.md#z021)、[Z024](./sources.md#z024)、[Z035](./sources.md#z035)、[Z038](./sources.md#z038)、[Z039](./sources.md#z039)、[Z051](./sources.md#z051)、[Z060](./sources.md#z060)、[Z064](./sources.md#z064)、[Z088](./sources.md#z088)、[Z106](./sources.md#z106)、[Z116](./sources.md#z116)、[Z117](./sources.md#z117)、[Z126](./sources.md#z126)、[Z134](./sources.md#z134)、[Z136](./sources.md#z136)、[Z144](./sources.md#z144)、[Z146](./sources.md#z146)、[Z152](./sources.md#z152)、[Z153](./sources.md#z153)、[Z162](./sources.md#z162)、[Z168](./sources.md#z168)、[Z179](./sources.md#z179)、[Z188](./sources.md#z188)、[Z211](./sources.md#z211)、[Z212](./sources.md#z212)、[Z219](./sources.md#z219)、[Z220](./sources.md#z220)、[Z234](./sources.md#z234)、[Z240](./sources.md#z240)、[Z241](./sources.md#z241)、[Z243](./sources.md#z243)、[Z244](./sources.md#z244)、[Z248](./sources.md#z248)

### A26 结构化输出

格式契约、解析及业务校验

[E498](./sources.md#e498)、[Z005](./sources.md#z005)、[Z021](./sources.md#z021)、[Z034](./sources.md#z034)、[Z082](./sources.md#z082)、[Z097](./sources.md#z097)、[Z191](./sources.md#z191)

### A27 提示词设计

提示结构、示例和质量改进

[E299](./sources.md#e299)、[E312](./sources.md#e312)、[E315](./sources.md#e315)、[E320](./sources.md#e320)、[E328](./sources.md#e328)、[E472](./sources.md#e472)、[E477](./sources.md#e477)、[Z018](./sources.md#z018)、[Z034](./sources.md#z034)、[Z038](./sources.md#z038)、[Z065](./sources.md#z065)、[Z097](./sources.md#z097)、[Z162](./sources.md#z162)、[Z164](./sources.md#z164)、[Z165](./sources.md#z165)、[Z169](./sources.md#z169)、[Z204](./sources.md#z204)、[Z210](./sources.md#z210)、[Z247](./sources.md#z247)

### A28 模型幻觉

错误生成、证据不足及缓解

[E299](./sources.md#e299)、[E477](./sources.md#e477)、[Z025](./sources.md#z025)、[Z058](./sources.md#z058)、[Z063](./sources.md#z063)、[Z064](./sources.md#z064)、[Z065](./sources.md#z065)、[Z080](./sources.md#z080)、[Z087](./sources.md#z087)、[Z129](./sources.md#z129)、[Z164](./sources.md#z164)、[Z167](./sources.md#z167)、[Z204](./sources.md#z204)、[Z213](./sources.md#z213)

### C00 AI 辅助开发实践

仅泛问使用经历，不能推导出已考查具体机制

[E306](./sources.md#e306)、[Z018](./sources.md#z018)、[Z051](./sources.md#z051)、[Z082](./sources.md#z082)、[Z090](./sources.md#z090)、[Z102](./sources.md#z102)、[Z103](./sources.md#z103)、[Z117](./sources.md#z117)、[Z128](./sources.md#z128)、[Z129](./sources.md#z129)、[Z131](./sources.md#z131)、[Z134](./sources.md#z134)、[Z147](./sources.md#z147)、[Z151](./sources.md#z151)、[Z162](./sources.md#z162)、[Z167](./sources.md#z167)、[Z175](./sources.md#z175)、[Z211](./sources.md#z211)、[Z236](./sources.md#z236)、[Z244](./sources.md#z244)、[Z246](./sources.md#z246)、[Z247](./sources.md#z247)、[Z248](./sources.md#z248)

### C01 需求约束与验收标准

澄清目标、输入输出、约束和完成条件

[E000](./sources.md#e000)、[E138](./sources.md#e138)、[E189](./sources.md#e189)、[E202](./sources.md#e202)、[E440](./sources.md#e440)、[Z058](./sources.md#z058)、[Z125](./sources.md#z125)、[Z168](./sources.md#z168)、[Z186](./sources.md#z186)、[Z220](./sources.md#z220)、[Z240](./sources.md#z240)

### C02 代码库理解与检索

陌生工程、模块关系和定位相关代码

[E135](./sources.md#e135)、[E190](./sources.md#e190)、[E191](./sources.md#e191)、[E195](./sources.md#e195)、[E201](./sources.md#e201)、[E233](./sources.md#e233)、[Z131](./sources.md#z131)、[Z212](./sources.md#z212)

### C03 开发任务分解与计划

拆分实现、顺序与时间分配

[Z058](./sources.md#z058)、[Z105](./sources.md#z105)、[Z106](./sources.md#z106)、[Z172](./sources.md#z172)、[Z220](./sources.md#z220)

### C04 提示与反馈迭代

向编码助手给出需求、差异及反馈

[E000](./sources.md#e000)、[E189](./sources.md#e189)、[Z025](./sources.md#z025)、[Z038](./sources.md#z038)、[Z058](./sources.md#z058)、[Z121](./sources.md#z121)、[Z125](./sources.md#z125)、[Z210](./sources.md#z210)、[Z220](./sources.md#z220)

### C05 AI 代码调试

识别、定位和修正生成或既有代码错误

[E000](./sources.md#e000)、[E135](./sources.md#e135)、[E143](./sources.md#e143)、[E190](./sources.md#e190)、[E191](./sources.md#e191)、[E195](./sources.md#e195)、[E201](./sources.md#e201)、[E233](./sources.md#e233)、[E241](./sources.md#e241)、[Z080](./sources.md#z080)、[Z088](./sources.md#z088)、[Z106](./sources.md#z106)、[Z247](./sources.md#z247)

### C06 测试与结果验证

用测试或运行结果验证 AI 辅助开发的产物

[E135](./sources.md#e135)、[E190](./sources.md#e190)、[E191](./sources.md#e191)、[E195](./sources.md#e195)、[E233](./sources.md#e233)、[E241](./sources.md#e241)、[Z025](./sources.md#z025)、[Z039](./sources.md#z039)、[Z058](./sources.md#z058)、[Z103](./sources.md#z103)、[Z106](./sources.md#z106)、[Z113](./sources.md#z113)、[Z168](./sources.md#z168)、[Z181](./sources.md#z181)、[Z188](./sources.md#z188)、[Z240](./sources.md#z240)、[Z248](./sources.md#z248)

### C07 代码及方案评审

审查生成结果、方案及人机责任边界

[E190](./sources.md#e190)、[Z050](./sources.md#z050)、[Z053](./sources.md#z053)、[Z058](./sources.md#z058)、[Z098](./sources.md#z098)、[Z103](./sources.md#z103)、[Z125](./sources.md#z125)、[Z166](./sources.md#z166)、[Z179](./sources.md#z179)、[Z186](./sources.md#z186)、[Z220](./sources.md#z220)、[Z240](./sources.md#z240)、[Z246](./sources.md#z246)、[Z248](./sources.md#z248)

### C08 AI 辅助编码中的算法与实现

明确允许使用 AI 的现场或作业实现任务

[E000](./sources.md#e000)、[E049](./sources.md#e049)、[E135](./sources.md#e135)、[E138](./sources.md#e138)、[E189](./sources.md#e189)、[E190](./sources.md#e190)、[E202](./sources.md#e202)、[E241](./sources.md#e241)、[E312](./sources.md#e312)、[Z001](./sources.md#z001)、[Z080](./sources.md#z080)

### C09 编码 Agent 评测与效能

开发结果、效率与评估口径

[E385](./sources.md#e385)、[Z151](./sources.md#z151)、[Z196](./sources.md#z196)、[Z240](./sources.md#z240)、[Z246](./sources.md#z246)、[Z247](./sources.md#z247)

### C10 仓库指令

AGENTS.md 等项目规则的组织与迭代

[Z050](./sources.md#z050)、[Z151](./sources.md#z151)

### R01 RAG 用途、流程与选型

索引、检索、生成及与微调的选择

[E065](./sources.md#e065)、[E179](./sources.md#e179)、[E180](./sources.md#e180)、[E249](./sources.md#e249)、[E299](./sources.md#e299)、[E312](./sources.md#e312)、[E315](./sources.md#e315)、[E320](./sources.md#e320)、[E328](./sources.md#e328)、[E437](./sources.md#e437)、[E472](./sources.md#e472)、[E477](./sources.md#e477)、[E498](./sources.md#e498)、[Z004](./sources.md#z004)、[Z014](./sources.md#z014)、[Z021](./sources.md#z021)、[Z034](./sources.md#z034)、[Z036](./sources.md#z036)、[Z051](./sources.md#z051)、[Z064](./sources.md#z064)、[Z080](./sources.md#z080)、[Z084](./sources.md#z084)、[Z086](./sources.md#z086)、[Z092](./sources.md#z092)、[Z111](./sources.md#z111)、[Z113](./sources.md#z113)、[Z117](./sources.md#z117)、[Z121](./sources.md#z121)、[Z154](./sources.md#z154)、[Z155](./sources.md#z155)、[Z159](./sources.md#z159)、[Z164](./sources.md#z164)、[Z169](./sources.md#z169)、[Z174](./sources.md#z174)、[Z175](./sources.md#z175)、[Z186](./sources.md#z186)、[Z192](./sources.md#z192)、[Z204](./sources.md#z204)、[Z210](./sources.md#z210)、[Z213](./sources.md#z213)、[Z220](./sources.md#z220)、[Z223](./sources.md#z223)、[Z233](./sources.md#z233)

### R02 文档解析与切分

异构文档、分块与元数据

[E180](./sources.md#e180)、[E312](./sources.md#e312)、[E315](./sources.md#e315)、[E498](./sources.md#e498)、[Z043](./sources.md#z043)、[Z058](./sources.md#z058)、[Z064](./sources.md#z064)、[Z065](./sources.md#z065)、[Z082](./sources.md#z082)、[Z086](./sources.md#z086)、[Z092](./sources.md#z092)、[Z102](./sources.md#z102)、[Z106](./sources.md#z106)、[Z111](./sources.md#z111)、[Z128](./sources.md#z128)、[Z142](./sources.md#z142)、[Z168](./sources.md#z168)、[Z204](./sources.md#z204)、[Z213](./sources.md#z213)、[Z233](./sources.md#z233)

### R03 召回与向量检索

Embedding、向量库、相似度及查询改写

[E065](./sources.md#e065)、[E249](./sources.md#e249)、[E312](./sources.md#e312)、[E315](./sources.md#e315)、[E477](./sources.md#e477)、[Z038](./sources.md#z038)、[Z064](./sources.md#z064)、[Z065](./sources.md#z065)、[Z082](./sources.md#z082)、[Z087](./sources.md#z087)、[Z092](./sources.md#z092)、[Z106](./sources.md#z106)、[Z111](./sources.md#z111)、[Z128](./sources.md#z128)、[Z154](./sources.md#z154)、[Z164](./sources.md#z164)、[Z165](./sources.md#z165)、[Z167](./sources.md#z167)、[Z175](./sources.md#z175)、[Z179](./sources.md#z179)、[Z192](./sources.md#z192)、[Z204](./sources.md#z204)、[Z213](./sources.md#z213)、[Z227](./sources.md#z227)、[Z233](./sources.md#z233)、[Z234](./sources.md#z234)、[Z245](./sources.md#z245)

### R04 混合检索与重排序

多路融合、重排及延迟取舍

[E065](./sources.md#e065)、[Z018](./sources.md#z018)、[Z043](./sources.md#z043)、[Z064](./sources.md#z064)、[Z086](./sources.md#z086)、[Z092](./sources.md#z092)、[Z102](./sources.md#z102)、[Z128](./sources.md#z128)、[Z129](./sources.md#z129)、[Z142](./sources.md#z142)、[Z164](./sources.md#z164)、[Z167](./sources.md#z167)、[Z204](./sources.md#z204)、[Z223](./sources.md#z223)、[Z233](./sources.md#z233)、[Z245](./sources.md#z245)

### R05 RAG 评测与排错

检索、证据和生成的分层评估

[E180](./sources.md#e180)、[E328](./sources.md#e328)、[E385](./sources.md#e385)、[E498](./sources.md#e498)、[Z050](./sources.md#z050)、[Z053](./sources.md#z053)、[Z080](./sources.md#z080)、[Z092](./sources.md#z092)、[Z097](./sources.md#z097)、[Z102](./sources.md#z102)、[Z142](./sources.md#z142)、[Z147](./sources.md#z147)、[Z169](./sources.md#z169)、[Z179](./sources.md#z179)、[Z184](./sources.md#z184)、[Z192](./sources.md#z192)、[Z204](./sources.md#z204)、[Z216](./sources.md#z216)、[Z223](./sources.md#z223)、[Z225](./sources.md#z225)

### R06 知识更新与证据可信度

版本、来源、更新及冲突

[E312](./sources.md#e312)、[Z025](./sources.md#z025)、[Z043](./sources.md#z043)、[Z087](./sources.md#z087)、[Z102](./sources.md#z102)、[Z126](./sources.md#z126)、[Z134](./sources.md#z134)、[Z143](./sources.md#z143)、[Z211](./sources.md#z211)、[Z213](./sources.md#z213)、[Z225](./sources.md#z225)、[Z245](./sources.md#z245)
