const quickLinks = [
  ['예배', '이번 주 예배 시간과 장소를 안내합니다.', 'WO', '/worship'],
  ['새가족', '처음 오신 분을 위한 방문 안내입니다.', 'NEW', '/newcomers'],
  ['중보기도', '함께 나눌 기도 제목을 남겨주세요.', 'PR', '/contact'],
  ['주보', '이번 주 예배 순서와 소식입니다.', 'NB', '/bulletin'],
  ['설교', '말씀을 다시 듣고 묵상해 보세요.', 'VD', '/sermons'],
  ['온라인 헌금', '간편하게 마음을 나눌 수 있습니다.', 'GI', '/giving'],
  ['선교·섬김', '우리의 손길이 닿는 현장을 소개합니다.', 'MI', '/mission'],
  ['교회소개', '우리의 비전과 이야기를 만나보세요.', 'AB', '/about'],
]

const newsItems = [
  ['공지', '2026 하반기 양육과정 신청 안내', '07.12'],
  ['선교', '여름 단기선교 동역자를 모집합니다.', '07.09'],
  ['행사', '전 교인 연합예배 및 식사 안내', '07.06'],
  ['교회력', '다음 주부터 특별새벽기도회를 시작합니다.', '07.03'],
]

const sermonItems = [
  ['주일예배', '은혜가 머무는 자리', '시편 23:1–6 · 김은혜 담임목사', '07.06'],
  ['수요예배', '다시 사랑을 선택하는 마음', '요한일서 4:7–12 · 박지훈 목사', '07.02'],
]

const footerLinks: Array<[string, string[]]> = [
  ['교회소개', ['교회소개', '비전', '섬기는 사람들', '오시는 길']],
  ['예배', ['예배 안내', '주일예배', '수요예배', '주보']],
  ['공동체', ['새가족', '소그룹', '다음세대', '청년부']],
]

