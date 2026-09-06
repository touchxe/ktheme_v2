#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const OUT_DIR = resolve(process.argv[2] || 'C:/tmp/style1-static');
const REF = process.argv[3] || 'origin/main';
const SOURCE_DIR = 'source/template_style1';
const THEME_URL = '/wp-content/themes/modu-theme';
const IMAGE_URL = `${THEME_URL}/assets/images/style1`;
const GENERATED_IMAGE_URL = `${THEME_URL}/assets/images/generated`;

const pages = [
  ['index.html', 'front-page.html', 'home'],
  ['worship.html', 'page-worship.html', 'worship'],
  ['training.html', 'page-training.html', 'training'],
  ['lecture.html', 'page-lecture.html', 'lecture'],
  ['library.html', 'page-library.html', 'library'],
  ['admin.html', 'page-admin-guide.html', 'admin'],
];

const assets = [
  'assets/logo.png',
  'uploads/image 27.jpg',
  'uploads/image 28.jpg',
  'uploads/pasted-1777274435226-0.png',
  'uploads/pasted-1779703523173-0.png',
  'uploads/pasted-1779703627903-0.png',
  'uploads/pasted-1779703727323-0.png',
  'uploads/pasted-1779703778889-0.png',
  'uploads/pasted-1779703856765-0.png',
];

function gitShow(path, encoding = 'utf8') {
  return execFileSync('git', ['show', `${REF}:${SOURCE_DIR}/${path}`], {
    encoding,
    maxBuffer: 20 * 1024 * 1024,
  });
}

function matchOne(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : '';
}

function rewriteUrls(html) {
  let next = html
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="worship.html"', 'href="/worship/"')
    .replaceAll('href="training.html"', 'href="/training/"')
    .replaceAll('href="lecture.html"', 'href="/lecture/"')
    .replaceAll('href="library.html"', 'href="/library/"')
    .replaceAll('href="admin.html"', 'href="/admin-guide/"')
    .replace(/src="assets\/logo\.png"/g, `src="${IMAGE_URL}/logo.png"`)
    .replace(/src="uploads\/([^"]+)"/g, (_, file) => {
      const decoded = decodeURIComponent(file);
      return `src="${IMAGE_URL}/${encodeURI(decoded)}"`;
    });

  const generatedPhotoMap = {
    'photo-1438232992991-995b7058bbb3': 'church-generated-01.jpg',
    'photo-1455390582262-044cdead277a': 'church-generated-14.jpg',
    'photo-1455849318743-b2233052fcff': 'church-generated-15.jpg',
    'photo-1457369804613-52c61a468e7d': 'church-generated-14.jpg',
    'photo-1466442929976-97f336a657be': 'church-generated-04.jpg',
    'photo-1473177104440-ffee2f376098': 'church-generated-05.jpg',
    'photo-1488521787991-ed7bbaae773c': 'church-generated-12.jpg',
    'photo-1490127252417-7c393f993ee4': 'church-generated-06.jpg',
    'photo-1492321936769-b49830bc1d1e': 'church-generated-04.jpg',
    'photo-1494790108377-be9c29b29330': 'church-generated-08.jpg',
    'photo-1495446815901-a7297e633e8d': 'church-generated-14.jpg',
    'photo-1500530855697-b586d89ba3ee': 'church-generated-13.jpg',
    'photo-1501281668745-f7f57925c3b4': 'church-generated-09.jpg',
    'photo-1502139214982-d0ad755818d8': 'church-generated-03.jpg',
    'photo-1502920917128-1aa500764cbd': 'church-generated-15.jpg',
    'photo-1507003211169-0a1dd7228f2d': 'church-generated-02.jpg',
    'photo-1507692049790-de58290a4334': 'church-generated-01.jpg',
    'photo-1517816743773-6e0fd518b4a6': 'church-generated-17.jpg',
    'photo-1518709268805-4e9042af9f23': 'church-generated-10.jpg',
    'photo-1518998053901-5348d3961a04': 'church-generated-15.jpg',
    'photo-1519337265831-281ec6cc8514': 'church-generated-14.jpg',
    'photo-1529156069898-49953e39b3ac': 'church-generated-03.jpg',
    'photo-1532012197267-da84d127e765': 'church-generated-14.jpg',
    'photo-1542038784456-1ea8e935640e': 'church-generated-16.jpg',
    'photo-1543269865-cbf427effbad': 'church-generated-11.jpg',
    'photo-1544816155-12df9643f363': 'church-generated-07.jpg',
    'photo-1606326608606-aa0b62935f2b': 'church-generated-15.jpg',
  };

  next = next.replace(/https:\/\/images\.unsplash\.com\/([^"?]+)\?[^"]+/g, (url, photoId) => {
    const fileName = generatedPhotoMap[photoId] || 'church-generated-01.jpg';
    return `${GENERATED_IMAGE_URL}/${fileName}`;
  });

  const labelLinks = {
    '새가족 등록': '/newcomers/',
    교회오시는길: '/location/',
    English: '/english/',
    로그인: '/login/',
    회원가입: '/register/',
    예배: '/worship/',
    주일예배: '/sunday-worship/',
    수요예배: '/wednesday-worship/',
    새벽예배: '/dawn-prayer/',
    청년예배: '/youth-worship/',
    공동체: '/community/',
    소모임: '/community/',
    양육: '/training/',
    훈련: '/training/',
    강의: '/lecture/',
    자료실: '/library/',
    섬김: '/community/',
    미디어: '/media/',
    교회소개: '/about/',
    행정: '/admin-guide/',
    '행정 안내': '/admin-guide/',
    새가족부: '/new-family-ministry/',
    '목장 모임': '/small-groups/',
    '유·초등부': '/children/',
    실버사역: '/senior-ministry/',
    개인정보처리방침: '/privacy-policy/',
    '이메일 무단수집거부': '/email-policy/',
    '오시는 길': '/location/',
    '온라인 헌금': '/giving/',
    문의하기: '/contact/',
  };

  for (const [label, url] of Object.entries(labelLinks)) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    next = next.replace(
      new RegExp(`<a href="#"([^>]*)>(\\s*)${escaped}(\\s*)<\\/a>`, 'g'),
      `<a href="${url}"$1>$2${label}$3</a>`,
    );
  }

  return next;
}

