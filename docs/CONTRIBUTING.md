# Guide de Contribution

## 🌟 Bienvenue

Merci de contribuer à App Maths ! Ce guide vous aidera à maintenir la qualité et la cohérence du projet.

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Git
- Éditeur avec support TypeScript (VS Code recommandé)

## 🚀 Setup Local

```bash
# Cloner le repo
git clone <repo-url>
cd app-maths

# Installer les dépendances
npm install

# Lancer en dev
npm run dev

# Lancer les tests
npm run test
```

## 🌿 Git Workflow

### Branches

- `main` : Production (protégée)
- `develop` : Développement principal
- `feature/*` : Nouvelles fonctionnalités
- `fix/*` : Corrections de bugs
- `refactor/*` : Refactoring sans changement fonctionnel
- `docs/*` : Documentation uniquement

### Workflow

1. **Créer une branche depuis develop**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nom-feature
   ```

2. **Développer avec commits atomiques**
   ```bash
   git add .
   git commit -m "feat(game): add question validation"
   ```

3. **Push et créer PR**
   ```bash
   git push origin feature/nom-feature
   ```

4. **Après review et merge, supprimer la branche**
   ```bash
   git branch -d feature/nom-feature
   ```

## ✍️ Convention de Commits

Format : `type(scope): message`

### Types
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `refactor` : Refactoring (pas de changement fonctionnel)
- `style` : Formatage, points-virgules manquants, etc.
- `docs` : Documentation uniquement
- `test` : Ajout ou modification de tests
- `chore` : Maintenance (deps, config, etc.)
- `perf` : Amélioration de performance

### Scopes
- `game` : Logique de jeu
- `ui` : Composants UI
- `stats` : Statistiques
- `gamification` : Système de récompenses
- `settings` : Paramètres
- `core` : Fonctionnalités core
- `build` : Configuration build
- `deps` : Dépendances

### Exemples
```bash
feat(game): add multiplication quiz component
fix(stats): correct accuracy calculation for table 7
refactor(ui): simplify button component structure
docs(bmad): update development phase checklist
test(game): add tests for question generator
style(ui): format button styles with prettier
chore(deps): update react to 18.3.0
```

### Messages
- Impératif présent ("add" pas "added")
- Pas de majuscule au début
- Pas de point final
- Max 50 caractères pour le titre
- Description détaillée si nécessaire (corps du commit)

## 📝 Standards de Code

### TypeScript

```typescript
// ✅ Bon
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return <button onClick={onClick}>{label}</button>;
};

// ❌ Éviter
const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### Naming

- **Composants** : PascalCase (`GameBoard.tsx`)
- **Hooks** : useCamelCase (`useGameState.ts`)
- **Utils** : camelCase (`calculateScore.ts`)
- **Constantes** : UPPER_SNAKE_CASE (`MAX_QUESTIONS`)
- **Types/Interfaces** : PascalCase (`GameSession`)

### Structure de Fichier

```typescript
// 1. Imports externes
import { FC, useState } from 'react';

// 2. Imports internes
import { useGameState } from '@/hooks';
import { Button } from '@/components/ui';

// 3. Imports styles
import styles from './ComponentName.module.css';

// 4. Types
interface ComponentProps {
  // ...
}

// 5. Constantes locales
const MAX_ATTEMPTS = 3;

// 6. Composant
export const ComponentName: FC<ComponentProps> = (props) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleAction = () => {
    // ...
  };
  
  // Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
};
```

## 🧪 Tests

