#!/usr/bin/env node
// scripts/wt-remove.mjs
// Usage: pnpm wt:remove <n> [--force] [--keep-db]

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PROJECT_NAME = basename(ROOT);

const args = process.argv.slice(2);
const name = args[0];
const force = args.includes('--force');
const keepDb = args.includes('--keep-db');

if (!name) {
  console.error('Usage: pnpm wt:remove <n> [--force] [--keep-db]');
  process.exit(1);
}

const wtPath = resolve(ROOT, '../wt', name);
const dbName = `${PROJECT_NAME}_${name}`;

// ─── 확인 ──────────────────────────────────────
if (!existsSync(wtPath)) {
  console.error(`❌ Worktree not found: ${wtPath}`);
  process.exit(1);
}

// ─── uncommitted changes 확인 ──────────────────
let hasChanges = false;
try {
  const status = execSync('git status --porcelain', { cwd: wtPath, encoding: 'utf8' });
  hasChanges = status.trim().length > 0;
} catch {}

if (hasChanges && !force) {
  console.error(`❌ 미커밋 변경사항 있음. 커밋 또는 --force 사용.`);
  console.error(`   cd ${wtPath} && git status`);
  process.exit(1);
}

// ─── 확인 프롬프트 ─────────────────────────────
if (!force) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise(r => {
    rl.question(`⚠️  정말 제거하시겠습니까? (path: ${wtPath}, db: ${dbName}) [y/N] `, r);
  });
  rl.close();
  if (answer.toLowerCase() !== 'y') {
    console.log('취소됨.');
    process.exit(0);
  }
}

// ─── worktree 제거 ─────────────────────────────
console.log(`\n🗑️  Removing worktree: ${wtPath}`);
try {
  execSync(`git worktree remove "${wtPath}"${force ? ' --force' : ''}`, {
    cwd: ROOT, stdio: 'inherit',
  });
  console.log(`✅ Worktree removed`);
} catch (e) {
  console.error(`❌ git worktree remove 실패:`, e.message);
  process.exit(1);
}

// ─── DB 드롭 ───────────────────────────────────
if (!keepDb) {
  console.log(`\n🗄️  Dropping DB: ${dbName}`);
  try {
    execSync(`dropdb --if-exists "${dbName}"`, { stdio: 'inherit' });
    console.log(`✅ DB dropped`);
  } catch {
    console.log(`⏭️  DB drop 실패 또는 존재하지 않음`);
  }
}

console.log(`\n✅ 정리 완료.`);
