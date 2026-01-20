import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import { GameSession, GameConfig, Question } from '@/types';
import {
  generateQuestions,
  validateAnswer,
  calculateScore,
  getComboMultiplier,
} from '@/utils/gameUtils';
import { GAME_CONSTANTS } from '@/constants/game';
import { useApp } from './AppContext';

interface GameContextType {
  session: GameSession | null;
  currentQuestion: Question | null;
  isGameActive: boolean;
  startGame: (config: GameConfig) => void;
  answerQuestion: (answer: number) => boolean;
  nextQuestion: () => void;
  endGame: () => GameSession | null;
  pauseGame: () => void;
  resumeGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const { addPoints, updateProgress, userProgress } = useApp();
  const [session, setSession] = useState<GameSession | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);

  // Question actuelle
  const currentQuestion = session
    ? session.questions[session.currentQuestionIndex]
    : null;

  // Démarrer une nouvelle partie
  const startGame = useCallback(
    (config: GameConfig) => {
      const numberOfQuestions =
        config.numberOfQuestions || GAME_CONSTANTS.DEFAULT_QUESTIONS_PER_GAME;

      const questions = generateQuestions(config.selectedTables, numberOfQuestions);

      const newSession: GameSession = {
        id: `session-${Date.now()}`,
        mode: config.mode,
        selectedTables: config.selectedTables,
        questions,
        currentQuestionIndex: 0,
        startTime: new Date(),
        score: 0,
        combo: 0,
        maxCombo: 0,
        timePerQuestion: config.timePerQuestion,
      };

      setSession(newSession);
      setIsGameActive(true);
    },
    []
  );

  // Répondre à une question
  const answerQuestion = useCallback(
    (answer: number): boolean => {
      if (!session || !currentQuestion) return false;

      const isCorrect = validateAnswer(currentQuestion, answer);
      const newCombo = isCorrect ? session.combo + 1 : 0;
      const comboMultiplier = getComboMultiplier(newCombo);

      // Calcul du score (le temps sera géré par le composant Timer)
      const scoreCalc = calculateScore(isCorrect, newCombo);

      // Mettre à jour la question
      const updatedQuestion: Question = {
        ...currentQuestion,
        userAnswer: answer,
        isCorrect,
        attempts: currentQuestion.attempts + 1,
        pointsEarned: scoreCalc.totalPoints,
        comboMultiplier,
      };

      // Mettre à jour la session
      const updatedQuestions = [...session.questions];
      updatedQuestions[session.currentQuestionIndex] = updatedQuestion;

      setSession({
        ...session,
        questions: updatedQuestions,
        score: session.score + scoreCalc.totalPoints,
        combo: newCombo,
        maxCombo: Math.max(session.maxCombo, newCombo),
      });

      // Ajouter les points au total utilisateur si correct
      if (isCorrect) {
        addPoints(scoreCalc.totalPoints);
      }

      return isCorrect;
    },
    [session, currentQuestion, addPoints]
  );

  // Terminer la partie
  const endGame = useCallback((): GameSession | null => {
    if (!session) return null;

    const endedSession: GameSession = {
      ...session,
      endTime: new Date(),
    };

    // Calculer les statistiques
    const correctAnswers = session.questions.filter((q) => q.isCorrect).length;
    const totalQuestions = session.questions.length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    // Mettre à jour les statistiques globales
    updateProgress({
      statistics: {
        ...userProgress.statistics,
        totalGamesPlayed: userProgress.statistics.totalGamesPlayed + 1,
        totalQuestionsAnswered:
          userProgress.statistics.totalQuestionsAnswered + totalQuestions,
        totalCorrectAnswers:
          userProgress.statistics.totalCorrectAnswers + correctAnswers,
        averageAccuracy: Math.round(
          ((userProgress.statistics.averageAccuracy *
            userProgress.statistics.totalGamesPlayed +
            accuracy) /
            (userProgress.statistics.totalGamesPlayed + 1))
        ),
        highestCombo: Math.max(
          userProgress.statistics.highestCombo,
          session.maxCombo
        ),
      },
    });

    setIsGameActive(false);
    setSession(endedSession);

    return endedSession;
  }, [session, updateProgress, userProgress.statistics]);

  // Passer à la question suivante
  const nextQuestion = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentQuestionIndex + 1;

    if (nextIndex >= session.questions.length) {
      // Fin du jeu
      endGame();
    } else {
      setSession({
        ...session,
        currentQuestionIndex: nextIndex,
      });
    }
  }, [session, endGame]);

  // Mettre en pause
  const pauseGame = useCallback(() => {
    setIsGameActive(false);
  }, []);

  // Reprendre
  const resumeGame = useCallback(() => {
    if (session) {
      setIsGameActive(true);
    }
  }, [session]);

  const value: GameContextType = {
    session,
    currentQuestion,
    isGameActive,
    startGame,
    answerQuestion,
    nextQuestion,
    endGame,
    pauseGame,
    resumeGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte de jeu
// eslint-disable-next-line react-refresh/only-export-components
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
