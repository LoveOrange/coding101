import React from 'react';
import Layout from '@theme/Layout';

import InterviewRoadmap from '../../components/InterviewRoadmap';
import {sreInterviewRoadmap} from '../../data/interviewRoadmaps/sre';

export default function SreInterviewRoadmap(): JSX.Element {
  return (
    <Layout
      title={sreInterviewRoadmap.title}
      description="按公开面试复盘安排 SRE、运维开发与 DevOps 的复习顺序：操作系统与网络、Linux 排查、容器与 Kubernetes、监控告警与故障响应。">
      <InterviewRoadmap roadmap={sreInterviewRoadmap} />
    </Layout>
  );
}
