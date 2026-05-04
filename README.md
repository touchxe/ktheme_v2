# 🚀 FlowWeb v2 Template
## BMAD × gstack × Superpowers × git-worktree 통합 스켈레톤

Claude Code **없이도** Antigravity + Cursor 환경에서 3-레이어 AI 파이프라인을 작동시키는 솔로 개발자용 프로젝트 템플릿.

---

## 핵심 변화 (v1 → v2)

| 항목 | v1 | v2 |
|---|---|---|
| **Claude Code 의존성** | 일부 필요 (gstack) | **0** (모두 이식) |
| **디자인 레이어** | 부재 | **`docs/DESIGN.md` SSOT + gstack 4종 포트** |
| **에이전트 커버리지** | Cursor 위주 | **Cursor + Antigravity 병행** (`.cursor/rules` + `.agent/`) |
| **병렬 개발** | 단일 브랜치 | **git worktree + pnpm scripts** |
| **Superpowers 포트** | 플러그인 설치 가이드 | **skainguyen1412 기준 13 스킬 직접 내장** |

---

## 빠른 시작

### 1. 템플릿 복사 & 초기화

```bash
# 1. 이 디렉터리를 복사
cp -r flowweb-v2/ my-project/
cd my-project/

# 2. Git 초기화
git init && git add -A && git commit -m "chore: initial from flowweb-v2 template"
git branch -M main

# 3. 프로젝트명 치환 (macOS/Linux)
./bootstrap.sh "my-project" "한 줄 설명"

# 4. 의존성 설치
pnpm install
```

### 2. IDE 연결

**Cursor**:
- 프로젝트 폴더 열기 → `.cursor/rules/`의 매니페스트 자동 로드
- `.cursor/mcp.json`의 Playwright MCP가 `/design-review`, `/qa`에서 활용됨

**Antigravity**:
- 프로젝트 폴더 열기 → `.agent/AGENTS.md` 자동 탐색
- Agent Manager에서 worktree별 워크스페이스 추가 가능

### 3. 첫 스토리 시작

```bash
# gstack /office-hours 호출 (Cursor에서)
# → @gstack-office-hours

# 아이디어 확정 후 BMAD로 스토리 생성
# → @bmad-sm

# 스토리별 worktree 생성
pnpm wt:add story-1.1-auth

# Worktree에서 Superpowers TDD 루프 실행
cd ../wt/story-1.1-auth
# Cursor/Antigravity에서 이 폴더 열기
```

---

## 디렉터리 구조

```
flowweb-v2/
├── AGENTS.md                      ← 루트 매니페스트 (모든 AI 도구가 읽음)
├── README.md                      ← 이 파일
├── bootstrap.sh                   ← 프로젝트명 치환 스크립트
│
├── docs/
│   ├── DESIGN.md                  ← 디자인 시스템 SSOT (Linear 기반)
│   ├── prd/                       ← BMAD PM 산출물
│   ├── architecture/              ← BMAD architect 산출물
│   ├── superpowers/specs/         ← brainstorming 결과
│   └── superpowers/plans/         ← writing-plans 결과
│
├── _bmad-output/
│   └── stories/                   ← BMAD 스토리 티켓
│       └── story-template.md
│
├── .cursor/
│   ├── mcp.json                   ← Playwright + Context7 MCP
│   └── rules/
│       ├── 000-superpowers-bootstrap.mdc  (alwaysApply)
│       ├── 010-design-system.mdc          (alwaysApply)
│       ├── 020-agents-md-reference.mdc    (alwaysApply)
│       ├── superpowers/           ← 13 Superpowers 스킬
│       ├── gstack/                ← 10 gstack 스킬 (design 4 + review/QA 6)
│       └── bmad/                  ← 5 BMAD 에이전트
│
├── .agent/                        ← Antigravity 네이티브
│   ├── AGENTS.md
│   ├── skills/                    ← 13 SKILL.md (skainguyen1412 포트)
│   ├── workflows/                 ← gstack + BMAD 워크플로우 포트
│   └── rules/                     ← 가드레일
│
├── scripts/                       ← Worktree 관리 (pnpm 기반)
│   ├── wt-add.mjs                 ← 포트 오프셋 + DB 클론 + .env 복사
│   ├── wt-remove.mjs              ← 안전한 제거 + DB 드롭
│   ├── wt-launch-parallel.mjs     ← 병렬 에디터 실행
│   ├── wt-sync.mjs                ← 모든 worktree rebase
│   └── wt-ports.mjs               ← 포트 할당 현황
│
├── package.json                   ← pnpm wt:* 스크립트
├── pnpm-workspace.yaml            ← enableGlobalVirtualStore: true
├── tailwind.config.ts             ← DESIGN.md 토큰 1:1 매핑
├── .worktreeinclude               ← worktree 자동 복사 파일
├── .env.example
└── .gitignore
```

---

## 3-레이어 파이프라인

### Layer 1: Decision — gstack 포트
비즈니스/디자인 판단.

