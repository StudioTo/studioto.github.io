---
title: "Histoire de la typographie"
toc: false
---

# Histoire de la typographie

<!-- frise de navigation : une pastille par catégorie de la classification historique (titres avec la note [^cat]) ;
     au-dessus l'année (titre daté qui précède), au-dessous la catégorie : pastille active et pastille survolée -->
<nav id="th-timeline" aria-label="Classification historique">
  <span class="th-track"><span class="th-line"></span><span class="th-progress"></span></span>
</nav>

<style>
#th-timeline {
  position: sticky;
  top: var(--sticky-h, 119px);
  z-index: 2;                  /* au-dessus de la période épinglée */
  height: 65px;                /* 4 + 16 (année) + 2 + 21 (frise) + 2 + 16 (catégorie) + 4 */
  margin: 0 0 24px;
  background: #fff;
  border-bottom: var(--line);
}
#th-timeline .th-track {
  position: absolute;
  left: 0;
  right: 0;
  top: 22px;
  height: 21px;
}
#th-timeline .th-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 10px;
  height: 1px;
  background: #d0d7de;
}
/* progression : la ligne devient noire jusqu'à la position de lecture, en continu entre les pastilles */
#th-timeline .th-progress {
  position: absolute;
  left: 0;
  top: 10px;
  width: 0;
  height: 1px;
  background: #1f2328;
}
/* pastilles et ligne centrées sur la même hauteur (10.5px) */
#th-timeline .th-dot {
  position: absolute;
  top: 0;
  width: 21px;
  height: 21px;
  margin-left: -10px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
#th-timeline .th-dot::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d0d7de;
}
#th-timeline .th-dot.passed::before {
  background: #1f2328;
}
/* année au-dessus, catégorie au-dessous */
#th-timeline .th-year,
#th-timeline .th-name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;             /* exception sur cette page : 20 % plus petit (16 → 13px) */
  line-height: 16px;
  white-space: nowrap;
  visibility: hidden;
}
/* textes centrés sur leurs capitales :
   année entre la ligne grise du haut (0) et la frise (32.5px) → milieu 16px,
   catégorie entre la frise et la ligne grise du bas (64px) → milieu 48px.
   New Computer Modern à 13px / 16px : le milieu des capitales est 9px sous le haut de la ligne de texte.
   (positions relatives à la frise, placée à 22px) */
#th-timeline .th-year { top: -15px; }    /* 22 − 15 = 7px + 9 = 16px */
#th-timeline .th-name { top: 17px; }     /* 22 + 17 = 39px + 9 = 48px */
#th-timeline .th-dot.first .th-year,
#th-timeline .th-dot.first .th-name { left: 7px; transform: none; }
#th-timeline .th-dot.last .th-year,
#th-timeline .th-dot.last .th-name { left: auto; right: 7px; transform: none; }
#th-timeline .th-dot.active .th-year,
#th-timeline .th-dot.active .th-name,
#th-timeline .th-dot.hovered .th-year,
#th-timeline .th-dot.hovered .th-name,
#th-timeline .th-dot:focus-visible .th-year,
#th-timeline .th-dot:focus-visible .th-name {
  visibility: visible;
}
/* souris dans la frise : seule la dernière pastille survolée montre ses textes
   (pas de retour à la pastille active entre deux pastilles → pas de clignotement) ;
   en sortant de la frise, retour à la pastille active */
#th-timeline.hovering .th-dot.active:not(.hovered) .th-year,
#th-timeline.hovering .th-dot.active:not(.hovered) .th-name {
  visibility: hidden;
}
/* pastille survolée, non active : textes en gris */
#th-timeline .th-dot:not(.active) .th-year,
#th-timeline .th-dot:not(.active) .th-name {
  color: #6e7781;
}
/* titres des catégories de la classification (note [^cat]) : en italique, sur cette page seulement */
.markdown-body h2:has(a[href="#fn:cat"]) {
  font-style: italic;
}
.markdown-body h2:has(a[href="#fn:cat"]) sup {
  font-style: normal;
}
/* titre de la période en cours (titres datés) : épinglé sous la frise ;
   chaque nouvelle période recouvre la précédente */
.markdown-body h2.th-period {
  position: sticky;
  top: calc(var(--sticky-h, 119px) + 65px);
  z-index: 1;                  /* au-dessus du contenu (appels de note, images) qui défile dessous */
  background: #fff;
}
</style>

