<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Len Ấm — Yarn & Knitting Storefront

Next.js 16 (App Router) marketing/storefront site for a Vietnamese hand-knitting yarn shop ("Len Ấm" = "Warm Yarn"). All copy is Vietnamese — write new copy in Vietnamese unless told otherwise. See [DESIGN.md](DESIGN.md) for the visual system.

## Stack
- Next.js 16.2, React 19.2, TypeScript (strict)
- Tailwind CSS v4 — tokens defined via CSS vars + `@theme` in `src/app/globals.css`, no `tailwind.config.*`
- Zustand (`src/store/useStore.ts`) — single store: mock product catalog, cart, filters, workshop registrations (persisted to `localStorage` manually, no `persist` middleware)
- `motion` (the Framer Motion successor package) for all animation. `gsap`/`@gsap/react` are installed but only referenced by `YarnThread.tsx`, which is unused dead code

## Structure
- `src/app/page.tsx` — home page; all sections are inlined here (hero, value props, category bento grid, bestsellers, newsletter, workshop CTA)
- `src/app/yarns/page.tsx` — product listing with client-side filter/sort over the in-memory product array (no API/backend — everything is mock data in `useStore.ts`)
- `src/components/` — `Navbar`, `Footer`, `ProductCard`, `WorkshopModal`, `LoadingScreen` are live and imported. `CTA.tsx`, `Features.tsx`, `Hero.tsx`, `InteractiveDemo.tsx`, `YarnThread.tsx` are **unused** — don't extend or wire them up without checking whether they're actually still needed first
- No backend, no DB, no auth, no real checkout — cart/workshop registration is client-only state

## Conventions
- Reuse the color/spacing/shadow tokens from `globals.css` (`bg-background`, `text-ink`, `text-ink-muted`, `text-accent`, `shadow-warm-*`, `rounded-card`/`rounded-btn`) instead of hardcoding hex values or arbitrary Tailwind values
- Recurring "framed card" look: wrap in `.double-bezel-outer` > `.double-bezel-inner`, not a one-off border+shadow combo
- Prices are raw VND integers (e.g. `480000`), no currency-formatting helper exists — add one if you need to format money in more than one place
- Client components (`"use client"`) are the norm here; there are no Server Components/Server Actions in use
