# Changelog - App Maths

Toutes les modifications notables du projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [0.8.0] - 2026-01-27

### Fixed
- **Badges** : correction du calcul du badge **Éclair** (mesure réelle de `timeToAnswer` au lieu de considérer `undefined` comme 0)
- **Badges** : le badge **Tireur d'Élite** requiert désormais réellement **50 questions** (et non “jusqu’à 50”)
- **Badges** : correction du check **Sans Faute** (lecture de `hasPerfectGame` depuis `statistics`)

### Technical
- `Timer` expose le `timeRemaining` via un callback pour permettre de calculer un bonus temps cohérent

---

## [0.7.0] - 2026-01-26 🚀 VERSION MAJEURE

### 🎉 Résumé de la Version
Cette version majeure apporte trois fonctionnalités majeures qui transforment l'application en une expérience d'apprentissage complète et motivante :
- **Animations aléatoires** : interface dynamique et engageante
- **Statistiques par table** : suivi intelligent des progrès avec 3 niveaux de maîtrise
- **Système de badges** : 22 badges pour récompenser et motiver l'apprentissage

---

## [0.7.0] - 2026-01-26

### 🏆 Système de Badges Complet

#### Added
- **Débloquage automatique** : vérification des badges à chaque fin de partie
- **22 badges** : maîtrise (9), combo (3), vitesse (1), précision (2), assiduité (3), spéciaux (2)
- **Popup animé** : affichage des nouveaux badges pendant le jeu avec animation
- **Tracking avancé** : réponses rapides (<2s), historique 50 dernières questions, parties parfaites
- **Badges de maîtrise** : 90%+ de réussite avec minimum 20 questions par table
- **Badge "Maître Absolu"** : déblocage quand toutes les tables (2-10) sont maîtrisées

#### Changed
- **Statistics** : ajout fastAnswersCount, last50Questions, hasPerfectGame, last50Accuracy
- **GameContext** : calcul et débloquage des badges automatique
- **GamePage** : affichage popup badges avant de continuer

#### Technical
- Fonction `checkUnlockedBadges()` : vérifie tous les badges selon critères
- Fonctions de vérification par type : master_table, combo, speed, accuracy, games_played, score
- Composant `BadgeUnlockPopup` : popup avec animations (bounce, scaleIn, badgeUnlock)
- Tracking précis : historique glissant des 50 dernières questions pour badge "Tireur d'élite"
- Badge "Éclair" : 10 réponses <2s au total (toutes parties confondues)

#### Badge Criteria
- **Maîtrise table** : 90%+ précision + 20 questions minimum
- **Combo** : 5, 10 ou 20 bonnes réponses d'affilée
- **Vitesse** : 10 réponses <2s (total)
- **Précision** : partie parfaite (100%) ou 95%+ sur 50 questions
- **Assiduité** : 1, 10 ou 50 parties jouées
- **Spéciaux** : toutes tables maîtrisées ou 1000 points

#### Files Added
- `src/utils/badgeUtils.ts` : logique de vérification des badges
- `src/components/game/BadgeUnlockPopup.tsx` : composant popup
- `src/components/game/BadgeUnlockPopup.module.css` : styles popup

#### Files Modified
- `src/types/index.ts` : extension Statistics avec tracking badges
- `src/context/AppContext.tsx` : initialisation nouveaux champs stats
- `src/context/GameContext.tsx` : calcul et débloquage badges
- `src/pages/GamePage.tsx` : affichage popup badges

---

## [0.6.0] - 2026-01-26

### 📊 Statistiques par Table de Multiplication

#### Added
- **Suivi détaillé par table** : système complet de statistiques pour chaque table (2-10)
- **Niveaux de maîtrise** : 3 niveaux automatiques (Débutant ⚠️, En progression 📈, Très fort 🌟)
- **Calcul intelligent** : combine taux de réussite, temps moyen et erreurs consécutives
- **Affichage visuel** : section "Mes tables" dans SettingsPage avec stats détaillées
- **Badges visuels** : émojis sur les boutons de tables pour identifier rapidement le niveau
- **Mise en avant lacunes** : bordure rouge sur tables à réviser (<50% réussite)
- **Tests unitaires** : 11 tests pour garantir fiabilité du système

#### Changed
- **SettingsPage** : ajout section statistiques avec niveau, précision et nombre de questions par table
- **GameContext** : calcul automatique des stats à la fin de chaque partie
- **Types** : extension TableStatistics avec consecutiveErrors, maxConsecutiveErrors et level

#### Technical
- Fonction `calculateTableLevel()` : détermine niveau basé sur accuracy (>80%), temps (<5s) et erreurs (<2)
- Fonction `updateTableStats()` : met à jour stats d'une table question par question
- Fonction `processSessionTableStats()` : traite toutes les questions d'une session
- Fonction `getTableLevelInfo()` : retourne label, emoji, couleur et description par niveau
- Persistance automatique dans localStorage via AppContext
- Tests complets (11 tests passants)

#### Critères de Niveau
- **Débutant** : <50% réussite OU temps >8s OU >3 erreurs consécutives
- **En progression** : 50-80% réussite ET temps 5-8s
- **Très fort** : >80% réussite ET temps <5s ET <2 erreurs max consécutives

#### Files Added
- `src/utils/tableStatsUtils.ts` : utilitaires de calcul des stats par table
- `src/utils/tableStatsUtils.test.ts` : tests unitaires

