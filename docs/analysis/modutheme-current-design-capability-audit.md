# 모두테마 현재 디자인 자산 감사와 신규 디자인 목록

Date: 2026-08-30  
Status: design production baseline  
Audited theme: `wp-content/themes/modu-theme` v0.3.62

## 한눈에 보는 결과

| 항목 | 수량 | 판단 |
|---|---:|---|
| 업종 | 15 | 교회/종교 포함 |
| 운영 주체 항목 | 100 | 업종 간 중복 항목 포함 |
| 프리셋 | 61 | 8개 구형 업종의 영문 ID는 제안 상태 |
| 업종별 페이지 항목 | 179 | 같은 페이지 목적의 중복 포함 |
| 현재 WordPress 템플릿 | 51 | 교회 중심 |
| 현재 템플릿 파트 | 18 | 헤더·푸터·히어로·archive 중심 |
| 현재 패턴 | 4 | 홈, 페이지 히어로, 폼 shell, 하단 CTA |
| 페이지 원형 | 44 | 기존 8, 변형 7, 신규 29 |
| 범용 섹션 디자인 | 47 | 기존 11, 변형 16, 신규 20 |

현재 테마는 페이지 수가 적지 않지만 대부분 교회 운영에 최적화되어 있다. 공용 히어로, CTA, 프로필, 일정, 자료실, 폼, 지도, 미디어 archive는 좋은 재사용 기반이다. 반면 제품·서비스 카탈로그, 상세 페이지, 비교, 예약 가능 상태, 사례, 후기, 다지점, 커머스는 신규 디자인이 필요하다.

## 현재 테마에서 바로 재사용 가능한 디자인

| 디자인 자산 | 현재 근거 | 다른 업종에서 재사용할 곳 |
|---|---|---|
| 공용 헤더·푸터·메가메뉴 | `parts/header.html`, `parts/footer.html` | 모든 업종, 메뉴 라벨/CTA/token 변경 |
| 페이지 히어로 | `page-hero*` 8종, 디자인 라이브러리 3종 | 소개, 서비스, 자료, 위치, 전환 페이지 |
| Archive/Single 기본 구조 | `archive.html`, `single.html` | 공지, 자료, 인사이트의 출발점 |
| 미디어 목록/상세 | sermon archive/single | SaaS 영상, 강의, 강론/법문, 브랜드 콘텐츠 |
| 행사 목록/상세 | event archive/single | 교육, 관광, 웰니스, 기관 행사 |
| 갤러리 목록/상세 | album archive/single | 시설, 시공, 관광, 매장, 프로젝트 이미지 |
| 사람/프로필 목록 | `page-people.html` | 의료진, 전문가, 강사진, 트레이너, 팀 |
| 과정·단계 | newcomers/training/ministry journey | 상담절차, 시공과정, 도입절차, 체험과정 |
| 일정 | worship/annual-schedule | 운영시간, 교육일정, 행사달력의 기초 |
| 자료/주보 | library/bulletin | 기술자료, 보고서, 공지, 다운로드 목록 |
| 폼 shell | contact/documents/facility/vehicle/newcomers | 상담, 등록, 문의 폼의 시각 구조 |
| 위치 | `page-location.html` | 단일 사업장 오시는 길 |
| FAQ/고지 | `page-faq.html`, alert/callout | 업종 FAQ와 주의사항 |
| CTA | 디자인 라이브러리 action CTA 5종 | 예약, 상담, 견적, 구매, 등록 |
| 후원/지원 안내 | giving/support | 종교/비영리 지원 안내 |
| 검색·오류·계정 | search, 404, login/register/reset | 모든 업종의 시스템 화면 |

## 변형 설계가 필요한 페이지 원형 7종

