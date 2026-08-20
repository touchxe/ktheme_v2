import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const themeRoot = resolve(projectRoot, 'wp-content/themes/ktheme-v2')
const manifestPath = resolve(themeRoot, 'ktheme-library.json')
const allowedScopes = new Set(['page', 'section', 'query', 'integration', 'header', 'footer'])
const allowedStatuses = new Set(['stable', 'preset', 'experimental', 'deprecated'])

const fail = (message) => {
  process.stderr.write(`KTheme library validation failed: ${message}\n`)
  process.exitCode = 1
}

const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'))
const unique = (values) => new Set(values).size === values.length

try {
  if (!existsSync(manifestPath)) {
    throw new Error('ktheme-library.json does not exist')
  }

  const library = readJson(manifestPath)
  const entries = [
    ...(library.skins ?? []),
    ...(library.patterns ?? []),
    ...(library.components ?? []),
  ]

  if (!unique(entries.map((entry) => entry.id))) {
    fail('entry ids must be unique')
  }

  if (!unique(entries.map((entry) => entry.file))) {
    fail('entry files must be unique')
  }

  for (const entry of entries) {
    if (!/^ktheme\/[a-z][a-z0-9-]+$/.test(entry.id ?? '')) {
      fail(`invalid entry id: ${entry.id ?? ''}`)
    }

    if (!allowedStatuses.has(entry.status)) {
      fail(`invalid status for ${entry.id}: ${entry.status}`)
    }

    if (!existsSync(resolve(themeRoot, entry.file))) {
      fail(`registered file does not exist: ${entry.file}`)
    }
  }

  for (const pattern of library.patterns ?? []) {
    if (!allowedScopes.has(pattern.scope)) {
      fail(`invalid pattern scope for ${pattern.id}: ${pattern.scope}`)
    }
  }

  const registeredPatternFiles = new Set((library.patterns ?? []).map((pattern) => pattern.file))
  const actualPatternFiles = readdirSync(resolve(themeRoot, 'patterns'))
    .filter((file) => extname(file) === '.php')
    .map((file) => relative(themeRoot, resolve(themeRoot, 'patterns', file)))

  for (const file of actualPatternFiles) {
    if (!registeredPatternFiles.has(file)) {
      fail(`pattern is missing from library manifest: ${file}`)
    }
  }

  if (!process.exitCode) {
    process.stdout.write(`Validated KTheme library with ${entries.length} registered entries.\n`)
  }
} catch (error) {
  fail(error.message)
}
