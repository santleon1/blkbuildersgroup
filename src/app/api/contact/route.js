import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // Quick validation
    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      SMTP_TO,
    } = process.env;

    // Helpful debug: which envs are present?
    const missing = [];
    if (!SMTP_HOST) missing.push("SMTP_HOST");
    if (!SMTP_PORT) missing.push("SMTP_PORT");
    if (!SMTP_USER) missing.push("SMTP_USER");
    if (!SMTP_PASS) missing.push("SMTP_PASS");
    if (!SMTP_FROM) missing.push("SMTP_FROM");
    if (!SMTP_TO)   missing.push("SMTP_TO");

    if (missing.length) {
      console.error("Missing email envs:", missing.join(", "));
      return Response.json({ ok: false, error: "Server email is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // Gmail app password prefers 465
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const html = `
      <h2>New website message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject: `BLK Builders – Message from ${name}`,
      replyTo: email,
      html,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