function navItem(label, url, key, activeKey, extra = '') {
  const active = key === activeKey;
  const className = active
    ? 'relative py-6 text-brand-600'
    : 'relative py-6 hover:text-brand-600';
  const underline = active ? '<span class="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-600"></span>' : '';

  return `<a href="${url}" class="${className}">${label}${extra}${underline}</a>`;
}

function buildMainNav(activeKey) {
  const live = '<span class="badge-live nav-live">LIVE</span>';
  return `<nav class="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] xl:text-[15px] font-semibold">
      ${navItem('예배 안내', '/worship/', 'worship', activeKey, live)}
      ${navItem('공동체', '/community/', 'community', activeKey)}
      ${navItem('양육', '/training/', 'training', activeKey)}
      ${navItem('강의', '/lecture/', 'lecture', activeKey)}
      ${navItem('자료실', '/library/', 'library', activeKey)}
      ${navItem('미디어', '/media/', 'media', activeKey)}
      ${navItem('교회소개', '/about/', 'about', activeKey)}
      ${navItem('행정', '/admin-guide/', 'admin', activeKey)}
    </nav>`;
}

function standardizeHeaderNav(html, activeKey) {
  return html.replace(
    /<nav class="hidden lg:flex items-center gap-[^"]+ text-\[[^\]]+\] font-semibold">[\s\S]*?<\/nav>/,
    buildMainNav(activeKey),
  );
}

const pageHeroMeta = {
  worship: {
    title: '예배 안내',
    description: '매주 드려지는 예배에 함께 참여하세요. 시간과 장소, 다시 듣기까지 한 페이지에서.',
    tabs: [
      ['전체', '/worship/', true],
      ['주일예배', '/sunday-worship/'],
      ['수요예배', '/wednesday-worship/'],
      ['새벽예배', '/dawn-prayer/'],
      ['청년예배', '/youth-worship/'],
    ],
  },
  admin: {
    title: '행정',
    description: '교회 등록, 헌금, 장소 예약과 각종 신청을 한 곳에서 안내합니다.',
    tabs: [
      ['전체', '/admin-guide/', true],
      ['행정서비스', '/admin-guide/#services'],
      ['교우소식', '/admin-guide/#news'],
      ['FAQ', '/admin-guide/#faq'],
    ],
  },
};

