import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const themeTemplates = new URL('./', import.meta.url)
const historyTemplate = new URL('./page-history.html', themeTemplates)
const newsTemplate = new URL('./page-news.html', themeTemplates)
const themeFunctions = new URL('../functions.php', themeTemplates)
const headerScript = new URL('../assets/js/site-header.js', themeTemplates)
const themeStyles = new URL('../style.css', themeTemplates)
const headerTemplate = new URL('../parts/header.html', themeTemplates)

describe('Style 3 WordPress page templates', () => {
  it('maps the history and news visual sources to their site slugs', () => {
    expect(readFileSync(historyTemplate, 'utf8')).toContain('kt-style3-history')
    expect(existsSync(newsTemplate)).toBe(true)
    expect(readFileSync(newsTemplate, 'utf8')).toContain('kt-style3-news')
  })

  it('keeps the header announcement and newcomer call to action informative', () => {
    const functions = readFileSync(themeFunctions, 'utf8')

    expect(functions).toContain('kt-topbar__notice')
    expect(functions).toContain('kt-topbar__notice-label')
    expect(functions).toContain('kt-header-register__label')
    expect(functions).not.toContain('kt-header-register__icon')
  })

  it('renders the shortcode header with the requested legacy logo asset', () => {
    const header = readFileSync(headerTemplate, 'utf8')
    const functions = readFileSync(themeFunctions, 'utf8')

    expect(header).toContain('[ktheme_site_header]')
    expect(functions).toContain("assets/images/theme-logo.png")
    expect(functions).toContain('kt-brand__name')
  })

  it('initializes the mega menu from a shared header asset', () => {
    const functions = readFileSync(themeFunctions, 'utf8')
    const script = readFileSync(headerScript, 'utf8')

    expect(functions).toContain('data-kt-header')
    expect(functions).toContain("ktheme-v2-site-header")
    expect(script).toContain('[data-kt-header]')
    expect(script).toContain('is-mega-open')
  })

  it('collapses the top bar when the header is scrolled', () => {
    const styles = readFileSync(themeStyles, 'utf8')

    expect(styles).toContain('.kt-site-header-shell.is-scrolled .kt-topbar')
    expect(styles).toContain('max-height: 0;')
  })

  it('uses the reference-style flat mega menu layout', () => {
    const styles = readFileSync(themeStyles, 'utf8')

    expect(styles).toContain('grid-template-columns: repeat(7, minmax(0, 1fr));')
    expect(styles).toContain('gap: 22px;')
    expect(styles).toContain('.kt-mega-menu h3 {')
    expect(styles).toContain('font-size: 15px;')
    expect(styles).toContain('font-weight: 800;')
    expect(styles).toContain('border-bottom: 1px solid var(--kt-line);')
    expect(styles).toContain('.kt-mega-menu__head {\n  display: none;')
  })

  it('gives each mega-menu group and child link a distinct visual hierarchy', () => {
    const styles = readFileSync(themeStyles, 'utf8')

    expect(styles).toContain('.kt-mega-menu h3 > a')
    expect(styles).toContain('.kt-mega-menu section > p')
    expect(styles).toContain('.kt-mega-menu section > p > a:focus-visible')
  })
})
