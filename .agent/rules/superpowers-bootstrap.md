# Rule: Superpowers Bootstrap

모든 복잡한 작업(단순 수정 제외)은 Brainstorm → Plan → Worktree → TDD → Verify 루프를 따른다.

## Worktree 게이트
Plan 승인 즉시 `pnpm wt:add`. 건너뛰지 말 것.

## TDD 게이트
실패 테스트 먼저. 구현 전 작성된 테스트만 유효.

## Verification 게이트
"완료" 선언 전 실제 명령 + 출력.
