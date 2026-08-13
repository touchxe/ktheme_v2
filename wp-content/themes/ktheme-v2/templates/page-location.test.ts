import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const locationTemplate = new URL('./page-location.html', import.meta.url)
describe('location page template', () => {
  it('uses a native location pattern instead of a theme shortcode', () => {
    const template = readFileSync(locationTemplate, 'utf8')

    expect(template).toContain('ktheme-v2/section-location-shell')
    expect(template).not.toContain('wp:shortcode')
    expect(template).not.toContain('ktheme_location_page')
  })
})
