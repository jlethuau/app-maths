import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useGame } from '@/context/GameContext';
import { useApp } from '@/context/AppContext';
import { GameConfig } from '@/types';
import { GAME_CONSTANTS } from '@/constants/game';
import { getTableLevelInfo } from '@/utils/tableStatsUtils';
import styles from './SettingsPage.module.css';

export const SettingsPage: FC = () => {
  const navigate = useNavigate();
  const { startGame } = useGame();
  const { settings, userProgress } = useApp();

  const [selectedTables, setSelectedTables] = useState<number[]>([2, 3]);
  const [timePerQuestion, setTimePerQuestion] = useState(settings.timePerQuestion);
  
  const allTables = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleTableToggle = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table].sort((a, b) => a - b)
    );
  };

  const handleStart = () => {
    if (selectedTables.length === 0) {
      alert('Sélectionne au moins une table !');
      return;
    }

    const config: GameConfig = {
      mode: 'timed',
      selectedTables,
      timePerQuestion,
      numberOfQuestions: GAME_CONSTANTS.DEFAULT_QUESTIONS_PER_GAME,
    };

    startGame(config);
    navigate('/game');
  };

  return (
    <div className={styles.page}>
      <Container maxWidth="md">
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <button className={styles.backButton} onClick={() => navigate('/home')}>
              ←
            </button>
            <h1 className={styles.title}>Paramètres de partie</h1>
            <div className={styles.spacer} />
          </div>

          {/* Sélection des tables */}
          <Card variant="default" padding="lg">
            <h2 className={styles.sectionTitle}>Choisis tes tables</h2>

            <div className={styles.tableGrid}>
              {allTables.map((table) => {
                const stats = userProgress.statistics.tableStats[table];
                const levelInfo = stats ? getTableLevelInfo(stats.level) : null;
                
                return (
                  <button
                    key={table}
                    onClick={() => handleTableToggle(table)}
                    className={`${styles.tableButton} ${
                      selectedTables.includes(table) ? styles.tableButtonSelected : ''
                    }`}
                  >
                    <div className={styles.tableNumber}>{table}</div>
                    {levelInfo && (
                      <div className={styles.tableBadge}>{levelInfo.emoji}</div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className={styles.quickActions}>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTables(allTables)}>
                Tout sélectionner
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTables([])}>
                Tout désélectionner
              </Button>
            </div>
          </Card>

          {/* Paramètres de temps */}
          <Card variant="default" padding="lg">
            <h2 className={styles.sectionTitle}>Temps par question</h2>

            <div className={styles.timeOptions}>
              {GAME_CONSTANTS.TIME_OPTIONS.map((time) => (
                <button
                  key={time}
                  onClick={() => setTimePerQuestion(time)}
                  className={`${styles.timeButton} ${
                    timePerQuestion === time ? styles.timeButtonSelected : ''
                  }`}
                >
                  {time === Infinity ? '∞' : `${time}s`}
                </button>
              ))}
            </div>

            <p className={styles.timeHint}>
              {timePerQuestion === Infinity
                ? '♾️ Pas de limite de temps - Prends ton temps !'
                : timePerQuestion <= 10
                ? '⚡ Rapide ! Plus de points si tu réponds vite'
                : '🎯 Prends ton temps pour réfléchir'}
            </p>
          </Card>

          {/* Bouton démarrer */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleStart}
            disabled={selectedTables.length === 0}
          >
            Commencer ! 🚀
          </Button>
        </div>
      </Container>
    </div>
  );
};
