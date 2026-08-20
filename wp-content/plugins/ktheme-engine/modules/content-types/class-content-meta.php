<?php

namespace KTheme\Engine\Modules;

defined( 'ABSPATH' ) || exit;

final class Content_Meta {
	public static function register(): void {
		foreach ( self::definitions() as $post_type => $fields ) {
			foreach ( $fields as $meta_key => $args ) {
				register_post_meta( $post_type, $meta_key, $args );
			}
		}
	}

	/** @return array<string, array<string, array<string, mixed>>> */
	private static function definitions(): array {
		return array(
			'ktheme_media'    => array(
				'ktheme_source_url'      => self::field( 'string', '', array( self::class, 'sanitize_url' ) ),
				'ktheme_duration'        => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
				'ktheme_publish_context' => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
			),
			'ktheme_event'    => array(
				'ktheme_event_start'        => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
				'ktheme_event_end'          => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
				'ktheme_event_timezone'     => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
				'ktheme_location_reference' => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
			),
			'ktheme_resource' => array(
				'ktheme_file_id'      => self::field( 'integer', 0, array( self::class, 'sanitize_integer' ) ),
				'ktheme_external_url' => self::field( 'string', '', array( self::class, 'sanitize_url' ) ),
				'ktheme_resource_type' => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
			),
			'ktheme_profile'  => array(
				'ktheme_role'               => self::field( 'string', '', array( self::class, 'sanitize_text' ) ),
				'ktheme_contact_visibility' => self::field( 'boolean', false, array( self::class, 'sanitize_boolean' ) ),
				'ktheme_display_order'      => self::field( 'integer', 0, array( self::class, 'sanitize_integer' ) ),
			),
		);
	}

	private static function field( string $type, mixed $default, callable $sanitize_callback ): array {
		return array(
			'type'              => $type,
			'single'            => true,
			'default'           => $default,
			'show_in_rest'      => true,
			'sanitize_callback' => $sanitize_callback,
			'auth_callback'     => array( self::class, 'can_edit' ),
		);
	}

	public static function can_edit( bool $allowed, string $meta_key, int $post_id ): bool {
		return current_user_can( 'edit_post', $post_id );
	}

	public static function sanitize_text( mixed $value ): string {
		return sanitize_text_field( (string) $value );
	}

	public static function sanitize_url( mixed $value ): string {
		return esc_url_raw( (string) $value );
	}

	public static function sanitize_integer( mixed $value ): int {
		return absint( $value );
	}

	public static function sanitize_boolean( mixed $value ): bool {
		return (bool) $value;
	}
}
