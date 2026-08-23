<?php

require_once get_template_directory() . '/includes/class-ktheme-modu-updater.php';
KTheme_Modu_Updater::boot();

if ( ! function_exists( 'ktheme_modu_setup' ) ) {
	function ktheme_modu_setup(): void {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'post-thumbnails' );
		add_editor_style( 'style.css' );

		$pattern_categories = array(
			'ktheme-pages'        => __( 'KTheme Pages', 'ktheme-modu' ),
			'ktheme-sections'     => __( 'KTheme Sections', 'ktheme-modu' ),
			'ktheme-queries'      => __( 'KTheme Queries', 'ktheme-modu' ),
			'ktheme-integrations' => __( 'KTheme Integrations', 'ktheme-modu' ),
			'ktheme-headers'      => __( 'KTheme Headers', 'ktheme-modu' ),
			'ktheme-footers'      => __( 'KTheme Footers', 'ktheme-modu' ),
		);

		foreach ( $pattern_categories as $category => $label ) {
			register_block_pattern_category(
				$category,
				array( 'label' => $label )
			);
		}

		register_nav_menus(
			array(
				'primary'          => __( 'Header Primary Menu', 'ktheme-modu' ),
				'utility'          => __( 'Header Utility Menu', 'ktheme-modu' ),
				'footer-worship'   => __( 'Footer Worship Menu', 'ktheme-modu' ),
				'footer-community' => __( 'Footer Community Menu', 'ktheme-modu' ),
				'footer-links'     => __( 'Footer Links Menu', 'ktheme-modu' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'ktheme_modu_setup' );

function ktheme_modu_text( string $encoded ): string {
	$decoded = json_decode( '"' . $encoded . '"' );

	return is_string( $decoded ) ? $decoded : $encoded;
}

function ktheme_modu_default_menu_items(): array {
	return array(
		array(
			'title'    => ktheme_modu_text( '\uC608\uBC30 \uC548\uB0B4' ),
			'url'      => home_url( '/worship/' ),
			'children' => array(
				array( 'title' => ktheme_modu_text( '\uC8FC\uC77C\uC608\uBC30' ), 'url' => home_url( '/sunday-worship/' ) ),
				array( 'title' => ktheme_modu_text( '\uC218\uC694\uC608\uBC30' ), 'url' => home_url( '/wednesday-worship/' ) ),
				array( 'title' => ktheme_modu_text( '\uC0C8\uBCBD\uAE30\uB3C4' ), 'url' => home_url( '/dawn-prayer/' ) ),
				array( 'title' => ktheme_modu_text( '\uC8FC\uBCF4' ), 'url' => home_url( '/bulletin/' ) ),
			),
		),
		array(
			'title'    => ktheme_modu_text( '\uACF5\uB3D9\uCCB4' ),
			'url'      => home_url( '/community/' ),
			'children' => array(
				array( 'title' => ktheme_modu_text( '\uC0C8\uAC00\uC871' ), 'url' => home_url( '/newcomers/' ) ),
				array( 'title' => ktheme_modu_text( '\uC18C\uADF8\uB8F9/\uAD6C\uC5ED' ), 'url' => home_url( '/small-groups/' ) ),
				array( 'title' => ktheme_modu_text( '\uB2E4\uC74C\uC138\uB300' ), 'url' => home_url( '/next-generation/' ) ),
				array( 'title' => ktheme_modu_text( '\uCCAD\uB144\uBD80' ), 'url' => home_url( '/youth-ministry/' ) ),
				array( 'title' => ktheme_modu_text( '\uC7A5\uB144/\uC2DC\uB2C8\uC5B4' ), 'url' => home_url( '/senior-ministry/' ) ),
			),
		),
		array(
			'title'    => ktheme_modu_text( '\uC591\uC721' ),
			'url'      => home_url( '/training/' ),
			'children' => array(
				array( 'title' => ktheme_modu_text( '\uC0C8\uAC00\uC871 \uACFC\uC815' ), 'url' => home_url( '/new-family-course/' ) ),
				array( 'title' => ktheme_modu_text( '\uC131\uACBD\uACF5\uBD80' ), 'url' => home_url( '/bible-study/' ) ),
				array( 'title' => ktheme_modu_text( '\uC81C\uC790\uD6C8\uB828' ), 'url' => home_url( '/discipleship/' ) ),
				array( 'title' => ktheme_modu_text( 'QT/\uBB35\uC0C1' ), 'url' => home_url( '/qt/' ) ),
			),
		),
		array(
			'title'    => ktheme_modu_text( '\uC120\uAD50 & \uC12C\uAE40' ),
			'url'      => home_url( '/mission/' ),
			'children' => array(
				array( 'title' => ktheme_modu_text( '\uC120\uAD50 \uC548\uB0B4' ), 'url' => home_url( '/mission/' ) ),
				array( 'title' => ktheme_modu_text( '\uC12C\uAE40 \uC0AC\uC5ED' ), 'url' => home_url( '/serve/' ) ),
				array( 'title' => ktheme_modu_text( '\uD6C4\uC6D0 \uC548\uB0B4' ), 'url' => home_url( '/support/' ) ),
			),
		),
		array(
			'title'    => ktheme_modu_text( '\uBBF8\uB514\uC5B4' ),
			'url'      => home_url( '/media/' ),
			'children' => array(
				array( 'title' => ktheme_modu_text( '\uC124\uAD50' ), 'url' => home_url( '/sermons/' ) ),
				array( 'title' => ktheme_modu_text( '\uAD50\uD68C\uC18C\uC2DD' ), 'url' => home_url( '/news/' ) ),
				array( 'title' => ktheme_modu_text( '\uAD50\uB2E8\uC18C\uC2DD' ), 'url' => home_url( '/denomination-news/' ) ),
				array( 'title' => ktheme_modu_text( '\uD589\uC0AC\uC568\uBC94' ), 'url' => home_url( '/albums/' ) ),
				array( 'title' => ktheme_modu_text( '\uC601\uC0C1' ), 'url' => home_url( '/videos/' ) ),
				array( 'title' => ktheme_modu_text( '\uC790\uB8CC\uC2E4' ), 'url' => home_url( '/library/' ) ),
			),
		),
		array(
			'title'    => ktheme_modu_text( '\uAD50\uD68C\uC18C\uAC1C' ),
			'url'      => home_url( '/about/' ),
			'children' => array(
				array( 'title' => ktheme_modu_text( '\uBE44\uC804' ), 'url' => home_url( '/vision/' ) ),
				array( 'title' => ktheme_modu_text( '\uC12C\uAE30\uB294 \uC0AC\uB78C\uB4E4' ), 'url' => home_url( '/people/' ) ),
				array( 'title' => ktheme_modu_text( '\uAD50\uD68C\uC5F0\uD601' ), 'url' => home_url( '/history/' ) ),
				array( 'title' => ktheme_modu_text( '\uC5F0\uAC04\uC77C\uC815' ), 'url' => home_url( '/annual-schedule/' ) ),
				array( 'title' => ktheme_modu_text( '\uC624\uC2DC\uB294 \uAE38' ), 'url' => home_url( '/location/' ) ),
			),
		),
		array(
			'title'    => ktheme_modu_text( '\uD589\uC815' ),
			'url'      => home_url( '/admin-guide/' ),
			'children' => array(
				array( 'title' => ktheme_modu_text( '\uC628\uB77C\uC778 \uD5CC\uAE08' ), 'url' => home_url( '/giving/' ) ),
				array( 'title' => ktheme_modu_text( '\uC99D\uBA85\uC11C \uBC1C\uAE09' ), 'url' => home_url( '/documents/' ) ),
				array( 'title' => ktheme_modu_text( '\uC7A5\uC18C \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'url' => home_url( '/facility-request/' ) ),
				array( 'title' => ktheme_modu_text( '\uCC28\uB7C9 \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'url' => home_url( '/vehicle-request/' ) ),
			),
		),
	);
}

function ktheme_modu_default_utility_items(): array {
	return array(
		array( 'title' => ktheme_modu_text( '\uC0C8\uAC00\uC871 \uB4F1\uB85D' ), 'url' => home_url( '/newcomers/' ) ),
		array( 'title' => ktheme_modu_text( '\uC624\uC2DC\uB294 \uAE38' ), 'url' => home_url( '/location/' ) ),
		array( 'title' => ktheme_modu_text( '\uC628\uB77C\uC778 \uD5CC\uAE08' ), 'url' => home_url( '/giving/' ) ),
		array( 'title' => ktheme_modu_text( '\uB85C\uADF8\uC778' ), 'url' => home_url( '/wp-login.php' ) ),
	);
}

function ktheme_modu_get_menu_object_for_location( string $theme_location, int $fallback_menu_id = 0 ) {
	$locations = get_nav_menu_locations();

	if ( ! empty( $locations[ $theme_location ] ) ) {
		$menu = wp_get_nav_menu_object( $locations[ $theme_location ] );
		if ( $menu ) {
			return $menu;
		}
	}

	if ( $fallback_menu_id > 0 ) {
		$menu = wp_get_nav_menu_object( $fallback_menu_id );
		if ( $menu ) {
			return $menu;
		}
	}

	return null;
}

function ktheme_modu_get_menu_tree( string $theme_location, int $fallback_menu_id = 0, array $fallback_items = array() ): array {
	$menu = ktheme_modu_get_menu_object_for_location( $theme_location, $fallback_menu_id );

	if ( ! $menu ) {
		return $fallback_items;
	}

	$items = wp_get_nav_menu_items(
		$menu,
		array(
			'update_post_term_cache' => false,
		)
	);

	if ( empty( $items ) || ! is_array( $items ) ) {
		return $fallback_items;
	}

	$nodes = array();
	foreach ( $items as $item ) {
		$id           = (int) $item->ID;
		$parent       = (int) $item->menu_item_parent;
		$nodes[ $id ] = array(
			'id'       => $id,
			'parent'   => $parent,
			'title'    => wp_strip_all_tags( $item->title ),
			'url'      => $item->url,
			'target'   => $item->target,
			'xfn'      => $item->xfn,
			'object_id' => isset( $item->object_id ) ? (int) $item->object_id : 0,
			'children' => array(),
		);
	}

	$tree = array();
	foreach ( $nodes as $id => &$node ) {
		if ( $node['parent'] > 0 && isset( $nodes[ $node['parent'] ] ) ) {
			$nodes[ $node['parent'] ]['children'][] = &$node;
		} else {
			$tree[] = &$node;
		}
	}
	unset( $node );

	return $tree;
}

function ktheme_modu_normalize_menu_path( string $url ): string {
	$path = wp_parse_url( $url, PHP_URL_PATH );

	if ( ! is_string( $path ) || '' === $path ) {
		return '';
	}

	return user_trailingslashit( '/' . trim( rawurldecode( $path ), '/' ) );
}

function ktheme_modu_current_menu_path(): string {
	$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( (string) $_SERVER['REQUEST_URI'] ) : '';
	$path        = wp_parse_url( $request_uri, PHP_URL_PATH );

	if ( ! is_string( $path ) || '' === $path ) {
		return user_trailingslashit( '/' );
	}

	return user_trailingslashit( '/' . trim( rawurldecode( $path ), '/' ) );
}

function ktheme_modu_is_menu_item_active( array $item ): bool {
	$object_id = isset( $item['object_id'] ) ? (int) $item['object_id'] : 0;

	if ( $object_id > 0 && get_queried_object_id() === $object_id ) {
		return true;
	}

	$url = isset( $item['url'] ) ? (string) $item['url'] : '';

	if ( '' === $url || '#' === $url ) {
		return false;
	}

	$item_path = ktheme_modu_normalize_menu_path( $url );

	return '' !== $item_path && $item_path === ktheme_modu_current_menu_path();
}

function ktheme_modu_menu_link( array $item, string $class = '', bool $mark_active = false ): string {
	$title = isset( $item['title'] ) ? (string) $item['title'] : '';
	$url   = isset( $item['url'] ) ? (string) $item['url'] : '#';
	$attrs = array(
		'href' => esc_url( $url ),
	);
	$is_active = $mark_active && ktheme_modu_is_menu_item_active( $item );
	$classes   = array_filter( array( $class, $is_active ? 'is-active' : '' ) );

	if ( ! empty( $classes ) ) {
		$attrs['class'] = implode( ' ', $classes );
	}

	if ( $is_active ) {
		$attrs['aria-current'] = 'page';
	}

	if ( ! empty( $item['target'] ) ) {
		$attrs['target'] = esc_attr( $item['target'] );
	}

	if ( ! empty( $item['xfn'] ) ) {
		$attrs['rel'] = esc_attr( $item['xfn'] );
	}

	$attr_html = '';
	foreach ( $attrs as $name => $value ) {
		$attr_html .= ' ' . esc_attr( $name ) . '="' . $value . '"';
	}

	return '<a' . $attr_html . '>' . esc_html( $title ) . '</a>';
}

function ktheme_modu_render_utility_menu(): string {
	$items = ktheme_modu_get_menu_tree( 'utility', 0, ktheme_modu_default_utility_items() );

	if ( empty( $items ) ) {
		return '';
	}

	$html = '<nav class="kt-utility-nav" aria-label="' . esc_attr__( '유틸리티 메뉴', 'ktheme-modu' ) . '">';
	foreach ( $items as $item ) {
		$html .= ktheme_modu_menu_link( $item );
	}
	$html .= '</nav>';

	return $html;
}

function ktheme_modu_render_primary_menu(): string {
	$items = ktheme_modu_get_menu_tree( 'primary', 0, ktheme_modu_default_menu_items() );

	if ( empty( $items ) ) {
		return '';
	}

	$total = count( $items );
	$html  = '<nav class="kt-nav" aria-label="' . esc_attr__( '주요 메뉴', 'ktheme-modu' ) . '"><ul class="kt-nav__list">';

	foreach ( array_values( $items ) as $index => $item ) {
		$children       = ! empty( $item['children'] ) && is_array( $item['children'] ) ? $item['children'] : array();
		$dropdown_class = 'kt-nav__dropdown' . ( $index === $total - 1 ? ' kt-nav__dropdown--right' : '' );
		$is_active      = ktheme_modu_is_menu_item_active( $item );

		foreach ( $children as $child ) {
			if ( ktheme_modu_is_menu_item_active( $child ) ) {
				$is_active = true;
				break;
			}
		}

		$html .= '<li class="kt-nav__item' . ( $is_active ? ' is-active' : '' ) . '">';
		$html .= '<a class="kt-nav__link" href="' . esc_url( (string) $item['url'] ) . '"><span>' . esc_html( (string) $item['title'] ) . '</span>';
		if ( false !== strpos( (string) $item['url'], '/worship' ) ) {
			$html .= '<span class="kt-nav-live">LIVE</span>';
		}
		$html .= '</a>';

		if ( ! empty( $children ) ) {
		$html .= '<div class="' . esc_attr( $dropdown_class ) . '">';
			foreach ( $children as $child ) {
				$html .= ktheme_modu_menu_link( $child, '', true );
			}
			$html .= '</div>';
		}

		$html .= '</li>';
	}

	$html .= '</ul></nav>';

	return $html;
}

function ktheme_modu_render_mega_menu(): string {
	$items = ktheme_modu_get_menu_tree( 'primary', 0, ktheme_modu_default_menu_items() );

	if ( empty( $items ) ) {
		return '';
	}

	$html  = '<div class="kt-mega-menu" id="kt-mega-menu" aria-hidden="true">';
	$html .= '<div class="kt-container kt-mega-menu__inner">';
	$html .= '<div class="kt-mega-menu__head"><strong>' . esc_html__( '전체 메뉴', 'ktheme-modu' ) . '</strong><span>' . esc_html__( '예배, 공동체, 양육과 행정 안내를 한곳에서 확인하세요.', 'ktheme-modu' ) . '</span></div>';
	$html .= '<div class="kt-mega-menu__grid">';

	foreach ( $items as $item ) {
		$html .= '<section><h3>' . ktheme_modu_menu_link( $item ) . '</h3>';
		if ( ! empty( $item['children'] ) && is_array( $item['children'] ) ) {
			foreach ( $item['children'] as $child ) {
				$html .= ktheme_modu_menu_link( $child );
			}
		}
		$html .= '</section>';
	}

	$html .= '</div></div></div>';

	return $html;
}

function ktheme_modu_compact_shortcode_html( string $html ): string {
	$html = preg_replace( '/>\s+</', '><', trim( $html ) );

	return str_replace( array( "\r", "\n", "\t" ), '', is_string( $html ) ? $html : '' );
}

function ktheme_modu_render_header_shortcode(): string {
	ob_start();
	?>
	<div class="kt-topbar">
		<div class="kt-container kt-topbar__inner">
			<a class="kt-topbar__notice" href="<?php echo esc_url( home_url( '/news/' ) ); ?>">
				<span class="kt-dot" aria-hidden="true"></span>
				<span class="kt-topbar__notice-label"><?php echo esc_html( ktheme_modu_text( '\uACF5\uC9C0' ) ); ?></span>
				<span class="kt-topbar__notice-title"><?php echo esc_html( ktheme_modu_text( '2026 \uD558\uBC18\uAE30 \uC591\uC721\uACFC\uC815 \uC2E0\uCCAD \uC548\uB0B4' ) ); ?></span>
				<span class="kt-topbar__notice-more"><?php echo esc_html( ktheme_modu_text( '\uC18C\uC2DD \uC804\uCCB4\uBCF4\uAE30' ) ); ?><span aria-hidden="true">&rarr;</span></span>
			</a>
			<?php echo ktheme_modu_render_utility_menu(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	</div>

	<div class="kt-header" data-kt-header>
		<div class="kt-container kt-header__inner">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="kt-brand" aria-label="<?php echo esc_attr__( '우리교회 홈', 'ktheme-modu' ); ?>">
				<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/theme-logo.png' ) ); ?>" alt="<?php echo esc_attr__( '우리교회 로고', 'ktheme-modu' ); ?>" />
				<span class="kt-brand__name"><?php echo esc_html__( '우리교회', 'ktheme-modu' ); ?></span>
			</a>

			<?php echo ktheme_modu_render_primary_menu(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

			<div class="kt-header__actions">
				<button class="kt-icon-button" type="button" aria-label="<?php echo esc_attr__( '검색 열기', 'ktheme-modu' ); ?>" aria-controls="kt-header-search" aria-expanded="false" data-kt-search-toggle>
					<svg class="kt-icon kt-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
				</button>
				<a class="kt-header-register" href="<?php echo esc_url( home_url( '/newcomers/' ) ); ?>">
					<span class="kt-header-register__label"><?php echo esc_html( ktheme_modu_text( '\uC0C8\uAC00\uC871 \uB4F1\uB85D' ) ); ?></span>
					<svg class="kt-header-register__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
				</a>
				<button class="kt-mega-toggle" type="button" aria-label="<?php echo esc_attr__( '전체 메뉴 열기', 'ktheme-modu' ); ?>" aria-controls="kt-mega-menu" aria-expanded="false" data-kt-mega-toggle>
					<span></span><span></span><span></span>
				</button>
			</div>
		</div>

		<div class="kt-header-search" id="kt-header-search" aria-hidden="true">
			<div class="kt-container kt-header-search__inner">
				<form class="kt-header-search__form" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
					<label class="screen-reader-text" for="kt-header-search-input"><?php echo esc_html__( '검색어', 'ktheme-modu' ); ?></label>
					<input id="kt-header-search-input" type="search" name="s" placeholder="<?php echo esc_attr__( '검색어를 입력하세요', 'ktheme-modu' ); ?>" autocomplete="off" />
					<button type="submit">
						<svg class="kt-icon kt-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
						<span><?php echo esc_html__( '검색', 'ktheme-modu' ); ?></span>
					</button>
				</form>
			</div>
		</div>

		<?php echo ktheme_modu_render_mega_menu(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>

	<?php
	return ktheme_modu_compact_shortcode_html( (string) ob_get_clean() );
}

function ktheme_modu_render_dynamic_template_part_block( string $block_content, array $block ): string {
	if ( 'core/html' !== ( $block['blockName'] ?? '' ) ) {
		return $block_content;
	}

	$inner_html = (string) ( $block['innerHTML'] ?? $block_content );

	if ( false !== strpos( $inner_html, 'data-ktheme-dynamic-header' ) ) {
		return ktheme_modu_render_header_shortcode();
	}

	if ( false !== strpos( $inner_html, 'data-ktheme-dynamic-footer' ) ) {
		return ktheme_modu_render_footer_shortcode();
	}

	return $block_content;
}
add_filter( 'render_block', 'ktheme_modu_render_dynamic_template_part_block', 10, 2 );

/**
 * Keep legacy demo markup portable while presets are being extracted.
 * New templates must use WordPress asset APIs or the preset asset contract.
 */
function ktheme_modu_resolve_legacy_asset_urls( string $block_content, array $block ): string {
	unset( $block );
	$legacy_generated_base = '/wp-content/themes/ktheme-modu/assets/images/generated/';
	$replacement_assets    = array(
		'church-generated-01.jpg' => 'ktheme-demo-community-01.png',
		'church-generated-02.jpg' => 'ktheme-demo-community-02.png',
		'church-generated-03.jpg' => 'ktheme-demo-community-03.png',
		'church-generated-04.jpg' => 'ktheme-demo-community-04.png',
		'church-generated-05.jpg' => 'ktheme-demo-community-01.png',
		'church-generated-06.jpg' => 'ktheme-demo-community-02.png',
		'church-generated-07.jpg' => 'ktheme-demo-community-03.png',
		'church-generated-08.jpg' => 'ktheme-demo-community-04.png',
		'church-generated-09.jpg' => 'ktheme-demo-community-01.png',
		'church-generated-10.jpg' => 'ktheme-demo-community-02.png',
		'church-generated-11.jpg' => 'ktheme-demo-community-03.png',
		'church-generated-12.jpg' => 'ktheme-demo-community-04.png',
		'church-generated-13.jpg' => 'ktheme-demo-community-01.png',
		'church-generated-14.jpg' => 'ktheme-demo-community-02.png',
		'church-generated-15.jpg' => 'ktheme-demo-community-03.png',
		'church-generated-16.jpg' => 'ktheme-demo-community-04.png',
		'church-generated-17.jpg' => 'ktheme-demo-community-01.png',
	);

	foreach ( $replacement_assets as $legacy_file => $replacement_file ) {
		$block_content = str_replace(
			$legacy_generated_base . $legacy_file,
			get_theme_file_uri( 'assets/images/' . $replacement_file ),
			$block_content
		);
	}

	return str_replace(
		'/wp-content/themes/ktheme-modu/',
		trailingslashit( get_theme_file_uri() ),
		$block_content
	);
}
add_filter( 'render_block', 'ktheme_modu_resolve_legacy_asset_urls', 15, 2 );

function ktheme_modu_footer_menu_html( string $theme_location, string $fallback_title, array $fallback_items ): string {
	$items = ktheme_modu_get_menu_tree( $theme_location, 0, $fallback_items );
	if ( empty( $items ) ) {
		return '';
	}

	$menu  = ktheme_modu_get_menu_object_for_location( $theme_location );
	$title = $menu ? $menu->name : $fallback_title;
	$html  = '<div><h4>' . esc_html( $title ) . '</h4><ul>';

	foreach ( $items as $item ) {
		$html .= '<li>' . ktheme_modu_menu_link( $item ) . '</li>';
	}

	$html .= '</ul></div>';

	return $html;
}

function ktheme_modu_has_assigned_menu( string $theme_location ): bool {
	$locations = get_nav_menu_locations();

	return ! empty( $locations[ $theme_location ] ) && (bool) wp_get_nav_menu_object( $locations[ $theme_location ] );
}

function ktheme_modu_footer_primary_columns_html(): string {
	$items = ktheme_modu_get_menu_tree( 'primary', 9, ktheme_modu_default_menu_items() );
	if ( empty( $items ) ) {
		return '';
	}

	$html = '';
	foreach ( $items as $item ) {
		$children = ! empty( $item['children'] ) && is_array( $item['children'] ) ? $item['children'] : array();
		$links    = ! empty( $children ) ? $children : array( $item );

		$html .= '<div><h4>' . esc_html( (string) $item['title'] ) . '</h4><ul>';
		foreach ( $links as $link ) {
			$html .= '<li>' . ktheme_modu_menu_link( $link ) . '</li>';
		}
		$html .= '</ul></div>';
	}

	return $html;
}

function ktheme_modu_render_footer_shortcode(): string {
	$footer_worship = array_slice( ktheme_modu_default_menu_items()[0]['children'], 0 );
	$footer_comm    = array_merge(
		array_slice( ktheme_modu_default_menu_items()[1]['children'], 0, 3 ),
		array_slice( ktheme_modu_default_menu_items()[2]['children'], 0, 2 )
	);
	$footer_links   = array(
		array( 'title' => ktheme_modu_text( '\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68' ), 'url' => home_url( '/privacy-policy/' ) ),
		array( 'title' => ktheme_modu_text( '\uC774\uBA54\uC77C \uBB34\uB2E8\uC218\uC9D1\uAC70\uBD80' ), 'url' => home_url( '/email-policy/' ) ),
	);
	$has_footer_menus = ktheme_modu_has_assigned_menu( 'footer-worship' ) || ktheme_modu_has_assigned_menu( 'footer-community' ) || ktheme_modu_has_assigned_menu( 'footer-links' );

	ob_start();
	?>
	<div class="kt-footer">
		<div class="kt-container kt-footer__grid">
			<div class="kt-footer__brand">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="kt-brand kt-brand--mark-only" aria-label="<?php echo esc_attr__( '가?교????', 'ktheme-modu' ); ?>">
					<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/theme-logo.png' ) ); ?>" alt="<?php echo esc_attr__( 'Site logo', 'ktheme-modu' ); ?>" />
				</a>
				<p><?php echo esc_html__( '?음 ??? ?께 ?배?고, 지?? ?상???기??교회?니??', 'ktheme-modu' ); ?></p>
			</div>

			<nav class="kt-footer-menu-grid" aria-label="<?php echo esc_attr__( '?터 주요 메뉴', 'ktheme-modu' ); ?>">
				<?php
				if ( $has_footer_menus ) {
					echo ktheme_modu_footer_menu_html( 'footer-worship', ktheme_modu_text( '\uC608\uBC30' ), $footer_worship ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					echo ktheme_modu_footer_menu_html( 'footer-community', ktheme_modu_text( '\uACF5\uB3D9\uCCB4/\uC591\uC721' ), $footer_comm ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					echo ktheme_modu_footer_menu_html( 'footer-links', ktheme_modu_text( '\uC815\uCC45' ), $footer_links ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				} else {
					echo ktheme_modu_footer_primary_columns_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
				?>
			</nav>

			<div class="kt-footer__connect">
				<h4><?php echo esc_html__( '바로가?', 'ktheme-modu' ); ?></h4>
				<details class="kt-family-dropdown">
					<summary>
						<span><?php echo esc_html__( '????이??', 'ktheme-modu' ); ?></span>
						<svg class="kt-icon kt-icon--sm kt-family-dropdown__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
					</summary>
					<div class="kt-family-dropdown__menu">
						<a href="#" target="_blank" rel="noopener"><?php echo esc_html__( '??예?교?로??', 'ktheme-modu' ); ?></a>
						<a href="#" target="_blank" rel="noopener"><?php echo esc_html__( '총회교육?원부', 'ktheme-modu' ); ?></a>
						<a href="#" target="_blank" rel="noopener"><?php echo esc_html__( '?국기독공보', 'ktheme-modu' ); ?></a>
					</div>
				</details>
				<div class="kt-social-links" aria-label="<?php echo esc_attr__( '주요 SNS 바로가?', 'ktheme-modu' ); ?>">
					<a href="#" aria-label="YouTube"><svg class="kt-icon kt-icon--sm" viewBox="0 0 24 24" fill="currentColor"><path d="M23 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 2.5 12 2.5 12 2.5s-4.6 0-7.8.4c-.5 0-1.5.1-2.3 1-.7.7-.9 2.3-.9 2.3S.7 8 .7 9.9v1.7c0 1.9.3 3.7.3 3.7s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .3 8 .3s4.6 0 7.8-.4c.5 0 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.7V9.9C23.3 8 23 6.2 23 6.2zM9.5 13.6V7.7l5.9 3z"/></svg></a>
					<a href="#" aria-label="Instagram"><svg class="kt-icon kt-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg></a>
					<a href="#" aria-label="Facebook"><svg class="kt-icon kt-icon--sm" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg></a>
				</div>
			</div>
		</div>

		<div class="kt-footer__bottom">
			<div class="kt-container kt-footer__bottom-inner">
				<p><?php echo esc_html__( 'Add your address in the Site Editor.', 'ktheme-modu' ); ?></p>
				<p><?php echo esc_html__( 'Add your contact details in the Site Editor.', 'ktheme-modu' ); ?></p>
				<p><?php echo esc_html__( '© Your organization. All rights reserved.', 'ktheme-modu' ); ?></p>
			</div>
		</div>
	</div>
	<?php
	return ktheme_modu_compact_shortcode_html( (string) ob_get_clean() );
}

function ktheme_modu_required_pages(): array {
	return array(
		array( 'title' => ktheme_modu_text( '\uAD50\uD68C\uC18C\uAC1C' ), 'slug' => 'about', 'template' => 'page-about' ),
		array( 'title' => ktheme_modu_text( '\uBE44\uC804' ), 'slug' => 'vision' ),
		array( 'title' => ktheme_modu_text( '\uC12C\uAE30\uB294 \uC0AC\uB78C\uB4E4' ), 'slug' => 'people' ),
		array( 'title' => ktheme_modu_text( '\uAD50\uD68C\uC5F0\uD601' ), 'slug' => 'history' ),
		array( 'title' => ktheme_modu_text( '\uC5F0\uAC04\uC77C\uC815' ), 'slug' => 'annual-schedule' ),
		array( 'title' => ktheme_modu_text( '\uC624\uC2DC\uB294 \uAE38' ), 'slug' => 'location' ),
		array( 'title' => ktheme_modu_text( '\uC608\uBC30 \uC548\uB0B4' ), 'slug' => 'worship', 'template' => 'page-worship' ),
		array( 'title' => ktheme_modu_text( '\uC8FC\uC77C\uC608\uBC30' ), 'slug' => 'sunday-worship', 'template' => 'page-sunday-worship' ),
		array( 'title' => ktheme_modu_text( '\uC218\uC694\uC608\uBC30' ), 'slug' => 'wednesday-worship', 'template' => 'page-wednesday-worship' ),
		array( 'title' => ktheme_modu_text( '\uC0C8\uBCBD\uAE30\uB3C4' ), 'slug' => 'dawn-prayer', 'template' => 'page-dawn-prayer' ),
		array( 'title' => ktheme_modu_text( '\uC8FC\uBCF4' ), 'slug' => 'bulletin', 'template' => 'page-bulletin' ),
		array( 'title' => ktheme_modu_text( '\uACF5\uB3D9\uCCB4' ), 'slug' => 'community', 'template' => 'page-community' ),
		array( 'title' => ktheme_modu_text( '\uC0C8\uAC00\uC871' ), 'slug' => 'newcomers', 'template' => 'page-newcomers' ),
		array( 'title' => ktheme_modu_text( '\uC18C\uADF8\uB8F9/\uAD6C\uC5ED' ), 'slug' => 'small-groups', 'template' => 'page-small-groups' ),
		array( 'title' => ktheme_modu_text( '\uB2E4\uC74C\uC138\uB300' ), 'slug' => 'next-generation', 'template' => 'page-next-generation' ),
		array( 'title' => ktheme_modu_text( '\uCCAD\uB144\uBD80' ), 'slug' => 'youth-ministry', 'template' => 'page-youth-ministry' ),
		array( 'title' => ktheme_modu_text( '\uC7A5\uB144/\uC2DC\uB2C8\uC5B4' ), 'slug' => 'senior-ministry', 'template' => 'page-senior-ministry' ),
		array( 'title' => ktheme_modu_text( '\uC591\uC721' ), 'slug' => 'training', 'template' => 'page-training' ),
		array( 'title' => ktheme_modu_text( '\uC0C8\uAC00\uC871 \uACFC\uC815' ), 'slug' => 'new-family-course' ),
		array( 'title' => ktheme_modu_text( '\uC131\uACBD\uACF5\uBD80' ), 'slug' => 'bible-study' ),
		array( 'title' => ktheme_modu_text( '\uC81C\uC790\uD6C8\uB828' ), 'slug' => 'discipleship' ),
		array( 'title' => ktheme_modu_text( 'QT/\uBB35\uC0C1' ), 'slug' => 'qt' ),
		array( 'title' => ktheme_modu_text( '\uC120\uAD50 \uC548\uB0B4' ), 'slug' => 'mission' ),
		array( 'title' => ktheme_modu_text( '\uC12C\uAE40 \uC0AC\uC5ED' ), 'slug' => 'serve' ),
		array( 'title' => ktheme_modu_text( '\uD6C4\uC6D0 \uC548\uB0B4' ), 'slug' => 'support' ),
		array( 'title' => ktheme_modu_text( '\uBBF8\uB514\uC5B4' ), 'slug' => 'media', 'template' => 'page-media' ),
		array( 'title' => ktheme_modu_text( '\uAD50\uD68C\uC18C\uC2DD' ), 'slug' => 'news' ),
		array( 'title' => ktheme_modu_text( '\uAD50\uB2E8\uC18C\uC2DD' ), 'slug' => 'denomination-news' ),
		array( 'title' => ktheme_modu_text( '\uC601\uC0C1' ), 'slug' => 'videos' ),
		array( 'title' => ktheme_modu_text( '\uC790\uB8CC\uC2E4' ), 'slug' => 'library', 'template' => 'page-library' ),
		array( 'title' => ktheme_modu_text( '\uD589\uC815' ), 'slug' => 'admin-guide', 'template' => 'page-admin-guide' ),
		array( 'title' => ktheme_modu_text( '\uC628\uB77C\uC778 \uD5CC\uAE08' ), 'slug' => 'giving' ),
		array( 'title' => ktheme_modu_text( '\uC99D\uBA85\uC11C \uBC1C\uAE09' ), 'slug' => 'documents' ),
		array( 'title' => ktheme_modu_text( '\uC7A5\uC18C \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'facility-request' ),
		array( 'title' => ktheme_modu_text( '\uCC28\uB7C9 \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'vehicle-request' ),
		array( 'title' => ktheme_modu_text( '\uBB38\uC758\uD558\uAE30' ), 'slug' => 'contact' ),
		array( 'title' => ktheme_modu_text( '\uB85C\uADF8\uC778' ), 'slug' => 'login' ),
		array( 'title' => ktheme_modu_text( '\uD68C\uC6D0\uAC00\uC785' ), 'slug' => 'register' ),
		array( 'title' => ktheme_modu_text( '\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68' ), 'slug' => 'privacy-policy' ),
		array( 'title' => ktheme_modu_text( '\uC774\uBA54\uC77C \uBB34\uB2E8\uC218\uC9D1\uAC70\uBD80' ), 'slug' => 'email-policy' ),
	);
}

function ktheme_modu_page_parent_map(): array {
	return array(
		'vision'             => 'about',
		'people'             => 'about',
		'history'            => 'about',
		'annual-schedule'    => 'about',
		'location'           => 'about',
		'sunday-worship'     => 'worship',
		'wednesday-worship'  => 'worship',
		'dawn-prayer'        => 'worship',
		'bulletin'           => 'worship',
		'newcomers'          => 'community',
		'small-groups'       => 'community',
		'next-generation'    => 'community',
		'youth-ministry'     => 'community',
		'senior-ministry'    => 'community',
		'new-family-course'  => 'training',
		'bible-study'        => 'training',
		'discipleship'       => 'training',
		'qt'                 => 'training',
		'serve'              => 'mission',
		'support'            => 'mission',
		'news'               => 'media',
		'denomination-news'  => 'media',
		'videos'             => 'media',
		'library'            => 'media',
		'giving'             => 'admin-guide',
		'documents'          => 'admin-guide',
		'facility-request'   => 'admin-guide',
		'vehicle-request'    => 'admin-guide',
		'contact'            => 'admin-guide',
	);
}

function ktheme_modu_get_page_by_slug( string $slug ): ?WP_Post {
	global $wpdb;

	$page_id = (int) $wpdb->get_var(
		$wpdb->prepare(
			"SELECT ID FROM {$wpdb->posts} WHERE post_type = 'page' AND post_name = %s AND post_status NOT IN ('trash','auto-draft') ORDER BY CASE WHEN post_status = 'publish' THEN 0 ELSE 1 END, ID ASC LIMIT 1",
			$slug
		)
	);

	if ( $page_id <= 0 ) {
		return null;
	}

	$page = get_post( $page_id );

	return $page instanceof WP_Post ? $page : null;
}

function ktheme_modu_page_seed_content( string $title ): string {
	return '<!-- wp:paragraph {"className":"kt-empty"} -->' .
		'<p class="kt-empty">' . esc_html( $title . ' ' . ktheme_modu_text( '\uCF58\uD150\uCE20\uB97C \uC900\uBE44\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.' ) ) . '</p>' .
		'<!-- /wp:paragraph -->';
}

function ktheme_modu_ensure_required_pages(): void {
	if ( ! is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
		return;
	}

	$version = wp_get_theme()->get( 'Version' );
	if ( get_option( 'ktheme_modu_required_pages_version' ) === $version ) {
		return;
	}

	foreach ( ktheme_modu_required_pages() as $page ) {
		$existing = ktheme_modu_get_page_by_slug( $page['slug'] );

		if ( ! $existing ) {
			$parent_id = 0;
			$parents   = ktheme_modu_page_parent_map();

			if ( ! empty( $parents[ $page['slug'] ] ) ) {
				$parent = ktheme_modu_get_page_by_slug( $parents[ $page['slug'] ] );
				if ( $parent instanceof WP_Post ) {
					$parent_id = (int) $parent->ID;
				}
			}

			$page_id = wp_insert_post(
				array(
					'post_title'   => $page['title'],
					'post_name'    => $page['slug'],
					'post_status'  => 'publish',
					'post_type'    => 'page',
					'post_parent'  => $parent_id,
					'post_content' => ktheme_modu_page_seed_content( $page['title'] ),
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

	update_option( 'ktheme_modu_required_pages_version', $version );
}
// Starter content and page creation belong to the Companion Plugin's opt-in
// onboarding flow. A theme must never create or mutate site pages on admin load.

function ktheme_modu_flat_child_page_slugs(): array {
	return array(
		'vision',
		'people',
		'history',
		'annual-schedule',
		'location',
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

function ktheme_modu_use_flat_child_page_links( string $link, int $post_id ): string {
	$page = get_post( $post_id );

	if ( $page instanceof WP_Post && 'page' === $page->post_type && in_array( $page->post_name, ktheme_modu_flat_child_page_slugs(), true ) ) {
		return home_url( user_trailingslashit( $page->post_name ) );
	}

	return $link;
}
add_filter( 'page_link', 'ktheme_modu_use_flat_child_page_links', 10, 2 );

function ktheme_modu_resolve_flat_child_page_request( array $query_vars ): array {
	if ( empty( $query_vars['pagename'] ) || ! is_string( $query_vars['pagename'] ) ) {
		return $query_vars;
	}

	$slug = trim( $query_vars['pagename'], '/' );
	if ( ! in_array( $slug, ktheme_modu_flat_child_page_slugs(), true ) ) {
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
add_filter( 'request', 'ktheme_modu_resolve_flat_child_page_request' );

function ktheme_modu_resolve_flat_child_page_parse_request( WP $wp ): void {
	$slug = trim( (string) $wp->request, '/' );

	if ( ! in_array( $slug, ktheme_modu_flat_child_page_slugs(), true ) ) {
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
add_action( 'parse_request', 'ktheme_modu_resolve_flat_child_page_parse_request', 1 );

function ktheme_modu_keep_flat_child_page_canonical( $redirect_url, string $requested_url ) {
	$path = trim( (string) wp_parse_url( $requested_url, PHP_URL_PATH ), '/' );

	if ( in_array( $path, ktheme_modu_flat_child_page_slugs(), true ) ) {
		return false;
	}

	return $redirect_url;
}
add_filter( 'redirect_canonical', 'ktheme_modu_keep_flat_child_page_canonical', 10, 2 );

function ktheme_modu_redirect_legacy_slugs(): void {
	$path = trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' );

	if ( 'worship-guide' === $path ) {
		wp_safe_redirect( home_url( '/worship/' ), 301 );
		exit;
	}

	if ( 'ministries' === $path ) {
		wp_safe_redirect( home_url( '/community/' ), 301 );
		exit;
	}

	$parts = array_values( array_filter( explode( '/', $path ) ) );
	if ( 2 === count( $parts ) ) {
		$legacy_parents = array( 'about', 'worship', 'community', 'training', 'media', 'admin-guide', 'mission' );
		$child_slug     = $parts[1];

		if ( in_array( $parts[0], $legacy_parents, true ) && in_array( $child_slug, ktheme_modu_flat_child_page_slugs(), true ) ) {
			wp_safe_redirect( home_url( user_trailingslashit( $child_slug ) ), 301 );
			exit;
		}
	}
}
add_action( 'template_redirect', 'ktheme_modu_redirect_legacy_slugs' );

function ktheme_modu_page_sections(): array {
	return array(
		'about'       => array(
			'title'       => ktheme_modu_text( '\uAD50\uD68C\uC18C\uAC1C' ),
			'description' => ktheme_modu_text( '\uAD50\uD68C\uC758 \uC815\uCCB4\uC131, \uBE44\uC804, \uC0AC\uB78C\uB4E4\uACFC \uC5F0\uD601\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_modu_text( '\uAD50\uD68C\uC18C\uAC1C' ), 'slug' => 'about', 'description' => ktheme_modu_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC0AC\uC5ED \uBC29\uD5A5\uACFC \uC18C\uAC1C\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uBE44\uC804' ), 'slug' => 'vision', 'description' => ktheme_modu_text( '\uAD50\uD68C\uAC00 \uD568\uAED8 \uD5A5\uD574\uAC00\uB294 \uBE44\uC804\uACFC \uAC00\uCE58\uB97C \uB098\uB215\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC12C\uAE30\uB294 \uC0AC\uB78C\uB4E4' ), 'slug' => 'people', 'description' => ktheme_modu_text( '\uAC00\uD3C9\uAD50\uD68C\uB97C \uC12C\uAE30\uB294 \uC0AC\uB78C\uB4E4\uC744 \uC18C\uAC1C\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uAD50\uD68C\uC5F0\uD601' ), 'slug' => 'history', 'description' => ktheme_modu_text( '\uAC00\uD3C9\uAD50\uD68C\uAC00 \uAC78\uC5B4\uC628 \uC2DC\uAC04\uACFC \uAE30\uB85D\uC744 \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC5F0\uAC04\uC77C\uC815' ), 'slug' => 'annual-schedule', 'description' => ktheme_modu_text( '\uC62C\uD574\uC758 \uC8FC\uC694 \uC0AC\uC5ED\uACFC \uC77C\uC815\uC744 \uD55C\uB208\uC5D0 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uC624\uC2DC\uB294 \uAE38' ), 'slug' => 'location', 'description' => ktheme_modu_text( '\uC608\uBC30\uB2F9 \uC704\uCE58\uC640 \uBC29\uBB38 \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
			),
		),
		'worship'     => array(
			'title'       => ktheme_modu_text( '\uC608\uBC30 \uC548\uB0B4' ),
			'description' => ktheme_modu_text( '\uC8FC\uC77C\uC608\uBC30\uBD80\uD130 \uC0C8\uBCBD\uAE30\uB3C4\uAE4C\uC9C0, \uD568\uAED8 \uC608\uBC30\uD558\uB294 \uC2DC\uAC04\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_modu_text( '\uC608\uBC30 \uC548\uB0B4' ), 'slug' => 'worship', 'description' => ktheme_modu_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC608\uBC30 \uD750\uB984\uACFC \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uC8FC\uC77C\uC608\uBC30' ), 'slug' => 'sunday-worship', 'description' => ktheme_modu_text( '\uC8FC\uC77C\uC608\uBC30 \uC2DC\uAC04\uACFC \uC7A5\uC18C, \uC608\uBC30 \uC815\uBCF4\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC218\uC694\uC608\uBC30' ), 'slug' => 'wednesday-worship', 'description' => ktheme_modu_text( '\uC218\uC694\uC608\uBC30\uC640 \uAE30\uB3C4\uD68C \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uC0C8\uBCBD\uAE30\uB3C4' ), 'slug' => 'dawn-prayer', 'description' => ktheme_modu_text( '\uD558\uB8E8\uB97C \uAE30\uB3C4\uB85C \uC5EC\uB294 \uC0C8\uBCBD\uAE30\uB3C4 \uC2DC\uAC04\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC8FC\uBCF4' ), 'slug' => 'bulletin', 'description' => ktheme_modu_text( '\uC8FC\uAC04 \uC608\uBC30 \uC21C\uC11C\uC640 \uAD50\uD68C \uC18C\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694.' ) ),
			),
		),
		'community'   => array(
			'title'       => ktheme_modu_text( '\uACF5\uB3D9\uCCB4' ),
			'description' => ktheme_modu_text( '\uC0C8\uAC00\uC871, \uC18C\uADF8\uB8F9, \uB2E4\uC74C\uC138\uB300\uC640 \uCCAD\uB144\uBD80\uAC00 \uD568\uAED8 \uC790\uB77C\uAC00\uB294 \uACF5\uB3D9\uCCB4\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_modu_text( '\uACF5\uB3D9\uCCB4' ), 'slug' => 'community', 'description' => ktheme_modu_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uACF5\uB3D9\uCCB4 \uC0AC\uC5ED\uC744 \uD55C\uB208\uC5D0 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uC0C8\uAC00\uC871' ), 'slug' => 'newcomers', 'description' => ktheme_modu_text( '\uCC98\uC74C \uC624\uC2E0 \uBD84\uB4E4\uC744 \uC704\uD55C \uB4F1\uB85D\uACFC \uC815\uCC29 \uACFC\uC815\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC18C\uADF8\uB8F9/\uAD6C\uC5ED' ), 'slug' => 'small-groups', 'description' => ktheme_modu_text( '\uC0B6\uC744 \uB098\uB204\uACE0 \uC11C\uB85C\uB97C \uB3CC\uBCF4\uB294 \uC18C\uADF8\uB8F9 \uACF5\uB3D9\uCCB4\uB97C \uC18C\uAC1C\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uB2E4\uC74C\uC138\uB300' ), 'slug' => 'next-generation', 'description' => ktheme_modu_text( '\uC544\uC774\uB4E4\uACFC \uCCAD\uC18C\uB144\uC774 \uBCF5\uC74C \uC548\uC5D0\uC11C \uC790\uB77C\uAC00\uB294 \uC608\uBC30\uC640 \uAD50\uC721\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uCCAD\uB144\uBD80' ), 'slug' => 'youth-ministry', 'description' => ktheme_modu_text( '\uCCAD\uB144\uB4E4\uC774 \uBBFF\uC74C\uACFC \uC0B6\uC744 \uD568\uAED8 \uC138\uC6CC\uAC00\uB294 \uC790\uB9AC\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC7A5\uB144/\uC2DC\uB2C8\uC5B4' ), 'slug' => 'senior-ministry', 'description' => ktheme_modu_text( '\uC7A5\uB144\uACFC \uC2DC\uB2C8\uC5B4 \uC131\uB3C4\uB4E4\uC744 \uC704\uD55C \uC0AC\uC5ED\uACFC \uBAA8\uC784\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
			),
		),
		'training'    => array(
			'title'       => ktheme_modu_text( '\uC591\uC721' ),
			'description' => ktheme_modu_text( '\uC0C8\uAC00\uC871 \uACFC\uC815\uBD80\uD130 \uC81C\uC790\uD6C8\uB828\uAE4C\uC9C0, \uBBFF\uC74C\uC758 \uC131\uC7A5\uC744 \uB3D5\uB294 \uC591\uC721 \uACFC\uC815\uC785\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_modu_text( '\uC591\uC721' ), 'slug' => 'training', 'description' => ktheme_modu_text( '\uC2E0\uC559\uC758 \uAE30\uCD08\uBD80\uD130 \uC131\uC7A5\uAE4C\uC9C0 \uD568\uAED8 \uAC78\uC5B4\uAC11\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC0C8\uAC00\uC871 \uACFC\uC815' ), 'slug' => 'new-family-course', 'description' => ktheme_modu_text( '\uAD50\uD68C\uB97C \uC774\uD574\uD558\uACE0 \uACF5\uB3D9\uCCB4\uC5D0 \uC815\uCC29\uD558\uB294 \uACFC\uC815\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC131\uACBD\uACF5\uBD80' ), 'slug' => 'bible-study', 'description' => ktheme_modu_text( '\uB9D0\uC500\uC744 \uAE4A\uC774 \uBC30\uC6B0\uACE0 \uC0B6\uC5D0 \uC801\uC6A9\uD558\uB294 \uACF5\uBD80\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC81C\uC790\uD6C8\uB828' ), 'slug' => 'discipleship', 'description' => ktheme_modu_text( '\uC608\uC218\uB2D8\uC758 \uC81C\uC790\uB85C \uC0B4\uC544\uAC00\uB3C4\uB85D \uB3D5\uB294 \uD6C8\uB828 \uACFC\uC815\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( 'QT/\uBB35\uC0C1' ), 'slug' => 'qt', 'description' => ktheme_modu_text( '\uB9E4\uC77C \uB9D0\uC500\uC73C\uB85C \uD558\uB8E8\uB97C \uC5EC\uB294 \uBB35\uC0C1 \uC790\uB8CC\uC785\uB2C8\uB2E4.' ) ),
			),
		),
		'mission'     => array(
			'title'       => ktheme_modu_text( '\uC120\uAD50 \uC548\uB0B4' ),
			'description' => ktheme_modu_text( '\uAD6D\uB0B4\uC640 \uD574\uC678 \uC120\uAD50\uB97C \uD558\uB098\uC758 \uC120\uAD50 \uC548\uB0B4\uC5D0\uC11C \uD1B5\uD569\uD574 \uBCF4\uC5EC\uB4DC\uB9BD\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_modu_text( '\uC120\uAD50 \uC548\uB0B4' ), 'slug' => 'mission', 'description' => ktheme_modu_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC120\uAD50 \uBC29\uD5A5\uACFC \uD611\uB825 \uC0AC\uC5ED\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC12C\uAE40 \uC0AC\uC5ED' ), 'slug' => 'serve', 'description' => ktheme_modu_text( '\uAD50\uD68C\uC640 \uC9C0\uC5ED\uC744 \uC12C\uAE30\uB294 \uC0AC\uC5ED\uC744 \uC18C\uAC1C\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uD6C4\uC6D0 \uC548\uB0B4' ), 'slug' => 'support', 'description' => ktheme_modu_text( '\uC120\uAD50\uC640 \uC12C\uAE40\uC5D0 \uD568\uAED8\uD558\uB294 \uD6C4\uC6D0 \uBC29\uBC95\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
			),
		),
		'media'       => array(
			'title'       => ktheme_modu_text( '\uBBF8\uB514\uC5B4' ),
			'description' => ktheme_modu_text( '\uAD50\uD68C\uC18C\uC2DD, \uAD50\uB2E8\uC18C\uC2DD, \uC124\uAD50, \uC601\uC0C1\uACFC \uC790\uB8CC\uB97C \uD55C\uACF3\uC5D0\uC11C \uBCF4\uC138\uC694.' ),
			'items'       => array(
				array( 'label' => ktheme_modu_text( '\uBBF8\uB514\uC5B4' ), 'slug' => 'media', 'description' => ktheme_modu_text( '\uAC00\uD3C9\uAD50\uD68C\uC758 \uC8FC\uC694 \uCF58\uD150\uCE20\uB97C \uBAA8\uC544 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uAD50\uD68C\uC18C\uC2DD' ), 'slug' => 'news', 'description' => ktheme_modu_text( '\uAD50\uD68C\uC758 \uC0C8\uB85C\uC6B4 \uC18C\uC2DD\uACFC \uACF5\uC9C0\uB97C \uC804\uD574\uB4DC\uB9BD\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uAD50\uB2E8\uC18C\uC2DD' ), 'slug' => 'denomination-news', 'description' => ktheme_modu_text( '\uAD50\uB2E8\uC758 \uC8FC\uC694 \uC18C\uC2DD\uC744 \uD568\uAED8 \uD655\uC778\uD558\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uC124\uAD50' ), 'slug' => 'sermons', 'description' => ktheme_modu_text( '\uC8FC\uC77C\uC608\uBC30\uC640 \uC8FC\uC694 \uC608\uBC30\uC758 \uB9D0\uC500\uC744 \uB2E4\uC2DC \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uD589\uC0AC\uC568\uBC94' ), 'slug' => 'albums', 'description' => ktheme_modu_text( '\uAD50\uD68C \uD589\uC0AC\uC640 \uACF5\uB3D9\uCCB4\uC758 \uC7A5\uBA74\uC744 \uC0AC\uC9C4\uC73C\uB85C \uB098\uB215\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC601\uC0C1' ), 'slug' => 'videos', 'description' => ktheme_modu_text( '\uAD50\uD68C \uC0AC\uC5ED\uACFC \uC608\uBC30 \uC601\uC0C1\uC744 \uBAA8\uC544 \uBCF4\uC138\uC694.' ) ),
				array( 'label' => ktheme_modu_text( '\uC790\uB8CC\uC2E4' ), 'slug' => 'library', 'description' => ktheme_modu_text( '\uC0AC\uC5ED\uACFC \uC2E0\uC559\uC0DD\uD65C\uC5D0 \uD544\uC694\uD55C \uC790\uB8CC\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4.' ) ),
			),
		),
		'admin-guide' => array(
			'title'       => ktheme_modu_text( '\uD589\uC815' ),
			'description' => ktheme_modu_text( '\uD5CC\uAE08, \uC99D\uBA85\uC11C, \uACF5\uAC04\uACFC \uCC28\uB7C9 \uC2E0\uCCAD, \uBB38\uC758\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ),
			'items'       => array(
				array( 'label' => ktheme_modu_text( '\uD589\uC815' ), 'slug' => 'admin-guide', 'description' => ktheme_modu_text( '\uAD50\uD68C \uD589\uC815 \uC0AC\uD56D\uACFC \uC8FC\uC694 \uC2E0\uCCAD \uCC3D\uAD6C\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC628\uB77C\uC778 \uD5CC\uAE08' ), 'slug' => 'giving', 'description' => ktheme_modu_text( '\uC628\uB77C\uC778 \uD5CC\uAE08 \uBC29\uBC95\uACFC \uACC4\uC88C \uC815\uBCF4\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC99D\uBA85\uC11C \uBC1C\uAE09' ), 'slug' => 'documents', 'description' => ktheme_modu_text( '\uAD50\uC801 \uBC0F \uD589\uC815 \uC99D\uBA85\uC11C \uBC1C\uAE09 \uC2E0\uCCAD\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uC7A5\uC18C \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'facility-request', 'description' => ktheme_modu_text( '\uAD50\uD68C \uACF5\uAC04 \uC0AC\uC6A9 \uC2E0\uCCAD \uC808\uCC28\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uCC28\uB7C9 \uC0AC\uC6A9 \uC2E0\uCCAD' ), 'slug' => 'vehicle-request', 'description' => ktheme_modu_text( '\uAD50\uD68C \uCC28\uB7C9 \uC0AC\uC6A9 \uC2E0\uCCAD \uC548\uB0B4\uC785\uB2C8\uB2E4.' ) ),
				array( 'label' => ktheme_modu_text( '\uBB38\uC758\uD558\uAE30' ), 'slug' => 'contact', 'description' => ktheme_modu_text( '\uAD50\uD68C\uC5D0 \uD544\uC694\uD55C \uBB38\uC758\uB97C \uB0A8\uACA8\uC8FC\uC138\uC694.' ) ),
			),
		),
	);
}

function ktheme_modu_find_page_section( string $slug ): ?array {
	foreach ( ktheme_modu_page_sections() as $section_slug => $section ) {
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

function ktheme_modu_page_hero_style_options(): array {
	return array(
		'clean'    => __( 'Clean', 'ktheme-modu' ),
		'image'    => __( 'Image Background', 'ktheme-modu' ),
		'kenburns' => __( 'Ken Burns', 'ktheme-modu' ),
		'split'    => __( 'Split Right Visual', 'ktheme-modu' ),
		'video'    => __( 'Video Background', 'ktheme-modu' ),
	);
}

function ktheme_modu_sanitize_page_hero_style( string $style ): string {
	return array_key_exists( $style, ktheme_modu_page_hero_style_options() ) ? $style : 'clean';
}

function ktheme_modu_sanitize_checkbox( $checked ): bool {
	return (bool) $checked;
}

function ktheme_modu_page_hero_default_image(): string {
	return 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80';
}

function ktheme_modu_page_hero_settings(): array {
	$style      = ktheme_modu_sanitize_page_hero_style( (string) get_theme_mod( 'ktheme_modu_page_hero_style', 'clean' ) );
	$text_color = sanitize_hex_color( (string) get_theme_mod( 'ktheme_modu_page_hero_text_color', '' ) );

	if ( ! $text_color ) {
		$text_color = in_array( $style, array( 'image', 'kenburns', 'video' ), true ) ? '#ffffff' : '#0e1320';
	}

	return array(
		'enabled'       => (bool) get_theme_mod( 'ktheme_modu_page_hero_enabled', true ),
		'style'         => $style,
		'image_url'     => esc_url_raw( (string) get_theme_mod( 'ktheme_modu_page_hero_image_url', ktheme_modu_page_hero_default_image() ) ),
		'youtube_url'   => esc_url_raw( (string) get_theme_mod( 'ktheme_modu_page_hero_youtube_url', '' ) ),
		'accent_color'  => sanitize_hex_color( (string) get_theme_mod( 'ktheme_modu_page_hero_accent_color', '#3a64f5' ) ) ?: '#3a64f5',
		'text_color'    => $text_color,
		'overlay_color' => sanitize_hex_color( (string) get_theme_mod( 'ktheme_modu_page_hero_overlay_color', '#0e1320' ) ) ?: '#0e1320',
	);
}

function ktheme_modu_extract_youtube_id( string $url ): string {
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

function ktheme_modu_render_page_hero_media( string $style, array $settings ): string {
	if ( 'clean' === $style || 'split' === $style ) {
		return '';
	}

	if ( 'video' === $style ) {
		$youtube_id = ktheme_modu_extract_youtube_id( $settings['youtube_url'] );
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

			return '<div class="kt-page-hero__media" aria-hidden="true"><iframe src="' . esc_url( $src ) . '" title="' . esc_attr__( 'Background video', 'ktheme-modu' ) . '" loading="lazy"></iframe></div>';
		}
	}

	$image_url = '' !== $settings['image_url'] ? $settings['image_url'] : ktheme_modu_page_hero_default_image();

	return '<div class="kt-page-hero__media" aria-hidden="true"><img src="' . esc_url( $image_url ) . '" alt="" /></div>';
}

function ktheme_modu_render_page_hero_visual( string $style, array $settings ): string {
	if ( 'split' !== $style ) {
		return '';
	}

	$image_url = '' !== $settings['image_url'] ? $settings['image_url'] : ktheme_modu_page_hero_default_image();

	return '<div class="kt-page-hero__visual" aria-hidden="true">' .
		'<img src="' . esc_url( $image_url ) . '" alt="" />' .
		'<div class="kt-page-hero__side-card"><strong>' . esc_html__( '주일 ?내', 'ktheme-modu' ) . '</strong><span>' . esc_html__( '1부 09:00 · 2부 11:00', 'ktheme-modu' ) . '</span></div>' .
		'</div>';
}

function ktheme_modu_render_page_hero_shortcode(): string {
	if ( ! is_page() ) {
		return '';
	}

	$settings = ktheme_modu_page_hero_settings();
	if ( ! $settings['enabled'] ) {
		return '';
	}

	$page = get_queried_object();
	if ( ! $page instanceof WP_Post ) {
		return '';
	}

	$current_slug = $page->post_name;
	$match        = ktheme_modu_find_page_section( $current_slug );
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
			esc_attr( $section['title'] . ' ?위 메뉴' ),
			implode( '', $tab_links )
		);
	}

	$breadcrumb = '<a href="' . esc_url( home_url( '/' ) ) . '"><svg class="kt-icon kt-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>HOME</a>';
	if ( null !== $match && $match['slug'] !== $current_slug ) {
		$breadcrumb .= '<span>/</span><a href="' . esc_url( home_url( user_trailingslashit( $match['slug'] ) ) ) . '">' . esc_html( $match['section']['title'] ) . '</a>';
	}
	$breadcrumb .= '<span>/</span><strong>' . esc_html( $title ) . '</strong>';

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
	$media_html       = ktheme_modu_render_page_hero_media( $style, $settings );
	$visual_html      = ktheme_modu_render_page_hero_visual( $style, $settings );

	return '<section class="' . esc_attr( implode( ' ', $classes ) ) . '" style="' . esc_attr( $style_attr ) . '">' .
		$media_html .
		'<nav class="kt-breadcrumb" aria-label="' . esc_attr__( '?재 ?치', 'ktheme-modu' ) . '">' . $breadcrumb . '</nav>' .
		'<div class="kt-page-hero__body"><div><h1>' . esc_html( $title ) . '</h1>' . $description_html . '</div>' . $visual_html . wp_kses_post( $tabs ) . '</div>' .
		'</section>';
}

function ktheme_modu_component_icon( string $name, string $class = 'kt-icon kt-icon--sm', string $stroke_width = '1.8' ): string {
	$paths = array(
		'arrow-right' => '<path d="M5 12h14M13 5l7 7-7 7"/>',
		'map-pin'     => '<path d="M12 21s-7-4.5-7-11a7 7 0 1 1 14 0c0 6.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
		'phone'       => '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2z"/>',
	);

	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}

	return '<svg class="' . esc_attr( $class ) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' . esc_attr( $stroke_width ) . '" aria-hidden="true">' . $paths[ $name ] . '</svg>';
}

function ktheme_modu_component_section_head( array $args ): string {
	$id          = isset( $args['id'] ) ? (string) $args['id'] : '';
	$eyebrow     = isset( $args['eyebrow'] ) ? (string) $args['eyebrow'] : '';
	$title       = isset( $args['title'] ) ? (string) $args['title'] : '';
	$description = isset( $args['description'] ) ? (string) $args['description'] : '';
	$action      = isset( $args['action'] ) && is_array( $args['action'] ) ? $args['action'] : array();

	$html = '<div class="kt-origin-section-head"><div>';
	if ( '' !== $eyebrow ) {
		$html .= '<div class="kt-card-label">' . esc_html( $eyebrow ) . '</div>';
	}
	if ( '' !== $title ) {
		$html .= '<h2' . ( '' !== $id ? ' id="' . esc_attr( $id ) . '"' : '' ) . '>' . esc_html( $title ) . '</h2>';
	}
	if ( '' !== $description ) {
		$html .= '<p>' . esc_html( $description ) . '</p>';
	}
	$html .= '</div>';

	if ( ! empty( $action ) ) {
		$html .= '<div class="kt-component-action">' . ktheme_modu_component_action_link( $action ) . '</div>';
	}

	return $html . '</div>';
}

function ktheme_modu_component_action_link( array $args ): string {
	$label  = isset( $args['label'] ) ? (string) $args['label'] : '';
	$url    = isset( $args['url'] ) ? (string) $args['url'] : '#';
	$class  = isset( $args['class'] ) ? (string) $args['class'] : 'kt-origin-link';
	$target = ! empty( $args['external'] ) ? ' target="_blank" rel="noopener"' : '';
	$icon   = ! empty( $args['icon'] ) ? ktheme_modu_component_icon( (string) $args['icon'], 'kt-icon kt-icon--xs', '2.4' ) : '';

	return '<a class="' . esc_attr( $class ) . '" href="' . esc_url( $url ) . '"' . $target . '>' . esc_html( $label ) . $icon . '</a>';
}

function ktheme_modu_component_info_card( array $item ): string {
	return '<article class="kt-info-card">' .
		'<strong>' . esc_html( (string) ( $item['title'] ?? '' ) ) . '</strong>' .
		'<span>' . esc_html( (string) ( $item['description'] ?? '' ) ) . '</span>' .
		'</article>';
}

function ktheme_modu_component_route_list( array $items ): string {
	$html = '<ul class="kt-location-route-list">';

	foreach ( $items as $item ) {
		$steps = isset( $item['steps'] ) && is_array( $item['steps'] ) ? $item['steps'] : array();
		$html .= '<li><strong>' . esc_html( (string) ( $item['title'] ?? '' ) ) . '</strong>';

		foreach ( $steps as $index => $step ) {
			if ( $index > 0 ) {
				$html .= '<i aria-hidden="true"></i>';
			}

			$is_last = $index === count( $steps ) - 1;
			$html   .= $is_last ? '<b>' . esc_html( (string) $step ) . '</b>' : '<span>' . esc_html( (string) $step ) . '</span>';
		}

		$html .= '</li>';
	}

	return $html . '</ul>';
}

function ktheme_modu_component_tab_panels( array $args ): string {
	$prefix = isset( $args['id_prefix'] ) ? (string) $args['id_prefix'] : 'component-tab';
	$label  = isset( $args['label'] ) ? (string) $args['label'] : '';
	$tabs   = isset( $args['tabs'] ) && is_array( $args['tabs'] ) ? $args['tabs'] : array();

	$html = '<div class="kt-component-tabs" data-kt-component-tabs><div class="kt-location-tabs" role="tablist" aria-label="' . esc_attr( $label ) . '">';
	foreach ( $tabs as $index => $tab ) {
		$key       = (string) ( $tab['key'] ?? 'tab-' . $index );
		$is_active = 0 === $index;
		$html     .= '<button class="' . ( $is_active ? 'is-active' : '' ) . '" type="button" id="' . esc_attr( $prefix . '-tab-' . $key ) . '" role="tab" aria-selected="' . ( $is_active ? 'true' : 'false' ) . '" aria-controls="' . esc_attr( $prefix . '-panel-' . $key ) . '" data-kt-component-tab="' . esc_attr( $key ) . '">' . esc_html( (string) ( $tab['label'] ?? '' ) ) . '</button>';
	}
	$html .= '</div><div class="kt-location-panels">';

	foreach ( $tabs as $index => $tab ) {
		$key       = (string) ( $tab['key'] ?? 'tab-' . $index );
		$is_active = 0 === $index;
		$html     .= '<div class="kt-location-panel ' . ( $is_active ? 'is-active' : '' ) . '" id="' . esc_attr( $prefix . '-panel-' . $key ) . '" role="tabpanel" aria-labelledby="' . esc_attr( $prefix . '-tab-' . $key ) . '" data-kt-component-panel="' . esc_attr( $key ) . '"' . ( $is_active ? '' : ' hidden' ) . '>';
		$html     .= '<h3>' . esc_html( (string) ( $tab['title'] ?? '' ) ) . '</h3>';
		$html     .= ktheme_modu_component_route_list( isset( $tab['routes'] ) && is_array( $tab['routes'] ) ? $tab['routes'] : array() );
		$html     .= '</div>';
	}

	return $html . '</div></div>';
}

function ktheme_modu_location_page_data(): array {
	$address = "서울특별시 금천구 가산디지털1로 168";
	$address_query = rawurlencode( $address );

	return array(
		"name" => "가평교회",
		"address" => $address,
		"phone" => "",
		"map_url" => "https://www.google.com/maps/search/?api=1&query=" . $address_query,
		"map_embed_url" => "https://www.google.com/maps?q=" . $address_query . "&output=embed",
		"direction_url" => "https://www.google.com/maps/dir/?api=1&destination=" . $address_query,
		"routes" => array(
			array(
				"key" => "car",
				"label" => "자가용",
				"title" => "자가용으로 오시는 길",
				"routes" => array(
					array( "title" => "간선도로 이용", "steps" => array( "가산디지털단지 방향으로 진입", "교차로를 지나 직진", "가평교회 도착" ) ),
					array( "title" => "순환도로 이용", "steps" => array( "구로IC 방면으로 진입", "가산디지털로 이동", "가평교회 도착" ) ),
					array( "title" => "내비게이션", "steps" => array( "가평교회를 검색하거나 주소를 입력", $address ) ),
				),
			),
			array(
				"key" => "transit",
				"label" => "대중교통",
				"title" => "대중교통으로 오시는 길",
				"routes" => array(
					array( "title" => "지하철", "steps" => array( "가산디지털단지역 하차", "도보 약 10분", "가평교회 도착" ) ),
					array( "title" => "버스", "steps" => array( "가산디지털단지 정류장 하차", "도보로 이동" ) ),
				),
			),
		),
		'guide_cards'   => array(
			array( 'title' => '예배 시간', 'description' => '주일예배는 오전 11시에 드립니다. 처음 방문하시는 분은 예배 15분 전에 오시면 안내를 받으실 수 있습니다.' ),
			array( 'title' => '처음 방문 안내', 'description' => '안내 데스크에서 예배당 위치와 새가족 모임을 친절하게 안내해 드립니다.' ),
			array( 'title' => '문의', 'description' => '방문 전 궁금한 점은 전화 또는 문의 페이지를 통해 남겨 주세요.' ),
		),
	);
}

function ktheme_modu_print_component_tabs_script(): void {
	?>
	<script>
		(() => {
			document.querySelectorAll('[data-kt-component-tabs]').forEach((root) => {
				const tabs = Array.from(root.querySelectorAll('[data-kt-component-tab]'));
				const panels = Array.from(root.querySelectorAll('[data-kt-component-panel]'));

				tabs.forEach((tab) => {
					tab.addEventListener('click', () => {
						const target = tab.dataset.ktComponentTab;

						tabs.forEach((item) => {
							const active = item === tab;
							item.classList.toggle('is-active', active);
							item.setAttribute('aria-selected', active ? 'true' : 'false');
						});

						panels.forEach((panel) => {
							const active = panel.dataset.ktComponentPanel === target;
							panel.classList.toggle('is-active', active);
							panel.hidden = !active;
						});
					});
				});
			});
		})();
	</script>
	<?php
}

function ktheme_modu_enqueue_component_tabs_script(): void {
	static $is_queued = false;

	if ( $is_queued ) {
		return;
	}

	$is_queued = true;
	add_action( 'wp_footer', 'ktheme_modu_print_component_tabs_script', 30 );
}

function ktheme_modu_render_location_page_shortcode(): string {
	$data = ktheme_modu_location_page_data();
	ktheme_modu_enqueue_component_tabs_script();

	$html  = '<div class="kt-origin-page kt-location-page">';
	$html .= '<section class="kt-origin-section kt-location-map-section" aria-labelledby="kt-location-map-title">';
	$html .= ktheme_modu_component_section_head(
		array(
			'id'          => 'kt-location-map-title',
			'eyebrow'     => 'Location',
			'title'       => '?배???치',
			'description' => '처음 ?시??분도 길을 ?게 찾을 ???도?주소? 교통?을 ?리?습?다.',
			'action'      => array(
				'label'    => '??지??보기',
				'url'      => $data['map_url'],
				'external' => true,
			),
		)
	);
	$html .= '<div class="kt-location-map-card">' .
		'<div class="kt-location-map-frame"><iframe title="' . esc_attr__( '가?교???치 지??', 'ktheme-modu' ) . '" src="' . esc_url( $data['map_embed_url'] ) . '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' .
		'<div class="kt-location-marker-card"><strong>' . esc_html( $data['name'] ) . '</strong><span>' . esc_html( $data['address'] ) . '</span><small>' . esc_html__( '주일?배 ?후 ?내????배?과 주차 ?선?????립?다.', 'ktheme-modu' ) . '</small></div>' .
		'</div>';
	$html .= '<div class="kt-location-info-strip">' .
		'<div><span class="kt-location-info-icon" aria-hidden="true">' . ktheme_modu_component_icon( 'map-pin' ) . '</span><strong>' . esc_html__( '주소', 'ktheme-modu' ) . '</strong><span>' . esc_html( $data['address'] ) . '</span></div>' .
		'<div><span class="kt-location-info-icon" aria-hidden="true">' . ktheme_modu_component_icon( 'phone' ) . '</span><strong>' . esc_html__( '??전??', 'ktheme-modu' ) . '</strong><a href="tel:' . esc_attr( $data['phone'] ) . '">' . esc_html( $data['phone'] ) . '</a></div>' .
		'<div class="kt-location-info-action">' . ktheme_modu_component_action_link(
			array(
				'label'    => '길찾?',
				'url'      => $data['direction_url'],
				'class'    => 'kt-button kt-button--brand',
				'external' => true,
				'icon'     => 'arrow-right',
			)
		) . '</div>' .
		'</div></section>';

	$html .= '<section class="kt-origin-section kt-location-route-section" aria-labelledby="kt-location-route-title">';
	$html .= ktheme_modu_component_section_head(
		array(
			'id'          => 'kt-location-route-title',
			'title'       => '?시??방법',
			'description' => '방문?시??교통?단??맞춰 ?요???보??인?세??',
		)
	);
	$html .= ktheme_modu_component_tab_panels(
		array(
			'id_prefix' => 'location',
			'label'     => '교통?단??내',
			'tabs'      => $data['routes'],
		)
	);
	$html .= '</section>';

	$html .= '<section class="kt-origin-section kt-location-guide-section" aria-labelledby="kt-location-guide-title">';
	$html .= ktheme_modu_component_section_head(
		array(
			'id'          => 'kt-location-guide-title',
			'title'       => '방문 ???내',
			'description' => '?배? ????내, 문의 ?선??미리 ?인?실 ???습?다.',
		)
	);
	$html .= '<div class="kt-location-guide-grid">' . implode( '', array_map( 'ktheme_modu_component_info_card', $data['guide_cards'] ) ) . '</div></section>';

	return ktheme_modu_compact_shortcode_html( $html . '</div>' );
}

function ktheme_modu_sermon_card_items(): array {
	$image_base = get_template_directory_uri() . '/assets/images/generated/';

	return array(
		array(
			'image'  => $image_base . 'church-generated-01.jpg',
			'series' => '머무름의 ?성',
			'title'  => '?? ?리?부르시???나??',
			'date'   => '2026.03.29',
		),
		array(
			'image'  => $image_base . 'church-generated-02.jpg',
			'series' => '머무름의 ?성',
			'title'  => '기다리는 믿음???간',
			'date'   => '2026.03.22',
		),
		array(
			'image'  => $image_base . 'church-generated-03.jpg',
			'series' => '머무름의 ?성',
			'title'  => '?까지 ?나?의 ?름?로',
			'date'   => '2026.03.15',
		),
		array(
			'image'  => $image_base . 'church-generated-04.jpg',
			'series' => '머무름의 ?성',
			'title'  => '?까지 ?어?????리',
			'date'   => '2026.03.07',
		),
		array(
			'image'  => $image_base . 'church-generated-05.jpg',
			'series' => '?유주제',
			'title'  => '[주일?교] 부르심??주인?',
			'date'   => '2026.03.01',
		),
		array(
			'image'  => $image_base . 'church-generated-06.jpg',
			'series' => '?유주제',
			'title'  => '[?요?교] 가????길을 바라???',
			'date'   => '2026.02.28',
		),
		array(
			'image'  => $image_base . 'church-generated-07.jpg',
			'series' => '2026 변?산',
			'title'  => '[2026 변?산] 기다림? ?께 걷는 길입?다',
			'date'   => '2026.02.28',
		),
		array(
			'image'  => $image_base . 'church-generated-08.jpg',
			'series' => '2026 변?산',
			'title'  => '[2026 변?산] 기다림? ?적???종?니??',
			'date'   => '2026.02.27',
		),
		array(
			'image'  => $image_base . 'church-generated-09.jpg',
			'series' => '2026 변?산',
			'title'  => '[2026 변?산] 기다림? ?내??는 마음?니??',
			'date'   => '2026.02.26',
		),
	);
}

function ktheme_modu_render_sermon_item_card( array $item ): string {
	$url = home_url( user_trailingslashit( 'sermons' ) );

	return '<a class="kt-sermon-item-card kt-story-card kt-story-card--editorial" href="' . esc_url( $url ) . '">' .
		'<span class="kt-story-card__media kt-sermon-item-card__media">' .
			'<img src="' . esc_url( $item['image'] ) . '" alt="" loading="lazy" />' .
		'</span>' .
		'<span class="kt-story-card__body">' .
			'<span class="kt-story-card__meta"><span>' . esc_html( $item['series'] ) . '</span><time datetime="' . esc_attr( str_replace( '.', '-', $item['date'] ) ) . '">' . esc_html( $item['date'] ) . '</time></span>' .
			'<strong>' . esc_html( $item['title'] ) . '</strong>' .
			'<span class="kt-story-card__link">Read More <svg class="kt-icon kt-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>' .
		'</span>' .
		'</a>';
}

function ktheme_modu_render_sunday_worship_grid_shortcode(): string {
	$cards = array_map( 'ktheme_modu_render_sermon_item_card', ktheme_modu_sermon_card_items() );
	$pagination = '<nav class="kt-sermon-pagination kt-component-pagination" aria-label="' . esc_attr__( 'Pagination', 'ktheme-modu' ) . '">' .
		'<a class="kt-component-pagination__edge" href="#" aria-label="' . esc_attr__( 'Previous page', 'ktheme-modu' ) . '"><svg class="kt-icon kt-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true"><path d="M15 18 9 12l6-6"/></svg><span>' . esc_html( ktheme_modu_text( '\uC774\uC804' ) ) . '</span></a>' .
		'<span class="page-numbers current" aria-current="page">1</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a>' .
		'<a class="kt-component-pagination__edge" href="#" aria-label="' . esc_attr__( 'Next page', 'ktheme-modu' ) . '"><span>' . esc_html( ktheme_modu_text( '\uB2E4\uC74C' ) ) . '</span><svg class="kt-icon kt-icon--xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a>' .
		'</nav>';

	return '<section class="kt-sermon-feed kt-sermon-feed--static" aria-label="' . esc_attr__( 'Sunday worship sermon list', 'ktheme-modu' ) . '">' .
		'<div class="kt-sermon-item-grid">' . implode( '', $cards ) . '</div>' .
		$pagination .
		'</section>';
}

function ktheme_modu_photo_carousel_presets(): array {
	$image_base = get_template_directory_uri() . '/assets/images/generated/';

	return array(
		'community' => array(
			'eyebrow'     => 'Community Life',
			'title'       => '공동체? ?께???동 ?진',
			'description' => '?배? 모임, ?음??? ?????리?서 ?께 ?라가???면??모았?니??',
			'items'       => array(
				array(
					'image'   => $image_base . 'church-generated-04.jpg',
					'label'   => '?그?',
					'title'   => '?을 ?누??목장 모임',
					'caption' => '말???탁, 기도가 ?연?럽??어지???? 공동체의 ?간?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-03.jpg',
					'label'   => '?음??',
					'title'   => '믿음?로 ?라???음??',
					'caption' => '?이?과 ??이 ?배? 교육 ?에??복음??배웁?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-14.jpg',
					'label'   => '???',
					'title'   => '처음 ?신 분을 ?영?는 ?리',
					'caption' => '?? 방문???뜻??만남?로 ?어지?록 ?께 ?습?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-02.jpg',
					'label'   => '?부',
					'title'   => '?께 기도?는 ? 공동?',
					'caption' => '??이 말? ?에???의 방향???누??로??웁?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-10.jpg',
					'label'   => '?육',
					'title'   => '배??로 깊어지???앙',
					'caption' => '???과정??경공???해 믿음??기초??집?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-08.jpg',
					'label'   => '??',
					'title'   => '?로???요??보???길',
					'caption' => '교회 ?팎???요??피??제?인 ?랑???눕?다.',
				),
			),
		),
		'newcomers' => array(
			'eyebrow'     => 'Welcome Moments',
			'title'       => '처음 방문부???착까? ?께?니??',
			'description' => '?배 ???내, ???과정, ?그??결까? ??족의 첫걸?을 ?는 ?면?입?다.',
			'items'       => array(
				array(
					'image'   => $image_base . 'church-generated-14.jpg',
					'label'   => '?영',
					'title'   => '?배 ???내 ?스??',
					'caption' => '?착?면 ?내????배?과 ??족석, ?? ?배 ?선???께 ?내?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-10.jpg',
					'label'   => '과정',
					'title'   => '???과정',
					'caption' => '교회??비전??앙??기초?배우?공동체? ?연?럽??아갑니??',
				),
				array(
					'image'   => $image_base . 'church-generated-04.jpg',
					'label'   => '?결',
					'title'   => '?그??결',
					'caption' => '?의 ?리? ?령??고려???께 걸어?공동체? ?개?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-03.jpg',
					'label'   => '가??',
					'title'   => '?? ?반 방문',
					'caption' => '?음?? ?배? 교육 공간???내????가족이 ?안?게 ?배?????습?다.',
				),
			),
		),
		'small-groups' => array(
			'eyebrow'     => 'Small Group Life',
			'title'       => '?을 ?누??로??보???리',
			'description' => '?배??고백???상???봄?로 ?어지?록 ?그룹과 구역 모임???께 걷습?다.',
			'items'       => array(
				array(
					'image'   => $image_base . 'church-generated-04.jpg',
					'label'   => '목장',
					'title'   => '가?과 ?상?서 만나??모임',
					'caption' => '말????누??로??기도 ?목???는 ?? 공동체입?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-12.jpg',
					'label'   => '?봄',
					'title'   => '?자 ?? ?도??피???결',
					'caption' => '??족과 ?우, ?????요??가?을 가까운 공동체? ?께 ?봅?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-14.jpg',
					'label'   => '교제',
					'title'   => '?배 ???어지???탁????',
					'caption' => '짧? ?사?서 ?작??만남???앙???행?로 ?랍?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-08.jpg',
					'label'   => '??',
					'title'   => '?께 ?직이???? ??',
					'caption' => '?구역??지?? 교회 ?의 ?요??피??랑???천?니??',
				),
			),
		),
		'next-generation' => array(
			'eyebrow'     => 'Next Generation',
			'title'       => '?이?이 말? ?에???라갑니??',
			'description' => '?유??????까지 ?령??맞는 ?배? 교육?로 ?음????믿음???웁?다.',
			'items'       => array(
				array(
					'image'   => $image_base . 'church-generated-03.jpg',
					'label'   => '?배',
					'title'   => '?령??음?? ?배',
					'caption' => '?이?이 ?해?????는 ?어?말????고 ?께 찬양?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-11.jpg',
					'label'   => '교육',
					'title'   => '복음??기초?배우???간',
					'caption' => '?경 ?야기? ?동???해 믿음??고백???상??결?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-10.jpg',
					'label'   => '교사',
					'title'   => '?께 기도?는 교사 공동?',
					'caption' => '교사? 부모? ?이?의 ?앙 ?장???해 ?께 기도?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-15.jpg',
					'label'   => '캠프',
					'title'   => '?름?경?교? ?련??',
					'caption' => '집중?인 ?배? 교제??해 ?나?을 ??깊이 만나???간??갖습?다.',
				),
			),
		),
		'youth-ministry' => array(
			'eyebrow'     => 'Young Adults',
			'title'       => '??이 믿음??을 ?께 ?웁?다',
			'description' => '?배, ?그? 기도? ?????해 ???계절???께 걸어갑니??',
			'items'       => array(
				array(
					'image'   => $image_base . 'church-generated-02.jpg',
					'label'   => '?배',
					'title'   => '??배? 말? ?눔',
					'caption' => '?의 질문??말? ?에 가?오??께 ?답?는 ?리?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-04.jpg',
					'label'   => '?그?',
					'title'   => '관계? 깊어지???모??',
					'caption' => '?교? 직장, 진로? 관계의 고???믿음 ?에???눕?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-13.jpg',
					'label'   => '찬양',
					'title'   => '?배??께 ?우????',
					'caption' => '찬양?미디?? ?????리?서 ??이 ??? ?눕?다.',
				),
				array(
					'image'   => $image_base . 'church-generated-17.jpg',
					'label'   => '?교',
					'title'   => '지?? ?상???한 발걸??',
					'caption' => '봉사? ?기 ?교??해 복음???의 ?리?가?갑?다.',
				),
			),
		),
		'senior-ministry' => array(
			'eyebrow'     => 'Senior Ministry',
			'title'       => '?년??니?의 믿음???음????웁?다',
			'description' => '?배, 교제, ?봄??????해 ?생??계절마다 ?께 걷는 공동체입?다.',
			'items'       => array(
				array(
					'image'   => $image_base . 'church-generated-12.jpg',
					'label'   => '?봄',
					'title'   => '기도? ?방?로 ?어지???봄',
					'caption' => '몸과 마음???요??피?가까운 공동체? ?께 기도?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-14.jpg',
					'label'   => '교제',
					'title'   => '?께 ?탁???누??모임',
					'caption' => '주중 모임??기 ?사??해 관계? 격려가 ?어집니??',
				),
				array(
					'image'   => $image_base . 'church-generated-10.jpg',
					'label'   => '배?',
					'title'   => '말??로 깊어지???앙',
					'caption' => '?경공?? 기도 모임?로 ?생??계절??말? ?에???석?니??',
				),
				array(
					'image'   => $image_base . 'church-generated-08.jpg',
					'label'   => '??',
					'title'   => '경험???? ?누???리',
					'caption' => '?랜 믿음??경험??교회? ?음????우?????로 ?어집니??',
				),
			),
		),
	);
}

function ktheme_modu_enqueue_photo_carousel_script(): void {
	$script_path = get_theme_file_path( 'assets/js/photo-carousel.js' );

	wp_enqueue_script(
		'ktheme-modu-photo-carousel',
		get_theme_file_uri( 'assets/js/photo-carousel.js' ),
		array(),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : wp_get_theme()->get( 'Version' ),
		true
	);
}

function ktheme_modu_render_photo_carousel_shortcode( $atts = array() ): string {
	if ( ! is_array( $atts ) ) {
		$atts = array();
	}

	$atts = shortcode_atts(
		array(
			'preset'      => 'community',
			'eyebrow'     => '',
			'title'       => '',
			'description' => '',
			'class'       => '',
		),
		$atts,
		'ktheme_photo_carousel'
	);

	$presets = ktheme_modu_photo_carousel_presets();
	$preset  = isset( $presets[ $atts['preset'] ] ) ? $presets[ $atts['preset'] ] : $presets['community'];
	$items   = isset( $preset['items'] ) && is_array( $preset['items'] ) ? $preset['items'] : array();

	if ( empty( $items ) ) {
		return '';
	}

	ktheme_modu_enqueue_photo_carousel_script();

	$title       = '' !== $atts['title'] ? $atts['title'] : $preset['title'];
	$eyebrow     = '' !== $atts['eyebrow'] ? $atts['eyebrow'] : $preset['eyebrow'];
	$description = '' !== $atts['description'] ? $atts['description'] : $preset['description'];
	$section_id  = wp_unique_id( 'kt-photo-carousel-' );
	$classes     = array_filter(
		array(
			'kt-photo-carousel',
			'kt-photo-carousel--' . sanitize_html_class( (string) $atts['preset'] ),
			sanitize_html_class( (string) $atts['class'] ),
		)
	);
	$total       = count( $items );
	$slides      = '';
	$dots        = '';

	foreach ( array_values( $items ) as $index => $item ) {
		$slide_id = $section_id . '-slide-' . ( $index + 1 );
		$label    = isset( $item['label'] ) ? (string) $item['label'] : '';
		$caption  = isset( $item['caption'] ) ? (string) $item['caption'] : '';
		$item_title = isset( $item['title'] ) ? (string) $item['title'] : '';

		$slides .= '<figure class="kt-photo-carousel__slide" id="' . esc_attr( $slide_id ) . '" data-kt-carousel-slide>' .
			'<span class="kt-photo-carousel__image"><img src="' . esc_url( (string) $item['image'] ) . '" alt="' . esc_attr( $item_title ) . '" loading="lazy" /></span>' .
			'<figcaption class="kt-photo-carousel__caption">' .
				( '' !== $label ? '<span>' . esc_html( $label ) . '</span>' : '' ) .
				'<strong>' . esc_html( $item_title ) . '</strong>' .
				( '' !== $caption ? '<small>' . esc_html( $caption ) . '</small>' : '' ) .
			'</figcaption>' .
		'</figure>';

		$dots .= '<button class="kt-photo-carousel__dot" type="button" aria-label="' . esc_attr( sprintf( '%d번째 ?진 보기', $index + 1 ) ) . '" aria-controls="' . esc_attr( $slide_id ) . '" data-kt-carousel-dot="' . esc_attr( (string) $index ) . '"><span></span></button>';
	}

	return '<section class="' . esc_attr( implode( ' ', $classes ) ) . '" aria-labelledby="' . esc_attr( $section_id . '-title' ) . '" data-kt-photo-carousel>' .
		'<div class="kt-photo-carousel__head">' .
			'<div><span class="kt-card-label">' . esc_html( $eyebrow ) . '</span><h2 id="' . esc_attr( $section_id . '-title' ) . '">' . esc_html( $title ) . '</h2>' .
			( '' !== $description ? '<p>' . esc_html( $description ) . '</p>' : '' ) . '</div>' .
			'<div class="kt-photo-carousel__controls">' .
				'<button class="kt-photo-carousel__button" type="button" aria-label="' . esc_attr__( '?전 ?진', 'ktheme-modu' ) . '" data-kt-carousel-prev><svg class="kt-icon kt-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true"><path d="M15 18 9 12l6-6"/></svg></button>' .
				'<button class="kt-photo-carousel__button" type="button" aria-label="' . esc_attr__( '?음 ?진', 'ktheme-modu' ) . '" data-kt-carousel-next><svg class="kt-icon kt-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>' .
			'</div>' .
		'</div>' .
		'<div class="kt-photo-carousel__viewport" tabindex="0" data-kt-carousel-viewport>' .
			'<div class="kt-photo-carousel__track" data-kt-carousel-track>' . $slides . '</div>' .
		'</div>' .
		'<div class="kt-photo-carousel__footer">' .
			'<div class="kt-photo-carousel__dots" aria-label="' . esc_attr__( '?진 ?택', 'ktheme-modu' ) . '">' . $dots . '</div>' .
			'<div class="kt-photo-carousel__count" aria-live="polite"><span data-kt-carousel-current>01</span><span>/</span><span>' . esc_html( str_pad( (string) $total, 2, '0', STR_PAD_LEFT ) ) . '</span></div>' .
		'</div>' .
	'</section>';
}

function ktheme_modu_body_classes( array $classes ): array {
	if ( is_page( array( 'sunday-worship', 'wednesday-worship', 'dawn-prayer' ) ) ) {
		$classes[] = 'kt-page-sunday-worship';
	}

	if ( is_page( 'bulletin' ) ) {
		$classes[] = 'kt-page-bulletin';
	}

	return $classes;
}
add_filter( 'body_class', 'ktheme_modu_body_classes' );

function ktheme_modu_customize_register_page_hero( WP_Customize_Manager $wp_customize ): void {
	$wp_customize->add_section(
		'ktheme_modu_page_hero',
		array(
			'title'       => __( 'KTheme 공용 ?어?', 'ktheme-modu' ),
			'description' => __( '모든 ?이지 ?플릿에???용?는 ?마 종속 공용 ?어??정?니??', 'ktheme-modu' ),
			'priority'    => 35,
		)
	);

	$wp_customize->add_setting(
		'ktheme_modu_page_hero_enabled',
		array(
			'default'           => true,
			'sanitize_callback' => 'ktheme_modu_sanitize_checkbox',
		)
	);

	$wp_customize->add_control(
		'ktheme_modu_page_hero_enabled',
		array(
			'label'   => __( '공용 ?어??시', 'ktheme-modu' ),
			'section' => 'ktheme_modu_page_hero',
			'type'    => 'checkbox',
		)
	);

	$wp_customize->add_setting(
		'ktheme_modu_page_hero_style',
		array(
			'default'           => 'clean',
			'sanitize_callback' => 'ktheme_modu_sanitize_page_hero_style',
		)
	);

	$wp_customize->add_control(
		'ktheme_modu_page_hero_style',
		array(
			'label'   => __( '?어?????', 'ktheme-modu' ),
			'section' => 'ktheme_modu_page_hero',
			'type'    => 'select',
			'choices' => ktheme_modu_page_hero_style_options(),
		)
	);

	$wp_customize->add_setting(
		'ktheme_modu_page_hero_image_url',
		array(
			'default'           => ktheme_modu_page_hero_default_image(),
			'sanitize_callback' => 'esc_url_raw',
		)
	);

	$wp_customize->add_control(
		'ktheme_modu_page_hero_image_url',
		array(
			'label'       => __( '배경/?측 ??지 URL', 'ktheme-modu' ),
			'description' => __( 'Image, Ken Burns, Split ???에 ?용?니??', 'ktheme-modu' ),
			'section'     => 'ktheme_modu_page_hero',
			'type'        => 'url',
		)
	);

	$wp_customize->add_setting(
		'ktheme_modu_page_hero_youtube_url',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		)
	);

	$wp_customize->add_control(
		'ktheme_modu_page_hero_youtube_url',
		array(
			'label'       => __( '?튜?배경 ?상 URL', 'ktheme-modu' ),
			'description' => __( 'Video Background ???에 ?용?니??', 'ktheme-modu' ),
			'section'     => 'ktheme_modu_page_hero',
			'type'        => 'url',
		)
	);

	foreach (
		array(
			'ktheme_modu_page_hero_accent_color'  => array( __( '강조 ?상', 'ktheme-modu' ), '#3a64f5' ),
			'ktheme_modu_page_hero_text_color'    => array( __( '?스???상', 'ktheme-modu' ), '' ),
			'ktheme_modu_page_hero_overlay_color' => array( __( '?버?이 ?상', 'ktheme-modu' ), '#0e1320' ),
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
					'section' => 'ktheme_modu_page_hero',
				)
			)
		);
	}
}
add_action( 'customize_register', 'ktheme_modu_customize_register_page_hero' );

function ktheme_modu_normalize_front_content_labels( string $block_content ): string {
	if ( is_admin() ) {
		return $block_content;
	}

	return str_replace( '?토갤러??체보기', '?체보기', $block_content );
}
add_filter( 'render_block', 'ktheme_modu_normalize_front_content_labels', 20 );

function ktheme_modu_enqueue_front_animation_assets(): void {
	if ( is_admin() || ! is_front_page() ) {
		return;
	}

	wp_enqueue_script(
		'ktheme-modu-gsap',
		'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
		array(),
		'3.13.0',
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_modu_enqueue_front_animation_assets' );

function ktheme_modu_render_home_hero_slider_script(): void {
	if ( is_admin() || ! is_front_page() ) {
		return;
	}
	$demo_asset_base = trailingslashit( get_theme_file_uri( 'assets/images' ) );
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
	      image: '<?php echo esc_js( $demo_asset_base ); ?>ktheme-demo-community-01.png',
	      eyebrow: '2026 SPRING SERIES · VOL. 04',
	      title: '말씀에 머무는 자리,<br />함께 걸어가는 공동체',
	      copy: '매주 드려지는 예배와 말씀, 그리고 공동체의 삶 속에서 회복의 자리를 함께 만들어 갑니다.',
	      meta: ['머무름의 영성', '시편 23:1-6', '담임목사'],
	      primary: '이번 주 설교 보기',
	      secondary: '예배 시간 안내'
	    },
	    {
	      image: '<?php echo esc_js( $demo_asset_base ); ?>ktheme-demo-community-04.png',
	      eyebrow: 'WORSHIP TOGETHER · SUNDAY',
	      title: '함께 예배하고,<br />함께 세워지는 시간',
	      copy: '주일 예배 자리에서 하나님을 예배하고 서로를 격려합니다. 처음 오신 분도 편안하게 참여할 수 있도록 안내합니다.',
	      meta: ['주일예배', '오전 11:00', '본당'],
	      primary: '주일예배 보기',
	      secondary: '오시는 길'
	    },
	    {
	      image: '<?php echo esc_js( $demo_asset_base ); ?>ktheme-demo-community-03.png',
	      eyebrow: 'NEXT GENERATION · FAITH',
	      title: '다음 세대가 복음 안에서<br />자라나는 교회',
	      copy: '아이들과 청소년이 믿음의 언어를 배우고 삶으로 이어갈 수 있도록 예배와 교육의 흐름을 만듭니다.',
	      meta: ['다음세대', '교육과 예배', '공동체 사역'],
	      primary: '다음세대 보기',
	      secondary: '공동체 안내'
	    },
	    {
	      image: '<?php echo esc_js( $demo_asset_base ); ?>ktheme-demo-community-02.png',
	      eyebrow: 'MISSION & SERVE · LOCAL',
	      title: '지역의 일상을 섬기는<br />작은 발걸음',
	      copy: '복음의 마음으로 이웃을 섬기며, 선교와 봉사의 자리에서 함께 기도하고 동역합니다.',
	      meta: ['선교 안내', '지역 섬김', '후원과 봉사'],
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
add_action( 'wp_footer', 'ktheme_modu_render_home_hero_slider_script', 20 );

function ktheme_modu_enqueue_assets(): void {
	wp_enqueue_style(
		'ktheme-modu-pretendard',
		'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
		array(),
		'1.3.9'
	);

	wp_enqueue_style(
		'ktheme-modu-style',
		get_stylesheet_uri(),
		array( 'ktheme-modu-pretendard' ),
		wp_get_theme()->get( 'Version' )
	);

	$header_script_path = get_theme_file_path( 'assets/js/site-header.js' );

	wp_enqueue_script(
		'ktheme-modu-site-header',
		get_theme_file_uri( 'assets/js/site-header.js' ),
		array(),
		file_exists( $header_script_path ) ? (string) filemtime( $header_script_path ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_modu_enqueue_assets' );
add_action( 'enqueue_block_editor_assets', 'ktheme_modu_enqueue_assets' );

function ktheme_modu_enqueue_design_library_assets(): void {
	if ( is_admin() || ! is_page( 'design-library' ) ) {
		return;
	}

	$script_path = get_theme_file_path( 'assets/js/design-library.js' );

	wp_enqueue_script(
		'ktheme-modu-design-library',
		get_theme_file_uri( 'assets/js/design-library.js' ),
		array(),
		file_exists( $script_path ) ? (string) filemtime( $script_path ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_modu_enqueue_design_library_assets' );
function ktheme_modu_enqueue_ministry_contact_modal_assets(): void {
	if ( is_admin() ) {
		return;
	}

	$ministry_slugs = array( 'newcomers', 'small-groups', 'next-generation', 'youth-ministry', 'senior-ministry', 'community' );

	if ( ! is_page( $ministry_slugs ) ) {
		return;
	}

	$modal_path = get_theme_file_path( 'assets/js/ministry-contact-modal.js' );

	wp_enqueue_script(
		'ktheme-modu-ministry-contact-modal',
		get_theme_file_uri( 'assets/js/ministry-contact-modal.js' ),
		array(),
		file_exists( $modal_path ) ? (string) filemtime( $modal_path ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ktheme_modu_enqueue_ministry_contact_modal_assets' );
