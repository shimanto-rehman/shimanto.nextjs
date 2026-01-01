import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import axios from "axios";

export async function GET() {
  try {
    // Check for required environment variables
    if (!process.env.SCHOLAR_AUTHOR_ID || !process.env.SERPAPI_KEY) {
      return NextResponse.json(
        { error: "Scholar API configuration is missing. Please set SCHOLAR_AUTHOR_ID and SERPAPI_KEY environment variables." },
        { status: 401 }
      );
    }

    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_scholar_author",
        author_id: process.env.SCHOLAR_AUTHOR_ID,
        api_key: process.env.SERPAPI_KEY,
        hl: "en"
      },
    });

    const data = response.data;

    // Extract citation metrics from cited_by.table array
    const citationsAll = data.cited_by?.table?.[0]?.citations?.all || 0;
    const hIndexAll = data.cited_by?.table?.[1]?.h_index?.all || 0;
    const i10IndexAll = data.cited_by?.table?.[2]?.i10_index?.all || 0;

    const author = data.author || {};
    const authorId = process.env.SCHOLAR_AUTHOR_ID;

    const result = {
      name: author.name || null,
      // SerpAPI uses "affiliations" (string), so fall back to that if "affiliation" is missing
      affiliation: author.affiliations || null,
      email: author.email || null,
      interests: author.interests || [],
      profile_picture: author.thumbnail || null,
      citations: citationsAll,
      h_index: hIndexAll,
      i10_index: i10IndexAll,
      publications:
        data.articles?.map((p: {
          title: string;
          year: number;
          cited_by?: { value?: number };
          link: string;
          authors: string;
          publication: string;
        }) => ({
          title: p.title,
          year: p.year,
          citations: p.cited_by?.value || 0,
          link: p.link,
          authors: p.authors,
          publication: p.publication,
        })) || [],
      source: "Google Scholar (via SerpAPI)",
      profile_url: author.link || (authorId ? `https://scholar.google.com/citations?user=${authorId}&hl=en` : null),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(result);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: "Failed to fetch Scholar data", message: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Configure the Transporter
    // Note: For Gmail, you must use an "App Password" not your login password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // e.g. shimanto.rehman.bd@gmail.com
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Email Options
    const mailOptions = {
      from: email,
      to: 'shimanto.rehman.bd@gmail.com', // Your email
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    };

    // Send
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
