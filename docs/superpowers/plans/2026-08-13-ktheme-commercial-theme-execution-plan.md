# KTheme V2 상업용 블록 테마 전체 실행계획

- 작성일: 2026-08-13
- 대상: `wp-content/themes/ktheme-v2`
- 목표 일정: 승인 후 10주
- 목표 결과: WordPress.org Lite 및 자사몰 판매 후보가 될 수 있는 재현 가능한 Theme Release Candidate
- 기준 문서: `AGENTS.md`, `docs/DESIGN.md`, `docs/SITE_IA_SLUG_RULES.md`

## 1. 목표와 성공 조건

현재 라이브 디자인의 장점을 유지하면서 특정 교회에 하드코딩된 화면을 구매자가 Site Editor에서 안전하게 편집할 수 있는 상업용 WordPress 블록 테마로 전환한다.

최종 성공 조건은 다음과 같다.

1. 테마는 표현만 담당하고 CPT, 폼 전송, 결제, 데모 데이터 생성 같은 영속 기능을 소유하지 않는다.
2. 플러그인이 없어도 기본 글·페이지·검색·archive·single이 정상 출력된다.
3. 로고, 사이트명, 메뉴, 연락처, 예배시간, SNS, 이미지, 카피를 코드 수정 없이 편집할 수 있다.
4. 빈 WordPress 설치에서 10분 이내에 기본 교회 사이트 골격을 구성할 수 있다.
5. WordPress Theme Check, PHPCS/WPCS, Playwright, axe, 링크 검사 및 브라우저 콘솔 검사를 통과한다.
6. 테마 ZIP에는 고객사 식별정보, 개발 페이지, 가짜 폼, 원격 런타임 자산, 권리가 불명확한 자산이 없다.
7. 모든 사용자 노출 문자열은 번역 가능하고 주요 사용자 흐름은 WCAG 2.2 AA 수준을 충족한다.

## 2. 범위

### 2.1 포함

- `theme.json`, Global Styles, CSS 디자인 토큰
- templates, parts, patterns, style variations
- 헤더·푸터·페이지 히어로·홈페이지·일반 페이지의 편집 경험
- 테마 프런트엔드 CSS와 JavaScript
- 플러그인 미설치 상태와 폼 삽입용 표현 패턴
- 반응형, 접근성, 성능, 국제화, SEO 기본 마크업
- 테마용 문서, 라이선스 고지, 스크린샷, child theme, 릴리스 ZIP
- 테마 검증 CI와 브라우저 시각 회귀

### 2.2 별도 제품으로 제외

- 설교·행사·앨범·주보 등의 CPT, taxonomy, meta, REST API
- 폼 데이터의 저장·메일 전송·스팸 방지
- 헌금·결제·PG 처리
- 고객 라이선스 서버, 결제 계정, 구독 관리
- 데모 콘텐츠 import/rollback 엔진
- 다른 테마로부터의 데이터 마이그레이션

위 기능의 신규 구현은 제외하지만, 현재 테마에서 제거하고 Companion Plugin 또는 검증된 외부 플러그인의 연결 지점으로 바꾸는 작업은 포함한다.

## 3. 실행 원칙과 게이트

### 3.1 브랜치와 worktree

이 계획 승인 직후 현재 dirty `main`에서 직접 구현하지 않는다.

1. 별도 BMAD 스토리를 `_bmad-output/stories/`에 작성한다.
2. `pnpm wt:add story-commercial-theme`으로 linked worktree를 만든다.
3. 구현 브랜치는 `codex/story-commercial-theme` 또는 저장소 스크립트가 생성한 규칙을 따른다.
4. `AGENTS.md`, `docs/DESIGN.md` 같은 공유 문서는 main에서만 변경하고 worktree는 rebase한다.
5. 단계별로 작은 PR을 만들 수 있도록 Phase 1~6을 독립 커밋 경계로 유지한다.

### 3.2 TDD

각 작업은 다음 순서를 지킨다.

1. 현재 결함을 재현하는 실패 테스트를 먼저 추가한다.
2. 실패 출력을 기록한다.
3. 최소 변경으로 통과시킨다.
4. 관련 회귀 테스트를 추가한다.
5. 단계 종료 시 전체 검증을 실행한다.

정적 HTML만 확인하는 문자열 테스트는 보조 수단으로만 사용한다. 브라우저 동작은 Playwright와 axe, PHP는 PHPUnit·WordPress 통합 테스트로 검증한다.

### 3.3 디자인

- 실제 테마의 Pretendard·blue 계열을 기본 방향으로 삼되 Phase 0에서 최종 승인한다.
- 모든 UI 구현 전 개정된 `docs/DESIGN.md`를 확인한다.
- UI PR 전 라이브 또는 로컬 URL로 디자인 리뷰를 최소 1회 수행한다.
- 기존 기능을 유지하며, 3열 아이콘 카드·과도한 pill·과도한 그림자 같은 금지 패턴을 확장하지 않는다.