function buildSharedPageHero(activeKey) {
  const meta = pageHeroMeta[activeKey];
  if (!meta) return '';

  const tabs = meta.tabs?.length
    ? `<nav class="modu-page-tabs" aria-label="${meta.title} 하위 메뉴">
        ${meta.tabs
          .map(([label, url, active]) => `<a class="${active ? 'is-active' : ''}" href="${url}">${label}</a>`)
          .join('\n        ')}
      </nav>`
    : '';

  return `<!-- ============== PAGE HERO ============== -->
<section class="modu-page-hero modu-shared-page-hero">
  <nav class="modu-breadcrumb" aria-label="현재 위치">
    <a href="/"><svg class="modu-icon modu-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>HOME</a>
    <span>›</span>
    <strong>${meta.title}</strong>
  </nav>
  <div class="modu-page-hero__body">
    <div>
      <h1>${meta.title}</h1>
      <p>${meta.description}</p>
    </div>
    ${tabs}
  </div>
</section>`;
}

function standardizePageHero(html, activeKey) {
  const sharedHero = buildSharedPageHero(activeKey);
  if (!sharedHero) return html;

  if (activeKey === 'worship') {
    return html.replace(
      /<!-- ============== PAGE (?:HERO|HEAD)[\s\S]*?-->\s*<section class="bg-white border-b border-line">[\s\S]*?<\/section>/,
      sharedHero,
    );
  }

  if (activeKey === 'admin') {
    let next = html.replace(
      /<div class="max-w-\[1240px\] mx-auto px-6 pt-10 pb-2">[\s\S]*?<\/div>\s*<div class="max-w-\[1240px\] mx-auto px-6 pt-2 pb-8 border-b border-ink-900">[\s\S]*?<\/div>\s*<\/div>/,
      sharedHero,
    ).replace('</section>\n</div>\n<section class="bg-white">', '</section>\n<section class="bg-white">');

    next = next.replace(
      /(<section class="bg-white">\s*<div class="max-w-\[1240px\] mx-auto px-6">\s*<!--[\s\S]*?-->\s*)<div class="mt-14">/,
      '$1<div id="services" class="mt-14 scroll-mt-28">',
    );
    next = next.replace(
      '<div class="mt-20 grid md:grid-cols-2 gap-12">\n      <div>',
      '<div class="mt-20 grid md:grid-cols-2 gap-12">\n      <div id="news" class="scroll-mt-28">',
    );
    next = next.replace(
      /<div>\s*<div class="flex items-center justify-between mb-5 pb-3 border-b border-ink-900">\s*<h2 class="text-\[20px\] font-extrabold tracking-tight">자주하는 질문<\/h2>/,
      '<div id="faq" class="scroll-mt-28">\n        <div class="flex items-center justify-between mb-5 pb-3 border-b border-ink-900">\n          <h2 class="text-[20px] font-extrabold tracking-tight">자주하는 질문</h2>',
    );

    return next;
  }

  return html;
}

