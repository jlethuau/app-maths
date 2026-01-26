/**
 * Utilitaires pour générer des animations CSS aléatoires
 */

/**
 * Génère une durée d'animation aléatoire entre min et max (en secondes)
 */
export const randomDuration = (min: number = 0.3, max: number = 1): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Génère un délai d'animation aléatoire entre min et max (en secondes)
 */
export const randomDelay = (min: number = 0, max: number = 0.5): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Génère une valeur de rotation aléatoire entre min et max (en degrés)
 */
export const randomRotation = (min: number = -180, max: number = 180): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Génère une échelle aléatoire entre min et max
 */
export const randomScale = (min: number = 0.8, max: number = 1.2): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Génère une position X aléatoire en pourcentage
 */
export const randomX = (min: number = 0, max: number = 100): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Génère une position Y aléatoire en pourcentage
 */
export const randomY = (min: number = 0, max: number = 100): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Choisit une valeur aléatoire dans un tableau
 */
export const randomChoice = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Génère un objet de style CSS pour une animation aléatoire de confetti
 */
export const randomConfettiStyle = (): React.CSSProperties => {
  const colors = ['#7c3aed', '#ec4899', '#fbbf24', '#10b981', '#3b82f6', '#f97316'];
  
  return {
    left: `${randomX()}%`,
    animationDelay: `${randomDelay(0, 3)}s`,
    animationDuration: `${randomDuration(2, 5)}s`,
    backgroundColor: randomChoice(colors),
    transform: `rotate(${randomRotation()}deg)`,
  };
};

/**
 * Génère un objet de style CSS pour une animation de float aléatoire
 */
export const randomFloatStyle = (): React.CSSProperties => {
  return {
    animationDelay: `${randomDelay(0, 2)}s`,
    animationDuration: `${randomDuration(2, 4)}s`,
  };
};

/**
 * Génère un objet de style CSS pour une animation de bounce aléatoire
 */
export const randomBounceStyle = (): React.CSSProperties => {
  return {
    animationDelay: `${randomDelay()}s`,
    animationDuration: `${randomDuration(0.4, 0.8)}s`,
  };
};

/**
 * Génère un objet de style CSS pour une animation de fade-in aléatoire
 */
export const randomFadeInStyle = (): React.CSSProperties => {
  return {
    animationDelay: `${randomDelay(0, 1)}s`,
    animationDuration: `${randomDuration(0.3, 0.8)}s`,
  };
};

/**
 * Génère un objet de style CSS pour une animation de pop-in aléatoire
 */
export const randomPopInStyle = (index: number = 0): React.CSSProperties => {
  return {
    animationDelay: `${index * 0.1 + randomDelay(0, 0.2)}s`,
    animationDuration: `${randomDuration(0.3, 0.6)}s`,
    transform: `rotate(${randomRotation(-10, 10)}deg)`,
  };
};

/**
 * Génère un objet de style CSS pour une animation de sparkle aléatoire
 */
export const randomSparkleStyle = (): React.CSSProperties => {
  return {
    top: `${randomY()}%`,
    left: `${randomX()}%`,
    animationDelay: `${randomDelay(0, 2)}s`,
    animationDuration: `${randomDuration(0.8, 1.5)}s`,
    transform: `scale(${randomScale(0.5, 1.5)})`,
  };
};

/**
 * Génère un objet de style CSS pour une particule aléatoire
 */
export const randomParticleStyle = (): React.CSSProperties => {
  const colors = ['#7c3aed', '#ec4899', '#fbbf24', '#10b981', '#3b82f6', '#f97316', '#8b5cf6'];
  
  return {
    top: `${randomY()}%`,
    left: `${randomX()}%`,
    width: `${Math.random() * 4 + 2}px`,
    height: `${Math.random() * 4 + 2}px`,
    backgroundColor: randomChoice(colors),
    opacity: Math.random() * 0.6 + 0.2,
    animationDelay: `${randomDelay(0, 5)}s`,
    animationDuration: `${randomDuration(3, 8)}s`,
  };
};

/**
 * Génère des variables CSS personnalisées pour des animations aléatoires
 */
export const randomAnimationVars = (): Record<string, string> => {
  return {
    '--random-duration': `${randomDuration()}s`,
    '--random-delay': `${randomDelay()}s`,
    '--random-rotation': `${randomRotation()}deg`,
    '--random-scale': `${randomScale()}`,
    '--random-x': `${randomX()}%`,
    '--random-y': `${randomY()}%`,
  } as Record<string, string>;
};

