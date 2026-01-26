import { describe, it, expect } from 'vitest';
import {
  calculateTableLevel,
  updateTableStats,
  getTableLevelInfo,
} from './tableStatsUtils';
import { TableStatistics, Question } from '@/types';

describe('tableStatsUtils', () => {
  describe('calculateTableLevel', () => {
    it('devrait retourner beginner si moins de 5 questions', () => {
      const stats: TableStatistics = {
        tableNumber: 5,
        questionsAnswered: 3,
        correctAnswers: 3,
        accuracy: 100,
        averageTime: 3,
        lastPracticed: new Date(),
        consecutiveErrors: 0,
        maxConsecutiveErrors: 0,
        highestCombo: 5,
        level: 'beginner',
      };
      
      expect(calculateTableLevel(stats)).toBe('beginner');
    });

    it('devrait retourner master si >80% et temps <5s et <2 erreurs', () => {
      const stats: TableStatistics = {
        tableNumber: 5,
        questionsAnswered: 20,
        correctAnswers: 18,
        accuracy: 90,
        averageTime: 4,
        lastPracticed: new Date(),
        consecutiveErrors: 0,
        maxConsecutiveErrors: 1,
        highestCombo: 5,
        level: 'beginner',
      };
      
      expect(calculateTableLevel(stats)).toBe('master');
    });

    it('devrait retourner beginner si <50% réussite', () => {
      const stats: TableStatistics = {
        tableNumber: 5,
        questionsAnswered: 10,
        correctAnswers: 4,
        accuracy: 40,
        averageTime: 6,
        lastPracticed: new Date(),
        consecutiveErrors: 2,
        maxConsecutiveErrors: 3,
        highestCombo: 2,
        level: 'beginner',
      };
      
      expect(calculateTableLevel(stats)).toBe('beginner');
    });

    it('devrait retourner progressing pour stats moyennes', () => {
      const stats: TableStatistics = {
        tableNumber: 5,
        questionsAnswered: 15,
        correctAnswers: 10,
        accuracy: 66,
        averageTime: 6,
        lastPracticed: new Date(),
        consecutiveErrors: 1,
        maxConsecutiveErrors: 2,
        highestCombo: 3,
        level: 'beginner',
      };
      
      expect(calculateTableLevel(stats)).toBe('progressing');
    });
  });

  describe('updateTableStats', () => {
    it('devrait créer de nouvelles stats si aucune existante', () => {
      const question: Question = {
        id: '1',
        operand1: 5,
        operand2: 6,
        correctAnswer: 30,
        userAnswer: 30,
        isCorrect: true,
        timeToAnswer: 4,
        attempts: 1,
        pointsEarned: 100,
        comboMultiplier: 1,
      };

      const result = updateTableStats(undefined, 5, question);

      expect(result.tableNumber).toBe(5);
      expect(result.questionsAnswered).toBe(1);
      expect(result.correctAnswers).toBe(1);
      expect(result.accuracy).toBe(100);
      expect(result.averageTime).toBe(4);
      expect(result.consecutiveErrors).toBe(0);
    });

    it('devrait mettre à jour les stats existantes avec réponse correcte', () => {
      const existingStats: TableStatistics = {
        tableNumber: 5,
        questionsAnswered: 5,
        correctAnswers: 4,
        accuracy: 80,
        averageTime: 5,
        lastPracticed: new Date(),
        consecutiveErrors: 0,
        maxConsecutiveErrors: 1,
        highestCombo: 3,
        level: 'progressing',
      };

      const question: Question = {
        id: '2',
        operand1: 5,
        operand2: 7,
        correctAnswer: 35,
        userAnswer: 35,
        isCorrect: true,
        timeToAnswer: 3,
        attempts: 1,
        pointsEarned: 120,
        comboMultiplier: 2,
      };

      const result = updateTableStats(existingStats, 5, question);

      expect(result.questionsAnswered).toBe(6);
      expect(result.correctAnswers).toBe(5);
      expect(result.accuracy).toBe(83); // 5/6 * 100 arrondi
      expect(result.consecutiveErrors).toBe(0);
    });

    it('devrait incrémenter les erreurs consécutives', () => {
      const existingStats: TableStatistics = {
        tableNumber: 7,
        questionsAnswered: 10,
        correctAnswers: 7,
        accuracy: 70,
        averageTime: 5,
        lastPracticed: new Date(),
        consecutiveErrors: 1,
        maxConsecutiveErrors: 2,
        highestCombo: 4,
        level: 'progressing',
      };

      const question: Question = {
        id: '3',
        operand1: 7,
        operand2: 8,
        correctAnswer: 56,
        userAnswer: 54,
        isCorrect: false,
        timeToAnswer: 8,
        attempts: 1,
        pointsEarned: 0,
        comboMultiplier: 0,
      };

      const result = updateTableStats(existingStats, 7, question);

      expect(result.consecutiveErrors).toBe(2);
      expect(result.maxConsecutiveErrors).toBe(2);
      expect(result.correctAnswers).toBe(7); // Pas augmenté
    });

    it('devrait calculer la moyenne du temps correctement', () => {
      const existingStats: TableStatistics = {
        tableNumber: 3,
        questionsAnswered: 4,
        correctAnswers: 3,
        accuracy: 75,
        averageTime: 6, // Moyenne actuelle
        lastPracticed: new Date(),
        consecutiveErrors: 0,
        maxConsecutiveErrors: 1,
        highestCombo: 2,
        level: 'progressing',
      };

      const question: Question = {
        id: '4',
        operand1: 3,
        operand2: 9,
        correctAnswer: 27,
        userAnswer: 27,
        isCorrect: true,
        timeToAnswer: 4, // Nouveau temps
        attempts: 1,
        pointsEarned: 100,
        comboMultiplier: 1,
      };

      const result = updateTableStats(existingStats, 3, question);

      // (6 * 4 + 4) / 5 = 28 / 5 = 5.6
      expect(result.averageTime).toBe(5.6);
    });
  });

  describe('getTableLevelInfo', () => {
    it('devrait retourner les infos pour beginner', () => {
      const info = getTableLevelInfo('beginner');
      
      expect(info.label).toBe('Débutant');
      expect(info.emoji).toBe('⚠️');
      expect(info.color).toBe('#ef4444');
      expect(info.description).toBe('À réviser');
    });

    it('devrait retourner les infos pour progressing', () => {
      const info = getTableLevelInfo('progressing');
      
      expect(info.label).toBe('En progression');
      expect(info.emoji).toBe('📈');
      expect(info.color).toBe('#f59e0b');
    });

    it('devrait retourner les infos pour master', () => {
      const info = getTableLevelInfo('master');
      
      expect(info.label).toBe('Très fort');
      expect(info.emoji).toBe('🌟');
      expect(info.color).toBe('#10b981');
      expect(info.description).toBe('Maîtrisé');
    });
  });
});
