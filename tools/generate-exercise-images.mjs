#!/usr/bin/env node
/* Génère une photo par exercice dans exercices/<id>.webp.
 *
 * Pourquoi un script à lancer soi-même plutôt qu'un dossier d'images versionné
 * une fois pour toutes : les prompts se retouchent (un exercice mal rendu se
 * régénère seul avec --only), et la source du visuel reste lisible dans le
 * dépôt au lieu d'être un binaire tombé du ciel.
 *
 *   npm i @gradio/client sharp
 *   node tools/generate-exercise-images.mjs              # tout ce qui manque
 *   node tools/generate-exercise-images.mjs --force      # tout, même l'existant
 *   node tools/generate-exercise-images.mjs --only bulgare,splitsquat
 *   node tools/generate-exercise-images.mjs --check      # hors-ligne : cohérence prompts / bibliothèque
 *
 * Le modèle (Z-Image-Turbo, Space public Hugging Face) ne demande aucune clé.
 * Il se trompe régulièrement sur les mouvements unilatéraux et les machines :
 * REGARDE chaque image produite avant de commiter. Un exercice sans fichier
 * retombe automatiquement sur la silhouette vectorielle de l'app, donc mieux
 * vaut supprimer une image douteuse que la garder.
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOSSIER = join(RACINE, 'exercices');
const SPACE = process.env.ECTOMASS_SPACE || 'mcp-tools/Z-Image-Turbo';
const TAILLE = 512;          // suffisant : la plus grande vignette fait 88 px CSS
const QUALITE = 74;

/* Style commun : c'est lui qui fait tenir les 35 images ensemble. Même athlète,
   même fond, même lumière — sinon la liste ressemble à un collage. */
const STYLE = 'photorealistic 3D render, single athletic male model with short brown hair,'
  + ' shirtless, black shorts, black training shoes, clean dark charcoal studio background,'
  + ' warm orange rim lighting, full body centred in frame, sharp anatomical detail,'
  + ' no text, no watermark, no logo';

/* Chaque prompt décrit la mécanique, pas l'ambiance : c'est la seule chose qui
   empêche le modèle de dessiner « une pose de salle » générique. */
