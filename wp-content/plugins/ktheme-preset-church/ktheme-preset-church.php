<?php
/**
 * Plugin Name: KTheme Church Preset
 * Description: Optional church labels, suggested terms, navigation, and demo guidance for KTheme Engine.
 * Version: 1.0.0
 * Update URI: https://k-thememarket.co.kr/
 * Requires at least: 6.5
 * Requires PHP: 8.1
 * Author: KTheme
 * Text Domain: ktheme-preset-church
 * Domain Path: /languages
 */

defined( 'ABSPATH' ) || exit;

define( 'KTHEME_PRESET_CHURCH_PATH', plugin_dir_path( __FILE__ ) );
define( 'KTHEME_PRESET_CHURCH_VERSION', '1.0.0' );

require_once KTHEME_PRESET_CHURCH_PATH . 'includes/class-church-preset.php';

\KTheme\Preset\Church\Church_Preset::boot();
