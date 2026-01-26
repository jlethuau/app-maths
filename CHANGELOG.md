# Changelog - App Maths

Toutes les modifications notables du projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [0.3.0] - 2026-01-26

### 🎮 UI - Clavier Numérique Intégré

#### Added
- Clavier numérique intégré à l'écran de jeu (0–9, Effacer, Valider)
- Feedback sonore léger au tap (respecte `soundEnabled`)
- Affichage dynamique de la réponse saisie dans la carte de question (remplace le "?")

#### Changed
- Champ de réponse séparé masqué (valeur affichée directement dans le calcul)
- Saisie centralisée via le clavier intégré pour limiter les mouvements d'écran

---

## [0.2.1] - 2026-01-20

### 🐛 Corrections Critiques - Application Stable

#### Fixed
- **BUG CRITIQUE** : Compteurs (score, combo, meilleure série) qui redescendaient à 0 à chaque nouvelle question
  - Cause : Closures React - les callbacks utilisaient des versions obsolètes de l'état `session`
  - Solution : Utilisation de `setSession(currentSession => ...)` au lieu de `setSession({ ...session })`
  - Impact : `answerQuestion` et `nextQuestion` utilisent maintenant la forme fonctionnelle
  
- **BUG CRITIQUE** : Écran de fin de partie affichant tous les compteurs à 0
  - Cause : Même problème de closure + timing incorrect de `endGame()`
  - Solution : Détection explicite de la dernière question dans `handleAnswer` avec gestion correcte du timing
  
- **BUG** : Warning React "Cannot update component while rendering different component"
  - Cause : Timer appelait `onTimeUp()` de manière synchrone dans `setTimeRemaining()`, modifiant l'état de GamePage pendant le render de Timer
  - Solution : Appel asynchrone avec `setTimeout(() => onTimeUp(), 0)` + `useRef` pour éviter appels multiples
  
#### Changed
- **GameContext.answerQuestion** : Refactorisé pour utiliser `setSession` avec fonction de mise à jour
- **GameContext.nextQuestion** : Refactorisé pour utiliser `setSession` avec fonction de mise à jour
- **Timer.onTimeUp** : Appel différé pour respecter les règles de React
- **GamePage.handleAnswer** : Détection explicite si dernière question avant appel de `endGame()`

#### Technical
- TypeScript : 0 erreur ✅
- ESLint : 0 warning ✅
- Tests manuels : Validés par l'utilisateur ✅
- Stabilité : Production-ready ✅

---

## [0.2.0] - 2026-01-20

### 🎮 Sprint 1 - Core Game MVP COMPLET

#### Added
- **State Management**
  - AppContext pour gérer la progression utilisateur globale
  - GameContext pour gérer les sessions de jeu
  - Hook useLocalStorage pour la persistance des données

- **Game Logic**
  - Générateur de questions aléatoires (`generateQuestion`)
  - Système de scoring avec combos x2/x3/x4 (`calculateScore`)
  - Validateur de réponses (`validateAnswer`)
  - Utilitaires de jeu (formatTime, calculateAccuracy, etc.)

- **Composants de Jeu**
  - QuestionCard : affichage de la question de multiplication
  - AnswerInput : champ de saisie numérique avec auto-focus
  - Timer : chronomètre dégressif avec barre de progression
  - ScoreDisplay : affichage score + combo + meilleur combo

- **Pages**
  - HomePage : sélection des tables et paramètres de jeu
  - GamePage : interface de jeu complète avec feedback

- **Features**
  - Système de combo (2+ réponses = x2, 3+ = x3, 4+ = x4)
  - Bonus de temps (réponse rapide = plus de points)
  - Feedback visuel animé (correct ✓ / incorrect ✗)
  - Persistance automatique dans LocalStorage
  - Statistiques de base (parties jouées, précision, meilleur combo)
  - Navigation React Router

- **UX/UI**
  - Sélection multi-tables (1-10)
  - Choix du temps par question (5s, 10s, 15s, Infini)
  - Timer reset automatique à chaque question
  - Écran de fin de partie animé avec option "Rejouer"
  - Styles focus/selected optimisés pour boutons de paramétrage
  - Animations fluides (slide, bounce, shake, pulse, confetti)
  - Thème sombre avec dégradés violet/rose
  - Design mobile-first responsive
  - Accessibilité (ARIA, navigation clavier)

#### Technical
- TypeScript strict mode : 0 erreur
- ESLint : 0 warning
- 19 fichiers créés (~1989 lignes)
- Architecture modulaire par feature
- Code splitting automatique avec Vite

---

## [0.1.0] - 2026-01-20

### 🔧 Sprint 0 - Configuration Initiale

#### Added
- **Documentation Complète**
  - .cursorrules : conventions React/Vite/TypeScript
  - docs/BMAD.md : méthodologie BMAD complète
  - docs/AI-AGENTS.md : guide des agents IA
  - docs/CONTRIBUTING.md : guide de contribution
  - docs/PROJECT-STATUS.md : suivi du statut
  - README.md : documentation principale

- **Configuration Technique**
  - Vite + React 18 + TypeScript 5
  - ESLint + Prettier
  - Vitest + React Testing Library
  - Path aliases (@/components, @/features, etc.)
  - Git avec branche develop

- **Design System Complet**
  - Variables CSS (couleurs, typographie, espacements)
  - Thème sombre inspiré WinSphere
  - Animations CSS (bounce, pulse, shake, glow, etc.)
  - Background animé avec particules
  - Système responsive mobile-first

- **Composants UI de Base**
  - Button : 5 variants, 3 tailles
  - Card : 3 variants (default, glass, gradient)
  - Container : responsive avec max-width

- **Types & Constantes**
  - Types TypeScript complets (UserProgress, GameSession, Question, etc.)
  - Constantes de jeu (scoring, combos, tables)
  - Définitions de 18 badges

#### Technical
- 33 fichiers initiaux créés (~11,000 lignes)
- TypeScript strict mode configuré
- ESLint + Prettier opérationnels
- Git initialisé avec gitflow

---

## Format

Les types de changements utilisés :
- `Added` : Nouvelles fonctionnalités
- `Changed` : Modifications de fonctionnalités existantes
- `Deprecated` : Fonctionnalités dépréciées (à supprimer)
- `Removed` : Fonctionnalités supprimées
- `Fixed` : Corrections de bugs
- `Security` : Correctifs de sécurité
- `Technical` : Changements techniques (refactoring, optimisation, etc.)
