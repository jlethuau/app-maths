// Définition des badges - App Maths

import { Badge, BadgeCategory } from '@/types';

export const BADGE_DEFINITIONS: Omit<Badge, 'unlockedAt' | 'progress'>[] = [
  // === BADGES DE MAÎTRISE (par table) ===
  {
    id: 'master_table_2',
    name: 'Expert Table de 2',
    description: 'Maîtrise la table de 2 (90%+ de réussite)',
    icon: '🥉',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 2,
    },
  },
  {
    id: 'master_table_3',
    name: 'Expert Table de 3',
    description: 'Maîtrise la table de 3 (90%+ de réussite)',
    icon: '🥉',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 3,
    },
  },
  {
    id: 'master_table_4',
    name: 'Expert Table de 4',
    description: 'Maîtrise la table de 4 (90%+ de réussite)',
    icon: '🥈',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 4,
    },
  },
  {
    id: 'master_table_5',
    name: 'Expert Table de 5',
    description: 'Maîtrise la table de 5 (90%+ de réussite)',
    icon: '🥈',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 5,
    },
  },
  {
    id: 'master_table_6',
    name: 'Expert Table de 6',
    description: 'Maîtrise la table de 6 (90%+ de réussite)',
    icon: '🥇',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 6,
    },
  },
  {
    id: 'master_table_7',
    name: 'Expert Table de 7',
    description: 'Maîtrise la table de 7 (90%+ de réussite)',
    icon: '🥇',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 7,
    },
  },
  {
    id: 'master_table_8',
    name: 'Expert Table de 8',
    description: 'Maîtrise la table de 8 (90%+ de réussite)',
    icon: '🏆',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 8,
    },
  },
  {
    id: 'master_table_9',
    name: 'Expert Table de 9',
    description: 'Maîtrise la table de 9 (90%+ de réussite)',
    icon: '🏆',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 9,
    },
  },
  {
    id: 'master_table_10',
    name: 'Expert Table de 10',
    description: 'Maîtrise la table de 10 (90%+ de réussite)',
    icon: '💎',
    category: 'mastery' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90,
      tableNumber: 10,
    },
  },

  // === BADGES DE COMBO ===
  {
    id: 'combo_5',
    name: 'Enchaînement x5',
    description: '5 bonnes réponses d\'affilée',
    icon: '🔥',
    category: 'combo' as BadgeCategory,
    requirement: {
      type: 'combo',
      value: 5,
    },
  },
  {
    id: 'combo_10',
    name: 'Série de 10 !',
    description: '10 bonnes réponses consécutives',
    icon: '⚡',
    category: 'combo' as BadgeCategory,
    requirement: {
      type: 'combo',
      value: 10,
    },
  },
  {
    id: 'combo_20',
    name: 'Inarrêtable !',
    description: '20 bonnes réponses d\'affilée',
    icon: '💫',
    category: 'combo' as BadgeCategory,
    requirement: {
      type: 'combo',
      value: 20,
    },
  },

  // === BADGES DE VITESSE ===
  {
    id: 'speed_demon',
    name: 'Éclair',
    description: 'Réponds en moins de 2 secondes (10 fois)',
    icon: '⚡',
    category: 'speed' as BadgeCategory,
    requirement: {
      type: 'speed',
      value: 2,
    },
  },

  // === BADGES DE PRÉCISION ===
  {
    id: 'perfect_game',
    name: 'Sans Faute',
    description: 'Partie parfaite : 100% de bonnes réponses',
    icon: '⭐',
    category: 'accuracy' as BadgeCategory,
    requirement: {
      type: 'accuracy',
      value: 100,
    },
  },
  {
    id: 'sharpshooter',
    name: 'Tireur d\'Élite',
    description: '95%+ de précision sur 50 questions',
    icon: '🎯',
    category: 'accuracy' as BadgeCategory,
    requirement: {
      type: 'accuracy',
      value: 95,
    },
  },

  // === BADGES D'ASSIDUITÉ ===
  {
    id: 'first_steps',
    name: 'Premiers Pas',
    description: 'Joue ta première partie',
    icon: '👣',
    category: 'dedication' as BadgeCategory,
    requirement: {
      type: 'games_played',
      value: 1,
    },
  },
  {
    id: 'dedicated_learner',
    name: 'Apprenti Assidu',
    description: 'Joue 10 parties',
    icon: '📚',
    category: 'dedication' as BadgeCategory,
    requirement: {
      type: 'games_played',
      value: 10,
    },
  },
  {
    id: 'math_champion',
    name: 'Champion des Maths',
    description: 'Joue 50 parties',
    icon: '🏅',
    category: 'dedication' as BadgeCategory,
    requirement: {
      type: 'games_played',
      value: 50,
    },
  },

  // === BADGES SPÉCIAUX ===
  {
    id: 'all_tables_master',
    name: 'Maître Absolu',
    description: 'Maîtrise toutes les tables (2-10)',
    icon: '👑',
    category: 'special' as BadgeCategory,
    requirement: {
      type: 'master_table',
      value: 90, // toutes les tables
    },
  },
  {
    id: 'score_1000',
    name: 'Millionnaire',
    description: 'Atteins 1000 points totaux',
    icon: '💰',
    category: 'special' as BadgeCategory,
    requirement: {
      type: 'score',
      value: 1000,
    },
  },
];

export const BADGE_CATEGORY_LABELS: Record<BadgeCategory, string> = {
  mastery: 'Maîtrise',
  combo: 'Enchaînements',
  speed: 'Rapidité',
  accuracy: 'Précision',
  dedication: 'Assiduité',
  special: 'Spéciaux',
};
