import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const templates = new URL('./', import.meta.url)
const sunday = readFileSync(new URL('./page-sunday-worship.html', templates), 'utf8')
const wednesday = readFileSync(new URL('./page-wednesday-worship.html', templates), 'utf8')

describe('worship page templates', () => {
  it('uses the library player, worship information, sermon, series, and preparation components', () => {
    for (const template of [sunday, wednesday]) {
      expect(template).toContain('kt-worship-page')
      expect(template).toContain('kt-live-player')
      expect(template).toContain('kt-sermon-card')
      expect(template).toContain('kt-series-card')
      expect(template).toContain('kt-worship-prep')
    }

    expect(sunday).toContain('주일예배')
    expect(wednesday).toContain('수요예배')
  })
})
