import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";

export const revalidate = 0;

export async function generateMetadata() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  const title = settings?.name ? `${settings.name} — ${settings.tagline || "Portfolio"}` : "Portfolio";
  const description = settings?.bio || "Projects and writing.";
  return {
    title,
    description,
    openGraph: { title, description, images: settings?.avatar_url ? [settings.avatar_url] : [] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HomePage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(4);

  return (
    <>
      <SiteNav name={settings?.name} />

      <header className="wrap" style={{ paddingTop: 90, paddingBottom: 60 }}>
        <div className="eyebrow">currently building</div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", maxWidth: 780, marginTop: 14 }}>
          {settings?.tagline || "Software, shipped in the open."}
        </h1>
        <p style={{ maxWidth: 560, color: "var(--muted)", fontSize: 18 }}>
          {settings?.bio || "I'm a developer writing about what I build. This site is fully editable from the admin dashboard — no rebuilds required."}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <Link href="/projects" className="btn primary">view projects</Link>
          <Link href="/blog" className="btn ghost">read the blog</Link>
        </div>
      </header>

      {projects && projects.length > 0 && (
        <section className="wrap" style={{ paddingBottom: 100 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>featured work</div>
          <div className="grid-2">
            {projects.map((p) => (
              <Link key={p.id} href={`/projects/${p.slug}`} className="spec" style={{ display: "block" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
                  /projects/{p.slug}
                </div>
                <h3 style={{ marginTop: 10 }}>{p.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 15 }}>{p.summary}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                  {(p.tech_stack || []).slice(0, 4).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
