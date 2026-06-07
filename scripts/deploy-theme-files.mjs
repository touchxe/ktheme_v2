#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ENV_FILE = join(ROOT, '.env.local');
const THEME_ROOT = join(ROOT, 'wp-content/themes/ktheme-v2');

function parseEnv(content) {
  const env = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const equalsAt = trimmed.indexOf('=');
    if (equalsAt === -1) continue;

    const key = trimmed.slice(0, equalsAt).trim();
    let value = trimmed.slice(equalsAt + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function encodeFtpPath(path) {
  return path
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function ftpUrl(host, path) {
  return `ftp://${host}/${encodeFtpPath(path)}`;
}

function requireEnv(env, key) {
  if (!env[key]) throw new Error(`Missing required env: ${key}`);
  return env[key];
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const files = args.filter((arg) => arg !== '--dry-run');

if (!existsSync(ENV_FILE)) {
  console.error(`Missing ${ENV_FILE}.`);
  process.exit(1);
}

if (files.length === 0) {
  console.error('Pass one or more theme-relative files to deploy.');
  process.exit(1);
}

const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
const host = requireEnv(env, 'FTP_HOST');
const user = requireEnv(env, 'FTP_USER');
const password = requireEnv(env, 'FTP_PASSWORD');
const remoteThemePath = requireEnv(env, 'REMOTE_THEME_PATH').replace(/\/+$/, '');

console.log(`Deploy target: ${host}:${remoteThemePath}`);
console.log(`Theme files: ${files.length}`);

for (const rel of files) {
  const normalizedRel = rel.split(/[\\/]+/).join('/');
  const localPath = join(THEME_ROOT, normalizedRel);
  const resolvedLocal = resolve(localPath);

  if (!resolvedLocal.startsWith(resolve(THEME_ROOT))) {
    console.error(`Refusing path outside theme: ${rel}`);
    process.exit(1);
  }

  if (!existsSync(resolvedLocal)) {
    console.error(`Theme file not found: ${rel}`);
    process.exit(1);
  }

  const themeRel = relative(THEME_ROOT, resolvedLocal).split(/[\\/]+/).join('/');
  const remotePath = `${remoteThemePath}/${themeRel}`;

  if (dryRun) {
    console.log(`[dry-run] ${themeRel} -> ${remotePath}`);
    continue;
  }

  const result = spawnSync(
    'curl',
    [
      '--fail',
      '--silent',
      '--show-error',
      '--user',
      `${user}:${password}`,
      '--ftp-create-dirs',
      '--upload-file',
      resolvedLocal,
      ftpUrl(host, remotePath),
    ],
    { encoding: 'utf8' }
  );

  if (result.status !== 0) {
    console.error(`Failed to upload ${themeRel}`);
    if (result.stderr) console.error(result.stderr.trim());
    process.exit(result.status || 1);
  }

  console.log(`Uploaded ${themeRel}`);
}

console.log(dryRun ? 'Dry run complete.' : 'Scoped theme deploy complete.');
