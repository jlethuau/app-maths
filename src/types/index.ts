// Types globaux - App Maths

export interface UserProgress {
  id: string;
  name?: string;
  totalPoints: number;
  level: number;
  unlockedTables: number[]; // Tables débloquées [2, 3, 4...]
  badges: Badge[];
  statistics: Statistics;
  settings: UserSettings;
  dailyChallenge?: DailyChallenge;
  lastPlayed: Date;
  createdAt: Date;
}

export interface GameSession {
  id: string;
  mode: GameMode;
  selectedTables: number[]; // [2, 3, 5] = tables 2, 3 et 5
  questions: Question[];
  currentQuestionIndex: number;
  startTime: Date;
  endTime?: Date;
  score: number;
  combo: number; // Compteur de combo (bonnes réponses consécutives)
  maxCombo: number; // Meilleur combo de la session
  timePerQuestion: number; // Temps alloué par question (en secondes)
  lives?: number; // optionnel selon mode
}

export type GameMode = 'training' | 'timed' | 'challenge' | 'daily';

export interface Question {
  id: string;
  operand1: number;
  operand2: number;
  correctAnswer: number;
  userAnswer?: number;
  isCorrect?: boolean;
  timeToAnswer?: number; // en secondes
  timeRemaining?: number; // temps restant quand répondu (pour bonus points)
  attempts: number;
  pointsEarned: number; // points gagnés pour cette question
  comboMultiplier: number; // multiplicateur appliqué (1, 2, 3, 4...)
}

export interface Statistics {
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageAccuracy: number; // pourcentage
  fastestTime: number; // en secondes
  highestCombo: number; // Meilleur combo atteint
  totalPointsEarned: number;

  // Par table de multiplication
  tableStats: {
    [key: number]: TableStatistics; // key = 1 à 10
  };
}

export interface TableStatistics {
  tableNumber: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  averageTime: number; // en secondes
  lastPracticed: Date;
  consecutiveErrors: number; // Erreurs d'affilée actuelles
  maxConsecutiveErrors: number; // Max erreurs consécutives
  highestCombo: number;
  level: 'beginner' | 'progressing' | 'master';
}

export interface TableLevel {
  level: 'beginner' | 'progressing' | 'master';
  label: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  unlockedAt?: Date;
  progress?: number; // 0-100 pour badges progressifs
  requirement: BadgeRequirement;
}

export type BadgeCategory =
  | 'mastery' // Maîtrise d'une table
  | 'combo' // Enchaînements
  | 'speed' // Rapidité
  | 'accuracy' // Précision
  | 'dedication' // Assiduité
  | 'special'; // Badges spéciaux

export interface BadgeRequirement {
  type: 'score' | 'accuracy' | 'streak' | 'speed' | 'master_table' | 'combo' | 'games_played';
  value: number;
  tableNumber?: number;
}

export interface UserSettings {
  soundEnabled: boolean;
  timePerQuestion: number; // Temps par question en secondes (5, 10, 15, 30)
  animationsEnabled: boolean;
}

export interface DailyChallenge {
  id: string;
  date: Date;
  description: string;
  targetTable: number;
  targetScore: number;
  targetAccuracy?: number;
  completed: boolean;
  bonusPoints: number;
}

// Types utilitaires
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  mode: GameMode;
  selectedTables: number[];
  timePerQuestion: number;
  numberOfQuestions?: number;
}

export interface ScoreCalculation {
  basePoints: number;
  timeBonus: number;
  comboBonus: number;
  totalPoints: number;
}
