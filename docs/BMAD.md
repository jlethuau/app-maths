# BMAD - App Maths Multiplication

Méthodologie BMAD (Brief, Modeling, Architecture, Development) pour structurer le développement avec assistance IA.

---

## 📋 B - BRIEF

### Objectif Principal
Créer une application web mobile-first pour aider un enfant de CE2 à apprendre et réviser ses tables de multiplication de manière ludique et motivante.

### Utilisateur Cible
- **Âge** : 8-9 ans (CE2)
- **Contexte** : Apprentissage à la maison ou à l'école
- **Niveau** : Découverte et révision des tables de multiplication (1 à 10)

### Objectifs Pédagogiques
1. Mémoriser les tables de multiplication
2. Améliorer la rapidité de calcul mental
3. Développer la confiance en mathématiques
4. Rendre l'apprentissage amusant et engageant

### Contraintes Techniques
- **Mobile-first** : conception prioritaire pour smartphone/tablette
- **Stack** : React + Vite + TypeScript
- **Performance** : application rapide et réactive
- **Pas de backend** : phase 1 avec LocalStorage uniquement

### Contraintes UX
- Interface simple et intuitive
- Feedback immédiat
- Animations encourageantes
- Pas de frustration excessive
- Accessibilité (lecture facilitée)
- **Design** : Thème sombre uniquement
- **Style** : Ludique cartoon mais qualitatif (référence : WinSphere)
- **Couleurs** : Palette violet/rose/bleu avec accents dorés/jaunes

### Fonctionnalités Essentielles (MVP)

#### 🎮 Core - Jeu de Multiplication (Quiz Chronométré)
- [ ] Sélection des tables à réviser (1-10)
- [ ] Quiz avec questions aléatoires
- [ ] Chronomètre par question (temps paramétrable)
- [ ] Validation des réponses
- [ ] Feedback immédiat (correct/incorrect)
- [ ] Compteur de score avec système de combo (x2, x3, x4)
- [ ] Mode entraînement libre (sans chronomètre)

#### 🏆 Gamification
- [ ] Système de points/étoiles après chaque bonne réponse
- [ ] Système de combo (enchaînements x2, x3, x4 multiplient les points)
- [ ] Badges/trophées à débloquer (ex: "Expert table de 7", "10 réponses d'affilée")
- [ ] Progression visuelle par table
- [ ] Écran dédié pour visualiser les progrès
- [ ] Animations de récompense engageantes
- [ ] Déblocage progressif des tables (2→3→4...)

#### 📊 Suivi de Progression
- [ ] Statistiques par table
- [ ] Historique des sessions
- [ ] Taux de réussite
- [ ] Points faibles identifiés
- [ ] Écran de progression avec visualisation

#### 🎯 Défis Quotidiens
- [ ] Mission quotidienne
- [ ] Bonus de points si mission réussie
- [ ] Notification/badge de défi disponible

#### ⚙️ Paramètres
- [ ] Temps de réponse ajustable (pour gagner plus ou moins vite des points)
- [ ] Mode entraînement vs mode chronomètre
- [ ] Activer/désactiver sons
- [ ] Réinitialiser progression

### Fonctionnalités Futures (Phase 2+)
- Autres types de jeux (calculs à trous, QCM visuels, etc.)
- Mode multijoueur local
- Avatar personnalisable
- Backend avec authentification (synchronisation multi-devices)
- Statistiques avancées pour parents/enseignants
- Mode hors ligne (PWA)
- Leaderboard familial

---

## 🎨 M - MODELING

### Modèles de Données

#### User Progress
```typescript
interface UserProgress {
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

interface DailyChallenge {
  id: string;
  date: Date;
  description: string;
  targetTable: number;
  targetScore: number;
  completed: boolean;
  bonusPoints: number;
}
```

#### Game Session
```typescript
interface GameSession {
  id: string;
  mode: 'training' | 'timed' | 'challenge' | 'daily';
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
```

#### Question
```typescript
interface Question {
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
```

#### Statistics
```typescript
interface Statistics {
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageAccuracy: number; // pourcentage
  fastestTime: number; // en secondes
  
  // Par table de multiplication
  tableStats: {
    [key: number]: TableStatistics; // key = 1 à 10
  };
}

interface TableStatistics {
  tableNumber: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  averageTime: number;
  lastPracticed: Date;
  mastered: boolean; // > 90% de réussite sur 20+ questions
}
```

#### Badge
```typescript
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number; // 0-100 pour badges progressifs
  requirement: BadgeRequirement;
}

interface BadgeRequirement {
  type: 'score' | 'accuracy' | 'streak' | 'speed' | 'master_table';
  value: number;
  tableNumber?: number;
}
```

