"use client";

import { useState } from "react";
import { saveProject, deleteProject } from "@/app/admin/actions";
import ImageUploadField from "./ImageUploadField";

export default function ProjectForm({ project }) {
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData) {
    setSaving(true);
    const res = await saveProject(formData, project?.id);
    if (res?.error) {
      setError(res.error);
      setSaving(false);
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" defaultValue={project?.title} required />
      </div>
      <div className="field">
        <label htmlFor="slug">Slug (leave blank to auto-generate)</label>
        <input id="slug" name="slug" defaultValue={project?.slug} placeholder="my-project" />
      </div>
      <div className="field">
        <label htmlFor="summary">Summary (one line, shown in cards)</label>
        <input id="summary" name="summary" defaultValue={project?.summary} />
      </div>
      <div className="field">
        <label htmlFor="description">Full description</label>
        <textarea id="description" name="description" rows={8} defaultValue={project?.description} />
      </div>
      <div className="field">
        <label htmlFor="tech_stack">Tech stack (comma separated)</label>
        <input id="tech_stack" name="tech_stack" defaultValue={(project?.tech_stack || []).join(", ")} placeholder="Next.js, Supabase, Netlify" />
      </div>
      <ImageUploadField name="cover_image_url" defaultValue={project?.cover_image_url} />
      <div className="grid-2">
        <div className="field">
          <label htmlFor="live_url">Live URL</label>
          <input id="live_url" name="live_url" defaultValue={project?.live_url} />
        </div>
        <div className="field">
          <label htmlFor="repo_url">Repo URL</label>
          <input id="repo_url" name="repo_url" defaultValue={project?.repo_url} />
        </div>
      </div>
      <div className="grid-2">
        <div className="field">
          <label htmlFor="sort_order">Sort order</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} />
        </div>
        <div className="field" style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 22 }}>
          <input id="featured" name="featured" type="checkbox" style={{ width: "auto" }} defaultChecked={project?.featured} />
          <label htmlFor="featured" style={{ margin: 0 }}>Featured on homepage</label>
        </div>
      </div>

      {error && <p style={{ color: "#e08a8a", fontFamily: "var(--font-mono)", fontSize: 14 }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "saving…" : project ? "save changes" : "create project"}
        </button>
        {project && (
          <button
            type="button"
            className="btn danger"
            onClick={() => {
              if (confirm("Delete this project? This can't be undone.")) deleteProject(project.id);
            }}
          >
            delete
          </button>
        )}
      </div>
    </form>
  );
}
