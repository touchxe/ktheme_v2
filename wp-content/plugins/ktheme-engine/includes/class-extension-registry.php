<?php

namespace KTheme\Engine;

defined( 'ABSPATH' ) || exit;

final class Extension_Registry {
\t/** @var array<string, array<string, mixed>> */
\tprivate array $extensions;

\tpublic function __construct() {
\t\t$manifest = KTHEME_ENGINE_PATH . 'build/extensions-manifest.php';
\t\t$entries  = file_exists( $manifest ) ? require $manifest : array();

\t\t$this->extensions = is_array( $entries ) ? $entries : array();
\t}

\t/** @return array<string, array<string, mixed>> */
\tpublic function all(): array {
\t\treturn $this->extensions;
\t}

\t/** @return array<string, mixed>|null */
\tpublic function get( string $id ): ?array {
\t\treturn $this->extensions[ $id ] ?? null;
\t}
}
