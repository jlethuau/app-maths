# Animations CSS Aléatoires

Ce document explique comment utiliser le système d'animations CSS aléatoires de l'application App Maths.

## Vue d'ensemble

Le système d'animations aléatoires permet de créer des interfaces plus dynamiques et engageantes en variant les paramètres d'animation (durée, délai, rotation, échelle, etc.) de manière aléatoire pour chaque élément.

## Utilitaires disponibles

Tous les utilitaires sont disponibles dans `/src/utils/animationUtils.ts`.

### Fonctions de base

#### `randomDuration(min, max)`
Génère une durée d'animation aléatoire en secondes.

```typescript
import { randomDuration } from '@/utils/animationUtils';

const duration = randomDuration(0.5, 2); // Entre 0.5s et 2s
```

#### `randomDelay(min, max)`
Génère un délai d'animation aléatoire en secondes.

```typescript
import { randomDelay } from '@/utils/animationUtils';

const delay = randomDelay(0, 1); // Entre 0s et 1s
```

#### `randomRotation(min, max)`
Génère un angle de rotation aléatoire en degrés.

```typescript
import { randomRotation } from '@/utils/animationUtils';

const rotation = randomRotation(-45, 45); // Entre -45° et 45°
```

#### `randomScale(min, max)`
Génère un facteur d'échelle aléatoire.

```typescript
import { randomScale } from '@/utils/animationUtils';

const scale = randomScale(0.8, 1.2); // Entre 0.8 et 1.2
```

#### `randomChoice(array)`
Choisit un élément aléatoire dans un tableau.

```typescript
import { randomChoice } from '@/utils/animationUtils';

const colors = ['red', 'blue', 'green'];
const color = randomChoice(colors);
```

### Générateurs de styles prédéfinis

#### `randomConfettiStyle()`
Génère un style complet pour des confettis animés.

```typescript
import { randomConfettiStyle } from '@/utils/animationUtils';

// Dans un composant React
{Array.from({ length: 50 }).map((_, i) => (
  <div
    key={i}
    className={styles.confetti}
    style={randomConfettiStyle()}
  />
))}
```

#### `randomPopInStyle(index)`
Génère un style d'apparition avec décalage basé sur l'index.

```typescript
import { randomPopInStyle } from '@/utils/animationUtils';

// Dans un composant React
{items.map((item, index) => (
  <div
    key={item.id}
    className={styles.item}
    style={randomPopInStyle(index)}
  >
    {item.content}
  </div>
))}
```

#### `randomParticleStyle()`
Génère un style complet pour des particules flottantes.

```typescript
import { randomParticleStyle, randomChaoticFloatVars } from '@/utils/animationUtils';

{Array.from({ length: 20 }).map((_, i) => (
  <div
    key={i}
    className={styles.particle}
    style={{
      ...randomParticleStyle(),
      ...randomChaoticFloatVars(),
    }}
  />
))}
```

### Générateurs de variables CSS

Ces fonctions génèrent des variables CSS personnalisées qui peuvent être utilisées avec les animations définies dans `animations.css`.

#### `randomWiggleVars()`
Variables pour l'animation `randomWiggle`.

```typescript
import { randomWiggleVars } from '@/utils/animationUtils';

<div 
  className="animate-random-wiggle"
  style={randomWiggleVars()}
>
  Contenu qui bouge
</div>
```

#### `randomBounceVars()`
Variables pour l'animation `randomBounce`.

```typescript
import { randomBounceVars } from '@/utils/animationUtils';

<div 
  className="animate-random-bounce"
  style={randomBounceVars()}
>
  Contenu qui rebondit
</div>
```

#### `randomGlowVars()`
Variables pour l'animation `randomPulseGlow`.

```typescript
import { randomGlowVars } from '@/utils/animationUtils';

<div 
  className="animate-random-pulse-glow"
  style={randomGlowVars()}
>
  Contenu lumineux
</div>
```

#### `randomChaoticFloatVars()`
Variables pour l'animation `chaoticFloat`.