#### User Settings
```typescript
interface UserSettings {
  soundEnabled: boolean;
  timePerQuestion: number; // Temps par question en secondes (paramétrable : 5, 10, 15, 30)
  animationsEnabled: boolean;
  // Note: theme est toujours 'dark' pour le MVP
}
```

### État de l'Application

#### Global State (Context)
- `userProgress`: UserProgress
- `currentSession`: GameSession | null
- `settings`: UserSettings

#### Local Component State
- État UI (modales, animations, transitions)
- État de formulaire temporaire
- État de chargement

### Flux de Données

```
[LocalStorage] <-> [AppContext] <-> [Features] <-> [Components]
                        ↓
                   [Custom Hooks]
```

---

## 🏗️ A - ARCHITECTURE

### Structure du Projet

```
app-maths/
├── docs/                      # Documentation
│   ├── BMAD.md
│   ├── CONTRIBUTING.md
│   └── DEPLOYMENT.md
├── public/                    # Assets statiques
│   ├── sounds/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── main.tsx              # Point d'entrée
│   ├── App.tsx               # Composant racine
│   ├── vite-env.d.ts
│   │
│   ├── features/             # Fonctionnalités isolées
│   │   ├── game/
│   │   │   ├── components/
│   │   │   │   ├── GameBoard.tsx
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   ├── AnswerInput.tsx
│   │   │   │   └── ScoreDisplay.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGameSession.ts
│   │   │   │   └── useQuestionGenerator.ts
│   │   │   ├── utils/
│   │   │   │   ├── generateQuestion.ts
│   │   │   │   └── calculateScore.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── gamification/
│   │   │   ├── components/
│   │   │   │   ├── BadgeDisplay.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── RewardAnimation.tsx
│   │   │   │   └── LevelIndicator.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useBadges.ts
│   │   │   │   └── useRewards.ts
│   │   │   ├── data/
│   │   │   │   └── badges.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── stats/
│   │   │   ├── components/
│   │   │   │   ├── StatsOverview.tsx
│   │   │   │   ├── TableBreakdown.tsx
│   │   │   │   └── ProgressChart.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useStatistics.ts
│   │   │   └── types.ts
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       │   ├── SettingsPanel.tsx
│   │       │   └── TableSelector.tsx
│   │       └── hooks/
│   │           └── useSettings.ts
│   │
│   ├── components/           # Composants réutilisables
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Icon.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Container.tsx
│   │
│   ├── context/              # Context API
│   │   ├── AppContext.tsx
│   │   └── GameContext.tsx
│   │
│   ├── hooks/                # Custom hooks globaux
│   │   ├── useLocalStorage.ts
│   │   ├── useSound.ts
│   │   └── useAnimation.ts
│   │
│   ├── utils/                # Utilitaires globaux
│   │   ├── storage.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   │
│   ├── types/                # Types TypeScript globaux
│   │   ├── index.ts
│   │   └── common.ts
│   │
│   ├── constants/            # Constantes
│   │   ├── game.ts
│   │   ├── badges.ts
│   │   └── theme.ts
│   │
│   ├── styles/               # Styles globaux
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   │
│   └── routes/               # Routes (si React Router)
│       ├── index.tsx
│       ├── Home.tsx
│       ├── Game.tsx
│       ├── Stats.tsx
│       └── Settings.tsx
│
├── tests/                    # Tests
│   ├── setup.ts
│   └── utils/
│
├── .cursorrules
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Architecture des Composants

#### Hiérarchie React
```
App
├── AppProvider (Context)
│   ├── Router
│   │   ├── HomePage
│   │   │   ├── Header
│   │   │   ├── WelcomeSection
│   │   │   ├── QuickStats
│   │   │   └── ActionButtons
│   │   │
│   │   ├── GamePage
│   │   │   ├── Header
│   │   │   ├── GameBoard
│   │   │   │   ├── QuestionCard
│   │   │   │   ├── AnswerInput
│   │   │   │   ├── ScoreDisplay
│   │   │   │   └── ProgressBar
│   │   │   └── RewardAnimation (conditional)
│   │   │
│   │   ├── StatsPage
│   │   │   ├── Header
│   │   │   ├── StatsOverview
│   │   │   ├── TableBreakdown
│   │   │   └── BadgeCollection
│   │   │
│   │   └── SettingsPage
│   │       ├── Header
│   │       └── SettingsPanel
│   │           ├── TableSelector
│   │           ├── DifficultySelector
│   │           └── PreferencesForm
```

### Patterns et Principes

#### Composition > Inheritance
```typescript
// ✅ Bon : Composition
<Card>
  <CardHeader title="Score" />
  <CardContent>{score}</CardContent>
</Card>

