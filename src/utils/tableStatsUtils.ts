import { TableStatistics, Question, GameSession } from '@/types';

/**
 * Calcule le niveau d'une table basé sur ses statistiques
 */
export const calculateTableLevel = (
  stats: TableStatistics
): 'beginner' | 'progressing' | 'master' => {
  const { accuracy, averageTime, maxConsecutiveErrors, questionsAnswered } = stats;

  // Pas assez de données
  if (questionsAnswered < 5) return 'beginner';

  // Très fort : >80% réussite ET temps <5s ET <2 erreurs max
  if (accuracy > 80 && averageTime < 5 && maxConsecutiveErrors < 2) {
    return 'master';
  }

  // Débutant : <50% réussite OU temps >8s OU >3 erreurs consécutives
  if (accuracy < 50 || averageTime > 8 || maxConsecutiveErrors > 3) {
    return 'beginner';
  }

  // En progression : entre les deux
  return 'progressing';
};

/**
 * Met à jour les statistiques d'une table avec une nouvelle question
 */
export const updateTableStats = (
  currentStats: TableStatistics | undefined,
  tableNumber: number,
  question: Question
): TableStatistics => {
  const isCorrect = question.isCorrect || false;
  const timeToAnswer = question.timeToAnswer || 0;

  // Stats existantes ou nouvelles
  const stats = currentStats || {
    tableNumber,
    questionsAnswered: 0,
    correctAnswers: 0,
    accuracy: 0,
    averageTime: 0,
    lastPracticed: new Date(),
    consecutiveErrors: 0,
    maxConsecutiveErrors: 0,
    highestCombo: 0,
    level: 'beginner' as const,
  };

  // Mise à jour des compteurs
  const newQuestionsAnswered = stats.questionsAnswered + 1;
  const newCorrectAnswers = stats.correctAnswers + (isCorrect ? 1 : 0);
  const newAccuracy = Math.round((newCorrectAnswers / newQuestionsAnswered) * 100);

  // Moyenne temps (moyenne pondérée)
  const newAverageTime =
    (stats.averageTime * stats.questionsAnswered + timeToAnswer) / newQuestionsAnswered;

  // Erreurs consécutives
  const newConsecutiveErrors = isCorrect ? 0 : stats.consecutiveErrors + 1;
  const newMaxConsecutiveErrors = Math.max(
    stats.maxConsecutiveErrors,
    newConsecutiveErrors
  );

  const updatedStats: TableStatistics = {
    ...stats,
    questionsAnswered: newQuestionsAnswered,
    correctAnswers: newCorrectAnswers,
    accuracy: newAccuracy,
    averageTime: Math.round(newAverageTime * 10) / 10, // 1 décimale
    lastPracticed: new Date(),
    consecutiveErrors: newConsecutiveErrors,
    maxConsecutiveErrors: newMaxConsecutiveErrors,
    highestCombo: Math.max(stats.highestCombo, question.comboMultiplier),
  };

  // Calcul du niveau
  updatedStats.level = calculateTableLevel(updatedStats);

  return updatedStats;
};

/**
 * Traite toutes les questions d'une session et retourne les stats par table
 */
export const processSessionTableStats = (
  session: GameSession,
  currentTableStats: { [key: number]: TableStatistics }
): { [key: number]: TableStatistics } => {
  const updatedStats = { ...currentTableStats };
  
  // Suivre les erreurs consécutives par table
  const consecutiveErrorsByTable: { [key: number]: boolean } = {};

  session.questions.forEach((question) => {
    // Déterminer quelle table est concernée
    const table1 = question.operand1;
    const table2 = question.operand2;
    const isCorrect = question.isCorrect || false;

    // Mettre à jour pour les deux tables
    [table1, table2].forEach((tableNumber) => {
      updatedStats[tableNumber] = updateTableStats(
        updatedStats[tableNumber],
        tableNumber,
        question
      );

      // Mettre à jour le tracker d'erreurs consécutives
      consecutiveErrorsByTable[tableNumber] = !isCorrect;
    });
  });

  return updatedStats;
};

/**
 * Retourne le label et l'emoji pour un niveau de table
 */
export const getTableLevelInfo = (level: 'beginner' | 'progressing' | 'master') => {
  const levels = {
    beginner: {
      label: 'Débutant',
      emoji: '⚠️',
      color: '#ef4444',
      description: 'À réviser',
    },
    progressing: {
      label: 'En progression',
      emoji: '📈',
      color: '#f59e0b',
      description: 'Continue !',
    },
    master: {
      label: 'Très fort',
      emoji: '🌟',
      color: '#10b981',
      description: 'Maîtrisé',
    },
  };

  return levels[level];
};
