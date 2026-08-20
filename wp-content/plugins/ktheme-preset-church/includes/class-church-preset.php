<?php

namespace KTheme\Preset\Church;

defined( 'ABSPATH' ) || exit;

final class Church_Preset {
	/** @var array<string, array<string, string>> */
	private static array $content_type_labels = array();

	/** @var array<string, array<string, string>> */
	private static array $taxonomy_labels = array();

	public static function boot(): void {
		if ( ! class_exists( 'KTheme\\Engine\\Plugin' ) ) {
			add_action( 'admin_notices', array( self::class, 'render_engine_notice' ) );
			return;
		}

		self::$content_type_labels = require KTHEME_PRESET_CHURCH_PATH . 'labels/content-types.php';
		self::$taxonomy_labels     = require KTHEME_PRESET_CHURCH_PATH . 'labels/taxonomies.php';

		add_filter( 'ktheme/content-type/args', array( self::class, 'filter_content_type_args' ), 10, 2 );
		add_filter( 'ktheme/taxonomy/args', array( self::class, 'filter_taxonomy_args' ), 10, 2 );
	}

	public static function filter_content_type_args( array $args, string $post_type ): array {
		return self::replace_labels( $args, self::$content_type_labels[ $post_type ] ?? array() );
	}

	public static function filter_taxonomy_args( array $args, string $taxonomy ): array {
		return self::replace_labels( $args, self::$taxonomy_labels[ $taxonomy ] ?? array() );
	}

	/** @param array<string, string> $labels */
	private static function replace_labels( array $args, array $labels ): array {
		if ( empty( $labels ) ) {
			return $args;
		}

		$singular = $labels['singular'] ?? '';
		$plural   = $labels['plural'] ?? '';
		$args['labels'] = array_merge(
			$args['labels'] ?? array(),
			array(
				'name'          => $plural,
				'singular_name' => $singular,
				'add_new_item'  => sprintf( __( 'Add %s', 'ktheme-preset-church' ), $singular ),
				'edit_item'     => sprintf( __( 'Edit %s', 'ktheme-preset-church' ), $singular ),
				'all_items'     => sprintf( __( 'All %s', 'ktheme-preset-church' ), $plural ),
			)
		);

		return $args;
	}

	public static function render_engine_notice(): void {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		echo '<div class="notice notice-warning"><p>' . esc_html__( 'KTheme Church Preset requires KTheme Engine to be active.', 'ktheme-preset-church' ) . '</p></div>';
	}
}
