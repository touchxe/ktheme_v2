# 모두테마 6종 홈 프레임 기획 및 제작 프롬프트

Date: 2026-08-30  
Status: ready for external design production  
Design baseline: `docs/DESIGN.md`, theme v0.3.62 audit

## 1. 프레임 선택 기준

업종명이 아니라 홈에서 사용자가 가장 먼저 완료해야 하는 행동으로 프레임을 선택한다. 한 업체가 두 행동을 모두 가질 때는 매출 또는 운영상 가장 중요한 행동을 기본 프레임으로 두고, 보조 행동은 섹션 변형으로 포함한다.

| 홈 프레임 | 사용자의 첫 질문 | 기본 전환 | 대표 적용 |
|---|---|---|---|
| 예약형 | 언제, 어디서, 누구와 이용할 수 있는가 | 날짜·시간 선택 후 예약 시작 | 관광, 체험, 미용, 피트니스, 학원 |
| 상담형 | 내 문제를 믿고 맡길 수 있는가 | 상담 유형 선택 후 신청 | 병원, 법률, 웰니스, 컨설팅, SaaS 데모 |
| 견적형 | 이 업체가 내 조건을 수행할 수 있는가 | 요구조건 정리 후 견적 요청 | 제조, 시공, 에이전시, 가맹 |
| 구매형 | 무엇을 얼마에 어떤 조건으로 살 수 있는가 | 상품 선택 후 구매 | D2C, 식품, 메뉴, 구독 |
| 미디어/공동체형 | 지금 볼 것과 참여할 모임은 무엇인가 | 콘텐츠 시청 또는 첫 방문·모임 참여 | 교회, 성당, 사찰, 종교문화센터 |
| 기관/포털형 | 내가 처리할 업무와 마감은 어디에 있는가 | 사업·공지·자료·기관 탐색 | 교육기관, 관광협회, 지원기관, 교단·종단 |

### 혼합형 결정 규칙

- 교육: 수강 신청과 시간표가 핵심이면 예약형, 공지·사업·자료가 핵심이면 기관/포털형
- 식음료: 메뉴 구매와 배송이 핵심이면 구매형, 좌석·체험 예약이 핵심이면 예약형
- 웰니스: 민감한 문제 상담이 핵심이면 상담형, 클래스 시간 선택이 핵심이면 예약형
- 관광: 단일 사업자의 체험·숙박 판매면 예약형, 지역 전체 정보와 회원기관 탐색이면 기관/포털형
- 종교: 개별 예배·미디어·공동체 참여면 미디어/공동체형, 산하 조직·행정·자료 배포면 기관/포털형
- 에이전시: 프로젝트 조건과 예산을 받으면 견적형, 장기 자문과 진단이 핵심이면 상담형

## 2. 여섯 프레임 공통 제작 계약

### 화면과 산출물

외부 도구는 프레임마다 다음 결과를 모두 만든다.

1. 1440px 데스크톱 전체 홈 화면
2. 390px 모바일 전체 홈 화면
3. 헤더, 히어로, 주요 전환 블록의 컴포넌트 분해도
4. 로딩, 빈 결과, 오류, 마감 또는 품절, 완료 상태 보드
5. 색상, 타이포그래피, 간격, 반경, 테두리 토큰 표
6. 필요한 사진과 영상의 촬영 목록, 비율, 피사체, 사용 위치
7. 각 섹션의 WordPress 블록명, 콘텐츠 필드, 클릭 목적 주석

### 공통 디자인 규칙

- 페이지 테마는 밝은 모드 하나로 잠근다. 어두운 섹션을 중간에 끼워 넣지 않는다.
- 기본 콘텐츠 폭 1200px, 좌우 여백 40px, 섹션 간격 96px을 사용한다.
- 내비게이션은 한 줄, 52px에서 72px 높이로 만들고 핵심 CTA는 하나만 둔다.
- 제목은 `Inter Display`, 본문은 `Inter`와 프로젝트 폰트 기능 설정을 사용한다.
- 히어로 제목은 데스크톱 두 줄, 모바일 세 줄 이하로 제한한다.
- CTA 문구는 행동과 결과를 함께 쓴다. 예: `가능 시간 확인`, `상담 유형 선택`, `견적 조건 입력`.
- 하나의 프리셋은 하나의 단색 강조색만 사용한다. 그라디언트는 사용하지 않는다.
- 카드 반경은 기본 8px, 히어로 미디어는 최대 16px으로 제한한다.
- 카드 그림자 대신 1px 테두리와 여백을 우선하고, 그림자는 hover와 overlay에서만 사용한다.
- 동일한 3열 아이콘 카드를 만들지 않는다. 편집형 목록, 비대칭 분할, 일정 스트립, 미디어 행, 데이터 표를 조합한다.
- 실제 콘텐츠 사진을 사용한다. 인터페이스처럼 보이게 만든 가짜 박스 이미지는 쓰지 않는다.
- 통계, 후기, 인증, 가격은 입력 데이터가 있을 때만 노출한다. 값이 없으면 해당 항목을 삭제한다.
- 모든 인터랙션에 키보드 초점, 오류 설명, 44px 이상의 모바일 터치 영역을 제공한다.
- 움직임은 정보 진입, 상태 변경, 선택 피드백에만 사용하고 `prefers-reduced-motion` 대체 상태를 만든다.

### 공통 프롬프트 입력값

각 제작 프롬프트의 대괄호 값은 실제 업체 자료로 교체한다.

```text
brandName: [브랜드명]
industry: [세부 업종]
presetId: [프리셋 ID]
primaryAudience: [핵심 고객]
serviceArea: [서비스 지역 또는 운영 범위]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [핵심 전환]
realContentAvailable: [로고, 사진, 가격, 일정, 후기, 인증, 사례 중 보유 항목]
```

## 3. 예약형 홈 프레임

### Design Read

신뢰할 수 있는 실제 장소 사진과 현재 예약 가능성을 첫 화면에서 결합한, 빠르지만 조급하지 않은 일정 중심 홈이다.

### 기획 기준

| 항목 | 결정 |
|---|---|
| 대상 | 관광·체험 방문객, 미용·피트니스 고객, 수강생과 보호자 |
| 핵심 과업 | 목적 선택, 서비스 비교, 날짜·시간 확인, 담당자 또는 지점 선택 |
| 1차 CTA | 가능 시간 확인 |
| 2차 CTA | 프로그램 전체 보기 |
| 디자인 다이얼 | `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 5`, `VISUAL_DENSITY 4` |
| 정보 우선순위 | 가능 상태, 대표 경험, 가격·소요시간, 준비사항, 후기, 위치 |
| 대표 이미지 | 실제 활동 장면 16:10, 인물과 장소가 함께 보이는 사진 |

### 홈 섹션 순서

