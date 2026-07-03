import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="eyebrow">error 404</div>
      <h1 style={{ marginTop: 14, fontSize: "clamp(32px, 6vw, 48px)" }}>Nothing here.</h1>
      <p style={{ color: "var(--muted)", maxWidth: 420, textAlign: "center" }}>
        The page you're looking for doesn't exist, or was moved.
      </p>
      <Link href="/" className="btn primary" style={{ marginTop: 20 }}>back home</Link>
    </div>
  );
}