| 페이지 원형 | 보유 기반 | 추가해야 할 설계 |
|---|---|---|
| 소개·브랜드 스토리 | about/vision/history | 회사, 브랜드, 장소, 기관별 미디어 비율과 성과/근거 슬롯 |
| 프로필 디렉터리 | people | 전문분야·자격·지점·관련 서비스·예약 CTA |
| 월간 일정·시간표 | annual schedule/worship | 주간/월간 전환, 운영 상태, 대상/지점 필터 |
| 상담·문의·등록 폼 | contact/newcomers/form shell | 조건부 필드, 완료 화면, 담당자/지점 배정, 동의 variant |
| 가격·요금·패키지 | 카드/표 컴포넌트 | 고정가·시작가·상담형·구독형 표시와 모바일 전환 |
| 자료실 목록 | library/bulletin | 분류 필터, 버전, 파일 형식/크기, 다운로드 상태 |
| 공지·소식 목록 | archive/bulletin | 중요 공지 고정, 게시 기간, 카테고리와 빈 상태 |

## 신규 페이지 디자인 29종

### 업종 홈과 제공 항목

| ID | 신규 페이지 | 포함해야 할 핵심 |
|---|---|---|
| `industry-home` | 업종 전환형 홈 | 예약·상담·견적·구매·미디어·기관형 6개 홈 구성 variant |
| `service-catalog` | 서비스·프로그램·과정 목록 | 목적/분류 필터, 대상, 기간, 가격/문의, 상세 CTA |
| `offering-single` | 서비스·프로그램·과정 상세 | 대상, 포함 내용, 일정, 담당자, 가격, 과정, FAQ, 전환 |
| `product-catalog` | 제품·상품 목록 | 카테고리, 필터, 검색, 핵심 사양/가격/재고, 비교/구매 |
| `product-single` | 제품·상품 상세 | 미디어, 옵션/사양, 근거, 관련 사례, 문서, 문의/구매 |

### 사람·사례·신뢰

| ID | 신규 페이지 | 포함해야 할 핵심 |
|---|---|---|
| `profile-single` | 의료진·전문가·구성원 상세 | 자격, 전문분야, 경력, 일정/지점, 관련 서비스, CTA |
| `case-archive` | 사례·프로젝트 목록 | 업종/서비스/공간 필터, 문제, 결과, 대표 이미지 |
| `case-single` | 사례·프로젝트 상세 | 배경, 문제, 해결, 과정, 결과, 근거, 관련 CTA |
| `review-archive` | 후기·UGC 목록 | 평점/인용/미디어, 작성자 맥락, 승인/고지, 분류 |
| `before-after` | 전후 비교 | 비교 슬라이더/쌍 이미지, 기간, 조건, 개인정보/효과 고지 |
| `certification-library` | 인증·특허·자격 목록 | 종류, 발급처, 날짜/유효기간, 문서 보기, 필터 |

### 전환·예약·진단

| ID | 신규 페이지 | 포함해야 할 핵심 |
|---|---|---|
| `booking-availability` | 예약 가능 일정·선택 | 날짜, 시간, 인원/정원, 프로그램, 담당자/지점, 마감 상태 |
| `quote-form` | 견적·파일 첨부 폼 | 서비스/제품, 수량, 사양, 예산, 현장 정보, 첨부, 회사 정보 |
| `sensitive-request-form` | 민감정보 상담/요청 | 공개범위, 익명, 보유기간, 긴급상황 안내, 접근 제한 |
| `self-assessment` | 자가진단 질문 흐름 | 진행률, 조건부 질문, 이전/다음, 중간 저장, 동의 |
| `assessment-result` | 자가진단 결과 | 점수/유형, 설명, 근거/면책, 추천 서비스, 상담 CTA |
| `comparison-page` | 제품·서비스·패키지 비교 | 비교 대상 선택, 속성/단위, 추천, 모바일 카드/아코디언 |

### 자료·위치·공간

| ID | 신규 페이지 | 포함해야 할 핵심 |
|---|---|---|
| `resource-single` | 자료 상세·다운로드 | 요약, 버전, 파일 정보, 미리보기, 관련 자료, 추적 CTA |
| `branch-locator` | 지점·매장·캠퍼스 찾기 | 지역 필터, 지도/목록 동기화, 운영시간, 연락처, 길찾기 |
| `route-nearby` | 추천 코스·주변 장소 | 순서, 소요시간, 거리, 지도, 장소 필터, 혜택/주의 |
| `floor-plan-viewer` | 평면·타입 상세 | 도면 확대, 면적/구성, 옵션, 타입 비교, 문의 CTA |
| `institution-directory` | 기관·소속 조직 디렉터리 | 지역/유형 필터, 기관 카드, 연락처, 상세/외부 링크 |

