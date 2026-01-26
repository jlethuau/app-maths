import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  randomDuration,
  randomDelay,
  randomRotation,
  randomScale,
  randomX,
  randomY,
  randomChoice,
  randomConfettiStyle,
  randomFloatStyle,
  randomBounceStyle,
  randomFadeInStyle,
  randomPopInStyle,
  randomSparkleStyle,
  randomParticleStyle,
  randomAnimationVars,
  randomWiggleVars,
  randomBounceVars,
  randomGlowVars,
  randomChaoticFloatVars,
  randomParticleVars,
  generateRandomElements,
} from './animationUtils';

describe('animationUtils', () => {
  beforeEach(() => {
    // Reset Math.random pour chaque test
    vi.spyOn(Math, 'random');
  });

  describe('randomDuration', () => {
    it('devrait générer une durée entre min et max', () => {
      const duration = randomDuration(0.5, 2);
      expect(duration).toBeGreaterThanOrEqual(0.5);
      expect(duration).toBeLessThanOrEqual(2);
    });

    it('devrait utiliser les valeurs par défaut', () => {
      const duration = randomDuration();
      expect(duration).toBeGreaterThanOrEqual(0.3);
      expect(duration).toBeLessThanOrEqual(1);
    });
  });

  describe('randomDelay', () => {
    it('devrait générer un délai entre min et max', () => {
      const delay = randomDelay(0, 1);
      expect(delay).toBeGreaterThanOrEqual(0);
      expect(delay).toBeLessThanOrEqual(1);
    });
  });

  describe('randomRotation', () => {
    it('devrait générer une rotation entre min et max', () => {
      const rotation = randomRotation(-90, 90);
      expect(rotation).toBeGreaterThanOrEqual(-90);
      expect(rotation).toBeLessThanOrEqual(90);
    });

    it('devrait utiliser les valeurs par défaut', () => {
      const rotation = randomRotation();
      expect(rotation).toBeGreaterThanOrEqual(-180);
      expect(rotation).toBeLessThanOrEqual(180);
    });
  });

  describe('randomScale', () => {
    it('devrait générer une échelle entre min et max', () => {
      const scale = randomScale(0.5, 1.5);
      expect(scale).toBeGreaterThanOrEqual(0.5);
      expect(scale).toBeLessThanOrEqual(1.5);
    });
  });

  describe('randomX', () => {
    it('devrait générer une position X entre min et max', () => {
      const x = randomX(0, 100);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
    });
  });

  describe('randomY', () => {
    it('devrait générer une position Y entre min et max', () => {
      const y = randomY(0, 100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
    });
  });

  describe('randomChoice', () => {
    it('devrait choisir un élément du tableau', () => {
      const array = ['a', 'b', 'c', 'd'];
      const choice = randomChoice(array);
      expect(array).toContain(choice);
    });

    it('devrait retourner le seul élément si le tableau a un élément', () => {
      const array = ['only'];
      const choice = randomChoice(array);
      expect(choice).toBe('only');
    });
  });

  describe('randomConfettiStyle', () => {
    it('devrait générer un objet de style avec toutes les propriétés', () => {
      const style = randomConfettiStyle();
      
      expect(style).toHaveProperty('left');
      expect(style).toHaveProperty('animationDelay');
      expect(style).toHaveProperty('animationDuration');
      expect(style).toHaveProperty('backgroundColor');
      expect(style).toHaveProperty('transform');
    });

    it('devrait avoir une couleur valide', () => {
      const style = randomConfettiStyle();
      const validColors = ['#7c3aed', '#ec4899', '#fbbf24', '#10b981', '#3b82f6', '#f97316'];
      
      expect(validColors).toContain(style.backgroundColor);
    });
  });

  describe('randomFloatStyle', () => {
    it('devrait générer un style de float', () => {
      const style = randomFloatStyle();
      
      expect(style).toHaveProperty('animationDelay');
      expect(style).toHaveProperty('animationDuration');
    });
  });

  describe('randomBounceStyle', () => {
    it('devrait générer un style de bounce', () => {
      const style = randomBounceStyle();
      
      expect(style).toHaveProperty('animationDelay');
      expect(style).toHaveProperty('animationDuration');
    });
  });

  describe('randomFadeInStyle', () => {
    it('devrait générer un style de fade-in', () => {
      const style = randomFadeInStyle();
      
      expect(style).toHaveProperty('animationDelay');
      expect(style).toHaveProperty('animationDuration');
    });
  });

  describe('randomPopInStyle', () => {
    it('devrait générer un style de pop-in avec index', () => {
      const style = randomPopInStyle(5);
      
      expect(style).toHaveProperty('animationDelay');
      expect(style).toHaveProperty('animationDuration');
      expect(style).toHaveProperty('transform');
    });

    it('devrait avoir un délai basé sur l\'index', () => {
      const style1 = randomPopInStyle(0);
      const style2 = randomPopInStyle(5);
      
      const delay1 = parseFloat(style1.animationDelay as string);
      const delay2 = parseFloat(style2.animationDelay as string);
      
      // Le délai devrait augmenter avec l'index
      expect(delay2).toBeGreaterThanOrEqual(delay1);
    });
  });

  describe('randomSparkleStyle', () => {
    it('devrait générer un style de sparkle', () => {
      const style = randomSparkleStyle();
      
      expect(style).toHaveProperty('top');
      expect(style).toHaveProperty('left');
      expect(style).toHaveProperty('animationDelay');
      expect(style).toHaveProperty('animationDuration');
      expect(style).toHaveProperty('transform');
    });
  });

  describe('randomParticleStyle', () => {
    it('devrait générer un style de particule complet', () => {
      const style = randomParticleStyle();
      
      expect(style).toHaveProperty('top');
      expect(style).toHaveProperty('left');
      expect(style).toHaveProperty('width');
      expect(style).toHaveProperty('height');
      expect(style).toHaveProperty('backgroundColor');
      expect(style).toHaveProperty('opacity');
      expect(style).toHaveProperty('animationDelay');
      expect(style).toHaveProperty('animationDuration');
    });
  });

  describe('randomAnimationVars', () => {
    it('devrait générer des variables CSS', () => {
      const vars = randomAnimationVars();
      
      expect(vars).toHaveProperty('--random-duration');
      expect(vars).toHaveProperty('--random-delay');
      expect(vars).toHaveProperty('--random-rotation');
      expect(vars).toHaveProperty('--random-scale');
      expect(vars).toHaveProperty('--random-x');
      expect(vars).toHaveProperty('--random-y');
    });
  });

  describe('randomWiggleVars', () => {
    it('devrait générer des variables pour wiggle', () => {
      const vars = randomWiggleVars();
      
      expect(vars).toHaveProperty('--wiggle-angle-1');
      expect(vars).toHaveProperty('--wiggle-angle-2');
      expect(vars).toHaveProperty('--wiggle-angle-3');
      expect(vars).toHaveProperty('animationDuration');
      expect(vars).toHaveProperty('animationDelay');
    });
  });

  describe('randomBounceVars', () => {
    it('devrait générer des variables pour bounce', () => {
      const vars = randomBounceVars();
      
      expect(vars).toHaveProperty('--bounce-height-1');
      expect(vars).toHaveProperty('--bounce-height-2');
      expect(vars).toHaveProperty('--bounce-height-3');
      expect(vars).toHaveProperty('animationDuration');
      expect(vars).toHaveProperty('animationDelay');
    });
  });

  describe('randomGlowVars', () => {
    it('devrait générer des variables pour glow', () => {
      const vars = randomGlowVars();
      
      expect(vars).toHaveProperty('--glow-size-1');
      expect(vars).toHaveProperty('--glow-size-2');
      expect(vars).toHaveProperty('--glow-size-3');
      expect(vars).toHaveProperty('--glow-color');
      expect(vars).toHaveProperty('animationDuration');
      expect(vars).toHaveProperty('animationDelay');
    });
  });

  describe('randomChaoticFloatVars', () => {
    it('devrait générer des variables pour chaotic float', () => {
      const vars = randomChaoticFloatVars();
      
      expect(vars).toHaveProperty('--chaos-x1');
      expect(vars).toHaveProperty('--chaos-y1');
      expect(vars).toHaveProperty('--chaos-rot1');
      expect(vars).toHaveProperty('animationDuration');
      expect(vars).toHaveProperty('animationDelay');
    });
  });

  describe('randomParticleVars', () => {
    it('devrait générer des variables pour particules', () => {
      const vars = randomParticleVars();
      
      expect(vars).toHaveProperty('--particle-x1');
      expect(vars).toHaveProperty('--particle-y1');
      expect(vars).toHaveProperty('--particle-opacity');
      expect(vars).toHaveProperty('animationDuration');
      expect(vars).toHaveProperty('animationDelay');
    });
  });

  describe('generateRandomElements', () => {
    it('devrait générer le nombre correct d\'éléments', () => {
      const elements = generateRandomElements(5, () => ({ test: 'value' }));
      expect(elements).toHaveLength(5);
    });

    it('devrait appeler le générateur avec l\'index', () => {
      const generator = vi.fn((i) => ({ index: i }));
      generateRandomElements(3, generator);
      
      expect(generator).toHaveBeenCalledTimes(3);
      expect(generator).toHaveBeenNthCalledWith(1, 0);
      expect(generator).toHaveBeenNthCalledWith(2, 1);
      expect(generator).toHaveBeenNthCalledWith(3, 2);
    });

    it('devrait générer des éléments avec le style generator', () => {
      const elements = generateRandomElements(3, randomConfettiStyle);
      
      expect(elements).toHaveLength(3);
      elements.forEach((element) => {
        expect(element).toHaveProperty('backgroundColor');
        expect(element).toHaveProperty('left');
      });
    });
  });

  describe('Variabilité des résultats', () => {
    it('devrait générer des valeurs différentes sur plusieurs appels', () => {
      const values = Array.from({ length: 10 }, () => randomDuration());
      const uniqueValues = new Set(values);
      
      // Il devrait y avoir au moins quelques valeurs différentes
      expect(uniqueValues.size).toBeGreaterThan(1);
    });

    it('devrait générer des styles de confetti différents', () => {
      const style1 = randomConfettiStyle();
      const style2 = randomConfettiStyle();
      
      // Au moins une propriété devrait être différente
      const isDifferent = 
        style1.left !== style2.left ||
        style1.animationDelay !== style2.animationDelay ||
        style1.backgroundColor !== style2.backgroundColor;
      
      expect(isDifferent).toBe(true);
    });
  });
});
