// Constantes de jeu - App Maths

export const GAME_CONSTANTS = {
  // Tables de multiplication
  MIN_TABLE: 1,
  MAX_TABLE: 10,
  INITIAL_UNLOCKED_TABLES: [1, 2], // Tables débloquées au départ

  // Questions
  DEFAULT_QUESTIONS_PER_GAME: 10,
  MIN_QUESTIONS: 5,
  MAX_QUESTIONS: 50,

  // Temps
  DEFAULT_TIME_PER_QUESTION: 10, // secondes
  TIME_OPTIONS: [5, 10, 15, 30] as const,

  // Scoring
  BASE_POINTS_PER_QUESTION: 10,
  TIME_BONUS_MAX: 5, // bonus max si réponse très rapide
  PERFECT_ANSWER_BONUS: 5, // bonus si réponse du premier coup

  // Combo système
  COMBO_MULTIPLIERS: {
    1: 1, // x1 (pas de combo)
    2: 2, // x2 (2 bonnes réponses consécutives)
    3: 3, // x3 (3 bonnes réponses consécutives)
    4: 4, // x4 (4+ bonnes réponses consécutives)
  },
  MAX_COMBO_LEVEL: 4,

  // Niveaux
  POINTS_PER_LEVEL: 100,
  MAX_LEVEL: 50,

  // Maîtrise d'une table
  MASTERY_MIN_QUESTIONS: 20,
  MASTERY_MIN_ACCURACY: 90, // pourcentage

  // Défis quotidiens
  DAILY_CHALLENGE_BONUS_POINTS: 50,
} as const;

export const DIFFICULTY_SETTINGS = {
  easy: {
    timePerQuestion: 30,
    tablesRange: [1, 5],
  },
  medium: {
    timePerQuestion: 15,
    tablesRange: [1, 10],
  },
  hard: {
    timePerQuestion: 10,
    tablesRange: [1, 10],
  },
} as const;

export const MODE_LABELS = {
  training: 'Entraînement libre',
  timed: 'Contre la montre',
  challenge: 'Défi',
  daily: 'Défi du jour',
} as const;

export const MODE_DESCRIPTIONS = {
  training: 'Pratique sans limite de temps',
  timed: 'Réponds vite pour gagner plus de points !',
  challenge: 'Débloque les tables progressivement',
  daily: 'Mission spéciale avec bonus de points',
} as const;
