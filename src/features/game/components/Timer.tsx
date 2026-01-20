import { FC, useEffect, useState } from 'react';
import styles from './Timer.module.css';

interface TimerProps {
  totalTime: number; // en secondes
  isActive: boolean;
  onTimeUp: () => void;
}

export const Timer: FC<TimerProps> = ({ totalTime, isActive, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(totalTime);

  useEffect(() => {
    setTimeRemaining(totalTime);
  }, [totalTime]);

  useEffect(() => {
    if (!isActive) return;

    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, onTimeUp]);

  const percentage = (timeRemaining / totalTime) * 100;
  
  // Couleur basée sur le temps restant
  const getColor = () => {
    if (percentage > 50) return 'var(--color-success)';
    if (percentage > 25) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const isLow = percentage <= 25;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerLabel}>
        <span>⏱️ Temps restant</span>
        <span className={`${styles.time} ${isLow ? styles.timeLow : ''}`}>
          {timeRemaining}s
        </span>
      </div>
      
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${isLow ? styles.progressLow : ''}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
    </div>
  );
};
