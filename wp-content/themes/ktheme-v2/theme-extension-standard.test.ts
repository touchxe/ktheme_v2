import { existsSync, readFileSync, readdirSync } from 'node:fs'
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

const genericPatternFamilies = [
  'section-feature-story.php',
  'query-content-list.php',
  'query-event-list.php',
  'query-profile-grid.php',
  'query-resource-list.php',
  'section-empty-state.php',
  'header-basic.php',
  'footer-basic.php',
]

describe('commercial theme extension standard', () => {
  it('registers role-based pattern categories', () => {
    const source = readThemeFile('functions.php')

    for (const category of [
      'ktheme-pages',
      'ktheme-sections',
      'ktheme-queries',
      'ktheme-integrations',
    ]) {
      expect(source).toContain(`'${category}'`)
    }

    expect(source).not.toContain('ktheme-v2-style1')
    expect(source).not.toContain('ktheme-v2-pages')
  })

  it('ships reusable native block patterns with complete metadata', () => {
    for (const pattern of standardPatterns) {
      const source = readThemeFile(`patterns/${pattern}`)

      expect(source).toMatch(/\* Title: .+/)
      expect(source).toMatch(/\* Slug: ktheme\/.+/)
      expect(source).toMatch(/\* Categories: ktheme-(sections|queries|integrations)/)
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

      expect(source).toContain('ktheme/section-media-gallery')
      expect(source).not.toContain('wp:shortcode')
      expect(source).not.toContain('ktheme_photo_carousel')
    }
  })

  it('composes the dawn prayer page from the worship schedule pattern', () => {
    const source = readThemeFile('templates/page-dawn-prayer.html')

    expect(source).toContain('ktheme/section-worship-schedule')
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

  it('uses semantic pattern and skin names without changing design tokens', () => {
    const homePattern = readThemeFile('patterns/page-home.php')
    const heroPattern = readThemeFile('patterns/section-page-hero.php')
    const variationFile = new URL('./styles/skin-foundation.json', themeRoot)

    expect(homePattern).toContain('* Slug: ktheme/page-home')
    expect(heroPattern).toContain('* Slug: ktheme/section-page-hero')
    expect(homePattern).not.toMatch(/Style 1|style1/)
    expect(heroPattern).not.toMatch(/Style 1|style1/)
    expect(existsSync(variationFile)).toBe(true)
    expect(readFileSync(variationFile, 'utf8')).toContain('"title": "Foundation"')
    expect(existsSync(new URL('./styles/style1.json', themeRoot))).toBe(false)
  })

  it('ships a neutral pattern family for future pages and components', () => {
    const functions = readThemeFile('functions.php')

    for (const category of ['ktheme-headers', 'ktheme-footers']) {
      expect(functions).toContain(`'${category}'`)
    }

    for (const pattern of genericPatternFamilies) {
      const source = readThemeFile(`patterns/${pattern}`)

      expect(source).toMatch(/\* Title: .+/)
      expect(source).toMatch(/\* Slug: ktheme\/.+/)
      expect(source).toMatch(/\* Categories: ktheme-(sections|queries|headers|footers)/)
      expect(source).toMatch(/\* Description: .+/)
      expect(source).not.toContain('<!-- wp:html -->')
      expect(source).not.toContain('<!-- wp:shortcode -->')
      expect(source).not.toContain('href="#"')
      expect(source).not.toContain('/wp-content/themes/ktheme-v2')
      expect(source).not.toContain('<script')
      expect(source).not.toContain('<style')
    }
  })

  it('does not register legacy shortcodes in the presentation theme', () => {
    const source = readThemeFile('functions.php')
    const registeredShortcodes = Array.from(
      source.matchAll(/add_shortcode\(\s*'([^']+)'/g),
      (match) => match[1],
    ).sort()

    expect(registeredShortcodes).toEqual([])
  })
})
