import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "rudranshsrivastava2525@gmail.com";

    // If API key is missing, mock successful delivery by logging details locally
    if (!apiKey || apiKey.startsWith("re_xxx")) {
      console.log("\n================= [MOCK CONTACT API] =================");
      console.log(`SENDER NAME : ${name}`);
      console.log(`SENDER EMAIL: ${email}`);
      console.log(`MESSAGE     :\n${message}`);
      console.log("======================================================\n");
      
      return NextResponse.json({ success: true, mock: true });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: contactEmail,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend API delivery error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Internal Server Error handling contact request:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
