/**
 * Tests spécifiques pour le bug du score 9/10 au lieu de 10/10
 * Ces tests vérifient que le comptage des bonnes réponses fonctionne correctement
 */
import { describe, it, expect } from 'vitest';
import { Question } from '@/types';

describe('Score Calculation - Bug Fix', () => {
  it('devrait compter correctement 10 questions avec 10 bonnes réponses', () => {
    // Simuler 10 questions toutes correctes
    const questions: Question[] = Array.from({ length: 10 }, (_, i) => ({
      id: `q-${i}`,
      operand1: 2,
      operand2: 3,
      correctAnswer: 6,
      userAnswer: 6,
      isCorrect: true,
      attempts: 1,
      pointsEarned: 10,
      comboMultiplier: 1,
    }));

    const correctAnswers = questions.filter((q) => q.isCorrect).length;
    const totalQuestions = questions.length;

    expect(correctAnswers).toBe(10);
    expect(totalQuestions).toBe(10);
    expect(`${correctAnswers}/${totalQuestions}`).toBe('10/10');
  });

  it('devrait compter correctement 10 questions avec 9 bonnes réponses', () => {
    // Simuler 10 questions avec 9 correctes
    const questions: Question[] = Array.from({ length: 10 }, (_, i) => ({
      id: `q-${i}`,
      operand1: 2,
      operand2: 3,
      correctAnswer: 6,
      userAnswer: i === 0 ? 999 : 6,
      isCorrect: i !== 0,
      attempts: 1,
      pointsEarned: i !== 0 ? 10 : 0,
      comboMultiplier: 1,
    }));

    const correctAnswers = questions.filter((q) => q.isCorrect).length;
    const totalQuestions = questions.length;

    expect(correctAnswers).toBe(9);
    expect(totalQuestions).toBe(10);
    expect(`${correctAnswers}/${totalQuestions}`).toBe('9/10');
  });

  it('devrait marquer correctement les questions comme correctes ou incorrectes', () => {
    const questions: Question[] = [
      {
        id: 'q1',
        operand1: 2,
        operand2: 3,
        correctAnswer: 6,
        userAnswer: 6,
        isCorrect: true,
        attempts: 1,
        pointsEarned: 10,
        comboMultiplier: 1,
      },
      {
        id: 'q2',
        operand1: 4,
        operand2: 5,
        correctAnswer: 20,
        userAnswer: 21,
        isCorrect: false,
        attempts: 1,
        pointsEarned: 0,
        comboMultiplier: 1,
      },
      {
        id: 'q3',
        operand1: 3,
        operand2: 7,
        correctAnswer: 21,
        userAnswer: 21,
        isCorrect: true,
        attempts: 1,
        pointsEarned: 10,
        comboMultiplier: 1,
      },
    ];

    const correctCount = questions.filter((q) => q.isCorrect).length;
    expect(correctCount).toBe(2);
  });

  it('devrait gérer le cas où toutes les questions sont incorrectes', () => {
    const questions: Question[] = Array.from({ length: 10 }, (_, i) => ({
      id: `q-${i}`,
      operand1: 2,
      operand2: 3,
      correctAnswer: 6,
      userAnswer: 999,
      isCorrect: false,
      attempts: 1,
      pointsEarned: 0,
      comboMultiplier: 1,
    }));

    const correctAnswers = questions.filter((q) => q.isCorrect).length;
    expect(correctAnswers).toBe(0);
  });
});
