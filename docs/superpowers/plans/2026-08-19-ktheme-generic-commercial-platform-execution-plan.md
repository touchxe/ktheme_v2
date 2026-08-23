# KTheme 범용 상업 테마 플랫폼 전체 실행계획

- 작성일: 2026-08-19
- 실행 브랜치: `codex/story-commercial-theme`
- 구현 worktree: `/Users/shin-youngbin/workspace/wt/story-commercial-theme`
- 제품 구성: KTheme Theme + KTheme Engine + Industry Presets
- 예상 작업량: 45~60 작업일
- 기준 문서:
  - `AGENTS.md`
  - `docs/DESIGN.md`
  - `docs/architecture/THEME_EXTENSION_STANDARD.md`
  - `docs/architecture/EXTENSION_NAMING_STANDARD.md`
  - `docs/architecture/extension-registry.json`

## 1. 최종 목표

현재 디자인과 시각적 결과는 유지하면서 KTheme를 특정 교회 사이트가 아닌 범용 WordPress 상업 테마 플랫폼으로 전환한다.

최종 제품은 다음 세 층으로 구성한다.

```text
KTheme Theme
  디자인 토큰, 스킨, 패턴, 템플릿, 표현

KTheme Engine
  범용 콘텐츠 모델, 기능 블록, 확장 레지스트리, 통합 API

KTheme Presets
  업종별 labels, terms, patterns, demo content
```

교회 사이트는 `ktheme-preset-church`를 선택한 한 가지 사용 사례이며 교육, 비영리, 미디어, 행사 사이트도 같은 엔진 위에서 확장할 수 있어야 한다.

## 2. 확정된 제품 결정

### 2.1 기존 고객과 호환성

- 기존 고객 사이트는 없다.
- 이전 shortcode, post type, taxonomy를 위한 호환 계층을 만들지 않는다.
- 데이터 migration 기능을 만들지 않는다.
- 개발용 데이터는 새 범용 모델 기준으로 다시 생성한다.
- 공개 전에 모든 임시 이름과 교회 전용 영구 key를 제거한다.

### 2.2 디자인

- 현재 `docs/DESIGN.md`를 유지한다.
- 현재 Pretendard, 색상, 간격, 레이아웃과 컴포넌트 인상을 유지한다.
- 이번 표준화에서 시각적 리디자인을 하지 않는다.
- `theme.json`과 CSS의 구조만 정리한다.
- 의도하지 않은 시각 변경은 회귀로 처리한다.

### 2.3 영구 네이밍

| 영역 | 확정 이름 |
|---|---|
| 제품 어근 | `ktheme` |
| 테마 slug | 현재 `ktheme-modu`, 공개명 변경은 별도 결정 |
| 엔진 플러그인 | `ktheme-engine` |
| PHP 함수 prefix | `ktheme_` |
| PHP namespace | `KTheme\` |
| 블록 namespace | `ktheme-engine` |
| 패턴 namespace | `ktheme` |
| 신규 CSS prefix | `ktheme-` |
| 기존 CSS prefix | `.kt-*` 유지 |
| REST namespace | `ktheme/v1` |
| 업종 preset | `ktheme-preset-{industry}` |

## 3. 현재 기준선

### 완료된 작업

- 백업 브랜치와 worktree 생성
- UTF-8와 주요 PHP/JS 오류 복구
- 관리자 진입 시 자동 페이지 생성 차단
- 가짜 폼·헌금 처리 제거
- 헤더·푸터·페이지 히어로·위치 안내를 native block 구조로 전환
- 활성 템플릿과 part의 shortcode block 제거
- 패턴 카테고리와 native gallery·schedule 패턴 추가
- 범용 네이밍 표준과 extension registry 작성
- extension registry validator와 테스트 작성

### 현재 남은 핵심 부채

| 항목 | 현재 | 목표 |
|---|---:|---:|
| `functions.php` | 약 2,257줄 | setup·assets 중심 300줄 이하 또는 모듈 합계 관리 |
| `style.css` | 약 14,135줄 | 계층별 source + 검증된 배포 bundle |
| 테마 등록 CPT | 3개 | 0개 |
| 테마 등록 taxonomy | 1개 | 0개 |
| 테마 등록 shortcode | 7개 | 0개 |
| 패턴 namespace | `ktheme-modu/` | `ktheme/` |
| 스타일 이름 | `style1` | `skin-foundation` |
| 교회 전용 key | 다수 | 범용 key 또는 church preset 데이터 |
| 실제 PHP 통합 테스트 | 없음 | WordPress PHPUnit 또는 wp-env 기반 |
| 실제 브라우저 E2E | 부분 | 핵심 흐름 전체 |

## 4. 실행 트랙과 의존성

```text
Phase 0 기준선 고정
  ↓
