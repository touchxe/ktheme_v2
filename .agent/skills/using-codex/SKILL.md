---
name: using-codex
description: "Codex CLI를 백그라운드 워커로 실행하여, 집중 코딩이나 대량 리팩토링 작업을 위임하고 결과(Diff)를 리뷰합니다."
---

# using-codex 스킬 🌟

Google Antigravity에서 OpenAI Codex CLI를 터미널 백그라운드로 호출하여 하이브리드 워크플로우를 구성하기 위한 공식 스킬입니다.

## 📌 활용 목적
- **Antigravity (기획/조율)**: 설계, 컴포넌트 명세 작성, 멀티 에이전트 조율, UI/UX 브라우저 검증.
- **Codex (실행/작업)**: 백엔드 로직 수정, 대량 파일 생성, 터미널 내 집중(SWE) 코딩.

이 스킬을 호출하면 Antigravity는 요구사항 명세서(Spec)를 정리하여 터미널 명령어 형태로 Codex CLI에 전달하고, 작업이 끝날 때까지 백그라운드로 폴링한 후 완료 결과를 리뷰합니다.

## 🔄 워크플로우 (Handoff Protocol)

1. **명세 작성 (Writing Spec)**
   작업해야 할 명세(Spec)가 없다면, `docs/superpowers/specs/` 디렉터리에 구체적인 명세서를 먼저 작성합니다.
   
2. **명령어 실행 (Execution)**
   `run_command` 툴을 사용해 백그라운드 비동기로 `codex` 명령어를 실행합니다.
   ```bash
   codex "Implement [Task] based on the specification in docs/superpowers/specs/[file].md"
   ```
   *참고: 백그라운드 런칭 시 `WaitMsBeforeAsync: 10000` (10초)를 주어 명령어가 정상적으로 시작되는지 확인합니다.*

3. **결과 대기 (Polling)**
   `command_status` 툴을 주기적으로 호출하여 Codex CLI 작업이 완료될 때까지 대기합니다.

4. **검증 및 리뷰 (Verification)**
   - Codex의 작업이 완료되면, 변경된 파일을 `git diff` 등을 통해 확인합니다.
   - 브라우저를 띄워 UI/UX가 예상대로 동작하는지 확인합니다.
   - 문제가 있다면 Phase 1 디버깅 룰에 따라 수정하거나 Codex에 재작업을 지시합니다.

## ⚠️ 제약 사항 및 팁
- Codex는 터미널 컨텍스트를 활용하므로, 실행 전 `Cwd`가 작업해야 할 정확한 worktree/폴더를 가리키고 있는지 반드시 확인하세요.
- 만약 Codex 실행 중 사용자 상호작용(예: 프롬프트 입력)이 필요하다면 `send_command_input`을 통해 상호작용합니다.
