import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { company } from "@/lib/company";
/* -------------------------------------------------------------------------- */
/*  In-Memory IP Rate Limiter (5 requests / 15 minutes per IP)                */
/* -------------------------------------------------------------------------- */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const ipHits = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSec: number;
} {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Periodic cleanup if the map grows large
  if (ipHits.size > 1000) {
    for (const [key, timestamps] of ipHits.entries()) {
      const fresh = timestamps.filter((t) => t > windowStart);
      if (fresh.length === 0) ipHits.delete(key);
      else ipHits.set(key, fresh);
    }
  }

  const recent = (ipHits.get(ip) ?? []).filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS) {
    const oldestInWindow = recent[0];
    const retryAfterSec = Math.max(
      1,
      Math.ceil((oldestInWindow + WINDOW_MS - now) / 1000),
    );
    ipHits.set(ip, recent);
    return { allowed: false, retryAfterSec };
  }

  recent.push(now);
  ipHits.set(ip, recent);
  return { allowed: true, retryAfterSec: 0 };
}

/* -------------------------------------------------------------------------- */
/*  Email Helpers                                                             */
/* -------------------------------------------------------------------------- */

type EnquiryPayload = {
  name?: string;
  company?: string;
  email?: string;
  interest?: string;
  message?: string;
  lang?: "en" | "ja";
  website?: string; // honeypot
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

function buildInternalHtml({
  name,
  org,
  email,
  interest,
  message,
  lang,
}: {
  name: string;
  org: string;
  email: string;
  interest: string;
  message: string;
  lang: "en" | "ja";
}) {
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f5f7f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Hiragino Sans','Yu Gothic',sans-serif;color:#0b1f33;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e2e8e8;">
            <tr>
              <td style="background-color:#0b1f33;padding:24px 32px;border-bottom:3px solid #2f9e6f;">
                <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#2f9e6f;">
                  New Website Enquiry · ${lang.toUpperCase()}
                </p>
                <h1 style="margin:8px 0 0;font-size:20px;font-weight:600;color:#ffffff;">
                  ${escapeHtml(interest)} — ${escapeHtml(org)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;color:#526577;width:130px;">Full name</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;font-weight:500;">${escapeHtml(name)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;color:#526577;">Organisation</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;font-weight:500;">${escapeHtml(org)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;color:#526577;">Work email</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#0e6b5c;text-decoration:none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;color:#526577;">Enquiry type</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e2e8e8;">${escapeHtml(interest)}</td>
                  </tr>
                </table>

                <div style="margin-top:24px;padding:18px 20px;background-color:#f5f7f7;border-left:3px solid #0e6b5c;">
                  <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#526577;">
                    Message
                  </p>
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#0b1f33;">
                    ${safeMessage}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#f5f7f7;border-top:1px solid #e2e8e8;font-size:12px;color:#526577;">
                Reply directly to this email to respond to ${escapeHtml(name)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildAutoReplyHtml({
  name,
  interest,
  lang,
}: {
  name: string;
  interest: string;
  lang: "en" | "ja";
}) {
  const isJa = lang === "ja";
  const safeName = escapeHtml(name);
  const safeInterest = escapeHtml(interest);

  return `
<!DOCTYPE html>
<html lang="${lang}">
  <body style="margin:0;padding:0;background-color:#f5f7f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Hiragino Sans','Yu Gothic',sans-serif;color:#0b1f33;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border:1px solid #e2e8e8;">
            <tr>
              <td style="background-color:#0b1f33;padding:24px 32px;border-bottom:3px solid #2f9e6f;">
                <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#2f9e6f;">
                  ${isJa ? company.legalNameJa : company.name}
                </p>
                <h1 style="margin:8px 0 0;font-size:19px;font-weight:600;color:#ffffff;">
                  ${isJa ? "お問い合わせを受け付けました" : "We have received your enquiry"}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;font-size:14px;line-height:1.8;color:#0b1f33;">
                <p style="margin:0 0 16px;">
                  ${isJa ? `${safeName} 様` : `Dear ${safeName},`}
                </p>
                <p style="margin:0 0 16px;">
                  ${
                    isJa
                      ? `この度は「${safeInterest}」についてお問い合わせいただき、誠にありがとうございます。内容を確認のうえ、日本本社の担当者より改めてご連絡いたします。`
                      : `Thank you for contacting ${escapeHtml(company.name)} regarding <strong>${safeInterest}</strong>. Our Japan headquarters team has received your message and will respond shortly.`
                  }
                </p>
                <p style="margin:0;color:#526577;font-size:13px;">
                  ${
                    isJa
                      ? `お急ぎの場合は、${escapeHtml(company.email)} まで直接ご連絡ください。`
                      : `For urgent matters, you may also reach us directly at <a href="mailto:${escapeHtml(company.email)}" style="color:#0e6b5c;">${escapeHtml(company.email)}</a>.`
                  }
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#f5f7f7;border-top:1px solid #e2e8e8;font-size:12px;line-height:1.6;color:#526577;">
                <strong>${escapeHtml(company.legalName)}</strong> (${escapeHtml(company.legalNameJa)})<br />
                ${escapeHtml(company.hq.city)} · ${escapeHtml(company.hq.address)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* -------------------------------------------------------------------------- */
/*  Route Handler                                                             */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request) {
  try {
    // 1. Rate-limit check
    const ip = getClientIp(req);
    const { allowed, retryAfterSec } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Too many enquiries sent from this network. Please wait a few minutes before trying again.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSec) },
        },
      );
    }

    // 2. Verify SMTP config
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      ENQUIRY_FROM_EMAIL,
      ENQUIRY_TO_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("[Enquiry API] Missing SMTP_HOST, SMTP_USER, or SMTP_PASS");
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 500 },
      );
    }

    const body = (await req.json()) as EnquiryPayload;

    // Silent success for bot submissions that fill the hidden honeypot field
    if (body.website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim() ?? "";
    const org = body.company?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const interest = body.interest?.trim() || "General Enquiry";
    const message = body.message?.trim() ?? "";
    const lang: "en" | "ja" = body.lang === "ja" ? "ja" : "en";

    if (!name || !org || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (maximum 5,000 characters)." },
        { status: 400 },
      );
    }

    const port = Number(SMTP_PORT ?? 465);
    const secure = SMTP_SECURE ? SMTP_SECURE === "true" : port === 465;
    const fromEmail = ENQUIRY_FROM_EMAIL ?? SMTP_USER;
    const toEmail = ENQUIRY_TO_EMAIL ?? company.email;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // 3. Send internal notification to HQ
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Enquiry (${interest}): ${org}`,
      html: buildInternalHtml({ name, org, email, interest, message, lang }),
      text: `Name: ${name}\nOrganisation: ${org}\nEmail: ${email}\nType: ${interest}\n\n${message}`,
    });

    // 4. Send auto-reply confirmation to sender (non-blocking if it fails)
    try {
      await transporter.sendMail({
        from: fromEmail,
        to: email,
        replyTo: toEmail,
        subject:
          lang === "ja"
            ? `【${company.legalNameJa}】お問い合わせありがとうございます`
            : `Thank you for contacting ${company.name}`,
        html: buildAutoReplyHtml({ name, interest, lang }),
        text:
          lang === "ja"
            ? `${name} 様\n\n「${interest}」についてお問い合わせいただきありがとうございます。日本本社の担当者より改めてご連絡いたします。\n\n${company.legalNameJa}`
            : `Dear ${name},\n\nThank you for contacting ${company.name} regarding ${interest}. Our Japan headquarters team has received your enquiry and will respond shortly.\n\n${company.legalName}`,
      });
    } catch (autoReplyErr) {
      console.warn("[Nodemailer auto-reply warning]", autoReplyErr);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[Enquiry API error]", err);
    return NextResponse.json(
      { error: "Unable to process your enquiry right now. Please try again." },
      { status: 500 },
    );
  }
}
