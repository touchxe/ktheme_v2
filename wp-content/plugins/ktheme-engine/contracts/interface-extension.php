<?php

namespace KTheme\Engine\Contracts;

defined( 'ABSPATH' ) || exit;

interface Extension {
\tpublic function id(): string;

\tpublic function register(): void;
}