Phase 1 네이밍 전환 게이트
  ↓
Phase 2 KTheme Engine 골격
  ↓
Phase 3 범용 콘텐츠 모델
  ↓
Phase 4 테마 기능 제거·연결
  ↓
Phase 5 패턴·스킨·컴포넌트 표준화
  ↓
Phase 6 CSS·PHP·JS 모듈화
  ↓
Phase 7 Industry Preset
  ↓
Phase 8 고객 중립화·데모·자산
  ↓
Phase 9 접근성·성능·보안·호환성
  ↓
Phase 10 문서·패키징·RC
  ↓
Phase 11 Beta·출시
```

Phase 2부터는 theme와 engine을 별도 패키지로 테스트하지만 하나의 저장소에서 함께 개발한다.

## 5. 공통 실행 규칙

### 5.1 TDD 순서

모든 코드 작업은 다음 순서를 따른다.

1. 실패 테스트 또는 검증 fixture 추가
2. 실패 결과 확인
3. 최소 구현
4. 관련 회귀 테스트 실행
5. 전체 test·typecheck·lint 실행
6. 단계별 독립 커밋

문서와 registry를 변경할 때도 validator가 새 규칙을 검사하도록 함께 갱신한다.

### 5.2 파일 책임

- theme는 표현만 담당한다.
- engine은 데이터와 기능을 담당한다.
- preset은 업종별 설정과 데모를 담당한다.
- theme에서 DB content를 생성·수정·삭제하지 않는다.
- theme에서 CPT, taxonomy, shortcode, form handler를 등록하지 않는다.
- engine에서 특정 업종의 문구를 영구 key로 사용하지 않는다.

### 5.3 확장 판정 순서

새로운 “위젯” 또는 “컴포넌트” 요청은 다음 순서로 판정한다.

1. Pattern으로 가능한가?
2. Block style로 가능한가?
3. Block variation으로 가능한가?
4. Custom block이 필요한가?
5. Classic sidebar 지원 때문에 Legacy widget이 필요한가?

앞 단계로 해결할 수 있으면 뒤 단계 구현을 금지한다.

### 5.4 커밋 경계

권장 커밋 형식:

```text
test: define generic content model contract
feat: scaffold ktheme engine registry
refactor: move content types to engine
refactor: remove legacy theme shortcodes
refactor: migrate patterns to stable namespace
build: validate extension manifests
docs: document preset authoring workflow
```

한 커밋에 theme 기능 제거와 대규모 CSS 변경을 함께 넣지 않는다.

## 6. Phase 0 — 기준선과 실행 인벤토리

### 목적

삭제·이동·유지 대상을 파일별로 확정하고 이후 시각·기능 회귀를 판단할 기준을 만든다.

### P0-1. 테마 인벤토리

작업:

1. 52개 template을 `core`, `generic`, `church-preset`, `development-only`, `remove`로 분류한다.
2. 18개 part를 `site-shell`, `content`, `preset`, `remove`로 분류한다.
3. pattern 8개의 namespace, category, native block 여부를 기록한다.
4. CSS selector를 foundation, block, component, pattern, template, utility로 분류한다.
5. JS를 기능, 연결 화면, inline 여부, 의존성 기준으로 분류한다.
6. 이미지·폰트·로고의 출처와 재배포 가능 여부를 기록한다.

산출물:

- `docs/audits/template-inventory.csv`
- `docs/audits/component-inventory.csv`
- `docs/audits/asset-license-inventory.csv`
- `docs/audits/legacy-identifier-inventory.md`

### P0-2. 시각 기준선

대표 화면:

- front page
- 일반 page
- archive
- single
- search와 검색 결과 없음
- 404
- form integration page
- media gallery
- mobile navigation

viewport:

- 1440px
- 1280px
- 768px
- 390px
- 320px

완료 기준 G0:

- 모든 파일에 유지·이동·삭제 상태가 있음
- 대표 화면 기준 screenshot이 있음
- 현재 console error와 접근성 오류 목록이 있음
- 이후 단계의 각 삭제 항목이 인벤토리 ID와 연결됨

예상 작업량: 2~3일

## 7. Phase 1 — 영구 네이밍 전환

### 목적

공개 후 바꾸기 어려운 block, pattern, post type, taxonomy, option 이름을 구현 전에 확정한다.

### P1-1. registry 강화

작업:

1. `extension-registry.json`을 코드의 SSOT로 고정한다.
2. registry schema의 모든 namespace 필드를 required로 명시한다.
3. `extension.json` 중복 id를 검사한다.
4. manifest entry 파일 존재 여부를 검사한다.
5. dependency 순환과 존재하지 않는 dependency를 검사한다.
6. 금지 영구 용어를 PHP, JSON, block metadata까지 검사한다.
7. 사용자 노출 copy와 demo에는 금지 용어 검사를 적용하지 않도록 범위를 분리한다.

### P1-2. pattern namespace 전환

변경:

```text
ktheme-modu/page-*        -> ktheme/page-*
ktheme-modu/section-*     -> ktheme/section-*
ktheme-modu/query-*       -> ktheme/query-*
ktheme-modu/integration-* -> ktheme/integration-*
```

작업:

1. 실패 테스트에서 `ktheme-modu/` pattern slug를 금지한다.
2. pattern PHP header를 일괄 수정한다.
3. template의 `wp:pattern` 참조를 수정한다.
4. category를 `ktheme-pages`, `ktheme-sections`, `ktheme-queries`, `ktheme-integrations`로 수정한다.
5. duplicate slug와 누락 참조를 검사한다.

### P1-3. style 이름 전환

변경:

```text
styles/style1.json -> styles/skin-foundation.json
ktheme-modu-style1   -> 의미 기반 category 또는 제거
style1-* pattern   -> 역할 기반 pattern 이름
```

현재 JSON 값과 디자인은 그대로 유지한다. 파일명, title, slug만 의미 기반으로 바꾼다.

완료 기준 G1:

- version이 들어간 공개 pattern namespace 0개
- `style1`, `style2`, `style3` 공개 식별자 0개
- registry validator 통과
- 기존 대표 화면 visual diff 허용 범위 이내

예상 작업량: 2~4일

## 8. Phase 2 — KTheme Engine 골격

### 목적

새 기능을 일관되게 추가·검색·비활성화할 수 있는 범용 플러그인 기반을 만든다.

### 목표 구조

```text
wp-content/plugins/ktheme-engine/
├─ ktheme-engine.php
├─ readme.txt
├─ uninstall.php
├─ languages/
├─ includes/
│  ├─ class-plugin.php
│  ├─ class-extension-registry.php
│  ├─ class-module-loader.php
│  ├─ class-asset-manager.php
│  └─ class-rest-controller.php
├─ contracts/
│  └─ interface-extension.php
├─ modules/
│  ├─ content-types/
│  ├─ taxonomies/
│  ├─ blocks/
│  ├─ integrations/
│  └─ widgets/
├─ build/
│  ├─ blocks-manifest.php
│  └─ extensions-manifest.php
└─ assets/
   ├─ css/
   └─ js/
