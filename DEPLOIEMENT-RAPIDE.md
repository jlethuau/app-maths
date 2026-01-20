# 🚀 Déploiement Rapide - 3 Minutes Chrono

## 📱 Méthode Recommandée : Vercel + PWA

### 1️⃣ Créer un Compte Vercel (1 min)
👉 https://vercel.com/signup

- Connectez-vous avec GitHub
- C'est gratuit !

### 2️⃣ Déployer l'App (1 min)

**Option A : Via Interface Web** (Plus Simple)

1. Allez sur https://vercel.com/new
2. Importez votre projet GitHub `app-maths`
3. Cliquez sur "Deploy" (configuration automatique détectée !)
4. ⏳ Attendez 2 minutes...
5. ✅ Récupérez votre URL : `https://app-maths-xxxxx.vercel.app`

**Option B : Via Terminal**

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer (suivre les instructions)
vercel

# Déployer en production
vercel --prod
```

### 3️⃣ Installer sur Mobile (1 min)

**Android (Chrome)** 📱
1. Ouvrir l'URL Vercel
2. Menu (⋮) → "Installer l'application"
3. Confirmer → App sur l'écran d'accueil ! 🎉

**iOS (Safari)** 🍎
1. Ouvrir l'URL Vercel
2. Partager (□↑) → "Sur l'écran d'accueil"
3. Ajouter → App sur l'écran d'accueil ! 🎉

---

## ✅ C'EST TOUT !

Votre fille peut maintenant utiliser l'app comme une vraie application mobile ! 📱✨

---

## 🔧 Alternative : Réseau Local (Sans Déploiement)

Si vous voulez tester sans déployer :

```bash
# 1. Build
npm run build

# 2. Lancer serveur
npm run preview

# 3. Trouver l'IP
hostname -I | awk '{print $1}'
# Exemple: 192.168.1.42

# 4. Ouvrir sur mobile (même WiFi)
# http://192.168.1.42:4173
```

---

## 📚 Documentation Complète

Pour plus de détails, voir `docs/DEPLOYMENT.md` :
- Configuration PWA avancée
- Génération d'icônes
- App native avec Capacitor
- Dépannage

---

## 🆘 Besoin d'Aide ?

**Problème courant** : Pas de bouton "Installer"
- ✅ iOS : Utilisez Safari (pas Chrome)
- ✅ Android : Utilisez Chrome (pas Firefox)
- ✅ Attendez 2-3 secondes après chargement de la page

**Autres questions** : Consultez `docs/DEPLOYMENT.md`
