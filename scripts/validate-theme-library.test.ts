import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

describe('theme library manifest', () => {
  it('validates every registered skin, pattern, and component entry', () => {
    const output = execFileSync(process.execPath, ['scripts/validate-theme-library.mjs'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    })

    expect(output).toContain('Validated KTheme library')
  })
})