// ❌ Éviter : Héritage complexe
class ScoreCard extends Card { ... }
```

#### Container/Presentational Pattern
```typescript
// Container : Logique
const GameContainer = () => {
  const { session, answer, nextQuestion } = useGameSession();
  return <GamePresentation session={session} onAnswer={answer} />;
};

// Presentational : UI pure
const GamePresentation = ({ session, onAnswer }) => {
  return <div>...</div>;
};
```

#### Custom Hooks pour Logique Réutilisable
```typescript
// Hook métier
const useGameSession = (tables: number[]) => {
  // Logique de session
  return { session, startGame, answer, nextQuestion };
};

// Hook technique
const useLocalStorage = <T>(key: string, initial: T) => {
  // Logique de stockage
  return [value, setValue];
};
```

### Gestion de l'État

#### LocalStorage Strategy
```typescript
// Clés de stockage
const STORAGE_KEYS = {
  USER_PROGRESS: 'app-maths:user-progress',
  SETTINGS: 'app-maths:settings',
  STATS: 'app-maths:statistics',
};

// Synchronisation automatique
useEffect(() => {
  localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
}, [progress]);
```

#### Context Structure
```typescript
// AppContext : État global
const AppContext = createContext({
  progress: UserProgress,
  settings: UserSettings,
  updateProgress: (progress: Partial<UserProgress>) => void,
  updateSettings: (settings: Partial<UserSettings>) => void,
});

