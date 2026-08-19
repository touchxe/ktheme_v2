import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync, spawnSync } from 'node:child_process'
import { afterEach, describe, expect, it } from 'vitest'

const script = fileURLToPath(new URL('./validate-extension-registry.mjs', import.meta.url))
const registryFile = fileURLToPath(
  new URL('../docs/architecture/extension-registry.json', import.meta.url),
)
const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true })
  }
})

describe('extension registry validator', () => {
  it('accepts the canonical generic extension registry', () => {
    expect(() =>
      execFileSync(process.execPath, [script, registryFile], { stdio: 'pipe' }),
    ).not.toThrow()
  })

  it('rejects industry-specific persistent identifiers', () => {
    const directory = mkdtempSync(join(tmpdir(), 'ktheme-registry-'))
    temporaryDirectories.push(directory)

    const registry = JSON.parse(readFileSync(registryFile, 'utf8'))
    registry.genericContentModels.postTypes.push('ktheme_sermon')

    const invalidRegistry = join(directory, 'extension-registry.json')
    writeFileSync(invalidRegistry, JSON.stringify(registry))

    const result = spawnSync(process.execPath, [script, invalidRegistry], {
      encoding: 'utf8',
    })

    expect(result.status).not.toBe(0)
    expect(result.stderr).toContain('forbidden persistent term')
  })
})
