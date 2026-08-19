<?php

namespace KTheme\Engine;

defined( 'ABSPATH' ) || exit;

require_once KTHEME_ENGINE_PATH . 'includes/class-extension-registry.php';
require_once KTHEME_ENGINE_PATH . 'includes/class-module-loader.php';
require_once KTHEME_ENGINE_PATH . 'includes/class-asset-manager.php';
require_once KTHEME_ENGINE_PATH . 'includes/class-rest-controller.php';

final class Plugin {
\tprivate static ?Plugin $instance = null;

\tprivate Extension_Registry $registry;

\tprivate Module_Loader $module_loader;

\tpublic static function boot(): void {
\t\tif ( null !== self::$instance ) {
\t\t\treturn;
\t\t}

\t\tself::$instance = new self();
\t\tadd_action( 'plugins_loaded', array( self::$instance, 'load_textdomain' ) );
\t\tadd_action( 'init', array( self::$instance, 'register_extensions' ) );
\t}

\tpublic static function activate(): void {
\t\tif ( version_compare( PHP_VERSION, '8.1', '<' ) ) {
\t\t\twp_die( esc_html__( 'KTheme Engine requires PHP 8.1 or later.', 'ktheme-engine' ) );
\t\t}

\t\tif ( version_compare( get_bloginfo( 'version' ), '6.5', '<' ) ) {
\t\t\twp_die( esc_html__( 'KTheme Engine requires WordPress 6.5 or later.', 'ktheme-engine' ) );
\t\t}
\t}

\tpublic static function deactivate(): void {
\t\t// Deliberately retain content and settings. Deactivation must be reversible.
\t}

\tprivate function __construct() {
\t\t$this->registry      = new Extension_Registry();
\t\t$this->module_loader = new Module_Loader( $this->registry );
\t}

\tpublic function load_textdomain(): void {
\t\tload_plugin_textdomain( 'ktheme-engine', false, dirname( plugin_basename( KTHEME_ENGINE_FILE ) ) . '/languages' );
\t}

\tpublic function register_extensions(): void {
\t\t$this->module_loader->register();
\t}
}
