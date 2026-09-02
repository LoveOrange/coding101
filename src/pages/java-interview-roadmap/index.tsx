import React from 'react';
import Layout from '@theme/Layout';

import InterviewRoadmap from '../../components/InterviewRoadmap';
import {javaInterviewRoadmap} from '../../data/interviewRoadmaps/java';

export default function JavaInterviewRoadmap(): JSX.Element {
  return (
    <Layout
      title={javaInterviewRoadmap.title}
      description="按必会、常考和按岗选学组织的 Java 后端开发面试路线，并标明每个 Topic 的回答深度与核心阅读。">
      <InterviewRoadmap roadmap={javaInterviewRoadmap} />
    </Layout>
  );
}
