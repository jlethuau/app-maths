import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SplashScreen.module.css';

export const SplashScreen: FC = () => {
  const navigate = useNavigate();
  
  // Génération d'un calcul aléatoire
  const [calculation] = useState(() => {
    const num1 = Math.floor(Math.random() * 9) + 2; // 2-10
    const num2 = Math.floor(Math.random() * 9) + 2; // 2-10
    return { num1, num2, result: num1 * num2 };
  });

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
          <span className={styles.operand1}>{calculation.num1}</span>
          <span className={styles.operator}>×</span>
          <span className={styles.operand2}>{calculation.num2}</span>
          <span className={styles.equals}>=</span>
          <span className={styles.result}>{calculation.result}</span>
        </div>
      </div>
      <div className={styles.appName}>App Maths</div>
      <div className={styles.tagline}>Apprends les tables en t'amusant !</div>
    </div>
  );
};
