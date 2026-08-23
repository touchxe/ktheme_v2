# AGENTS.md — 프로젝트 마스터 매니페스트
# ============================================================
# 이 파일은 Cursor, Antigravity, GitHub Copilot, Gemini CLI 등
# 모든 AI 코딩 에이전트가 공통으로 읽는 단일 source of truth입니다.
# ============================================================

## 프로젝트 개요

- **이름**: {{PROJECT_NAME}}
- **설명**: {{PROJECT_DESCRIPTION}}
- **기술 스택**: Next.js 14+ (App Router) / NestJS / PostgreSQL / Tailwind CSS + shadcn/ui / Anthropic Claude API
- **패키지 매니저**: pnpm (worktree 최적화를 위해 `enableGlobalVirtualStore: true` 필수)

## 서버 환경 및 배포 설정

- **Live Server**: `https://juswer.mycafe24.com`
- **Live Theme Path**: `/wp-content/themes/ktheme-modu`
- **배포 원칙**: 사용자가 "라이브 반영" 또는 "서버 반영"을 요청하면 `juswer.mycafe24.com`에 반영합니다.

## 빌드 / 테스트 / 실행 명령어

```bash
pnpm install              # 의존성 설치
pnpm dev                  # 개발 서버 (포트 자동 할당)
pnpm test                 # 유닛 테스트
pnpm test:e2e             # Playwright E2E
pnpm lint && pnpm typecheck
pnpm build && pnpm start  # 프로덕션 빌드

# Worktree 관리 (scripts/ 참조)
pnpm wt:add <name>        # worktree 생성 + 포트/DB 자동 할당
pnpm wt:list              # 목록
pnpm wt:remove <name>     # 정리
pnpm wt:launch            # 병렬 에이전트 런칭
```

---

## 🎨 디자인 시스템 — 반드시 docs/DESIGN.md를 참조하라

**모든 UI 코드 작성 전에 `docs/DESIGN.md`를 읽어야 합니다.**
이 파일은 프로젝트의 디자인 토큰(컬러, 타이포그래피, 스페이싱, 컴포넌트 스타일)의
단일 source of truth입니다. Linear.app 기반으로 커스텀되어 있습니다.

- UI 컴포넌트 작성 시 → `docs/DESIGN.md` Section 2 (Color Palette), Section 3 (Typography) 참조
- 레이아웃 작성 시 → Section 5 (Layout), Section 6 (Depth & Elevation) 참조
- "AI Slop" 방지 → Section 7 (Do's and Don'ts) 필독
- Tailwind 토큰은 이미 `tailwind.config.ts`의 `theme.extend`에 1:1 매핑되어 있음

**금지 사항** (AI Slop Detection 기준):
- 3-column feature grid (icon-in-colored-circle + bold title + 2-line description × 3)
- Purple/violet/indigo gradient backgrounds
- 제네릭 히어로 카피 ("Welcome to [X]", "Unlock the power of...")
- Inter / Roboto / System UI 폰트 (디자인 시스템이 지정한 폰트만 사용)

---

## 🧭 사이트 IA / Slug 규칙 — 반드시 docs/SITE_IA_SLUG_RULES.md를 참조하라

**메뉴, 페이지, archive, single, contact form 생성 또는 수정 전에 `docs/SITE_IA_SLUG_RULES.md`를 읽어야 합니다.**
이 파일은 교회 홈페이지의 메뉴 구조, 사이트맵, slug 사전, 화면 타입 판단 규칙의 단일 기준입니다.

- 페이지 생성 시 → slug 사전을 우선 사용하고, 한글 slug/공백/언더스코어를 사용하지 않습니다.
- 메뉴 수정 시 → 1차 IA와 사이트맵을 기준으로 헤더/푸터 메뉴를 연결합니다.
- 콘텐츠 목록이 필요한 경우 → archive + single 구조를 우선 검토합니다.
- 등록, 문의, 신청, 요청 페이지 → contact form 또는 신청 폼 페이지로 구성합니다.
- 국내 선교와 해외 선교는 `선교 안내 /mission/`에 통합하고, `선교소식` 메뉴는 만들지 않습니다.
- `교단소식`은 미디어 하위 메뉴로 유지합니다.

