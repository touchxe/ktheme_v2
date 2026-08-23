# Plan: 사역 페이지 공용 템플릿 콘텐츠 확장 (프로그램/담당자/모임시간/활동후기)
Spec: docs/superpowers/specs/2026-07-07-ministry-page-shared-template-design.md

## Pre-conditions
- [ ] 대상 파일 5종 + `style.css` 경로 확인 (완료)
- [ ] 실제 담당자 이름/모임 요일·시각/후기 원문은 보유하지 않음 → 플레이스홀더 콘텐츠로 진행하고
      `<!-- TODO: 실제 데이터로 교체 -->` 주석을 남겨 추후 교체가 쉽도록 함
- [ ] **공용 라이브러리 우선 재사용 원칙**: `page-design-library.html`에 이미 정의된 컴포넌트
      (`.kt-data-table`, `.kt-people-grid`/`.kt-people-card`, `.kt-library-quote-grid`)를 그대로
      쓰고, 새 CSS는 그리드 컬럼 수 조정과 인용구 출처(`cite`) 표기 정도로 최소화한다
- [ ] Journey(참여 과정 5단계) 섹션은 5개 페이지에서 모두 제거한다
- [ ] 이 프로젝트는 WP 정적 HTML 템플릿이라 unit test 대상이 아님. grep 기반 구조 검증 +
      `docs/DESIGN.md` Do's/Don'ts 셀프체크로 검증을 대체

## Tasks

### T-1: 공용 CSS 최소 확장 (`style.css`)
- **Files**: `wp-content/themes/ktheme-modu/style.css`
- **Change**: 새 컴포넌트 클래스를 만들지 않고, 기존 라이브러리 컴포넌트를 사역 페이지 풀 너비에
  맞게 조정하는 override만 추가한다.
  1. `.kt-ministry-leadership .kt-people-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); max-width: 720px; }`
     — 리더 1~3명일 때 5열 그리드가 빈 칸으로 남는 문제 방지 (`.kt-people-grid` 원본은 5열 고정)
  2. `.kt-ministry-testimonials .kt-library-quote-grid { max-width: none; grid-template-columns: repeat(3, minmax(0, 1fr)); }`
     — 원본은 데모용 2열/820px 제한이므로 페이지 섹션에서는 3열 풀 너비로 확장
  3. `.kt-library-quote-grid figure cite { display:block; margin-top:14px; color:var(--kt-ink-600); font-size:13px; font-style:normal; font-weight:700; }`
     + `.kt-library-quote-grid figure.is-dark cite { color: rgba(255,255,255,0.7); }`
     — 후기 작성자 표기용 (원본엔 인용구만 있고 출처 표기가 없음)
  4. 반응형: 1024px 미디어쿼리 블록(8694행 부근)에 `.kt-ministry-testimonials .kt-library-quote-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }`,
     640px 블록(8815행 부근)에 `grid-template-columns: 1fr;` 추가. `.kt-data-table`, `.kt-people-grid`는
     이미 전역 반응형 규칙이 있어 추가 작업 불필요
- **Constraint**: `--kt-*` 기존 CSS 커스텀 프로퍼티만 사용(hex 리터럴 금지), 아이콘-원형 패턴 금지
- **Verify**: `grep -n "kt-ministry-leadership\|kt-ministry-testimonials" wp-content/themes/ktheme-modu/style.css` 로 추가된 규칙 확인, 중괄호 짝 육안 검토

### T-2: `page-newcomers.html` — Journey 제거 + 신규 섹션 추가
- **Files**: `wp-content/themes/ktheme-modu/templates/page-newcomers.html`
- **Change**:
  1. 기존 `<section class="kt-ministry-journey" ...>...</section>` 블록 삭제
  2. Overview 섹션 뒤에 `<section class="kt-ministry-programs">`(`.kt-ministry-section-head` +
     `<table class="kt-data-table">`, 새가족 과정 1~2행) 삽입
  3. 그 뒤에 `<section class="kt-ministry-leadership">`(`.kt-people-grid` + `.kt-people-card` 1개,
     새가족 안내팀 대표) 삽입
  4. Photo Carousel과 FAQ 사이에 `<section class="kt-ministry-testimonials">`(`.kt-library-quote-grid`,
     후기 3개) 삽입