<script>
(function () {
  function setup() {
    var nav = document.getElementById("th-timeline");
    if (!nav) return;
    var track = nav.querySelector(".th-track"), progress = nav.querySelector(".th-progress");
    var heads = Array.prototype.slice.call(document.querySelectorAll(".markdown-body h2"));
    // catégories : titres qui renvoient à la note [^cat]
    var cats = heads.filter(function (h) { return h.querySelector('a[href="#fn:cat"]'); });
    if (!cats.length) return;
    // nom : texte du titre sans l'appel de note
    var name = function (h) {
      var c = h.cloneNode(true);
      c.querySelectorAll("sup").forEach(function (x) { x.remove(); });
      return c.textContent.trim();
    };
    // année : le titre daté qui précède la catégorie (« 1540 : … » → « 1540 »)
    var year = function (h) {
      for (var i = heads.indexOf(h) - 1; i >= 0; i--) {
        var m = heads[i].textContent.trim().match(/^([\u2212-]?\d[\d'’\s\u202f–—\u2212-]*?)\s*(?::|\s[A-ZÀ-Ý])/);
        if (m) return m[1].trim();
      }
      return "";
    };
    // 1re pastille : tout ce qui précède la classification (premiers symboles, depuis −64’000)
    var firstPeriod = heads.filter(function (h) { return /^[\u2212-]?\d/.test(h.textContent.trim()); })[0];
    var items = cats.map(function (h) { return { h: h, year: year(h), name: name(h) }; });
    if (firstPeriod) items.unshift({ h: firstPeriod, year: "\u221264\u2019000", name: "Premiers symboles", top: true });
    var last = Math.max(items.length - 1, 1);
    var barH = function () { return nav.getBoundingClientRect().height; };

    // titres datés (« 1540 : … », « −753 : … », « 1350 – 1420 : … ») : périodes, épinglées sous la frise
    var isPeriod = function (h) { return /^[\u2212-]?\d/.test(h.textContent.trim()); };
    heads.forEach(function (h) { if (isPeriod(h)) h.classList.add("th-period"); });
    var PERIOD_H = 55;           // 7 + 40 + 7 + ligne 1px

    // les titres arrivent sous l'en-tête, la frise et la période épinglée
    heads.forEach(function (h) {
      h.style.scrollMarginTop = isPeriod(h)
        ? "calc(var(--sticky-h, 119px) + 65px)"
        : "calc(var(--sticky-h, 119px) + 65px + " + PERIOD_H + "px)";
    });

    var dots = items.map(function (it, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "th-dot" + (i === 0 ? " first" : "") + (i === items.length - 1 ? " last" : "");
      b.style.left = (i / last * 100) + "%";
      b.setAttribute("aria-label", it.year + " " + it.name);
      var y = document.createElement("span"); y.className = "th-year"; y.textContent = it.year;
      var n = document.createElement("span"); n.className = "th-name"; n.textContent = it.name;
      b.appendChild(y); b.appendChild(n);
      b.addEventListener("click", function () {
        if (it.top) window.scrollTo({ top: 0, behavior: "smooth" });   // retour au début de la frise
        else it.h.scrollIntoView({ behavior: "smooth" });
      });
      b.addEventListener("mouseenter", function () {
        dots.forEach(function (d) { d.classList.remove("hovered"); });
        b.classList.add("hovered");
        nav.classList.add("hovering");
      });
      track.appendChild(b);
      return b;
    });

    function update() {
      var y = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sticky-h"), 10) || 0) + barH() + PERIOD_H + 1;
      var k = 0;                 // avant la 1re catégorie : « Premiers symboles »
      for (var i = 1; i < items.length; i++) {
        if (items[i].h.getBoundingClientRect().top <= y) k = i;
      }
      // position continue entre la catégorie en cours et la suivante (coordonnées du document)
      var R = window.scrollY + y;                       // ligne de lecture
      var absTop = function (el) { return el.getBoundingClientRect().top + window.scrollY; };
      var pos = k;
      if (k < items.length - 1) {
        var start = k === 0 ? y : absTop(items[k].h);   // 1er segment : depuis le haut de la page
        var end = absTop(items[k + 1].h);
        pos = k + Math.min(1, Math.max(0, (R - start) / (end - start)));
      }
      progress.style.width = (pos / last * 100) + "%";
      dots.forEach(function (d, i) {
        d.classList.toggle("passed", i <= k);
        d.classList.toggle("active", i === k);
      });
    }
    nav.addEventListener("mouseleave", function () {
      nav.classList.remove("hovering");
      dots.forEach(function (d) { d.classList.remove("hovered"); });
    });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup); else setup();
})();
</script>

## −64’000 : Représentations symboliques
Les traces peintes dans les grottes préhistoriques représentaient probablement des idées, des concepts spirituels, ou des symboles culturels, mais il n’y avait pas de grammaire ou de structure linguistique systématique derrière ces images. Elles servaient plutôt à des fins rituelles, artistiques ou symboliques.

## −38’800 : Pictographes
Un pictographe est un dessin ou une image qui représente un objet, un être ou une scène de manière simplifiée et stylisée (sens littéral, boeuf = boeuf).

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_002.jpg)|
|:------------------------------------------:|
| Grotte d’El Castille, Espagne              |

## −22’000 : Pictogrammes
Un pictogramme est un symbole graphique qui transmet une signification par sa ressemblance visuelle avec un objet physique (sens figuré, maison = famille).
  
|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_004_alt.jpg)                                  |
|:----------------------------------------------------------------------------:|
| Parc National Chiribiquete, Colombie                           |

## −15’000 Idéogrammes
Un idéogramme ou idéographie est un symbole qui représente une idée ou un concept indépendamment de toute langue particulière (sens figuré sans lien avec le dessin, homme + animaux = chasse).

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_005.jpg)                                  |
|:----------------------------------------------------------------------------:|
| Comté de Forsyth, Géorgie, États-Unis                                          |

