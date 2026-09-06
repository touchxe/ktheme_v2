# 교회/종교기관 페이지·위젯 제작 범위

Date: 2026-08-30  
Status: planning  
Industry slug: `church-religious-organization`

## 범위 원칙

- 공통 페이지 목적과 데이터 구조는 공유하되 메뉴명과 순서는 프리셋별로 바꾼다.
- 반복 콘텐츠는 archive + single, 신청·문의는 폼, 소개·정책은 일반 페이지로 만든다.
- 현재 ModuTheme의 설교·행사·앨범 콘텐츠 타입과 공용 헤더/푸터/히어로를 `church-local` 기준 자산으로 재사용한다.
- 새 기능은 기존 위젯 조합으로 접근성, 반응형, 편집성을 확보할 수 없는 경우에만 개발한다.

## 공통 페이지 범위

| 우선순위 | 페이지 목적 | 방문자의 핵심 질문 | 화면 타입 | 주요 섹션 | 기존 자산 | 신규/보강 작업 | QA 메모 |
|---|---|---|---|---|---|---|---|
| P0 | 홈 | 언제 어디로 가며, 처음 방문하면 무엇을 해야 하나? | page | `hero-welcome`, `gathering-schedule`, `latest-faith-media`, `notice-bulletin`, `conversion-cta` | Slider, Post, CTA | 다음 모임 상태, 프리셋별 CTA/용어 | 모바일 첫 화면에서 시간·장소·CTA 확인 |
| P0 | 정기 모임 안내 | 예배·미사·법회가 언제 어디서 열리나? | page + schedule data | `gathering-schedule`, `faq-preparation`, `conversion-cta` | Tabs, Card Box, Maps | 적용 기간, 변경 공지, 대상/언어 필터 | 오래된 시간표 방지, 장소 접근성 |
| P0 | 메시지/미디어 | 최근 설교·강론·법문을 어떻게 보나? | archive + single | `latest-faith-media`, `resource-library` | `modutheme_sermon`, ModuTheme Post | 종교별 메타 라벨, 영상/음성 대체 상태 | 재생 실패, 자막/대본, 키보드 조작 |
| P0 | 새 방문자 안내 | 처음 가도 되는가, 등록 과정은 무엇인가? | page + form | `newcomer-journey`, `facility-gallery`, `faq-preparation` | Process Steps, Gallery, Contact | `newcomer-registration` 폼 프리셋 | 개인정보 최소수집, 담당자 인계 |
| P0 | 오시는 길 | 대중교통·주차·출입·시설 이용은 어떻게 하나? | page | `facility-gallery`, 지도/연락처, `service-disclosure` | Maps, Gallery, Contact | 장애인 접근, 수유/유아, 다지점 선택 | 지도 없이도 주소·교통 정보 제공 |
| P1 | 일정/행사 | 이번 달 행사와 신청 가능 상태는 무엇인가? | archive + single | `event-calendar`, `availability-strip`, `conversion-cta` | `modutheme_event`, ModuTheme Post | 월/목록 보기, 마감/정원, 캘린더 추가 | 날짜/시간대, 마감 상태, 중복 신청 |
| P1 | 공동체/교육 | 나이·관심사·신앙 단계에 맞는 모임은 무엇인가? | page 또는 archive + single | `ministry-community-nav`, `expert-profiles`, `newcomer-journey` | Card Box, Members | 대상/관심사 필터, 담당 범위 | 담당자 개인정보 노출 수준 |
| P1 | 공지/주보 | 최신 공지와 주보를 어디서 찾나? | archive + single | `notice-bulletin`, `resource-library` | ModuTheme Post, KBoard 선택 | 첨부파일, 기간, 중요 공지 고정 | PDF 접근성, 날짜/버전 표시 |
| P1 | 봉사/참여 | 어떤 역할로 참여할 수 있나? | page + form | `ministry-community-nav`, `service-process`, `conversion-cta` | Card Box, Process Steps, Contact | 역할·조건·교육·담당자 필드 | 아동 관련 봉사 자격/검증 안내 |
| P1 | 후원 안내 | 목적과 방법, 영수증 처리는 어떻게 되나? | page + 외부 연결/폼 | `giving-support`, `faq-preparation`, `service-disclosure` | CTA, FAQ, Contact | 후원 유형, 영수증 신청, 외부 결제 상태 | 상품 결제와 구분, 계좌 정보 검수 |
| P2 | 기관/공동체 소개 | 이곳은 누구이며 무엇을 중요하게 여기나? | page | `brand-story`, `expert-profiles`, `metrics-proof` | Title, Members, Timeline | 역사/조직 데이터 variant | 과장 수치와 출처 없는 성과 금지 |
| P2 | 자료실 | 공식 문서·교육자료·양식을 어떻게 찾나? | archive + single | `resource-library` | ModuTheme Post | 분류, 버전, 파일 크기/형식, 추적 | 깨진 파일, 이전 버전 표시 |
| P2 | 문의/기도/상담 | 누구에게 어떤 방식으로 문의하나? | form page | `service-disclosure`, 폼, `conversion-cta` | Contact | `prayer-care-request`, 공개 범위, 보유기간 | 민감정보, 스팸, 긴급 안내 |

