import { FC } from 'react';
import { Card } from '@/components/ui/Card';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  operand1: number;
  operand2: number;
  questionNumber?: number;
  totalQuestions?: number;
  userAnswer?: string;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  operand1,
  operand2,
  questionNumber,
  totalQuestions,
  userAnswer = '',
}) => {
  return (
    <Card variant="gradient" padding="lg" className={styles.questionCard}>
      {questionNumber && totalQuestions && (
        <div className={styles.questionNumber}>
          Question {questionNumber} / {totalQuestions}
        </div>
      )}
      
      <div className={styles.question}>
        <span className={styles.operand}>{operand1}</span>
        <span className={styles.operator}>×</span>
        <span className={styles.operand}>{operand2}</span>
        <span className={styles.equals}>=</span>
        <span className={styles.answer}>{userAnswer || '?'}</span>
      </div>
    </Card>
  );
};
