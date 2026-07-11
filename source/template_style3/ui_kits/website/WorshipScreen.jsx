// 새가족 등록 폼 + 예배 안내 (서브 화면). window로 export.
function WorshipScreen() {
  const { Input, Select, Button, Card, Badge } = window.가평교회 || window.__NS || {};
  const services = [
    { name: "주일 1부 예배", time: "오전 9:00", place: "본당", cat: "주일" },
    { name: "주일 2부 예배", time: "오전 11:00", place: "본당", cat: "주일" },
    { name: "수요 기도회", time: "오후 7:30", place: "본당", cat: "수요" },
    { name: "새벽 예배", time: "오전 5:30", place: "소예배실", cat: "새벽" },
  ];
  return (
    <div>
      {/* 페이지 히어로 */}
      <section style={{ background: "var(--ink-900)", color: "#fff" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>WORSHIP · 예배</div>
          <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em" }}>예배 안으로</h1>
          <p style={{ marginTop: 16, color: "rgba(255,255,255,0.7)", fontSize: 16, maxWidth: 540 }}>온 가족이 함께 드리는 예배로 여러분을 초대합니다. 처음 오시는 분은 새가족 등록을 도와드립니다.</p>
        </div>
      </section>

      <section style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40, alignItems: "start" }}>
        {/* 예배 시간 */}
        <div>
          <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>예배 시간 안내</h2>
          <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            {services.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderTop: i ? "1px solid var(--line)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {Badge && <Badge variant="category" category={s.cat}>{s.cat}</Badge>}
                  <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text-strong)" }}>{s.name}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--text-body)" }}>{s.time} · {s.place}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 새가족 등록 폼 */}
        <div>
          {Card && (
            <Card elevated padding={28}>
              <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, letterSpacing: "-0.01em" }}>새가족 등록</h2>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--text-body)" }}>처음 오신 분을 환영합니다. 정보를 남겨주시면 안내해 드립니다.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Input label="이름" placeholder="홍길동" />
                <Input label="연락처" placeholder="010-0000-0000" hint="문자 안내에 사용됩니다" />
                <Select label="참여 희망 예배" defaultValue="">
                  <option value="" disabled>선택하세요</option>
                  {services.map((s, i) => <option key={i}>{s.name} ({s.time})</option>)}
                </Select>
                <Button variant="brand" size="lg" style={{ marginTop: 6, width: "100%" }}>등록 신청하기</Button>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { WorshipScreen });
