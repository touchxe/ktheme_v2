<?php

namespace KTheme\Engine;

defined( 'ABSPATH' ) || exit;

final class Market_Updater {
	private const ENDPOINT = 'https://k-thememarket.co.kr/wp-json/ktheme/v1/releases/check';

	public static function boot(): void {
		add_filter( 'pre_set_site_transient_update_plugins', array( __CLASS__, 'check' ) );
	}

	public static function check( $transient ) {
		if ( ! is_object( $transient ) || empty( $transient->checked ) ) { return $transient; }
		$products = array(
			'ktheme-engine' => array( 'file' => plugin_basename( KTHEME_ENGINE_FILE ), 'version' => KTHEME_ENGINE_VERSION ),
		);
		$preset_file = WP_PLUGIN_DIR . '/ktheme-preset-church/ktheme-preset-church.php';
		if ( is_readable( $preset_file ) ) {
			$data = get_file_data( $preset_file, array( 'version' => 'Version' ) );
			$products['ktheme-preset-church'] = array( 'file' => 'ktheme-preset-church/ktheme-preset-church.php', 'version' => isset( $data['version'] ) ? $data['version'] : '0.0.0' );
		}

		$installed = array();
		foreach ( $products as $product => $data ) { $installed[ $product ] = $data['version']; }
		$releases = self::request( $installed );
		foreach ( $releases as $release ) {
			$product = isset( $release['product'] ) ? sanitize_key( $release['product'] ) : '';
			if ( ! isset( $products[ $product ] ) || empty( $release['package_url'] ) || empty( $release['version'] ) || ! version_compare( $release['version'], $products[ $product ]['version'], '>' ) ) { continue; }
			$file = $products[ $product ]['file'];
			$transient->response[ $file ] = (object) array(
				'id'           => 'https://k-thememarket.co.kr/' . $product,
				'slug'         => $product,
				'plugin'       => $file,
				'new_version'  => sanitize_text_field( $release['version'] ),
				'url'          => isset( $release['details_url'] ) ? esc_url_raw( $release['details_url'] ) : '',
				'package'      => esc_url_raw( $release['package_url'] ),
				'requires'     => isset( $release['requires_wordpress'] ) ? sanitize_text_field( $release['requires_wordpress'] ) : '',
				'requires_php' => isset( $release['requires_php'] ) ? sanitize_text_field( $release['requires_php'] ) : '',
				'ktheme_sha256'=> isset( $release['sha256'] ) ? sanitize_text_field( $release['sha256'] ) : '',
			);
		}
		return $transient;
	}

	private static function request( array $installed ): array {
		$response = wp_remote_post(
			apply_filters( 'ktheme_engine_update_endpoint', self::ENDPOINT ),
			array(
				'timeout' => 10,
				'headers' => array( 'Content-Type' => 'application/json' ),
				'body'    => wp_json_encode( array(
					'installed' => $installed,
					'license_key' => (string) get_option( 'ktheme_modu_license_key', '' ),
					'domain' => home_url( '/' ),
					'channel' => 'testing' === get_option( 'ktheme_modu_update_channel', 'stable' ) ? 'testing' : 'stable',
				) ),
			)
		);
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) { return array(); }
		$payload = json_decode( wp_remote_retrieve_body( $response ), true );
		return is_array( $payload ) && isset( $payload['releases'] ) && is_array( $payload['releases'] ) ? $payload['releases'] : array();
	}
}
