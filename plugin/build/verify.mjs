#!/usr/bin/env node
// Pre-flight check for a release of this package.
//
// 1. `lib/theme-browser.js` must parse as a classic script (a syntax error there
//    silently removes the whole theme from the page — it has happened).
// 2. It must target the class names of the DSH build it was retargeted for, and
//    must not still reference the old 0.1.x names.
// 3. `lib/index.js` must export a Cordis plugin face (`name`, `inject`, `apply`).
// 4. The artwork the host half serves must exist.
//
// Usage: node build/verify.mjs
import { readFile, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { Script } from 'node:vm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

const failures = []
const check = (ok, message) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${message}`)
  if (!ok) failures.push(message)
}

// 1. syntax
const browserSource = await readFile(join(root, 'lib', 'theme-browser.js'), 'utf8')
let syntaxOk = true
try {
  new Script(browserSource, { filename: 'theme-browser.js' })
} catch (error) {
  syntaxOk = false
  console.log(`      ${error.message}`)
}
check(syntaxOk, 'lib/theme-browser.js parses as a classic script')

// 2. selectors
const REQUIRED = [
  ['BynINW_centerCol', 'main content column'],
  ['_2H3hWW_root', 'sidebar root'],
  ['RlGAzG_root', 'composer'],
  ['wq12jW_menu', 'model selector menu'],
  ['xz4KEq_scroll', 'chat transcript'],
  ['Hqq-bq_root', 'empty-state hero'],
  ['ferrari-wt', 'wind tunnel layer'],
  ['ferrari-theme-beacon', 'diagnostic beacon'],
  ['ferrari-background.png', 'background route']
]
for (const [token, label] of REQUIRED) {
  check(browserSource.includes(token), `browser half references ${label} (${token})`)
}

const STALE = ['pI_x6G_', 'wSkVaW_', 'hHd-Xa_', 'uV2eYG_', 'Md3f7G_', '_7KE1Ra_', 'pXSMma_']
const stale = STALE.filter((prefix) => browserSource.includes(prefix))
check(stale.length === 0, `no DSH 0.1.x class names remain${stale.length ? ` (found ${stale.join(', ')})` : ''}`)

// 3. host face
const host = await import(pathToFileURL(join(root, 'lib', 'index.js')).href)
check(host.name === 'ferrari-dark-theme', 'host half exports its plugin name')
check(Array.isArray(host.inject) && host.inject.includes('webServer'), 'host half injects webServer')
check(typeof host.apply === 'function', 'host half exports apply()')

// 4. artwork
for (const asset of ['assets/background.png', 'assets/car.png']) {
  const info = await stat(join(root, asset)).catch(() => null)
  check(info !== null && info.size > 1000, `${asset} present (${info ? info.size : 0} bytes)`)
}

console.log('')
if (failures.length > 0) {
  console.error(`verify failed: ${failures.length} problem(s)`)
  process.exit(1)
}
console.log('verify passed')
