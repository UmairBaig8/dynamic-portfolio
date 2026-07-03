export default function Loading() {
  return (
    <>
      <nav className="site-nav"><div className="wrap"><div className="skel skel-block w20" style={{ height: 20 }} /></div></nav>
      <header className="wrap" style={{ paddingTop: 90, paddingBottom: 60 }}>
        <div className="skel skel-block w20" style={{ height: 14, marginBottom: 20 }} />
        <div className="skel skel-block w50" style={{ height: 48, marginBottom: 16 }} />
      </header>
      <section className="wrap" style={{ paddingBottom: 100 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skel" style={{ height: 100, marginBottom: 16, padding: 28, border: "1px solid var(--line-strong)" }}>
            <div className="skel skel-block w20" style={{ height: 12, background: "transparent" }} />
            <div className="skel skel-block w50" style={{ height: 24, marginTop: 8, background: "transparent" }} />
            <div className="skel skel-block" style={{ background: "transparent" }} />
          </div>
        ))}
      </section>
    </>
  )
}