## −3300 : Systèmes d’écriture logographique
Un système d’écriture implique d’identifier un ensemble de symboles qui représentent des sons, des mots ou des idées de manière standardisée et structurée dans le but de transmettre une information.
Le système d’écriture logographique utilise une combinaison de d’idéogrammes (concepts) et de phonogrammes (sons).

## −3300 : Cunéiformes
L’écriture cunéiforme (Mésopotamie) utilise des symboles de plus en plus géométriques et abstraits.
  
|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_006.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Tablette administrative cunéiforme, Mésopotamie (Syrie)                                     |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_007.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Évolution des idéogrammes en formes abstraites         |

## −3200 : Hiéroglyphes
L’écriture égyptienne utilise des symboles encore figuratifs.
  
|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_008.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Plaque d’ivoire de Ménès, Égypte                                      |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_009.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Les hiéroglyphes étaient utilisés de trois manières : en tant qu’idéogrammes qui représentent un mot désignant un objet représenté visuellement par le hiéroglyphe, en tant que phonogrammes désignant des sons, ou en tant que déterminatifs qui fournissent des indices sur le sens sans écrire directement les sons.                                     |

## −3000 : Systèmes d’écriture phonétique
Un système d’écriture phonétique représente des sons qui permettent la prononciation des mots d’une langue (correspondance d’abord symbole = son, puis sons = mot, et enfin mot = concept).

## −3000 : Alphabets sémitiques
Les alphabets sémitiques sont des systèmes d’écriture qui utilisent principalement des consonnes. Les voyelles sont généralement omises, et les lecteurs doivent les déduire à partir du contexte.

## −1900 : Sinaïtique

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_010.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Inscriptions dans la pierre, Wadi el-Hol, Vallée sur la route de Farshut, Égypte        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_011.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Un des plus anciens exemples d’écriture alphabétique phonétique découverts à ce jour         |

## −1600 : Canaanite

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_012.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Frise avec inscription punique (canaanite)       |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_013.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Alphabet canaanite         |

## −1200 : Phénicien

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_014.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Inscriptions dans la pierre, Nora, Sardaigne         |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_015.jpg)                                               |
|:-----------------------------------------------------------------------------------------:|
| Alphabet phénicien         |

## −1100 : Alpabet occidental moderne
L’alphabet grec introduit un système complet : chaque symbole représente un son, y compris les voyelles, ce qui permet une transcription plus précise de la langue parlée.

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_016.jpg)|
|:------------------------------------------:|
| « Alphabet » vient des deux premières lettres grecques, « alpha » (a) et « bêta » (b)             |

