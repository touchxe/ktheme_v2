/* 서브페이지(.modu-page-hero) 히어로 6종 — 가평교회 디자인 시스템 기반.
   각 컴포넌트는 폭 1440px 고정, 높이는 콘텐츠에 맞춤.
   공통 요소: breadcrumb · 큰 제목 · 짧은 설명 · 서브 내비 탭.
   기존 사이트(worship.html)의 헤더/컬러/pill 패턴을 그대로 계승. */

/* ============================================================
   공용 — 사이트 헤더 (tone: light = 흰 배경 / dark = 이미지 위 오버레이)
============================================================ */
const NAV = ["예배", "공동체", "양육", "미디어", "교회소개", "행정"];

const SiteHeader = ({ tone = "light", active = "예배" }) => {
  const dark = tone === "dark";
  return (
    <header
      className={
        "relative z-30 w-full " +
        (dark
          ? "bg-transparent text-white border-b border-white/15"
          : "bg-white/95 text-ink-900 border-b border-line")
      }
    >
      <div className="max-w-[1240px] mx-auto px-8 h-[72px] flex items-center justify-between">
        <a className="flex items-center gap-2.5">
          <img src="assets/logo.png" alt="가평교회" className={"w-10 h-10 object-contain " + (dark ? "brightness-0 invert" : "")} />
          <span className="font-bold text-[19px] tracking-tight">
            가평교회{" "}
            <span className={"font-medium text-[13px] tracking-normal ml-0.5 " + (dark ? "text-white/55" : "text-ink-600")}>
              GAPYEONG CHURCH
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-[15px] font-semibold">
          {NAV.map((n) => {
            const on = n === active;
            return (
              <a key={n} className={"relative py-6 " + (on ? (dark ? "text-white" : "text-brand-600") : dark ? "text-white/75 hover:text-white" : "hover:text-brand-600")}>
                {n}
                {n === "예배" && <span className="absolute -top-0.5 -right-3 badge-live">LIVE</span>}
                {on && <span className={"absolute left-0 right-0 -bottom-px h-0.5 " + (dark ? "bg-white" : "bg-brand-600")}></span>}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className={"w-9 h-9 grid place-items-center rounded-full " + (dark ? "hover:bg-white/10" : "hover:bg-paper")}>
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </button>
          <button className={"inline-flex items-center gap-1.5 text-[13px] font-semibold px-3.5 h-9 rounded-full border " + (dark ? "border-white/45 hover:bg-white hover:text-ink-900" : "border-ink-900 hover:bg-ink-900 hover:text-white")}>
            새가족 등록
          </button>
        </div>
      </div>
    </header>
  );
};

/* breadcrumb (tone aware) */
const Crumb = ({ items, tone = "light" }) => {
  const dark = tone === "dark";
  return (
    <nav className={"flex items-center gap-2 text-[12px] " + (dark ? "text-white/65" : "text-ink-600")}>
      <a className={"inline-flex items-center gap-1.5 " + (dark ? "hover:text-white" : "hover:text-ink-900")}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg>
        HOME
      </a>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span className={dark ? "text-white/35" : "text-line"}>›</span>
          <span className={i === items.length - 1 ? "font-semibold " + (dark ? "text-white" : "text-ink-900") : ""}>{it}</span>
        </React.Fragment>
      ))}
    </nav>
  );
};

/* pill tab group */
const Tabs = ({ items, tone = "light", className = "" }) => {
  const dark = tone === "dark";
  return (
    <div className={"flex items-center gap-1.5 text-[13px] font-semibold " + className}>
      {items.map((t, i) => {
        const on = i === 0;
        if (on)
          return (
            <a key={t} className={"px-4 h-10 rounded-full grid place-items-center " + (dark ? "bg-white text-ink-900" : "bg-ink-900 text-white")}>
              {t}
            </a>
          );
        return (
          <a key={t} className={"px-4 h-10 rounded-full grid place-items-center " + (dark ? "text-white/85 border border-white/25 hover:bg-white/10" : "text-ink-700 hover:bg-paper")}>
            {t}
          </a>
        );
      })}
    </div>
  );
};

/* ============================================================
   S1 · Basic Clean — 흰 배경 + 좌측 블루 틴트 스윕
   용도: 예배, 양육, 설교 목록, 문의하기, 일반 서브페이지
============================================================ */
const HeroBasicClean = () => (
  <div className="w-[1440px] bg-white text-ink-900 relative flex flex-col">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(102deg, rgba(58,100,245,0.10) 0%, rgba(58,100,245,0.04) 26%, rgba(255,255,255,0) 56%)" }}
    ></div>
    <div className="relative">
      <SiteHeader active="예배" />
      <div className="border-b border-line">
        <div className="max-w-[1240px] mx-auto px-8 pt-11 pb-12">
          <Crumb items={["예배"]} />
          <div className="mt-7 flex items-end justify-between gap-10">
            <div className="max-w-[640px]">
              <h1 className="text-[58px] font-extrabold tracking-[-0.03em] leading-[1.05]">예배</h1>
              <p className="mt-4 text-ink-600 text-[16px] leading-relaxed">
                매주 드려지는 예배 시간과 장소, 말씀 다시보기를 한 곳에서 확인합니다.
              </p>
            </div>
            <Tabs items={["전체", "주일예배", "수요예배", "새벽예배"]} className="shrink-0 pb-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   S2 · Image Background — 풀블리드 공동체 사진 + 네이비 오버레이
   용도: 공동체, 새가족
============================================================ */
const HeroImageBg = () => (
  <div className="w-[1440px] relative overflow-hidden bg-ink-900 text-white flex flex-col">
    <img
      src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1900&q=80"
      className="absolute inset-0 w-full h-full object-cover"
      alt=""
    />
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,19,32,0.82) 0%, rgba(14,19,32,0.55) 42%, rgba(14,19,32,0.78) 100%)" }}></div>
    <div className="relative">
      <SiteHeader tone="dark" active="공동체" />
      <div className="max-w-[1240px] mx-auto px-8 pt-14 pb-16">
        <Crumb items={["공동체"]} tone="dark" />
        <h1 className="mt-7 text-[64px] font-extrabold tracking-[-0.03em] leading-[1.04] max-w-[840px]">
          함께 걷는 믿음의 자리
        </h1>
        <p className="mt-5 text-white/75 text-[17px] leading-relaxed max-w-[560px]">
          목장과 다음세대, 실버 사역이 서로를 돌보며 하나의 공동체로 이어집니다.
        </p>
        <Tabs items={["전체", "목장", "다음세대", "실버사역"]} tone="dark" className="mt-9" />
      </div>
    </div>
  </div>
);

