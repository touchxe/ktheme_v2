# K-Theme V2 확장 표준 및 상업화 사전 검토

- 상태: 필수 적용
- 작성일: 2026-08-19
- 적용 대상: `wp-content/themes/ktheme-v2`, 향후 K-Theme 디자인·템플릿·컴포넌트
- 목표: 새 디자인을 추가해도 기존 템플릿을 복제하거나 테마 기능을 비대하게 만들지 않는 블록 테마 제품 구조

## 1. 결론

K-Theme V2는 앞으로 다음 계층을 단일 확장 모델로 사용한다.

```text
theme.json 토큰
  -> WordPress 코어 블록
    -> 재사용 패턴
      -> 템플릿 파트
        -> 페이지·아카이브·싱글 템플릿
```

콘텐츠 생성, 데이터 저장, 폼 처리, 사용자 기능은 테마가 아니라 동반 플러그인이 담당한다.

```text
K-Theme V2 Theme
  표현, 편집 경험, 토큰, 스타일 변형, 패턴, 템플릿

KTheme Engine Plugin
  범용 콘텐츠 모델, 분류, 폼 연동, 데이터 처리, 기능 블록, 확장 레지스트리
```

이 경계는 선택 사항이 아니다. Envato의 WordPress 테마 요구사항은 CPT, taxonomy, shortcode, form을 플러그인 영역으로 분류하고, 테마가 별도 블록을 등록하지 않도록 요구한다. 기존 고객 사이트는 없으므로 호환 계층이나 데이터 마이그레이션을 제품 구조에 남기지 않고 공개 전에 바로 범용 이름으로 전환한다.

모든 공개 이름은 [EXTENSION_NAMING_STANDARD.md](./EXTENSION_NAMING_STANDARD.md)와 [extension-registry.json](./extension-registry.json)을 따른다. 현재 디자인 기준과 시각 표현은 유지하며 이 표준화 과정에서 `docs/DESIGN.md`를 재설계하지 않는다.

## 2. 현재 구조 감사

### 2.1 확인된 규모

| 항목 | 현재 상태 | 판단 |
|---|---:|---|
| 블록 템플릿 | 52개 | 페이지별 복제 비율 점검 필요 |
| 템플릿 파트 | 18개 | 공용 영역 기반은 마련됨 |
| 등록 패턴 | 6개 | 향후 확장 단위로 부족 |
| HTML 블록 중심 패턴 | 4개 | 편집성과 재사용성이 낮음 |
| 활성 shortcode 템플릿 | 7개 | 블록 패턴으로 이전 필요 |
| 테마 등록 shortcode | 7개 | 플러그인 영역 위반 위험 |
| 테마 등록 CPT | 3개 | 동반 플러그인으로 분리 필요 |
| 테마 등록 taxonomy | 1개 | 동반 플러그인으로 분리 필요 |
| `functions.php` | 2,247줄 | 책임 분리 필요 |
| `style.css` | 14,135줄 | 계층별 CSS 분리 필요 |
| 스타일 변형 | 1개 | 제품 확장 규칙 필요 |

### 2.2 우선순위별 문제

#### P0. 테마와 플러그인 책임이 섞여 있음

- `functions.php`가 설교, 행사, 앨범 CPT와 설교 시리즈 taxonomy를 등록한다.
- 헤더, 푸터, 페이지 히어로, 위치, 예배 목록, 사진 캐러셀 shortcode가 테마에 있다.
- 상업 테마에서 테마 변경 시 사라지면 안 되는 데이터와 기능은 동반 플러그인으로 이동해야 한다.
- 기존 고객 사이트가 없으므로 이전용 shortcode와 호환 어댑터는 공개 전에 제거한다.

#### P0. 고객 중립성이 부족함

