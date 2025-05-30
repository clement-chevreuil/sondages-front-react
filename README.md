# Projet ASREC

ASREC est une application complète de gestion de sondages, composée d'un backend (API NestJS) et d'un frontend (React + Vite). Ce projet permet la création, la gestion et la participation à des sondages en ligne, avec une authentification sécurisée et une interface moderne.

## Fonctionnalités principales
- Authentification JWT (inscription, connexion)
- Gestion des utilisateurs (vérification d'existence, droits admin)
- Création, édition et suppression de sondages (admin)
- Vote sur les sondages (utilisateurs authentifiés)
- Consultation des résultats en temps réel
- Interface utilisateur réactive et moderne

## Architecture générale

```
+-------------------+         HTTP/REST         +-------------------+
|    Frontend       | <-----------------------> |     Backend       |
|  (React + Vite)   |                          |   (NestJS, Node)  |
+-------------------+                          +-------------------+
        |                                               |
        |                                               |
        |<---------- Base de données PostgreSQL -------->|
```

- **Frontend** :
  - Situé dans le dossier `front/`
  - Développé avec React, Vite, CSS modules
  - Appels API via des services JS (`src/services/`)
  - Pages principales : Authentification, Liste des sondages, Vote, Résultats, Admin

- **Backend** :
  - Situé dans le dossier `back/`
  - Développé avec NestJS, TypeORM
  - Structure modulaire : `auth`, `user`, `poll`
  - API REST sécurisée par JWT
  - Documentation Swagger disponible sur `/api`

- **Base de données** :
  - PostgreSQL (ou autre, selon configuration)
  - Modélisation : Utilisateurs, Sondages, Options, Votes

## Flux d'utilisation
1. Un utilisateur s'inscrit puis se connecte (JWT)
2. Il accède à la liste des sondages publics
3. Il peut voter sur un sondage (1 seul vote par sondage)
4. Un administrateur peut créer de nouveaux sondages
5. Les résultats sont consultables en temps réel

## Arborescence
- `back/` : Backend NestJS (API, logique métier, accès BDD)
- `front/` : Frontend React (UI, appels API)
- `test/` : Tests end-to-end (backend)

## Lancement rapide
1. Suivre les instructions dans `back/README.md` et `front/README.md` pour installer et démarrer chaque partie.
2. Adapter les fichiers `.env` pour la configuration locale.

## Technologies principales
- **Backend** : Node.js, NestJS, TypeORM, JWT, PostgreSQL
- **Frontend** : React, Vite, Axios, CSS

## Compte administrateur par défaut

Lors de l'initialisation du projet, un compte administrateur est automatiquement créé en base de données avec les identifiants suivants :
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `admin`
