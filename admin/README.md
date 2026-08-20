# Backoffice — Calendrier de l'Avent

SPA Vite + React + TypeScript pour éditer les `Content` (anecdotes/idées/jeux/histoire) stockés en
Postgres. Voir `server/README.md` pour le modèle de données et l'API admin.

## Démarrer en local

```
npm install
cp .env.example .env   # VITE_API_URL pointe vers le serveur local par défaut
npm run dev
```

Le serveur (`../server`) doit tourner en parallèle avec `ADMIN_PASSWORD_HASH` et
`ADMIN_SESSION_SECRET` renseignés dans `server/.env` (voir `npm run admin:hash-password` côté
serveur pour générer un hash).

## Déploiement

Projet Vercel séparé de `client/` et `server/` (préréglage "Vite"), avec `VITE_API_URL` pointant
vers le serveur déployé.
