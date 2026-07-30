# HARMONICA

You are a senior Fullstack WEB developer

## Commands

```bash
npm start          # Dev server at https://harmonica.local
npm run build      # Production build into build/
npm test           # Jest in watch mode
npm test -- --watchAll=false   # Single test run (CI mode)
npm test -- --testPathPattern="ComponentName"  # Run a specific test file
```

Uses `craco` (Create React App Configuration Override) — do not use `react-scripts` directly.

## Local environment

The dev server runs on `https://harmonica.local` (port 443), never on localhost.
Config lives in the committed `.env.development`; the hosts-file entry and the
mkcert certificate in `certs/` are one-time machine setup — see `README.md`.

TLS is not cosmetic: `getDisplayMedia`/`getUserMedia` in
`@features/audio/soundRecorder` require a secure context, which a custom
hostname only gets over HTTPS. Do not "simplify" the setup back to plain HTTP.

## Architecture

**Feature-Slice Design (FSD)** with path aliases configured in both `jsconfig.json` and `craco.config.js`:

| Alias | Path | Purpose |
|-------|------|---------|
| `@app/*` | `src/app/*` | Root app component and HOC providers (`withRouter`, `withHelmet`) |
| `@pages/*` | `src/pages/*` | Page entry components + routing config in `_routers/` |
| `@widgets/*` | `src/widgets/*` | Composed container components (one per page) |
| `@features/*` | `src/features/*` | Business logic (audio recording, sidebar nav) |
| `@entities/*` | `src/entities/*` | Domain entities (currently empty) |
| `@shared/*` | `src/shared/*` | Shared utilities (currently empty) |
| `@assets/*` | `src/assets/*` | Images, video, audio, fonts |

**Data flow**: Pages render Widgets; Widgets compose Features. State lives in React component state (`useState`) — Redux is installed but not used for a store.

## Key Tech

- **React 18 + React Router DOM 7** — routing defined in `src/pages/_routers/`
- **React Bootstrap 2 / Bootstrap 5** — UI components
- **Framer Motion** — page transition animations (`AnimatePresence` + `motion.div`)
- **SCSS Modules** (`.module.scss`) — scoped component styles
- **React Helmet Async** — document head management via `withHelmet` provider
- **Web Audio API** (native) — microphone recording in `@features/audio/soundRecorder`

## Routing

| Route | Widget | Description |
|-------|--------|-------------|
| `/` | `preview` | Landing page with video background |
| `/home` | `main` | Main hub with sidebar |
| `/create` | `create` | Sound recorder with 10 harmonica note buttons |

## Code Style

Prettier config (`.prettierrc`): no semicolons, single quotes, 2-space indent, trailing commas (ES5), 80-char print width, always-parens for arrow functions.
