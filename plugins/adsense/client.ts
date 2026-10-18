import siteConfig from '@generated/docusaurus.config';

import {accessOf, getLearner, whenAccessKnown} from '@site/src/learning/store';

/**
 * Loads AdSense Auto ads once per visit for readers without paid access.
 * Placement and formats are chosen in the AdSense dashboard. Pro and trial
 * readers never load the script; signing in on a page that already shows ads
 * clears them on the next full load.
 */
if (typeof window !== 'undefined') {
  const client = siteConfig.customFields?.adsenseClient;
  if (typeof client === 'string' && client) {
    void whenAccessKnown().then(() => {
      if (accessOf(getLearner()) === 'active') return;
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
      document.head.appendChild(script);
    });
  }
}
