# Fogonería — Landing

Landing en español para Fogonería, el Business Management System para restaurantes (pedidos, cocina, inventario, caja y reportes).

## Stack

- Astro 7 (página estática prerenderizada)
- Tailwind CSS v4 vía `@tailwindcss/vite`
- `@astrojs/vercel` para el endpoint `POST /api/cotizacion`
- Resend para el envío de solicitudes de cotización

## Requisitos

- Node.js >= 22.12.0
- pnpm

## Comandos

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # genera dist/
pnpm preview
```

> El repo fija `nodeLinker: hoisted` en `pnpm-workspace.yaml` porque el adapter de Vercel crea symlinks al empaquetar la función y Windows sin Modo desarrollador falla con `EPERM`. Si aun así falla, activá el Modo desarrollador o usá WSL. En Vercel (Linux) no aplica.

## Variables de entorno

Copiá `.env.example` a `.env` para desarrollo. En producción, configurá las mismas variables en Vercel → Project Settings → Environment Variables (Production y Preview) y volvé a desplegar.

| Variable | Obligatoria | Descripción |
| --- | :---: | --- |
| `RESEND_API_KEY` | Sí | API key de Resend (`re_...`). No se commitea. |
| `RESEND_TO_EMAIL` | Sí | Correo que recibe las solicitudes de cotización. |
| `RESEND_FROM_EMAIL` | Sí | Remitente verificado en Resend, por ejemplo `Fogonería <cotizaciones@tudominio.com>`. |
| `PUBLIC_ORIGIN_URL` | No | URL del sistema principal (default `http://localhost:3000`). |

El formulario envía JSON a `/api/cotizacion`; el endpoint valida los campos, aplica límites de tamaño, honeypot y un rate limit best-effort, y manda un correo HTML + texto plano con `reply_to` al prospecto.

## Estructura

```text
src/
  pages/
    index.astro          # única página (Hero → QuienesSomos → Funcionalidades → Reseñas → Cotizaciones → FAQ)
    api/cotizacion.ts    # endpoint serverless del formulario
  components/
    landing/             # secciones de la página
    layout/              # Navbar y Footer
    ui/                  # Button, Card, SectionHeader, DeviceMockup, ThemeToggle, SectionDivider
  lib/
    site.ts              # URLs salientes (ORIGIN_URLS)
    landing.ts           # copy y datos de la landing
  assets/                # imágenes optimizadas por Astro
  styles/globals.css     # tokens y estilos (Tailwind v4)
```

Las convenciones de código y contenido están en [`AGENTS.md`](./AGENTS.md).
