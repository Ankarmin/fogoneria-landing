import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://fogoneria-landing.vercel.app");
  const sitemap = new URL("/sitemap.xml", base).href;

  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
