import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from './BottomSheet';
import styles from './AppMenu.module.css';

interface AppMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Récupération automatique de la version depuis package.json
const appVersion = import.meta.env.VITE_APP_VERSION || '0.3.0';

export const AppMenu: FC<AppMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
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

        <div className={styles.version}>v{appVersion}</div>
      </div>
    </BottomSheet>
  );
};