/**
 * Génère des variables CSS pour l'animation de wiggle aléatoire
 */
export const randomWiggleVars = (): React.CSSProperties => {
  return {
    '--wiggle-angle-1': `${randomRotation(-8, 8)}deg`,
    '--wiggle-angle-2': `${randomRotation(-8, 8)}deg`,
    '--wiggle-angle-3': `${randomRotation(-8, 8)}deg`,
    '--wiggle-scale-1': `${randomScale(1, 1.1)}`,
    '--wiggle-scale-2': `${randomScale(0.9, 1)}`,
    '--wiggle-scale-3': `${randomScale(0.98, 1.05)}`,
    animationDuration: `${randomDuration(0.5, 1.5)}s`,
    animationDelay: `${randomDelay()}s`,
  } as React.CSSProperties;
};

/**
 * Génère des variables CSS pour l'animation de bounce aléatoire
 */
export const randomBounceVars = (): React.CSSProperties => {
  return {
    '--bounce-height-1': `${-Math.random() * 20 - 10}px`,
    '--bounce-height-2': `${-Math.random() * 15 - 5}px`,
    '--bounce-height-3': `${-Math.random() * 18 - 8}px`,
    '--bounce-scale-1': `${randomScale(1.05, 1.15)}`,
    '--bounce-scale-2': `${randomScale(0.9, 1)}`,
    '--bounce-scale-3': `${randomScale(1, 1.08)}`,
    animationDuration: `${randomDuration(0.6, 1.2)}s`,
    animationDelay: `${randomDelay()}s`,
  } as React.CSSProperties;
};

/**
 * Génère des variables CSS pour l'animation de glow pulse aléatoire
 */
export const randomGlowVars = (): React.CSSProperties => {
  const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-success)'];
  
  return {
    '--glow-size-1': `${Math.random() * 5 + 3}px`,
    '--glow-size-2': `${Math.random() * 15 + 15}px`,
    '--glow-size-3': `${Math.random() * 20 + 25}px`,
    '--glow-color': randomChoice(colors),
    '--pulse-scale': `${randomScale(1.02, 1.08)}`,
    animationDuration: `${randomDuration(1.5, 3)}s`,
    animationDelay: `${randomDelay()}s`,
  } as React.CSSProperties;
};

/**
 * Génère des variables CSS pour l'animation de float chaotique
 */
export const randomChaoticFloatVars = (): React.CSSProperties => {
  return {
    '--chaos-x1': `${Math.random() * 10 - 5}px`,
    '--chaos-y1': `${-Math.random() * 15}px`,
    '--chaos-x2': `${Math.random() * 10 - 5}px`,
    '--chaos-y2': `${-Math.random() * 20}px`,
    '--chaos-x3': `${Math.random() * 10 - 5}px`,
    '--chaos-y3': `${-Math.random() * 15}px`,
    '--chaos-x4': `${Math.random() * 10 - 5}px`,
    '--chaos-y4': `${-Math.random() * 10}px`,
    '--chaos-rot1': `${randomRotation(-10, 10)}deg`,
    '--chaos-rot2': `${randomRotation(-10, 10)}deg`,
    '--chaos-rot3': `${randomRotation(-10, 10)}deg`,
    '--chaos-rot4': `${randomRotation(-10, 10)}deg`,
    animationDuration: `${randomDuration(2, 4)}s`,
    animationDelay: `${randomDelay(0, 2)}s`,
  } as React.CSSProperties;
};

/**
 * Génère des variables CSS pour l'animation de particules
 */
export const randomParticleVars = (): React.CSSProperties => {
  return {
    '--particle-x1': `${Math.random() * 20 - 10}px`,
    '--particle-y1': `${-Math.random() * 20 - 10}px`,
    '--particle-x2': `${Math.random() * 20 - 10}px`,
    '--particle-y2': `${-Math.random() * 30 - 15}px`,
    '--particle-x3': `${Math.random() * 20 - 10}px`,
    '--particle-y3': `${-Math.random() * 15 - 5}px`,
    '--particle-opacity': `${Math.random() * 0.5 + 0.3}`,
    animationDuration: `${randomDuration(3, 6)}s`,
    animationDelay: `${randomDelay(0, 3)}s`,
  } as React.CSSProperties;
};

/**
 * Génère un nombre spécifié d'éléments avec des styles aléatoires
 */
export const generateRandomElements = <T extends object>(
  count: number,
  styleGenerator: (index?: number) => T
): T[] => {
  return Array.from({ length: count }, (_, i) => styleGenerator(i));
};