- 일부 템플릿과 PHP 데이터에 특정 교회명, 인물, 주소, 일정, 사례 데이터가 남아 있다.
- 다수 파일이 `/wp-content/themes/ktheme-v2/`를 직접 참조한다.
- `href="#"`와 시뮬레이션용 링크가 실제 제품 화면에 남아 있다.
- 판매 패키지는 고객 데이터, 허위 동작, 특정 설치 경로에 의존하지 않아야 한다.

#### P1. 확장 계층이 일관되지 않음

- `theme.json`은 버전 3을 사용하지만 간격, 반경, 그림자, 상태 색상 등 제품 토큰이 충분히 정의되지 않았다.
- 패턴 카테고리가 `ktheme-v2-style1` 하나뿐이라 페이지, 섹션, 통합 셸의 역할이 구분되지 않는다.
- 일부 패턴은 코어 블록 대신 하나의 큰 `core/html` 블록으로 구성되어 사이트 편집기에서 부분 편집이 어렵다.
- 페이지마다 HTML과 클래스가 복제되어 새 디자인 추가 시 회귀 범위가 커진다.

#### P1. 범용 확장 네이밍이 없음

- `sermon`, `worship`, `ministry`, `style1`이 영구 식별자와 파일 이름에 섞여 있다.
- 블록, 스킨, 위젯, 패턴, 컴포넌트의 의미가 구분되지 않아 신규 항목이 같은 역할을 중복 구현할 수 있다.
- 공개 식별자는 `ktheme` 제품 어근과 역할 중심 이름으로 고정한다.
- 교회 용어는 영구 key가 아니라 preset의 표시 이름, taxonomy term, demo data로 이동한다.
- 현재 디자인 기준과 시각 표현은 변경하지 않는다.

#### P1. 배포 심사 자동화가 부족함

- UTF-8, 허위 폼, 핵심 템플릿 일부는 테스트하지만 패턴 메타데이터, 하드코딩 경로, 플러그인 영역, 번역, 보안, 패키지 구성 검사가 없다.
- Envato Theme Check와 WordPress Theme Check를 릴리스 게이트에 포함해야 한다.

## 3. 목표 디렉터리 구조

```text
wp-content/
├─ themes/
│  └─ ktheme-v2/
│     ├─ theme.json
│     ├─ style.css
│     ├─ styles/
│     │  ├─ skin-foundation.json
│     │  └─ skin-high-contrast.json
│     ├─ patterns/
│     │  ├─ page-*.php
│     │  ├─ section-*.php
│     │  ├─ query-*.php
│     │  └─ integration-*.php
│     ├─ parts/
│     │  ├─ header.html
│     │  ├─ footer.html
│     │  └─ hero-*.html
│     ├─ templates/
│     │  ├─ index.html
│     │  ├─ page.html
│     │  ├─ archive.html
│     │  └─ single.html
│     ├─ assets/
│     │  ├─ css/
│     │  │  ├─ foundations/
│     │  │  ├─ blocks/
│     │  │  ├─ patterns/
│     │  │  └─ templates/
│     │  ├─ js/
│     │  │  └─ components/
│     │  └─ images/
│     └─ inc/
│        ├─ setup.php
│        ├─ assets.php
│        ├─ pattern-categories.php
│        └─ extension-loader.php
└─ plugins/
   ├─ ktheme-engine/
   │  ├─ ktheme-engine.php
   │  ├─ includes/
   │  │  ├─ class-extension-registry.php
   │  │  └─ class-plugin.php
   │  ├─ modules/
   │  │  ├─ content-types/
   │  │  ├─ taxonomies/
   │  │  ├─ blocks/
   │  │  ├─ integrations/
   │  │  └─ widgets/
   │  └─ assets/
   └─ ktheme-preset-{industry}/
      ├─ patterns/
      ├─ terms/
      └─ demo/
```

초기 표준화에서는 파일 이동 자체보다 계약과 검증을 먼저 추가한다. 대규모 파일 분리는 회귀 테스트가 준비된 뒤 단계적으로 진행한다.

## 4. 확장 단위 계약

### 4.1 토큰

