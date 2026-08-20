<?php

namespace KTheme\Preset\Church;

defined( 'ABSPATH' ) || exit;

final class Church_Preset {
\t/** @var array<string, array<string, string>> */
\tprivate static array $content_type_labels = array();

\t/** @var array<string, array<string, string>> */
\tprivate static array $taxonomy_labels = array();

\tpublic static function boot(): void {
\t\tif ( ! class_exists( 'KTheme\\Engine\\Plugin' ) ) {
\t\t\tadd_action( 'admin_notices', array( self::class, 'render_engine_notice' ) );
\t\t\treturn;
\t\t}

\t\tself::$content_type_labels = require KTHEME_PRESET_CHURCH_PATH . 'labels/content-types.php';
\t\tself::$taxonomy_labels     = require KTHEME_PRESET_CHURCH_PATH . 'labels/taxonomies.php';

\t\tadd_filter( 'ktheme/content-type/args', array( self::class, 'filter_content_type_args' ), 10, 2 );
\t\tadd_filter( 'ktheme/taxonomy/args', array( self::class, 'filter_taxonomy_args' ), 10, 2 );
\t}

\tpublic static function filter_content_type_args( array $args, string $post_type ): array {
\t\treturn self::replace_labels( $args, self::$content_type_labels[ $post_type ] ?? array() );
\t}

\tpublic static function filter_taxonomy_args( array $args, string $taxonomy ): array {
\t\treturn self::replace_labels( $args, self::$taxonomy_labels[ $taxonomy ] ?? array() );
\t}

\t/** @param array<string, string> $labels */
\tprivate static function replace_labels( array $args, array $labels ): array {
\t\tif ( empty( $labels ) ) {
\t\t\treturn $args;
\t\t}

\t\t$singular = $labels['singular'] ?? '';
\t\t$plural   = $labels['plural'] ?? '';
\t\t$args['labels'] = array_merge(
\t\t\t$args['labels'] ?? array(),
\t\t\tarray(
\t\t\t\t'name'          => $plural,
\t\t\t\t'singular_name' => $singular,
\t\t\t\t'add_new_item'  => sprintf( __( 'Add %s', 'ktheme-preset-church' ), $singular ),
\t\t\t\t'edit_item'     => sprintf( __( 'Edit %s', 'ktheme-preset-church' ), $singular ),
\t\t\t\t'all_items'     => sprintf( __( 'All %s', 'ktheme-preset-church' ), $plural ),
\t\t\t)
\t\t);

\t\treturn $args;
\t}

\tpublic static function render_engine_notice(): void {
\t\tif ( ! current_user_can( 'activate_plugins' ) ) {
\t\t\treturn;
\t\t}

\t\techo '<div class="notice notice-warning"><p>' . esc_html__( 'KTheme Church Preset requires KTheme Engine to be active.', 'ktheme-preset-church' ) . '</p></div>';
\t}
}
