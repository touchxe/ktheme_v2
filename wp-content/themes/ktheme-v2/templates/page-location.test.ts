import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const locationTemplate = new URL('./page-location.html', import.meta.url)
const themeFunctions = new URL('../functions.php', import.meta.url)

describe('location page shortcode', () => {
  it('provides every data set consumed by the location renderer', () => {
    const template = readFileSync(locationTemplate, 'utf8')
    const functions = readFileSync(themeFunctions, 'utf8')

    expect(template).toContain('[ktheme_location_page]')
    expect(functions).toContain("'guide_cards'   => array(")
    expect(functions).toContain("$data['guide_cards']")
  })
})
