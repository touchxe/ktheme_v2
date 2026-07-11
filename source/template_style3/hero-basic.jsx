/* 10 BASIC, LIGHT-COLOR hero variations for 가평교회 index.
   Background treatments vary: white, paper, cream, soft photo, video loop,
   pastel gradient, dot grid, illustration, map, photo collage. */

// MiniHeader is defined in hero-variations.jsx — reuse from window.
const MH = () => window.MiniHeader ? <window.MiniHeader /> : null;

/* ---------- shared little bits ---------- */
const Eyebrow = ({ children, color = "brand" }) => (
  <div className={"inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] " + (color === "brand" ? "text-brand-600" : "text-ink-600")}>
    <span className={"w-6 h-px " + (color === "brand" ? "bg-brand-600" : "bg-ink-600")}></span>
    {children}
  </div>
);

const PrimaryCTA = ({ children, dark = true }) => (
  <button className={"inline-flex items-center gap-2.5 px-5 h-12 rounded-full font-bold text-[13px] " + (dark ? "bg-ink-900 text-white" : "bg-brand-600 text-white")}>
    <span className="grid place-items-center w-7 h-7 rounded-full bg-brand-500">
      <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </span>
    {children}
  </button>
);

const GhostCTA = ({ children, tone = "dark" }) => (
  <button className={"inline-flex items-center gap-2 px-5 h-12 rounded-full font-semibold text-[13px] border " + (tone === "dark" ? "border-ink-900 text-ink-900" : "border-ink-600/30 text-ink-900 bg-white")}>
    {children}
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
  </button>
);

/* ============================================================
   B1 · Centered Classic — pure white
============================================================ */
const HeroB1Centered = () => (
  <div className="w-[1440px] h-[780px] bg-white flex flex-col">
    <MH />
    <div className="flex-1 flex flex-col items-center justify-center text-center px-12">
      <Eyebrow>2026 SPRING · VOL.04</Eyebrow>
      <h1 className="mt-6 text-[80px] font-extrabold tracking-[-0.03em] leading-[1.02] text-ink-900 max-w-[1100px]">
        말씀이 머무는 자리,<br/>은혜가 흐르는 <span className="text-brand-600">공동체.</span>
      </h1>
      <p className="mt-7 text-ink-600 text-[17px] leading-relaxed max-w-[620px]">
        매주 새롭게 부어지는 은혜를 함께 누립니다. 예배와 말씀,<br/>
        그리고 공동체 안에서 삶이 회복되는 자리로 초대합니다.
      </p>
      <div className="mt-9 flex items-center gap-3">
        <PrimaryCTA>이번 주 설교 보기</PrimaryCTA>
        <GhostCTA>처음 오셨나요?</GhostCTA>
      </div>
      <div className="mt-14 grid grid-cols-3 gap-12 text-center">
        <div><div className="text-[28px] font-extrabold text-ink-900 leading-none">53년</div><div className="text-[12px] text-ink-600 mt-1.5">한 자리에서</div></div>
        <div><div className="text-[28px] font-extrabold text-ink-900 leading-none">12개</div><div className="text-[12px] text-ink-600 mt-1.5">소그룹·양육</div></div>
        <div><div className="text-[28px] font-extrabold text-ink-900 leading-none">4개국</div><div className="text-[12px] text-ink-600 mt-1.5">선교 후원</div></div>
      </div>
    </div>
  </div>
);

