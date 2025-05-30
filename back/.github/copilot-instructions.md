# Global

## Projets : 
- Permettre la création, la gestion et la participation à des sondages en ligne.
- Les utilisateurs peuvent s’inscrire, se connecter, voter à des sondages, consulter les résultats.
- Les administrateurs peuvent créer, modifier, supprimer des sondages et gérer les utilisateurs.
- Garantir qu’un utilisateur ne vote qu’une seule fois par sondage.
- Fournir une API RESTful sécurisée pour toutes les opérations (CRUD sondages, options, votes, utilisateurs).
- Assurer une séparation claire des responsabilités via une architecture modulaire et clean architecture.

## Informations complémentaires
- Pas de systeme d'authentification pour l'instant, mais possibilité de l'ajouter plus tard.

# Backend 

## Tests

# Mappage automatique entre entités et DTOs
- Utiliser `@automapper/nestjs` pour mapper les entités aux DTOs et vice versa.


## Technologies
- **Langage** : TypeScript
- **Framework** : NestJS
- **ORM** : TypeORM
- **Base de données** : PostgreSQL
- **Gestion des dépendances** : npm
- **Contrôle de version** : Git
- **Environnement de développement** : Visual Studio Code
- **API** : RESTful (conçue avec les contrôleurs NestJS)
- **Validation** : class-validator (pour la validation des DTOs et des entrées utilisateur)

- **Librairies principales** :
  - `@nestjs/common`, `@nestjs/core` : cœur du framework NestJS
  - `typeorm` : ORM pour la gestion de la base de données
  - `pg` : driver PostgreSQL
  - `class-validator`, `class-transformer` : validation et transformation des DTOs
  - `bcrypt` : hashage des mots de passe
  - **Mapping/DTOs** :
    - `@automapper/core`, `@automapper/classes`, `@automapper/nestjs` : mapping automatique entre entités et DTOs

## Requetes API

### Polls
- **GET /polls** : Récupérer tous les sondages
- **GET /polls/:id** : Récupérer un sondage par son ID
- **POST /polls** : Créer un nouveau sondage et ses options (si utilisateur admin)
- **DELETE /polls/:id** : Supprimer un sondage (si utilisateur admin)
- **PUT /polls/:id** : Mettre à jour un sondage existant et ses options (si utilisateur admin)
- **POST /polls/:id/vote** : Voter pour une option d'un sondage (si utilisateur connecté)

### Users
- **POST /users** : Créer un nouvel utilisateur (inscription)
- **POST /auth/login** : Authentifier un utilisateur (connexion)

# Front 
## Technologies
- **Langage** : TypeScript
- **Framework** : React
- **UI** : Material UI (MUI)
- **Icônes** : lucide.dev

# Architecture clean architecture like this 

```
└── 📁src
    └── 📁modules
        └── 📁user                
            └── 📁domain
                └── 📁services
                └── 📁entities
                └── 📁exceptions
                └── 📁repositories
            └── 📁infrastructure
                └── 📁mappers
                └── 📁repositories
            └── 📁interface
                └── 📁controllers
                └── 📁Commands
                └── 📁Queries
                └── 📁Response
            └── user.module.ts
    └── app.controller.spec.ts
    └── app.module.ts
    └── main.ts
```


# 📦 Schéma de Base de Données – Application de Sondages

## 🗂️ Table: `polls`

| Champ        | Type        | Contraintes                         |
|--------------|-------------|-------------------------------------|
| id           | UUID        | Primary Key, auto-généré            |
| title        | VARCHAR     | NOT NULL                            |
| description  | TEXT        | Optionnel                           |
| singleChoice | BOOLEAN     | NOT NULL, défaut : `true`           |
| createdAt    | TIMESTAMP   | NOT NULL, DEFAULT: `now()`          |

---

## 🗂️ Table: `poll_options`

| Champ    | Type    | Contraintes                                 |
|----------|---------|---------------------------------------------|
| id       | UUID    | Primary Key, auto-généré                     |
| label    | VARCHAR | NOT NULL                                    |
| pollId   | UUID    | Foreign Key → `polls(id)`, ON DELETE CASCADE|

---

## 🗂️ Table: `users`

| Champ      | Type      | Contraintes                             |
|------------|-----------|-----------------------------------------|
| id         | UUID      | Primary Key, auto-généré                |
| username   | VARCHAR   | NOT NULL, UNIQUE                        |
| password   | VARCHAR   | NOT NULL                                |
| createdAt  | TIMESTAMP | DEFAULT: `now()`                        |
| isAdmin    | BOOLEAN   | NOT NULL, DEFAULT: `false`              |

---

## 🗂️ Table: `votes`

| Champ     | Type      | Contraintes                                            |
|-----------|-----------|--------------------------------------------------------|
| id        | UUID      | Primary Key, auto-généré                               |
| userId    | UUID      | Foreign Key → `users(id)`, ON DELETE CASCADE          |
| pollId    | UUID      | Foreign Key → `polls(id)`, ON DELETE CASCADE          |
| optionId  | UUID      | Foreign Key → `poll_options(id)`, ON DELETE CASCADE   |
| createdAt | TIMESTAMP | DEFAULT: `now()`                                      |

🔐 **Contraintes uniques** : (`userId`, `pollId`)  
→ Empêche un utilisateur de voter plusieurs fois sur le même sondage.