### 커머스·추천·프로모션

| ID | 신규 페이지 | 포함해야 할 핵심 |
|---|---|---|
| `commerce-archive` | 상품 아카이브 | WooCommerce 분류/필터/정렬/재고/프로모션 상태 |
| `commerce-single` | 상품 상세 | 옵션, 가격, 재고, 배송, 성분/소재, 리뷰, 연관 상품 |
| `commerce-cart` | 장바구니 | 수량/옵션 변경, 쿠폰, 배송 예상, 합계, 빈 상태 |
| `commerce-checkout` | 결제 | 주문자/배송/결제, 오류/로딩, 약관, 구독 조건 |
| `commerce-account` | 주문·구독 계정 | 주문, 배송, 다운로드, 구독 변경/해지, 주소/프로필 |
| `recommendation-flow` | 목적별 추천 | 질문/필터, 선택 요약, 추천 근거, 결과 비교, 전환 |
| `promotion-campaign` | 프로모션·쿠폰·구독 캠페인 | 기간, 대상, 혜택, 쿠폰 상태, 세트/구독, 종료 상태 |

## 신규 범용 섹션 디자인 20종

| 섹션 ID | 필요한 이유 | 적용 업종 |
|---|---|---|
| `hero-booking` | 날짜·인원·예약 상태를 첫 화면에 제공 | 관광, 예약매장, 교육 |
| `hero-quote` | 기술 근거와 견적 행동을 함께 제공 | 제조, 시공, 에이전시 |
| `hero-commerce` | 제품 미디어·가격·구매를 중심으로 구성 | D2C, 식음료 |
| `hero-task-portal` | 통합 검색·사용자 유형·주요 업무·긴급 공지를 첫 화면에 제공 | 교육기관, 관광협회, 지원기관, 교단·종단 |
| `availability-strip` | 영업/예약 가능·마감·휴무 상태 표시 | 관광, 웰니스, 교육, 매장 |
| `deadline-status-strip` | 사업·교육·행정 마감을 상태와 함께 날짜순으로 표시 | 교육기관, 관광협회, 지원기관, 교단·종단 |
| `product-category-nav` | 이미지 기반 제품군 탐색 | 제조, D2C, 메뉴 |
| `featured-products` | 가격·사양·재고를 가진 대표 제품 | 제조, D2C |
| `seasonal-recommendations` | 계절/기간별 추천과 가능 상태 | 관광, 식음료, 캠페인 |
| `route-itinerary` | 코스 순서·시간·거리 | 관광, 부동산 |
| `nearby-map` | 지도와 주변 장소 목록 동기화 | 관광, 숙박, 부동산 |
| `self-assessment-entry` | 진단 소요시간과 결과 예시를 보여 줌 | 컨설팅, 교육, 웰니스 |
| `recommendation-entry` | 목적·취향 질문과 추천 결과를 홈에서 미리 보여 줌 | D2C, 식음료, 구독 |
| `reviews-gallery` | 승인된 후기·평점·미디어·고지 | 관광, 웰니스, 매장, D2C |
| `case-studies` | 문제·해결·성과·근거 구조 | 제조, 전문서비스, 시공, SaaS, 에이전시 |
| `credentials-proof` | 인증·특허·발급처·문서 근거 | 제조, 의료, 교육, 전문서비스 |
| `spec-comparison` | 사양/옵션 비교와 모바일 전환 | 제조, 부동산, SaaS |
| `package-comparison` | 대상별 서비스 패키지 비교 | 전문서비스, SaaS, 웰니스 |
| `bundle-promotion` | 세트·구독·기간 혜택과 상태 | D2C, 관광, 매장 |
| `institution-directory-preview` | 지역·유형·소속별 기관과 연락처를 홈에서 탐색 | 관광협회, 지원기관, 교단·종단 |