const PROMPTS = {
  squat: 'barbell back squat at the bottom position, loaded barbell resting across the upper back and rear shoulders, hips lowered until the thighs are parallel to the floor, torso leaning slightly forward, feet shoulder width apart, side view',
  frontsquat: 'goblet squat, holding one single dumbbell vertically against the chest with both hands, deep squat bottom position, torso completely upright, side view',
  sdt: 'conventional barbell deadlift at the start position, loaded barbell resting on the floor with large plates, hips higher than the knees, flat back, arms hanging straight, hands gripping the bar just outside the knees, side view',
  rdl: 'romanian deadlift mid position, standing with knees only slightly bent, hips pushed far back, torso hinged forward, barbell hanging at mid shin height close to the legs, flat back, side view',
  hipthrust: 'barbell hip thrust at the top position, upper back resting against a flat bench, loaded barbell across the hips, hips fully extended so shoulders hips and knees are level, shins vertical, feet flat on the floor, side view',
  fenteshalt: 'forward lunge, one dumbbell hanging in each hand at the sides, front knee bent to ninety degrees, rear knee lowered close to the floor, torso upright, side view',
  fentes: 'walking lunge stepping forward, one dumbbell hanging in each hand at the sides, front knee bent to ninety degrees, rear knee lowered close to the floor, torso upright, side view',
  splitsquat: 'static split squat, feet planted in a long split stance both on the floor, rear knee lowered toward the floor, front thigh parallel to the floor, one dumbbell hanging in each hand at the sides, torso upright, side view',
  bulgare: 'bulgarian split squat, the REAR foot is resting on top of a flat bench behind the athlete with the shoelaces facing down, the front leg is bent to ninety degrees with the thigh parallel to the floor, one dumbbell hanging in each hand at the sides, torso upright, side view',
  stepup: 'step up onto a plyo box, one entire foot planted flat on top of the box with that knee bent, the other foot still on the floor, one dumbbell hanging in each hand at the sides, torso upright, side view',
  presse: 'forty five degree leg press machine, the athlete is seated in the machine with the back against the padded backrest, both feet flat on the angled platform, knees bent to ninety degrees, loaded weight plates on the sled, side view of the machine',
  legcurl: 'lying leg curl machine, the athlete is lying face down on the padded machine bench, ankles hooked under the roller pad, knees flexed bringing the roller toward the glutes, side view',
  mollets: 'standing calf raise, only the balls of the feet are on the edge of a step with the heels hanging off behind, the athlete is raised high on the toes at full contraction, holding a dumbbell in one hand, side view',
  molletsassis: 'seated calf raise machine, the athlete is seated with knees bent ninety degrees under the weighted thigh pad, balls of the feet on the foot block, heels raised at full contraction, side view',
  dc: 'flat barbell bench press, lying on a flat bench with the feet flat on the floor, arms extended pressing the loaded barbell above the chest, side view',
  dchalt: 'flat dumbbell bench press, lying on a flat bench, one dumbbell in each hand pressed above the chest, elbows at forty five degrees, side view',
  dcinc: 'incline dumbbell bench press on a bench set at thirty degrees, lying back against the incline, dumbbells pressed above the upper chest, side view',
  floorpress: 'dumbbell floor press, lying on the floor with knees bent and feet flat, the back of the upper arms resting on the floor, one dumbbell above each shoulder, side view',
  ohp: 'standing barbell overhead press, standing upright, barbell locked out overhead with straight arms, core braced, side view',
  dvepaules: 'seated dumbbell shoulder press on a bench with a vertical backrest, one dumbbell in each hand pressed overhead, side view',
  dips: 'parallel bar dips, the athlete is supported on two parallel bars, elbows bent to ninety degrees, body lowered between the bars, legs bent behind, side view',
  ecarte: 'dumbbell chest fly on a flat bench, lying on the bench, arms opened wide out to both sides with a slight fixed elbow bend, dumbbells at chest level in the stretched position, three quarter front view',
  triceps: 'cable triceps pushdown, standing facing a high cable pulley machine, elbows pinned to the sides, straight bar attachment pushed down, side view of the machine',
  tricepsnuque: 'overhead triceps extension, standing, holding one single dumbbell with both hands overhead, elbows high and close to the head, dumbbell lowered behind the head, side view',
  traction: 'pull up at the top position, hanging from a fixed horizontal bar with an overhand grip, chin above the bar, legs bent behind, side view',
  tiragenut: 'seated lat pulldown machine using a neutral grip handle with the palms facing each other, thighs secured under the pads, torso leaning back slightly, handle pulled down to the upper chest, side view',
  rowbarre: 'barbell bent over row, torso hinged forward about forty five degrees with a flat back, barbell pulled to the lower abdomen, elbows close to the body, side view',
  rowhalt: 'single arm dumbbell row, one knee and one hand supported on a flat bench, back flat and parallel to the floor, the free hand pulling a dumbbell up to the hip, side view',
  oiseau: 'bent over reverse dumbbell fly, torso hinged forward almost parallel to the floor, both arms raised out to the sides with a slight elbow bend, one dumbbell in each hand, three quarter front view',
  elevlat: 'dumbbell lateral raise, standing, both arms raised straight out to the sides at shoulder height, one dumbbell in each hand, front view',
  curl: 'standing dumbbell biceps curl, one arm curled up with the dumbbell at shoulder height, the other arm hanging straight, front view',
  marteau: 'standing hammer curl with a neutral grip, palms facing each other, one dumbbell curled up to shoulder height, front view',
  curlincline: 'incline dumbbell curl, seated leaning back on a bench set at forty five degrees, both arms hanging back behind the torso in full stretch, one dumbbell in each hand, side view',
  gainage: 'forearm plank, body in a perfectly straight line from head to heels, forearms flat on the floor with the elbows under the shoulders, toes on the floor, side view',
  crunch: 'abdominal crunch, lying on the floor with knees bent and feet flat, shoulders and upper back lifted off the floor, hands beside the head, side view'
};

