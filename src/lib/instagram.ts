export interface InstagramPost {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const CACHE_DURATION = 60 * 60; // 1 hour in seconds

let cache: { posts: InstagramPost[]; timestamp: number } | null = null;

/**
 * Fetch recent Instagram posts via the Instagram Graph API.
 * Requires a long-lived access token set in INSTAGRAM_ACCESS_TOKEN env var.
 *
 * To get a token:
 * 1. Create a Meta/Facebook developer app at https://developers.facebook.com
 * 2. Add Instagram Basic Display or Instagram Graph API
 * 3. Generate a long-lived token (valid 60 days, must be refreshed)
 *    GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={token}
 */
export async function fetchInstagramPosts(limit = 12): Promise<InstagramPost[]> {
  if (!INSTAGRAM_TOKEN) {
    return [];
  }

  // Return cached if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION * 1000) {
    return cache.posts.slice(0, limit);
  }

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink");
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", INSTAGRAM_TOKEN);

    const res = await fetch(url.toString(), { next: { revalidate: CACHE_DURATION } });

    if (!res.ok) {
      console.error("Instagram API error:", res.status, await res.text());
      return [];
    }

    const data = await res.json();
    const posts: InstagramPost[] = data.data || [];

    cache = { posts, timestamp: Date.now() };
    return posts.slice(0, limit);
  } catch (err) {
    console.error("Failed to fetch Instagram posts:", err);
    return [];
  }
}
