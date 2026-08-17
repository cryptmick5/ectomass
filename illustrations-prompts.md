# Recette des illustrations générées

Les vignettes livrées dans `index.html` sont des silhouettes SVG dessinées à la
main (voir le bloc `ART`). Ce fichier tient la recette pour les remplacer par des
rendus 3D générés, le jour où l'environnement laisse passer le générateur.

## Pourquoi ce fichier

Trois choses rendent une série de 35 images utilisable plutôt que disparate :
le **même personnage**, le **même fond** et le **même cadrage**. Elles tiennent
au préfixe de style et à la graine, tous deux figés ci-dessous. Les régénérer
sans ça donne 35 athlètes différents sur 35 fonds différents.

## Réglages

- Modèle : `Z-Image-Turbo` (outil MCP `gr1_z_image_turbo_generate`)
- Graine : **11**, `random_seed: false` — c'est elle qui tient le personnage
- Étapes : **9**
- Résolution : **1024x1024 ( 1:1 )**, à redimensionner ensuite en WebP 256×256
  (affichage réel : 42 px en ligne de séance, 88 px en fiche ouverte)

## Accès réseau

La génération passe par le serveur MCP et fonctionne depuis n'importe quelle
session. **Récupérer le fichier** demande en revanche un accès sortant vers
`*.hf.space` (le rendu est servi par `mcp-tools-z-image-turbo.hf.space`) et
`huggingface.co`. Sans lui, `curl` reçoit un `CONNECT tunnel failed, response
403` et rien ne peut être écrit dans le dépôt.

## Préfixe de style (identique pour les 35)

> Highly detailed 3D character render, realistic human proportions and anatomy,
> lean muscular male athlete with short dark hair, defined abs, shirtless, black
> athletic shorts, dark grey sneakers, **{POSE}**, dark charcoal grey seamless
> studio backdrop, soft directional studio lighting, subtle rim light,
> photorealistic materials, octane render, isolated subject, no text, no logo

## Poses, par identifiant d'exercice

Chaque pose reprend la position déjà figée par la silhouette SVG : celle qui
distingue l'exercice de ses voisins, pas une position neutre.

### Bas du corps

| id | `{POSE}` |
| --- | --- |
| `squat` | performing a barbell back squat at the bottom position, thighs parallel to the floor, chrome barbell loaded with black plates across his upper back, torso leaning slightly forward, side view, full body |
| `frontsquat` | performing a goblet squat at the bottom position, holding a single black dumbbell vertically against his chest, torso upright, knees forward, side view, full body |
| `sdt` | at the start of a barbell deadlift, hips high, flat back, shins touching a chrome barbell loaded with black plates resting on the floor, arms hanging straight, side view, full body |
| `rdl` | performing a romanian deadlift, knees slightly bent, hips pushed far back, flat back, barbell lowered along his shins, side view, full body |
| `hipthrust` | performing a barbell hip thrust, upper back resting on a flat bench, hips locked out level with knees, shins vertical, barbell across his hips, side view, full body |
| `presse` | seated on a 45 degree leg press machine, back flat against the inclined pad, legs pressing the loaded footplate up and away, side view, full body |
| `fentes` | mid walking lunge, long stride, rear knee low near the floor, torso upright, holding a black dumbbell in each hand at his sides, side view, full body |
| `fenteshalt` | in the bottom of a dumbbell lunge, rear knee close to the floor, front shin vertical, torso upright, a black dumbbell in each hand, side view, full body |
| `splitsquat` | in the bottom of a split squat, feet planted in a fixed staggered stance, rear knee low, torso upright, a black dumbbell in each hand, side view, full body |
| `bulgare` | performing a bulgarian split squat, rear foot resting on a flat bench behind him, front thigh parallel to the floor, torso upright, a black dumbbell in each hand, side view, full body |
| `stepup` | performing a dumbbell step up, one foot planted flat on a low black plyo box, front thigh near horizontal, torso upright, a black dumbbell in each hand, side view, full body |
| `legcurl` | lying face down on a lying leg curl machine, hips flat on the pad, knees bent bringing the ankle roller up toward his glutes, side view, full body |
| `mollets` | performing a standing calf raise, balls of both feet on the edge of a low step, heels lifted high, holding a black dumbbell in one hand, side view, full body |
| `molletsassis` | performing a seated calf raise, knees bent under a loaded thigh pad, toes on a block, heels lifted, side view, full body |