## −1100 : Antiquité Grecque
Les Grecs libèrent l’écriture des contraintes de la représentation. 

|![](https://studioto.github.io/media/typography-history/overview-writing-history_028.jpg)|
|:------------------------------------------:|
| Gortyna, Grèce                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_029.jpg)|
|:------------------------------------------:|
| Écriture boustrophédon : « comme le bœuf tourne en labourant le champ »                                      |

## −800 : Etrusques
Les Étrusques ont joué un rôle essentiel dans le développement de Rome, tout en conservant des éléments de l’art et de l’architecture grecs.

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_001.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_002.png)|
|:------------------------------------------:|:------------------------------------------:|
| Cippus Perusinus, près de Pérouse, Italie                                        | Évolution du grec au latin                                        |

## −753 : Antiquité Romaine
## Gravure sur pierre[^tech]
Les inscriptions romaines sont gravées (ductus = mode d’emploi) au ciseau sur la pierre.
## Incises[^cat] {#incises}
À mesure que l’Empire Romain est devenu la puissance dominante, il a synthétisé les influences étrusques pour créer une culture unique. La capitale monumentale romaine incarne ainsi l’autorié de l’empire et témoigne du développement architectural et urbain de Rome.

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v2_017.jpg)|
|:------------------------------------------:|
| Généalogie de l’alphabet latin             |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_031.jpg)|
|:------------------------------------------:|
| Forum, Rome                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_032.jpg)|
|:------------------------------------------:|
| Capitales monumentales                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_033.jpg)|
|:------------------------------------------:|
| Les inscriptions romaines sont gravées (ductus = mode d’emploi) au ciseau sur la pierre.                                       |

## 0 – 476 : Empire Romain
## Calligraphie à la plume[^tech]
Les formes des lettres évoluent : on passe de lettres ciselées dans la pierre à des lettres tracées à la plume de roseau (calame).
## Onciales[^cat] {#onciales}
  Le script oncial était officiellement utilisé dans l’empire pour la copie de textes littéraires, religieux et bibliques sur sur parchemin.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_039.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_043.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Scribe romain                                        | Les formes des lettres évoluent : on passe de lettres ciselées dans la pierre à des lettres tracées à la plume de roseau (calame).                                        |
  
## 476 : Chute de l’Empire Romain

|![](https://studioto.github.io/media/typography-history/overview-writing-history_044.jpg)|
|:------------------------------------------:|
| Destruction de Rome                                        |
  
## 476 – 780 : Moyen-Âge
## Écritures nationales

|![](https://studioto.github.io/media/typography-history/overview-writing-history_052_bis.jpg)|
|:------------------------------------------:|
| Dès que l’Empire cesse de faire régner l’ordre, chaque tempérament national crée son propre alphabet                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_055.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_047.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Moine copiste dans un scriptorium                                        | Simplification des formes des lettres permettant une écriture plus rapide et fluide, adaptée aux besoins croissants de la correspondance et des documents administratifs au cours du Moyen Âge                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_048.jpg)|
|:------------------------------------------:|
| Par souci d’efficacité, les majuscules se transforment en minuscules qui sont plus rapides à tracer                                        |
  
## 780 : Charlemagne
## Minuscule carolingienne
  Standardisation de l’écriture visant améliorer la communication à travers l’Empire franc (lettres bien formées + espaces entre les mots = grande lisibilité).

|![](https://studioto.github.io/media/typography-history/overview-writing-history_052.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_053.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Charlemagne qui réforme l’écriture et la grammaire                                        | Ductus de la minuscule carolingienne                                         |

## 1202 : Chiffres latins
  Les chiffres latins proviennent des chiffres indiens (Brahmi), qui ont transité par la civilisation arabe avant d’être adoptés en Europe et d’évoluer en leur forme actuelle.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_080.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_082.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Chiffres romains en usage jusqu’à lors                                        | Livre du Calcul, Leonardo Fibonacci                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_081.jpg)|
|:------------------------------------------:|
| Généalogie des chiffres latins                                        |

## 1200 – 1450 : Gothique
## Fractures[^cat] {#fractures}
La minuscule carolingienne devient plus étroite (plus de lettres sur une ligne), les arrondis des lettres commencent à se briser (calligraphie « fracturée »).

|![](https://studioto.github.io/media/typography-history/overview-writing-history_057.jpg)|
|:------------------------------------------:|
| Cathédrale de Wells, Angleterre                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_059.jpg)|
|:------------------------------------------:|
| Ductus gothique                                        |

## 1350 – 1420 : Écriture de Chancellerie
## Cursives[^cat] {#cursives}
L’écriture de chancellerie trouve son origine dans la calligraphie à plume large utilisée par la chancellerie italienne pour les relations commerciales pendant la Renaissance. Cette écriture devait être calligraphiée rapidement, d’où son appelation « cursive » (qui court).

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v4_001.png)|
|:------------------------------------------:|
| Écriture de Chancellerie anglaise, Lettre de Henri V, 1418                                         |
  
