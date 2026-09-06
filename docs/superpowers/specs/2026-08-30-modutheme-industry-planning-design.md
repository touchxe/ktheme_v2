# 모두테마 업종 홈페이지 기획 체계 검토 및 교회/종교 확장 설계

Date: 2026-08-30  
Status: reviewed planning baseline

## 결론

제공된 업종·업체·프리셋 매트릭스와 범용 기능/섹션 카탈로그는 모두테마를 “업종마다 별도 테마를 복제하는 제품”이 아니라 “공통 런타임 + 업종 패키지 + 운영 흐름 프리셋”으로 만드는 방향에 적합하다.

다만 현재 manifest는 업종 단위의 목록만 표현한다. 홈페이지를 실제로 기획하려면 프리셋별 메뉴, 1차 전환, 홈 섹션 순서, 콘텐츠 모델, 연동, 위험 통제가 별도 데이터로 필요하다. 교회/종교 업종을 추가하면서 이 누락을 보완하기 위해 업종 manifest, 프리셋 카탈로그, 기능/섹션 확장안을 함께 정의한다.

## 입력 자료

### 기준 문서

- `/Users/shin-youngbin/workspace/modu-theme-dev/docs/templates/INDUSTRY-BUSINESS-PRESET-MATRIX.md`
- `/Users/shin-youngbin/workspace/modu-theme-dev/docs/templates/UNIVERSAL-FEATURE-CATALOG.md`
- `/Users/shin-youngbin/workspace/modu-theme-dev/docs/templates/UNIVERSAL-SECTION-CATALOG.md`
- `/Users/shin-youngbin/workspace/modu-theme-dev/docs/templates/INDUSTRY-DEMO-SITE-GUIDE.md`

### 신규 manifest

- `local-tourism-experience`
- `wellness-counseling-care`
- `professional-consulting-support`
- `brand-lifestyle-d2c`

### 교회 테마 현황

- `docs/SITE_IA_SLUG_RULES.md`
- `docs/dummy-data-requirements.md`
- `wp-content/themes/modu-theme/`

## Who / What / Why

### Who

- 홈페이지가 필요한 한국의 중소 사업자와 기관 운영자
- 업종 데모를 선택·판매·설치하는 모두테마 운영자
- 업종 패키지와 공통 위젯을 개발하는 디자이너·개발자
- 콘텐츠, 일정, 신청, 자료를 실제로 갱신하는 현장 담당자

### What

- 업종 → 운영 주체 → 프리셋 → 기능/섹션 → 데모 키트로 이어지는 기획 체계
- 프리셋마다 달라지는 메뉴, 전환, 콘텐츠 모델, 연동, 시각 방향
- 교회·성당·사찰·종교기관을 포괄하되 공개 상품은 다섯 프리셋으로 분리한 업종 패키지

### Why

- 색상만 다른 테마를 늘리지 않고 실제 운영 흐름이 다른 홈페이지 상품을 만들기 위해서다.
- 공통 기능을 재사용해 제작비와 QA 범위를 줄이면서도 업종별 언어와 신뢰 요소를 보존하기 위해서다.
- 신청·상담·후원·민감정보처럼 운영 위험이 있는 기능을 페이지 제작 전에 통제하기 위해서다.

## 성공 기준

1. 모든 업종 manifest의 `featureRefs`와 `sectionRefs`가 카탈로그 ID로 검증된다.
2. 모든 프리셋에 대상 운영 주체, 1차 전환, 메뉴, 홈 섹션 순서, 콘텐츠 모델, 연동, 위험 통제가 정의된다.
3. 프리셋 간 차이가 색상 변경이 아니라 최소 하나 이상의 실제 운영 흐름 차이로 설명된다.
4. 새 위젯 후보는 둘 이상의 업종에서 같은 데이터 구조로 쓰일 때만 공통 컴포넌트로 승격된다.
5. 데모는 조사 → 메뉴 → 페이지/위젯 범위 → 제작 → QA → 패키징 산출물을 모두 남긴다.
6. 교회/종교 첫 데모는 현재 ModuTheme 자산을 재사용하고 핵심 동선의 깨진 링크·빈 archive·placeholder가 없다.

