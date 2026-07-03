"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* ---------- AUTH ---------- */

export async function signIn(formData) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (error) return { error: error.message };
  redirect("/admin/dashboard");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ---------- PROJECTS ---------- */

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProject(formData, id) {
  const supabase = createClient();
  const title = formData.get("title");
  const payload = {
    title,
    slug: formData.get("slug") || slugify(title),
    summary: formData.get("summary"),
    description: formData.get("description"),
    tech_stack: (formData.get("tech_stack") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    cover_image_url: formData.get("cover_image_url"),
    live_url: formData.get("live_url"),
    repo_url: formData.get("repo_url"),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
  };

  const { error } = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id) {
  const supabase = createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

/* ---------- POSTS ---------- */

export async function savePost(formData, id) {
  const supabase = createClient();
  const title = formData.get("title");
  const published = formData.get("published") === "on";
  const payload = {
    title,
    slug: formData.get("slug") || slugify(title),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    cover_image_url: formData.get("cover_image_url"),
    tags: (formData.get("tags") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    published,
    published_at: published ? new Date().toISOString() : null,
  };

  const { error } = id
    ? await supabase.from("posts").update(payload).eq("id", id)
    : await supabase.from("posts").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function deletePost(id) {
  const supabase = createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/blog");
  redirect("/admin/posts");
}

/* ---------- SETTINGS ---------- */

export async function saveSettings(formData) {
  const supabase = createClient();
  const payload = {
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    bio: formData.get("bio"),
    avatar_url: formData.get("avatar_url"),
    resume_url: formData.get("resume_url"),
    email: formData.get("email"),
    github_url: formData.get("github_url"),
    linkedin_url: formData.get("linkedin_url"),
    twitter_url: formData.get("twitter_url"),
  };
  const { error } = await supabase.from("site_settings").update(payload).eq("id", 1);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/settings");
}

/* ---------- MEDIA UPLOAD ---------- */

export async function uploadMedia(formData) {
  const supabase = createClient();
  const file = formData.get("file");
  if (!file || file.size === 0) return { error: "No file provided" };

  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file);
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return { url: data.publicUrl };
}