### 3.4 릴리스 기준

- 한 단계의 완료 게이트를 통과하기 전 다음 단계로 넘어가지 않는다.
- 예외가 필요하면 미해결 항목, 영향, 임시 조치, 해소 일정을 결정 기록에 남긴다.
- “완료” 선언 전에 실제 검증 명령과 결과를 첨부한다.

## 4. 일정과 의존성

| 단계 | 기간 | 핵심 결과 | 선행 단계 |
|---|---:|---|---|
| Phase 0 | 2~3일 | 기준선, 범위, 디자인·호환성 결정 | 없음 |
| Phase 1 | 1주 | 판매 차단 결함 제거 | Phase 0 |
| Phase 2 | 1.5주 | 디자인 시스템·CSS 기반 재구축 | Phase 1 |
| Phase 3 | 2주 | 네이티브 블록 편집 구조 | Phase 2 |
| Phase 4 | 1.5주 | 템플릿·패턴·스타일 변형 제품화 | Phase 3 |
| Phase 5 | 1.5주 | 성능·접근성·국제화·SEO | Phase 4 |
| Phase 6 | 1주 | 판매 패키지와 Release Candidate | Phase 5 |
| Beta | 1주 | 실제 사용자 검증과 RC 보정 | Phase 6 |

예상 총 작업량은 8.5~10주다. 플러그인 분리가 준비되지 않은 경우 Phase 3의 동적 콘텐츠 영역은 플러그인 미설치 상태까지만 구현하고 실제 연결은 별도 트랙에서 진행한다.

---

## 5. Phase 0 — 기준선과 제품 명세 확정

### 목적

구현 중 범위가 변하지 않도록 현재 상태, 지원 환경, 유지할 디자인, 템플릿 구조와 품질 예산을 고정한다.

### P0-1. 기준선 스냅샷과 결함 목록

대상:

- 테마 전체
- 라이브 URL `https://juswer.mycafe24.com`
- 현재 테스트와 배포 스크립트

작업:

1. Git 기준 SHA와 기존 사용자 변경 파일을 기록한다.
2. 테마 파일 수, ZIP 크기, CSS/JS 크기, 이미지 용량과 중복 해시를 기록한다.
3. 라이브 데스크톱·태블릿·모바일 대표 화면을 캡처한다.
4. 콘솔 오류, 죽은 링크, 잘못된 slug, 접근성 오류를 기계적으로 수집한다.
5. 현재 템플릿 52개를 `유지 / 공통 템플릿으로 통합 / 개발 전용 / 폐기`로 분류한다.
6. P0/P1/P2 이슈 목록에 담당 단계와 회귀 테스트를 연결한다.

산출물:

- `docs/audits/theme-baseline-2026-08-13.md`
- `docs/audits/theme-template-inventory.csv`
- 기준 스크린샷 및 Lighthouse/axe 결과

완료 기준:

- 모든 기존 템플릿의 처분 상태가 결정됨
- 기존 사용자 변경을 덮어쓰지 않는 구현 기준 SHA 확정
- 각 P0 결함에 재현 방법과 목표 테스트가 있음

### P0-2. 지원 환경 결정

결정 항목:

- 최소 WordPress: 6.6 이상 또는 `theme.json` v2 하향 여부
- Tested up to: 검증 당시 최신 안정 버전
- 최소 PHP: 7.4 유지 여부와 실제 테스트 상한
- 브라우저: 최신 Chrome, Safari, Firefox, Edge와 iOS Safari
- 멀티사이트, 서브디렉터리 설치, RTL 지원 범위

권장안:

- `theme.json` v3을 유지하고 최소 WordPress를 6.6으로 상향
- PHP 7.4, 8.1, 8.2, 8.3, 8.4 매트릭스 검증
- RTL은 구조 검증 대상으로 포함하되 별도 아랍어 데모는 후속 릴리스로 둠

산출물:

- 호환성 결정 기록
- `style.css`와 `readme.txt`에 반영할 버전 표

### P0-3. 디자인 방향과 토큰 승인

작업:

1. 기존 `docs/DESIGN.md`와 실제 테마 차이를 표로 확정한다.
2. Pretendard, `#3A64F5`, 1240px 기반의 Contemporary Blue를 기본 스타일로 승인할지 결정한다.
3. surface, text, border, semantic, spacing, radius, shadow, motion, z-index 토큰을 정의한다.
4. 데스크톱·모바일 타이포그래피 스케일과 line-height를 확정한다.
5. focus ring, hover, active, disabled, loading, empty, error 상태를 정의한다.

산출물:

- 개정 `docs/DESIGN.md`
- 토큰 매핑표 `theme.json ↔ CSS custom properties`

