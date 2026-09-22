# Animation d’un logo

&nbsp;
&nbsp;
&nbsp;

# Brief

    ●   Animer un logo de sorte à ce qu’il apparaisse

    1.  Installation du plugin LotieFiles dans Figma

        https://lottiefiles.com/plugins/figma

    2.  Importation du logo dans Figma

        ouvrir le fichier eps du logo dans Illustrator
        copier les tracés vectoriels > coller dans figma
        renommer le calque avec le nom du logo et chaque sous-calque du logo de manière descriptive
        (cela vous aidera à vous y retrouver lorsque vous allez muliplier les calques)

    3.  Création du frame de l’animation

        créer un frame carré de 1000 × 1000

    4.  Animation du logo (min. 5 étapes)

        étape 1: frame vide
        étape 2:
        étape 3:
        étape 4:
        […]
        étape finale: logo complet, centré dans le frame

    *   travailler à l’envers de l'animation

        préparer le frame final
        sur la gauche, dupliquer le frame puis le modifier (1ère étape de disparition)

            modifications possibles (liste non exhaustive):

            - position
            - proportions
            - rotation
            - opacité
            - couleur de fond et/ou de contour
            - effets
            - […]
            ⚠️ chaque frame doit comporter le même nombre de calques, nommés de la même manière (masquer au lieu de supprimer)

        à nouveau, sur la gauche, dupliquer le frame puis le modifier (2e étape de disparition)
        et ainsi de suite jusqu’à la disparition complète du logo
        dans le mode prototype, créer des liens interatifs entre les frames, dans l’ordre de l’animation (du début à la fin)

            interaction:

            trigger:    on click
            action:     navigate to
            animation:  smart animate

            ⚠️ attention à bien faire démarrer le flow à la frame vide (étape 1)

        cliquer sur le bouton play pour prévisualiser l’animation


# Ressources

✉️ Logos attribués  
📎 [Animation de symboles](../../../symbolize-animation/)  
📎 [Installation du plugin LotieFiles](https://lottiefiles.com/plugins/figma)  
📎 [Créer une animation Lotie](https://www.youtube.com/watch?v=ajfKecCyNOs)  
📎 [5 conseils pour créer une animation Lotie](https://www.youtube.com/watch?v=xawbY5A4miI)  

# Objectifs

✅ Connaître les différents paramètres d'un objet vectoriel dans Figma (position, layout, apparance, fond, contour, effets) (C1)  
✅ Décomposer un logo en sous-parties (C3)  
✅ Animer l’apparition d’un logo (C3)  
✅ Utiliser la fonction smart animate dans Figma (C3)  

# Évaluation

📶 [Auto-évaluation](../../../evaluate-criteria/)