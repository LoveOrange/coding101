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
    title: "知识网络",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>梳理各个知识点间的关系，形成体系化的知识结构，方便查阅和学习</>
    ),
  },
  {
    title: "易于理解",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        用尽可能易于理解的表达方式，拆解软件领域知识点，降低理解的成本，减少学习的负担
      </>
    ),
  },
  {
    title: "面向 Offer",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>针对求职中常见的形式和问题，整理常见的考点和解题思路，面向 Offer 学习</>
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
