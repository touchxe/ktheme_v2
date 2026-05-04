# Antigravity Agent Manifest

이 파일은 Antigravity의 기본 탐색 경로이지만, **실제 매니페스트는 프로젝트 루트의 `../AGENTS.md`** 입니다.

## Scope

- Skills: `.agent/skills/` (13개 Superpowers 포트)
- Workflows: `.agent/workflows/` (gstack + BMAD 포트)
- Rules: `.agent/rules/` (가드레일)

## 주요 가이드

1. **디자인 시스템**: `../docs/DESIGN.md` 반드시 먼저 읽기
2. **Worktree**: 새 기능 시작 시 `pnpm wt:add <n>`
3. **TDD**: `.agent/skills/test-driven-development/SKILL.md`
4. **Subagent**: Antigravity는 병렬 subagent 지원 → `.agent/skills/single-flow-task-execution/SKILL.md` 참조

## 병렬 에이전트 실행

Antigravity Agent Manager에서 여러 worktree를 동시에 열어:
- `wt/agent-alice` — frontend 작업
- `wt/agent-bob` — backend 작업

각 워크스페이스에 스토리 파일 경로를 전달하면 독립 실행.
