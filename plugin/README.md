# plugin/ — the installable package

This directory is what `install.ps1` copies to `%USERPROFILE%\.dsh\plugins\ferrari-dark-theme`.
See the [repository README](../README.md) for install, verification and compatibility notes.

```
package.json          type: module, main: lib/index.js
lib/index.js          HOST half: artwork routes + /ferrari-theme.js + index-inject row
lib/theme-browser.js  CLIENT half: generated classic script (do not edit by hand)
src-theme.js          theme source: tokens, CSS, DOM state machine, wind tunnel
assets/               background.png (wide backdrop) + car.png (sidebar side view)
build/gen-browser.mjs src-theme.js -> lib/theme-browser.js
build/retarget.mjs    rewrite DSH class-name hashes for another DSH version
build/verify.mjs      pre-flight gate: syntax, required selectors, host face, assets
```

## Editing loop

```bash
node build/gen-browser.mjs   # regenerate the browser half
node build/verify.mjs        # must print "verify passed" before shipping
```

Then restart DSH. A build that fails `verify.mjs` must never be shipped: a syntax
error in `theme-browser.js` makes the page drop the theme entirely.

## Notes

- The host half reads the artwork **per request**, and defaults to `assets/` inside
  this package, so the loader row needs no `config` at all.
- Deliver the browser half through `index-inject`, not through `dsh-client-modules`:
  a loader row whose `name` is a Windows drive path is rejected by Node's ESM
  resolver, so the `dsh.client` route silently contributes nothing.
- `lib/theme-browser.js` is idempotent (it checks for its own live `<style>` tag) and
  self-healing: if a reload removed the tag, the next load rebuilds the theme.

## Do not reshape the transcript

`xz4KEq_scroll` carries `container-type: inline-size`. Its padding and the
column width drive the app's container-query breakpoints, which decide whether
the turn rail and the timestamps render at all. Changing them made the whole
transcript look blank once - theme colours and spacing only, never that
container's box.