#### Files Modified
- `src/types/index.ts` : extension TableStatistics et ajout TableLevel
- `src/context/GameContext.tsx` : calcul stats par table dans endGame()
- `src/pages/SettingsPage.tsx` : affichage stats et badges visuels
- `src/pages/SettingsPage.module.css` : styles pour stats et badges

---

## [0.5.0] - 2026-01-26

### ✨ Animations CSS Aléatoires

#### Added
- **Système d'animations aléatoires** : nouveau système pour rendre les animations plus dynamiques et imprévisibles
- **Utilitaire animationUtils.ts** : bibliothèque complète de fonctions pour générer des animations aléatoires
- **Nouvelles animations CSS** : randomWiggle, randomBounce, randomPulseGlow, chaoticFloat
- **Variables CSS personnalisées** : support des variables CSS pour contrôler les animations de manière aléatoire
- **Particules flottantes** : ajout de particules animées en arrière-plan de NewHomePage
- **Tests unitaires** : 30 tests pour garantir le bon fonctionnement des utilitaires
- **Documentation** : guide complet RANDOM-ANIMATIONS.md avec exemples et bonnes pratiques

#### Changed
- **GameEndScreen** : utilisation de randomConfettiStyle() pour des confettis plus variés
- **BadgesPage** : animations d'apparition décalées avec randomPopInStyle()
- **ScoreDisplay** : animations de combo dynamiques avec effets de lueur et de mouvement aléatoires
- **NewHomePage** : ajout de 20 particules flottantes avec mouvement chaotique
- **animations.css** : amélioration des keyframes pour supporter les variables CSS aléatoires

#### Technical
- Fonctions utilitaires : randomDuration, randomDelay, randomRotation, randomScale, randomX, randomY, randomChoice
- Générateurs de styles : randomConfettiStyle, randomFloatStyle, randomBounceStyle, randomFadeInStyle, randomPopInStyle, randomSparkleStyle, randomParticleStyle
- Générateurs de variables CSS : randomWiggleVars, randomBounceVars, randomGlowVars, randomChaoticFloatVars, randomParticleVars
- Helper : generateRandomElements pour créer facilement des collections d'éléments animés
- Performance : utilisation de transform et opacity pour accélération GPU
- Tests : coverage complet avec vitest (30 tests passants)

#### Files Added
- `src/utils/animationUtils.ts` : utilitaires d'animation aléatoire
- `src/utils/animationUtils.test.ts` : tests unitaires
- `docs/RANDOM-ANIMATIONS.md` : documentation complète

#### Files Modified
- `src/styles/animations.css` : nouvelles animations avec support des variables CSS
- `src/features/game/components/GameEndScreen.tsx` : confettis avec animations aléatoires
- `src/pages/BadgesPage.tsx` : apparition décalée des badges
- `src/pages/NewHomePage.tsx` : particules d'arrière-plan
- `src/pages/NewHomePage.module.css` : styles pour particules
- `src/features/game/components/ScoreDisplay.tsx` : animations dynamiques du combo
- `src/features/game/components/ScoreDisplay.module.css` : support des nouvelles animations

---

## [0.4.1] - 2026-01-26

### 🎯 Optimisation Mobile

#### Changed
- **Écran d'accueil** : réduction de 40% de la taille des cartes KPI pour éviter le scroll
- **Espacements** : réduction des gaps et paddings sur mobile (spacing-6 → spacing-3)
- **Typographie** : tailles de police réduites sur mobile (optimisation lisibilité)
- **GamePage** : espacements réduits pour tenir sans scroll sur petits écrans
- **Scroll horizontal** : interdit sur toutes les pages (overflow-x: hidden)

#### Technical
- KPI cards : padding réduit, icônes plus petites (4xl → 2xl)
- HomePage : gaps réduits (spacing-6 → spacing-3)
- GamePage : padding réduit (spacing-6 → spacing-3)
- Toutes les pages : overflow-x: hidden pour empêcher scroll horizontal
- Responsive : tailles agrandies sur desktop (≥640px)

---

## [0.4.0] - 2026-01-26

### 🎨 Refonte Navigation & Structure

#### Added
- **SplashScreen** avec animation CSS (2×8=16) de 4 secondes au démarrage
- **Nouvelle HomePage** avec KPI de progression (taux réussite, parties jouées, tables maîtrisées)
- **Menu Bottom Sheet** moderne accessible depuis la HomePage
- **StatsPage** détaillée avec performance globale et stats par table
- **BadgesPage** affichant tous les badges débloqués/verrouillés
- **SettingsPage** dédiée au paramétrage de partie (tables, temps)
- **Version automatique** affichée en bas du menu (depuis package.json via .env)
- Composant `BottomSheet` réutilisable pour modales modernes
- Composant `AppMenu` avec navigation complète
- Composant `ProgressKPI` pour affichage des statistiques clés

#### Changed
- **Flow de navigation** : SplashScreen → HomePage → SettingsPage → GamePage
- HomePage originale renommée et adaptée en SettingsPage
- Séparation claire : accueil (overview) vs paramétrage (configuration)
- Menu accessible via icône hamburger sur HomePage

#### Technical
- Animation CSS pure (pas de dépendance externe)
- Routing étendu (/, /home, /settings, /game, /stats, /badges)
- Déclaration TypeScript pour imports JSON
- Variable d'environnement VITE_APP_VERSION
- Build ultra-optimisé : 40KB JS + 49KB CSS (gzip: 12KB + 8KB)

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
