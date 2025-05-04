EDACY
# Projet pratique – Full Stack Developer (Gestion des produits)

# Les prérequis pour executer le projet

    Java 17
    Docker Desktop
    Maven 3+
    
# Faites clone

    git clone https://github.com/abdellahkaba/gestion_produits.git
    
# Executer la commande docker-compose dans la grande racine du projet

    docker compose up -d

# Import realm Keycloak
    
    Lancez Keycloak dans docker desktop et acceder  à interface graphique par (username: admin, password: admin)
    Il y'a un fichier dans le dossier  qui est keycloak/realm/gestion-produits au niveau de la recine de projet alors copiez le contenu de fichier et collez en créant un         realm dans Keycloak

# Démarrer le projet pour les tests (backend)

      cd backend
      mvn clean package
      
# Créer l'image de backend (build)

    dans terminal de backend faites: 
    docker build -t product-api .

# Démarrer la partie frontend
    
      Palcez-vous dans le grand dossier
      cd frontend
      npm install
      ng build --configuration production

# Créer l'image de frontend (build)

     dans terminal de backend faites: 
     docker build -t product-front .

# Les Technologies utilisées 

    spring boot 3.4.2
    Angular 19+
    OpenAPI Documentation # pour générer automatiquement une documentation interactive avec Swagger UI
    Docker
    Keycloak 24+
    PostgreSQL et MySQL
    ngx-toastr # pour les notifications visuelles
    Bootstrap et CSS3


# NB:

    Voir les captures d'écran dans le dossier captures au niveau de la racine de projet
      





    
