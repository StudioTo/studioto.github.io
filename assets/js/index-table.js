/* ============================================================
   Index de la page d'accueil
   - barre de recherche au-dessus du tableau : titres, tags,
     et texte complet des pages listées dans le tableau (et seulement celles-là)
   - tri : par tag (défaut, puis alphabétique dans un tag) ou alphabétique (clic sur l'en-tête)
   - emoji (3e colonne) : affiché au survol de la ligne, à droite
   ============================================================ */
(function () {
  var table = document.querySelector(".markdown-body table");
  if (!table || !table.tBodies.length) return;

  table.classList.add("index-table");
  var tbody = table.tBodies[0];
  var rows = Array.prototype.slice.call(tbody.rows);
  var heads = table.tHead ? table.tHead.rows[0].cells : [];

  // minuscules, sans accents
  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  }

  rows.forEach(function (r) {
    var a = r.cells[0] && r.cells[0].querySelector("a");
    r._title = norm(r.cells[0] ? r.cells[0].textContent : "");
    r._tag = norm(r.cells[1] ? r.cells[1].textContent : "");
    r._titleRaw = r.cells[0] ? r.cells[0].textContent.trim() : "";
    r._tagRaw = r.cells[1] ? r.cells[1].textContent.trim() : "";
    r._url = a && a.origin === location.origin ? a.href : null;   // pages du site seulement
    r._text = "";
    if (r.cells[2]) r.cells[2].classList.add("index-emoji");
  });

  // ---------- tri
  var collator = new Intl.Collator("fr", { numeric: true, sensitivity: "base" });
  var mode = "tag";

  function sort() {
    rows.sort(function (a, b) {
      if (mode === "tag") {
        return collator.compare(a._tagRaw, b._tagRaw) || collator.compare(a._titleRaw, b._titleRaw);
      }
      return collator.compare(a._titleRaw, b._titleRaw) || collator.compare(a._tagRaw, b._tagRaw);
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
    if (heads[0]) heads[0].setAttribute("aria-sort", mode === "alpha" ? "ascending" : "none");
    if (heads[1]) heads[1].setAttribute("aria-sort", mode === "tag" ? "ascending" : "none");
  }

  [["alpha", 0], ["tag", 1]].forEach(function (p) {
    var th = heads[p[1]];
    if (!th) return;
    th.classList.add("index-sortable");
    th.setAttribute("tabindex", "0");
    th.title = p[0] === "alpha" ? "Trier par ordre alphabétique" : "Trier par tag";
    function go() { mode = p[0]; sort(); }
    th.addEventListener("click", go);
    th.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  // ---------- recherche
  var input = document.createElement("input");
  input.type = "search";
  input.className = "index-search";
  input.placeholder = "Rechercher…";
  input.setAttribute("aria-label", "Rechercher dans l'index et dans les pages");
  table.parentNode.insertBefore(input, table);

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

  sort();
})();
