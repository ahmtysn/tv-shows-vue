# TV ShowHub

A TV show dashboard built with Vue 3 that displays shows grouped by genre, sorted by rating, with detail pages and search — powered by the [TVMaze API](https://www.tvmaze.com/api).

## Quick Start

```bash
node -v   # requires ^20.19.0 || >=22.12.0  (developed on 22.22.2)
npm -v    # 10.9.7

npm install
npm run dev       # http://localhost:5173
npm run test:unit # vitest
npm run build     # production build
```

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| State | Pinia |
| Routing | Vue Router (`/`, `/search?q=`, `/show/:id`) |
| Build | Vite |
| Language | TypeScript |
| Tests | Vitest + Vue Test Utils |
| Styling | Scoped CSS + CSS custom properties (design tokens) |

## Architecture Decisions

**Pinia over composable-only state** — Pinia provides devtools integration, HMR support, and a standardized store pattern. For an app with shared state across routes (shows, search), a proper store is more maintainable than passing refs around.

**`useAsyncData` composable** — Loading, error, and data states follow the same pattern everywhere. A generic composable with TypeScript overloads removes boilerplate from stores and views while keeping each consumer explicit about what it fetches.

**CSS design tokens over a CSS framework** — Assignment asks to minimize scaffolding/boilerplate. Custom properties in `tokens.css` give consistent theming (dark/light) and spacing without a library dependency. Trade-off: more manual work, but full control and zero bundle cost.

**Separate `SearchResultsView` with URL sync** — Search lives on `/search?q=term` so results are shareable and browser back/forward works naturally. The search store remains the single source of truth; the router only mirrors the query parameter.

**`?embed=cast` over separate cast endpoint** — TVMaze supports embedding related resources in a single request. One HTTP round-trip instead of two means simpler loading states and no race conditions.

**Defensive rendering** — All API data access uses optional chaining (`rating?.average`, `schedule?.days`). The show summary is sanitized before `v-html` rendering. Invalid route params are caught by regex constraints (`:id(\\d+)`) and a 404 catch-all.

## Trade-offs

- **No SSR / SSG** — A client-side SPA is sufficient for this scope. Server rendering would improve SEO and initial load but adds deployment complexity.
- **No pagination** — The TVMaze show index returns 250 shows per page. We load page 0 only. Infinite scroll or pagination would be needed for a full catalog.
- **No response caching** — API responses are fetched fresh on each navigation. A caching layer (service worker, HTTP cache headers, or in-memory TTL) would reduce redundant requests in production.
- **Scoped CSS over CSS Modules** — Scoped CSS is simpler and Vue-idiomatic. CSS Modules would give stricter isolation but add verbosity for minimal benefit at this scale.

## Project Structure

```
src/
├── assets/          # tokens.css (design tokens, theming)
├── components/      # Reusable UI (ShowCard, GenreRow, SearchBar, ErrorBox, ...)
├── composables/     # Shared logic (useAsyncData, useDebounce, useTheme)
├── router/          # Route definitions
├── services/        # API layer (tvmaze.ts)
├── stores/          # Pinia stores (shows, search)
├── types/           # TypeScript interfaces
└── views/           # Route-level pages (Home, Search, ShowDetail, NotFound)
tests/               # Unit tests mirroring src/ structure
```
