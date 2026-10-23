#!/usr/bin/env node
// Build `lib/theme-browser.js` — a standalone classic script the HOST half
// injects into the Web GUI document through `webserver/index-inject`.
//
// Why this exists: the `dsh.client` bundle path depends on
// `dsh-client-modules` resolving the loader row name through Node's ESM
// resolver. A row named with a Windows absolute path (`D:/...`) fails that
// resolution, so the client bundle is silently skipped. This browser build is
// independent of that discovery: the host plugin serves it on its own route and
// adds the <script> tag to the page.
//
// `src-theme.js` is the shared plugin body (it ends with `return { inject,
// apply }` and expects a `styles` helper plus a Cordis-like ctx). This script
// wraps it verbatim and supplies both, so the two delivery paths stay in sync.
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const packageRoot = join(here, '..')
const pkg = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'))
const sourcePath = join(packageRoot, 'src-theme.js')
const outputPath = join(packageRoot, 'lib', 'theme-browser.js')

const body = await readFile(sourcePath, 'utf8')

const header = `// GENERATED FILE — do not edit. Source: src-theme.js (run \`node build/gen-browser.mjs\`).
// Ferrari Dark Theme — standalone browser half for ${pkg.name}.
// Loaded by the host plugin through webserver/index-inject; applies the theme
// without dsh-client-modules, Cordis services, or any module loader.
(function () {
  'use strict'
  // Self-healing idempotence: a live style tag means the theme is mounted; a
  // removed tag lets this script rebuild it on the next load.
  if (document.querySelector('style[data-plugin="dsh-ferrari-dark-theme"]') !== null) return

  var PLUGIN_ID = ${JSON.stringify(pkg.name)}
  var styles = {
    insert: function (css) {
      var el = document.createElement('style')
      el.setAttribute('data-plugin', PLUGIN_ID)
      el.setAttribute('data-ferrari-theme', '')
      el.textContent = css
      ;(document.head || document.documentElement).appendChild(el)
      return function () {
        if (el.parentNode !== null) el.parentNode.removeChild(el)
      }
    }
  }

  function makeCtx() {
    return {
      get: function () { return undefined },
      effect: function (fn) {
        try {
          var disposer = fn()
          return typeof disposer === 'function' ? disposer : function () {}
        } catch (error) {
          if (window.console) window.console.warn('[ferrari-theme] effect failed', error)
          return function () {}
        }
      },
      timeout: function (fn, ms) {
        var id = setTimeout(fn, ms)
        return function () { clearTimeout(id) }
      },
      interval: function (fn, ms) {
        var id = setInterval(fn, ms)
        return function () { clearInterval(id) }
      }
    }
  }

  var plugin = (function () {
`

