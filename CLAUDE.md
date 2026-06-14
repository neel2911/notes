# Agent Instructions: "Mini Notion" Notes App

## Context

This repo is a personal, read-only knowledge base — a small "mini Notion" — built with React + Vite + TypeScript + Tailwind + shadcn/ui. Each course gets its own page of markdown notes, reachable via persistent navigation, plus a search page with autocomplete.

Decisions already made:
- TypeScript, React + Vite, Tailwind + shadcn/ui.
- Original `index.html` (old dark dashboard) and `README.md` were moved to `old-backup/` — kept as backup only, not a design reference.
- Notes content lives as one markdown file per course under `src/content/`, sourced from `old-backup/README.md` content.
- Notion-like aesthetic: clean, light, generous whitespace, Inter font.
- **Mobile-first**: layout, sidebar, search, and markdown content are designed for small screens first, with `sm:`/`md:`/`lg:` overrides for larger viewports — not the reverse.

## Architecture

```
src/
  main.tsx, App.tsx, index.css
  data/courses.ts          # array of {slug, title, platform, instructor, description}
  content/full-stack-fundamentals.md
  components/layout/AppLayout.tsx, NavContent.tsx
  components/markdown/MarkdownRenderer.tsx
  lib/search.ts
  pages/HomePage.tsx, CoursePage.tsx, SearchPage.tsx, NotFoundPage.tsx
```

- Routing: `BrowserRouter` + routes nested under `AppLayout` (`<Outlet/>`) so nav persists: `index` → HomePage, `course/:slug` → CoursePage, `search` → SearchPage, `*` → NotFoundPage.
- Layout (mobile-first): mobile uses a sticky top bar + hamburger opening a shadcn `Sheet` with nav (Home, Search, Courses); `md:` and up shows a persistent `aside` sidebar instead. Share one `<NavContent />` between both. Touch targets ≥44px on mobile.
- `src/data/courses.ts` is the single source of truth driving sidebar nav, home page cards, and search.
- Markdown rendering (`MarkdownRenderer.tsx`): `react-markdown` + `remarkGfm` + `rehypeRaw` + `rehypeHighlight`, wrapped in `@tailwindcss/typography`'s `prose prose-neutral max-w-none`. Tables/code blocks must scroll horizontally on mobile, not break layout.
- `CoursePage`: loads markdown via `import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default', eager: true })` keyed by path, looked up via `getCourseBySlug`. Missing course/file → `NotFoundPage`.
- `SearchPage`: shadcn `Command` (inline, `shouldFilter={false}`) + `src/lib/search.ts`'s `searchCourses(query)` — simulated async (~300ms), throws on literal query `"error"` to demo the error state. State machine: `loading` (Skeleton rows) → `error` (inline message) → `done` + empty (`CommandEmpty`) → `done` + results (`CommandGroup`/`CommandItem`, `onSelect` navigates to `/course/:slug`).

## Adding a new course

1. Add a markdown file to `src/content/<slug>.md`.
2. Add a matching entry to `src/data/courses.ts` (`slug`, `title`, `platform`, `instructor`, `description`).
3. No other wiring needed — nav, home page, course route, and search all derive from `courses.ts` + the glob import.

## Verification

`npm run dev`, then check at mobile width (~375px) and desktop (~1280px):
- Mobile: hamburger opens Sheet nav, taps navigate and close it; no horizontal overflow (tables/code scroll within their own container).
- Desktop: persistent sidebar, hamburger hidden.
- Nav persists across Home ↔ Search ↔ Course (no full reload).
- Course page: all sections render; GFM tables, syntax-highlighted code blocks, and `<details>` blocks work and are tappable on mobile.
- Search: typing filters after a loading skeleton; empty query shows all; no match → empty state; query `"error"` → error state; selecting a result navigates.
- Unknown route → NotFoundPage within layout.
- `npm run build && npm run preview` succeeds with no TS errors.
