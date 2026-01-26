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
        <td>Compréhension, proactivité, gestion du temps et du matériel</td>
        <td><input type="number" min="0" max="6" step="0.01" inputmode="decimal" oninput="recalcEval()"></td>
        <td>6 pts</td>
        <td id="note-cell" rowspan="3" style="text-align:center; vertical-align:middle;">
          <div style="font-size:28px; font-weight:700; line-height:1;">
            <span id="final">0.00</span>
          </div>
        </td>
      </tr>
      <tr>
        <td><strong>Développement</strong></td>
        <td>Quantité</td>
        <td>Recherche, itérations, variété, regard critique</td>
        <td><input type="number" min="0" max="6" step="0.01" inputmode="decimal" oninput="recalcEval()"></td>
        <td>6 pts</td>
      </tr>
      <tr>
        <td><strong>Production</strong></td>
        <td>Qualité</td>
        <td>Synthèse, impact graphique, précision technique</td>
        <td><input type="number" min="0" max="6" step="0.01" inputmode="decimal" oninput="recalcEval()"></td>
        <td>6 pts</td>
      </tr>
    </tbody>
  </table>

  <script>
    function clamp(v, min, max) {
      return v < min ? min : (v > max ? max : v);
    }
    function roundToStep(v, step) {
      return Math.round(v / step) * step;
    }

    function recalcEval() {
      const inputs = document.querySelectorAll('#eval-table input');
      let sum = 0;
      let filled = 0;

      inputs.forEach(i => {
        if (i.value === '') return;
        filled++;

        let v = parseFloat(i.value);
        if (Number.isNaN(v)) {
          i.value = '';
          return;
        }

        v = clamp(v, 0, 6);

        // Snap to nearest 0.25 (quarter points)
        v = roundToStep(v, 0.25);

        // Write back the snapped value (always show 2 decimals: 4.25, 4.50, 4.75)
        i.value = v.toFixed(2);

        sum += v;
      });

      const noteCell = document.getElementById('note-cell');

      // Only show the note when all 3 fields are filled
      if (filled < 3) {
        document.getElementById('final').textContent = '';
        noteCell.classList.remove('note-good', 'note-bad');
        return;
      }

      let avg = sum / 3;

      // round to nearest 0.05 (5e)
      avg = Math.round(avg / 0.05) * 0.05;

      document.getElementById('final').textContent = avg.toFixed(2);

      noteCell.classList.remove('note-good', 'note-bad');
      noteCell.classList.add(avg > 4 ? 'note-good' : 'note-bad');
    }
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