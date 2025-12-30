import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Create the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shimanto.rehman.bd@gmail.com',
        pass: process.env.EMAIL_PASS, // Use an App Password from Google
      },
    });

    // 2. Set up email data
    const mailOptions = {
      from: email,
      to: 'shimanto.rehman.bd@gmail.com',
      subject: `Portfolio: ${subject}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ message: "Failed to send" }, { status: 500 });
  }
}