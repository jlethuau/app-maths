import { describe, it, expect } from 'vitest';
import {
  generateQuestion,
  generateQuestions,
  validateAnswer,
  calculateScore,
  getComboMultiplier,
  calculateAccuracy,
} from './gameUtils';

describe('gameUtils', () => {
  describe('generateQuestion', () => {
    it('devrait générer une question avec AU MOINS un opérande dans les tables sélectionnées', () => {
      const selectedTables = [2, 3];
      const question = generateQuestion(selectedTables);

      // Au moins UN opérande doit être dans les tables sélectionnées
      const hasTableNumber = selectedTables.includes(question.operand1) || 
                             selectedTables.includes(question.operand2);
      expect(hasTableNumber).toBe(true);
      
      // Le second opérande doit être entre 1 et 10
      expect(question.operand1).toBeGreaterThanOrEqual(1);
      expect(question.operand1).toBeLessThanOrEqual(10);
      expect(question.operand2).toBeGreaterThanOrEqual(1);
      expect(question.operand2).toBeLessThanOrEqual(10);
      
      expect(question.correctAnswer).toBe(question.operand1 * question.operand2);
    });

    it('devrait respecter les tables sélectionnées sur plusieurs générations', () => {
      const selectedTables = [5, 7];
      const iterations = 50; // Tester plusieurs fois pour s'assurer de la cohérence

      for (let i = 0; i < iterations; i++) {
        const question = generateQuestion(selectedTables);
        
        // Au moins un opérande dans les tables sélectionnées
        const hasTableNumber = selectedTables.includes(question.operand1) || 
                               selectedTables.includes(question.operand2);
        expect(hasTableNumber).toBe(true);
        expect(question.correctAnswer).toBe(question.operand1 * question.operand2);
      }
    });

    it('devrait fonctionner avec une seule table sélectionnée', () => {
      const selectedTables = [4];
      const question = generateQuestion(selectedTables);

      // Au moins un opérande doit être 4
      const hasFour = question.operand1 === 4 || question.operand2 === 4;
      expect(hasFour).toBe(true);
      expect(question.correctAnswer).toBe(question.operand1 * question.operand2);
    });

    it('devrait générer une question avec les propriétés requises', () => {
      const selectedTables = [2, 3, 5];
      const question = generateQuestion(selectedTables);

      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('operand1');
      expect(question).toHaveProperty('operand2');
      expect(question).toHaveProperty('correctAnswer');
      expect(question).toHaveProperty('attempts');
      expect(question).toHaveProperty('pointsEarned');
      expect(question).toHaveProperty('comboMultiplier');
      
      expect(question.attempts).toBe(0);
      expect(question.pointsEarned).toBe(0);
      expect(question.comboMultiplier).toBe(1);
    });
  });

  describe('generateQuestions', () => {
    it('devrait générer le nombre correct de questions', () => {
      const selectedTables = [2, 3, 5];
      const count = 10;
      const questions = generateQuestions(selectedTables, count);

      expect(questions).toHaveLength(count);
    });

    it('devrait générer des questions avec les tables sélectionnées', () => {
      const selectedTables = [2, 5];
      const count = 20;
      const questions = generateQuestions(selectedTables, count);

      questions.forEach(question => {
        // Au moins un opérande dans les tables sélectionnées
        const hasTableNumber = selectedTables.includes(question.operand1) || 
                               selectedTables.includes(question.operand2);
        expect(hasTableNumber).toBe(true);
      });
    });

    it('devrait générer des questions uniques (ids différents)', () => {
      const selectedTables = [2, 3];
      const count = 10;
      const questions = generateQuestions(selectedTables, count);

      const ids = questions.map(q => q.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(count);
    });

    it('devrait éviter les doublons de questions dans une partie', () => {
      const selectedTables = [2, 3];
      const count = 10;
      const questions = generateQuestions(selectedTables, count);

      // Vérifier qu'il n'y a pas deux questions identiques
      for (let i = 0; i < questions.length; i++) {
        for (let j = i + 1; j < questions.length; j++) {
          const q1 = questions[i];
          const q2 = questions[j];
          
          // Vérifier que ce n'est pas la même question (dans un sens ou l'autre)
          const isSame = 
            (q1.operand1 === q2.operand1 && q1.operand2 === q2.operand2) ||
            (q1.operand1 === q2.operand2 && q1.operand2 === q2.operand1);
          
          expect(isSame).toBe(false);
        }
      }
    });

    it('ne devrait pas avoir la même question deux fois de suite', () => {
      const selectedTables = [2, 3];
      const count = 10;
      const questions = generateQuestions(selectedTables, count);

      for (let i = 0; i < questions.length - 1; i++) {
        const current = questions[i];
        const next = questions[i + 1];
        
        // Vérifier que deux questions consécutives ne sont pas identiques
        const isSame = 
          (current.operand1 === next.operand1 && current.operand2 === next.operand2) ||
          (current.operand1 === next.operand2 && current.operand2 === next.operand1);
        
        expect(isSame).toBe(false);
      }
    });
  });

  describe('validateAnswer', () => {
    it('devrait valider une réponse correcte', () => {
      const question = {
        id: 'test',
        operand1: 3,
        operand2: 4,
        correctAnswer: 12,
        attempts: 0,
        pointsEarned: 0,
        comboMultiplier: 1,
      };

      expect(validateAnswer(question, 12)).toBe(true);
    });

    it('devrait invalider une réponse incorrecte', () => {
      const question = {
        id: 'test',
        operand1: 3,
        operand2: 4,
        correctAnswer: 12,
        attempts: 0,
        pointsEarned: 0,
        comboMultiplier: 1,
      };

      expect(validateAnswer(question, 13)).toBe(false);
      expect(validateAnswer(question, 0)).toBe(false);
      expect(validateAnswer(question, -12)).toBe(false);
    });
  });

  describe('calculateScore', () => {
    it('devrait retourner 0 points pour une réponse incorrecte', () => {
      const score = calculateScore(false, 0);
      
      expect(score.basePoints).toBe(0);
      expect(score.timeBonus).toBe(0);
      expect(score.comboBonus).toBe(0);
      expect(score.totalPoints).toBe(0);
    });

    it('devrait calculer les points de base pour une réponse correcte', () => {
      const score = calculateScore(true, 0);
      
      expect(score.basePoints).toBe(10);
      expect(score.comboBonus).toBe(0);
      expect(score.totalPoints).toBeGreaterThanOrEqual(10);
    });

    it('devrait appliquer le bonus de combo', () => {
      const score = calculateScore(true, 2);
      
      expect(score.basePoints).toBe(10);
      expect(score.comboBonus).toBeGreaterThan(0);
      expect(score.totalPoints).toBeGreaterThan(10);
    });

    it('devrait appliquer le bonus de temps', () => {
      const score = calculateScore(true, 0, 8, 10);
      
      expect(score.basePoints).toBe(10);
      expect(score.timeBonus).toBeGreaterThan(0);
      expect(score.totalPoints).toBeGreaterThan(10);
    });

    it('devrait cumuler les bonus (combo + temps)', () => {
      const score = calculateScore(true, 3, 9, 10);
      
      expect(score.basePoints).toBe(10);
      expect(score.timeBonus).toBeGreaterThan(0);
      expect(score.comboBonus).toBeGreaterThan(0);
      expect(score.totalPoints).toBe(
        score.basePoints + score.timeBonus + score.comboBonus
      );
    });
  });

  describe('getComboMultiplier', () => {
    it('devrait retourner x1 pour combo < 2', () => {
      expect(getComboMultiplier(0)).toBe(1);
      expect(getComboMultiplier(1)).toBe(1);
    });

    it('devrait retourner x2 pour combo 2-3', () => {
      expect(getComboMultiplier(2)).toBe(2);
    });

    it('devrait retourner x3 pour combo 3', () => {
      expect(getComboMultiplier(3)).toBe(3);
    });

    it('devrait retourner x4 pour combo >= 4', () => {
      expect(getComboMultiplier(4)).toBe(4);
      expect(getComboMultiplier(5)).toBe(4);
      expect(getComboMultiplier(10)).toBe(4);
    });
  });

  describe('calculateAccuracy', () => {
    it('devrait calculer la précision correctement', () => {
      expect(calculateAccuracy(10, 10)).toBe(100);
      expect(calculateAccuracy(9, 10)).toBe(90);
      expect(calculateAccuracy(5, 10)).toBe(50);
      expect(calculateAccuracy(0, 10)).toBe(0);
    });

    it('devrait retourner 0 si total est 0', () => {
      expect(calculateAccuracy(0, 0)).toBe(0);
    });

    it('devrait arrondir le résultat', () => {
      expect(calculateAccuracy(2, 3)).toBe(67); // 66.666... arrondi à 67
      expect(calculateAccuracy(1, 3)).toBe(33); // 33.333... arrondi à 33
    });
  });
});
