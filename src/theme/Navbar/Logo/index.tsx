import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/** Text logo from the redesign: "coding" with an accent "101". */
export default function NavbarLogo(): ReactNode {
  const english = useDocusaurusContext().i18n.currentLocale === 'en';
  return (
    <Link to="/" className="navbar__brand c101-logo" aria-label={english ? 'Coding 101 home' : 'Coding 101 首页'}>
      coding<span>101</span>
    </Link>
  );
}
