# 모두테마 15종 페이지군 기획 및 외부 AI 제작 프롬프트

Date: 2026-08-30  
Status: ready for external design production  
Design baseline: `docs/DESIGN.md`, theme v0.3.62 audit

## 1. 공통 제작 계약

### 제작 범위

15개 페이지군은 총 27개 기본 화면 원형으로 구성한다. 외부 AI는 각 원형마다 1440px 데스크톱, 390px 모바일, 상태 보드, 컴포넌트 분해도와 콘텐츠 필드 주석을 만든다.

| 페이지군 | 기본 화면 수 | 화면 원형 |
|---|---:|---|
| 제품·서비스·프로그램 목록 및 상세 | 4 | 서비스 목록, 서비스 상세, 제품 목록, 제품 상세 |
| 전문가·의료진 개별 상세 | 1 | 프로필 상세 |
| 사례·프로젝트 목록 및 상세 | 2 | 사례 목록, 사례 상세 |
| 예약 가능 날짜·시간·정원 선택 | 1 | 단계형 예약 |
| 견적 및 파일 첨부 폼 | 1 | 단계형 견적 |
| 자가진단과 결과 화면 | 2 | 질문 흐름, 결과 |
| 제품·서비스·패키지 비교 | 1 | 비교 화면 |
| 후기·UGC 및 전후 비교 | 2 | 후기 목록, 전후 상세 |
| 지점·매장·캠퍼스 찾기 | 1 | 지도·목록 찾기 |
| 추천 코스·주변 지도 | 1 | 코스·지도 |
| 평면·타입 뷰어 | 1 | 도면·타입 상세 |
| 인증·특허 라이브러리 | 1 | 신뢰 문서 목록 |
| 상품·장바구니·결제·계정 | 5 | 상품 목록, 상품 상세, 장바구니, 결제, 계정 |
| 목적별 상품 추천 | 2 | 추천 질문, 추천 결과 |
| 프로모션·세트·구독 | 2 | 캠페인, 세트·구독 선택 |

### 공통 입력값

각 프롬프트의 대괄호 값을 실제 프로젝트 자료로 교체한다.

```text
brandName: [브랜드명]
industryId: [업종 ID]
presetId: [프리셋 ID]
primaryAudience: [핵심 사용자]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
serviceArea: [지역 또는 제공 범위]
primaryConversion: [페이지의 단 하나의 핵심 행동]
realDataAvailable: [실제 보유 데이터와 콘텐츠]
integrationMode: [WordPress, WooCommerce, external booking, external payment 중 적용 항목]
```

### 공통 디자인 규칙

- `docs/DESIGN.md`의 토큰, 타이포그래피, 간격, 반경을 사용한다.
- 밝은 테마 하나와 단색 강조색 하나를 페이지 전체에 유지한다.
- 데스크톱 콘텐츠 폭은 1200px, 좌우 패딩은 40px, 모바일 좌우 패딩은 16px이다.
- 제목은 `Inter Display`, 본문은 `Inter`를 사용한다. 프로젝트의 폰트 기능 설정을 유지한다.
- 카드 반경 8px, 입력과 버튼 반경 6px, 모달 반경 12px을 기본으로 한다.
- 정보가 많은 화면은 카드 남용 대신 그룹, 여백, 한 방향 구분선, 고정 헤더를 사용한다.
- 필드 라벨은 입력 위에 둔다. placeholder를 라벨로 사용하지 않는다.
- 버튼은 한 줄이며 한 의도에는 한 문구만 사용한다.
- 실제 데이터가 없는 가격, 후기, 수치, 인증, 재고, 가능 시간은 만들지 않는다.
- 목록은 로딩, 기본, 필터 적용, 결과 없음, 오류 상태를 포함한다.
- 상세는 정상, 일부 데이터 없음, 관련 항목 없음, 행동 불가 상태를 포함한다.
- 폼은 입력 전, 오류, 제출 중, 완료, 재시도 상태를 포함한다.
- 모바일 터치 영역은 44px 이상이며 키보드 초점과 화면 읽기 순서를 명시한다.
- 움직임은 선택, 전환, 확대, 성공 피드백에만 사용하고 reduced motion 상태를 제공한다.

### 모든 외부 AI가 반환해야 하는 결과

1. 요청한 모든 데스크톱 화면
2. 요청한 모든 모바일 화면
3. 정상 상태와 예외 상태 보드
4. 재사용 컴포넌트와 variant 목록
5. WordPress 또는 WooCommerce 데이터 필드 매핑
6. 이미지와 문서 자산 목록, 비율, 최소 해상도
7. 키보드, 초점, 오류, 대체 텍스트 주석
8. 현재 테마 재사용, 변형, 신규 블록 표시

## 2. 제품·서비스·프로그램 목록 및 상세

### Design Read

Reading this as: a connected catalog and detail system for visitors comparing concrete offerings, with a structured editorial language and evidence-first detail pages.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 목적과 조건에 맞는 항목을 찾고 상세 정보를 확인한 뒤 예약, 상담, 견적 또는 구매로 이동 |
| 대상 | 관광객, 환자, 수강생, B2B 구매자, 웰니스 고객, D2C 구매자 |
| 화면 | `service-catalog`, `offering-single`, `product-catalog`, `product-single` |
| 핵심 전환 | 상세 보기, 비교 담기, 예약·상담·견적·구매 중 업종별 한 행동 |
| 디자인 다이얼 | `DESIGN_VARIANCE 5`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 6` |
| 현재 테마 비교 | training·community 카드와 기본 single은 참고 가능, 필터·상태·제품 메타·상세 구조는 신규 |

### 화면 구성

#### 서비스·프로그램 목록

- 페이지 제목, 한 문장 안내, 전체 항목 수
- 목적, 대상, 기간, 지역, 가격 유형, 가능 상태 필터
- 적용 필터 요약, 초기화, 정렬
- 제목, 대상, 기간, 일정, 담당자, 가격 또는 문의, 상태, 상세 CTA가 있는 결과 항목
- 페이지네이션 또는 더 보기, 검색 결과 없음, 추천 대체 항목

#### 서비스·프로그램 상세

- 제목, 대상, 핵심 가치, 가격 또는 문의 방식, 예약·상담 CTA
- 대상과 적합하지 않은 대상, 포함 내용과 제외 내용
- 일정, 기간, 장소, 정원, 담당자
- 과정, 준비물, 취소·환불, 안전·주의, FAQ
- 관련 후기, 관련 서비스, 담당자 프로필

#### 제품 목록

- 제품군, 적용 산업 또는 사용 목적, 가격, 핵심 사양, 재고 필터
- 목록과 이미지 밀도 전환, 정렬, 비교 선택
- 모델명, 대표 이미지, 핵심 사양 3개, 가격 또는 견적, 재고 또는 공급 상태
- 비교 바, 결과 없음, 단종·대체 모델 표시

#### 제품 상세

- 미디어 갤러리, 제품명·모델, 가격·견적, 옵션, 재고·납기
- 핵심 사양, 적용처, 장점과 제한, 구성품
- 도면, 카탈로그, 인증, 매뉴얼 다운로드
- 관련 사례, 호환 제품, 대체 모델, 문의·구매 CTA

### 필수 상태

- 목록 로딩, 기본, 필터 적용, 결과 없음, 검색 오류
- 서비스 신청 가능, 마감, 대기, 종료
- 제품 재고 있음, 재고 소수, 품절, 단종, 대체 모델 있음
- 비교 선택 없음, 1개 선택, 최대 선택 도달
- 상세 데이터 일부 없음, 문서 없음, 관련 항목 없음, CTA 불가

### 외부 AI 제작 프롬프트

```text
Design Read: Create a connected catalog and detail system for users comparing real products, services, programs, courses, treatments, or experiences. Use structured editorial layouts and evidence-first detail pages.

Create four responsive ModuTheme templates:
1. Service and program catalog
2. Service and program detail
3. Product catalog
4. Product detail

Project inputs:
brandName: [브랜드명]
industryId: [업종 ID]
presetId: [프리셋 ID]
primaryAudience: [핵심 사용자]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [예약, 상담, 견적, 구매 중 하나]
realDataAvailable: [서비스, 제품, 일정, 가격, 사양, 담당자, 문서, 사례 중 실제 데이터]

Design settings:
DESIGN_VARIANCE 5
MOTION_INTENSITY 3
VISUAL_DENSITY 6
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens from docs/DESIGN.md, Inter Display headings, Inter body, 8px cards, 6px controls, one solid accent, and restrained 1px borders.

Service and program catalog:
Include page title, short guidance, result count, keyword search, purpose, audience, duration, region, price type, and availability filters. Show active filters with clear reset and sorting. Each result must include title, audience, duration, schedule, responsible expert, verified price or inquiry label, availability, and detail action. Provide pagination or explicit load more.

Service and program detail:
Include title, audience, concrete outcome, verified price or inquiry method, primary action, suitable and unsuitable audience, included and excluded scope, schedule, duration, place, capacity, responsible expert, process, preparation, cancellation and refund, safety or disclosure, FAQ, related reviews, and related offerings.

Product catalog:
Include product family, use case or industry, verified price, specification, and stock filters. Add sort, view-density control, and compare selection. Each item shows model name, real image, three key specifications, verified price or quote label, stock or supply state, and detail action. Include discontinued and replacement-model treatment.

