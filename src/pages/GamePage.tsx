import { FC, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { QuestionCard } from '@/features/game/components/QuestionCard';
import { AnswerInput } from '@/features/game/components/AnswerInput';
import { Timer } from '@/features/game/components/Timer';
import { ScoreDisplay } from '@/features/game/components/ScoreDisplay';
import { useGame } from '@/context/GameContext';
import styles from './GamePage.module.css';

export const GamePage: FC = () => {
  const navigate = useNavigate();
  const { session, currentQuestion, isGameActive, answerQuestion, nextQuestion, endGame } =
    useGame();
  
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Définir les handlers avant le early return
  const handleAnswer = useCallback(
    (answer: number) => {
      if (isProcessing) return;
      
      setIsProcessing(true);
      const isCorrect = answerQuestion(answer);
      setFeedback(isCorrect ? 'correct' : 'incorrect');

      // Attendre un peu pour afficher le feedback avant de passer à la suite
      setTimeout(() => {
        setFeedback(null);
        setIsProcessing(false);
        nextQuestion();
      }, 1500);
    },
    [answerQuestion, nextQuestion, isProcessing]
  );

  const handleTimeUp = useCallback(() => {
    // Temps écoulé = mauvaise réponse
    handleAnswer(-9999); // Réponse impossible pour forcer incorrect
  }, [handleAnswer]);

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

          {/* Timer */}
          <Timer
            totalTime={session.timePerQuestion}
            isActive={isGameActive && !isProcessing}
            onTimeUp={handleTimeUp}
          />

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
