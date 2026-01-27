# 📊 Critères de notation


### &nbsp;


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
      vertical-align: top;
    }
    .markdown-body thead tr {
      background: #f6f8fa;
    }
    /* Header alignment: left for all, center only for Note */
    .markdown-body th { text-align: left; }
    .markdown-body #eval-table th:last-child { text-align: center; }
    .markdown-body input[type="number"] {
      width: 4.5em;
      padding: 2px 6px;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      font: inherit;
      background: #ffffff;
      -moz-appearance: textfield;
    }
    .markdown-body input[type="number"]::-webkit-outer-spin-button,
    .markdown-body input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .markdown-body #note-cell.note-good { background: #dafbe1; }
    .markdown-body #note-cell.note-bad  { background: #ffebe9; }
    /* Widen Note column while keeping table at 100% width */
    .markdown-body #eval-table { table-layout: fixed; }
    .markdown-body #eval-table th:last-child,
    .markdown-body #eval-table td#note-cell {
      width: 20%;
    }
  </style>

  <table id="eval-table">
    <thead>
      <tr>
        <th>Domaine</th>
        <th>Mot-clé</th>
        <th>Indicateurs</th>
        <th>Points</th>
        <th>Max</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Organisation</strong></td>
        <td>Gestion</td>
        <td>Compréhension, gestion du temps, gestion du matériel, proactivité</td>
        <td><input type="number" min="0" max="6" step="0.1" inputmode="decimal" oninput="recalcEval()"></td>
        <td>6 pts</td>
        <td id="note-cell" rowspan="3" style="text-align:center; vertical-align:middle;">
          <div style="margin-top:8px; font-size:12px; color:#57606a;">
            <button id="" type="button" style="background:none; border:none; padding:0; font:inherit; color:#57606a; cursor:pointer; text-decoration:none;">
              &nbsp;
            </button>
          </div>
          <div style="font-size:50px; font-weight:700; line-height:1;">
            <span id="final">0.00</span>
          </div>
          <div style="margin-top:8px; font-size:12px; color:#57606a;">
            <button id="save-btn" type="button" style="background:none; border:none; padding:0; font:inherit; color:#57606a; cursor:pointer; text-decoration:none;">
              export
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td><strong>Développement</strong></td>
        <td>Quantité</td>
        <td>Recherche, itérations, variété, pertinence, regard critique</td>
        <td><input type="number" min="0" max="6" step="0.1" inputmode="decimal" oninput="recalcEval()"></td>
        <td>6 pts</td>
      </tr>
      <tr>
        <td><strong>Production</strong></td>
        <td>Qualité</td>
        <td>Sélection, aboutissement, impact graphique, précision technique, argumentation</td>
        <td><input type="number" min="0" max="6" step="0.1" inputmode="decimal" oninput="recalcEval()"></td>
        <td>6 pts</td>
      </tr>
    </tbody>
  </table>

  <script>
    function clamp(v, min, max) {
      return v < min ? min : (v > max ? max : v);
    }

    function getScores() {
      const inputs = document.querySelectorAll('#eval-table input');

      // Read values as displayed/typed, then sanitize similarly to recalcEval
      const vals = Array.from(inputs).map(i => {
        if (i.value === '') return 0;
        let s = i.value;
        if (s.includes('.')) {
          const parts = s.split('.');
          if (parts[1].length > 1) s = parts[0] + '.' + parts[1].charAt(0);
        }
        let v = parseFloat(s);
        if (Number.isNaN(v)) v = 0;
        v = clamp(v, 0, 6);
        v = Math.round(v * 10) / 10;
        return v;
      });

      // Ensure 3 values
      const [org = 0, dev = 0, prod = 0] = vals;

      let avg = (org + dev + prod) / 3;
      avg = Math.round(avg / 0.05) * 0.05;

      return { avg, org, dev, prod };
    }

    async function copyScoresToClipboard() {
      const { avg, org, dev, prod } = getScores();
      const text = `${avg.toFixed(2)} orga: ${org.toFixed(1)} / dvlp: ${dev.toFixed(1)} / prod: ${prod.toFixed(1)}`;

      try {
        await navigator.clipboard.writeText(text);
        // brief feedback
        const btn = document.getElementById('save-btn');
        const prev = btn.textContent;
        btn.textContent = 'copied';
        setTimeout(() => (btn.textContent = prev), 900);
      } catch (e) {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    }

    function recalcEval() {
      const inputs = document.querySelectorAll('#eval-table input');
      let sum = 0;

      inputs.forEach(i => {
        if (i.value === '') return;

        let v = parseFloat(i.value);
        // Enforce max one decimal in the input field
        if (i.value.includes('.')) {
          const parts = i.value.split('.');
          if (parts[1].length > 1) {
            i.value = parts[0] + '.' + parts[1].charAt(0);
          }
        }

        if (Number.isNaN(v)) {
          i.value = '';
          return;
        }

        v = clamp(v, 0, 6);
        // Hard limit: prevent values above 6 or below 0 from staying in the field
        if (parseFloat(i.value) > 6) i.value = '6';
        if (parseFloat(i.value) < 0) i.value = '0';

        // Restrict to 1 decimal for calculation only (do NOT rewrite field while typing)
        v = Math.round(v * 10) / 10;

        sum += v;
      });

      const noteCell = document.getElementById('note-cell');

      let avg = sum / 3;

      // round to nearest 0.05 (5e)
      avg = Math.round(avg / 0.05) * 0.05;

      document.getElementById('final').textContent = avg.toFixed(2);

      const hasAnyValue = Array.from(inputs).some(i => i.value !== '');

      noteCell.classList.remove('note-good', 'note-bad');

      if (hasAnyValue) {
        noteCell.classList.add(avg > 4 ? 'note-good' : 'note-bad');
      }

      const saveBtn = document.getElementById('save-btn');
      if (saveBtn && !saveBtn.dataset.bound) {
        saveBtn.addEventListener('click', copyScoresToClipboard);
        saveBtn.dataset.bound = '1';
      }
    }

    // Initialize
    recalcEval();
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