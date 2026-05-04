---
name: executing-plans
description: Plan의 task를 순차 실행. 각 task마다 TDD + verification
---

# Executing Plans

Plan의 다음 미완료 task 찾아 실행.

## Task 루프
1. Task 이해
2. Test first (`.agent/skills/test-driven-development/SKILL.md`)
3. Implement (minimal)
4. Verify (`.agent/skills/verification-before-completion/SKILL.md`)
5. Commit
6. Plan 업데이트 (체크박스)

## 문제 발생
- 반복 실패 → systematic-debugging
- Spec 모호 → brainstorming 단계로 back-propagate
