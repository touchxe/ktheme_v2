// 헤더 + 상단 유틸리티 바. window로 export.
function TopBar() {
  return (
    <div style={{ borderBottom: "1px solid var(--line)", fontSize: 12, color: "var(--text-body)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", height: 36, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }}></span>
          2026년 4월 26일 주일예배 · 오전 11:00 본당
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="#" style={u}>새가족 등록</a><span style={sep}></span>
          <a href="#" style={u}>교회오시는길</a><span style={sep}></span>
          <a href="#" style={u}>English</a><span style={sep}></span>
          <a href="#" style={u}>로그인</a>
        </div>
      </div>
    </div>
  );
}
const u = { color: "var(--text-body)", textDecoration: "none" };
const sep = { width: 1, height: 12, background: "var(--line)" };

function Header({ view, setView }) {
  const items = [
    { key: "worship", label: "예배", live: true },
    { key: "community", label: "공동체" },
    { key: "training", label: "양육" },
    { key: "media", label: "미디어" },
    { key: "about", label: "교회소개" },
    { key: "admin", label: "행정" },
  ];
  const { Button, Badge } = window.가평교회 || window.__NS || {};
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "var(--backdrop-blur)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" onClick={(e) => { e.preventDefault(); setView("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--text-strong)" }}>
          <img src="../../assets/logo.png" alt="가평교회" style={{ width: 40, height: 40, objectFit: "contain" }} />
          <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-0.02em" }}>가평교회 <span style={{ color: "var(--text-body)", fontWeight: 500, fontSize: 13, letterSpacing: 0, marginLeft: 2 }}>GAPYEONG CHURCH</span></span>
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 15, fontWeight: 600 }}>
          {items.map((it) => {
            const active = view === it.key || (it.key === "worship" && view === "home");
            return (
              <a key={it.key} href="#" onClick={(e) => { e.preventDefault(); setView(it.key === "worship" ? "worship" : it.key); }}
                style={{ position: "relative", padding: "26px 0", textDecoration: "none", color: active ? "var(--brand-600)" : "var(--text-strong)" }}>
                {it.label}
                {it.live && <span style={{ position: "absolute", top: 14, right: -22, background: "var(--accent-red)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "2px 5px", borderRadius: 3 }}>LIVE</span>}
                {active && <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "var(--brand-600)" }}></span>}
              </a>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-strong)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </button>
          {Button && <Button variant="outline" size="sm">새가족 등록</Button>}
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { TopBar, Header });