- 색상, 글꼴, 글자 크기, 간격, 반경, 그림자는 `theme.json`이 기본 SSOT다.
- 토큰 slug는 의미 기반 영문 소문자와 하이픈을 사용한다.
- 새 컴포넌트에서 임의 hex, 임의 간격, 임의 글꼴을 추가하지 않는다.
- CSS 사용자 정의 속성이 필요하면 `--kt-*` 접두사를 사용하고 `theme.json` 토큰을 참조한다.
- 스타일 변형은 `/styles/*.json`에 두며 템플릿 구조를 복제하지 않는다.

### 4.2 코어 블록

- 가능한 경우 `core/group`, `core/columns`, `core/query`, `core/image`, `core/gallery`, `core/buttons`를 우선 사용한다.
- 테마는 커스텀 블록을 등록하지 않는다.
- 콘텐츠 기능용 커스텀 블록이 필요하면 `ktheme-engine` 또는 기능별 `ktheme-{capability}` 플러그인에 등록한다.
- 에디터와 프런트엔드의 너비, 글꼴, 색상, 상태 스타일을 일치시킨다.

### 4.3 패턴

패턴은 재사용 가능한 페이지 섹션의 기본 확장 단위다.

필수 헤더:

```text
Title
Slug
Categories
Description
```

명명 규칙:

| 역할 | 파일 | slug | 카테고리 |
|---|---|---|---|
| 전체 페이지 조합 | `page-{purpose}.php` | `ktheme/page-{purpose}` | `ktheme-pages` |
| 일반 섹션 | `section-{purpose}.php` | `ktheme/section-{purpose}` | `ktheme-sections` |
| 쿼리 섹션 | `query-{content}.php` | `ktheme/query-{content}` | `ktheme-queries` |
| 외부 기능 자리 | `integration-{purpose}.php` | `ktheme/integration-{purpose}` | `ktheme-integrations` |

패턴 규칙:

- 새 패턴은 코어 블록 우선이다.
- 큰 `core/html` 블록은 접근성 또는 코어 블록으로 표현할 수 없는 구조에만 사용하고 이유를 기록한다.
- `wp:shortcode`, 인라인 `script`, 인라인 `style`, `href="#"`를 넣지 않는다.
- 특정 도메인, 특정 고객명, 계좌, 개인 정보, 테마 설치 경로를 하드코딩하지 않는다.
- 이미지 URL은 패턴 PHP에서 `get_theme_file_uri()`와 적절한 escaping을 사용한다.
- 패턴 본문은 삽입 후 사용자가 사이트 편집기에서 바꿀 수 있어야 한다.

### 4.4 템플릿 파트

- 사이트 전체에서 반복되며 독립 편집이 필요한 구조만 `/parts`에 둔다.
- 기본 영역은 header, footer, uncategorized를 사용하고 `theme.json`에 사람이 읽을 수 있는 제목을 등록한다.
- 페이지 본문에서 한 번만 쓰는 섹션은 파트가 아니라 패턴으로 만든다.
- hero 계열은 공용 기본 파트와 필요한 변형만 유지하며 페이지마다 복제하지 않는다.

### 4.5 템플릿

- 템플릿은 문서 구조와 패턴 조합만 담당한다.
- 표준 순서는 header, main, hero, content 또는 patterns, footer다.
- 신규 템플릿에는 shortcode와 기능 처리 코드를 넣지 않는다.
- 누적 콘텐츠는 `archive + single`, 안내 콘텐츠는 `page`, 입력 처리는 외부 폼 블록을 담는 integration 패턴을 사용한다.
- 현재 교회 preset의 slug와 IA는 `docs/SITE_IA_SLUG_RULES.md`를 따른다. 범용 theme와 engine은 이 IA에 의존하지 않는다.

### 4.6 범용 엔진과 확장 플러그인

다음 항목은 `ktheme-engine` 또는 기능별 확장 플러그인 소유다.

