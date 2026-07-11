// 푸터. window로 export.
function Footer() {
  const cols = [
    { h: "예배", items: ["주일예배", "수요기도회", "새벽예배", "온라인 예배"] },
    { h: "공동체", items: ["목장 안내", "청년부", "다음세대", "선교"] },
    { h: "양육", items: ["새가족 교육", "제자훈련", "성경공부", "세례·입교"] },
    { h: "안내", items: ["교회소개", "오시는 길", "주보", "문의하기"] },
  ];
  return (
    <footer style={{ background: "var(--ink-900)", color: "#fff" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "64px 24px 40px", display: "grid", gridTemplateColumns: "1.4fr repeat(4,1fr)", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="../../assets/logo.png" alt="" style={{ width: 36, height: 36, objectFit: "contain" }} />
            <span style={{ fontWeight: 700, fontSize: 17 }}>가평교회</span>
          </div>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7 }}>경기도 가평군 가평읍 ○○로 00<br />Tel. 031-000-0000</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>{c.h}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {c.items.map((it) => (
                <li key={it}><a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          <span>© 2026 가평교회 GAPYEONG CHURCH</span>
          <span>개인정보처리방침 · 이용약관</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
