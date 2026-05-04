---
name: using-superpowers
description: Superpowers 메타 라우터. 복잡한 작업 시작 시 어떤 스킬을 쓸지 결정
---

# Using Superpowers

Antigravity에서 복잡한 작업을 받으면 즉시 이 스킬을 참조해 어떤 워크플로우를 따를지 결정한다.

## 1% 규칙

초기 단계(brainstorming, planning)에 시간을 더 쓰는 것이 전체 토큰 비용을 낮춘다.
즉시 구현하려 하지 말 것.

## 표준 플로우

새 기능 요청:
1. `.agent/workflows/brainstorm.md`
2. `.agent/workflows/write-plan.md`
3. **worktree 생성** (`.agent/skills/using-git-worktrees/SKILL.md`)
4. `.agent/workflows/execute-plan.md` 또는 `.agent/skills/single-flow-task-execution/SKILL.md`
5. Verification 후 PR

버그 요청:
1. `.agent/skills/systematic-debugging/SKILL.md` (Phase 1부터)

디자인 작업:
1. `.agent/workflows/design-review.md` 또는 `design-consultation.md`