const footer = `
  })()

  function pick(selector) {
    try {
      return document.querySelector(selector) !== null
    } catch (error) {
      return false
    }
  }

  /** The main content column this DSH build renders. */
  var CENTER_SELECTOR = '.BynINW_centerCol'

  function metric(element) {
    if (element === null) return '-'
    var box = element.getBoundingClientRect()
    return String(Math.round(box.width)) + 'x' + String(Math.round(box.height))
  }

  function brief(element) {
    if (element === null) return '-'
    return String(element.tagName).toLowerCase() + '.' + String(element.className || '').split(' ')[0].slice(0, 28)
  }

  function kids(element, limit) {
    if (element === null) return []
    var out = []
    for (var i = 0; i < element.children.length && i < limit; i++) out.push(brief(element.children[i]))
    return out
  }

  /**
   * What actually occupies a viewport point, plus the paint chain around it.
   * This is how an "everything looks right but nothing is visible" report gets
   * resolved: elementFromPoint names the topmost element at that coordinate.
   */
  function hit(x, y) {
    try {
      var element = document.elementFromPoint(x, y)
      if (element === null) return 'none'
      var chain = []
      for (var i = 0; element !== null && i < 4; i++) {
        var style = window.getComputedStyle(element)
        chain.push(brief(element) + '[' + String(style.backgroundColor) + '|z' + String(style.zIndex) + ']')
        element = element.parentElement
      }
      return chain.join(' < ')
    } catch (error) {
      return 'err'
    }
  }

  /**
   * Report the live computed state of the containers the theme depends on, so a
   * host-side log answers "is it applied, is the artwork showing, is the tunnel
   * mounted, and does the transcript actually contain anything" without devtools.
   */
  function reportDiagnostics() {
    try {
      var center = document.querySelector(CENTER_SELECTOR)
      var side = document.querySelector('._2H3hWW_root')
      var root = document.querySelector('.Dc7zOa_root')
      var styleTag = document.querySelector('style[data-plugin="dsh-ferrari-dark-theme"]')
      var tunnels = document.querySelectorAll('.ferrari-wt')
      var centerStyle = center !== null ? window.getComputedStyle(center) : null
      var sideAfter = side !== null ? window.getComputedStyle(side, '::after') : null
      var scroll = document.querySelector('[data-conversation-scroll]')
      var column = document.querySelector('.xz4KEq_column')
      var scroller = document.querySelector('.xz4KEq_scroll')
      var scrollStyle = scroll !== null ? window.getComputedStyle(scroll) : null
      var firstItem = document.querySelector('[data-conversation-scroll] p, .xz4KEq_flowItem')
      var itemStyle = firstItem !== null ? window.getComputedStyle(firstItem) : null
      var bodyStyle = document.body !== null ? window.getComputedStyle(document.body) : null
      var scrollBox = scroll !== null ? scroll.getBoundingClientRect() : null
      var itemBox = firstItem !== null ? firstItem.getBoundingClientRect() : null
      var parts = {
        dark: document.body !== null && document.body.hasAttribute('data-ds-dark-theme') ? 1 : 0,
        bodyColor: bodyStyle !== null ? String(bodyStyle.color) : '-',
        itemColor: itemStyle !== null ? String(itemStyle.color) : '-',
        itemOpacity: itemStyle !== null ? String(itemStyle.opacity) : '-',
        itemDisplay: itemStyle !== null ? String(itemStyle.display) : '-',
        itemVis: itemStyle !== null ? String(itemStyle.visibility) : '-',
        itemBox: itemBox !== null ? [Math.round(itemBox.top), Math.round(itemBox.left), Math.round(itemBox.height)].join('/') : '-',
        itemText: firstItem !== null ? String(firstItem.textContent || '').trim().slice(0, 24) : '-',
        scrollBox: scrollBox !== null ? [Math.round(scrollBox.top), Math.round(scrollBox.height)].join('/') : '-',
        scrollTop: scroll !== null ? Math.round(scroll.scrollTop) : -1,
        scrollH: scroll !== null ? Math.round(scroll.scrollHeight) : -1,
        clientH: scroll !== null ? Math.round(scroll.clientHeight) : -1,
        hit: scrollBox !== null ? hit(Math.round(scrollBox.left + 220), Math.round(scrollBox.top + 220)) : '-',
        bg: centerStyle !== null && String(centerStyle.backgroundImage).indexOf('ferrari-background') >= 0 ? 1 : 0,
        bgz: centerStyle !== null ? String(centerStyle.backgroundSize).split(',')[0].slice(0, 10) : '-',
        rootbg: root !== null ? String(window.getComputedStyle(root).backgroundColor) : '-',
        style: styleTag !== null ? 1 : 0,
        wt: tunnels.length,
        wtop: tunnels.length > 0 ? String(window.getComputedStyle(tunnels[0]).opacity) : '-',
        state: side !== null ? String(side.getAttribute('data-ferrari-state') || 'none') : 'noside',
        car: sideAfter !== null && String(sideAfter.backgroundImage).indexOf('ferrari-car') >= 0 ? 1 : 0,
        view: center !== null ? String(center.getAttribute('data-ferrari-view') || 'none') : '-',
        center: metric(center),
        centerText: center !== null ? String(center.innerText || '').replace(/\s+/g, ' ').trim().length : -1,
        centerKids: kids(center, 4),
        root: metric(root),
        rootKids: kids(root, 4),
        scroll: scroll !== null ? metric(scroll) : 'missing',
        scrollKids: scroll !== null ? scroll.childElementCount : -1,
        scrollOpacity: scrollStyle !== null ? String(scrollStyle.opacity) : '-',
        scrollOverflow: scrollStyle !== null ? String(scrollStyle.overflowY) : '-',
        scroller: metric(scroller),
        colKids: column !== null ? column.childElementCount : -1,
        colRect: metric(column)
      }
      var probe = new Image()
      probe.src = '/ferrari-theme-beacon?phase=diag&d=' + encodeURIComponent(JSON.stringify(parts))
    } catch (error) { /* diagnostics are optional */ }
  }

  function applyTheme() {
    try {
      plugin.apply(makeCtx())
    } catch (error) {
      if (window.console) window.console.warn('[ferrari-theme] apply failed', error)
    }
    window.setTimeout(reportDiagnostics, 1500)
    return true
  }

  function beacon(phase) {
    try {
      var probe = new Image()
      probe.src = '/ferrari-theme-beacon?phase=' + phase +
        '&center=' + (pick(CENTER_SELECTOR) ? 1 : 0) +
        '&side=' + (pick('._2H3hWW_root') ? 1 : 0) +
        '&composer=' + (pick('.RlGAzG_root') ? 1 : 0) +
        '&t=' + String(Date.now())
    } catch (error) { /* diagnostics are optional */ }
  }

  function start() {
    // Bind as soon as the app shell exists; never let a missing selector block
    // the theme entirely (the CSS alone is already a large win).
    if (pick(CENTER_SELECTOR)) {
      applyTheme()
      beacon('applied')
      return
    }
    beacon('waiting')
    var tries = 0
    var done = false
    var poll = null
    var observer = null
    var finish = function (phase) {
      if (done) return
      done = true
      if (poll !== null) clearInterval(poll)
      if (observer !== null) observer.disconnect()
      applyTheme()
      beacon(phase)
    }
    observer = new MutationObserver(function () {
      if (pick(CENTER_SELECTOR)) finish('applied')
    })
    observer.observe(document.documentElement, { childList: true, subtree: true })
    poll = setInterval(function () {
      tries += 1
      if (pick(CENTER_SELECTOR)) finish('applied')
      else if (tries > 40) finish('applied-nocenter')
    }, 250)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start)
  } else {
    start()
  }
})()
`

await writeFile(outputPath, `${header}${body}${footer}`, 'utf8')
console.log(`built ${outputPath} (${(header.length + body.length + footer.length) / 1024 | 0} KiB)`)