- `ktheme_media`, `ktheme_event`, `ktheme_resource`, `ktheme_profile` 같은 범용 CPT
- `ktheme_media_type`, `ktheme_collection`, `ktheme_topic`, `ktheme_audience` 같은 범용 taxonomy
- 폼 제출, 결제, 회원, 데이터 저장
- 데이터 삭제 정책
- 기능성 커스텀 블록

테마는 플러그인이 없어도 오류 없이 기본 page, post, archive, search를 표현해야 한다.

교회·교육·비영리 같은 업종 구성은 `ktheme-preset-{industry}`가 labels, terms, patterns, demo data로 제공한다. 예를 들어 설교는 별도 post type이 아니라 `ktheme_media`와 `ktheme_media_type` term 조합으로 표현한다.

### 4.7 위젯과 확장 용어

- 코어 블록 조합이면 Pattern을 사용한다.
- 모양만 다르면 Block style을 사용한다.
- 초기 설정만 다르면 Block variation을 사용한다.
- 데이터와 편집 기능이 필요하면 plugin Custom block을 사용한다.
- `WP_Widget`은 클래식 sidebar 호환이 명시된 경우에만 사용한다.
- 전체 색상·타입 표현은 Skin, 업종별 구성은 Preset이라 부른다.
- 모든 신규 항목은 `extension.json` manifest를 갖고 extension registry의 검증을 통과해야 한다.

## 5. CSS와 JavaScript 표준

### CSS

- 계층 순서는 foundations, core blocks, patterns, templates, utilities다.
- 기존 공개 클래스는 디자인 유지를 위해 `kt-` 접두사를 유지한다.
- 신규 독립 모듈은 `ktheme-` 접두사를 사용한다.
- 기존 컴포넌트는 `kt-{component}`, 신규 컴포넌트는 `ktheme-{component}`를 사용하며 요소는 `__`, 변형은 `--`를 사용한다.
- 상태는 WordPress 표준 `is-*`, `has-*`를 우선한다.
- 페이지 slug 기반 선택자보다 컴포넌트 클래스 기반 선택자를 우선한다.
- 새 CSS는 해당 계층 파일에 작성하고 최종 번들만 enqueue한다.

### JavaScript

- 코어 블록으로 해결할 수 없는 상호작용에만 사용한다.
- 기능별 파일로 나누고 필요한 화면에서만 enqueue한다.
- DOM 탐색은 컴포넌트 루트 내부로 제한한다.
- 키보드, focus, reduced motion, 빈 상태를 포함한다.
- 인라인 스크립트와 전역 변수는 사용하지 않는다.

## 6. 자동 검증 계약

새 디자인, 패턴, 템플릿, 컴포넌트는 아래 검사를 모두 통과해야 한다.

1. 구현 전에 실패 테스트를 추가한다.
2. 모든 패턴에 필수 헤더와 공개 전환 대상인 `ktheme/` namespace가 있는지 검사한다.
3. 신규 템플릿에 `wp:shortcode`가 없는지 검사한다.
4. 테마에 CPT, taxonomy, form handler, shortcode가 남거나 추가되지 않는지 검사한다.
5. 하드코딩 설치 경로, 특정 도메인, `href="#"`, 인라인 script를 검사한다.
6. `theme.json`과 `/styles/*.json` JSON schema를 검사한다.
7. PHP syntax, WordPress Coding Standards, JS/TS lint, typecheck, unit test를 실행한다.
8. Theme Check와 Envato Theme Check의 REQUIRED 항목을 0으로 만든다.
9. WordPress Theme Unit Test Data로 긴 제목, 빈 콘텐츠, 이미지 overflow, 검색 없음, 페이지네이션을 확인한다.
10. UI PR 전 실제 URL에서 데스크톱과 모바일 디자인 검토를 1회 이상 수행한다.

## 7. 단계별 실행 계획

### 0단계. 기준선과 복구점

