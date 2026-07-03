export default function Loading() {
  return (
    <>
      <nav className="site-nav"><div className="wrap"><div className="skel skel-block w20" style={{ height: 20 }} /></div></nav>
      <section className="wrap" style={{ paddingTop: 90, maxWidth: 720 }}>
        <div className="skel skel-block w20" style={{ height: 14, marginBottom: 20 }} />
        <div className="skel skel-block w50" style={{ height: 48, marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <div className="skel" style={{ width: 120, height: 120, borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <div className="skel skel-block" />
            <div className="skel skel-block w50" />
            <div className="skel skel-block" />
          </div>
        </div>
        <div className="skel skel-block w30" />
      </section>
    </>
  )
}
