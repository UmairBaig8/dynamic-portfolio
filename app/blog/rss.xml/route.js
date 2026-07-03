import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("name, bio").eq("id", 1).single();
  const { data: posts } = await supabase
    .from("posts")
    .select("title, slug, excerpt, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(50);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const items = (posts || [])
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid>${siteUrl}/blog/${p.slug}</guid>
      <description>${escapeXml(p.excerpt || "")}</description>
      <pubDate>${p.published_at ? new Date(p.published_at).toUTCString() : ""}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(settings?.name || "Portfolio")} — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(settings?.bio || "")}</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
