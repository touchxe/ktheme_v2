#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const ENV_FILE = join(ROOT, '.env.local');
const REMOTE_ACTIVATOR = 'modu-theme-activate-once.php';

function parseEnv(content) {
  const env = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const equalsAt = trimmed.indexOf('=');
    if (equalsAt === -1) continue;

    const key = trimmed.slice(0, equalsAt).trim();
    let value = trimmed.slice(equalsAt + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function requireEnv(env, key) {
  if (!env[key]) {
    throw new Error(`Missing required env: ${key}`);
  }
  return env[key];
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options });

  if (result.status !== 0) {
    const message = result.stderr?.trim() || result.stdout?.trim() || `${command} failed`;
    throw new Error(message);
  }

  return result.stdout;
}

function encodeFtpPath(path) {
  return path
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function ftpUrl(host, path) {
  return `ftp://${host}/${encodeFtpPath(path)}`;
}

if (!existsSync(ENV_FILE)) {
  console.error(`Missing ${ENV_FILE}. Create it from .env.example first.`);
  process.exit(1);
}

const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
const host = requireEnv(env, 'FTP_HOST');
const user = requireEnv(env, 'FTP_USER');
const password = requireEnv(env, 'FTP_PASSWORD');
const baseUrl = requireEnv(env, 'WP_BASE_URL');
const apiUrl = requireEnv(env, 'WP_API_URL');
const wpUser = requireEnv(env, 'WP_USERNAME');
const wpPassword = requireEnv(env, 'WP_APP_PASSWORD');
const themeSlug = env.THEME_SLUG || 'modu-theme';
const tempPlugin = join(tmpdir(), 'modu-theme-activate-once.php');
const token = randomBytes(16).toString('hex');

const php = `<?php
declare(strict_types=1);

if ( ! isset( $_GET['token'] ) || $_GET['token'] !== '${token}' ) {
\thttp_response_code( 403 );
\texit( 'Forbidden' );
}

require_once __DIR__ . '/wp-load.php';

if ( ! wp_get_theme( '${themeSlug}' )->exists() ) {
\thttp_response_code( 404 );
\texit( 'Theme not found' );
}

$theme = wp_get_theme( '${themeSlug}' );
$before = array(
\t'template'   => get_option( 'template' ),
\t'stylesheet' => get_option( 'stylesheet' ),
);
$requirements = function_exists( 'validate_theme_requirements' )
\t? validate_theme_requirements( '${themeSlug}' )
\t: true;

if ( is_wp_error( $requirements ) ) {
\theader( 'Content-Type: application/json; charset=utf-8' );
\techo wp_json_encode(
\t\tarray(
\t\t\t'ok'     => false,
\t\t\t'php'    => PHP_VERSION,
\t\t\t'errors' => $requirements->get_error_messages(),
\t\t\t'before' => $before,
\t\t\t'target' => array(
\t\t\t\t'stylesheet'   => $theme->get_stylesheet(),
\t\t\t\t'template'     => $theme->get_template(),
\t\t\t\t'name'         => $theme->get( 'Name' ),
\t\t\t\t'requires_php' => $theme->get( 'RequiresPHP' ),
\t\t\t\t'requires_wp'  => $theme->get( 'RequiresWP' ),
\t\t\t),
\t\t)
\t);
\texit;
}

if ( get_option( 'stylesheet' ) !== '${themeSlug}' ) {
\tswitch_theme( '${themeSlug}' );
}

$after_switch = array(
\t'template'   => get_option( 'template' ),
\t'stylesheet' => get_option( 'stylesheet' ),
);

if ( get_option( 'stylesheet' ) !== '${themeSlug}' ) {
\t$option_updates = array(
\t\t'template'      => update_option( 'template', $theme->get_template() ),
\t\t'stylesheet'    => update_option( 'stylesheet', $theme->get_stylesheet() ),
\t\t'current_theme' => update_option( 'current_theme', $theme->get( 'Name' ) ),
\t);
} else {
\t$option_updates = array();
}

if ( get_option( 'stylesheet' ) !== '${themeSlug}' ) {
\tglobal $wpdb;
\t$wpdb_updates = array(
\t\t'template'      => false !== $wpdb->update( $wpdb->options, array( 'option_value' => $theme->get_template() ), array( 'option_name' => 'template' ) ),
\t\t'stylesheet'    => false !== $wpdb->update( $wpdb->options, array( 'option_value' => $theme->get_stylesheet() ), array( 'option_name' => 'stylesheet' ) ),
\t\t'current_theme' => false !== $wpdb->update( $wpdb->options, array( 'option_value' => $theme->get( 'Name' ) ), array( 'option_name' => 'current_theme' ) ),
\t);
\twp_cache_delete( 'alloptions', 'options' );
\twp_cache_delete( 'template', 'options' );
\twp_cache_delete( 'stylesheet', 'options' );
\twp_cache_delete( 'current_theme', 'options' );
} else {
\t$wpdb_updates = array();
}

$after = array(
\t'template'   => get_option( 'template' ),
\t'stylesheet' => get_option( 'stylesheet' ),
);

header( 'Content-Type: application/json; charset=utf-8' );
echo wp_json_encode(
\tarray(
\t\t'ok'           => get_option( 'stylesheet' ) === '${themeSlug}',
\t\t'php'          => PHP_VERSION,
\t\t'before'       => $before,
\t\t'after_switch' => $after_switch,
\t\t'option_updates' => $option_updates,
\t\t'wpdb_updates'   => $wpdb_updates,
\t\t'after'        => $after,
\t\t'target'       => array(
\t\t\t'stylesheet'   => $theme->get_stylesheet(),
\t\t\t'template'     => $theme->get_template(),
\t\t\t'name'         => $theme->get( 'Name' ),
\t\t\t'requires_php' => $theme->get( 'RequiresPHP' ),
\t\t\t'requires_wp'  => $theme->get( 'RequiresWP' ),
\t\t),
\t)
);
`;

try {
  writeFileSync(tempPlugin, php);

  console.log(`Uploading temporary activator for ${themeSlug}...`);
  run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    '--user',
    `${user}:${password}`,
    '--ftp-create-dirs',
    '--upload-file',
    tempPlugin,
    ftpUrl(host, REMOTE_ACTIVATOR),
  ]);

  console.log('Triggering WordPress...');
  console.log(run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    `${baseUrl.replace(/\/+$/, '')}/${REMOTE_ACTIVATOR}?token=${token}`,
  ]));

  console.log('Removing temporary activator...');
  run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    '--user',
    `${user}:${password}`,
    '--quote',
    `-DELE ${REMOTE_ACTIVATOR}`,
    `ftp://${host}/`,
  ]);

  const themesRaw = run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    '--user',
    `${wpUser}:${wpPassword}`,
    `${apiUrl}/themes`,
  ]);
  const themes = JSON.parse(themesRaw);
  const theme = themes.find((item) => item.stylesheet === themeSlug);

  if (!theme) {
    throw new Error(`Theme not found after activation: ${themeSlug}`);
  }

  console.log(JSON.stringify({
    stylesheet: theme.stylesheet,
    name: theme.name?.rendered || theme.name,
    status: theme.status,
    is_block_theme: theme.is_block_theme,
  }, null, 2));

  if (theme.status !== 'active') {
    throw new Error(`Theme activation did not complete. Status: ${theme.status}`);
  }

  console.log('Theme activation complete.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
} finally {
  if (existsSync(tempPlugin)) {
    unlinkSync(tempPlugin);
  }
}
