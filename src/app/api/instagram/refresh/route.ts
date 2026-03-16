import { NextResponse } from "next/server";

/**
 * GET /api/instagram/refresh
 *
 * Refreshes the Instagram long-lived access token.
 * Long-lived tokens are valid for 60 days. Call this endpoint
 * periodically (e.g., via cron every 50 days) to keep it alive.
 *
 * The refreshed token is returned in the response — you'll need to
 * manually update your INSTAGRAM_ACCESS_TOKEN env var with it,
 * or automate that via your hosting platform's API.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Basic auth protection
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "No Instagram token configured" }, { status: 400 });
  }

  try {
    const url = new URL("https://graph.instagram.com/refresh_access_token");
    url.searchParams.set("grant_type", "ig_refresh_token");
    url.searchParams.set("access_token", token);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: "Refresh failed", details: data }, { status: 500 });
    }

    return NextResponse.json({
      message: "Token refreshed successfully",
      access_token: data.access_token,
      expires_in: data.expires_in,
    });
  } catch (err) {
    return NextResponse.json({ error: "Refresh request failed", details: String(err) }, { status: 500 });
  }
}