- 완료 조건: 백업 브랜치와 커밋이 존재하고 구현 worktree가 깨끗하다.
- 현재 상태: `codex/backup-20260813-pre-commercial-theme`와 구현 worktree가 준비되어 있다.

### 1단계. 표준 계약 고정

- 이 문서를 확장 기준으로 채택한다.
- 패턴 카테고리를 pages, sections, queries, integrations로 등록한다.
- 패턴 메타데이터와 금지 규칙을 자동 검사한다.
- 컴포넌트 변경 템플릿을 위한 테스트 fixture를 만든다.
- 완료 조건: 표준 테스트가 기존 위반을 정확히 실패로 보고 신규 표준 패턴이 통과한다.

### 2단계. 활성 shortcode 제거

- 공동체, 새가족, 다음세대, 청년, 시니어, 소그룹 페이지의 사진 캐러셀을 편집 가능한 갤러리 패턴으로 바꾼다.
- 새벽기도 페이지의 예배 shortcode를 예배 안내 패턴 또는 Query block으로 바꾼다.
- 더 이상 참조되지 않는 렌더러와 shortcode 등록을 삭제한다.
- 완료 조건: `/templates`와 `/parts`에 `wp:shortcode`가 0개다.

### 3단계. 범용 엔진과 네이밍 전환

- `ktheme-engine` 플러그인 골격과 extension registry를 만든다.
- 교회 전용 CPT와 taxonomy를 제거하고 범용 콘텐츠 모델로 구현한다.
- 기존 고객 데이터가 없으므로 migration과 shortcode 호환 모듈은 만들지 않는다.
- `ktheme-v2/` pattern namespace와 `style1` 이름을 공개 전 영구 이름으로 전환한다.
- 완료 조건: 테마에 CPT, taxonomy, shortcode가 없고 모든 공개 이름이 registry와 일치한다.

### 4단계. 기존 디자인 기준의 구조화

- 현재 `docs/DESIGN.md`와 시각 결과를 변경하지 않는다.
- 기존 값을 `theme.json`의 간격, 반경, 그림자, 상태 색상, 블록별 기본 스타일로 구조화한다.
- 기존 디자인을 `skin-foundation`이라는 의미 기반 이름으로 제공한다.
- 에디터와 프런트엔드 시각 일치를 검증한다.
- 완료 조건: 현재 화면을 유지하면서 새 섹션을 임의 hex나 임의 spacing 없이 제작할 수 있다.

### 5단계. CSS와 PHP 모듈화

- `functions.php`에서 setup, assets, patterns, extension loader를 분리한다.
- `style.css`를 foundations, blocks, patterns, templates로 분리한다.
- 번들은 WordPress enqueue API로 조건부 로드한다.
- 완료 조건: 기능별 변경 범위와 enqueue 조건을 테스트로 설명할 수 있다.

### 6단계. 고객 중립화와 데모 분리

- 특정 교회명, 인물, 주소, 계좌, 사례 데이터를 제품 템플릿에서 제거한다.
- 데모 데이터는 별도 import 패키지로 분리한다.
- 테마 경로는 WordPress helper로 생성한다.
- 무효 링크와 허위 상호작용을 제거한다.
- 완료 조건: 새 WordPress 설치에서 고객 정보 없이 안전한 기본 화면이 나온다.

### 7단계. 상업 배포 패키지

- GPL 호환 라이선스와 모든 이미지, 폰트, 라이브러리 출처를 정리한다.
- 공개 온라인 문서, 설치 가이드, 플러그인 의존성, 업데이트 정책을 작성한다.
- WordPress 최신 버전과 지원 PHP 버전 매트릭스를 검증한다.
- Envato Theme Check, Theme Check, 접근성, 성능, 보안 검사를 릴리스 체크리스트로 고정한다.
- 완료 조건: 자동 패키지 산출물에 개발 파일과 고객 데이터가 없고 REQUIRED 경고가 0개다.

## 8. 새 항목 추가 체크리스트

### 새 디자인 변형

