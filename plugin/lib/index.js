// Ferrari Dark Theme — HOST half.
//
// A plain Cordis plugin that owns everything the browser half needs:
//
//   1. the two decorative image routes (`/ferrari-background.png`,
//      `/ferrari-car.png`) served straight from disk;
//   2. the browser theme script (`/ferrari-theme.js`, generated from
//      `src-theme.js` by `build/gen-browser.mjs`);
//   3. the `<script>` tag for that file, injected into the GUI document
//      through the webserver's `index-inject` hook — the same extension point
//      `dsh-client-modules` uses for its own boot rows;
//   4. a diagnostic beacon route so a run can be verified from the host side.
//
// Why the script is injected instead of shipped as a `dsh.client` bundle:
// `dsh-client-modules` resolves a loader row's `name` through Node's ESM
// resolver to find the owning package manifest. A Windows absolute path
// (`D:/...`) is rejected by that resolver (`ERR_UNSUPPORTED_ESM_URL_SCHEME`),
// so such a row mounts its host half but never contributes a client bundle.
// The `file:///` URL form fixes discovery; this injection makes the theme work
// even when discovery is unavailable, and the theme source is idempotent so
// both paths can coexist.
//
// Loader row shape (profile `cordis.patch.yml`):
//
//   - insert:
//       - id: ferrari-dark-theme
//         name: 'file:///D:/path/to/plugin/lib/index.js'
//         config:
//           background: D:/path/to/background.png
//           car: D:/path/to/car.png
import { appendFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Stable Cordis plugin name. */
const name = 'ferrari-dark-theme'

/** Services required before the routes can be claimed. */
const inject = ['webServer']

/** This module's directory: the generated browser bundle lives beside it. */
const HERE = dirname(fileURLToPath(import.meta.url))

/** Route of the browser theme script. */
const THEME_SCRIPT_PATH = '/ferrari-theme.js'

/** Route the browser half pings once it has applied (host-side verification). */
const BEACON_PATH = '/ferrari-theme-beacon'

/** Append-only run log written by the beacon route. */
const BEACON_LOG = join(HERE, '.last-run.log')

/** Append-only request log: proves whether the page fetched the script. */
const REQUEST_LOG = join(HERE, '.requests.log')

/** Default artwork locations: the `assets/` directory shipped inside this package. */
const DEFAULTS = {
  background: join(HERE, '..', 'assets', 'background.png'),
  car: join(HERE, '..', 'assets', 'car.png')
}

/**
 * Send a plain body, honouring HEAD.
 * @param {object} req - request.
 * @param {object} res - response.
 * @param {number} status - HTTP status.
 * @param {string} type - content type.
 * @param {Buffer|string} body - payload.
 */
function send(req, res, status, type, body) {
  const bytes = typeof body === 'string' ? Buffer.from(body, 'utf8') : body
  res.writeHead(status, {
    'Content-Type': type,
    'Content-Length': String(bytes.byteLength)
  })
  res.end(req.method === 'HEAD' ? undefined : bytes)
}

/**
 * Serve one file from disk on an exact route.
 * @param {object} webServer - the webserver service.
 * @param {string} routePath - exact request path.
 * @param {string} filePath - absolute file path.
 * @param {string} contentType - MIME type.
 * @param {string} cacheControl - Cache-Control header value.
 * @returns {() => void} the disposer removing the route.
 */
function serveFile(webServer, routePath, filePath, contentType, cacheControl) {
  return webServer.register({
    kind: 'exact',
    path: routePath,
    handler: async (req, res) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        res.writeHead(405, { Allow: 'GET, HEAD' })
        res.end()
        return
      }
      try {
        const bytes = await readFile(filePath)
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': String(bytes.byteLength),
          'Cache-Control': cacheControl
        })
        res.end(req.method === 'HEAD' ? undefined : bytes)
        // Prove the page really fetched a script, which separates "not loaded"
        // from "loaded but visually inert" during diagnosis.
        if (contentType.startsWith('text/javascript')) {
          const ua = String(req.headers['user-agent'] ?? '-').slice(0, 40)
          appendFile(REQUEST_LOG, `${new Date().toISOString()} ${req.method} ${routePath} ${bytes.byteLength} ${ua}\n`, 'utf8').catch(() => {})
        }
      } catch {
        send(req, res, 404, 'text/plain; charset=utf-8', `missing: ${filePath}`)
      }
    }
  })
}

/**
 * Record one browser-half ping so a run can be verified without devtools.
 * @param {object} webServer - the webserver service.
 * @returns {() => void} the disposer removing the route.
 */
function serveBeacon(webServer) {
  return webServer.register({
    kind: 'exact',
    path: BEACON_PATH,
    handler: async (req, res) => {
      const url = new URL(req.url ?? BEACON_PATH, 'http://127.0.0.1')
      const phase = url.searchParams.get('phase') ?? 'unknown'
      const line = `${new Date().toISOString()} ${phase} ${url.search}\n`
      try {
        await appendFile(BEACON_LOG, line, 'utf8')
      } catch {
        /* diagnostics must never break the page */
      }
      send(req, res, 204, 'text/plain; charset=utf-8', '')
    }
  })
}

/**
 * Claim the routes and announce the browser script for the lifetime of this
 * plugin fiber.
 * @param {object} ctx - plugin context carrying the webServer service.
 * @param {object} [config] - `background` / `car` file overrides.
 */
function apply(ctx, config) {
  const webServer = ctx.get('webServer')
  if (webServer === undefined) return
  const settings = config ?? {}
  const background = typeof settings.background === 'string' && settings.background !== ''
    ? settings.background
    : DEFAULTS.background
  const car = typeof settings.car === 'string' && settings.car !== ''
    ? settings.car
    : DEFAULTS.car
  const themeScript = join(HERE, 'theme-browser.js')

  ctx.effect(() => {
    const disposers = [
      serveFile(webServer, '/ferrari-background.png', background, 'image/png', 'public, max-age=86400'),
      serveFile(webServer, '/ferrari-car.png', car, 'image/png', 'public, max-age=86400'),
      serveFile(webServer, THEME_SCRIPT_PATH, themeScript, 'text/javascript; charset=utf-8', 'no-cache'),
      serveBeacon(webServer)
    ]
    return () => {
      for (const dispose of disposers) dispose()
    }
  }, 'ferrari-dark-theme: theme routes')

  // Add the browser script to the GUI document. The webserver gathers these
  // rows while rendering index.html; `script-src` becomes a real <script> tag.
  ctx.on('webserver/index-inject', (table) => {
    table.push({
      kind: 'script-src',
      placement: 'head',
      src: THEME_SCRIPT_PATH
    })
  })
}

export { apply, inject, name }
