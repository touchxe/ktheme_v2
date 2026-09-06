#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const ENV_FILE = join(ROOT, '.env.local');

const pages = [
  {
    title: '예배 안내',
    slug: 'worship',
    excerpt: '예배 시간과 설교, 찬양, 예배 안내를 한 곳에서 확인합니다.',
    body: ['주일예배, 수요예배, 새벽예배, 청년예배 안내를 담는 대표 페이지입니다.', '이후 설교 콘텐츠와 예배 시간표 블록을 연결합니다.'],
  },
  {
    title: '공동체',
    slug: 'community',
    excerpt: '새가족, 목장, 다음세대, 실버 사역을 소개합니다.',
    body: ['교회 안에서 함께 연결되는 공동체와 사역팀을 소개하는 페이지입니다.', '목장 모임과 새가족부 안내를 이곳에 모읍니다.'],
  },
  {
    title: '양육',
    slug: 'training',
    excerpt: '신앙 성장 과정과 훈련 프로그램을 안내합니다.',
    body: ['새가족반, 제자훈련, 성경공부, 리더십 과정의 안내 페이지입니다.', '과정 신청과 일정 안내 블록을 추가할 수 있습니다.'],
  },
  {
    title: '미디어',
    slug: 'media',
    excerpt: '설교 영상, 찬양, 사진 갤러리 콘텐츠를 모읍니다.',
    body: ['설교 영상과 교회 소식, 포토 갤러리를 보여주는 미디어 허브입니다.', '이후 글 카테고리 또는 커스텀 포스트 타입과 연결합니다.'],
  },
  {
    title: '교회소개',
    slug: 'about',
    excerpt: '교회 비전, 섬기는 사람들, 오시는 길을 안내합니다.',
    body: ['교회의 정체성, 비전, 연혁, 섬기는 사람들을 소개하는 페이지입니다.', '교회 위치와 연락처 안내를 함께 배치합니다.'],
  },
  {
    title: '행정',
    slug: 'admin-guide',
    excerpt: '교회 행정, 신청서, 안내 문서를 정리합니다.',
    body: ['증명서, 장소 사용, 사역 신청 등 행정 안내를 모으는 페이지입니다.', '운영에 필요한 서식과 절차를 이후 연결합니다.'],
  },
  {
    title: '새가족 등록',
    slug: 'newcomers',
    excerpt: '처음 방문한 분들을 위한 등록과 안내 페이지입니다.',
    body: ['새가족 등록 절차와 환영 안내를 제공합니다.', '예배 참석, 카드 작성, 환영 선물, 소그룹 연결까지 네 단계를 소개합니다.'],
  },
  {
    title: '교회오시는길',
    slug: 'location',
    excerpt: '교회 주소, 교통편, 주차 안내를 확인합니다.',
    body: ['주소와 대중교통, 주차 안내를 담는 페이지입니다.', '이후 지도 블록과 교통편 안내를 연결합니다.'],
  },
  {
    title: 'English',
    slug: 'english',
    excerpt: 'English information page for visitors.',
    body: ['Welcome to Gapyeong Church.', 'This page will provide worship times, location, and contact information in English.'],
  },
  {
    title: '주일예배',
    slug: 'sunday-worship',
    excerpt: '주일예배 시간과 안내를 확인합니다.',
    body: ['주일예배 시간, 장소, 설교 안내를 제공하는 페이지입니다.'],
  },
  {
    title: '수요예배',
    slug: 'wednesday-worship',
    excerpt: '수요예배 시간과 안내를 확인합니다.',
    body: ['수요예배 시간과 말씀 시리즈를 안내하는 페이지입니다.'],
  },
  {
    title: '새벽예배',
    slug: 'dawn-prayer',
    excerpt: '새벽예배와 기도회 안내를 확인합니다.',
    body: ['새벽예배 시간과 기도회 안내를 제공하는 페이지입니다.'],
  },
  {
    title: '청년예배',
    slug: 'youth-worship',
    excerpt: '청년예배와 청년 공동체 안내를 확인합니다.',
    body: ['청년예배와 청년부 모임을 소개하는 페이지입니다.'],
  },
  {
    title: '새가족부',
    slug: 'new-family-ministry',
    excerpt: '새가족부 사역과 정착 과정을 안내합니다.',
    body: ['새가족이 교회에 자연스럽게 정착하도록 돕는 사역 안내 페이지입니다.'],
  },
  {
    title: '목장 모임',
    slug: 'small-groups',
    excerpt: '목장 모임과 소그룹 공동체를 안내합니다.',
    body: ['가정과 일상에서 함께 말씀과 삶을 나누는 목장 모임 안내 페이지입니다.'],
  },
  {
    title: '유·초등부',
    slug: 'children',
    excerpt: '유아, 유치, 초등부 예배와 활동을 소개합니다.',
    body: ['다음세대 예배와 교육 활동을 안내하는 페이지입니다.'],
  },
  {
    title: '실버사역',
    slug: 'senior-ministry',
    excerpt: '실버 세대를 위한 예배와 돌봄 사역을 안내합니다.',
    body: ['실버 세대를 위한 돌봄, 모임, 예배 안내 페이지입니다.'],
  },
  {
    title: '개인정보처리방침',
    slug: 'privacy-policy',
    excerpt: '개인정보처리방침을 안내합니다.',
    body: ['개인정보 수집과 이용, 보관, 파기 절차를 안내하는 페이지입니다.', '정식 운영 전 법적 문구 검토가 필요합니다.'],
  },
  {
    title: '이메일 무단수집거부',
    slug: 'email-policy',
    excerpt: '이메일 무단수집거부 안내입니다.',
    body: ['본 사이트에 게시된 이메일 주소의 무단 수집을 거부합니다.'],
  },
  {
    title: '온라인 헌금',
    slug: 'giving',
    excerpt: '온라인 헌금 안내를 확인합니다.',
    body: ['온라인 헌금 방법과 계좌, 유의사항을 안내하는 페이지입니다.', '운영 전 실제 헌금 정보 확인이 필요합니다.'],
  },
  {
    title: '문의하기',
    slug: 'contact',
    excerpt: '교회 문의와 상담 연결을 안내합니다.',
    body: ['교회 문의, 상담, 방문 안내를 위한 연락처 페이지입니다.'],
  },
];

