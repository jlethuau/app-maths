# 🎮 App Maths - Tables de Multiplication

Application web ludique pour apprendre les tables de multiplication (CE2).

**🌐 Repository GitHub** : https://github.com/jlethuau/app-maths  
**🚀 Déploiement** : Vercel (voir instructions ci-dessous)

---

## 📱 Accès Rapide

- **Guide Déploiement Vercel** : [GUIDE-VERCEL.md](./GUIDE-VERCEL.md)
- **Déploiement Rapide** : [DEPLOIEMENT-RAPIDE.md](./DEPLOIEMENT-RAPIDE.md)
- **Documentation Complète** : [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

## ✨ Fonctionnalités

### 🎯 MVP Actuel (v0.2.1)
- ✅ Quiz de multiplication chronométré (5s, 10s, 15s, Infini)
- ✅ Sélection multi-tables (1-10)
- ✅ Système de combo (x2, x3, x4) avec multiplicateurs de points
- ✅ Score cumulatif avec progression
- ✅ Écran de fin animé avec récapitulatif détaillé
- ✅ Feedback visuel (correct/incorrect)
- ✅ Persistance des données (LocalStorage)
- ✅ PWA installable sur mobile (Android + iOS)
- ✅ UI sombre moderne et responsive

### 🚀 Roadmap (voir [docs/NEXT-STEPS.md](./docs/NEXT-STEPS.md))
- 🔜 Système de badges et trophées
- 🔜 Écran de progression avec graphiques
- 🔜 Défis quotidiens
- 🔜 Mode entraînement libre
- 🔜 Calculs à trous
- 🔜 Effets sonores

---

## 🚀 Déploiement Vercel (10 minutes)

### Méthode la Plus Simple

1. **Créer compte Vercel** : https://vercel.com/signup (avec GitHub)
2. **Importer projet** : https://vercel.com/new
3. Chercher : `jlethuau/app-maths`
4. Cliquer : **"Deploy"**
5. ✅ Récupérer l'URL : `https://app-maths-xxxxx.vercel.app`

**Guide détaillé** : [GUIDE-VERCEL.md](./GUIDE-VERCEL.md)

---

## 💻 Développement Local

### Installation

```bash
# Cloner le projet
git clone https://github.com/jlethuau/app-maths.git
cd app-maths

# Installer les dépendances
npm install
```

### Commandes Disponibles

```bash
# Développement (http://localhost:5173)
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Tests
npm run test
npm run test:ui
npm run test:coverage

# Qualité
npm run lint          # ESLint
npm run lint:fix      # Fix auto
npm run type-check    # TypeScript
```

---

## 🛠️ Stack Technique

### Frontend
- **React 18** - Librairie UI
- **TypeScript 5** - Typage statique
- **Vite 5** - Build tool ultra-rapide
- **React Router** - Routing
- **CSS Modules** - Styles scoped

### État & Données
- **React Context** - State management
- **LocalStorage** - Persistance locale
- **Custom Hooks** - useLocalStorage

### Qualité
- **ESLint** - Linting
- **Prettier** - Formatage
- **Vitest** - Tests unitaires
- **React Testing Library** - Tests composants

### PWA
- **Service Worker** - Cache & offline
- **Web App Manifest** - Installation mobile

---

## 📂 Structure du Projet

```
app-maths/
├── docs/                      # Documentation complète
│   ├── BMAD.md               # Méthodologie BMAD
│   ├── DEPLOYMENT.md         # Guide déploiement complet
│   ├── NEXT-STEPS.md         # Roadmap détaillée
│   └── PROJECT-STATUS.md     # État actuel
├── public/                    # Assets statiques
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker
│   └── icon.svg              # Icône app
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── ui/              # Button, Card
│   │   └── layout/          # Container
│   ├── features/             # Features par domaine
│   │   └── game/            # Composants de jeu
│   ├── pages/                # Pages principales
│   │   ├── HomePage.tsx
│   │   └── GamePage.tsx
│   ├── context/              # React Context
│   │   ├── AppContext.tsx   # État global
│   │   └── GameContext.tsx  # État jeu
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utilitaires
│   ├── constants/            # Constantes
│   ├── types/                # Types TypeScript
│   └── styles/               # Styles globaux
├── GUIDE-VERCEL.md           # Guide Vercel pas à pas
├── DEPLOIEMENT-RAPIDE.md     # Quick start
└── CHANGELOG.md              # Historique versions
```

---

## 🎨 Design System

### Thème Sombre (WinSphere-inspired)
- **Primary** : `#7c3aed` (Violet)
- **Secondary** : `#ec4899` (Rose)
- **Accent** : `#3b82f6` (Bleu)
- **Gold** : `#fbbf24` (Récompenses)
- **Background** : `#0f0322` (Violet très sombre)

### Combo Colors
- **x2** : `#60a5fa` (Bleu clair)
- **x3** : `#a78bfa` (Violet clair)
- **x4** : `#fbbf24` (Or)

---

## 📱 Installation Mobile (PWA)

### Android
1. Ouvrir l'URL dans **Chrome**
2. Menu (⋮) → "Installer l'application"
3. Confirmer

### iOS
1. Ouvrir l'URL dans **Safari**
2. Partager (□↑) → "Sur l'écran d'accueil"
3. Ajouter

---

## 📊 Métriques

### Performance
- **Build Size** : 216 KB (67 KB gzipped)
- **First Load** : < 1s
- **Lighthouse Score** : 95+ (performance, accessibilité, PWA)

### Qualité Code
- **TypeScript** : 0 erreur
- **ESLint** : 0 warning
- **Test Coverage** : Setup configuré

---

## 🤝 Contribution

Voir [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) pour :
- Setup local
- Git workflow (Gitflow)
- Standards de code
- Tests
- Pull requests

---

## 📖 Documentation

### Guides Utilisateur
- [GUIDE-VERCEL.md](./GUIDE-VERCEL.md) - Déploiement Vercel (10 min)
- [DEPLOIEMENT-RAPIDE.md](./DEPLOIEMENT-RAPIDE.md) - Quick start (3 min)

### Documentation Technique
- [docs/BMAD.md](./docs/BMAD.md) - Architecture complète (Brief, Modeling, Architecture, Development)
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Guide déploiement exhaustif (3 solutions)
- [docs/NEXT-STEPS.md](./docs/NEXT-STEPS.md) - Roadmap et prochaines fonctionnalités
- [docs/PROJECT-STATUS.md](./docs/PROJECT-STATUS.md) - État actuel et historique
- [docs/AI-AGENTS.md](./docs/AI-AGENTS.md) - Guide agents IA pour développement

### Changelog
- [CHANGELOG.md](./CHANGELOG.md) - Historique détaillé des versions

---

## 🎯 Méthodologie

Ce projet utilise **BMAD** (Brief, Modeling, Architecture, Development) :
- **Brief** : Objectifs, utilisateurs, contraintes
- **Modeling** : Modèles de données TypeScript
- **Architecture** : Structure, patterns, stack
- **Development** : Sprints, agents IA, roadmap

Voir [docs/BMAD.md](./docs/BMAD.md) pour le détail complet.

---

## 📜 Licence

MIT License - Libre d'utilisation

---

## 🙏 Crédits

- Développé avec assistance IA (Cursor + Claude Sonnet 4.5)
- Design inspiré par WinSphere
- Icônes et animations personnalisées

---

## 📞 Support

- **Issues** : https://github.com/jlethuau/app-maths/issues
- **Discussions** : https://github.com/jlethuau/app-maths/discussions

---

## 🎉 Quick Start

```bash
# 1. Cloner
git clone https://github.com/jlethuau/app-maths.git

# 2. Installer
cd app-maths && npm install

# 3. Développer
npm run dev

# 4. Déployer
# Suivre GUIDE-VERCEL.md
```

---

**Version** : 0.2.1  
**Status** : Stable et Production-Ready ✅  
**Date** : 2026-01-20
