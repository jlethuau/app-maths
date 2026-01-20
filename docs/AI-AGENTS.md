# 🤖 Guide des Agents IA - Développement Assisté

Ce document décrit comment utiliser efficacement l'IA (Cursor) pour développer l'application en suivant la méthodologie BMAD.

---

## 🎯 Philosophie

L'IA est un **partenaire de développement**, pas un simple outil de génération de code. Elle doit :
- Comprendre le contexte du projet
- Respecter les conventions établies
- Proposer des solutions réfléchies
- Documenter ses choix
- Apprendre de vos retours

---

## 🧠 Agents Spécialisés

### Agent Setup 🔧
**Rôle** : Configuration initiale et infrastructure

**Commandes Types**
```
@Agent_Setup Initialise un projet Vite + React + TypeScript avec
les configs ESLint et Prettier selon .cursorrules

@Agent_Setup Configure vite.config.ts avec les alias et optimisations
pour mobile-first

@Agent_Setup Crée la structure de dossiers selon BMAD.md section Architecture
```

**Responsabilités**
- Initialisation projet
- Configuration outils (linters, bundler)
- Setup Git et gitflow
- Structure de dossiers
- Installation dépendances

**Validation**
```bash
npm run dev    # Doit démarrer sans erreur
npm run build  # Doit compiler sans erreur
npm run lint   # Doit passer
```

---

### Agent Dev 💻
**Rôle** : Développement de fonctionnalités

**Commandes Types**
```
@Agent_Dev Implémente le composant GameBoard selon BMAD.md.
Utilise TypeScript strict et CSS Modules.
Context : @docs/BMAD.md @.cursorrules

@Agent_Dev Crée le hook useGameSession qui gère l'état d'une partie.
Voir types dans @src/types/game.ts

@Agent_Dev Développe la feature gamification/badges.
Référence : @docs/BMAD.md section "Phase 3: Gamification"
```

**Responsabilités**
- Implémenter composants React
- Créer custom hooks
- Développer logique métier
- Intégrer avec Context API
- Styling (CSS Modules)

**Bonnes Pratiques**
1. Toujours référencer BMAD.md et .cursorrules
2. Demander confirmation si ambiguïté
3. Proposer alternatives si pertinent
4. Expliquer les choix techniques
5. Suggérer des tests

---

### Agent Test 🧪
**Rôle** : Création et maintenance des tests

**Commandes Types**
```
@Agent_Test Génère des tests unitaires pour @src/utils/calculateScore.ts
Coverage minimal 80%. Utilise Vitest.

@Agent_Test Crée des tests composants pour GameBoard.
Teste : render, interactions clavier, états différents.
Utilise React Testing Library.

@Agent_Test Review le coverage actuel et identifie les gaps.
Propose les tests manquants prioritaires.
```

**Responsabilités**
- Tests unitaires (fonctions, hooks)
- Tests composants (RTL)
- Tests d'intégration
- Fixtures et mocks
- Rapport de coverage

**Standards**
- Coverage > 70% pour nouveau code
- Tests lisibles et maintenables
- Utiliser `describe` / `it` structure
- Mocks minimaux et pertinents

---

### Agent UX 🎨
**Rôle** : Expérience utilisateur et accessibilité

**Commandes Types**
```
@Agent_UX Review l'interface @src/features/game/GameBoard.tsx.
Focus : accessibilité, responsive, UX enfant (CE2).

@Agent_UX Améliore le feedback visuel lors des réponses correctes/incorrectes.
Doit être engageant pour un enfant de 8 ans.

@Agent_UX Audit accessibilité de @src/components/ui/Button.tsx.
Checklist WCAG AA.
```

**Responsabilités**
- Review UX/UI
- Accessibilité (a11y)
- Responsive design
- Animations et transitions
- Feedback utilisateur

**Checklist**
- [ ] HTML sémantique
- [ ] Navigation clavier
- [ ] Contraste couleurs (4.5:1)
- [ ] Touch targets (> 44px)
- [ ] Labels et ARIA
- [ ] Animations subtiles

---

### Agent Review 🔍
**Rôle** : Code review et qualité

