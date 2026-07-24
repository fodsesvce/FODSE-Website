import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────────────────────
// In-memory rate limiter
// ─────────────────────────────────────────────────────────────
const rateMap = new Map<string, { count: number; windowStart: number }>();

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateMap.set(ip, {
      count: 1,
      windowStart: now,
    });

    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;

  return false;
}

// ─────────────────────────────────────────────────────────────
// Remove HTML Tags
// ─────────────────────────────────────────────────────────────

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

// ─────────────────────────────────────────────────────────────
// POST /api/contact
// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a few minutes.",
      },
      {
        status: 429,
      }
    );
  }

  // Parse body
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      {
        status: 400,
      }
    );
  }

  const name =
    typeof body.name === "string" ? sanitize(body.name) : "";

  const email =
    typeof body.email === "string" ? sanitize(body.email) : "";

  const subject =
    typeof body.subject === "string" ? sanitize(body.subject) : "";

  const message =
    typeof body.message === "string" ? sanitize(body.message) : "";

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name)
    return NextResponse.json(
      { error: "Name is required." },
      { status: 400 }
    );

  if (!emailRegex.test(email))
    return NextResponse.json(
      { error: "Valid email is required." },
      { status: 400 }
    );

  if (!subject)
    return NextResponse.json(
      { error: "Subject is required." },
      { status: 400 }
    );

  if (!message)
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 }
    );

  if (message.length > 1000)
    return NextResponse.json(
      {
        error: "Message must be under 1000 characters.",
      },
      {
        status: 400,
      }
    );

  // Check environment variables
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_EMAIL ||
    !process.env.FROM_EMAIL
  ) {
    console.error("Missing Resend environment variables.");

    return NextResponse.json(
      {
        error: "Server configuration error.",
      },
      {
        status: 500,
      }
    );
  }

  try {
  const result = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.CONTACT_EMAIL!,
    subject: `FODSE Contact Form: ${subject}`,
    replyTo: email,
    html: `
      <h2>New Website Enquiry</h2>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Subject:</strong> ${subject}</p>

      <p><strong>Message:</strong></p>

      <p>${message.replace(/\n/g, "<br/>")}</p>
    `,
  });

  console.log("Resend Response:");
  console.log(result);

  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
} catch (error) {
  console.error("Resend Error:");
  console.error(error);

  return NextResponse.json(
    { error: "Unable to send email." },
    { status: 500 }
  );
}
}