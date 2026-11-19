/* ============================================================
   Index de la page d'accueil
   - barre de recherche au-dessus du tableau : titres, tags,
     et texte complet des pages listées dans le tableau (et seulement celles-là)
   - tri : ordre du tableau dans index.md (défaut, bouton « Tags ») ou alphabétique (bouton « A–Z »)
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
    var e = r.cells[2];
    if (e) {
      // l'emoji est enveloppé : la cellule (et sa ligne grise) reste visible, seul l'emoji est masqué
      e.classList.add("index-emoji");
      var icon = document.createElement("span");
      icon.className = "index-emoji-icon";
      while (e.firstChild) icon.appendChild(e.firstChild);
      e.appendChild(icon);
    }
  });

  // ---------- barre d'outils : recherche + tri
  var tools = document.createElement("div");
  tools.className = "index-tools";

  var input = document.createElement("input");
  input.type = "search";
  input.className = "index-search";
  input.placeholder = "Rechercher";
  input.setAttribute("aria-label", "Rechercher dans l'index et dans les pages");
  tools.appendChild(input);

  var sortBox = document.createElement("span");
  sortBox.className = "index-sort";
  tools.appendChild(sortBox);

  table.parentNode.insertBefore(tools, table);

  // ---------- tri
  var collator = new Intl.Collator("fr", { numeric: true, sensitivity: "base" });
  var mode = "tag";
  var buttons = {};

  function sort() {
    rows.sort(function (a, b) {
      if (mode === "tag") {
        return a._order - b._order;   // ordre d'origine, groupé par tag comme dans index.md
      }
      return collator.compare(a._titleRaw, b._titleRaw) || collator.compare(a._tagRaw, b._tagRaw);
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
    for (var k in buttons) buttons[k].setAttribute("aria-pressed", k === mode ? "true" : "false");
  }

  [["tag", "Tags"], ["alpha", "A–Z"]].forEach(function (p) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = p[1];
    b.title = p[0] === "tag" ? "Ordre par tags (ordre d'origine)" : "Trier par ordre alphabétique";
    b.addEventListener("click", function () { mode = p[0]; sort(); });
    buttons[p[0]] = b;
    sortBox.appendChild(b);
  });

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

  sort();
})();
