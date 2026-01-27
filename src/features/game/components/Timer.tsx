import { FC, useEffect, useState, useRef } from 'react';
import styles from './Timer.module.css';

interface TimerProps {
  totalTime: number; // en secondes
  isActive: boolean;
  onTimeUp: () => void;
  onTick?: (timeRemaining: number) => void;
}

export const Timer: FC<TimerProps> = ({ totalTime, isActive, onTimeUp, onTick }) => {
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const hasCalledTimeUp = useRef(false);

  useEffect(() => {
    setTimeRemaining(totalTime);
    hasCalledTimeUp.current = false;
    onTick?.(totalTime);
  }, [totalTime, onTick]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = prev <= 1 ? 0 : prev - 1;

        if (next === 0) {
          clearInterval(interval);
          // Appeler onTimeUp de manière asynchrone pour éviter le setState pendant render
          if (!hasCalledTimeUp.current) {
            hasCalledTimeUp.current = true;
            setTimeout(() => onTimeUp(), 0);
          }
        }

        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp, onTick]);

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
