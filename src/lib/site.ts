/** URL del monolito Next.js (auth real, onboarding, demos, términos).
 *  Temporal: http://localhost:3000 — en producción cambiar a dominio final
 *  o definir PUBLIC_ORIGIN_URL en .env */
export const ORIGIN =
  import.meta.env.PUBLIC_ORIGIN_URL ?? "http://localhost:3000";

export const ORIGIN_URLS = {
  home: `${ORIGIN}/`,
  onboarding: `${ORIGIN}/onboarding`,
  terminos: `${ORIGIN}/terminos`,
  demo: (id: "criolla" | "postres" | "cafe") => `${ORIGIN}/demo/${id}`,
} as const;
