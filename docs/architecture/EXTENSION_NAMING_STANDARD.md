# KTheme 범용 확장 네이밍 표준

- 상태: 필수 적용
- 작성일: 2026-08-19
- 적용 범위: 테마, 플러그인, 블록, 패턴, 스킨, 위젯, 컴포넌트, 설정, REST API, 에셋
- 디자인 정책: 현재 `docs/DESIGN.md`와 기존 시각 기준을 유지한다. 이 문서는 구조와 이름만 규정한다.

## 1. 설계 원칙

### 1.1 제품 이름과 사용 업종을 분리한다

영구 식별자에는 교회, 설교, 목회, 예배 같은 업종 이름을 사용하지 않는다. 업종 이름은 사용자가 바꿀 수 있는 표시 이름, 패턴 키워드, 데모 데이터, taxonomy term에만 사용한다.

예시:

| 목적 | 영구 식별자 | 교회 사용 예 | 일반 사용 예 |
|---|---|---|---|
| 미디어 콘텐츠 | `ktheme_media` | 설교 영상 | 강의, 팟캐스트 |
| 일정 콘텐츠 | `ktheme_event` | 예배, 수련회 | 세미나, 공연 |
| 자료 콘텐츠 | `ktheme_resource` | 주보, 양육 자료 | 보고서, 다운로드 |
| 사람 콘텐츠 | `ktheme_profile` | 목회자, 교역자 | 강사, 팀원 |
| 묶음 분류 | `ktheme_collection` | 설교 시리즈 | 강의 시리즈 |

`sermon`, `church`, `worship`은 영구 post type, block namespace, PHP prefix로 사용하지 않는다.

### 1.2 한번 저장되는 이름은 바꾸지 않는다

다음 이름은 데이터베이스나 콘텐츠에 저장되므로 공개 후 변경하지 않는다.

- plugin slug와 text domain
- block name
- post type과 taxonomy key
- option과 user meta key
- REST namespace와 route
- pattern slug
- public hook 이름

표시 제목과 설명은 번역 가능하며 변경할 수 있다.

### 1.3 하나의 제품 어근을 사용한다

제품 어근은 `ktheme`으로 고정한다. 짧은 `kt`는 CSS 호환용 외에는 신규 전역 식별자에 사용하지 않는다.

## 2. 식별자 레지스트리

기계 판독 기준은 `docs/architecture/extension-registry.json`이다. 문서와 코드가 다르면 레지스트리를 먼저 수정하고 검증 테스트를 갱신한다.

