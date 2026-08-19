import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const engineRoot = new URL('../../', import.meta.url)
const themeRoot = new URL('../../../../themes/ktheme-v2/', import.meta.url)

const readEngineFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, engineRoot), 'utf8')
const readThemeFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, themeRoot), 'utf8')

describe('generic content model', () => {
  it('defines the four product-wide post types in the engine', () => {
    const source = readEngineFile('modules/content-types/class-content-types.php')

    for (const postType of [
      'ktheme_media',
      'ktheme_event',
      'ktheme_resource',
      'ktheme_profile',
    ]) {
      expect(source).toContain(`'${postType}'`)
      expect(postType.length).toBeLessThanOrEqual(20)
    }

    expect(source).toContain("'show_in_rest' => true")
    expect(source).not.toContain('ktheme_sermon')
    expect(source).not.toContain('ktheme_album')
  })

  it('defines reusable taxonomies and minimal REST-aware metadata', () => {
    const taxonomies = readEngineFile('modules/taxonomies/class-taxonomies.php')
    const metadata = readEngineFile('modules/content-types/class-content-meta.php')

    for (const taxonomy of [
      'ktheme_media_type',
      'ktheme_collection',
      'ktheme_topic',
      'ktheme_audience',
      'ktheme_location',
    ]) {
      expect(taxonomies).toContain(`'${taxonomy}'`)
      expect(taxonomy.length).toBeLessThanOrEqual(32)
    }

    expect(metadata).toContain('register_post_meta')
    expect(metadata).toMatch(/'show_in_rest'\s*=>\s*true/)
    expect(metadata).toContain("'auth_callback'")
    expect(metadata).not.toContain('email')
    expect(metadata).not.toContain('phone')
  })

  it('keeps registration out of the presentation theme', () => {
    const themeFunctions = readThemeFile('functions.php')

    expect(themeFunctions).not.toContain('register_post_type')
    expect(themeFunctions).not.toContain('register_taxonomy')
    expect(themeFunctions).not.toContain('ktheme_sermon')
    expect(themeFunctions).not.toContain('ktheme_album')
  })
})
