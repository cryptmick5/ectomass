# EctoMass — App de prise de masse (ectomorphe)

Application web PWA (installable, hors-ligne) pour la prise de masse en musculation, adaptée à un profil ectomorphe.

## Fonctionnalités
- **Profil & calories** : calcul Mifflin-St Jeor → TDEE → surplus, macros (protéines 2 g/kg), onboarding au 1er lancement.
- **Entraînement** : mésocycle 12 semaines full-body 3×/sem, surcharge progressive adaptative, timer de repos, séries d'échauffement, PR & 1RM estimé, volume par muscle, composition de séance personnalisable (échange/ajout/création d'exercices), calculateur de disques.
- **Nutrition** : journal groupé par repas avec portions au gramme éditables, base d'aliments + aliments perso/récents, générateur de menus jour ET semaine (cohérents), liste de courses éditable et copiable, suivi hydratation.
- **Progression** : courbe de poids avec tendance lissée, graphes 1RM/volume, historique.
- 100 % local (données dans le navigateur), responsive mobile + ordinateur.

## Fichiers
- `index.html` — l'application complète
- `manifest.webmanifest`, `service-worker.js` — support PWA (installable + hors-ligne)
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — icônes
- `.nojekyll` — désactive le traitement Jekyll sur GitHub Pages

## Déploiement (GitHub Pages)
1. Créer un dépôt public (ex. `ectomass`) et y déposer **tous** ces fichiers à la racine.
2. Settings → Pages → *Build and deployment* → Source : **Deploy from a branch** → Branch : `main` / `/ (root)` → Save.
3. L'app est en ligne à `https://<utilisateur>.github.io/ectomass/` (~1 min).

Sur mobile : ouvrir cette URL → menu du navigateur → « Ajouter à l'écran d'accueil » pour l'installer.

## Développement local
Servir le dossier en HTTP (le service worker exige http/https, pas `file://`) :
```
python -m http.server 8000
```
puis ouvrir http://localhost:8000
