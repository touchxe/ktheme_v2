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
				'footer'  => __( 'Footer Menu', 'ktheme-v2' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'ktheme_v2_setup' );

function ktheme_v2_normalize_footer_menu_location(): void {
	$locations = get_nav_menu_locations();
	$legacy_footer_locations = array( 'footer-worship', 'footer-community', 'footer-links' );
	$changed = false;

	if ( empty( $locations['footer'] ) ) {
		foreach ( $legacy_footer_locations as $legacy_location ) {
			if ( ! empty( $locations[ $legacy_location ] ) ) {
				$locations['footer'] = $locations[ $legacy_location ];
				$changed = true;
				break;
			}
		}
	}

	foreach ( $legacy_footer_locations as $legacy_location ) {
		if ( isset( $locations[ $legacy_location ] ) ) {
			unset( $locations[ $legacy_location ] );
			$changed = true;
		}
	}

	if ( $changed ) {
		set_theme_mod( 'nav_menu_locations', $locations );
	}
}
add_action( 'after_setup_theme', 'ktheme_v2_normalize_footer_menu_location', 20 );

function ktheme_v2_register_content_types(): void {
	register_post_type(
		'ktheme_sermon',
		array(
			'labels'       => array(
				'name'          => __( 'Sermons', 'ktheme-v2' ),
				'singular_name' => __( 'Sermon', 'ktheme-v2' ),
				'add_new_item'  => __( 'Add Sermon', 'ktheme-v2' ),
				'edit_item'     => __( 'Edit Sermon', 'ktheme-v2' ),
				'all_items'     => __( 'All Sermons', 'ktheme-v2' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-video-alt3',
			'has_archive'  => 'sermons',
			'rewrite'      => array( 'slug' => 'sermons' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
		)
	);

	register_taxonomy(
		'ktheme_sermon_series',
		array( 'ktheme_sermon' ),
		array(
			'labels'       => array(
				'name'          => __( 'Sermon Series', 'ktheme-v2' ),
				'singular_name' => __( 'Sermon Series', 'ktheme-v2' ),
			),
			'public'       => true,
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'sermon-series' ),
		)
	);

	register_post_type(
		'ktheme_event',
		array(
			'labels'       => array(
				'name'          => __( 'Events', 'ktheme-v2' ),
				'singular_name' => __( 'Event', 'ktheme-v2' ),
				'add_new_item'  => __( 'Add Event', 'ktheme-v2' ),
				'edit_item'     => __( 'Edit Event', 'ktheme-v2' ),
				'all_items'     => __( 'All Events', 'ktheme-v2' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-calendar-alt',
			'has_archive'  => 'events',
			'rewrite'      => array( 'slug' => 'events' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
		)
	);

	register_post_type(
		'ktheme_album',
		array(
			'labels'       => array(
				'name'          => __( 'Gallery Albums', 'ktheme-v2' ),
				'singular_name' => __( 'Gallery Album', 'ktheme-v2' ),
				'add_new_item'  => __( 'Add Album', 'ktheme-v2' ),
				'edit_item'     => __( 'Edit Album', 'ktheme-v2' ),
				'all_items'     => __( 'All Albums', 'ktheme-v2' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-format-gallery',
			'has_archive'  => 'albums',
			'rewrite'      => array( 'slug' => 'albums' ),
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
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

function ktheme_v2_text( string $encoded ): string {
	$decoded = json_decode( '"' . $encoded . '"' );

	return is_string( $decoded ) ? $decoded : $encoded;
}

function ktheme_v2_required_pages(): array {
	return array(
		array( 'title' => ktheme_v2_text( '\uAD50\uD68C\uC18C\uAC1C' ), 'slug' => 'about', 'template' => 'page-about' ),
		array( 'title' => ktheme_v2_text( '\uBE44\uC804' ), 'slug' => 'vision' ),
		array( 'title' => ktheme_v2_text( '\uC12C\uAE30\uB294 \uC0AC\uB78C\uB4E4' ), 'slug' => 'people' ),
		array( 'title' => ktheme_v2_text( '\uAD50\uD68C\uC5F0\uD601' ), 'slug' => 'history' ),
		array( 'title' => ktheme_v2_text( '\uC5F0\uAC04\uC77C\uC815' ), 'slug' => 'annual-schedule' ),
		array( 'title' => ktheme_v2_text( '\uC624\uC2DC\uB294 \uAE38' ), 'slug' => 'location' ),
		array( 'title' => ktheme_v2_text( '\uC608\uBC30' ), 'slug' => 'worship', 'template' => 'page-worship' ),
		array( 'title' => ktheme_v2_text( '\uC608\uBC30 \uC548\uB0B4' ), 'slug' => 'worship-guide' ),
		array( 'title' => ktheme_v2_text( '\uC8FC\uC77C\uC608\uBC30' ), 'slug' => 'sunday-worship', 'template' => 'page-sunday-worship' ),
		array( 'title' => ktheme_v2_text( '\uC218\uC694\uC608\uBC30' ), 'slug' => 'wednesday-worship' ),
		array( 'title' => ktheme_v2_text( '\uC0C8\uBCBD\uAE30\uB3C4' ), 'slug' => 'dawn-prayer' ),
		array( 'title' => ktheme_v2_text( '\uC8FC\uBCF4' ), 'slug' => 'bulletin' ),
		array( 'title' => ktheme_v2_text( '\uACF5\uB3D9\uCCB4' ), 'slug' => 'community', 'template' => 'page-community' ),
		array( 'title' => ktheme_v2_text( '\uC0C8\uAC00\uC871' ), 'slug' => 'newcomers' ),
		array( 'title' => ktheme_v2_text( '\uC18C\uADF8\uB8F9/\uAD6C\uC5ED' ), 'slug' => 'small-groups' ),
		array( 'title' => ktheme_v2_text( '\uB2E4\uC74C\uC138\uB300' ), 'slug' => 'next-generation' ),
		array( 'title' => ktheme_v2_text( '\uCCAD\uB144\uBD80' ), 'slug' => 'youth-ministry' ),
		array( 'title' => ktheme_v2_text( '\uC7A5\uB144/\uC2DC\uB2C8\uC5B4' ), 'slug' => 'senior-ministry' ),
		array( 'title' => ktheme_v2_text( '\uC591\uC721' ), 'slug' => 'training', 'template' => 'page-training' ),
		array( 'title' => ktheme_v2_text( '\uC0C8\uAC00\uC871 \uACFC\uC815' ), 'slug' => 'new-family-course' ),
		array( 'title' => ktheme_v2_text( '\uC131\uACBD\uACF5\uBD80' ), 'slug' => 'bible-study' ),
		array( 'title' => ktheme_v2_text( '\uC81C\uC790\uD6C8\uB828' ), 'slug' => 'discipleship' ),
		array( 'title' => ktheme_v2_text( 'QT/\uBB35\uC0C1' ), 'slug' => 'qt' ),
		array( 'title' => ktheme_v2_text( '\uC120\uAD50 \uC548\uB0B4' ), 'slug' => 'mission' ),
		array( 'title' => ktheme_v2_text( '\uC12C\uAE40 \uC0AC\uC5ED' ), 'slug' => 'serve' ),
		array( 'title' => ktheme_v2_text( '\uD6C4\uC6D0 \uC548\uB0B4' ), 'slug' => 'support' ),
		array( 'title' => ktheme_v2_text( '\uBBF8\uB514\uC5B4' ), 'slug' => 'media', 'template' => 'page-media' ),
		array( 'title' => ktheme_v2_text( '\uAD50\uD68C\uC18C\uC2DD' ), 'slug' => 'news' ),
		array( 'title' => ktheme_v2_text( '\uAD50\uB2E8\uC18C\uC2DD' ), 'slug' => 'denomination-news' ),
		array( 'title' => ktheme_v2_text( '\uC601\uC0C1' ), 'slug' => 'videos' ),
		array( 'title' => ktheme_v2_text( '\uC790\uB8CC\uC2E4' ), 'slug' => 'library', 'template' => 'page-library' ),
		array( 'title' => ktheme_v2_text( '\uD589\uC815' ), 'slug' => 'admin-guide', 'template' => 'page-admin-guide' ),
		array( 'title' => ktheme_v2_text( '\uC628\uB77C\uC778 \uD5CC\uAE08' ), 'slug' => 'giving' ),
		array( 'title' => ktheme_v2_text( '\uC99D\uBA85\uC11C \uBC1C\uAE09' ), 'slug' => 'documents' ),
		array( 'title' => ktheme_v2_text( '\uC7A5\uC18C \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'facility-request' ),
		array( 'title' => ktheme_v2_text( '\uCC28\uB7C9 \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'vehicle-request' ),
		array( 'title' => ktheme_v2_text( '\uBB38\uC758\uD558\uAE30' ), 'slug' => 'contact' ),
		array( 'title' => ktheme_v2_text( '\uB514\uC790\uC778 \uB77C\uC774\uBE0C\uB7EC\uB9AC' ), 'slug' => 'design-library', 'template' => 'page-design-library' ),
		array( 'title' => ktheme_v2_text( '\uB85C\uADF8\uC778' ), 'slug' => 'login' ),
		array( 'title' => ktheme_v2_text( '\uD68C\uC6D0\uAC00\uC785' ), 'slug' => 'register' ),
		array( 'title' => ktheme_v2_text( '\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68' ), 'slug' => 'privacy-policy' ),
		array( 'title' => ktheme_v2_text( '\uC774\uBA54\uC77C \uBB34\uB2E8\uC218\uC9D1\uAC70\uBD80' ), 'slug' => 'email-policy' ),
	);
}

function ktheme_v2_page_seed_content( string $title ): string {
	return '<!-- wp:paragraph {"className":"kt-empty"} -->' .
		'<p class="kt-empty">' . esc_html( $title . ' ' . ktheme_v2_text( '\uCF58\uD150\uCE20\uB97C \uC900\uBE44\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.' ) ) . '</p>' .
		'<!-- /wp:paragraph -->';
}

function ktheme_v2_ensure_required_pages(): void {
	if ( ! is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' );
	if ( get_option( 'ktheme_v2_required_pages_version' ) === $version ) {
		return;
	}

	foreach ( ktheme_v2_required_pages() as $page ) {
		$existing = get_page_by_path( $page['slug'] );

		if ( ! $existing ) {
			$page_id = wp_insert_post(
				array(
					'post_title'   => $page['title'],
					'post_name'    => $page['slug'],
					'post_status'  => 'publish',
					'post_type'    => 'page',
					'post_content' => ktheme_v2_page_seed_content( $page['title'] ),
				),
				true
			);

			if ( is_wp_error( $page_id ) ) {
				continue;
			}
		} else {
			$page_id = (int) $existing->ID;
		}

		if ( ! empty( $page['template'] ) ) {
			$current_template = get_post_meta( $page_id, '_wp_page_template', true );
			if ( '' === $current_template || 'default' === $current_template ) {
				update_post_meta( $page_id, '_wp_page_template', $page['template'] );
			}
		}
	}

	update_option( 'ktheme_v2_required_pages_version', $version );
}
add_action( 'admin_init', 'ktheme_v2_ensure_required_pages' );

function ktheme_v2_flat_child_page_slugs(): array {
	return array(
		'vision',
		'people',
		'history',
		'annual-schedule',
		'location',
		'worship-guide',
		'sunday-worship',
		'wednesday-worship',
		'dawn-prayer',
		'bulletin',
		'newcomers',
		'small-groups',
		'next-generation',
		'youth-ministry',
		'senior-ministry',
		'new-family-course',
		'bible-study',
		'discipleship',
		'qt',
		'serve',
		'support',
		'news',
		'denomination-news',
		'videos',
		'library',
		'giving',
		'documents',
		'facility-request',
		'vehicle-request',
		'contact',
	);
}

function ktheme_v2_use_flat_child_page_links( string $link, int $post_id ): string {
	$page = get_post( $post_id );

	if ( $page instanceof WP_Post && 'page' === $page->post_type && in_array( $page->post_name, ktheme_v2_flat_child_page_slugs(), true ) ) {
		return home_url( user_trailingslashit( $page->post_name ) );
	}

	return $link;
}
add_filter( 'page_link', 'ktheme_v2_use_flat_child_page_links', 10, 2 );

function ktheme_v2_resolve_flat_child_page_request( array $query_vars ): array {
	if ( empty( $query_vars['pagename'] ) || ! is_string( $query_vars['pagename'] ) ) {
		return $query_vars;
	}

	$slug = trim( $query_vars['pagename'], '/' );
	if ( ! in_array( $slug, ktheme_v2_flat_child_page_slugs(), true ) ) {
		return $query_vars;
	}

	$pages = get_posts(
		array(
			'name'           => $slug,
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);

	if ( empty( $pages ) ) {
		return $query_vars;
	}

	$query_vars['page_id'] = (int) $pages[0];
	unset( $query_vars['pagename'] );

	return $query_vars;
}
add_filter( 'request', 'ktheme_v2_resolve_flat_child_page_request' );

function ktheme_v2_resolve_flat_child_page_parse_request( WP $wp ): void {
	$slug = trim( (string) $wp->request, '/' );

	if ( ! in_array( $slug, ktheme_v2_flat_child_page_slugs(), true ) ) {
		return;
	}

	global $wpdb;
	$page_id = (int) $wpdb->get_var(
		$wpdb->prepare(
			"SELECT ID FROM {$wpdb->posts} WHERE post_type = 'page' AND post_name = %s AND post_status IN ('publish','private') ORDER BY ID ASC LIMIT 1",
			$slug
		)
	);

	if ( $page_id <= 0 ) {
		return;
	}

	$wp->query_vars = array(
		'page_id' => $page_id,
	);
}
add_action( 'parse_request', 'ktheme_v2_resolve_flat_child_page_parse_request', 1 );

function ktheme_v2_keep_flat_child_page_canonical( $redirect_url, string $requested_url ) {
	$path = trim( (string) wp_parse_url( $requested_url, PHP_URL_PATH ), '/' );

	if ( in_array( $path, ktheme_v2_flat_child_page_slugs(), true ) ) {
		return false;
	}

	return $redirect_url;
}
add_filter( 'redirect_canonical', 'ktheme_v2_keep_flat_child_page_canonical', 10, 2 );

function ktheme_v2_redirect_legacy_slugs(): void {
	$path = trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' );

	if ( 'ministries' === $path ) {
		wp_safe_redirect( home_url( '/community/' ), 301 );
		exit;
	}

	$parts = array_values( array_filter( explode( '/', $path ) ) );
	if ( 2 === count( $parts ) ) {
		$legacy_parents = array( 'about', 'worship', 'community', 'training', 'media', 'admin-guide', 'mission' );
		$child_slug     = $parts[1];

		if ( in_array( $parts[0], $legacy_parents, true ) && in_array( $child_slug, ktheme_v2_flat_child_page_slugs(), true ) ) {
			wp_safe_redirect( home_url( user_trailingslashit( $child_slug ) ), 301 );
			exit;
		}
	}
}
add_action( 'template_redirect', 'ktheme_v2_redirect_legacy_slugs' );

function ktheme_v2_page_sections(): array {
	return array(
		'about'       => array(
			'title'       => ktheme_v2_text( '\uAD50\uD68C\uC18C\uAC1C' ),
			'description' => ktheme_v2_text( '\uAD50\uD68C\uC758 \uC815\uCCB4\uC131, \uBE44\uC804, \uC0AC\uB78C\uB4E4\uACFC \uC5F0\uD601\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_v2_text( '\uAD50\uD68C\uC18C\uAC1C' ), 'slug' => 'about', 'description' => ktheme_v2_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC0AC\uC5ED \uBC29\uD5A5\uACFC \uC18C\uAC1C\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uBE44\uC804' ), 'slug' => 'vision', 'description' => ktheme_v2_text( '\uAD50\uD68C\uAC00 \uD568\uAED8 \uD5A5\uD574\uAC00\uB294 \uBE44\uC804\uACFC \uAC00\uCE58\uB97C \uB098\uB215\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC12C\uAE30\uB294 \uC0AC\uB78C\uB4E4' ), 'slug' => 'people', 'description' => ktheme_v2_text( '\uAC00\uD3C9\uAD50\uD68C\uB97C \uC12C\uAE30\uB294 \uC0AC\uB78C\uB4E4\uC744 \uC18C\uAC1C\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uAD50\uD68C\uC5F0\uD601' ), 'slug' => 'history', 'description' => ktheme_v2_text( '\uAC00\uD3C9\uAD50\uD68C\uAC00 \uAC78\uC5B4\uC628 \uC2DC\uAC04\uACFC \uAE30\uB85D\uC744 \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC5F0\uAC04\uC77C\uC815' ), 'slug' => 'annual-schedule', 'description' => ktheme_v2_text( '\uC62C\uD574\uC758 \uC8FC\uC694 \uC0AC\uC5ED\uACFC \uC77C\uC815\uC744 \uD55C\uB208\uC5D0 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uC624\uC2DC\uB294 \uAE38' ), 'slug' => 'location', 'description' => ktheme_v2_text( '\uC608\uBC30\uB2F9 \uC704\uCE58\uC640 \uBC29\uBB38 \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
			),
		),
		'worship'     => array(
			'title'       => ktheme_v2_text( '\uC608\uBC30' ),
			'description' => ktheme_v2_text( '\uC8FC\uC77C\uC608\uBC30\uBD80\uD130 \uC0C8\uBCBD\uAE30\uB3C4\uAE4C\uC9C0, \uD568\uAED8 \uC608\uBC30\uD558\uB294 \uC2DC\uAC04\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_v2_text( '\uC608\uBC30' ), 'slug' => 'worship', 'description' => ktheme_v2_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC608\uBC30 \uD750\uB984\uACFC \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uC608\uBC30 \uC548\uB0B4' ), 'slug' => 'worship-guide', 'description' => ktheme_v2_text( '\uCC98\uC74C \uBC29\uBB38\uD558\uB294 \uBD84\uB4E4\uC744 \uC704\uD55C \uC608\uBC30 \uC548\uB0B4\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC8FC\uC77C\uC608\uBC30' ), 'slug' => 'sunday-worship', 'description' => ktheme_v2_text( '\uC8FC\uC77C\uC608\uBC30 \uC2DC\uAC04\uACFC \uC7A5\uC18C, \uC608\uBC30 \uC815\uBCF4\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC218\uC694\uC608\uBC30' ), 'slug' => 'wednesday-worship', 'description' => ktheme_v2_text( '\uC218\uC694\uC608\uBC30\uC640 \uAE30\uB3C4\uD68C \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uC0C8\uBCBD\uAE30\uB3C4' ), 'slug' => 'dawn-prayer', 'description' => ktheme_v2_text( '\uD558\uB8E8\uB97C \uAE30\uB3C4\uB85C \uC5EC\uB294 \uC0C8\uBCBD\uAE30\uB3C4 \uC2DC\uAC04\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC8FC\uBCF4' ), 'slug' => 'bulletin', 'description' => ktheme_v2_text( '\uC8FC\uAC04 \uC608\uBC30 \uC21C\uC11C\uC640 \uAD50\uD68C \uC18C\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.' ) ),
			),
		),
		'community'   => array(
			'title'       => ktheme_v2_text( '\uACF5\uB3D9\uCCB4' ),
			'description' => ktheme_v2_text( '\uC0C8\uAC00\uC871, \uC18C\uADF8\uB8F9, \uB2E4\uC74C\uC138\uB300\uC640 \uCCAD\uB144\uBD80\uAC00 \uD568\uAED8 \uC790\uB77C\uAC00\uB294 \uACF5\uB3D9\uCCB4\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_v2_text( '\uACF5\uB3D9\uCCB4' ), 'slug' => 'community', 'description' => ktheme_v2_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uACF5\uB3D9\uCCB4 \uC0AC\uC5ED\uC744 \uD55C\uB208\uC5D0 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uC0C8\uAC00\uC871' ), 'slug' => 'newcomers', 'description' => ktheme_v2_text( '\uCC98\uC74C \uC624\uC2E0 \uBD84\uB4E4\uC744 \uC704\uD55C \uB4F1\uB85D\uACFC \uC815\uCC29 \uACFC\uC815\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC18C\uADF8\uB8F9/\uAD6C\uC5ED' ), 'slug' => 'small-groups', 'description' => ktheme_v2_text( '\uC0B6\uC744 \uB098\uB204\uACE0 \uC11C\uB85C\uB97C \uB3CC\uBCF4\uB294 \uC18C\uADF8\uB8F9 \uACF5\uB3D9\uCCB4\uB97C \uC18C\uAC1C\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uB2E4\uC74C\uC138\uB300' ), 'slug' => 'next-generation', 'description' => ktheme_v2_text( '\uC544\uC774\uB4E4\uACFC \uCCAD\uC18C\uB144\uC774 \uBCF5\uC74C \uC548\uC5D0\uC11C \uC790\uB77C\uAC00\uB294 \uC608\uBC30\uC640 \uAD50\uC721\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uCCAD\uB144\uBD80' ), 'slug' => 'youth-ministry', 'description' => ktheme_v2_text( '\uCCAD\uB144\uB4E4\uC774 \uBBFF\uC74C\uACFC \uC0B6\uC744 \uD568\uAED8 \uC138\uC6CC\uAC00\uB294 \uC790\uB9AC\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC7A5\uB144/\uC2DC\uB2C8\uC5B4' ), 'slug' => 'senior-ministry', 'description' => ktheme_v2_text( '\uC7A5\uB144\uACFC \uC2DC\uB2C8\uC5B4 \uC131\uB3C4\uB4E4\uC744 \uC704\uD55C \uC0AC\uC5ED\uACFC \uBAA8\uC784\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
			),
		),
		'training'    => array(
			'title'       => ktheme_v2_text( '\uC591\uC721' ),
			'description' => ktheme_v2_text( '\uC0C8\uAC00\uC871 \uACFC\uC815\uBD80\uD130 \uC81C\uC790\uD6C8\uB828\uAE4C\uC9C0, \uBBFF\uC74C\uC758 \uC131\uC7A5\uC744 \uB3D5\uB294 \uC591\uC721 \uACFC\uC815\uC785\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_v2_text( '\uC591\uC721' ), 'slug' => 'training', 'description' => ktheme_v2_text( '\uC2E0\uC559\uC758 \uAE30\uCD08\uBD80\uD130 \uC131\uC7A5\uAE4C\uC9C0 \uD568\uAED8 \uAC78\uC5B4\uAC11\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC0C8\uAC00\uC871 \uACFC\uC815' ), 'slug' => 'new-family-course', 'description' => ktheme_v2_text( '\uAD50\uD68C\uB97C \uC774\uD574\uD558\uACE0 \uACF5\uB3D9\uCCB4\uC5D0 \uC815\uCC29\uD558\uB294 \uACFC\uC815\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC131\uACBD\uACF5\uBD80' ), 'slug' => 'bible-study', 'description' => ktheme_v2_text( '\uB9D0\uC500\uC744 \uAE4A\uC774 \uBC30\uC6B0\uACE0 \uC0B6\uC5D0 \uC801\uC6A9\uD558\uB294 \uACF5\uBD80\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC81C\uC790\uD6C8\uB828' ), 'slug' => 'discipleship', 'description' => ktheme_v2_text( '\uC608\uC218\uB2D8\uC758 \uC81C\uC790\uB85C \uC0B4\uC544\uAC00\uB3C4\uB85D \uB3D5\uB294 \uD6C8\uB828 \uACFC\uC815\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( 'QT/\uBB35\uC0C1' ), 'slug' => 'qt', 'description' => ktheme_v2_text( '\uB9E4\uC77C \uB9D0\uC500\uC73C\uB85C \uD558\uB8E8\uB97C \uC5EC\uB294 \uBB35\uC0C1 \uC790\uB8CC\uC785\uB2C8\uB2E4.' ) ),
			),
		),
		'mission'     => array(
			'title'       => ktheme_v2_text( '\uC120\uAD50 \uC548\uB0B4' ),
			'description' => ktheme_v2_text( '\uAD6D\uB0B4\uC640 \uD574\uC678 \uC120\uAD50\uB97C \uD558\uB098\uC758 \uC120\uAD50 \uC548\uB0B4\uC5D0\uC11C \uD1B5\uD569\uD574 \uBCF4\uC5EC\uB4DC\uB9BD\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_v2_text( '\uC120\uAD50 \uC548\uB0B4' ), 'slug' => 'mission', 'description' => ktheme_v2_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC120\uAD50 \uBC29\uD5A5\uACFC \uD611\uB825 \uC0AC\uC5ED\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC12C\uAE40 \uC0AC\uC5ED' ), 'slug' => 'serve', 'description' => ktheme_v2_text( '\uAD50\uD68C\uC640 \uC9C0\uC5ED\uC744 \uC12C\uAE30\uB294 \uC0AC\uC5ED\uC744 \uC18C\uAC1C\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uD6C4\uC6D0 \uC548\uB0B4' ), 'slug' => 'support', 'description' => ktheme_v2_text( '\uC120\uAD50\uC640 \uC12C\uAE40\uC5D0 \uD568\uAED8\uD558\uB294 \uD6C4\uC6D0 \uBC29\uBC95\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
			),
		),
		'media'       => array(
			'title'       => ktheme_v2_text( '\uBBF8\uB514\uC5B4' ),
			'description' => ktheme_v2_text( '\uAD50\uD68C\uC18C\uC2DD, \uAD50\uB2E8\uC18C\uC2DD, \uC124\uAD50, \uC601\uC0C1\uACFC \uC790\uB8CC\uB97C \uD55C\uACF3\uC5D0\uC11C \uBCF4\uC138\uC694.' ),
			'items'       => array(
				array( 'label' => ktheme_v2_text( '\uBBF8\uB514\uC5B4' ), 'slug' => 'media', 'description' => ktheme_v2_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC8FC\uC694 \uCF58\uD150\uCE20\uB97C \uBAA8\uC544 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uAD50\uD68C\uC18C\uC2DD' ), 'slug' => 'news', 'description' => ktheme_v2_text( '\uAD50\uD68C\uC758 \uC0C8\uB85C\uC6B4 \uC18C\uC2DD\uACFC \uACF5\uC9C0\uB97C \uC804\uD574\uB4DC\uB9BD\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uAD50\uB2E8\uC18C\uC2DD' ), 'slug' => 'denomination-news', 'description' => ktheme_v2_text( '\uAD50\uB2E8\uC758 \uC8FC\uC694 \uC18C\uC2DD\uC744 \uD568\uAED8 \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uC124\uAD50' ), 'slug' => 'sermons', 'description' => ktheme_v2_text( '\uC8FC\uC77C\uC608\uBC30\uC640 \uC8FC\uC694 \uC608\uBC30\uC758 \uB9D0\uC500\uC744 \uB2E4\uC2DC \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uD589\uC0AC\uC568\uBC94' ), 'slug' => 'albums', 'description' => ktheme_v2_text( '\uAD50\uD68C \uD589\uC0AC\uC640 \uACF5\uB3D9\uCCB4\uC758 \uC7A5\uBA74\uC744 \uC0AC\uC9C4\uC73C\uB85C \uB098\uB215\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC601\uC0C1' ), 'slug' => 'videos', 'description' => ktheme_v2_text( '\uAD50\uD68C \uC0AC\uC5ED\uACFC \uC608\uBC30 \uC601\uC0C1\uC744 \uBAA8\uC544 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_v2_text( '\uC790\uB8CC\uC2E4' ), 'slug' => 'library', 'description' => ktheme_v2_text( '\uC0AC\uC5ED\uACFC \uC2E0\uC559\uC0DD\uD65C\uC5D0 \uD544\uC694\uD55C \uC790\uB8CC\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4.' ) ),
			),
		),
		'admin-guide' => array(
			'title'       => ktheme_v2_text( '\uD589\uC815' ),
			'description' => ktheme_v2_text( '\uD5CC\uAE08, \uC99D\uBA85\uC11C, \uACF5\uAC04\uACFC \uCC28\uB7C9 \uC2E0\uCCAD, \uBB38\uC758\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_v2_text( '\uD589\uC815' ), 'slug' => 'admin-guide', 'description' => ktheme_v2_text( '\uAD50\uD68C \uD589\uC815 \uC0AC\uD56D\uACFC \uC8FC\uC694 \uC2E0\uCCAD \uCC3D\uAD6C\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC628\uB77C\uC778 \uD5CC\uAE08' ), 'slug' => 'giving', 'description' => ktheme_v2_text( '\uC628\uB77C\uC778 \uD5CC\uAE08 \uBC29\uBC95\uACFC \uACC4\uC88C \uC815\uBCF4\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC99D\uBA85\uC11C \uBC1C\uAE09' ), 'slug' => 'documents', 'description' => ktheme_v2_text( '\uAD50\uC801 \uBC0F \uD589\uC815 \uC99D\uBA85\uC11C \uBC1C\uAE09 \uC2E0\uCCAD\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uC7A5\uC18C \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'facility-request', 'description' => ktheme_v2_text( '\uAD50\uD68C \uACF5\uAC04 \uC0AC\uC6A9 \uC2E0\uCCAD \uC808\uCC28\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uCC28\uB7C9 \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'vehicle-request', 'description' => ktheme_v2_text( '\uAD50\uD68C \uCC28\uB7C9 \uC0AC\uC6A9 \uC2E0\uCCAD \uC548\uB0B4\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_v2_text( '\uBB38\uC758\uD558\uAE30' ), 'slug' => 'contact', 'description' => ktheme_v2_text( '\uAD50\uD68C\uC5D0 \uD544\uC694\uD55C \uBB38\uC758\uB97C \uB0A8\uACA8\uC8FC\uC138\uC694.' ) ),
			),
		),
	);
}

function ktheme_v2_find_page_section( string $slug ): ?array {
	foreach ( ktheme_v2_page_sections() as $section_slug => $section ) {
		foreach ( $section['items'] as $item ) {
			if ( $slug === $item['slug'] ) {
				return array(
					'slug'    => $section_slug,
					'section' => $section,
					'item'    => $item,
				);
			}
		}
	}

	return null;
}

function ktheme_v2_page_hero_style_options(): array {
	return array(
		'clean'    => __( 'Clean', 'ktheme-v2' ),
		'image'    => __( 'Image Background', 'ktheme-v2' ),
		'kenburns' => __( 'Ken Burns', 'ktheme-v2' ),
		'split'    => __( 'Split Right Visual', 'ktheme-v2' ),
		'video'    => __( 'Video Background', 'ktheme-v2' ),
	);
}

function ktheme_v2_sanitize_page_hero_style( string $style ): string {
	return array_key_exists( $style, ktheme_v2_page_hero_style_options() ) ? $style : 'clean';
}

function ktheme_v2_sanitize_checkbox( $checked ): bool {
	return (bool) $checked;
}

function ktheme_v2_page_hero_default_image(): string {
	return 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80';
}

function ktheme_v2_page_hero_settings(): array {
	$style      = ktheme_v2_sanitize_page_hero_style( (string) get_theme_mod( 'ktheme_v2_page_hero_style', 'clean' ) );
	$text_color = sanitize_hex_color( (string) get_theme_mod( 'ktheme_v2_page_hero_text_color', '' ) );

	if ( ! $text_color ) {
		$text_color = in_array( $style, array( 'image', 'kenburns', 'video' ), true ) ? '#ffffff' : '#0e1320';
	}

	return array(
		'enabled'       => (bool) get_theme_mod( 'ktheme_v2_page_hero_enabled', true ),
		'style'         => $style,
		'image_url'     => esc_url_raw( (string) get_theme_mod( 'ktheme_v2_page_hero_image_url', ktheme_v2_page_hero_default_image() ) ),
		'youtube_url'   => esc_url_raw( (string) get_theme_mod( 'ktheme_v2_page_hero_youtube_url', '' ) ),
		'accent_color'  => sanitize_hex_color( (string) get_theme_mod( 'ktheme_v2_page_hero_accent_color', '#3a64f5' ) ) ?: '#3a64f5',
		'text_color'    => $text_color,
		'overlay_color' => sanitize_hex_color( (string) get_theme_mod( 'ktheme_v2_page_hero_overlay_color', '#0e1320' ) ) ?: '#0e1320',
	);
}

function ktheme_v2_extract_youtube_id( string $url ): string {
	if ( '' === $url ) {
		return '';
	}

	$parts = wp_parse_url( $url );
	if ( empty( $parts['host'] ) ) {
		return '';
	}

	$host = strtolower( (string) $parts['host'] );
	$path = trim( (string) ( $parts['path'] ?? '' ), '/' );

	if ( false !== strpos( $host, 'youtu.be' ) ) {
		return sanitize_text_field( strtok( $path, '/' ) );
	}

	if ( false !== strpos( $host, 'youtube.com' ) ) {
		if ( 0 === strpos( $path, 'embed/' ) ) {
			return sanitize_text_field( substr( $path, 6 ) );
		}

		if ( ! empty( $parts['query'] ) ) {
			parse_str( $parts['query'], $query );
			if ( ! empty( $query['v'] ) && is_string( $query['v'] ) ) {
				return sanitize_text_field( $query['v'] );
			}
		}
	}

	return '';
}

function ktheme_v2_render_page_hero_media( string $style, array $settings ): string {
	if ( 'clean' === $style || 'split' === $style ) {
		return '';
	}

	if ( 'video' === $style ) {
		$youtube_id = ktheme_v2_extract_youtube_id( $settings['youtube_url'] );
		if ( '' !== $youtube_id ) {
			$src = add_query_arg(
				array(
					'autoplay'       => '1',
					'mute'           => '1',
					'controls'       => '0',
					'loop'           => '1',
					'playlist'       => $youtube_id,
					'playsinline'    => '1',
					'modestbranding' => '1',
					'rel'            => '0',
				),
				'https://www.youtube.com/embed/' . rawurlencode( $youtube_id )
			);

			return '<div class="kt-page-hero__media" aria-hidden="true"><iframe src="' . esc_url( $src ) . '" title="' . esc_attr__( 'Background video', 'ktheme-v2' ) . '" loading="lazy"></iframe></div>';
		}
	}

	$image_url = '' !== $settings['image_url'] ? $settings['image_url'] : ktheme_v2_page_hero_default_image();

	return '<div class="kt-page-hero__media" aria-hidden="true"><img src="' . esc_url( $image_url ) . '" alt="" /></div>';
}

function ktheme_v2_render_page_hero_visual( string $style, array $settings ): string {
	if ( 'split' !== $style ) {
		return '';
	}

	$image_url = '' !== $settings['image_url'] ? $settings['image_url'] : ktheme_v2_page_hero_default_image();

	return '<div class="kt-page-hero__visual" aria-hidden="true">' .
		'<img src="' . esc_url( $image_url ) . '" alt="" />' .
		'<div class="kt-page-hero__side-card"><strong>' . esc_html__( '주일 안내', 'ktheme-v2' ) . '</strong><span>' . esc_html__( '1부 09:00 · 2부 11:00', 'ktheme-v2' ) . '</span></div>' .
		'</div>';
}

function ktheme_v2_render_page_hero_shortcode(): string {
	if ( ! is_page() ) {
		return '';
	}

	$settings = ktheme_v2_page_hero_settings();
	if ( ! $settings['enabled'] ) {
		return '';
	}

	$page = get_queried_object();
	if ( ! $page instanceof WP_Post ) {
		return '';
	}

	$current_slug = $page->post_name;
	$match        = ktheme_v2_find_page_section( $current_slug );
	$title        = get_the_title( $page );
	$description  = '';
	$tabs         = '';

	if ( null !== $match ) {
		$section     = $match['section'];
		$current     = $match['item'];
		$description = $current['description'] ?? $section['description'];

		$tab_links = array();
		foreach ( $section['items'] as $item ) {
			$is_active   = $current_slug === $item['slug'];
			$tab_links[] = sprintf(
				'<a class="%1$s" href="%2$s"%3$s>%4$s</a>',
				$is_active ? 'is-active' : '',
				esc_url( home_url( user_trailingslashit( $item['slug'] ) ) ),
				$is_active ? ' aria-current="page"' : '',
				esc_html( $item['label'] )
			);
		}

		$tabs = sprintf(
			'<nav class="kt-page-tabs" aria-label="%s">%s</nav>',
			esc_attr( $section['title'] . ' 하위 메뉴' ),
			implode( '', $tab_links )
		);
	}

	$breadcrumb = '<a href="' . esc_url( home_url( '/' ) ) . '"><svg class="kt-icon kt-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>HOME</a>';
	if ( null !== $match && $match['slug'] !== $current_slug ) {
		$breadcrumb .= '<span>›</span><a href="' . esc_url( home_url( user_trailingslashit( $match['slug'] ) ) ) . '">' . esc_html( $match['section']['title'] ) . '</a>';
	}
	$breadcrumb .= '<span>›</span><strong>' . esc_html( $title ) . '</strong>';

	$description_html = '' !== $description ? '<p>' . esc_html( $description ) . '</p>' : '';
	$style            = $settings['style'];
	$classes          = array(
		'kt-page-hero',
		'kt-shared-page-hero',
		'kt-shared-page-hero--' . $style,
	);
	$style_attr       = sprintf(
		'--kt-page-hero-accent:%1$s;--kt-page-hero-text:%2$s;--kt-page-hero-overlay:%3$s;',
		esc_attr( $settings['accent_color'] ),
		esc_attr( $settings['text_color'] ),
		esc_attr( $settings['overlay_color'] )
	);
	$media_html       = ktheme_v2_render_page_hero_media( $style, $settings );
	$visual_html      = ktheme_v2_render_page_hero_visual( $style, $settings );

	return '<section class="' . esc_attr( implode( ' ', $classes ) ) . '" style="' . esc_attr( $style_attr ) . '">' .
		$media_html .
		'<nav class="kt-breadcrumb" aria-label="' . esc_attr__( '현재 위치', 'ktheme-v2' ) . '">' . $breadcrumb . '</nav>' .
		'<div class="kt-page-hero__body"><div><h1>' . esc_html( $title ) . '</h1>' . $description_html . '</div>' . $visual_html . wp_kses_post( $tabs ) . '</div>' .
		'</section>';
}
add_shortcode( 'ktheme_page_hero', 'ktheme_v2_render_page_hero_shortcode' );

function ktheme_v2_sermon_card_items(): array {
	$image_base = get_template_directory_uri() . '/assets/images/generated/';

	return array(
		array(
			'image'  => $image_base . 'church-generated-01.jpg',
			'series' => '자리 지키기 "누가 왕인가"',
			'title'  => '선한 일도 있었던 사람!(르호보암)',
			'date'   => '2026.03.29',
		),
		array(
			'image'  => $image_base . 'church-generated-02.jpg',
			'series' => '자리 지키기 "누가 왕인가"',
			'title'  => '왕다리는 불순종이다!(솔로몬)',
			'date'   => '2026.03.22',
		),
		array(
			'image'  => $image_base . 'church-generated-03.jpg',
			'series' => '자리 지키기 "누가 왕인가"',
			'title'  => '끝까지 하나님의 이름으로(다윗)',
			'date'   => '2026.03.15',
		),
		array(
			'image'  => $image_base . 'church-generated-04.jpg',
			'series' => '자리 지키기 "누가 왕인가"',
			'title'  => '"끝까지 있어야 할 자리예!"(사울)',
			'date'   => '2026.03.07',
		),
		array(
			'image'  => $image_base . 'church-generated-05.jpg',
			'series' => '자유주제',
			'title'  => '[주일설교] 부흥의 주인공 / 김한요 목사(얼바인 베델교회)',
			'date'   => '2026.03.01',
		),
		array(
			'image'  => $image_base . 'church-generated-06.jpg',
			'series' => '자유주제',
			'title'  => '[토요설교] 갈 바를 알지 못할 때 / 김한요 목사(얼바인 베델교회)',
			'date'   => '2026.02.28',
		),
		array(
			'image'  => $image_base . 'church-generated-07.jpg',
			'series' => '2026-1차 변화산 "기다림은 낭비가 아닙니다"',
			'title'  => '[2026-1차 변화산]6. 기다림은 함께 걷는 길입니다',
			'date'   => '2026.02.28',
		),
		array(
			'image'  => $image_base . 'church-generated-08.jpg',
			'series' => '2026-1차 변화산 "기다림은 낭비가 아닙니다"',
			'title'  => '[2026-1차 변화산]5. 기다림은 적극적인 순종입니다',
			'date'   => '2026.02.27',
		),
		array(
			'image'  => $image_base . 'church-generated-09.jpg',
			'series' => '2026-1차 변화산 "기다림은 낭비가 아닙니다"',
			'title'  => '[2026-1차 변화산]4. 기다림은 인내로 익는 열매입니다',
			'date'   => '2026.02.26',
		),
	);
}

function ktheme_v2_render_sermon_item_card( array $item ): string {
	$url = home_url( user_trailingslashit( 'sermons' ) );

	return '<article class="kt-sermon-item-card">' .
		'<a class="kt-sermon-item-card__media" href="' . esc_url( $url ) . '">' .
			'<img src="' . esc_url( $item['image'] ) . '" alt="" loading="lazy" />' .
			'<span class="kt-sermon-item-card__play" aria-hidden="true"></span>' .
		'</a>' .
		'<div class="kt-sermon-item-card__series">' . esc_html( $item['series'] ) . '</div>' .
		'<h3 class="kt-sermon-item-card__title"><a href="' . esc_url( $url ) . '">' . esc_html( $item['title'] ) . '</a></h3>' .
		'<time class="kt-sermon-item-card__date" datetime="' . esc_attr( str_replace( '.', '-', $item['date'] ) ) . '">' . esc_html( $item['date'] ) . '</time>' .
		'</article>';
}

function ktheme_v2_render_sunday_worship_grid_shortcode(): string {
	$cards = array_map( 'ktheme_v2_render_sermon_item_card', ktheme_v2_sermon_card_items() );

	return '<section class="kt-sermon-feed kt-sermon-feed--static" aria-label="' . esc_attr__( '주일예배 설교 목록', 'ktheme-v2' ) . '">' .
		'<div class="kt-sermon-item-grid">' . implode( '', $cards ) . '</div>' .
		'<nav class="kt-sermon-pagination" aria-label="' . esc_attr__( '페이지', 'ktheme-v2' ) . '">' .
			'<span aria-hidden="true">|‹</span><span aria-hidden="true">‹</span>' .
			'<span class="page-numbers current" aria-current="page">1</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a>' .
			'<span aria-hidden="true">›</span><span aria-hidden="true">›|</span>' .
		'</nav>' .
		'</section>';
}
add_shortcode( 'ktheme_sunday_worship_grid', 'ktheme_v2_render_sunday_worship_grid_shortcode' );

function ktheme_v2_body_classes( array $classes ): array {
	if ( is_page( 'sunday-worship' ) ) {
		$classes[] = 'kt-page-sunday-worship';
	}

	return $classes;
}
add_filter( 'body_class', 'ktheme_v2_body_classes' );

function ktheme_v2_customize_register_page_hero( WP_Customize_Manager $wp_customize ): void {
	$wp_customize->add_section(
		'ktheme_v2_page_hero',
		array(
			'title'       => __( 'KTheme 공용 히어로', 'ktheme-v2' ),
			'description' => __( '모든 페이지 템플릿에서 사용하는 테마 종속 공용 히어로 설정입니다.', 'ktheme-v2' ),
			'priority'    => 35,
		)
	);

	$wp_customize->add_setting(
		'ktheme_v2_page_hero_enabled',
		array(
			'default'           => true,
			'sanitize_callback' => 'ktheme_v2_sanitize_checkbox',
		)
	);

	$wp_customize->add_control(
		'ktheme_v2_page_hero_enabled',
		array(
			'label'   => __( '공용 히어로 표시', 'ktheme-v2' ),
			'section' => 'ktheme_v2_page_hero',
			'type'    => 'checkbox',
		)
	);

	$wp_customize->add_setting(
		'ktheme_v2_page_hero_style',
		array(
			'default'           => 'clean',
			'sanitize_callback' => 'ktheme_v2_sanitize_page_hero_style',
		)
	);

	$wp_customize->add_control(
		'ktheme_v2_page_hero_style',
		array(
			'label'   => __( '히어로 스타일', 'ktheme-v2' ),
			'section' => 'ktheme_v2_page_hero',
			'type'    => 'select',
			'choices' => ktheme_v2_page_hero_style_options(),
		)
	);

	$wp_customize->add_setting(
		'ktheme_v2_page_hero_image_url',
		array(
			'default'           => ktheme_v2_page_hero_default_image(),
			'sanitize_callback' => 'esc_url_raw',
		)
	);

	$wp_customize->add_control(
		'ktheme_v2_page_hero_image_url',
		array(
			'label'       => __( '배경/우측 이미지 URL', 'ktheme-v2' ),
			'description' => __( 'Image, Ken Burns, Split 스타일에서 사용합니다.', 'ktheme-v2' ),
			'section'     => 'ktheme_v2_page_hero',
			'type'        => 'url',
		)
	);

	$wp_customize->add_setting(
		'ktheme_v2_page_hero_youtube_url',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		)
	);

	$wp_customize->add_control(
		'ktheme_v2_page_hero_youtube_url',
		array(
			'label'       => __( '유튜브 배경 영상 URL', 'ktheme-v2' ),
			'description' => __( 'Video Background 스타일에서 사용합니다.', 'ktheme-v2' ),
			'section'     => 'ktheme_v2_page_hero',
			'type'        => 'url',
		)
	);

	foreach (
		array(
			'ktheme_v2_page_hero_accent_color'  => array( __( '강조 색상', 'ktheme-v2' ), '#3a64f5' ),
			'ktheme_v2_page_hero_text_color'    => array( __( '텍스트 색상', 'ktheme-v2' ), '' ),
			'ktheme_v2_page_hero_overlay_color' => array( __( '오버레이 색상', 'ktheme-v2' ), '#0e1320' ),
		) as $setting_id => $config
	) {
		$wp_customize->add_setting(
			$setting_id,
			array(
				'default'           => $config[1],
				'sanitize_callback' => 'sanitize_hex_color',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$setting_id,
				array(
					'label'   => $config[0],
					'section' => 'ktheme_v2_page_hero',
				)
			)
		);
	}
}
add_action( 'customize_register', 'ktheme_v2_customize_register_page_hero' );

function ktheme_v2_normalize_front_content_labels( string $block_content ): string {
	if ( is_admin() ) {
		return $block_content;
	}

	return str_replace( '포토갤러리 전체보기', '전체보기', $block_content );
}
add_filter( 'render_block', 'ktheme_v2_normalize_front_content_labels', 20 );

function ktheme_v2_enqueue_front_animation_assets(): void {
	if ( is_admin() || ! is_front_page() ) {
		return;
	}

	wp_enqueue_script(
		'ktheme-v2-gsap',
		'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
		array(),
		'3.13.0',
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_v2_enqueue_front_animation_assets' );

function ktheme_v2_render_home_hero_slider_script(): void {
	if ( is_admin() || ! is_front_page() ) {
		return;
	}
	?>
	<script>
	(function () {
	  var hero = document.querySelector('.kt-hero') || document.querySelector('.style1-static > section');
	  if (!hero) return;

	  var image = hero.querySelector('img.w-full.h-full.object-cover') || hero.querySelector('.kt-hero__media img');
	  var content = hero.querySelector('[class*="md:col-span-7"]') || hero.querySelector('.kt-hero__inner > div');
	  var side = hero.querySelector('[class*="md:col-span-5"]') || hero.querySelector('.kt-hero-side');
	  if (!image || !content || !side) return;

	  var eyebrow = content.querySelector('.inline-flex') || content.querySelector('.kt-eyebrow');
	  var title = content.querySelector('h1');
	  var copy = content.querySelector('p');
	  var buttons = content.querySelectorAll('button, .kt-button');
	  var metaItems = content.querySelectorAll('dl dd');
	  var pager = side.querySelector('[class*="tracking-widest"]') || side.querySelector('.kt-hero-pager');
	  var controlButtons = side.querySelectorAll('button');
	  var previousButton = controlButtons[0];
	  var nextButton = controlButtons[1];
	  if (!title || !copy || !pager || !previousButton || !nextButton) return;

	  var slides = [
	    {
	      image: '/wp-content/themes/ktheme-v2/assets/images/generated/church-generated-01.jpg',
	      eyebrow: '2026 SPRING SERIES · VOL. 04',
	      title: '말씀에 머무는 자리,<br />은혜가 흐르는 공동체',
	      copy: '매주 새롭게 부어지는 은혜를 함께 누립니다. 예배와 말씀, 그리고 공동체 안에서 삶이 회복되는 자리로 여러분을 초대합니다.',
	      meta: ['머무름의 영성', '시편 23:1-6', '정한결 담임목사'],
	      primary: '이번 주 설교 보기',
	      secondary: '예배 시간 안내'
	    },
	    {
	      image: '/wp-content/themes/ktheme-v2/assets/images/generated/church-generated-08.jpg',
	      eyebrow: 'WORSHIP TOGETHER · SUNDAY',
	      title: '함께 예배하고,<br />함께 세워지는 시간',
	      copy: '주일의 예배 자리에서 하나님을 높이고 서로를 격려합니다. 처음 오신 분들도 편안하게 참여할 수 있도록 안내합니다.',
	      meta: ['주일예배', '오전 11:00 본당', '예배 안내'],
	      primary: '주일예배 보기',
	      secondary: '오시는 길'
	    },
	    {
	      image: '/wp-content/themes/ktheme-v2/assets/images/generated/church-generated-03.jpg',
	      eyebrow: 'NEXT GENERATION · FAITH',
	      title: '다음 세대가 복음 안에서<br />자라나는 교회',
	      copy: '아이들과 청소년, 청년들이 믿음과 삶을 함께 배워갑니다. 세대를 잇는 예배와 교육의 흐름을 만들어갑니다.',
	      meta: ['다음세대', '교육과 예배', '공동체 사역'],
	      primary: '다음세대 보기',
	      secondary: '공동체 안내'
	    },
	    {
	      image: '/wp-content/themes/ktheme-v2/assets/images/generated/church-generated-15.jpg',
	      eyebrow: 'MISSION & SERVE · LOCAL',
	      title: '지역과 세상을 섬기는<br />작은 발걸음',
	      copy: '가평교회는 복음의 마음으로 이웃을 섬깁니다. 선교와 섬김의 자리에서 함께 기도하고 동역합니다.',
	      meta: ['선교 안내', '지역 섬김', '후원과 동역'],
	      primary: '선교 안내 보기',
	      secondary: '섬김 사역'
	    }
	  ];

	  var current = 0;
	  var timer = null;
	  var isAnimating = false;
	  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	  var animated = [image, eyebrow, title, copy].concat(Array.prototype.slice.call(metaItems));

	  function setButtonLabel(button, label, preferLastNode) {
	    if (!button || !label) return;
	    var textNodes = Array.prototype.filter.call(button.childNodes, function (node) {
	      return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
	    });
	    var target = preferLastNode ? textNodes[textNodes.length - 1] : textNodes[0];
	    if (target) {
	      target.textContent = label;
	    }
	  }

	  function applySlide(slide) {
	    image.src = slide.image;
	    if (eyebrow) {
	      var line = eyebrow.querySelector('span');
	      eyebrow.textContent = '';
	      if (line) eyebrow.appendChild(line);
	      eyebrow.appendChild(document.createTextNode(slide.eyebrow));
	    }
	    title.innerHTML = slide.title;
	    copy.textContent = slide.copy;
	    slide.meta.forEach(function (value, metaIndex) {
	      if (metaItems[metaIndex]) metaItems[metaIndex].textContent = value;
	    });
	    setButtonLabel(buttons[0], slide.primary, true);
	    setButtonLabel(buttons[1], slide.secondary, false);
	  }

	  function updatePager() {
	    pager.innerHTML = String(current + 1).padStart(2, '0') + ' <span class="w-10 h-px bg-white/40"></span> ' + String(slides.length).padStart(2, '0');
	  }

	  function renderSlide(index, immediate) {
	    if (isAnimating && !immediate) return;
	    current = (index + slides.length) % slides.length;
	    var slide = slides[current];
	    var targets = animated.filter(Boolean);

	    if (immediate || prefersReducedMotion || !window.gsap) {
	      applySlide(slide);
	      updatePager();
	      return;
	    }

	    isAnimating = true;
	    window.gsap.timeline({
	      defaults: { ease: 'power2.out' },
	      onComplete: function () {
	        isAnimating = false;
	      }
	    })
	      .to(targets, { opacity: 0, y: -8, duration: 0.18, stagger: 0.025, ease: 'power1.in' })
	      .add(function () {
	        applySlide(slide);
	        updatePager();
	      })
	      .fromTo(image, { scale: 1.04 }, { scale: 1, opacity: 1, duration: 0.72, ease: 'power2.out' })
	      .fromTo(targets, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.42, stagger: 0.045 }, '<0.08');
	  }

	  function start() {
	    window.clearInterval(timer);
	    if (prefersReducedMotion) return;
	    timer = window.setInterval(function () {
	      renderSlide(current + 1);
	    }, 6500);
	  }

	  previousButton.addEventListener('click', function (event) {
	    event.preventDefault();
	    renderSlide(current - 1);
	    start();
	  });

	  nextButton.addEventListener('click', function (event) {
	    event.preventDefault();
	    renderSlide(current + 1);
	    start();
	  });

	  hero.addEventListener('mouseenter', function () { window.clearInterval(timer); });
	  hero.addEventListener('mouseleave', start);
	  hero.addEventListener('focusin', function () { window.clearInterval(timer); });
	  hero.addEventListener('focusout', start);

	  renderSlide(0, true);
	  start();
	})();
	</script>
	<?php
}
add_action( 'wp_footer', 'ktheme_v2_render_home_hero_slider_script', 20 );

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

function ktheme_v2_enqueue_design_library_assets(): void {
	if ( is_admin() || ! is_page( 'design-library' ) ) {
		return;
	}

	$script_path = get_theme_file_path( 'assets/js/design-library.js' );

	wp_enqueue_script(
		'ktheme-v2-design-library',
		get_theme_file_uri( 'assets/js/design-library.js' ),
		array(),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_v2_enqueue_design_library_assets' );

function ktheme_v2_enqueue_ministry_page_assets(): void {
	if ( is_admin() ) {
		return;
	}

	$ministry_slugs = array( 'newcomers', 'small-groups', 'next-generation', 'youth-ministry', 'senior-ministry', 'community' );

	if ( ! is_page( $ministry_slugs ) ) {
		return;
	}

	$carousel_path = get_theme_file_path( 'assets/js/photo-carousel.js' );

	wp_enqueue_script(
		'ktheme-v2-photo-carousel',
		get_theme_file_uri( 'assets/js/photo-carousel.js' ),
		array(),
		file_exists( $carousel_path ) ? (string) filemtime( $carousel_path ) : wp_get_theme()->get( 'Version' ),
		true
	);

	$modal_path = get_theme_file_path( 'assets/js/ministry-contact-modal.js' );

	wp_enqueue_script(
		'ktheme-v2-ministry-contact-modal',
		get_theme_file_uri( 'assets/js/ministry-contact-modal.js' ),
		array(),
		file_exists( $modal_path ) ? (string) filemtime( $modal_path ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_v2_enqueue_ministry_page_assets' );

/**
 * Photo Carousel Shortcode
 * Usage: [ktheme_photo_carousel preset="small-groups" eyebrow="..." title="..." description="..."]
 */
function ktheme_v2_render_photo_carousel_shortcode( array $atts ): string {
	$atts = shortcode_atts(
		array(
			'preset'      => 'default',
			'eyebrow'     => 'Photo Gallery',
			'title'       => '',
			'description' => '',
		),
		$atts,
		'ktheme_photo_carousel'
	);

	$preset_images = array(
		'newcomers'      => array( '01', '02', '03', '04', '05' ),
		'small-groups'   => array( '06', '07', '08', '09', '10' ),
		'next-generation'=> array( '11', '12', '13', '14', '15' ),
		'youth-ministry' => array( '02', '05', '08', '11', '14' ),
		'senior-ministry'=> array( '03', '06', '09', '12', '16' ),
		'default'        => array( '01', '04', '07', '10', '13', '16' ),
	);

	$images = $preset_images[ $atts['preset'] ] ?? $preset_images['default'];
	$base   = get_theme_file_uri( 'assets/images/generated/' );

	$slides_html = '';
	$dots_html   = '';

	foreach ( $images as $i => $num ) {
		$src          = esc_url( $base . 'church-generated-' . $num . '.jpg' );
		$current_attr = 0 === $i ? ' aria-current="true"' : '';
		$active_class = 0 === $i ? ' is-active' : '';

		$slides_html .= '<li class="kt-photo-carousel__slide" data-kt-carousel-slide>';
		$slides_html .= '<span class="kt-photo-carousel__image">';
		$slides_html .= '<img src="' . $src . '" alt="" loading="lazy" decoding="async" />';
		$slides_html .= '</span>';
		$slides_html .= '</li>';

		$dots_html .= '<button class="kt-photo-carousel__dot' . $active_class . '" data-kt-carousel-dot="' . $i . '"' . $current_attr . ' aria-label="' . ( $i + 1 ) . '번 슬라이드"><span></span></button>';
	}

	$total     = count( $images );
	$eyebrow   = esc_html( $atts['eyebrow'] );
	$title     = esc_html( $atts['title'] );
	$desc      = esc_html( $atts['description'] );
	$title_tag = $title ? '<h2>' . $title . '</h2>' : '';
	$desc_tag  = $desc ? '<p>' . $desc . '</p>' : '';

	$svg_prev = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	$svg_next = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

	$markup  = '<section class="kt-photo-carousel" data-kt-photo-carousel>';
	$markup .= '<div class="kt-photo-carousel__head"><div><span class="kt-card-label">' . $eyebrow . '</span>' . $title_tag . $desc_tag . '</div>';
	$markup .= '<div class="kt-photo-carousel__controls"><button class="kt-photo-carousel__button" data-kt-carousel-prev aria-label="이전 슬라이드">' . $svg_prev . '</button>';
	$markup .= '<span class="kt-photo-carousel__count"><span data-kt-carousel-current>01</span> / ' . sprintf( '%02d', $total ) . '</span>';
	$markup .= '<button class="kt-photo-carousel__button" data-kt-carousel-next aria-label="다음 슬라이드">' . $svg_next . '</button></div></div>';
	$markup .= '<div class="kt-photo-carousel__viewport" data-kt-carousel-viewport tabindex="0" role="region" aria-label="사진 갤러리"><ul class="kt-photo-carousel__track">' . $slides_html . '</ul></div>';
	$markup .= '<div class="kt-photo-carousel__footer"><div class="kt-photo-carousel__dots">' . $dots_html . '</div></div>';
	$markup .= '</section>';

	// The [ktheme_photo_carousel] shortcode lives inside a Gutenberg
	// "Shortcode" block, which is expanded while do_blocks() walks the page
	// (before wpautop() runs). wpautop() then re-processes our already
	// expanded, block-level-tag-heavy markup and injects stray <br>/<p> tags
	// (e.g. an extra empty <p> after the header row), which broke the
	// .kt-photo-carousel__head flex layout ("space-between" then pushed the
	// controls away from the real right edge toward the phantom <p>).
	//
	// To make the carousel immune to this, return a plain-text placeholder
	// token here (wpautop can't meaningfully mangle a tag-free string) and
	// swap the real markup back in from an output buffer right before the
	// page is sent to the browser, i.e. after every content filter has run.
	$token = '@@KTHEME_CAROUSEL_' . substr( md5( $markup ), 0, 12 ) . '@@';
	$GLOBALS['ktheme_v2_carousel_registry'][ $token ] = $markup;

	return $token;
}
add_shortcode( 'ktheme_photo_carousel', 'ktheme_v2_render_photo_carousel_shortcode' );

/**
 * Starts an output buffer on the front end so the placeholder tokens from
 * ktheme_v2_render_photo_carousel_shortcode() can be swapped back to real
 * markup after wpautop() (and any other content filter) has already run.
 */
function ktheme_v2_maybe_buffer_carousel_output(): void {
	if ( is_admin() ) {
		return;
	}
	ob_start( 'ktheme_v2_restore_carousel_markup' );
}
add_action( 'template_redirect', 'ktheme_v2_maybe_buffer_carousel_output' );

/**
 * Output buffer callback: replaces carousel placeholder tokens with their
 * real markup. Also strips any <p>...</p> wrapper that wpautop may have
 * added around the (otherwise tag-free) token text.
 */
function ktheme_v2_restore_carousel_markup( string $html ): string {
	if ( empty( $GLOBALS['ktheme_v2_carousel_registry'] ) ) {
		return $html;
	}

	foreach ( $GLOBALS['ktheme_v2_carousel_registry'] as $token => $markup ) {
		$html = preg_replace( '#<p>\s*' . preg_quote( $token, '#' ) . '\s*</p>#i', $markup, $html );
		$html = str_replace( $token, $markup, $html );
	}

	return $html;
}
