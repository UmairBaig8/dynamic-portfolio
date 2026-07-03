import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";

export const revalidate = 0;

export default async function ProjectsPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <>
      <SiteNav name={settings?.name} />
      <div className="wrap" style={{ paddingTop: 60, paddingBottom: 100 }}>
        <div className="eyebrow">all work</div>
        <h1 style={{ marginTop: 14, marginBottom: 40 }}>Projects</h1>

        {(!projects || projects.length === 0) && (
          <p style={{ color: "var(--muted)" }}>Nothing published yet — add your first project from /admin.</p>
        )}

        <div className="grid-2">
          {projects?.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="spec" style={{ display: "block" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
                /projects/{p.slug}
              </div>
              <h3 style={{ marginTop: 10 }}>{p.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>{p.summary}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {(p.tech_stack || []).map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