/* ============================================================
   S3 · Ken Burns Image — 천천히 줌인되는 예배 장면
   용도: 교회소개, 비전, 새가족 환영
============================================================ */
const HeroKenBurns = () => (
  <div className="w-[1440px] relative overflow-hidden bg-ink-900 text-white flex flex-col">
    <div className="absolute inset-0 kenburns">
      <img
        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1900&q=80"
        className="w-full h-full object-cover"
        alt=""
      />
    </div>
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,19,32,0.74) 0%, rgba(14,19,32,0.5) 40%, rgba(14,19,32,0.85) 100%)" }}></div>
    <div className="relative">
      <SiteHeader tone="dark" active="교회소개" />
      <div className="max-w-[1240px] mx-auto px-8 pt-14 pb-16">
        <Crumb items={["교회소개"]} tone="dark" />
        <div className="mt-7 flex items-end justify-between gap-10">
          <div>
            <h1 className="text-[66px] font-extrabold tracking-[-0.03em] leading-[1.02] max-w-[820px]">
              말씀이 머무는 공동체
            </h1>
            <p className="mt-5 text-white/75 text-[17px] leading-relaxed max-w-[560px]">
              가평의 일상 속에서 예배하고, 서로를 돌보며, 다음 세대와 함께 자랍니다.
            </p>
          </div>
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-white/55 pb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
            EST. 1973 · GAPYEONG
          </div>
        </div>
        <Tabs items={["비전", "섬기는 사람들", "연혁", "오시는 길"]} tone="dark" className="mt-9" />
      </div>
    </div>
  </div>
);

