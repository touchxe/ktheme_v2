<?php

namespace KTheme\Engine\Contracts;

defined( 'ABSPATH' ) || exit;

interface Extension {
	public function id(): string;

	public function register(): void;
}
