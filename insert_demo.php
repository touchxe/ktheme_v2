<?php
$wp_load = getenv('WP_LOAD_PATH');
if (!$wp_load) {
    fwrite(STDERR, "WP_LOAD_PATH is required.\n");
    exit(1);
}
require_once($wp_load);
require_once( ABSPATH . 'wp-admin/includes/media.php' );
require_once( ABSPATH . 'wp-admin/includes/file.php' );
require_once( ABSPATH . 'wp-admin/includes/image.php' );

function upload_image_from_path($file_path, $title) {
    if (!file_exists($file_path)) return false;
    
    // Copy to temp dir to avoid deleting the original generated image if WP moves it
    $tmp_file = sys_get_temp_dir() . '/' . basename($file_path);
    copy($file_path, $tmp_file);

    $file_array = array(
        'name'     => basename($file_path),
        'tmp_name' => $tmp_file
    );
    $attachment_id = media_handle_sideload($file_array, 0, $title);
    if (is_wp_error($attachment_id)) {
        return false;
    }
    return $attachment_id;
}

$img_dir = getenv('MODUTHEME_DEMO_IMAGE_DIR');
if (!$img_dir) {
    fwrite(STDERR, "MODUTHEME_DEMO_IMAGE_DIR is required.\n");
    exit(1);
}
$img_dir = rtrim($img_dir, '/\\') . DIRECTORY_SEPARATOR;
$img1 = upload_image_from_path($img_dir . 'sermon_faith_1777974615157.png', 'Sermon Faith');
$img2 = upload_image_from_path($img_dir . 'sermon_plan_1777974629482.png', 'Sermon Plan');
$img3 = upload_image_from_path($img_dir . 'sermon_prayer_1777974645700.png', 'Sermon Prayer');
$img4 = upload_image_from_path($img_dir . 'news_welcome_1777974663370.png', 'News Welcome');
$img5 = upload_image_from_path($img_dir . 'news_sports_1777974679187.png', 'News Sports');
$img6 = upload_image_from_path($img_dir . 'news_mission_1777974695257.png', 'News Mission');

$terms = ['공지사항', '행사/집회', '선교소식'];
$cat_ids = [];
foreach ($terms as $t) {
    $term = wp_insert_term($t, 'category');
    if (is_wp_error($term)) {
        $term_obj = get_term_by('name', $t, 'category');
        $cat_ids[$t] = $term_obj->term_id;
    } else {
        $cat_ids[$t] = $term['term_id'];
    }
}

$sermons = [
    ['title' => '세상을 이기는 믿음', 'content' => '요한일서 5:1-5 본문을 바탕으로 한 주일 1부 예배 설교입니다. 세상을 이기는 믿음은 무엇이며 어떻게 그 믿음을 가질 수 있는지 나눕니다.', 'passage' => '요한일서 5:1-5', 'preacher' => '담임목사', 'date' => '2026-05-03', 'img' => $img1],
    ['title' => '우리를 향한 하나님의 계획', 'content' => '예레미야 29:11 본문을 바탕으로 한 주일 2부 예배 설교입니다. 고난 속에서도 평안과 장래의 소망을 주시는 하나님의 섭리를 알아봅니다.', 'passage' => '예레미야 29:11', 'preacher' => '담임목사', 'date' => '2026-05-03', 'img' => $img2],
    ['title' => '기도로 돌파하라', 'content' => '마가복음 9:29 본문을 바탕으로 한 수요예배 설교입니다. 기도를 통해서만 일어날 수 있는 놀라운 능력과 돌파에 대해 나눕니다.', 'passage' => '마가복음 9:29', 'preacher' => '부목사', 'date' => '2026-05-06', 'img' => $img3],
];

foreach ($sermons as $s) {
    $post_id = wp_insert_post([
        'post_type' => 'sermon',
        'post_title' => $s['title'],
        'post_content' => $s['content'],
        'post_status' => 'publish',
    ]);
    if ($post_id) {
        update_post_meta($post_id, '_kt_sermon_youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        update_post_meta($post_id, '_kt_sermon_passage', $s['passage']);
        update_post_meta($post_id, '_kt_sermon_preacher', $s['preacher']);
        update_post_meta($post_id, '_kt_sermon_date', $s['date']);
        if ($s['img']) set_post_thumbnail($post_id, $s['img']);
    }
}

$news = [
    ['title' => '2026년 상반기 새가족 환영회 안내', 'content' => '새가족들을 위한 환영 만찬 및 목사님과의 티타임이 준비되어 있습니다. 처음 오신 모든 분들을 주님의 이름으로 환영하며, 많은 참석 바랍니다.', 'cat' => '공지사항', 'img' => $img4],
    ['title' => '전교인 봄맞이 한마음 체육대회', 'content' => '전 세대가 함께 모여 교제하는 봄 체육대회가 열립니다. 맑은 하늘 아래 푸른 잔디밭에서 교제하며 공동체의 연합을 누리는 시간이 되길 바랍니다.', 'cat' => '행사/집회', 'img' => $img5],
    ['title' => '태국 단기선교 파송 예배 및 후원 안내', 'content' => '여름 태국 단기선교를 떠나는 청년들을 위한 파송 예배가 이번 주일에 드려집니다. 많은 기도와 물질적 후원 부탁드립니다.', 'cat' => '선교소식', 'img' => $img6],
];

foreach ($news as $n) {
    $post_id = wp_insert_post([
        'post_type' => 'post',
        'post_title' => $n['title'],
        'post_content' => $n['content'],
        'post_status' => 'publish',
        'post_category' => [$cat_ids[$n['cat']]],
    ]);
    if ($post_id && $n['img']) {
        set_post_thumbnail($post_id, $n['img']);
    }
}

echo "Demo content inserted successfully.\n";