완료 게이트 G0:

- 제품 범위, 호환성, 템플릿 인벤토리, 디자인 방향 승인
- BMAD 스토리 작성 완료
- 전용 worktree 생성 완료

---

## 6. Phase 1 — 판매 차단 결함 제거

### 목적

상업 제품으로 검토할 수 없는 오류, 가짜 기능, 고객사 정보와 위험한 자동 동작을 제거한다.

### P1-1. 인코딩과 구문 복구

대상 후보:

- `functions.php`
- `templates/page-news.html`
- `templates/page-history.html`
- `templates/page-annual-schedule.html`
- `templates/page-vehicle-request.html`
- 테마의 모든 PHP, HTML, JS, JSON

작업:

1. 모든 텍스트 파일의 UTF-8 유효성을 검사하는 실패 테스트를 추가한다.
2. 원본 의미를 확인해 깨진 문자열을 수동 복원한다. 손실 문자를 임의 추정하지 않는다.
3. 홈 슬라이더 inline JS를 별도 파일로 이동한다.
4. `node --check`와 ESLint가 실행되도록 JS 엔트리를 정리한다.
5. PHP lint와 WordPress Coding Standards 기반 문법 검사를 추가한다.

완료 기준:

- UTF-8 invalid file 0
- JS와 PHP syntax error 0
- 메뉴·검색·푸터·Customizer에 깨진 문자 0
- 라이브/로컬 콘솔 오류 0

### P1-2. 가짜 폼과 헌금 인터랙션 제거

대상:

- `page-contact.html`
- `page-documents.html`
- `page-facility-request.html`
- `page-vehicle-request.html`
- `page-giving.html`
- `parts/ministry-contact-modal.html`

작업:

1. `preventDefault()` 후 성공을 표시하는 모든 로직에 실패 테스트를 작성한다.
2. 실제 처리가 없는 입력 폼과 접수 완료 메시지를 제거한다.
3. `patterns/section-form-shell.php`를 네이티브 블록 기반 Form Integration Shell로 재작성한다.
4. 지원 플러그인이 없을 때 관리자에게만 설정 안내를 보여주고 방문자에게 가짜 입력 UI를 노출하지 않는다.
5. 헌금 페이지는 결제·접수 UI가 아니라 안내 콘텐츠와 외부 검증 플러그인 삽입 영역만 제공한다.

완료 기준:

- 가짜 성공 상태 0
- `action="#"` 폼 0
- 테마가 개인정보를 수집·저장·전송하지 않음
- 폼 플러그인 미설치 상태가 명확하고 접근 가능함

### P1-3. 고객사 정보와 개발 흔적 제거

작업:

1. 한빛교회, 가평교회, 우리교회, 실제 주소·전화·계좌·교인번호·실명형 데이터를 검색한다.
2. 판매 데모는 명백한 허구 데이터로 교체하거나 동적 블록으로 전환한다.
3. `page-design-library.html`, lecture 변형, 내부 인증 변형을 판매 패키지에서 제외한다.
4. 푸터의 DEV 링크와 개발용 주석·로그를 제거한다.
5. 모든 `href="#"`를 실제 IA slug, 비활성 텍스트, 또는 제거 중 하나로 처리한다.
6. `/worship-guide/`, `/privacy/` 등 legacy slug를 IA 기준으로 수정한다.

완료 기준:

- 고객사·개인정보성 문자열 0
- 제품 템플릿의 `href="#"` 0
- 공개 개발 페이지·DEV 링크 0
- `docs/SITE_IA_SLUG_RULES.md`와 메뉴·푸터 slug 일치

### P1-4. 자동 사이트 변경 제거

작업:

1. `admin_init`에서 실행되는 페이지 자동 생성 코드의 실패 테스트를 작성한다.
2. 41개 페이지 자동 공개 로직을 테마에서 제거한다.
3. permalink, canonical, request를 강제로 변경하는 테마 필터를 제거한다.
4. 테마 활성화 시 DB 쓰기, rewrite flush, 메뉴 강제 연결이 없는지 검증한다.
5. 향후 Companion Plugin 설치 마법사가 사용할 페이지 목록은 데이터 명세로만 문서화한다.

완료 기준:

- 테마 활성화·업데이트·관리자 진입 시 DB 콘텐츠 변경 0
- 삭제한 페이지가 자동 재생성되지 않음
- 서브디렉터리와 기존 permalink 구조를 강제로 덮어쓰지 않음

### P1-5. 테마와 플러그인 경계 정리

작업:

