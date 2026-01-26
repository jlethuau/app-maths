import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { BADGE_DEFINITIONS } from '@/constants/badges';
import styles from './BadgesPage.module.css';

export const BadgesPage: FC = () => {
  const navigate = useNavigate();
  const { userProgress } = useApp();

  const unlockedBadgeIds = userProgress.badges.map((b) => b.id);

  return (
    <div className={styles.page}>
      <Container maxWidth="md">
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <button className={styles.backButton} onClick={() => navigate('/home')}>
              ←
            </button>
            <h1 className={styles.title}>Badges</h1>
            <div className={styles.spacer} />
          </div>

          {/* Stats badges */}
          <Card variant="gradient" padding="md">
            <div className={styles.badgeStats}>
              <div className={styles.badgeStat}>
                <div className={styles.badgeStatValue}>{userProgress.badges.length}</div>
                <div className={styles.badgeStatLabel}>Débloqués</div>
              </div>
              <div className={styles.badgeSeparator}>/</div>
              <div className={styles.badgeStat}>
                <div className={styles.badgeStatValue}>{BADGE_DEFINITIONS.length}</div>
                <div className={styles.badgeStatLabel}>Total</div>
              </div>
            </div>
          </Card>

          {/* Liste des badges */}
          <div className={styles.badgesList}>
            {BADGE_DEFINITIONS.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.id);
              return (
                <Card
                  key={badge.id}
                  variant={isUnlocked ? 'default' : 'glass'}
                  padding="md"
                  className={`${styles.badgeCard} ${isUnlocked ? styles.unlocked : styles.locked}`}
                >
                  <div className={styles.badgeIcon}>{badge.icon}</div>
                  <div className={styles.badgeInfo}>
                    <div className={styles.badgeName}>{badge.name}</div>
                    <div className={styles.badgeDescription}>{badge.description}</div>
                  </div>
                  {isUnlocked && <div className={styles.checkmark}>✓</div>}
                </Card>
              );
            })}
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/settings')}>
            Jouer pour débloquer plus ! 🚀
          </Button>
        </div>
      </Container>
    </div>
  );
};
