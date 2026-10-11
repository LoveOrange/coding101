import clsx from 'clsx';

import {RATING_LABELS} from '../content';
import {nextInterval} from '../store';
import type {CardState, Rating} from '../types';
import {formatInterval} from '../ui';
import styles from './review.module.css';

export const RATINGS: Rating[] = ['again', 'hard', 'good'];

export function RatingBar({
  previous,
  selected,
  disabled,
  onRate,
}: {
  previous?: CardState;
  selected?: Rating;
  disabled?: boolean;
  onRate: (rating: Rating) => void;
}) {
  return (
    <div className={styles.ratings}>
      {RATINGS.map((rating, i) => (
        <button
          key={rating}
          type="button"
          disabled={disabled}
          className={clsx(styles.rating, !disabled && selected === rating && styles.ratingSelected, disabled && styles.ratingDisabled)}
          onClick={() => onRate(rating)}>
          <span className={clsx(styles.ratingDot, styles[`ratingDot_${rating}`])} />
          {RATING_LABELS[rating]}
          <span className={styles.ratingWhen}>{formatInterval(nextInterval(rating, previous))}</span>
          <span className={styles.ratingKey}>{i + 1}</span>
        </button>
      ))}
    </div>
  );
}

export function Toast({message, onUndo}: {message: string; onUndo?: () => void}) {
  return (
    <div className={styles.toast} role="status">
      <span>{message}</span>
      {onUndo && (
        <button type="button" className={styles.toastButton} onClick={onUndo}>
          撤销
        </button>
      )}
    </div>
  );
}
