# Rule: gstack Guardrails

## CSS-First
UI 수정 시 가능한 한 Tailwind 클래스만 변경. JSX 변경은 2차.

## Self-Regulation
- Revert 1회당 +15% stop signal
- JSX 대규모 변경 +5%
- 20% 초과 시 STOP, 사용자에게 보고

## Boil the Lake 방지
한 번에 너무 많이 고치지 말 것. 30 fix hard cap.
