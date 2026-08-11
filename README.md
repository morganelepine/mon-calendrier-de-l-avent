# Mon calendrier de l'avent

Application de calendrier de l'avent composée de trois parties :

- un client mobile et web en Expo / React Native
- une API Express / TypeScript connectée à PostgreSQL via Prisma
- une page web statique ([web/](./web)) : politique de confidentialité de l'application

## Fonctionnalités principales

- Décompte jusqu'à Noël
- Calendrier proposant chaque jour 3 contenus autour de Noël et un mini-jeu
- Deux bingos (téléfilms de Noël et activités de Noël)
- Système de scores et classement par score
- Gestion de groupes pour suivre les scores de ses ami·e·s

## Stack technique

### Client

- Expo 53
- React 19
- React Native 0.79
- Expo Router
- TypeScript

### Serveur

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL

## Prérequis

- Node.js 20 ou version récente compatible avec Expo 53 et Prisma 6
- npm
- Une base PostgreSQL accessible depuis le serveur
- Expo Go ou un émulateur pour les tests mobiles

## Installation

Les dépendances sont gérées séparément dans chaque package.

### 1. Installer le client

```bash
cd client
npm install
```

### 2. Installer le serveur

```bash
cd server
npm install
```

## Configuration

### Client

Le client utilise deux variables Expo publiques pour choisir l'API selon l'environnement de build.

Fichier conseillé : `client/.env`

```env
EXPO_PUBLIC_API_URL_DEV=http://localhost:3000
EXPO_PUBLIC_API_URL_PROD=https://your-production-api.example.com
EXPO_PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
```

En développement, l'application lit `EXPO_PUBLIC_API_URL_DEV`.
En production, elle lit `EXPO_PUBLIC_API_URL_PROD`.

`EXPO_PUBLIC_SENTRY_DSN` active le reporting d'erreurs Sentry. Laissé vide, Sentry est simplement désactivé.

### Serveur

Le serveur attend au minimum :

```env
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
```

`SENTRY_DSN` active le reporting d'erreurs Sentry côté serveur. Laissé vide, Sentry est simplement désactivé.

## Démarrage local

### 1. Initialiser la base

Depuis le dossier `server` :

```bash
npm run db:setup
```

Le seed initialise la clé `min_required_version` utilisée par le client pour la vérification de version.

### 2. Lancer l'API

```bash
cd server
npm run dev
```

API disponible sur `http://localhost:3000`.

### 3. Lancer le client

```bash
cd client
npm start
```

Commandes utiles :

```bash
npm run android
npm run ios
npm run web
```

## Scripts utiles

### Client

```bash
npm start       # lance Expo
npm run android # ouvre sur Android
npm run ios     # ouvre sur iOS
npm run web     # ouvre la version web
npm run lint    # lint Expo
npm run build   # export web statique
npm run check:tsc
```

### Serveur

```bash
npm run dev      # démarrage en developpement
npm run build    # compilation TypeScript vers dist/
npm run start    # exécution du build
npm run ts.check # vérification TypeScript
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed:appconfig
npm run db:setup
```

## API exposée

### Utilisateurs

- `GET /users`
- `POST /users`
- `GET /users/search?query=...&groupId=...`
- `GET /users/:uuid`
- `DELETE /users/:uuid`

### Scores

- `POST /scores`
- `GET /scores/user/:uuid`
- `GET /scores/total/user/:uuid`
- `GET /scores/leaderboard`

### Groupes

- `POST /groups`
- `GET /groups/:userId`
- `POST /groups/:groupId/members`
- `DELETE /groups/:groupId/members`

### Version applicative

- `GET /version` : retourne `min_required_version`
