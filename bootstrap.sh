#!/bin/bash
# bootstrap.sh
# Usage: ./bootstrap.sh "<project-name>" "<description>"
#
# {{PROJECT_NAME}} / {{PROJECT_DESCRIPTION}} 자리를 실제 값으로 치환
# macOS/Linux 호환 (sed 인플레이스 처리 차이 흡수)

set -e

PROJECT_NAME="${1}"
PROJECT_DESCRIPTION="${2:-}"

if [ -z "$PROJECT_NAME" ]; then
  echo "❌ Usage: ./bootstrap.sh \"<project-name>\" \"<description>\""
  echo ""
  echo "예시:"
  echo "  ./bootstrap.sh \"modu-theme\" \"AI-powered SaaS website builder\""
  exit 1
fi

# 영숫자 + 하이픈만 허용
if ! echo "$PROJECT_NAME" | grep -qE '^[a-z0-9][a-z0-9-]*$'; then
  echo "❌ project-name은 소문자/숫자/하이픈만 사용 가능 (npm 규칙)"
  echo "   입력값: $PROJECT_NAME"
  exit 1
fi

echo ""
echo "🚀 프로젝트 초기화 중..."
echo "   Name:        $PROJECT_NAME"
echo "   Description: ${PROJECT_DESCRIPTION:-<없음>}"
echo ""

# ─── sed 인플레이스 호환 함수 ──────────────────
# macOS(BSD sed)는 -i ''가 필요, Linux(GNU sed)는 -i만
sed_inplace() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "$@"
  else
    sed -i "$@"
  fi
}

# ─── 치환 대상 파일 찾기 ────────────────────────
FILES=$(grep -rl "{{PROJECT_NAME}}\|{{PROJECT_DESCRIPTION}}" \
  --include="*.md" \
  --include="*.mdc" \
  --include="*.ts" \
  --include="*.tsx" \
  --include="*.js" \
  --include="*.mjs" \
  --include="*.json" \
  --include="*.yaml" \
  --include="*.yml" \
  --include=".env.example" \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude-dir=.git \
  . 2>/dev/null || true)

if [ -z "$FILES" ]; then
  echo "⚠️  치환할 플레이스홀더가 없습니다. 이미 초기화된 프로젝트일 수 있습니다."
  exit 0
fi

# ─── 치환 실행 ──────────────────────────────────
COUNT=0
for f in $FILES; do
  sed_inplace "s|{{PROJECT_NAME}}|$PROJECT_NAME|g" "$f"
  if [ -n "$PROJECT_DESCRIPTION" ]; then
    # 설명에 특수문자 escape
    ESCAPED_DESC=$(printf '%s\n' "$PROJECT_DESCRIPTION" | sed 's/[\/&|]/\\&/g')
    sed_inplace "s|{{PROJECT_DESCRIPTION}}|$ESCAPED_DESC|g" "$f"
  else
    sed_inplace "s|{{PROJECT_DESCRIPTION}}||g" "$f"
  fi
  COUNT=$((COUNT + 1))
done

echo "✅ $COUNT 개 파일 치환 완료"

# ─── Superpowers 작업 디렉터리 생성 ──────────────
mkdir -p docs/superpowers/specs docs/superpowers/plans docs/plans
echo "✅ docs/superpowers/{specs,plans} 디렉터리 준비됨"

# ─── .env.local 초기화 ─────────────────────────
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "✅ .env.local 생성 (.env.example 복사) — 실제 값으로 채우세요"
else
  echo "⏭️  .env.local이 이미 존재함 — 건너뜀"
fi

# ─── scripts 실행 권한 ─────────────────────────
chmod +x scripts/*.mjs 2>/dev/null || true
chmod +x bootstrap.sh 2>/dev/null || true

# ─── Git 초기 확인 ─────────────────────────────
if [ -d .git ]; then
  echo "✅ Git 저장소 감지됨"
else
  echo ""
  echo "⚠️  Git 저장소가 아닙니다. 다음을 실행하세요:"
  echo "   git init && git add -A && git commit -m \"chore: initialize ModuTheme project\""
fi

# ─── 완료 ──────────────────────────────────────
cat << EOF

------------------------------------------------------------
✨ 초기화 완료!
------------------------------------------------------------

다음 단계:

  1. 의존성 설치
     pnpm install

  2. 환경 변수 설정
     $EDITOR .env.local

  3. 데이터베이스 준비 (PostgreSQL)
     createdb ${PROJECT_NAME}_dev

  4. Cursor 또는 Antigravity로 프로젝트 열기
     cursor .
     # 또는
     antigravity .

  5. 첫 스토리 시작
     Cursor에서: @gstack-office-hours
     → @bmad-pm → @bmad-architect → @bmad-sm
     → pnpm wt:add story-1.1-<slug>

자세한 내용은 AGENTS.md와 README.md 참조.

EOF
