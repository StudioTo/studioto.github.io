# 📶 Critères d’évaluation


### &nbsp;


# Exercice


# Projet

  

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
    .markdown-body #eval-table { table-layout: fixed; }
    .markdown-body #eval-table th:last-child { text-align: center; }
    /* Criterion title rows */
    .markdown-body #eval-table .crit-row td { background: #eaeef2; }
    .markdown-body #eval-table .crit-title { font-weight: 700; }
    .markdown-body #eval-table .crit-avg {
      float: right;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
    .markdown-body #eval-table .sub-label { font-weight: 600; }
    .markdown-body #eval-table .question { color: #57606a; }
    /* Grade cell */
    .markdown-body #note-cell { text-align: center; vertical-align: middle; }
    .markdown-body #note-cell.note-good { background: #dafbe1; }
    .markdown-body #note-cell.note-bad  { background: #ffebe9; }
    .markdown-body #note-cell .note-meta {
      margin-top: 8px;
      font-size: 12px;
      color: #57606a;
    }
    .markdown-body #note-cell .note-final {
      font-size: 50px;
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .markdown-body #note-cell button {
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      color: #57606a;
      cursor: pointer;
    }
    /* Rating: slider + level label */
    .markdown-body .rating {
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
  <table id="eval-table">
    <colgroup>
      <col style="width:20%">
      <col>
      <col style="width:32%">
      <col style="width:16%">
    </colgroup>
    <thead>
      <tr>
        <th>Criterion</th>
        <th>Question</th>
        <th>Rating</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody id="eval-body"></tbody>
  </table>
  <script>
    (function () {
      const LEVELS = ['Inadequate', 'Pass', 'Satisfactory', 'Good', 'Very good', 'Excellent'];
      const CRITERIA = [
        {
          key: 'design', title: 'Design', short: 'design',
          subs: [
            { key: 'context',  short: 'context',  label: 'Context-relevant solution', q: 'Is the graphic solution relevant to the given context?' },
            { key: 'emphasis', short: 'emphasis', label: 'Emphasis',                  q: 'Is the hierarchy clear, does the key message stand out?' },
            { key: 'impact',   short: 'impact',   label: 'Impact',                    q: 'Does the work catch attention and leave a lasting impression?' }
          ]
        },
        {
          key: 'process', title: 'Process', short: 'process',
          subs: [
            { key: 'intentions',   short: 'intentions',   label: 'Clear intentions', q: 'Are the intentions clearly defined and argued?' },
            { key: 'organization', short: 'organization', label: 'Organization',     q: 'Are time, material and deadlines well managed?' },
            { key: 'research',     short: 'research',     label: 'Research',         q: 'Is the research broad, iterative and critically assessed?' }
          ]
        },
        {
          key: 'technicals', title: 'Technicals', short: 'technicals',
          subs: [
            { key: 'precision',       short: 'precision',       label: 'Precision',       q: 'Is the execution precise and clean?' },
            { key: 'production',      short: 'production',      label: 'Production',      q: 'Is the final production well crafted and finished?' },
            { key: 'systematization', short: 'systematization', label: 'Systematization', q: 'Are the rules (grid, typography, colours) applied consistently?' }
          ]
        }
      ];
      const body = document.getElementById('eval-body');
      const totalRows = CRITERIA.reduce((n, c) => n + 1 + c.subs.length, 0);
      const totalSubs = CRITERIA.reduce((n, c) => n + c.subs.length, 0);
      const id = (p, c, s) => `${p}-${c.key}-${s.key}`;
      // Build rows
      let html = '';
      CRITERIA.forEach((c, ci) => {
        html += `<tr class="crit-row"><td colspan="3"><span class="crit-title">${c.title}</span><span class="crit-avg" id="avg-${c.key}">–</span></td>`;
        if (ci === 0) {
          html += `<td id="note-cell" rowspan="${totalRows}">
            <div class="note-meta" id="progress">0/${totalSubs}</div>
            <div class="note-final"><span id="final">0.00</span></div>
            <div class="note-meta"><button id="save-btn" type="button">export</button></div>
          </td>`;
        }
        html += '</tr>';
        c.subs.forEach(s => {
          const ticks = LEVELS.map((_, n) => `<span data-n="${n + 1}"></span>`).join('');
          html += `<tr>
            <td class="sub-label">${s.label}</td>
            <td class="question">${s.q}</td>
            <td>
              <div class="rating">
                <div class="slider-wrap">
                  <div class="line"></div>
                  <div class="ticks" id="${id('tk', c, s)}">${ticks}</div>
                  <input type="range" min="1" max="6" step="1" value="1" class="unset" data-set="0" id="${id('r', c, s)}" aria-label="${s.label}">
                </div>
                <button type="button" class="level empty" id="${id('lvl', c, s)}" data-for="${id('r', c, s)}" title="Click to clear">—</button>
              </div>
            </td>
          </tr>`;
        });
      });
      body.innerHTML = html;
      // Slider behaviour: magnetized to 1–6 by step="1", unset until touched
      body.querySelectorAll('input[type="range"]').forEach(i => {
        const mark = () => {
          if (i.dataset.set !== '1') {
            i.dataset.set = '1';
            i.classList.remove('unset');
          }
          recalc();
        };
        i.addEventListener('pointerdown', mark);
        i.addEventListener('input', mark);
      });
      // Clicking the level label clears the rating
      body.querySelectorAll('.level').forEach(b => {
        b.addEventListener('click', () => {
          const i = document.getElementById(b.dataset.for);
          i.dataset.set = '0';
          i.value = 1;
          i.classList.add('unset');
          recalc();
        });
      });
      function readScores() {
        let rated = 0;
        const crits = CRITERIA.map(c => {
          const subs = c.subs.map(s => {
            const i = document.getElementById(id('r', c, s));
            if (i.dataset.set === '1') { rated++; return parseInt(i.value, 10); }
            return null;
          });
          const vals = subs.filter(v => v !== null);
          const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
          return { c, subs, avg };
        });
        const avgs = crits.map(x => x.avg).filter(v => v !== null);
        let final = avgs.length ? avgs.reduce((a, b) => a + b, 0) / avgs.length : 0;
        // round to nearest 0.05
        final = Math.round(final / 0.05) * 0.05;
        return { crits, final, rated };
      }
      function recalc() {
        const { crits, final, rated } = readScores();
        crits.forEach(({ c, subs, avg }) => {
          document.getElementById(`avg-${c.key}`).textContent = avg === null ? '–' : avg.toFixed(1);
          c.subs.forEach((s, k) => {
            const v = subs[k];
            const btn = document.getElementById(id('lvl', c, s));
            btn.textContent = v === null ? '—' : `${v} · ${LEVELS[v - 1]}`;
            btn.classList.toggle('empty', v === null);
            document.querySelectorAll(`#${id('tk', c, s)} span`).forEach((t, n) => {
              t.classList.toggle('on', v !== null && n + 1 === v);
            });
          });
        });
        document.getElementById('final').textContent = final.toFixed(2);
        document.getElementById('progress').textContent = `${rated}/${totalSubs}`;
        const noteCell = document.getElementById('note-cell');
        noteCell.classList.remove('note-good', 'note-bad');
        if (rated === totalSubs) {
          noteCell.classList.add(final >= 4 ? 'note-good' : 'note-bad');
        }
      }
      async function copyScoresToClipboard() {
        const { crits, final } = readScores();
        const fmt = v => (v === null ? '–' : String(v));
        const parts = crits.map(({ c, subs, avg }) =>
          `${c.short}: ${avg === null ? '–' : avg.toFixed(1)} (${c.subs.map((s, k) => `${s.short} ${fmt(subs[k])}`).join(' / ')})`
        );
        const text = `${final.toFixed(2)} = ${parts.join(' · ')}`;
        try {
          await navigator.clipboard.writeText(text);
        } catch (e) {
          // Fallback for older browsers
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        const btn = document.getElementById('save-btn');
        const prev = btn.textContent;
        btn.textContent = 'copied';
        setTimeout(() => (btn.textContent = prev), 900);
      }
      document.getElementById('save-btn').addEventListener('click', copyScoresToClipboard);
      recalc();
    })();
  </script>
</div>

### &nbsp;

|![](links/0-Eval_process.jpg) |
|:---:|
| Processus: organisation, développement, production | 


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
