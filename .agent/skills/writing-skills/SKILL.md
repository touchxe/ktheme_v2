---
name: writing-skills
description: 새 SKILL.md 작성 가이드. name/description/folder 일치 필수
---

# Writing Skills (Antigravity)

## Frontmatter 규칙
```yaml
---
name: <skill-name>   # max 64 chars, 폴더명과 일치 필수
description: <한 문장 사용처>   # max 200 chars
---
```

## Scope
- Workspace: `.agent/skills/<n>/SKILL.md`
- Global: `~/.gemini/antigravity/skills/<n>/SKILL.md`

## 검증
폴더명 ≠ name이면 silent fail. 반드시 일치.
