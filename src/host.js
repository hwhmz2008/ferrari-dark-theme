// Ferrari Dark Theme — HOST half (pkg-26 / run-27 snapshot)
// This file is the exact `code.host` function body used by cordis_define.
// Usage: read this file and pass its content as code.host when recreating
// the plugin after a DSH restart.
return {
  apply(ctx) {
    const webServer = ctx.get('webServer')
    const fs = ctx.get('fs')
    if (webServer === undefined || fs === undefined) return
    function serveImage(routePath, filePath) {
      return webServer.register({
        kind: 'exact',
        path: routePath,
        handler: async (req, res) => {
          try {
            const target = await fs.resolve(filePath)
            const bytes = await fs.readBytes(target, undefined, 33554432)
            res.writeHead(200, {
              'Content-Type': 'image/png',
              'Cache-Control': 'public, max-age=86400',
              'Content-Length': String(bytes.byteLength)
            })
            res.end(bytes)
          } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('not found')
          }
        }
      })
    }
    const d1 = serveImage('/ferrari-background.png', 'D:/ai/deepseek_harness/ui/background.png')
    const d2 = serveImage('/ferrari-car.png', 'D:/ai/deepseek_harness/ui/car.png')
    ctx.effect(() => {
      return () => { d1(); d2() }
    })
  }
}