| 영역 | 표준 | 예시 |
|---|---|---|
| 제품 어근 | `ktheme` | `ktheme` |
| 테마 slug | `ktheme-v2` | 현재 배포명 유지 |
| 엔진 플러그인 slug | `ktheme-engine` | `wp-content/plugins/ktheme-engine` |
| text domain | artifact slug와 동일 | `ktheme-engine` |
| PHP 함수 prefix | `ktheme_` | `ktheme_register_assets()` |
| PHP 클래스 prefix | `KTheme_` | `KTheme_Extension_Registry` |
| PHP namespace | `KTheme\` | `KTheme\Engine\Registry` |
| 블록 namespace | `ktheme-engine` | `ktheme-engine/content-grid` |
| 패턴 namespace | `ktheme` | `ktheme/section-media-grid` |
| CSS prefix | `kt-` | `.kt-component` |
| CSS 신규 권장 prefix | `ktheme-` | `.ktheme-widget` |
| asset handle prefix | `ktheme-` | `ktheme-navigation` |
| option/meta prefix | `ktheme_` | `ktheme_settings` |
| hook prefix | `ktheme/` | `ktheme/extension/registered` |
| REST namespace | `ktheme/v1` | `/wp-json/ktheme/v1/extensions` |
| JS package scope | `@ktheme/` | `@ktheme/registry` |

현재 `.kt-*` 클래스는 디자인 유지와 회귀 방지를 위해 그대로 둔다. 새 독립 모듈은 `.ktheme-*`를 우선하며, 기존 컴포넌트를 확장할 때만 `.kt-*` 체계를 따른다.

## 3. 공통 문법

- 파일과 디렉터리: 영문 소문자 kebab-case
- PHP 함수와 변수: 영문 소문자 snake_case
- PHP 클래스: WordPress 방식의 Pascal 단어와 underscore
- JSON key: camelCase
- slug와 handle: 영문 소문자 kebab-case
- CSS: BEM 형태 `block__element--modifier`
- 숫자는 의미가 있는 버전과 순서에만 사용한다.
- `style1`, `widget2`, `new`, `final`, `temp`, `test2` 같은 순번·상태 이름을 공개 식별자로 사용하지 않는다.
- 약어보다 역할을 온전히 적는다. 단, API, REST, CSS처럼 널리 쓰이는 약어는 허용한다.

## 4. 플러그인 구조와 이름

### 4.1 기본 제품

```text
wp-content/plugins/ktheme-engine/
├─ ktheme-engine.php
├─ readme.txt
├─ languages/
├─ includes/
│  ├─ class-extension-registry.php
│  ├─ class-plugin.php
│  └─ functions.php
├─ modules/
│  ├─ content-types/
│  ├─ taxonomies/
│  ├─ blocks/
│  ├─ integrations/
│  └─ widgets/
├─ assets/
│  ├─ css/
│  └─ js/
└─ build/
```

플러그인 header의 `Text Domain`은 폴더 slug와 같은 `ktheme-engine`을 사용한다. `Requires Plugins`에는 WordPress.org 형식의 slug만 사용한다.

### 4.2 추가 기능 플러그인

큰 기능은 엔진에 계속 넣지 않고 별도 확장 플러그인으로 분리한다.

```text
ktheme-{capability}
```

예시:

- `ktheme-events`
- `ktheme-forms`
- `ktheme-commerce`
- `ktheme-directory`
- `ktheme-importer`

업종 패키지가 필요하면 엔진과 분리한다.

```text
ktheme-preset-{industry}
```

예시: `ktheme-preset-church`, `ktheme-preset-education`, `ktheme-preset-nonprofit`

업종 패키지는 영구 데이터 모델을 새로 만들기보다 범용 모델의 labels, terms, patterns, demo content를 제공한다.

## 5. 콘텐츠 모델 이름

### 5.1 post type

- 최대 20자 제한을 지킨다.
- `ktheme_` prefix 뒤에 단수 역할명을 붙인다.
- 공개 rewrite slug는 관리 key와 분리하고 설정 또는 번역이 가능하게 한다.

허용 기본 key:

- `ktheme_media`
- `ktheme_event`
- `ktheme_resource`
- `ktheme_profile`

새 post type은 기존 네 가지 모델로 표현할 수 없는 저장·권한·편집 요구가 있을 때만 추가한다.

### 5.2 taxonomy

- 최대 32자 제한을 지킨다.
- `ktheme_` prefix 뒤에 분류 목적을 붙인다.

허용 기본 key:

- `ktheme_media_type`
- `ktheme_collection`
- `ktheme_topic`
- `ktheme_audience`
- `ktheme_location`

교회 용어는 term으로 둔다. 예를 들어 설교는 `ktheme_media_type`의 term이 되고, 주일예배는 `ktheme_audience` 또는 별도 사용자 정의 term으로 표현한다.

## 6. 블록, 위젯, 컴포넌트 용어

앞으로 문서와 코드에서 다음 용어를 구분한다.

| 용어 | 사용 조건 | 저장 위치 |
|---|---|---|
| Pattern | 코어 블록 조합으로 만든 재사용 레이아웃 | theme `/patterns` |
| Block style | 기존 블록의 시각적 모양만 변경 | theme `theme.json`, `/styles` 또는 CSS |
| Block variation | 기존 블록의 초기 설정 프리셋 | theme 또는 plugin JS |
| Custom block | 데이터·상호작용·편집 기능이 필요한 독립 블록 | plugin `/blocks` |
| Legacy widget | 클래식 사이드바 호환이 반드시 필요할 때 | plugin `/widgets` |
| Component | 내부 코드 단위이며 WordPress inserter에 직접 노출되지 않음 | theme 또는 plugin 내부 |
| Skin | 전체 색상·타입·간격 표현을 바꾸는 global style variation | theme `/styles` |
| Preset | 업종별 labels, terms, patterns, demo 구성 | preset plugin |

새로운 “위젯” 요청은 먼저 Pattern, Block style, Block variation, Custom block 순서로 판정한다. `WP_Widget`은 클래식 위젯 영역 지원이 제품 요구사항일 때만 사용한다.

## 7. 블록 네이밍

```text
ktheme-engine/{capability}
```

예시:

- `ktheme-engine/content-grid`
- `ktheme-engine/event-list`
- `ktheme-engine/media-player`
- `ktheme-engine/resource-download`
- `ktheme-engine/profile-card`

규칙:

- `block.json`을 SSOT로 사용한다.
- `apiVersion`은 지원 WordPress 범위에서 최신을 사용한다.
- 이름은 소문자 영숫자와 dash만 사용하고 문자로 시작한다.
- 하나의 플러그인에서 하나의 block namespace만 사용한다.
- 저장된 block name은 변경하지 않는다. 변경이 필요하면 deprecated version과 migration을 제공한다.
- WordPress 6.8 이상을 최소 버전으로 정하면 metadata collection 일괄 등록을 사용한다.

## 8. 패턴 네이밍

기존 `ktheme-v2/`는 버전이 포함된 임시 namespace다. 기존 고객 사이트가 없으므로 제품 공개 전에 `ktheme/`로 일괄 전환한다.

```text
ktheme/{scope}-{purpose}
```

| scope | 의미 | 예시 |
|---|---|---|
| `page` | 전체 페이지 조합 | `ktheme/page-landing` |
| `section` | 일반 섹션 | `ktheme/section-media-grid` |
| `query` | 목록·검색 조합 | `ktheme/query-content-grid` |
| `integration` | 외부 블록을 넣는 자리 | `ktheme/integration-form` |
| `header` | 헤더 변형 | `ktheme/header-centered` |
| `footer` | 푸터 변형 | `ktheme/footer-columns` |

패턴 이름에는 업종과 화면 번호를 넣지 않는다. 업종별 패턴은 preset plugin에서 `ktheme-preset-{industry}/` namespace를 사용한다.

## 9. 스킨과 디자인 변형

현재 디자인 기준과 현재 기본 시각 표현은 유지한다.

전체 스킨 파일:

```text
styles/skin-{semantic-name}.json
```

예시:

- `skin-foundation.json`
- `skin-warm.json`
- `skin-high-contrast.json`

금지:

- `style1.json`
- `style-final.json`
- `new-style.json`

Block style name은 `ktheme-{appearance}`를 사용하고 실제 class는 WordPress 규칙에 따라 `.is-style-ktheme-{appearance}`가 된다.

예시:

- `ktheme-framed`
- `ktheme-borderless`
- `ktheme-emphasized`

스킨은 구조와 콘텐츠를 포함하지 않는다. 색상, typography, spacing, shadow 등 `theme.json`이 허용하는 표현만 변경한다.

## 10. CSS와 JavaScript 이름

### CSS

신규 독립 컴포넌트:

```css
.ktheme-content-grid {}
.ktheme-content-grid__item {}
.ktheme-content-grid--compact {}
.ktheme-content-grid.is-loading {}
```

기존 디자인 컴포넌트는 기존 `.kt-*` 이름을 유지한다. 같은 요소에 `.kt-*`와 `.ktheme-*` 이름을 중복 추가하지 않는다.

### asset handle

```text
ktheme-{scope}-{purpose}
```

예시:

- `ktheme-theme-foundation`
- `ktheme-block-content-grid`
- `ktheme-widget-event-list`
- `ktheme-admin-settings`

handle은 전역에서 고유해야 하며 WordPress가 제공하는 script를 다시 번들링하지 않는다.

### JavaScript

- 전역 변수를 만들지 않는다.
- 공개 package는 `@ktheme/{package}` 형식을 사용한다.
- DOM data attribute는 `data-ktheme-*`를 사용한다.
- custom event는 `ktheme:{scope}:{event}`를 사용한다.

## 11. PHP, option, hook, REST 이름

### PHP

```php
function ktheme_register_assets() {}
class KTheme_Extension_Registry {}
namespace KTheme\Engine;
```

하나의 파일에는 원칙적으로 하나의 class/interface/trait/enum을 두고 class 파일은 `class-extension-registry.php`처럼 작성한다.

### option과 meta

```text
ktheme_{scope}_{name}
```

예시:

- `ktheme_engine_version`
- `ktheme_enabled_modules`
- `ktheme_media_source_url`

저장 설정은 `register_setting()`으로 type, default, sanitize callback을 선언한다. REST에 노출할 배열·객체는 schema를 함께 등록한다.

### hook

public hook은 slash 기반으로 작성한다.

```text
ktheme/{scope}/{event}
```

예시:

- `ktheme/extension/registered`
- `ktheme/content/query_args`
- `ktheme/skin/activated`

### REST

```text
namespace: ktheme/v1
route: /{plural-resource}
```

예시: `/wp-json/ktheme/v1/extensions`

## 12. 확장 manifest

새 스킨, 블록, 위젯, 통합 모듈은 각 디렉터리에 `extension.json`을 둔다.

```json
{
  "$schema": "../../schemas/extension.schema.json",
  "id": "ktheme-engine/content-grid",
  "type": "block",
  "version": "1.0.0",
  "title": "Content Grid",
  "description": "Displays a configurable content collection.",
  "entry": "block.json",
  "dependencies": [],
  "supports": ["editor", "frontend", "responsive"],
  "status": "stable"
}
```

`id`는 유형별 영구 식별자를 그대로 사용한다. 레지스트리는 중복 id, 허용되지 않은 prefix, 누락된 entry, 잘못된 dependency를 빌드 전에 차단한다.

## 13. 추가 절차

새 확장 항목은 다음 순서로 추가한다.

1. 요구사항을 Pattern, Block style, Block variation, Custom block, Legacy widget 중 하나로 분류한다.
2. `extension-registry.json`에서 namespace와 허용 형식을 확인한다.
3. 영구 id와 표시 title을 분리한다.
4. `extension.json`과 실패 테스트를 먼저 추가한다.
5. 디자인은 기존 `DESIGN.md`와 `theme.json` 토큰만 사용한다.
6. editor, frontend, responsive, empty, loading, error 상태를 구현한다.
7. lint, typecheck, unit test, PHP/WPCS, WordPress 실제 편집기 검증을 통과한다.
8. 공개 id를 changelog에 기록한다.

## 14. 공식 근거

- WordPress Plugin Best Practices, Prefix Everything: <https://developer.wordpress.org/plugins/plugin-basics/best-practices/>
- WordPress PHP Coding Standards: <https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/>
- Plugin Header Requirements: <https://developer.wordpress.org/plugins/plugin-basics/header-requirements/>
- Plugin Internationalization and Text Domains: <https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/>
- Block Registration and Namespace: <https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/>
- Block Metadata: <https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/>
- Block Registration from Metadata: <https://developer.wordpress.org/block-editor/getting-started/fundamentals/registration-of-a-block/>
- WordPress Widgets API: <https://developer.wordpress.org/plugins/widgets/>
- Post Type Registration: <https://developer.wordpress.org/reference/functions/register_post_type/>
- Taxonomy Registration: <https://developer.wordpress.org/reference/functions/register_taxonomy/>
- Theme Style Variations: <https://developer.wordpress.org/themes/global-settings-and-styles/style-variations/>
- Block Style Variations: <https://developer.wordpress.org/themes/features/block-style-variations/>
- Block Variations: <https://developer.wordpress.org/themes/features/block-variations/>
- Block Stylesheets: <https://developer.wordpress.org/themes/features/block-stylesheets/>
