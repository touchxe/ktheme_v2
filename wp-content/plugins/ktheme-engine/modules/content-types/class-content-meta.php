<?php

namespace KTheme\Engine\Modules;

defined( 'ABSPATH' ) || exit;

final class Content_Meta {
\tpublic static function register(): void {
\t\tforeach ( self::definitions() as $post_type => $fields ) {
\t\t\tforeach ( $fields as $meta_key => $args ) {
\t\t\t\tregister_post_meta( $post_type, $meta_key, $args );
\t\t\t}
\t\t}
\t}

\t/** @return array<string, array<string, array<string, mixed>>> */
\tprivate static function definitions(): array {
\t\treturn array(
\t\t\t'ktheme_media'    => array(
\t\t\t\t'ktheme_source_url'      => self::field( 'string', '', array( self::class, 'sanitize_url' ) ),
\t\t\t\t'ktheme_duration'        => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t\t'ktheme_publish_context' => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t),
\t\t\t'ktheme_event'    => array(
\t\t\t\t'ktheme_event_start'        => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t\t'ktheme_event_end'          => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t\t'ktheme_event_timezone'     => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t\t'ktheme_location_reference' => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t),
\t\t\t'ktheme_resource' => array(
\t\t\t\t'ktheme_file_id'      => self::field( 'integer', 0, array( self::class, 'sanitize_integer' ) ),
\t\t\t\t'ktheme_external_url' => self::field( 'string', '', array( self::class, 'sanitize_url' ) ),
\t\t\t\t'ktheme_resource_type' => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t),
\t\t\t'ktheme_profile'  => array(
\t\t\t\t'ktheme_role'               => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
\t\t\t\t'ktheme_contact_visibility' => self::field( 'boolean', false, array( self::class, 'sanitize_boolean' ) ),
\t\t\t\t'ktheme_display_order'      => self::field( 'integer', 0, array( self::class, 'sanitize_integer' ) ),
\t\t\t),
\t\t);
\t}

\tprivate static function field( string $type, mixed $default, callable $sanitize_callback ): array {
\t\treturn array(
\t\t\t'type'              => $type,
\t\t\t'single'            => true,
\t\t\t'default'           => $default,
\t\t\t'show_in_rest'      => true,
\t\t\t'sanitize_callback' => $sanitize_callback,
\t\t\t'auth_callback'     => array( self::class, 'can_edit' ),
\t\t);
\t}

\tpublic static function can_edit( bool $allowed, string $meta_key, int $post_id ): bool {
\t\treturn current_user_can( 'edit_post', $post_id );
\t}

\tpublic static function sanitize_text( mixed $value ): string {
\t\treturn sanitize_text_field( (string) $value );
\t}

\tpublic static function sanitize_url( mixed $value ): string {
\t\treturn esc_url_raw( (string) $value );
\t}

\tpublic static function sanitize_integer( mixed $value ): int {
\t\treturn absint( $value );
\t}

\tpublic static function sanitize_boolean( mixed $value ): bool {
\t\treturn (bool) $value;
\t}
}
