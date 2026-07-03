export default function Loading() {
  return (
    <>
      <nav className="site-nav"><div className="wrap"><div className="skel skel-block w20" style={{ height: 20 }} /></div></nav>
      <article className="wrap" style={{ paddingTop: 60, maxWidth: 720 }}>
        <div className="skel skel-block w30" style={{ height: 14, marginBottom: 20 }} />
        <div className="skel skel-block w50" style={{ height: 48, marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <div className="skel" style={{ width: 70, height: 26, borderRadius: 999 }} />
          <div className="skel" style={{ width: 90, height: 26, borderRadius: 999 }} />
          <div className="skel" style={{ width: 60, height: 26, borderRadius: 999 }} />
        </div>
        <div className="skel skel-box" style={{ height: 320, marginBottom: 24 }} />
        <div className="skel skel-block" />
        <div className="skel skel-block w50" />
        <div className="skel skel-block" />
        <div className="skel skel-block w30" />
      </article>
    </>
  )
}