| 순서 | 블록 ID | 상태 | 목적과 포함 내용 | 데스크톱 구성 | 모바일 구성 |
|---:|---|---|---|---|---|
| 1 | `hero-booking` | 신규 | 한 문장 가치, 실제 장면, 날짜·인원·지점 빠른 선택, 두 CTA | 7:5 비대칭 분할, 선택 바는 하단에 결합 | 이미지 4:3, 카피, 선택 항목을 세로 배치 |
| 2 | `availability-strip` | 신규 | 오늘 운영, 가장 빠른 가능일, 잔여 정원, 휴무·마감 | 한 줄 상태 스트립 | 가로 스크롤이 아닌 두 행 요약 |
| 3 | `goal-based-navigation` | 변형 | 가족, 초보, 커플, 단체, 자격·목표처럼 방문 목적별 진입 | 큰 항목 1개와 작은 항목 3개 비대칭 | 세로 선택 목록과 활성 상태 |
| 4 | `featured-offerings` | 변형 | 대표 서비스, 가격, 시간, 대상, 가능 상태 | 편집형 미디어 목록 4개 | 이미지와 핵심 메타가 있는 세로 목록 |
| 5 | `seasonal-recommendations` | 신규 | 계절, 기간, 날씨, 학기 기준 추천 | 큰 캠페인 1개와 일정 레일 | 한 장씩 넘기는 추천, 정지 제어 제공 |
| 6 | `experience-process` | 변형 | 예약, 준비, 방문, 이용, 변경·취소 흐름 | 번호 없는 5단계 타임라인 | 접힌 아코디언과 현재 단계 강조 |
| 7 | `expert-profiles` | 변형 | 가이드, 강사, 디자이너, 트레이너의 분야·경력·가능 일정 | 프로필 2개와 일정 요약 | 프로필별 다음 가능 시간 표시 |
| 8 | `facility-gallery` | 보유 | 공간, 장비, 주차, 접근성, 편의시설 | 큰 사진 1장과 세로 썸네일 | 4:3 스냅 갤러리, 페이지 표시 |
| 9 | `reviews-gallery` | 신규 | 이용 서비스, 방문 시점, 작성자 맥락이 있는 승인 후기 | 인용 1개와 미디어 후기 목록 | 후기 1개씩, 평점만 단독 강조 금지 |
| 10 | `faq-preparation` | 보유 | 준비물, 연령, 취소, 지각, 안전, 주차 | 질문 목록과 정책 링크 | 아코디언, 질문 6개 우선 |
| 11 | `conversion-cta` | 보유 | 선택 내용을 유지한 예약 재진입 | 요약 문장과 CTA | 하단 고정 CTA, 푸터 전 해제 |

### 필수 상태

- 날짜 로딩, 가능한 일정 있음, 선택일 마감, 전체 마감, 휴무, 예약 오류
- 정원 충분, 잔여 소수, 대기 신청 가능, 예약 종료
- 서비스 목록 기본, 필터 적용, 결과 없음
- 예약 선택 전, 선택 완료, 입력 오류, 제출 중, 예약 접수 완료

### 예약형 외부 제작 프롬프트

```text
Design Read: Create a schedule-first homepage that combines trustworthy real-place imagery with immediate availability, feeling efficient without urgency pressure.

Create a high-fidelity responsive homepage for ModuTheme using these inputs:
brandName: [브랜드명]
industry: [관광, 체험, 미용, 피트니스, 학원 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 고객]
serviceArea: [지역 또는 지점]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realContentAvailable: [실제 보유 콘텐츠 목록]

Goal:
Help a first-time visitor choose a goal, compare an offering, confirm a date or time, and begin booking with minimum uncertainty.

Design settings:
DESIGN_VARIANCE 7
MOTION_INTENSITY 5
VISUAL_DENSITY 4
Light theme only
Desktop canvas 1440px with 1200px content width and 40px side padding
Mobile canvas 390px with 16px side padding
Use ModuTheme tokens from docs/DESIGN.md
Use Inter Display for headings and Inter for body with the documented tight letter spacing
Use one solid accent color with no gradients
Use 8px card radius, 6px control radius, 16px maximum hero-media radius
Use borders and spacing before shadows

Header:
Keep it on one line and 64px high on desktop. Include logo, 프로그램, 일정, 전문가 또는 지점, 이용안내, 후기, and one primary button labeled 가능 시간 확인. On mobile use a 48px header, logo, booking button, and menu button.

Hero:
Build a 7:5 asymmetric split. Left side contains one short context label, a specific Korean headline of no more than two desktop lines, a support sentence of no more than 20 words, primary button 가능 시간 확인, and secondary text link 프로그램 전체 보기. Right side uses one real 16:10 activity photo with no text overlay. Attach a date, people, branch or staff selector below the split as one compact booking bar. Show a clear default state before selection and a selected state with the next available time.

Create the following sections in this exact order:
1. Availability strip with today status, next available date, remaining capacity, and closure notice.
2. Goal-based navigation using one large option and three smaller options, not equal icon cards.
3. Four featured offerings with real image, title, audience, duration, price or inquiry label, and availability.
4. Seasonal recommendations with one main recommendation and a compact date rail.
5. Five-step experience process covering booking, preparation, arrival, participation, and change or cancellation.
6. Two expert or branch profiles with specialty, experience, location, and next available time.
7. Facility gallery covering activity area, equipment, parking, accessibility, and amenities.
8. Approved review gallery with service used, visit timing, and reviewer context. Do not invent ratings or outcomes.
9. Six preparation FAQs covering materials, age, cancellation, lateness, safety, and parking.
10. Final booking CTA that preserves the visitor's current selection.

Responsive behavior:
On mobile place the hero image first only when visual choice is critical; otherwise place the headline first. Stack booking selectors vertically. Do not use horizontal scrolling for availability. Use 44px minimum touch targets. Convert the process to an accordion and show one review at a time with a pause control. Add a bottom booking CTA after the visitor passes the hero and remove it before the footer.

Required state board:
Show date loading, available, low capacity, waitlist, sold out, closed, booking error, empty filter result, form validation error, submitting, and booking completed. Every state needs Korean microcopy and a clear next action.

Content and asset rules:
Use realistic Korean sample copy but label all sample data as replaceable. Never fabricate testimonials, certification, capacity, or price. If a verified value is unavailable, omit the field. Define a shot list for one 16:10 hero, four 4:3 offerings, two 3:4 profiles, five 4:3 facility photos, and three review media assets.

Do not use:
Purple or indigo gradients, three equal icon feature cards, centered layout for every section, generic welcome copy, excessive pills, radius above 16px, fake dashboards, decorative stock illustration, text labels over photos, scroll cues, section numbers, or unsupported statistics.

Deliver:
One 1440px full homepage, one 390px full homepage, one component and state board, one token sheet, one asset shot list, and annotations showing WordPress block IDs and content fields.
```

## 4. 상담형 홈 프레임

### Design Read

민감한 문제를 과장 없이 설명하고 전문가, 범위, 절차, 개인정보 보호를 단계적으로 확인하게 하는 신뢰 중심 홈이다.

### 기획 기준

