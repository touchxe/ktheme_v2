import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const distRoot = resolve(projectRoot, 'dist')
const json = process.argv.includes('--json')
const manifest = JSON.parse(readFileSync(resolve(distRoot, 'release-manifest.json'), 'utf8'))
const checksumLines = readFileSync(resolve(distRoot, 'checksums.txt'), 'utf8').trim().split(/\r?\n/)
const checksums = Object.fromEntries(checksumLines.map((line) => {
  const match = line.match(/^([a-f0-9]{64})\s{2}(.+\.zip)$/)
  if (!match) throw new Error(`Invalid checksum line: ${line}`)
  return [match[2], match[1]]
}))

const headers = {
  'ktheme-modu': 'style.css',
  'ktheme-engine': 'ktheme-engine.php',
  'ktheme-preset-church': 'ktheme-preset-church.php',
}
const forbidden = [
  /(^|\/)\.git(\/|$)/,
  /(^|\/)node_modules(\/|$)/,
  /(^|\/)tests(\/|$)/,
  /(^|\/)docs(\/|$)/,
  /(^|\/)__MACOSX(\/|$)/,
  /(^|\/)\.DS_Store$/,
  /(^|\/)\.env(?:\.|$)/,
  /\.test\.[^/]+$/,
  /\.map$/,
]

const findings = []
const packages = []
for (const definition of manifest.packages ?? []) {
  const archivePath = resolve(distRoot, definition.archive)
  if (!existsSync(archivePath)) {
    findings.push({ slug: definition.slug, rule: 'archive-missing', detail: definition.archive })
    continue
  }

  const bytes = readFileSync(archivePath)
  const sha256 = createHash('sha256').update(bytes).digest('hex')
  if (checksums[definition.archive] !== sha256) {
    findings.push({ slug: definition.slug, rule: 'checksum-mismatch', detail: sha256 })
  }

  const entries = execFileSync('unzip', ['-Z1', archivePath], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean)
  const unsafe = entries.filter((entry) => (
    entry.startsWith('/')
    || entry.split('/').includes('..')
    || !entry.startsWith(`${definition.slug}/`)
    || forbidden.some((pattern) => pattern.test(entry))
  ))
  if (unsafe.length) {
    findings.push({ slug: definition.slug, rule: 'unsafe-or-excluded-entry', detail: unsafe.slice(0, 10) })
  }

  const listing = execFileSync('zipinfo', ['-l', archivePath], { encoding: 'utf8' })
  if (listing.split(/\r?\n/).some((line) => /^l[rwx-]{9}\s/.test(line))) {
    findings.push({ slug: definition.slug, rule: 'symlink-entry', detail: definition.archive })
  }

  const headerPath = `${definition.slug}/${headers[definition.slug] ?? ''}`
  const header = entries.includes(headerPath)
    ? execFileSync('unzip', ['-p', archivePath, headerPath], { encoding: 'utf8' })
    : ''
  const version = header.match(/^\s*\*?\s*Version:\s*([^\r\n]+)/m)?.[1]?.trim() ?? ''
  if (version !== definition.version) {
    findings.push({ slug: definition.slug, rule: 'version-mismatch', detail: `${version || 'missing'} != ${definition.version}` })
  }

  packages.push({
    slug: definition.slug,
    archive: definition.archive,
    version,
    sha256,
    bytes: bytes.byteLength,
    files: entries.filter((entry) => !entry.endsWith('/')).length,
  })
}

if (Object.keys(checksums).length !== (manifest.packages ?? []).length) {
  findings.push({ rule: 'checksum-count-mismatch', detail: Object.keys(checksums).length })
}

const report = { status: findings.length ? 'blocked' : 'ready', findings, packages }
if (json) process.stdout.write(`${JSON.stringify(report)}\n`)
else if (findings.length) {
  process.stdout.write(`Release package verification found ${findings.length} blocker(s).\n`)
  for (const finding of findings) process.stdout.write(`- [${finding.rule}] ${finding.slug ?? 'manifest'}: ${JSON.stringify(finding.detail)}\n`)
} else {
  process.stdout.write(`Verified ${packages.length} release packages.\n`)
}

if (findings.length) process.exitCode = 1
