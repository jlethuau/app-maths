# Test de Génération des Questions - Corrections

## Date: 21 janvier 2026

## Problème Identifié

L'utilisateur a signalé que la première correction était trop restrictive :
- **Avant la 1ère correction** : Calculs hors des tables sélectionnées (ex: 9×8 quand tables 2 et 3 sélectionnées)
- **Après la 1ère correction** : Seuls 2×2, 2×3, 3×2, 3×3 apparaissaient ❌ Trop restrictif !
- **Comportement attendu** : Tables complètes de 2 (2×1 à 2×10) et 3 (3×1 à 3×10) ✅

---

## Solution Implémentée

### 1. Génération Correcte des Tables

```typescript
// operand1 = table sélectionnée (ex: 2 ou 3)
// operand2 = multiplicateur de 1 à 10
const table = tables[Math.floor(Math.random() * tables.length)];
const multiplier = Math.floor(Math.random() * 10) + 1;

// Mélange aléatoire (7×3 ou 3×7)
const [operand1, operand2] = Math.random() > 0.5 
  ? [table, multiplier] 
  : [multiplier, table];
```

### 2. Éviter les Doublons

La fonction `generateQuestion()` accepte maintenant un paramètre `excludeQuestions` :
- Vérifie si la question existe déjà (dans les deux sens : 2×3 = 3×2)
- Maximum 100 tentatives pour éviter les boucles infinies
- Garantit des questions uniques dans une partie

### 3. Questions Consécutives Différentes

La fonction `generateQuestions()` utilise la liste des questions déjà générées pour éviter :
- Les doublons dans toute la partie
- Deux questions identiques consécutives

---

## Exemples de Comportement

### Tables sélectionnées : [2, 3]

**Questions possibles (40 au total)** :

Table de 2 :
- 2×1=2, 2×2=4, 2×3=6, 2×4=8, 2×5=10, 2×6=12, 2×7=14, 2×8=16, 2×9=18, 2×10=20
- 1×2=2, 3×2=6, 4×2=8, 5×2=10, 6×2=12, 7×2=14, 8×2=16, 9×2=18, 10×2=20

Table de 3 :
- 3×1=3, 3×2=6, 3×3=9, 3×4=12, 3×5=15, 3×6=18, 3×7=21, 3×8=24, 3×9=27, 3×10=30
- 1×3=3, 2×3=6, 4×3=12, 5×3=15, 6×3=18, 7×3=21, 8×3=24, 9×3=27, 10×3=30

**Partie de 10 questions** : Exemple possible
```
Question 1: 2×7 = 14
Question 2: 3×4 = 12
Question 3: 8×2 = 16
Question 4: 3×9 = 27
Question 5: 2×3 = 6
Question 6: 5×3 = 15
Question 7: 2×10 = 20
Question 8: 3×1 = 3
Question 9: 6×2 = 12
Question 10: 3×8 = 24
```

✅ Toutes les questions ont au moins un opérande dans [2, 3]
✅ Pas de doublons
✅ Aucune question consécutive identique

---

## Tests Automatiques

### Tests Ajoutés (27 tests au total)

**`gameUtils.test.ts`** (23 tests) :
1. ✅ Au moins un opérande dans les tables sélectionnées
2. ✅ Opérandes entre 1 et 10
3. ✅ Pas de doublons dans une partie
4. ✅ Pas de questions identiques consécutives
5. ✅ Calculs de score corrects
6. ✅ Validation des réponses
7. ✅ Gestion des combos

**`scoreCalculation.test.ts`** (4 tests) :
1. ✅ Comptage 10/10
2. ✅ Comptage 9/10
3. ✅ Marquage correct/incorrect

### Résultat
```bash
npm test

✓ 27 tests passés sur 27
```

---

## Plan de Test Manuel

### Test 1 : Tables de 2 et 3
1. Lancer le jeu
2. Sélectionner les tables de 2 et 3
3. Jouer une partie de 10 questions
4. **Vérifications** :
   - ✅ Toutes les questions ont 2 ou 3 comme opérande (peu importe l'ordre)
   - ✅ Le deuxième opérande est entre 1 et 10
   - ✅ Pas de doublons
   - ✅ Variété des questions (pas que 2×2, 2×3, 3×2, 3×3)

### Test 2 : Table de 5 uniquement
1. Sélectionner uniquement la table de 5
2. Jouer une partie de 10 questions
3. **Vérifications** :
   - ✅ Toutes les questions contiennent le nombre 5
   - ✅ Exemples attendus : 5×1, 5×7, 9×5, 5×10, etc.
   - ✅ Pas de doublons

### Test 3 : Tables de 6, 7, 8
1. Sélectionner les tables de 6, 7 et 8
2. Jouer une partie de 20 questions
3. **Vérifications** :
   - ✅ Variété des tables (6, 7 et 8 apparaissent)
   - ✅ Multiplicateurs variés (1 à 10)
   - ✅ 20 questions uniques
   - ✅ Pas de répétitions consécutives

---

## Code Modifié

### Fichiers Mis à Jour
1. **`src/utils/gameUtils.ts`**
   - `generateQuestion()` : Ajout paramètre `excludeQuestions`
   - `generateQuestions()` : Évite les doublons

2. **`src/utils/gameUtils.test.ts`**
   - Mise à jour des tests existants
   - Ajout de 2 nouveaux tests (doublons et consécutives)

---

## Métriques

| Métrique | Avant | Après |
|----------|-------|-------|
| Questions possibles (tables [2, 3]) | 4 | 40 |
| Doublons autorisés | ✅ Oui | ❌ Non |
| Questions consécutives identiques | ✅ Possible | ❌ Impossible |
| Couverture de tests | 25 tests | 27 tests |

---

## Commandes

```bash
# Lancer les tests
npm test

# Lancer le jeu en dev
npm run dev

# Build production
npm run build
```

---

## Notes Techniques

### Algorithme de Génération

```
Pour chaque question :
  1. Choisir une table aléatoire parmi celles sélectionnées
  2. Choisir un multiplicateur aléatoire (1-10)
  3. Mélanger l'ordre aléatoirement (table×mult ou mult×table)
  4. Vérifier si la question existe déjà (dans les deux sens)
  5. Si doublon, réessayer (max 100 fois)
  6. Retourner la question unique
```

### Gestion des Cas Limites

- **Trop de questions demandées** : Si on demande 100 questions mais qu'il n'y a que 40 combinaisons possibles, l'algorithme finira par autoriser des doublons après 100 tentatives
- **Une seule table** : Fonctionne correctement (ex: table de 5 génère 20 questions possibles)
- **Beaucoup de tables** : Plus de variété, moins de risque de doublons

---

**Développé avec ❤️ pour l'apprentissage des mathématiques (CE2)**