## 네 신규 업종 manifest 검토

| 업종 | 강점 | 보완할 점 | 먼저 검증할 운영 흐름 | 기획 준비도 |
|---|---|---|---|---:|
| 지역관광/체험/문화 | 예약·지도·코스·주변 제휴의 연결이 분명함 | 실시간 정원, 우천/휴무, 환불, 외부 예약 adapter 경계 | 날짜·인원 선택 → 프로그램 → 예약 문의 | 8.5/10 |
| 웰니스/상담/돌봄 | 목적 탐색·전문가·상담·고지가 잘 묶임 | 민감정보 최소수집, 의료 표현 금지, 지점/담당자 배정 | 목적 선택 → 전문가/프로그램 → 상담 예약 | 8.0/10 |
| 전문서비스/컨설팅/창업지원 | 자가진단·사례·보고서·상담 전환이 명확함 | 진단 결과 규칙, 근거/면책, 지원사업 마감·자격 데이터 | 자가진단 → 결과 → 상담/자료 다운로드 | 7.5/10 |
| 브랜드/라이프스타일 D2C | 상품보다 근거 콘텐츠·추천·재구매를 강조함 | 상품정보 고지, 재고/구독 상태, 리뷰 승인, WooCommerce 데이터 소유권 | 목적별 추천 → 근거 → 상품/세트 구매 | 8.0/10 |

네 manifest의 `featureRefs`와 `sectionRefs`는 제공된 공통 카탈로그와 일치한다. 가장 큰 공통 누락은 프리셋 ID별 구체 정의가 없다는 점이다.

## 구조상 핵심 보완 사항

### 1. 업종 manifest와 프리셋 manifest를 분리한다

업종 manifest는 시장 범위와 공통 요구를 관리하고, 프리셋 카탈로그는 실제 홈페이지 기획을 관리한다.

```text
industry manifest
├─ 업종명, 운영 주체, 공통 페이지
├─ 가능한 전환·기능·섹션의 합집합
└─ 프리셋 ID와 제작 우선순위

preset catalog
├─ 대상 운영 주체
├─ 1차/2차 전환
├─ 헤더·유틸 메뉴
├─ 홈 섹션 순서
├─ 콘텐츠 모델
├─ 플러그인/외부 서비스 연동
├─ 시각 방향
└─ 규제·운영 위험 통제
```

### 2. 겹치는 업체 유형에는 라우팅 기준이 필요하다

| 겹치는 영역 | 선택 기준 |
|---|---|
| 로컬 식품: 관광 vs D2C | 방문/체험 예약이 1차면 관광, 상품 구매·재구매가 1차면 D2C |
| 필라테스: 뷰티/예약 매장 vs 웰니스 | 빠른 시간예약·가격이 중심이면 예약매장, 프로그램·전문가·상담 고지가 중심이면 웰니스 |
| 경영자문: 법률/세무 vs 전문컨설팅 | 자격·규정·사건 상담이면 전문직, 진단·보고서·프로젝트면 컨설팅 |
| 사찰 템플스테이: 관광 vs 종교기관 | 숙박/체험 판매가 중심이면 관광, 법회·수행·신행과 함께 운영하면 사찰 프리셋 |

업종 선택 질문에는 “무슨 업종인가?”뿐 아니라 “방문자가 홈페이지에서 가장 먼저 끝내야 하는 일은 무엇인가?”를 포함한다.

### 3. 페이지 이름만으로는 정보 구조가 완성되지 않는다

`pages` 배열은 재고 목록으로 유지하되 다음 기획 데이터가 필요하다.

- slug와 화면 타입(page/archive/single/form/system)
- 헤더/푸터/유틸 노출 위치
- 부모/자식 관계
- 프리셋별 메뉴 라벨
- 데이터 소유자와 갱신 주기
- 핵심 CTA와 완료 상태

### 4. 기능의 공급자 경계를 먼저 정한다