```typescript
import { randomChaoticFloatVars } from '@/utils/animationUtils';

<div 
  className="animate-chaotic-float"
  style={randomChaoticFloatVars()}
>
  Contenu flottant
</div>
```

## Animations CSS disponibles

Les animations suivantes sont définies dans `/src/styles/animations.css` et supportent les variables aléatoires :

### `randomWiggle`
Fait bouger et tourner l'élément de manière imprévisible.

**Variables CSS utilisées :**
- `--wiggle-angle-1`, `--wiggle-angle-2`, `--wiggle-angle-3` : Angles de rotation
- `--wiggle-scale-1`, `--wiggle-scale-2`, `--wiggle-scale-3` : Facteurs d'échelle

**Classe utilitaire :** `.animate-random-wiggle`

### `randomBounce`
Fait rebondir l'élément avec des hauteurs variables.

**Variables CSS utilisées :**
- `--bounce-height-1`, `--bounce-height-2`, `--bounce-height-3` : Hauteurs de rebond
- `--bounce-scale-1`, `--bounce-scale-2`, `--bounce-scale-3` : Échelles de rebond

**Classe utilitaire :** `.animate-random-bounce`

### `randomPulseGlow`
Crée un effet de lueur pulsante avec des intensités variables.

**Variables CSS utilisées :**
- `--glow-size-1`, `--glow-size-2`, `--glow-size-3` : Tailles de la lueur
- `--glow-color` : Couleur de la lueur
- `--pulse-scale` : Échelle du pulse

**Classe utilitaire :** `.animate-random-pulse-glow`

### `chaoticFloat`
Fait flotter l'élément de manière chaotique et imprévisible.

**Variables CSS utilisées :**
- `--chaos-x1` à `--chaos-x4` : Déplacements horizontaux
- `--chaos-y1` à `--chaos-y4` : Déplacements verticaux
- `--chaos-rot1` à `--chaos-rot4` : Rotations

**Classe utilitaire :** `.animate-chaotic-float`

### `float-particles`
Animation complexe pour les particules d'arrière-plan.

**Variables CSS utilisées :**
- `--particle-x1` à `--particle-x3` : Positions X
- `--particle-y1` à `--particle-y3` : Positions Y
- `--particle-opacity` : Opacité

## Exemples d'utilisation

### Exemple 1 : Confettis de célébration

```tsx
import { FC } from 'react';
import { randomConfettiStyle } from '@/utils/animationUtils';
import styles from './Celebration.module.css';

export const Celebration: FC = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className={styles.confetti}
          style={randomConfettiStyle()}
        />
      ))}
    </div>
  );
};
```

```css
/* Celebration.module.css */
.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  animation: confetti-fall linear forwards;
}
```

### Exemple 2 : Liste avec apparition décalée

```tsx
import { FC } from 'react';
import { randomPopInStyle } from '@/utils/animationUtils';
import styles from './ItemList.module.css';

interface Item {
  id: string;
  name: string;
}

interface ItemListProps {
  items: Item[];
}

export const ItemList: FC<ItemListProps> = ({ items }) => {
  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={styles.item}
          style={randomPopInStyle(index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

```css
/* ItemList.module.css */
.item {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  animation: popIn cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes popIn {
  from {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(var(--random-rotation, 0deg));
    opacity: 1;
  }
}
```

### Exemple 3 : Particules d'arrière-plan

```tsx
import { FC } from 'react';
import { randomParticleStyle, randomChaoticFloatVars } from '@/utils/animationUtils';
import styles from './Background.module.css';

export const Background: FC = () => {
  return (
    <div className={styles.particles}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{
            ...randomParticleStyle(),
            ...randomChaoticFloatVars(),
          }}
        />
      ))}
    </div>
  );
};
```

```css
/* Background.module.css */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: chaoticFloat infinite ease-in-out;
  opacity: 0.4;
  filter: blur(1px);
}
```

### Exemple 4 : Combo avec animation dynamique

```tsx
import { FC, useMemo } from 'react';
import { randomWiggleVars, randomGlowVars } from '@/utils/animationUtils';
import styles from './ComboDisplay.module.css';

