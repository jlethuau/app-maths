import { Badge, UserProgress, TableStatistics } from '@/types';
import { BADGE_DEFINITIONS } from '@/constants/badges';

/**
 * Vérifie tous les badges et retourne ceux qui viennent d'être débloqués
 */
export const checkUnlockedBadges = (
  userProgress: UserProgress
): Badge[] => {
  const newBadges: Badge[] = [];
  const unlockedIds = userProgress.badges.map((b) => b.id);

  BADGE_DEFINITIONS.forEach((badgeDef) => {
    // Skip si déjà débloqué
    if (unlockedIds.includes(badgeDef.id)) return;

    // Vérifier selon le type
    let isUnlocked = false;

    switch (badgeDef.requirement.type) {
      case 'master_table':
        isUnlocked = checkMasterTableBadge(
          badgeDef.id,
          badgeDef.requirement.value,
          badgeDef.requirement.tableNumber,
          userProgress.statistics.tableStats
        );
        break;

      case 'combo':
        isUnlocked = checkComboBadge(
          badgeDef.requirement.value,
          userProgress.statistics.highestCombo
        );
        break;

      case 'speed':
        isUnlocked = checkSpeedBadge(
          badgeDef.requirement.value,
          userProgress.statistics
        );
        break;

      case 'accuracy':
        isUnlocked = checkAccuracyBadge(badgeDef.id, badgeDef.requirement.value, userProgress);
        break;

      case 'games_played':
        isUnlocked = checkGamesPlayedBadge(
          badgeDef.requirement.value,
          userProgress.statistics.totalGamesPlayed
        );
        break;

      case 'score':
        isUnlocked = checkScoreBadge(
          badgeDef.requirement.value,
          userProgress.totalPoints
        );
        break;
    }

    if (isUnlocked) {
      newBadges.push({
        ...badgeDef,
        unlockedAt: new Date(),
      });
    }
  });

  return newBadges;
};

/**
 * Vérifie badge de maîtrise de table
 */
const checkMasterTableBadge = (
  badgeId: string,
  requiredAccuracy: number,
  tableNumber: number | undefined,
  tableStats: { [key: number]: TableStatistics }
): boolean => {
  // Badge "Maître Absolu" - toutes les tables
  if (badgeId === 'all_tables_master') {
    for (let i = 2; i <= 10; i++) {
      const stats = tableStats[i];
      if (!stats || stats.questionsAnswered < 20 || stats.accuracy < requiredAccuracy) {
        return false;
      }
    }
    return true;
  }

  // Badge pour une table spécifique
  if (!tableNumber) return false;
  const stats = tableStats[tableNumber];
  if (!stats) return false;

  return stats.questionsAnswered >= 20 && stats.accuracy >= requiredAccuracy;
};

/**
 * Vérifie badge de combo
 */
const checkComboBadge = (requiredCombo: number, highestCombo: number): boolean => {
  return highestCombo >= requiredCombo;
};

/**
 * Vérifie badge de vitesse (10 réponses <2s au total)
 */
const checkSpeedBadge = (
  _maxTime: number,
  statistics: UserProgress['statistics']
): boolean => {
  // On devra tracker le nombre de réponses rapides
  // Pour l'instant on vérifie si on a assez de données
  const fastAnswers = statistics.fastAnswersCount || 0;
  return fastAnswers >= 10;
};

/**
 * Vérifie badge de précision
 */
const checkAccuracyBadge = (
  badgeId: string,
  requiredAccuracy: number,
  userProgress: UserProgress
): boolean => {
  if (badgeId === 'perfect_game') {
    // Vérifié via l'historique des sessions (à implémenter)
    const hasPerfectGame = userProgress.statistics.hasPerfectGame || false;
    return hasPerfectGame;
  }

  if (badgeId === 'sharpshooter') {
    // 95%+ de précision sur 50 questions (il faut bien 50 réponses)
    const last50 = userProgress.statistics.last50Questions || [];
    if (last50.length < 50) return false;

    const last50Correct = last50.filter((q) => q.isCorrect).length;
    const last50Accuracy = Math.round((last50Correct / 50) * 100);
    return last50Accuracy >= requiredAccuracy;
  }

  return false;
};

/**
 * Vérifie badge de parties jouées
 */
const checkGamesPlayedBadge = (
  requiredGames: number,
  totalGamesPlayed: number
): boolean => {
  return totalGamesPlayed >= requiredGames;
};

/**
 * Vérifie badge de score total
 */
const checkScoreBadge = (requiredScore: number, totalPoints: number): boolean => {
  return totalPoints >= requiredScore;
};
