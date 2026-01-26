import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import styles from './StatsPage.module.css';

export const StatsPage: FC = () => {
  const navigate = useNavigate();
  const { userProgress } = useApp();
  const { statistics } = userProgress;

  // Calcul du taux de réussite
  const successRate =
    statistics.totalQuestionsAnswered > 0
      ? Math.round((statistics.totalCorrectAnswers / statistics.totalQuestionsAnswered) * 100)
      : 0;

  // Stats par table
  const tableStats = Object.entries(statistics.tableStats || {})
    .map(([table, stats]) => {
      const total = stats.questionsAnswered;
      const rate = total > 0 ? Math.round((stats.correctAnswers / total) * 100) : 0;
      return { table: parseInt(table), total, rate, correctAnswers: stats.correctAnswers, incorrectAnswers: total - stats.correctAnswers };
    })
    .sort((a, b) => b.rate - a.rate);

  return (
    <div className={styles.page}>
      <Container maxWidth="md">
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <button className={styles.backButton} onClick={() => navigate('/home')}>
              ←
            </button>
            <h1 className={styles.title}>Statistiques</h1>
            <div className={styles.spacer} />
          </div>

          {/* Stats globales */}
          <Card variant="gradient" padding="lg">
            <h2 className={styles.sectionTitle}>Performance globale</h2>
            <div className={styles.globalStats}>
              <div className={styles.mainStat}>
                <div className={styles.mainStatValue}>{successRate}%</div>
                <div className={styles.mainStatLabel}>Taux de réussite</div>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{statistics.totalGamesPlayed}</div>
                  <div className={styles.statLabel}>Parties</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{statistics.totalQuestionsAnswered}</div>
                  <div className={styles.statLabel}>Questions</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{statistics.highestCombo}</div>
                  <div className={styles.statLabel}>Meilleur combo</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>{userProgress.totalPoints}</div>
                  <div className={styles.statLabel}>Points</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats par table */}
          <Card variant="default" padding="lg">
            <h2 className={styles.sectionTitle}>Performance par table</h2>
            {tableStats.length > 0 ? (
              <div className={styles.tableStatsList}>
                {tableStats.map(({ table, total, rate, correctAnswers, incorrectAnswers }) => (
                  <div key={table} className={styles.tableStat}>
                    <div className={styles.tableStatHeader}>
                      <div className={styles.tableStatTitle}>Table de {table}</div>
                      <div className={`${styles.tableStatRate} ${rate >= 80 ? styles.good : ''}`}>
                        {rate}%
                      </div>
                    </div>
                    <div className={styles.tableStatDetails}>
                      <span className={styles.correct}>✓ {correctAnswers}</span>
                      <span className={styles.incorrect}>✗ {incorrectAnswers}</span>
                      <span className={styles.total}>Total: {total}</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${rate}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>Commence à jouer pour voir tes statistiques !</p>
            )}
          </Card>

          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/settings')}>
            Nouvelle partie 🚀
          </Button>
        </div>
      </Container>
    </div>
  );
};
