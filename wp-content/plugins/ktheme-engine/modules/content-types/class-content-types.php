<?php

namespace KTheme\Engine\Modules;

defined( 'ABSPATH' ) || exit;

final class Content_Types {
	public static function register(): void {
		foreach ( self::definitions() as $post_type => $definition ) {
			register_post_type( $post_type, self::filtered_args( $post_type, $definition ) );
		}
	}

	/** @return array<string, array<string, mixed>> */
	private static function definitions(): array {
		return array(
			'ktheme_media'    => self::definition( 'Media', 'Media Item', 'media', array( 'title', 'editor', 'excerpt', 'thumbnail', 'author' ), 'dashicons-format-video' ),
			'ktheme_event'    => self::definition( 'Events', 'Event', 'events', array( 'title', 'editor', 'excerpt', 'thumbnail' ), 'dashicons-calendar-alt' ),
			'ktheme_resource' => self::definition( 'Resources', 'Resource', 'resources', array( 'title', 'editor', 'excerpt', 'thumbnail' ), 'dashicons-media-document' ),
			'ktheme_profile'  => self::definition( 'Profiles', 'Profile', 'profiles', array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ), 'dashicons-id' ),
		);
	}

	/** @param list<string> $supports */
	private static function definition( string $plural, string $singular, string $rewrite_slug, array $supports, string $menu_icon ): array {
		return array(
			'labels'       => array(
				'name'          => __( $plural, 'ktheme-engine' ),
				'singular_name' => __( $singular, 'ktheme-engine' ),
				'add_new_item'  => sprintf( __( 'Add %s', 'ktheme-engine' ), $singular ),
				'edit_item'     => sprintf( __( 'Edit %s', 'ktheme-engine' ), $singular ),
				'all_items'     => sprintf( __( 'All %s', 'ktheme-engine' ), $plural ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'menu_icon'    => $menu_icon,
			'has_archive'  => true,
			'rewrite'      => array( 'slug' => $rewrite_slug ),
			'supports'     => $supports,
		);
	}

	private static function filtered_args( string $post_type, array $args ): array {
		/** This lets a preset change labels or presentation without creating another content model. */
		return apply_filters( 'ktheme/content-type/args', $args, $post_type );
	}
}