| 항목 | 결정 |
|---|---|
| 대상 | 환자, 의뢰인, 상담 고객, 보호자, 사업 책임자 |
| 핵심 과업 | 문제 유형 선택, 전문성 검증, 상담 범위 확인, 채널 선택 |
| 1차 CTA | 상담 유형 선택 |
| 2차 CTA | 전문가와 서비스 보기 |
| 디자인 다이얼 | `DESIGN_VARIANCE 4`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 5` |
| 정보 우선순위 | 책임 범위, 전문가, 절차, 근거, 비용 기준, 개인정보 |
| 대표 이미지 | 실제 전문가 또는 공간의 절제된 다큐멘터리 사진 |

### 홈 섹션 순서

| 순서 | 블록 ID | 상태 | 목적과 포함 내용 | 데스크톱 구성 | 모바일 구성 |
|---:|---|---|---|---|---|
| 1 | `hero-consultation` | 변형 | 문제 선택, 상담 채널, 운영시간, 긴급·면책 고지 | 텍스트 7, 신뢰 패널 5 | 카피, 유형 선택, 고지 순서 |
| 2 | `problem-solution` | 변형 | 대상 문제와 제공 범위, 제외 범위 | 좌측 문제 목록, 우측 활성 설명 | 선택형 아코디언 |
| 3 | `goal-based-navigation` | 변형 | 증상, 사건, 고민, 조직 과제별 진입 | 2열 편집형 목록 | 라디오형 세로 목록 |
| 4 | `self-assessment-entry` | 신규 | 3분 진단, 필요한 정보, 결과 예시, 면책 | 질문 미리보기와 시작 CTA | 질문 수와 개인정보 요약 우선 |
| 5 | `expert-profiles` | 변형 | 자격, 전문분야, 경력, 언어, 지점 | 대표 전문가 1명과 목록 3명 | 한 명씩 명확한 상담 연결 |
| 6 | `service-process` | 보유 | 접수, 확인, 배정, 상담, 후속 안내 | 5단계 선형 흐름 | 세로 타임라인 |
| 7 | `case-studies` | 신규 | 문제, 대응, 결과, 제한·익명 고지 | 상세 사례 1개와 요약 2개 | 상세 사례 우선, 결과 과장 금지 |
| 8 | `credentials-proof` | 신규 | 자격, 인증, 발급처, 유효일, 문서 | 문서형 레일 | 발급처와 날짜가 보이는 목록 |
| 9 | `pricing-consultation` | 변형 | 고정가, 시작가, 별도 산정, 포함·제외 | 비교표와 추천 기준 | 항목별 접이식 비교 |
| 10 | `service-disclosure` | 변형 | 긴급 상황, 의료·법률 면책, 개인정보, 취소 | 본문형 고지와 링크 | 짧은 요약과 상세 보기 |
| 11 | `conversion-cta` | 보유 | 선택한 문제 유형을 유지한 상담 시작 | CTA와 운영 안내 | 주요 CTA 전체 폭 |

### 필수 상태

- 상담 가능, 운영 종료, 긴급 상황 안내, 담당자 부재, 대체 채널
- 문제 유형 미선택, 선택 완료, 적합 서비스 없음
- 민감정보 입력 전 고지, 동의 오류, 파일 오류, 제출 중, 접수 완료
- 자가진단 시작 전, 진행 중, 중단 후 복귀, 결과, 결과 산정 불가

### 상담형 외부 제작 프롬프트

```text
Design Read: Create a trust-first homepage that lets people explain a sensitive problem, verify expertise and scope, and choose a safe consultation path without exaggerated claims.

Create a high-fidelity responsive homepage for ModuTheme using these inputs:
brandName: [브랜드명]
industry: [병원, 법률, 웰니스, 컨설팅, SaaS 자문 중 하나]
presetId: [프리셋 ID]
primaryAudience: [환자, 의뢰인, 상담 고객, 보호자, 사업 책임자 중 핵심 대상]
serviceArea: [지역 또는 운영 범위]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realContentAvailable: [전문가, 자격, 사례, 가격, 공간, 정책 중 실제 보유 콘텐츠]

Goal:
Help a visitor identify the right consultation category, understand what is and is not provided, verify the responsible expert, and submit a safe request.

Design settings:
DESIGN_VARIANCE 4
MOTION_INTENSITY 3
VISUAL_DENSITY 5
Light theme only
Desktop canvas 1440px with 1200px content width
Mobile canvas 390px
Use ModuTheme tokens from docs/DESIGN.md
Use one solid accent color, calm neutral surfaces, 8px cards, and subtle 1px borders
Avoid decorative motion. Use motion only for selection, validation, and disclosure expansion.

Header:
Keep one desktop row under 72px. Include logo, 전문분야 또는 진료, 전문가, 사례 또는 자료, 이용안내, 오시는 길, and one primary button 상담 유형 선택. On mobile keep a visible phone or consultation action without exposing private details.

Hero:
Create a 7:5 split with text and a factual trust panel. Use one concrete Korean headline of no more than two lines, one short support sentence, primary button 상담 유형 선택, and secondary link 전문가와 서비스 보기. The trust panel contains operating hours, response expectation, service area, and privacy note. It may include one restrained real portrait or interior photo. Do not place testimonials, logo walls, or unsupported success rates in the hero.

Create the following sections in this exact order:
1. Problem and service-scope selector with active, hover, keyboard focus, and no-match states.
2. Goal-based navigation for symptoms, cases, concerns, or organization challenges using editorial rows rather than equal cards.
3. Three-minute self-assessment entry showing question count, required information, result type, privacy notice, and disclaimer.
4. Expert section with one lead expert and three supporting profiles, showing verified qualification, specialty, experience, language, branch, and consultation route.
5. Five-step process for request, review, assignment, consultation, and follow-up.
6. Evidence section with one detailed case and two concise cases. Include context, response, result, and limitation. Use anonymization where required.
7. Credential section showing document name, issuer, issue or valid date, and document link.
8. Pricing and consultation terms showing fixed fee, starting fee, separately estimated items, included scope, excluded scope, and cancellation rule.
9. Disclosure section for emergency guidance, medical or legal disclaimer, privacy retention, and alternative public services.
10. Final consultation CTA that carries the selected problem category into the next step.

Responsive behavior:
On mobile place the problem selector immediately after the hero message. Convert two-column explanations to one active item at a time. Use 44px touch targets. Keep privacy and emergency guidance visible before sensitive fields. Do not hide exclusions inside tooltips. Keep the final CTA full width but do not cover legal links or the footer.

Required state board:
Show consultation available, closed, expert unavailable, alternative channel, no matching service, sensitive-data notice, consent error, upload error, submitting, request completed, assessment paused, assessment resumed, result ready, and result unavailable. Write clear Korean recovery actions.

Content and asset rules:
Use realistic Korean sample copy while clearly marking replaceable facts. Do not invent qualifications, case outcomes, patient claims, response time, awards, or statistics. Define a shot list for one expert or interior hero image, four 3:4 portraits, three case visuals, and credential document thumbnails.

Do not use:
Outcome guarantees, before-and-after imagery without consent context, fake reviews, decorative medical or legal symbols, three equal feature cards, purple gradients, fully centered sections, oversized quotation marks, excessive rounded boxes, or hidden disclaimers.

