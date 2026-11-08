import type {Role} from '../types';

/** Compact grouped choices for the question bank and saved preferences. */
export function RoleSelect({roles, value, onChange, className}: {
  roles: Role[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  const groups = [...new Set(roles.map(role => role.group ?? role.label))];
  return <select aria-label="目标岗位" className={className} value={value} onChange={event => onChange(event.target.value)}>
    <option value="">全部岗位</option>
    {groups.map(group => <optgroup key={group} label={group}>
      {roles.filter(role => (role.group ?? role.label) === group).map(role =>
        <option key={role.id} value={role.id}>{role.label}</option>)}
    </optgroup>)}
  </select>;
}
