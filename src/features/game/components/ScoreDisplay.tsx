import { FC, useState, useEffect } from 'react';
import { getComboColor } from '@/utils/gameUtils';
import { randomWiggleVars, randomGlowVars } from '@/utils/animationUtils';
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
  // Générer des styles d'animation aléatoires pour le combo
  const [comboAnimationStyle, setComboAnimationStyle] = useState<React.CSSProperties>({});
  const [flameStyle, setFlameStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (combo >= 2) {
      setComboAnimationStyle({
        ...randomWiggleVars(),
        ...randomGlowVars(),
      });
      setFlameStyle(randomWiggleVars());
    } else {
      setComboAnimationStyle({});
      setFlameStyle({});
    }
  }, [combo]);

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
          style={{ 
            color: combo >= 2 ? getComboColor(combo) : undefined,
            ...comboAnimationStyle,
          }}
        >
          {combo > 0 && combo >= 2 && (
            <span 
              className={styles.comboIcon}
              style={flameStyle}
            >
              🔥
            </span>
          )}
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
