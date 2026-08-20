## Content model

Calendar content is split in two, by how often each part changes:

- **Jours** and **Bingo** are plain static files bundled into the client
  (`client/data/days_data.js`, `client/data/bingos/*.js`), edited directly in the repo. They
  change roughly once a year, so a rebuild-to-edit trade-off is fine. No server route serves them.
- **Contenus** (anecdotes, games, ideas, story) lives in Postgres via Prisma's `Content` /
  `ContentListItem` models (`server/prisma/schema.prisma`), served read-only at
  `GET /content/contents`. This is the content that's actually edited often, hence the backoffice
  below. `ContentListItem` gives `idea`/`list` rows a real one-to-many relation (with an explicit
  `order` column) instead of a JSON blob for what the client sees as `listOfContents`.

### Backoffice

`admin/` (separate Vite + React SPA, own `package.json`) is the admin UI for editing `Content` —
see `admin/README.md`. Auth is a single shared password: `ADMIN_PASSWORD_HASH` and
`ADMIN_SESSION_SECRET` in `server/.env` (generate a hash via `npm run admin:hash-password`), checked
by `POST /admin-auth/login`, which sets a signed HTTP-only session cookie. `requireAdminAuth`
guards everything under `/admin`.

`/admin` and `/admin-auth` use a strict CORS origin allowlist (`ADMIN_ORIGINS` in `server/.env`,
comma-separated — `http://localhost:5173` is always allowed) instead of the open CORS the rest of
the API uses, since they're the only routes reading a credentialed cookie — an open origin there
would allow CSRF. Set `ADMIN_ORIGINS` to the deployed `admin/` URL once it's live.