## 1450 : Gutenberg
## Caractères mobiles[^tech]
L’invention de l’imprimerie par Gutenberg marque le début de la Renaissance en révolutionnant la manière dont le savoir est partagé et conservé en Europe.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_068.jpg)|
|:------------------------------------------:|
| Un « tireur » retire une feuille imprimée de la presse. À sa droite, le « batteur » encre la forme. À l’arrière-plan, des compositeurs composent les caractères.                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_064.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_067.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Gravure sur bois (monobloc)                                        | Caractères mobiles (lettres individuelles)                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_065.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_066.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Biblia Pauperum (impression bois)                                        | La Bible de Gutenberg (caractères mobiles)                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_069.jpg)|
|:------------------------------------------:|
| Le graveur sculpte un poinçon à l’envers (acier). Le poinçon est utilisé pour frapper une matrice (cuivre). La matrice est utilisée pour fondre des caractères (alliage de plomb etc.)                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_071.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_070.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Sélection des caractères dans la casse                                        | Justification des lignes dans le composteur                                        |
  
## 1450 – 1600 : Renaissance
La Renaissance ravive l’intérêt porté à la littérature classique et met en lumière la minuscule carolingienne (modèle de « l’antiqua »).

|![](https://studioto.github.io/media/typography-history/overview-writing-history_076.jpg)|
|:------------------------------------------:|
| Renaissance à Venise                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_004.png)|
|:------------------------------------------:|
| Minuscules humanistes : retour aux formes arrondies                                        |

## 1495 : Imprimeurs italiens
## Humanes[^cat] {#humanes}
À Venise, Aldo Manuce cherche à reproduire la plus belle graphie possible avec des caractères en métal.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_077.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_078.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Minuscules Humanistes calligraphiées                                        | Minuscules Humanistes imprimées                                        |

## 1500 : L’italique
Apparition de l’italique, inspirée de l’écriture utilisée par la chancellerie italienne.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_084.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_085.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Cursive humaniste calligraphiée                                        | Italique humaniste imprimée                                        |

## 1540 : Imprimeurs Français
## Garaldes[^cat] {#garaldes}
Successeur des Vénitiens, Claude Garamond affine le dessin des lettres en privilégiant des formes plus raffinées et élancées.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_087.jpg)|
|:------------------------------------------:|
| Garamond imprimé                                        |
  
## 1600 – 1660 : Baroque
## Réales[^cat] {#reales}
L’esprit des lumières et du roi (réale > rex > roi) : la rationalisation du dessin.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_089.jpg)|
|:------------------------------------------:|
| Louis XIV à Versailles                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_090.jpg)|
|:------------------------------------------:|
| Le Romain du Roi est un alphabet conçu sur une grilles avant d’être gravé                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_091.jpg)|
|:------------------------------------------:|
| Baskerville imprimé                                        |
  
## 1660 – 1715 : Néo-Classicisme
## Didones[^cat] {#didones}
Premier empire français : les techniques d’impression deviennet plus précises, le dessin des lettres devient donc encore plus fin.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_093.jpg)|
|:------------------------------------------:|
| Le couronnement de Napoléon Bonaparte                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_094.jpg)|
|:------------------------------------------:|
| Didone utilisée pour imprimer le code civil                                        |
  
## 1760 – 1914 : Révolution Industrielle
Grâce à des innovations technologiques, on passe d’une économie agraire et artisanale à une économie industrielle (mécanisation de la production, travail dans les usines). 

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_005.png)|
|:------------------------------------------:|
| Rupture entre le travail de la terre et le travail à l’usine                                        |

