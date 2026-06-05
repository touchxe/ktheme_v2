/* Hero composition options for 가평교회 index page.
   Each Hero* component is exactly 1440×780, designed to live INSIDE an artboard.
   All share a consistent mini-header so the variation is in the body. */

const MiniHeader = ({ tone = 'light' }) => {
  const dark = tone === 'dark';
  return (
    <div className={"mini-header w-full px-12 flex items-center justify-between border-b " + (dark ? "border-white/10 text-white bg-transparent" : "border-line text-ink-900 bg-white")}>
      <div className="flex items-center gap-2.5">
        <img src="assets/logo.png" alt="가평교회" className="w-9 h-9 object-contain" />
        <span className="font-bold text-[18px] tracking-tight">가평교회 <span className={"font-medium text-[12px] tracking-normal ml-0.5 " + (dark ? "text-white/50" : "text-ink-600")}>GAPYEONG CHURCH</span></span>
      </div>
      <nav className="flex items-center gap-8 text-[14px] font-semibold">
        <a className="relative">예배 <span className="absolute -top-0.5 -right-3 badge-live">LIVE</span></a>
        <a>공동체</a>
        <a>양육</a>
        <a>미디어</a>
        <a>교회소개</a>
        <a>행정</a>
      </nav>
      <div className="flex items-center gap-3">
        <button className={"w-9 h-9 grid place-items-center rounded-full " + (dark ? "hover:bg-white/10" : "hover:bg-paper")}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        </button>
        <button className={"inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 h-9 rounded-full border " + (dark ? "border-white/40 hover:bg-white/10" : "border-ink-900 hover:bg-ink-900 hover:text-white")}>
          새가족 등록
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   V1 · Editorial Split
   Large type on left over white. Tall image card on right with
   sermon meta overlaid. Magazine cover feeling.
========================================================= */
const HeroEditorialSplit = () => (
  <div className="w-[1440px] h-[780px] bg-white flex flex-col">
    <MiniHeader />
    <div className="flex-1 grid grid-cols-12">
      {/* Left */}
      <div className="col-span-7 px-16 pt-16 pb-12 flex flex-col">
        <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.28em] text-ink-600">
          <span className="w-8 h-px bg-ink-900"></span>
          2026 SPRING SERIES
          <span className="text-brand-600">VOL. 04</span>
        </div>

        <h1 className="mt-10 font-serifkr font-black tracking-tight leading-[0.98] text-[112px] text-ink-900">
          머무름의<br/>
          <span className="italic font-fraunces font-medium text-[104px] text-brand-600">spirituality</span><br/>
          <span className="text-[88px]">을 회복하다.</span>
        </h1>

        <p className="mt-10 text-ink-600 text-[16px] leading-relaxed max-w-md">
          한 자리에 머무르는 사람만이 듣게 되는 음성이 있습니다.<br/>
          매주 시편 23편을 함께 묵상하며, 우리가 머물러야 할<br/>
          그 자리를 다시 찾아갑니다.
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2.5 bg-ink-900 text-white px-5 h-12 rounded-full font-bold text-[13px]">
              <span className="grid place-items-center w-7 h-7 rounded-full bg-brand-500">
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
              이번 주 설교 보기
            </button>
            <button className="inline-flex items-center gap-2 border border-ink-900 px-5 h-12 rounded-full font-semibold text-[13px]">
              예배 시간 안내
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div className="text-right">
            <div className="text-[11px] font-bold tracking-widest text-ink-600">DIRECTOR'S NOTE</div>
            <div className="mt-2 text-[13px] font-serifkr italic text-ink-900 max-w-[180px]">"머무는 것이 곧 사랑입니다."<br/><span className="not-italic font-sans text-ink-600 text-[11px]">— 정한결 담임목사</span></div>
          </div>
        </div>
      </div>

      {/* Right image card */}
      <div className="col-span-5 p-6">
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-ink-800">
          <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80"
            className="absolute inset-0 w-full h-full object-cover" alt=""/>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent"></div>

          {/* top */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-red text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              LIVE · 주일예배
            </span>
            <span className="text-[12px] tracking-[0.2em] text-white/80">EP 03 / 04</span>
          </div>

          {/* center play */}
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 relative grid place-items-center w-20 h-20 rounded-full bg-white/95 text-ink-900 play-pulse">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>

          {/* bottom meta */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-[11px] font-bold tracking-[0.2em] text-white/70 mb-2">04.26 · SUN 11:00</div>
            <div className="text-[22px] font-bold leading-tight">머무름의 자리,<br/>그 곁에서 듣는 음성</div>
            <div className="mt-3 flex items-center gap-3 text-[12px] text-white/75">
              <span>시 23:1–3</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span>정한결 목사</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span>32분</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   V2 · Scripture-centered (quiet, devotional)
   Cream paper background. Verse hero. Small landscape strip
   anchored at bottom. Negative space dominant.
========================================================= */
const HeroScriptureCentered = () => (
  <div className="w-[1440px] h-[780px] bg-cream flex flex-col">
    <MiniHeader />
    <div className="flex-1 grid grid-cols-12 px-20 pt-12 pb-0 relative">
      {/* side rail */}
      <div className="col-span-2 flex flex-col justify-between text-[11px] font-bold tracking-[0.28em] text-ink-600">
        <div className="flex flex-col gap-2">
          <span className="text-brand-600">PSALM 23</span>
          <span>시편 이십삼편</span>
        </div>
        <div className="rotate-180 [writing-mode:vertical-rl] tracking-[0.4em] text-ink-600/60">2026 · 봄 묵상 시리즈 · VOL.04</div>
      </div>

      {/* center verse */}
      <div className="col-span-8 flex flex-col items-center text-center pt-4">
        <div className="text-[12px] font-bold tracking-[0.4em] text-brand-600 mb-8">— 이번 주 본문 —</div>
        <p className="font-serifkr text-ink-900 text-[42px] leading-[1.55] font-medium max-w-[760px]">
          여호와는 나의 목자시니<br/>
          내게 부족함이 없으리로다.<br/>
          <span className="text-ink-600 font-normal text-[36px]">그가 나를 푸른 풀밭에 누이시며<br/>쉴 만한 물가로 인도하시는도다.</span>
        </p>
        <div className="mt-10 flex items-center gap-3 text-[12px] text-ink-600">
          <span className="font-bold tracking-widest">시 23:1–2</span>
          <span className="w-8 h-px bg-ink-600/40"></span>
          <span className="font-serifkr italic">개역개정</span>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button className="inline-flex items-center gap-2.5 bg-ink-900 text-white px-5 h-11 rounded-full font-bold text-[13px]">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            이번 주 설교 듣기
          </button>
          <button className="inline-flex items-center gap-2 text-ink-900 px-5 h-11 rounded-full font-semibold text-[13px] underline underline-offset-4 decoration-1">
            묵상 노트 다운로드
          </button>
        </div>
      </div>

      {/* date pill */}
      <div className="col-span-2 flex flex-col items-end text-right">
        <div className="text-[11px] font-bold tracking-[0.28em] text-ink-600 mb-3">다음 예배</div>
        <div className="font-serifkr text-[64px] leading-none text-ink-900 font-medium">26</div>
        <div className="text-[14px] text-ink-600 mt-1">SUN · 11:00 AM</div>
        <div className="mt-1 text-[12px] text-brand-600 font-semibold">본당 · 영상실시간</div>
        <div className="mt-8 inline-flex items-center gap-2 text-[12px] text-ink-700 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"></span>
          현재 새벽예배 LIVE
        </div>
      </div>

      {/* bottom horizon strip */}
      <div className="col-span-12 absolute bottom-0 left-0 right-0">
        <div className="flex items-end">
          <div className="w-[10%] h-[140px] bg-ink-900"></div>
          <div className="flex-1 h-[140px] relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=70" className="w-full h-full object-cover grayscale opacity-90" alt=""/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-5 left-8 right-8 flex items-center justify-between text-white text-[12px]">
              <div className="flex items-center gap-6">
                <span className="font-bold tracking-[0.25em]">COMMUNITY</span>
                <span className="opacity-80">지난 한 주, 우리의 손과 발이 닿은 곳들.</span>
              </div>
              <span className="opacity-80">SCROLL ↓</span>
            </div>
          </div>
          <div className="w-[10%] h-[140px] bg-brand-600 text-white p-5 flex flex-col justify-between">
            <span className="text-[11px] font-bold tracking-[0.25em] opacity-80">새가족</span>
            <span className="text-[15px] font-bold leading-tight">처음 오셨나요? <br/>→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   V3 · Asymmetric Dashboard Grid
   Splits hero into modular cards — big image + sidebar cards
   (live, verse, schedule). Information-dense.
========================================================= */
const HeroAsymmetricGrid = () => (
  <div className="w-[1440px] h-[780px] bg-paper flex flex-col">
    <MiniHeader />
    <div className="flex-1 px-10 py-8 grid grid-cols-12 grid-rows-6 gap-4">
      {/* Big media card */}
      <div className="col-span-8 row-span-6 relative rounded-3xl overflow-hidden bg-ink-900">
        <img src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-85" alt=""/>
        <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/85 via-ink-900/30 to-transparent"></div>

        <div className="absolute top-7 left-7 right-7 flex items-center justify-between text-white">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-[11px] font-bold tracking-[0.2em] border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"></span>
            ON AIR · 04.26 SUN 11:00
          </span>
          <span className="text-[12px] tracking-[0.3em] font-bold text-white/70">VOL · 04</span>
        </div>

        <div className="absolute bottom-7 left-7 right-7 text-white">
          <div className="text-[11px] font-bold tracking-[0.3em] text-brand-500 mb-3">DECISION SERIES — EP 03</div>
          <h1 className="text-[64px] font-extrabold tracking-tight leading-[0.98]">
            머무름의 영성,<br/>그 곁에서 듣는 음성
          </h1>
          <div className="mt-5 flex items-center gap-5 text-[13px] text-white/80">
            <span>시 23:1–3</span><span className="w-1 h-1 rounded-full bg-white/40"></span>
            <span>정한결 담임목사</span><span className="w-1 h-1 rounded-full bg-white/40"></span>
            <span>32분</span>
          </div>
          <div className="mt-7 flex items-center gap-3">
            <button className="inline-flex items-center gap-2.5 bg-white text-ink-900 px-5 h-12 rounded-full font-bold text-[13px]">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              지금 시청
            </button>
            <button className="inline-flex items-center gap-2 border border-white/40 text-white px-5 h-12 rounded-full font-semibold text-[13px]">시리즈 보기</button>
          </div>
        </div>
      </div>

      {/* Verse card */}
      <div className="col-span-4 row-span-3 bg-white rounded-3xl p-7 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold tracking-[0.3em] text-brand-600">VERSE OF THE WEEK</span>
          <span className="text-[11px] text-ink-600 font-semibold">시 23:1</span>
        </div>
        <p className="font-serifkr text-[24px] leading-[1.5] font-medium text-ink-900 mt-2">
          여호와는 나의 목자시니<br/>내게 부족함이 없으리로다.
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[12px] text-ink-600">개역개정 · 시편</span>
          <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-600">
            오늘의 묵상
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Schedule card */}
      <div className="col-span-4 row-span-2 bg-ink-900 text-white rounded-3xl p-7">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold tracking-[0.3em] text-white/60">UPCOMING SERVICES</span>
          <a className="text-[11px] text-white/60 font-semibold">전체 →</a>
        </div>
        <div className="space-y-2.5 text-[13px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span>
              <span className="font-semibold">새벽예배</span>
            </div>
            <span className="text-white/60 font-mono">오늘 05:30</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="font-semibold">수요예배</span>
            </div>
            <span className="text-white/60 font-mono">04.23 · 19:30</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="font-semibold">주일예배 1부</span>
            </div>
            <span className="text-white/60 font-mono">04.26 · 09:00</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              <span className="font-semibold">주일예배 2부</span>
            </div>
            <span className="text-brand-500 font-mono">04.26 · 11:00</span>
          </div>
        </div>
      </div>

      {/* CTA card */}
      <div className="col-span-4 row-span-1 bg-brand-600 text-white rounded-3xl p-5 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold tracking-[0.25em] opacity-80">FOR NEWCOMERS</div>
          <div className="text-[15px] font-bold mt-0.5">처음 오신 분, 환영합니다.</div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white text-brand-600 grid place-items-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </div>
);

/* =========================================================
   V4 · Cinematic Bottom-anchored
   Full-bleed image. Big serial number top-right. Text anchored
   bottom-left. Newspaper masthead vibe.
========================================================= */
const HeroCinematicBottom = () => (
  <div className="w-[1440px] h-[780px] relative bg-ink-900 text-white overflow-hidden">
    <img src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=1800&q=80"
      className="absolute inset-0 w-full h-full object-cover opacity-75" alt=""/>
    <div className="absolute inset-0 hero-fade-b"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-ink-900/40 to-transparent"></div>

    <div className="relative">
      <MiniHeader tone="dark" />
    </div>

    {/* Top-right serial */}
    <div className="absolute top-28 right-12 text-right">
      <div className="text-[11px] tracking-[0.4em] font-bold text-white/70 mb-3">SPRING SERIES</div>
      <div className="font-fraunces italic text-[140px] leading-none text-white/95">04</div>
      <div className="text-[11px] tracking-[0.35em] font-bold text-white/70 mt-2">VOL · MMXXVI</div>
    </div>

    {/* Top-left marker */}
    <div className="absolute top-28 left-12 flex items-center gap-3">
      <span className="badge-live">LIVE</span>
      <span className="text-[12px] tracking-[0.25em] font-bold text-white/80">새벽예배 진행중 · 04.21 TUE 05:30</span>
    </div>

    {/* Bottom anchored block */}
    <div className="absolute bottom-0 left-0 right-0 px-12 pb-16">
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-8">
          <div className="font-fraunces italic text-[20px] text-white/80 mb-4">— a place where word remains.</div>
          <h1 className="font-serifkr text-[88px] leading-[1.0] font-medium tracking-tight">
            말씀이 머무는 자리,<br/>
            <span className="font-extrabold">은혜가 흐르는 공동체.</span>
          </h1>
          <p className="mt-7 text-white/75 text-[15px] leading-relaxed max-w-xl">
            매주 새롭게 부어지는 은혜를 함께 누립니다.<br/>
            예배와 말씀, 그리고 공동체 안에서 삶이 회복되는 자리로 여러분을 초대합니다.
          </p>
        </div>

        <div className="col-span-4 flex flex-col items-end gap-6">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2.5 bg-white text-ink-900 px-5 h-12 rounded-full font-bold text-[13px]">
              <span className="grid place-items-center w-7 h-7 rounded-full bg-brand-500">
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
              설교 보기
            </button>
            <button className="inline-flex items-center gap-2 border border-white/40 text-white px-5 h-12 rounded-full font-semibold text-[13px]">예배 안내</button>
          </div>
          <div className="grid grid-cols-3 gap-6 text-[12px] w-full">
            <div>
              <div className="text-white/50 mb-1">설교</div>
              <div className="font-semibold">「머무름의 영성」</div>
            </div>
            <div>
              <div className="text-white/50 mb-1">본문</div>
              <div className="font-semibold">시 23:1–6</div>
            </div>
            <div>
              <div className="text-white/50 mb-1">설교자</div>
              <div className="font-semibold">정한결 목사</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom ticker */}
    <div className="absolute bottom-0 left-0 right-0 h-9 bg-white text-ink-900 px-12 flex items-center justify-between text-[11px] font-bold tracking-[0.25em]">
      <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span> NOTICE · 봄학기 새가족반 등록</span>
      <span className="opacity-60">EVENT · 05.10 전 교인 봄 야외예배</span>
      <span className="opacity-60">MISSION · 06.02 캄보디아 단기선교 모집</span>
      <span className="text-brand-600">→ 전체 소식</span>
    </div>
  </div>
);

/* =========================================================
   V5 · Typography-only block (no photo)
   Two-tone color blocks, oversized type, accent ribbon.
   Brutalist / poster-like.
========================================================= */
const HeroTypographyBlock = () => (
  <div className="w-[1440px] h-[780px] bg-ink-900 text-white flex flex-col relative overflow-hidden">
    <MiniHeader tone="dark" />

    <div className="flex-1 grid grid-cols-12 relative">
      {/* Big type area */}
      <div className="col-span-9 px-16 pt-16 relative">
        <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.3em] text-white/60">
          <span className="badge-live">LIVE</span>
          <span>2026 · 04 · 26 · SUN · 11:00 KST</span>
          <span className="w-8 h-px bg-white/30"></span>
          <span>시편 23편 · 정한결 목사</span>
        </div>

        <h1 className="mt-12 font-serifkr font-black tracking-tight leading-[0.9]">
          <span className="block text-[152px]">머무름의</span>
          <span className="block text-[152px] text-brand-500">사람이 되기로.</span>
        </h1>

        <p className="mt-12 text-white/70 text-[16px] leading-relaxed max-w-md">
          2026년 봄, 시편 23편을 함께 묵상하며 우리가 머물러야 할 자리를 다시 찾아갑니다.
          예배와 말씀, 공동체 안에서 새롭게 시작합니다.
        </p>

        {/* huge serial */}
        <div className="absolute right-4 bottom-6 font-fraunces italic text-[280px] leading-none text-white/5 select-none">04</div>
      </div>

      {/* Right column */}
      <div className="col-span-3 bg-brand-600 text-white flex flex-col">
        <div className="flex-1 p-8 flex flex-col">
          <div className="text-[11px] font-bold tracking-[0.3em] opacity-80 mb-3">THIS WEEK</div>
          <div className="font-serifkr text-[42px] leading-none font-medium">04<span className="text-[24px] align-top">/26</span></div>
          <div className="mt-2 text-[14px] opacity-90">주일예배 · 본당 · 11:00</div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="text-[11px] font-bold tracking-[0.3em] opacity-80 mb-2">SERMON</div>
            <div className="text-[20px] font-bold leading-tight">머무름의 자리,<br/>그 곁에서 듣는 음성</div>
            <div className="text-[12px] opacity-80 mt-3">시 23:1–3 · 32분 · EP 03</div>
          </div>

          <div className="mt-auto">
            <button className="w-full inline-flex items-center justify-between bg-white text-brand-700 px-5 h-12 rounded-full font-bold text-[13px]">
              지금 시청하기
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <button className="mt-2 w-full inline-flex items-center justify-between text-white/90 px-5 h-12 rounded-full font-semibold text-[13px] border border-white/30">
              예배 시간 전체
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div className="bg-white/5 px-8 py-5 text-[12px] tracking-[0.25em] font-bold opacity-80 flex items-center justify-between">
          <span>NEXT →</span>
          <span>EP 04 · 골짜기에서도</span>
        </div>
      </div>
    </div>

    {/* bottom ribbon */}
    <div className="bg-white text-ink-900 h-10 px-12 flex items-center justify-between text-[11px] font-bold tracking-[0.25em]">
      <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span> ON AIR · 새벽예배</span>
      <span className="flex items-center gap-8 opacity-70">
        <span>NOTICE · 봄학기 새가족반 등록</span>
        <span>EVENT · 05.10 봄 야외예배</span>
        <span>MISSION · 06.02 캄보디아 단기선교</span>
      </span>
      <span className="text-brand-600">전체 소식 →</span>
    </div>
  </div>
);

/* =========================================================
   V6 · Classic Centered (Basic, Light)
   가장 흔하고 안전한 구성. 중앙 정렬 큰 제목 + 부제 + CTA,
   하단에 이번 주 일정 카드 3개. 흰 배경.
========================================================= */
const HeroClassicCentered = () => (
  <div className="w-[1440px] h-[780px] bg-white flex flex-col">
    <MiniHeader />
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-12 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper text-[11px] font-bold tracking-[0.2em] text-ink-700">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"></span>
          이번 주 04.26 SUN · 11:00 KST
        </div>

        <h1 className="mt-7 text-[72px] font-extrabold tracking-[-0.03em] leading-[1.05] text-ink-900 max-w-[1100px]">
          말씀이 머무는 자리,<br/>
          은혜가 흐르는 <span className="text-brand-600">공동체.</span>
        </h1>

        <p className="mt-7 text-ink-600 text-[17px] leading-relaxed max-w-[640px]">
          매주 새롭게 부어지는 은혜를 함께 누립니다.<br/>
          예배와 말씀, 그리고 공동체 안에서 삶이 회복되는 자리로 여러분을 초대합니다.
        </p>

        <div className="mt-9 flex items-center gap-3">
          <button className="inline-flex items-center gap-2.5 bg-ink-900 text-white px-6 h-12 rounded-full font-bold text-[14px]">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            이번 주 설교 보기
          </button>
          <button className="inline-flex items-center gap-2 border border-ink-900 px-6 h-12 rounded-full font-semibold text-[14px]">
            처음 오셨나요?
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* bottom quick cards */}
      <div className="px-12 pb-10 grid grid-cols-3 gap-4">
        <div className="bg-paper rounded-2xl p-5 flex items-center gap-4">
          <span className="shrink-0 w-12 h-12 rounded-xl bg-white grid place-items-center text-brand-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-widest text-brand-600 mb-1">이번 주 예배</div>
            <div className="text-[14px] font-semibold text-ink-900 truncate">주일 1부 09:00 · 2부 11:00</div>
          </div>
        </div>
        <div className="bg-paper rounded-2xl p-5 flex items-center gap-4">
          <span className="shrink-0 w-12 h-12 rounded-xl bg-white grid place-items-center text-emerald-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-widest text-emerald-600 mb-1">교회 오시는 길</div>
            <div className="text-[14px] font-semibold text-ink-900 truncate">경기 가평군 가평읍 호반로 123</div>
          </div>
        </div>
        <div className="bg-paper rounded-2xl p-5 flex items-center gap-4">
          <span className="shrink-0 w-12 h-12 rounded-xl bg-white grid place-items-center text-amber-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-widest text-amber-600 mb-1">교회 안내</div>
            <div className="text-[14px] font-semibold text-ink-900 truncate">031-580-1234 · 평일 09–18시</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   V7 · Standard Split with Image (Basic, Light)
   가장 흔한 좌측 텍스트 + 우측 이미지 50:50. 흰 배경, 회색 보조.
========================================================= */
const HeroStandardSplit = () => (
  <div className="w-[1440px] h-[780px] bg-white flex flex-col">
    <MiniHeader />
    <div className="flex-1 grid grid-cols-2">
      {/* Left text */}
      <div className="px-16 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-brand-500/10 text-brand-700 text-[11px] font-bold tracking-[0.2em]">
          WELCOME TO GAPYEONG CHURCH
        </div>

        <h1 className="mt-6 text-[64px] font-extrabold tracking-[-0.025em] leading-[1.08] text-ink-900">
          예배가 일상이 되고,<br/>
          일상이 <span className="text-brand-600">예배가</span> 되는 곳.
        </h1>

        <p className="mt-6 text-ink-600 text-[16px] leading-relaxed max-w-[480px]">
          가평교회는 1973년부터 한 자리에서 말씀을 전하고 있습니다.
          세대를 잇고 이웃을 품는 신앙 공동체로 여러분을 초대합니다.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <button className="inline-flex items-center gap-2.5 bg-brand-600 text-white px-5 h-12 rounded-full font-bold text-[14px] hover:bg-brand-700">
            교회 둘러보기
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
          <button className="inline-flex items-center gap-2.5 text-ink-900 px-5 h-12 rounded-full font-semibold text-[14px] hover:bg-paper">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-paper">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </span>
            소개 영상 (2:30)
          </button>
        </div>

        {/* stats */}
        <div className="mt-12 pt-8 border-t border-line grid grid-cols-3 gap-6 max-w-[480px]">
          <div>
            <div className="text-[32px] font-extrabold text-ink-900 leading-none">53<span className="text-[18px] text-ink-600 align-top ml-0.5">년</span></div>
            <div className="text-[12px] text-ink-600 mt-1.5">한 자리에서</div>
          </div>
          <div>
            <div className="text-[32px] font-extrabold text-ink-900 leading-none">12<span className="text-[18px] text-ink-600 align-top ml-0.5">개</span></div>
            <div className="text-[12px] text-ink-600 mt-1.5">소그룹·양육</div>
          </div>
          <div>
            <div className="text-[32px] font-extrabold text-ink-900 leading-none">4<span className="text-[18px] text-ink-600 align-top ml-0.5">개국</span></div>
            <div className="text-[12px] text-ink-600 mt-1.5">선교 후원</div>
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className="relative p-8 pl-0">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-paper">
          <img src="https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80"
            className="absolute inset-0 w-full h-full object-cover" alt=""/>
          {/* floating card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <span className="shrink-0 w-12 h-12 rounded-full bg-accent-red/10 grid place-items-center text-accent-red">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></span>
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold tracking-widest text-accent-red mb-0.5">LIVE · 새벽예배</div>
              <div className="text-[14px] font-semibold text-ink-900 truncate">시편 23편을 함께 묵상합니다 · 05:30</div>
            </div>
            <button className="shrink-0 inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-600">
              시청
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   V8 · Card Stack on Soft Background (Basic, Light)
   기본 구성 + paper 톤 배경. 중앙 카드 안에 예배 카드,
   주변에 quick links. 친근하고 안전한 인상.
========================================================= */
const HeroCardOnPaper = () => (
  <div className="w-[1440px] h-[780px] bg-paper flex flex-col">
    <MiniHeader />
    <div className="flex-1 px-12 py-10 grid grid-cols-12 gap-6">
      {/* main card */}
      <div className="col-span-8 bg-white rounded-3xl p-12 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper text-[11px] font-bold tracking-[0.2em] text-ink-700">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"></span>
            이번 주 주일예배
          </div>
          <div className="text-[12px] font-semibold text-ink-600">2026.04.26 · SUN</div>
        </div>

        <h1 className="mt-8 text-[68px] font-extrabold tracking-[-0.025em] leading-[1.0] text-ink-900">
          머무름의 영성,<br/>
          그 곁에서 듣는 <span className="text-brand-600">음성.</span>
        </h1>

        <p className="mt-6 text-ink-600 text-[16px] leading-relaxed max-w-[520px]">
          시편 23편을 함께 묵상하며, 우리가 머물러야 할 그 자리를 찾아갑니다.
          매주 새롭게 부어지는 은혜의 자리로 여러분을 초대합니다.
        </p>

        <div className="mt-auto pt-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2.5 bg-ink-900 text-white px-5 h-12 rounded-full font-bold text-[13px]">
              <span className="grid place-items-center w-7 h-7 rounded-full bg-brand-500">
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
              설교 보기
            </button>
            <button className="inline-flex items-center gap-2 border border-ink-900 px-5 h-12 rounded-full font-semibold text-[13px]">
              주보 보기
            </button>
          </div>

          <div className="flex items-center gap-6 text-[13px]">
            <div>
              <div className="text-[11px] text-ink-600 mb-0.5">본문</div>
              <div className="font-semibold text-ink-900">시 23:1–3</div>
            </div>
            <div className="w-px h-8 bg-line"></div>
            <div>
              <div className="text-[11px] text-ink-600 mb-0.5">설교자</div>
              <div className="font-semibold text-ink-900">정한결 목사</div>
            </div>
          </div>
        </div>
      </div>

      {/* side cards */}
      <div className="col-span-4 flex flex-col gap-6">
        <a className="flex-1 bg-white rounded-3xl p-8 flex flex-col justify-between hover:shadow-md transition cursor-pointer">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 grid place-items-center text-brand-600 mb-5">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM12 3v4M8 3v4M16 3v4"/></svg>
            </div>
            <div className="text-[11px] font-bold tracking-widest text-brand-600 mb-2">예배 일정</div>
            <div className="text-[22px] font-bold text-ink-900 tracking-tight leading-tight">주일 1부 · 2부 · 3부<br/>수요·금요·새벽</div>
          </div>
          <div className="text-[12px] font-semibold text-ink-600 flex items-center gap-1.5">
            전체 일정 보기
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </div>
        </a>
        <a className="flex-1 bg-ink-900 text-white rounded-3xl p-8 flex flex-col justify-between hover:bg-ink-800 transition cursor-pointer">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center text-white mb-5">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div className="text-[11px] font-bold tracking-widest text-white/60 mb-2">처음 오셨나요?</div>
            <div className="text-[22px] font-bold tracking-tight leading-tight">새가족을 위한<br/>안내가 준비되어 있어요.</div>
          </div>
          <div className="text-[12px] font-semibold text-white/80 flex items-center gap-1.5">
            등록하기
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </div>
        </a>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  MiniHeader,
  HeroEditorialSplit,
  HeroScriptureCentered,
  HeroAsymmetricGrid,
  HeroCinematicBottom,
  HeroTypographyBlock,
  HeroClassicCentered,
  HeroStandardSplit,
  HeroCardOnPaper,
});
