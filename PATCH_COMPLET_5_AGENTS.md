# EctoMass — Patch Complet 5 Agents

**Fichier :** `index.html`
**SHA original :** `cf5dd6d13500256bacd12d8fafe4778ad796edb6`
**Branche :** `patch-agents-1-to-5`

---

## Instructions d'application

### Étape 1 : Rcuprer le fichier original

```bash
git clone https://github.com/cryptmick5/ectomass.git
cd ectomass
git checkout patch-agents-1-to-5
```

### Étape 2 : Appliquer les patches

Ouvre `index.html` et applique les modifications d é crites dans ce fichier.

---

## Agent 1 — Steppers +/−

### CSS (dans `<style>`, aprè·»s les autres styles)

```css
/* ---- Steppers +/- pour charge & reps (Agent 1) ---- */
.stepper-wrap{display:flex;align-items:center;gap:0;position:relative}
.stepper-wrap input{text-align:center;border-radius:0 !important;border-left:none!important;border-right:none!important;flex:1;min-width:0;padding-left:2px!important;padding-right:2px!important}
.stepper-wrap .step-btn{width:36px;height:44px;min-height:44px;min-width:36px;background:var(--bg2);border:1px solid var(--line2);color:var(--muted);font-size:18px;font-weight:700;display:grid;place-items:center;transition:background .18s,color .18s,transform .18s var(--spring);flex-shrink:0}
.stepper-wrap .step-btn:first-child{border-radius:11px 0 0 11px}
.stepper-wrap .step-btn:last-child{border-radius:0 11px 11px 0}
.stepper-wrap .step-btn:active{background:var(--card3);color:var(--txt);transform:scale(.9)}
@media(hover:hover){.stepper-wrap .step-btn:hover{background:var(--card3);color:var(--txt)}}
```

### JavaScript (dans `<script>`, avant `toggleDone`)

```js
function stepVal(inp,delta,max){
  const cur=parseFloat(inp.value)||0;
  const next=Math.max(0,Math.min(max||9999,Math.round((cur+delta)*100)/100));
  inp.value=next;inp.dispatchEvent(new Event('input',{bubbles:true}));inp.focus();}
```

---

## Agent 2 — Macros restantes

### HTML (dans `#food-log-view`, avant `<button id="add-food-btn">`)

```html
<div id="food-macro-summary" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0 0 10px;padding:10px 14px;background:linear-gradient(135deg,rgba(255,107,53,.10),rgba(255,107,53,.03));border:1px solid rgba(255,107,53,.22);border-radius:13px">
  <span style="font-size:12px;font-weight:750;color:var(--accent2)">Il reste :</span>
  <span id="food-remain-kcal" class="pill k" style="font-size:12px">— kcal</span>
  <span id="food-remain-p" class="pill p" style="font-size:12px">P —g</span>
  <span id="food-remain-c" class="pill c" style="font-size:12px">G —g</span>
  <span id="food-remain-f" class="pill f" style="font-size:12px">L —g</span>
</div>
```

---

## Agent 3 — Empty States

### CSS

```css
/* ---- Empty states graphiques Progression (Agent 3) ---- */
.empty-chart{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 16px;color:var(--muted);gap:8px;min-height:140px}
.empty-chart .ec-icon{font-size:36px;margin-bottom:4px;opacity:.7}
.empty-chart b{color:var(--txt);font-size:14px}
.empty-chart span{font-size:12px;max-width:28ch;line-height:1.5}
.empty-chart .ec-hint{margin-top:6px;font-size:11px;color:var(--muted2);background:var(--card3);padding:5px 10px;border-radius:20px;display:inline-block}
```

---

## Agent 4 — KPI Dashboard

### CSS

```css
/* ---- Dashboard progression enrichi (Agent 4) ---- */
.kpi-row{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0}
.kpi-chip{flex:1;min-width:120px;background:var(--card2);border:1px solid var(--line);border-radius:13px;padding:10px 14px;display:flex;flex-direction:column;gap:3px}
.kpi-chip .kv{font-size:22px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--txt)}
.kpi-chip .kl{font-size:11px;color:var(--muted2);font-weight:600;text-transform:uppercase;letter-spacing:.04em}
.kpi-chip .kt{font-size:11px;color:var(--accent2)}
.kpi-chip.good{border-color:rgba(76,210,120,.30);background:rgba(76,210,120,.06)}
.kpi-chip.warn{border-color:rgba(255,200,50,.30);background:rgba(255,200,50,.06)}
.kpi-chip.bad{border-color:rgba(255,90,82,.30);background:rgba(255,90,82,.06)}
```

### HTML

```html
<div id="home-kpi" style="margin:0 14px 4px"></div>
```

---

## Agent 5 — Ré ·sumé·» Séance

### CSS

```css
/* ---- Résumé post-sé·»ance (Agent 5) ---- */
#session-summary-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);z-index:9999;display:none;align-items:flex-end;justify-content:center}
#session-summary-modal.open{display:flex}
#session-summary-inner{background:var(--card);border-radius:22px 22px 0 0;padding:24px 20px 36px;width:100%;max-width:480px;max-height:86dvh;overflow-y:auto;animation:slideUp .35s var(--spring)}
#session-summary-inner h2{margin-bottom:4px;font-size:22px}
.summary-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}
.summary-row:last-child{border:none}
.summary-row .sv{font-size:18px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--accent)}
.summary-pr-badge{background:rgba(255,215,0,.15);border:1px solid rgba(255,215,0,.35);border-radius:20px;padding:2px 10px;font-size:11px;font-weight:700;color:#ffcc00}
```

### HTML

```html
<div id="session-summary-modal" role="dialog" aria-modal="true" aria-labelledby="summary-title">
  <div id="session-summary-inner">
    <h2 id="summary-title">🏆 Séance termin é e !</h2>
    <p class="small muted" id="summary-subtitle" style="margin-bottom:14px"></p>
    <div id="summary-stats"></div>
    <div id="summary-prs" style="margin:12px 0"></div>
    <button class="btn" style="width:100%;margin-top:14px" onclick="closeSummary()">Retour au tableau de bord</button>
  </div>
</div>
```

---

## Validation

Teste chaque agent aprè·»s application :
- ✅ Steppers +/− (Entraî·»nement)
- ✅ Macros restantes (Nutrition)
- ✅ Empty states (Progression)
- ✅ KPI chips (Accueil)
- ✅ Ré ·sumé·» séance (valider une séance)

---

**Fichiers de ré ·f é rence :**
- `WORKFLOW_MULTI_AGENTS.md`
- `CLAUDE_CODE_INSTRUCTIONS.md`
- `ECTOMASS_PATCH_AGENTS_1-5.md`
