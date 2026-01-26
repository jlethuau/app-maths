import { FC } from 'react';
import { Badge } from '@/types';
import { Button } from '@/components/ui/Button';
import styles from './BadgeUnlockPopup.module.css';

interface BadgeUnlockPopupProps {
  badges: Badge[];
  onContinue: () => void;
}

export const BadgeUnlockPopup: FC<BadgeUnlockPopupProps> = ({ badges, onContinue }) => {
  if (badges.length === 0) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.title}>
          {badges.length === 1 ? '🎉 Nouveau badge !' : '🎉 Nouveaux badges !'}
        </div>

        <div className={styles.badgesList}>
          {badges.map((badge) => (
            <div key={badge.id} className={styles.badgeItem}>
              <div className={styles.badgeIcon}>{badge.icon}</div>
              <div className={styles.badgeInfo}>
                <div className={styles.badgeName}>{badge.name}</div>
                <div className={styles.badgeDescription}>{badge.description}</div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={onContinue}>
          Continuer 🚀
        </Button>
      </div>
    </div>
  );
};
