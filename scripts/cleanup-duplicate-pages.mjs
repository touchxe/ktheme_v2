#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const ENV_FILE = join(ROOT, '.env.local');

const officialPages = new Map([
  ['about', '교회소개'],
  ['vision', '비전'],
  ['people', '섬기는 사람들'],
  ['history', '교회연혁'],
  ['annual-schedule', '연간일정'],
  ['location', '오시는 길'],
  ['sunday-worship', '주일예배'],
  ['wednesday-worship', '수요예배'],
  ['dawn-prayer', '새벽기도'],
  ['bulletin', '주보'],
  ['newcomers', '새가족'],
  ['small-groups', '소그룹/구역'],
  ['next-generation', '다음세대'],
  ['youth-ministry', '청년부'],
  ['senior-ministry', '장년/시니어'],
  ['new-family-course', '새가족 과정'],
  ['bible-study', '성경공부'],
  ['discipleship', '제자훈련'],
  ['qt', 'QT/묵상'],
  ['serve', '섬김 사역'],
  ['support', '후원 안내'],
  ['news', '교회소식'],
  ['denomination-news', '교단소식'],
  ['videos', '영상'],
  ['library', '자료실'],
  ['giving', '온라인 헌금'],
  ['documents', '증명서 발급'],
  ['facility-request', '장소 사용 신청'],
  ['vehicle-request', '차량 사용 신청'],
  ['contact', '문의하기'],
]);

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

async function getAllPages(apiUrl, authHeader) {
  const pages = [];
  let page = 1;

  while (true) {
    const batch = await wpRequest(
      `${apiUrl}/pages?context=edit&per_page=100&page=${page}&orderby=slug&order=asc&status=publish,draft,pending,private`,
      { method: 'GET' },
      authHeader
    );

    pages.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  return pages;
}

if (!existsSync(ENV_FILE)) {
  throw new Error(`Missing ${ENV_FILE}`);
}

const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
const apiUrl = requireEnv(env, 'WP_API_URL').replace(/\/$/, '');
const username = requireEnv(env, 'WP_USERNAME');
const appPassword = requireEnv(env, 'WP_APP_PASSWORD');
const authHeader = `Basic ${Buffer.from(`${username}:${appPassword}`).toString('base64')}`;

const pages = await getAllPages(apiUrl, authHeader);
const bySlug = new Map();

for (const page of pages) {
  if (!officialPages.has(page.slug)) continue;
  if (!bySlug.has(page.slug)) bySlug.set(page.slug, []);
  bySlug.get(page.slug).push(page);
}

let updatedTitles = 0;
let draftedDuplicates = 0;

for (const [slug, list] of bySlug) {
  const officialTitle = officialPages.get(slug);
  const flat = list.find((page) => page.parent === 0);

  if (flat && flat.status !== 'draft' && flat.title?.rendered !== officialTitle) {
    await wpRequest(`${apiUrl}/pages/${flat.id}`, {
      method: 'POST',
      body: JSON.stringify({ title: officialTitle }),
    }, authHeader);
    updatedTitles += 1;
    console.log(`title ${slug}: ${flat.title?.rendered} -> ${officialTitle}`);
  }

  if (!flat) continue;

  for (const page of list) {
    if (page.id === flat.id || page.parent === 0 || page.status === 'draft') continue;

    await wpRequest(`${apiUrl}/pages/${page.id}`, {
      method: 'POST',
      body: JSON.stringify({ status: 'draft' }),
    }, authHeader);
    draftedDuplicates += 1;
    console.log(`draft duplicate ${slug}: #${page.id}`);
  }
}

console.log(`cleanup complete: ${updatedTitles} titles updated, ${draftedDuplicates} duplicate pages drafted`);