1. CPT·taxonomy 등록 코드를 테마에서 제거할 별도 이관 목록으로 확정한다.
2. 기존 콘텐츠가 있는 사이트를 보호하기 위해 Companion Plugin 준비 전 제거하지 않고 deprecation 경로와 관리자 경고를 설계한다.
3. 테마 템플릿은 표준 archive/single fallback과 플러그인 제공 post type 템플릿을 분리한다.
4. shortcode 기반 헤더·푸터·영속 기능의 제거 계획을 작성한다.
5. 플러그인이 없을 때 치명적 오류나 빈 흰 화면이 없는 테스트를 추가한다.

완료 게이트 G1:

- 콘솔·syntax·UTF-8 오류 0
- 가짜 폼, 고객사 데이터, 자동 페이지 생성 0
- dead link와 legacy slug 0
- 테마 단독 활성화 smoke test 통과

---

## 7. Phase 2 — 디자인 시스템과 CSS 기반 재구축

### 목적

`theme.json`을 단일 디자인 원천으로 만들고 거대한 단일 CSS를 유지 가능한 레이어로 분해한다.

### P2-1. `theme.json` 정비

작업:

1. 색상, typography, spacing, layout, border, shadow를 승인된 토큰으로 정의한다.
2. 커스텀 색상·폰트·간격 허용 범위를 구매자 안전성에 맞게 결정한다.
3. content/wide size를 1240px 기준으로 확정한다.
4. 코어 블록별 style을 추가하되 CSS와 중복 선언하지 않는다.
5. editor와 front의 typography·색상·spacing 동일성을 검증한다.

### P2-2. CSS 아키텍처 분리

권장 구조:

```text
assets/css/
├─ foundation/
│  ├─ tokens.css
│  ├─ reset.css
│  ├─ typography.css
│  └─ accessibility.css
├─ blocks/
├─ components/
├─ templates/
├─ utilities/
└─ editor.css
```

작업:

1. 기존 selector와 시각 회귀 기준을 고정하는 테스트를 먼저 만든다.
2. 14,000줄 `style.css`를 역할별 파일로 분리하고 빌드 산출물만 배포한다.
3. 미정의 변수 `--kt-shadow-md`, `--kt-shadow-lg`, `--kt-ink-500` 등을 정의하거나 제거한다.
4. 하드코딩 색상을 토큰으로 치환한다.
5. z-index scale을 정의하고 임의 최댓값을 제거한다.
6. 동일 컴포넌트의 중복 미디어쿼리를 통합한다.

### P2-3. 공통 상태와 모션

작업:

- 링크, 버튼, input, navigation, card, badge 상태 정의
- focus-visible을 전역으로 제공
- loading, empty, error, disabled 스타일 제공
- 모션 duration/easing 토큰 도입
- `prefers-reduced-motion`에서 장식 애니메이션 제거

### P2-4. 회귀 방지

작업:

- 핵심 컴포넌트별 Story/fixture 페이지 구성
- Desktop 1440, laptop 1280, tablet 768, mobile 390/320 스냅샷 생성
- 기존 라이브 디자인과 차이가 의도된 것인지 PR 단위로 검토

완료 게이트 G2:

- 디자인 토큰 SSOT 1개
- 미정의 CSS 변수 0
- 임의 색상·z-index 사용이 허용 목록 밖에서 0
- 프런트/에디터 핵심 블록 시각 정합
- Phase 1 화면 시각 회귀 통과

---

## 8. Phase 3 — 네이티브 블록 편집 경험 구축

### 목적

대형 Custom HTML과 shortcode 의존을 제거하고 구매자가 Site Editor에서 핵심 내용을 안전하게 편집하도록 만든다.

### P3-1. 헤더 전환

작업:

1. 기존 헤더의 정보 구조와 모바일 동작을 Playwright 테스트로 고정한다.
2. shortcode 출력 대신 Site Logo, Site Title, Navigation, Search 블록으로 구성한다.
3. 유틸 메뉴와 주 메뉴의 책임을 분리한다.
4. 모바일 메뉴는 코어 Navigation을 우선 사용하고 불가능한 동작만 최소 JS로 보완한다.
5. `aria-expanded`, accessible name, Escape 닫기, focus 복귀를 검증한다.

완료 기준:

- 메뉴 ID 하드코딩 0
- 사이트 로고·이름·메뉴를 Site Editor에서 수정 가능
- 키보드와 모바일에서 전체 메뉴 사용 가능

### P3-2. 푸터 전환

작업:

1. 현재 정적 푸터와 미사용 동적 shortcode 구현을 제거한다.
2. Site Logo, Navigation, Paragraph, Social Icons 블록으로 재구성한다.
3. 연락처·주소·정책 메뉴는 패턴 placeholder와 편집 안내로 제공한다.
4. 없는 SNS 링크는 렌더링하지 않는다.
5. copyright 연도는 블록 패턴 또는 최소 동적 블록 연동 지점으로 설계한다.

### P3-3. 홈페이지 분해

현재 `patterns/style1-home.php`의 대형 HTML을 다음 독립 패턴으로 분해한다.

