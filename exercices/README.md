# Photos d'exercices

Un fichier par exercice, nommé avec la clé de l'exercice dans `EX` (index.html) :
`squat.webp`, `dc.webp`, `bulgare.webp`…

Ces images sont **facultatives**. Quand le fichier n'existe pas, l'app affiche la
silhouette vectorielle dessinée dans `index.html` (objet `ART`) — jamais d'image
cassée, et l'application reste complète sans un seul fichier ici.

## Produire les images

```
npm i @gradio/client sharp
node tools/generate-exercise-images.mjs
```

Puis **regarde chaque image**. Le modèle rend correctement les mouvements
classiques (barre, banc, haltères) mais se trompe régulièrement de geste sur les
mouvements unilatéraux (squat bulgare, split squat, montées sur banc) et sur les
machines (presse, leg curl, poulies) : il produit une pose de salle plausible
mais fausse. Sur une app de technique, une image fausse est pire que pas d'image.

**Supprime toute image qui ne montre pas exactement le mouvement décrit** dans la
fiche. Ça ne coûte rien : l'app repasse alors sur l'illustration vectorielle en
deux temps (départ → fin), qui est juste et qui montre le mouvement — là où la
photo ne montre qu'un instant. Aucune photo n'est meilleure qu'une photo fausse.

Pour retenter un exercice précis (nouvelle graine à chaque essai) :

```
node tools/generate-exercise-images.mjs --only bulgare,splitsquat --force
```

## Format

512×512, WebP qualité 74 (~30-60 ko pièce). Le script s'en charge. Les photos
sont mises en cache par le service worker au premier affichage, donc disponibles
hors-ligne ensuite.
