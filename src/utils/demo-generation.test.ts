/**
 * Test de démonstration pour visualiser la génération des questions
 * Ce test montre les questions générées pour différentes configurations
 */
import { describe, it, expect } from 'vitest';
import { generateQuestions } from './gameUtils';

describe('Démonstration de génération des questions', () => {
  it('Tables de 2 et 3 - Afficher les 10 premières questions', () => {
    const selectedTables = [2, 3];
    const questions = generateQuestions(selectedTables, 10);

    console.log('\n📊 DÉMONSTRATION - Tables de 2 et 3 :');
    console.log('━'.repeat(50));
    
    questions.forEach((q, index) => {
      const hasTable2 = q.operand1 === 2 || q.operand2 === 2;
      const hasTable3 = q.operand1 === 3 || q.operand2 === 3;
      const symbol = hasTable2 ? '②' : hasTable3 ? '③' : '❌';
      
      console.log(
        `${symbol} Question ${(index + 1).toString().padStart(2)}: ` +
        `${q.operand1} × ${q.operand2} = ${q.correctAnswer}`
      );
    });
    
    console.log('━'.repeat(50));
    
    // Vérifications
    questions.forEach(q => {
      const hasTableNumber = [2, 3].includes(q.operand1) || [2, 3].includes(q.operand2);
      expect(hasTableNumber).toBe(true);
    });
  });

  it('Table de 5 uniquement - Afficher les 10 premières questions', () => {
    const selectedTables = [5];
    const questions = generateQuestions(selectedTables, 10);

    console.log('\n📊 DÉMONSTRATION - Table de 5 uniquement :');
    console.log('━'.repeat(50));
    
    questions.forEach((q, index) => {
      console.log(
        `⑤ Question ${(index + 1).toString().padStart(2)}: ` +
        `${q.operand1} × ${q.operand2} = ${q.correctAnswer}`
      );
    });
    
    console.log('━'.repeat(50));
    
    // Vérifications
    questions.forEach(q => {
      const hasFive = q.operand1 === 5 || q.operand2 === 5;
      expect(hasFive).toBe(true);
    });
  });

  it('Tables de 7, 8, 9 - Vérifier la variété', () => {
    const selectedTables = [7, 8, 9];
    const questions = generateQuestions(selectedTables, 15);

    console.log('\n📊 DÉMONSTRATION - Tables de 7, 8 et 9 :');
    console.log('━'.repeat(50));
    
    const stats = { '7': 0, '8': 0, '9': 0 };
    
    questions.forEach((q, index) => {
      const symbol = q.operand1 === 7 || q.operand2 === 7 ? '⑦' :
                     q.operand1 === 8 || q.operand2 === 8 ? '⑧' : '⑨';
      
      console.log(
        `${symbol} Question ${(index + 1).toString().padStart(2)}: ` +
        `${q.operand1} × ${q.operand2} = ${q.correctAnswer}`
      );
      
      if (q.operand1 === 7 || q.operand2 === 7) stats['7']++;
      if (q.operand1 === 8 || q.operand2 === 8) stats['8']++;
      if (q.operand1 === 9 || q.operand2 === 9) stats['9']++;
    });
    
    console.log('━'.repeat(50));
    console.log(`Statistiques: Table 7: ${stats['7']}, Table 8: ${stats['8']}, Table 9: ${stats['9']}`);
    console.log('━'.repeat(50));
    
    // Vérifier qu'au moins chaque table apparaît
    expect(stats['7']).toBeGreaterThan(0);
    expect(stats['8']).toBeGreaterThan(0);
    expect(stats['9']).toBeGreaterThan(0);
  });

  it('Vérifier l\'absence de doublons sur 20 questions', () => {
    const selectedTables = [2, 3, 5];
    const questions = generateQuestions(selectedTables, 20);

    const signatures = questions.map(q => {
      // Créer une signature unique pour chaque question (ordre normalisé)
      const [a, b] = [q.operand1, q.operand2].sort((x, y) => x - y);
      return `${a}×${b}`;
    });

    const uniqueSignatures = new Set(signatures);
    
    console.log('\n📊 VÉRIFICATION DES DOUBLONS (20 questions) :');
    console.log('━'.repeat(50));
    console.log(`Questions générées: ${questions.length}`);
    console.log(`Questions uniques: ${uniqueSignatures.size}`);
    console.log('━'.repeat(50));
    
    expect(uniqueSignatures.size).toBe(20);
  });
});
