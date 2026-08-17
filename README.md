# Ferrari Dark Theme

A **Ferrari-inspired Dark Luxury theme** for the **DeepSeek Harness (DSH) Web GUI**.
Built as a dynamic Cordis plugin (Host + Client halves) that restyles the DSH
browser surface through tokens, CSS, and a lightweight DOM state machine — no
business logic is touched.

```
Dark Luxury / Editorial / Precision / Performance / Cinematic / Minimal
```

---

## ✨ Features

- **Full dark theme** — deep black surfaces, near-monochrome palette, and
  Ferrari Red (`#E10600`) used only as a restrained accent.
- **Precision chat layout** — centered reading column, floating composer,
  symmetric padding at any viewport size.
- **Send → Ignition state machine** — sending a message drives a visible chain:
  mechanical composer press → border runner → energy transfer → ceiling
  ignition → generating pulse → completion flash.
- **Ambient cinematic background** — breathing red ambient lights, a slow
  ground sweep, and a ceiling light strip over a fixed Ferrari backdrop.
- **Empty-state hero layout** — new conversations get a "left interaction,
  right Ferrari showcase" composition with a protected visual safe area.
- **Model Performance Selector** — the reasoning-level picker becomes a
  horizontal OFF / HIGH / MAX drive-mode slider with a sliding red runner,
  mechanical lock-in, and keyboard support.
- **Sidebar Wind Tunnel** — while the AI is thinking/generating/streaming,
  the sidebar car illustration gets an aerodynamic airflow overlay
  (streamlines, pressure glow, tail wake, air particles).
- Reduced-motion aware, collapsed-sidebar aware, `pointer-events: none` on
  every decorative layer.

---

## 📦 Requirements

- DeepSeek Harness (DSH) with the Web GUI (`dsh web`)
- Node.js 18+

---

## 🚀 Install

This theme is a **dynamic Cordis plugin**. The DSH session agent recreates it
with `cordis_define` / `cordis_run`, using the two source files in this repo:

| File              | Role                       |
| ----------------- | -------------------------- |
| `src/host.js`     | Host half — serves the background/car images over the web server |
| `src/client.js`   | Client half — tokens + CSS + DOM state machine + animations      |

Typical restore flow inside a DSH session:

1. Open a session and tell the agent to recreate the plugin from this repo:
   - `cordis_define` with `kind: "new"`, `idPrefix: "ferra"`,
     name `Ferrari Dark Theme`, reading `src/host.js` and `src/client.js`
     as the host/client code.
   - `cordis_run` the returned package (`mode: "run"`).
2. The images are referenced from disk by absolute path in `src/host.js`
   (`background.png`, `car.png`) — adjust those paths to your machine, or
   drop your own images into `assets/` and update the route→file mapping.

> Dynamic plugins are process-local: they live until the DSH process exits.
> Keep this repo as your source of truth and re-create the plugin after a
> restart.

---

## 🖼️ Assets

`assets/` is a placeholder directory. The theme expects two images:

- `background.png` — the Main-area Ferrari backdrop (wide, dark, car on the
  right).
- `car.png` — the sidebar car illustration (left-facing side view).

The images themselves are intentionally **not** committed here (they are
user-supplied artwork). Place your own copies in `assets/` and update the
file paths in `src/host.js` accordingly.

---

## 🎨 Design language

- **Ferrari Red** exists only as a *visual event* — accent, indicator,
  ignition moments. Never as a full-bleed wash.
- **Motion** comes from mechanical precision (easing
  `cubic-bezier(0.22, 1, 0.36, 1)`), not from game-like particle noise.
- **No racing icons, RPM dials, or telemetry** — restraint is the luxury.
- Every decorative layer is `pointer-events: none` and never intercepts
  clicks, scrolling, or the conversation list.

---

## 📄 License

MIT — see [LICENSE](LICENSE).
