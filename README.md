# Frontend ASREC

Ce dossier contient l'application frontend du projet ASREC, développée avec [React](https://react.dev/) et [Vite](https://vitejs.dev/).

## Prérequis
- Node.js >= 18
- npm >= 9

## Installation
1. Placez-vous dans le dossier `front` :
   ```sh
   cd front
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```

## Lancement de l'application
- En développement :
  ```sh
  npm run dev
  ```
- L'application sera accessible sur [http://localhost:5173](http://localhost:5173) par défaut.

## Structure principale
- `src/pages/` : Pages principales (auth, admin, public)
- `src/components/` : Composants réutilisables
- `src/services/` : Services pour l'appel à l'API
- `src/utils/` : Fonctions utilitaires

## Configuration
- Adapter l'URL de l'API backend dans les services si besoin (`src/services/`).

## Auteur
- Projet technique ASREC
