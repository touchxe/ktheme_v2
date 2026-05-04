#!/usr/bin/env node
// scripts/wt-add.mjs
// Usage: pnpm wt:add <name> [--branch <branch>] [--from <base-branch>]
//
// 자동 수행:
// 1. ../wt/<name>/ 디렉터리에 linked worktree 생성
// 2. 포트 오프셋 할당 (wt/<N> → 30N0 + 30N1)
// 3. PostgreSQL DB 클론 (있을 경우)
// 4. .env.local 자동 복사 + 포트/DB URL 갱신

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PROJECT_NAME = basename(ROOT);

// ─── 인자 파싱 ──────────────────────────────────
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: pnpm wt:add <name> [--branch <branch>] [--from <base-branch>]');
  process.exit(1);
}

const name = args[0];
const branchIdx = args.indexOf('--branch');
const branch = branchIdx >= 0 ? args[branchIdx + 1] : `feat/${name}`;
const fromIdx = args.indexOf('--from');
const fromBranch = fromIdx >= 0 ? args[fromIdx + 1] : 'main';

// 검증
if (!/^[a-z0-9-]+$/.test(name)) {
  console.error(`❌ name은 소문자 영숫자 + 하이픈만 허용: "${name}"`);
  process.exit(1);
}

// ─── 경로 준비 ──────────────────────────────────
const wtParent = resolve(ROOT, '../wt');
const wtPath = resolve(wtParent, name);

if (!existsSync(wtParent)) {
  mkdirSync(wtParent, { recursive: true });
  console.log(`📁 Created ${wtParent}`);
}

if (existsSync(wtPath)) {
  console.error(`❌ Worktree already exists: ${wtPath}`);
  process.exit(1);
}

// ─── 포트 오프셋 계산 ────────────────────────────
function nextPortOffset() {
  // 기존 worktree 목록에서 사용 중인 포트 파악
  try {
    const list = execSync('git worktree list --porcelain', { cwd: ROOT, encoding: 'utf8' });
    const existing = (list.match(/^worktree .+\/wt\/(.+)$/gm) || []).length;
    return 3010 + existing * 10; // main=3000, wt-1=3010, wt-2=3020, ...
  } catch {
    return 3010;
  }
}
const portOffset = nextPortOffset();
const appPort = portOffset;      // 3010, 3020, 3030...
const apiPort = portOffset + 1;  // 3011, 3021, 3031...

// ─── git worktree add ───────────────────────────
console.log(`\n🌳 Creating worktree...`);
console.log(`   Path:   ${wtPath}`);
console.log(`   Branch: ${branch} (from ${fromBranch})`);

try {
  execSync(`git fetch origin ${fromBranch}`, { cwd: ROOT, stdio: 'inherit' });
} catch (e) {
  console.warn(`⚠️  fetch 실패 (origin 없음?), 로컬 ${fromBranch} 사용`);
}

// 브랜치가 이미 있으면 체크아웃, 없으면 생성
const branchExists = (() => {
  try {
    execSync(`git rev-parse --verify ${branch}`, { cwd: ROOT, stdio: 'ignore' });
    return true;
  } catch { return false; }
})();

const addCmd = branchExists
  ? `git worktree add "${wtPath}" "${branch}"`
  : `git worktree add -b "${branch}" "${wtPath}" "${fromBranch}"`;

execSync(addCmd, { cwd: ROOT, stdio: 'inherit' });

// ─── .env.local 복사 + 포트 갱신 ────────────────
const envSrc = resolve(ROOT, '.env.local');
const envDst = resolve(wtPath, '.env.local');
if (existsSync(envSrc)) {
  let content = readFileSync(envSrc, 'utf8');
  // PORT 값 치환
  content = content.replace(/^PORT=.*/m, `PORT=${appPort}`);
  content = content.replace(/^API_PORT=.*/m, `API_PORT=${apiPort}`);
  // DATABASE_URL 치환 (DB 이름만 교체)
  content = content.replace(
    /(DATABASE_URL=.*?\/)([^?\s]+)/,
    `$1${PROJECT_NAME}_${name}`
  );
  writeFileSync(envDst, content);
  console.log(`✅ .env.local copied with PORT=${appPort}, API_PORT=${apiPort}`);
} else {
  console.warn(`⚠️  .env.local not found in root — skipping env copy`);
}

// ─── DB 클론 (PostgreSQL, pg_dump/restore 사용) ──
const dbName = `${PROJECT_NAME}_${name}`;
console.log(`\n🗄️  PostgreSQL DB clone attempt: ${dbName}`);
try {
  const sourceDb = `${PROJECT_NAME}_dev`;
  execSync(
    `createdb --template="${sourceDb}" "${dbName}" 2>/dev/null`,
    { stdio: 'inherit' }
  );
  console.log(`✅ DB cloned: ${dbName}`);
} catch {
  console.log(`⏭️  DB clone skipped (createdb 없음 또는 source DB 없음)`);
  console.log(`    필요 시 수동: createdb --template=${PROJECT_NAME}_dev ${dbName}`);
}

// ─── pnpm install (symlink가 대부분) ────────────
console.log(`\n📦 Running pnpm install...`);
try {
  execSync('pnpm install', { cwd: wtPath, stdio: 'inherit' });
} catch {
  console.warn(`⚠️  pnpm install 실패 - 수동 실행 필요`);
}

// ─── 완료 메시지 ──────────────────────────────────
console.log(`\n${'─'.repeat(60)}`);
console.log(`✅ Worktree ready`);
console.log(`${'─'.repeat(60)}`);
console.log(`  📁 Path:     ${wtPath}`);
console.log(`  🌿 Branch:   ${branch}`);
console.log(`  🔌 App:      http://localhost:${appPort}`);
console.log(`  🔌 API:      http://localhost:${apiPort}`);
console.log(`  🗄️  DB:      ${dbName}`);
console.log(`${'─'.repeat(60)}`);
console.log(`\n다음 단계:`);
console.log(`  cd ${wtPath}`);
console.log(`  pnpm test         # clean baseline 검증 필수`);
console.log(`  pnpm dev          # 포트 ${appPort}에서 시작`);
console.log(`\n또는 Cursor/Antigravity에서 이 폴더를 새 워크스페이스로 열기`);