- **Verify**: `grep -c "kt-ministry-journey" page-newcomers.html` 결과 0, `kt-ministry-programs\|kt-ministry-leadership\|kt-ministry-testimonials` 존재 확인, `<!-- wp:html -->`/`<!-- /wp:html -->` 짝 개수 일치

### T-3: `page-small-groups.html` — 표준화 + Journey 제거 + 신규 섹션
- **Files**: `wp-content/themes/ktheme-modu/templates/page-small-groups.html`
- **Change**:
  1. 기존 `kt-ministry-journey` 섹션과 `kt-action-cta--split` CTA 섹션 삭제
  2. Overview 뒤에 `kt-ministry-programs`(`.kt-data-table`, 구역 5~8행 — 모임명/대상/요일시간/장소/
     담당자) 삽입. Leadership 섹션은 생략(표에 담당자 포함되므로)
  3. 다른 4개 페이지와 동일하게 **Related Links**(`kt-ministry-links`)와 **FAQ**(`kt-ministry-faq`)
     섹션 추가
  4. Photo Carousel 뒤에 `kt-ministry-testimonials` 삽입(구역 모임 후기 3개)
- **Verify**: `grep -c "kt-ministry-links\|kt-ministry-faq\|kt-ministry-journey" page-small-groups.html` — links/faq는 1 이상, journey는 0

### T-4: `page-next-generation.html` — Journey 제거 + 신규 섹션 추가
- **Files**: `wp-content/themes/ktheme-modu/templates/page-next-generation.html`
- **Change**: T-2와 동일 패턴. `kt-ministry-programs` 표는 부서별(영유아/유초등/중고등) 3~4행 +
  담당 교사명, `kt-ministry-leadership`은 다음세대 총괄 교역자 1명, `kt-ministry-testimonials`는
  학부모/교사 후기 3개
- **Verify**: T-2와 동일 + Overview(부서 요약)와 Programs(표, 상세)가 내용 중복 없이 역할 분담되는지 확인

### T-5: `page-youth-ministry.html` — Journey 제거 + 신규 섹션 추가
- **Files**: `wp-content/themes/ktheme-modu/templates/page-youth-ministry.html`
- **Change**: T-2와 동일 패턴. Programs 표는 팀/부서별 2~3행, Leadership은 청년부 담당 교역자 1명,
  Testimonials는 청년 후기 3개
- **Verify**: T-2와 동일

### T-6: `page-senior-ministry.html` — Journey 제거 + 신규 섹션 추가
- **Files**: `wp-content/themes/ktheme-modu/templates/page-senior-ministry.html`
- **Change**: T-2와 동일 패턴. Programs 표는 모임/경로회 단위 2~3행, Leadership은 장년/시니어 담당
  교역자 1명, Testimonials는 장년/시니어 성도 후기 3개
- **Verify**: T-2와 동일

### T-7: 전체 일관성 및 디자인 시스템 검증
- **Files**: 5개 사역 페이지 + `style.css` (읽기 전용 검증)
- **Change 없음, 검증만**:
  - 5개 페이지가 동일한 섹션 순서(Hero → Intro → Overview → Programs → Leadership(선택) →
    Carousel → Testimonials → Links → FAQ → Contact)를 갖는지, Journey가 모두 제거됐는지 확인
  - `docs/DESIGN.md` Section 7 Do's/Don'ts 체크리스트 재확인
  - `docs/SITE_IA_SLUG_RULES.md` 슬러그/메뉴 규칙과 충돌 없는지 확인 (새 섹션은 URL/메뉴 변경 없음)
- **Verify**: `grep -o "kt-ministry-[a-z-]*" 각 파일 | sort -u` 로 5개 파일의 섹션 클래스 목록을
  나란히 비교해 순서와 종류가 동일한지 확인

## Post-conditions
- [ ] 모든 task verified (grep 기반 구조 확인 완료)
- [ ] 5개 페이지에서 `kt-ministry-journey` 클래스가 모두 제거됨
- [ ] 5개 페이지 섹션 순서 동일함 확인
- [ ] `docs/DESIGN.md` AI Slop 체크리스트 통과
- [ ] 플레이스홀더 데이터 위치에 `TODO` 주석 표기 완료
- [ ] 사용자에게 라이브 반영 필요 여부 확인 후 배포 스크립트로 서버 반영
