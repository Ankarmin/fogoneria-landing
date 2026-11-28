/** URL del monolito Next.js (auth real, términos).
 *  En desarrollo usa localhost:3000; en producción, el sistema real.
 *  Se puede sobreescribir con PUBLIC_ORIGIN_URL en .env o Vercel. */
const DEFAULT_ORIGIN = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://fogoneria-system.vercel.app";

export const ORIGIN =
  import.meta.env.PUBLIC_ORIGIN_URL ?? DEFAULT_ORIGIN;

export const ORIGIN_URLS = {
  home: `${ORIGIN}/`,
  terminos: `${ORIGIN}/terminos`,
} as const;
