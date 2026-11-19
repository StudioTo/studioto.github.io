/* ============================================================
   Index de la page d'accueil
   - barre de recherche au-dessus du tableau : titres, tags,
     et texte complet des pages listées dans le tableau (et seulement celles-là)
   - ordre d'affichage : celui du tableau dans index.md
   - emoji (3e colonne) : affiché au survol de la ligne, à droite
   - toute la ligne ouvre la page ; un clic sur un #tag le recherche
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

    // emoji : enveloppé pour être masqué sans changer la hauteur de la ligne
    var c = r.cells[2];
    if (c && !c.querySelector(".index-emoji")) {
      var span = document.createElement("span");
      span.className = "index-emoji";
      while (c.firstChild) span.appendChild(c.firstChild);
      c.appendChild(span);
    }
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

  // ---------- tags cliquables : un clic sur #tag le recherche dans la barre de recherche
  rows.forEach(function (r) {
    var c = r.cells[1];
    if (!c) return;
    var txt = c.textContent;
    c.textContent = "";
    txt.split(/(#[^,#]+)/).forEach(function (part) {
      if (/^#/.test(part)) {
        var a = document.createElement("a");
        a.href = "#";
        a.className = "index-tag";
        a.textContent = part.trim();
        a.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          input.value = a.textContent;
          input.dispatchEvent(new Event("input"));
          input.focus();
          tools.scrollIntoView({ block: "nearest" });
        });
        c.appendChild(a);
      } else if (part) {
        c.appendChild(document.createTextNode(part.replace(/\s+$/, " ")));
      }
    });
  });

  // ---------- toute la ligne est cliquable : ouvre la page (⌘ / Ctrl + clic : nouvel onglet)
  rows.forEach(function (r) {
    var link = r.cells[0] && r.cells[0].querySelector("a");
    if (!link) return;
    r.classList.add("index-row-link");
    r.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;            // clic sur le titre ou un tag : comportement du lien
      if (e.metaKey || e.ctrlKey) window.open(link.href, "_blank", "noopener");
      else link.click();
    });
    // survol de la ligne : le titre prend une couleur aléatoire comme un lien survolé ;
    // sur un #tag, le titre redevient noir (le clic recherche le tag, il n'ouvre pas la page)
    function titleOn() { link.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); }
    function titleOff() { link.dispatchEvent(new MouseEvent("mouseout", { bubbles: true })); }
    r.addEventListener("mouseenter", titleOn);
    r.addEventListener("mouseleave", titleOff);
    r.querySelectorAll("a.index-tag").forEach(function (t) {
      t.addEventListener("mouseenter", titleOff);
      t.addEventListener("mouseleave", function (e) { if (r.contains(e.relatedTarget)) titleOn(); });
    });
  });

})();
