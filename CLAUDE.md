# CLAUDE.md

## Repository layout

"Mon calendrier de l'avent" — a French advent calendar app. Four independent packages, each with its own `package.json` / `node_modules` (no workspace tooling, run commands from inside each folder):

- `client/` — Expo (SDK 54) / React Native 0.81 / Expo Router app. Ships as an Android app (EAS) and as an iOS-oriented web PWA (`expo export --platform web`, deployed on Vercel).
- `server/` — Express + TypeScript API on PostgreSQL via Prisma, deployed on Vercel as a serverless function.
- `admin/` — Vite + React SPA backoffice for editing `Content` rows (separate Vercel project).
- `web/` — single static `index.html` privacy policy page (separate Vercel project).

## Commands

```bash
# client/
npm start            # runs `tsc --noEmit` first (prestart), then `expo start`
npm run check:tsc    # type-check only
npm run lint         # expo lint (ESLint; .ts files require explicit return types)
npm run android | ios | web
npm run build        # expo export --platform web (PWA)
npx eas build --platform android --profile preview   # test APK (separate package id, "Calendrier TEST")

# server/
npm run dev          # node --watch + ts-node on src/server.ts, PORT (default 3001)
npm run ts.check     # tsc type-check (also emits to dist/)
npm run build        # rimraf dist && tsc
npm run prisma:generate
npm run prisma:migrate          # prisma migrate deploy (applies existing migrations)
npx prisma migrate dev --name <name>   # create a new migration after editing schema.prisma
npm run admin:hash-password     # generate ADMIN_PASSWORD_HASH
npm run pwa:hash-code           # generate the hashed PWA access code

# admin/
npm run dev          # Vite on http://localhost:5173 (VITE_API_URL -> local server)
npm run build        # tsc --noEmit && vite build
```

## Server architecture

- `src/index.ts` builds and exports the Express app (it is the Vercel entry point, see `vercel.json`); `src/server.ts` only calls `listen` for local dev. `src/instrument.ts` (Sentry) must stay the first import.
- Routing is declarative: each `src/routes/*.routes.ts` exports an array of `{ method, route, controller, action }`. `registerRoutes` instantiates the controller class per request and calls `action`. The controller's **return value** becomes the JSON response (if it has a `status` field it's used as the HTTP status); returning `undefined` means the controller already wrote the response itself; returning `null` sends `null`. Thrown errors are captured by Sentry and turned into a 500. New routes must be added to the `registerRoutes` calls in `index.ts`.
- `src/lib/prisma.ts` exports two Prisma clients on the same schema: `prisma` (`DATABASE_URL`, per-environment data: users, scores, groups...) and `contentPrisma` (`CONTENT_DATABASE_URL`, a database shared between dev and prod for `Content` / `ContentListItem`). Use `contentPrisma` for content queries; content models must keep zero FK relations to the other models. `postinstall` runs `prisma generate`.
- Vercel crons call `/notifications/send-daily-reminder` (Dec 1–25 and all of October) which pushes via Expo push tokens stored on `User.pushToken`.
- RevenueCat webhook (`/webhooks/revenuecat`) syncs `User.isPremium` / `premiumSince`.
- `GET /version` returns `min_supported_version` (force update) and `latest_version` (recommended update) from `AppVersionRequirement`.

## Content model (split by edit frequency)

- **Days and bingos** are static JS files bundled in the client (`client/data/days_data.js`, `days_data_october.js`, `client/data/bingos/*.js`, `client/data/day-25-gifts/`). Edited in-repo, no API.
- **Contents** (anecdote / story / idea / game) live in Postgres (`Content` + `ContentListItem`), edited via `admin/`, served read-only by `GET /content/contents`, which only returns rows whose `years` contains the current year (empty `years` = draft). `idea/personality_quiz` and `idea/cards` store JSON in `content1`; formats are defined in `admin/src/constants/personalityQuiz.ts` and `cards.ts`. Add next season's year to `admin/src/constants/years.ts`.
- Contents have a `season` (Christmas / Halloween). The client fetches all contents once per session (`client/services/content.service.ts`, cached promise, prefetched in the root layout) and filters by the current season: October = Halloween, otherwise Christmas.

## Client architecture

- Path alias `@/*` → `client/*`. Routes in `client/app/` (Expo Router); main tabs under `app/(tabs)/` (calendar, bingo/games, scores, informations).
- `app/_layout.tsx` nests the provider/gate stack, order matters: `UserProvider` → `AccessGate` (web/PWA only: mobile-only, shared access code verified by `/access/verify`, must run as installed home-screen app) → `InitializationGate` (`hooks/useInitialization.tsx`) → `VersionGate` (force/recommended update) → Score / CountdownVariant / MusicSelection / DailySong / Premium contexts.
- No auth: identity is a UUID generated on first launch and persisted in AsyncStorage (`constants/storageKeys.ts`); the server creates a `User` with a generated username. Some AsyncStorage keys are reset yearly.
- All date logic goes through `constants/Dates.ts`. To test as a specific date, set `DEBUG_FAKE_TODAY` there (and use `getNow()` for ticking displays, never `Date.now()` directly). Remember to set it back to `null`.
- API calls go through `services/apiFetch.ts` (timeout, `ApiError`, Sentry reporting: 4xx as warnings). `API_URL` comes from `EXPO_PUBLIC_API_URL_DEV` when `__DEV__`, else `EXPO_PUBLIC_API_URL_PROD`.
- Platform splits: `*.web.ts` files (e.g. `share.service.web.ts`) and `Platform.OS === "web"` checks. Sharing is disabled on the PWA and in Expo Go.
- Premium ("La Hotte Magique", RevenueCat, Android only) in `contexts/PremiumContext.tsx`, gated by `EXPO_PUBLIC_PREMIUM_ENABLED` (set per EAS profile in `eas.json`; `true` in preview/closed-testing, `false` in production) or `__DEV__`. Expo Go uses `EXPO_PUBLIC_REVENUECAT_TEST_STORE_KEY`.
- Android home-screen widgets live in `client/widgets/`; the headless task handler is registered in `client/index.ts`. The widget plugin is added in `app.config.js` except in production builds while `WIDGETS_ENABLED` is false.
- Images are served from Cloudinary (`services/cloudinary.service.ts`, IDs referenced in code).

## Conventions

- Code comments and identifiers in English; all user-facing text (UI strings, notifications, admin labels) in French.
- After a change, type-check each package touched: `npm run check:tsc` (client), `npm run ts.check` (server), `npx tsc --noEmit` (admin).