1. hero
2. welcome/introduction
3. worship schedule
4. latest sermon placeholder/query
5. announcements/news query
6. ministry highlights
7. media/gallery
8. location/contact CTA

각 패턴은 다음을 충족해야 한다.

- 카피, 이미지, 링크를 블록 inspector에서 편집 가능
- 테마 절대 경로 0
- attachment 이미지와 responsive `srcset` 사용
- 장식 wrapper 외 `core/html` 사용 금지
- 중요한 레이아웃은 block locking, 콘텐츠 영역은 `contentOnly`

### P3-4. 일반 페이지와 페이지 히어로

작업:

1. 공통 `page.html`과 page hero를 네이티브 블록으로 만든다.
2. clean/image/split/video/kenburns 변형 중 판매판 유지 범위를 결정한다.
3. 원격 Unsplash와 YouTube 기본값을 제거한다.
4. page title, featured image, excerpt를 동적으로 연결한다.
5. 페이지별 복제 hero part를 공통 패턴/스타일 변형으로 통합한다.

### P3-5. 동적 콘텐츠와 플러그인 상태

작업:

1. 기본 post/page archive·single·search는 코어 Query 블록으로 완성한다.
2. 설교·행사·앨범 템플릿은 Companion Plugin 활성 상태에서만 의미 있는 안내와 출력을 제공한다.
3. 플러그인이 없으면 관리자에게 설치 안내를 제공하되 방문자 페이지를 깨뜨리지 않는다.
4. 데이터가 없을 때 일관된 empty state를 제공한다.
5. 뉴스·주보·QT·영상·자료실의 화면 유형은 IA 문서와 플러그인 명세에 맞춰 연결만 준비한다.

완료 게이트 G3:

- 헤더, 푸터, 홈 핵심 콘텐츠를 코드 없이 편집 가능
- 판매 화면의 대형 `core/html` 블록 0
- 하드코딩 테마 asset 경로 0
- 플러그인 유무 양쪽 smoke test 통과
- 레이아웃 잠금과 콘텐츠 편집 권한 검증

---

## 9. Phase 4 — 템플릿·패턴·스타일 변형 제품화

### 목적

화면 수를 늘리는 대신 재사용 가능한 구성 요소와 명확한 스타터 스타일을 제공한다.

### P4-1. 템플릿 통합

목표 템플릿군:

- Index, Page, Single, Archive, Search, 404
- Landing
- Worship Information
- People/Organization
- Location
- Form Shell
- Plugin-provided content archive/single 호환 템플릿

작업:

1. 52개 템플릿을 공통 템플릿군으로 매핑한다.
2. 콘텐츠만 다른 page-slug 템플릿은 패턴으로 전환한다.
3. 유지할 page-slug 템플릿은 구조적 필요가 있는 경우로 제한한다.
4. archive pagination, no-results, 긴 제목, 이미지 없음, 빈 excerpt를 검증한다.
5. IA의 모든 slug가 적절한 template 또는 fallback을 갖는지 매트릭스로 확인한다.

### P4-2. 패턴 15~20개 제작

필수 패턴:

- Hero: clean, image, split, media
- 예배시간
- 최근 설교
- 공지·뉴스
- 행사 목록
- 사역·부서 소개
- 교역자 소개
- 새가족 안내
- 오시는 길
- 미디어 갤러리
- CTA
- Form Integration Shell
- 푸터 연락처
- Empty/Plugin Missing State

각 패턴에 title, slug, category, description, viewport width를 정의하고 번역 가능하게 만든다.

### P4-3. 스타일 변형 4개

1. Contemporary Blue — 현재 디자인의 정제형
2. Warm Community — 크림·웜그레이·사진 중심
3. Editorial Church — 설교·역사·뉴스 중심 타이포그래피형
4. Broadcast First — 온라인 예배·설교 영상 중심

검증 항목:

- body와 heading typography
- 색상 대비
- 버튼과 링크 상태
- card, quote, table, form shell
- header/footer
- 코어 블록 gallery, quote, list, table, media-text, cover

스타일 변형은 단순 색상 교체에 그치지 않고 typography, spacing, border, button, card까지 일관된 시각 체계를 가져야 한다.

### P4-4. 판매용 대표 자산

작업:

- 현재 내용과 맞지 않는 `screenshot.png` 교체
- WordPress 규격에 맞는 대표 스크린샷 제작
- 각 스타일의 desktop/mobile preview 제작
- 실제 제품에 포함된 기능만 이미지와 카피에 표시
- 사용 이미지의 출처·라이선스를 asset ledger와 연결

완료 게이트 G4:

- 빈 설치에서 10분 내 기본 사이트 구성
- 패턴 15개 이상, 스타일 변형 4개
- 템플릿 중복과 개발 전용 화면 제거
- 모든 IA slug에 유효한 fallback 존재
- 디자인 리뷰 통과

