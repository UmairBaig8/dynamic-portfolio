import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function Dashboard() {
  const supabase = await createClient();
  const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
  const { count: postCount } = await supabase.from("posts").select("*", { count: "exact", head: true });
  const { count: publishedCount } = await supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", true);

  const { data: recentProjects } = await supabase
    .from("projects").select("id, title, slug, updated_at").order("updated_at", { ascending: false }).limit(5);
  const { data: recentPosts } = await supabase
    .from("posts").select("id, title, slug, updated_at, published").order("updated_at", { ascending: false }).limit(5);

  return (
    <div>
      <div className="eyebrow">overview</div>
      <h1 style={{ marginTop: 14, marginBottom: 32 }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
        <div className="spec"><div className="eyebrow">projects</div><div style={{ fontSize: 32, fontFamily: "var(--font-display)", marginTop: 8 }}>{projectCount ?? 0}</div></div>
        <div className="spec"><div className="eyebrow">posts</div><div style={{ fontSize: 32, fontFamily: "var(--font-display)", marginTop: 8 }}>{postCount ?? 0}</div></div>
        <div className="spec"><div className="eyebrow">published</div><div style={{ fontSize: 32, fontFamily: "var(--font-display)", marginTop: 8 }}>{publishedCount ?? 0}</div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>recent projects</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(recentProjects || []).map((p) => (
              <Link key={p.id} href={`/admin/projects/${p.id}/edit`} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 2 }}>
                <span>{p.title}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
                  {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : ""}
                </span>
              </Link>
            ))}
            {(!recentProjects || recentProjects.length === 0) && <p style={{ color: "var(--muted)", fontSize: 14 }}>No projects yet.</p>}
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>recent posts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(recentPosts || []).map((p) => (
              <Link key={p.id} href={`/admin/posts/${p.id}/edit`} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 2 }}>
                <span>
                  {p.title}
                  {!p.published && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", marginLeft: 8 }}>draft</span>}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
                  {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : ""}
                </span>
              </Link>
            ))}
            {(!recentPosts || recentPosts.length === 0) && <p style={{ color: "var(--muted)", fontSize: 14 }}>No posts yet.</p>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/admin/projects/new" className="btn primary">+ new project</Link>
        <Link href="/admin/posts/new" className="btn primary">+ new post</Link>
      </div>
    </div>
  );
}
