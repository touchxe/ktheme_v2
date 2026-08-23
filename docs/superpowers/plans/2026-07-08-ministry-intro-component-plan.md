# Plan: 공동체 하위 페이지 Intro 섹션 공용 컴포넌트화 (612×390 미디어 규격)

## 대상 범위
공동체 관련 6개 페이지의 최상단 Intro 섹션(`.kt-ministry-intro`):

1. `page-community.html` (공동체 메인)
2. `page-newcomers.html` (새가족)
3. `page-small-groups.html` (소그룹/구역)
4. `page-next-generation.html` (다음세대)
5. `page-youth-ministry.html` (청년부)
6. `page-senior-ministry.html` (장년/시니어)

## 현황 분석

- 6개 페이지 모두 이미 **동일한 HTML 구조**를 쓰고 있음: `.kt-ministry-intro` 그리드
  (콘텐츠 컬럼 `.kt-ministry-intro__content` + 미디어 컬럼 `.kt-ministry-intro__media`),
  콘텐츠 컬럼은 eyebrow(`kt-card-label`) + `h2` + `p` + 버튼 2개(`kt-buttons`), 미디어 컬럼은
  `img` + 우하단 오버레이 노트(`kt-ministry-intro__note`). 구조적 차이는 없고 일부 페이지(next-generation,
  youth-ministry, senior-ministry)만 마크업이 한 줄로 압축되어 있는 포맷 차이만 있음.
- `page-design-library.html`의 `#ministry` 블록(사역 페이지 컴포넌트)에 **이미 "Intro" 컴포넌트 항목이
  존재**함(현재 195번째 줄 부근). 새 섹션을 추가하는 대신 이 항목을 최신 표준으로 갱신하는 방식으로 진행.
- 현재 CSS(`style.css` `.kt-ministry-intro__media`)는 `min-height: 390px`만 지정하고 있고, 미디어
  컬럼 너비는 `minmax(420px, 1.05fr)`로 유동적(fluid)이라 **화면 너비에 따라 실제 비율이 달라짐**.
  요청하신 "612×390 고정 규격"을 만족하지 못하는 상태.
- 6개 페이지에서 쓰는 원본 이미지들은 서로 다른 비율(1100×1100 정방형, 1600×900 16:9, 1448×1086
  4:3 등)이며 현재도 `object-fit: cover`로 잘라서 채우고 있음. → **이미지 파일 자체를 재작업(크롭)할
  필요 없이**, CSS로 비율만 612:390으로 고정하면 기존 이미지 그대로 활용 가능.

## 설계 방향 (확인 요청)

"이미지 너비 612×390px" 요구사항을 다음과 같이 반응형 원칙과 함께 구현하고자 합니다:

- **CSS**: `.kt-ministry-intro__media`에 `aspect-ratio: 612 / 390`을 지정해, 컬럼 너비가 화면 크기에
  따라 달라져도(데스크톱/태블릿/모바일) 항상 612:390 비율을 유지하도록 함 (기존 `min-height: 390px`
  방식은 비율이 아닌 최소 높이만 보장해 화면 너비가 커지면 비율이 깨짐).
- **HTML**: 6개 페이지의 `<img>` 태그에 `width="612" height="390"` 속성을 명시적으로 추가해 브라우저가
  레이아웃 시프트(CLS) 없이 공간을 미리 확보하도록 함. (실제 렌더링 크기는 CSS가 결정하며, 이 속성은
  브라우저 힌트 + 요청하신 "612×390" 수치를 코드 상에서 명시하는 역할)
- 모바일(≤640px)에서도 동일 비율을 유지하되, 그리드가 1열로 전환되는 기존 반응형 동작은 유지.

> 고정 픽셀(px)로 폭을 박아버리면 모바일에서 이미지가 잘리거나 여백이 생기는 문제가 있어, 위 방식이
> 프로젝트의 "모바일 우선 반응형" 원칙(DESIGN.md)에 부합한다고 판단했습니다. 이 방향으로 진행해도
> 될지 확인 부탁드립니다.

## Tasks

### T-1: CSS 표준화 — `.kt-ministry-intro__media` 612:390 비율 고정
- **Files**: `wp-content/themes/ktheme-modu/style.css`
- **Change**:
  1. `.kt-ministry-intro__media`에 `aspect-ratio: 612 / 390;` 추가 (기존 `min-height: 390px`는
     구형 브라우저 폴백 겸용으로 유지 여부 검토 후 정리)
  2. `.kt-ministry-intro__media img`는 기존 `width:100%; height:100%; object-fit:cover;` 유지
  3. 640px 반응형 블록의 `.kt-ministry-intro__media, .kt-ministry-intro__media img { min-height: 320px; }`
     규칙을 aspect-ratio와 충돌하지 않도록 재검토(제거 또는 유지 결정)
- **Verify**: `grep -n "aspect-ratio" style.css`로 규칙 확인, 브라우저에서 6개 페이지 데스크톱/모바일
  뷰 스크린샷으로 비율 육안 확인

### T-2: 디자인 라이브러리 Intro 컴포넌트 항목 갱신
- **Files**: `wp-content/themes/ktheme-modu/templates/page-design-library.html` (`#ministry` 블록,
  "Intro" 행)
- **Change**: 데모 마크업의 `<img>`에 `width="612" height="390"` 속성 추가, 행 서브 라벨을
  `message + media (612×390)` 형태로 갱신해 규격을 문서화
- **Verify**: 라이브러리 페이지에서 Intro 데모가 612:390 비율로 표시되는지 확인

### T-3 ~ T-8: 6개 페이지 Intro 섹션에 `width`/`height` 속성 추가
- **Files** (페이지별 1건씩, 총 6개 파일):
  `page-community.html`, `page-newcomers.html`, `page-small-groups.html`,
  `page-next-generation.html`, `page-youth-ministry.html`, `page-senior-ministry.html`
- **Change**: 각 페이지 `.kt-ministry-intro__media img` 태그에 `width="612" height="390"` 속성만
  추가. 기존 카피, 링크, 이미지 파일, 노트 텍스트는 변경하지 않음(최소 diff 원칙)
- **Verify**: `grep -n "kt-ministry-intro__media" -A1` 로 6개 파일 모두 `width="612" height="390"`
  포함 확인

### T-9: 통합 검증
- **Files**: 6개 페이지 + `style.css` (읽기 전용 검증)
- **Change 없음, 검증만**:
  - 6개 페이지 모두 동일한 612:390 비율 규칙 적용 확인
  - `docs/DESIGN.md` Do's/Don'ts 체크리스트 재확인 (하드코딩 px 남발 여부 등)
  - 태그 밸런스(`<section>`/`<div>`/`<img>`) 육안 확인

## Post-conditions
- [ ] 6개 페이지의 Intro 미디어가 모두 612:390 비율로 통일됨 (반응형 유지)
- [ ] `page-design-library.html`의 Intro 컴포넌트 문서가 612×390 규격을 명시함
- [ ] 기존 카피/링크/이미지 콘텐츠는 변경 없이 유지됨
- [ ] 사용자 확인 후 커밋 → 푸시 → 라이브 배포
