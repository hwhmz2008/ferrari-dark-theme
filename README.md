# Ferrari Dark Theme

A **Ferrari-inspired Dark Luxury theme** for the **DeepSeek Harness (DSH) Web GUI**,
packaged as a **persistent Cordis plugin**: install once, and DSH loads it on every
start. No build step, no patching of the shipped app, no dynamic plugin that
vanishes on restart.

```
Dark Luxury / Editorial / Precision / Performance / Cinematic / Minimal / Sharp
```

---

## What you get

- **Full dark surface** — near-black panels, restrained Ferrari Red (`#E10600`)
  used only as a *visual event*, never as a wash.
- **Ferrari backdrop** — the artwork sits in the main column with a
  left-dark / right-light mask so text stays readable while the car stays visible.
- **Send → ignition chain** — composer press → border runner → energy transfer →
  ceiling ignition → generating pulse → completion flash.
- **Ambient cinema** — breathing red ambient, slow ground sweep, ceiling light strip.
- **Empty-state hero** — new conversations become "left interaction, right Ferrari"
  with a protected visual safe area, so the car is never covered by the composer.
- **Model Performance Selector** — the reasoning picker becomes a horizontal
  OFF / HIGH / MAX drive-mode slider with a sliding red runner and keyboard support.
- **Sidebar Wind Tunnel** — while the model is thinking / streaming / calling tools,
  hairline airflow (streamlines, nose pressure glow, tail wake, underbody flow,
  air particles) runs **left → right over the car illustration**. The car itself
  never moves; only the air does. Invisible at idle, by design.
- **Accessible defaults** — `prefers-reduced-motion` shows static airflow; every
  decorative layer is `pointer-events: none`.

---

## Requirements

