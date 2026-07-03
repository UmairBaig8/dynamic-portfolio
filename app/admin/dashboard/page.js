import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function Dashboard() {
  const supabase = createClient();
  const { count: projectCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
  const { count: postCount } = await supabase.from("posts").select("*", { count: "exact", head: true });
  const { count: publishedCount } = await supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", true);

  return (
    <div>
      <div className="eyebrow">overview</div>
      <h1 style={{ marginTop: 14, marginBottom: 32 }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
        <div className="spec"><div className="eyebrow">projects</div><div style={{ fontSize: 32, fontFamily: "var(--font-display)", marginTop: 8 }}>{projectCount ?? 0}</div></div>
        <div className="spec"><div className="eyebrow">posts</div><div style={{ fontSize: 32, fontFamily: "var(--font-display)", marginTop: 8 }}>{postCount ?? 0}</div></div>
        <div className="spec"><div className="eyebrow">published</div><div style={{ fontSize: 32, fontFamily: "var(--font-display)", marginTop: 8 }}>{publishedCount ?? 0}</div></div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/admin/projects/new" className="btn primary">+ new project</Link>
        <Link href="/admin/posts/new" className="btn primary">+ new post</Link>
      </div>
    </div>
  );
}
