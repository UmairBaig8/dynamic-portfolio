import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";

export const revalidate = 0;

export default async function ProjectsPage({ searchParams }) {
  const { category } = await searchParams;
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();

  let query = supabase.from("projects").select("*").order("sort_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data: projects } = await query;

  const { data: all } = await supabase.from("projects").select("category").not("category", "is", null);
  const categories = [...new Set(all?.map((p) => p.category).filter(Boolean))];

  return (
    <>
      <SiteNav name={settings?.name} />
      <div className="wrap" style={{ paddingTop: 60, paddingBottom: 100 }}>
        <div className="eyebrow">all work</div>
        <h1 style={{ marginTop: 14, marginBottom: 24 }}>Projects</h1>

        {categories.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            <Link href="/projects" className={`tag ${!category ? "tag--active" : ""}`} style={!category ? { borderColor: "var(--accent)", color: "var(--accent)" } : {}}>All</Link>
            {categories.map((c) => (
              <Link key={c} href={`/projects?category=${c}`} className="tag" style={category === c ? { borderColor: "var(--accent)", color: "var(--accent)" } : {}}>{c}</Link>
            ))}
          </div>
        )}

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
              {p.category && <span className="tag" style={{ borderColor: "var(--accent-2)", color: "var(--accent-2)" }}>{p.category}</span>}
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
