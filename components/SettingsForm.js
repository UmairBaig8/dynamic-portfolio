"use client";

import { useState } from "react";
import { saveSettings } from "@/app/admin/actions";

export default function SettingsForm({ settings }) {
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(formData) {
    setSaving(true);
    setSaved(false);
    const res = await saveSettings(formData);
    if (res?.error) setError(res.error);
    else setSaved(true);
    setSaving(false);
  }

  return (
    <form action={handleSubmit} style={{ maxWidth: 560 }}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={settings?.name} />
      </div>
      <div className="field">
        <label htmlFor="tagline">Tagline (hero headline)</label>
        <input id="tagline" name="tagline" defaultValue={settings?.tagline} />
      </div>
      <div className="field">
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" rows={5} defaultValue={settings?.bio} />
      </div>
      <div className="field">
        <label htmlFor="avatar_url">Avatar image URL</label>
        <input id="avatar_url" name="avatar_url" defaultValue={settings?.avatar_url} />
      </div>
      <div className="field">
        <label htmlFor="resume_url">Résumé URL</label>
        <input id="resume_url" name="resume_url" defaultValue={settings?.resume_url} />
      </div>
      <div className="grid-2">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" defaultValue={settings?.email} />
        </div>
        <div className="field">
          <label htmlFor="github_url">GitHub URL</label>
          <input id="github_url" name="github_url" defaultValue={settings?.github_url} />
        </div>
        <div className="field">
          <label htmlFor="linkedin_url">LinkedIn URL</label>
          <input id="linkedin_url" name="linkedin_url" defaultValue={settings?.linkedin_url} />
        </div>
        <div className="field">
          <label htmlFor="twitter_url">Twitter / X URL</label>
          <input id="twitter_url" name="twitter_url" defaultValue={settings?.twitter_url} />
        </div>
      </div>

      {error && <p style={{ color: "#e08a8a", fontFamily: "var(--font-mono)", fontSize: 14 }}>{error}</p>}
      {saved && <p style={{ color: "var(--accent-2)", fontFamily: "var(--font-mono)", fontSize: 14 }}>saved.</p>}

      <button type="submit" className="btn primary" disabled={saving} style={{ marginTop: 12 }}>
        {saving ? "saving…" : "save settings"}
      </button>
    </form>
  );
}
