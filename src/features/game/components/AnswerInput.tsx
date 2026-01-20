import { FC, useState, FormEvent, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './AnswerInput.module.css';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const AnswerInput: FC<AnswerInputProps> = ({
  onSubmit,
  disabled = false,
  autoFocus = true,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const answer = parseInt(value, 10);
    if (!isNaN(answer)) {
      onSubmit(answer);
      setValue('');
      
      // Re-focus l'input après la soumission
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Accepte seulement les chiffres et le signe moins
    const newValue = e.target.value.replace(/[^0-9-]/g, '');
    setValue(newValue);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.answerForm}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={styles.input}
          placeholder="Ta réponse..."
          aria-label="Réponse"
          autoComplete="off"
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={disabled || value === ''}
      >
        Valider ✓
      </Button>
    </form>
  );
};
