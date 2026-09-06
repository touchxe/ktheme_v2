import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = join(import.meta.dirname, '..')
const ignoredDirectories = new Set(['.git', '.next', 'node_modules'])
const textExtensions = new Set([
  '.css', '.example', '.html', '.js', '.json', '.md', '.mdc', '.mjs', '.php',
  '.ps1', '.toml', '.ts', '.tsx', '.txt', '.yaml', '.yml',
])

function projectTextFiles(directory = root): string[] {
  return readdirSync(directory).flatMap((name) => {
    if (ignoredDirectories.has(name)) return []

    const path = join(directory, name)
    if (statSync(path).isDirectory()) return projectTextFiles(path)

    const dot = name.lastIndexOf('.')
    const extension = dot === -1 ? '' : name.slice(dot)
    return textExtensions.has(extension) || ['AGENTS.md', 'README.md'].includes(name) ? [path] : []
  })
}

describe('ModuTheme project naming', () => {
  it('does not retain the previous product identity in paths or text', () => {
    const legacyPattern = new RegExp(
      ['\\b', 'k', '[\\s_-]', 'theme', '\\b|\\b', 'k', 'theme', '\\b'].join(''),
      'i',
    )
    const violations = projectTextFiles()
      .flatMap((path) => {
        const projectPath = relative(root, path)
        const pathViolation = legacyPattern.test(projectPath) ? [`path: ${projectPath}`] : []
        const lines = readFileSync(path, 'utf8').split(/\r?\n/)
        const textViolations = lines.flatMap((line, index) =>
          legacyPattern.test(line) ? [`${projectPath}:${index + 1}`] : [],
        )
        return [...pathViolation, ...textViolations]
      })

    expect(violations, violations.join('\n')).toEqual([])
  })

  it('uses the canonical product and WordPress theme names', () => {
    const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    const themeStylesheet = readFileSync(join(root, 'wp-content/themes/modu-theme/style.css'), 'utf8')

    expect(packageJson.name).toBe('modu-theme')
    expect(themeStylesheet).toContain('Theme Name: ModuTheme')
    expect(themeStylesheet).toContain('Text Domain: modu-theme')
  })
})
