import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const historyPage = readFileSync(new URL('./page.tsx', import.meta.url), 'utf8')

describe('church history page', () => {
  it('presents the church journey as a chronological timeline', () => {
    expect(historyPage).toContain('함께 걸어온')
    expect(historyPage).toContain('2020s')
    expect(historyPage).toContain('modu-history-hero')
    expect(historyPage).toContain('modu-history-events')
    expect(historyPage).toContain('/images/home/home-fellowship-table-4x3.png')
  })
})
