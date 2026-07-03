import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";
import { notFound } from "next/navigation";
import { readingTime } from "@/lib/reading-time";

export const revalidate = 0;

export default async function PreviewPage({ params }) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post) notFound();

  return (
    <>
      <SiteNav name={settings?.name} />
      <div style={{ background: "var(--accent)", color: "var(--bg)", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 12, padding: "6px 0" }}>
        Preview — {post.published ? "published" : "not yet published"}
      </div>
      <article className="wrap" style={{ paddingTop: 60, paddingBottom: 100, maxWidth: 700 }}>
        <div className="eyebrow">
          {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "draft"}
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
      </article>
    </>
  );
}
