import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "按岗位准备",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>从目标岗位进入复习路线，直接看到考察范围、前后顺序和需要掌握的深度。</>
    ),
  },
  {
    title: "先抓核心",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        先完成必会内容，再补常考知识；只有与 JD 或项目相关时才进入深入主题。
      </>
    ),
  },
  {
    title: "用问题自测",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>通过代表性面试题检查能否解释原理、比较方案并把项目经历讲清楚。</>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
