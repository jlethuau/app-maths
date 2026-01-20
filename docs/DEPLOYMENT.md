# 📱 Guide de Déploiement - App Maths

**Version** : 0.2.1  
**Date** : 2026-01-20

---

## 🎯 Objectif

Mettre l'application à disposition sur mobile avec 3 solutions possibles :

| Solution | Difficulté | Temps | Avantages |
|----------|-----------|-------|-----------|
| **1. Vercel + PWA** | ⭐ Facile | 10 min | Accessible partout, installable |
| **2. Réseau Local** | ⭐⭐ Moyen | 5 min | Pas besoin d'internet |
| **3. App Native** | ⭐⭐⭐ Difficile | 2h | App store, fonctionnalités natives |

---

## 🥇 Solution 1 : Déploiement Web + PWA (RECOMMANDÉ)

### ✅ Avantages
- Accessible depuis n'importe où (via URL)
- Installable sur l'écran d'accueil comme une vraie app
- Gratuit à 100%
- Mises à jour automatiques
- Fonctionne sur iOS et Android

### 📋 Prérequis
- Compte GitHub (gratuit)
- Compte Vercel (gratuit)

---

### Étape 1 : Préparer le Build

Le build est déjà créé ! Vous pouvez le tester localement :

```bash
# Prévisualiser le build de production
npm run preview
```

Ouvrez http://localhost:4173 dans votre navigateur.

---

### Étape 2 : Pousser sur GitHub

Si ce n'est pas déjà fait, créez un dépôt GitHub :

```bash
# Initialiser Git (déjà fait)
git remote add origin https://github.com/VOTRE-USERNAME/app-maths.git

# Pousser le code
git push -u origin develop

# Ou créer une branche main si nécessaire
git checkout -b main
git push -u origin main
```

**Alternative sans Git** : Vous pouvez aussi importer le dossier directement dans Vercel (voir Étape 3).

---

### Étape 3 : Déployer sur Vercel

#### Option A : Via le Site Web (Plus Simple)

1. **Aller sur** : https://vercel.com
2. **Se connecter** avec GitHub
3. **Cliquer** sur "Add New Project"
4. **Importer** votre repo `app-maths`
5. **Configuration** :
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. **Cliquer** sur "Deploy"

⏱️ **Durée** : 2-3 minutes

7. **Récupérer l'URL** : `https://app-maths-xxxxx.vercel.app`

#### Option B : Via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions :
# - Set up and deploy: Yes
# - Scope: Your account
# - Link to existing project: No
# - Project name: app-maths
# - Directory: ./
# - Build Command: npm run build
# - Output Directory: dist
# - Dev Command: npm run dev

# Pour déployer en production
vercel --prod
```

---

### Étape 4 : Générer les Icônes PWA

Les icônes permettent à l'app d'avoir une belle apparence sur l'écran d'accueil.

#### Option A : En Ligne (Recommandé)

1. Aller sur : https://www.pwabuilder.com/imageGenerator
2. Uploader `public/icon.svg`
3. Télécharger les icônes générées (192x192 et 512x512)
4. Placer dans `public/` :
   - `icon-192.png`
   - `icon-512.png`
5. Re-build et re-déployer :
   ```bash
   npm run build
   vercel --prod
   ```

#### Option B : Avec ImageMagick (Si installé)

```bash
# Installer ImageMagick
sudo apt install imagemagick  # Linux
brew install imagemagick       # macOS

# Générer les icônes
bash scripts/generate-icons.sh

# Re-build
npm run build
vercel --prod
```

---

### Étape 5 : Installer l'App sur Mobile

#### Sur Android 📱

1. **Ouvrir** l'URL Vercel dans Chrome : `https://app-maths-xxxxx.vercel.app`
2. **Appuyer** sur le menu (3 points verticaux)
3. **Sélectionner** "Installer l'application" ou "Ajouter à l'écran d'accueil"
4. **Confirmer** l'installation
5. **L'icône apparaît** sur l'écran d'accueil ! 🎉

#### Sur iOS (iPhone/iPad) 🍎

1. **Ouvrir** l'URL Vercel dans Safari : `https://app-maths-xxxxx.vercel.app`
2. **Appuyer** sur le bouton "Partager" (carré avec flèche vers le haut)
3. **Faire défiler** et sélectionner "Sur l'écran d'accueil"
4. **Modifier le nom** si souhaité : "App Maths"
5. **Appuyer** sur "Ajouter"
6. **L'icône apparaît** sur l'écran d'accueil ! 🎉

---

### ✅ Test de l'Installation PWA

Une fois installée, l'app devrait :
- ✅ S'ouvrir en plein écran (sans barre d'adresse)
- ✅ Avoir son icône sur l'écran d'accueil
- ✅ Apparaître dans la liste des apps
- ✅ Fonctionner même avec une connexion lente (cache)

---

## 🥈 Solution 2 : Réseau Local (Sans Déploiement)

### ✅ Avantages
- Pas besoin d'hébergement
- Fonctionne sans internet (après chargement initial)
- Configuration rapide

### ⚠️ Inconvénients
- Seulement sur votre réseau WiFi
- PC doit être allumé

---

### Étape 1 : Trouver l'IP de votre PC

```bash
# Linux / macOS
hostname -I | awk '{print $1}'

# Ou
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows (PowerShell)
ipconfig | findstr IPv4
```

Exemple de résultat : `192.168.1.42`

---

### Étape 2 : Lancer le Serveur

```bash
# Build de production
npm run build

# Lancer le serveur (accessible sur le réseau)
npm run preview
```

Le serveur affiche :
```
  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.1.42:4173/
```

---

### Étape 3 : Accéder depuis le Mobile