Product detail:
Create a media gallery, product and model identity, verified price or quote, options, stock or lead time, grouped specifications, applications, benefits and limitations, included items, drawings, catalog, certification, manual downloads, related cases, compatible products, replacement models, and one primary conversion.

Responsive behavior:
On mobile use a filter drawer with active-filter summary, preserve result count and sort, use vertical result rows when metadata matters, and keep a single primary action visible without covering content. Convert grouped specifications to three logical disclosures rather than a long ruled table. Keep file type, size, version, and update date visible.

Required state board:
Show loading, default, active filters, no results, search error, service available, waitlist, closed, ended, product in stock, low stock, sold out, discontinued, replacement available, no compare selection, one selected, maximum selected, missing detail data, no documents, no related items, and unavailable conversion.

Data rules:
Never invent price, stock, schedule, specifications, qualifications, results, reviews, or document versions. Omit unavailable facts or show an editorial empty state. Use realistic Korean interface labels without fabricated commercial claims.

Do not use:
Three equal icon cards, purple gradients, a long table with a divider on every row, fake product renders, text labels over images, excessive pills, hidden exclusions, or multiple primary CTA labels for the same action.

Deliver:
Four 1440px screens, four 390px screens, one complete state board, one shared component inventory, one content-field schema, one asset list, and annotations mapping service-catalog, offering-single, product-catalog, and product-single to WordPress blocks.
```

## 3. 전문가·의료진 개별 상세

### Design Read

Reading this as: a trust-critical profile page for patients and clients, with verified credentials, scope, schedule, and related services presented before conversion.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 담당자의 전문성, 책임 범위, 일정과 관련 서비스를 확인하고 예약 또는 상담 |
| 대상 | 환자, 의뢰인, 수강생, 웰니스 고객, 기관 방문자 |
| 화면 | `profile-single` |
| 핵심 전환 | 이 전문가에게 예약·상담 |
| 디자인 다이얼 | `DESIGN_VARIANCE 4`, `MOTION_INTENSITY 2`, `VISUAL_DENSITY 5` |
| 현재 테마 비교 | `page-people` 프로필 목록과 카드 재사용 가능, 개별 상세와 자격·일정 연결은 신규 |

### 구성요소

- 실제 인물 사진, 이름, 직위, 전문분야, 소속·지점, 언어
- 소개와 진료·업무·교육 철학
- 자격, 학력, 경력, 학회·협회, 인증의 발급처와 날짜
- 제공 범위와 제공하지 않는 범위
- 주간 일정, 다음 가능 시간, 지점, 온라인 가능 여부
- 담당 서비스·프로그램, 관련 사례·콘텐츠, FAQ
- 의료·법률·상담 면책과 예약·상담 CTA

### 필수 상태

- 일정 있음, 일정 미정, 예약 마감, 휴가·부재, 대체 전문가
- 자격 확인 가능, 문서 없음, 유효기간 만료
- 사진 없음, 소개 없음, 관련 서비스 없음
- 예약 가능, 상담만 가능, 온라인 문의만 가능

### 외부 AI 제작 프롬프트

```text
Design Read: Create a trust-critical individual profile page that lets patients, clients, students, or visitors verify expertise, scope, location, and availability before contacting the professional.

Create one responsive ModuTheme profile-single template.

Project inputs:
brandName: [브랜드명]
industryId: [의료, 법률, 교육, 웰니스, 컨설팅 중 하나]
presetId: [프리셋 ID]
profileRole: [의료진, 변호사, 강사, 상담사, 트레이너, 컨설턴트 중 하나]
primaryAudience: [핵심 사용자]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [예약 또는 상담]
realDataAvailable: [사진, 약력, 자격, 일정, 지점, 서비스, 사례, 콘텐츠]

Design settings:
DESIGN_VARIANCE 4
MOTION_INTENSITY 2
VISUAL_DENSITY 5
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, 8px cards, restrained borders, and documentary portrait photography.

Page structure:
1. Profile identity area with real portrait, name, role, verified specialties, organization or branch, languages, and one primary action.
2. Short introduction and professional philosophy without promotional exaggeration.
3. Service scope showing what this person handles and what is excluded.
4. Credentials grouped into license, education, career, association, publication, and certification. Each document needs issuer and date.
5. Weekly schedule with branch, online availability, next available time, closed state, and alternate professional route.
6. Related services or programs with audience, duration, price or inquiry, and availability.
7. Related cases, lectures, articles, or media only when real.
8. Industry disclosure, emergency guidance where relevant, privacy link, and final booking or consultation action.

Responsive behavior:
On mobile show name, role, specialty, location, and primary action within the first viewport. Place the portrait before or beside identity without pushing the action below the fold. Convert the weekly schedule to a day list. Keep license issuer, date, and service exclusions readable without hover. Use a bottom action only after the identity area and remove it before the footer.

Required state board:
Show schedule available, schedule pending, fully booked, leave or unavailable, alternate expert available, credential document available, credential document missing, expired credential, portrait missing, no biography, no related services, booking available, consultation only, and online inquiry only.

Data rules:
Never invent credentials, degrees, associations, experience, publications, availability, case outcomes, or patient reviews. Expired credentials must not appear as active. Medical and legal pages must keep disclaimer content visible.

Do not use:
Oversized quote decoration, fake awards, unsupported years-of-experience counters, generic stock doctors or consultants, decorative medical symbols, three equal credential cards, hidden exclusions, or guaranteed outcome copy.

Deliver:
One 1440px profile screen, one 390px profile screen, one state board, one credential component set, one schedule component set, one portrait shot specification, and WordPress field annotations for profile-single.
```

## 4. 사례·프로젝트 목록 및 상세

### Design Read

Reading this as: an evidence-led portfolio system that helps users find comparable work and understand context, process, result, and limitations without inflated claims.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 유사한 조건의 수행 경험을 찾고 상세 근거를 확인한 뒤 문의·견적으로 이동 |
| 대상 | B2B 구매자, 건축주, 법률 의뢰인, SaaS 담당자, 에이전시 고객 |
| 화면 | `case-archive`, `case-single` |
| 핵심 전환 | 관련 서비스 보기 또는 프로젝트 문의 |
| 디자인 다이얼 | `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 4` |
| 현재 테마 비교 | 앨범 archive·single의 이미지 기반은 재사용 가능, 문제·해결·성과 구조와 필터는 신규 |

### 목록 구성

- 업종, 서비스, 공간, 제품, 지역, 규모, 연도 필터
- 대표 사례 1개, 최근·관련 사례 목록
- 사례 항목의 배경, 과제, 수행 범위, 검증된 결과, 대표 이미지
- 결과 없음, 비공개·익명 사례, 이미지 없는 기술 사례

### 상세 구성

- 제목, 고객·프로젝트 유형, 기간, 범위, 위치, 공개 수준
- 배경, 문제, 제약조건, 목표
- 조사·설계·실행·검수 과정과 산출물
- 전후 또는 과정 갤러리, 도면·문서·수치 근거
- 결과와 한계, 개인정보·기밀·성과 고지
- 관련 서비스, 관련 사례, 문의 CTA

### 필수 상태

- 목록 기본, 필터 적용, 결과 없음, 이미지 없음, 익명 처리
- 사례 상세 공개, 일부 비공개, 수치 없음, 관련 사례 없음
- 미디어 로딩·오류, 전후 이미지 미승인

### 외부 AI 제작 프롬프트

```text
Design Read: Create an evidence-led case and project system that helps users find comparable work and understand context, constraints, process, result, and limitations without inflated claims.

Create two responsive ModuTheme templates:
1. Case and project archive
2. Case and project detail

