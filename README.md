# AI Agent Day — Interactive Event Platform

React + Vite web app with PocketBase backend for a 6-hour gamified workshop event (max 60 users). Features a live timer, scoreboard, digital challenge cards, bilingual support (FR/EN), and an admin dashboard.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS 4 |
| State | Zustand |
| i18n | i18next (FR default / EN toggle) |
| Backend | PocketBase (SQLite) |
| Sync | Client polling every 3s |
| Hosting | Railway / Azure Static Web Apps + Container Apps |

## Prerequisites

- Node.js 22+ (use `nvm use` to auto-select from `.nvmrc`)
- npm 10+
- Docker (for PocketBase)

## Quick Start

Run everything with one command:

```bash
./start.sh
```

This builds and starts PocketBase, creates collections, seeds demo data, installs deps, and starts the frontend.

- Frontend: http://localhost:5173
- PocketBase admin: http://127.0.0.1:8090/_/
- Admin login: `admin@agentday.com` / `adminadmin123`

To stop PocketBase:

```bash
./stop.sh
```

## Manual Setup

```bash
nvm use
npm install
cp .env.example .env
```

### Run PocketBase (backend)

```bash
cd pb
docker build -t pb-agentday .
docker run -d --name pb-agentday -p 8090:8090 -v pb_data:/pb/pb_data pb-agentday
```

Then create the collections and seed data:

```bash
./pb/setup.sh http://127.0.0.1:8090
```

On first run, this creates a superuser (`admin@agentday.com` / `adminadmin123`), all collections, and demo data. You can pass custom credentials:

```bash
./pb/setup.sh http://127.0.0.1:8090 your@email.com yourpassword
```

### Run Frontend (dev)

```bash
npm run dev
```

App runs at http://localhost:5173.

### Production Build

```bash
npm run build
```

Output goes to `dist/`.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_PB_URL` | `http://127.0.0.1:8090` | PocketBase server URL |

## Deploy to Railway

This project is configured for Railway with two services.

### 1. PocketBase service

- Create a new service in your Railway project
- Set root directory to `pb`
- Railway auto-detects the Dockerfile at `pb/Dockerfile`
- Add a volume mounted at `/pb/pb_data` to persist the database
- After deploy, run `./pb/setup.sh https://your-pb-url.up.railway.app` to create collections and seed data

### 2. Frontend service

- Create a new service in your Railway project
- Set root directory to `/` (repo root)
- Railway auto-detects the Dockerfile at `Dockerfile`
- Set the `VITE_PB_URL` variable to your PocketBase service URL (e.g. `https://pb-agentday-production.up.railway.app`)

### Quick steps

```
1. Create a new Railway project
2. Add service -> GitHub repo -> root dir: pb       (PocketBase)
3. Add service -> GitHub repo -> root dir: /        (Frontend)
4. Add a volume to the PocketBase service at /pb/pb_data
5. Set VITE_PB_URL on the frontend service
6. Deploy
```

## Dependencies

### Runtime

| Package | Purpose |
|---|---|
| `react`, `react-dom` | UI framework |
| `react-router-dom` | Client-side routing (`/`, `/live`, `/admin`, `/rules`, `/feedback`) |
| `zustand` | Lightweight state management |
| `pocketbase` | PocketBase JS SDK |
| `tailwindcss`, `@tailwindcss/vite` | Utility-first CSS |
| `i18next`, `react-i18next` | Internationalization |
| `i18next-http-backend` | Load translation JSON files |
| `i18next-browser-languagedetector` | Auto-detect browser language |

### Dev

| Package | Purpose |
|---|---|
| `vite` | Build tool and dev server |
| `typescript` | Type checking |
| `@vitejs/plugin-react` | React Fast Refresh for Vite |
| `eslint`, `typescript-eslint` | Linting |

## Project Structure

```
src/
  pages/          5 route pages (Home, Live, Admin, Rules, FeedbackRedirect)
  components/
    layout/       Navbar, Footer, LanguageToggle
    shared/       Timer, Scoreboard, ChallengeCard, TeamSelector, PointAnimation
    home/         HeroSection, AboutSection, ProgrammeTimeline, Deliverables, Gamification
    live/         ActiveWorkshopHero, DayProgress, MyChallengeCard, Resources, Feedback
    admin/        Login, SessionTabs, WorkshopActivator, Timer, Scores, Cards, Links
    rules/        FlagSystem, ScoringTable, CardGrid, AwardsSection
  hooks/          Polling hooks, useTimer, useAdminAuth
  stores/         Zustand store (eventStore)
  lib/            PocketBase client, timer math, 15 challenge cards catalog
  types/          TypeScript interfaces
public/
  locales/        FR + EN translation JSON files
  teams-manifest.json   Microsoft Teams Tab manifest
pb/
  Dockerfile            PocketBase container
  setup.sh              Creates collections + seeds demo data via API
  pb_schema.json        Collection schema reference
```