// GameContext : État de session (local à la feature)
const GameContext = createContext({
  session: GameSession | null,
  startGame: (config: GameConfig) => void,
  endGame: () => void,
});
```

### Routing

```typescript
// Routes principales
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/game', element: <GamePage /> },
  { path: '/stats', element: <StatsPage /> },
  { path: '/settings', element: <SettingsPage /> },
];
```

### Performance Strategy

1. **Code Splitting**
   - Lazy loading des routes
   - Vite le gère automatiquement

2. **Memoization**
   - React.memo pour composants purs
   - useMemo pour calculs coûteux
   - useCallback pour fonctions passées en props

3. **Optimisation Images**
   - WebP avec fallback
   - Lazy loading
   - Responsive images

---

## 🚀 D - DEVELOPMENT

### Méthodologie de Développement

#### Approche Itérative
1. **Sprint 0** : Setup & Foundation
2. **Sprint 1** : MVP - Core Game
3. **Sprint 2** : Gamification
4. **Sprint 3** : Statistics & Polish
5. **Sprint 4** : Testing & Optimization

#### Développement par Feature
Chaque feature suit le cycle :
1. Définir types TypeScript
2. Créer composants UI (statiques)
3. Ajouter logique (hooks)
4. Connecter au state global
5. Tester
6. Documenter

### Phase 1 : Setup (Sprint 0)

**Objectif** : Environnement de dev prêt

#### Tâches
- [x] Créer `.cursorrules`
- [x] Créer documentation BMAD
- [ ] Initialiser projet Vite + React + TypeScript
- [ ] Configurer ESLint + Prettier
- [ ] Initialiser Git avec gitflow
- [ ] Créer structure de dossiers
- [ ] Configurer vite.config.ts
- [ ] Créer README.md
- [ ] Définir variables CSS (design tokens)
- [ ] Créer composants UI de base

#### Agents IA Utilisables
- **Agent Setup** : Configuration initiale
- **Agent Review** : Vérification des configs

### Phase 2 : MVP - Core Game (Sprint 1)

**Objectif** : Jeu fonctionnel de base

#### Tâches
- [ ] Définir types pour Game & Question
- [ ] Créer générateur de questions
- [ ] Implémenter GameBoard
- [ ] Créer système de validation
- [ ] Ajouter feedback visuel (correct/incorrect)
- [ ] Implémenter compteur de score
- [ ] Ajouter sélection des tables
- [ ] Tester logique de jeu

#### Agents IA Utilisables
- **Agent Dev** : Développement features
- **Agent Test** : Génération tests unitaires
- **Agent UX** : Feedback sur interface

### Phase 3 : Gamification (Sprint 2)

**Objectif** : Système de récompenses engageant

#### Tâches
- [ ] Définir système de points
- [ ] Créer badges (définitions)
- [ ] Implémenter logique de déblocage
- [ ] Créer animations de récompense
- [ ] Ajouter système de niveaux
- [ ] Implémenter barre de progression
- [ ] Tester système de gamification

#### Agents IA Utilisables
- **Agent Animation** : Créer animations CSS
- **Agent Design** : Suggestions de badges

### Phase 4 : Statistics (Sprint 3)

**Objectif** : Suivi de progression complet

#### Tâches
- [ ] Définir types Statistics
- [ ] Implémenter calculs de stats
- [ ] Créer composants de visualisation
- [ ] Ajouter graphiques (optionnel)
- [ ] Implémenter persistance
- [ ] Créer page Stats
- [ ] Tester calculs

#### Agents IA Utilisables
- **Agent Data** : Logique de calcul
- **Agent Viz** : Composants de visualisation

### Phase 5 : Polish & Testing (Sprint 4)

**Objectif** : Application production-ready

#### Tâches
- [ ] Audit accessibilité
- [ ] Optimisation performance
- [ ] Tests E2E
- [ ] Responsive testing (devices réels)
- [ ] Documentation utilisateur
- [ ] Déploiement
- [ ] Feedback utilisateur (fille !)

#### Agents IA Utilisables
- **Agent QA** : Détection bugs
- **Agent Perf** : Optimisations
- **Agent Docs** : Documentation

### Agents IA Spécialisés

#### 1. Agent Setup
**Rôle** : Configuration initiale du projet
**Tâches** :
- Initialiser Vite + React + TS
- Configurer linters
- Setup Git
- Créer structure

#### 2. Agent Dev
**Rôle** : Développement de features
**Tâches** :
- Implémenter composants
- Créer hooks
- Logique métier

#### 3. Agent Test
**Rôle** : Tests automatisés
**Tâches** :
- Générer tests unitaires
- Tests composants
- Coverage

#### 4. Agent UX
**Rôle** : Expérience utilisateur
**Tâches** :
- Review UI/UX
- Suggestions accessibilité
- Feedback responsive

#### 5. Agent Review
**Rôle** : Code review
**Tâches** :
- Review code quality
- Détecter anti-patterns
- Suggestions refactoring

#### 6. Agent Docs
**Rôle** : Documentation
**Tâches** :
- Générer docs
- JSDoc
- README

### Workflow avec IA

#### Commande Type
```
@Agent_Dev Implémente le composant QuestionCard selon les specs du BMAD.
Suis les conventions .cursorrules et utilise TypeScript strict.
```

#### Review Systématique
```
@Agent_Review Vérifie ce composant pour:
- Respect des conventions
- Accessibilité
- Performance
- Tests
```

#### Génération Tests
```
@Agent_Test Génère des tests unitaires pour useGameSession hook.
Coverage minimal 80%.
```

### Checklist Quotidienne

#### Avant de coder
- [ ] Lire BMAD pour la feature du jour
- [ ] Vérifier .cursorrules pour conventions
- [ ] Créer branche feature/xxx
- [ ] Définir types TypeScript first

#### Pendant le dev
- [ ] Commits atomiques et descriptifs
- [ ] Tests au fur et à mesure
- [ ] Feedback régulier avec IA
- [ ] Documenter code complexe

#### Après le dev
- [ ] Linter passing
- [ ] Tests passing
- [ ] Review avec Agent_Review
- [ ] Update BMAD si nécessaire
- [ ] Merge dans develop

### Métriques de Qualité

#### Code Quality
- TypeScript strict : ✅ Obligatoire
- ESLint errors : 0
- Test coverage : > 70%
- Bundle size : < 200KB gzipped

#### Performance
- First Contentful Paint : < 1.5s
- Time to Interactive : < 3s
- Lighthouse Performance : > 90

#### UX
- Mobile-friendly : ✅ Obligatoire
- Touch targets : > 44x44px
- Contrast ratio : > 4.5:1
- Navigation clavier : ✅ Fonctionnelle

---

## 📝 Notes et Décisions

### Décisions Techniques

#### Pourquoi Vite ?
- Build ultra-rapide
- HMR instantané
- Config minimale
- Optimisations automatiques

#### Pourquoi pas de Backend MVP ?
- Simplicité phase 1
- Pas de setup serveur
- LocalStorage suffisant
- Migration facile si besoin

#### Pourquoi TypeScript ?
- Type safety
- Autocomplete
- Refactoring facile
- Documentation inline

### Points d'Attention

#### Enfants CE2
- Éviter textes trop longs
- Icônes + texte
- Feedback très visible
- Pas de frustration

#### Mobile First
- Touch-friendly
- Taille de texte lisible
- Pas de hover states critiques
- Orientation portrait prioritaire

---

## 🎯 Prochaines Actions

1. **Répondre aux questions Brief** (attente utilisateur)
2. **Initialiser projet Vite**
3. **Setup Git + gitflow**
4. **Créer structure de base**
5. **Implémenter design system (tokens CSS)**
6. **Développer composants UI de base**
7. **Commencer Sprint 1 : Core Game**

---

**Dernière mise à jour** : {{DATE}}
**Version** : 0.1.0
**Statut** : 🟡 En configuration
