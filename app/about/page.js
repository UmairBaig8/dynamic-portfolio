import { createClient } from "@/lib/supabase/server";
import SiteNav from "@/components/SiteNav";

export const revalidate = 0;

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <>
      <SiteNav name={settings?.name} />
      <div className="wrap" style={{ paddingTop: 60, paddingBottom: 100, maxWidth: 640 }}>
        <div className="eyebrow">about</div>
        <h1 style={{ marginTop: 14 }}>{settings?.name}</h1>
        <p style={{ color: "var(--muted)", fontSize: 18 }}>{settings?.tagline}</p>
        <p style={{ fontSize: 17, marginTop: 24 }}>{settings?.bio}</p>

        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          {settings?.email && <a className="btn ghost" href={`mailto:${settings.email}`}>email</a>}
          {settings?.github_url && <a className="btn ghost" href={settings.github_url} target="_blank">github</a>}
          {settings?.linkedin_url && <a className="btn ghost" href={settings.linkedin_url} target="_blank">linkedin</a>}
          {settings?.twitter_url && <a className="btn ghost" href={settings.twitter_url} target="_blank">twitter</a>}
          {settings?.resume_url && <a className="btn primary" href={settings.resume_url} target="_blank">résumé</a>}
        </div>
      </div>
    </>
  );
}
