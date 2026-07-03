export default function Loading() {
  return (
    <>
      <nav className="site-nav"><div className="wrap"><div className="skel skel-block w20" style={{ height: 20 }} /></div></nav>
      <header className="wrap" style={{ paddingTop: 90, paddingBottom: 60 }}>
        <div className="skel skel-block w20" style={{ height: 14, marginBottom: 20 }} />
        <div className="skel skel-block w50" style={{ height: 48, marginBottom: 16 }} />
        <div className="skel skel-block" style={{ maxWidth: 560 }} />
        <div className="skel skel-block w30" style={{ maxWidth: 360 }} />
      </header>
      <section className="wrap" style={{ paddingBottom: 100 }}>
        <div className="skel skel-block w20" style={{ height: 14, marginBottom: 24 }} />
        <div className="grid-2">
          <div className="skel skel-box" />
          <div className="skel skel-box" />
        </div>
      </section>
    </>
  )
}
