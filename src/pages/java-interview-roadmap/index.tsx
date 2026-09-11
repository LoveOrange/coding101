import React from 'react';
import Layout from '@theme/Layout';

import InterviewRoadmap from '../../components/InterviewRoadmap';
import {javaInterviewRoadmap} from '../../data/interviewRoadmaps/java';

export default function JavaInterviewRoadmap(): JSX.Element {
  return (
    <Layout
      title={javaInterviewRoadmap.title}
      description="从第一轮必会内容开始，按考点安排 Java 后端面试复习，通过代表题自行核对，再补充常考追问与岗位选学内容。">
      <InterviewRoadmap roadmap={javaInterviewRoadmap} />
    </Layout>
  );
}
