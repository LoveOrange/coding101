import clsx from 'clsx';
import {useEffect, useRef} from 'react';
import type {Role} from '../types';
import {scrollSelection} from './scrollSelection';
import styles from './RolePicker.module.css';

const platforms = [
  {id: 'shared', label: '共同基础'}, {id: 'android', label: 'Android'}, {id: 'ios', label: 'iOS'},
  {id: 'flutter', label: 'Flutter'}, {id: 'react-native', label: 'React Native'}, {id: 'all', label: '全部平台'},
];

function platformOf(id: string): string {
  return platforms.find(platform => platform.id !== 'all' && id.startsWith(`mobile-${platform.id}`))?.id ?? 'all';
}

export function RolePicker({roles, value, onChange}: {roles: Role[]; value: string; onChange: (id: string) => void}) {
  const picker = useRef<HTMLDivElement>(null);
  const selected = roles.find(role => role.id === value);
  const groups = [...new Set(roles.map(role => role.group ?? role.label))];
  const variants = roles.filter(role => (role.group ?? role.label) === selected?.group);
  const mobile = selected?.group === '移动端开发';
  const platform = platformOf(value);
  const choices = mobile ? variants.filter(role => platformOf(role.id) === platform) : variants;
  useEffect(() => {
    const reveal = () => picker.current?.querySelectorAll<HTMLElement>('[role="group"]').forEach(scrollSelection);
    reveal();
    window.addEventListener('resize', reveal);
    return () => window.removeEventListener('resize', reveal);
  }, [value]);
  const chooseGroup = (group: string) => {
    if (selected?.group !== group) onChange(roles.find(role => (role.group ?? role.label) === group)!.id);
  };
  return <div ref={picker} className={styles.picker}>
    <div className={styles.row}>
      <span className={styles.label}>浏览岗位</span>
      <div className={styles.choices} role="group" aria-label="岗位方向">
        {groups.map(group => <button key={group} type="button" aria-pressed={selected?.group === group}
          className={clsx(styles.pill, selected?.group === group && styles.active)} onClick={() => chooseGroup(group)}>{group}</button>)}
        <button type="button" className={clsx(styles.pill, !selected && styles.active)} aria-pressed={!selected} onClick={() => onChange('')}>全部</button>
      </div>
    </div>
    {mobile && <div className={styles.row}>
      <span className={styles.label}>目标平台</span>
      <div className={styles.choices} role="group" aria-label="目标平台">
        {platforms.map(item => <button key={item.id} type="button" aria-pressed={platform === item.id}
          className={clsx(styles.pill, platform === item.id && styles.active)}
          onClick={() => { if (platform !== item.id) onChange(variants.find(role => platformOf(role.id) === item.id)!.id); }}>{item.label}</button>)}
      </div>
    </div>}
    {choices.length > 1 && <div className={styles.row}>
      <span className={styles.label}>{mobile ? (platform === 'flutter' || platform === 'react-native' ? '目标宿主' : '主修语言') : '技术栈'}</span>
      <div className={styles.choices} role="group" aria-label="岗位技术栈">
        {choices.map(role => <button key={role.id} type="button" aria-pressed={role.id === value} aria-label={role.label}
          className={clsx(styles.pill, role.id === value && styles.active)} onClick={() => onChange(role.id)}>{mobile ? role.label.split(' / ')[1]?.replace('）', '') ?? role.label : role.label}</button>)}
      </div>
    </div>}
  </div>;
}
