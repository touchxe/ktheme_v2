<?php
/**
 * Plugin Name: KTheme Engine
 * Description: Generic content and extension runtime for KTheme products.
 * Version: 1.0.0
 * Update URI: https://k-thememarket.co.kr/
 * Requires at least: 6.5
 * Requires PHP: 8.1
 * Author: KTheme
 * Text Domain: ktheme-engine
 * Domain Path: /languages
 */

defined( 'ABSPATH' ) || exit;

define( 'KTHEME_ENGINE_VERSION', '1.0.0' );
define( 'KTHEME_ENGINE_FILE', __FILE__ );
define( 'KTHEME_ENGINE_PATH', plugin_dir_path( __FILE__ ) );
define( 'KTHEME_ENGINE_URL', plugin_dir_url( __FILE__ ) );

require_once KTHEME_ENGINE_PATH . 'includes/class-plugin.php';

register_activation_hook( KTHEME_ENGINE_FILE, array( 'KTheme\\Engine\\Plugin', 'activate' ) );
register_deactivation_hook( KTHEME_ENGINE_FILE, array( 'KTheme\\Engine\\Plugin', 'deactivate' ) );

\KTheme\Engine\Plugin::boot();
