import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function PostDetail({ params }) {
  const supabase = createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  return (
    <>
      <SiteNav name={settings?.name} />
      <article className="wrap" style={{ paddingTop: 60, paddingBottom: 100, maxWidth: 700 }}>
        <div className="eyebrow">
          {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
        </div>
        <h1 style={{ marginTop: 14 }}>{post.title}</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 28px" }}>
          {(post.tags || []).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        {post.cover_image_url && (
          <img src={post.cover_image_url} alt={post.title} style={{ borderRadius: 2, marginBottom: 28, border: "1px solid var(--line-strong)" }} />
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
