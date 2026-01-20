# 🚀 Prochaines Étapes - App Maths

**Date** : 2026-01-20  
**Version Actuelle** : 0.2.1  
**Statut** : Application stable et fonctionnelle ✅

---

## 📊 État Actuel

### ✅ Fonctionnalités Implémentées
- Quiz de multiplication chronométré (5s, 10s, 15s, Infini)
- Système de combo avec multiplicateurs (x2, x3, x4)
- Score cumulatif persistant avec LocalStorage
- Écran de fin de partie avec récapitulatif détaillé
- Sélection multi-tables (1-10)
- UI sombre moderne et responsive
- Animations et feedback visuels

### 🎯 Vision Initiale (BMAD.md)
Ces fonctionnalités étaient prévues dans le plan initial et attendent d'être implémentées :
- Mode entraînement libre (sans timer)
- Défis quotidiens avec bonus
- Système de badges et trophées
- Écran de progression par table
- Mode progression (déblocage progressif des tables)

---

## 🗺️ Roadmap Suggérée

### 🏆 Sprint 2 : Progression et Badges (Priorité Haute)

#### Objectif
Motiver l'apprentissage par la visualisation des progrès et le déblocage d'accomplissements.

#### Fonctionnalités

**1. Écran de Progression** 📈
- Tableau de bord avec performance par table (1-10)
- Graphiques visuels (barres, jauge de maîtrise)
- Statistiques détaillées :
  - % de réussite par table
  - Nombre de parties jouées par table
  - Meilleur temps moyen
  - Évolution dans le temps

**2. Système de Badges** 🏅
- Notification animée lors du déblocage
- Affichage des badges débloqués/verrouillés
- 18 badges définis (voir `src/constants/badges.ts`) :
  - **Maîtrise** : Expert Table de 2 à 10 (90%+ de réussite)
  - **Combo** : Enchaînements x5, x10, x20
  - **Vitesse** : Éclair (< 2s, 10 fois)
  - **Précision** : Sans Faute (100%), Tireur d'Élite (95%+)
  - **Assiduité** : Premiers Pas, Apprenti Assidu, Champion
  - **Spéciaux** : Maître Absolu, Millionnaire (1000 points)

**3. Navigation Améliorée** 🧭
- Menu hamburger ou tabs pour navigation
- Accès rapide : Jouer / Progression / Badges

#### Tâches Techniques
- [ ] Créer `ProgressPage.tsx` avec graphiques
- [ ] Créer `BadgesPage.tsx` avec grille de badges
- [ ] Créer composant `BadgeNotification.tsx` pour animations
- [ ] Créer composant `ProgressChart.tsx` (graphiques)
- [ ] Implémenter logique de déblocage dans `AppContext`
- [ ] Ajouter détection de déblocage dans `GameContext.endGame`
- [ ] Mettre à jour navigation avec nouvelles routes
- [ ] Tests utilisateur

**Estimation** : Sprint de développement (plusieurs sessions)

---

### 🎮 Sprint 3 : Modes de Jeu Additionnels (Priorité Moyenne)

#### Objectif
Offrir plus de variété et d'options d'entraînement.

#### Fonctionnalités

**1. Mode Entraînement Libre** 🧘
- Pas de timer (mode Zen)
- Pas de limite de questions
- Focus sur la réflexion, pas la vitesse
- Sélection d'une seule table ou mix
- Feedback immédiat avec explication

**2. Défis Quotidiens** 📅
- Un défi par jour (réinitialisé à minuit)
- Objectifs variés :
  - "10 réponses correctes en moins de 2 minutes"
  - "Combo de 15 sur table de 7"
  - "100% de précision sur 20 questions"
- Bonus de points si réussi (x2 ou x3)
- Badge spécial pour 7 jours consécutifs

**3. Calculs à Trous** 🔢
- Trouver l'opérande manquant
- Exemples : `? × 7 = 35`, `8 × ? = 64`
- Même système de scoring
- Nouvelle difficulté pour varier

**4. Mode Survie** ⚡
- Une seule vie (ou 3 vies)
- Le jeu continue tant que correct
- Timer réduit progressivement (challenge crescendo)
- Leaderboard local (top scores)

#### Tâches Techniques
- [ ] Créer `TrainingPage.tsx` (mode libre)
- [ ] Créer `DailyChallengesPage.tsx`
- [ ] Implémenter générateur de défis quotidiens
- [ ] Ajouter type de question "find-operand" dans types
- [ ] Modifier générateur de questions pour calculs à trous
- [ ] Créer `SurvivalGamePage.tsx`
- [ ] Système de vies dans GameContext
- [ ] Tests et ajustements

**Estimation** : Sprint de développement (plusieurs sessions)

---

### 🎨 Sprint 4 : Polish et Personnalisation (Priorité Basse)

#### Objectif
Améliorer l'expérience utilisateur avec plus de contrôle et de polish.

#### Fonctionnalités

**1. Effets Sonores** 🔊
- Son pour réponse correcte (ding ✓)
- Son pour réponse incorrecte (buzz ✗)
- Son pour combo milestone (x2, x3, x4)
- Son pour déblocage de badge
- Son pour fin de partie
- Toggle on/off dans paramètres

