"use client";

import { useState } from "react";
import { signIn } from "../actions";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);
    setError(null);
    const res = await signIn(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form action={handleSubmit} className="spec" style={{ width: 360 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>admin access</div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        {error && (
          <p style={{ color: "#e08a8a", fontSize: 14, fontFamily: "var(--font-mono)" }}>{error}</p>
        )}
        <button type="submit" className="btn primary" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
          {loading ? "signing in…" : "sign in"}
        </button>
      </form>
    </div>
  );
}
