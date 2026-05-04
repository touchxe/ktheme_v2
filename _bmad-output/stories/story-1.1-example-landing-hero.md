---
id: story-1.1-example-landing-hero
epic: 1. Marketing Site
status: draft
priority: P0
estimate: 2
assignee: solo
created: 2026-04-17
---

# Story 1.1: 랜딩 페이지 히어로 섹션 (예시)

> ℹ️ **이 스토리는 템플릿 사용 예시입니다.** 실제 프로젝트 시작 시 이 파일을 참고해 삭제하거나 `story-template.md`를 복제해 새 스토리를 만드세요.

## User Story

> As a **방문자**, I want **랜딩 페이지 진입 시 이 제품이 무엇을 하는지 3초 안에 이해할 수 있는 히어로 섹션**, so that **더 자세히 알아볼지 바로 이탈할지 판단할 수 있다**.

## Context & Motivation

제품의 첫 인상을 결정하는 영역. 제네릭 SaaS 히어로 패턴(그라디언트 + "Unlock the power" 문구)을 피하고 DESIGN.md 기준의 차별화된 히어로가 필요.

- Design: `docs/DESIGN.md` Section 1, 3 (Typography), 9 (Agent Prompt Guide - Hero 예시)

## Acceptance Criteria

- [ ] **AC-1**: `/` 루트 경로 접근 시 히어로 섹션이 첫 뷰포트에 완전히 표시됨
- [ ] **AC-2**: 헤드라인이 Display L (56px, -0.03em) 스타일, 2줄 이하
- [ ] **AC-3**: 서브 카피가 Body L (17px) + max-width 560px
- [ ] **AC-4**: CTA 버튼 2개 (Primary + Secondary), 각 36px 높이
- [ ] **AC-5**: 반응형: 모바일에서 헤드라인 36px, CTA 세로 스택, 패딩 20px
- [ ] **AC-6**: 다크모드 토글 시 `--bg-page-dark` / `--text-primary-dark` 적용
- [ ] **AC-7**: 키보드 Tab으로 CTA 2개 접근 가능, focus ring 표시
- [ ] **AC-8**: AI Slop 블랙리스트 패턴 없음 (gradient 배경, 제네릭 카피 등)

## Technical Notes

### 변경될 파일

**New**:
- `app/(marketing)/page.tsx` — 랜딩 루트
- `components/marketing/Hero.tsx` — 재사용 가능한 Hero 컴포넌트
- `__tests__/marketing/Hero.test.tsx` — 유닛 테스트
- `e2e/landing.spec.ts` — E2E

**Modified**:
- `app/layout.tsx` — metadata 업데이트

### 설계 고려사항

- CTA 카피는 행동 동사로 시작 (예: "Start building", "Book a demo")
  - ❌ "Get started", "Learn more" 같은 제네릭 회피
- 배경: 단색 `var(--bg-page)` 또는 `var(--bg-subtle)`, 그라디언트 금지
- 이미지/일러스트: 이 스토리 범위 밖 (스토리 1.2에서 별도로)

## Dependencies

- **Blocks**: story-1.2 (히어로 비주얼 추가)
- **Blocked by**: (없음 — 첫 스토리)

## Out of Scope

- 히어로 비주얼(제품 스크린샷, 일러스트) — story-1.2
- 애니메이션 / 스크롤 인터랙션 — story-1.3
- A/B 테스팅 인프라 — 별도 epic

---

## Superpowers 실행 가이드

```bash
# 1. Worktree 생성
pnpm wt:add story-1.1-landing-hero

# 2. Worktree 이동
cd ../wt/story-1.1-landing-hero

# 3. Clean baseline 검증
pnpm test && pnpm lint && pnpm typecheck

# 4. Cursor/Antigravity에서 이 폴더 열기
cursor .
# 또는
antigravity .
```

Cursor에서 다음 순서:
1. `@sp-writing-plans` — 아래 Task 분해 기반으로 상세 plan
2. `@sp-tdd` — T-1 (실패 테스트) 먼저
3. `@sp-executing-plans` — 순차 실행
4. `@gstack-design-review` + URL `http://localhost:3010`
5. `@sp-verification` — 증거 리포트
6. `@sp-finishing-branch` — PR 생성

---

## Task 분해

### T-1: 테스트 스캐폴딩 (5분)
- `__tests__/marketing/Hero.test.tsx` 생성
- describe 블록: rendering, interactions, a11y
- 각 AC를 it 블록으로 매핑 (skip 상태)

### T-2: Hero 컴포넌트 (15분)
- `components/marketing/Hero.tsx`
- Props: `headline`, `subcopy`, `primaryCta`, `secondaryCta`
- Tailwind 토큰만 사용 (DESIGN.md 매핑된 `text-display-lg`, `bg-brand-primary` 등)
- 반응형 클래스 포함 (`md:`, `lg:`)

### T-3: 페이지 통합 (5분)
- `app/(marketing)/page.tsx`
- Hero 컴포넌트 사용 + 실제 카피 주입
- metadata 설정

### T-4: 테스트 채우기 (10분)
- T-1의 skip을 실제 assertion으로 교체
- Testing Library + jest-dom

### T-5: E2E (10분)
- `e2e/landing.spec.ts`
- 3 viewport 스크린샷 (375, 768, 1440)
- 다크모드 토글 후 재확인
- CTA 클릭 → 기대 경로 이동

### T-6: 디자인 검토 루프 (15분)
- `@gstack-design-review` 호출
- 감지된 FINDING을 AC에 반영
- 필요시 CSS 미세 조정

---

## 완료 체크리스트

- [ ] 모든 AC 통과
- [ ] `pnpm test` → 0 실패
- [ ] `pnpm lint` → 0 에러
- [ ] `pnpm typecheck` → 0 에러
- [ ] `pnpm build` → 성공
- [ ] `@sp-verification` 리포트 제출
- [ ] `@gstack-design-review` Design Score B+ 이상, AI Slop A 이상
- [ ] `@gstack-review` 완료
- [ ] PR 머지
- [ ] `pnpm wt:remove story-1.1-landing-hero`