- 일정: 내부 데이터인지 외부 예약 서비스인지
- 폼: Ninja Forms 프리셋인지 외부 CRM인지
- 게시판: WordPress post/KBoard/CPT 중 어디에 저장하는지
- 커머스: WooCommerce 상품·주문이 기준인지
- 지도: 단일 주소인지 지점 디렉터리인지
- 영상: 자체 업로드가 아니라 영상 플랫폼 임베드인지

이 경계가 없으면 데모는 보이지만 고객 사이트에서 수정·이전·재설치하기 어렵다.

## 교회/종교 업종 설계

### 업종 범위

`church-religious-organization`은 다음 운영 주체를 포함한다.

- 지역 개신교회
- 대형/다지점 교회
- 천주교 본당/주교좌 성당
- 불교 사찰/수행도량
- 명상/종교문화센터
- 교단/종단 본부
- 선교단체/포교기관
- 종교재단/복지기관
- 종교교육기관

한국의 모든 종교를 동일한 업무 흐름으로 일반화하지 않는다. 현재 조사로 검증하지 못한 종교 공동체는 `religious-organization`의 범용 기관형에서 시작하되, 실제 운영 사례와 공식 용어를 확인한 뒤 독립 프리셋으로 승격한다.

### 프리셋

| 프리셋 | 대상 | 1차 전환 | 핵심 콘텐츠 | 차별화되는 업무 흐름 |
|---|---|---|---|---|
| `church-local` | 지역·중소형 개신교회 | 새가족 등록 | 예배, 설교, 주보, 공동체 | 첫 방문 → 등록 → 정착/양육 |
| `church-media` | 대형·다지점·온라인 교회 | 라이브/최근 예배 시청 | 라이브, 설교 시리즈, 캠퍼스, 대상별 예배 | 방송 선택 → 캠퍼스/대상 선택 → 참여 |
| `catholic-parish` | 본당·주교좌 성당·성지 | 미사시간 확인 | 미사/고해, 성사, 주보, 본당단체 | 시간 확인 → 성사/본당 사무실 안내 |
| `buddhist-temple` | 전통/도심 사찰·수행도량 | 법회/기도 또는 체험 일정 확인 | 법회, 법문, 수행, 문화재, 템플스테이 | 일정/예절 확인 → 외부 예약/신청 |
| `religious-organization` | 교단·종단·선교/복지/교육기관 | 사업/자료 탐색 | 사업, 조직, 소속기관, 공지, 자료 | 사업/자료 탐색 → 행사·기관·후원 연결 |

세부 정의의 기계 판독 가능한 원본은 `templates/catalogs/church-religious-presets.json`이다.

## 교회/종교 공통 카탈로그 확장

기존 카탈로그로는 지도, 프로필, 프로그램, 자료, 개인정보 동의, 다국어를 재사용할 수 있다. 아래 기능은 종교 분야에서 반복되지만 기존 ID로는 의미와 위험 통제가 충분하지 않아 확장 후보로 둔다.

- `newcomer-registration`
- `gathering-schedule`
- `event-calendar-registration`
- `faith-media-library`
- `prayer-care-request`
- `giving-support-guide`
- `receipt-document-request`

섹션 확장 후보:

- `hero-welcome`
- `gathering-schedule`
- `latest-faith-media`
- `newcomer-journey`
- `ministry-community-nav`
- `event-calendar`
- `notice-bulletin`
- `giving-support`

이 확장안은 각각 `templates/catalogs/church-religious-feature-extensions.json`과 `templates/catalogs/church-religious-section-extensions.json`에 기록한다.

## 현재 ModuTheme 재사용성

### 바로 재사용 가능한 기반

- 7개 1차 메뉴와 slug 사전
- 설교 `modutheme_sermon` archive/single
- 행사 `modutheme_event` archive/single
- 앨범 `modutheme_album` archive/single
- 새가족, 예배, 공동체, 양육, 선교, 미디어, 행정 페이지 템플릿
- 지도, 문의, 시설/차량 신청, 온라인 헌금, 증명서 안내 페이지
- 공용 헤더·푸터·페이지 히어로

### 일반 상품화 전에 보완할 기반

