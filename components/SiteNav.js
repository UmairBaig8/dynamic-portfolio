import Link from "next/link";

export default function SiteNav({ name }) {
  return (
    <nav className="site-nav">
      <div className="wrap">
        <Link href="/" className="brand">
          {name || "you"}<span className="dot">.</span>dev
        </Link>
        <div className="links">
          <Link href="/projects">projects</Link>
          <Link href="/blog">blog</Link>
          <Link href="/about">about</Link>
        </div>
      </div>
    </nav>
  );
}
