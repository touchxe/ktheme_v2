#!/usr/bin/env node
// scripts/wt-launch-parallel.mjs
// Usage: pnpm wt:launch [--editor cursor|antigravity|code] [--dev]
//
// 모든 worktree에 대해:
// - 선택한 에디터로 열기
// - --dev 플래그 시 각자의 포트에서 pnpm dev 백그라운드 시작

import { execSync, spawn } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const WT_PARENT = resolve(ROOT, '../wt');

const args = process.argv.slice(2);
const editorIdx = args.indexOf('--editor');
const editor = editorIdx >= 0 ? args[editorIdx + 1] : 'cursor';
const devMode = args.includes('--dev');

if (!existsSync(WT_PARENT)) {
  console.log('worktree가 아직 없습니다. `pnpm wt:add <n>`으로 먼저 생성하세요.');
  process.exit(0);
}

const worktrees = readdirSync(WT_PARENT).filter(d =>
  existsSync(resolve(WT_PARENT, d, '.git'))
);

if (worktrees.length === 0) {
  console.log('활성 worktree 없음.');
  process.exit(0);
}

// ─── 에디터 명령어 결정 ────────────────────────
const editorCmd = {
  cursor: 'cursor',
  antigravity: 'antigravity',
  code: 'code',
}[editor] || editor;

console.log(`🚀 ${worktrees.length}개 worktree 병렬 실행 (editor: ${editor})\n`);

for (const name of worktrees) {
  const wtPath = resolve(WT_PARENT, name);
  console.log(`  📂 ${name}`);

  // 에디터 열기
  try {
    spawn(editorCmd, [wtPath], { detached: true, stdio: 'ignore' }).unref();
  } catch (e) {
    console.warn(`    ⚠️  ${editorCmd} 실행 실패: ${e.message}`);
  }

  // dev 서버 (선택)
  if (devMode) {
    // 각자의 .env.local에서 PORT 읽어 자동 할당됨
    const child = spawn('pnpm', ['dev'], {
      cwd: wtPath,
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
    console.log(`    🔌 pnpm dev 백그라운드 시작`);
  }
}

console.log(`\n✅ 모든 worktree 실행됨`);
if (devMode) {
  console.log(`\n실행 중인 dev 서버 확인:`);
  console.log(`  pnpm wt:ports`);
}
