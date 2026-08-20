import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

describe('commercial release readiness audit', () => {
  it('reports customer-neutrality and asset-license findings without pretending the package is ready', () => {
    const output = execFileSync(process.execPath, ['scripts/audit-release-readiness.mjs', '--json'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    })
    const report = JSON.parse(output)

    expect(report.status).toBe('blocked')
    expect(report.findings.some((finding: { rule: string }) => finding.rule === 'customer-identifier')).toBe(true)
    expect(report.findings.some((finding: { rule: string }) => finding.rule === 'asset-license-review')).toBe(true)
  })
})
