import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const json = process.argv.includes('--json')
const strict = process.argv.includes('--strict')
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.md', '.mjs', '.php', '.svg', '.ts'])
const customerMarkers = [/gapyeong/i, /hanbit/i, /juswer/i, /mycafe24/i, /08512/, /02-704-3300/]
const roots = [
  resolve(projectRoot, 'wp-content/themes/ktheme-v2'),
  resolve(projectRoot, 'wp-content/plugins/ktheme-engine'),
]
const themeFunctions = readFileSync(resolve(projectRoot, 'wp-content/themes/ktheme-v2/functions.php'), 'utf8')
const hasLegacyAssetResolver = themeFunctions.includes('function ktheme_v2_resolve_legacy_asset_urls')
const releaseExclusions = [
  'wp-content/themes/ktheme-v2/assets/images/logos/',
  'wp-content/themes/ktheme-v2/assets/images/style1/',
  'wp-content/themes/ktheme-v2/templates/page-design-library.html',
  'wp-content/themes/ktheme-v2/templates/page-lecture.html',
  'wp-content/themes/ktheme-v2/templates/page-lecture-style2.html',
]

const files = (directory) => {
  const result = []

  for (const entry of readdirSync(directory)) {
    if (['.git', '.vite', 'node_modules'].includes(entry)) continue
    const path = resolve(directory, entry)
    const stats = statSync(path)

    if (stats.isDirectory()) result.push(...files(path))
    else if (textExtensions.has(`.${entry.split('.').pop()}`) && !entry.includes('.test.')) result.push(path)
  }

  return result
}

const findings = []
for (const root of roots) {
  for (const file of files(root)) {
    const source = readFileSync(file, 'utf8')
    const relativePath = file.replace(`${projectRoot}/`, '')
    if (releaseExclusions.some((excluded) => relativePath === excluded || relativePath.startsWith(excluded))) continue

    for (const marker of customerMarkers) {
      if (marker.test(source)) {
        findings.push({ rule: 'customer-identifier', file: relativePath, detail: marker.toString() })
      }
    }

    if (source.includes('/wp-content/themes/ktheme-v2/') && !hasLegacyAssetResolver) {
      findings.push({ rule: 'hardcoded-theme-path', file: relativePath, detail: 'Use WordPress asset APIs or a preset asset resolver.' })
    }
  }
}

const licenseInventory = resolve(projectRoot, 'docs/release/ASSET_LICENSE_INVENTORY.md')
if (!existsSync(licenseInventory) || !/\| `assets\/images\/ktheme-demo-community-01\.png` ~ `04\.png` \|[\s\S]*\| 포함 가능 \|/.test(readFileSync(licenseInventory, 'utf8'))) {
  findings.push({
    rule: 'asset-license-review',
    file: 'docs/release/ASSET_LICENSE_INVENTORY.md',
    detail: 'At least one included asset still needs a commercial-use and redistribution decision.',
  })
}

const report = {
  status: findings.length === 0 ? 'ready' : 'blocked',
  findings,
}

if (json) {
  process.stdout.write(`${JSON.stringify(report)}\n`)
} else if (findings.length === 0) {
  process.stdout.write('Release readiness audit passed.\n')
} else {
  process.stdout.write(`Release readiness audit found ${findings.length} blocker(s).\n`)
  for (const finding of findings) {
    process.stdout.write(`- [${finding.rule}] ${finding.file}: ${finding.detail}\n`)
  }
}

if (strict && findings.length > 0) {
  process.exitCode = 1
}
