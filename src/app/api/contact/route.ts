import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER;
    const toAddress = process.env.MAIL_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: "Thank you for contacting Basita Technology",
      text: `Hi ${name},\n\nThank you for contacting Basita Technology. We have received your inquiry, and our team will get back to you within 24–48 hours.\n\nIn the meantime, if you'd like to add anything to your request, simply reply to this email and we'll make sure it reaches the right team.\n\nYour message:\n${message}\n\nWarm regards,\nBasita Technology`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
