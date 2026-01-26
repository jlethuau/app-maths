import { FC, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  randomConfettiStyle,
  randomPopInStyle,
  randomParticleStyle,
  randomChaoticFloatVars,
  randomWiggleVars,
  randomBounceVars,
  randomGlowVars,
} from '@/utils/animationUtils';
import styles from './RandomAnimationsDemo.module.css';

/**
 * Composant de démonstration pour les animations aléatoires
 * Ce composant n'est utilisé qu'à des fins de développement et de test
 */
export const RandomAnimationsDemo: FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const badges = [
    { id: 1, emoji: '🏆', name: 'Champion' },
    { id: 2, emoji: '⭐', name: 'Expert' },
    { id: 3, emoji: '🔥', name: 'Série' },
    { id: 4, emoji: '⚡', name: 'Rapide' },
    { id: 5, emoji: '🎯', name: 'Précis' },
    { id: 6, emoji: '💪', name: 'Persévérant' },
  ];

  return (
    <div className={styles.demo}>
      <h1 className={styles.title}>Démo Animations Aléatoires</h1>

      {/* Particules d'arrière-plan */}
      {showParticles && (
        <div className={styles.particles}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                ...randomParticleStyle(),
                ...randomChaoticFloatVars(),
              }}
            />
          ))}
        </div>
      )}

      {/* Confettis */}
      {showConfetti && (
        <div className={styles.confetti}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={styles.confettiPiece}
              style={randomConfettiStyle()}
            />
          ))}
        </div>
      )}

      <div className={styles.content}>
        {/* Section 1 : Contrôles */}
        <Card variant="gradient" padding="lg">
          <h2 className={styles.sectionTitle}>Contrôles</h2>
          <div className={styles.controls}>
            <Button onClick={handleConfetti} variant="primary">
              🎉 Lancer Confettis
            </Button>
            <Button
              onClick={() => setShowParticles(!showParticles)}
              variant="secondary"
            >
              {showParticles ? '✕ Masquer' : '✨ Afficher'} Particules
            </Button>
          </div>
        </Card>

        {/* Section 2 : Random Wiggle */}
        <Card variant="default" padding="lg">
          <h2 className={styles.sectionTitle}>Random Wiggle</h2>
          <div className={styles.demoGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${styles.demoBox} ${styles.wiggle}`}
                style={randomWiggleVars()}
              >
                {i}
              </div>
            ))}
          </div>
        </Card>

        {/* Section 3 : Random Bounce */}
        <Card variant="default" padding="lg">
          <h2 className={styles.sectionTitle}>Random Bounce</h2>
          <div className={styles.demoGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${styles.demoBox} ${styles.bounce}`}
                style={randomBounceVars()}
              >
                {i}
              </div>
            ))}
          </div>
        </Card>

        {/* Section 4 : Random Glow */}
        <Card variant="default" padding="lg">
          <h2 className={styles.sectionTitle}>Random Pulse Glow</h2>
          <div className={styles.demoGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${styles.demoBox} ${styles.glow}`}
                style={randomGlowVars()}
              >
                {i}
              </div>
            ))}
          </div>
        </Card>

        {/* Section 5 : Pop In (badges) */}
        <Card variant="default" padding="lg">
          <h2 className={styles.sectionTitle}>Random Pop In (Badges)</h2>
          <div className={styles.badgeGrid}>
            {badges.map((badge, index) => (
              <div
                key={badge.id}
                className={styles.badge}
                style={randomPopInStyle(index)}
              >
                <div className={styles.badgeEmoji}>{badge.emoji}</div>
                <div className={styles.badgeName}>{badge.name}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 6 : Chaotic Float */}
        <Card variant="default" padding="lg">
          <h2 className={styles.sectionTitle}>Chaotic Float</h2>
          <div className={styles.floatContainer}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`${styles.floatBox} ${styles.chaotic}`}
                style={randomChaoticFloatVars()}
              >
                {i}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