/* Graine fixe par exercice : relancer le script ne change pas les images déjà
   validées, et --only bulgare reproduit exactement la même base. */
const graine = (id) => [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % 1e6;

const args = process.argv.slice(2);
const aFlag = (f) => args.includes(f);
const valeur = (f) => { const i = args.indexOf(f); return i > -1 ? args[i + 1] : null; };

/* Vérifie que la table des prompts colle à la bibliothèque de l'app. Tourne
   hors-ligne : c'est ce qui empêche un exercice ajouté plus tard de passer à
   travers les mailles. */
async function verifier() {
  const html = await readFile(join(RACINE, 'index.html'), 'utf8');
  const bloc = html.slice(html.indexOf('const EX={'), html.indexOf('\n};', html.indexOf('const EX={')));
  const exos = [...bloc.matchAll(/^\s{2}([a-z0-9_]+):\{/gm)].map((m) => m[1]);
  const manquants = exos.filter((id) => !PROMPTS[id]);
  const orphelins = Object.keys(PROMPTS).filter((id) => !exos.includes(id));
  console.log(`${exos.length} exercices dans index.html, ${Object.keys(PROMPTS).length} prompts.`);
  if (manquants.length) console.log('SANS PROMPT (resteront en silhouette) :', manquants.join(', '));
  if (orphelins.length) console.log('PROMPT ORPHELIN (exercice supprimé ?) :', orphelins.join(', '));
  if (!manquants.length && !orphelins.length) console.log('Tout concorde.');
  return manquants.length + orphelins.length === 0;
}

async function existe(p) { try { await access(p); return true; } catch { return false; } }

async function generer() {
  const { Client } = await import('@gradio/client');
  const sharp = (await import('sharp')).default;
  await mkdir(DOSSIER, { recursive: true });

  const seulement = valeur('--only');
  let ids = Object.keys(PROMPTS);
  if (seulement) {
    ids = seulement.split(',').map((s) => s.trim());
    const inconnus = ids.filter((id) => !PROMPTS[id]);
    if (inconnus.length) { console.error('Exercice inconnu :', inconnus.join(', ')); process.exit(1); }
  }

  console.log(`Connexion à ${SPACE}…`);
  const app = await Client.connect(SPACE);
  let faits = 0, sautes = 0, rates = 0;

  for (const id of ids) {
    const sortie = join(DOSSIER, `${id}.webp`);
    if (!aFlag('--force') && await existe(sortie)) { sautes++; continue; }
    process.stdout.write(`${id}… `);
    try {
      const res = await app.predict('/generate', {
        prompt: `Fitness exercise instruction photo: ${PROMPTS[id]}. ${STYLE}`,
        seed: graine(id),
        random_seed: false,
        resolution: '1024x1024 ( 1:1 )',
        shift: 3,
        steps: 8
      });
      const url = res.data?.[0]?.[0]?.image?.url || res.data?.[0]?.[0]?.url;
      if (!url) throw new Error('réponse sans image');
      const brut = Buffer.from(await (await fetch(url)).arrayBuffer());
      await sharp(brut).resize(TAILLE, TAILLE, { fit: 'cover' })
        .webp({ quality: QUALITE, effort: 6 }).toFile(sortie);
      faits++;
      console.log('ok');
    } catch (e) {
      rates++;
      console.log('ÉCHEC —', e.message);
    }
  }
  console.log(`\n${faits} générées, ${sautes} déjà présentes, ${rates} en échec.`);
  console.log('Ouvre exercices/ et supprime toute image qui ne montre pas le bon geste :');
  console.log("l'app repassera d'elle-même sur la silhouette vectorielle.");
}

if (aFlag('--check')) { process.exit(await verifier() ? 0 : 1); }
else { await verifier(); await generer(); }
