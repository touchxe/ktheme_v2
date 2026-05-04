---
name: systematic-debugging
description: 4-phase 체계적 디버깅. Phase 1 완료 전 수정 금지. 3회 실패 시 아키텍처 재검토
---

# Systematic Debugging

## Phase 1: REPRODUCE & OBSERVE
고치려 하지 말 것. 재현 + 관찰에만 집중.

## Phase 2: HYPOTHESIS
복수 가설, 우선순위

## Phase 3: EXPERIMENT
실험으로 가설 검증. 실패한 실험도 정보.

## Phase 4: FIX
원인 확실해진 후 근본 수정 + 회귀 테스트

## 3-회 실패 규칙
같은 가설로 3번 실패 → 아키텍처 재검토 (brainstorming으로)
