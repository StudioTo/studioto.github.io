# 📶 Critères d’évaluation


### &nbsp;


# Exercice

<div class="markdown-body">
  <style>
    .markdown-body table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
    }
    .markdown-body th,
    .markdown-body td {
      border: 1px solid #d0d7de;
      padding: 6px 13px;
      vertical-align: middle;
    }
    .markdown-body thead tr {
      background: #f6f8fa;
    }
    .markdown-body th { text-align: left; }
    .markdown-body .eval-table { table-layout: fixed; }
    .markdown-body .eval-table th:last-child { text-align: center; }
    /* Lignes de critère */
    .markdown-body .eval-table .crit-row td {
      position: relative;
      background: #eaeef2;
      text-align: center;
    }
    .markdown-body .eval-table .crit-title { font-weight: 700; }
    .markdown-body .eval-table .crit-avg {
      position: absolute;
      right: 13px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .markdown-body .eval-table .sub-label { font-weight: 600; }
    .markdown-body .eval-table .question { color: #57606a; }
    /* Case note */
    .markdown-body .eval-table .crit-row td.note-cell {
      position: static;
      text-align: center;
      vertical-align: middle;
      background: #ffffff;
    }
    .markdown-body .eval-table .crit-row td.note-cell.note-good { background: #dafbe1; }
    .markdown-body .eval-table .crit-row td.note-cell.note-bad  { background: #ffebe9; }
    .markdown-body .note-cell .note-meta {
      margin-top: 8px;
      font-size: 12px;
      color: #57606a;
    }
    .markdown-body .note-cell .note-final {
      font-size: 50px;
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .markdown-body .note-cell button {
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      color: #57606a;
      cursor: pointer;
    }
    /* Évaluation : slider + niveau */
    .markdown-body .rating-inner {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .markdown-body .slider-wrap {
      position: relative;
      flex: 1;
      min-width: 120px;
      height: 34px;
    }
    .markdown-body .slider-wrap .line {
      position: absolute;
      top: 9px;
      left: 7px;
      right: 7px;
      height: 2px;
      background: #d0d7de;
    }
    .markdown-body .slider-wrap .ticks {
      position: absolute;
      top: 10px;
      left: 7px;
      right: 7px;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
    }
    .markdown-body .slider-wrap .ticks span {
      position: relative;
      width: 0;
      height: 0;
    }
    .markdown-body .slider-wrap .ticks span::before {
      content: '';
      position: absolute;
      left: -3px;
      top: -3px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #d0d7de;
    }
    .markdown-body .slider-wrap .ticks span::after {
      content: attr(data-n);
      position: absolute;
      top: 10px;
      left: 0;
      transform: translateX(-50%);
      font-size: 10px;
      color: #8c959f;
    }
    .markdown-body .slider-wrap .ticks span.on::after {
      color: #1f2328;
      font-weight: 700;
    }
    .markdown-body .slider-wrap input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 20px;
      margin: 0;
      background: transparent;
      cursor: pointer;
    }
    .markdown-body .slider-wrap input[type="range"]:focus { outline: none; }
    .markdown-body .slider-wrap input[type="range"]::-webkit-slider-runnable-track {
      height: 20px;
      background: transparent;
    }
    .markdown-body .slider-wrap input[type="range"]::-moz-range-track {
      height: 20px;
      background: transparent;
    }
    .markdown-body .slider-wrap input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      margin-top: 3px;
      border-radius: 50%;
      background: #1f2328;
      border: 2px solid #1f2328;
    }
    .markdown-body .slider-wrap input[type="range"]::-moz-range-thumb {
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #1f2328;
      border: 2px solid #1f2328;
    }
    .markdown-body .slider-wrap input.unset::-webkit-slider-thumb { background: #ffffff; border-color: #afb8c1; }
    .markdown-body .slider-wrap input.unset::-moz-range-thumb { background: #ffffff; border-color: #afb8c1; }
    .markdown-body .slider-wrap input[type="range"]:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3); }
    .markdown-body .slider-wrap input[type="range"]:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.3); }
    .markdown-body .level {
      width: 8.5em;
      flex: none;
      text-align: left;
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      font-size: 13px;
      color: #1f2328;
      white-space: nowrap;
      cursor: pointer;
    }
    .markdown-body .level.empty { color: #8c959f; cursor: default; }
  </style>
  <!--
    ============================================================
    TABLEAUX — textes à modifier directement ici
    - Ligne de critère : <tr class="crit-row" data-export="…">
        • texte du titre dans <span class="crit-title">
        • data-export = nom utilisé dans l'export
    - Ligne de sous-critère :
        • 1re cellule = titre
        • 2e cellule = question
        • data-export (3e cellule) = nom utilisé dans l'export
    Pour ajouter / retirer un sous-critère : copier / supprimer une ligne.
    La case Note doit rester dans la première ligne de critère.
    ============================================================
  -->
  <!-- ======================= TABLEAU EXERCICE ======================= -->
  <table class="eval-table">
    <colgroup>
      <col style="width:20%">
      <col>
      <col style="width:32%">
      <col style="width:16%">
    </colgroup>
    <thead>
      <tr>
        <th>Critère</th>
        <th>Question</th>
        <th>Évaluation</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>
      <!-- DESIGN -->
      <tr class="crit-row" data-export="design">
        <td colspan="3"><span class="crit-title">Design</span></td>
        <td class="note-cell">
          <div class="note-meta progress"></div>
          <div class="note-final"><span class="final">0.00</span></div>
          <div class="note-meta"><button class="save-btn" type="button"></button></div>
        </td>
      </tr>
      <tr>
        <td class="sub-label">Pertinence contextuelle</td>
        <td class="question">La solution graphique est-elle pertinente par rapport au contexte donné ?</td>
        <td class="rating" data-export="contexte"></td>
      </tr>
      <tr>
        <td class="sub-label">Hiérarchie</td>
        <td class="question">La hiérarchie est-elle claire, le message principal ressort-il ?</td>
        <td class="rating" data-export="hiérarchie"></td>
      </tr>
      <tr>
        <td class="sub-label">Impact</td>
        <td class="question">Le travail capte-t-il l’attention et marque-t-il durablement ?</td>
        <td class="rating" data-export="impact"></td>
      </tr>
      <!-- PROCESSUS -->
      <tr class="crit-row" data-export="processus">
        <td colspan="3"><span class="crit-title">Processus</span></td>
      </tr>
      <tr>
        <td class="sub-label">Intentions claires</td>
        <td class="question">Les intentions sont-elles clairement définies et argumentées ?</td>
        <td class="rating" data-export="intentions"></td>
      </tr>
      <tr>
        <td class="sub-label">Organisation</td>
        <td class="question">Le temps, le matériel et les délais sont-ils bien gérés ?</td>
        <td class="rating" data-export="organisation"></td>
      </tr>
      <tr>
        <td class="sub-label">Recherche</td>
        <td class="question">La recherche est-elle variée, itérative et menée avec un regard critique ?</td>
        <td class="rating" data-export="recherche"></td>
      </tr>
      <!-- TECHNIQUE -->
      <tr class="crit-row" data-export="technique">
        <td colspan="3"><span class="crit-title">Technique</span></td>
      </tr>
      <tr>
        <td class="sub-label">Précision</td>
        <td class="question">L’exécution est-elle précise et soignée ?</td>
        <td class="rating" data-export="précision"></td>
      </tr>
      <tr>
        <td class="sub-label">Production</td>
        <td class="question">La production finale est-elle aboutie et bien réalisée ?</td>
        <td class="rating" data-export="production"></td>
      </tr>
      <tr>
        <td class="sub-label">Systématisation</td>
        <td class="question">Les règles (grille, typographie, couleurs) sont-elles appliquées de manière cohérente ?</td>
        <td class="rating" data-export="systématisation"></td>
      </tr>
    </tbody>
  </table>
</div>

# Projet

<div class="markdown-body">
  <!-- ======================= TABLEAU PROJET ======================= -->
  <table class="eval-table">
    <colgroup>
      <col style="width:20%">
      <col>
      <col style="width:32%">
      <col style="width:16%">
    </colgroup>
    <thead>
      <tr>
        <th>Critère</th>
        <th>Question</th>
        <th>Évaluation</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>
      <!-- DESIGN -->
      <tr class="crit-row" data-export="design">
        <td colspan="3"><span class="crit-title">Design</span></td>
        <td class="note-cell">
          <div class="note-meta progress"></div>
          <div class="note-final"><span class="final">0.00</span></div>
          <div class="note-meta"><button class="save-btn" type="button"></button></div>
        </td>
      </tr>
      <tr>
        <td class="sub-label">Pertinence contextuelle</td>
        <td class="question">La solution graphique est-elle pertinente par rapport au contexte donné ?</td>
        <td class="rating" data-export="contexte"></td>
      </tr>
      <tr>
        <td class="sub-label">Hiérarchie</td>
        <td class="question">La hiérarchie est-elle claire, le message principal ressort-il ?</td>
        <td class="rating" data-export="hiérarchie"></td>
      </tr>
      <tr>
        <td class="sub-label">Impact</td>
        <td class="question">Le travail capte-t-il l’attention et marque-t-il durablement ?</td>
        <td class="rating" data-export="impact"></td>
      </tr>
      <!-- PROCESSUS -->
      <tr class="crit-row" data-export="processus">
        <td colspan="3"><span class="crit-title">Processus</span></td>
      </tr>
      <tr>
        <td class="sub-label">Intentions claires</td>
        <td class="question">Les intentions sont-elles clairement définies et argumentées ?</td>
        <td class="rating" data-export="intentions"></td>
      </tr>
      <tr>
        <td class="sub-label">Organisation</td>
        <td class="question">Le temps, le matériel et les délais sont-ils bien gérés ?</td>
        <td class="rating" data-export="organisation"></td>
      </tr>
      <tr>
        <td class="sub-label">Recherche</td>
        <td class="question">La recherche est-elle variée, itérative et menée avec un regard critique ?</td>
        <td class="rating" data-export="recherche"></td>
      </tr>
      <!-- TECHNIQUE -->
      <tr class="crit-row" data-export="technique">
        <td colspan="3"><span class="crit-title">Technique</span></td>
      </tr>
      <tr>
        <td class="sub-label">Précision</td>
        <td class="question">L’exécution est-elle précise et soignée ?</td>
        <td class="rating" data-export="précision"></td>
      </tr>
      <tr>
        <td class="sub-label">Production</td>
        <td class="question">La production finale est-elle aboutie et bien réalisée ?</td>
        <td class="rating" data-export="production"></td>
      </tr>
      <tr>
        <td class="sub-label">Systématisation</td>
        <td class="question">Les règles (grille, typographie, couleurs) sont-elles appliquées de manière cohérente ?</td>
        <td class="rating" data-export="systématisation"></td>
      </tr>
    </tbody>
  </table>
  <script>
    (function () {
      // ============================================================
      // TEXTES & VALEURS — à modifier ici (communs aux deux tableaux)
      // ============================================================
      const LEVELS = [            // 1 → 6 pts
        'Insuffisant',
        'Passable',
        'Satisfaisant',
        'Bien',
        'Très bien',
        'Excellent'
      ];
      const PASS_MARK     = 4;          // à partir de cette note : vert, en dessous : rouge
      const ROUND_TO      = 0.05;       // arrondi de la note finale
      const EMPTY_LEVEL   = '—';        // affiché tant qu'un sous-critère n'est pas évalué
      const EMPTY_AVG     = '–';        // moyenne d'un critère sans évaluation
      const CLEAR_TOOLTIP = 'Cliquer pour effacer';
      const EXPORT_LABEL  = 'exporter';
      const COPIED_LABEL  = 'copié';
      // ============================================================
      document.querySelectorAll('.eval-table').forEach(initTable);
      function initTable(table) {
        const body       = table.tBodies[0];
        const noteCell   = table.querySelector('.note-cell');
        const finalEl    = table.querySelector('.final');
        const progressEl = table.querySelector('.progress');
        const saveBtn    = table.querySelector('.save-btn');
        saveBtn.textContent = EXPORT_LABEL;
        // Lecture de la structure du tableau
        const groups = [];
        const allRows = Array.from(body.rows);
        allRows.forEach(tr => {
          if (tr.classList.contains('crit-row')) {
            const avgEl = document.createElement('span');
            avgEl.className = 'crit-avg';
            tr.cells[0].appendChild(avgEl);
            groups.push({ name: tr.dataset.export, avgEl, subs: [] });
          } else {
            const cell = tr.querySelector('td.rating');
            if (cell && groups.length) groups[groups.length - 1].subs.push(buildSlider(cell));
          }
        });
        noteCell.rowSpan = allRows.length;
        const totalSubs = groups.reduce((n, g) => n + g.subs.length, 0);
        function buildSlider(cell) {
          const ticks = LEVELS.map((_, n) => `<span data-n="${n + 1}"></span>`).join('');
          cell.innerHTML = `
            <div class="rating-inner">
              <div class="slider-wrap">
                <div class="line"></div>
                <div class="ticks">${ticks}</div>
                <input type="range" min="1" max="${LEVELS.length}" step="1" value="1" class="unset">
              </div>
              <button type="button" class="level empty" title="${CLEAR_TOOLTIP}">${EMPTY_LEVEL}</button>
            </div>`;
          const input = cell.querySelector('input');
          const level = cell.querySelector('.level');
          const sub = {
            name: cell.dataset.export,
            input,
            level,
            ticks: cell.querySelectorAll('.ticks span'),
            set: false
          };
          const mark = () => {
            if (!sub.set) { sub.set = true; input.classList.remove('unset'); }
            recalc();
          };
          input.addEventListener('pointerdown', mark);
          input.addEventListener('input', mark);
          level.addEventListener('click', () => {
            sub.set = false;
            input.value = 1;
            input.classList.add('unset');
            recalc();
          });
          return sub;
        }
        function readScores() {
          let rated = 0;
          const crits = groups.map(g => {
            const vals = g.subs.map(s => {
              if (s.set) { rated++; return parseInt(s.input.value, 10); }
              return null;
            });
            const filled = vals.filter(v => v !== null);
            const avg = filled.length ? filled.reduce((a, b) => a + b, 0) / filled.length : null;
            return { g, vals, avg };
          });
          const avgs = crits.map(x => x.avg).filter(v => v !== null);
          let final = avgs.length ? avgs.reduce((a, b) => a + b, 0) / avgs.length : 0;
          final = Math.round(final / ROUND_TO) * ROUND_TO;
          return { crits, final, rated };
        }
        function recalc() {
          const { crits, final, rated } = readScores();
          crits.forEach(({ g, vals, avg }) => {
            g.avgEl.textContent = avg === null ? EMPTY_AVG : avg.toFixed(1);
            g.subs.forEach((s, k) => {
              const v = vals[k];
              s.level.textContent = v === null ? EMPTY_LEVEL : `${v} · ${LEVELS[v - 1]}`;
              s.level.classList.toggle('empty', v === null);
              s.ticks.forEach((t, n) => t.classList.toggle('on', v !== null && n + 1 === v));
            });
          });
          finalEl.textContent = final.toFixed(2);
          progressEl.textContent = `${rated}/${totalSubs}`;
          noteCell.classList.remove('note-good', 'note-bad');
          if (rated > 0) {
            noteCell.classList.add(final >= PASS_MARK ? 'note-good' : 'note-bad');
          }
        }
        async function copyScoresToClipboard() {
          const { crits, final } = readScores();
          const fmt = v => (v === null ? EMPTY_AVG : String(v));
          const parts = crits.map(({ g, vals, avg }) =>
            `${g.name}: ${avg === null ? EMPTY_AVG : avg.toFixed(1)} (${g.subs.map((s, k) => `${s.name} ${fmt(vals[k])}`).join(' / ')})`
          );
          const text = `${final.toFixed(2)} = ${parts.join(' · ')}`;
          try {
            await navigator.clipboard.writeText(text);
          } catch (e) {
            // Solution de repli pour anciens navigateurs
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          saveBtn.textContent = COPIED_LABEL;
          setTimeout(() => (saveBtn.textContent = EXPORT_LABEL), 900);
        }
        saveBtn.addEventListener('click', copyScoresToClipboard);
        recalc();
      }
    })();
  </script>
</div>

<!-- ### &nbsp;

|![](links/0-Eval_process.jpg) |
|:---:|
| Processus: organisation, développement, production |  -->


<!-- # Exercice technique  

|![](links/Eval28.gif) |
|:---:|
| Juste ou faux |  -->

<!-- ## 6 pts Organisation (gestion)  

|![](links/Eval29.gif) |
|:---:|
| Autonomie, compréhension du brief, gestion du temps et du matériel | 

## 6 pts Développement (quantité)  

|![](links/Eval34.gif) |
|:---:|
| Recherche, itérations, variété, regard critique | 

## 6 pts Production (qualité)  

|![](links/Eval_prod4.gif) |
|:---:|
| Synthèse, impact graphique, propreté technique |  -->