---

## 🧠 3-레이어 에이전트 파이프라인

### Layer 1 — Decision (gstack 포트)
**WHY를 결정한다.** 비즈니스 판단, 엔지니어링 판단, 디자인 판단.

Cursor에서: `@gstack-office-hours`, `@gstack-plan-ceo-review`, `@gstack-plan-design-review`
Antigravity에서: `.agent/workflows/` 내 워크플로우 실행

주요 스킬:
- `office-hours` — YC 창업자 관점으로 아이디어 압축
- `plan-ceo-review` — 비즈니스 방향성 검증
- `plan-eng-review` — 기술 부채 크로스체크
- `plan-design-review` — 디자인 plan을 0-10 점수로 반복 정제
- `design-review` — 라이브 URL 감사 (Playwright MCP + 80-item 체크리스트)
- `design-consultation` — DESIGN.md 초안 생성 (신규 프로젝트용)
- `design-shotgun` — OpenAI gpt-image-1로 3~6 변종 병렬 생성
- `design-html` — 승인된 PNG를 프로덕션 HTML/JSX로 변환

### Layer 2 — Documentation (BMAD)
**WHO/WHAT을 정의한다.** PRD, 아키텍처, 유저 스토리.

`@bmad-pm`, `@bmad-architect`, `@bmad-sm`, `@bmad-qa`

산출물은 `docs/prd/`, `docs/architecture/`, `_bmad-output/stories/`에 저장.

### Layer 3 — Execution (Superpowers)
**HOW를 실행한다.** Brainstorm → Plan → TDD → Debug → Verify.

`@sp-brainstorming`, `@sp-writing-plans`, `@sp-executing-plans`, `@sp-tdd`,
`@sp-systematic-debugging`, `@sp-verification`, `@sp-worktrees`

Antigravity: `.agent/skills/` 하위의 13개 스킬 (skainguyen1412 포트 기준).

### 핵심 게이트 (절대 건너뛰지 말 것)

1. **worktree 게이트**: brainstorming → writing-plans → **[승인 직후 반드시 worktree 생성]** → executing-plans
2. **TDD 게이트**: 구현 코드 전에 실패 테스트 먼저. 테스트 없이 작성된 코드는 삭제하라.
3. **verification 게이트**: "완료했습니다" 선언 전에 실제 명령 실행 + 출력 캡처.
4. **디자인 게이트**: UI PR 전에 `@gstack-design-review` 최소 1회 실행.

---

## 🤝 하이브리드 워크플로우 (Antigravity + Codex)

솔로 풀스택 개발 환경에서 높은 생산성을 내기 위해, 두 AI 에이전트를 병행 사용합니다.

### 1. 역할 분담
- **Antigravity (기획 및 관리)**:
  - `Manager View` 역할 수행
  - 프로젝트 전체 구조 설계, 컴포넌트 리뷰 및 브라우저 통합 검증
  - 코드 작성 전 TDD 규칙 점검 및 멀티에이전트 조율
- **Codex (실행 및 코딩)**:
  - 백그라운드 터미널(CLI) 및 앱을 통한 무거운 구현/리팩토링 전담
  - SWE(Software Engineer) 수준의 깊은 논리 코딩 및 대량 파일 조작

### 2. 핸드오프 (Handoff) 및 실행 프로토콜
1. **명세(Spec) 작성**: Antigravity가 `docs/superpowers/specs/` 하위에 요구사항과 설계 명세서를 작성합니다.
2. **백그라운드 위임**: Antigravity가 `.agent/skills/using-codex` 스킬을 통해 터미널에서 `codex "Implement [Task] based on [Spec]"` 명령어를 실행합니다.
3. **병렬 검토**: Codex가 백그라운드에서 작업하는 동안 Antigravity는 다른 기획 작업을 하거나, 작업 완료 후 `git diff`로 결과를 통합 검증합니다.