**Commandes Types**
```
@Agent_Review Analyse @src/features/game/ pour :
- Respect des conventions .cursorrules
- Anti-patterns React
- Opportunités de refactoring
- Performance issues

@Agent_Review Vérifie la PR feature/game-board.
Focus : types TS, tests, documentation.

@Agent_Review Audit performance de l'app.
Identifie les optimisations possibles.
```

**Responsabilités**
- Code review systématique
- Détection anti-patterns
- Suggestions refactoring
- Audit performance
- Vérification conventions

**Points d'Attention**
- Props drilling excessif
- Re-renders inutiles
- Bundle size
- Accessibilité
- Types TypeScript
- Sécurité

---

### Agent Docs 📚
**Rôle** : Documentation et commentaires

**Commandes Types**
```
@Agent_Docs Génère la JSDoc pour @src/hooks/useGameSession.ts.
Inclure exemples d'utilisation.

@Agent_Docs Update BMAD.md section Development avec le statut actuel.
Marquer les tâches complétées.

@Agent_Docs Crée un README pour @src/features/game/.
Explique l'architecture et l'usage des composants.
```

**Responsabilités**
- JSDoc sur fonctions/hooks complexes
- README par feature si nécessaire
- Mise à jour BMAD.md
- Commentaires explicatifs
- Documentation API

**Standards**
```typescript
/**
 * Génère une question de multiplication aléatoire
 * 
 * @param tables - Numéros des tables à utiliser (1-10)
 * @param difficulty - Niveau de difficulté
 * @returns Question avec opérandes et réponse
 * 
 * @example
 * ```ts
 * const question = generateQuestion([2, 3], 'easy');
 * // { operand1: 2, operand2: 3, correctAnswer: 6 }
 * ```
 */
```

---

### Agent Refactor ♻️
**Rôle** : Amélioration du code existant

**Commandes Types**
```
@Agent_Refactor Le composant GameBoard est trop complexe (350 lignes).
Découpe-le en sous-composants selon .cursorrules.

@Agent_Refactor Extrait la logique métier de @src/features/game/GameBoard.tsx
vers un hook personnalisé useGameLogic.

@Agent_Refactor Optimise les re-renders dans @src/features/game/.
Utilise React.memo et useCallback si pertinent.
```

**Responsabilités**
- Découper composants trop gros
- Extraire logique réutilisable
- Optimiser performance
- Améliorer lisibilité
- Réduire duplication

**Principes**
- Ne pas changer le comportement
- Tests doivent rester verts
- Commits atomiques
- Documenter les changements

---

## 🔄 Workflow Type

### 1. Nouvelle Feature

```bash
# Étape 1 : Setup
@Agent_Setup Crée la structure pour feature/gamification
selon BMAD.md Architecture

# Étape 2 : Définir Types
@Agent_Dev Définis les types TypeScript pour le système de badges
selon BMAD.md Modeling

# Étape 3 : Développer
@Agent_Dev Implémente les composants Badge et BadgeCollection
Context : @types/gamification.ts @.cursorrules

# Étape 4 : Tester
@Agent_Test Génère tests pour @features/gamification/components/Badge.tsx

# Étape 5 : Review UX
@Agent_UX Review l'animation de déblocage de badge.
Doit être engageante pour enfant CE2.

# Étape 6 : Code Review
@Agent_Review Analyse @features/gamification/ avant merge

# Étape 7 : Documenter
@Agent_Docs Update BMAD.md avec feature gamification complétée
```

### 2. Bug Fix

```bash
# Étape 1 : Reproduire
@Agent_Dev Analyse le bug : mauvais calcul score table 7
Context : @src/utils/calculateScore.ts

# Étape 2 : Fixer
@Agent_Dev Corrige le calcul et ajoute validation
Context : @src/utils/calculateScore.ts

# Étape 3 : Tester
@Agent_Test Ajoute test de régression pour bug score table 7

# Étape 4 : Valider
@Agent_Review Vérifie que le fix n'introduit pas d'autres bugs
```

### 3. Refactoring

