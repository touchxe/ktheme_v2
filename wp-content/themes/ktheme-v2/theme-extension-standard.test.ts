import { readFileSync, readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const themeRoot = new URL('./', import.meta.url)

const readThemeFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, themeRoot), 'utf8')

const galleryTemplates = [
  'page-community.html',
  'page-newcomers.html',
  'page-next-generation.html',
  'page-senior-ministry.html',
  'page-small-groups.html',
  'page-youth-ministry.html',
]

const standardPatterns = [
  'section-media-gallery.php',
  'section-worship-schedule.php',
]

const legacyShortcodes = [
  'ktheme_footer',
  'ktheme_header',
  'ktheme_location_page',
  'ktheme_page_hero',
  'ktheme_photo_carousel',
  'ktheme_site_header',
  'ktheme_sunday_worship_grid',
]

describe('commercial theme extension standard', () => {
  it('registers role-based pattern categories', () => {
    const source = readThemeFile('functions.php')

    for (const category of [
      'ktheme-v2-pages',
      'ktheme-v2-sections',
      'ktheme-v2-queries',
      'ktheme-v2-integrations',
    ]) {
      expect(source).toContain(`'${category}'`)
    }
  })

  it('ships reusable native block patterns with complete metadata', () => {
    for (const pattern of standardPatterns) {
      const source = readThemeFile(`patterns/${pattern}`)

      expect(source).toMatch(/\* Title: .+/)
      expect(source).toMatch(/\* Slug: ktheme-v2\/.+/)
      expect(source).toMatch(/\* Categories: ktheme-v2-(sections|queries|integrations)/)
      expect(source).toMatch(/\* Description: .+/)
      expect(source).not.toContain('<!-- wp:html -->')
      expect(source).not.toContain('<!-- wp:shortcode -->')
      expect(source).not.toContain('href="#"')
      expect(source).not.toContain('/wp-content/themes/ktheme-v2')
      expect(source).not.toContain('<script')
      expect(source).not.toContain('<style')
    }
  })

  it('composes ministry galleries from one standard pattern', () => {
    for (const template of galleryTemplates) {
      const source = readThemeFile(`templates/${template}`)

      expect(source).toContain('ktheme-v2/section-media-gallery')
      expect(source).not.toContain('wp:shortcode')
      expect(source).not.toContain('ktheme_photo_carousel')
    }
  })

  it('composes the dawn prayer page from the worship schedule pattern', () => {
    const source = readThemeFile('templates/page-dawn-prayer.html')

    expect(source).toContain('ktheme-v2/section-worship-schedule')
    expect(source).not.toContain('wp:shortcode')
    expect(source).not.toContain('ktheme_sunday_worship_grid')
  })

  it('keeps templates and parts free of shortcode blocks', () => {
    for (const directory of ['templates', 'parts']) {
      const files = readdirSync(new URL(`./${directory}/`, themeRoot)).filter((file) =>
        file.endsWith('.html'),
      )

      for (const file of files) {
        expect(readThemeFile(`${directory}/${file}`)).not.toContain('wp:shortcode')
      }
    }
  })

  it('does not expand the temporary legacy shortcode surface', () => {
    const source = readThemeFile('functions.php')
    const registeredShortcodes = Array.from(
      source.matchAll(/add_shortcode\(\s*'([^']+)'/g),
      (match) => match[1],
    ).sort()

    expect(registeredShortcodes).toEqual(legacyShortcodes)
  })
})