Project inputs:
brandName: [브랜드명]
industryId: [전문서비스, 제조, 시공, SaaS, 에이전시 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 구매자 또는 의뢰인]
caseMode: [results, visual-project, technical 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [관련 서비스 보기 또는 프로젝트 문의]
realDataAvailable: [사례, 이미지, 과정, 수치, 문서, 후기, 공개 범위]

Design settings:
DESIGN_VARIANCE 7
MOTION_INTENSITY 4
VISUAL_DENSITY 4
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one solid accent, asymmetric image rhythm, 8px cards, and motion only for filters, media transitions, and state feedback.

Archive structure:
Include title, short guidance, result count, keyword search, industry, service, space, product, region, scale, and year filters. Use one featured case and a varied editorial result layout. Every item shows context, challenge, scope, verified result only when supplied, image or technical-document preview, and detail action. Provide explicit anonymous and image-unavailable treatments.

Detail structure:
Include project identity, client or project type, period, scope, place, public level, background, problem, constraints, goals, research, design, execution, inspection, deliverables, process media, drawing or evidence documents, verified results, limitations, confidentiality or outcome disclosure, related service, related cases, and one inquiry action.

Responsive behavior:
On mobile convert the editorial archive to a strict chronological or relevance list. Keep filter summary and reset visible. Place project facts before long narrative. Use swipe only for image galleries with pagination and pause. Keep evidence captions functional and outside images. Do not compress process and result into decorative cards.

Required state board:
Show archive loading, default, active filters, no results, image missing, anonymous case, detail public, partially confidential, no verified metrics, no related cases, media loading, media error, and before-after media not approved.

Data rules:
Never invent client names, logos, project budgets, time savings, ROI, legal results, medical outcomes, performance figures, or testimonials. Mark anonymized facts clearly and show source or reference date for every metric.

Do not use:
Generic masonry with no metadata, fake client logos, unsupported before-and-after claims, huge decorative numbers, three identical project cards, long poetic captions, image labels, or duplicated inquiry CTA wording.

Deliver:
Two 1440px screens, two 390px screens, one state board, one filter component set, one evidence and disclosure component set, one media shot list, and WordPress annotations for case-archive and case-single.
```

## 5. 예약 가능 날짜·시간·정원 선택

### Design Read

Reading this as: a task-focused booking flow where availability, capacity, price, cancellation terms, and the current selection remain visible at every step.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 서비스와 지점·담당자·날짜·시간·인원을 선택하고 예약 요청 완료 |
| 대상 | 관광객, 체험 고객, 미용 고객, 환자, 수강생, 보호자 |
| 화면 | `booking-availability` |
| 핵심 전환 | 예약 접수 완료 |
| 디자인 다이얼 | `DESIGN_VARIANCE 4`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 7` |
| 현재 테마 비교 | 일정·폼 shell은 활용 가능, 실시간 가능 상태와 단계형 선택은 신규 |

### 단계 구성

1. 서비스·프로그램 선택
2. 지점·장소와 담당자 선택
3. 날짜·시간·인원 또는 정원 선택
4. 예약자 정보와 요청사항 입력
5. 선택 요약, 가격·취소 조건·동의 확인
6. 접수 완료, 변경·취소·문의 안내

### 필수 구성요소

- 단계 표시와 이전·다음, 중간 선택 유지
- 달력과 날짜 목록, 시간 슬롯, 정원·잔여 수, 대기 신청
- 시간대, 지점, 담당자, 접근성, 온라인 여부 필터
- 선택 요약, 가격·추가비용, 준비물, 취소·환불, 개인정보 동의
- 예약번호, 처리 상태, 캘린더 추가, 길찾기

### 필수 상태

- 일정 로딩, 날짜 가능, 잔여 소수, 마감, 휴무, 대기
- 담당자 가능, 부재, 지점 변경, 온라인만 가능
- 세션 만료, 중복 선택, 가격 변경, 네트워크 오류
- 폼 오류, 제출 중, 접수 완료, 즉시 확정, 승인 대기

### 외부 AI 제작 프롬프트

```text
Design Read: Create a task-focused booking flow where availability, capacity, price, cancellation terms, and the current selection remain visible at every step.

Create one complete responsive ModuTheme booking-availability flow.

Project inputs:
brandName: [브랜드명]
industryId: [관광, 체험, 미용, 의료, 교육, 웰니스 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 예약자]
bookingMode: [instant-confirmation 또는 request-approval]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realDataAvailable: [서비스, 지점, 담당자, 일정, 정원, 가격, 정책]

Design settings:
DESIGN_VARIANCE 4
MOTION_INTENSITY 3
VISUAL_DENSITY 7
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, 6px controls, 8px summary panels, labels above inputs, and motion only for selection, validation, and step transition.

Flow steps:
1. Select service or program with audience, duration, verified price, and availability.
2. Select branch or place and responsible staff, including accessibility and online option.
3. Select date, time, people, or capacity using both calendar and chronological list views.
4. Enter booker information and optional request notes.
5. Review selection, verified price and additional cost, preparation, cancellation and refund, privacy consent, and final action.
6. Show completion with booking number, instant-confirmed or approval-pending state, change or cancellation path, calendar add, directions, and contact.

Persistent behavior:
Keep a selection summary visible on desktop and accessible through a fixed summary control on mobile. Preserve previous selections when moving back. Announce availability and validation changes to screen readers. Prevent the final action until required choices and consent are complete.

Responsive behavior:
On mobile use a chronological date list as the primary selection and a compact calendar as secondary. Use 44px time slots. Do not make users swipe horizontally to find essential times. Keep price and cancellation terms visible before submission. Ensure the mobile bottom action does not cover error text.

Required state board:
Show schedule loading, available date, low capacity, full, closed, waitlist, staff available, staff unavailable, branch changed, online only, session expired, duplicate selection, price changed, network error, field error, submitting, instant confirmed, approval pending, and booking completed.

Data and safety rules:
Never invent availability, capacity, staff, price, policy, or confirmation status. Medical bookings must show emergency guidance. Child or dependent bookings must show guardian fields only when required. Do not collect unnecessary sensitive data.

Do not use:
Tiny calendar cells, color-only availability, horizontal time carousels without an alternative list, hidden fees, placeholder-only labels, unclear progress bars, a disabled button with no explanation, or success states without change and cancellation guidance.

Deliver:
One full desktop booking flow, one full mobile booking flow, all six step states, one exception-state board, one selection-summary component, one calendar and time-slot component set, and WordPress or external-booking field annotations.
```

## 6. 견적 및 파일 첨부 폼

### Design Read

Reading this as: a high-trust requirements intake for B2B buyers and project owners, with clear scope, safe files, draft recovery, and transparent follow-up.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 수행 가능성을 판단할 수 있는 요구조건과 자료를 구조화해 전달 |
| 대상 | 구매 담당자, 현장 책임자, 건축주, 브랜드 담당자, 창업 예정자 |
| 화면 | `quote-form` |
| 핵심 전환 | 견적 요청 접수 |
| 디자인 다이얼 | `DESIGN_VARIANCE 3`, `MOTION_INTENSITY 2`, `VISUAL_DENSITY 7` |
| 현재 테마 비교 | form shell과 문의 폼 시각 구조는 재사용 가능, 조건부 필드·첨부·임시저장은 신규 |

### 단계와 필드

1. 제품·서비스·프로젝트 유형
2. 수량·면적·사양·적용환경·현장 조건
3. 예산 범위, 희망 일정, 납품·시공 지역
4. 도면·사진·문서 첨부와 파일 설명
5. 회사·기관과 담당자 정보, 선호 연락 방식
6. 선택 요약, 포함·제외 안내, 개인정보 동의, 제출
7. 접수번호, 예상 검토 절차, 추가자료·수정·문의

### 필수 상태

- 조건부 필드 열림·닫힘, 필수값 누락, 값 형식 오류
- 파일 대기, 업로드 중, 성공, 형식 오류, 용량 초과, 중복, 악성 파일 차단, 삭제
- 자동 저장, 임시 저장, 복구, 세션 만료
- 제출 중, 접수 완료, 제출 실패, 대체 이메일·전화

### 외부 AI 제작 프롬프트

```text
Design Read: Create a high-trust quote and requirements intake for B2B buyers and project owners, with clear scope, safe file handling, draft recovery, and transparent follow-up.

Create one complete responsive ModuTheme quote-form flow.

Project inputs:
brandName: [브랜드명]
industryId: [제조, 시공, 건축, 인테리어, 에이전시, 가맹 중 하나]
presetId: [프리셋 ID]
primaryAudience: [구매 담당자 또는 프로젝트 책임자]
quoteMode: [product, construction, agency 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realDataAvailable: [제품군, 서비스, 단위, 지역, 예산 범위, 일정, 파일 정책]

Design settings:
DESIGN_VARIANCE 3
MOTION_INTENSITY 2
VISUAL_DENSITY 7
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, 6px form controls, 8px grouped panels, labels above fields, clear helper and error text, and almost no decorative motion.

Flow steps:
1. Select product, service, or project category.
2. Enter quantity, area, specification, application environment, or site conditions with conditional fields based on quoteMode.
3. Enter budget range, desired schedule, and delivery or construction region.
4. Upload drawing, photo, document, or brief with file description and privacy warning.
5. Enter company or organization and responsible contact, including preferred contact channel and hours.
6. Review all selections, included and excluded scope, site-survey requirement, estimate validity, privacy consent, and submit.
7. Show receipt number, expected review process, additional-file route, edit request, and contact options.

File uploader:
Support browse and drag-drop without requiring drag. Show allowed types, maximum file size, file name, type, size, progress, success, format error, size error, duplicate, security rejection, retry, and delete. Never expose a local file path. Announce progress and errors accessibly.

Draft behavior:
Show automatic save, manual draft save, restored draft, session expiry, and safe restart. Keep a desktop summary panel and a mobile summary disclosure. Preserve values when navigating backward.

Responsive behavior:
On mobile use one field group per view, 44px controls, numeric keyboards where appropriate, and a visible save state. Do not hide included and excluded scope. Keep upload errors adjacent to the affected file. Prevent the bottom action from covering helper or error text.

Required state board:
Show conditional field closed and open, required missing, invalid value, file waiting, uploading, success, wrong type, too large, duplicate, security rejection, removed, auto-saved, draft saved, draft restored, session expired, submitting, completed, failed, and alternate email or phone route.

Data and safety rules:
Never invent accepted file rules, price, response time, delivery promise, or security claim. Collect only information required for a quote. Explain sensitive drawing and document handling before upload.

Do not use:
Placeholder-only labels, one giant unstructured form, decorative progress animation, hidden file restrictions, silent upload failure, vague consent, an unexplained disabled submit button, or completion without receipt and next-step guidance.

Deliver:
One full desktop quote flow, one full mobile quote flow, all seven step states, one complete file-state board, one conditional-field map, one data schema, and WordPress form or external CRM handoff annotations.
```

## 7. 자가진단과 결과 화면

### Design Read

Reading this as: a calm guided assessment that explains why each question matters, protects sensitive answers, and turns results into transparent next actions rather than diagnosis claims.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 사용자의 상태·목표·조건을 구조화하고 적합한 유형이나 서비스 추천 |
| 대상 | 웰니스 고객, 상담 고객, 교육 수강생, 창업자, SaaS 도입 담당자 |
| 화면 | `self-assessment`, `assessment-result` |
| 핵심 전환 | 진단 완료 후 추천 서비스 확인·상담 |
| 디자인 다이얼 | `DESIGN_VARIANCE 4`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 6` |
| 현재 테마 비교 | 단계형 질문·점수·조건부 결과 UI가 없어 전체 신규 |

### 질문 화면 구성

- 진단 목적, 예상 문항 수·시간, 개인정보·면책
- 현재 문항 번호, 전체 문항 수, 섹션명
- 단일 선택, 복수 선택, 범위, 숫자, 짧은 입력, 조건부 질문
- 답변 이유와 모름·건너뛰기 조건
- 이전·다음, 자동 저장, 중단·복귀
- 긴급·고위험 답변의 즉시 안내와 진단 중단 경로

### 결과 화면 구성

- 결과 유형 또는 점수 범위, 쉬운 설명, 기준일·산정 방식
- 결과에 영향을 준 응답, 강점, 주의 항목, 불확실성
- 추천 서비스·프로그램·상품과 추천 이유
- 권장하지 않는 선택, 긴급 안내, 면책
- 결과 저장·인쇄·삭제, 다시 진단, 상담 CTA

### 필수 상태

- 시작 전, 진행, 답변 오류, 조건부 질문, 중간 저장, 복귀, 세션 만료
- 위험 답변 감지, 즉시 안내, 외부 지원 연결
- 결과 계산 중, 결과 있음, 정보 부족, 결과 불가, 추천 없음
- 결과 저장, 삭제 확인, 공유 제한

### 외부 AI 제작 프롬프트

```text
Design Read: Create a calm guided assessment that explains why each question matters, protects sensitive answers, and turns results into transparent next actions rather than diagnosis claims.

Create two responsive ModuTheme templates:
1. Self-assessment question flow
2. Assessment result

Project inputs:
brandName: [브랜드명]
industryId: [웰니스, 상담, 교육, 창업지원, SaaS 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 사용자]
resultMode: [score, type, recommendation 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realDataAvailable: [문항, 분기, 점수 규칙, 결과 유형, 추천, 면책, 긴급 안내]

Design settings:
DESIGN_VARIANCE 4
MOTION_INTENSITY 4
VISUAL_DENSITY 6
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, 6px controls, 8px question panels, and motion only for question transition, conditional reveal, save feedback, and result transition.

Assessment start:
Explain purpose, expected question count and time, what data is stored, retention or deletion, disclaimer, and what the result can and cannot mean. Provide one action to start.

Question flow:
Show current question number, total question count, section name, question, reason or helper when needed, answer controls, previous, next, save state, pause, and exit. Support single choice, multiple choice, range, number, short text, unknown, and allowed skip. Use text such as 3 of 8 for progress rather than a decorative filled progress track. Conditional questions must appear without losing previous answers.

Safety behavior:
If a supplied answer triggers urgent or high-risk guidance, interrupt the normal flow with clear support information, emergency limitations, and a safe exit. Do not represent the flow as medical, legal, or financial diagnosis unless the supplied service is legally authorized.

Result page:
Show result type or score range, plain-language explanation, calculation method and reference date, answers that influenced the result, strengths, caution areas, uncertainty, recommended services or products with reasons, choices not recommended, disclaimer, urgent guidance where relevant, save, print, delete, retake, and one consultation or conversion action.

Responsive behavior:
On mobile show one question at a time with 44px answer controls, persistent text progress, visible previous and next, and no horizontal swiping requirement. Keep privacy and urgent guidance in reading order. Result evidence must appear before recommended products or services.

Required state board:
Show before start, in progress, unanswered required question, invalid answer, conditional question, auto-saved, paused, resumed, session expired, urgent answer detected, external support route, calculating, result available, insufficient information, calculation unavailable, no recommendation, result saved, delete confirmation, and sharing restricted.

Data and ethics rules:
Never invent scoring logic, thresholds, clinical meaning, eligibility, service suitability, or emergency contact. Show the supplied method, source, and disclaimer. Allow users to delete or restart sensitive answers when the integration supports it.

Do not use:
Gamified confetti for sensitive results, diagnostic certainty, red alarm screens without guidance, filled score bars as decoration, opaque recommendations, forced email capture before results, hidden privacy terms, or a result page that places sales before explanation.

Deliver:
Two 1440px screens, two 390px screens, all question-control variants, one complete safety and state board, one branching map, one result evidence component set, and WordPress or assessment-engine field annotations.
```

## 8. 제품·서비스·패키지 비교

### Design Read

Reading this as: a dense decision page that makes meaningful differences, units, exclusions, and recommendation logic visible without forcing a wide desktop table onto mobile.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 2개에서 4개의 제품·서비스·패키지를 같은 기준으로 비교하고 선택 |
| 대상 | 제품 구매자, 서비스 상담 고객, SaaS 담당자, 수강생, 부동산 검토자 |
| 화면 | `comparison-page` |
| 핵심 전환 | 선택 항목 상세 보기·구매·상담 |
| 디자인 다이얼 | `DESIGN_VARIANCE 3`, `MOTION_INTENSITY 2`, `VISUAL_DENSITY 8` |
| 현재 테마 비교 | 기본 표·카드는 있으나 선택형 비교와 모바일 변환은 신규 |

### 구성요소

- 비교 항목 검색·선택, 최대 선택 수, 선택 교체·삭제
- 대표 이미지·이름·가격·상태·1차 CTA가 있는 고정 비교 헤더
- 기본, 대상, 포함, 성능·사양, 일정, 가격, 정책 그룹
- 값, 단위, 기준일, 출처, 해당 없음, 문의 필요
- 차이만 보기, 추천 기준, 추천 이유, 상세 보기
- 모바일 기준 항목 고정과 비교 대상 전환

### 필수 상태

- 선택 없음, 1개 선택, 2개 이상, 최대 도달, 중복 선택
- 속성 값 있음, 없음, 해당 없음, 문의 필요, 단위 다름
- 가격 변경, 재고·마감, 추천 불가, 비교 링크 만료

### 외부 AI 제작 프롬프트

```text
Design Read: Create a dense decision page that makes meaningful differences, units, exclusions, and recommendation logic visible without shrinking a wide desktop table onto mobile.

Create one responsive ModuTheme comparison-page template.

Project inputs:
brandName: [브랜드명]
industryId: [제조, D2C, 전문서비스, SaaS, 교육, 부동산 중 하나]
presetId: [프리셋 ID]
comparisonMode: [product, service, package, plan, floor-plan 중 하나]
primaryAudience: [핵심 비교 사용자]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [상세 보기, 구매, 상담 중 하나]
realDataAvailable: [비교 항목, 속성, 단위, 가격, 상태, 추천 규칙]

Design settings:
DESIGN_VARIANCE 3
MOTION_INTENSITY 2
VISUAL_DENSITY 8
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, compact typography, sparse dividers, almost no card containers, and no decorative motion.

Comparison selection:
Allow search and selection of two to four items. Show maximum selection, duplicate prevention, replace, remove, and clear all. Keep selection order stable.

Desktop comparison:
Create a sticky comparison header with image, name, verified price or inquiry label, availability, and one consistent primary action. Group attributes into overview, audience, included scope, performance or specification, schedule, price, warranty or policy, and exclusions. Every value must show its unit and reference date when applicable. Support available value, missing value, not applicable, and inquiry required.

Decision support:
Add show differences only, grouped disclosures, recommendation criteria, transparent recommendation reason, and related detail links. Do not use filled scoring bars. Use text, numbers, check states, and short evidence notes.

Mobile comparison:
Do not render a compressed multi-column table. Let the user choose one baseline item and switch the comparison target while attribute labels remain fixed. Provide a second mode that stacks each item as a full comparison card with the same attribute order. Keep price, exclusions, and primary action visible.

Required state board:
Show no selection, one selected, valid comparison, maximum reached, duplicate attempt, item removed, value available, value missing, not applicable, inquiry required, unit mismatch, price changed, sold out or closed, recommendation unavailable, and expired shared comparison link.

Data rules:
Never invent specifications, prices, discounts, performance, recommendation scores, or policy differences. Do not compare values with incompatible units without an explicit conversion source. Keep exclusions as visible as included benefits.

Do not use:
Tiny desktop tables on mobile, a divider on every row, color-only winners, filled score tracks, fake best-choice badges, hidden exclusions, inconsistent attribute order, or four different CTA labels with the same intent.

Deliver:
One 1440px comparison screen, two 390px mobile comparison modes, one complete state board, one attribute schema, one sticky-header component, one selection component, and WordPress or commerce data mapping annotations.
```

## 9. 후기·UGC 및 전후 비교

### Design Read

Reading this as: a moderated evidence gallery that preserves reviewer context, consent, service conditions, and the limits of before-and-after media.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 실제 이용 맥락과 승인된 미디어를 탐색하고 유사 조건을 확인 |
| 대상 | 관광·미용·웰니스·교육·D2C·시공 고객 |
| 화면 | `review-archive`, `before-after` |
| 핵심 전환 | 관련 서비스·상품 상세 또는 예약·구매 |
| 디자인 다이얼 | `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 5` |
| 현재 테마 비교 | 앨범 갤러리는 활용 가능, 후기 메타·승인·전후 고지는 신규 |

### 후기·UGC 목록 구성

- 서비스·상품, 담당자, 지점, 방문·구매 시기, 미디어 유형 필터
- 검증된 구매·이용 여부와 승인 상태
- 후기 본문 3줄 이하, 작성자 맥락, 옵션·이용 기간, 이미지·영상
- 평점 분포는 실제 데이터가 있을 때만 제공
- 신고, 접근 가능한 영상 자막, 결과 없음

### 전후 비교 구성

- 동일 각도·조명 여부, 촬영 시점, 기간, 제공 서비스·제품
- 드래그 비교와 나란히 보기 대체 방식
- 결과에 영향을 준 조건, 개인차·효과·개인정보 고지
- 미디어 동의·편집 여부·승인 상태
- 관련 서비스·사례·CTA

### 필수 상태

- 후기 기본, 필터, 결과 없음, 미디어 없음, 검증됨, 검증 안 됨
- 승인 대기, 비공개, 신고됨, 삭제됨
- 전후 이미지 있음, 한쪽 없음, 촬영 조건 다름, 비교 미승인
- 영상 로딩, 자막 없음, 재생 오류

### 외부 AI 제작 프롬프트

```text
Design Read: Create a moderated review and evidence gallery that preserves reviewer context, consent, service conditions, and the limits of before-and-after media.

Create two responsive ModuTheme templates:
1. Review and UGC archive
2. Before-and-after detail

Project inputs:
brandName: [브랜드명]
industryId: [관광, 미용, 웰니스, 교육, D2C, 시공 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 사용자]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [관련 서비스 보기, 예약, 구매 중 하나]
realDataAvailable: [후기, 평점, 검증 상태, 미디어, 동의, 전후 조건]

Design settings:
DESIGN_VARIANCE 6
MOTION_INTENSITY 4
VISUAL_DENSITY 5
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, varied editorial media sizes, 8px media cards, and motion only for filters, playback, and before-after control.

Review and UGC archive:
Include title, guidance, result count, service or product, expert, branch, visit or purchase period, media type, and verified-use filters. Each item includes review text limited to three lines, reviewer context, service or product, option, use duration, verified state, approved media, consent state, and detail action. Show rating distribution only when real sample size and values are supplied. Include report action and accessible video captions.

Before-and-after detail:
Show the same-angle and lighting condition, capture date, elapsed period, service or product used, relevant conditions, edit disclosure, consent, and approval. Provide both a drag comparison and a side-by-side keyboard-accessible alternative. Explain individual variation, result limitations, privacy treatment, related service, related case, and one primary action.

Responsive behavior:
On mobile use one media item per row and keep reviewer context next to the review. Do not autoplay video. Make the before-after handle at least 44px and provide buttons for before, split, and after views. Never rely on a hover-only caption.

Required state board:
Show archive loading, default, active filter, no results, no media, verified, unverified, approval pending, private, reported, removed, both comparison images available, one image missing, capture conditions differ, comparison unapproved, video loading, missing captions, and playback error.

Data and ethics rules:
Never invent reviews, ratings, identities, verified status, outcomes, or consent. Hide personal information according to supplied permission. Beauty, fitness, wellness, medical, and construction results need condition and limitation context.

Do not use:
Fake five-star reviews, anonymous initials presented as proof, auto-playing UGC, decorative quotation marks, outcome guarantees, unlabeled retouching, image-overlay pills, a slider without keyboard fallback, or rating emphasis without sample context.

Deliver:
Two 1440px screens, two 390px screens, one moderation and state board, one review-card component set, one accessible before-after control, one consent and disclosure component, and WordPress field annotations for review-archive and before-after.
```

## 10. 지점·매장·캠퍼스 찾기

### Design Read

Reading this as: a high-density place finder where search, filters, list, map, operating state, and accessible arrival information stay synchronized.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 가까운 지점과 필요한 서비스·시설을 찾고 상세·길찾기·예약으로 이동 |
| 대상 | 환자, 매장 고객, 수강생, 웰니스 고객, 교회·기관 방문자 |
| 화면 | `branch-locator` |
| 핵심 전환 | 지점 선택 후 길찾기·예약·문의 |
| 디자인 다이얼 | `DESIGN_VARIANCE 3`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 8` |
| 현재 테마 비교 | 단일 위치 페이지 재사용 가능, 다지점 검색·지도 동기화는 신규 |

### 구성요소

- 지역·주소·역·지점명 검색과 현재 위치
- 지역, 서비스, 운영 상태, 주차, 접근성, 담당자 필터
- 목록·지도 동기화, 결과 수, 거리·소요시간·운영시간
- 지점 상세 패널, 주소, 전화, 서비스, 담당자, 편의시설, 입구 사진
- 길찾기, 예약, 전화, 상세 CTA

### 필수 상태

- 위치 권한 요청·허용·거부·위치 실패
- 검색 기본, 결과, 없음, 반경 확대, 필터 오류
- 영업 중, 곧 종료, 휴무, 임시 변경, 예약 전용
- 지도 로딩·오류, 목록만 사용, 외부 지도 이동

### 외부 AI 제작 프롬프트

```text
Design Read: Create a high-density place finder where search, filters, list, map, operating state, and accessible arrival information remain synchronized.

Create one responsive ModuTheme branch-locator template.

Project inputs:
brandName: [브랜드명]
industryId: [의료, 매장, 교육, 웰니스, 교회, 기관 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 방문자]
locationMode: [branch, store, campus 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [길찾기, 예약, 문의 중 하나]
realDataAvailable: [지점, 좌표, 운영시간, 서비스, 담당자, 주차, 접근성, 사진]

Design settings:
DESIGN_VARIANCE 3
MOTION_INTENSITY 3
VISUAL_DENSITY 8
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, compact list rows, sparse dividers, and motion only for list-map synchronization and panel transition.

Desktop layout:
Create a search and filter header above a synchronized two-panel layout. Use a result list on the left and map on the right. Search by region, address, station, or branch name. Filter by region, service, open state, parking, accessibility, and responsible expert. Each result shows name, distance or travel time when available, open state, today hours, address, key services, accessibility, and one consistent action.

Branch detail panel:
Include address, phone, operating hours, temporary changes, available services, responsible experts, parking, transit, wheelchair access, family facilities, entrance photo, directions, reservation, call, and full detail.

Mobile layout:
Use the result list as the default view and map as an explicit secondary tab. Keep active filters, result count, and reset visible. Opening a result should show a bottom sheet that does not cover map controls or focus. Make call, directions, and reservation separate and clearly labeled.

Required state board:
Show location permission request, allowed, denied, location unavailable, search default, results, no results, expand radius, filter error, open, closing soon, closed, temporary change, appointment only, map loading, map error, list-only fallback, and external-map transition.

Data and accessibility rules:
Never invent distance, travel time, hours, accessibility, services, or live open state. Every map result must exist in the accessible list. Do not use color alone for open and closed. Preserve keyboard focus between list and map selections.

Do not use:
A decorative full-screen map with no list, tiny unlabeled pins, color-only status, hidden phone numbers, hover-only branch detail, auto-requested location permission before explanation, or a mobile map that blocks search and filters.

Deliver:
One 1440px synchronized locator, one 390px list view, one 390px map view, one branch detail sheet, one complete permission and error board, one marker and list-row component set, and WordPress or map-provider field annotations.
```

## 11. 추천 코스·주변 지도

### Design Read

Reading this as: a place-focused itinerary page that connects ordered stops, real travel time, current operating information, and nearby alternatives without turning the map into decoration.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 추천 코스의 순서·거리·시간과 주변 장소를 이해하고 방문 계획 저장 |
| 대상 | 관광객, 숙박객, 지역 방문자, 부동산 검토자 |
| 화면 | `route-nearby` |
| 핵심 전환 | 코스 저장·길찾기·예약 |
| 디자인 다이얼 | `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 6` |
| 현재 테마 비교 | 위치 페이지는 활용 가능, 경로·정류점·주변 필터는 신규 |

### 구성요소

- 코스 제목, 대상, 총 시간·거리, 이동 방식, 난이도·접근성
- 순서가 있는 장소, 체류 시간, 운영시간, 예약, 비용, 주의
- 지도 경로와 목록 동기화, 출발점·도착점·대체 경로
- 음식, 문화, 자연, 주차, 화장실, 의료, 편의 주변 필터
- 일정 변경, 장소 휴무, 우회, 오프라인 안내
- 저장, 공유, 인쇄, 외부 길찾기

### 필수 상태

- 경로 로딩, 정상, 일부 구간 불가, 우회, 오프라인
- 장소 영업 중, 휴무, 임시 변경, 예약 필요, 정보 미확인
- 위치 권한 거부, 지도 오류, 목록만 보기
- 코스 저장, 저장 실패, 공유 링크 만료

### 외부 AI 제작 프롬프트

```text
Design Read: Create a place-focused itinerary page that connects ordered stops, real travel time, current operating information, and nearby alternatives without using the map as decoration.

Create one responsive ModuTheme route-nearby template.

Project inputs:
brandName: [브랜드명 또는 지역명]
industryId: [관광, 숙박, 문화, 부동산 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 방문자]
routeMode: [walking, driving, transit, mixed 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [코스 저장, 길찾기, 예약 중 하나]
realDataAvailable: [장소, 좌표, 순서, 거리, 시간, 운영, 예약, 접근성]

Design settings:
DESIGN_VARIANCE 6
MOTION_INTENSITY 4
VISUAL_DENSITY 6
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, real place imagery, 8px panels, and motion only for active-stop transition, route update, and save feedback.

Page structure:
1. Route identity with audience, verified total time and distance, transport mode, difficulty, accessibility, and one primary action.
2. Synchronized ordered stop list and route map with start, end, travel segment, and active stop.
3. Each stop includes place name, real image, recommended stay, verified hours, reservation need, price or free state, accessibility, contact, and caution.
4. Nearby filters for food, culture, nature, parking, restroom, medical, and convenience. Show distance and detour only when supplied.
5. Route conditions including closure, temporary change, unavailable segment, detour, and offline guidance.
6. Save, share, print, external navigation, related experiences, and one booking action when relevant.

Responsive behavior:
On mobile use the ordered stop list first and a map tab second. Keep the active stop and next segment visible. Do not require map gestures to read the itinerary. Provide a compact offline summary with addresses and contacts. Use 44px map controls and an accessible stop list.

Required state board:
Show route loading, normal route, partial segment unavailable, detour, offline, place open, closed, temporary change, reservation required, information unverified, location permission denied, map error, list-only fallback, saved, save failed, and expired shared link.

Data rules:
Never invent distance, time, hours, fare, accessibility, closure, or detour. Mark estimated and live values separately. When current information is unavailable, show last updated date and a verification action.

Do not use:
Decorative route lines without data, unlabeled map markers, tourism stock collages, weather decoration without a real service, hidden accessibility notes, a route that exists only on the map, or fabricated nearby benefits.

Deliver:
One 1440px itinerary and map screen, one 390px itinerary view, one 390px map view, one active-stop panel, one complete route-state board, one place asset list, and map and WordPress data annotations.
```

## 12. 평면·타입 뷰어

### Design Read

Reading this as: a technical floor-plan viewer that makes dimensions, orientation, options, room relationships, and type differences understandable without relying on image zoom alone.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 평면과 타입의 공간 구성·면적·옵션을 확인하고 비교·문의 |
| 대상 | 분양 고객, 건축주, 상업시설 입점 검토자, 숙박·공간 예약자 |
| 화면 | `floor-plan-viewer` |
| 핵심 전환 | 타입 비교·관심고객 등록·상담 |
| 디자인 다이얼 | `DESIGN_VARIANCE 4`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 8` |
| 현재 테마 비교 | 이미지 갤러리는 활용 가능, 도면 확대·핫스폿·타입 비교는 신규 |

### 구성요소

- 타입명, 공급·전용 면적, 방·공간 수, 방향, 층·위치, 상태
- 고해상도 평면도, 확대·축소·이동·원점 복귀, 전체 화면
- 공간별 핫스폿, 치수, 가구·설비, 수납, 동선
- 기본·확장·유상 옵션과 변경되는 영역
- 면적 단위 전환, 범례, 축척·비례 고지
- 타입 비교, 다운로드, 갤러리, 문의 CTA
- 화면 읽기 사용자를 위한 공간 목록과 치수 텍스트 대체

### 필수 상태

- 도면 로딩, 정상, 저해상도, 파일 없음, 로딩 오류
- 확대·이동, 핫스폿 선택, 전체 화면, 원점 복귀
- 기본 옵션, 확장 옵션, 유상 옵션, 옵션 정보 없음
- 타입 판매·신청 가능, 마감, 정보 변경, 비교 최대 도달

### 외부 AI 제작 프롬프트

```text
Design Read: Create a technical floor-plan viewer that makes dimensions, orientation, options, room relationships, and type differences understandable without relying on image zoom alone.

Create one responsive ModuTheme floor-plan-viewer template.

Project inputs:
brandName: [사업 또는 공간 이름]
industryId: [주거 분양, 상업시설, 건축, 숙박, 공간대여 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 검토자]
floorPlanMode: [residential, commercial, hospitality 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [타입 비교, 관심고객 등록, 상담 중 하나]
realDataAvailable: [도면, 면적, 치수, 방향, 공간, 옵션, 상태, 갤러리]

Design settings:
DESIGN_VARIANCE 4
MOTION_INTENSITY 3
VISUAL_DENSITY 8
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, compact technical metadata, 6px controls, 8px panels, and motion only for zoom, pan, hotspot, option, and type transition.

Page structure:
1. Type identity with type name, verified supply and exclusive area, room or space count, direction, floor or location, current state, and one primary action.
2. High-resolution plan viewer with zoom in, zoom out, pan, reset, full screen, keyboard controls, and current zoom text.
3. Room hotspots showing name, dimensions, storage, equipment, accessibility, and functional notes.
4. Option control for base, expanded, and paid options. Clearly highlight which area changes and what the option includes.
5. Unit switch for square meters and local area unit only when verified conversion is supplied. Include legend, scale limitation, and drawing-update date.
6. Text alternative listing every room, dimension, connection, and option for users who cannot use the visual plan.
7. Related photos, comparable types, download, compare, registration, and consultation.

Responsive behavior:
On mobile put type facts above the viewer. Use large zoom controls and a dedicated full-screen viewer. Do not require precise pinch gestures; provide buttons and reset. Show hotspot details as an accessible sheet and preserve focus on close. Provide the complete text alternative directly below the viewer.

Required state board:
Show plan loading, ready, low resolution, file missing, load error, zoomed, panned, hotspot active, full screen, reset, base option, expanded option, paid option, option unavailable, type available, closed, information changed, no comparison selection, and maximum comparison reached.

Data rules:
Never invent dimensions, area, orientation, room count, option price, availability, or scale. Mark conceptual furniture and dimensions clearly. Show the drawing version and update date when supplied.

Do not use:
A plan image without text alternative, tiny zoom controls, hover-only hotspots, unlabeled option changes, decorative 3D renders presented as measured plans, hidden scale limitations, or a mobile viewer that depends only on pinch gestures.

Deliver:
One 1440px viewer, one 390px page, one 390px full-screen viewer, one hotspot and option component set, one complete plan-state board, one accessible text schema, and WordPress field annotations for floor-plan-viewer.
```

## 13. 인증·특허 라이브러리

### Design Read

Reading this as: an authoritative document library where type, issuer, validity, scope, linked product, and superseded status matter more than decorative certificate thumbnails.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 인증·특허·면허·자격의 유효성과 적용 범위를 검증 |
| 대상 | B2B 구매자, 환자, 의뢰인, 기관 담당자, 파트너 |
| 화면 | `certification-library` |
| 핵심 전환 | 문서 확인·관련 제품·담당자·문의 |
| 디자인 다이얼 | `DESIGN_VARIANCE 3`, `MOTION_INTENSITY 2`, `VISUAL_DENSITY 7` |
| 현재 테마 비교 | 자료실 목록은 변형 가능, 신뢰 문서 메타와 유효 상태는 신규 |

### 구성요소

- 종류, 발급·등록기관, 상태, 연도, 제품·서비스, 국가 필터
- 문서명, 번호, 발급처, 발급일·유효일, 적용 범위, 상태
- 원문·검증 링크, 미리보기, 다운로드, 관련 제품·전문가
- 유효, 만료 임박, 만료, 갱신 중, 대체 문서, 철회 상태
- 문서 버전, 개인정보·번호 마스킹, 결과 없음

### 필수 상태

- 목록 로딩, 기본, 필터, 결과 없음, 검색 오류
- 문서 유효, 만료 임박, 만료, 갱신 중, 철회, 대체됨
- 미리보기 가능, 제한, 파일 없음, 다운로드 오류, 외부 검증 이동

### 외부 AI 제작 프롬프트

```text
Design Read: Create an authoritative credential library where type, issuer, validity, scope, linked product, and superseded status matter more than decorative certificate thumbnails.

Create one responsive ModuTheme certification-library template.

Project inputs:
brandName: [브랜드 또는 기관명]
industryId: [제조, 의료, 전문서비스, 교육, 기관 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 검증 사용자]
credentialTypes: [인증, 특허, 면허, 자격, 수상 중 실제 제공 유형]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
primaryConversion: [문서 확인, 관련 제품 보기, 문의 중 하나]
realDataAvailable: [문서명, 번호, 발급처, 날짜, 범위, 상태, 파일, 검증 링크]

Design settings:
DESIGN_VARIANCE 3
MOTION_INTENSITY 2
VISUAL_DENSITY 7
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, compact document rows, sparse dividers, 8px preview panels, and almost no decorative motion.

Library structure:
Include keyword search and filters for type, issuer or registration authority, active state, year, linked product or service, and country. Show result count, active filters, reset, and sort by relevance, newest, or expiry.

Document item:
Show document title, type, number with required masking, issuer, issue date, expiry date, applicable scope, linked product or expert, language, file type, file size, document version, update date, current state, preview, download, and official verification link.

Document states:
Create clear text treatment for valid, expiring soon, expired, renewal pending, revoked, and superseded. A superseded document must link to its replacement. Expired and revoked documents must never appear as current proof.

Responsive behavior:
On mobile use document rows rather than thumbnail cards. Keep issuer, status, expiry, scope, and verification visible before preview. Open preview in an accessible full-screen sheet with close focus return. Do not require PDF zoom to read core metadata.

Required state board:
Show list loading, default, active filters, no results, search error, valid, expiring soon, expired, renewal pending, revoked, superseded, preview available, preview restricted, file missing, download error, and external verification transition.

Data and legal rules:
Never invent certificate names, patent numbers, authorities, validity, awards, or scope. Distinguish organization credentials, product certifications, and individual qualifications. Mask personal or sensitive document numbers according to supplied rules.

Do not use:
Decorative gold seals, fake framed certificates, expired proof styled as active, thumbnail-only lists, hidden issuer or validity, invented award badges, or download actions without file metadata.

Deliver:
One 1440px library, one 390px library, one document preview, one complete credential-state board, one filter and metadata component set, one document schema, and WordPress field annotations for certification-library.
```

## 14. 상품·장바구니·결제·계정

### Design Read

Reading this as: a complete trust-first commerce journey where product evidence, option and stock clarity, totals, payment recovery, and post-purchase control stay consistent.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 상품 탐색부터 주문·배송·구독 관리까지 끊기지 않는 구매 경험 제공 |
| 대상 | D2C 구매자, 식품 구매자, 구독 고객, 선물 구매자 |
| 화면 | `commerce-archive`, `commerce-single`, `commerce-cart`, `commerce-checkout`, `commerce-account` |
| 핵심 전환 | 주문 완료와 주문·구독 관리 |
| 디자인 다이얼 | `DESIGN_VARIANCE 5`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 7` |
| 현재 테마 비교 | 로그인 화면만 일부 활용 가능, WooCommerce 화면군은 전체 신규 |

### 상품 목록과 상세

- 검색, 카테고리, 목적, 가격, 옵션, 재고, 배송, 구독 필터
- 상품명, 실제 이미지, 가격, 옵션, 재고, 리뷰 수, 프로모션 상태
- 상세 미디어, 옵션, 수량, 재고, 배송 예상, 성분·소재, 사용법, 정책
- 관련 상품, 세트·구독, 장바구니 피드백

### 장바구니

- 상품·옵션·수량 수정, 삭제, 나중에 구매
- 재고·가격 변경, 쿠폰, 배송비·무료배송 조건
- 상품금액, 할인, 배송, 세금, 최종 합계
- 비어 있음, 일부 품절, 오류 복구

### 결제

- 비회원·회원, 주문자, 배송지, 배송 방식, 결제 방식
- 쿠폰·포인트, 현금영수증·세금계산서 조건, 약관·개인정보
- 주문 요약, 반복 결제 조건, 오류, 중복 결제 방지, 완료

### 계정

- 주문 목록·상세, 배송 추적, 교환·반품·취소
- 주소, 프로필, 결제수단 표시 범위, 다운로드
- 구독 주기·다음 결제·일시정지·변경·해지

### 필수 상태

- 재고 있음·소수·품절·판매 종료·재입고 알림
- 장바구니 비어 있음, 가격 변경, 재고 변경, 쿠폰 성공·실패
- 주소 오류, 배송 불가, 결제 중, 인증, 실패, 중복 방지, 완료
- 주문 접수·결제 완료·배송 준비·배송 중·완료·취소·반품
- 구독 활성·일시정지·결제 실패·해지 예정·종료

### 외부 AI 제작 프롬프트

```text
Design Read: Create a complete trust-first commerce journey where product evidence, option and stock clarity, totals, payment recovery, and post-purchase control remain consistent.

Create five responsive ModuTheme and WooCommerce templates:
1. Product archive
2. Product detail
3. Cart
4. Checkout
5. Customer account

Project inputs:
brandName: [브랜드명]
industryId: [뷰티, 식품, 리빙, 패션, 친환경, 반려동물, 공예, 구독 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 구매자]
commerceMode: [one-time, subscription, mixed 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realDataAvailable: [상품, 가격, 옵션, 재고, 배송, 세금, 쿠폰, 정책, 주문, 구독]

Design settings:
DESIGN_VARIANCE 5
MOTION_INTENSITY 4
VISUAL_DENSITY 7
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, 8px product panels, 6px controls, restrained borders, and motion only for option selection, cart feedback, checkout transition, and account status.

Product archive:
Include search, category, purpose, verified price, option, stock, delivery, and subscription filters. Show active filters, result count, sorting, and product rows or cards with real image, name, verified price, option count, stock, review count only when real, promotion dates, and detail action.

Product detail:
Include real media gallery, product identity, verified price, option, quantity, stock, delivery estimate, subscription choice, ingredients or materials, origin when required, use and care, allergy or safety, returns, verified reviews, related products, bundle, and add-to-cart. Keep recurring-payment terms beside the subscription option.

Cart:
Support option and quantity changes, removal, save for later, stock and price changes, coupon entry, coupon success and error, shipping fee and threshold, item amount, discount, shipping, tax, and final total. Clearly separate unavailable items and provide recovery actions.

Checkout:
Support guest and member checkout, customer, address, delivery method, payment method, coupon or points, receipt or tax-document conditions, order summary, recurring-payment terms, privacy, terms, payment processing, authentication, failure, retry, duplicate-payment prevention, and completion.

Customer account:
Include order list and detail, payment state, shipment tracking, cancellation, exchange, return, addresses, profile, permitted payment-method display, downloads, subscription cycle, next payment, pause, change, cancel, payment failure, and support.

Responsive behavior:
On mobile keep product image, name, price, stock, option, and primary action visible without hiding delivery terms. Use a full cart summary before checkout. Keep final total and recurring terms visible before payment. Never cover payment errors with a bottom action. Account status and next action must be readable without opening each item.

Required state board:
Show in stock, low stock, sold out, sale ended, restock requested, option unavailable, cart empty, add success, price changed, stock changed, coupon success, coupon error, shipping unavailable, address error, payment processing, authentication, payment failed, retry, duplicate prevented, order completed, order received, preparing, shipped, delivered, canceled, returned, subscription active, paused, payment failed, cancel scheduled, and ended.

Data and payment rules:
Never invent price, discount, stock, delivery, tax, review, ingredient, origin, subscription saving, or order status. Show exact recurring amount, interval, next payment, pause and cancellation terms before payment. Do not store or display full payment credentials.

Do not use:
Fake countdowns, hidden subscription terms, surprise shipping fees, silent stock changes, vague totals, auto-selected paid options, disabled payment without explanation, success without order reference, or account cancellation hidden behind support contact.

Deliver:
Five 1440px screens, five 390px screens, one full commerce state board, one shared product and money component set, one checkout validation map, one account status model, and WooCommerce template and field annotations.
```

## 15. 목적별 상품 추천

### Design Read

Reading this as: an explainable product recommender that asks only useful questions, keeps answers editable, and shows why each result matches without pretending to diagnose the user.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 목적·취향·조건을 받아 적합한 상품과 선택 이유를 제시 |
| 대상 | D2C 구매자, 식품 구매자, 웰니스 고객, 선물 구매자 |
| 화면 | `recommendation-flow` 질문·결과 variant |
| 핵심 전환 | 추천 상품 상세·비교·장바구니 |
| 디자인 다이얼 | `DESIGN_VARIANCE 5`, `MOTION_INTENSITY 4`, `VISUAL_DENSITY 6` |
| 현재 테마 비교 | 질문·추천 근거·결과 비교 흐름 전체 신규 |

### 질문 화면 구성

- 추천 목적, 예상 문항 수·시간, 데이터 사용 안내
- 사용 목적, 대상, 선호, 제외 성분·소재, 예산, 빈도, 배송·구독
- 모름·상관없음, 이전·다음, 답변 요약·수정
- 조건 충돌, 결과 없음 가능성, 중단·복귀

### 결과 화면 구성

- 추천 1순위와 대안, 일치 이유, 불일치·주의 조건
- 가격, 옵션, 재고, 배송, 성분·소재, 구독 조건
- 선택 답변 요약, 기준 변경, 결과 비교
- 추천 없음과 조건 완화, 상세·장바구니 CTA

### 필수 상태

- 시작, 진행, 답변 누락, 조건 충돌, 저장, 복귀
- 결과 계산, 추천 있음, 복수 동률, 결과 없음, 품절 포함
- 답변 변경, 결과 갱신, 장바구니 추가, 네트워크 오류

### 외부 AI 제작 프롬프트

```text
Design Read: Create an explainable product recommender that asks only useful questions, keeps answers editable, and shows why each result matches without pretending to diagnose the user.

Create two responsive ModuTheme recommendation-flow templates:
1. Recommendation questions
2. Recommendation results

Project inputs:
brandName: [브랜드명]
industryId: [뷰티, 식품, 리빙, 반려동물, 웰니스, 선물 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 구매자]
recommendationMode: [goal, preference, compatibility 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realDataAvailable: [질문, 분기, 상품 속성, 제외 조건, 가격, 재고, 배송, 구독]

Design settings:
DESIGN_VARIANCE 5
MOTION_INTENSITY 4
VISUAL_DENSITY 6
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, 6px controls, 8px result panels, and motion only for question transition, answer summary, calculation, and result update.

Question flow:
Explain purpose, expected question count and time, and how answers are used. Ask only supplied questions about use goal, recipient, preference, excluded ingredient or material, budget, frequency, delivery, and subscription. Support unknown and no preference. Show text progress, previous, next, answer summary, edit, pause, and resume. Detect contradictory conditions and explain how to resolve them.

Result page:
Show one leading recommendation and up to three alternatives. For each result show real image, name, verified price, option, stock, delivery, ingredient or material, subscription terms, matching reasons, mismatching or caution conditions, and actions for detail, compare, or cart. Show the answers and rules that produced the result before the commercial action.

No-result behavior:
Explain which supplied conditions prevented a match. Let the user relax one condition at a time, return to answers, browse all products, or request help. Never silently ignore an exclusion.

Responsive behavior:
On mobile show one question at a time, 44px controls, visible back and next, and an editable answer summary. On results, place matching reasons and cautions before add-to-cart. Use vertical comparison with the same attribute order.

Required state board:
Show before start, in progress, required answer missing, contradictory conditions, saved, resumed, calculating, recommendation available, tied results, no result, recommended item sold out, alternative available, answer changed, results updated, add success, and network error.

Data and ethics rules:
Never invent recommendation logic, compatibility, health benefit, ingredient safety, price, stock, or saving. Do not require email before showing results. Health-related recommendations must show limitations and must not claim diagnosis or treatment.

Do not use:
Quiz-game decoration, personality labels without rules, forced email capture, hidden exclusions, opaque best-choice badges, fake match percentages, commercial action before explanation, or silently replacing a sold-out recommendation.

Deliver:
Two 1440px screens, two 390px screens, one question component set, one explainability component, one complete recommendation-state board, one branching and product-attribute schema, and WooCommerce or WordPress mapping annotations.
```

## 16. 프로모션·세트·구독

### Design Read

Reading this as: a conversion-focused campaign and recurring-purchase system where dates, eligibility, included items, savings basis, billing, pause, and cancellation are visible before commitment.

### 기본 기획

| 항목 | 내용 |
|---|---|
| 목적 | 기간 혜택·세트·정기구독 조건을 이해하고 선택·구매 |
| 대상 | D2C 구매자, 식품 고객, 구독 고객, 체험·행사 구매자 |
| 화면 | `promotion-campaign`, `bundle-promotion`과 구독 선택 variant |
| 핵심 전환 | 프로모션 적용·세트 구매·구독 시작 |
| 디자인 다이얼 | `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 5`, `VISUAL_DENSITY 4` |
| 현재 테마 비교 | CTA·가격 카드 참고 가능, 기간·쿠폰·세트·반복 결제 상태는 신규 |

### 캠페인 구성

- 혜택명, 대상, 시작·종료, 적용 상품, 사용 조건
- 쿠폰·자동 할인, 중복 가능 여부, 최소 구매, 제외 항목
- 예정, 진행, 마감 임박, 종료, 재고 소진 상태
- 대표 상품, 사용 방법, FAQ, 정책

### 세트·구독 구성

- 세트 구성품·수량·옵션, 개별 합계와 세트가 비교 근거
- 배송 주기, 회차·약정, 다음 결제, 배송비, 혜택
- 건너뛰기·일시정지·주기 변경·해지 조건
- 구독 옵션 선택, 요약, 장바구니·결제 연결

### 필수 상태

- 캠페인 예정, 진행, 마감 임박, 종료, 재고 소진, 대상 아님
- 쿠폰 적용, 만료, 조건 미충족, 중복 불가, 오류
- 세트 일부 품절, 대체 가능, 구성 변경
- 구독 활성 선택, 주기 변경, 일시정지, 해지 조건, 결제 실패

### 외부 AI 제작 프롬프트

```text
Design Read: Create a conversion-focused campaign and recurring-purchase system where dates, eligibility, included items, savings basis, billing, pause, and cancellation are visible before commitment.

Create two responsive ModuTheme templates:
1. Promotion campaign
2. Bundle and subscription selection

Project inputs:
brandName: [브랜드명]
industryId: [D2C, 식품, 구독, 체험, 행사 중 하나]
presetId: [프리셋 ID]
primaryAudience: [핵심 구매자]
campaignMode: [coupon, automatic-discount, bundle, subscription, event 중 하나]
primaryAccent: [접근성 검증을 통과한 단색 강조색]
realDataAvailable: [기간, 대상, 혜택, 상품, 가격, 재고, 쿠폰, 배송, 구독 정책]

Design settings:
DESIGN_VARIANCE 7
MOTION_INTENSITY 5
VISUAL_DENSITY 4
Use a light theme, 1440px desktop, 1200px content width, and 390px mobile.
Use ModuTheme tokens, one accent, real campaign and product media, 8px panels, and motion only for campaign state, option selection, coupon feedback, and summary update.

Promotion campaign:
Show campaign name, eligible audience, verified start and end, eligible products, exact benefit, application method, coupon or automatic discount, stacking rule, minimum purchase, exclusions, stock condition, how to use, related products, FAQ, and policy. Create scheduled, active, closing soon, ended, stock exhausted, and not eligible states.

Bundle selection:
Show every included product, quantity, option, individual verified price, bundle verified price, savings calculation basis, stock, allowed replacement, and what happens if one component is unavailable. Keep the bundle composition visible in cart.

Subscription selection:
Show product and quantity, delivery interval, initial and recurring amount, shipping, minimum term only when real, next charge example labeled as example, skip, pause, interval change, product change, cancellation, payment failure, and support. Present recurring terms beside the selection and again before checkout.

Coupon behavior:
Show valid, expired, eligibility not met, minimum not met, stacking not allowed, already used, and technical error. Explain recovery instead of only changing the input border.

Responsive behavior:
On mobile keep campaign state, dates, eligibility, benefit, and primary action in the first viewport. Place exclusions before product selection. For subscription, show recurring amount and cancellation terms before the final action. Do not use auto-playing campaign carousels or fake countdown timers.

Required state board:
Show scheduled, active, closing soon, ended, stock exhausted, not eligible, coupon valid, expired, minimum not met, stacking blocked, already used, technical error, bundle available, partial sold out, replacement available, composition changed, subscription selected, interval changed, paused, cancellation terms, and payment failed.

Data and commerce rules:
Never invent dates, discounts, original prices, savings, inventory, coupon rules, subscription benefits, or cancellation terms. Calculate savings only from supplied active prices. Do not create artificial urgency or a countdown without a real synchronized deadline.

Do not use:
Fake countdowns, oversized sale badges, hidden exclusions, preselected paid subscription, misleading original prices, vague recurring charges, cancellation hidden behind customer support, or campaign images with text labels over the product.

Deliver:
Two 1440px screens, two 390px screens, one campaign-state board, one coupon component set, one bundle builder, one subscription-term summary, one price-calculation schema, and WooCommerce or WordPress field annotations.
```

## 17. 현재 테마 대비 구현 우선순위

| 우선순위 | 페이지군 | 이유 |
|---:|---|---|
| 1 | 제품·서비스·프로그램 목록 및 상세 | 거의 모든 업종이 공유하며 홈 이후 전환의 중심 |
| 2 | 예약 선택, 견적 폼, 전문가 상세 | 예약형·상담형·견적형의 직접 전환 화면 |
| 3 | 사례 목록·상세, 비교, 인증 라이브러리 | 신뢰와 구매 검토를 여러 업종에서 공유 |
| 4 | 후기·전후, 지점 찾기 | 로컬 서비스와 다지점 프리셋에서 높은 재사용 |
| 5 | 자가진단, 상품 추천 | 조건부 질문과 결과 근거 컴포넌트를 공유 |
| 6 | 코스 지도, 평면 뷰어 | 관광·부동산의 특화 인터랙션 |
| 7 | 커머스 전체, 프로모션·구독 | WooCommerce 연동과 금액·상태 체계가 선행되어야 함 |

현재 테마에서 전체 페이지를 그대로 재사용할 수 있는 항목은 없다. 다만 `page-people`, 갤러리 archive·single, 일정, 자료실, 폼 shell, 단일 위치, CTA를 하위 구성요소의 출발점으로 사용할 수 있다. 신규 공통 컴포넌트는 `filter-summary`, `result-count`, `entity-meta-row`, `availability-state`, `document-meta`, `file-uploader`, `selection-summary`, `empty-state`, `error-recovery`, `consent-panel`, `money-summary` 순으로 먼저 설계한다.

## 18. 외부 AI 결과 검수 체크리스트

- 요청한 화면 수와 데스크톱·모바일 수가 모두 일치하는가
- 목록과 상세의 분류, 상태, 필드명이 일치하는가
- 1차 CTA가 화면군 전체에서 같은 문구와 의도를 사용하는가
- 로딩, 빈 결과, 오류, 마감·품절, 완료·복구 상태가 있는가
- 가격, 재고, 일정, 수치, 후기, 인증에 실제 데이터 필드가 연결되는가
- 모바일에서 표, 지도, 달력, 도면이 삭제되지 않고 대체 형식으로 제공되는가
- 필드 라벨, helper, 오류가 입력과 가까이 있고 contrast가 충분한가
- 결제·구독·취소·환불·개인정보 조건이 행동 전에 보이는가
- 지도, 미디어, 도면에 키보드와 텍스트 대체 경로가 있는가
- 3열 동일 아이콘 카드, 제네릭 히어로, 보라색 그라디언트가 없는가
- 반경이 16px을 넘지 않고 그림자가 계층이 필요한 곳에만 있는가
- 허위 수치, 허위 후기, 허위 인증, 가짜 긴급성, 가짜 재고가 없는가
- WordPress 또는 WooCommerce 템플릿과 필드 주석이 포함되어 있는가

