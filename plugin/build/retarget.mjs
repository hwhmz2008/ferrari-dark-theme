#!/usr/bin/env node
// Retarget the theme to the DOM of the DSH build in `D:\app01\ds`.
//
// The theme was authored against DSH 0.1.0-rc.6, whose CSS-module class names
// are hashed differently from the 0.2.0-rc.2 desktop build. This script rewrites
// the old prefixes to the ones that build actually renders, using the mapping
// extracted from `dsh/node_modules/@deepseek-ai/dsh-client-ui-*/lib/client.js`
// inside `app.asar`.
//
// Usage: node build/retarget.mjs [--check]
//   --check  report the mapping without writing.
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const packageRoot = join(here, '..')
const sourcePath = join(packageRoot, 'src-theme.js')
const checkOnly = process.argv.includes('--check')

// Longest/most specific entries first so a shared stem cannot win early.
const MAP = [
  // sidebar list rows (workspace) — iconButton lives in a different module
  ['YDXeBa_iconButton', '_9lTDKa_iconButton'],
  ['YDXeBa_', 'hIlkoa_'],
  // message action buttons: plural and singular use different modules
  ['p-xYUq_actions', 'zZmEaW_actions'],
  ['p-xYUq_action', 'xD_KDq_action'],
  // tool-call summary rows spread across three modules
  ['QWLzlG_title', 'XZcbxG_title'],
  ['QWLzlG_row', 'XZcbxG_row'],
  ['QWLzlG_chevron', 'XZcbxG_chevron'],
  ['QWLzlG_summary', 'wY20ga_summary'],
  ['QWLzlG_leading', 'wY20ga_leading'],
  ['QWLzlG_thinkBody', '_3GBCTG_thinkBody'],
  // wholesale prefix swaps
  ['_7KE1Ra_', 'wq12jW_'],   // model-selection
  ['pI_x6G_', 'BynINW_'],    // layout frame / center / sidebar columns
  ['wSkVaW_', 'Dc7zOa_'],    // conversation root / header / composer seat
  ['hHd-Xa_', '_2H3hWW_'],   // sidebar
  ['pXSMma_', 'Hqq-bq_'],    // empty-state hero shell
  ['uV2eYG_', 'RlGAzG_'],    // composer card / input / send button
  ['Md3f7G_', 'xz4KEq_'],    // chat transcript column
  ['qDHVXG_', '_9lTDKa_'],   // workspace section label / icon button
  ['Nqubda_', 'zf92ZW_'],    // cordis plugin badge in the sidebar footer
  ['gdEzaW_', 'cJsG2q_']     // user message bubble
]

const original = await readFile(sourcePath, 'utf8')
let next = original
const report = []
for (const [from, to] of MAP) {
  const hits = next.split(from).length - 1
  if (hits > 0) {
    next = next.split(from).join(to)
    report.push(`  ${from.padEnd(22)} -> ${to.padEnd(22)} ${hits}`)
  }
}

const left = ['pI_x6G_', 'wSkVaW_', 'hHd-Xa_', 'pXSMma_', 'uV2eYG_', 'Md3f7G_', '_7KE1Ra_', 'qDHVXG_', 'YDXeBa_', 'Nqubda_', 'gdEzaW_', 'p-xYUq_', 'QWLzlG_']
  .filter((prefix) => next.includes(prefix))

console.log('rewrites:')
console.log(report.join('\n') || '  (nothing to do)')
console.log(left.length === 0
  ? 'remaining old prefixes: none'
  : `remaining old prefixes: ${left.join(', ')}`)

if (checkOnly) process.exit(0)
if (next !== original) {
  await writeFile(sourcePath, next, 'utf8')
  console.log(`wrote ${sourcePath}`)
} else {
  console.log('source already retargeted')
}
