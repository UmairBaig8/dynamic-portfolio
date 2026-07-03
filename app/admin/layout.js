import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { signOut } from "./actions";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Login page renders standalone, no sidebar chrome.
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 220, borderRight: "1px solid var(--line)", padding: "28px 20px", flexShrink: 0 }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>admin</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "var(--font-mono)", fontSize: 14 }}>
          <Link href="/admin/dashboard" style={navLink}>dashboard</Link>
          <Link href="/admin/projects" style={navLink}>projects</Link>
          <Link href="/admin/posts" style={navLink}>posts</Link>
          <Link href="/admin/settings" style={navLink}>settings</Link>
        </nav>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/" target="_blank" className="btn ghost" style={{ justifyContent: "center" }}>view site ↗</Link>
          <form action={signOut}>
            <button type="submit" className="btn ghost" style={{ width: "100%", justifyContent: "center" }}>sign out</button>
          </form>
        </div>
      </aside>
      <main style={{ flex: 1, padding: "36px 40px", maxWidth: 900 }}>{children}</main>
    </div>
  );
}

const navLink = { padding: "8px 10px", color: "var(--muted)", borderRadius: 2 };
