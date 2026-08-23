#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ENV_FILE = join(ROOT, '.env.local');
const REMOTE_SCRIPT = 'ktheme-modu-fix-page-templates-once.php';

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

function run(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8' });

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
  throw new Error(`Missing ${ENV_FILE}`);
}

const env = parseEnv(readFileSync(ENV_FILE, 'utf8'));
const host = requireEnv(env, 'FTP_HOST');
const user = requireEnv(env, 'FTP_USER');
const password = requireEnv(env, 'FTP_PASSWORD');
const themeSlug = env.THEME_SLUG || 'ktheme-modu';
const baseUrl = (env.WP_BASE_URL || `https://${host}`).replace(/\/+$/, '');
const token = randomBytes(16).toString('hex');
const tempScript = join(tmpdir(), REMOTE_SCRIPT);

const php = `<?php
declare(strict_types=1);

if ( ! isset( $_GET['token'] ) || $_GET['token'] !== '${token}' ) {
\thttp_response_code( 403 );
\texit( 'Forbidden' );
}

require_once __DIR__ . '/wp-load.php';

$theme_slug = '${themeSlug}';
$page_updates = array(
\t'wednesday-worship' => array(
\t\t'template' => 'page-wednesday-worship',
\t\t'content'  => "<!-- wp:shortcode -->\\n[ktheme_sunday_worship_grid]\\n<!-- /wp:shortcode -->",
\t),
\t'dawn-prayer' => array(
\t\t'template' => 'page-dawn-prayer',
\t\t'content'  => "<!-- wp:shortcode -->\\n[ktheme_sunday_worship_grid]\\n<!-- /wp:shortcode -->",
\t),
\t'bulletin' => array(
\t\t'template' => 'page-bulletin',
\t\t'content'  => '',
\t),
);

$results = array(
\t'pages'     => array(),
\t'templates' => array(),
);

foreach ( $page_updates as $slug => $config ) {
\t$page = get_page_by_path( $slug );

\tif ( ! $page instanceof WP_Post ) {
\t\t$results['pages'][ $slug ] = array( 'ok' => false, 'reason' => 'page not found' );
\t\tcontinue;
\t}

\t$updated = wp_update_post(
\t\tarray(
\t\t\t'ID'           => $page->ID,
\t\t\t'post_status'  => 'publish',
\t\t\t'post_content' => $config['content'],
\t\t),
\t\ttrue
\t);

\tif ( is_wp_error( $updated ) ) {
\t\t$results['pages'][ $slug ] = array( 'ok' => false, 'reason' => $updated->get_error_message() );
\t\tcontinue;
\t}

\tupdate_post_meta( $page->ID, '_wp_page_template', $config['template'] );
\tclean_post_cache( $page->ID );

\t$results['pages'][ $slug ] = array(
\t\t'ok'       => true,
\t\t'id'       => $page->ID,
\t\t'template' => get_post_meta( $page->ID, '_wp_page_template', true ),
\t);
}

global $wpdb;
$template_slugs = array( 'page-bulletin', 'page-wednesday-worship', 'page-dawn-prayer' );

foreach ( $template_slugs as $template_slug ) {
\t$template_file = get_theme_file_path( 'templates/' . $template_slug . '.html' );

\tif ( ! is_readable( $template_file ) ) {
\t\t$results['templates'][ $template_slug ] = array( 'ok' => false, 'reason' => 'template file not readable' );
\t\tcontinue;
\t}

\t$template_content = file_get_contents( $template_file );
\t$template_ids = $wpdb->get_col(
\t\t$wpdb->prepare(
\t\t\t"SELECT ID FROM {$wpdb->posts} WHERE post_type = 'wp_template' AND post_name LIKE %s",
\t\t\t'%' . $wpdb->esc_like( $template_slug ) . '%'
\t\t)
\t);

\t$updated_ids = array();
\tforeach ( $template_ids as $template_id ) {
\t\t$result = wp_update_post(
\t\t\tarray(
\t\t\t\t'ID'           => (int) $template_id,
\t\t\t\t'post_status'  => 'publish',
\t\t\t\t'post_content' => $template_content,
\t\t\t),
\t\t\ttrue
\t\t);

\t\tif ( ! is_wp_error( $result ) ) {
\t\t\tclean_post_cache( (int) $template_id );
\t\t\t$updated_ids[] = (int) $template_id;
\t\t}
\t}

\t$results['templates'][ $template_slug ] = array(
\t\t'ok'          => true,
\t\t'file_bytes'  => strlen( $template_content ),
\t\t'updated_ids' => $updated_ids,
\t);
}

if ( function_exists( 'wp_clean_themes_cache' ) ) {
\twp_clean_themes_cache( false );
}

if ( function_exists( 'wp_cache_flush' ) ) {
\twp_cache_flush();
}

header( 'Content-Type: application/json; charset=utf-8' );
echo wp_json_encode( $results );
`;

try {
  writeFileSync(tempScript, php, 'utf8');

  console.log('Uploading temporary page-template fixer...');
  run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    '--user',
    `${user}:${password}`,
    '--ftp-create-dirs',
    '--upload-file',
    tempScript,
    ftpUrl(host, REMOTE_SCRIPT),
  ]);

  console.log('Triggering live WordPress fix...');
  console.log(run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    `${baseUrl}/${REMOTE_SCRIPT}?token=${token}`,
  ]));

  console.log('Removing temporary page-template fixer...');
  run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    '--user',
    `${user}:${password}`,
    '--quote',
    `-DELE ${REMOTE_SCRIPT}`,
    `ftp://${host}/`,
  ]);

  console.log('Live page template fix complete.');
} finally {
  if (existsSync(tempScript)) {
    unlinkSync(tempScript);
  }
}
