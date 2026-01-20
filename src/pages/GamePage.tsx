import { FC, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { QuestionCard } from '@/features/game/components/QuestionCard';
import { AnswerInput } from '@/features/game/components/AnswerInput';
import { Timer } from '@/features/game/components/Timer';
import { ScoreDisplay } from '@/features/game/components/ScoreDisplay';
import { GameEndScreen } from '@/features/game/components/GameEndScreen';
import { useGame } from '@/context/GameContext';
import { GameConfig } from '@/types';
import styles from './GamePage.module.css';

export const GamePage: FC = () => {
  const navigate = useNavigate();
  const { session, currentQuestion, isGameActive, answerQuestion, nextQuestion, endGame, startGame } =
    useGame();
  
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [lastGameConfig, setLastGameConfig] = useState<GameConfig | null>(null);

  // Définir les handlers avant le early return
  const handleAnswer = useCallback(
    (answer: number) => {
      if (isProcessing || !session) return;
      
      setIsProcessing(true);
      const isCorrect = answerQuestion(answer);
      setFeedback(isCorrect ? 'correct' : 'incorrect');

      // Vérifier si c'était la dernière question
      const isLastQuestion = session.currentQuestionIndex >= session.questions.length - 1;

      // Attendre un peu pour afficher le feedback avant de passer à la suite
      setTimeout(() => {
        setFeedback(null);
        setIsProcessing(false);
        
        if (isLastQuestion) {
          // Si c'était la dernière question, terminer le jeu
          endGame();
        } else {
          // Sinon, passer à la question suivante
          nextQuestion();
        }
      }, 1500);
    },
    [answerQuestion, nextQuestion, endGame, isProcessing, session]
  );

  const handleTimeUp = useCallback(() => {
    // Temps écoulé = mauvaise réponse
    handleAnswer(-9999); // Réponse impossible pour forcer incorrect
  }, [handleAnswer]);

  // Sauvegarder la config au démarrage de la session
  useEffect(() => {
    if (session && !lastGameConfig) {
      const config: GameConfig = {
        mode: session.mode,
        selectedTables: session.selectedTables,
        timePerQuestion: session.timePerQuestion,
        numberOfQuestions: session.questions.length,
      };
      setLastGameConfig(config);
    }
  }, [session, lastGameConfig]);

  // Détecter la fin de partie
  useEffect(() => {
    if (session && session.endTime && !gameEnded) {
      setGameEnded(true);
    }
  }, [session, gameEnded]);

  const handlePlayAgain = () => {
    if (lastGameConfig) {
      // Important : reset l'état local AVANT de démarrer une nouvelle partie
      setGameEnded(false);
      setFeedback(null);
      setIsProcessing(false);
      setLastGameConfig(null); // Reset pour capturer la nouvelle config
      startGame(lastGameConfig);
    }
  };

  // Si pas de session, retourner à l'accueil
  if (!session || !currentQuestion) {
    return (
      <div className={styles.page}>
        <Container maxWidth="md" centered>
          <Card variant="gradient" padding="lg">
            <h2>Aucune partie en cours</h2>
            <p>Retourne à l'accueil pour démarrer une nouvelle partie !</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

  const handleQuit = () => {
    if (window.confirm('Es-tu sûr de vouloir quitter ? Ta progression sera perdue.')) {
      endGame();
      navigate('/');
    }
  };

  const questionNumber = session.currentQuestionIndex + 1;
  const totalQuestions = session.questions.length;

  // Afficher l'écran de fin si la partie est terminée
  if (gameEnded && session) {
    return <GameEndScreen session={session} onPlayAgain={handlePlayAgain} />;
  }

  return (
    <div className={styles.page}>
      <Container maxWidth="md">
        <div className={styles.gameContainer}>
          {/* Header avec score et bouton quitter */}
          <div className={styles.header}>
            <ScoreDisplay
              score={session.score}
              combo={session.combo}
              maxCombo={session.maxCombo}
            />
            <Button variant="ghost" size="sm" onClick={handleQuit}>
              Quitter ✕
            </Button>
          </div>

          {/* Timer (seulement si temps limité) */}
          {session.timePerQuestion !== Infinity && (
            <Timer
              totalTime={session.timePerQuestion}
              isActive={isGameActive && !isProcessing}
              onTimeUp={handleTimeUp}
              key={session.currentQuestionIndex} // Reset le timer à chaque question
            />
          )}

          {/* Question */}
          <div className={styles.questionSection}>
            <QuestionCard
              operand1={currentQuestion.operand1}
              operand2={currentQuestion.operand2}
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
            />
          </div>

          {/* Feedback visuel */}
          {feedback && (
            <Card
              variant="glass"
              padding="md"
              className={`${styles.feedbackCard} ${
                feedback === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect
              }`}
            >
              {feedback === 'correct' ? (
                <>
                  <div className={styles.feedbackIcon}>✓</div>
                  <div className={styles.feedbackText}>Bravo !</div>
                </>
              ) : (
                <>
                  <div className={styles.feedbackIcon}>✗</div>
                  <div className={styles.feedbackText}>
                    C'était {currentQuestion.correctAnswer}
                  </div>
                </>
              )}
            </Card>
          )}

          {/* Input de réponse */}
          {!feedback && (
            <div className={styles.answerSection}>
              <AnswerInput
                onSubmit={handleAnswer}
                disabled={!isGameActive || isProcessing}
                autoFocus
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