### Structure

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('should handle user interaction', () => {
    const handleClick = vi.fn();
    render(<ComponentName onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Bonnes Pratiques

- Un fichier de test par composant/hook
- Tester le comportement, pas l'implémentation
- Utiliser `screen` pour queries
- Mocker les dépendances externes
- Coverage > 70% pour nouveau code

## 🎨 Styles

### CSS Modules

```css
/* ComponentName.module.css */
.container {
  padding: var(--spacing-4);
  background: var(--color-background);
}

.title {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
}

/* Responsive */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}
```

### Design Tokens

Utiliser les variables CSS définies dans `styles/variables.css`:

- Couleurs : `var(--color-*)`
- Espacements : `var(--spacing-*)`
- Typographie : `var(--font-size-*)`, `var(--font-weight-*)`
- Breakpoints : `var(--breakpoint-*)`

## ♿ Accessibilité

### Checklist

- [ ] HTML sémantique (`<button>`, `<nav>`, etc.)
- [ ] Labels sur tous les inputs
- [ ] `alt` sur toutes les images
- [ ] Contraste suffisant (ratio 4.5:1 minimum)
- [ ] Navigation clavier fonctionnelle
- [ ] États focus visibles
- [ ] ARIA attributes si nécessaire
- [ ] Tester avec lecteur d'écran

### Exemples

```tsx
// ✅ Bon
<button aria-label="Fermer la modale" onClick={onClose}>
  <Icon name="close" aria-hidden="true" />
</button>

<img src="avatar.png" alt="Avatar de l'utilisateur" />

// ❌ Éviter
<div onClick={onClose}>X</div>
<img src="avatar.png" />
```

## 📱 Mobile First

### Approche

1. Designer pour mobile (320px+)
2. Ajouter breakpoints pour tablettes/desktop
3. Tester sur vrais devices

### Breakpoints

```css
/* Mobile first */
.element {
  font-size: 16px;
}

/* Tablette */
@media (min-width: 768px) {
  .element {
    font-size: 18px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .element {
    font-size: 20px;
  }
}
```

### Touch Targets

Minimum 44x44px pour les éléments cliquables (boutons, liens).

## 🔍 Code Review

### Checklist Revieweur

- [ ] Code suit les conventions (.cursorrules)
- [ ] Types TypeScript corrects
- [ ] Tests passent
- [ ] Pas de régression
- [ ] Accessible
- [ ] Responsive
- [ ] Performance OK
- [ ] Sécurité OK
- [ ] Documentation à jour

### Checklist Auteur

Avant de demander une review :

- [ ] Linter passe (`npm run lint`)
- [ ] Tests passent (`npm run test`)
- [ ] Build passe (`npm run build`)
- [ ] Auto-review du code
- [ ] Commits bien nommés
- [ ] PR description claire

## 🐛 Reporting de Bugs

### Template Issue

```markdown
## Description
[Description claire du bug]

## Steps to Reproduce
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Expected Behavior
[Ce qui devrait se passer]

## Actual Behavior
[Ce qui se passe réellement]

## Screenshots
[Si applicable]

## Environment
- OS: [e.g. iOS 15]
- Browser: [e.g. Safari 15]
- Version: [e.g. 1.2.0]

## Additional Context
[Autre information utile]
```

## 💡 Feature Requests

### Template

```markdown
## Feature Description
[Description claire de la feature]

## Problem it Solves
[Quel problème cette feature résout]

## Proposed Solution
[Comment l'implémenter]

## Alternatives Considered
[Autres solutions envisagées]

## Additional Context
[Maquettes, exemples, etc.]
```

## 📚 Documentation

### JSDoc

```typescript
/**
 * Génère une question de multiplication aléatoire
 * @param tables - Numéros des tables à utiliser (ex: [2, 3, 5])
 * @param difficulty - Niveau de difficulté
 * @returns Question avec opérandes et réponse correcte
 * @example
 * const question = generateQuestion([2, 3], 'easy');
 * // { operand1: 2, operand2: 3, correctAnswer: 6 }
 */
export const generateQuestion = (
  tables: number[],
  difficulty: Difficulty
): Question => {
  // ...
};
```

### README

Mettre à jour le README si :
- Nouvelles dépendances
- Nouvelles commandes
- Changement de setup
- Nouvelles features majeures

## 🚀 Déploiement

### Checklist Pre-Deploy

- [ ] Tests passent
- [ ] Build passe
- [ ] Lighthouse > 90
- [ ] Pas de console.log/errors
- [ ] Version bumped (package.json)
- [ ] CHANGELOG mis à jour
- [ ] Documentation à jour

### Process

1. Merge develop → main
2. Tag version (`v1.2.0`)
3. Build production
4. Deploy
5. Smoke tests en prod
6. Announce 🎉

## 🤝 Communication

### Où poser des questions ?

- Issues GitHub : bugs et features
- Discussions : questions générales
- Code reviews : questions sur PR spécifique

### Ton

- Respectueux et constructif
- Focus sur le code, pas les personnes
- Proposer des solutions
- Être pédagogue

## 📖 Ressources

- [Documentation React](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)

## 🎓 Learning Resources

- [React Patterns](https://reactpatterns.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [CSS Tricks](https://css-tricks.com/)

---

**Merci de contribuer à App Maths ! 🙏**

Questions ? Ouvrez une discussion ou contactez les mainteneurs.
