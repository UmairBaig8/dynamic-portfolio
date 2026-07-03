import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminProjects() {
  const supabase = createClient();
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

      <table>
        <thead>
          <tr><th>Title</th><th>Slug</th><th>Featured</th><th></th></tr>
        </thead>
        <tbody>
          {projects?.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{p.slug}</td>
              <td>{p.featured ? "yes" : "—"}</td>
              <td>
                <Link href={`/admin/projects/${p.id}/edit`} className="btn ghost" style={{ padding: "6px 12px" }}>edit</Link>
              </td>
            </tr>
          ))}
          {(!projects || projects.length === 0) && (
            <tr><td colSpan={4} style={{ color: "var(--muted)" }}>No projects yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
