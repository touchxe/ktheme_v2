const API_URL = 'http://adm11.local/wp-json/wp/v2';
const USERNAME = 'touchmine';
const APP_PASSWORD = 'Q3iA 9sUs afug WulD qVF8 cTqv';

const credentials = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${credentials}`
};

const pagesToCreate = [
  { title: '교회소개', slug: 'about', template: 'page-about' },
  { title: '예배/말씀', slug: 'sermons', template: 'page-sermons' },
  { title: '사역/공동체', slug: 'ministries', template: 'page-ministries' },
  { title: '교회소식', slug: 'news', template: 'page-news' },
  { title: '새가족 안내', slug: 'newcomers', template: 'page-newcomers' }
];

async function createPages() {
  console.log('페이지 생성을 시작합니다...');
  
  for (const page of pagesToCreate) {
    try {
      // 이미 존재하는지 확인
      const checkRes = await fetch(`${API_URL}/pages?slug=${page.slug}`, { headers });
      const existing = await checkRes.json();
      
      let pageId;
      if (existing && existing.length > 0) {
        console.log(`[PASS] '${page.title}' 페이지가 이미 존재합니다. (ID: ${existing[0].id}) 업데이트 진행...`);
        pageId = existing[0].id;
        
        // 템플릿 업데이트
        const updateRes = await fetch(`${API_URL}/pages/${pageId}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            template: page.template,
            status: 'publish'
          })
        });
        if (updateRes.ok) {
           console.log(`       -> 템플릿 '${page.template}' 적용 완료.`);
        } else {
           console.log(`       -> 템플릿 적용 실패:`, await updateRes.text());
        }
      } else {
        // 새 페이지 생성
        const createRes = await fetch(`${API_URL}/pages`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            title: page.title,
            slug: page.slug,
            template: page.template,
            status: 'publish',
            content: `<!-- wp:paragraph --><p>${page.title} 페이지입니다. 템플릿에서 불러온 내용이 아래 표시됩니다.</p><!-- /wp:paragraph -->`
          })
        });
        
        if (createRes.ok) {
          const newPage = await createRes.json();
          console.log(`[SUCCESS] '${page.title}' 페이지 생성 완료. (ID: ${newPage.id}, Template: ${page.template})`);
        } else {
          console.error(`[ERROR] '${page.title}' 생성 실패:`, await createRes.text());
        }
      }
    } catch (e) {
      console.error(`[ERROR] API 호출 중 오류 발생 (${page.title}):`, e.message);
    }
  }
  
  console.log('\n메뉴(Navigation) 설정 안내:');
  console.log('현재 ktheme-developer 테마는 header.html에 HTML 기반 메뉴가 하드코딩되어 있습니다.');
  console.log('페이지 슬러그(about, sermons 등)가 일치하므로 생성된 페이지들과 자동으로 연결됩니다.');
}

createPages();
