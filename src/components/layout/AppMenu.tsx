import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from './BottomSheet';
import { APP_VERSION } from '@/constants/version';
import { resetAppDataOnDevice } from '@/utils/storage';
import styles from './AppMenu.module.css';

interface AppMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppMenu: FC<AppMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleResetAppData = async () => {
    const ok = window.confirm(
      'Voulez-vous supprimer toutes les données stockées en mémoire sur cet appareil ?'
    );
    if (!ok) return;

    // Ferme le menu tout de suite (puis reload)
    onClose();
    await resetAppDataOnDevice();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.menu}>
        <h2 className={styles.menuTitle}>Menu</h2>

        <nav className={styles.menuList}>
          <button className={styles.menuItem} onClick={() => handleNavigate('/home')}>
            <span className={styles.menuIcon}>🏠</span>
            <span className={styles.menuLabel}>Accueil</span>
          </button>

          <button className={styles.menuItem} onClick={() => handleNavigate('/stats')}>
            <span className={styles.menuIcon}>📊</span>
            <span className={styles.menuLabel}>Statistiques</span>
          </button>

          <button className={styles.menuItem} onClick={() => handleNavigate('/badges')}>
            <span className={styles.menuIcon}>🏆</span>
            <span className={styles.menuLabel}>Badges</span>
          </button>

          <button className={styles.menuItem} onClick={() => handleNavigate('/settings')}>
            <span className={styles.menuIcon}>⚙️</span>
            <span className={styles.menuLabel}>Paramètres</span>
          </button>
        </nav>

        <div className={styles.dangerZone}>
          <button
            className={`${styles.menuItem} ${styles.dangerItem}`}
            onClick={handleResetAppData}
          >
            <span className={styles.menuIcon}>🗑️</span>
            <span className={styles.menuLabel}>Supprimer mes données</span>
          </button>
        </div>

        <div className={styles.version}>v{APP_VERSION}</div>
      </div>
    </BottomSheet>
  );
};