**2. Paramètres Avancés** ⚙️
- Nombre de questions personnalisable (5, 10, 15, 20, 30, 50)
- Difficulté : Facile (2-5), Moyen (2-7), Difficile (2-10), Expert (6-10)
- Activer/désactiver animations
- Taille de police (accessibilité)
- Mode daltonien (palette alternative)

**3. Animations Supplémentaires** ✨
- Transitions de page plus fluides
- Particules de célébration plus variées
- Animations de badge "popup"
- Effet de "niveau up" visuel
- Avatar ou mascotte animée (optionnel)

**4. Export/Import Données** 💾
- Exporter progression en JSON
- Importer pour transférer sur autre appareil
- Réinitialiser progression avec confirmation

#### Tâches Techniques
- [ ] Intégrer librairie audio (Howler.js ou Web Audio API)
- [ ] Créer `SettingsPage.tsx` avec options
- [ ] Ajouter sons dans assets (ou générés)
- [ ] Implémenter logique de settings dans AppContext
- [ ] Créer utilitaires export/import
- [ ] Améliorer animations CSS
- [ ] Tests accessibilité (contraste, navigation clavier)

**Estimation** : Sprint de polish (plusieurs sessions)

---

### 🌐 Sprint 5 : Backend et Multi-Dispositifs (Futur)

#### Objectif
Permettre la synchronisation entre appareils et ajouter des fonctionnalités sociales.

#### Fonctionnalités

**1. Backend Simple** 🗄️
- API REST (Node.js + Express, ou Supabase)
- Authentification (email/password, ou OAuth Google)
- Stockage de la progression en base de données
- Synchronisation automatique

**2. Fonctionnalités Sociales** 👥
- Leaderboard global (top scores)
- Partager ses badges sur réseaux sociaux
- Mode défi entre amis
- Profils publics (optionnel)

**3. PWA (Progressive Web App)** 📱
- Installation sur écran d'accueil mobile
- Mode offline
- Notifications push (défis quotidiens)

#### Tâches Techniques
- [ ] Choisir stack backend (Supabase recommandé pour MVP)
- [ ] Créer schéma de base de données
- [ ] Implémenter authentification
- [ ] API endpoints (user, progress, badges, leaderboard)
- [ ] Refactoriser AppContext pour sync backend
- [ ] Configurer PWA (manifest.json, service worker)
- [ ] Déploiement (Vercel, Netlify, Railway)

**Estimation** : Sprint majeur (nombreuses sessions)

---

## 🎯 Recommandations pour le Prochain Chat

### Pour Continuer Efficacement

**Option 1 : Implémenter Sprint 2 (Badges et Progression)**
Exemple de prompt :
> "Je veux implémenter le Sprint 2 : système de badges et écran de progression. Commence par créer la page ProgressPage avec des graphiques de performance par table. Respecte l'architecture existante."

**Option 2 : Ajouter un Mode de Jeu**
Exemple de prompt :
> "Implémente le mode Entraînement Libre (sans timer, sans limite). Crée une nouvelle page TrainingPage qui utilise GameContext mais sans contrainte de temps."

**Option 3 : Défis Quotidiens**
Exemple de prompt :
> "Crée le système de défis quotidiens avec génération automatique chaque jour. Interface pour voir le défi actif et historique des défis complétés."

**Option 4 : Polish Visuel**
Exemple de prompt :
> "Ajoute des effets sonores pour les réponses correctes/incorrectes et les combos. Utilise Web Audio API et respecte le design system existant."

### 📚 Fichiers de Référence Importants

Pour toute nouvelle fonctionnalité, consultez :
- `docs/BMAD.md` - Architecture et vision globale
- `docs/PROJECT-STATUS.md` - État actuel du projet
- `.cursorrules` - Conventions de code
- `src/types/index.ts` - Types TypeScript
- `src/constants/badges.ts` - Définitions des badges

---

## 💡 Idées Bonus (Non Prioritaires)

### Fonctionnalités Fun
- **Mode "Tables Mélangées"** : Questions aléatoires toutes tables confondues
- **Thèmes Visuels** : Espace, Océan, Forêt (changement de background et couleurs)
- **Mini-jeux** : Memory avec cartes multiplication, puzzle déblocable
- **Système d'XP** : Niveau global utilisateur (Level 1 → Level 50)
- **Récompenses Cosmétiques** : Avatars, cadres de badges, effets de particules

### Optimisations Techniques
- **Tests Unitaires** : Coverage des utilitaires et hooks
- **Tests E2E** : Playwright pour flux complets
- **Optimisation Bundle** : Code splitting plus agressif
- **Analytics** : Plausible ou Simple Analytics (privacy-friendly)
- **CI/CD** : GitHub Actions pour lint/test/deploy automatique

---

## 📝 Notes Finales

### Points Forts Actuels
- ✅ Architecture solide et modulaire
- ✅ Design system cohérent
- ✅ TypeScript strict (0 erreur)
- ✅ Code maintenable et documenté
- ✅ UX validée par l'utilisateur

### Prochaine Session
Le prochain agent IA reprendra facilement grâce à :
- Cette documentation complète
- Les commits Git sémantiques
- La structure BMAD claire
- Les types TypeScript explicites

**L'application est prête pour évoluer ! 🚀**

---

**Dernière mise à jour** : 2026-01-20  
**Auteur** : Assistant IA  
**Contact Projet** : Voir `README.md`
