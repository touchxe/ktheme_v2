# Kilo 행동 규칙 — AGENTS.md 4대 게이트 구체화

> 이 파일은 프로젝트 루트 `AGENTS.md`의 하위 규칙입니다.  
> 모순 발생 시 `AGENTS.md`가 최우선입니다.

---

## 세션 시작 시 필수 확인

1. `AGENTS.md` 읽기 완료 여부 확인 (이미 시스템 메시지에 포함됨)
2. UI 작업이라면 `docs/DESIGN.md` Section 2 (Color Palette), Section 3 (Typography), Section 5 (Layout), Section 6 (Depth & Elevation), Section 7 (Do's and Don'ts) 확인
3. 스토리 기반 구현이라면 `_bmad-output/stories/<id>.md` 확인
4. 아키텍처 관련 의사결정이라면 `docs/architecture/overview.md` + 관련 ADR 확인

---

## 코드 작성 전 — 4대 게이트 체크리스트

### 1. Worktree 게이트 (절대 건 너뛰지 말 것)

- [ ] 현재 작업 디렉토리가 `../wt/<prefix>-<name>/` 형태인가?
- [ ] `main/` 디렉터리에서 직접 코드 수정을 시도하고 있지 않은가?
- [ ] 아니라면 `pnpm wt:add <name>` 실행 후 worktree로 이동
- [ ] 접두사 규칙 준수:
  - `story-` — BMAD 스토리 구현
  - `exp-` — vibe coding / 실험 (실패 시 폐기)
  - `review-` — PR 리뷰 전용
  - `hotfix-` — 긴급 버그 수정

### 2. TDD 게이트 (절대 건 너뛰지 말 것)

- [ ] 구현 코드 작성 전, 실패하는 테스트를 먼저 작성했는가?
- [ ] 테스트 파일 경로: `<feature>.test.ts` 또는 `<feature>.spec.ts`
- [ ] `pnpm test`로 실패 확인 후에만 구현 코드 작성 시작
- [ ] 테스트 없이 작성된 코드가 있다면 즉시 삭제

### 3. Verification 게이트 (절대 건 너뛰지 말 것)

- [ ] "완료했습니다" 선언 전에 다음 명령어 실행 및 출력 캡처:
  - `pnpm test`
  - `pnpm lint && pnpm typecheck`
  - `pnpm build` (프론트엔드 변경 시)
- [ ] WordPress 관련 스크립트 변경 시에는 해당 PHP/JS 스크립트의 정상 실행도 확인

### 4. 디자인 게이트 (UI 작업 시)

- [ ] `docs/DESIGN.md`의 토큰 준수 여부 확인
- [ ] Tailwind 토큰이 `tailwind.config.ts`의 `theme.extend`에 1:1 매핑되어 있는지 확인
- [ ] AI Slop 금지 항목 미포함:
  - 3-column feature grid (icon-in-colored-circle + bold title + 2-line description x 3)
  - Purple/violet/indigo gradient backgrounds
  - Generic hero copy ("Welcome to [X]", "Unlock the power of...")
  - Inter / Roboto / System UI 폰트 (디자인 시스템 지정 폰트만 사용)
- [ ] UI PR 전 `@gstack-design-review` 최소 1회 실행

---

## 요청 라우팅 규칙

사용자 요청 수신 시 다음 에이전트/스킬을 선택한다:

| 사용자 요청 패턴 | Kilo 행동 |
|---|---|
| "새 기능 구상" / "이거 어때?" | `@gstack-office-hours` 언급 |
| "버그 / 에러 / 안 돼요" | `@sp-systematic-debugging` (절대 Phase 1 건 너뛰지 말 것) |
| "새 기능 구현해줘" | story 확인 -> `@sp-brainstorming` -> `@sp-writing-plans` -> **worktree 생성** -> `@sp-executing-plans` |
| "코드 리뷰해줘" | `@gstack-review` |
| "배포 준비" | `@gstack-qa` -> `@gstack-ship` |
| "디자인 검토" | `@gstack-design-review` (URL 필요) |
| "디자인 초안 필요" | `@gstack-design-consultation` -> `@gstack-design-shotgun` |
| 단순 오타/스타일 수정 | 직접 처리 (파이프라인 우회) |

---

## 충돌 방지 원칙

1. **비즈니스/디자인 판단은 gstack 최우선** — Superpowers나 BMAD는 이 영역을 침범하지 말 것
2. **문서 구조/애자일 관리는 BMAD 최우선** — 스토리 없이 구현 금지
3. **코드 실행/TDD는 Superpowers 최우선** — BMAD `/dev`는 Superpowers에 위임
4. **세션 분리** — Phase 전환 시 새 세션. 산출물은 `docs/` 또는 `_bmad-output/`에 저장
5. **가벼운 작업은 풀 파이프라인 우회** — 오타, 스타일 수정 등만 직접 처리

---

## WordPress 블록 테마 작업 추가 고려사항

현재 프로젝트는 K테마 WordPress 블록 테마 마이그레이션/구축 중입니다. 다음 사항을 추가로 준수합니다:

- WP 관련 스크립트(`scripts/setup-wp-*.js`, `insert_demo.php` 등) 수정 시:
  - PHP 문법 오류 검사 (`php -l` 등)
  - WP-CLI 명령어 정상 실행 확인
  - 블록 테마 JSON(theme.json) 구조 준수
- NextJS/NestJS 파이프라인과 WP 테마는 별개로 검증 필요
- `docs/DESIGN.md`의 디자인 토큰이 WP 블록 테마(`theme.json`)에도 적용되는지 교차 확인

---

## 공유 파일 수정 규칙

- `.cursor/rules/`, `AGENTS.md`, `DESIGN.md` 등 공유 파일은 **main에서만 수정**
- worktree에서는 공유 파일 수정 후 rebase
