import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

describe('built release package integrity', () => {
  it('verifies exact checksums, safe ZIP paths, package roots, versions, and exclusions', () => {
    const output = execFileSync(process.execPath, ['scripts/verify-release-packages.mjs', '--json'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    })
    const report = JSON.parse(output)

    expect(report.status).toBe('ready')
    expect(report.packages).toHaveLength(3)
    expect(report.packages.map((item: { slug: string }) => item.slug)).toEqual([
      'ktheme-modu',
      'ktheme-engine',
      'ktheme-preset-church',
    ])
    expect(report.packages.every((item: { version: string; files: number; bytes: number; sha256: string }) => (
      item.version === '1.0.0'
      && item.files > 0
      && item.bytes > 0
      && /^[a-f0-9]{64}$/.test(item.sha256)
    ))).toBe(true)
  })
})
