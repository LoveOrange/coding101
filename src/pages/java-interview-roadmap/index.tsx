import React from 'react';
import Layout from '@theme/Layout';

import InterviewRoadmap from '../../components/InterviewRoadmap';
import {javaInterviewRoadmap} from '../../data/interviewRoadmaps/java';

export default function JavaInterviewRoadmap(): JSX.Element {
  return (
    <Layout
      title={javaInterviewRoadmap.title}
      description="按照学习顺序、能力等级和面试优先级组织的 Java 开发面试复习路线。">
      <InterviewRoadmap roadmap={javaInterviewRoadmap} />
    </Layout>
  );
}
