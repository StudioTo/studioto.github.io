/* ============================================================
   Index de la page d'accueil
   - barre de recherche au-dessus du tableau : titres, tags,
     et texte complet des pages listées dans le tableau (et seulement celles-là)
   - ordre d'affichage : celui du tableau dans index.md
   - emoji (3e colonne) : affiché au survol de la ligne, à droite
   ============================================================ */
(function () {
  var table = document.querySelector(".markdown-body table");
  if (!table || !table.tBodies.length) return;

  table.classList.add("index-table");
  var tbody = table.tBodies[0];
  var rows = Array.prototype.slice.call(tbody.rows);

  // minuscules, sans accents
  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  }

  rows.forEach(function (r, i) {
    r._order = i;   // ordre d'origine dans index.md
    var a = r.cells[0] && r.cells[0].querySelector("a");
    r._titleRaw = r.cells[0] ? r.cells[0].textContent.trim() : "";
    r._tagRaw = r.cells[1] ? r.cells[1].textContent.trim() : "";
    r._title = norm(r._titleRaw);
    r._tag = norm(r._tagRaw);
    r._url = a && a.origin === location.origin ? a.href : null;   // pages du site seulement
    r._text = "";
  });

  // ---------- barre de recherche
  var tools = document.createElement("div");
  tools.className = "index-tools";

  var input = document.createElement("input");
  input.type = "search";
  input.className = "index-search";
  input.placeholder = "Rechercher";
  input.setAttribute("aria-label", "Rechercher dans l'index et dans les pages");
  tools.appendChild(input);

  table.parentNode.insertBefore(tools, table);

  // ---------- recherche
  var loaded = null;   // le texte des pages n'est chargé qu'à la première recherche
  function loadTexts() {
    if (loaded) return loaded;
    loaded = Promise.all(rows.map(function (r) {
      if (!r._url) return null;
      return fetch(r._url).then(function (res) { return res.ok ? res.text() : ""; }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var body = doc.querySelector(".markdown-body") || doc.body;
        if (body) {
          var t = body.querySelector("h1 a");   // retire le titre du site
          if (t && t.parentNode) t.parentNode.removeChild(t);
          r._text = norm(body.textContent);
        }
      }).catch(function () {});
    }));
    return loaded;
  }

  function filter() {
    var q = norm(input.value);
    rows.forEach(function (r) {
      var hit = !q || r._title.indexOf(q) > -1 || r._tag.indexOf(q) > -1 || r._text.indexOf(q) > -1;
      r.hidden = !hit;
    });
  }

  input.addEventListener("input", function () {
    filter();
    loadTexts().then(filter);
  });
  input.addEventListener("focus", loadTexts, { once: true });

})();