const categories = [
  { name: '공지', slug: 'notice', description: '교회의 주요 공지사항입니다.' },
  { name: '선교', slug: 'mission', description: '선교 소식과 동역 안내입니다.' },
  { name: '행사', slug: 'church-event-news', description: '교회 행사 소식입니다.' },
  { name: '교회력', slug: 'church-calendar', description: '교회 절기와 예배 흐름 안내입니다.' },
  { name: '공동체', slug: 'community-news', description: '목장과 부서 공동체 소식입니다.' },
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

function requireEnv(env, key) {
  if (!env[key]) {
    throw new Error(`Missing required env: ${key}`);
  }

  return env[key];
}

function pageContent(page) {
  const paragraphs = page.body
    .map((text) => `<!-- wp:paragraph -->\n<p>${escapeHtml(text)}</p>\n<!-- /wp:paragraph -->`)
    .join('\n\n');

  return [
    '<!-- wp:group {"className":"modu-page-intro","layout":{"type":"constrained"}} -->',
    '<div class="wp-block-group modu-page-intro">',
    `<!-- wp:heading {"level":1} -->\n<h1 class="wp-block-heading">${escapeHtml(page.title)}</h1>\n<!-- /wp:heading -->`,
    `<!-- wp:paragraph {"className":"modu-page-intro__lead"} -->\n<p class="modu-page-intro__lead">${escapeHtml(page.excerpt)}</p>\n<!-- /wp:paragraph -->`,
    paragraphs,
    '</div>',
    '<!-- /wp:group -->',
  ].join('\n\n');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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

async function syncPage(apiUrl, authHeader, page) {
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
    content: pageContent(page),
  };

  if (existing.length > 0) {
    const [current] = existing;
    const updated = await wpRequest(`${apiUrl}/pages/${current.id}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }, authHeader);

    return { action: 'updated', id: updated.id, slug: page.slug, link: updated.link };
  }

  const created = await wpRequest(`${apiUrl}/pages`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, authHeader);

  return { action: 'created', id: created.id, slug: page.slug, link: created.link };
}

async function syncCategory(apiUrl, authHeader, category) {
  const existing = await wpRequest(
    `${apiUrl}/categories?slug=${encodeURIComponent(category.slug)}&hide_empty=false`,
    { method: 'GET' },
    authHeader
  );

  if (existing.length > 0) {
    const [current] = existing;
    const updated = await wpRequest(`${apiUrl}/categories/${current.id}`, {
      method: 'POST',
      body: JSON.stringify({
        name: category.name,
        slug: category.slug,
        description: category.description,
      }),
    }, authHeader);

    return { action: 'updated', id: updated.id, slug: category.slug };
  }

  const created = await wpRequest(`${apiUrl}/categories`, {
    method: 'POST',
    body: JSON.stringify(category),
  }, authHeader);

  return { action: 'created', id: created.id, slug: category.slug };
}

async function main() {
  if (!existsSync(ENV_FILE)) {
    throw new Error(`Missing ${ENV_FILE}. Create it from .env.example first.`);
  }

  const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
  const apiUrl = requireEnv(env, 'WP_API_URL').replace(/\/+$/, '');
  const username = requireEnv(env, 'WP_USERNAME');
  const appPassword = requireEnv(env, 'WP_APP_PASSWORD');
  const authHeader = `Basic ${Buffer.from(`${username}:${appPassword}`).toString('base64')}`;

  for (const page of pages) {
    const result = await syncPage(apiUrl, authHeader, page);
    console.log(`${result.action}: ${result.slug} -> ${result.link}`);
  }

  for (const category of categories) {
    const result = await syncCategory(apiUrl, authHeader, category);
    console.log(`${result.action}: category/${result.slug}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
