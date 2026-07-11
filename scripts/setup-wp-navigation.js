const API_URL = process.env.WP_API_URL;
const USERNAME = process.env.WP_USERNAME;
const APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!API_URL || !USERNAME || !APP_PASSWORD) {
  throw new Error('Missing WP_API_URL, WP_USERNAME, or WP_APP_PASSWORD.');
}

const credentials = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${credentials}`
};

const menuItems = [
  { slug: 'about', label: '교회소개' },
  { slug: 'sermons', label: '예배/말씀' },
  { slug: 'ministries', label: '사역/공동체' },
  { slug: 'news', label: '교회소식' },
  { slug: 'newcomers', label: '새가족 안내' }
];

const footerMenuItems = [
  { slug: 'worship-guide', label: '예배 안내' },
  { slug: 'sunday-worship', label: '주일예배' },
  { slug: 'news', label: '교회소식' },
  { slug: 'location', label: '오시는 길' },
  { slug: 'privacy-policy', label: '개인정보처리방침' }
];

async function buildNavigationContent(items) {
  let navContent = '';

  for (const item of items) {
    const res = await fetch(`${API_URL}/pages?slug=${item.slug}`, { headers });
    const pages = await res.json();
    if (pages && pages.length > 0) {
      const pageId = pages[0].id;
      navContent += `<!-- wp:navigation-link {"label":"${item.label}","type":"page","id":${pageId},"url":"/${item.slug}"} /-->\n`;
    } else {
      console.warn(`[WARN] '${item.slug}' 페이지를 찾을 수 없습니다. 메뉴 링크가 깨질 수 있습니다.`);
      navContent += `<!-- wp:navigation-link {"label":"${item.label}","type":"page","url":"/${item.slug}"} /-->\n`;
    }
  }

  return navContent;
}

async function setupNavigation() {
  console.log('네비게이션 메뉴 생성을 시작합니다...');

  try {
    // 1. 페이지 ID 가져오기
    const navContent = await buildNavigationContent(menuItems);
    const footerNavContent = await buildNavigationContent(footerMenuItems);

    // 2. 기존 Navigation 메뉴 확인
    const navRes = await fetch(`${API_URL}/navigation`, { headers });
    const existingNavs = await navRes.json();
    
    let headerNavId = null;
    let footerNavId = null;

    for (const nav of existingNavs) {
      if (nav.title && nav.title.raw === 'Header Menu') headerNavId = nav.id;
      if (nav.title && nav.title.raw === 'Footer Menu') footerNavId = nav.id;
    }

    // 3. 헤더 메뉴 생성 또는 업데이트
    if (headerNavId) {
      console.log(`[PASS] Header Menu 가 이미 존재합니다. (ID: ${headerNavId}) 업데이트 진행...`);
      await fetch(`${API_URL}/navigation/${headerNavId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content: navContent, status: 'publish' })
      });
    } else {
      const createRes = await fetch(`${API_URL}/navigation`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'Header Menu',
          content: navContent,
          status: 'publish'
        })
      });
      const newNav = await createRes.json();
      headerNavId = newNav.id;
      console.log(`[SUCCESS] Header Menu 생성 완료. (ID: ${headerNavId})`);
    }

    // 4. 푸터 메뉴 생성 또는 업데이트
    if (footerNavId) {
      console.log(`[PASS] Footer Menu 가 이미 존재합니다. (ID: ${footerNavId}) 업데이트 진행...`);
      await fetch(`${API_URL}/navigation/${footerNavId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content: footerNavContent, status: 'publish' })
      });
    } else {
      const createRes = await fetch(`${API_URL}/navigation`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'Footer Menu',
          content: footerNavContent,
          status: 'publish'
        })
      });
      const newNav = await createRes.json();
      footerNavId = newNav.id;
      console.log(`[SUCCESS] Footer Menu 생성 완료. (ID: ${footerNavId})`);
    }

    console.log('\n=======================================');
    console.log('생성된 Navigation ID 정보 (기록용):');
    console.log(`Header Menu ID: ${headerNavId}`);
    console.log(`Footer Menu ID: ${footerNavId}`);
    console.log('=======================================\n');
    
    // 이 ID들을 환경 변수나 파일로 임시 저장하여 다음 스크립트에서 읽을 수 있게 합니다.
    const fs = require('fs');
    fs.writeFileSync('nav-ids.json', JSON.stringify({ headerNavId, footerNavId }));

  } catch (e) {
    console.error(`[ERROR] API 호출 중 오류 발생:`, e.message);
  }
}

setupNavigation();