/* ============================================================
   S4 · Split Right Visual — 좌측 텍스트 + 우측 라운드 패널(지도/안내)
   용도: 오시는 길, 양육, 부서 안내, 정보형 페이지
============================================================ */
const HeroSplitRight = () => (
  <div className="w-[1440px] bg-paper text-ink-900 flex flex-col">
    <SiteHeader active="교회소개" />
    <div className="max-w-[1240px] mx-auto w-full px-8 pt-11 pb-12 grid grid-cols-12 gap-10 items-center">
      <div className="col-span-7">
        <Crumb items={["교회소개", "오시는 길"]} />
        <h1 className="mt-7 text-[56px] font-extrabold tracking-[-0.03em] leading-[1.05]">교회 오시는 길</h1>
        <p className="mt-4 text-ink-600 text-[16px] leading-relaxed max-w-[440px]">
          대중교통, 주차, 셔틀 안내를 확인하고 편안하게 방문하세요.
        </p>
        <Tabs items={["주소", "대중교통", "주차 안내"]} className="mt-8" />
      </div>

      <div className="col-span-5">
        <div className="relative rounded-2xl overflow-hidden border border-line bg-white h-[268px]">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent"></div>
          <div className="absolute left-5 top-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-ink-900 text-[11px] font-bold">
              <svg className="w-3.5 h-3.5 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z" /><circle cx="12" cy="11" r="2.5" /></svg>
              본당 위치
            </span>
          </div>
          <div className="absolute left-5 right-5 bottom-5 bg-white rounded-xl px-5 py-4 flex items-center justify-between shadow-lg">
            <div>
              <div className="text-[11px] font-bold tracking-widest text-brand-600 mb-1">주일 안내</div>
              <div className="text-[15px] font-bold text-ink-900">1부 09:00 · 2부 11:00</div>
            </div>
            <span className="text-[12px] font-semibold text-ink-600 inline-flex items-center gap-1">
              지도 열기
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   S5 · Video Background — 잔잔한 예배/미디어 릴 루프 + 다크 오버레이
   용도: 미디어, 예배 영상, 설교 허브
============================================================ */
const HeroVideoBg = () => (
  <div className="w-[1440px] relative overflow-hidden bg-ink-900 text-white flex flex-col">
    <video
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1900&q=80"
    >
      <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_3840_2160_25fps.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,15,26,0.78) 0%, rgba(11,15,26,0.55) 45%, rgba(11,15,26,0.82) 100%)" }}></div>
    <div className="relative">
      <SiteHeader tone="dark" active="미디어" />
      <div className="max-w-[1240px] mx-auto px-8 pt-14 pb-16">
        <Crumb items={["미디어"]} tone="dark" />
        <div className="mt-7 flex items-end justify-between gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold tracking-[0.18em] text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"></span>
              ON AIR · 주일예배 다시보기
            </div>
            <h1 className="mt-5 text-[68px] font-extrabold tracking-[-0.03em] leading-[1.0]">미디어</h1>
            <p className="mt-5 text-white/75 text-[17px] leading-relaxed max-w-[540px]">
              예배 영상, 설교, 찬양, 사진 기록을 한 곳에서 다시 만납니다.
            </p>
          </div>
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-semibold text-white/55 pb-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
            BACKGROUND REEL
          </div>
        </div>
        <Tabs items={["전체", "설교", "앨범", "주보"]} tone="dark" className="mt-9" />
      </div>
    </div>
  </div>
);

/* ============================================================
   S6 · Compact Clean — 저높이, 보조/정책 페이지
   용도: 개인정보처리방침, 이메일 무단수집거부, 짧은 보조 페이지
============================================================ */
const HeroCompact = () => (
  <div className="w-[1440px] bg-white text-ink-900 flex flex-col">
    <SiteHeader active="행정" />
    <div className="border-b border-line">
      <div className="max-w-[1240px] mx-auto px-8 pt-9 pb-9">
        <Crumb items={["행정", "개인정보처리방침"]} />
        <div className="mt-5 flex items-end justify-between gap-10">
          <div>
            <h1 className="text-[38px] font-extrabold tracking-[-0.02em] leading-tight">개인정보처리방침</h1>
            <p className="mt-2.5 text-ink-600 text-[14.5px] leading-relaxed">
              개인정보의 수집, 이용, 보관, 파기 기준을 안내합니다.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold shrink-0 pb-1">
            <a className="px-4 h-9 rounded-full bg-ink-900 text-white grid place-items-center">개인정보처리방침</a>
            <a className="px-4 h-9 rounded-full text-ink-700 hover:bg-paper grid place-items-center">이메일 무단수집거부</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  HeroBasicClean,
  HeroImageBg,
  HeroKenBurns,
  HeroSplitRight,
  HeroVideoBg,
  HeroCompact,
});
