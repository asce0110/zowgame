# AGENT.md

## Project
- Name: ZowGame
- Stack: Next.js 15, React 18, TypeScript, App Router
- Package manager: pnpm
- Build mode: static export via `next build`
- Primary purpose: browser game landing pages with playable embeds, clear guides, and SEO-friendly game detail pages

## Commands
- Dev: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`

## Routing and URL Rules
- Use App Router patterns under `app/`
- Homepage route is `/`
- Game detail pages should use the shared dynamic route pattern under `/games/[slug]/`
- Legacy routes may exist temporarily for redirects, but new game pages should not create fresh one-off top-level routes unless explicitly requested
- Because the site uses static export, any dynamic route must support build-time generation
- For dynamic game pages, ensure `generateStaticParams()` covers every published game slug

## SEO Rules
- Use Next App Router metadata as the source of truth for SEO
- Prefer `generateMetadata()` or route-level `metadata` exports
- Do not rely on client-side head mutation for production SEO
- Canonical URLs must point to the preferred HTTPS production URL
- Structured data should be rendered from shared game data, not hardcoded per page
- Sitemap entries must stay aligned with the current canonical route structure

## Content and Data Rules
- Keep game content in code, in shared game data modules
- Prefer extending the shared game catalog over duplicating page logic
- When adding a new game, aim for: add one new game record, then reuse the existing route/template system
- Write player-facing copy, not internal SEO jargon
- Do not claim official developer/publisher status unless explicitly authorized
- Credit original creators where appropriate

## UI and Component Rules
- Reuse existing components before creating new ones
- Reuse the existing `ec-*` design token system in `src/styles/theme.css`
- Keep the current dark-style system compatible with `theme` and `darkVariant`
- Avoid redesigning unrelated sections when implementing focused changes
- Prefer targeted edits over broad rewrites

## Static Export Constraints
- `next.config.mjs` uses:
  - `output: 'export'`
  - `trailingSlash: true`
  - `images.unoptimized: true`
- Do not introduce features that require a server runtime unless explicitly approved
- Be careful with App Router features that are incompatible with static export

## Hydration and Client-State Rules
- Avoid SSR/client mismatches
- Do not initialize rendered values from nondeterministic sources on first render
- Avoid using `Math.random()`, `Date.now()`, locale-dependent formatting, or `localStorage` during initial render when the value affects visible HTML
- If client persistence is needed, render a stable default first and then hydrate from `useEffect`

## File Change Preferences
- Prefer editing existing files over creating new ones
- Create new files only when they clearly improve the shared architecture
- Keep new abstractions minimal and justified by repeated use

## Validation Requirements
- After meaningful code changes, run `pnpm build`
- If the change affects SSR/client rendering, explicitly watch for hydration issues
- If the change affects routing or SEO, verify:
  - route output
  - canonical URL logic
  - metadata uniqueness
  - structured data generation
  - sitemap alignment

## Current Architecture Notes
- Shared game data lives in `src/app/data/`
- The multi-game direction should center on a shared catalog and shared game page template
- Homepage should act as a player-facing hub and internally link to published games
- Game pages should contain crawlable content below/around the embed, not just the iframe

## Avoid
- Reintroducing removed admin/editor UI flows unless explicitly requested
- Moving SEO responsibility back into client-only components
- Creating new game pages by copying and hardcoding entire existing page files
- Adding unnecessary dependencies for simple UI/content/routing tasks
