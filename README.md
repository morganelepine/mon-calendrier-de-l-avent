# Mon calendrier de l'avent

Application de calendrier de l'avent composée de quatre parties :

- un client mobile et web en Expo / React Native ([client/](./client)) : app Android et PWA web
- une API Express / TypeScript connectée à PostgreSQL via Prisma ([server/](./server))
- un backoffice Vite / React pour éditer les contenus ([admin/](./admin))
- une page web statique ([web/](./web)) : politique de confidentialité de l'application

## Fonctionnalités principales

- Décompte jusqu'à Noël
- Calendrier proposant chaque jour 3 contenus autour de Noël et un mini-jeu
- Saison Halloween en octobre (contenus et bingo dédiés)
- Bingos (téléfilms de Noël, films, activités de Noël, Halloween)
- Jeu quotidien 2048 avec classement
- Système de scores et classement par score
- Gestion de groupes pour suivre les scores de ses ami·e·s
- Notifications quotidiennes (Android)
- Offre premium « La Hotte Magique » via RevenueCat (Android)
- Widgets de décompte sur l'écran d'accueil (Android)

## Stack technique

### Client

- Expo 54
- React 19.1
- React Native 0.81
- Expo Router
- TypeScript
- Sentry, RevenueCat, EAS Build

### Serveur

- Node.js
- Express
- TypeScript
- Prisma 6
- PostgreSQL
- Déployé sur Vercel (fonction serverless + crons)

### Backoffice

- Vite
- React 19
- React Router
- TypeScript

## Prérequis

- Node.js 20 ou version récente compatible avec Expo 54 et Prisma 6
- npm
- Une base PostgreSQL accessible depuis le serveur
- Expo Go ou un émulateur pour les tests mobiles

## Installation

Les dépendances sont gérées séparément dans chaque package :

```bash
cd client && npm install
cd server && npm install   # lance aussi `prisma generate`
cd admin && npm install
```

## Configuration

### Client

Fichier conseillé : `client/.env`

```env
EXPO_PUBLIC_API_URL_DEV=http://localhost:3001
EXPO_PUBLIC_API_URL_PROD=https://your-production-api.example.com
EXPO_PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=xxxx
EXPO_PUBLIC_REVENUECAT_TEST_STORE_KEY=xxxx
```

En développement (`__DEV__`), l'application lit `EXPO_PUBLIC_API_URL_DEV`.
En production, elle lit `EXPO_PUBLIC_API_URL_PROD`.

`EXPO_PUBLIC_SENTRY_DSN` active le reporting d'erreurs Sentry. Laissé vide, Sentry est simplement désactivé.

`EXPO_PUBLIC_REVENUECAT_ANDROID_KEY` est la clé publique RevenueCat du projet Google Play, utilisée pour l'achat premium ("La Hotte Magique"). Dans Expo Go, c'est `EXPO_PUBLIC_REVENUECAT_TEST_STORE_KEY` qui est utilisée.

`EXPO_PUBLIC_PREMIUM_ENABLED` est défini par profil de build dans `client/eas.json` (`true` pour `preview` et `closed-testing`, `false` pour `production`). Le premium est toujours actif en développement.

### Serveur

Fichier : `server/.env`

```env
PORT=3001
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
CONTENT_DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
REVENUECAT_WEBHOOK_SECRET=xxxx
REVENUECAT_SECRET_API_KEY=xxxx
CRON_SECRET=xxxx
PWA_ACCESS_CODE_HASH=xxxx
ADMIN_PASSWORD_HASH=xxxx
ADMIN_SESSION_SECRET=xxxx
ADMIN_ORIGINS=https://your-admin.example.com
```

`DATABASE_URL` contient les données propres à chaque environnement (utilisateurs, scores, groupes...).
`CONTENT_DATABASE_URL` pointe vers la base des contenus (`Content` / `ContentListItem`), qui peut être partagée entre dev et prod.

`SENTRY_DSN` active le reporting d'erreurs Sentry côté serveur. Laissé vide, Sentry est simplement désactivé.

`REVENUECAT_WEBHOOK_SECRET` et `REVENUECAT_SECRET_API_KEY` synchronisent le statut premium ("La Hotte Magique") depuis RevenueCat. Voir `POST /webhooks/revenuecat` ci-dessous.

`CRON_SECRET` protège la route de notification quotidienne appelée par les crons Vercel.

