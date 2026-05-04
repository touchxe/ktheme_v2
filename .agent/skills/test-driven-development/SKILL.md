---
name: test-driven-development
description: RED-GREEN-REFACTOR 강제. 테스트 없이 작성된 구현 코드는 삭제
---

# TDD

## 3-phase
- 🔴 RED: 실패 테스트 먼저, 실행해서 실패 확인
- 🟢 GREEN: 통과하는 최소 구현
- 🔵 REFACTOR: 테스트 보호 하에 정리

## 철칙
- Write test first (구현 먼저 쓴 코드는 삭제)
- One test at a time
- No refactor during GREEN
- No new feature during REFACTOR

Framework: Vitest + Testing Library + Playwright