Deliver:
One 1440px full homepage, one 390px full homepage, one component and state board, one token sheet, one image shot list, and annotations for WordPress block IDs, required fields, privacy text, and validation behavior.
```

## 5. 견적형 홈 프레임

### Design Read

프로젝트의 수행 가능성을 기술 근거와 실제 사례로 빠르게 검증하고, 준비된 요구조건을 견적 요청으로 연결하는 증거 중심 홈이다.

### 기획 기준

| 항목 | 결정 |
|---|---|
| 대상 | 구매 담당자, 현장 책임자, 건축주, 브랜드 담당자, 창업 예정자 |
| 핵심 과업 | 역량 확인, 제품·서비스 탐색, 사례 검토, 요구조건 정리 |
| 1차 CTA | 견적 조건 입력 |
| 2차 CTA | 사례와 기술자료 보기 |
| 디자인 다이얼 | `DESIGN_VARIANCE 5`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 6` |
| 정보 우선순위 | 수행 범위, 적용 분야, 사양, 사례, 공정, 인증, 자료 |
| 대표 이미지 | 실제 제품, 현장, 완공 공간, 제작 과정의 고해상도 사진 |

### 홈 섹션 순서

| 순서 | 블록 ID | 상태 | 목적과 포함 내용 | 데스크톱 구성 | 모바일 구성 |
|---:|---|---|---|---|---|
| 1 | `hero-quote` | 신규 | 제공 범위, 적용 산업, 대표 근거, 견적 CTA | 카피 5, 현장 미디어 7 | 카피, 근거 3개, 이미지, CTA |
| 2 | `problem-solution` | 변형 | 고객 조건과 대응 솔루션 매칭 | 조건 목록과 활성 해결안 | 선택형 세로 목록 |
| 3 | `product-category-nav` 또는 `service-category-nav` | 신규/변형 | 제품군, 공종, 서비스군 탐색 | 4개 편집형 행 | 핵심 메타가 있는 목록 |
| 4 | `featured-products` 또는 `featured-offerings` | 신규/변형 | 사양 또는 서비스 범위가 있는 대표 항목 | 큰 대표 1개와 요약 3개 | 대표 우선 세로 배치 |
| 5 | `case-studies` | 신규 | 업종, 조건, 수행, 결과, 관련 항목 | 사례 모자이크 3개 | 필터 가능한 사례 목록 |
| 6 | `technical-process` | 변형 | 진단, 제안, 설계, 제작·시공, 검수, 지원 | 공정 타임라인과 산출물 | 단계별 산출물 아코디언 |
| 7 | `metrics-proof` | 변형 | 기준일과 출처가 있는 생산·수행 역량 | 수치와 설명의 데이터 행 | 표제와 근거를 한 쌍으로 표시 |
| 8 | `credentials-proof` | 신규 | 인증, 특허, 면허, 협력 자격 | 문서 썸네일과 메타 | 문서명, 발급처, 날짜 목록 |
| 9 | `resource-library` | 변형 | 카탈로그, 도면, 포트폴리오, 체크리스트 | 파일 유형별 레일 | 파일 크기와 버전이 보이는 목록 |
| 10 | `service-disclosure` | 변형 | 견적 포함·제외, 현장 조사, 유효기간, A/S | 두 열 조건표 | 접이식 조건, 핵심 제외사항 상시 표시 |
| 11 | `conversion-cta` | 보유 | 요구조건 체크리스트와 견적 폼 진입 | 요약 패널과 CTA | 견적 준비 항목과 전체 폭 CTA |

### 필수 상태

- 제품·서비스 기본, 산업 필터 적용, 검색 결과 없음, 비교 선택
- 자료 다운로드 가능, 로그인 필요, 파일 없음, 이전 버전, 다운로드 오류
- 견적 입력 전 체크리스트, 파일 첨부, 파일 오류, 임시 저장, 제출 중, 접수 완료
- 운영 가능, 프로젝트 일정 협의 필요, 신규 수주 마감, 대체 문의 채널

### 견적형 외부 제작 프롬프트

```text
Design Read: Create an evidence-first B2B homepage that proves delivery capability through real work, specifications, process, and documents before asking for a structured quote.

Create a high-fidelity responsive homepage for ModuTheme using these inputs:
brandName: [브랜드명]
industry: [제조, 시공, 건축, 인테리어, 에이전시, 가맹 중 하나]
presetId: [프리셋 ID]
primaryAudience: [구매 담당자, 현장 책임자, 건축주, 브랜드 담당자, 창업 예정자 중 핵심 대상]
serviceArea: [납품, 시공, 서비스 가능 지역]
entityMode: [product, service, project 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realContentAvailable: [제품, 사양, 사례, 공정, 인증, 자료 중 실제 보유 콘텐츠]

Goal:
Help a buyer confirm scope and capability, inspect relevant work, collect technical evidence, and begin a quote with useful requirements.

Design settings:
DESIGN_VARIANCE 5
MOTION_INTENSITY 3
VISUAL_DENSITY 6
Light theme only
Desktop canvas 1440px with 1200px content width
Mobile canvas 390px
Use ModuTheme tokens from docs/DESIGN.md
Use one solid accent, data-dense typography, 1px borders, 8px cards, and restrained shadows
Use motion only for filters, comparison selection, file feedback, and process expansion.

Header:
Keep one row under 72px. Include logo, 제품 또는 서비스, 적용분야, 사례, 기술자료, 회사소개, and one primary button 견적 조건 입력. If entityMode is service, replace 제품 with 서비스. If entityMode is project, lead with 프로젝트.

Hero:
Create a 5:7 split with concise copy and one large real product, site, completed-space, or production image. Use a concrete Korean headline under two lines, one support sentence, primary button 견적 조건 입력, and secondary link 사례와 기술자료 보기. Add three factual evidence fields such as service range, verified certification, or response process only when supplied. Do not show invented percentages, client logos, or decorative dashboards.

Create the following sections in this exact order:
1. Customer-condition and solution matcher with four real conditions and active explanations.
2. Product, trade, or service taxonomy using four editorial rows with key scope metadata.
3. One leading product or service and three supporting items with model or scope, key specification, application, and quote action.
4. Three case studies with industry, constraints, delivery, result, evidence source, and related item.
5. Six-stage process covering diagnosis, proposal, design, production or construction, inspection, and support. Show the deliverable at each stage.
6. Capability metrics with unit, reference date, source, and explanatory sentence. Remove the section if verified metrics are unavailable.
7. Credential library with certificate, patent, license, or partner qualification, including issuer and validity.
8. Resource library for catalog, drawing, portfolio, and checklist, including file type, size, language, and version.
9. Quote conditions covering included scope, exclusions, site survey, estimate validity, payment milestone, warranty, and after-service.
10. Final quote-entry panel with a requirements checklist and button 견적 조건 입력.

Responsive behavior:
On mobile preserve specifications and units rather than replacing them with vague summaries. Turn taxonomy and cases into vertical lists, not carousels. Convert wide comparisons to item-by-item cards with a fixed attribute order. Keep file type, size, and version visible. Place the quote CTA after sufficient evidence and never cover document links.

Required state board:
Show default catalog, industry filter active, no results, comparison selected, resource available, login required, missing file, old version, download error, quote checklist empty, file attached, file rejected, draft saved, submitting, request completed, capacity closed, and alternate contact route.

Content and asset rules:
Use realistic Korean sample labels but do not fabricate specifications, certifications, project outcomes, customer logos, awards, capacity, or delivery dates. Define a shot list for one 16:10 hero, four product or service 4:3 images, three case-study 16:10 images, six process detail images, and credential scans.

Do not use:
Futuristic blue gradients, fake 3D machinery, decorative circuit patterns, three equal icon cards, unsupported ROI charts, tiny unreadable spec tables, every section in card containers, hidden exclusions, or generic agency claims.

Deliver:
One 1440px full homepage, one 390px full homepage, one component and state board, one token sheet, one technical asset shot list, and annotations for WordPress block IDs, fields, filter behavior, document metadata, and quote handoff.
```

