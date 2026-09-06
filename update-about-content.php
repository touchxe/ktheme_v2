<?php
$wp_load = getenv('WP_LOAD_PATH');
if (!$wp_load) {
    fwrite(STDERR, "WP_LOAD_PATH is required.\n");
    exit(1);
}
require_once($wp_load);

// about 페이지 찾기
$about_page = get_page_by_path('about');
if (!$about_page) {
    $pages = get_posts([
        'post_type' => 'page',
        'name' => 'about',
        'posts_per_page' => 1,
    ]);
    if (!empty($pages)) {
        $about_page = $pages[0];
    }
}

if (!$about_page) {
    echo "About page not found.\n";
    exit(1);
}

$theme_uri = get_template_directory_uri();

// 패턴 파일 읽기
$about_intro_file = get_template_directory() . '/patterns/about-intro-01.php';
$worship_times_file = get_template_directory() . '/patterns/worship-times-01.php';

if (!file_exists($about_intro_file) || !file_exists($worship_times_file)) {
    echo "Pattern files not found.\n";
    exit(1);
}

$about_intro_raw = file_get_contents($about_intro_file);
$worship_times_raw = file_get_contents($worship_times_file);

// PHP closing tag 이후의 순수 블록 마크업만 추출
$parts1 = explode('?>', $about_intro_raw, 2);
$about_intro = isset($parts1[1]) ? trim($parts1[1]) : $about_intro_raw;

$parts2 = explode('?>', $worship_times_raw, 2);
$worship_times = isset($parts2[1]) ? trim($parts2[1]) : $worship_times_raw;

// PHP echo 제거 — 실제 테마 URI로 대체
$about_intro = str_replace(
    "<?php echo esc_url( get_template_directory_uri() ); ?>",
    $theme_uri,
    $about_intro
);

// 단축코드를 임시 값으로 대체
$about_intro = str_replace('[modu_org_year]', '2008', $about_intro);
$about_intro = str_replace('[modu_org_depts]', '5', $about_intro);
$about_intro = str_replace('[modu_org_members]', '320', $about_intro);
$about_intro = str_replace('[modu_org_name]', '만나교회', $about_intro);

// post_content 조합 (about-intro + worship-times)
$post_content = $about_intro . "\n\n" . $worship_times;

// 페이지 업데이트
wp_update_post([
    'ID' => $about_page->ID,
    'post_content' => $post_content,
]);

// 템플릿이 page-about로 설정되어 있는지 확인/강제
update_post_meta($about_page->ID, '_wp_page_template', 'page-about');

echo "About page (ID: {$about_page->ID}) content updated successfully.\n";
echo "Template: page-about\n";
