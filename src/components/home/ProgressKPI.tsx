import { FC } from 'react';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';
import styles from './ProgressKPI.module.css';

export const ProgressKPI: FC = () => {
  const { userProgress } = useApp();
  const { statistics } = userProgress;

  // Calcul du taux de réussite global
  const successRate =
    statistics.totalQuestionsAnswered > 0
      ? Math.round((statistics.totalCorrectAnswers / statistics.totalQuestionsAnswered) * 100)
      : 0;

  // Calcul des tables maîtrisées (>= 80% de réussite)
  const masteredTables = Object.entries(statistics.tableStats || {}).filter(([, stats]) => {
    const tableRate = stats.questionsAnswered > 0 ? stats.correctAnswers / stats.questionsAnswered : 0;
    return tableRate >= 0.8 && stats.questionsAnswered >= 5; // Au moins 5 questions
  }).length;

  return (
    <div className={styles.kpiContainer}>
      <Card variant="glass" padding="md" className={styles.kpiCard}>
        <div className={styles.kpiIcon}>🎯</div>
        <div className={styles.kpiValue}>{successRate}%</div>
        <div className={styles.kpiLabel}>Taux de réussite</div>
      </Card>

      <Card variant="glass" padding="md" className={styles.kpiCard}>
        <div className={styles.kpiIcon}>🎮</div>
        <div className={styles.kpiValue}>{statistics.totalGamesPlayed}</div>
        <div className={styles.kpiLabel}>Parties jouées</div>
      </Card>

      <Card variant="glass" padding="md" className={styles.kpiCard}>
        <div className={styles.kpiIcon}>⭐</div>
        <div className={styles.kpiValue}>{masteredTables}/10</div>
        <div className={styles.kpiLabel}>Tables maîtrisées</div>
      </Card>
    </div>
  );
};