## 기존 섹션을 보강해야 하는 16종

| 섹션 | 현재 기반 | 보강 내용 |
|---|---|---|
| `hero-consultation` | 공용 hero/CTA | 신뢰문구, 상담 유형, 담당자/지점 |
| `problem-solution` | 소개/비전 split | 문제, 대상, 해결, 근거의 명확한 슬롯 |
| `goal-based-navigation` | 사역 링크 | 목적 선택과 결과 페이지 연결 |
| `service-category-nav` | 카드/탭 | taxonomy·설명·활성 필터 |
| `featured-offerings` | training/ministry 카드 | 대상, 기간, 가격/상태 메타 |
| `experience-process` | Process Steps | 준비물, 안전, 소요시간 |
| `technical-process` | Process Steps | 진단, 제안, 납품, 지원 상태 |
| `expert-profiles` | people | 자격, 전문분야, 지점, CTA |
| `metrics-proof` | metric 카드 | 수치 단위, 기준일, 출처 |
| `pricing-consultation` | 카드/표 | 고정가/시작가/문의/추천 상태 |
| `material-process` | about/history | 원산지, 공정, 근거, 문서 |
| `usage-guide` | 과정/FAQ | 팁, 주의, 관련항목 |
| `resource-library` | library/bulletin | 필터, 버전, 파일 정보 |
| `service-disclosure` | alert/callout | 제공/제외 범위, 긴급안내, 정책 링크 |
| `gathering-schedule` | worship schedule | 범용 용어, 적용기간, 장소/대상/언어 |
| `event-calendar` | annual schedule/event archive | 월 보기, 정원/마감, 신청 상태 |

## 디자인 제작 배치

### Batch 0 — 외부 도구 공통 프레임

먼저 6가지 홈 프레임을 만든다.

1. 예약형: 관광·체험·미용·교육
2. 상담형: 병원·웰니스·전문서비스·법률
3. 견적형: 제조·시공·에이전시
4. 구매형: D2C·식음료
5. 미디어/공동체형: 교회·종교
6. 기관/포털형: 교육기관·관광협회·지원기관·교단/종단

각 프레임은 동일한 헤더를 복제하지 말고 CTA 위치, 콘텐츠 밀도, 첫 화면 정보가 달라야 한다.

### Batch 1 — 가장 많이 재사용되는 페이지

- 서비스/프로그램 목록·상세
- 제품 목록·상세
- 프로필 상세
- 사례 목록·상세
- 일정/예약 가능 선택
- 상담/견적 폼
- 비교표·가격표
- 자료 상세
- 후기 목록
- 지점 찾기

### Batch 2 — 업종 특화 페이지

- 자가진단/결과
- 전후 비교
- 추천 코스/주변 지도
- 평면/타입 상세
- 인증·특허 라이브러리
- 기관 디렉터리

### Batch 3 — 커머스 시스템

- 상품 archive/single
- 장바구니/결제/내 계정
- 목적별 추천
- 프로모션·세트·구독

## 외부 디자인 도구 전달 규칙

각 화면 요청에는 아래 항목을 반드시 포함한다.

```text
industryId:
presetId:
pageArchetypeId:
pagePurpose:
primaryAudience:
primaryConversion:
requiredSections:
contentTypes:
requiredStates: loading / empty / error / closed / sold-out / completed
desktopWidth: 1440
contentWidth: 1200~1240
mobileWidth: 390
designSystem: docs/DESIGN.md
forbidden: 3-column icon feature grid, purple gradient, generic hero copy, excessive rounded cards
```

목록 화면은 기본·필터 적용·검색 결과 없음, 폼은 기본·오류·제출 중·완료, 예약/상품은 가능·마감·품절·종료 상태까지 함께 만든다.

## 기계 판독 원본

- 전체 업종/프리셋: `templates/catalogs/modutheme-industry-production-catalog.json`
- 페이지/섹션 감사: `templates/catalogs/modutheme-design-gap-catalog.json`