## 프리셋별 필수 차이

| 프리셋 | 반드시 다른 메뉴/콘텐츠 | 반드시 다른 첫 화면 | 반드시 다른 운영 기능 |
|---|---|---|---|
| `church-local` | 예배, 설교, 새가족, 공동체, 양육, 선교·섬김 | 다음 예배 + 새가족 등록 + 최근 설교 | 새가족 등록, 기도/문의, 주보 |
| `church-media` | 라이브, 대상별 예배, 캠퍼스, 설교 시리즈 | 라이브 상태 + 캠퍼스/언어 선택 | 방송 대체 상태, 다지점, 검색/필터 |
| `catholic-parish` | 미사/고해, 성사, 본당단체, 주보, 사무실 | 오늘/주일 미사시간 + 본당 공지 | 시간 적용 기간, 성사 안내, 사무실 문의 |
| `buddhist-temple` | 법회/기도, 수행/교육, 템플스테이, 문화/성보 | 오늘의 법회/기도 + 방문/체험 | 외부 예약 연결, 준비물·환불·예절 고지 |
| `religious-organization` | 사업, 조직/소속기관, 행사, 뉴스, 자료실 | 핵심 사업 + 최신 자료 + 일정 | 기관 찾기, 공식 자료 버전, 승인된 보도/입장 |

## 폼 프리셋

| 폼 | 필수 필드 | 선택 필드 | 금지/주의 |
|---|---|---|---|
| 새가족·새신자 등록 | 이름, 연락처, 방문/등록 구분, 개인정보 동의 | 연령대, 가족 동반, 관심 공동체, 희망 연락 방식 | 주민등록번호, 불필요한 상세 가족정보 수집 금지 |
| 행사·교육 신청 | 프로그램, 일정, 이름, 연락처, 동의 | 소속, 동반 인원, 접근성 지원 | 정원/마감 상태와 불일치 금지 |
| 기도·상담 요청 | 요청 유형, 내용, 공개 범위, 회신 여부, 동의 | 익명 표시명, 희망 연락 시간 | 공개 기본값 금지, 긴급 대응을 약속하는 문구 금지 |
| 봉사 참여 | 관심 역할, 가능 시간, 이름, 연락처, 동의 | 경험, 교육 희망 | 아동 관련 민감 자격정보는 일반 문의 폼에서 받지 않음 |
| 영수증·문서 신청 | 문서 유형, 이름, 연락처, 수령 방식, 동의 | 기간, 메모 | 본인 확인 정보는 별도 안전한 절차로 연결 |

## 위젯 판단

### 기존 위젯 조합으로 처리

- 환영 히어로: `ModuTheme Slider` + `ModuTheme CTA`
- 지도/시설: `Maps` + `Gallery` + `Contact`
- 지도자/담당자: `Members`
- 새 방문자 과정: `Process Steps`
- FAQ: `ModuTheme FAQ`
- 주보/공지/자료: `ModuTheme Post` 또는 KBoard

### 공통 컴포넌트 승격 후보

1. `schedule-panel`: 예배·미사·법회뿐 아니라 교육·매장 일정에서도 재사용 가능한 시간표
2. `media-library`: 설교·강론·법문, 교육 영상, 일반 영상의 메타와 대체 상태를 통합
3. `event-calendar`: 행사·교육·체험의 목록/월 보기와 마감 상태
4. `sensitive-request-form`: 기도·상담·돌봄 요청의 공개 범위와 접근 제한
5. `giving-guide`: 결제가 아니라 목적·방법·영수증·문의 절차를 안내하는 지원 블록

승격 전에는 두 개 이상 업종에서 같은 데이터 구조로 반복되는지 확인한다. `event-calendar`는 관광·교육, `schedule-panel`은 웰니스·교육, `sensitive-request-form`은 웰니스·교회에서 교차 검증할 수 있다.

## 콘텐츠 준비 수량

`church-local` 첫 데모의 최소 기준은 다음과 같다.

| 콘텐츠 | 최소 수량 | 현재 기반 |
|---|---:|---|
| 설교 | 12 | `modutheme_sermon` |
| 행사 | 9 | `modutheme_event` |
| 앨범 | 12 | `modutheme_album` |
| 공지 | 4 | 기본 post/KBoard |
| 주보 | 8주 | 기본 post/KBoard, 장기적으로 별도 타입 검토 |
| 새가족 안내 | 1세트 | `/newcomers/` + 폼 |
| 공동체/부서 | 8 | page 또는 구조화 데이터 |
| 섬기는 사람들 | 8~12 | Members/프로필 |
| 예배 시간표 | 6~8개 | 페이지 데이터, 장기적으로 schedule model |

## 제작 게이트

- 각 프리셋의 공식 용어와 운영 절차를 실제 운영자에게 확인한다.
- 메뉴명 확정 후에만 페이지 제작을 시작한다.
- 폼과 후원 안내는 개인정보·공개범위·영수증 절차를 먼저 확정한다.
- PC/모바일에서 다음 모임, 위치, 첫 방문 CTA가 첫 화면 또는 바로 다음 구간에서 보여야 한다.
- 추천 플러그인이 꺼져도 빈 화면이나 치명적 오류 없이 기본 안내를 제공해야 한다.
