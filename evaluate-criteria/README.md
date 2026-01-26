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
    .markdown-body input[type="number"] {
      width: 4.5em;
      padding: 2px 6px;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      font: inherit;
      background: #ffffff;
    }
  </style>

  <table id="eval-table">
    <thead>
      <tr>
        <th></th>
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
        <td><input type="number" min="0" max="6" step="0.1" oninput="recalcEval()"></td>
        <td><strong>Organisation</strong></td>
        <td>Gestion</td>
        <td>Autonomie, compréhension du brief, gestion du temps et du matériel</td>
        <td></td>
        <td>6 pts</td>
        <td rowspan="3" style="text-align:center; vertical-align:middle;">
          <div style="font-size:28px; font-weight:700; line-height:1;">
            <span id="final">0.00</span>
          </div>
          <div style="margin-top:6px; font-size:12px; color:#57606a;">/ 6 pts</div>
        </td>
      </tr>
      <tr>
        <td><input type="number" min="0" max="6" step="0.1" oninput="recalcEval()"></td>
        <td><strong>Développement</strong></td>
        <td>Quantité</td>
        <td>Recherche, itérations, variété, regard critique</td>
        <td></td>
        <td>6 pts</td>
      </tr>
      <tr>
        <td><input type="number" min="0" max="6" step="0.1" oninput="recalcEval()"></td>
        <td><strong>Production</strong></td>
        <td>Qualité</td>
        <td>Synthèse, impact graphique, propreté technique</td>
        <td></td>
        <td>6 pts</td>
      </tr>
    </tbody>
  </table>

  <script>
    function clamp(v, min, max) {
      return v < min ? min : (v > max ? max : v);
    }

    function recalcEval() {
      const inputs = document.querySelectorAll('#eval-table input');
      let sum = 0;

      inputs.forEach(i => {
        if (i.value === '') return;

        let v = parseFloat(i.value);
        if (Number.isNaN(v)) {
          i.value = '';
          return;
        }

        v = clamp(v, 0, 6);
        i.value = (Math.round(v * 10) / 10).toString();

        sum += v;
      });

      const avg = sum / 3;
      document.getElementById('final').textContent = avg.toFixed(2);
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