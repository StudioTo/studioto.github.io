# Remake journal

&nbsp;
&nbsp;
&nbsp;

# Brief
    1.  Créer un fichier InDesign
        mode: impression
        nombre de pages: 1
        affichage des pages: simple
        format de page: Broadsheet (410 × 580 mm)
        marges: 10 mm
        fonds-perdus: 3 mm

    2.  Recomposer une page du journal imposé
        importer les textes par copier-coller
        nettoyer les textes importés (retours, microtypographie)
        créer et appliquer des styles de paragraphes et de caractères
        activer les polices les plus semblables
        adapter les styles
        configurer les colonnes
        configurer la grille de ligne de base
        créer et positionner des blocs textes
        trouver des oeuvres dans la collection du MoMA pour remplacer les images
        créer les éléments graphiques (filets)

    3.  Vérifier le fichier:
        pas de symbole manquant
        pas de de symbole remplacé dans une police
        pas d’exception de style de paragraphe ou de caractère
        les blocs sont alignés sur la grille
        les styles sont alignés sur la grille de ligne de base
        pas de lien manquant ou modifié
        les images sont à 300 dpi dans la mise en page
        les images sont au ratio original (1/1)
        le contrôle en amont (preflight) est vert

# Regex

    :;!?

    rechercher:     (?<=\w)((\s|~S)*?)([?!;:])
    remplacer:      ~<$3

    «»

    rechercher:     (\«)(\s)(.+?)( )(\»)
    remplacer:      $1~<$3~<$5

# Ressources

✉️ Gazette de Lausanne (pdf)  
📎 [Collection du MoMA (images)](https://www.moma.org/collection/works/?classifications=any&date_begin=Pre-1850&date_end=2026&include_uncataloged_works=false&on_view=false&q=swimming+pool&recent_acquisitions=false&with_images=true)  
📎 [Checklists](../../../check-export/)  

# Objectifs

✅ Reconnaître les polices de caractères  
✅ Connaître les règles de la composition typographique  
✅ Comprendre la grille de mise en page d’une publication donnée  
✅ Produire une mise en page dans InDesign selon les règles de l'art (grille, styles, microtypographie)   

# Évaluation

📶 [Auto-évaluation](../../../evaluate-criteria/)