## 6. 구매형 홈 프레임

### Design Read

상품의 질감, 사용 맥락, 가격과 구매 조건을 빠르게 이해하고 카테고리 탐색에서 장바구니까지 자연스럽게 이어지는 제품 중심 홈이다.

### 기획 기준

| 항목 | 결정 |
|---|---|
| 대상 | 라이프스타일 소비자, 선물 구매자, 식품 구매자, 정기구독 고객 |
| 핵심 과업 | 카테고리 탐색, 상품 비교, 성분·소재 확인, 옵션 선택, 구매 |
| 1차 CTA | 대표 상품 보기 |
| 2차 CTA | 목적별 추천 받기 |
| 디자인 다이얼 | `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 4` |
| 정보 우선순위 | 제품 이미지, 가격, 옵션, 재고, 배송, 성분·소재, 후기 |
| 대표 이미지 | 실제 제품과 사용 장면을 함께 보여 주는 에디토리얼 사진 |

### 홈 섹션 순서

| 순서 | 블록 ID | 상태 | 목적과 포함 내용 | 데스크톱 구성 | 모바일 구성 |
|---:|---|---|---|---|---|
| 1 | `hero-commerce` | 신규 | 대표 제품, 가격, 핵심 효용, 구매·탐색 CTA | 미디어 7, 구매 정보 5 | 제품 이미지, 이름·가격, CTA 순서 |
| 2 | `product-category-nav` | 신규 | 목적, 제품군, 식품 유형, 라이프스타일별 진입 | 텍스트와 이미지가 섞인 비대칭 메뉴 | 아이콘 없는 이미지 목록 |
| 3 | `featured-products` | 신규 | 대표 상품, 가격, 옵션, 재고, 리뷰 수 | 큰 상품 1개와 상품 행 4개 | 2열 썸네일이 아닌 한 줄 상품 목록 |
| 4 | `seasonal-recommendations` | 신규 | 계절, 선물, 신제품, 기간별 추천 | 캠페인 미디어와 상품 2개 | 캠페인 후 상품을 세로 배치 |
| 5 | `recommendation-entry` | 신규 | 목적·취향 질문과 추천 결과 미리보기 | 질문 3개와 결과 예시 | 한 질문씩 진행, 진행률 제공 |
| 6 | `material-process` | 변형 | 원료·소재, 제조, 품질, 포장, 배송 근거 | 긴 이미지와 주석형 설명 | 단계별 이미지와 25단어 이하 설명 |
| 7 | `bundle-promotion` | 신규 | 세트, 정기구독, 기간 혜택, 해지 조건 | 비교 행과 추천 1개 | 포함 품목과 결제 주기를 세로 비교 |
| 8 | `reviews-gallery` | 신규 | 상품, 사용 기간, 구매 옵션 맥락이 있는 후기 | UGC 1개와 인용 목록 | 미디어 후기 1개씩, 정지 제어 |
| 9 | `usage-guide` | 변형 | 사용법, 보관, 알레르기, 교환·배송 | 편집형 가이드와 링크 | 핵심 안내와 상세 아코디언 |
| 10 | `faq-preparation` | 보유 | 배송, 교환, 환불, 구독, 품절, 재입고 | 질문 목록과 정책 링크 | 질문 6개 우선 |
| 11 | `conversion-cta` | 보유 | 최근 본 상품 또는 추천 결과로 재진입 | 구매 요약과 CTA | 하단 장바구니 상태와 겹치지 않게 배치 |

### 필수 상태

- 상품 기본, 옵션 선택, 재고 충분, 재고 소수, 품절, 판매 종료, 재입고 알림
- 가격 정상, 할인 기간, 쿠폰 적용 가능, 쿠폰 오류, 구독 선택, 구독 해지 조건
- 추천 질문 시작, 진행, 결과, 결과 없음, 다시 선택
- 장바구니 비어 있음, 담기 성공, 수량 오류, 네트워크 오류

### 구매형 외부 제작 프롬프트

```text
Design Read: Create a product-first commerce homepage where material quality, use context, price, stock, and delivery terms are clear before the shopper commits.

Create a high-fidelity responsive homepage for ModuTheme using these inputs:
brandName: [브랜드명]
industry: [D2C 뷰티, 식품, 리빙, 패션 잡화, 친환경 생활용품, 반려동물, 공예, 구독 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 구매자]
serviceArea: [배송 지역 또는 매장 지역]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realContentAvailable: [상품 사진, 가격, 옵션, 성분, 소재, 후기, 배송, 구독 중 실제 보유 콘텐츠]

Goal:
Help a shopper discover the right category, understand product quality and terms, choose a product or bundle, and move toward cart without losing context.

Design settings:
DESIGN_VARIANCE 7
MOTION_INTENSITY 6
VISUAL_DENSITY 4
Light theme only
Desktop canvas 1440px with 1200px content width
Mobile canvas 390px
Use ModuTheme tokens from docs/DESIGN.md
Use one solid accent color and a neutral product-photography background
Do not default to beige, brass, oxblood, espresso, or luxury serif styling
Use 8px product cards, 6px controls, restrained borders, and minimal shadows
Use motion for image transitions, option feedback, add-to-cart confirmation, and recommendation progress only.

Header:
Keep one desktop row under 72px. Include logo, 카테고리, 신상품, 베스트, 브랜드, 이용안내, search, cart with semantic item count, and one primary action 대표 상품 보기. On mobile show logo, search, cart, and menu in 48px.

Hero:
Create a 7:5 product-led split with one real editorial product image or short muted product loop. Show product name, one concrete benefit, verified price, option or stock summary, primary button 대표 상품 보기, and secondary link 목적별 추천 받기. Keep the headline under two lines. Do not overlay pills or labels on the image. If price or stock is unavailable, omit it rather than inventing it.

Create the following sections in this exact order:
1. Asymmetric category navigation organized by goal, product type, food type, or lifestyle.
2. One leading product and four product rows with image, name, verified price, option count, stock state, and review count only when real.
3. Seasonal or occasion recommendation with one campaign image and two connected products. Show start and end dates for time-limited offers.
4. Recommendation entry with three questions, expected result type, progress, and restart action.
5. Material and production story with origin, material or ingredient, manufacturing, quality check, packaging, and shipping evidence.
6. Bundle and subscription comparison with included products, billing cycle, savings only when calculated from real prices, pause, change, and cancellation terms.
7. Review gallery with purchased product, option, use duration, media consent, and verified-purchase state. Never invent review text.
8. Usage and care guide covering use, storage, allergy or material notice, disposal, exchange, and shipping.
9. Six FAQs for delivery, exchange, refund, subscription, sold-out items, and restock alerts.
10. Final CTA returning to the recently viewed product or recommendation result.

Responsive behavior:
On mobile prioritize a readable product image, name, price, stock, and primary action within the first viewport. Do not hide shipping or subscription terms behind hover. Use a vertical product list when metadata is important. Provide 44px option controls. Avoid auto-playing carousels; if a media slider is used, include pause and clear pagination. Keep add-to-cart feedback visible without blocking navigation.

Required state board:
Show default product, option selected, in stock, low stock, sold out, sale ended, restock alert requested, valid discount, expired discount, coupon valid, coupon error, subscription selected, recommendation start, progress, result, no result, empty cart, add success, quantity error, and network error.

Content and asset rules:
Use realistic Korean sample labels and mark all commercial facts as replaceable. Never invent prices, discounts, reviews, ingredients, certifications, stock counts, origin, or delivery claims. Define a shot list for one 16:10 hero, five 4:5 product cutouts, three 4:3 lifestyle images, six production details, and three approved UGC assets.

Do not use:
Generic luxury beige styling, purple gradients, floating product mockups without physical grounding, three equal feature cards, oversized sale badges, fake countdown timers, hidden recurring-payment terms, endless carousels, text labels on photos, or unsupported environmental claims.

Deliver:
One 1440px full homepage, one 390px full homepage, one commerce component and state board, one token sheet, one photo shot list, and annotations for WordPress and WooCommerce fields, stock logic, promotion dates, recommendation data, and cart feedback.
```

