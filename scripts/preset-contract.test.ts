import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const projectRoot = new URL('../', import.meta.url)
const readProjectFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, projectRoot), 'utf8')

const presetFiles = [
  'wp-content/plugins/ktheme-preset-church/extension.json',
  'tests/fixtures/ktheme-preset-education/extension.json',
]

describe('industry preset contract', () => {
  it('ships a church preset without changing engine data keys', () => {
    const plugin = readProjectFile('wp-content/plugins/ktheme-preset-church/ktheme-preset-church.php')
    const labels = readProjectFile('wp-content/plugins/ktheme-preset-church/labels/content-types.php')
    const terms = readProjectFile('wp-content/plugins/ktheme-preset-church/terms/church-terms.php')

    expect(plugin).toContain('Plugin Name: KTheme Church Preset')
    expect(plugin).toContain('Text Domain: ktheme-preset-church')
    expect(plugin).not.toMatch(/register_post_type|register_taxonomy|add_shortcode/)
    expect(labels).toContain('ktheme_media')
    expect(labels).toContain('ktheme_profile')
    expect(terms).toContain('ktheme_media_type')
    expect(terms).not.toContain('wp_insert_term')
  })

  it('uses the same generic model for an education fixture', () => {
    const fixture = readProjectFile('tests/fixtures/ktheme-preset-education/labels/content-types.php')

    expect(fixture).toContain('ktheme_media')
    expect(fixture).toContain('Lecture')
    expect(fixture).toContain('ktheme_profile')
    expect(fixture).toContain('Instructor')
    expect(fixture).not.toContain('ktheme_sermon')
  })

  it('provides a valid manifest and a visible page-map contract for every preset', () => {
    for (const file of presetFiles) {
      const manifest = JSON.parse(readProjectFile(file))

      expect(manifest.type).toBe('preset')
      expect(manifest.dependencies).toContain('ktheme-engine')
      expect(manifest.status).toBe('stable')
    }

    expect(existsSync(new URL('wp-content/plugins/ktheme-preset-church/navigation/page-map.php', projectRoot))).toBe(true)
    expect(existsSync(new URL('tests/fixtures/ktheme-preset-education/navigation/page-map.php', projectRoot))).toBe(true)
  })
})