```

### P2-1. 플러그인 bootstrap

작업:

1. WordPress 표준 plugin header 작성
2. `ktheme-engine` text domain 고정
3. PHP version과 WordPress version guard 추가
4. activation은 capability와 환경 검사만 수행
5. activation 시 content나 page를 생성하지 않음
6. uninstall은 명시적 사용자 선택 없이 콘텐츠를 삭제하지 않음
7. 모든 전역 function과 class 이름을 registry prefix로 검사

### P2-2. extension registry runtime

작업:

1. 개발 시 `extension.json`을 검증한다.
2. 빌드 시 manifest를 PHP 배열로 생성한다.
3. runtime에서는 디렉터리 전체 scan 대신 생성된 manifest를 읽는다.
4. extension id, type, version, dependency, status를 제공한다.
5. dependency 순서대로 module을 등록한다.
6. experimental과 deprecated 상태를 관리자에게 구분해 표시한다.
7. public hook `ktheme/extension/registered`를 제공한다.

### P2-3. 테스트 환경

작업:

1. WordPress PHPUnit 또는 `wp-env` 테스트 환경 추가
2. 지원 PHP matrix 정의
3. plugin activation/deactivation smoke test
4. multisite 최소 smoke test
5. REST permission test 기반 추가

완료 기준 G2:

- 플러그인이 단독 활성화됨
- DB content 자동 생성 0건
- extension manifest 오류가 build 전에 실패함
- 모듈 dependency 순서 테스트 통과
- theme가 없어도 fatal error가 없음

예상 작업량: 4~6일

## 9. Phase 3 — 범용 콘텐츠 모델

### 목적

교회 전용 CPT를 재사용 가능한 콘텐츠 모델로 바꾼다.

### P3-1. post type

기본 모델:

| key | 목적 | 지원 필드 |
|---|---|---|
| `ktheme_media` | 영상·오디오·미디어 문서 | title, editor, excerpt, thumbnail, author |
| `ktheme_event` | 날짜·장소가 있는 일정 | title, editor, excerpt, thumbnail |
| `ktheme_resource` | 파일·링크·자료 | title, editor, excerpt, thumbnail |
| `ktheme_profile` | 사람·팀 프로필 | title, editor, excerpt, thumbnail, page-attributes |

작업:

1. 20자 이하 key 테스트
2. REST 활성화와 capability 설계
3. rewrite slug와 내부 key 분리
4. archive 지원 여부를 모델별로 결정
5. labels가 preset filter로 교체될 수 있도록 구성
6. plugin 비활성 시 데이터가 DB에 남는지 확인

### P3-2. taxonomy

기본 모델:

- `ktheme_media_type`
- `ktheme_collection`
- `ktheme_topic`
- `ktheme_audience`
- `ktheme_location`

작업:

1. 32자 이하 key 테스트
2. 적용 post type을 registry에서 명시
3. hierarchical 여부 결정
4. REST schema와 rewrite 정책 정의
5. preset이 초기 term을 선택적으로 제공할 수 있도록 seed interface 정의

### P3-3. meta schema

meta는 post type에 필수인 최소 정보만 제공한다.

예시:

- media: source URL, duration, publish context
- event: start, end, timezone, location reference
- resource: file ID, external URL, resource format
- profile: role, contact visibility, display order

규칙:

- `register_post_meta()` 사용
- `ktheme_` prefix 사용
- type, default, single, sanitize, auth callback 명시
- REST 공개 데이터와 비공개 데이터를 분리
- 개인 정보는 기본 저장 모델에 포함하지 않음

### P3-4. 기존 개발 데이터 처리

기존 고객이 없으므로 migration을 작성하지 않는다.

작업:

1. 개발 DB를 백업한다.
2. 기존 `ktheme_sermon`, `ktheme_album` 데이터는 폐기 가능한 demo로 분류한다.
3. 범용 seed script로 새 데이터를 만든다.
4. CI fixture도 새 key로 교체한다.
5. migration code가 제품 package에 포함되지 않는지 검사한다.

완료 기준 G3:

- plugin이 4개 범용 post type과 5개 taxonomy를 등록
- theme에 register_post_type/register_taxonomy 0개
- 교회 용어 영구 key 0개
- REST·capability·sanitization 테스트 통과
- 데이터 migration code 0개

예상 작업량: 6~8일

## 10. Phase 4 — 테마 기능 제거와 Engine 연결

### 목적

theme를 표현 계층으로 정리하고 engine 미설치 상태에서도 안전하게 만든다.

### P4-1. shortcode 완전 제거

삭제 대상:

- `ktheme_header`
- `ktheme_site_header`
- `ktheme_footer`
- `ktheme_page_hero`
- `ktheme_location_page`
- `ktheme_sunday_worship_grid`
- `ktheme_photo_carousel`

작업:

1. `add_shortcode()` 0개를 요구하는 실패 테스트 작성
2. 사용되지 않는 renderer와 data provider 삭제
3. shortcode 전용 JS와 CSS의 참조 여부 확인
4. 더 이상 enqueue되지 않는 asset 제거
5. native pattern과 template part가 같은 화면을 유지하는지 visual test

### P4-2. 콘텐츠 template 일반화

변경 예:

```text
archive-ktheme_sermon -> archive-ktheme_media
single-ktheme_sermon  -> single-ktheme_media
archive-ktheme_album  -> taxonomy 또는 generic media collection 화면
```

작업:

1. generic archive/single template 계약 정의
2. Query block의 postType을 범용 key로 변경
3. 교회별 제목은 preset 또는 term에서 가져오도록 변경
4. engine이 없을 때 standard archive/single fallback 확인
5. 빈 결과와 plugin 미설치 안내는 관리자에게만 표시

### P4-3. theme `functions.php` 축소

목표 구조:

```text
inc/
├─ setup.php
├─ assets.php
├─ pattern-categories.php
├─ block-styles.php
├─ navigation.php
└─ engine-integration.php
```

작업:

1. include 목록을 명시적으로 관리
2. global function은 `ktheme_` prefix 사용
3. engine integration은 `post_type_exists()` 등으로 안전하게 검사
4. DB write와 rewrite flush 제거
5. 사용하지 않는 Customizer code 제거

완료 기준 G4:

- theme CPT·taxonomy·shortcode 등록 0개
- engine 미설치 theme smoke test 통과
- engine 설치 시 generic archive/single 표시
- 현재 대표 화면 visual regression 통과
- 사용하지 않는 JS/CSS asset 0개

예상 작업량: 5~7일

## 11. Phase 5 — 패턴·스킨·컴포넌트 표준화

### 목적

새 디자인, 템플릿, 위젯을 복제 없이 추가할 수 있는 제작 체계를 완성한다.

### P5-1. pattern library

카테고리:

- `ktheme-pages`
- `ktheme-sections`
- `ktheme-queries`
- `ktheme-integrations`
- `ktheme-headers`
- `ktheme-footers`

필수 pattern family:

- hero
- feature/story
- media grid
- content query
- event list
- profile grid
- resource list
- CTA
- contact/form integration
- empty state

규칙:

- native core blocks 우선
- pattern header 필수
- 고객·업종 중립 copy
- 하드코딩 theme path 금지
- `href="#"` 금지
- inline script와 style 금지
- editor에서 각 text와 image 편집 가능

### P5-2. 스킨

현재 디자인을 다음 이름으로 유지한다.

```text
styles/skin-foundation.json
```

작업:

1. 기존 `style1.json` 값을 그대로 이전
2. `title`, `slug`, filename만 의미 기반으로 변경
3. structure와 content는 skin에 넣지 않음
4. 향후 skin 추가용 checklist와 visual fixture 작성
5. 사용자가 skin을 선택했을 때 WordPress DB에 저장되는 특성을 문서화

### P5-3. block style과 variation

등록 예:

- `ktheme-framed`
- `ktheme-borderless`
- `ktheme-emphasized`

작업:

1. appearance만 다르면 block style
2. 초기 attributes가 다르면 block variation
3. custom block 생성 전 판정 테스트 작성
4. core block style은 `theme.json` 또는 block stylesheet 우선

### P5-4. extension author template

새 확장에 필요한 template:

```text
extension.json
README.md
tests/
fixtures/
assets/
```

문서에 포함할 내용:

- 이름 선택법
- type 판정법
- 상태 정의
- accessibility 상태
- empty/loading/error 상태
- dependency 선언법
- deprecation 절차

완료 기준 G5:

- 대표 pattern family 제공
- `skin-foundation`이 현재 디자인과 동일
- 신규 extension이 manifest template으로 생성 가능
- 같은 기능을 widget·block·pattern으로 중복 등록하지 않음
- editor와 frontend 스타일 일치

예상 작업량: 5~7일

## 12. Phase 6 — CSS·PHP·JavaScript 모듈화

### 목적

대형 단일 파일을 역할별 source로 분리하고 필요한 화면에 필요한 asset만 로드한다.

### P6-1. CSS source 구조

```text
assets/css/
├─ foundations/
│  ├─ tokens.css
│  ├─ reset.css
│  ├─ typography.css
│  └─ accessibility.css
├─ blocks/
├─ patterns/
├─ components/
├─ templates/
├─ utilities/
└─ editor.css
```

작업:

1. selector inventory 작성
2. 기존 순서와 specificity 기준선 고정
3. 한 계층씩 이동
4. 미정의 variable 제거
5. 중복 media query 통합
6. core block은 가능한 한 `theme.json`으로 이동
7. 큰 block CSS는 `wp_enqueue_block_style()`로 조건부 로드
8. 배포 `style.css` 생성 방식 문서화

### P6-2. JavaScript

구조:

```text
assets/js/components/
├─ navigation.js
├─ modal.js
├─ carousel.js
└─ tabs.js
```

규칙:

- inline JS 0개
- 전역 변수 0개
- `data-ktheme-*` selector 사용
- 이벤트 root 범위 제한
- keyboard와 reduced motion 지원
- 필요한 template에서만 enqueue
- WordPress 내장 라이브러리 재번들링 금지

### P6-3. bundle과 source 배포

- 빌드 source와 배포 asset 관계를 명시한다.
- minified file을 배포하면 원본 source도 라이선스 정책에 맞게 포함한다.
- asset version은 theme/plugin version 또는 content hash를 사용한다.
- build 결과 재현 가능성을 CI에서 검사한다.

완료 기준 G6:

- CSS·JS source 책임이 디렉터리로 구분됨
- visual regression 통과
- editor/frontend 차이 없음
- 사용하지 않는 화면의 asset load 감소
- 빌드 전후 Git dirty 0

예상 작업량: 6~8일

## 13. Phase 7 — Industry Preset 구조

### 목적

업종 특화 내용을 engine과 theme에서 분리한다.

### P7-1. preset contract

구조:

```text
wp-content/plugins/ktheme-preset-church/
├─ ktheme-preset-church.php
├─ extension.json
├─ labels/
├─ terms/
├─ patterns/
├─ templates/
└─ demo/
```

preset이 할 수 있는 일:

- generic post type label 변경
- taxonomy term 제안·선택적 생성
- 업종별 pattern 제공
- demo content package 제공
- 추천 navigation과 page map 제공

preset이 할 수 없는 일:

- engine 영구 key 변경
- theme token 강제 변경
- 사용자 동의 없는 content 생성
- 다른 preset의 데이터 삭제
- 별도 shortcode 등록

### P7-2. church preset 분리

이동 대상:

- 설교·예배·사역 관련 labels
- 교회 IA와 page map
- 교회용 patterns
- 교회 demo terms와 content
- 교회 전용 template 후보

매핑:

```text
설교          -> ktheme_media + media_type term
설교 시리즈   -> ktheme_collection
예배 일정     -> ktheme_event
주보·자료실   -> ktheme_resource
목회자·교역자 -> ktheme_profile
```

### P7-3. 두 번째 preset 검증

범용성을 증명하기 위해 최소한 `education` fixture를 만든다. 정식 상품이 아니라 자동 테스트용이어도 된다.

검증 예:

- media label을 강의로 표시
- collection을 과정/시리즈로 표시
- event를 수업/세미나로 표시
- profile을 강사로 표시
- church 전용 key 없이 페이지 구성

완료 기준 G7:

- church preset 비활성 시 engine과 theme에 교회 전용 표시 이름 없음
- church preset 활성 시 현재 교회 구성 재현
- education fixture로 같은 engine 재사용 입증
- preset 간 영구 key 충돌 없음

예상 작업량: 5~7일

## 14. Phase 8 — 고객 중립화·데모·자산

### P8-1. 고객 정보 제거

검사 대상:

- 교회명과 기관명
- 실명
- 주소, 전화, 이메일
- 계좌와 회원 번호
- 고정 일정
- 운영 서버 URL
- `/wp-content/themes/ktheme-modu/` 하드코딩 경로
- `href="#"`
- 작동하지 않는 button과 form

제품 theme와 engine에는 고객 정보가 0개여야 한다. 업종별 예시는 preset demo에서만 허용한다.

### P8-2. demo package

demo는 theme activation과 분리한다.

필수 기능:

- 명시적 사용자 실행
- 생성 항목 preview
- 중복 생성 방지
- demo 표시
- 삭제 범위 기록
- production data와 구분

기존 고객이 없으므로 과거 demo migration은 제공하지 않는다.

### P8-3. 자산 라이선스

각 이미지·폰트·아이콘·라이브러리에 대해 다음을 기록한다.

- 원저작자
- 라이선스
- 상업 사용 가능 여부
- 재배포 가능 여부
- attribution 필요 여부
- theme ZIP 포함 여부
- demo preview 전용 여부

완료 기준 G8:

- theme와 engine의 고객 식별정보 0개
- 하드코딩 설치 경로 0개
- invalid link와 fake interaction 0개
- 모든 배포 asset 라이선스 확인
- demo import는 명시적 실행에서만 동작

예상 작업량: 3~5일

## 15. Phase 9 — 품질·보안·접근성·성능

### P9-1. 자동 품질 게이트

필수 검사:

- registry validator
- JSON schema
- PHP lint
- PHPCS + WordPress Coding Standards
- ESLint
- TypeScript
- Vitest
- WordPress integration test
- Playwright
- axe
- link checker
- Theme Check
- Envato Theme Check
- package content 검사

### P9-2. 접근성

검사 항목:

- keyboard navigation
- visible focus
- skip link
- heading hierarchy
- landmark
- menu dialog와 modal focus trap
- alt text 정책
- color contrast
- zoom 200%와 400%
- reduced motion
- form label과 error 연결
- screen reader pattern description

목표: 제품 범위에서 WCAG 2.2 AA 수준.

### P9-3. 성능

예산:

- front page JS 최소화
- 사용하지 않는 block CSS 미로드
- 이미지 width/height와 responsive source
- font weight 최소화와 preload 제한
- layout shift 방지
- editor와 frontend console error 0

성능 목표는 실제 기준선 측정 후 수치로 고정한다. Lighthouse 숫자만으로 통과시키지 않고 LCP, CLS, INP 원인을 함께 기록한다.

### P9-4. 호환성 matrix

검증:

- 지원 최저 WordPress
- 최신 WordPress
- PHP 지원 최저와 최신 안정 버전
- Chrome, Safari, Firefox, Edge
- iOS Safari, Android Chrome
- multisite smoke test
- subdirectory install
- pretty permalink on/off
- engine active/inactive
- preset active/inactive

완료 기준 G9:

- REQUIRED 수준 검사 오류 0
- console error 0
- 핵심 접근성 위반 0
- 지원 matrix 통과
- 성능 예산 통과

예상 작업량: 5~7일

## 16. Phase 10 — 문서·패키징·Release Candidate

### P10-1. 사용자 문서

문서:

- 설치
- KTheme Engine 활성화
- preset 선택
- Site Editor 사용
- pattern 삽입
- skin 선택
- 메뉴·로고·색상 변경
- generic content 입력
- form·commerce 외부 plugin 연결
- 업데이트와 백업
- 제거 정책
- 문제 해결

### P10-2. 개발자 문서

문서:

- extension type 판정
- namespace 규칙
- extension manifest
- 새 block 추가
- 새 pattern 추가
- 새 skin 추가
- 새 preset 추가
- public hooks와 REST
- testing과 release gate
- deprecation 정책

### P10-3. 배포 패키지

산출물:

```text
dist/
├─ ktheme-modu-{version}.zip
├─ ktheme-engine-{version}.zip
├─ ktheme-preset-church-{version}.zip
├─ checksums.txt
├─ licenses/
└─ release-manifest.json
```

패키지 제외:

- `.git`
- node_modules
- test cache
- source map 공개 정책 밖 파일
- 개발 DB
- screenshot fixture
- 내부 계획 문서
- 고객 정보
- 미사용 asset

### P10-4. RC 설치 테스트

깨끗한 WordPress에서 다음 순서로 검증한다.

1. theme만 설치
2. engine 설치
3. church preset 설치
4. demo 없이 기본 화면 확인
5. demo 선택 설치
6. 핵심 콘텐츠 입력
7. skin 변경
8. engine 비활성
9. preset 비활성
10. theme 전환 후 데이터 유지 확인
11. 재활성화 후 화면 확인

완료 기준 G10:

- ZIP 설치 성공
- theme 단독 fatal error 없음
- engine data는 theme 전환 후 유지
- preset 비활성 시 범용 labels와 화면 유지
- 문서만 보고 신규 설치 가능
- release manifest와 checksum 생성

예상 작업량: 4~6일

## 17. Phase 11 — Beta와 출시

### Beta 대상

- WordPress 경험이 적은 운영자
- WordPress 제작 경험이 있는 개발자
- 교회 preset 사용자
- 교육 fixture 사용자

### Beta 시나리오

- 10분 안에 기본 사이트 구성
- pattern으로 새 페이지 생성
- skin 변경
- media와 event 등록
- 모바일 메뉴 사용
- plugin 비활성 후 데이터 확인
- 문서로 새 extension 추가 시도

### 출시 조건

- blocker 0
- high severity bug 0
- 문서상 알려진 제한과 실제 동작 일치
- 지원 범위와 업데이트 정책 확정
- 배포 ZIP 재현 가능
- 최종 디자인 리뷰 승인
- 보안·접근성·성능 결과 보관

예상 작업량: 5일 이상

## 18. 전체 작업 우선순위

### P0. 출시를 막는 작업

- stable namespace 전환
- KTheme Engine 골격
- 범용 content model
- theme CPT·taxonomy·shortcode 제거
- 교회 preset 분리
- 고객 정보와 불명확 asset 제거
- Theme Check·Envato Required 오류 제거

### P1. 제품 품질 핵심

- pattern library
- skin-foundation
- CSS·JS 모듈화
- editor/frontend 정합
- 접근성
- 실제 WordPress 통합 테스트
- 설치·개발자 문서

### P2. 출시 후 가능

- 추가 industry preset 정식 상품화
- 추가 skin
- commerce 전용 확장
- remote marketplace
- 자동 update service
- 시각적 page builder

## 19. 단계별 검증 명령 목표

최종적으로 다음 명령이 모두 실행 가능해야 한다.

```bash
pnpm validate:extensions
pnpm test
pnpm typecheck
pnpm lint
pnpm test:php
pnpm test:wordpress
pnpm test:e2e
pnpm test:a11y
pnpm check:links
pnpm check:theme
pnpm check:envato
pnpm build:packages
pnpm verify:packages
```

현재 존재하지 않는 명령은 해당 Phase에서 TDD로 추가한다.

## 20. 진행 보고 형식

각 Phase 종료 보고는 다음 형식으로 작성한다.

```text
Phase:
완료한 작업:
변경 파일:
실행한 검증:
검증 결과:
시각 회귀 결과:
남은 위험:
다음 Phase 진입 가능 여부:
관련 commit:
```

## 21. 즉시 다음 실행 묶음

다음 작업은 Phase 0과 Phase 1을 하나의 작은 실행 묶음으로 시작한다.

### 작업 A. 인벤토리

- template, part, pattern, shortcode, CPT, taxonomy 전체 목록 생성
- generic/theme/preset/remove 분류
- legacy identifier 목록 생성

### 작업 B. stable namespace 테스트

- `ktheme-modu/` pattern namespace 금지 테스트
- `style1` 공개 이름 금지 테스트
- category와 pattern reference 무결성 테스트

### 작업 C. namespace 실제 전환

- pattern header 수정
- template reference 수정
- category 수정
- `style1.json`을 `skin-foundation.json`으로 전환
- 전체 unit·typecheck·visual smoke 검증

이 묶음이 통과된 다음에만 `ktheme-engine` 코드 생성을 시작한다.