```bash
# Étape 1 : Identifier
@Agent_Review Identifie les opportunités de refactoring dans @src/features/game

# Étape 2 : Planifier
@Agent_Refactor Propose un plan de refactoring pour GameBoard (350 lignes)

# Étape 3 : Exécuter
@Agent_Refactor Découpe GameBoard en QuestionDisplay et AnswerInput

# Étape 4 : Tester
npm run test  # Tous les tests doivent rester verts

# Étape 5 : Review
@Agent_Review Vérifie que le refactoring améliore la qualité
```

---

## 💡 Bonnes Pratiques

### Contextualisation

**❌ Mauvais**
```
Crée un bouton
```

**✅ Bon**
```
@Agent_Dev Crée un composant Button réutilisable selon @.cursorrules.
Doit supporter variants (primary, secondary), sizes (sm, md, lg),
et être accessible (a11y).
Context : @docs/BMAD.md Design System
```

### Itération

**❌ Mauvais**
```
Fais tout le système de gamification
```

**✅ Bon**
```
@Agent_Dev Implémente d'abord le système de points basique.
Ensuite on ajoutera les badges.
Phase par phase selon BMAD.md Sprint 2.
```

### Validation

Toujours valider après génération :
1. ✅ Le code compile
2. ✅ Les tests passent
3. ✅ Lint passe
4. ✅ Le comportement est correct
5. ✅ L'UX est bonne

### Feedback

Donnez du feedback à l'IA :
```
@Agent_Dev Le composant fonctionne mais :
- Utiliser interface au lieu de type
- Extraire la logique dans un hook
- Ajouter gestion d'erreur
Peux-tu améliorer ?
```

---

## 🎯 Commandes Spéciales

### Commandes Composées

```bash
# Dev + Test en une fois
@Agent_Dev Implémente useGameSession hook +
@Agent_Test génère les tests associés

# Review complète
@Agent_Review Code review +
@Agent_UX UX review +
@Agent_Test Coverage check
de @src/features/game
```

### Modes Spécialisés

```bash
# Mode Explain (comprendre le code)
@Agent_Dev Explique-moi l'architecture de @src/features/game
et comment les composants communiquent

# Mode Debug
@Agent_Dev Debug : le score ne s'incrémente pas correctement
Context : @src/features/game/GameBoard.tsx

# Mode Optimize
@Agent_Refactor Optimise les performances de @src/features/game
Focus : re-renders et memoization
```

---

## 📊 Métriques de Qualité

### Code Quality

```bash
# Vérification automatique
@Agent_Review Analyse les métriques :
- TypeScript errors : 0
- ESLint warnings : 0
- Test coverage : > 70%
- Component size : < 300 lignes
- Cyclomatic complexity : < 10
```

### Performance

```bash
# Audit performance
@Agent_Review Audit Lighthouse de l'app.
Objectifs : Performance > 90, Accessibility > 90

# Bundle size
@Agent_Review Analyse la taille du bundle.
Objectif : < 200KB gzipped
```

---

## 🚨 Anti-Patterns à Éviter

### ❌ Trop Vague

```
Améliore l'app
```

### ❌ Sans Contexte

```
Crée un composant de jeu
```
(Sans référence à BMAD.md, .cursorrules, types...)

### ❌ Trop Complexe d'un Coup

```
Implémente toute la gamification avec badges, niveaux,
avatars, sons, animations et stats avancées
```

### ❌ Sans Validation

Générer du code sans :
- Lire le code généré
- Tester le comportement
- Vérifier les types
- Valider l'UX

---

## ✅ Checklist Session

### Avant de Coder
- [ ] BMAD.md à jour pour cette feature
- [ ] Types TypeScript définis
- [ ] Branche feature créée
- [ ] Objectifs clairs

### Pendant le Dev
- [ ] Contexte fourni à l'IA (@fichiers)
- [ ] Conventions respectées (.cursorrules)
- [ ] Commits atomiques
- [ ] Tests au fur et à mesure

### Après le Dev
- [ ] Code review (Agent_Review)
- [ ] UX review (Agent_UX)
- [ ] Tests passent
- [ ] Lint passe
- [ ] Documentation à jour
- [ ] BMAD.md mis à jour

---

## 🎓 Exemples Concrets

### Exemple 1 : Implémenter Composant

