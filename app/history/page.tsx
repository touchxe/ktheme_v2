const eras = [
  {
    id: '2020s',
    era: '2020s',
    range: '2020 — 현재',
    summary: '더 가까이 연결되는 공동체',
    headline: '삶의 자리마다\n예배와 돌봄을 잇다',
    events: [
      ['2026.06', '통합 돌봄서비스 정식 운영', '세대와 상황에 맞춘 돌봄의 창구를 열었습니다.'],
      ['2024.03', '비전 선언문과 핵심 가치 정리', '함께 지켜갈 예배와 섬김의 방향을 다시 세웠습니다.'],
      ['2022.11', '온라인 예배와 미디어 사역 강화', '일상에서도 말씀과 기도로 이어지는 자리를 마련했습니다.'],
    ],
  },
  {
    id: '2010s',
    era: '2010s',
    range: '2010 — 2019',
    summary: '이웃과 일상을 나누는 교회',
    headline: '목장과 다음세대가\n교회의 일상이 되다',
    events: [
      ['2019.10', '목장 리더십 훈련 확대', '서로를 살피는 작은 공동체의 리더들을 세웠습니다.'],
      ['2017.05', '지역 섬김 사역 정례화', '지역의 필요를 듣고 함께하는 섬김을 이어갔습니다.'],
      ['2015.03', '새가족 정착 과정 개편', '처음 온 이들이 자연스럽게 공동체에 머물도록 도왔습니다.'],
    ],
  },
  {
    id: '2000s',
    era: '2000s',
    range: '2000 — 2009',
    summary: '말씀을 배우고 세상으로',
    headline: '배움의 자리에서\n선교의 시선으로 나아가다',
    events: [
      ['2009.12', '선교 협력처 기도 카드 제작', '멀리 있는 이웃의 이름을 품고 함께 기도했습니다.'],
      ['2007.07', '청년부 여름수련회 정례화', '다음세대가 말씀 안에서 삶의 방향을 찾았습니다.'],
      ['2004.03', '제자훈련 과정 시작', '말씀을 배우고 삶으로 살아내는 훈련을 시작했습니다.'],
    ],
  },
  {
    id: '1990s',
    era: '1990s',
    range: '1990 — 1999',
    summary: '작은 기도에서 시작된 예배',
    headline: '서로의 이름을 부르며\n공동체의 첫 걸음을 내딛다',
    events: [
      ['1999.06', '교육부서 예배 정비', '어린이와 청소년의 예배 자리를 다듬었습니다.'],
      ['1993.09', '정기 새벽기도회 자리매김', '기도로 하루를 여는 공동체의 리듬이 생겼습니다.'],
      ['1990.01', '예배 공동체의 첫 걸음', '말씀과 기도 위에 함께 예배하는 교회가 시작되었습니다.'],
    ],
  },
]

export default function HistoryPage() {
  return (
    <main>
      <a className="modu-skip-link" href="#history-content">본문으로 건너뛰기</a>
      <header className="modu-history-nav">
        <div className="modu-container">
          <a className="modu-brand" href="/"><span className="modu-brand__mark" aria-hidden="true"><i /></span><span>샘물교회</span></a>
          <nav aria-label="교회소개 메뉴"><a href="/about">교회소개</a><a className="is-active" href="/history">교회연혁</a><a href="/people">섬기는 사람들</a><a href="/location">오시는 길</a></nav>
          <a className="modu-history-nav__home" href="/">홈으로 <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="modu-history-hero" id="history-content">
        <div className="modu-container modu-history-hero__grid">
          <div className="modu-history-hero__copy">
            <p className="modu-label">SINCE 1990</p>
            <h1>함께 걸어온<br /><em>은혜의 시간</em></h1>
            <p>예배의 자리에서 시작해 서로의 일상을 돌보며, 샘물교회가 지나온 걸음을 한 장씩 돌아봅니다.</p>
            <div className="modu-history-stats" aria-label="교회 연혁 요약"><span><b>36</b>년의 여정</span><span><b>04</b>개의 시대</span><span><b>01</b>공동체의 마음</span></div>
          </div>
          <div className="modu-history-hero__media"><img src="/images/home/home-fellowship-table-4x3.png" alt="성도들이 식탁에 둘러앉아 교제하는 모습" /><div className="modu-history-hero__stamp"><span>OUR STORY</span><strong>1990 — 2026</strong><i>grace in every season</i></div></div>
        </div>
      </section>

      <nav className="modu-history-years" aria-label="시대별 연혁 바로가기"><div className="modu-container">{eras.map(({ id, era, range }) => <a href={`#${id}`} key={id}><strong>{era}</strong><span>{range}</span></a>)}</div></nav>

      <section className="modu-history-intro-next"><div className="modu-container"><div><h2>한 해의 숫자보다,<br />함께 살아낸 이야기를 기억합니다.</h2><p>작은 기도와 첫 인사, 한 번의 섬김이 모여 교회의 시간이 되었습니다. 샘물교회가 걸어온 네 개의 계절을 만나보세요.</p></div></div></section>

      {eras.map(({ id, era, range, summary, headline, events }, eraIndex) => (
        <section className={`modu-history-era ${eraIndex % 2 === 1 ? 'is-paper' : ''}`} id={id} key={id}>
          <div className="modu-container modu-history-era__grid">
            <aside><span>{range}</span><h2>{era}</h2><p>{summary}</p></aside>
            <div className="modu-history-era__body"><h3>{headline.split('\n').map((line) => <span key={line}>{line}</span>)}</h3><div className="modu-history-events">{events.map(([date, title, description], eventIndex) => <article key={date}><time>{date}</time><i className={eraIndex === 0 && eventIndex === 0 ? 'is-current' : ''} aria-hidden="true" /><div><h4>{title}</h4><p>{description}</p></div></article>)}</div></div>
          </div>
        </section>
      ))}

      <section className="modu-history-closing"><div className="modu-container"><div><p className="modu-label">THE NEXT CHAPTER</p><h2>오늘의 예배가<br />내일의 연혁이 됩니다.</h2></div><p>샘물교회는 오늘도 말씀과 기도 안에서<br />새로운 걸음을 함께 만들어 갑니다.</p><a className="modu-button modu-button--dark" href="/newcomers">함께 걸어가기 <span aria-hidden="true">→</span></a></div></section>
    </main>
  )
}
