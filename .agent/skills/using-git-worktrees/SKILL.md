---
name: using-git-worktrees
description: 필수 게이트. Plan 승인 직후 git worktree 생성 및 clean test baseline 검증
---

# Using Git Worktrees (MANDATORY GATE)

## 프로세스

```bash
pnpm wt:add <story-id-or-name>
```

자동 수행:
- linked worktree 생성 at `../wt/<n>/`
- 포트 오프셋 (3010/3020/...)
- DB 클론
- `.env.local` 자동 복사

## Clean Baseline 검증 (건너뛰지 말 것)

```bash
cd ../wt/<n>
pnpm install
pnpm test       # 모든 테스트 통과
pnpm lint       # 0 에러
pnpm typecheck  # 0 에러
```

실패하면 **main 문제 먼저 해결**.

## Naming
- story-<id>-<slug> / exp-<slug> / review-pr-<num> / hotfix-<slug>

## 정리
`pnpm wt:remove <n>`