---

## 🔀 명령어 라우팅 규칙

사용자 요청을 받으면 다음 패턴에 따라 에이전트/스킬을 선택한다:

| 사용자 요청 패턴 | 사용할 스킬 |
|---|---|
| "새 기능 구상" / "이거 어때?" | `@gstack-office-hours` |
| "버그 / 에러 / 안 돼요" | `@sp-systematic-debugging` (절대 Phase 1 건너뛰지 말 것) |
| "새 기능 구현해줘" | story 확인 → `@sp-brainstorming` → `@sp-writing-plans` → **worktree 생성** → `@sp-executing-plans` |
| "코드 리뷰해줘" | `@gstack-review` |
| "배포 준비" | `@gstack-qa` → `@gstack-ship` |
| "디자인 검토" | `@gstack-design-review` (URL 필요) |
| "디자인 초안 필요" | `@gstack-design-consultation` → `@gstack-design-shotgun` |
| 단순 오타/스타일 수정 | 직접 처리 (파이프라인 생략) |

## ⚠️ 충돌 방지 원칙

1. **비즈니스/디자인 판단은 gstack 최우선** — Superpowers나 BMAD는 이 영역을 침범하지 말 것
2. **문서 구조/애자일 관리는 BMAD 최우선** — 스토리 없이 구현 금지
3. **코드 실행/TDD는 Superpowers 최우선** — BMAD `/dev`는 Superpowers에 위임
4. **세션 분리** — Phase 전환 시 새 세션. 산출물은 `docs/` 또는 `_bmad-output/`에 저장
5. **가벼운 작업은 풀 파이프라인 우회** — 오타, 스타일 수정 등

## 🧱 Worktree 규칙

- `main` 브랜치는 오직 `main/` 디렉터리에만 있고, 절대 feature 체크아웃하지 않는다
- 모든 feature 작업은 `../wt/<prefix>-<name>/` 형태의 linked worktree에서 수행
- 접두사 규칙:
  - `story-` — BMAD 스토리 구현
  - `exp-` — vibe coding / 실험 (실패 시 폐기)
  - `review-` — PR 리뷰 전용
  - `hotfix-` — 긴급 버그 수정
- 포트 할당: main(3000/3001), wt-1(3010/3011), wt-2(3020/3021), ...
- DB: `pnpm wt:add`가 자동으로 worktree별 DB 클론 생성
- 공유 파일(`.cursor/rules`, `AGENTS.md`, `DESIGN.md` 등)은 **main에서만 수정**, worktree는 rebase

## 📁 프로젝트 구조

```text
{{PROJECT_NAME}}/
├── AGENTS.md                    ← 이 파일 (공통 매니페스트)
├── docs/
│   ├── DESIGN.md                ← 디자인 시스템 SSOT
│   ├── prd/                     ← BMAD PM 산출물
│   ├── architecture/            ← BMAD architect 산출물
│   ├── superpowers/specs/       ← brainstorming 결과
│   └── superpowers/plans/       ← writing-plans 결과
├── _bmad-output/stories/        ← BMAD 스토리
├── .cursor/rules/               ← Cursor .mdc 매니페스트
│   ├── superpowers/             ← 13개 Superpowers 스킬
│   ├── gstack/                  ← 디자인 4종 + 리뷰/QA 4종
│   └── bmad/                    ← BMAD 에이전트 rules
├── .agent/                      ← Antigravity 전용
│   ├── skills/                  ← 13개 SKILL.md
│   ├── workflows/               ← gstack/BMAD 포트
│   └── rules/                   ← 가드레일
├── scripts/                     ← wt:* 스크립트
├── vendor/                      ← pretext.js (gstack design-html)
├── tailwind.config.ts           ← DESIGN.md 토큰 매핑
├── pnpm-workspace.yaml          ← enableGlobalVirtualStore: true
└── .worktreeinclude             ← worktree 자동 복사 파일 목록
```
