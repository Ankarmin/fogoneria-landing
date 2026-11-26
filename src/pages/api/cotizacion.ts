import type { APIRoute } from "astro";

export const prerender = false;

const SUCURSALES_LABEL: Record<string, string> = {
  "1": "1 local",
  "2-3": "2 a 3 locales",
  "4+": "4 o más locales",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function buildEmailHtml(params: {
  nombreCompleto: string;
  telefono: string;
  telefonoLimpio: string;
  email: string;
  negocio: string;
  sucursalesLabel: string;
  fechaLima: string;
}): string {
  const {
    nombreCompleto,
    telefono,
    telefonoLimpio,
    email,
    negocio,
    sucursalesLabel,
    fechaLima,
  } = params;

  const waLink =
    telefonoLimpio.length >= 8
      ? `https://wa.me/${telefonoLimpio}`
      : "";

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
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const toEmail =
    import.meta.env.RESEND_TO_EMAIL ||
    process.env.RESEND_TO_EMAIL ||
    "sebastian.chicata@gmail.com";
  const fromEmail =
    import.meta.env.RESEND_FROM_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    "Fogonería <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("Falta configurar la variable de entorno RESEND_API_KEY.");
    return jsonResponse(
      { ok: false, error: "El servicio de correo no está configurado." },
      500,
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      { ok: false, error: "Formato de solicitud inválido." },
      400,
    );
  }

  const nombre = String(payload.nombre ?? "").trim();
  const apellido = String(payload.apellido ?? "").trim();
  const telefono = String(payload.telefono ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const negocio = String(payload.negocio ?? "").trim();
  const sucursales = String(payload.sucursales ?? "").trim();

  if (!nombre || !apellido || !telefono || !email || !negocio || !sucursales) {
    return jsonResponse(
      { ok: false, error: "Por favor completa todos los campos obligatorios." },
      400,
    );
  }

  if (!EMAIL_RE.test(email)) {
    return jsonResponse(
      { ok: false, error: "Ingresa un correo electrónico válido." },
      400,
    );
  }

  const sucursalesLabel = SUCURSALES_LABEL[sucursales] ?? sucursales;
  const nombreCompleto = `${nombre} ${apellido}`;
  const telefonoLimpio = telefono.replace(/[^\d]/g, "");
  const fechaLima = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Lima",
  }).format(new Date());

  const html = buildEmailHtml({
    nombreCompleto,
    telefono,
    telefonoLimpio,
    email,
    negocio,
    sucursalesLabel,
    fechaLima,
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

  const resendResponse = await fetch("https://api.resend.com/emails", {
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
  });

  const resendData = await resendResponse.json().catch(() => null);

  if (!resendResponse.ok) {
    console.error("Error enviando correo con Resend:", resendResponse.status, resendData);
    return jsonResponse(
      {
        ok: false,
        error: "No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.",
      },
      502,
    );
  }

  return jsonResponse({ ok: true, id: resendData?.id }, 200);
};
