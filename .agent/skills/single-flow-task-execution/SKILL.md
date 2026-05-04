---
name: single-flow-task-execution
description: Antigravity의 순차 실행 모드. 병렬 subagent 불필요한 경우 사용
---

# Single-Flow Task Execution

Antigravity는 Agent Manager에서 워크스페이스 분리로 병렬을 구현한다.
단일 워크스페이스 내에서는 순차 실행.

## 순차 전략
- Task 순서대로
- 각 task 완료 시 이전 context 요약으로 재시작
- 관련 없는 파일 unload

## 병렬 필요 시
여러 worktree 생성 → Agent Manager에서 각각 워크스페이스로 추가
