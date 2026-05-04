#!/usr/bin/env node
// scripts/wt-sync.mjs
// 모든 worktree를 main(또는 지정 브랜치)에 rebase

import { execSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const WT_PARENT = resolve(ROOT, '../wt');

const args = process.argv.slice(2);
const baseIdx = args.indexOf('--base');
const baseBranch = baseIdx >= 0 ? args[baseIdx + 1] : 'main';
const dryRun = args.includes('--dry-run');

if (!existsSync(WT_PARENT)) {
  console.log('worktree 없음.');
  process.exit(0);
}

// main에서 latest 받기
console.log(`📥 Fetching origin/${baseBranch}...`);
try {
  execSync(`git fetch origin ${baseBranch}`, { cwd: ROOT, stdio: 'inherit' });
} catch {}

const worktrees = readdirSync(WT_PARENT).filter(d =>
  existsSync(resolve(WT_PARENT, d, '.git'))
);

console.log(`\n🔄 ${worktrees.length}개 worktree를 ${baseBranch}에 rebase\n`);

const failed = [];
for (const name of worktrees) {
  const wtPath = resolve(WT_PARENT, name);

  // uncommitted 체크
  try {
    const status = execSync('git status --porcelain', { cwd: wtPath, encoding: 'utf8' });
    if (status.trim()) {
      console.log(`  ⏭️  ${name}: uncommitted changes, skipping`);
      failed.push({ name, reason: 'uncommitted' });
      continue;
    }
  } catch {}

  console.log(`  🔄 ${name}`);
  if (dryRun) {
    console.log(`     (dry-run)`);
    continue;
  }

  try {
    execSync(`git rebase origin/${baseBranch}`, { cwd: wtPath, stdio: 'inherit' });
  } catch (e) {
    console.log(`     ❌ rebase 실패 — 수동 해결 필요`);
    failed.push({ name, reason: 'rebase conflict' });
  }
}

console.log('\n' + '─'.repeat(60));
if (failed.length === 0) {
  console.log('✅ 모든 worktree sync 완료');
} else {
  console.log(`⚠️  ${failed.length}개 실패:`);
  failed.forEach(f => console.log(`   - ${f.name}: ${f.reason}`));
}