## 1808 : Affiches
## Expressives[^cat] {#expressives}
Pendant les premiers siècles de l’imprimerie, les caractères d’affichage n’existaient généralement pas. L’apparition du format affiche et la généralisation de la signalétique ont favorisé l’apparition de nouvelles formes de lettres (désormais réalisables grâce aux nouvelles techniques d’impression).

|![](https://studioto.github.io/media/typography-history/overview-writing-history_112.jpg)|
|:------------------------------------------:|
| Mise en exergue avec des grands corps                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_115.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_114.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Caractères mobiles en bois (posters)                                        | Contraste inversé (Italiennes)                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_113.jpg)|
|:------------------------------------------:|
| Fat Faces                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_117.jpg)|
|:------------------------------------------:|
| Rounded                                        |

## 1820 : Les titres de journeaux
## Mécanes[^cat] {#mecanes}
Les slabs-sérifs (mécanes) deviennent populaires suite à la campagne d’égypte de Napoléon. De plus, les empattement rectangulaires réagissent bien à la technique d’impression de l’époque.

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_003.png)|
|:------------------------------------------:|
| Presse rotative                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_102.jpg)|
|:------------------------------------------:|
| Titres de journaux                                        |

## 1829 : Machine à écrire
## Monospaces[^cat] {#monospaces}
Sur une machine à écrire, chaque lettre occupe la même largeur (chasse fixe) afin de simplifier le mécanisme.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_106.png)|![](https://studioto.github.io/media/typography-history/overview-writing-history_107.png)|
|:------------------------------------------:|:------------------------------------------:|
| La boule à écrire, Rasmus Malling-Hansen                                        | La machine à écrire Sholes et Glidden                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_108.jpg)|
|:------------------------------------------:|
| Texte tapé à la machine à écrire                                       |

## 1830 : Impressions publicitaires
## Grotesques[^cat] {#grotesques}
Le terme « grotesque » viendrait de l’italien « grottesco », qui signifie « appartenant à la grotte » en raison de leur aspect géométrique simple puisque dénué de sérifs. Il résulte d’une comparaison négative avec les caractères à empattement de l’époque, considérés comme plus nobles. Dans un premier temps, les premières sans-sérifs sont principalement utilisées pour de la publicité.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_124.jpg)|
|:------------------------------------------:|
| Premier caractère caractères sans-sérif, fonderie Caslon de Salisbury Square à Londres                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_125.jpg)|
|:------------------------------------------:|
| Première apparition du terme « sans-serif », livre de spécimens de Vincent Figgins                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_127.jpg)|
|:------------------------------------------:|
| Affiche publicitaire pour un saut en parachute dans les jardins de la Rotunda, Dublin                                        |

## 1880 : Automatisation
## Composition à chaud[^tech]
L’inventeur américain Ottmar Mergenthaler, parfois appelé « le second Gutenberg », se lasse des efforts nécessaires à la composition manuelle et cherche à mettre au point une méthode de composition mécanique. Il invente la machine Linotype qui permet de fondre des alliages métalliques pour créer des lignes de type en un seul bloc, permettant une impression rapide et efficace en utilisant un système de composition automatisé.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_099.jpg)|
|:------------------------------------------:|
| Machines Linotype                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_101.jpg)|
|:------------------------------------------:|
| Ligne moulée, vue d’en haut, vue de côté                                        |

## 1914 – 1945 : Modernisme
Suite aux guerres mondiales, le modernisme cherche à rompre avec les traditions passées et à explorer de nouvelles formes d’expression, notamment à travers l’abstraction, l’expérimentation et la remise en question des conventions établies.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_121.jpg)|
|:------------------------------------------:|
| L’école du Bauhaus a révolutionné les pratiques artistiques en promouvant une approche fonctionnelle et esthétique du design                                        |

## 1916 : Redécouverte des capitales romaines
## Humanistes[^cat] {#humanistes}
Capitales romaines + Minuscules carolingiennes

|![](https://studioto.github.io/media/typography-history/overview-writing-history_137.jpg)|
|:------------------------------------------:|
| Police corporate d’Edward Johnston pour les transports publics londoniens                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_136.jpg)|
|:------------------------------------------:|
| Station Hammersmith, Londres                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_138.jpg)|
|:------------------------------------------:|
| La librairie Douglas Cleverdon avec les lettres peintes par Eric Gill à Bristol (première apparition de la Gill Sans)                                        |

