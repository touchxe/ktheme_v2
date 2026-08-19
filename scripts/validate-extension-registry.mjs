import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const defaultRegistry = resolve(projectRoot, 'docs/architecture/extension-registry.json')
const [registryArgument = defaultRegistry, ...manifestArguments] = process.argv.slice(2)

const fail = (message) => {
  process.stderr.write(`KTheme extension validation failed: ${message}\n`)
  process.exitCode = 1
}

const readJson = (file) => {
  const absolutePath = resolve(file)

  if (!existsSync(absolutePath)) {
    throw new Error(`file does not exist: ${absolutePath}`)
  }

  try {
    return JSON.parse(readFileSync(absolutePath, 'utf8'))
  } catch (error) {
    throw new Error(`invalid JSON in ${absolutePath}: ${error.message}`)
  }
}

const hasDuplicates = (values) => new Set(values).size !== values.length

const validateRegistry = (registry) => {
  const errors = []
  const expectedNamespaces = {
    phpFunctionPrefix: 'ktheme_',
    phpClassPrefix: 'KTheme_',
    phpNamespace: 'KTheme\\',
    blockNamespace: 'ktheme-engine',
    patternNamespace: 'ktheme',
    cssPrefix: 'ktheme-',
    assetHandlePrefix: 'ktheme-',
    optionPrefix: 'ktheme_',
    hookPrefix: 'ktheme/',
    restNamespace: 'ktheme/v1',
    jsPackageScope: '@ktheme/',
  }

  if (registry?.product?.root !== 'ktheme') {
    errors.push('product.root must be ktheme')
  }

  if (registry?.product?.enginePluginSlug !== 'ktheme-engine') {
    errors.push('product.enginePluginSlug must be ktheme-engine')
  }

  for (const [name, value] of Object.entries(expectedNamespaces)) {
    if (registry?.namespaces?.[name] !== value) {
      errors.push(`namespaces.${name} must be ${value}`)
    }
  }

  for (const listName of ['extensionTypes', 'patternScopes', 'forbiddenPersistentTerms']) {
    const values = registry?.[listName]
    if (!Array.isArray(values) || values.length === 0) {
      errors.push(`${listName} must be a non-empty array`)
    } else if (hasDuplicates(values)) {
      errors.push(`${listName} must not contain duplicates`)
    }
  }

  const postTypes = registry?.genericContentModels?.postTypes ?? []
  const taxonomies = registry?.genericContentModels?.taxonomies ?? []
  const forbiddenTerms = registry?.forbiddenPersistentTerms ?? []

  for (const key of postTypes) {
    if (!/^ktheme_[a-z0-9_]+$/.test(key) || key.length > 20) {
      errors.push(`invalid post type key: ${key}`)
    }
  }

  for (const key of taxonomies) {
    if (!/^ktheme_[a-z0-9_]+$/.test(key) || key.length > 32) {
      errors.push(`invalid taxonomy key: ${key}`)
    }
  }

  for (const key of [...postTypes, ...taxonomies]) {
    const forbiddenTerm = forbiddenTerms.find((term) => key.includes(term))
    if (forbiddenTerm) {
      errors.push(`forbidden persistent term "${forbiddenTerm}" in ${key}`)
    }
  }

  if (registry?.designPolicy?.preserveCurrentDesign !== true) {
    errors.push('designPolicy.preserveCurrentDesign must remain true')
  }

  const compatibility = registry?.compatibilityPolicy
  if (
    compatibility?.existingCustomerSites !== false ||
    compatibility?.legacyMigrationRequired !== false ||
    compatibility?.removeLegacyShortcodesBeforeRelease !== true ||
    compatibility?.renameVersionedPatternNamespaceBeforeRelease !== true
  ) {
    errors.push('compatibilityPolicy does not match the pre-release no-customer policy')
  }

  return errors
}

const validateManifest = (manifest, registry, file) => {
  const errors = []
  const requiredFields = [
    'id',
    'type',
    'version',
    'title',
    'description',
    'entry',
    'dependencies',
    'supports',
    'status',
  ]

  for (const field of requiredFields) {
    if (!(field in manifest)) {
      errors.push(`${file}: missing ${field}`)
    }
  }

  if (!/^(ktheme|ktheme-engine|ktheme-[a-z0-9-]+)\/[a-z][a-z0-9-]+$/.test(manifest.id ?? '')) {
    errors.push(`${file}: invalid extension id ${manifest.id ?? ''}`)
  }

  if (!registry.extensionTypes.includes(manifest.type)) {
    errors.push(`${file}: unknown extension type ${manifest.type}`)
  }

  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(manifest.version ?? '')) {
    errors.push(`${file}: version must use semantic versioning`)
  }

  if (!Array.isArray(manifest.dependencies) || hasDuplicates(manifest.dependencies)) {
    errors.push(`${file}: dependencies must be a unique array`)
  }

  if (!Array.isArray(manifest.supports) || hasDuplicates(manifest.supports)) {
    errors.push(`${file}: supports must be a unique array`)
  }

  if (!['experimental', 'stable', 'deprecated'].includes(manifest.status)) {
    errors.push(`${file}: invalid status ${manifest.status}`)
  }

  return errors
}

try {
  const registry = readJson(registryArgument)
  const errors = validateRegistry(registry)

  for (const manifestFile of manifestArguments) {
    errors.push(...validateManifest(readJson(manifestFile), registry, manifestFile))
  }

  if (errors.length > 0) {
    for (const error of errors) {
      fail(error)
    }
  } else {
    process.stdout.write(
      `Validated KTheme registry and ${manifestArguments.length} extension manifest(s).\n`,
    )
  }
} catch (error) {
  fail(error.message)
}
