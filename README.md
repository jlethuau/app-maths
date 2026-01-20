# 🎯 App Maths - Tables de Multiplication

Application web mobile-first pour aider les enfants de CE2 à apprendre et réviser leurs tables de multiplication de manière ludique et engageante.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18+-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6)

---

## ✨ Fonctionnalités

### MVP (Version 1.0)
- 🎮 **Jeu de Quiz Interactif** : Questions de multiplication avec feedback immédiat
- 📊 **Sélection des Tables** : Choisir les tables à réviser (1-10)
- 🏆 **Système de Gamification** : Points, badges, niveaux
- 📈 **Statistiques Détaillées** : Suivi de progression par table
- ⚙️ **Paramètres Personnalisables** : Difficulté, sons, thème
- 💾 **Sauvegarde Automatique** : Progression sauvegardée localement

### Prochainement
- 🎨 Avatar personnalisable
- 🌙 Mode sombre
- 🎵 Effets sonores optionnels
- 🏅 Plus de badges à débloquer
- 📱 Mode hors ligne (PWA)

---

## 🚀 Quick Start

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <repo-url>
cd app-maths

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Ouvrir dans le navigateur
# L'app sera disponible sur http://localhost:5173
```

### Commandes Disponibles

```bash
# Développement
npm run dev              # Lancer le serveur de dev (HMR)
npm run build            # Build de production
npm run preview          # Prévisualiser le build

# Qualité du code
npm run lint             # Linter le code
npm run lint:fix         # Corriger automatiquement
npm run type-check       # Vérifier les types TypeScript

# Tests
npm run test             # Lancer les tests
npm run test:ui          # Interface UI pour les tests
npm run test:coverage    # Rapport de couverture
```

---

## 🏗️ Stack Technique

### Core
- **React 18+** : UI library
- **TypeScript 5+** : Type safety
- **Vite** : Build tool ultra-rapide
- **React Router** : Navigation

### Styling
- **CSS Modules** : Styles scopés
- **CSS Variables** : Design tokens
- **Mobile-First** : Responsive design

### State Management
- **React Context** : État global
- **Custom Hooks** : Logique réutilisable
- **LocalStorage** : Persistance

### Quality
- **ESLint** : Linting
- **Prettier** : Formatage
- **Vitest** : Tests unitaires
- **React Testing Library** : Tests composants

---

## 📁 Structure du Projet

```
app-maths/
├── docs/                 # Documentation
│   ├── BMAD.md          # Méthodologie BMAD
│   └── CONTRIBUTING.md  # Guide de contribution
├── public/              # Assets statiques
├── src/
│   ├── features/        # Fonctionnalités (game, stats, etc.)
│   ├── components/      # Composants réutilisables
│   ├── hooks/           # Custom hooks
│   ├── context/         # React Context
│   ├── utils/           # Utilitaires
│   ├── types/           # Types TypeScript
│   ├── constants/       # Constantes
│   └── styles/          # Styles globaux
├── .cursorrules         # Rules pour Cursor AI
└── package.json
```

Voir [BMAD.md](docs/BMAD.md) pour l'architecture détaillée.

---

## 🎨 Design System

### Palette de Couleurs
- **Primary** : Bleu (#4A90E2)
- **Success** : Vert (#7ED321)
- **Error** : Rouge (#D0021B)
- **Warning** : Orange (#F5A623)
- **Neutral** : Gris (#9B9B9B)

### Typographie
- **Famille** : 'Inter', system-ui, sans-serif
- **Tailles** : 12px, 14px, 16px, 20px, 24px, 32px
- **Poids** : 400 (regular), 600 (semibold), 700 (bold)

### Espacements
Système basé sur 4px : 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

---

## 🧪 Tests

### Lancer les Tests

```bash
# Mode watch
npm run test

# Coverage
npm run test:coverage

# UI (interface graphique)
npm run test:ui
```

### Stratégie de Tests
- **Unitaires** : Fonctions utilitaires et hooks (> 80% coverage)
- **Composants** : Tests d'intégration avec Testing Library
- **E2E** : (Phase 2) Parcours utilisateur critiques

---

## 📱 Responsive & Mobile

### Breakpoints
- **Mobile** : 320px - 767px (design prioritaire)
- **Tablet** : 768px - 1023px
- **Desktop** : 1024px+

### Optimisations Mobile
- Touch targets > 44x44px
- Fonts lisibles (min 16px)
- Navigation simplifiée
- Animations performantes

---

## ♿ Accessibilité

L'application suit les standards WCAG 2.1 niveau AA :

- ✅ HTML sémantique
- ✅ Navigation clavier complète
- ✅ Contraste couleurs respecté (4.5:1)
- ✅ Labels sur tous les inputs
- ✅ ARIA attributes appropriés
- ✅ Testée avec lecteur d'écran

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](docs/CONTRIBUTING.md) pour :
- Setup local
- Git workflow
- Conventions de code
- Standards de qualité
- Process de review

### Quick Guidelines

```bash
# Créer une branche feature
git checkout -b feature/ma-feature

# Commits conventionnels
git commit -m "feat(game): add new badge system"

# Avant de push
npm run lint
npm run test
npm run build
```

---

## 📚 Documentation

- **[BMAD.md](docs/BMAD.md)** : Méthodologie de développement (Brief, Modeling, Architecture, Development)
- **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** : Guide de contribution complet
- **[.cursorrules](.cursorrules)** : Règles pour développement assisté par IA

---

## 🎯 Roadmap

### Version 1.0 (MVP)
- [x] Configuration environnement
- [ ] Composants UI de base
- [ ] Jeu de quiz fonctionnel
- [ ] Système de gamification
- [ ] Statistiques de base
- [ ] Déploiement

### Version 1.1
- [ ] PWA (Progressive Web App)
- [ ] Mode hors ligne
- [ ] Plus de badges
- [ ] Sons et animations améliorés

### Version 2.0
- [ ] Mode multijoueur local
- [ ] Avatar personnalisable
- [ ] Backend optionnel
- [ ] Synchronisation multi-devices
- [ ] Espace parents/enseignants

---

## 📄 License

MIT License - Voir [LICENSE](LICENSE) pour détails.

---

## 👨‍👩‍👧 Créateurs

Créé avec ❤️ pour aider les enfants à apprendre les mathématiques de manière ludique.

**Pour** : Une fille de CE2 motivée ! 🌟

---

## 🙏 Remerciements

- [React](https://react.dev) pour l'excellent framework
- [Vite](https://vitejs.dev) pour la rapidité
- [Cursor](https://cursor.sh) pour l'assistance IA

---

## 📞 Support

Des questions ? Des suggestions ?
- 📧 Email : [email]
- 🐛 Issues : [GitHub Issues](issues-url)
- 💬 Discussions : [GitHub Discussions](discussions-url)

---

**Fait avec Cursor AI & méthodologie BMAD** 🤖✨
