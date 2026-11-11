# 🖥️ Draw vectors
  Dessin vectoriel
### &nbsp;

|![](https://studioto.github.io/media/type-vectorize/typo_vectors_drawing_1.jpg) |
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

|![](https://studioto.github.io/media/type-vectorize/view.gif) |
|:---:|
| Characterset (fenêtre), plan de travail (onglet)           |

### Terminologie

|![](https://studioto.github.io/media/type-vectorize/terminology.gif) |
|:---:|
| Segment, point d'ancrage, point de contrôle           |

### Segments

|![](https://studioto.github.io/media/type-vectorize/segments.gif) |
|:---:|
| Droites, courbes           |

### Points d'ancrage

|![](https://studioto.github.io/media/type-vectorize/anchor_point.gif) |
|:---:|
| Les points qui sont sur le segment: angle (bleu), courbe (vert), ouvert (trait)          |

### Points de contrôle

|![](https://studioto.github.io/media/type-vectorize/control_point.gif) |
|:---:|
| Les points qui sont en dehors du segment (gris)           |

### Plans

|![](https://studioto.github.io/media/type-vectorize/grounds.gif) |
|:---:|
| 1er plan, 2eme plan           |

### Calques (sauvegardes)

|![](https://studioto.github.io/media/type-vectorize/layers.gif) |
|:---:|
| Icône "+"           |

### Letterbox

|![](https://studioto.github.io/media/type-vectorize/letterbox.gif) |
|:---:|
| Largeur, espace à gauche, espace à droite           |

# 🛠️ Outils

### Formes primitives

|![](https://studioto.github.io/media/type-vectorize/primitives.gif) |
|:---:|
| Carré, Cercle           |

### Plume

|![](https://studioto.github.io/media/type-vectorize/pen_tool.gif) |
|:---:|
| Clic = segment droit, Clic + Drag = segment courbe           |

### Règle

|![](https://studioto.github.io/media/type-vectorize/ruler.gif) |
|:---:|
| Ctl + Opt + Cmd + Drag           |

### Fusion

|![](https://studioto.github.io/media/type-vectorize/remove_overlap.gif) |
|:---:|
| Tracé > Supprimer le chevauchement           |

### Déplacement d'un point sur un segment

|![](https://studioto.github.io/media/type-vectorize/point_displacement.gif) |
|:---:|
| Alt + Drag sur un point           |

# ✏️ Principes de dessin

### 1er Point

|![](https://studioto.github.io/media/type-vectorize/first_point.gif) |
|:---:|
| Tracé > Corriger le sens des tracés: le premier point doit toujours être en bas à gauche           |

### Sens des tracés

|![](https://studioto.github.io/media/type-vectorize/path_direction.gif) |
|:---:|
| Tracé > Corriger le sens des tracés: forme (sens inverse des aiguilles), contreforme (sens des aiguilles)           |

### Triangle magique

|![](https://studioto.github.io/media/type-vectorize/magic_triangle.gif) |
|:---:|
| Les points de contrôle doivent être contenus dans le triangle qui contient le segment            |

### Points aux extrémités

|![](https://studioto.github.io/media/type-vectorize/extremums.gif) |
|:---:|
| Tracé > Ajouter les extrêmes           |

### Contrôles horizontaux ou verticaux

|![](https://studioto.github.io/media/type-vectorize/bcps.gif) |
|:---:|
| Les points de contrôle doivent être alignés horizontalement ou verticalement           |

### Points superflus

|![](https://studioto.github.io/media/type-vectorize/less_points.gif) |
|:---:|
| Tracé > Nettoyer les tracés: utiliser le moins de points possible           |

# 📏 Mesures

### Systématiser les proportions


### Systématiser le spacing


# 📦 Export

### Créer le dossier Adobe Fonts dans Application Support


### Générer les fonctionnalités OpenType


### Créer le dossier d'export Adobe Fonts


### Exporter


# 🔍 Test

### Choississez votre fonte dans le menu déroulant de InDesign


# 🐞 Debug des erreurs communes

### Autohinting

