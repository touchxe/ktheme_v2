#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ENV_FILE = join(ROOT, '.env.local');
const THEME_ENTRIES = [
  'style.css',
  'functions.php',
  'theme.json',
  'screenshot.png',
  'templates',
  'parts',
  'patterns',
  'styles',
  'assets',
];

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

function walk(path) {
  if (!existsSync(path)) return [];

  const stats = statSync(path);
  if (stats.isFile()) return [path];

  return readdirSync(path)
    .filter((entry) => !entry.startsWith('.'))
    .flatMap((entry) => walk(join(path, entry)));
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
  if (!env[key]) {
    throw new Error(`Missing required env: ${key}`);
  }
  return env[key];
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

if (!existsSync(ENV_FILE)) {
  console.error(`Missing ${ENV_FILE}. Create it from .env.example first.`);
  process.exit(1);
}

const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
const host = requireEnv(env, 'FTP_HOST');
const user = requireEnv(env, 'FTP_USER');
const password = requireEnv(env, 'FTP_PASSWORD');
const remoteThemePath = requireEnv(env, 'REMOTE_THEME_PATH').replace(/\/+$/, '');
const themeSlug = env.THEME_SLUG || 'ktheme-v2';
const themeRoot = join(ROOT, 'wp-content/themes', themeSlug);

if (!existsSync(themeRoot)) {
  console.error(`Theme root not found: ${themeRoot}`);
  process.exit(1);
}

const files = THEME_ENTRIES
  .flatMap((entry) => walk(join(themeRoot, entry)))
  .sort();

if (files.length === 0) {
  console.error('No theme files found to deploy.');
  process.exit(1);
}

console.log(`Deploy target: ${host}:${remoteThemePath}`);
console.log(`Theme root: ${themeRoot}`);
console.log(`Theme files: ${files.length}`);

for (const file of files) {
  const rel = relative(themeRoot, file).split(/[\\/]+/).join('/');
  const remotePath = `${remoteThemePath}/${rel}`;

  if (dryRun) {
    console.log(`[dry-run] ${rel} -> ${remotePath}`);
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
      file,
      ftpUrl(host, remotePath),
    ],
    { encoding: 'utf8' }
  );

  if (result.status !== 0) {
    console.error(`Failed to upload ${rel}`);
    if (result.stderr) console.error(result.stderr.trim());
    process.exit(result.status || 1);
  }

  console.log(`Uploaded ${rel}`);
}

console.log(dryRun ? 'Dry run complete.' : 'Theme deploy complete.');
