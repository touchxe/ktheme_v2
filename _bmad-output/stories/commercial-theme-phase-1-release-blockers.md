# Story: Commercial Theme Phase 1 — Release Blockers

## Goal

상업용 KTheme 패키지에서 고객 사이트를 임의로 변경하거나 실제 접수처럼 보이는 가짜 동작을 제거하고, 손상된 소스 인코딩과 JavaScript 문법 오류를 검증 가능 상태로 복구한다.

## In scope

- 테마 소스 UTF-8 유효성
- 관리자 진입 시 페이지 자동 생성 차단
- 문의·제증명·시설·차량 페이지의 가짜 제출 처리 제거
- 폼 플러그인 연결용 안전한 placeholder 패턴
- 헤더의 손상된 검색·메뉴 접근성 라벨 및 고정 메뉴 ID 제거
- Phase 1 회귀 테스트

## Out of scope

- CPT를 Companion Plugin으로 실제 이관
- 네이티브 헤더·푸터 블록 전환
- 고객사 주소·브랜드·footer 전체 제거
- CSS 토큰 재구성, 스타일 변형, 성능 최적화

## Acceptance criteria

1. `functions.php`가 유효한 UTF-8이다.
2. `admin_init`에서 페이지 생성 함수를 실행하지 않는다.
3. 대상 네 개 템플릿은 `preventDefault()`와 가짜 성공 화면을 포함하지 않는다.
4. 대상 네 개 템플릿은 `ktheme-v2/section-form-shell` 패턴을 사용한다.
5. 기본 메뉴 fallback은 특정 메뉴 ID에 의존하지 않는다.
6. 새 회귀 테스트, 기존 Vitest 및 typecheck가 통과한다.

## Verification

```bash
pnpm test
pnpm typecheck
iconv -f UTF-8 -t UTF-8 wp-content/themes/ktheme-v2/functions.php >/dev/null
```

## Follow-up

- Phase 1B: 모든 손상 사용자 문구를 의미 기준으로 정리하고, 가짜 헌금 UI·고정 고객 정보를 제거한다.
- Phase 2: 테마/Companion Plugin 경계를 구현하고 자동 페이지 생성 코드를 완전히 삭제한다.
