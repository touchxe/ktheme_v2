import { readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const roots = [
  'wp-content/themes/ktheme-modu',
  'wp-content/plugins/ktheme-engine',
  'wp-content/plugins/ktheme-preset-church',
]

const phpFiles = (directory) => readdirSync(directory).flatMap((entry) => {
  const path = resolve(directory, entry)
  if (statSync(path).isDirectory()) return phpFiles(path)
  return path.endsWith('.php') ? [path] : []
})

const files = roots.flatMap((root) => phpFiles(resolve(projectRoot, root)))
const nativeCheck = spawnSync('php', ['-v'], { encoding: 'utf8' })

const result = nativeCheck.status === 0
  ? spawnSync('php', ['-l', ...files], { cwd: projectRoot, encoding: 'utf8' })
  : spawnSync(
      'docker',
      [
        'run', '--rm', '-v', `${projectRoot}:/app`, '-w', '/app', 'php:8.1-cli', 'sh', '-c',
        "find wp-content/themes/ktheme-modu wp-content/plugins/ktheme-engine wp-content/plugins/ktheme-preset-church -name '*.php' -type f -print0 | xargs -0 -n1 php -l",
      ],
      { cwd: projectRoot, encoding: 'utf8' },
    )

if (result.status !== 0) {
  throw new Error(result.stderr || result.stdout || 'PHP syntax validation failed.')
}

process.stdout.write(result.stdout)
