import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AppMenu } from '@/components/layout/AppMenu';
import { ProgressKPI } from '@/components/home/ProgressKPI';
import { useApp } from '@/context/AppContext';
import styles from './NewHomePage.module.css';

export const NewHomePage: FC = () => {
  const navigate = useNavigate();
  const { userProgress } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStartGame = () => {
    navigate('/settings');
  };

  return (
    <div className={styles.page}>
      <Container maxWidth="md">
        <div className={styles.content}>
          {/* Header avec menu */}
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className="text-gradient-primary">App Maths</span>
            </h1>
            <button className={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
              ☰
            </button>
          </div>

          <p className={styles.subtitle}>Apprends les tables en t'amusant !</p>

          {/* KPI Progress */}
          <ProgressKPI />

          {/* Carte de bienvenue */}
          <Card variant="gradient" padding="lg" className={styles.welcomeCard}>
            <div className={styles.welcomeIcon}>👋</div>
            <h2 className={styles.welcomeTitle}>Prêt à jouer ?</h2>
            <p className={styles.welcomeText}>
              Continue à t'entraîner et débloque de nouveaux badges !
            </p>
          </Card>

          {/* Bouton principal */}
          <Button variant="primary" size="lg" fullWidth onClick={handleStartGame}>
            Démarrer une partie 🚀
          </Button>

          {/* Quick stats */}
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <span className={styles.quickStatIcon}>🔥</span>
              <span className={styles.quickStatLabel}>Meilleur combo</span>
              <span className={styles.quickStatValue}>{userProgress.statistics.highestCombo}</span>
            </div>
            <div className={styles.quickStat}>
              <span className={styles.quickStatIcon}>⚡</span>
              <span className={styles.quickStatLabel}>Questions répondues</span>
              <span className={styles.quickStatValue}>
                {userProgress.statistics.totalQuestionsAnswered}
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Menu Bottom Sheet */}
      <AppMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};
