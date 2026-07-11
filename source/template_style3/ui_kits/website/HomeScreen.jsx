// 홈 히어로 + 최근 설교 섹션. window로 export.
function Hero() {
  const { Badge } = window.가평교회 || window.__NS || {};
  return (
    <section style={{ position: "relative", background: "var(--ink-900)", color: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--hero-fade)" }}></div>
      </div>
      <div style={{ position: "relative", maxWidth: "var(--container-max)", margin: "0 auto", padding: "112px 24px 144px", display: "grid", gridTemplateColumns: "7fr 5fr", gap: 32 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>
            <span style={{ width: 24, height: 1, background: "rgba(255,255,255,0.5)" }}></span>
            2026 SPRING SERIES · VOL. 04
          </div>
          <h1 style={{ margin: 0, fontSize: 64, lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.02em" }}>말씀이 머무는 자리,<br />은혜가 흐르는 공동체.</h1>
          <p style={{ marginTop: 28, color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}>매주 새롭게 부어지는 은혜를 함께 누립니다. 예배와 말씀, 그리고 공동체 안에서 삶이 회복되는 자리로 여러분을 초대합니다.</p>
          <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "var(--ink-900)", padding: "0 20px", height: 48, borderRadius: "var(--radius-full)", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
              <span style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: "50%", background: "var(--brand-500)", color: "#fff" }}>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              이번 주 설교 보기
            </button>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff", padding: "0 20px", height: 48, borderRadius: "var(--radius-full)", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              예배 시간 안내
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </button>
          </div>
          <dl style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 448, fontSize: 13 }}>
            <div><dt style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>설교</dt><dd style={{ margin: 0, fontWeight: 600 }}>「머무름의 영성」</dd></div>
            <div><dt style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>본문</dt><dd style={{ margin: 0, fontWeight: 600 }}>시편 23:1–6</dd></div>
            <div><dt style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>설교자</dt><dd style={{ margin: 0, fontWeight: 600 }}>정한결 담임목사</dd></div>
          </dl>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", padding: "8px 14px", borderRadius: "var(--radius-full)", fontSize: 12, fontWeight: 600 }}>
            {Badge ? <Badge variant="live" /> : <span>LIVE</span>}
            <span style={{ color: "rgba(255,255,255,0.85)" }}>주일 1부 예배 진행 중</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const SERMONS = [
  { category: "주일", title: "머무름의 영성을 세우기로", speaker: "정한결 목사", date: "2026.04.26", image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=300&q=70" },
  { category: "수요", title: "기다림 속에서 발견한 이름", speaker: "김다온 부목사", date: "2026.04.23", image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=300&q=70" },
  { category: "청년", title: "광야에서 부르시는 노래", speaker: "이성결 전도사", date: "2026.04.19", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=70" },
  { category: "새벽", title: "아침마다 새로운 은혜", speaker: "정한결 목사", date: "2026.04.18", image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=300&q=70" },
];

function SermonSection() {
  const { SermonCard, FilterChip } = window.가평교회 || window.__NS || {};
  const cats = ["전체", "주일", "수요", "청년", "새벽"];
  const [active, setActive] = React.useState("전체");
  const list = active === "전체" ? SERMONS : SERMONS.filter((s) => s.category === active);
  return (
    <section style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "var(--brand-600)", marginBottom: 8 }}>RECENT MESSAGES</div>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>최근 설교 다시보기</h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {FilterChip && cats.map((c) => (
            <FilterChip key={c} active={active === c} onClick={() => setActive(c)}>{c === "전체" ? c : c + "예배"}</FilterChip>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, border: "1px solid var(--line)", borderRadius: "var(--radius-xl)", padding: 8 }}>
        {SermonCard && list.map((s, i) => <SermonCard key={i} {...s} />)}
      </div>
    </section>
  );
}

Object.assign(window, { Hero, SermonSection });
