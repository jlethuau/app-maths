import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashScreen.module.css';

export const SplashScreen: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.splashContainer}>
      <div className={styles.animationWrapper}>
        <div className={styles.calculation}>
          <span className={styles.operand1}>2</span>
          <span className={styles.operator}>×</span>
          <span className={styles.operand2}>8</span>
          <span className={styles.equals}>=</span>
          <span className={styles.result}>16</span>
        </div>
      </div>
      <div className={styles.appName}>App Maths</div>
      <div className={styles.tagline}>Apprends les tables en t'amusant !</div>
    </div>
  );
};