- `bulletin`, `qt`, `videos`, `library`, `news`의 장기 콘텐츠 저장 방식 확정
- 하드코딩된 홈 카드와 실제 게시물 연결
- 예배 시간표의 구조화 데이터 및 갱신일
- 새가족/기도/행정 폼의 실제 저장·알림·동의 정책
- Style 1 외 프리셋의 토큰·메뉴·샘플 데이터 패키징
- source-site URL이 남지 않는 반복 import와 멱등성 검증

따라서 현재 테마는 `church-local`의 디자인 참고 수준을 넘어 기능 기준 자산으로 쓸 수 있지만, 곧바로 범용 판매 패키지로 표시할 단계는 아니다.

## 권장 제작 순서

### Foundation — 공통 기획 체계

1. 업종 manifest와 프리셋 카탈로그의 연결 규칙을 확정한다.
2. feature/section 참조 무결성 검사를 CI에 추가한다.
3. 페이지 slug·화면 타입·메뉴 위치를 담는 스키마를 추가한다.
4. 겹치는 업체 유형을 전환 중심 질문으로 라우팅한다.

### Reference — 교회 로컬형

1. 현재 ModuTheme IA와 실제 템플릿 차이를 정리한다.
2. `church-local` 메뉴, 홈 섹션, 콘텐츠 모델을 확정한다.
3. 설교·행사·앨범·주보·공지 더미 데이터와 홈을 연결한다.
4. 새가족 등록, 오시는 길, 예배시간, 최근 설교를 P0 동선으로 QA한다.
5. 깨끗한 사이트에 두 번 import해 중복과 URL 잔존을 확인한다.

### Wave 1 — 네 신규 업종 대표 프리셋

- `local-experience`
- `wellness-counseling`
- `expert-consulting`
- `brand-beauty`

교회 로컬형에서 검증한 일정, 폼, 콘텐츠 archive, 지도, CTA 패턴 중 공통 구조만 승격한다.

### Wave 2 이후 — 종교 프리셋 확장

1. `church-media`: 방송/다지점/다국어 adapter 검증 후
2. `catholic-parish`: 공식 용어와 본당 운영자 검수 후
3. `buddhist-temple`: 법회/기도/외부 템플스테이 예약 경계 검증 후
4. `religious-organization`: 기관 디렉터리와 공식 자료 승인 흐름 검증 후

## Constraints

- UI 구현 전 `docs/DESIGN.md`를 따른다.
- 교회 메뉴·slug는 `docs/SITE_IA_SLUG_RULES.md`를 우선한다.
- 기존 업종 카탈로그 ID를 복제하지 않는다.
- 프리셋은 색·폰트만 달라서는 안 되며 실제 전환 또는 운영 데이터가 달라야 한다.
- 폼 데이터는 테마 파일에 저장하지 않고 플러그인 또는 외부 시스템에 맡긴다.
- 추천 플러그인이 비활성 상태여도 치명적 오류가 없어야 한다.
- 아동 사진, 기도·상담 내용, 후원/영수증 정보는 최소수집과 접근 통제를 적용한다.

## Out of scope

- 이번 작업에서 Elementor 페이지나 WordPress 플러그인을 구현하지 않는다.
- 실제 후원 결제, 교적 관리, 신도 관리 시스템을 만들지 않는다.
- 특정 교단/종단의 교리나 공식 정책을 대신 정하지 않는다.
- 조사하지 않은 모든 종교의 용어를 자동으로 일반화하지 않는다.
- 라이브 서버 배포와 Cafe24 마켓 이미지는 다음 제작 단계에서 진행한다.

## 생성 산출물

- `templates/industries/church-religious-organization.json`
- `templates/catalogs/church-religious-presets.json`
- `templates/catalogs/church-religious-feature-extensions.json`
- `templates/catalogs/church-religious-section-extensions.json`
- `docs/analysis/church-religious-site-research.md`
- `docs/analysis/church-religious-page-widget-scope.md`

## 다음 의사결정

다음 구현 전에 결정해야 할 가장 중요한 한 가지는 모두테마의 첫 판매용 교회 프리셋을 현재 가평교회 구조에 가까운 `church-local`로 확정할지 여부다. 이 문서는 현재 자산 재사용성과 위험을 고려해 `church-local`을 권장한다.
