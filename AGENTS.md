# AGENTS.md — fogoneria-landing

Astro 7 static landing (Spanish) for Fogonería, a Business Management System for restaurants. Single page: `src/pages/index.astro` composes `layout/` + `landing/` sections inside `layouts/BaseLayout.astro`.

## Commands (pnpm only, Node >=22.12.0)

```sh
pnpm install
pnpm dev        # localhost:4321
pnpm build      # output to dist/
pnpm preview
pnpm astro ...  # e.g. pnpm astro check
```

No test / lint / typecheck scripts, no CI workflows. Verify with `pnpm build`.

## Structure

- `src/pages/index.astro` — only route; section order: Hero → QuienesSomos → Funcionalidades → Testimonials (#reviews) → Cotizaciones → Faq.
- `src/components/landing/` — page sections (Hero, QuienesSomos, Funcionalidades, Testimonials, Cotizaciones, Faq); `layout/` — Navbar, Footer; `ui/` — Button, Card, SectionHeader, ThemeToggle, SectionDivider (1px faded-ends hairline between sections), DeviceMockup (CSS-only laptop/phone with empty screen + `<!-- SCREENSHOT -->` slot: replace the watermark div with a real `<Image>` when screenshots arrive).
- `src/lib/` — single source of truth: `site.ts` (outbound URLs), `landing.ts` (reviews, faqs, funcionalidades, heroHud), `cn.ts` (`twMerge`-based `cn`, no `clsx`).
- `src/assets/` — images imported in code (Astro-optimized); `public/` — only `favicon.*` served verbatim.
- `src/styles/globals.css` — Tailwind v4 (`@import "tailwindcss"`, `@theme`, `@custom-variant`); no `tailwind.config`.

## Conventions

- Styling: use theme tokens (`bg-surface`, `text-ink-900/600/400`, `bg-primary`/`hover:bg-primary-hover`, `text-xs/nav/sm/section`) — never hardcode palette hex, font sizes, or weights outside `globals.css`. Only `font-normal` (400) / `font-medium` (500).
- Dark mode: `.dark` class on `<html>` + `localStorage fogoneria:theme`, set by inline pre-hydration script in `BaseLayout.astro`. Keep the `ThemeToggle.astro` + script pattern; don't switch to `prefers-color-scheme`-only or `class="dark"` on body.
- Content: edit copy/data in `src/lib/landing.ts` and `src/lib/site.ts`, not inside section components.
- Outbound links: landing has no auth/onboarding logic — always link via `ORIGIN_URLS` from `src/lib/site.ts`. Override origin with `PUBLIC_ORIGIN_URL` env (defaults to `http://localhost:3000` for the Next.js monolith); never hardcode `localhost:3000` URLs in components.
- Astro config: Tailwind is wired via `@tailwindcss/vite` in `astro.config.mjs` — keep it there, don't add a Tailwind config file or PostCSS setup.
- Fonts: `@fontsource-variable/inter` + `@fontsource/oswald` (600/700, display only via `.font-display`) imported in `globals.css`; font stack is SF Pro → Inter Variable fallback — don't add webfont links (fontsource npm packages are OK).

## Dev server

`astro dev --background`; manage with `astro dev stop|status|logs`.
