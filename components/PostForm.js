"use client";

import { useState, useRef } from "react";
import { savePost, deletePost } from "@/app/admin/actions";
import ImageUploadField from "./ImageUploadField";
import RichTextEditor from "./RichTextEditor";
import useUnsavedChanges from "@/lib/useUnsavedChanges";

export default function PostForm({ post }) {
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const formRef = useRef(null);
  const { markDirty, resetDirty } = useUnsavedChanges(formRef, post ? `post-${post.id}` : null);

  async function handleSubmit(formData) {
    setSaving(true);
    const res = await savePost(formData, post?.id);
    if (res?.error) {
      setError(res.error);
      setSaving(false);
    } else {
      resetDirty();
    }
  }

  return (
    <form action={handleSubmit} ref={formRef} onChange={markDirty}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" defaultValue={post?.title} required />
      </div>
      <div className="field">
        <label htmlFor="slug">Slug (leave blank to auto-generate)</label>
        <input id="slug" name="slug" defaultValue={post?.slug} placeholder="my-post-title" />
      </div>
      <div className="field">
        <label htmlFor="excerpt">Excerpt (shown in the list view)</label>
        <input id="excerpt" name="excerpt" defaultValue={post?.excerpt} />
      </div>
      <ImageUploadField name="cover_image_url" defaultValue={post?.cover_image_url} />
      <RichTextEditor name="content" defaultValue={post?.content} />
      <div className="field">
        <label htmlFor="tags">Tags (comma separated)</label>
        <input id="tags" name="tags" defaultValue={(post?.tags || []).join(", ")} placeholder="react, notes" />
      </div>
      <div className="field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input id="published" name="published" type="checkbox" style={{ width: "auto" }} defaultChecked={post?.published} />
        <label htmlFor="published" style={{ margin: 0 }}>Published (visible on the public blog)</label>
      </div>
      <div className="field">
        <label htmlFor="publish_at">Schedule publish (leave blank to publish immediately)</label>
        <input id="publish_at" name="publish_at" type="datetime-local" defaultValue={post?.publish_at ? new Date(post.publish_at).toISOString().slice(0, 16) : ""} />
      </div>

      {error && <p style={{ color: "#e08a8a", fontFamily: "var(--font-mono)", fontSize: 14 }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? "saving…" : post ? "save changes" : "create post"}
          </button>
          {post && post.slug && (
            <a href={`/preview/${post.slug}`} target="_blank" className="btn ghost">preview</a>
          )}
        </div>
        {post && (
          <button
            type="button"
            className="btn danger"
            onClick={() => {
              if (confirm("Delete this post? This can't be undone.")) deletePost(post.id);
            }}
          >
            delete
          </button>
        )}
      </div>
    </form>
  );
}