interface ComboDisplayProps {
  combo: number;
}

export const ComboDisplay: FC<ComboDisplayProps> = ({ combo }) => {
  const animationStyle = useMemo(() => {
    if (combo >= 3) {
      return {
        ...randomWiggleVars(),
        ...randomGlowVars(),
      };
    }
    return {};
  }, [combo]);

  return (
    <div 
      className={`${styles.combo} ${combo >= 3 ? styles.active : ''}`}
      style={animationStyle}
    >
      {combo >= 3 && <span className={styles.flame}>🔥</span>}
      <span className={styles.number}>{combo}</span>
    </div>
  );
};
```

```css
/* ComboDisplay.module.css */
.combo {
  font-size: 2rem;
  font-weight: bold;
}

.active {
  animation: randomWiggle ease-in-out infinite, randomPulseGlow ease-in-out infinite;
}

.flame {
  animation: randomWiggle ease-in-out infinite;
  display: inline-block;
}
```

## Bonnes pratiques

### 1. Utiliser `useMemo` pour les animations basées sur des états

Les valeurs aléatoires doivent être régénérées uniquement quand c'est nécessaire :

```tsx
const animationStyle = useMemo(() => randomBounceVars(), [dependency]);
```

### 2. Limiter le nombre d'éléments animés

Pour maintenir de bonnes performances, limitez le nombre d'éléments avec des animations complexes :

```tsx
// Bien : nombre limité
{Array.from({ length: 20 }).map(...)}

// À éviter : trop d'éléments
{Array.from({ length: 500 }).map(...)}
```

### 3. Utiliser les classes utilitaires quand possible

Les classes CSS sont plus performantes que les styles inline :

```tsx
// Préféré
<div className="animate-random-wiggle" style={randomWiggleVars()}>

// Éviter si possible
<div style={{ animation: 'randomWiggle 1s infinite' }}>
```

### 4. Combiner plusieurs animations

Vous pouvez combiner plusieurs générateurs de styles pour des effets plus riches :

```tsx
<div style={{
  ...randomWiggleVars(),
  ...randomGlowVars(),
  ...randomFadeInStyle(),
}}>
```

### 5. Adapter aux préférences de mouvement réduit

Respectez les préférences d'accessibilité de l'utilisateur :

```css
@media (prefers-reduced-motion: reduce) {
  .animate-random-wiggle,
  .animate-random-bounce,
  .animate-chaotic-float {
    animation: none !important;
  }
}
```

## Performance

### Optimisations appliquées

1. **Variables CSS** : Utilisation de variables CSS personnalisées pour éviter les recalculs
2. **GPU Acceleration** : Les animations utilisent `transform` et `opacity` pour bénéficier de l'accélération GPU
3. **will-change** : Utilisation stratégique de `will-change` pour les animations complexes
4. **Génération unique** : Les valeurs aléatoires sont générées une seule fois avec `useMemo`

### Métriques de performance

- **FPS cible** : 60 FPS
- **Nombre max de particules recommandé** : 20-30
- **Nombre max de confettis recommandé** : 50-100

## Tests

Les utilitaires d'animation sont testés dans `/src/utils/animationUtils.test.ts`.

Pour exécuter les tests :

```bash
npm run test animationUtils
```

## Contribution

Pour ajouter de nouvelles animations aléatoires :

1. Ajoutez les fonctions utilitaires dans `animationUtils.ts`
2. Créez les keyframes CSS dans `animations.css`
3. Ajoutez les classes utilitaires correspondantes
4. Documentez l'utilisation dans ce fichier
5. Ajoutez des tests dans `animationUtils.test.ts`

## Références

- [MDN - CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [MDN - CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Performance - Rendering Performance](https://developers.google.com/web/fundamentals/performance/rendering)
