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
              <small>{entry.href ? '进入阅读' : '规划中'}</small>
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
      title="岗位面试路线"
      description="从 Java 后端路线或通用基础开始复习，其他岗位方向仍在规划。">
      <main className={styles.page}>
        <header className={styles.intro}>
          <p>Interview Roadmaps</p>
          <h1>岗位面试路线</h1>
          <div>
            <strong>通用基础</strong>
            <span>+</span>
            <strong>Java 路线可用</strong>
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
          description="当前可用的是 Java 后端路线。其余方向为规划，尚未提供完整的岗位复习内容。"
          entries={roleOutlines}
        />

      </main>
    </Layout>
  );
}
