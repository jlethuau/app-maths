import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useGame } from '@/context/GameContext';
import { useApp } from '@/context/AppContext';
import { GameConfig } from '@/types';
import { GAME_CONSTANTS } from '@/constants/game';
import styles from './HomePage.module.css';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const { startGame } = useGame();
  const { settings, userProgress } = useApp();
  
  const [selectedTables, setSelectedTables] = useState<number[]>([2, 3]);
  const [timePerQuestion, setTimePerQuestion] = useState(settings.timePerQuestion);

  const handleTableToggle = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table)
        ? prev.filter((t) => t !== table)
        : [...prev, table].sort((a, b) => a - b)
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

  const allTables = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className={styles.page}>
      <Container maxWidth="md">
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className="text-gradient-primary">App Maths</span>
            </h1>
            <p className={styles.subtitle}>Tables de Multiplication 🎯</p>
          </div>

          {/* Stats rapides */}
          <Card variant="gradient" padding="md" className={styles.statsCard}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>{userProgress.totalPoints}</div>
                <div className={styles.statLabel}>Points</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{userProgress.level}</div>
                <div className={styles.statLabel}>Niveau</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>{userProgress.badges.length}</div>
                <div className={styles.statLabel}>Badges</div>
              </div>
            </div>
          </Card>

          {/* Sélection des tables */}
          <Card variant="default" padding="lg">
            <h2 className={styles.sectionTitle}>Choisis tes tables</h2>
            
            <div className={styles.tableGrid}>
              {allTables.map((table) => (
                <button
                  key={table}
                  onClick={() => handleTableToggle(table)}
                  className={`${styles.tableButton} ${
                    selectedTables.includes(table) ? styles.tableButtonSelected : ''
                  }`}
                >
                  <div className={styles.tableNumber}>{table}</div>
                </button>
              ))}
            </div>

            <div className={styles.quickActions}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTables(allTables)}
              >
                Tout sélectionner
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTables([])}
              >
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

          {/* Lien vers stats (future) */}
          <div className={styles.links}>
            <button className={styles.link}>
              📊 Voir mes statistiques
            </button>
            <button className={styles.link}>
              🏆 Mes badges
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
