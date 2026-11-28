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
| `PUBLIC_ORIGIN_URL` | No | URL del sistema principal (default dev `http://localhost:3000`; default prod `https://fogoneria-system.vercel.app`). |
| `PUBLIC_SITE_URL` | No | URL pública del landing para canonical, OG y sitemap (default `https://fogoneria-landing.vercel.app`). |

> En Vercel, cargá los valores **sin comillas**. Vercel no las interpreta como un archivo `.env`: las guarda literalmente y Resend rechaza el remitente con `422`. El endpoint las normaliza por defensa, pero lo correcto es no incluirlas.

El formulario incluye consentimiento explícito para el tratamiento de datos y envía JSON a `/api/cotizacion`; el endpoint valida los campos y el consentimiento, aplica límites de tamaño, honeypot y un rate limit best-effort, y manda un correo HTML + texto plano con `reply_to` al prospecto.

> El footer no publica email ni teléfono placeholders. El canal de contacto es el formulario; si agregás datos reales, centralizalos en `src/lib/site.ts` y verificá que el dominio tenga MX. La política de privacidad vive en `/privacidad`; revisá el responsable/RUC con asesoría legal antes de publicar.

## Estructura

```text
src/
  pages/
    index.astro          # página principal (Hero → QuienesSomos → Funcionalidades → TrustStrip → Cotizaciones → FAQ)
    api/cotizacion.ts    # endpoint serverless del formulario
    404.astro            # 404 con marca
    privacidad.astro     # política de privacidad del formulario
    terminos.astro       # términos y condiciones del servicio
    sitemap.xml.ts       # sitemap estático generado desde Astro.site
    robots.txt.ts        # robots + sitemap
  components/
    landing/             # secciones de la página
    layout/              # Navbar y Footer
    ui/                  # Button, Card, SectionHeader, DeviceMockup, ThemeToggle, SectionDivider
  lib/
    site.ts              # URLs salientes (ORIGIN_URLS)
    landing.ts           # copy y datos de la landing
  assets/                # imágenes optimizadas por Astro
  styles/globals.css     # tokens y estilos (Tailwind v4)
vercel.json              # headers de seguridad
```

La página incluye canonical, Open Graph/Twitter, JSON-LD (`Organization` + `FAQPage`), skip link, temas claro/oscuro persistentes y movimiento reducido. No se publican testimonios hasta tener reseñas reales con permiso.

Las convenciones de código y contenido están en [`AGENTS.md`](./AGENTS.md).
