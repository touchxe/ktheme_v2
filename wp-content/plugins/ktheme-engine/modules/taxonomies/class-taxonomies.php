<?php

namespace KTheme\Engine\Modules;

defined( 'ABSPATH' ) || exit;

final class Taxonomies {
	public static function register(): void {
		foreach ( self::definitions() as $taxonomy => $definition ) {
			register_taxonomy( $taxonomy, $definition['post_types'], self::filtered_args( $taxonomy, $definition['args'] ) );
		}
	}

	/** @return array<string, array{post_types:list<string>,args:array<string,mixed>}> */
	private static function definitions(): array {
		return array(
			'ktheme_media_type' => self::definition( 'Media Types', 'Media Type', array( 'ktheme_media' ), false, 'media-type' ),
			'ktheme_collection' => self::definition( 'Collections', 'Collection', array( 'ktheme_media', 'ktheme_resource' ), true, 'collections' ),
			'ktheme_topic'      => self::definition( 'Topics', 'Topic', array( 'ktheme_media', 'ktheme_event', 'ktheme_resource' ), true, 'topics' ),
			'ktheme_audience'   => self::definition( 'Audiences', 'Audience', array( 'ktheme_media', 'ktheme_event', 'ktheme_resource', 'ktheme_profile' ), true, 'audiences' ),
			'ktheme_location'   => self::definition( 'Locations', 'Location', array( 'ktheme_event', 'ktheme_profile' ), true, 'locations' ),
		);
	}

	/** @param list<string> $post_types @return array{post_types:list<string>,args:array<string,mixed>} */
	private static function definition( string $plural, string $singular, array $post_types, bool $hierarchical, string $rewrite_slug ): array {
		return array(
			'post_types' => $post_types,
			'args'       => array(
				'labels'       => array(
					'name'          => __( $plural, 'ktheme-engine' ),
					'singular_name' => __( $singular, 'ktheme-engine' ),
				),
				'public'       => true,
				'hierarchical' => $hierarchical,
				'show_in_rest' => true,
				'rewrite'      => array( 'slug' => $rewrite_slug ),
			),
		);
	}

	private static function filtered_args( string $taxonomy, array $args ): array {
		return apply_filters( 'ktheme/taxonomy/args', $args, $taxonomy );
	}
}