---

## 10. Phase 5 — 성능·접근성·국제화·SEO

### 목적

상업 테마의 신뢰성과 심사 적합성을 수치로 검증한다.

### P5-1. 자산과 성능

작업:

1. 이미지 중복 해시를 제거한다.
2. 대형 PNG/JPG를 WebP/AVIF로 변환하고 원본 필요성을 검토한다.
3. 배경이 아닌 콘텐츠 이미지는 WordPress attachment로 제공한다.
4. width/height, lazy loading, fetchpriority를 역할별로 적용한다.
5. Pretendard와 필요한 JS 라이브러리를 재배포 권리 확인 후 로컬 번들한다.
6. Tailwind CDN, jsDelivr, 원격 Unsplash 기본값을 제거한다.
7. CSS/JS를 필요한 템플릿과 블록에서만 로드한다.
8. YouTube·지도는 클릭 또는 동의 후 로드하는 privacy placeholder를 제공한다.

성능 예산:

- 판매 테마 ZIP 10MB 이하 목표
- 초기 CSS gzip 60KB 이하
- 초기 JS gzip 50KB 이하
- 모바일 Lighthouse Performance 85 이상
- LCP 2.5초 이하, CLS 0.1 이하, INP 200ms 이하를 테스트 환경 목표로 설정

### P5-2. 접근성

작업:

- skip link와 `main` landmark
- 전역 `:focus-visible`
- 메뉴·검색·modal·tabs의 완전한 키보드 조작
- modal focus trap, Escape 닫기, focus 복귀, background inert
- tabs의 arrow/Home/End와 roving tabindex
- 정보성 이미지 alt, 장식 이미지 빈 alt
- heading hierarchy와 accessible name 검사
- 상태 메시지 `role=status`/`aria-live`
- 색상 대비와 200% 확대 검사
- reduced motion 전역 적용

필수 흐름:

- 헤더 메뉴 열기와 이동
- 검색
- 홈 CTA 이동
- archive 필터/페이지 이동
- single 탐색
- 폼 플러그인 placeholder 확인

### P5-3. 국제화

작업:

1. `load_theme_textdomain()`을 추가한다.
2. PHP 사용자 문자열을 gettext 함수로 감싼다.
3. JS 문자열은 `wp_set_script_translations()` 경로를 사용한다.
4. patterns와 style variation metadata를 번역 가능하게 만든다.
5. `languages/ktheme-v2.pot`를 생성한다.
6. 한국어 기본 번역을 제공하고 영어 locale smoke test를 실행한다.
7. 긴 영어 문장과 CJK 줄바꿈에서 overflow를 확인한다.

### P5-4. SEO와 개인정보 기본값

테마가 SEO 플러그인 영역을 침범하지 않는 범위에서 다음을 보장한다.

- 문서당 H1 하나의 기본 구조
- semantic header/main/footer/nav
- 이미지 alt와 link text 품질
- title/tagline 기본 출력
- canonical·Open Graph를 테마가 중복 생성하지 않음
- YouTube·지도·외부 폰트에 사전 요청 없음
- SEO·캐시·쿠키 플러그인 호환 테스트

완료 게이트 G5:

- axe critical/serious 0
- keyboard-only 주요 흐름 통과
- 320px~1440px 가로 overflow 0
- 성능 예산 충족 또는 승인된 예외 문서화
- 원격 무동의 런타임 리소스 0
- POT 생성 및 영문 locale smoke test 통과

---

## 11. Phase 6 — 상업 패키징과 Release Candidate

### 목적

설치 가능한 코드가 아니라 판매·업데이트·지원할 수 있는 제품 패키지를 만든다.

### P6-1. 테마 메타데이터와 법적 파일

필수 산출물:

- `readme.txt`
- `LICENSE`
- `THIRD-PARTY-NOTICES.md`
- `CHANGELOG.md`
- `assets/licenses/` 또는 자산 출처 대장
- 지원 WordPress/PHP/브라우저 표

작업:

1. `style.css`, package metadata, changelog 버전을 단일 릴리스 버전으로 맞춘다.
2. Theme URI와 Author URI를 제품 사이트 기준으로 수정한다.
3. 코드·폰트·SVG·사진·AI 생성 이미지의 저작권 및 재배포 조건을 기록한다.
4. 100% GPL-compatible 배포 원칙을 확정한다.
5. 권리가 불명확한 자산은 판매 ZIP에서 제거한다.

### P6-2. 사용자 문서

문서 목차:

1. 요구사항과 설치
2. Site Editor 시작하기
3. 로고·색상·서체·메뉴 변경
4. 홈페이지 패턴 구성
5. 스타일 변형 선택
6. 폼·설교·행사 플러그인 연결
7. 개인정보와 외부 미디어
8. child theme 사용
9. 업데이트·백업·롤백
10. 자주 묻는 질문과 지원 범위

