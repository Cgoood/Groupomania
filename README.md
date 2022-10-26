# GROUPOMANIA - Réseau social d'entreprise :busts_in_silhouette:
### Technologie utilisée:

NodeJs / Express / Prisma via PlanetScale /Vue/ Bootstrap

## Contenu du site
-------

* Création de compte et connexion
* Création, modification et supression de posts
* Système de like
* Création de role selon profil du compte (standard/admin)


## Etapes de mise en route :

### Initialisation du projet: :file_folder:
- créer un dossier en local 

- y cloner le repository à l'aide de votre CLI avec cette commande:  
`git clone https://github.com/Cgoood/Groupomania.git`

### Installation des packages : :package:

- se positionner avec le CLI sur le dossier backend ET lancer la commande :  
`npm install`

- se positionner sur le dossier frontend et lancer la commande :  
`npm install`

### Définition des Variables d'environnement : :pencil:
#### Backend
- créer un fichier .env du dossier \backend
- le coller au même endroit puis renommer celui-ci par ".env"
- Ouvrir ce fichier .env et remplacer les variables par:  
Port = 3000;
DATABASE_URL='mysql://rqzhdz8q07bd1bj8sktl:pscale_pw_712wwlxQdp52EmLpGlcwvGy9dLfeVZ4SX4JxvaW7U4l@aws-eu-west-2.connect.psdb.cloud/groupomania?sslaccept=strict'
#### Frontend
- créer le fichier .env du dossier \frontend
- le coller au même endroit puis renommer celui-ci par ".env"
- Ouvrir ce fichier .env et remplacer les variables par  
VITE_SERVER_ADDRESS=localhost
VITE_SERVER_PORT=3000  


### Lancement de l'application :rocket:

- se positionner sur le dossier \backend et lancer :
  `nodemon server.js`
- se positionner sur le dossier \frontend et lancer :
  `npm run dev`

- l'application sera lancée sur http://localhost:8080
