# 📌 Guide de Versioning - App Maths

## 🎯 Principe : Source Unique de Vérité

La version de l'application est définie **UNIQUEMENT** dans `package.json`.  
Tous les autres fichiers l'importent automatiquement.

---

## 🚀 Comment Changer la Version

### Étape 1 : Modifier package.json

```bash
# Modifier la ligne :
"version": "0.7.0"  # Nouvelle version
```

### Étape 2 : Mettre à jour le CHANGELOG

```bash
# Ajouter la nouvelle version en haut de CHANGELOG.md
## [0.8.0] - 2026-01-XX
### Added
- ...
```

### Étape 3 : Build et Commit

```bash
npm run build
git add -A
git commit -m "chore: bump version to 0.X.Y"
git tag -a v0.X.Y -m "Version 0.X.Y - Description"
git push origin main
git push origin v0.X.Y
```

---

## ✅ Fichiers Mis à Jour Automatiquement

### ✅ Automatique (ne PAS modifier manuellement)
- `src/components/layout/AppMenu.tsx` → importe depuis `@/constants/version`
- `src/constants/version.ts` → lit `package.json`

### ⚠️ Manuel (optionnel)
- `README.md` → Section "Version Actuelle" (si mentionnée)
- `CHANGELOG.md` → Ajout de la nouvelle version

---

## 📝 Convention de Versioning

Format : **MAJOR.MINOR.PATCH** (semver)

- **MAJOR** (0.x.0) : Changements incompatibles, refonte majeure
- **MINOR** (x.X.0) : Nouvelles fonctionnalités, compatibles
- **PATCH** (x.x.X) : Corrections de bugs, petites améliorations

### Exemples
- `0.7.0` → `0.7.1` : Correction bug badges
- `0.7.0` → `0.8.0` : Ajout fonctionnalité mode multijoueur
- `0.7.0` → `1.0.0` : Release production complète

---

## 🔍 Vérifier la Version

### Dans le code
```typescript
import { APP_VERSION } from '@/constants/version';
console.log(APP_VERSION); // "0.7.0"
```

### Dans l'application
- Menu → Footer → "v0.7.0"

### En ligne de commande
```bash
npm run dev
# ou
node -p "require('./package.json').version"
```

---

## 📦 Checklist Complète de Release

- [ ] Modifier `package.json` → version
- [ ] Mettre à jour `CHANGELOG.md`
- [ ] Optionnel : Mettre à jour `README.md` (section version)
- [ ] `npm run type-check` → ✅
- [ ] `npm run build` → ✅
- [ ] Git commit + tag
- [ ] Git push origin main + tag
- [ ] Vérifier déploiement Vercel
- [ ] Tester la version en production

---

## 🎓 Résumé pour l'IA

**Action requise pour changer de version :**
1. Modifier `package.json` → "version": "X.Y.Z"
2. Ajouter entrée dans `CHANGELOG.md`
3. Build, commit, tag, push

**Ne JAMAIS modifier manuellement :**
- `src/constants/version.ts`
- La constante `APP_VERSION` dans AppMenu.tsx
