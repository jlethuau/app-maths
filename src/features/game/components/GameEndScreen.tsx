import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GameSession } from '@/types';
import { calculateAccuracy } from '@/utils/gameUtils';
import { randomConfettiStyle } from '@/utils/animationUtils';
import styles from './GameEndScreen.module.css';

interface GameEndScreenProps {
  session: GameSession;
  onPlayAgain: () => void;
}

export const GameEndScreen: FC<GameEndScreenProps> = ({ session, onPlayAgain }) => {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);

  const correctAnswers = session.questions.filter((q) => q.isCorrect).length;
  const totalQuestions = session.questions.length;
  const accuracy = calculateAccuracy(correctAnswers, totalQuestions);
  
  // Déterminer le message en fonction du score
  const getMessage = () => {
    if (accuracy === 100) return { text: 'PARFAIT !', emoji: '🏆', color: 'gold' };
    if (accuracy >= 80) return { text: 'EXCELLENT !', emoji: '⭐', color: 'success' };
    if (accuracy >= 60) return { text: 'TRÈS BIEN !', emoji: '👍', color: 'primary' };
    if (accuracy >= 40) return { text: 'BIEN JOUÉ !', emoji: '😊', color: 'accent' };
    return { text: 'CONTINUE !', emoji: '💪', color: 'secondary' };
  };

  const message = getMessage();

  useEffect(() => {
    // Afficher les stats après un délai pour l'animation
    const timer = setTimeout(() => setShowStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Confettis animés */}
        {accuracy >= 80 && (
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

        <Card variant="gradient" padding="lg" className={styles.card}>
          {/* Message principal */}
          <div className={`${styles.message} ${styles[message.color]}`}>
            <div className={styles.emoji}>{message.emoji}</div>
            <h1 className={styles.messageText}>{message.text}</h1>
          </div>

          {/* Statistiques */}
          {showStats && (
            <div className={styles.stats}>
              <div className={styles.statRow}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Score Final</div>
                  <div className={styles.statValue}>{session.score}</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Précision</div>
                  <div className={styles.statValue}>{accuracy}%</div>
                </div>
              </div>

              <div className={styles.statRow}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Bonnes Réponses</div>
                  <div className={styles.statValue}>
                    {correctAnswers}/{totalQuestions}
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Meilleur Combo</div>
                  <div className={styles.statValue}>×{session.maxCombo}</div>
                </div>
              </div>

              {/* Badge si combo élevé */}
              {session.maxCombo >= 5 && (
                <div className={styles.achievement}>
                  <span className={styles.achievementIcon}>🔥</span>
                  <span className={styles.achievementText}>
                    Enchaînement de {session.maxCombo} !
                  </span>
                </div>
              )}

              {/* Badge si parfait */}
              {accuracy === 100 && (
                <div className={styles.achievement}>
                  <span className={styles.achievementIcon}>⭐</span>
                  <span className={styles.achievementText}>
                    Partie Parfaite !
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Boutons d'action */}
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={onPlayAgain}
            >
              Rejouer 🔄
            </Button>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => navigate('/')}
            >
              Retour à l'accueil 🏠
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
