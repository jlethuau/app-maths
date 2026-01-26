import { FC, FormEvent, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import styles from './AnswerInput.module.css';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const AnswerInput: FC<AnswerInputProps> = ({
  onSubmit,
  disabled = false,
  value,
  onChange,
}) => {
  const { settings } = useApp();

  const playKeySound = useCallback(() => {
    if (!settings.soundEnabled) return;
    try {
      const AudioContextRef =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextRef) return;
      const audioContext = new AudioContextRef();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = 520;
      gainNode.gain.value = 0.04;
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch {
      // Audio peut être bloqué selon le navigateur
    }
  }, [settings.soundEnabled]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const answer = parseInt(value, 10);
    if (!isNaN(answer)) {
      onSubmit(answer);
      onChange('');
    }
  };

  const handleKeyPress = (key: string) => {
    if (disabled) return;
    playKeySound();
    onChange(value === '0' ? key : `${value}${key}`);
  };

  const handleClear = () => {
    if (disabled) return;
    playKeySound();
    onChange('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.answerForm}>
      <div className={styles.keypad} role="group" aria-label="Clavier numérique">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            type="button"
            className={styles.key}
            onClick={() => handleKeyPress(digit)}
            disabled={disabled}
          >
            {digit}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.key} ${styles.keyAction}`}
          onClick={handleClear}
          disabled={disabled}
        >
          Effacer
        </button>
        <button
          type="button"
          className={styles.key}
          onClick={() => handleKeyPress('0')}
          disabled={disabled}
        >
          0
        </button>
        <button
          type="submit"
          className={`${styles.key} ${styles.keySubmit}`}
          disabled={disabled || value === ''}
          onClick={playKeySound}
        >
          Valider ✓
        </button>
      </div>
    </form>
  );
};
