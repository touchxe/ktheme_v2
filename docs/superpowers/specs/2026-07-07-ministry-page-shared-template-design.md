# 사역 페이지(새가족/소그룹/다음세대/청년부/장년시니어) 공용 템플릿 콘텐츠 확장
Date: 2026-07-07
Author: @user

## Problem

`/newcomers/`, `/small-groups/`, `/next-generation/`, `/youth-ministry/`, `/senior-ministry/` 5개 페이지는
`modu-ministry-page` 클래스를 공유하는 사실상의 공용 템플릿 구조(Intro → Overview → Journey → Photo Carousel →
FAQ → Contact)를 이미 갖고 있다. 그러나:

1. **섹션 구성이 페이지마다 불일치**한다. `page-small-groups.html`만 Related Links·FAQ 섹션이 빠져 있고
   대신 별도 CTA-split 섹션이 들어가 있어 "공용 템플릿"이라 부르기 어렵다.
2. 방문자가 실제로 필요로 하는 **구체적인 정보(프로그램/모임 목록, 담당자, 모임시간, 활동 후기)** 가
   현재 어느 페이지에도 없다. Overview 섹션은 "대상: 전 교인", "방식: 말씀·기도·교제" 같은 추상적 요약뿐이고,
   담당자는 "공동체 담당자"처럼 익명 표기, 모임시간은 "주중 또는 주일"처럼 비구체적이다.

## User Story

As a 교회 방문자/성도, I want 각 공동체 페이지에서 실제 운영 중인 모임(프로그램명, 대상, 요일/시간, 장소,
담당자)과 먼저 참여한 사람들의 생생한 후기를 확인하고 싶다, so that 내가 참여할 구체적인 모임을 스스로
판단하고 부담 없이 연결될 수 있다.

## Acceptance Criteria

- [ ] Given 5개 사역 페이지, When 방문자가 페이지를 열면, Then 동일한 섹션 순서(Hero → Intro → Overview →
      Programs & Meeting Times → Leadership(선택) → Photo Carousel → Testimonials → Related Links → FAQ
      → Contact)를 확인할 수 있다. (기존 Journey 5단계 섹션은 골격 단순화를 위해 제거한다)
- [ ] Given Programs & Meeting Times 섹션, When 방문자가 확인하면, Then 각 항목에 최소
      모임/프로그램명·대상·모임시간(요일+시각)·담당자(이름+직분)가 표기되어 있다.
- [ ] Given Testimonials 섹션, When 방문자가 확인하면, Then 실명 대신 "OO 청년/성도" 형태의 익명화된
      작성자 표기와 소속 모임, 후기 본문이 최소 3개 이상 노출된다.
- [ ] Given `page-small-groups.html`, When 다른 4개 페이지와 비교하면, Then Related Links, FAQ 섹션이
      동일하게 존재하고 CTA-split 섹션 존재 여부는 표준 골격 기준으로 재검토되어 있다.
- [ ] Given 새로 추가되는 모든 텍스트, When `docs/DESIGN.md` 기준으로 점검하면, Then hex 리터럴 직접
      사용 없이 기존 `modu-ministry-*` 클래스 패턴을 재사용하고, 3-column 아이콘-원형 카드 같은 AI Slop
      패턴을 사용하지 않는다.

## Out of Scope

- 프로그램/담당자/후기를 워드프레스 커스텀 포스트 타입(CPT)이나 ACF 필드로 관리하는 시스템 구축
  (이번 라운드는 **전체 정적 HTML 콘텐츠**로 진행하기로 결정함 — 항목이 늘어나 유지보수 부담이 커지면
  추후 별도 spec으로 CPT 전환을 재검토한다).
- 담당자 실명/개인 연락처 노출, 후기 작성자 사진 사용 (개인정보 보호를 위해 이니셜/직분 표기로 대체).
- `page-community.html`(공동체 허브 페이지) 자체의 구조 변경 — 단, 하위 페이지 요약 카피가 바뀌면
  일관성 차원에서 필요한 최소 링크 문구만 함께 점검한다.
- 새가족 등록/소그룹 문의 등 기존 폼의 필드 구조 변경.

## Open Questions

- (해소됨) 프로그램/후기 데이터 관리 방식 → 전체 정적 HTML로 결정.
- 실제 교회의 담당자 이름·직분·정확한 모임 요일/시각·후기 원문은 보유하고 있지 않음. 이번 구현에서는
  **플레이스홀더성 예시 콘텐츠**(예: "김OO 목사", "매주 화요일 오전 10:30")로 채우고, 담당자에게 실제
  데이터를 받는 대로 교체 가능하도록 구조(마크업 패턴)만 확정하는 것으로 진행. 실제 값 확정은 후속 작업.

## Technical Notes

