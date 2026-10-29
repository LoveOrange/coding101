import siteConfig from '@generated/docusaurus.config';
import type {ClientModule} from '@docusaurus/types';
import {analyticsPageLocation} from '../../src/analytics/utm';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
let installed = false;

const client: ClientModule = {
  onRouteDidUpdate({location, previousLocation}) {
    const id = siteConfig.customFields?.analyticsId;
    if (typeof id !== 'string' || !id || /\/privacy\/?$/.test(location.pathname)) return;
    if (window.location.hostname !== new URL(siteConfig.url).hostname) return;
    const pageLocation = analyticsPageLocation(window.location.origin, location.pathname, location.search);
    const browser = window as AnalyticsWindow;
    if (!installed) {
      installed = true;
      browser.dataLayer = browser.dataLayer || [];
      browser.gtag = browser.gtag || function () {browser.dataLayer!.push(arguments);};
      // Queue consent before configuration. Google's CMP updates these signals
      // for visitors who make a choice in the European regulations message.
      browser.gtag('consent', 'default', {
        ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied',
        region: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH'],
        wait_for_update: 500,
      });
      browser.gtag('js', new Date());
      browser.gtag('config', id, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
        page_location: pageLocation});
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(script);
    }
    if (!previousLocation || location.pathname !== previousLocation.pathname) {
      window.setTimeout(() => browser.gtag?.('event', 'page_view', {
        // Capture the route before an asynchronous Topic URL rewrite; forward only campaign labels.
        page_location: pageLocation,
        page_title: document.title,
      }), 0);
    }
  },
};
export default client;
