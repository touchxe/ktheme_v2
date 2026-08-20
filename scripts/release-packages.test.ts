import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

const node = process.execPath

describe('release package plan', () => {
  it('lists separately installable theme and plugin packages without writing files in dry-run mode', () => {
    const output = execFileSync(node, ['scripts/build-release-packages.mjs', '--dry-run'], {
      cwd: process.cwd(),
      encoding: 'utf8',
    })
    const plan = JSON.parse(output)

    expect(plan.packages.map((item: { slug: string }) => item.slug)).toEqual([
      'ktheme-v2',
      'ktheme-engine',
      'ktheme-preset-church',
    ])
    expect(plan.packages.every((item: { version: string }) => /^\d+\.\d+\.\d+$/.test(item.version))).toBe(true)
    expect(plan.packages.every((item: { archive: string }) => item.archive.endsWith('.zip'))).toBe(true)
    expect(plan.exclusions).toEqual(expect.arrayContaining([
      'assets/images/logos',
      'assets/images/style1',
      'assets/images/generated',
			'assets/js/design-library.js',
      'templates/page-design-library.html',
      'templates/page-lecture.html',
      'templates/page-lecture-style2.html',
    ]))
  })
})
