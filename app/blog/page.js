import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";

export const revalidate = 0;

export default async function BlogPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <>
      <SiteNav name={settings?.name} />
      <div className="wrap" style={{ paddingTop: 60, paddingBottom: 100, maxWidth: 720 }}>
        <div className="eyebrow">writing</div>
        <h1 style={{ marginTop: 14, marginBottom: 40 }}>Blog</h1>

        {(!posts || posts.length === 0) && (
          <p style={{ color: "var(--muted)" }}>No posts published yet.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ display: "block", padding: "22px 0", borderBottom: "1px solid var(--line)" }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent-2)" }}>
                {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
              </div>
              <h3 style={{ marginTop: 8, marginBottom: 6 }}>{post.title}</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