## 7. 미디어/공동체형 홈 프레임

### Design Read

처음 방문한 사람에게 다음 모임과 최신 콘텐츠를 먼저 보여 주고, 공동체 참여와 돌봄 경로를 부담 없이 안내하는 환대 중심 홈이다.

### 기획 기준

| 항목 | 결정 |
|---|---|
| 대상 | 처음 방문자, 기존 구성원, 온라인 시청자, 봉사·돌봄 참여자 |
| 핵심 과업 | 다음 모임 확인, 최신 미디어 시청, 첫 방문 준비, 공동체 연결 |
| 1차 CTA | 첫 방문 안내 보기 |
| 2차 CTA | 최신 미디어 재생 |
| 디자인 다이얼 | `DESIGN_VARIANCE 5`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 5` |
| 정보 우선순위 | 다음 일정, 라이브 상태, 최신 콘텐츠, 새가족, 행사, 공지 |
| 대표 이미지 | 실제 모임, 공간, 사람을 존중하는 다큐멘터리 사진 |

### 홈 섹션 순서

| 순서 | 블록 ID | 상태 | 목적과 포함 내용 | 데스크톱 구성 | 모바일 구성 |
|---:|---|---|---|---|---|
| 1 | `hero-welcome` | 보유·변형 | 정체성, 다음 모임, 첫 방문·미디어 CTA | 사람 중심 사진과 일정 패널 비대칭 | 카피, 다음 일정, CTA, 이미지 |
| 2 | `gathering-schedule` | 변형 | 예배·미사·법회·수행·모임 시간, 장소, 언어 | 주간 시간표와 장소 전환 | 오늘과 다음 일정 우선 |
| 3 | `latest-faith-media` | 보유 | 라이브, 최신 영상·오디오, 시리즈 | 대표 플레이어 1개와 목록 | 대표 미디어 후 세로 목록 |
| 4 | `newcomer-journey` | 보유 | 첫 방문 전, 도착, 참여, 이후 연결 | 4단계 안내와 실제 공간 사진 | 접이식 단계와 길찾기 CTA |
| 5 | `ministry-community-nav` | 보유 | 연령, 관심, 돌봄, 봉사별 공동체 찾기 | 분류 탭과 편집형 목록 | 검색 가능한 세로 분류 |
| 6 | `event-calendar` | 변형 | 행사, 교육, 봉사, 신청, 정원·마감 | 월간 일정과 다가오는 행사 | 날짜 목록 우선, 달력은 보조 |
| 7 | `notice-bulletin` | 보유 | 공지, 주보, 기관 소식, 긴급 안내 | 고정 공지와 최신 목록 | 고정 공지 1개와 최신 4개 |
| 8 | `giving-support` | 보유 | 후원, 봉사, 돌봄 요청, 사용 원칙 | 참여 유형별 편집 행 | 민감정보 고지와 안전한 폼 연결 |
| 9 | `facility-gallery` | 보유 | 공간, 접근성, 주차, 가족·장애인 편의 | 장소 사진과 방문 정보 | 지도보다 주소·입구 안내 우선 |
| 10 | `conversion-cta` | 보유 | 첫 방문, 공동체 찾기, 문의 중 하나로 마무리 | 선택형 CTA 두 개 | 기본 CTA 하나, 보조 링크 하나 |

### 필수 상태

- 라이브 예정, 방송 중, 종료, 다시보기 준비 중, 재생 오류
- 오늘 모임 있음, 일정 없음, 장소 변경, 온라인 전용, 정원 마감
- 행사 신청 가능, 잔여 소수, 대기, 종료
- 돌봄·기도 요청 공개 범위, 익명, 동의 오류, 접수 완료

### 미디어/공동체형 외부 제작 프롬프트

```text
Design Read: Create a welcoming community homepage that prioritizes the next gathering, current media state, first-visit guidance, and safe ways to participate.

Create a high-fidelity responsive homepage for ModuTheme using these inputs:
brandName: [교회, 성당, 사찰, 종교문화센터 이름]
tradition: [개신교, 천주교, 불교, 종교문화, 명상 공동체 중 하나]
presetId: [프리셋 ID]
primaryAudience: [처음 방문자와 기존 구성원 중 우선 대상]
serviceArea: [지역 또는 캠퍼스]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realContentAvailable: [모임 사진, 일정, 영상, 행사, 공지, 공간, 후원 안내 중 실제 보유 콘텐츠]

Goal:
Help a visitor see what happens next, watch the latest content, prepare a first visit, and find an appropriate community or support route.

Design settings:
DESIGN_VARIANCE 5
MOTION_INTENSITY 4
VISUAL_DENSITY 5
Light theme only
Desktop canvas 1440px with 1200px content width
Mobile canvas 390px
Use ModuTheme tokens from docs/DESIGN.md
Respect the supplied religious tradition in language, symbols, image selection, and gathering labels
Use one solid accent color, 8px cards, documentary imagery, and restrained motion
Use motion for live-state transition, media playback feedback, event selection, and accordion expansion only.

