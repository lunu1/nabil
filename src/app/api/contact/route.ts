import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // honeypot & basic validation
    if (body.website) return NextResponse.json({ ok: true }); // silently accept spam
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // If SMTP not configured, mock-send so the UI still works during setup
    const hasSmtp =
      !!process.env.SMTP_HOST &&
      !!process.env.SMTP_USER &&
      !!process.env.SMTP_PASS &&
      !!process.env.CONTACT_TO;

    if (!hasSmtp) {
      console.log("[contact] Mock send:\n", JSON.stringify(body, null, 2));
      return NextResponse.json({ ok: true, mock: true });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: !!process.env.SMTP_SECURE, // set "true" if you use 465
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    const subject = `New inquiry from ${body.name}`;
    const html = `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ""}
      ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${(body.message || "").replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: `"Website" <${process.env.SMTP_FROM || process.env.SMTP_USER!}>`,
      to: process.env.CONTACT_TO!,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("POST /api/contact error:", e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
