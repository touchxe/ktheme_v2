import { readFileSync } from 'node:fs'
import { TextDecoder } from 'node:util'
import { describe, expect, it } from 'vitest'

const themeRoot = new URL('./', import.meta.url)
const functionsFile = new URL('./functions.php', themeRoot)
const formTemplates = [
  'page-contact.html',
  'page-documents.html',
  'page-facility-request.html',
  'page-vehicle-request.html',
]

const headerPart = new URL('./parts/header.html', themeRoot)
const footerPart = new URL('./parts/footer.html', themeRoot)
const givingTemplate = new URL('./templates/page-giving.html', themeRoot)
const pageHeroPart = new URL('./parts/page-hero.html', themeRoot)

const readThemeFile = (relativePath: string) =>
  readFileSync(new URL(relativePath, themeRoot), 'utf8')

describe('commercial theme release blockers', () => {
  it('keeps all theme source text valid UTF-8', () => {
    const source = readFileSync(functionsFile)

    expect(() => new TextDecoder('utf-8', { fatal: true }).decode(source)).not.toThrow()
  })

  it('does not attach page creation or mutation to admin requests', () => {
    const source = readThemeFile('functions.php')

    expect(source).not.toContain("add_action( 'admin_init', 'ktheme_v2_ensure_required_pages' )")
  })

  it('does not present fake submission success states in form templates', () => {
    for (const template of formTemplates) {
      const source = readThemeFile(`templates/${template}`)

      expect(source).not.toContain('preventDefault()')
      expect(source).not.toContain('kt-svc-form__success')
      expect(source).toContain('ktheme/section-form-shell')
    }
  })

  it('uses editable, client-neutral header and footer parts', () => {
    const header = readFileSync(headerPart, 'utf8')
    const footer = readFileSync(footerPart, 'utf8')

    expect(header).toContain('wp:site-logo')
    expect(header).toContain('wp:navigation')
    expect(header).not.toContain('wp:shortcode')
    expect(footer).toContain('wp:site-title')
    expect(footer).not.toContain('href="#"')
    expect(footer).not.toContain('worship-guide')
    expect(footer).not.toContain('Design Library')
    expect(footer).not.toContain('GAPYEONG')
  })

  it('does not ship a simulated donation flow or customer donation data', () => {
    const giving = readFileSync(givingTemplate, 'utf8')

    expect(giving).toContain('ktheme/section-donation-shell')
    expect(giving).not.toContain('window.alert')
    expect(giving).not.toContain('정한결')
    expect(giving).not.toContain('가평교회')
    expect(giving).not.toMatch(/\d{6}-\d{2}-\d{6}/)
  })

  it('uses a native, editable page hero without a theme shortcode', () => {
    const pageHero = readFileSync(pageHeroPart, 'utf8')

    expect(pageHero).toContain('wp:post-title')
    expect(pageHero).toContain('wp:post-excerpt')
    expect(pageHero).not.toContain('wp:shortcode')
    expect(pageHero).not.toContain('ktheme_page_hero')
  })
})
