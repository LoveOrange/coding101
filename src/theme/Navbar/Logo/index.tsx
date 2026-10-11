import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

/** Text logo from the redesign: "coding" with an accent "101". */
export default function NavbarLogo(): ReactNode {
  return (
    <Link to="/" className="navbar__brand c101-logo" aria-label="Coding 101 首页">
      coding<span>101</span>
    </Link>
  );
}