### 관련 기존 코드 경로
- `wp-content/themes/modu-theme/templates/page-newcomers.html`
- `wp-content/themes/modu-theme/templates/page-small-groups.html`
- `wp-content/themes/modu-theme/templates/page-next-generation.html`
- `wp-content/themes/modu-theme/templates/page-youth-ministry.html`
- `wp-content/themes/modu-theme/templates/page-senior-ministry.html`
- `wp-content/themes/modu-theme/templates/page-community.html` (허브 페이지, 하위 요약 카드 문구 참조용)
- `wp-content/themes/modu-theme/style.css` 6096~6460행 부근 `.modu-ministry-*` 클래스 정의
- 사진 캐러셀: `[modutheme_photo_carousel preset="..."]` 숏코드 (`assets/js/photo-carousel.js`, 등록부는
  functions.php 외부/플러그인 추정 — 신규 섹션과 무관하게 유지)

### 신규 섹션 콘텐츠 모델 — 공용 라이브러리 컴포넌트 재사용

`page-design-library.html`이 실제 "재사용 가능한 컴포넌트 · 섹션" 공식 카탈로그다("모든 화면은 이
라이브러리의 조합으로 만들어집니다"). 신규 섹션은 여기 이미 정의되고 스타일이 끝난 컴포넌트를
그대로 재사용하고, **새 CSS 클래스는 최소한(그리드 컬럼 수 조정, 인용 출처 표기 정도)만 추가**한다.

**Programs & Meeting Times** (섹션 래퍼: `.modu-ministry-programs`, 내부는 `.modu-data-table` 재사용)
- 표 컬럼: 모임/프로그램명, 대상, 요일·시간, 장소, 담당자 (`modu-data-table` th/td 그대로 사용)
- 항목 수와 무관하게 5개 페이지 모두 테이블 하나로 통일 → variant 분기 없이 완전히 동일한 마크업 재사용
- 새가족 페이지는 "새가족 4주 과정 + 안내팀 배정" 1~2행만 표시

**Leadership** (섹션 래퍼: `.modu-ministry-leadership`, 선택적 섹션)
- `page-people.html`에서 이미 쓰는 `.modu-people-grid` + `.modu-people-card`(이미지 + `h3` 이름 + `p` 직분)
  그대로 재사용. 카드 개수가 1~3개로 적으므로 `.modu-ministry-leadership .modu-people-grid`에 한해
  `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`만 별도 지정(빈 칸 방지)
- 리더가 매우 많은 소그룹/구역 페이지는 이 섹션을 생략하고 Programs 표의 담당자 컬럼으로 대체

**Testimonials** (섹션 래퍼: `.modu-ministry-testimonials`, 내부는 `.modu-library-quote-grid` 재사용)
- `page-design-library.html`의 "간증 · 인용 카드"(`figure > svg + blockquote`, `.is-dark` variant 포함)
  그대로 재사용. 작성자 표기를 위해 `blockquote` 아래 `cite` 요소만 신규 스타일 추가
- 기본은 데모용으로 `max-width:820px` 2열 그리드라서, 페이지 풀 너비 3열로 쓰기 위한 override만 추가

### 표준 섹션 순서 (5개 페이지 공통)
```
Page Hero → Intro → Overview → Programs & Meeting Times → Leadership(선택)
→ Photo Carousel → Testimonials → Related Links → FAQ → Contact Form
```

(기존 Journey 5단계 참여 과정 섹션은 골격을 더 단순하게 만들기 위해 제거한다)

### 와이어프레임

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER (공용 template part)                                       │
├──────────────────────────────────────────────────────────────────┤
│ PAGE HERO — 페이지명 · 브레드크럼                                   │
├──────────────────────────────────────────────────────────────────┤
│ ① INTRO                                                           │
│ ┌───────────────────────────┐   ┌───────────────────────────┐    │
│ │ 라벨                       │   │                           │    │
│ │ H2 소개 문구                │   │       이미지               │    │
│ │ 본문 설명                   │   │   ┌───────────────────┐  │    │
│ │ [주요 CTA]  [보조 버튼]      │   │   │ 캡션 노트 박스      │  │    │
│ └───────────────────────────┘   └───────────────────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│ ② OVERVIEW — 라벨 · H2 · 설명 한 줄                                 │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                      │
│ │ 라벨   │ │ 라벨   │ │ 라벨   │ │ 라벨   │   4칸 요약 카드          │
│ │ 값     │ │ 값     │ │ 값     │ │ 값     │   (대상/시간/장소/방식)  │
│ │ 설명   │ │ 설명   │ │ 설명   │ │ 설명   │                        │
│ └────────┘ └────────┘ └────────┘ └────────┘                      │
├──────────────────────────────────────────────────────────────────┤
│ ③ PROGRAMS & MEETING TIMES 🆕 — 라벨 · H2 · 설명 한 줄               │
│  (재사용: design-library의 .modu-data-table)                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 모임/프로그램 │ 대상 │ 요일·시간   │ 장소   │ 담당자          │  │
│  │───────────────┼──────┼─────────────┼────────┼─────────────────│  │
│  │ 1구역         │ 장년 │ 화 10:30    │ 3층A실 │ 김OO 권사       │  │
│  │ 2구역         │ 청년 │ 금 20:00    │ 카페   │ 이OO 형제       │  │
│  │ ...           │ ...  │ ...         │ ...    │ ...             │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│ ④ LEADERSHIP 🆕 (선택 섹션 — 소그룹/구역은 생략)                     │
│  (재사용: page-people.html의 .modu-people-grid + .modu-people-card)    │
│  ┌────────┐  ┌────────┐                                          │
│  │ 사진   │  │ 사진   │   이름 · 직분(h3) · 담당 영역(p)            │
│  │ 이름   │  │ 이름   │                                            │
│  │ 직분   │  │ 직분   │                                            │
│  └────────┘  └────────┘                                          │
├──────────────────────────────────────────────────────────────────┤
│ ⑤ PHOTO CAROUSEL — [modutheme_photo_carousel] 숏코드                  │
│   ◀  [사진] [사진] [사진] [사진]  ▶                                │
├──────────────────────────────────────────────────────────────────┤
│ ⑥ TESTIMONIALS 🆕 — 라벨 · H2 · 설명 한 줄                          │
│  (재사용: design-library의 .modu-library-quote-grid figure+blockquote)│
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐         │
│ │ " 후기 인용구 " │ │ " 후기 인용구 " │ │ " 후기 인용구 " │         │
│ │ — OO 성도       │ │ — OO 청년       │ │ — OO 권사       │         │
│ │   (cite)        │ │   (cite)        │ │   (cite)        │         │
│ └────────────────┘ └────────────────┘ └────────────────┘         │
├──────────────────────────────────────────────────────────────────┤
│ ⑦ RELATED LINKS — 라벨 · H2 (5페이지 공통 표준화)                    │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                      │
│ │ 사역명 │ │ 사역명 │ │ 사역명 │ │ 사역명 │                      │
│ │ 한줄설명│ │ 한줄설명│ │ 한줄설명│ │ 한줄설명│                      │
│ └────────┘ └────────┘ └────────┘ └────────┘                      │
├──────────────────────────────────────────────────────────────────┤
│ ⑧ FAQ — 라벨 · H2 (5페이지 공통 표준화)                             │
│  ▸ 질문 1                                                          │
│  ▾ 질문 2 (펼침) — 답변 텍스트                                       │
│  ▸ 질문 3                                                          │
├──────────────────────────────────────────────────────────────────┤
│ ⑨ CONTACT / 신청 FORM                                              │
│ ┌───────────────────────┐   ┌─────────────────────────────────┐  │
│ │ 안내 카피              │   │ 이름 [______]  연락처 [______]    │  │
│ │ 문의처 · 연결 안내 목록  │   │ 선택항목 [▾]   메시지 [________] │  │
│ │                        │   │ [ 제출 버튼 ]                    │  │
│ └───────────────────────┘   └─────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│ FOOTER (공용 template part)                                        │
└──────────────────────────────────────────────────────────────────┘

🆕 = 이번에 신규로 추가되는 섹션 (Journey는 제거)
```

**페이지별 적용표**

| 페이지 | Programs 표 행 수(예) | Leadership |
|---|---|---|
| 새가족 | 1~2행 (새가족 과정, 안내팀) | 안내팀 대표 1명 |
| 소그룹/구역 | 5~8행 (구역별) | 생략 (표 안에 담당자 포함) |
| 다음세대 | 3~4행 (부서별) | 총괄 교역자 1명 |
| 청년부 | 2~3행 (팀/부서별) | 담당 교역자 1명 |
| 장년/시니어 | 2~3행 (모임별) | 담당 교역자 1명 |

### 예상 변경 범위
- `style.css`: 신규 클래스 최소화. 다음 세 가지만 추가한다.
  1. `.modu-ministry-leadership .modu-people-grid` 컬럼 수 override (`repeat(auto-fit, minmax(200px,1fr))`)
  2. `.modu-ministry-testimonials .modu-library-quote-grid` 풀 너비 3열 override + 반응형
  3. `.modu-library-quote-grid figure cite` 작성자 표기 스타일 (다크 variant 포함)
- 5개 템플릿 파일:
  - 기존 `.modu-ministry-journey` 섹션 제거
  - `.modu-ministry-programs`(`.modu-data-table` 재사용), `.modu-ministry-leadership`(`.modu-people-grid`/
    `.modu-people-card` 재사용), `.modu-ministry-testimonials`(`.modu-library-quote-grid` 재사용) 섹션 추가
  - `page-small-groups.html`은 Related Links/FAQ 섹션 추가 + 기존 CTA-split 섹션 제거로 표준화
- `page-community.html`: 변경하지 않음 (범위 밖 유지)