## 1927 : Constructivisme
## Géométriques[^cat] {#geometriques}
Construction modulaire avec des formes primaires (carré, rond, triangle)

|![](https://studioto.github.io/media/typography-history/overview-writing-history_129.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_130.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Projet d’habitation Neue Frankfurt                                        | Première esquisses de la Futura pour la signalétique                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_131.jpg)|
|:------------------------------------------:|
| Futura                                        |

## 1945 – 1960 : Post-Modernisme
Le postmodernisme est un mouvement artistique caractérisé par un scepticisme envers les grands récits et idéologies et une tendance à célébrer l’ironie, la pluralité et la déconstruction des normes établies.

## 1950 : Développements d’après-guerre
## Composition à froid (photo-composition)[^tech]
La photo-composition repose sur la photographie de caractères et leur projection sur un support photo-sensible. Les variantes ultérieures des machines à photocomposer comporte des écrans à tube cathodique pour afficher les caractères déjà numérisés.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_151.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_152.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Opérateur d’une machine de photo-composition                                        | La Graphic Page 1000 est un outil de mise en page typographique qui utilise un format standardisé de 1000 points                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_153.jpg)|
|:------------------------------------------:|
| Les caractères sont stockés sur des disques pour pouvoir être exposés sur des supports photographiques                                        |

## 1960 : Style International
## Néo-Grotesques[^cat] {#neo-grotesques}
Le style international incarne la volonté de représenter l’information de manière objective et systématique (grid Systems, couleurs unies, neutralité). Chaque élément du design doit avoir une fonction précise et servir le message. Le dessin des grotesques évolue : uniformisation de la graisse, simplification des formes.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_145.jpg)|
|:------------------------------------------:|
| Helvetica, Max Miedinger et Eduard Hoffmann pour la fonderie Haas                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_154.jpg)|
|:------------------------------------------:|
| Univers, Adrian Frutiger (les polices comportent de plus en plus de fontes)                                         |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_147.jpg)|
|:------------------------------------------:|
| Aéroport Charles de Gaulle                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_148.jpg)|
|:------------------------------------------:|
| Adrian Frutiger, tests de lisibilité pour l’aéroport Charles de Gaulle à Paris                                      |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_141.jpg)|
|:------------------------------------------:|
| Métro de New York avant la nouvelle signalétique                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_142.jpg)|
|:------------------------------------------:|
| George Salomon envoie une proposition spontanée à l’autorité des transports de NY                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_143.jpg)|
|:------------------------------------------:|
| Massimo Vignelli a conçu la signalisation emblématique du métro de New York                                        |

## 1968 — Aujourd’hui : Typographie digitale

## 1965 : Numérique
## Caractères assemblés numériquement (typographie digitale)[^tech]
Le Digiset étant une opération entièrement digitale, elle a permis aux dessinateurs de caractères de partager leur travail sur des disquettes, mais aussi d’y revenir à tout moment pour y apporter des modifications.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_166.jpg)|
|:------------------------------------------:|
| Rudolf Hell invente la première machine à composer (Digiset) qui fonctionne en répartissant les points sombres d’une forme sur une grille préexistante                                    |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_167.jpg)|
|:------------------------------------------:|
| Digi-Grotesk, première fonte digitale                                        |

## 1965 : Numérisation
## OCR (Optical Character Recognition)[^tech]
La technologie de reconnaissance optique des caractères permet d’identifier les caractères imprimés et de les reproduire / enregistrer sous forme d’informations numériques.

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_006.png)|
|:------------------------------------------:|
| Le service postal américain introduit la reconnaissance optique de caractères pour trier le courrier                                       |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_007.png)|
|:------------------------------------------:|
| Les lettres sont automatiquement triées par destination                                       |