```
@Agent_Dev Implémente le composant QuestionCard.

Specs :
- Affiche une question de multiplication (ex: "7 × 8 = ?")
- Props : question (Question type), onAnswer (callback)
- Style : Card avec titre centré, grande taille texte (lisible enfant)
- Accessible : lecture écran, navigation clavier

Context :
@src/types/game.ts (pour type Question)
@.cursorrules (conventions)
@docs/BMAD.md (section Design System)

Génère aussi le fichier CSS Module associé.
```

### Exemple 2 : Créer Hook

```
@Agent_Dev Crée le hook useGameSession qui gère l'état d'une partie.

Fonctionnalités :
- startGame(config): démarre une nouvelle partie
- answerQuestion(answer): valide une réponse
- nextQuestion(): passe à la question suivante
- endGame(): termine la partie et sauvegarde stats

État retourné :
- session: GameSession | null
- currentQuestion: Question | null
- isGameActive: boolean
- score: number

Context :
@src/types/game.ts
@docs/BMAD.md (section Modeling - GameSession)

Utilise useReducer pour gérer l'état complexe.
Persiste dans LocalStorage via @src/hooks/useLocalStorage.
```

### Exemple 3 : Review & Optimisation

```
@Agent_Review + @Agent_Refactor

Analyse @src/features/game/GameBoard.tsx qui fait 400 lignes.

Tasks :
1. Identifie les problèmes (complexité, re-renders, a11y)
2. Propose un plan de découpage
3. Identifie la logique à extraire dans hooks
4. Suggère optimisations (memo, useCallback)

Ensuite :
@Agent_Refactor Implémente le découpage proposé
```

---

## 🔗 Intégration BMAD

### Brief (B)
```
@Agent_Dev Analyse le brief dans BMAD.md section Brief.
Quelles sont les contraintes UX pour un enfant CE2 ?
Propose des guidelines de design.
```

### Modeling (M)
```
@Agent_Dev Définis les types TypeScript pour tous les modèles
de données décrits dans BMAD.md section Modeling.
```

### Architecture (A)
```
@Agent_Setup Crée la structure complète de dossiers
selon BMAD.md section Architecture.
```

### Development (D)
```
@Agent_Dev Suis le plan de développement BMAD.md Sprint 1.
Implémente les features dans l'ordre prioritaire.
```

---

## 📝 Templates de Prompts

### Template Feature

```
@Agent_Dev Implémente la feature [NOM_FEATURE]

Objectif : [DESCRIPTION_COURTE]

Specs détaillées :
- [SPEC_1]
- [SPEC_2]
- [SPEC_3]

Context :
@[FICHIERS_PERTINENTS]
@docs/BMAD.md (section [SECTION])
@.cursorrules

Contraintes :
- [CONTRAINTE_1]
- [CONTRAINTE_2]

Output attendu :
- [OUTPUT_1]
- [OUTPUT_2]
```

### Template Debug

```
@Agent_Dev Debug : [DESCRIPTION_BUG]

Comportement actuel : [CE_QUI_SE_PASSE]
Comportement attendu : [CE_QUI_DEVRAIT_SE_PASSER]

Steps to reproduce :
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

Context :
@[FICHIERS_SUSPECTS]

Logs/Errors :
[COPIER_ERREURS]
```

### Template Review

```
@Agent_Review Review de [COMPOSANT/FEATURE]

Focus :
- [ ] Respect .cursorrules
- [ ] Types TypeScript corrects
- [ ] Accessibilité (a11y)
- [ ] Performance (re-renders)
- [ ] Tests suffisants
- [ ] Documentation

Context :
@[FICHIERS_A_REVIEW]

Fournis un rapport détaillé avec suggestions.
```

---

## 🎉 Résumé

L'utilisation efficace de l'IA comme partenaire de développement repose sur :

1. **Contextualisation** : Toujours fournir le contexte (@fichiers, BMAD, .cursorrules)
2. **Spécialisation** : Utiliser l'agent adapté à la tâche
3. **Itération** : Développer par petites étapes validées
4. **Validation** : Toujours vérifier et tester le code généré
5. **Feedback** : Donner des retours pour améliorer les résultats
6. **Documentation** : Maintenir BMAD.md à jour

**L'IA accélère le développement, mais vous restez le pilote !** 🚀

---

**Dernière mise à jour** : 2026-01-20
**Version** : 1.0.0
