# EctoMass — App de prise de masse (ectomorphe)

Application web PWA (installable, hors-ligne) pour la prise de masse en musculation, adaptée à un profil ectomorphe.

## Fonctionnalités
- **Profil & calories** : calcul Mifflin-St Jeor → TDEE → surplus, macros (protéines 2 g/kg), onboarding au 1er lancement.
- **Entraînement** : mésocycle 12 semaines full-body 3×/sem, surcharge progressive adaptative, timer de repos, séries d'échauffement, PR & 1RM estimé, volume par muscle, composition de séance personnalisable (échange/ajout/création d'exercices), calculateur de disques.
- **Nutrition** : journal groupé par repas avec portions au gramme éditables, base d'aliments + aliments perso/récents, générateur de menus jour ET semaine (cohérents), liste de courses éditable et copiable, suivi hydratation.
- **Progression** : courbe de poids avec tendance lissée, graphes 1RM/volume, historique, notes de séance et RIR ressenti.
- **Sauvegarde & synchro** : export/import JSON + synchronisation multi-appareils via un gist GitHub privé (voir ci-dessous).
- Hors-ligne par défaut (données dans le navigateur), responsive mobile + ordinateur, accessible au clavier.

## Synchronisation entre appareils

Les données vivent dans le navigateur. Pour les retrouver sur téléphone **et** ordinateur — et ne rien perdre si un cache est vidé — l'app peut les répliquer dans un **gist GitHub secret** nommé `ectomass-sync`.

1. github.com → Settings → Developer settings → Personal access tokens → **Tokens (classic)**
2. Generate new token → nomme-le **« EctoMass sync »** → coche **uniquement** la portée `gist` → expiration longue
3. Dans EctoMass : Profil → ☁️ Synchronisation → colle le token → **Connecter**
4. Colle **ce même token** sur chacun de tes appareils : l'app retrouve le gist toute seule

**Un token dédié par application.** Si tu utilises déjà la synchro sur un autre projet, crée un token distinct : la portée `gist` donne accès à *tous* tes gists, donc un token unique partagé signifierait qu'une révocation casse tout d'un coup. Chaque app repère son propre gist par sa description (`ectomass-sync`), il n'y a donc aucune collision entre elles.

Le token est stocké à part (`ectomass_sync`) et ne part **jamais** dans le gist ni dans les exports. Il ne donne accès qu'aux gists, jamais aux dépôts.

La fusion est faite entrée par entrée : le journal alimentaire, les séances et les pesées sont réconciliés **par jour**, avec horodatage. Loguer un repas sur le téléphone et une séance sur l'ordinateur le même jour ne fait rien perdre. Les suppressions sont propagées (tombstones) et une section vide côté cloud n'écrase jamais des données locales.

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
