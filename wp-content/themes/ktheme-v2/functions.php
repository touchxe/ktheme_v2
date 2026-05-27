<?php

if ( ! function_exists( 'ktheme_v2_setup' ) ) {
	function ktheme_v2_setup(): void {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'post-thumbnails' );
		add_editor_style( 'style.css' );

		register_block_pattern_category(
			'ktheme-v2-style1',
			array( 'label' => __( 'KTheme V2 Style 1', 'ktheme-v2' ) )
		);

		register_nav_menus(
			array(
				'primary' => __( 'Header Primary Menu', 'ktheme-v2' ),
				'utility' => __( 'Header Utility Menu', 'ktheme-v2' ),
				'footer-worship' => __( 'Footer Worship Menu', 'ktheme-v2' ),
				'footer-community' => __( 'Footer Community Menu', 'ktheme-v2' ),
				'footer-links' => __( 'Footer Links Menu', 'ktheme-v2' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'ktheme_v2_setup' );

function ktheme_v2_register_content_types(): void {
	register_post_type(
		'ktheme_sermon',
		array(
			'labels' => array(
				'name' => __( '설교', 'ktheme-v2' ),
				'singular_name' => __( '설교', 'ktheme-v2' ),
				'add_new_item' => __( '설교 추가', 'ktheme-v2' ),
				'edit_item' => __( '설교 편집', 'ktheme-v2' ),
				'all_items' => __( '모든 설교', 'ktheme-v2' ),
			),
			'public' => true,
			'show_in_rest' => true,
			'menu_icon' => 'dashicons-video-alt3',
			'has_archive' => 'sermons',
			'rewrite' => array( 'slug' => 'sermons' ),
			'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
		)
	);

	register_taxonomy(
		'ktheme_sermon_series',
		array( 'ktheme_sermon' ),
		array(
			'labels' => array(
				'name' => __( '설교 시리즈', 'ktheme-v2' ),
				'singular_name' => __( '설교 시리즈', 'ktheme-v2' ),
			),
			'public' => true,
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite' => array( 'slug' => 'sermon-series' ),
		)
	);

	register_post_type(
		'ktheme_event',
		array(
			'labels' => array(
				'name' => __( '행사', 'ktheme-v2' ),
				'singular_name' => __( '행사', 'ktheme-v2' ),
				'add_new_item' => __( '행사 추가', 'ktheme-v2' ),
				'edit_item' => __( '행사 편집', 'ktheme-v2' ),
				'all_items' => __( '모든 행사', 'ktheme-v2' ),
			),
			'public' => true,
			'show_in_rest' => true,
			'menu_icon' => 'dashicons-calendar-alt',
			'has_archive' => 'events',
			'rewrite' => array( 'slug' => 'events' ),
			'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
		)
	);

	register_post_type(
		'ktheme_album',
		array(
			'labels' => array(
				'name' => __( '갤러리 앨범', 'ktheme-v2' ),
				'singular_name' => __( '갤러리 앨범', 'ktheme-v2' ),
				'add_new_item' => __( '앨범 추가', 'ktheme-v2' ),
				'edit_item' => __( '앨범 편집', 'ktheme-v2' ),
				'all_items' => __( '모든 앨범', 'ktheme-v2' ),
			),
			'public' => true,
			'show_in_rest' => true,
			'menu_icon' => 'dashicons-format-gallery',
			'has_archive' => 'albums',
			'rewrite' => array( 'slug' => 'albums' ),
			'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
		)
	);
}
add_action( 'init', 'ktheme_v2_register_content_types' );

function ktheme_v2_maybe_flush_rewrite_rules(): void {
	$version = wp_get_theme()->get( 'Version' );

	if ( get_option( 'ktheme_v2_rewrite_version' ) === $version ) {
		return;
	}

	flush_rewrite_rules();
	update_option( 'ktheme_v2_rewrite_version', $version );
}
add_action( 'init', 'ktheme_v2_maybe_flush_rewrite_rules', 20 );

function ktheme_v2_enqueue_assets(): void {
	wp_enqueue_style(
		'ktheme-v2-pretendard',
		'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
		array(),
		'1.3.9'
	);

	wp_enqueue_style(
		'ktheme-v2-style',
		get_stylesheet_uri(),
		array( 'ktheme-v2-pretendard' ),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_v2_enqueue_assets' );
add_action( 'enqueue_block_editor_assets', 'ktheme_v2_enqueue_assets' );