function wrapTemplate(sourceName, html, activeKey) {
  const fontLinks = [...html.matchAll(/<link[^>]+(?:fonts|pretendard)[^>]+>/g)].map((m) => m[0]).join('\n');
  const tailwindScript = matchOne(html, /(<script\s+src="https:\/\/cdn\.tailwindcss\.com"><\/script>)/);
  const tailwindConfig = matchOne(html, /(<script>\s*tailwind\.config[\s\S]*?<\/script>)/);
  const inlineStyle = matchOne(html, /(<style>[\s\S]*?<\/style>)/);
  const bodyClass = matchOne(html, /<body[^>]*class="([^"]+)"/);
  const body = standardizePageHero(
    standardizeHeaderNav(rewriteUrls(matchOne(html, /<body[^>]*>([\s\S]*?)<\/body>/)), activeKey),
    activeKey,
  );

  const shellStyle = `<style>
.wp-site-blocks{padding:0!important;margin:0!important}
.wp-site-blocks>*{margin-block-start:0!important}
.style1-static{min-height:100vh}
.style1-static :where(h1,h2,h3,h4,p,ul,ol,figure){margin-block-start:0;margin-block-end:0}
.style1-static img{max-width:100%}
.style1-static .badge-live{display:inline-flex;align-items:center;justify-content:center;background:#e23b3b;color:#fff;font-size:10px;font-weight:800;line-height:1;letter-spacing:.05em;padding:3px 6px;border-radius:4px;white-space:nowrap}
.style1-static header nav a .nav-live{margin-left:5px;transform:translateY(-7px);vertical-align:top}
.style1-static .page-hero,.style1-static [data-page-hero]{border-bottom:1px solid #e5e7eb}
.style1-static .modu-page-hero{width:min(1240px,calc(100% - 48px));margin-inline:auto;padding:40px 0 48px;border-bottom:1px solid #e5e7eb}
.style1-static .modu-breadcrumb{display:flex;align-items:center;gap:8px;color:#384058;font-size:12px}
.style1-static .modu-breadcrumb a{display:inline-flex;align-items:center;gap:6px;color:inherit}
.style1-static .modu-breadcrumb strong{color:#0e1320;font-weight:700}
.style1-static .modu-page-hero__body{display:flex;align-items:flex-end;justify-content:space-between;gap:32px;margin-top:24px}
.style1-static .modu-page-hero h1{margin:0;font-size:clamp(44px,6vw,56px);line-height:1.05;font-weight:900;letter-spacing:-0.055em}
.style1-static .modu-page-hero p{margin:14px 0 0;max-width:620px;color:#384058;font-size:14px;line-height:1.75}
.style1-static .modu-page-tabs{display:flex;align-items:center;gap:4px;font-size:13px;font-weight:700;white-space:nowrap}
.style1-static .modu-page-tabs a{display:grid;place-items:center;height:40px;padding:0 16px;border-radius:999px;color:#0e1320}
.style1-static .modu-page-tabs a:hover{background:#f4f5f7}
.style1-static .modu-page-tabs a.is-active{background:#0e1320;color:#fff}
@media (max-width:767px){
  .style1-static .grid.grid-cols-12{grid-template-columns:minmax(0,1fr)!important}
  .style1-static [class*="col-span-"]{grid-column:auto!important}
  .style1-static .gap-8,.style1-static .gap-10{gap:1.5rem!important}
  .style1-static .modu-page-hero{width:min(100% - 32px,1240px);padding:32px 0 36px}
  .style1-static .modu-page-hero__body{align-items:flex-start;flex-direction:column;margin-top:20px}
  .style1-static .modu-page-hero h1{font-size:42px}
  .style1-static .modu-page-tabs{width:100%;overflow-x:auto;padding-bottom:4px}
}
</style>`;

  return `<!-- Generated from ${SOURCE_DIR}/${sourceName}. Do not edit in WordPress. -->\n<!-- wp:html -->\n${fontLinks}\n${tailwindScript}\n${tailwindConfig}\n${inlineStyle}\n${shellStyle}\n<div class="style1-static ${bodyClass}">\n${body}\n</div>\n<!-- /wp:html -->\n`;
}

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(join(OUT_DIR, 'templates'), { recursive: true });
mkdirSync(join(OUT_DIR, 'assets'), { recursive: true });

for (const [sourceName, templateName, activeKey] of pages) {
  const html = gitShow(sourceName);
  writeFileSync(join(OUT_DIR, 'templates', templateName), wrapTemplate(sourceName, html, activeKey), 'utf8');
}

for (const asset of assets) {
  const content = gitShow(asset, 'buffer');
  writeFileSync(join(OUT_DIR, 'assets', basename(asset)), content);
}

writeFileSync(
  join(OUT_DIR, 'templates', 'page-media.html'),
  wrapTemplate('lecture.html', gitShow('lecture.html'), 'media'),
  'utf8',
);

console.log(`Generated style1 templates and assets in ${OUT_DIR}`);
