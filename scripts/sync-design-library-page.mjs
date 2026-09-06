#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const ENV_FILE = join(ROOT, '.env.local');

const page = {
  title: '디자인 라이브러리',
  slug: 'design-library',
  excerpt: 'ModuTheme 테마의 공용 히어로 스타일을 확인합니다.',
  content: [
    '<!-- wp:paragraph -->',
    '<p>테마 제작자가 공용 히어로 기준을 확인하기 위한 내부 검토용 페이지입니다.</p>',
    '<!-- /wp:paragraph -->',
  ].join('\n'),
};

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

function requireEnv(env, key) {
  if (!env[key]) {
    throw new Error(`Missing required env: ${key}`);
  }

  return env[key];
}

async function wpRequest(url, options, authHeader) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const body = await response.text();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }

  return body ? JSON.parse(body) : null;
}

if (!existsSync(ENV_FILE)) {
  throw new Error(`Missing ${ENV_FILE}`);
}

const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
const apiUrl = requireEnv(env, 'WP_API_URL').replace(/\/$/, '');
const username = requireEnv(env, 'WP_USERNAME');
const appPassword = requireEnv(env, 'WP_APP_PASSWORD');
const authHeader = `Basic ${Buffer.from(`${username}:${appPassword}`).toString('base64')}`;

const existing = await wpRequest(
  `${apiUrl}/pages?slug=${encodeURIComponent(page.slug)}&status=publish,draft,pending,private`,
  { method: 'GET' },
  authHeader
);

const payload = {
  title: page.title,
  slug: page.slug,
  status: 'publish',
  excerpt: page.excerpt,
  content: page.content,
  template: 'page-design-library',
};

if (existing.length > 0) {
  const [current] = existing;
  const updated = await wpRequest(`${apiUrl}/pages/${current.id}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, authHeader);
  console.log(`updated ${updated.link}`);
} else {
  const created = await wpRequest(`${apiUrl}/pages`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, authHeader);
  console.log(`created ${created.link}`);
}
