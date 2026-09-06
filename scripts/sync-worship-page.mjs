#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const ENV_FILE = join(ROOT, '.env.local');

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

const content = `<!-- wp:group {"className":"modu-worship-content","layout":{"type":"constrained"}} -->
<div class="wp-block-group modu-worship-content">
<!-- wp:html -->
<section class="modu-worship-band">
  <div class="modu-label">Worship at Gapyeong</div>
  <h2>예배는 하나님께 머물고, 삶을 다시 시작하는 자리입니다.</h2>
  <p>가평교회의 예배는 말씀과 찬양, 기도와 환대가 함께 흐르는 공동체의 중심입니다. 처음 오신 분도 낯설지 않도록 안내팀이 예배 전후로 함께하며, 모든 세대가 각자의 자리에서 하나님을 만날 수 있도록 준비합니다.</p>
  <div class="modu-worship-schedule">
    <a class="modu-worship-time" href="/sunday-worship/"><strong>Sunday</strong><h3>주일예배</h3><p>오전 11:00 · 본당<br />온 가족이 함께 드리는 중심 예배</p></a>
    <a class="modu-worship-time" href="/wednesday-worship/"><strong>Wednesday</strong><h3>수요예배</h3><p>오후 7:30 · 본당<br />말씀과 기도로 한 주를 세우는 예배</p></a>
    <a class="modu-worship-time" href="/dawn-prayer/"><strong>Weekday</strong><h3>새벽예배</h3><p>월-금 오전 5:30<br />하루를 말씀과 기도로 여는 시간</p></a>
    <a class="modu-worship-time" href="/youth-worship/"><strong>Youth</strong><h3>청년예배</h3><p>주일 오후 2:00<br />청년 공동체의 찬양과 말씀</p></a>
  </div>
</section>

<section class="modu-worship-section modu-worship-two-col">
  <div>
    <div class="modu-label">For First Visit</div>
    <h2>처음 오셔도 괜찮습니다.</h2>
    <p>예배가 익숙하지 않은 분도 편안하게 참여할 수 있도록 로비 안내 데스크에서 좌석, 자녀 예배, 주차, 새가족 등록을 도와드립니다.</p>
    <a class="modu-button modu-button--dark" href="/newcomers/">새가족 안내 보기</a>
  </div>
  <ul class="modu-worship-list">
    <li><strong>1. 안내 데스크 방문</strong>로비에서 새가족 안내를 받고 예배실 위치를 확인합니다.</li>
    <li><strong>2. 예배 참여</strong>복장이나 준비물에 부담을 갖지 않아도 됩니다. 편안히 함께해 주세요.</li>
    <li><strong>3. 새가족 카드 작성</strong>원하시는 경우 예배 후 새가족 카드로 연락처와 관심 사역을 남길 수 있습니다.</li>
    <li><strong>4. 공동체 연결</strong>새가족부와 목장 모임을 통해 자연스럽게 교회 생활을 시작합니다.</li>
  </ul>
</section>

<section class="modu-worship-section modu-worship-two-col">
  <div>
    <div class="modu-label">Online Worship</div>
    <h2>현장에 오기 어려운 날에도 예배는 이어집니다.</h2>
    <p>주일예배 설교는 미디어 페이지에서 다시 볼 수 있도록 정리됩니다. 예배 영상, 설교 시리즈, 찬양 콘텐츠는 순차적으로 업데이트할 예정입니다.</p>
  </div>
  <ul class="modu-worship-list">
    <li><strong>이번 주 설교</strong>최근 설교는 예배 페이지 하단과 설교 아카이브에서 확인할 수 있습니다.</li>
    <li><strong>기도 요청</strong>중보기도가 필요하신 분은 문의하기 페이지를 통해 요청해 주세요.</li>
    <li><strong>온라인 헌금</strong>헌금 안내는 온라인 헌금 페이지에서 확인할 수 있습니다.</li>
  </ul>
</section>

<section class="modu-worship-cta">
  <div>
    <h2>예배에 함께하고 싶으신가요?</h2>
    <p>방문 전 궁금한 점이 있다면 사역자가 안내해 드립니다.</p>
  </div>
  <div class="modu-buttons">
    <a class="modu-button modu-button--light" href="/location/">오시는 길</a>
    <a class="modu-button modu-button--ghost" href="/contact/">문의하기</a>
  </div>
</section>
<!-- /wp:html -->
</div>
<!-- /wp:group -->`;

async function main() {
  if (!existsSync(ENV_FILE)) {
    throw new Error(`Missing ${ENV_FILE}. Create it from .env.example first.`);
  }

  const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
  const apiUrl = requireEnv(env, 'WP_API_URL').replace(/\/+$/, '');
  const username = requireEnv(env, 'WP_USERNAME');
  const appPassword = requireEnv(env, 'WP_APP_PASSWORD');
  const authHeader = `Basic ${Buffer.from(`${username}:${appPassword}`).toString('base64')}`;

  const pages = await wpRequest(`${apiUrl}/pages?slug=worship&status=publish,draft,pending,private`, { method: 'GET' }, authHeader);
  if (pages.length === 0) {
    throw new Error('worship page not found');
  }

  const [page] = pages;
  const updated = await wpRequest(`${apiUrl}/pages/${page.id}`, {
    method: 'POST',
    body: JSON.stringify({
      title: '예배 안내',
      excerpt: '예배 시간과 설교, 찬양, 예배 안내를 한 곳에서 확인합니다.',
      content,
      status: 'publish',
    }),
  }, authHeader);

  console.log(`updated worship page: ${updated.link}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
