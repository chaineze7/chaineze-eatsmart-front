# EatSmart Frontend

## Présentation

EatSmart Frontend est l'interface utilisateur du projet EatSmart

Cette application permet : 

- d'afficher les plats disponibles du restaurant 
- d'ajouter des articles dans un panier
- de calculer le total d'une commande
- affiche l'objet JSON dans la console (commande)


Le frontend communique avec une API REST développé en PHP. 


# Technologies utilisées

- TypeScript
- HTML
- CSS
- Vite

# Architecture du projet 

## Fichiers principaux 

### src/main.ts 

Il contient :

- la récupération des articles depuis l'API
- l'affichage des articles sous forme de cartes
- la gestion du panier
- le calcul du prix total
- la création d'une commande

---

### src/sytle.css

Contient l'ensemble du style de la page :

- affichage des cartes
- disposition du panier
- mise en page responsive
- boutons

---

### index.html

Page HTML principale qui charge :

- le script TypeScript
- la structure de base du frontend