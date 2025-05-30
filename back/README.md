# Backend ASREC

Ce dossier contient l'API backend du projet ASREC, développée avec [NestJS](https://nestjs.com/) et TypeORM.

## Prérequis
- Node.js >= 18
- npm >= 9
- Base de données PostgreSQL (ou adapter la configuration)

## Installation
1. Placez-vous dans le dossier `back` :
   ```sh
   cd back
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```

## Configuration
- Copiez le fichier `.env.example` en `.env` et adaptez les variables (connexion BDD, JWT, etc).

## Lancement du serveur
- En développement :
  ```sh
  npm run start:dev
  ```
- En production :
  ```sh
  npm run build && npm run start:prod
  ```

## Tests
- Lancer les tests end-to-end :
  ```sh
  npm run test:e2e
  ```

## Structure principale
- `src/modules/auth` : Authentification (JWT, login, register)
- `src/modules/poll` : Gestion des sondages (création, vote, résultats)
- `src/modules/user` : Gestion des utilisateurs
- `test/` : Tests end-to-end

## API : Détail des principales routes

### Authentification (`/auth`)
- `POST /auth/register` : Inscription d'un nouvel utilisateur `{ username, password }`
- `POST /auth/login` : Connexion, retourne un token JWT `{ username, password }`

### Utilisateurs (`/users`)
- `POST /users/exist-username` : Vérifie l'existence d'un nom d'utilisateur `{ username }`

### Sondages (`/polls`)
- `GET /polls` : Liste tous les sondages
- `GET /polls/:id` : Récupère un sondage par son ID
- `POST /polls` : Crée un nouveau sondage (authentifié, admin)
- `POST /polls/:id/vote` : Vote pour une ou plusieurs options d'un sondage (authentifié)
- `GET /polls/:id/results` : Récupère les résultats d'un sondage

> Toutes les routes (hors `/auth`) nécessitent un token JWT dans l'en-tête `Authorization: Bearer <token>`.

## API Swagger
La documentation interactive de l'API est disponible via Swagger (si activé) sur `/api`.

## Auteur
- Projet technique ASREC
