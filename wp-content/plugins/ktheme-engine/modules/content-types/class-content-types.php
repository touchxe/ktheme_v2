<?php

namespace KTheme\Engine\Modules;

defined( 'ABSPATH' ) || exit;

final class Content_Types {
\tpublic static function register(): void {
\t\tforeach ( self::definitions() as $post_type => $definition ) {
\t\t\tregister_post_type( $post_type, self::filtered_args( $post_type, $definition ) );
\t\t}
\t}

\t/** @return array<string, array<string, mixed>> */
\tprivate static function definitions(): array {
\t\treturn array(
\t\t\t'ktheme_media'    => self::definition( 'Media', 'Media Item', 'media', array( 'title', 'editor', 'excerpt', 'thumbnail', 'author' ), 'dashicons-format-video' ),
\t\t\t'ktheme_event'    => self::definition( 'Events', 'Event', 'events', array( 'title', 'editor', 'excerpt', 'thumbnail' ), 'dashicons-calendar-alt' ),
\t\t\t'ktheme_resource' => self::definition( 'Resources', 'Resource', 'resources', array( 'title', 'editor', 'excerpt', 'thumbnail' ), 'dashicons-media-document' ),
\t\t\t'ktheme_profile'  => self::definition( 'Profiles', 'Profile', 'profiles', array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ), 'dashicons-id' ),
\t\t);
\t}

\t/** @param list<string> $supports */
\tprivate static function definition( string $plural, string $singular, string $rewrite_slug, array $supports, string $menu_icon ): array {
\t\treturn array(
\t\t\t'labels'       => array(
\t\t\t\t'name'          => __( $plural, 'ktheme-engine' ),
\t\t\t\t'singular_name' => __( $singular, 'ktheme-engine' ),
\t\t\t\t'add_new_item'  => sprintf( __( 'Add %s', 'ktheme-engine' ), $singular ),
\t\t\t\t'edit_item'     => sprintf( __( 'Edit %s', 'ktheme-engine' ), $singular ),
\t\t\t\t'all_items'     => sprintf( __( 'All %s', 'ktheme-engine' ), $plural ),
\t\t\t),
\t\t\t'public'       => true,
\t\t\t'show_in_rest' => true,
\t\t\t'menu_icon'    => $menu_icon,
\t\t\t'has_archive'  => true,
\t\t\t'rewrite'      => array( 'slug' => $rewrite_slug ),
\t\t\t'supports'     => $supports,
\t\t);
\t}

\tprivate static function filtered_args( string $post_type, array $args ): array {
\t\t/** This lets a preset change labels or presentation without creating another content model. */
\t\treturn apply_filters( 'ktheme/content-type/args', $args, $post_type );
\t}
}
