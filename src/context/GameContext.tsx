import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import { GameSession, GameConfig, Question, Badge } from '@/types';
import {
  generateQuestions,
  validateAnswer,
  calculateScore,
  getComboMultiplier,
} from '@/utils/gameUtils';
import { processSessionTableStats } from '@/utils/tableStatsUtils';
import { checkUnlockedBadges } from '@/utils/badgeUtils';
import { GAME_CONSTANTS } from '@/constants/game';
import { useApp } from './AppContext';

interface GameContextType {
  session: GameSession | null;
  currentQuestion: Question | null;
  isGameActive: boolean;
  newBadges: Badge[];
  startGame: (config: GameConfig) => void;
  answerQuestion: (answer: number) => boolean;
  nextQuestion: () => void;
  endGame: () => GameSession | null;
  pauseGame: () => void;
  resumeGame: () => void;
  clearNewBadges: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const { addPoints, updateProgress, userProgress } = useApp();
  const [session, setSession] = useState<GameSession | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

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
      // Variable pour capturer le résultat
      let resultIsCorrect = false;

      setSession((currentSession) => {
        if (!currentSession) return currentSession;

        const currentQ = currentSession.questions[currentSession.currentQuestionIndex];
        if (!currentQ) return currentSession;

        const isCorrect = validateAnswer(currentQ, answer);
        resultIsCorrect = isCorrect; // Capturer pour le return
        
        // Le combo augmente SEULEMENT si la réponse est correcte
        // Il revient à 0 si la réponse est incorrecte
        const newCombo = isCorrect ? currentSession.combo + 1 : 0;
        const comboMultiplier = getComboMultiplier(newCombo);

        // Calcul du score avec le nouveau combo
        const scoreCalc = calculateScore(isCorrect, newCombo);

        // Mettre à jour la question
        const updatedQuestion: Question = {
          ...currentQ,
          userAnswer: answer,
          isCorrect,
          attempts: currentQ.attempts + 1,
          pointsEarned: scoreCalc.totalPoints,
          comboMultiplier,
        };

        // Mettre à jour les questions
        const updatedQuestions = [...currentSession.questions];
        updatedQuestions[currentSession.currentQuestionIndex] = updatedQuestion;

        // IMPORTANT: Le score s'accumule (currentSession.score + nouveaux points)
        // Il ne revient JAMAIS à 0 entre les questions
        const newSession = {
          ...currentSession,
          questions: updatedQuestions,
          score: currentSession.score + scoreCalc.totalPoints, // Accumulation du score
          combo: newCombo, // Combo actuel (série en cours)
          maxCombo: Math.max(currentSession.maxCombo, newCombo), // Meilleure série
        };

        // Ajouter les points au total utilisateur si correct
        if (isCorrect) {
          addPoints(scoreCalc.totalPoints);
        }

        return newSession;
      });

      return resultIsCorrect;
    },
    [addPoints]
  );

  // Terminer la partie
  const endGame = useCallback((): GameSession | null => {
    // Utiliser une variable pour capturer la session terminée
    let finalSession: GameSession | null = null;

    setSession((currentSession) => {
      if (!currentSession) return currentSession;

      const endedSession: GameSession = {
        ...currentSession,
        endTime: new Date(),
      };

      // Calculer les statistiques avec la session la plus récente
      const correctAnswers = currentSession.questions.filter((q) => q.isCorrect).length;
      const totalQuestions = currentSession.questions.length;
      const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

      // Mettre à jour les stats par table
      const updatedTableStats = processSessionTableStats(
        currentSession,
        userProgress.statistics.tableStats
      );

      // Compter réponses rapides (<2s)
      const fastAnswers = currentSession.questions.filter(
        (q) => q.isCorrect && (q.timeToAnswer || 0) < 2
      ).length;

      // Mettre à jour historique des 50 dernières questions
      const newQuestionResults = currentSession.questions.map((q) => ({
        isCorrect: q.isCorrect || false,
        timeToAnswer: q.timeToAnswer || 0,
      }));
      const existingLast50 = userProgress.statistics.last50Questions || [];
      const updatedLast50 = [
        ...existingLast50,
        ...newQuestionResults,
      ].slice(-50);

      // Calcul précision sur 50 dernières questions
      const last50Correct = updatedLast50.filter((q) => q.isCorrect).length;
      const last50Accuracy = updatedLast50.length > 0
        ? Math.round((last50Correct / updatedLast50.length) * 100)
        : 0;

      // Vérifier si partie parfaite
      const isPerfectGame = accuracy === 100;

      // Mettre à jour les statistiques globales
      const updatedStats = {
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
          currentSession.maxCombo
        ),
        tableStats: updatedTableStats,
        fastAnswersCount: (userProgress.statistics.fastAnswersCount || 0) + fastAnswers,
        last50Questions: updatedLast50,
        hasPerfectGame: (userProgress.statistics.hasPerfectGame || false) || isPerfectGame,
        last50Accuracy,
      };

      // Vérifier les nouveaux badges
      const candidateBadges = checkUnlockedBadges(
        { ...userProgress, statistics: updatedStats }
      );

      // Filtrer les badges déjà débloqués
      const existingBadgeIds = userProgress.badges.map((b) => b.id);
      const unlockedBadges = candidateBadges.filter(
        (badge) => !existingBadgeIds.includes(badge.id)
      );

      // Mettre à jour les stats ET les badges en une seule fois
      updateProgress({
        statistics: updatedStats,
        badges: unlockedBadges.length > 0 
          ? [
              ...userProgress.badges,
              ...unlockedBadges.map((badge) => ({
                ...badge,
                unlockedAt: new Date(),
              }))
            ]
          : userProgress.badges,
      });
      
      // Stocker les nouveaux badges pour l'affichage
      if (unlockedBadges.length > 0) {
        setNewBadges(unlockedBadges);
      }

      finalSession = endedSession;
      return endedSession;
    });

    setIsGameActive(false);

    return finalSession;
  }, [updateProgress, userProgress.statistics]);

  // Passer à la question suivante
  const nextQuestion = useCallback(() => {
    setSession((currentSession) => {
      if (!currentSession) return currentSession;

      const nextIndex = currentSession.currentQuestionIndex + 1;

      // Si on a atteint la fin, on ne change rien (endGame sera appelé depuis GamePage)
      if (nextIndex >= currentSession.questions.length) {
        return currentSession;
      }

      // IMPORTANT: Utiliser currentSession (la valeur la plus récente)
      // au lieu de session (qui peut être obsolète à cause des closures)
      return {
        ...currentSession,
        currentQuestionIndex: nextIndex,
      };
    });
  }, []);

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

  // Effacer les nouveaux badges après affichage
  const clearNewBadges = useCallback(() => {
    setNewBadges([]);
  }, []);

  const value: GameContextType = {
    session,
    currentQuestion,
    isGameActive,
    newBadges,
    startGame,
    answerQuestion,
    nextQuestion,
    endGame,
    pauseGame,
    resumeGame,
    clearNewBadges,
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
