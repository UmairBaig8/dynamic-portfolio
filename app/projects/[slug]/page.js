import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("title, summary, cover_image_url").eq("slug", params.slug).single();
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: project.cover_image_url ? [project.cover_image_url] : [] },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary },
  };
}

export default async function ProjectDetail({ params }) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("name").eq("id", 1).single();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!project) notFound();

  const { data: related } = await supabase
    .from("projects")
    .select("title, slug, summary, cover_image_url")
    .neq("id", project.id)
    .overlaps("tech_stack", project.tech_stack || [])
    .order("sort_order")
    .limit(2);

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
          <Image src={project.cover_image_url} alt={project.title} width={1200} height={675} style={{ borderRadius: 2, margin: "24px 0", border: "1px solid var(--line-strong)", maxWidth: "100%", height: "auto" }} />
        )}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {project.live_url && <a href={project.live_url} target="_blank" className="btn primary">live site</a>}
          {project.repo_url && <a href={project.repo_url} target="_blank" className="btn ghost">source</a>}
        </div>
        <div style={{ whiteSpace: "pre-wrap", fontSize: 17, color: "var(--ink)" }}>
          {project.description}
        </div>

        {related && related.length > 0 && (
          <section style={{ marginTop: 60, borderTop: "1px solid var(--line)", paddingTop: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>related projects</div>
            <div className="grid-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/projects/${r.slug}`} className="spec" style={{ display: "block" }}>
                  <h3>{r.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 15 }}>{r.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
