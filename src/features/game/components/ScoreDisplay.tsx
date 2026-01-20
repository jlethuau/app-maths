import { FC } from 'react';
import { getComboColor } from '@/utils/gameUtils';
import styles from './ScoreDisplay.module.css';

interface ScoreDisplayProps {
  score: number;
  combo: number;
  maxCombo: number;
}

export const ScoreDisplay: FC<ScoreDisplayProps> = ({
  score,
  combo,
  maxCombo,
}) => {
  return (
    <div className={styles.scoreContainer}>
      {/* Score principal */}
      <div className={styles.scoreSection}>
        <div className={styles.label}>Score Total</div>
        <div className={styles.score}>{score}</div>
      </div>

      {/* Série en cours */}
      <div className={styles.comboSection}>
        <div className={styles.label}>Série en cours</div>
        <div 
          className={`${styles.comboValue} ${combo >= 2 ? styles.comboActive : ''}`}
          style={{ color: combo >= 2 ? getComboColor(combo) : undefined }}
        >
          {combo > 0 && combo >= 2 && <span className={styles.comboIcon}>🔥</span>}
          <span className={styles.comboNumber}>{combo}</span>
        </div>
      </div>

      {/* Meilleure série */}
      <div className={styles.maxComboSection}>
        <div className={styles.label}>Meilleure série</div>
        <div className={styles.maxCombo}>{maxCombo}</div>
      </div>
    </div>
  );
};