export default function HomePage() {
  return (
    <main className="modu-site">
      <a className="modu-skip-link" href="#content">본문으로 건너뛰기</a>

      <div className="modu-topbar">
        <div className="modu-container modu-topbar__inner">
          <span><i className="modu-status-dot" />온라인 예배가 준비되어 있습니다</span>
          <nav aria-label="유틸리티 메뉴"><a href="/newcomers">새가족 등록</a><a href="/location">오시는 길</a><a href="/giving">온라인 헌금</a><a href="/login">로그인</a></nav>
        </div>
      </div>

      <header className="modu-site-header">
        <div className="modu-container modu-header__inner">
          <a className="modu-brand" href="/" aria-label="샘물교회 홈"><span className="modu-brand__mark" aria-hidden="true"><i /></span><span>샘물교회</span></a>
          <nav className="modu-nav" aria-label="주요 메뉴"><a href="/about">교회소개</a><a href="/worship">예배</a><a href="/community">공동체</a><a href="/training">양육</a><a href="/mission">선교·섬김</a><a href="/media">미디어</a></nav>
          <div className="modu-header__actions"><a className="modu-header-register" href="/newcomers">새가족 등록 <b aria-hidden="true">→</b></a><details className="modu-mobile-nav"><summary aria-label="메뉴 열기"><span /><span /><span /></summary><nav aria-label="모바일 주요 메뉴"><a href="/about">교회소개</a><a href="/worship">예배</a><a href="/community">공동체</a><a href="/training">양육</a><a href="/mission">선교·섬김</a><a href="/media">미디어</a><a className="is-cta" href="/newcomers">새가족 등록</a></nav></details></div>
        </div>
      </header>

      <section className="modu-hero" id="content">
        <img className="modu-hero__media" src="/images/home/home-hero-worship-16x9.png" alt="주일 예배에 함께 모인 성도들" />
        <div className="modu-hero__shade" />
        <div className="modu-container modu-hero__inner">
          <div className="modu-hero__copy"><p className="modu-eyebrow modu-eyebrow--light">SUNDAY WORSHIP · 11:00 AM</p><h1>말씀이 머무는 자리,<br />은혜가 흐르는 공동체.</h1><p>예배와 말씀, 그리고 공동체 안에서 삶이 회복되는 자리로 여러분을 초대합니다.</p><div className="modu-buttons"><a className="modu-button modu-button--light" href="/sermons">이번 주 설교 보기 <span aria-hidden="true">▶</span></a><a className="modu-button modu-button--ghost" href="/worship">예배 시간 안내 <span aria-hidden="true">→</span></a></div><dl className="modu-hero-meta"><div><dt>설교</dt><dd>「은혜가 머무는 자리」</dd></div><div><dt>본문</dt><dd>시편 23:1–6</dd></div><div><dt>설교자</dt><dd>김은혜 담임목사</dd></div></dl></div>
          <div className="modu-hero-side"><div><span>01</span><i /><span>04</span></div><p>이번 주 예배는 본당과 온라인에서<br />동시에 드립니다.</p></div>
        </div>
        <div className="modu-container modu-announcements"><a href="/news" className="modu-announcement-card"><span className="modu-announcement-icon">NO</span><span><small>NOTICE · 07.12</small><strong>새가족 환영모임이 이번 주 예배 후에 열립니다.</strong></span><b aria-hidden="true">→</b></a><a href="/annual-schedule" className="modu-announcement-card"><span className="modu-announcement-icon is-green">EV</span><span><small className="is-green">EVENT · 07.20</small><strong>전 교인 연합예배와 식사 교제를 준비합니다.</strong></span><b aria-hidden="true">→</b></a><a href="/mission" className="modu-announcement-card"><span className="modu-announcement-icon is-amber">MI</span><span><small className="is-amber">MISSION · 07.25</small><strong>여름 단기선교를 위한 동역자를 찾습니다.</strong></span><b aria-hidden="true">→</b></a></div>
      </section>

      <section className="modu-section modu-welcome"><div className="modu-container"><p className="modu-label">Welcome to Sameul</p><h2 className="modu-section-title">이 곳에 처음 오신 모든 분을<br />진심으로 환영합니다.</h2><p className="modu-section-copy">샘물교회는 예배와 양육, 공동체와 선교를 통해 지역과 다음세대를 섬깁니다. 당신의 일상에 믿음의 친구가 되어 함께 걸어갈게요.</p><div className="modu-quick-grid">{quickLinks.map(([title, description, code, href]) => <a className="modu-quick-link" href={href} key={title}><span className="modu-quick-link__icon">{code}</span><span><strong>{title}</strong><small>{description}</small></span><b aria-hidden="true">↗</b></a>)}</div></div></section>

      <section className="modu-section modu-updates"><div className="modu-container"><div className="modu-section-head"><div><p className="modu-label">Updates</p><h2 className="modu-section-title">교회 소식</h2></div><a className="modu-more-link" href="/news">전체보기 <span aria-hidden="true">→</span></a></div><div className="modu-updates-grid"><a className="modu-feature-card" href="/community"><div className="modu-feature-card__image"><img src="/images/home/home-community-fellowship-4x3.png" alt="성도들이 함께 대화하며 교제하는 모습" /><span>FEATURE</span></div><small>공동체 · 07.10</small><h3>서로의 일상에 귀 기울이며 함께 자라는 시간</h3><p>이번 달 소그룹에서는 말씀과 삶을 나누며 서로를 더 깊이 알아가는 시간을 갖습니다.</p></a><div className="modu-news-list">{newsItems.map(([label, title, date]) => <a href="/news" key={title}><span>{label}</span><strong>{title}</strong><time>{date}</time><b aria-hidden="true">→</b></a>)}</div><div className="modu-side-cards"><a className="modu-media-card" href="/sermons"><img src="/images/home/home-sermon-pastor-4x3.png" alt="말씀을 전하는 목회자" /><small>미디어</small><h3>이번 주 말씀을 다시 듣고 묵상해 보세요.</h3></a><a className="modu-media-card" href="/next-generation"><img src="/images/home/home-children-bulletin-4x3.png" alt="다음세대 예배 활동" /><small>다음세대</small><h3>여름을 기다리는 다음세대의 설렘</h3></a></div></div></div></section>

      <section className="modu-section modu-section--paper"><div className="modu-container modu-newcomer"><div><p className="modu-label">For Newcomers</p><h2 className="modu-section-title">처음 오셨나요?</h2><p className="modu-section-copy">처음이어서 더 편안하도록, 예배부터 소그룹 연결까지 차분히 안내합니다.</p><a className="modu-button modu-button--dark" href="/newcomers">새가족 등록하기 <span aria-hidden="true">→</span></a></div><div className="modu-steps">{[['01','예배에 참석','먼저 한 번의 예배로 인사드려요.'],['02','새가족 카드 작성','로비에서 또는 온라인으로 등록해요.'],['03','환영 선물 받기','작은 선물과 안내를 드립니다.'],['04','소그룹 매칭','가까운 공동체에 연결돼요.']].map(([number,title,copy]) => <article className="modu-step" key={number}><div><span>{number}</span><i /></div><b>{title}</b><p>{copy}</p></article>)}</div></div></section>

      <section className="modu-section modu-dark"><div className="modu-container"><div className="modu-section-head modu-section-head--light"><div><p className="modu-label">Latest Sermon</p><h2 className="modu-section-title">최근 설교</h2><p className="modu-section-copy">말씀으로 돌아가는 주간의 리듬을 함께 만들어 가요.</p></div><a className="modu-more-link" href="/sermons">설교 전체보기 <span aria-hidden="true">→</span></a></div><div className="modu-sermon-grid">{sermonItems.map(([category,title,meta,date], index) => <a className="modu-sermon-card" href="/sermons" key={title}><div className="modu-sermon-card__image"><img src={index === 0 ? '/images/home/home-sermon-pastor-4x3.png' : '/images/home/home-bible-closeup-1x1.png'} alt="" /><span>{category}</span></div><div className="modu-sermon-card__body"><small>{date}</small><h3>{title}</h3><p>{meta}</p><b aria-hidden="true">▶</b></div></a>)}</div></div></section>

      <section className="modu-section modu-cta-section"><div className="modu-container modu-cta-grid"><a href="/giving" className="modu-cta-card"><span>GI</span><div><h2>온라인 헌금 <b aria-hidden="true">→</b></h2><p>모바일과 PC에서 간편하게 마음을 나눌 수 있도록 도와드립니다.</p></div></a><a href="/contact" className="modu-cta-card"><span className="is-green">QA</span><div><h2>문의하기 <b aria-hidden="true">→</b></h2><p>궁금한 점을 남겨주시면 담당 사역자가 정성껏 안내해 드립니다.</p></div></a></div></section>

      <footer className="modu-footer"><div className="modu-container modu-footer__grid"><div><a className="modu-brand modu-brand--footer" href="/"><span className="modu-brand__mark" aria-hidden="true"><i /></span><span>샘물교회</span></a><p>다음 세대와 함께 예배하고,<br />지역과 세상을 섬기는 교회입니다.</p><a className="modu-footer-mail" href="mailto:hello@sameul.church">hello@sameul.church</a></div><div className="modu-footer-menu">{footerLinks.map(([heading, links]) => <div key={heading}><h3>{heading}</h3>{links.map((link) => <a href="/" key={link}>{link}</a>)}</div>)}</div><div className="modu-footer-connect"><h3>바로가기</h3><a href="/location">오시는 길 <span>↗</span></a><a href="/contact">온라인 문의 <span>↗</span></a><p>02-000-0000<br />서울특별시 ○○구 샘물로 12</p></div></div><div className="modu-footer__bottom"><div className="modu-container"><span>© 2026 SAMEUL COMMUNITY CHURCH</span><a href="/privacy-policy">개인정보처리방침</a></div></div></footer>
    </main>
  )
}
