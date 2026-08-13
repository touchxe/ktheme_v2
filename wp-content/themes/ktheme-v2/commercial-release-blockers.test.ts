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
      expect(source).toContain('ktheme-v2/section-form-shell')
    }
  })
})
