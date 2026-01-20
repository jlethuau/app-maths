import { Question, ScoreCalculation } from '@/types';
import { GAME_CONSTANTS } from '@/constants/game';

/**
 * Génère une question de multiplication aléatoire
 * 
 * @param tables - Numéros des tables à utiliser (ex: [2, 3, 5])
 * @returns Question avec opérandes et réponse correcte
 * 
 * @example
 * ```ts
 * const question = generateQuestion([2, 3, 5]);
 * // Peut retourner: { operand1: 3, operand2: 7, correctAnswer: 21, ... }
 * ```
 */
export function generateQuestion(tables: number[]): Question {
  // Sélectionne une table aléatoire parmi celles choisies
  const table = tables[Math.floor(Math.random() * tables.length)];
  
  // Génère un multiplicateur aléatoire entre 1 et 10
  const multiplier = Math.floor(Math.random() * 10) + 1;
  
  // Mélange aléatoirement l'ordre (7×3 ou 3×7)
  const [operand1, operand2] = Math.random() > 0.5 
    ? [table, multiplier] 
    : [multiplier, table];
  
  return {
    id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    operand1,
    operand2,
    correctAnswer: operand1 * operand2,
    attempts: 0,
    pointsEarned: 0,
    comboMultiplier: 1,
  };
}

/**
 * Valide une réponse utilisateur
 * 
 * @param question - Question à valider
 * @param userAnswer - Réponse de l'utilisateur
 * @returns true si la réponse est correcte
 */
export function validateAnswer(question: Question, userAnswer: number): boolean {
  return userAnswer === question.correctAnswer;
}

/**
 * Calcule le score pour une question avec système de combo et bonus temps
 * 
 * @param isCorrect - La réponse est-elle correcte ?
 * @param currentCombo - Combo actuel (nombre de bonnes réponses consécutives)
 * @param timeRemaining - Temps restant en secondes (optionnel)
 * @param totalTime - Temps total alloué en secondes (optionnel)
 * @returns Détails du calcul de score
 * 
 * @example
 * ```ts
 * const score = calculateScore(true, 3, 7, 10);
 * // { basePoints: 10, timeBonus: 3, comboBonus: 20, totalPoints: 33 }
 * ```
 */
export function calculateScore(
  isCorrect: boolean,
  currentCombo: number,
  timeRemaining?: number,
  totalTime?: number
): ScoreCalculation {
  if (!isCorrect) {
    return {
      basePoints: 0,
      timeBonus: 0,
      comboBonus: 0,
      totalPoints: 0,
    };
  }

  const basePoints = GAME_CONSTANTS.BASE_POINTS_PER_QUESTION;

  // Bonus de temps (si temps restant fourni)
  let timeBonus = 0;
  if (timeRemaining !== undefined && totalTime !== undefined && totalTime > 0) {
    const timeRatio = timeRemaining / totalTime;
    timeBonus = Math.floor(timeRatio * GAME_CONSTANTS.TIME_BONUS_MAX);
  }

  // Bonus de combo (multiplicateur basé sur le nombre de bonnes réponses consécutives)
  const comboMultiplier = getComboMultiplier(currentCombo);
  const comboBonus = comboMultiplier > 1 ? basePoints * (comboMultiplier - 1) : 0;

  const totalPoints = basePoints + timeBonus + comboBonus;

  return {
    basePoints,
    timeBonus,
    comboBonus,
    totalPoints,
  };
}

/**
 * Retourne le multiplicateur de combo basé sur le nombre de bonnes réponses consécutives
 * 
 * @param combo - Nombre de bonnes réponses consécutives
 * @returns Multiplicateur (1, 2, 3, ou 4)
 */
export function getComboMultiplier(combo: number): number {
  if (combo >= 4) return GAME_CONSTANTS.COMBO_MULTIPLIERS[4];
  if (combo >= 3) return GAME_CONSTANTS.COMBO_MULTIPLIERS[3];
  if (combo >= 2) return GAME_CONSTANTS.COMBO_MULTIPLIERS[2];
  return GAME_CONSTANTS.COMBO_MULTIPLIERS[1];
}

/**
 * Retourne le label du combo pour l'affichage
 */
export function getComboLabel(combo: number): string {
  const multiplier = getComboMultiplier(combo);
  if (multiplier === 1) return '';
  return `×${multiplier} COMBO!`;
}

/**
 * Retourne la couleur CSS du combo
 */
export function getComboColor(combo: number): string {
  const multiplier = getComboMultiplier(combo);
  switch (multiplier) {
    case 2:
      return 'var(--combo-x2-color)';
    case 3:
      return 'var(--combo-x3-color)';
    case 4:
      return 'var(--combo-x4-color)';
    default:
      return 'var(--color-text-primary)';
  }
}

/**
 * Génère un tableau de questions pour une session de jeu
 * 
 * @param tables - Tables à utiliser
 * @param count - Nombre de questions à générer
 * @returns Tableau de questions
 */
export function generateQuestions(tables: number[], count: number): Question[] {
  const questions: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(tables));
  }
  
  return questions;
}

/**
 * Formatte un temps en secondes vers format MM:SS
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calcule le pourcentage de précision
 */
export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