| | |
|---|---|
| DeepSeek Harness | desktop or `dsh web`, **0.2.0-rc.2** (see [Compatibility](#compatibility)) |
| Node.js | 18+ (only for the optional rebuild scripts) |
| OS | Windows (installer is PowerShell; manual steps work anywhere) |

The bundled artwork lives in `plugin/assets/` and is used by default — nothing to configure.

---

## Quick install (Windows)

From the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

The script:

1. copies `plugin/` to `%USERPROFILE%\.dsh\plugins\ferrari-dark-theme`;
2. registers a `ferrari-dark-theme` row in your active profile's
   `cordis.patch.yml` (backup written to `cordis.patch.yml.bak`);
3. prints the verification URLs.

Re-running it replaces the row instead of duplicating it.

**Then fully quit and reopen DeepSeek Harness.** The theme is applied at startup.

---

## Manual install (any OS)

1. Copy the `plugin/` directory somewhere stable, e.g.
   `~/.dsh/plugins/ferrari-dark-theme`.

2. Open your profile patch — typically
   `~/.dsh/profiles/<profile>/cordis.patch.yml` (on Windows
   `C:\Users\<you>\.dsh\profiles\desktop\cordis.patch.yml`) — and append:

   ```yaml
   # Ferrari Dark Theme - persistent install
   - insert:
       - id: ferrari-dark-theme
         name: 'file:///ABS/PATH/TO/plugins/ferrari-dark-theme/lib/index.js'
   ```

   > **Use a `file:///` URL, not a bare drive path.**
   > `D:/...` fails Node's ESM resolver (`ERR_UNSUPPORTED_ESM_URL_SCHEME`), and the
   > row then mounts its host half while silently contributing nothing else.
   > Spaces must be percent-encoded (`%20`). The installer generates this for you.

3. Restart DSH.

Artwork paths are optional: the plugin defaults to the `assets/` folder inside its
own package. To point elsewhere, add:

```yaml
         config:
           background: 'D:/pictures/my-background.png'
           car: 'D:/pictures/my-car.png'
```

---

## Uninstall

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1 -Uninstall
```

or delete the `- insert:` block from `cordis.patch.yml`, then restart DSH.
`cordis.patch.yml.bak` holds the previous patch layer.

---

## Verify it is running

With DSH open:

```powershell
curl.exe -I http://127.0.0.1:19387/ferrari-background.png   # 200 image/png
curl.exe -I http://127.0.0.1:19387/ferrari-car.png          # 200 image/png
curl.exe -I http://127.0.0.1:19387/ferrari-theme.js         # 200 text/javascript
```

The plugin also writes two diagnostic logs next to its host half:

| File | Meaning |
|---|---|
| `plugin/lib/.requests.log` | the page fetched `/ferrari-theme.js` (script injection worked) |
| `plugin/lib/.last-run.log` | `applied` = theme mounted; a `diag` line reports whether the background, car and wind-tunnel layers are live |

Adjust the port if your GUI runs elsewhere (`DSH_WEB_URL` tells you).

---

## How it works

```
plugin/
├── package.json          # type: module, main: lib/index.js
├── lib/index.js          # HOST half  — Cordis plugin
├── lib/theme-browser.js  # CLIENT half — generated classic script
├── src-theme.js          # the theme source (tokens + CSS + DOM state machine)
├── assets/               # background.png, car.png
└── build/
    ├── gen-browser.mjs   # src-theme.js -> lib/theme-browser.js
    ├── retarget.mjs      # rewrites DSH class-name hashes (see Compatibility)
    └── verify.mjs        # pre-flight gate before publishing a build
```

The **host half** is a plain Cordis plugin that injects `webServer` and:

1. serves the two PNGs on exact routes;
2. serves the generated browser script;
3. adds `<script src="/ferrari-theme.js">` to the GUI document through the
   webserver's `index-inject` hook — the same extension point `dsh-client-modules`
   uses for its own boot rows;
4. exposes a tiny beacon route used only for diagnostics.

The **browser half** is a self-contained classic script (no module loader, no
Cordis services). It injects one `<style>` element, then binds a `MutationObserver`
+ DOM state machine that drives chat state into `data-ferrari-state`, so the CSS
does the animation work.

### Why not a `dsh.client` bundle?

It was tried first and does not work reliably here: `dsh-client-modules` resolves a
loader row's `name` through Node's ESM resolver to locate the owning package
manifest, and Windows drive paths are rejected outright. The host-side script
injection is deterministic and was verified end-to-end, so the package ships only
that path.

---

## Compatibility

DSH ships CSS-module class names with a per-build hash
(`BynINW_centerCol`, `_2H3hWW_root`, `RlGAzG_card`, …). This release is retargeted
to **0.2.0-rc.2**, the desktop build it was developed against. On a different DSH
version the theme may load but style nothing, because no selector matches.

To check:

```bash
node plugin/build/verify.mjs
```

To retarget to another version, update the mapping in
`plugin/build/retarget.mjs` (the header explains how the hashes were read out of
`app.asar`), then rebuild and verify:

```bash
node plugin/build/retarget.mjs   # rewrites src-theme.js
node plugin/build/gen-browser.mjs
node plugin/build/verify.mjs
```

> A syntax error in the generated script silently removes the whole theme. Always
> run `verify.mjs` before shipping a build — it is exactly the failure this gate
> exists to prevent.

---

## Customize

| What | Where |
|---|---|
| Artwork | replace `plugin/assets/background.png` (wide, car right) and `car.png` (side view, nose left) |
| Accent color | `--ferrari-red` and the `#E10600` literals in `src-theme.js` |
| Chat width / safe area | `--ferrari-chat-width`, `--ferrari-safe-right`, `--ferrari-content-left` |
| Airflow speed | `--ft-speed` per state, per-path `--ft-dur` in the SVG block |
| Sidebar car position | `--ferrari-car-bottom` on the sidebar root |

After editing `src-theme.js`, run `gen-browser.mjs` then `verify.mjs`, and restart DSH.

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Nothing changes after install | App not restarted — the script tag is injected at startup only |
| Artwork routes 404 | Row did not mount: check the `file:///` URL and that `lib/index.js` exists |
| Theme partially applied (colors yes, layout no) | Class names drifted — run `retarget.mjs` against your DSH build |
| Background missing but colors correct | Another stylesheet wins the `background` shorthand; the theme uses doubled class selectors, so re-run `verify.mjs` to confirm the build is current |
| Sidebar airflow never appears | It only runs while the model is busy — send a message; idle shows nothing |
| `.last-run.log` shows `applied-nocenter` | The main column selector did not match; retarget needed |

---

## Assets & license

Code: **MIT** — see [LICENSE](LICENSE).

The two PNGs in `plugin/assets/` are the artwork this theme was designed around.
Replace them with your own if you redistribute publicly; the layout assumes a wide
backdrop with the car on the right and a left-facing side-view car for the sidebar.
No Ferrari wordmark, badge, or logo is included or drawn by this project.
