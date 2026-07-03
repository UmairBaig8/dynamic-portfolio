import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import AdminSearchableTable from "@/components/AdminSearchableTable";
import BulkActions from "@/components/BulkActions";

export const revalidate = 0;

export default async function AdminPosts() {
  const supabase = await createClient();
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

      <BulkActions
        rows={posts || []}
        searchFields={["title", "slug"]}
        columns={["Cover", "Title", "Slug", "Status", ""]}
        placeholder="Search posts\u2026"
        renderRow={(p) => (
          <tr key={p.id}>
            <td style={{ width: 1 }}>
              {p.cover_image_url ? (
                <Image src={p.cover_image_url} alt="" width={48} height={32} style={{ objectFit: "cover", border: "1px solid var(--line-strong)" }} />
              ) : (
                <div style={{ width: 48, height: 32, border: "1px dashed var(--line-strong)" }} />
              )}
            </td>
            <td>{p.title}</td>
            <td style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{p.slug}</td>
            <td>{p.published ? "published" : "draft"}</td>
            <td>
              <Link href={`/admin/posts/${p.id}/edit`} className="btn ghost" style={{ padding: "6px 12px" }}>edit</Link>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
