import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DragSortTable from "@/components/DragSortTable";
import { reorderProjectDrag } from "@/app/admin/actions";

export const revalidate = 0;

export default async function AdminProjects() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("sort_order");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div className="eyebrow">manage</div>
          <h1 style={{ marginTop: 14 }}>Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="btn primary">+ new project</Link>
      </div>

      <DragSortTable
        columns={["Cover", "Title", "Slug", "Featured", ""]}
        rows={projects || []}
        searchFields={["title", "slug"]}
        placeholder="Search projects\u2026"
        onReorder={reorderProjectDrag}
        renderRow={(p) => (
          <>
            <td style={{ width: 1 }}>
              {p.cover_image_url ? (
                <Image src={p.cover_image_url} alt="" width={48} height={32} style={{ objectFit: "cover", border: "1px solid var(--line-strong)" }} />
              ) : (
                <div style={{ width: 48, height: 32, border: "1px dashed var(--line-strong)" }} />
              )}
            </td>
            <td>{p.title}</td>
            <td style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{p.slug}</td>
            <td>{p.featured ? "yes" : "—"}</td>
            <td>
              <Link href={`/admin/projects/${p.id}/edit`} className="btn ghost" style={{ padding: "6px 12px" }}>edit</Link>
            </td>
          </>
        )}
      />
    </div>
  );
}
