import { FC } from 'react';
import { getComboLabel, getComboColor } from '@/utils/gameUtils';
import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  score: number;
  combo: number;
  maxCombo?: number;
}

export const ScoreDisplay: FC<ScoreDisplayProps> = ({
  score,
  combo,
  maxCombo,
}) => {
  const comboLabel = getComboLabel(combo);
  const hasCombo = combo >= 2;

  return (
    <div className={styles.scoreContainer}>
      <div className={styles.scoreSection}>
        <div className={styles.label}>Score</div>
        <div className={styles.score}>{score}</div>
      </div>

      {hasCombo && (
        <div
          className={`${styles.comboSection} ${styles.comboActive}`}
          style={{ color: getComboColor(combo) }}
        >
          <div className={styles.comboLabel}>{comboLabel}</div>
          <div className={styles.comboIcon}>🔥</div>
        </div>
      )}

      {maxCombo !== undefined && maxCombo > 0 && (
        <div className={styles.maxComboSection}>
          <div className={styles.label}>Meilleur combo</div>
          <div className={styles.maxCombo}>×{maxCombo}</div>
        </div>
      )}
    </div>
  );
};
