# Workflow: design-review

gstack `/design-review` 포트 for Antigravity.

## 필요 도구
- 내장 Playwright / browser_subagent
- 또는 Playwright MCP

## 프로세스

상세는 Cursor rule `.cursor/rules/gstack/design-review.mdc` 참조.
Antigravity에서는:
1. browser_subagent로 대상 URL 방문
2. 스크린샷 + DOM 추출
3. 10-category audit (80 items)
4. AI Slop detection
5. Dual headline report 생성
6. Fix loop (원자 커밋 기반)

## 산출물
`.design-review/report-YYYY-MM-DD.md`
