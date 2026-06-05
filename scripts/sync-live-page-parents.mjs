#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ENV_FILE = join(ROOT, '.env.local');
const REMOTE_SCRIPT = 'ktheme-v2-sync-page-parents-once.php';

const parentMap = {
  vision: 'about',
  people: 'about',
  history: 'about',
  'annual-schedule': 'about',
  location: 'about',
  'worship-guide': 'worship',
  'sunday-worship': 'worship',
  'wednesday-worship': 'worship',
  'dawn-prayer': 'worship',
  bulletin: 'worship',
  newcomers: 'community',
  'small-groups': 'community',
  'next-generation': 'community',
  'youth-ministry': 'community',
  'senior-ministry': 'community',
  'new-family-course': 'training',
  'bible-study': 'training',
  discipleship: 'training',
  qt: 'training',
  serve: 'mission',
  support: 'mission',
  news: 'media',
  'denomination-news': 'media',
  videos: 'media',
  library: 'media',
  giving: 'admin-guide',
  documents: 'admin-guide',
  'facility-request': 'admin-guide',
  'vehicle-request': 'admin-guide',
  contact: 'admin-guide',
};

const topLevelSlugs = [
  'about',
  'worship',
  'community',
  'training',
  'mission',
  'media',
  'admin-guide',
  'login',
  'register',
  'privacy-policy',
  'email-policy',
  'design-library',
];

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

$parent_map = json_decode( '${JSON.stringify(parentMap).replace(/'/g, "\\'")}', true );
$top_level_slugs = json_decode( '${JSON.stringify(topLevelSlugs).replace(/'/g, "\\'")}', true );
$managed_slugs = array_values( array_unique( array_merge( array_keys( $parent_map ), $top_level_slugs ) ) );

function ktheme_sync_find_pages_by_slug( string $slug ): array {
\tglobal $wpdb;
\t$page_ids = $wpdb->get_col(
\t\t$wpdb->prepare(
\t\t\t"SELECT ID FROM {$wpdb->posts} WHERE post_type = 'page' AND post_name = %s AND post_status NOT IN ('trash','auto-draft') ORDER BY CASE WHEN post_status = 'publish' THEN 0 ELSE 1 END, ID ASC",
\t\t\t$slug
\t\t)
\t);

\t$pages = array();
\tforeach ( $page_ids as $page_id ) {
\t\t$page = get_post( (int) $page_id );
\t\tif ( $page instanceof WP_Post ) {
\t\t\t$pages[] = $page;
\t\t}
\t}

\treturn $pages;
}

function ktheme_sync_find_page_by_slug( string $slug ): ?WP_Post {
\t$pages = ktheme_sync_find_pages_by_slug( $slug );

\treturn ! empty( $pages ) ? $pages[0] : null;
}

function ktheme_sync_page_snapshot( WP_Post $page ): array {
\t$parent = $page->post_parent > 0 ? get_post( $page->post_parent ) : null;

\treturn array(
\t\t'id'          => (int) $page->ID,
\t\t'title'       => get_the_title( $page ),
\t\t'slug'        => $page->post_name,
\t\t'parent_id'   => (int) $page->post_parent,
\t\t'parent_slug' => $parent instanceof WP_Post ? $parent->post_name : '',
\t\t'status'      => $page->post_status,
\t);
}

$results = array(
\t'updated'  => array(),
\t'unchanged'=> array(),
\t'missing'  => array(),
\t'skipped'  => array(),
\t'unmapped' => array(),
);

foreach ( $managed_slugs as $slug ) {
\t$pages = ktheme_sync_find_pages_by_slug( $slug );

\tif ( empty( $pages ) ) {
\t\t$results['missing'][] = $slug;
\t\tcontinue;
\t}

\t$target_parent_id = 0;
\t$target_parent_slug = '';

\tif ( isset( $parent_map[ $slug ] ) ) {
\t\t$target_parent_slug = (string) $parent_map[ $slug ];
\t\t$parent = ktheme_sync_find_page_by_slug( $target_parent_slug );

\t\tif ( ! $parent instanceof WP_Post ) {
\t\t\t$results['skipped'][ $slug ] = array(
\t\t\t\t'reason' => 'parent not found',
\t\t\t\t'target_parent_slug' => $target_parent_slug,
\t\t\t\t'pages' => array_map( 'ktheme_sync_page_snapshot', $pages ),
\t\t\t);
\t\t\tcontinue;
\t\t}

\t\t$target_parent_id = (int) $parent->ID;
\t}

\tforeach ( $pages as $page ) {
\t\t$before = ktheme_sync_page_snapshot( $page );

\t\tif ( (int) $page->post_parent === $target_parent_id ) {
\t\t\t$results['unchanged'][ $slug ][] = array(
\t\t\t\t'target_parent_slug' => $target_parent_slug,
\t\t\t\t'page' => $before,
\t\t\t);
\t\t\tcontinue;
\t\t}

\t\t$updated = wp_update_post(
\t\t\tarray(
\t\t\t\t'ID' => (int) $page->ID,
\t\t\t\t'post_parent' => $target_parent_id,
\t\t\t),
\t\t\ttrue
\t\t);

\t\tif ( is_wp_error( $updated ) ) {
\t\t\t$results['skipped'][ $slug ][] = array(
\t\t\t\t'reason' => $updated->get_error_message(),
\t\t\t\t'target_parent_slug' => $target_parent_slug,
\t\t\t\t'before' => $before,
\t\t\t);
\t\t\tcontinue;
\t\t}

\t\tclean_post_cache( (int) $page->ID );
\t\t$after = get_post( (int) $page->ID );

\t\t$results['updated'][ $slug ][] = array(
\t\t\t'target_parent_slug' => $target_parent_slug,
\t\t\t'before' => $before,
\t\t\t'after' => $after instanceof WP_Post ? ktheme_sync_page_snapshot( $after ) : null,
\t\t);
\t}
}

$all_pages = get_posts(
\tarray(
\t\t'post_type' => 'page',
\t\t'post_status' => 'any',
\t\t'posts_per_page' => -1,
\t\t'orderby' => 'menu_order title',
\t\t'order' => 'ASC',
\t)
);

foreach ( $all_pages as $page ) {
\tif ( ! in_array( $page->post_name, $managed_slugs, true ) ) {
\t\t$results['unmapped'][] = ktheme_sync_page_snapshot( $page );
\t}
}

if ( function_exists( 'wp_cache_flush' ) ) {
\twp_cache_flush();
}

header( 'Content-Type: application/json; charset=utf-8' );
echo wp_json_encode( $results, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
`;

try {
  writeFileSync(tempScript, php, 'utf8');

  console.log('Uploading temporary page-parent sync script...');
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

  console.log('Triggering live WordPress parent sync...');
  console.log(run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    `${baseUrl}/${REMOTE_SCRIPT}?token=${token}`,
  ]));

  console.log('Removing temporary page-parent sync script...');
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

  console.log('Live page parent sync complete.');
} finally {
  if (existsSync(tempScript)) {
    unlinkSync(tempScript);
  }
}