- 구조를 복제하지 않고 `/styles/*.json`으로 표현 가능한가?
- 기존 의미 토큰으로 표현 가능한가?
- 선택 후 사용자 DB에 저장되는 WordPress 스타일 변형 특성을 문서화했는가?

### 새 패턴

- 기존 패턴 조합으로 해결할 수 없는가?
- 필수 헤더와 올바른 카테고리가 있는가?
- 코어 블록 우선인가?
- 고객 중립적이고 완전히 편집 가능한가?
- 키보드와 모바일 상태가 정의되었는가?

### 새 템플릿

- SITE IA와 template hierarchy에 맞는가?
- 공용 header, footer, hero를 재사용하는가?
- shortcode와 기능 처리 코드가 없는가?
- 빈 콘텐츠와 긴 콘텐츠에서도 동작하는가?

### 새 컴포넌트 기능

- 표현인가, 데이터 기능인가?
- 데이터 기능이면 `ktheme-engine` 또는 기능별 확장 플러그인에 두었는가?
- 코어 블록으로 대체할 수 없는 이유가 있는가?
- 에디터와 프런트엔드 양쪽 상태를 제공하는가?

## 9. 조사 근거

- WordPress Theme Handbook, Global Settings and Styles: <https://developer.wordpress.org/themes/core-concepts/global-settings-and-styles/>
- WordPress Theme Handbook, Registering Patterns: <https://developer.wordpress.org/themes/patterns/registering-patterns/>
- WordPress Theme Handbook, Patterns: <https://developer.wordpress.org/themes/patterns/>
- WordPress Theme Handbook, Template Parts: <https://developer.wordpress.org/themes/global-settings-and-styles/template-parts/>
- WordPress Theme Handbook, Style Variations: <https://developer.wordpress.org/themes/global-settings-and-styles/style-variations/>
- WordPress Theme Review Requirements: <https://make.wordpress.org/themes/handbook/review/required/>
- WordPress Theme Accessibility Review: <https://make.wordpress.org/themes/handbook/review/accessibility/>
- Envato WordPress Theme Requirements Hub: <https://help.author.envato.com/hc/en-us/articles/360000472383-WordPress-Theme-Requirements-Start-here>
- Envato Part 1, General: <https://help.author.envato.com/hc/en-us/articles/360000481263-WordPress-Theme-Requirements-Part-1-General>
- Envato Part 2, Features: <https://help.author.envato.com/hc/en-us/articles/360000480723-WordPress-Theme-Requirements-Part-2-Features>
- Envato Part 3, Theme Plugins: <https://help.author.envato.com/hc/en-us/articles/360000481223-WordPress-Theme-Requirements-Part-3-Theme-Plugins>
- Envato Part 4, Coding: <https://help.author.envato.com/hc/en-us/articles/360000479946-WordPress-Theme-Requirements-Part-4-Coding>
- Envato Part 5, Security: <https://help.author.envato.com/hc/en-us/articles/360000481243-WordPress-Theme-Requirements-Part-5-Theme-Security>
- Envato Part 6, Gutenberg: <https://help.author.envato.com/hc/en-us/articles/360020255992-WordPress-Theme-Requirements-Part-6-Gutenberg>

## 10. 즉시 적용 결정

다음 구현부터 아래 네 가지를 강제한다.

1. 신규 template과 part에는 shortcode를 추가하지 않는다.
2. 신규 섹션은 필수 메타데이터를 갖춘 native block pattern으로 만든다.
3. 신규 데이터 기능은 테마가 아니라 `ktheme-engine` 또는 기능별 확장 플러그인 대상으로 설계한다.
4. 신규 스타일은 `theme.json` 토큰과 `kt-` 클래스 계약을 먼저 정의한 뒤 작성한다.
5. 신규 공개 식별자는 `extension-registry.json`과 `EXTENSION_NAMING_STANDARD.md`를 따른다.
6. 기존 고객 호환 코드와 migration은 만들지 않는다.
