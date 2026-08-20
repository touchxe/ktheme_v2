# KTheme 확장 제작 가이드

## 시작 전 확인

새 기능을 만들기 전에 기존 `pattern`, `block-style`, `block-variation`, `block`, `widget`, `component`, `skin`, `preset`, `integration` 중 어느 종류인지 먼저 고릅니다. 같은 기능을 여러 종류로 중복 만들지 않습니다.

## 이름 규칙

- 영구 데이터 이름은 `ktheme_`로 시작합니다.
- 새 블록 이름은 `ktheme-engine/{기능}` 형식입니다.
- 새 패턴 이름은 `ktheme/{범위}-{이름}` 형식입니다.
- 새 프리셋 플러그인은 `ktheme-preset-{업종}` 형식입니다.
- `church`, `sermon`, `worship`, `style1`, `final`, `temp`은 기본 제품의 영구 데이터 이름에 쓰지 않습니다.

자세한 기준은 [EXTENSION_NAMING_STANDARD.md](../architecture/EXTENSION_NAMING_STANDARD.md)를 따릅니다.

## 필수 파일

각 확장은 최소한 다음 파일을 가집니다.

```text
extension.json
README.md
tests/
fixtures/
assets/                 # 공개 자산이 있을 때만
```

`extension.json`에는 id, 종류, 버전, 진입 파일, 의존성, 지원 상태, 안정 상태를 빠짐없이 적습니다. `pnpm validate:extensions`가 형식을 검사합니다.

## 품질 기준

- 패턴은 기본 블록을 우선 사용하고, 텍스트와 이미지를 편집할 수 있어야 합니다.
- 빈 목록에는 방문자에게 다음 행동을 안내하는 빈 화면을 제공합니다.
- 로딩·오류 상태가 있는 블록은 각각의 상태를 설명합니다.
- 키보드 조작, 보이는 포커스, 충분한 색 대비를 확인합니다.
- deprecated 상태로 바꾸기 전에는 대체 방법과 제거 버전을 README에 기록합니다.

## 프리셋 규칙

프리셋은 표시 이름, 추천 term, 메뉴, 패턴, 데모 안내를 제공할 수 있습니다. 반대로 엔진의 post type·taxonomy key를 바꾸거나 사용자 동의 없이 콘텐츠를 만들거나 다른 프리셋 데이터를 삭제하면 안 됩니다.