Header:
Keep one row under 72px. Include logo, 소개, 모임 또는 예배, 공동체, 미디어, 소식, 오시는 길, and one primary button 첫 방문 안내. Adapt labels accurately to the tradition. Do not use church terminology for a Catholic parish, Buddhist temple, or non-denominational religious organization.

Hero:
Create an asymmetric people-first composition with a real gathering or place photo. Use one concrete identity statement under two lines, one short support sentence, primary button 첫 방문 안내 보기, secondary link 최신 미디어 재생, and a factual next-gathering panel with date, time, place, audience, language, and online availability. Do not place a decorative verse, quote, or slogan over the photo.

Create the following sections in this exact order:
1. Weekly gathering schedule with today state, next gathering, venue or campus, audience, language, and online option.
2. Latest media with one main player and a vertical list for live, video, audio, transcript, series, speaker, and date.
3. Four-step newcomer journey covering before visit, arrival, participation, and follow-up, supported by real place photos.
4. Community finder organized by age, interest, care need, service, and location using filters and editorial rows.
5. Event calendar with registration, capacity, deadline, accessibility, and calendar-add action.
6. Notice and bulletin section with one pinned notice, four recent items, file metadata, and expiry state.
7. Giving, volunteering, care, or prayer support section with clear use principles, privacy choices, and safe request routes.
8. Facility and arrival section covering address, entrance, transit, parking, wheelchair access, family facilities, and contact.
9. Final choice between first visit and community inquiry, with only one visually primary action.

Responsive behavior:
On mobile show identity, next gathering, and first-visit action in the first viewport. Do not auto-play audio. Keep live state semantic and provide text alternatives. Replace the desktop calendar with a chronological event list. Keep address, entrance photo, accessibility, and contact readable without opening a map. Use 44px controls and captions or transcripts for media.

Required state board:
Show live scheduled, live now, ended, replay processing, playback error, gathering today, no gathering today, venue changed, online only, event available, low capacity, waitlist, closed, care request public, care request private, anonymous request, consent error, and request completed.

Content and asset rules:
Use only tradition-appropriate Korean terms. Do not invent attendance, giving totals, member testimonials, program outcomes, or doctrinal statements. Define a shot list for one 16:10 gathering hero, one entrance image, four newcomer 4:3 images, six community 4:3 images, three event images, and media thumbnails in 16:9.

Do not use:
Generic corporate startup layout, decorative religious symbols detached from the tradition, dramatic worship stock photos, fake live badges, autoplay audio, three equal ministry cards, full-page center alignment, gradient overlays, excessive scripture or quote decoration, or pressure-based giving copy.

Deliver:
One 1440px full homepage, one 390px full homepage, one media and state board, one token sheet, one documentary shot list, and annotations for WordPress blocks, gathering taxonomy, media metadata, event state, newcomer route, and sensitive-request privacy.
```

## 8. 기관/포털형 홈 프레임

### Design Read

주요 업무, 마감, 공지, 사업, 자료, 소속기관을 짧은 탐색 경로로 연결하는 정확하고 밀도 높은 공공 정보형 홈이다.

### 기획 기준

| 항목 | 결정 |
|---|---|
| 대상 | 학생·학부모, 관광사업자·방문객, 지원사업 신청자, 산하기관 담당자, 종교 행정 사용자 |
| 핵심 과업 | 업무 찾기, 마감 확인, 공지 검색, 사업 신청, 자료 다운로드, 기관 찾기 |
| 1차 CTA | 주요 업무 찾기 |
| 2차 CTA | 공지와 마감 보기 |
| 디자인 다이얼 | `DESIGN_VARIANCE 3`, `MOTION_INTENSITY 2`, `VISUAL_DENSITY 7` |
| 정보 우선순위 | 검색, 주요 업무, 긴급 공지, 마감, 사업, 자료, 기관 연락처 |
| 대표 이미지 | 기관 활동을 설명할 때만 사용, 정보보다 앞세우지 않음 |

### 홈 섹션 순서

| 순서 | 블록 ID | 상태 | 목적과 포함 내용 | 데스크톱 구성 | 모바일 구성 |
|---:|---|---|---|---|---|
| 1 | `hero-task-portal` | 신규 | 통합 검색, 사용자 유형, 주요 업무, 긴급 공지 | 검색 중심 8, 상태 패널 4 | 제목, 검색, 사용자 유형, 긴급 공지 |
| 2 | `deadline-status-strip` | 신규 | 신청 중, 마감 임박, 종료, 일정 변경 | 날짜순 한 줄 업무 레일 | 마감순 세로 목록 3개 |
| 3 | `goal-based-navigation` | 변형 | 입학·수강, 사업 신청, 회원기관, 행정, 방문 정보 | 사용자 유형별 업무 행 | 선택한 사용자 기준 목록 |
| 4 | `featured-offerings` | 변형 | 주요 사업·과정·지원 프로그램 | 상태와 마감이 있는 데이터 목록 | 상태·마감·대상 우선 |
| 5 | `notice-bulletin` | 보유 | 고정 공지, 일반 공지, 보도·소식 | 고정 2개와 최신 목록 | 고정 1개와 최신 5개 |
| 6 | `event-calendar` | 변형 | 교육, 설명회, 행사, 접수 일정 | 달력과 마감 목록 | 일정 목록을 기본으로 제공 |
| 7 | `resource-library` | 변형 | 지침, 서식, 보고서, 홍보물, 주보·공문 | 검색·필터·파일 메타 | 파일 형식·크기·버전 상시 표시 |
| 8 | `institution-directory-preview` | 신규 | 지역, 유형, 소속별 기관·캠퍼스 찾기 | 지도 없이 목록 우선, 선택 시 위치 표시 | 검색과 연락처 중심 목록 |
| 9 | `metrics-proof` | 변형 | 기준일·출처가 있는 운영 공개 정보 | 표 형식 데이터와 출처 | 요약 수치와 상세 링크 |
| 10 | `service-disclosure` | 변형 | 신청 자격, 처리기간, 개인정보, 이의·문의 | 업무별 정책 링크 | 핵심 조건 먼저, 상세 문서 링크 |
| 11 | `conversion-cta` | 보유 | 담당 부서, 대표 전화, 온라인 문의 | 연락처 디렉터리와 문의 CTA | 전화, 문의, 위치를 분리 |

### 필수 상태

- 통합 검색 기본, 자동완성, 결과, 결과 없음, 검색 오류
- 사업 예정, 신청 중, 마감 임박, 종료, 일정 변경, 취소
- 공지 고정, 새 공지, 첨부 있음, 만료, 비공개 전환
- 자료 최신, 이전 버전, 대체 파일, 다운로드 오류
- 기관 검색 결과, 결과 없음, 연락처 없음, 외부 사이트 이동

### 기관/포털형 외부 제작 프롬프트

```text
Design Read: Create a precise, high-density institutional homepage that routes users to tasks, deadlines, notices, programs, documents, and affiliated organizations with minimal ambiguity.

