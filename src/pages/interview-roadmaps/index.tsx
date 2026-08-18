import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import {
  roleOutlines,
  sharedFoundationOutlines,
  type OutlineCatalogEntry,
} from '../../data/interviewRoadmaps/outlineCatalog';
import styles from './styles.module.css';

function OutlineGroup({
  title,
  description,
  entries,
}: {
  title: string;
  description: string;
  entries: OutlineCatalogEntry[];
}) {
  return (
    <section className={styles.group}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.grid}>
        {entries.map((entry) => {
          const content = (
            <>
              <span>{entry.id}</span>
              <strong>{entry.label}</strong>
              <small>{entry.href ? '已展开' : '规划中'}</small>
            </>
          );

          return entry.href ? (
            <Link key={entry.id} className={styles.card} to={entry.href}>
              {content}
            </Link>
          ) : (
            <div key={entry.id} className={`${styles.card} ${styles.planned}`}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function InterviewRoadmaps(): JSX.Element {
  return (
    <Layout
      title="面试路线 Outline 目录"
      description="按照 8 条共享基础和 14 条岗位路线组织的技术面试学习目录。">
      <main className={styles.page}>
        <header className={styles.intro}>
          <p>Interview Roadmaps</p>
          <h1>面试路线 Outline 目录</h1>
          <div>
            <strong>8 条共享基础</strong>
            <span>+</span>
            <strong>14 条岗位路线</strong>
          </div>
          <p>
            共享基础只维护一份，岗位路线负责语言、框架、平台和工作场景。全栈不是第十五条岗位路线，而是前端与一条后端路线的组合；复制内容不会让知识变多，只会让维护次数变多。
          </p>
        </header>

        <OutlineGroup
          title="共享基础"
          description="算法、计算机基础、数据系统、工程、系统设计、安全、项目表达与 AI 基础。不同岗位要求的深度不同，知识本身不重复维护。"
          entries={sharedFoundationOutlines}
        />
        <OutlineGroup
          title="岗位路线"
          description="保留 Python 与 C++，移动端拆为通用跨平台、Android、iOS，大模型方向拆为训练推理、RAG、Agent。"
          entries={roleOutlines}
        />

        <aside className={styles.sourceNote}>
          完整审批稿作为原始 Markdown 资源保留在仓库的{' '}
          <code>plans/interview-roadmap-outline-proposal.md</code>。
        </aside>
      </main>
    </Layout>
  );
}
