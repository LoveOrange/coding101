import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import ChineseLink from '@site/src/components/ChineseLink';
import styles from '@site/src/pages/index.module.css';

export default function Home() {
  return (
    <Layout title="Technical interview preparation" description="Prepare for software engineering interviews with explanations of technical concepts and questions that test your understanding. Start with Coding 101's English articles or explore the full Chinese study collection.">
      <main className={styles.home}>
        <section className={styles.intro}>
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>Technical interview preparation</p>
            <h1 className={styles.title}>Understand it.<br />Then explain it.</h1>
            <p className={styles.lead}>Study the mechanisms behind an answer, work through examples, and test whether you can explain the result without looking it up.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} to="/articles/">Read English articles →</Link>
              <Link className={styles.secondaryButton} to="/docs/intro">How to study</Link>
            </div>
          </div>
          <div>
            <h2>Start with DNS</h2>
            <p>Why can a domain still point to an old address after its DNS record changes? Follow the lookup through resolvers, delegation, caches and existing connections.</p>
            <Link to="/docs/basic-knowledge/network/dns">Read DNS and try the interview questions →</Link>
          </div>
        </section>
        <section className={styles.reading}>
          <h2>Choose what to review</h2>
          <p>Coding 101 is for students, career changers and working engineers preparing for technical interviews. Role-based study priorities help you decide what to learn first and how deeply to explain it.</p>
          <p>English translations are being added to the article collection. The full article collection, role guides, question bank and progress tools are available in Chinese.</p>
          <p><ChineseLink to="/interview-roadmaps/">Explore role guides (Chinese)</ChineseLink> · <Link to="/about">About the project and sources</Link></p>
        </section>
      </main>
    </Layout>
  );
}
