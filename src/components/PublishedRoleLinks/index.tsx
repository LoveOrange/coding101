import Link from '@docusaurus/Link';
import {publishedRoleEntries} from '../../data/interviewRoadmaps/outlineCatalog';

export default function PublishedRoleLinks() {
  return <ul data-published-roles>
    {publishedRoleEntries.map((entry) => <li key={entry.href}>
      <Link to={entry.href}>{entry.label}</Link>{entry.status === 'building' ? '（建设中）' : ''}
    </li>)}
  </ul>;
}
