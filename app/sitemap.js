import { createClient } from "@/lib/supabase/server";

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const supabase = await createClient();

  const { data: projects } = await supabase.from("projects").select("slug, updated_at");
  const { data: posts } = await supabase.from("posts").select("slug, updated_at").eq("published", true);

  const staticPages = ["", "/projects", "/blog", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectPages = (projects || []).map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
  }));

  const postPages = (posts || []).map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
  }));

  return [...staticPages, ...projectPages, ...postPages];
}
