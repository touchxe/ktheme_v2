---
name: verification-before-completion
description: "완료" 선언 전 실제 명령 실행 + 출력 캡처. 증거 기반 주장
---

# Verification

## Task 완료 전
- `pnpm test <related>`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build` (빌드 영향 시)

## PR 전
- 전체 테스트
- 수동 확인 (pnpm dev + 브라우저)
- 스크린샷 (UI 변경 시)

## 금지
- "작동할 것 같습니다"
- 확인 없이 "기존처럼 동작"

## 리포트 형식
```
- ✅ pnpm test → N passed, 0 failed
- ✅ pnpm lint → 0 errors
- ✅ Manual: [플로우] works
```