`PWA_ACCESS_CODE_HASH` est le hash du code d'accès demandé sur la PWA (`npm run pwa:hash-code -- "mon-code"`).

`ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` et `ADMIN_ORIGINS` configurent l'accès au backoffice : voir [server/README.md](./server/README.md) et [admin/README.md](./admin/README.md).

### Backoffice

Fichier : `admin/.env` (copier `admin/.env.example`)

```env
VITE_API_URL=http://localhost:3001
```

## Démarrage local

### 1. Initialiser la base

Depuis le dossier `server` :

```bash
npm run prisma:generate
npm run prisma:migrate
```

Le client a besoin d'une ligne dans `AppVersionRequirement` (`minSupportedVersion`, `latestVersion`) pour la vérification de version.

### 2. Lancer l'API

```bash
cd server
npm run dev
```

API disponible sur `http://localhost:3001`.

### 3. Lancer le client

```bash
cd client
npm start
```

### 4. Lancer le backoffice (optionnel)

```bash
cd admin
npm run dev
```

Backoffice disponible sur `http://localhost:5173`.

## Scripts utiles

### Client

```bash
npm start         # vérifie TypeScript puis lance Expo
npm run android   # ouvre sur Android
npm run ios       # ouvre sur iOS
npm run web       # ouvre la version web
npm run lint      # lint Expo
npm run build     # export web statique (PWA)
npm run check:tsc # vérification TypeScript
npx eas build --platform android --profile preview # APK de test ("Calendrier TEST")
```

### Serveur

```bash
npm run dev       # démarrage en développement
npm run build     # compilation TypeScript vers dist/
npm run start     # exécution du build
npm run ts.check  # vérification TypeScript
npm run prisma:generate
npm run prisma:migrate          # applique les migrations existantes
npx prisma migrate dev --name x # crée une nouvelle migration
npm run admin:hash-password     # génère ADMIN_PASSWORD_HASH
npm run pwa:hash-code           # génère PWA_ACCESS_CODE_HASH
```

### Backoffice

```bash
npm run dev     # serveur de développement Vite
npm run build   # vérification TypeScript + build
npm run preview # aperçu du build
```

## Contenus

- Les **jours** et les **bingos** sont des fichiers statiques embarqués dans le client (`client/data/`).
- Les **contenus** (anecdotes, histoires, idées, jeux) sont stockés en base, édités via le backoffice et servis par `GET /content/contents`.

Détails du modèle de contenu : [server/README.md](./server/README.md).

## API exposée

### Accès PWA

- `POST /access/verify` : vérifie le code d'accès de la PWA

### Utilisateurs

- `POST /users`
- `GET /users/search?query=...&groupId=...`
- `GET /users/:uuid`
- `DELETE /users/:uuid`
- `POST /users/:uuid/push-token`

### Scores

- `POST /scores`
- `GET /scores/user/:uuid`
- `GET /scores/total/user/:uuid`
- `GET /scores/leaderboard`
- `GET /scores/leaderboard/around/:uuid`

### Groupes

- `POST /groups`
- `GET /groups/:userId`
- `POST /groups/:groupId/members`
- `DELETE /groups/:groupId/members`

### Jeu quotidien (2048)

- `POST /games/2048/score`
- `GET /games/2048/leaderboard`
- `GET /games/2048/leaderboard/around/:uuid`
- `GET /games/2048/stats/:uuid`

### Contenus

- `GET /content/contents` : contenus publiés pour l'année en cours

### Notifications

- `GET /notifications/send-daily-reminder` : appelée par les crons Vercel (1er–25 décembre et tout octobre), protégée par `CRON_SECRET`

### Premium (RevenueCat)

- `POST /webhooks/revenuecat` : synchronise `User.isPremium`/`premiumSince` depuis les events RevenueCat (achat, remboursement, transfert après réinstallation). Protégé par `REVENUECAT_WEBHOOK_SECRET`.

### Version applicative

- `GET /version` : retourne `min_supported_version` (mise à jour obligatoire), `latest_version` (mise à jour recommandée) et `min_required_version` (conservé pour les anciennes versions de l'app)

### Backoffice (cookie de session, CORS restreint)

- `POST /admin-auth/login`, `POST /admin-auth/logout`, `GET /admin-auth/me`
- `GET /admin/contents`, `GET /admin/contents/:id`, `POST /admin/contents`, `PUT /admin/contents/:id`, `DELETE /admin/contents/:id`
- `GET /admin/stats`