### Pousser

| id | `{POSE}` |
| --- | --- |
| `dc` | performing a barbell bench press on a flat bench, arms extended pressing the barbell up, feet flat on the floor, three-quarter side view, full body |
| `dchalt` | performing a dumbbell bench press on a flat bench, both arms extended pressing two black dumbbells up, three-quarter side view, full body |
| `dcinc` | performing an incline dumbbell press on a 30 degree incline bench, dumbbells at upper chest level, three-quarter side view, full body |
| `floorpress` | performing a dumbbell floor press lying on the floor, knees bent, upper arms resting on the floor, dumbbells above his chest, side view, full body |
| `ohp` | performing a standing barbell overhead press at lockout, barbell held straight overhead, body braced, front view, full body |
| `dvepaules` | performing a seated dumbbell shoulder press on an upright bench, dumbbells pressed overhead, side view, full body |
| `dips` | performing dips on parallel bars, body between the two bars, elbows bent to ninety degrees, knees bent and feet crossed behind, side view, full body |
| `ecarte` | performing a dumbbell fly on a flat bench, arms opened wide out to the sides in an arc, elbows slightly bent, three-quarter view, full body |
| `triceps` | performing a cable triceps pushdown facing a high pulley, elbows pinned to his sides, arms extending down onto a straight bar attachment, side view, full body |
| `tricepsnuque` | performing a standing overhead triceps extension, both hands holding one black dumbbell behind his head, elbows high and close together, side view, full body |

### Tirer

| id | `{POSE}` |
| --- | --- |
| `traction` | performing a pull up at the top position, chin level with the bar, wide overhand grip on a pull up bar, knees bent and feet crossed behind, front view, full body |
| `tiragenut` | performing a neutral grip lat pulldown seated at a cable machine, thighs under the pad, pulling the handle down to his upper chest, side view, full body |
| `rowbarre` | performing a barbell row, torso bent about 45 degrees, flat back, pulling the barbell to his lower abdomen, side view, full body |
| `rowhalt` | performing a single arm dumbbell row, one knee and one hand on a flat bench, back parallel to the floor, pulling a dumbbell up to his hip with a high elbow, side view, full body |
| `oiseau` | performing a bent over dumbbell rear delt fly, torso bent forward, arms opened out to the sides to shoulder height, elbows slightly bent, three-quarter view, full body |
| `elevlat` | performing dumbbell lateral raises, both arms raised out to the sides only as high as his shoulders, horizontal, elbows slightly bent, front view, full body |
| `curl` | performing dumbbell biceps curls, one arm curled up to the shoulder and the other hanging fully extended, palms facing up, front view, full body |
| `marteau` | performing hammer curls, one arm curled up and the other hanging extended, neutral grip with palms facing each other, front view, full body |
| `curlincline` | performing incline dumbbell curls seated on a 45 degree incline bench, arms hanging straight back beside the backrest at full stretch, side view, full body |

### Gainage

| id | `{POSE}` |
| --- | --- |
| `gainage` | holding a forearm plank, body in one straight line from shoulders to heels, elbows under the shoulders, side view, full body |
| `crunch` | performing a lying leg raise, back flat on the floor, legs raised straight toward the ceiling, arms along his sides, side view, full body |

## Intégration prévue

Le fichier de repli reste le SVG : un exercice créé par l'utilisateur n'aura
jamais de rendu généré, et une image manquante ne doit pas laisser un trou.
`exoArt()` sert donc l'image quand elle existe et la silhouette sinon, les 35
fichiers rejoignent `ASSETS` dans `service-worker.js` pour rester hors-ligne, et
le numéro de cache est incrémenté.
