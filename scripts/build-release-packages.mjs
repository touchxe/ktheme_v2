import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const dryRun = process.argv.includes('--dry-run')

if (!dryRun) {
  const audit = spawnSync(process.execPath, ['scripts/audit-release-readiness.mjs', '--strict'], {
    cwd: projectRoot,
    encoding: 'utf8',
  })

  if (audit.status !== 0) {
    throw new Error(audit.stdout || audit.stderr || 'Release readiness audit failed.')
  }
}

const versionFromHeader = (file) => {
  const source = readFileSync(file, 'utf8')
  const match = source.match(/^\s*\*?\s*Version:\s*([^\r\n]+)/m)

  if (!match) {
    throw new Error(`Version header not found: ${file}`)
  }

  return match[1].trim()
}

const packageDefinitions = [
  {
    slug: 'ktheme-v2',
    source: resolve(projectRoot, 'wp-content/themes/ktheme-v2'),
    versionFile: resolve(projectRoot, 'wp-content/themes/ktheme-v2/style.css'),
  },
  {
    slug: 'ktheme-engine',
    source: resolve(projectRoot, 'wp-content/plugins/ktheme-engine'),
    versionFile: resolve(projectRoot, 'wp-content/plugins/ktheme-engine/ktheme-engine.php'),
  },
  {
    slug: 'ktheme-preset-church',
    source: resolve(projectRoot, 'wp-content/plugins/ktheme-preset-church'),
    versionFile: resolve(projectRoot, 'wp-content/plugins/ktheme-preset-church/ktheme-preset-church.php'),
  },
].map((definition) => {
  const version = versionFromHeader(definition.versionFile)

  return {
    ...definition,
    version,
    archive: `${definition.slug}-${version}.zip`,
  }
})

const plan = {
  generatedAt: dryRun ? 'dry-run' : new Date().toISOString(),
  packages: packageDefinitions.map(({ slug, source, version, archive }) => ({
    slug,
    source: source.replace(`${projectRoot}/`, ''),
    version,
    archive,
  })),
  exclusions: ['.git', 'node_modules', '.vite', '*.test.*', '*.map', 'tests', 'docs'],
}

if (dryRun) {
  process.stdout.write(`${JSON.stringify(plan)}\n`)
  process.exit(0)
}

const distDirectory = resolve(projectRoot, 'dist')
mkdirSync(distDirectory, { recursive: true })

for (const definition of packageDefinitions) {
  if (!existsSync(definition.source)) {
    throw new Error(`Package source does not exist: ${definition.source}`)
  }

  const archivePath = resolve(distDirectory, definition.archive)
  rmSync(archivePath, { force: true })

  const sourceParent = dirname(definition.source)
  const sourceName = basename(definition.source)
  const result = spawnSync(
    'zip',
    [
      '-rq',
      archivePath,
      sourceName,
      '-x',
      `${sourceName}/.git/*`,
      `${sourceName}/node_modules/*`,
      `${sourceName}/.vite/*`,
      `${sourceName}/tests/*`,
      `${sourceName}/docs/*`,
      `${sourceName}/**/*.test.*`,
      `${sourceName}/**/*.map`,
    ],
    { cwd: sourceParent, encoding: 'utf8' },
  )

  if (result.status !== 0) {
    throw new Error(result.stderr || `Unable to create ${definition.archive}`)
  }
}

const checksums = packageDefinitions.map((definition) => {
  const archivePath = resolve(distDirectory, definition.archive)
  const checksum = createHash('sha256').update(readFileSync(archivePath)).digest('hex')

  return `${checksum}  ${definition.archive}`
})

writeFileSync(resolve(distDirectory, 'checksums.txt'), `${checksums.join('\n')}\n`)
writeFileSync(resolve(distDirectory, 'release-manifest.json'), `${JSON.stringify(plan, null, 2)}\n`)
process.stdout.write(`Created ${packageDefinitions.length} release packages in dist/.\n`)
