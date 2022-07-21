# Projet FishEye

## Présentation

Réaliser le site web prototype Fisheye (un site accessible pour une plateforme de photographes) à partir d'un repo forké pour la formation Openclassrooms de développeur d'application JS React. FishEye est le projet numéro 6 de la formation.

- Les données des photographes et des médias sont fournies par deux singletons. Ils fournissent les données par des appels à l'API Fetch dans le fichier JSON et par la suite en les stockant eux-mêmes en local.
- Ces données JSON sont typées par deux classes Photographer et Media pour être utilisées par le programme.
- Une méthode de factory fabrique des HTML Cards de types différents pour les cartes de visite des photographes. Une carte de visite décrite "verticale" pour la page index.html et une autre décrite "horizontale" pour la page photographer.html.
- Une méthode de factory fabrique une HTML Cards pour les médias d'un photographe. Un média est soit une photographie soit une vidéo.
- Une méthode de factory fabrique une lightbox avec ses boutons pour présenter les médias en vue rapprochée.
- La lightbox peut être utilisée avec le clavier par les touches fléchées et escape. Le focus de la tabulation est piégé dans la lightbox.
- Les médias sont initialement présentés dans l'ordre du fichier JSON.
- Les médias peuvent être triés en choissisant un tri dans une Custom DropDownBox faite avec un bouton, une liste html et du css.
- Le compteur de likes d'un média ne peut augmenter que de +1 car la HTML Card Media est re-fabriquée à chaque clic à partir des données obtenues par un Fetch sur le fichier JSON. Ainsi le compteur est toujours réinitialisé à sa valeur d'origine.
- Le fichier Dom.js contient des fonctions utilitaires nécessaires communes aux fabriques pour manipuler et créer les éléments du DOM.
- Le code javaScript pour contrôler le formulaire de contact est procédural. Les données envoyées sont écrites sur la console après la soumission du formulaire.
- Les attibuts data-error et data-error-visible marquent les champs du formulaire en erreur en les faisant suivre de leur message de validation.
- Le focus de la tabulation est piégé dans le formulaire de contact.
- Les fichiers html et css ont été validés par les validateurs du W3C.
- Les outils automatisés Wave (Web Accessility Evaluation Tool) et axe DevTools ont été utilisés pour contrôler et inspecter l'accessibilité.
- Les problèmes dans le codebase sont d'abord contrôlés par l'extension ESLint JavaScript de VS Code, puis la branche dev du repo Github est liée à l'application Codeclimate.
- L'extension Prettier de VS Code a formatté tout le codebase.

## Liens

- Voir le site sur github pages : [Openclassrooms projet 6: FishEye](https://sferrer-dev.github.io/projet-6/index.html)
- Code Climate: [Codebase summary projet 6](https://codeclimate.com/github/SFERRER-DEV/projet-6)
- Le Figma des maquettes: [UI-Design-FichEye-FR](https://www.figma.com/proto/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?node-id=120%3A947&scaling=min-zoom&page-id=0%3A1)
- Vidéo sur Youtube utilisant le lecteur auditif NVDA : [Vidéo-1](https://www.youtube.com/watch?v=50EuHuIg3fs)
- Vidéo sur Youtube utilisant le lecteur auditif NVDA : [Vidéo-2](https://www.youtube.com/watch?v=wWMi0OyHYsQ)