|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_009.png)|![](https://studioto.github.io/media/typography-history/overview-writing-history-v3_008.png)|
|:------------------------------------------:|:------------------------------------------:|
| Reconnaissance de la lettre par décomposition en modules simples                                        | Traduction de la forme dans une grille matricielle                                       |

## 1970 : Grille de pixels
## Bitmap[^tech]
Le système matriciel utilise une combinaison de pixels pour créer des caractères individuels. Bien que des fichiers distincts pour chaque taille et résolution soit nécessaires (coûteux en mémoire à l’époque), les bitmaps ont grandement facilité l’utilisation et le transfert des fontes.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_168.jpg)|
|:------------------------------------------:|
| Fonte bitmap (grille de pixels)                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_169.jpg)|
|:------------------------------------------:|
| Sélection de fontes bitmap                                        |

## 1980 : Vecteurs
## Postscript[^tech]
La grilles de pixels finalement est remplacée par des tracés vectoriels, qui permettent aux concepteurs de mettre à l’échelle n’importe quel symbole sans perte de qualité.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_170.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_171.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Conception assistée par ordinateurs (CAD)                                        | Courbes de Bézier (vecteurs), d’abord utilisées pour l’aérodynamisme des voitures                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_172.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_172_image_0002.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Fonte bitmap                                        | Fonte vectorielle                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_173.jpg)|
|:------------------------------------------:|
| Variations créées à partir d’un seul tracé vectoriel                                        |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_174.jpg)|
|:------------------------------------------:|
| PostScript (PS) : deux fichiers (un pour l’écran et un pour l’impression). TrueType (TT) : un seul fichier qui fait à la fois office de fichier d’écran et d’impression.                                        |

## 1978 : Character-sets étendus
## Non-Latines[^cat] {#non-latines}
## Dingbats & Pi Fonts (symboles à la place des lettres)[^tech]
Historiquement en typographie, un *dingbat* est un ornement (souvent utilisé pour délimiter des espaces ou créer des contours). Au débuts de la typographie digitale, la technologie de l’époque ne permettait pas de stocker des symboles en plus des lettres dans un même fichier fonte. Par conséquent, les fontes *Dingbats* (symboles) ou les fontes *Pi* (symboles mathématiques) étaient des fichiers fontes entièrement dédiés aux symboles. Les symboles étaient stockés dans les emplacements normalement dédiés aux lettres.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_159.jpg)|![](https://studioto.github.io/media/typography-history/overview-writing-history_157.jpg)|
|:------------------------------------------:|:------------------------------------------:|
| Poème composé avec des dingbats (contours, sections), Hill’s Manual                                        | Zapf Dingbats de Hermann Zapf                                        |

## 1988 : Super familles
## Hybrides[^cat] {#hybrides}
## Superfamille (variations stylistiques sur le même squelette)[^tech]
Famille hybrides qui comprennent notamment des fontes avec et sans empatements, de même que des fontes linéaires et contrastées, toutes basées sur le même squelette.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_161.jpg)|
|:------------------------------------------:|
| Rotis, Otl Aicher                                        |

## 1996 : TrueType + PostScript
## Opentype[^tech]
Le format OpenType est un format de police de caractères unifié qui combine les technologies TrueType (Apple) et Type 1 PostScript (Adobe), offrant une large compatibilité multiplateforme et la prise en charge de fonctionnalités typographiques telles que les substitutions ou la gestion de différents systèmes d’écriture.

|![](https://studioto.github.io/media/typography-history/overview-writing-history_175.jpg)|
|:------------------------------------------:|
| En raison de sa flexibilité, l’openType s’impose comme le format de référence sur les plates-formes informatiques                                        |

## 2016 : Interpolations
## OpenType Variable Fonts[^tech]
Les polices variables contiennent plusieurs masters dans un fichier unique et permettent d’interpoler entre ces masters le long de différents axes

|![](https://studioto.github.io/media/typography-history/overview-writing-history_176.jpg)|
|:------------------------------------------:|
| Les polices Multiple Masters (ancêtre des variables modernes)                                         |

|![](https://studioto.github.io/media/typography-history/overview-writing-history_177.jpg)|
|:------------------------------------------:|
| Les polices variables contemporaines permettent une gamme de variation plus large et sont adoptées comme standard par l’industrie | 

## Les formes du futur ?

|![](https://studioto.github.io/media/typography-history/overview-writing-history_178.jpg)|
|:------------------------------------------:|
| Adrian Frutiger, Quelles seront les formes de demain ?                                        |

## Notes

[^cat]: Catégorie de la classification historique
[^tech]: Avancée technologique

<!-- ## Sources -->
