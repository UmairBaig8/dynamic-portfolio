import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readingTime } from "@/lib/reading-time";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const supabase = await createClient();
  const { data: post } = await supabase.from("posts").select("title, excerpt, cover_image_url").eq("slug", params.slug).eq("published", true).single();
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.cover_image_url ? [post.cover_image_url] : [], type: "article" },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostDetail({ params }) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .or(`published.eq.true,publish_at.lte.${new Date().toISOString()}`)
    .single();

  if (!post) notFound();

  const { data: related } = await supabase
    .from("posts")
    .select("title, slug, excerpt, cover_image_url, published_at")
    .neq("id", post.id)
    .eq("published", true)
    .overlaps("tags", post.tags || [])
    .order("published_at", { ascending: false })
    .limit(2);

  return (
    <>
      <SiteNav name={settings?.name} />
      <article className="wrap" style={{ paddingTop: 60, paddingBottom: 100, maxWidth: 700 }}>
        <div className="eyebrow">
          {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
          <span style={{ color: "var(--muted)" }}>·</span>
          <span style={{ color: "var(--muted)" }}>{readingTime(post.content)}</span>
        </div>
        <h1 style={{ marginTop: 14 }}>{post.title}</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 28px" }}>
          {(post.tags || []).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        {post.cover_image_url && (
          <Image src={post.cover_image_url} alt={post.title} width={1200} height={675} style={{ borderRadius: 2, marginBottom: 28, border: "1px solid var(--line-strong)", maxWidth: "100%", height: "auto" }} />
        )}
        <div
          className="post-body"
          style={{ fontSize: 18, lineHeight: 1.75 }}
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {related && related.length > 0 && (
          <section style={{ marginTop: 60, borderTop: "1px solid var(--line)", paddingTop: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>related posts</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ display: "block", padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
                  <h3>{r.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 15, margin: 0 }}>{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
