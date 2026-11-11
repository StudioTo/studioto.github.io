# 🖥️ Draw vectors
  Dessin vectoriel
### &nbsp;

|![](https://studioto.github.io/media/type-vectorize/links/Typo_Vectors_Drawing_1.jpg) |
|:---:|
| Frutiger[^1]           |

Dessin vectoriel

# Checklist

```
✓ Le type de point est juste partout (angle vs courbe)
✓ Les points sont positionnés correctement (aux extrêmes de la bounding box)
✓ Les points de contrôle sont soit horizontaux soit verticaux
✓ Les fûts ont la même largeur dans toutes les lettres
✓ Les courbes du « o » sont équivalentes (rotation de 180°)
✓ Les pleins et les déliés sont cohérents dans toutes les lettres
✓ Les mesures de compensation sont inscrites dans le fichier Glyphs (Fichier > Informations de la police > Master > Mesures)
✓ La compensation est cohérente dans toutes les lettres en haut et en bas, selon les principes d‘optique (carré, rond, triangle)
✓ La position du point de départ est correcte
✓ Le sens des tracés est correct
✓ L‘espacement est défini systématiquement, selon les principes d‘optique
```

# 🖥️ Interfaçe

### Vues

|![](https://studioto.github.io/media/type-vectorize/links/View.gif) |
|:---:|
| Characterset (fenêtre), plan de travail (onglet)           |

### Terminologie

|![](https://studioto.github.io/media/type-vectorize/links/Terminology.gif) |
|:---:|
| Segment, point d'ancrage, point de contrôle           |

### Segments

|![](https://studioto.github.io/media/type-vectorize/links/Segments.gif) |
|:---:|
| Droites, courbes           |

### Points d'ancrage

|![](https://studioto.github.io/media/type-vectorize/links/Anchor_Point.gif) |
|:---:|
| Les points qui sont sur le segment: angle (bleu), courbe (vert), ouvert (trait)          |

### Points de contrôle

|![](https://studioto.github.io/media/type-vectorize/links/Control_Point.gif) |
|:---:|
| Les points qui sont en dehors du segment (gris)           |

### Plans

|![](https://studioto.github.io/media/type-vectorize/links/Grounds.gif) |
|:---:|
| 1er plan, 2eme plan           |

### Calques (sauvegardes)

|![](https://studioto.github.io/media/type-vectorize/links/Layers.gif) |
|:---:|
| Icône "+"           |

### Letterbox

|![](https://studioto.github.io/media/type-vectorize/links/Letterbox.gif) |
|:---:|
| Largeur, espace à gauche, espace à droite           |

# 🛠️ Outils

### Formes primitives

|![](https://studioto.github.io/media/type-vectorize/links/Primitives.gif) |
|:---:|
| Carré, Cercle           |

### Plume

|![](https://studioto.github.io/media/type-vectorize/links/Pen_Tool.gif) |
|:---:|
| Clic = segment droit, Clic + Drag = segment courbe           |

### Règle

|![](https://studioto.github.io/media/type-vectorize/links/Ruler.gif) |
|:---:|
| Ctl + Opt + Cmd + Drag           |

### Fusion

|![](https://studioto.github.io/media/type-vectorize/links/Remove_Overlap.gif) |
|:---:|
| Tracé > Supprimer le chevauchement           |

### Déplacement d'un point sur un segment

|![](https://studioto.github.io/media/type-vectorize/links/Point_Displacement.gif) |
|:---:|
| Alt + Drag sur un point           |

# ✏️ Principes de dessin

### 1er Point

|![](https://studioto.github.io/media/type-vectorize/links/First_Point.gif) |
|:---:|
| Tracé > Corriger le sens des tracés: le premier point doit toujours être en bas à gauche           |

### Sens des tracés

|![](https://studioto.github.io/media/type-vectorize/links/Path_Direction.gif) |
|:---:|
| Tracé > Corriger le sens des tracés: forme (sens inverse des aiguilles), contreforme (sens des aiguilles)           |

### Triangle magique

|![](https://studioto.github.io/media/type-vectorize/links/Magic_Triangle.gif) |
|:---:|
| Les points de contrôle doivent être contenus dans le triangle qui contient le segment            |

### Points aux extrémités

|![](https://studioto.github.io/media/type-vectorize/links/Extremums.gif) |
|:---:|
| Tracé > Ajouter les extrêmes           |

### Contrôles horizontaux ou verticaux

|![](https://studioto.github.io/media/type-vectorize/links/BCPs.gif) |
|:---:|
| Les points de contrôle doivent être alignés horizontalement ou verticalement           |

### Points superflus

|![](https://studioto.github.io/media/type-vectorize/links/Less_Points.gif) |
|:---:|
| Tracé > Nettoyer les tracés: utiliser le moins de points possible           |

# 📏 Mesures

### Systématiser les proportions

|![](links/Contraste.gif) |
|:---:|
| Fûts, overshoot, etc           |

### Systématiser le spacing

|![](links/Contraste.gif) |
|:---:|
| =o, =o+10           |

# 📦 Export

### Créer le dossier Adobe Fonts dans Application Support

|![](links/abc.gif) |
|:---:|
| ~/Library/Application Support/Adobe/Fonts            |

### Générer les fonctionnalités OpenType

|![](links/Contraste.gif) |
|:---:|
| Fichier > Informations de la police > Fonctionnalités > Générer + Compiler             |

### Créer le dossier d'export Adobe Fonts

|![](links/Contraste.gif) |
|:---:|
| ~/Library/Application Support/Adobe/Fonts            |

### Exporter

|![](links/Contraste.gif) |
|:---:|
| Fichier > Exporter > PostScriptCFF, .otf, supprimer le chevauchement, autohint, destination: dossier Adobe            |

# 🔍 Test

### Choississez votre fonte dans le menu déroulant de InDesign

|![](links/Contraste.gif) |
|:---:|
| ~/Library/Application Support/Adobe/Fonts            |

# 🐞 Debug des erreurs communes

### Autohinting

|![](links/Contraste.gif) |
|:---:|
| Aller vérifier la lettre mentionnée dans la fenêtre d'erreur (corriger les tracés)            |
