<?php

namespace KTheme\Engine;

defined( 'ABSPATH' ) || exit;

final class Extension_Registry {
	/** @var array<string, array<string, mixed>> */
	private array $extensions;

	public function __construct() {
		$manifest = KTHEME_ENGINE_PATH . 'build/extensions-manifest.php';
		$entries  = file_exists( $manifest ) ? require $manifest : array();

		$this->extensions = is_array( $entries ) ? $entries : array();
	}

	/** @return array<string, array<string, mixed>> */
	public function all(): array {
		return $this->extensions;
	}

	/** @return array<string, mixed>|null */
	public function get( string $id ): ?array {
		return $this->extensions[ $id ] ?? null;
	}
}