/* ============================================================
   B2 · 50:50 Split with photo
============================================================ */
const HeroB2Split = () => (
  <div className="w-[1440px] h-[780px] bg-white flex flex-col">
    <MH />
    <div className="flex-1 grid grid-cols-2">
      <div className="px-16 flex flex-col justify-center">
        <Eyebrow>WELCOME TO GAPYEONG CHURCH</Eyebrow>
        <h1 className="mt-6 text-[64px] font-extrabold tracking-[-0.025em] leading-[1.05] text-ink-900">
          예배가 일상이 되고,<br/>일상이 <span className="text-brand-600">예배가</span> 되는 곳.
        </h1>
        <p className="mt-6 text-ink-600 text-[16px] leading-relaxed max-w-[460px]">
          가평교회는 1973년부터 한 자리에서 말씀을 전하고 있습니다.
          세대를 잇고 이웃을 품는 신앙 공동체로 여러분을 초대합니다.
        </p>
        <div className="mt-9 flex items-center gap-3">
          <PrimaryCTA dark={false}>교회 둘러보기</PrimaryCTA>
          <GhostCTA>소개 영상</GhostCTA>
        </div>
      </div>
      <div className="p-8 pl-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-paper">
          <img src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover" alt=""/>
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold tracking-widest text-accent-red">LIVE · 새벽예배</div>
              <div className="text-[14px] font-semibold text-ink-900 truncate">시편 23편을 함께 묵상합니다</div>
            </div>
            <span className="text-[12px] font-bold text-brand-600">시청 →</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   B3 · Card stack on paper background
============================================================ */
const HeroB3CardStack = () => (
  <div className="w-[1440px] h-[780px] bg-paper flex flex-col">
    <MH />
    <div className="flex-1 px-12 py-10 grid grid-cols-12 gap-6">
      <div className="col-span-8 bg-white rounded-3xl p-12 flex flex-col">
        <div className="flex items-center justify-between">
          <Eyebrow>이번 주 주일예배</Eyebrow>
          <div className="text-[12px] font-semibold text-ink-600">2026.04.26 · SUN</div>
        </div>
        <h1 className="mt-8 text-[64px] font-extrabold tracking-[-0.025em] leading-[1.0] text-ink-900">
          머무름의 영성,<br/>그 곁에서 듣는 <span className="text-brand-600">음성.</span>
        </h1>
        <p className="mt-6 text-ink-600 text-[16px] leading-relaxed max-w-[520px]">
          시편 23편을 함께 묵상하며, 우리가 머물러야 할 그 자리를 찾아갑니다.
        </p>
        <div className="mt-auto pt-10 flex items-center gap-3">
          <PrimaryCTA>설교 보기</PrimaryCTA>
          <GhostCTA>주보 보기</GhostCTA>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-6">
        <a className="flex-1 bg-white rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-brand-600 mb-2">예배 일정</div>
            <div className="text-[20px] font-bold text-ink-900 leading-tight">주일 1·2·3부<br/>수요·금요·새벽</div>
          </div>
          <div className="text-[12px] font-semibold text-ink-600">전체 일정 →</div>
        </a>
        <a className="flex-1 bg-ink-900 text-white rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-white/60 mb-2">처음 오셨나요?</div>
            <div className="text-[20px] font-bold leading-tight">새가족을 위한<br/>안내가 준비되어 있어요.</div>
          </div>
          <div className="text-[12px] font-semibold text-white/80">등록하기 →</div>
        </a>
      </div>
    </div>
  </div>
);

/* ============================================================
   B4 · Soft background image with bright overlay
============================================================ */
const HeroB4SoftImage = () => (
  <div className="w-[1440px] h-[780px] relative bg-white overflow-hidden">
    {/* faded photo */}
    <img src="https://images.unsplash.com/photo-1490127252417-7c393f993ee4?auto=format&fit=crop&w=1800&q=80" className="absolute inset-0 w-full h-full object-cover" alt=""/>
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/30"></div>

    <div className="relative z-10 flex flex-col h-full">
      <MH />
      <div className="flex-1 grid grid-cols-12 px-16 items-center">
        <div className="col-span-7">
          <Eyebrow>FOR THE WEARY · 지친 영혼을 위해</Eyebrow>
          <h1 className="mt-7 text-[80px] font-extrabold tracking-[-0.03em] leading-[1.0] text-ink-900">
            쉴 만한 물가로<br/>
            <span className="text-brand-600">인도하시는</span> 분.
          </h1>
          <p className="mt-7 text-ink-700 text-[17px] leading-relaxed max-w-[480px]">
            여러분의 한 주가 평안하기를 기도합니다.<br/>
            푸른 풀밭에 누이시는 그분께로 함께 나아갑니다.
          </p>
          <div className="mt-9 flex items-center gap-3">
            <PrimaryCTA>이번 주 설교</PrimaryCTA>
            <GhostCTA tone="light">교회 소개</GhostCTA>
          </div>
        </div>
        <div className="col-span-5 flex justify-end">
          <div className="w-[360px] bg-white/80 backdrop-blur-md border border-line rounded-2xl p-7">
            <div className="text-[11px] font-bold tracking-widest text-brand-600 mb-3">VERSE OF THE WEEK</div>
            <p className="text-[20px] font-bold leading-snug text-ink-900">
              그가 나를 푸른 풀밭에 누이시며<br/>쉴 만한 물가로 인도하시는도다.
            </p>
            <div className="mt-4 pt-4 border-t border-line text-[12px] text-ink-600 flex items-center justify-between">
              <span>시 23:2</span><span className="font-semibold">개역개정</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   B5 · Background VIDEO loop with soft white overlay
============================================================ */
const HeroB5Video = () => (
  <div className="w-[1440px] h-[780px] relative bg-white overflow-hidden">
    <video
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay muted loop playsInline
      poster="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1800&q=80"
    >
      <source src="https://videos.pexels.com/video-files/2169307/2169307-uhd_3840_2160_30fps.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

    <div className="relative z-10 flex flex-col h-full">
      <MH />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-line text-[11px] font-bold tracking-[0.2em] text-ink-700">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"></span>
          새벽예배 LIVE · 화요일 05:30
        </div>
        <h1 className="mt-7 text-[92px] font-extrabold tracking-[-0.03em] leading-[1.0] text-ink-900 max-w-[1100px]">
          머무름의 자리,<br/><span className="text-brand-600">은혜가 흐릅니다.</span>
        </h1>
        <p className="mt-7 text-ink-700 text-[17px] leading-relaxed max-w-[560px]">
          매일의 예배와 묵상으로 우리의 영혼은 다시 푸르러집니다.
        </p>
        <div className="mt-9 flex items-center gap-3">
          <PrimaryCTA>지금 시청</PrimaryCTA>
          <GhostCTA tone="light">예배 시간표</GhostCTA>
        </div>
      </div>
      {/* tiny video controls hint */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-line text-[11px] font-semibold text-ink-700">
        <span className="grid place-items-center w-5 h-5 rounded-full bg-ink-900">
          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
        </span>
        BACKGROUND LOOP
      </div>
    </div>
  </div>
);

/* ============================================================
   B6 · Pastel gradient background
============================================================ */
const HeroB6Gradient = () => (
  <div className="w-[1440px] h-[780px] relative flex flex-col"
    style={{ background: "linear-gradient(135deg, #f6f7ff 0%, #f3f1ec 45%, #eef3ff 100%)" }}>
    {/* sun blob */}
    <div className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full opacity-50"
      style={{ background: "radial-gradient(circle, #c9d4ff 0%, transparent 60%)" }}></div>
    <div className="absolute -bottom-40 -left-20 w-[520px] h-[520px] rounded-full opacity-60"
      style={{ background: "radial-gradient(circle, #ffe4c4 0%, transparent 60%)" }}></div>

    <div className="relative z-10 flex flex-col h-full">
      <MH />
      <div className="flex-1 grid grid-cols-12 items-center px-16">
        <div className="col-span-7">
          <Eyebrow color="ink">2026 NEW YEAR · MESSAGE</Eyebrow>
          <h1 className="mt-7 text-[88px] font-extrabold tracking-[-0.03em] leading-[1.0] text-ink-900">
            새해, 다시<br/><span className="text-brand-600">머무름의 자리로.</span>
          </h1>
          <p className="mt-7 text-ink-700 text-[17px] leading-relaxed max-w-[500px]">
            우리가 머물러야 할 자리에서, 다시 시작합니다.<br/>
            올 한 해 가평교회의 발걸음에 함께해 주세요.
          </p>
          <div className="mt-9 flex items-center gap-3">
            <PrimaryCTA dark={false}>새해 메시지 보기</PrimaryCTA>
            <GhostCTA tone="light">한 해 일정 안내</GhostCTA>
          </div>
        </div>
        <div className="col-span-5 flex flex-col items-end gap-4">
          <div className="bg-white/70 backdrop-blur-xl border border-white rounded-2xl px-7 py-6 w-[320px]">
            <div className="text-[11px] font-bold tracking-widest text-ink-600 mb-1">다음 예배</div>
            <div className="text-[36px] font-extrabold text-ink-900 leading-none">04.26<span className="text-[18px] text-ink-600 ml-2 font-bold">SUN</span></div>
            <div className="mt-3 text-[13px] text-ink-700">주일 2부 · 11:00 · 본당</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-white rounded-2xl px-7 py-6 w-[320px]">
            <div className="text-[11px] font-bold tracking-widest text-brand-600 mb-1">새가족 환영</div>
            <div className="text-[18px] font-bold text-ink-900 leading-tight">처음 오신 분도 자연스럽게.</div>
            <div className="mt-3 text-[12px] text-brand-600 font-semibold">등록하기 →</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   B7 · Subtle dot grid pattern background
============================================================ */
const HeroB7Pattern = () => (
  <div className="w-[1440px] h-[780px] relative bg-white flex flex-col">
    <div className="absolute inset-0" style={{
      backgroundImage: "radial-gradient(#0e132018 1px, transparent 1px)",
      backgroundSize: "22px 22px",
    }}></div>
    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

    <div className="relative z-10 flex flex-col h-full">
      <MH />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-12">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-line bg-white text-[11px] font-bold tracking-[0.2em] text-ink-700">
          <img src="assets/logo.png" className="w-4 h-4 object-contain" alt=""/>
          GAPYEONG CHURCH · EST.1973
        </div>
        <h1 className="mt-8 text-[100px] font-extrabold tracking-[-0.035em] leading-[0.98] text-ink-900 max-w-[1200px]">
          한 자리에서<br/><span className="text-brand-600">53년의 예배.</span>
        </h1>
        <p className="mt-7 text-ink-600 text-[17px] leading-relaxed max-w-[600px]">
          세대를 잇고 이웃을 품는 신앙 공동체.<br/>
          가평교회는 한 자리에서 변함없이 말씀을 전합니다.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <PrimaryCTA>이번 주 설교</PrimaryCTA>
          <GhostCTA>예배 시간 안내</GhostCTA>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   B8 · Full-bleed photo with floating white card
============================================================ */
const HeroB8PhotoCard = () => (
  <div className="w-[1440px] h-[780px] relative bg-white overflow-hidden">
    <img src="https://images.unsplash.com/photo-1508007226437-94de50d72714?auto=format&fit=crop&w=1800&q=80" className="absolute inset-0 w-full h-full object-cover" alt=""/>
    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent"></div>

    <div className="relative z-10 flex flex-col h-full">
      <MH />
      <div className="flex-1 flex items-center px-16">
        <div className="bg-white rounded-3xl p-12 max-w-[640px] shadow-2xl">
          <Eyebrow>04.26 SUN · 11:00 KST</Eyebrow>
          <h1 className="mt-6 text-[60px] font-extrabold tracking-[-0.025em] leading-[1.02] text-ink-900">
            머무름의 영성,<br/>그 곁에서 듣는 <span className="text-brand-600">음성.</span>
          </h1>
          <p className="mt-5 text-ink-600 text-[15px] leading-relaxed">
            시편 23편 시리즈 — 정한결 담임목사 · 32분
          </p>
          <div className="mt-8 flex items-center gap-3">
            <PrimaryCTA>설교 보기</PrimaryCTA>
            <GhostCTA>시리즈 전체</GhostCTA>
          </div>
          <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-[12px]">
            <span className="inline-flex items-center gap-2 text-accent-red font-bold tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"></span>
              ON AIR · 새벽예배
            </span>
            <span className="text-ink-600">다음 EP 04 → 골짜기에서도</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   B9 · Diagonal split — white + paper
============================================================ */
const HeroB9Diagonal = () => (
  <div className="w-[1440px] h-[780px] relative bg-white overflow-hidden flex flex-col">
    {/* diagonal accent */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-paper"
        style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 45% 100%)" }}></div>
      <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-brand-600"
        style={{ transform: "skewX(-12deg)", right: "44%" }}></div>
    </div>

    <div className="relative z-10 flex flex-col h-full">
      <MH />
      <div className="flex-1 grid grid-cols-12 items-center">
        <div className="col-span-7 pl-16 pr-8">
          <Eyebrow>EVERY SUNDAY · 매주 주일</Eyebrow>
          <h1 className="mt-7 text-[76px] font-extrabold tracking-[-0.03em] leading-[1.0] text-ink-900">
            세 번의 예배,<br/>
            하나의 <span className="text-brand-600">은혜.</span>
          </h1>
          <p className="mt-7 text-ink-600 text-[17px] leading-relaxed max-w-[460px]">
            오전 9시, 11시, 그리고 오후 2시.<br/>
            가족과 함께, 청년과 함께, 그리고 다음 세대와 함께 드립니다.
          </p>
          <div className="mt-9 flex items-center gap-3">
            <PrimaryCTA>예배 안내</PrimaryCTA>
            <GhostCTA>온라인 예배</GhostCTA>
          </div>
        </div>
        <div className="col-span-5 pr-16 flex flex-col gap-3">
          {[
            { time: "09:00", label: "1부 · 장년", note: "본당", accent: "bg-brand-500" },
            { time: "11:00", label: "2부 · 가족", note: "본당 + 영상실", accent: "bg-accent-red" },
            { time: "14:00", label: "3부 · 청년", note: "비전홀", accent: "bg-emerald-500" },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-line rounded-2xl px-6 py-5 flex items-center justify-between hover:shadow-sm">
              <div className="flex items-center gap-5">
                <span className={"w-1.5 h-12 rounded-full " + s.accent}></span>
                <div>
                  <div className="text-[26px] font-extrabold text-ink-900 leading-none tracking-tight">{s.time}</div>
                  <div className="text-[12px] text-ink-600 mt-1">{s.label}</div>
                </div>
              </div>
              <div className="text-right text-[12px]">
                <div className="text-ink-600">장소</div>
                <div className="font-semibold text-ink-900">{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   B10 · Photo collage strip
============================================================ */
const HeroB10Collage = () => (
  <div className="w-[1440px] h-[780px] bg-cream flex flex-col">
    <MH />
    <div className="flex-1 flex flex-col">
      <div className="flex-1 grid grid-cols-12 items-center px-16">
        <div className="col-span-12 text-center">
          <Eyebrow>OUR COMMUNITY · 한 주의 풍경</Eyebrow>
          <h1 className="mt-7 text-[84px] font-extrabold tracking-[-0.03em] leading-[1.0] text-ink-900">
            우리는 함께<br/>
            <span className="text-brand-600">예배하고, 먹고, 자라갑니다.</span>
          </h1>
          <p className="mt-7 text-ink-700 text-[17px] leading-relaxed max-w-[640px] mx-auto">
            가평교회의 한 주는 예배에서 시작해 식탁과 골목, 산책로까지 이어집니다.
          </p>
          <div className="mt-9 flex items-center gap-3 justify-center">
            <PrimaryCTA>공동체 소개</PrimaryCTA>
            <GhostCTA>이번 주 사진</GhostCTA>
          </div>
        </div>
      </div>

      {/* photo strip */}
      <div className="px-6 pb-6 grid grid-cols-5 gap-3 h-[260px]">
        {[
          { src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=600&q=70", tag: "주일예배" },
          { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=600&q=70", tag: "다음세대" },
          { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=70", tag: "공동체 식탁" },
          { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=70", tag: "가평의 사계" },
          { src: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=600&q=70", tag: "선교의 발걸음" },
        ].map((p, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden bg-white">
            <img src={p.src} className="absolute inset-0 w-full h-full object-cover" alt=""/>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <div className="text-[11px] font-bold tracking-widest text-white">{p.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

Object.assign(window, {
  HeroB1Centered,
  HeroB2Split,
  HeroB3CardStack,
  HeroB4SoftImage,
  HeroB5Video,
  HeroB6Gradient,
  HeroB7Pattern,
  HeroB8PhotoCard,
  HeroB9Diagonal,
  HeroB10Collage,
});
