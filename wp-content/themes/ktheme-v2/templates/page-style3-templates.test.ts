import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const templates = new URL('./', import.meta.url)

describe('Style 3 page template mapping', () => {
  it('provides the history and news layouts for their WordPress page slugs', () => {
    const history = readFileSync(new URL('./page-history.html', templates), 'utf8')
    const news = new URL('./page-news.html', templates)

    expect(history).toContain('kt-style3-history')
    expect(existsSync(news)).toBe(true)
    expect(readFileSync(news, 'utf8')).toContain('kt-style3-news')
  })
})
