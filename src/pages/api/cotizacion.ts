import type { APIRoute } from "astro";

export const prerender = false;

const SUCURSALES = {
  "1": "1 local",
  "2-3": "2 a 3 locales",
  "4+": "4 o más locales",
} as const;

type SucursalKey = keyof typeof SUCURSALES;

const FIELD_LIMITS = {
  nombre: 80,
  apellido: 80,
  telefono: 25,
  email: 254,
  negocio: 120,
} as const;

const MAX_BODY_BYTES = 8_000;
const RESEND_TIMEOUT_MS = 10_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort, per-instance limiter. Vercel can run several instances, so this
// is a first line of defense, not a replacement for platform-level limits.
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Collapses control characters so user input cannot break email headers. */
function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = rateLimitHits.get(ip);

  if (!current || current.resetAt <= now) {
    if (rateLimitHits.size > 1_000) {
      for (const [key, entry] of rateLimitHits) {
        if (entry.resetAt <= now) rateLimitHits.delete(key);
      }
    }
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function readField(
  payload: Record<string, unknown>,
  key: keyof typeof FIELD_LIMITS,
): string | null {
  const raw = payload[key];
  if (typeof raw !== "string") return null;

  const value = oneLine(raw);
  if (!value || value.length > FIELD_LIMITS[key]) return null;

  return value;
}

function buildEmailHtml(params: {
  nombreCompleto: string;
  telefono: string;
  email: string;
  negocio: string;
  sucursalesLabel: string;
  fechaLima: string;
  waLink: string;
}): string {
  const {
    nombreCompleto,
    telefono,
    email,
    negocio,
    sucursalesLabel,
    fechaLima,
    waLink,
  } = params;

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nueva solicitud de cotización - Fogonería</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f6f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,sans-serif;color:#292929;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f6f1ea;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#fffdf9;border:1px solid #eadfd4;border-radius:16px;overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color:#c13614;padding:24px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#ffd2c7;font-weight:600;">
                        Fogonería · Cotizaciones
                      </p>
                      <h1 style="margin:6px 0 0;font-size:22px;line-height:1.25;color:#ffffff;font-weight:600;">
                        Nueva solicitud de cotización
                      </h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Resumen del negocio -->
            <tr>
              <td style="padding:24px 28px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#fff4f1;border:1px solid #ffd2c7;border-radius:12px;">
                  <tr>
                    <td style="padding:16px 20px;">
                      <p style="margin:0 0 4px;font-size:12px;color:#a03014;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">
                        Restaurante / Negocio
                      </p>
                      <p style="margin:0;font-size:18px;font-weight:600;color:#292929;">
                        ${escapeHtml(negocio)}
                      </p>
                      <p style="margin:8px 0 0;">
                        <span style="display:inline-block;background-color:#c13614;color:#ffffff;font-size:12px;font-weight:500;padding:4px 10px;border-radius:999px;">
                          ${escapeHtml(sucursalesLabel)}
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Detalle del contacto -->
            <tr>
              <td style="padding:16px 28px 24px;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#5d5d5d;text-transform:uppercase;letter-spacing:0.06em;">
                  Datos de contacto
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:13px;color:#5d5d5d;width:40%;">
                      Nombre completo
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:14px;color:#292929;font-weight:500;">
                      ${escapeHtml(nombreCompleto)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:13px;color:#5d5d5d;">
                      Correo electrónico
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:14px;color:#292929;font-weight:500;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#c13614;text-decoration:none;">
                        ${escapeHtml(email)}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:13px;color:#5d5d5d;">
                      Teléfono de contacto
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:14px;color:#292929;font-weight:500;">
                      <a href="tel:${escapeHtml(telefono)}" style="color:#292929;text-decoration:none;">
                        ${escapeHtml(telefono)}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:13px;color:#5d5d5d;">
                      Cantidad de sucursales
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #efe7de;font-size:14px;color:#292929;font-weight:500;">
                      ${escapeHtml(sucursalesLabel)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:13px;color:#5d5d5d;">
                      Fecha de solicitud
                    </td>
                    <td style="padding:10px 0;font-size:13px;color:#5d5d5d;">
                      ${escapeHtml(fechaLima)}
                    </td>
                  </tr>
                </table>

                <!-- Acciones rápidas -->
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                  <tr>
                    <td style="padding-right:10px;">
                      <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Propuesta Fogonería para ${negocio}`)}" style="display:inline-block;background-color:#c13614;color:#ffffff;font-size:13px;font-weight:500;text-decoration:none;padding:10px 18px;border-radius:999px;">
                        Responder por correo
                      </a>
                    </td>
                    ${
                      waLink
                        ? `<td>
                      <a href="${escapeHtml(waLink)}" style="display:inline-block;background-color:#fffdf9;color:#292929;border:1px solid #d9cfc4;font-size:13px;font-weight:500;text-decoration:none;padding:10px 18px;border-radius:999px;">
                        Abrir en WhatsApp
                      </a>
                    </td>`
                        : ""
                    }
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#faf6f0;border-top:1px solid #efe7de;padding:16px 28px;text-align:center;">
                <p style="margin:0;font-size:12px;color:#8a8783;">
                  Este mensaje fue generado automáticamente desde el formulario de cotizaciones de Fogonería.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export const POST: APIRoute = async ({ request }) => {
  if (isRateLimited(clientIp(request))) {
    return jsonResponse(
      {
        ok: false,
        error: "Recibimos varias solicitudes seguidas. Intenta nuevamente en unos minutos.",
      },
      429,
      { "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
    );
  }

  const apiKey = process.env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL ?? import.meta.env.RESEND_TO_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? import.meta.env.RESEND_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "Faltan variables de entorno de Resend: RESEND_API_KEY, RESEND_TO_EMAIL y RESEND_FROM_EMAIL.",
    );
    return jsonResponse(
      { ok: false, error: "El servicio de correo no está configurado." },
      500,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse(
      { ok: false, error: "Formato de solicitud inválido." },
      415,
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse(
      { ok: false, error: "La solicitud es demasiado grande." },
      413,
    );
  }

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return jsonResponse(
        { ok: false, error: "La solicitud es demasiado grande." },
        413,
      );
    }
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      { ok: false, error: "Formato de solicitud inválido." },
      400,
    );
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return jsonResponse(
      { ok: false, error: "Formato de solicitud inválido." },
      400,
    );
  }

  const data = payload as Record<string, unknown>;

  // Honeypot: bots fill hidden fields. Answer success so they do not retry.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return jsonResponse({ ok: true });
  }

  const nombre = readField(data, "nombre");
  const apellido = readField(data, "apellido");
  const telefono = readField(data, "telefono");
  const email = readField(data, "email");
  const negocio = readField(data, "negocio");
  const sucursalesRaw = data.sucursales;

  if (!nombre || !apellido || !telefono || !email || !negocio) {
    return jsonResponse(
      { ok: false, error: "Por favor completa todos los campos obligatorios." },
      400,
    );
  }

  if (
    typeof sucursalesRaw !== "string" ||
    !Object.prototype.hasOwnProperty.call(SUCURSALES, sucursalesRaw)
  ) {
    return jsonResponse(
      { ok: false, error: "Selecciona una cantidad de sucursales válida." },
      400,
    );
  }

  if (!EMAIL_RE.test(email)) {
    return jsonResponse(
      { ok: false, error: "Ingresa un correo electrónico válido." },
      400,
    );
  }

  const telefonoLimpio = telefono.replace(/[^\d]/g, "");
  if (telefonoLimpio.length < 6) {
    return jsonResponse(
      { ok: false, error: "Ingresa un teléfono de contacto válido." },
      400,
    );
  }

  const sucursales = sucursalesRaw as SucursalKey;
  const sucursalesLabel = SUCURSALES[sucursales];
  const nombreCompleto = `${nombre} ${apellido}`;
  const waNumber =
    telefonoLimpio.length === 9 ? `51${telefonoLimpio}` : telefonoLimpio;
  const waLink = waNumber.length >= 8 ? `https://wa.me/${waNumber}` : "";
  const fechaLima = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date());

  const html = buildEmailHtml({
    nombreCompleto,
    telefono,
    email,
    negocio,
    sucursalesLabel,
    fechaLima,
    waLink,
  });

  const text = [
    "Nueva solicitud de cotización - Fogonería",
    "=========================================",
    `Restaurante / Negocio: ${negocio}`,
    `Sucursales: ${sucursalesLabel}`,
    `Nombre completo: ${nombreCompleto}`,
    `Email: ${email}`,
    `Teléfono: ${telefono}`,
    `Fecha: ${fechaLima}`,
  ].join("\n");

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Nueva cotización: ${negocio} (${sucursalesLabel})`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });
  } catch (error) {
    console.error("No se pudo conectar con Resend:", error);
    return jsonResponse(
      {
        ok: false,
        error: "No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.",
      },
      502,
    );
  }

  const resendData = await resendResponse.json().catch(() => null);

  if (!resendResponse.ok) {
    console.error(
      "Error enviando correo con Resend:",
      resendResponse.status,
      resendData,
    );
    return jsonResponse(
      {
        ok: false,
        error: "No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.",
      },
      502,
    );
  }

  return jsonResponse({ ok: true });
};

export const ALL: APIRoute = () =>
  new Response(null, {
    status: 405,
    headers: { Allow: "POST", "Cache-Control": "no-store" },
  });