1. **Connecter** votre mobile au **même WiFi** que votre PC
2. **Ouvrir** le navigateur mobile
3. **Taper** l'URL : `http://192.168.1.42:4173`
4. **L'app se charge** ! 🎉

Vous pouvez aussi l'ajouter à l'écran d'accueil (voir Solution 1, Étape 5).

---

### Variante : Serveur Permanent

Pour que l'app reste accessible même après fermeture du terminal :

```bash
# Installer serve
npm install -g serve

# Lancer en arrière-plan
serve -s dist -l 4173 &

# Ou avec PM2 (plus robuste)
npm install -g pm2
pm2 serve dist 4173 --name app-maths --spa
pm2 save
pm2 startup
```

---

## 🥉 Solution 3 : App Native avec Capacitor

### ✅ Avantages
- App native complète (iOS et Android)
- Accès aux fonctionnalités natives (caméra, notifications, etc.)
- Publication sur les stores possible

### ⚠️ Inconvénients
- Plus complexe à configurer
- Nécessite Xcode (iOS) ou Android Studio
- Mises à jour nécessitent rebuild

---

### Étape 1 : Installer Capacitor

```bash
# Installer les dépendances
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios

# Initialiser Capacitor
npx cap init "App Maths" "com.appmaths.app" --web-dir=dist

# Build web
npm run build

# Ajouter les plateformes
npx cap add android
npx cap add ios  # Seulement sur macOS
```

---

### Étape 2 : Configuration

Créer `capacitor.config.ts` :

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.appmaths.app',
  appName: 'App Maths',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

---

### Étape 3 : Build Android

```bash
# Build web
npm run build

# Synchroniser
npx cap sync android

# Ouvrir dans Android Studio
npx cap open android
```

Dans Android Studio :
1. **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**
2. L'APK est dans `android/app/build/outputs/apk/debug/app-debug.apk`
3. **Transférer** l'APK sur votre téléphone
4. **Installer** (autoriser sources inconnues)

---

### Étape 4 : Build iOS (macOS uniquement)

```bash
# Build web
npm run build

# Synchroniser
npx cap sync ios

# Ouvrir dans Xcode
npx cap open ios
```

Dans Xcode :
1. **Connecter** votre iPhone
2. **Sélectionner** votre appareil
3. **Product** > **Run**
4. Signer avec votre Apple ID (gratuit pour dev)

---

## 📊 Comparaison des Solutions

| Critère | Vercel + PWA | Réseau Local | Capacitor |
|---------|--------------|--------------|-----------|
| **Facilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Coût** | Gratuit | Gratuit | Gratuit (dev) |
| **Accessibilité** | Partout | WiFi local | Partout |
| **Installation** | PWA | PWA | App native |
| **Mises à jour** | Auto | Manuel | Rebuild |
| **Fonctionnalités** | Web | Web | Natives |
| **Stores** | Non | Non | Oui |

---

## 🎯 Recommandation Finale

### Pour Votre Cas (Application CE2)

**👉 Solution 1 : Vercel + PWA** est la meilleure option car :

✅ Votre fille peut y accéder de n'importe où  
✅ Vous pouvez partager l'URL avec la famille  
✅ Les mises à jour sont automatiques  
✅ Installation simple sur mobile  
✅ Gratuit et sans maintenance  
✅ Fonctionne sur iOS et Android  

---

## 🔧 Dépannage

### L'app ne s'installe pas

**Problème** : Pas de bouton "Installer l'application"

**Solutions** :
- Vérifier que `manifest.json` est accessible : `https://votre-url/manifest.json`
- Vérifier dans les DevTools > Application > Manifest
- iOS : Utiliser **Safari** (pas Chrome)
- Android : Utiliser **Chrome** (pas Firefox)

---

### Service Worker ne s'enregistre pas

**Problème** : Message d'erreur dans la console

**Solutions** :
- Vérifier que le site est en **HTTPS** (Vercel le fait automatiquement)
- Vérifier que `sw.js` est accessible : `https://votre-url/sw.js`
- Vider le cache : DevTools > Application > Clear storage

---

### L'app ne fonctionne pas hors ligne

**Problème** : Erreur "Pas de connexion" sans WiFi

**Solutions** :
- Le Service Worker cache seulement après la première visite
- Ouvrir l'app une fois en ligne pour initialiser le cache
- Vérifier dans DevTools > Application > Cache Storage

---

## 📝 Checklist Complète

### Avant Déploiement
- [x] Build de production créé (`npm run build`)
- [x] Manifest PWA configuré
- [x] Service Worker créé
- [x] Meta tags PWA ajoutés
- [ ] Icônes générées (192px et 512px)
- [x] Tests locaux effectués

### Déploiement Vercel
- [ ] Code poussé sur GitHub
- [ ] Projet créé sur Vercel
- [ ] Build successful
- [ ] URL de production récupérée
- [ ] Test sur mobile effectué

### Installation Mobile
- [ ] App installée sur Android
- [ ] App installée sur iOS
- [ ] Test hors ligne effectué
- [ ] Icône correcte sur écran d'accueil

---

## 🚀 Prochaines Améliorations PWA

Pour aller plus loin (optionnel) :

1. **Notifications Push** : Alertes pour défis quotidiens
2. **Mode Offline Complet** : Toutes les fonctionnalités sans internet
3. **Mise à jour automatique** : Prompt "Nouvelle version disponible"
4. **Partage natif** : Partager ses scores
5. **Installation Badge** : Prompt d'installation personnalisé

---

## 📞 Support

- **Documentation Officielle PWA** : https://web.dev/progressive-web-apps/
- **Vercel Docs** : https://vercel.com/docs
- **Capacitor Docs** : https://capacitorjs.com/docs

---

**Dernière mise à jour** : 2026-01-20  
**Version de l'app** : 0.2.1  
**Auteur** : Assistant IA