```
@gstack-office-hours      — 아이디어 YC 검증
@gstack-plan-ceo-review   — 비즈니스 방향성
@gstack-plan-eng-review   — 기술 부채
@gstack-plan-design-review — 디자인 plan 0-10 점수
@gstack-design-review     — 라이브 URL 감사 (Playwright MCP)
@gstack-design-consultation — DESIGN.md 초안
@gstack-design-shotgun    — OpenAI gpt-image-1 병렬 변종
@gstack-design-html       — PNG → 프로덕션 HTML
@gstack-review            — 코드 리뷰
@gstack-qa                — E2E 시각적 QA
@gstack-ship              — 배포 체크리스트
```

### Layer 2: Documentation — BMAD
문서 구조 / 애자일 관리.

```
@bmad-master       — Phase 진단
@bmad-pm           — PRD
@bmad-architect    — 아키텍처 + ADR
@bmad-sm           — 유저 스토리 분해
@bmad-qa           — 코드 레벨 QA
```

### Layer 3: Execution — Superpowers (13 스킬)
TDD 강제 구현 루프.

```
@sp-using-superpowers        — 메타 라우터
@sp-brainstorming             — 요구사항 정제 → specs/
@sp-writing-plans             — task 분해 → plans/
@sp-worktrees                 — ⚠️ MANDATORY 게이트
@sp-executing-plans           — plan 순차 실행
@sp-tdd                       — RED-GREEN-REFACTOR
@sp-systematic-debugging      — 4-phase 디버깅
@sp-verification              — 증거 기반 완료
@sp-requesting-code-review
@sp-receiving-code-review
@sp-finishing-branch
@sp-single-flow-task-execution
@sp-writing-skills
```

---

## Worktree 워크플로우

### 기본 명령

```bash
pnpm wt:add <n>              # 새 worktree (포트/DB 자동 할당)
pnpm wt:list                    # 전체 목록
pnpm wt:remove <n>           # 제거 (DB 드롭 포함)
pnpm wt:launch --editor cursor  # 모든 worktree 병렬 에디터 실행
pnpm wt:launch --dev            # dev 서버까지 백그라운드 시작
pnpm wt:sync --base main        # 모든 worktree를 main에 rebase
pnpm wt:ports                   # 포트 할당 현황
```

### 병렬 스토리 시나리오

```bash
# 3개 스토리 병렬 개발 시작
pnpm wt:add story-1.1-auth         # 포트 3010/3011
pnpm wt:add story-1.2-dashboard    # 포트 3020/3021
pnpm wt:add story-1.3-billing      # 포트 3030/3031

# Antigravity Agent Manager에서 각 워크스페이스 열기
pnpm wt:launch --editor antigravity --dev

# 포트 확인
pnpm wt:ports
```

### 디렉터리 결과

```
~/projects/my-project/       ← main 워크트리 (main 브랜치 고정)
~/projects/wt/
├── story-1.1-auth/          ← 브랜치 feat/story-1.1-auth, 포트 3010
├── story-1.2-dashboard/
└── story-1.3-billing/
```

---

## 디자인 시스템

**`docs/DESIGN.md`는 프로젝트의 single source of truth입니다.**

- 모든 UI 코드는 `@docs/DESIGN.md`를 자동 참조 (`.cursor/rules/010-design-system.mdc`)
- `tailwind.config.ts`의 토큰이 DESIGN.md와 1:1 매핑
- AI Slop 패턴은 자동 거부 (3-column grid, purple gradients, generic copy 등)

**DESIGN.md 변경 시**: `tailwind.config.ts`도 동기화 업데이트.

**새 프로젝트는 `/design-consultation`으로 초안 생성** 권장.

---

## 필수 외부 연동

| 도구 | 용도 | 설정 |
|---|---|---|
| **Playwright MCP** | `/design-review`, `/qa` | `.cursor/mcp.json`에 등록됨 |
| **Context7 MCP** | 최신 문서 참조 | `.cursor/mcp.json`에 등록됨 |
| **OpenAI API** | `/design-shotgun` | `.env.local`에 `OPENAI_API_KEY`, Tier 2+ 권장 |
| **Anthropic API** | FlowWeb 앱 자체 | `.env.local`에 `ANTHROPIC_API_KEY` |

Antigravity 사용 시 **OpenAI 대신 Gemini Imagen 3** 무료 사용 가능.

---

## 추가 읽기

- **BMAD**: https://github.com/bmad-code-org/bmad-method
- **gstack**: https://github.com/garrytan/gstack
- **Superpowers**: https://github.com/obra/superpowers
- **Superpowers Antigravity 포트**: https://github.com/skainguyen1412/antigravity-superpowers
- **awesome-design-md**: https://github.com/VoltAgent/awesome-design-md

---

## 라이선스

MIT. 내부의 포트된 스킬들은 각자의 원 라이선스를 따릅니다
(gstack, Superpowers는 각각의 저장소 라이선스 참조).
