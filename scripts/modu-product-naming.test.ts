import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const themeRoot = resolve(root, 'wp-content/themes/ktheme-modu')

describe('KTheme Modu permanent product naming', () => {
  it('uses the final theme directory and WordPress headers before 1.0', () => {
    expect(existsSync(themeRoot)).toBe(true)

    const style = readFileSync(resolve(themeRoot, 'style.css'), 'utf8')
    expect(style).toMatch(/^Theme Name:\s*KTheme Modu$/m)
    expect(style).toMatch(/^Text Domain:\s*ktheme-modu$/m)
    expect(style).not.toMatch(/^Theme Name:\s*KTheme V2$/m)
  })

  it('builds a ktheme-modu release artifact instead of a version-named product', () => {
    const builder = readFileSync(resolve(root, 'scripts/build-release-packages.mjs'), 'utf8')
    const releaseTest = readFileSync(resolve(root, 'scripts/release-packages.test.ts'), 'utf8')

    expect(builder).toContain("slug: 'ktheme-modu'")
    expect(builder).toContain("wp-content/themes/ktheme-modu")
    expect(releaseTest).toContain("'ktheme-modu'")
    expect(builder).not.toContain("slug: 'ktheme-v2'")
  })

  it('publishes ktheme-modu as the extension registry theme slug', () => {
    const registry = JSON.parse(readFileSync(resolve(root, 'docs/architecture/extension-registry.json'), 'utf8'))

    expect(registry.product.themeSlug).toBe('ktheme-modu')
    expect(registry.product.textDomain).toBe('ktheme-modu')
  })
})
