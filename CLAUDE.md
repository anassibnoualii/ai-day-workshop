# AI Day Workshop

## Overview

Event management app for an AI workshop day. React frontend + PocketBase backend. Supports bilingual
content (FR/EN), live event control, team scoring, challenge cards, and workshop guides.

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Vite 7, Zustand (state), react-i18next (i18n),
  react-router-dom v6
- **Backend:** PocketBase v0.36.5 (SQLite-based BaaS), deployed via Docker
- **Realtime:** PocketBase SSE subscriptions (no polling)

## Project Structure

```
src/
├── pages/           # Route pages: Home, Live, Admin, Scoreboard, Rules, FeedbackRedirect
├── components/
│   ├── admin/       # Admin dashboard components
│   ├── live/        # Live event view (workshops, timer, guides, challenge cards)
│   ├── home/        # Landing page components
│   ├── rules/       # Rules page components
│   ├── layout/      # Layout shell, navbar
│   └── shared/      # Reusable UI primitives (Button, SectionHeading, etc.)
├── hooks/           # React hooks — data subscriptions via PB realtime
├── stores/          # Zustand store (eventStore.ts) — single global store
├── services/        # PocketBase API calls (CRUD per collection)
├── lib/             # Utilities: pocketbase client, timer math, guides URL builder, cards
├── types/           # TypeScript interfaces for all PB collections
└── i18n.ts          # i18next configuration
pb/
├── pb_migrations/   # PocketBase JS migrations (schema, seed data, guide uploads)
├── guides/          # Workshop guide markdown files (FR + EN), baked into Docker image
├── Dockerfile       # Alpine + PocketBase binary + guides
└── entrypoint.sh    # Superuser creation + PB serve with automigrate
public/
├── locales/         # i18n translation JSON files (fr/, en/)
└── guides/screenshots/  # SVG screenshots referenced by guide markdown
```

## Key Patterns

### Data Flow

All collections use PocketBase realtime SSE subscriptions (`usePolling.ts`). On mount, data is
fetched once, then the hook subscribes to `pb.collection(name).subscribe('*', ...)` for live
updates. Data flows into a single Zustand store (`eventStore.ts`).

### Collections

`event_state` (singleton), `workshops`, `teams`, `challenge_cards`, `score_history`, `config` (
singleton)

### Workshop Guides

Guide markdown files are stored as PocketBase file uploads on the `workshops` collection (
`guide_fr`, `guide_en` fields). Migration `003_upload_guides.js` uploads them using
`$filesystem.fileFromPath()`. SVG screenshots remain as static assets in
`public/guides/screenshots/`.

### Admin Auth

Admin page uses PocketBase superuser auth (`useAdminAuth.ts` + `authService.ts`). Credentials set
via `PB_ADMIN_EMAIL` / `PB_ADMIN_PASSWORD` env vars.

### i18n

Translations loaded from `public/locales/{fr,en}/translation.json` via i18next-http-backend.
Language detection is automatic.

## Environment Variables

| Variable            | Description                                              |
|---------------------|----------------------------------------------------------|
| `VITE_PB_URL`       | PocketBase server URL (default: `http://127.0.0.1:8090`) |
| `PB_ADMIN_EMAIL`    | Superuser email for PocketBase                           |
| `PB_ADMIN_PASSWORD` | Superuser password for PocketBase                        |

## Validation

Always run before committing:

```sh
npm run lint && npm run build
```

`npm run lint` runs ESLint. `npm run build` runs TypeScript type-checking (`tsc -b`) then Vite
production build.

## Code Review

After adding new code, run the `code-review` plugin to review changes before committing.
