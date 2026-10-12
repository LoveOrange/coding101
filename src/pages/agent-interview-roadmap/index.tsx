import React from 'react';
import Layout from '@theme/Layout';

import InterviewRoadmap from '../../components/InterviewRoadmap';
import {agentInterviewRoadmap} from '../../data/interviewRoadmaps/agent';

export default function AgentInterviewRoadmap(): JSX.Element {
  return (
    <Layout
      title={agentInterviewRoadmap.title}
      description="按公开面试复盘中的考点频率，安排 Agent 与大模型应用开发的复习顺序：模型与上下文、工具与执行循环、RAG、评估与上线。">
      <InterviewRoadmap roadmap={agentInterviewRoadmap} />
    </Layout>
  );
}
