import { FC } from 'react';
import { Container } from './components/layout/Container';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import styles from './App.module.css';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <Container maxWidth="md" centered>
        <div className={styles.content}>
          {/* Logo/Titre */}
          <h1 className={styles.title}>
            <span className="text-gradient-primary">App Maths</span>
          </h1>
          <p className={styles.subtitle}>
            Tables de Multiplication 🎯
          </p>

          {/* Card de bienvenue */}
          <Card variant="gradient" padding="lg" className={styles.welcomeCard}>
            <div className={styles.cardContent}>
              <div className={styles.icon}>🎮</div>
              <h2>Bienvenue !</h2>
              <p>
                Prêt à devenir un champion des tables de multiplication ?
                Entraîne-toi, débloque des badges et bats tes records !
              </p>
              
              <div className={styles.buttonGroup}>
                <Button variant="primary" size="lg" fullWidth>
                  Commencer 🚀
                </Button>
                <Button variant="secondary" size="md" fullWidth>
                  Voir mes statistiques 📊
                </Button>
              </div>
            </div>
          </Card>

          {/* Info cards */}
          <div className={styles.features}>
            <Card variant="glass" padding="md" hover>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>⭐</div>
                <h3>Gagne des Points</h3>
                <p>Enchaîne les bonnes réponses pour des combos x2, x3, x4 !</p>
              </div>
            </Card>

            <Card variant="glass" padding="md" hover>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🏆</div>
                <h3>Débloque des Badges</h3>
                <p>Maîtrise chaque table et collectionne tous les trophées !</p>
              </div>
            </Card>

            <Card variant="glass" padding="md" hover>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>📈</div>
                <h3>Progresse</h3>
                <p>Suis tes stats et regarde-toi t'améliorer !</p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
