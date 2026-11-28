# AGENTS.md — fogoneria-landing

Astro 7 landing (Spanish) for Fogonería, a Business Management System for restaurants. Single page: `src/pages/index.astro` composes `layout/` + `landing/` sections inside `layouts/BaseLayout.astro`. The page is prerendered; the only server route is `POST /api/cotizacion` (Resend), deployed with the `@astrojs/vercel` adapter.

## Commands (pnpm only, Node >=22.12.0)

```sh
pnpm install
pnpm dev        # localhost:4321
pnpm build      # output to dist/
pnpm preview
pnpm astro ...  # e.g. pnpm astro check
```

No test / lint / typecheck scripts, no CI workflows. Verify with `pnpm build`.

> Windows: `pnpm-workspace.yaml` sets `nodeLinker: hoisted` because the Vercel adapter bundles the function by creating symlinks, which fails with `EPERM` on Windows without Developer Mode. Keep that setting unless the adapter changes; Vercel's Linux build is unaffected.

## Structure

- `src/pages/index.astro` — only page; section order: Hero → QuienesSomos → Funcionalidades → Testimonials (#reviews) → Cotizaciones → Faq.
- `src/pages/api/cotizacion.ts` — `POST` endpoint (`prerender = false`) that validates the quote form and sends the email through Resend.
- `src/components/landing/` — page sections (Hero, QuienesSomos, Funcionalidades, Testimonials, Cotizaciones, Faq); `layout/` — Navbar, Footer; `ui/` — Button, Card, SectionHeader, ThemeToggle, SectionDivider (1px faded-ends hairline between sections), DeviceMockup (CSS-only laptop/phone; renders the real screenshot via `<Image>` or the watermark fallback when no image is passed).
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
- Quote form: keep client and server validation in sync (limits in `src/pages/api/cotizacion.ts`); keep the honeypot field `website` empty and hidden. The form posts JSON to `/api/cotizacion`; the success block is focused for screen readers.

## Email (Resend)

`POST /api/cotizacion` needs these env vars in `.env` (locally) and in Vercel → Project Settings → Environment Variables (Production and Preview):

| Variable | Required | Notes |
| --- | :---: | --- |
| `RESEND_API_KEY` | Yes | `re_...` secret; never commit it. |
| `RESEND_TO_EMAIL` | Yes | Inbox that receives quote requests. |
| `RESEND_FROM_EMAIL` | Yes | Sender verified in Resend (e.g. `Fogonería <cotizaciones@tudominio.com>`). |

`.env` is gitignored; `.env.example` documents the variables. Redeploy after changing them.

> En Vercel, cargá los valores **sin comillas**. Vercel no las interpreta como dotenv: las guarda literalmente, y Resend rechaza el `from` con `422` (`"Fogonería <...>"` no es un remitente válido). El endpoint normaliza comillas por defensa, pero lo correcto es no incluirlas.

## Dev server

`astro dev --background`; manage with `astro dev stop|status|logs`.
