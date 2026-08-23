import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

describe('KTheme Modu authenticated update clients', () => {
  it('checks theme updates without exposing or deleting the saved license on failure', () => {
    const updater = readFileSync(resolve(root, 'wp-content/themes/ktheme-modu/includes/class-ktheme-modu-updater.php'), 'utf8')
    const functions = readFileSync(resolve(root, 'wp-content/themes/ktheme-modu/functions.php'), 'utf8')

    expect(updater).toContain('pre_set_site_transient_update_themes')
    expect(updater).toContain('/wp-json/ktheme/v1/releases/check')
    expect(updater).toContain("'ktheme-modu'")
    expect(updater).toContain('wp_remote_post')
    expect(updater).toContain('ktheme_modu_license_key')
    expect(updater).not.toMatch(/delete_option\(\s*'ktheme_modu_license_key'/)
    expect(functions).toContain("includes/class-ktheme-modu-updater.php")
  })

  it('checks Engine and installed Preset updates through the same authenticated batch contract', () => {
    const updater = readFileSync(resolve(root, 'wp-content/plugins/ktheme-engine/includes/class-market-updater.php'), 'utf8')
    const engine = readFileSync(resolve(root, 'wp-content/plugins/ktheme-engine/includes/class-plugin.php'), 'utf8')

    expect(updater).toContain('pre_set_site_transient_update_plugins')
    expect(updater).toContain("'ktheme-engine'")
    expect(updater).toContain("'ktheme-preset-church'")
    expect(updater).toContain('package_url')
    expect(updater).toContain('wp_remote_post')
    expect(updater).not.toMatch(/delete_option\(\s*'ktheme_modu_license_key'/)
    expect(engine).toContain("includes/class-market-updater.php")
  })

  it('records the exact Theme and Engine dependency versions in the release manifest', () => {
    const builder = readFileSync(resolve(root, 'scripts/build-release-packages.mjs'), 'utf8')
    expect(builder).toContain('dependenciesFor')
    expect(builder).toContain("'ktheme-modu'")
    expect(builder).toContain("'ktheme-engine'")
  })
})
