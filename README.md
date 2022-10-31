# GROUPOMANIA - Réseau social d'entreprise :busts_in_silhouette:
### Technologie utilisée:

NodeJs / Express / Prisma via PlanetScale /Vue/ Bootstrap

### Dépendances backend installées:

Bcrypt/ Dotenv/ Express/ Fs/ Jsonwebtoken/ Multer/ Nodemon


## Contenu du site
-------

* Création de compte et connexion
* Création, modification et supression de posts
* Système de like
* Création de role selon profil du compte (standard/admin)


## Etapes de mise en route :

### Initialisation du projet: :file_folder:
- créer un dossier en local 

- y cloner le repository à l'aide avec cette commande:  
`git clone https://github.com/Cgoood/Groupomania.git`

### Installation des packages : :package:

- se positionnersur le dossier backend ET lancer la commande :  
`npm install`

- se positionner sur le dossier frontend et lancer la commande :  
`npm install`

### Définition des Variables d'environnement : :pencil:
#### Backend
- renommer le fichier .env_example en .env dans le dossier \backend
- Ouvrir ce fichier .env et remplacer les variables par:  
Port = 3000;

#### Frontend
- renommer le fichier .env_example en .env dans le dossier \frontend
- Ouvrir ce fichier .env et remplacer les variables par  
VITE_SERVER_ADDRESS=localhost
VITE_SERVER_PORT=3000  


### Lancement de l'application :rocket:

- se positionner sur le dossier \backend et lancer :
  `nodemon server.js`
- se positionner sur le dossier \frontend et lancer :
  `npm run dev`

- l'application sera lancée sur http://localhost:8080

### Fichier base de données Prisma
Renommer le fichier en schema.prisma
