import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const homePage = readFileSync(new URL('./page.tsx', import.meta.url), 'utf8')

describe('church homepage template', () => {
  it('uses the theme library structure, tokens, and supplied church media', () => {
    expect(homePage).toContain('modu-site-header')
    expect(homePage).toContain('modu-hero')
    expect(homePage).toContain('modu-announcement-card')
    expect(homePage).toContain('modu-quick-grid')
    expect(homePage).toContain('modu-sermon-card')
    expect(homePage).toContain('/images/home/home-hero-worship-16x9.png')
    expect(homePage).toContain('새가족 등록')
    expect(homePage).toContain('최근 설교')
    expect(homePage).toContain('교회 소식')
    expect(homePage).toContain('href="/newcomers"')
  })
})
