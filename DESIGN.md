# DESIGN.md — Len Ấm Visual System

Warm, editorial, paper-textured aesthetic for a handmade-yarn brand. Think "artisan boutique catalog," not "SaaS dashboard." All tokens live in `src/app/globals.css`; never hardcode raw hex outside that file.

## Color

| Token | Value | Use |
|---|---|---|
| `--background` / `bg-background` | `#FAF6EF` | page background (warm off-white) |
| `--surface` / `bg-surface` | `#FFFCF7` | cards, inputs, raised panels |
| `--ink` / `text-ink` | `#2B2622` | primary text |
| `--ink-muted` / `text-ink-muted` | `#8C8175` | secondary/body text |
| `--accent-terracotta` / `text-accent` `bg-accent` | `#C17A56` | primary accent, CTAs, links |
| `--accent-sage` / `bg-accent-sage` | `#93A382` | secondary accent (used sparingly) |
| `--border` / `border-border-custom` | `#EAE2D6` | hairline borders |
| `--hover-fill` | `#F0E4D3` | hover backgrounds on chips/pills |

Accent hover state is a manual darker terracotta (`#A96340`) inlined at call sites — not a token yet.

## Typography

- **Serif** — `Fraunces` (`font-serif`) for all headings. Bold weight, generous size (`text-3xl` → `text-8xl` on hero), occasional `italic font-light` for an emphasized accent word.
- **Sans** — `Plus Jakarta Sans` (`font-sans`, default body). Body copy stays small (`text-xs`/`text-sm`) with `leading-relaxed`.
- Eyebrow labels: `text-[10px] uppercase tracking-[0.2em] font-semibold text-accent`.
- Both fonts load with `vietnamese` + `latin` subsets — don't drop the `vietnamese` subset when touching `layout.tsx`.

## Shape & Elevation

- Radii: `rounded-card` (24px, big surfaces/photos), `rounded-inner` (16px, nested media), `rounded-btn` (14px, buttons/inputs/pills).
- Shadows: `shadow-warm-sm/md/lg` — soft, warm-tinted (never pure black) double shadows defined in `@theme`.
- **Double-bezel card** — the signature container pattern:
  ```html
  <div class="double-bezel-outer shadow-warm-md">
    <div class="double-bezel-inner p-8"> ... </div>
  </div>
  ```
  Outer = tinted border frame with padding, inner = surface-colored content well with a subtle inset highlight. Use this instead of a plain bordered `div` for any "framed" card (value props, newsletter box, etc).
- Fixed `.noise-overlay` (SVG fractal noise, `opacity: 0.015`) sits over the whole page for a paper-grain feel — don't remove unless asked.

## Motion

- Library: `motion` (`import { motion } from "motion/react"`), not raw `framer-motion`.
- Entrance pattern: `initial={{ opacity: 0, y: ... }}` → `animate`/`whileInView` with `type: "spring"`, `stiffness` 60–300, `damping` 14–25 depending on how "snappy" vs "floaty" the element should feel (big hero cards = floaty/low stiffness, grid items = snappier/high stiffness).
- Staggering: parent `variants` with `staggerChildren` (0.08–0.12) + `containerVariants`/`itemVariants` pair, `viewport={{ once: true, margin: "-100px" }}` for scroll-triggered sections.
- Hover micro-interactions via `whileHover` (small rotate/translate/scale), not CSS `:hover` transitions, for anything already wrapped in `motion.div`.
- `AnimatePresence` for mount/unmount transitions (mobile filter drawer, modals).

## Layout

- Max content width: `max-w-7xl mx-auto px-6 md:px-8` for every section.
- Section rhythm: `py-28 md:py-36` between major home-page sections; alternating `bg-background` / `bg-[#FFFCF7]/60` bands with `border-y border-border-custom/50` to separate them without hard lines.
- Bento/asymmetric grids over uniform grids for image-led sections (`md:col-span-2` + `md:col-span-1` mixes).

## Content voice

- Vietnamese only, warm/poetic tone (e.g. "Dệt nên ấm áp từ đôi bàn tay"). Product names are evocative Vietnamese phrases + an English fiber descriptor (e.g. "Sương Sớm - Merino Silk Blend").
- Prices shown as plain VND integers with no formatting helper yet (e.g. `480000` renders as-is or manually divided by 1000 for "k" shorthand in filters).
