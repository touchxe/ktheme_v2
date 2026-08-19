<?php

namespace KTheme\Engine\Modules;

defined( 'ABSPATH' ) || exit;

final class Taxonomies {
\tpublic static function register(): void {
\t\tforeach ( self::definitions() as $taxonomy => $definition ) {
\t\t\tregister_taxonomy( $taxonomy, $definition['post_types'], self::filtered_args( $taxonomy, $definition['args'] ) );
\t\t}
\t}

\t/** @return array<string, array{post_types:list<string>,args:array<string,mixed>}> */
\tprivate static function definitions(): array {
\t\treturn array(
\t\t\t'ktheme_media_type' => self::definition( 'Media Types', 'Media Type', array( 'ktheme_media' ), false, 'media-type' ),
\t\t\t'ktheme_collection' => self::definition( 'Collections', 'Collection', array( 'ktheme_media', 'ktheme_resource' ), true, 'collections' ),
\t\t\t'ktheme_topic'      => self::definition( 'Topics', 'Topic', array( 'ktheme_media', 'ktheme_event', 'ktheme_resource' ), true, 'topics' ),
\t\t\t'ktheme_audience'   => self::definition( 'Audiences', 'Audience', array( 'ktheme_media', 'ktheme_event', 'ktheme_resource', 'ktheme_profile' ), true, 'audiences' ),
\t\t\t'ktheme_location'   => self::definition( 'Locations', 'Location', array( 'ktheme_event', 'ktheme_profile' ), true, 'locations' ),
\t\t);
\t}

\t/** @param list<string> $post_types @return array{post_types:list<string>,args:array<string,mixed>} */
\tprivate static function definition( string $plural, string $singular, array $post_types, bool $hierarchical, string $rewrite_slug ): array {
\t\treturn array(
\t\t\t'post_types' => $post_types,
\t\t\t'args'       => array(
\t\t\t\t'labels'       => array(
\t\t\t\t\t'name'          => __( $plural, 'ktheme-engine' ),
\t\t\t\t\t'singular_name' => __( $singular, 'ktheme-engine' ),
\t\t\t\t),
\t\t\t\t'public'       => true,
\t\t\t\t'hierarchical' => $hierarchical,
\t\t\t\t'show_in_rest' => true,
\t\t\t\t'rewrite'      => array( 'slug' => $rewrite_slug ),
\t\t\t),
\t\t);
\t}

\tprivate static function filtered_args( string $taxonomy, array $args ): array {
\t\treturn apply_filters( 'ktheme/taxonomy/args', $args, $taxonomy );
\t}
}
