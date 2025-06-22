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



# Front 

## Technologies
- **Langage** : TypeScript
- **Framework** : React
- **UI** : Material UI (MUI)
- **Icônes** : lucide.dev

## Fichiers 
- `src/components/` : Composants réutilisables (boutons, formulaires, etc.)
- `src/pages/` : Pages principales de l'application (liste des sondages, création de sondage, etc.)
- `src/services/` : Services pour les appels API (pollsService, authService, etc.)


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

