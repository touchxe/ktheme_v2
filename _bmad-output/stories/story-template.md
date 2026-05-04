---
id: story-X.Y-slug
epic: N. Epic Name
status: draft  # draft | ready | in-progress | review | done
priority: P0  # P0 (must-have) | P1 (should-have) | P2 (nice-to-have)
estimate: 3  # Story points (Fibonacci: 1, 2, 3, 5, 8)
assignee: solo
created: YYYY-MM-DD
---

# Story X.Y: [Title]

## User Story

> As a **[role]**, I want **[capability]**, so that **[value]**.

## Context & Motivation

[이 스토리가 필요한 이유 한 문단. 관련 PRD 섹션 링크]

- PRD: `docs/prd/[feature].md`
- Architecture: `docs/architecture/[area].md`
- Design: `docs/DESIGN.md` Section [N]

## Acceptance Criteria

- [ ] **AC-1**: Given X, When Y, Then Z
- [ ] **AC-2**: ...
- [ ] **AC-3**: ...
- [ ] **AC-4**: 반응형 대응 (mobile / tablet / desktop)
- [ ] **AC-5**: 다크모드 대응
- [ ] **AC-6**: 접근성 (키보드 탐색, aria-label, focus visible)
- [ ] **AC-7**: 에러 처리 명확 (네트워크 오류, 검증 실패)

## Technical Notes

### 변경될 파일

**New**:
- `app/[route]/page.tsx`
- `components/[N]/[N].tsx`
- `lib/[module].ts`
- `__tests__/[N].test.ts`

**Modified**:
- ...

### 관련 API / Data

- Endpoint: `POST /api/[resource]`
- Schema: `[Entity]` (Prisma)
- External: [Stripe / Anthropic / ...]

### 설계 고려사항

- [edge case 1]
- [성능 / 보안 관련]

## Dependencies

- **Blocks**: [어떤 스토리가 이것을 기다리는가]
- **Blocked by**: [선행되어야 하는 스토리]

## Out of Scope

- [명시적으로 이 스토리에서는 안 하는 것]
- [향후 별도 스토리로 분리될 것]

---

## Superpowers 실행 가이드

이 스토리를 구현할 때 다음 루프를 따르세요:

### 1. Brainstorming (선택, 복잡한 경우)
`@sp-brainstorming` — 접근법이 여러 개인 경우 spec 먼저 정제

### 2. Writing Plans
`@sp-writing-plans` — 아래 Task 분해를 참고해 실행 계획 작성
→ `docs/superpowers/plans/YYYY-MM-DD-story-X.Y-slug-plan.md`

### 3. Worktree 생성 (필수 게이트)
```bash
pnpm wt:add story-X.Y-slug
cd ../wt/story-X.Y-slug
pnpm test      # clean baseline 검증
```

### 4. TDD 구현
`@sp-tdd` — 각 AC마다 실패 테스트 먼저

### 5. 디자인 검토 (UI가 있는 경우)
`@gstack-design-review` — 로컬 URL(`http://localhost:<port>`)로 감사

### 6. Verification
`@sp-verification` — 실제 명령 실행 + 출력 캡처

### 7. PR 생성
`@sp-finishing-branch` — squash + 리포트 + PR

---

## Task 분해 (참고용)

> 아래는 Scrum Master가 초기 제안하는 task 분해. Superpowers `@sp-writing-plans`에서 더 세밀하게 조정됨.

### T-1: 테스트 스캐폴딩
- `__tests__/[N].test.ts` 생성
- 주요 AC를 `describe` / `it`로 구조화 (구현 없이 skip 표시)

### T-2: 데이터 레이어
- Prisma 스키마 업데이트 (필요시)
- `lib/[module].ts`에 순수 함수로 비즈니스 로직

### T-3: API 엔드포인트
- `app/api/[resource]/route.ts`
- 입력 검증 (Zod)
- 에러 처리

### T-4: UI 컴포넌트
- `components/[N]/[N].tsx`
- DESIGN.md 토큰만 사용
- 반응형 + 다크모드 대응

### T-5: 페이지 통합
- `app/[route]/page.tsx`
- 서버 컴포넌트 vs 클라이언트 컴포넌트 경계 명확히

### T-6: E2E 시나리오
- `e2e/[feature].spec.ts`
- 핵심 user journey 1-2개

### T-7: 디자인 검토 + 수정 루프
- `@gstack-design-review` 호출
- AI Slop 블랙리스트 대비 체크

---

## 완료 체크리스트

- [ ] 모든 AC 통과
- [ ] `pnpm test` → 0 실패
- [ ] `pnpm lint` → 0 에러
- [ ] `pnpm typecheck` → 0 에러
- [ ] `pnpm build` → 성공
- [ ] `@sp-verification` 리포트 제출
- [ ] `@gstack-design-review` 통과 (UI 변경 시)
- [ ] `@gstack-review` 완료 (code review)
- [ ] PR 생성 및 머지
- [ ] Worktree 정리 (`pnpm wt:remove story-X.Y-slug`)
