# 모두 테마 프로젝트 이름 규칙

이 문서는 프로젝트 이름과 코드 식별자의 단일 기준입니다.

| 용도 | 표기 | 예시 |
|---|---|---|
| 한글 제품명 | `모두 테마` | 모두 테마 업종 패키지 |
| 영문 브랜드명 | `ModuTheme` | Theme Name, 문서 제목 |
| 저장소·패키지·WordPress 테마 slug | `modu-theme` | `wp-content/themes/modu-theme` |
| PHP 함수·WordPress 콘텐츠 타입·숏코드 | `modutheme_` | `modutheme_sermon` |
| CSS 클래스·CSS 변수·HTML data 속성 | `modu-` | `.modu-header`, `--modu-brand-500` |
| 환경변수 | `MODUTHEME_` | `MODUTHEME_IMAGE_TARGET_DIR` |

## 적용 원칙

- 제품을 한국어 문장 안에서 부를 때는 `모두 테마`로 띄어 씁니다.
- 영문 브랜드는 공백 없는 파스칼 표기 `ModuTheme`를 사용합니다.
- URL, 디렉터리, 패키지명, WordPress text domain에는 `modu-theme`를 사용합니다.
- PHP와 WordPress의 내부 식별자에는 하이픈을 쓸 수 없으므로 `modutheme_` 접두사를 사용합니다.
- 화면 코드의 짧은 네임스페이스에는 `modu-` 접두사를 사용합니다.
- 제품명에 세대 번호를 붙이지 않습니다. 릴리스 이력은 패키지와 테마의 `version` 필드로 관리합니다.

## 배포 기준

- 라이브 테마 경로: `/wp-content/themes/modu-theme`
- 기본 테마 slug: `modu-theme`
- 배포 전 기존 WordPress 콘텐츠 타입 데이터의 식별자 이전 여부를 반드시 확인합니다.
