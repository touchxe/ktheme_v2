import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const pluginRoot = new URL('./', import.meta.url)
const readPluginFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, pluginRoot), 'utf8')

describe('KTheme Engine bootstrap', () => {
  it('ships an independently activatable, generic plugin bootstrap', () => {
    const plugin = readPluginFile('ktheme-engine.php')

    expect(plugin).toContain('Plugin Name: KTheme Engine')
    expect(plugin).toContain('Text Domain: ktheme-engine')
    expect(plugin).toContain("defined( 'ABSPATH' ) || exit;")
    expect(plugin).toContain("require_once KTHEME_ENGINE_PATH . 'includes/class-plugin.php';")
    expect(plugin).not.toMatch(/register_post_type|register_taxonomy|wp_insert_post|wp_insert_term/)
  })

  it('uses a generated manifest instead of scanning extension directories at runtime', () => {
    const registry = readPluginFile('includes/class-extension-registry.php')
    const manifest = new URL('./build/extensions-manifest.php', pluginRoot)

    expect(registry).toContain("KTHEME_ENGINE_PATH . 'build/extensions-manifest.php'")
    expect(registry).not.toMatch(/glob\(|RecursiveDirectoryIterator|scandir\(/)
    expect(existsSync(manifest)).toBe(true)
    expect(readFileSync(manifest, 'utf8')).toContain('return array(')
  })

  it('does not delete content when uninstalled', () => {
    const uninstall = readPluginFile('uninstall.php')

    expect(uninstall).toContain("defined( 'WP_UNINSTALL_PLUGIN' ) || exit;")
    expect(uninstall).not.toMatch(/wp_delete_post|wp_delete_term|delete_posts|TRUNCATE/i)
  })
})
