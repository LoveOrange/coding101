---
sidebar_position: 1
knowledge:
  id: tools-and-frameworks.git.index
tags:
  - git
  - tools
description: "介绍 Git 用对象和引用保存项目快照与开发历史的方式，围绕工作区、暂存区和仓库解释日常命令。比较合并、变基、冲突处理与撤销操作，帮助准备工程面试的读者判断命令改变哪个区域，组织可审查的提交，并理解获取远端变化和补充遗漏文件的流程。"
keywords: ["Git 面试", "merge 与 rebase", "reset 与 revert", "Git 冲突", "工作区暂存区"]
---
# Git

Git 通过提交保存项目快照，通过分支引用组织开发历史；日常命令都可以放回工作区、暂存区和仓库这三个位置理解。

:::tip 面试核心

- `merge` 保留已有提交；`rebase` 会重放提交，并改变提交标识。
- 本地未共享的功能分支可以用 `rebase` 整理历史。已被他人依赖的共享分支优先使用 `merge`，避免改写他人的提交基础。[卡](#merge-vs-rebase)
- `push` 发送**已提交的对象并更新远端引用**，不会上传尚未提交的工作区内容；`-u` 同时设置当前分支的上游关系。[卡](#first-push)

- 多个 remote **分别获取和推送，不会自动同步**；远端名称与当前分支的上游关系需要分开看。[卡](#multiple-remotes)
- stash **区分保存范围、暂存状态和恢复是否成功**，`pop` 发生冲突时保留记录。[卡](#stash-save-restore)
- `checkout` 可以**切换分支或恢复路径**；`reset` 要区分**移动提交位置和只更新暂存区**，不能只凭命令名判断是否丢失修改。[卡](#reset-checkout-targets)

:::

## 1. Git 保存对象和引用

一次提交会记录根目录快照、父提交、作者和提交说明。文件内容、目录结构与提交分别保存为不同对象，并按内容计算标识；相同内容可以复用同一个对象。

分支只是一个可移动的引用，指向该分支最新的提交。`HEAD` 通常指向当前分支，因此创建新提交时，Git 会生成提交对象，再把当前分支向前移动。切换分支则会改变 `HEAD`，并让工作区与目标提交匹配。

理解这两个事实后，分支不再是一份完整目录副本，提交也不等于“保存一组差异”。差异是比较两个快照得到的结果。

## 2. 三个区域描述修改所处的位置

Git 日常操作涉及三个主要区域：

- **工作区**：磁盘上正在编辑的文件。
- **暂存区**：下一次提交准备包含的快照，也叫 index。
- **本地仓库**：已经创建的提交与其他对象。

`git add` 把选定内容写入暂存区，`git commit` 根据暂存区创建提交。一个文件可以同时存在“已暂存的修改”和“暂存后继续编辑的修改”，因此排查状态时先看 `git status`，必要时分别使用 `git diff` 与 `git diff --staged`。

```bash
git status
git diff
git diff --staged
git add src/App.java
git commit -m "Handle empty input"
```

## 3. 分支用于组织提交历史

创建分支只会新增一个引用，成本很低。功能开发通常从稳定分支创建短生命周期分支，完成后通过合并或变基整合。

```bash
git switch -c feature/payment-timeout
git switch main
git merge feature/payment-timeout
```

远程跟踪分支保存上次同步时看到的远程状态。`git fetch` 更新这些引用，不会直接修改当前工作区；`git pull` 通常等于 fetch 后再 merge 或 rebase，因此执行前要知道项目采用哪一种历史策略。

### 3.1 本地提交与首次推送 {#本地提交与首次推送}

推送前先确认当前分支、远端地址和准备交付的提交。克隆的仓库通常已经有名为 `origin` 的远端，不需要再次添加：

```bash
git status
git remote -v
git branch --show-current
git log -1 --oneline
git push -u origin feature/payment-timeout
```

这组命令假设本地已经创建 `feature/payment-timeout` 分支并完成提交。最后一行把该本地分支推到 `origin` 的同名分支，`-u` 设置上游关联，后续命令可以按这份配置判断与哪个远端分支同步。未 `commit` 的工作区修改不会随推送一起发送。

若项目是本地新建的仓库，先在项目目录 `git init -b main`，检查并提交选定文件，再为已准备好的空远端设置地址。例如 `git remote add origin /path/to/remote.git` 可以连接本机的 bare 仓库；实际团队仓库则使用对应的 HTTPS 或 SSH 地址。确认后执行 `git push -u origin main`。

远端若已有本地没有的提交，推送可能因非快进更新被拒绝。先 `fetch` 并检查两侧历史，再按团队约定整合和验证；不能为了让首次推送成功就覆盖已有远端历史。认证通过也不代表拥有目标分支的写入权限，受保护分支可能要求先走评审流程。

### 3.2 多个远程仓库 {#多个远程仓库}

**remote** 是本地为一个远程仓库保存的名称、地址和相关配置。同一项目可以配置多个 remote，分别获取和推送；`origin` 只是常用名称，没有“必须是唯一远端”的特殊含义。

假设当前仓库已经有 `origin`，本地 `main` 已提交，另一个远端是已经准备好的空 bare 仓库：

```bash
git remote add backup /path/to/backup.git
git remote -v
git fetch origin
git fetch backup
git push -u origin main
git push backup main
```

`origin/main` 和 `backup/main` 是两份不同的远程跟踪引用，分别记录本地最近获知的两个远端 `main` 的位置。`fetch origin` 不会替你同步 `backup`；向 `backup` 推送成功，也不代表 `origin` 收到了同一提交。如果其中一个远端包含本地没有的历史，应先获取、比较并按协作约定整合，不能把两个 remote 当作可以直接互相覆盖的副本。

这段示例只在首次向 `origin` 推送时使用 `-u`，因此 `main` 的普通上游关系仍指向 `origin/main`。随后显式执行 `git push backup main`，不会把第二个远端自动加入这份关系。这里的“上游分支”也不等于必须有一个名叫 `upstream` 的 remote；可以用 `git branch -vv` 检查配置。无参数推送还可能受 `push.default` 等设置影响，多远端操作时明确写出远端和分支更容易核对。

## 4. Merge 和 rebase 生成不同历史

`merge` 保留两条开发线，并在需要时创建合并提交。它不会改写已有提交，适合已经共享的历史。

`rebase` 会把当前分支的提交逐个重放到新的基点，得到内容相近但标识不同的新提交。它可以让历史保持线性，但会改写提交身份。已经被其他人基于其继续开发的公共提交，不应随意 rebase 后强制推送。

选择方式时遵循团队约定，并看历史是否已经共享。两者都可能产生冲突，区别在于冲突出现的过程和最后的提交图。

## 5. 冲突需要按最终意图解决

发生冲突时，Git 只能指出同一区域存在无法自动合并的改动，不能判断业务上应该保留哪一份。处理步骤是：

1. 使用 `git status` 找到冲突文件。
2. 阅读共同基点与两侧修改，整理出最终内容。
3. 运行测试或构建，确认组合后的行为。
4. `git add` 标记已解决，再继续 merge 或 rebase。

不要把“接受 ours”或“接受 theirs”当成固定答案。rebase 过程中两个名称的视角还容易与直觉相反，直接检查最终文件更可靠。

## 6. 撤销命令先区分目标区域

不同撤销命令处理的对象不同：

- `git restore <file>`：恢复工作区文件。
- `git restore --staged <file>`：把内容移出暂存区，保留工作区修改。
- `git reset`：移动分支或调整暂存区；`--hard` 还会覆盖工作区，使用前必须确认目标。
- `git revert <commit>`：创建一个反向提交，不改写已有历史，适合撤销已经共享的提交。

判断命令前先回答两个问题：要撤销的是工作区、暂存区还是提交；相关提交是否已经推送并被他人使用。

### 6.1 临时保存修改 {#临时保存修改}

**stash** 用来暂存尚未提交的工作，便于切换任务后再恢复。普通 `git stash push` 会保存已跟踪文件在工作区和暂存区的修改，并把这些位置恢复到 `HEAD`；默认不包含未跟踪文件，也不包含被忽略的文件。

下面假设仓库已有提交、当前没有未解决冲突，准备暂存的内容已经用 `status` 和 diff 检查过。`-u` 让本次保存同时包含未跟踪文件，被忽略文件仍留在工作区：

```bash
git status
git diff
git diff --staged
git stash push -u -m "WIP before switching tasks"
git stash list
git stash show -p -u 'stash@{0}'
```

`stash@{0}` 表示当前最新的一条记录，不是永久编号；创建或删除其他 stash 后，编号可能变化。切换任务并返回后，再次确认当前分支、工作区状态和要恢复的记录，执行：

```bash
git stash apply --index 'stash@{0}'
git status
git diff
git diff --staged
```

`apply` 恢复修改但保留 stash 记录；`--index` 还会尝试恢复原来的暂存状态。未使用它且采用默认配置时，不能指望原来 staged 与 unstaged 的划分自动还原。恢复能否成功取决于当前内容是否兼容，`--index` 也不是强制覆盖冲突的开关。

确认文件和测试结果正确、确实不再需要这份 stash 后，可以 `git stash drop 'stash@{0}'` 删除对应记录；删除前仍要检查编号。`git stash pop` 则把“恢复成功后删除记录”合成一步，但出现冲突时不会删除 stash。此时用 `git status` 查看冲突，按最终意图编辑并 `git add` 标记已解决，核对完成后再决定删除记录；不要对同一份已部分恢复的内容反复执行 `pop`。

stash 是当前仓库的临时记录，普通分支推送不会顺带上传它。需要长期保存或交给同事的工作，仍应形成可解释的提交。

### 6.2 checkout 与 reset {#checkout与reset}

`checkout` 同时承担切换分支和恢复文件两类职责；前文使用的 `switch`、`restore` 将这两种意图分开。`reset` 则要看是否指定文件路径：提交模式可以改变当前提交位置，路径模式只更新对应的暂存内容。

下表假设没有未解决冲突；提交模式下 `HEAD` 当前附着在某个分支，`target` 表示要选择的提交。切换分支一行以工作区和暂存区干净为前提：

| 命令 | HEAD／分支 | 暂存区 | 工作区 |
| --- | --- | --- | --- |
| `git checkout other` | HEAD 转为指向已有分支 `other`；不移动原分支或 `other` 的提交位置 | 对应 `other` | 对应 `other` |
| `git checkout -- file.txt` | 不变 | 不变 | 用暂存区版本覆盖该文件 |
| `git checkout target -- file.txt` | 不变 | 该文件改为 `target` 的版本 | 同时改为 `target` 的版本 |
| `git reset -- file.txt` | 不变 | 该文件改为 HEAD 的版本，撤销暂存 | 保留修改 |
| `git reset --soft target` | 当前分支移到 `target`，HEAD 仍附着该分支 | 不变 | 不变 |
| `git reset --mixed target` | 同上；省略模式时默认为 mixed | 改为 `target` | 保留修改 |
| `git reset --hard target` | 同上 | 改为 `target` | 覆盖为 `target` 的跟踪内容，可能丢失未提交修改 |

例如，`file.txt` 在 HEAD 中是 A，暂存区中是 B，工作区中是 C。执行 `git checkout -- file.txt` 后，暂存区和工作区都是 B；从同一初始状态执行 `git reset -- file.txt`，暂存区变回 A，工作区仍是 C。前者丢弃这份工作区修改，后者只是取消暂存。路径形式也可以显式指定来源提交，例如 `git reset target -- file.txt` 仍然只更新暂存区，不移动 HEAD。

直接 `git checkout` 一个提交编号会进入**游离 HEAD**：HEAD 直接指向该提交，而不是附着某个分支；已有分支引用不因此移动。它与 `git reset --soft target` 移动当前分支是不同操作。

普通分支切换遇到会覆盖本地修改的情况通常会拒绝，不能把它理解为无条件覆盖。路径恢复和 `reset --hard` 则可能直接丢弃修改；后者还可能移除阻挡目标跟踪路径的未跟踪文件。执行前先看 `status` 和两份 diff，确认目标与待保留内容。这里的命令比较不改变前文的建议：切换分支优先明确使用 `switch`，恢复文件用 `restore`；已共享历史的撤销仍需考虑协作者。

## 7. 团队协作需要可审查的提交

一次提交应表达一个完整、可解释的改动，并保持能够构建或测试。提交说明写清行为变化，不记录机械操作。提交前检查 diff，避免把生成文件、密钥、调试日志或无关格式化混入修改。

需要整理本地未共享历史时，可以使用交互式 rebase 合并、拆分或改写提交。进入共享分支后，优先通过新提交修正问题，避免给协作者制造重复解决历史的成本。

## 8. 常见问题

### 8.1 `git fetch` 和 `git pull` 有什么区别

`fetch` 只从远程下载对象并更新远程跟踪分支，当前分支与工作区不变。`pull` 会在 fetch 后继续把远程变化整合到当前分支，具体使用 merge 还是 rebase 取决于参数和配置。

### 8.2 提交后发现漏了一个文件怎么办

如果提交尚未共享，可以暂存文件后使用 `git commit --amend` 更新最后一次提交；如果已经共享，通常创建新的修正提交更安全。决定依据是改写历史是否会影响其他协作者。

## 9. 面试题

### 9.1 `git merge` 和 `git rebase` 有什么区别，什么时候使用 {#merge-vs-rebase}



**考察重点**

- 提交图、合并提交和重放提交。
- 提交标识变化与共享历史的风险。
- 冲突处理和团队分支约定。

**相关内容**：[分支用于组织提交历史](#3-分支用于组织提交历史)至[团队协作需要可审查的提交](#7-团队协作需要可审查的提交)。

<details>
<summary>参考回答</summary>

`merge` 把两个分支的历史连接起来，必要时创建一个拥有两个父提交的合并提交，不会改写原有提交。`rebase` 把当前分支的提交重放到新基点，每个重放后的提交都会获得新的标识，最终历史通常更线性。

本地、尚未共享的功能分支可以 rebase 到最新主线，便于整理提交；已经共享并被他人依赖的历史优先 merge，或只通过新提交修正。选择还要服从团队规范。无论使用哪一种方式，冲突都要按最终业务意图解决并重新验证，不能只看提交图是否整齐。

</details>

### 9.2 怎样把本地代码首次推送到远程仓库？ {#first-push}

**考察重点**：工作区与提交的区别、远端配置、上游关系及已有历史。

**相关内容**：[本地提交与首次推送](#本地提交与首次推送)。

<details>
<summary>参考回答</summary>

**先把需要交付的修改形成提交，确认分支和远端，再用 `git push -u origin 分支名` 推送并设置上游。** 新建本地仓库需要先初始化；没有远端配置时才使用 `git remote add`，克隆的仓库通常已经存在 `origin`。

推送不包含未提交的修改。远端已有不同历史时，应获取并检查后整合，不能直接覆盖；还要满足认证和分支权限要求。

</details>

### 9.3 一个本地项目怎样关联两个远程仓库？ {#multiple-remotes}

**考察重点**：远端命名、远程跟踪引用、显式推送与上游关系。

**相关内容**：[多个远程仓库](#多个远程仓库)。

<details>
<summary>参考回答</summary>

**给两个仓库配置不同 remote 名称，再分别 fetch 和 push。** 例如已有 `origin` 时，用 `git remote add backup 地址` 添加第二个远端，分别执行 `git fetch origin`、`git fetch backup`，推送时明确使用 `git push origin main` 或 `git push backup main`。

两者对应 `origin/main`、`backup/main`，不会因为添加了第二个 remote 就自动保持同步。`git push -u origin main` 设置的上游仍是 `origin/main`，显式推送到 backup 不会额外形成第二份普通上游关系。远端历史不同时先比较并整合，不直接覆盖。

</details>

### 9.4 git stash 怎样保存和恢复工作，apply 与 pop 有什么区别？ {#stash-save-restore}

**考察重点**：跟踪文件范围、暂存状态、恢复冲突与记录保留。

**相关内容**：[临时保存修改](#临时保存修改)。

<details>
<summary>参考回答</summary>

**`stash push` 临时保存修改，`apply` 恢复后保留记录，`pop` 仅在恢复成功后删除记录。** 默认保存已跟踪文件的工作区与暂存区修改，`-u` 再包含未跟踪文件，被忽略文件不在这个范围内。用 `list` 选择记录、用 `show -p -u` 检查内容，再恢复到合适的分支。

需要还原 staged 状态时使用 `apply --index` 或 `pop --index`，但当前内容冲突时仍可能失败。`pop` 冲突会保留 stash，应检查并解决当前冲突，验证后再决定删除记录，不能假定恢复失败意味着工作区完全没有变化。

</details>

### 9.5 git reset 与 git checkout 有什么区别？ {#reset-checkout-targets}

**考察重点**：分支切换、游离 HEAD、路径恢复，以及 HEAD、暂存区和工作区的不同变化。

**相关内容**：[checkout 与 reset](#checkout与reset)。

<details>
<summary>参考回答</summary>

**`checkout` 可以切换分支，也可以恢复路径；`reset` 的提交模式移动当前提交位置，路径模式只改暂存区。** 正常附着分支时，`reset --soft target` 移动当前分支而保留暂存区和工作区；mixed 再重置暂存区；hard 还覆盖工作区。`checkout other` 切换到已有分支，不移动两条分支本身；checkout 提交编号则进入游离 HEAD。

对文件而言，`checkout -- file.txt` 从暂存区恢复工作区，`checkout target -- file.txt` 同时更新暂存区和工作区；`reset -- file.txt` 只把暂存区恢复为 HEAD 版本，工作区保留。判断影响必须看完整参数，尤其不能把路径恢复当成只取消暂存。

</details>

:::note 参考资料

- [Git：git-push](https://git-scm.com/docs/git-push)
- [Pro Git：Git Basics](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
- [Git：git-rebase](https://git-scm.com/docs/git-rebase)
- [Git：git-revert](https://git-scm.com/docs/git-revert)
- [Git：git-remote](https://git-scm.com/docs/git-remote)
- [Git：git-stash](https://git-scm.com/docs/git-stash)
- [Git：git-checkout](https://git-scm.com/docs/git-checkout)
- [Git：git-reset](https://git-scm.com/docs/git-reset)

:::
