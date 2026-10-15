import {type ReactNode, useEffect, useRef} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Layout from '@theme/Layout';

import {useLearningIndex} from '../content';
import {applyMock, type MockPreset} from '../mock';
import {learnerActions} from '../store';

const PRESETS: MockPreset[] = ['guest', 'free', 'trial', 'pro', 'expired'];

/** Apply ?mock=<preset> once, in builds made with LEARNER_MOCKS=true. */
function useMockPreset(isBrowser: boolean) {
  const {siteConfig} = useDocusaurusContext();
  const index = useLearningIndex();
  const applied = useRef(false);
  useEffect(() => {
    if (applied.current || !isBrowser || !siteConfig.customFields?.learnerMocks) return;
    applied.current = true;
    const params = new URLSearchParams(window.location.search);
    const preset = params.get('mock') as MockPreset | null;
    if (!preset || !PRESETS.includes(preset)) return;
    applyMock(preset, index);
    if (params.get('region') === 'intl') learnerActions.setRegion('intl');
    params.delete('mock');
    params.delete('region');
    const search = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`);
  }, [index, isBrowser, siteConfig.customFields]);
}

/**
 * Learner pages depend on localStorage and query parameters, neither of which
 * exists at build time. Render an empty shell during SSR and hydration.
 */
export function ClientPage({
  title,
  description,
  noFooter = true,
  fallback,
  children,
}: {
  title: string;
  description?: string;
  noFooter?: boolean;
  fallback?: ReactNode;
  children: () => ReactNode;
}) {
  const isBrowser = useIsBrowser();
  useMockPreset(isBrowser);
  return (
    <Layout title={title} description={description} noFooter={noFooter}>
      {isBrowser ? children() : fallback ?? <main style={{minHeight: 'calc(100vh - var(--ifm-navbar-height))'}} />}
    </Layout>
  );
}
