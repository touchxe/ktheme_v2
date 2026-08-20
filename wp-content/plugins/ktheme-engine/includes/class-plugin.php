<?php

namespace KTheme\Engine;

defined( 'ABSPATH' ) || exit;

require_once KTHEME_ENGINE_PATH . 'includes/class-extension-registry.php';
require_once KTHEME_ENGINE_PATH . 'includes/class-module-loader.php';
require_once KTHEME_ENGINE_PATH . 'includes/class-asset-manager.php';
require_once KTHEME_ENGINE_PATH . 'includes/class-rest-controller.php';
require_once KTHEME_ENGINE_PATH . 'modules/content-types/class-content-types.php';
require_once KTHEME_ENGINE_PATH . 'modules/content-types/class-content-meta.php';
require_once KTHEME_ENGINE_PATH . 'modules/taxonomies/class-taxonomies.php';

final class Plugin {
	private static ?Plugin $instance = null;

	private Extension_Registry $registry;

	private Module_Loader $module_loader;

	public static function boot(): void {
		if ( null !== self::$instance ) {
			return;
		}

		self::$instance = new self();
		add_action( 'plugins_loaded', array( self::$instance, 'load_textdomain' ) );
		add_action( 'init', array( self::$instance, 'register_extensions' ) );
	}

	public static function activate(): void {
		if ( version_compare( PHP_VERSION, '8.1', '<' ) ) {
			wp_die( esc_html__( 'KTheme Engine requires PHP 8.1 or later.', 'ktheme-engine' ) );
		}

		if ( version_compare( get_bloginfo( 'version' ), '6.5', '<' ) ) {
			wp_die( esc_html__( 'KTheme Engine requires WordPress 6.5 or later.', 'ktheme-engine' ) );
		}
	}

	public static function deactivate(): void {
		// Deliberately retain content and settings. Deactivation must be reversible.
	}

	private function __construct() {
		$this->registry      = new Extension_Registry();
		$this->module_loader = new Module_Loader( $this->registry );
	}

	public function load_textdomain(): void {
		load_plugin_textdomain( 'ktheme-engine', false, dirname( plugin_basename( KTHEME_ENGINE_FILE ) ) . '/languages' );
	}

	public function register_extensions(): void {
		Modules\Content_Types::register();
		Modules\Taxonomies::register();
		Modules\Content_Meta::register();
		$this->module_loader->register();
	}
}
