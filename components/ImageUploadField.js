"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadMedia } from "@/app/admin/actions";

export default function ImageUploadField({ name, defaultValue }) {
  const [url, setUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadMedia(fd);
    if (res.error) setError(res.error);
    else setUrl(res.url);
    setUploading(false);
  }

  return (
    <div className="field">
      <label>Image</label>
      <input type="hidden" name={name} value={url} />
      <input type="file" accept="image/*" onChange={handleFile} />
      {uploading && <p style={{ fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>uploading…</p>}
      {error && <p style={{ fontSize: 13, color: "#e08a8a" }}>{error}</p>}
      {url && (
        <Image src={url} alt="" width={400} height={200} style={{ marginTop: 10, maxHeight: 140, border: "1px solid var(--line-strong)", borderRadius: 2, width: "auto", height: 140 }} />
      )}
    </div>
  );
}
