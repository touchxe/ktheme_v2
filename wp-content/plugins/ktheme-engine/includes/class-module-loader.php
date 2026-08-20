<?php

namespace KTheme\Engine;

defined( 'ABSPATH' ) || exit;

final class Module_Loader {
	public function __construct( private Extension_Registry $registry ) {}

	public function register(): void {
		foreach ( $this->registry->all() as $id => $extension ) {
			if ( ! isset( $extension['status'] ) || 'stable' !== $extension['status'] ) {
				continue;
			}

			do_action( 'ktheme/extension/registered', $id, $extension );
		}
	}
}
