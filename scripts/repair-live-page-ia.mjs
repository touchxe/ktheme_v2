#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ENV_FILE = join(ROOT, '.env.local');
const REMOTE_SCRIPT = 'modu-theme-repair-page-ia-once.php';

const parentMap = {
  vision: 'about',
  people: 'about',
  history: 'about',
  'annual-schedule': 'about',
  location: 'about',
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
$child_slugs = array_keys( $parent_map );
$managed_slugs = array_values( array_unique( array_merge( $top_level_slugs, $child_slugs ) ) );

function modutheme_ia_find_candidates( string $slug ): array {
\tglobal $wpdb;

\t$pattern = '^' . preg_quote( $slug, '/' ) . '-[0-9]+$';
\t$page_ids = $wpdb->get_col(
\t\t$wpdb->prepare(
\t\t\t"SELECT ID FROM {$wpdb->posts}
\t\t\tWHERE post_type = 'page'
\t\t\t\tAND post_status NOT IN ('trash','auto-draft')
\t\t\t\tAND (post_name = %s OR post_name REGEXP %s)
\t\t\tORDER BY CASE WHEN post_status = 'publish' THEN 0 ELSE 1 END, ID DESC",
\t\t\t$slug,
\t\t\t$pattern
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

function modutheme_ia_find_canonical( string $slug ): ?WP_Post {
\t$candidates = modutheme_ia_find_candidates( $slug );

\tforeach ( $candidates as $candidate ) {
\t\tif ( 'publish' === $candidate->post_status ) {
\t\t\treturn $candidate;
\t\t}
\t}

\treturn ! empty( $candidates ) ? $candidates[0] : null;
}

function modutheme_ia_snapshot( WP_Post $page ): array {
\t$parent = $page->post_parent > 0 ? get_post( $page->post_parent ) : null;

\treturn array(
\t\t'id' => (int) $page->ID,
\t\t'title' => get_the_title( $page ),
\t\t'slug' => $page->post_name,
\t\t'parent_id' => (int) $page->post_parent,
\t\t'parent_slug' => $parent instanceof WP_Post ? $parent->post_name : '',
\t\t'status' => $page->post_status,
\t);
}

function modutheme_ia_rename_duplicate( WP_Post $page, string $slug ): array {
\t$before = modutheme_ia_snapshot( $page );
\t$legacy_slug = $slug . '-legacy-' . (int) $page->ID;

\tif ( $page->post_name !== $legacy_slug ) {
\t\t$updated = wp_update_post(
\t\t\tarray(
\t\t\t\t'ID' => (int) $page->ID,
\t\t\t\t'post_name' => $legacy_slug,
\t\t\t),
\t\t\ttrue
\t\t);

\t\tif ( is_wp_error( $updated ) ) {
\t\t\treturn array(
\t\t\t\t'error' => $updated->get_error_message(),
\t\t\t\t'before' => $before,
\t\t\t);
\t\t}
\t}

\tclean_post_cache( (int) $page->ID );
\t$after = get_post( (int) $page->ID );

\treturn array(
\t\t'before' => $before,
\t\t'after' => $after instanceof WP_Post ? modutheme_ia_snapshot( $after ) : null,
\t);
}

function modutheme_ia_apply_page( string $slug, int $target_parent_id, string $target_parent_slug ): array {
\t$candidates = modutheme_ia_find_candidates( $slug );
\t$canonical = modutheme_ia_find_canonical( $slug );

\tif ( ! $canonical instanceof WP_Post ) {
\t\treturn array(
\t\t\t'status' => 'missing',
\t\t\t'target_parent_slug' => $target_parent_slug,
\t\t);
\t}

\t$renamed = array();
\tforeach ( $candidates as $candidate ) {
\t\tif ( (int) $candidate->ID === (int) $canonical->ID ) {
\t\t\tcontinue;
\t\t}

\t\t$renamed[] = modutheme_ia_rename_duplicate( $candidate, $slug );
\t}

\tclean_post_cache( (int) $canonical->ID );
\t$canonical = get_post( (int) $canonical->ID );
\tif ( ! $canonical instanceof WP_Post ) {
\t\treturn array(
\t\t\t'status' => 'missing_after_duplicate_cleanup',
\t\t\t'target_parent_slug' => $target_parent_slug,
\t\t\t'renamed_duplicates' => $renamed,
\t\t);
\t}

\t$before = modutheme_ia_snapshot( $canonical );
\t$needs_update = $canonical->post_name !== $slug || (int) $canonical->post_parent !== $target_parent_id;

\tif ( $needs_update ) {
\t\t$updated = wp_update_post(
\t\t\tarray(
\t\t\t\t'ID' => (int) $canonical->ID,
\t\t\t\t'post_name' => $slug,
\t\t\t\t'post_parent' => $target_parent_id,
\t\t\t),
\t\t\ttrue
\t\t);

\t\tif ( is_wp_error( $updated ) ) {
\t\t\treturn array(
\t\t\t\t'status' => 'error',
\t\t\t\t'error' => $updated->get_error_message(),
\t\t\t\t'target_parent_slug' => $target_parent_slug,
\t\t\t\t'before' => $before,
\t\t\t\t'renamed_duplicates' => $renamed,
\t\t\t);
\t\t}
\t}

\tclean_post_cache( (int) $canonical->ID );
\t$after = get_post( (int) $canonical->ID );

\treturn array(
\t\t'status' => $needs_update || ! empty( $renamed ) ? 'updated' : 'unchanged',
\t\t'target_parent_slug' => $target_parent_slug,
\t\t'before' => $before,
\t\t'after' => $after instanceof WP_Post ? modutheme_ia_snapshot( $after ) : null,
\t\t'renamed_duplicates' => $renamed,
\t);
}

$results = array(
\t'top_level' => array(),
\t'children' => array(),
\t'skipped' => array(),
\t'final_tree' => array(),
);

foreach ( $top_level_slugs as $slug ) {
\t$results['top_level'][ $slug ] = modutheme_ia_apply_page( $slug, 0, '' );
}

foreach ( $parent_map as $slug => $parent_slug ) {
\t$parent = modutheme_ia_find_canonical( (string) $parent_slug );

\tif ( ! $parent instanceof WP_Post ) {
\t\t$results['skipped'][ $slug ] = array(
\t\t\t'reason' => 'parent not found',
\t\t\t'target_parent_slug' => $parent_slug,
\t\t);
\t\tcontinue;
\t}

\t$results['children'][ $slug ] = modutheme_ia_apply_page( $slug, (int) $parent->ID, (string) $parent_slug );
}

foreach ( $managed_slugs as $slug ) {
\t$page = modutheme_ia_find_canonical( $slug );
\t$results['final_tree'][ $slug ] = $page instanceof WP_Post ? modutheme_ia_snapshot( $page ) : null;
}

flush_rewrite_rules( false );
if ( function_exists( 'wp_cache_flush' ) ) {
\twp_cache_flush();
}

header( 'Content-Type: application/json; charset=utf-8' );
echo wp_json_encode( $results, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
`;

try {
  writeFileSync(tempScript, php, 'utf8');

  console.log('Uploading temporary IA repair script...');
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

  console.log('Repairing live WordPress page IA...');
  console.log(run('curl', [
    '--fail',
    '--silent',
    '--show-error',
    `${baseUrl}/${REMOTE_SCRIPT}?token=${token}`,
  ]));

  console.log('Removing temporary IA repair script...');
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

  console.log('Live page IA repair complete.');
} finally {
  if (existsSync(tempScript)) {
    unlinkSync(tempScript);
  }
}