### P6-3. Child theme와 확장 지점

작업:

- 최소 child theme ZIP 제공
- 안정적인 CSS class와 hook의 공개 범위 결정
- 내부 class와 공개 API 구분
- 템플릿 override 및 업데이트 충돌 방지 문서화
- deprecated API 정책 정의

### P6-4. 빌드와 ZIP

작업:

1. 소스와 배포 파일 목록을 분리한다.
2. 개발 테스트, source mockup, `.DS_Store`, 내부 문서, 자격증명, 미사용 원본 이미지를 제외한다.
3. deterministic ZIP 스크립트와 checksum을 생성한다.
4. ZIP 설치→활성화→편집→업데이트→비활성화→삭제 흐름을 깨끗한 WordPress에서 검증한다.
5. FTP 배포는 릴리스 검증 경로로 사용하지 않고 아티팩트 기반 배포로 전환한다.

### P6-5. CI 품질 게이트

필수 검사:

- UTF-8 및 JSON validation
- PHP lint
- PHPCS/WPCS
- Theme Check
- PHPUnit/WordPress integration
- Vitest
- Playwright desktop/mobile
- axe
- 링크·asset URL 검사
- 이미지 크기·중복·라이선스 ledger 검사
- ZIP 내용 allowlist와 악성정보/비밀정보 검사

완료 게이트 G6:

- 모든 REQUIRED 검사 통과
- 깨끗한 환경 설치·업데이트·삭제 성공
- LICENSE와 자산 출처 누락 0
- 제품 문서와 실제 UI 일치
- 재현 가능한 RC ZIP과 checksum 생성

---

## 12. Beta — 실제 교회 사용자 검증

### 대상

- 소형 교회 2곳
- 중형 교회 2곳
- 제작·관리 대행자 1~2명
- WordPress 비개발 운영자 최소 3명

### 시나리오

1. 빈 사이트에 테마 설치
2. 로고·교회명·주소·메뉴 변경
3. 홈페이지 hero와 예배시간 수정
4. 설교/뉴스 연결 상태 확인
5. 모바일 메뉴와 검색 사용
6. 스타일 변형 교체
7. 테마 업데이트와 롤백
8. 플러그인 없이 테마 비활성화·재활성화

### 측정 지표

- 기본 사이트 구성 시간: 10분 이내 목표
- 문서 없이 완료한 핵심 과업 비율: 80% 이상
- 치명적 오류: 0
- 지원 문의 유발 지점과 평균 해결 시간
- 테마 변경 후 데이터 손실: 0
- 업데이트 실패·복구 실패: 0

Beta 종료 기준:

- P0/P1 결함 0
- P2는 출시 문서에 명시 가능한 항목만 허용
- 운영자 3명 이상이 핵심 과업을 도움 없이 완료
- 최종 RC 회귀 테스트와 디자인 리뷰 통과

## 13. 테스트 매트릭스

### 환경

| 축 | 조합 |
|---|---|
| WordPress | 6.6, 최신 안정 버전 |
| PHP | 7.4, 8.1, 8.2, 8.3, 8.4 |
| 브라우저 | Chrome, Safari, Firefox, Edge 최신 |
| 화면 | 320, 390, 768, 1024, 1280, 1440px |
| 설치 | 루트, 서브디렉터리, 멀티사이트 smoke |
| 콘텐츠 | 빈 콘텐츠, Unit Test Data, 긴 제목, 이미지 없음, 다량 콘텐츠 |
| 언어 | ko_KR, en_US, RTL smoke |
| 플러그인 | 없음, Companion 후보, 주요 SEO·cache·form 조합 |

### 단계별 최소 검증 명령

