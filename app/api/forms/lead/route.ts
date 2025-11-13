import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isEmail(s: string){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

export async function POST(req: NextRequest) {
  const data = await req.formData();
  // anti-spam
  const hp = String(data.get("company_website") || "");
  const ts = Number(data.get("ts") || "0");
  if (hp.trim() !== "" || Date.now() - ts < 1200) {
    return NextResponse.redirect(`${process.env.BASE_URL}/bedankt`, { status: 303 });
  }

  const service = String(data.get("service") || "seo");
  const name = String(data.get("name") || "").trim();
  const company = String(data.get("company") || "").trim();
  const email = String(data.get("email") || "").toLowerCase().trim();
  const phone = String(data.get("phone") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !company || !isEmail(email)) {
    return NextResponse.json({ ok:false, error:"invalid" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! }
  });

  const subject = `Nieuwe lead (${service.toUpperCase()}): ${company} – ${name}`;
  const html = `<h2>Nieuwe lead</h2>
  <p><b>Dienst:</b> ${service}</p>
  <p><b>Naam:</b> ${name}<br/><b>Bedrijf:</b> ${company}<br/><b>E-mail:</b> ${email}<br/><b>Tel:</b> ${phone || "-"}</p>
  <p><b>Bericht:</b><br/>${(message || "-").replace(/\n/g,"<br/>")}</p>`;

  await transporter.sendMail({
    from: process.env.LEAD_NOTIFY_FROM!,
    to: process.env.LEAD_NOTIFY_TO!,
    replyTo: email,
    subject,
    text: html.replace(/<[^>]+>/g,""),
    html
  });

  return NextResponse.redirect(`${process.env.BASE_URL}/bedankt?service=${encodeURIComponent(service)}`, { status: 303 });
}
