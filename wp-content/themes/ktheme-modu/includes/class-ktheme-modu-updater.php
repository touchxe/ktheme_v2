<?php

defined( 'ABSPATH' ) || exit;

final class KTheme_Modu_Updater {
	private const PRODUCT = 'ktheme-modu';
	private const ENDPOINT = 'https://k-thememarket.co.kr/wp-json/ktheme/v1/releases/check';

	public static function boot(): void {
		add_filter( 'pre_set_site_transient_update_themes', array( __CLASS__, 'check' ) );
	}

	public static function check( $transient ) {
		if ( ! is_object( $transient ) || empty( $transient->checked[ self::PRODUCT ] ) ) {
			return $transient;
		}

		$release = self::request( array( self::PRODUCT => (string) $transient->checked[ self::PRODUCT ] ) );
		if ( ! $release || empty( $release['package_url'] ) || empty( $release['version'] ) || ! version_compare( $release['version'], $transient->checked[ self::PRODUCT ], '>' ) ) {
			return $transient;
		}

		$transient->response[ self::PRODUCT ] = array(
			'theme'        => self::PRODUCT,
			'new_version'  => sanitize_text_field( $release['version'] ),
			'url'          => isset( $release['details_url'] ) ? esc_url_raw( $release['details_url'] ) : '',
			'package'      => esc_url_raw( $release['package_url'] ),
			'requires'     => isset( $release['requires_wordpress'] ) ? sanitize_text_field( $release['requires_wordpress'] ) : '',
			'requires_php' => isset( $release['requires_php'] ) ? sanitize_text_field( $release['requires_php'] ) : '',
			'ktheme_sha256'=> isset( $release['sha256'] ) ? sanitize_text_field( $release['sha256'] ) : '',
		);

		return $transient;
	}

	private static function request( array $installed ): ?array {
		$endpoint = apply_filters( 'ktheme_modu_update_endpoint', self::ENDPOINT );
		$response = wp_remote_post(
			$endpoint,
			array(
				'timeout' => 10,
				'headers' => array( 'Content-Type' => 'application/json' ),
				'body'    => wp_json_encode(
					array(
						'installed'  => $installed,
						'license_key'=> (string) get_option( 'ktheme_modu_license_key', '' ),
						'domain'     => home_url( '/' ),
						'channel'    => 'testing' === get_option( 'ktheme_modu_update_channel', 'stable' ) ? 'testing' : 'stable',
					)
				),
			)
		);
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) { return null; }
		$payload = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( ! is_array( $payload ) || empty( $payload['releases'] ) ) { return null; }
		foreach ( $payload['releases'] as $release ) {
			if ( isset( $release['product'] ) && self::PRODUCT === $release['product'] ) { return $release; }
		}
		return null;
	}
}
