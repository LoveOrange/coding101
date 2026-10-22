import {useId, type ReactNode} from 'react';

import styles from './Diagram.module.css';

/**
 * Building blocks for small reference diagrams in articles. Each panel is a
 * 380-unit-wide SVG so it stays legible when panels stack on a phone.
 */
export function Figure({label, children}: {label: string; children: ReactNode}): JSX.Element {
  return (
    <figure className={styles.figure} role="group" aria-label={label}>
      <div className={styles.panels}>{children}</div>
    </figure>
  );
}

export function Panel({height, label, children}: {height: number; label: string; children: (marker: string) => ReactNode}): JSX.Element {
  const marker = `arrow-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox={`0 0 380 ${height}`} role="img" aria-label={label} className={styles.panel}>
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className={styles.arrowHead} />
        </marker>
      </defs>
      {children(marker)}
    </svg>
  );
}

const BOX_CLASS = {var: styles.varBox, obj: styles.objBox, empty: styles.emptyBox};

export function Box({x, y, w, h, kind}: {x: number; y: number; w: number; h: number; kind: keyof typeof BOX_CLASS}): JSX.Element {
  return <rect x={x} y={y} width={w} height={h} rx={8} className={BOX_CLASS[kind]} />;
}

export function Arrow({d, marker, old}: {d: string; marker: string; old?: boolean}): JSX.Element {
  return <path d={d} className={old ? styles.arrowOld : styles.arrow} markerEnd={old ? undefined : `url(#${marker})`} />;
}

export function Label({x, y, children, mono, strong, anchor = 'middle'}: {x: number; y: number; children: ReactNode; mono?: boolean; strong?: boolean; anchor?: 'start' | 'middle'}): JSX.Element {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${mono ? styles.mono : styles.text} ${strong ? styles.strong : ''}`}>
      {children}
    </text>
  );
}
