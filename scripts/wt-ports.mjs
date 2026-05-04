#!/usr/bin/env node
// scripts/wt-ports.mjs
// 모든 worktree의 포트 할당 상태 확인

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const WT_PARENT = resolve(ROOT, '../wt');

function readPort(envPath, key) {
  if (!existsSync(envPath)) return '—';
  const content = readFileSync(envPath, 'utf8');
  const match = content.match(new RegExp(`^${key}=(.+)$`, 'm'));
  return match ? match[1].trim() : '—';
}

console.log('\n📊 Worktree Port Allocation');
console.log('─'.repeat(70));
console.log(`${'Name'.padEnd(30)} ${'App'.padEnd(8)} ${'API'.padEnd(8)} Branch`);
console.log('─'.repeat(70));

// main
const mainEnv = resolve(ROOT, '.env.local');
console.log(
  `${'main'.padEnd(30)} ${readPort(mainEnv, 'PORT').padEnd(8)} ${readPort(mainEnv, 'API_PORT').padEnd(8)} main`
);

// worktrees
if (existsSync(WT_PARENT)) {
  const wts = readdirSync(WT_PARENT).filter(d =>
    existsSync(resolve(WT_PARENT, d, '.git'))
  );

  for (const name of wts) {
    const wtPath = resolve(WT_PARENT, name);
    const envPath = resolve(wtPath, '.env.local');
    const appPort = readPort(envPath, 'PORT');
    const apiPort = readPort(envPath, 'API_PORT');

    // 브랜치 읽기
    let branch = '?';
    try {
      const { execSync } = await import('node:child_process');
      branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: wtPath, encoding: 'utf8' }).trim();
    } catch {}

    console.log(`${name.padEnd(30)} ${appPort.padEnd(8)} ${apiPort.padEnd(8)} ${branch}`);
  }
}

console.log('─'.repeat(70));