실제 도구 도입에 맞춰 script 이름을 확정하되 목표 인터페이스는 다음과 같다.

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm test:e2e
pnpm test:a11y
pnpm test:links
pnpm test:assets
pnpm test:visual
pnpm build:theme
pnpm verify:theme-zip
composer test
composer phpcs
composer theme-check
```

검증 결과는 각 PR 설명과 `docs/audits/releases/<version>.md`에 기록한다.

## 14. PR과 커밋 분할

권장 PR 순서:

1. `fix/theme-release-blockers`
2. `refactor/theme-design-tokens`
3. `refactor/native-header-footer`
4. `refactor/native-home-patterns`
5. `feat/theme-patterns-variations`
6. `perf/a11y-i18n-hardening`
7. `chore/theme-release-packaging`

각 PR은 다음을 포함한다.

- 관련 스토리와 task ID
- 변경 전 실패 테스트
- 변경 후 검증 결과
- desktop/mobile 스크린샷
- 접근성·성능 영향
- 데이터·호환성·롤백 위험
- 문서 변경

## 15. 위험과 대응

| 위험 | 영향 | 대응 |
|---|---|---|
| 현재 dirty main과 충돌 | 사용자 작업 손실 | 승인 후 전용 worktree, 기존 변경 파일 직접 수정 금지 |
| CPT를 먼저 제거해 기존 콘텐츠가 사라짐 | 고객 데이터 접근 불가 | Companion Plugin과 migration 경로 준비 후 단계적 제거 |
| 대형 HTML 분해 중 시각 회귀 | 라이브 품질 저하 | 변경 전 viewport snapshot, 패턴별 작은 PR |
| CSS 분리 후 우선순위 충돌 | 화면별 깨짐 | cascade layer와 visual regression 도입 |
| 이미지 압축으로 품질 저하 | 판매 데모 가치 감소 | 대표 이미지별 시각 비교와 품질 예산 |
| 플러그인 호환 범위 확대 | 일정 지연 | 첫 RC는 명시된 소수 조합만 공식 지원 |
| 네이티브 블록 자유도가 과도함 | 구매자가 레이아웃 훼손 | contentOnly와 block locking, 복구 문서 |
| WordPress.org 심사 기준 변경 | 제출 지연 | RC 직전 공식 규칙과 최신 Theme Check 재확인 |
| 외부 자산 권리 불명확 | 판매·배포 불가 | Phase 0부터 asset ledger, 불명확 자산 즉시 교체 |

## 16. 단계별 의사결정이 필요한 항목

Phase 0에서 다음을 확정해야 이후 재작업을 피할 수 있다.

1. 기본 디자인을 현재 Pretendard/blue로 고정할지
2. 최소 WordPress 6.6을 허용할지
3. 유지할 hero 변형의 수
4. 52개 템플릿 중 실제 판매 대상 IA 범위
5. Lite에 포함할 패턴과 Pro 전용 패턴의 경계
6. 공식 지원할 폼·SEO·cache 플러그인 목록
7. 100% GPL-compatible 배포 원칙
8. WordPress.org 제출과 자사몰 출시의 선후관계

권장 기본값은 다음과 같다.

- Pretendard/Contemporary Blue를 기본으로 유지
- WordPress 6.6 이상
- hero 4종 유지, Ken Burns는 reduced-motion 보완 후 선택 제공
- Lite는 기본 템플릿·10개 패턴·2개 style variation
- 판매판은 15~20개 패턴·4개 style variation
- 폼은 Fluent Forms, Contact Form 7부터 지원
- SEO는 Yoast SEO와 Rank Math smoke test
- cache는 LiteSpeed Cache와 WP Rocket smoke test
- 전체 제품 100% GPL-compatible
- WordPress.org Lite 준비와 자사몰 RC를 병행하되 자사몰 베타를 먼저 진행

## 17. 최종 Definition of Done

다음 항목이 모두 충족되어야 “판매 가능한 테마 RC”로 선언한다.

- [ ] 테마에 CPT·폼 처리·결제·자동 콘텐츠 생성이 없음
- [ ] 콘솔, UTF-8, PHP, JS 오류 0
- [ ] 고객사·개인정보·DEV 콘텐츠 0
- [ ] 제품 템플릿 dead link 0
- [ ] 네이티브 블록 기반 header/footer/home/page 완성
- [ ] 하드코딩 테마 경로 0
- [ ] 패턴 15개 이상, style variation 4개
- [ ] 빈 설치에서 기본 사이트 10분 내 구성
- [ ] Theme Check REQUIRED 오류 0
- [ ] PHPCS/WPCS 오류 0
- [ ] Playwright·axe·시각 회귀 통과
- [ ] WCAG 2.2 AA 주요 흐름 충족
- [ ] 모바일 Lighthouse Performance 85 이상
- [ ] 원격 무동의 런타임 자산 0
- [ ] 모든 문자열 번역 가능, POT 포함
- [ ] LICENSE·THIRD-PARTY-NOTICES·자산 대장 완성
- [ ] child theme, changelog, 설치·편집·업데이트 문서 포함
- [ ] RC ZIP 설치·업데이트·롤백 검증
- [ ] 실제 운영자 beta 완료 및 P0/P1 0

## 18. 즉시 착수 순서

계획 승인 후 첫 실행 세션은 다음 네 작업으로 제한한다.

1. BMAD 스토리 `Commercial Theme Phase 1 — Release Blockers` 작성
2. `story-commercial-theme` worktree 생성
3. UTF-8·JS syntax·가짜 폼·자동 페이지 생성의 실패 테스트 작성
4. Phase 1 수정과 G1 검증

Phase 1이 통과된 뒤 디자인 토큰 승인 세션을 별도로 열고 Phase 2를 시작한다. Phase 전환을 한 PR에 섞지 않는다.
