import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminPosts() {
  const supabase = createClient();
  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div className="eyebrow">manage</div>
          <h1 style={{ marginTop: 14 }}>Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="btn primary">+ new post</Link>
      </div>

      <table>
        <thead>
          <tr><th>Title</th><th>Slug</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {posts?.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{p.slug}</td>
              <td>{p.published ? "published" : "draft"}</td>
              <td>
                <Link href={`/admin/posts/${p.id}/edit`} className="btn ghost" style={{ padding: "6px 12px" }}>edit</Link>
              </td>
            </tr>
          ))}
          {(!posts || posts.length === 0) && (
            <tr><td colSpan={4} style={{ color: "var(--muted)" }}>No posts yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
