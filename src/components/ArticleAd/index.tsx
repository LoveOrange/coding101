import {useEffect, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {accessOf, getLearner, whenAccessKnown} from '@site/src/learning/store';
import styles from './styles.module.css';

type AdWindow = Window & {adsbygoogle?: {push: (value: Record<string, never>) => void}};

/** One manually placed unit after a complete technical article. */
export default function ArticleAd({permalink}: {permalink: string}) {
  const {siteConfig} = useDocusaurusContext();
  const client = siteConfig.customFields?.adsenseClient;
  const slot = siteConfig.customFields?.adsenseSlot;
  const element = useRef<HTMLModElement>(null);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (window.location.hostname !== 'coding101.linsama.com' || typeof client !== 'string' || typeof slot !== 'string') return;
    if (!siteConfig.customFields?.learnerFeatures) {setAllowed(true); return;}
    let cancelled = false;
    void whenAccessKnown().then(() => {
      if (!cancelled && accessOf(getLearner()) !== 'active') setAllowed(true);
    });
    return () => {cancelled = true;};
  }, [client, slot, siteConfig.customFields?.learnerFeatures]);
  useEffect(() => {
    const ad = element.current;
    if (!allowed || !ad || ad.dataset.requested) return;
    let observer: IntersectionObserver | undefined;
    const request = () => {
      if (ad.dataset.requested || !ad.isConnected || ad.offsetWidth === 0) return;
      ad.dataset.requested = 'true';
      if (!document.getElementById('c101-adsense-script')) {
        const script = document.createElement('script');
        script.id = 'c101-adsense-script';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(String(client))}`;
        document.head.appendChild(script);
      }
      const browser = window as AdWindow;
      browser.adsbygoogle = browser.adsbygoogle || [];
      browser.adsbygoogle.push({});
      observer?.disconnect();
    };
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) request();
    }, {rootMargin: '300px'});
    observer.observe(ad);
    return () => observer?.disconnect();
  }, [allowed, client, permalink]);
  if (!allowed) return null;
  return (
    <aside className={styles.ad} aria-label="广告">
      <span className={styles.label}>广告</span>
      <ins ref={element} className="adsbygoogle" style={{display: 'block'}}
        data-ad-client={String(client)} data-ad-slot={String(slot)}
        data-ad-format="horizontal" data-full-width-responsive="false" />
    </aside>
  );
}