Create a high-fidelity responsive homepage for ModuTheme using these inputs:
brandName: [교육기관, 관광협회, 지원기관, 교단 또는 종단 이름]
institutionType: [교육기관, 관광협회, 문화재단, 지원기관, 교단, 종단 중 하나]
presetId: [프리셋 ID]
primaryAudiences: [사용자 유형을 우선순위 순으로 입력]
serviceArea: [지역, 관할, 산하 조직 범위]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realContentAvailable: [공지, 사업, 일정, 자료, 기관, 통계, 연락처 중 실제 보유 콘텐츠]

Goal:
Help each audience find a task, confirm eligibility and deadline, locate the latest authoritative document, and contact the responsible organization.

Design settings:
DESIGN_VARIANCE 3
MOTION_INTENSITY 2
VISUAL_DENSITY 7
Light theme only
Desktop canvas 1440px with 1200px content width
Mobile canvas 390px
Use ModuTheme tokens from docs/DESIGN.md
Use one solid civic accent color, clear text hierarchy, 1px borders, 8px panels, and almost no shadow
Use motion only for search suggestions, filter feedback, disclosure expansion, and status changes.

Header:
Keep one desktop row under 72px. Include logo, 기관소개, 주요사업 또는 교육, 공지, 일정, 자료실, 기관찾기, 통합검색, and one primary action 주요 업무 찾기. If administrative utility links are required, place them in a restrained utility row above the main header without duplicating navigation.

Hero:
Create a search-and-task portal rather than a promotional hero. Use one factual Korean heading under two lines, a prominent integrated search field, audience selector, four most-used task links, and one urgent notice panel. Keep decorative imagery optional and secondary. Show search scope and last content update. Do not use a slogan-only hero.

Create the following sections in this exact order:
1. Deadline status strip ordered by closest deadline, with scheduled, open, closing soon, closed, changed, and canceled states.
2. Audience-based task navigation for applicant, student or parent, tourism business, visitor, member organization, administrator, or religious worker as appropriate.
3. Main program list with audience, eligibility, application period, status, responsible department, and detail action.
4. Notice area with two pinned notices and a dense recent list, including category, date, attachment, and expiry.
5. Calendar and deadline area for education, briefing, event, application, and reporting dates.
6. Resource library for guideline, form, report, promotional material, bulletin, or official letter, including format, size, version, language, and updated date.
7. Affiliated institution preview searchable by region, type, affiliation, service, and keyword, with organization name, address, contact, and external-link state.
8. Public metrics only when verified, each with unit, reference date, source, and method link.
9. Policy and service disclosure covering eligibility, processing time, privacy, appeal, accessibility, and responsible contact.
10. Contact directory with department, purpose, phone, hours, online inquiry, and location.

Responsive behavior:
On mobile keep search, urgent notice, and four most-used tasks within the first two viewports. Use a chronological deadline list instead of a full month grid. Preserve document format, version, and update date. Do not hide phone numbers and responsible departments behind hover. Make filters expandable but show active filters and a clear reset action. Use 44px controls and strong focus states.

Required state board:
Show search default, suggestions, results, no results, search error, program scheduled, open, closing soon, closed, changed, canceled, pinned notice, new notice, expired notice, attachment present, document current, old version, replacement available, download error, institution results, no institutions, missing contact, and external-site transition.

Content and asset rules:
Use realistic Korean sample labels and dates only as clearly marked examples. Never invent public statistics, application rules, deadlines, department contacts, organization names, policy claims, or file versions. When content is unavailable, show an editorial empty-state pattern rather than fake entries. Define a limited shot list only for real institutional activity, facilities, destinations, or affiliated organizations.

Do not use:
Large promotional lifestyle hero, gradients, decorative maps without data, three equal service cards, oversized illustrations, hidden deadlines, ambiguous status colors without text, tiny document metadata, endless press-release rows, or an image-heavy layout that pushes tasks below the fold.

Deliver:
One 1440px full homepage, one 390px full homepage, one search and state board, one token sheet, one content-model sheet, and annotations for WordPress block IDs, audience taxonomy, program status, deadline logic, document metadata, institution directory fields, and responsible-contact routing.
```

## 9. 프레임별 신규 디자인 우선순위

| 프레임 | 현재 재사용 가능 | 변형 제작 | 반드시 신규 제작 |
|---|---|---|---|
| 예약형 | 시설 갤러리, FAQ, 전환 CTA | 목적 탐색, 대표 서비스, 과정, 전문가 | 예약 히어로, 가능 상태 스트립, 계절 추천, 후기 갤러리 |
| 상담형 | 서비스 과정, 전환 CTA | 상담 히어로, 문제·해결, 전문가, 가격, 고지 | 자가진단 진입, 사례, 자격·인증 증명 |
| 견적형 | 전환 CTA | 문제·해결, 서비스 분류, 대표 서비스, 기술 과정, 수치, 자료, 고지 | 견적 히어로, 제품 분류, 대표 제품, 사례, 자격·인증 증명 |
| 구매형 | FAQ, 전환 CTA | 소재·공정, 사용 가이드 | 구매 히어로, 제품 분류, 대표 상품, 시즌 추천, 추천 진입, 세트·구독, 후기 |
| 미디어/공동체형 | 환영 히어로, 미디어, 첫 방문, 공동체, 공지, 후원, 시설, CTA | 시간표, 행사 달력 | 홈 신규 블록보다 라이브·마감·민감정보 상태 변형이 우선 |
| 기관/포털형 | 공지, CTA | 목적 탐색, 사업 목록, 일정, 자료, 수치, 고지 | 업무 검색 히어로, 마감 상태 스트립, 기관 디렉터리 미리보기 |

신규 블록은 공통 컴포넌트부터 만든다. 1차 공통 묶음은 `state-badge`, `content-meta-row`, `filter-summary`, `empty-state`, `error-recovery`, `deadline-chip`, `document-meta`, `consent-panel`이다. 이 공통 묶음이 먼저 있어야 예약·상품·사업 상태를 프레임마다 다른 스타일로 중복 제작하지 않는다.

## 10. 외부 도구 검수 체크리스트

- 첫 화면만 보고 핵심 행동과 현재 상태를 구분할 수 있는가
- 1440px과 390px에서 핵심 CTA가 잘리지 않는가
- 히어로 제목이 두 줄, 보조문장이 20단어 수준을 넘지 않는가
- 한 페이지에 최소 네 가지 섹션 레이아웃 계열이 있는가
- 세 구간 이상 이미지·텍스트 좌우 교차를 반복하지 않는가
- 동일한 3열 아이콘 카드가 없는가
- 그라디언트, 16px 초과 반경, 과도한 그림자가 없는가
- 가격, 후기, 수치, 인증, 일정의 출처 또는 입력 필드가 정의되어 있는가
- 로딩, 빈 결과, 오류, 마감·품절, 완료 상태가 있는가
- 모바일에서 표와 일정이 단순 삭제되지 않고 읽을 수 있는 형식으로 변환되는가
- 키보드 초점, 오류 설명, 44px 터치 영역, 미디어 자막·대체 텍스트가 있는가
- 모든 WordPress 블록과 콘텐츠 필드가 주석으로 연결되어 있는가


