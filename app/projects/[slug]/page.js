import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function ProjectDetail({ params }) {
  const supabase = createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!project) notFound();

  return (
    <>
      <SiteNav name={settings?.name} />
      <article className="wrap" style={{ paddingTop: 60, paddingBottom: 100, maxWidth: 720 }}>
        <div className="eyebrow">/projects/{project.slug}</div>
        <h1 style={{ marginTop: 14 }}>{project.title}</h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0" }}>
          {(project.tech_stack || []).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        {project.cover_image_url && (
          <img src={project.cover_image_url} alt={project.title} style={{ borderRadius: 2, margin: "24px 0", border: "1px solid var(--line-strong)" }} />
        )}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {project.live_url && <a href={project.live_url} target="_blank" className="btn primary">live site</a>}
          {project.repo_url && <a href={project.repo_url} target="_blank" className="btn ghost">source</a>}
        </div>
        <div style={{ whiteSpace: "pre-wrap", fontSize: 17, color: "var(--ink)" }}>
          {project.description}
        </div>
      </article>
    </>
  );
}
