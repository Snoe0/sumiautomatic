import { NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

export async function POST(request: Request) {
  try {
    const { name, email, interest, message } = await request.json();

    if (!name || !email || !interest) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fields = [
      { name: "Name", value: name, inline: true },
      { name: "Email", value: email, inline: true },
      { name: "Interest", value: interest, inline: true },
    ];

    if (message) {
      fields.push({ name: "Message", value: message, inline: false });
    }

    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Booking Request",
            color: 0xffffff,
            fields,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
