import React from 'react';
import Layout from '@theme/Layout';

import InterviewRoadmap from '../../components/InterviewRoadmap';
import {javaInterviewRoadmap} from '../../data/interviewRoadmaps/java';

export default function JavaInterviewRoadmap(): JSX.Element {
  return (
    <Layout
      title={javaInterviewRoadmap.title}
      description="包含 8 个阶段、40 个 Topic 和完整文章序列的 Java 后端开发面试路线。">
      <InterviewRoadmap roadmap={javaInterviewRoadmap} />
    </Layout>
  );
}
