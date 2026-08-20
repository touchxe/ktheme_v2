import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

describe('commercial release readiness audit', () => {
	it('confirms customer-neutrality, portable asset paths, and documented included assets', () => {
    const output = execFileSync(process.execPath, ['scripts/audit-release-readiness.mjs', '--json'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    })
    const report = JSON.parse(output)

    expect(report.status).toBe('ready')
    expect(report.findings.some((finding: { rule: string }) => finding.rule === 'customer-identifier')).toBe(false)
    expect(report.findings.some((finding: { rule: string }) => finding.rule === 'hardcoded-theme-path')).toBe(false)
    expect(report.findings.some((finding: { rule: string }) => finding.rule === 'asset-license-review')).toBe(false)
  })
})
