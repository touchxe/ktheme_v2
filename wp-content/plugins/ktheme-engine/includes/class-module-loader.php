<?php

namespace KTheme\Engine;

defined( 'ABSPATH' ) || exit;

final class Module_Loader {
\tpublic function __construct( private Extension_Registry $registry ) {}

\tpublic function register(): void {
\t\tforeach ( $this->registry->all() as $id => $extension ) {
\t\t\tif ( ! isset( $extension['status'] ) || 'stable' !== $extension['status'] ) {
\t\t\t\tcontinue;
\t\t\t}

\t\t\tdo_action( 'ktheme/extension/registered', $id, $extension );
\t\t}
\t}
}
