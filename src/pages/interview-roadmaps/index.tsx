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
            先选择目标岗位，再按“必会、常考、按岗选学”完成复习。路线会说明每个主题需要回答到基础、原理还是场景分析，不要求把目录中的所有内容都读完。
          </p>
        </header>

        <OutlineGroup
          title="共享基础"
          description="算法、计算机基础、数据系统、工程、系统设计、安全、项目表达与 AI 基础。进入岗位路线后，只学习与目标岗位相关的部分。"
          entries={sharedFoundationOutlines}
        />
        <OutlineGroup
          title="岗位路线"
          description="每条路线都给出第一轮最小复习集合，再根据 JD、简历项目和面试反馈补充深入内容。"
          entries={roleOutlines}
        />

      </main>
    </Layout>
  );
}
