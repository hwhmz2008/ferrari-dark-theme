// Ferrari Dark Theme — CLIENT half (v31: Sidebar Wind Tunnel)
// This file is the exact `code.client` function body for cordis_define.
// Host half is unchanged — reuse ferrari-host.js.
//
// v31 adds: Ferrari Wind Tunnel for the sidebar car illustration.
//   - The car NEVER moves (position/size/opacity/rotation untouched).
//   - Only the air moves: left -> right, hugging the body silhouette.
//   - 7 hairline streamlines (6 grey + 1 red), 3 wake trails, 1 red
//     underbody ground flow, a weak red nose-pressure glow, 4 air particles.
//   - Layer order: back airflow (z1) / car (z2) / front airflow (z3).
//   - Staggered start (~400ms), staged wind-down (650ms), abrupt cut (~380ms)
//     for very short runs; streaming runs ~22% faster than thinking.
//   - Reduced motion => static lines; hidden when sidebar collapsed or <700px.
//
// Everything else (dark tokens, ignition chain, empty-state hero layout,
// model performance selector, ambient/sweep/ceiling) is unchanged from v30.
const TOKENS = {
  '--dsw-alias-bg-base': { light: '#0a0a0a', dark: '#0a0a0a' },
  '--dsw-alias-bg-layer-1': { light: '#101010', dark: '#101010' },
  '--dsw-alias-bg-layer-2': { light: '#161616', dark: '#161616' },
  '--dsw-alias-bg-overlay': { light: '#1c1c1c', dark: '#1c1c1c' },
  '--dsw-alias-border-l1': { light: 'rgba(255,255,255,0.06)', dark: 'rgba(255,255,255,0.06)' },
  '--dsw-alias-border-l2': { light: 'rgba(255,255,255,0.10)', dark: 'rgba(255,255,255,0.10)' },
  '--dsw-alias-brand-primary': { light: '#E10600', dark: '#E10600' },
  '--dsw-alias-label-primary': { light: '#f2f2f2', dark: '#f2f2f2' },
  '--dsw-alias-label-secondary': { light: 'rgba(255,255,255,0.62)', dark: 'rgba(255,255,255,0.62)' },
  '--dsw-alias-state-error-primary': { light: '#E10600', dark: '#ff3b30' },
  '--dsw-alias-state-success-primary': { light: '#2fbf71', dark: '#2fbf71' },
  '--dsw-alias-state-warn-primary': { light: '#e6a23c', dark: '#e6a23c' },
  '--dsw-specific-sidebar-fill': { light: '#080808', dark: '#080808' }
}

const CSS = `
@property --ferrari-border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

:root {
  --ferrari-red: #E10600;
  --border-subtle: rgba(255,255,255,0.07);
  --border-control: rgba(255,255,255,0.11);
  --border-hover: rgba(255,255,255,0.20);
  --border-accent: rgba(225,6,0,0.42);
  --border-accent-focus: rgba(225,6,0,0.72);
  --ferrari-chat-width: clamp(620px, 52vw, 800px);
  --ferrari-runner-x: 50%;
  --ferrari-scale: 1;
  --ferrari-dir: 1;
  --ferrari-dur: 280ms;
  --ferrari-safe-right: 420px;
  --ferrari-content-left: 56px;
}

body, body[data-ds-dark-theme] {
  --dsw-alias-bg-base: #0a0a0a;
  --dsw-alias-bg-layer-1: #101010;
  --dsw-alias-bg-layer-2: #161616;
  --dsw-alias-bg-overlay: #1c1c1c;
  --dsw-alias-border-l1: rgba(255,255,255,0.06);
  --dsw-alias-border-l2: rgba(255,255,255,0.10);
  --dsw-alias-brand-primary: #E10600;
  --dsw-alias-state-idle-primary: rgba(255,255,255,0.28);
  --dsw-specific-sidebar-fill: #080808;
  --dsw-static-deepseek-50: #1c0a0a;
  --dsw-static-deepseek-100: #2a0f0f;
  --dsw-static-deepseek-200: #7a1a1a;
  --dsw-static-deepseek-300: #a81616;
  --dsw-static-deepseek-400: #E10600;
  --dsw-static-deepseek-450: #E10600;
  --dsw-static-deepseek-500: #E10600;
  --dsw-static-deepseek-600: #b80000;
  --dsw-static-deepseek-700-delete: #8a0400;
  --dsw-static-deepseek-800: #3a0a0a;
  --dsw-static-deepseek-900: #240606;
  --dsw-static-blue-50: #141414;
  --dsw-static-blue-50p: #141414;
  --dsw-static-blue-75: #181818;
  --dsw-static-blue-100: #222222;
  --dsw-static-blue-300: #555555;
  --dsw-static-blue-400: #808080;
  --dsw-static-blue-450: #909090;
  --dsw-static-blue-500: #a0a0a0;
  --dsw-static-blue-600: #b5b5b5;
  --dsw-static-blue-800: #dcdcdc;
  --dsw-static-blue-900: #f0f0f0;
  --dsw-static-blue-950: #f7f7f7;
  --dsw-static-neutral-bluish-950: #060606;
  --dsw-static-neutral-bluish-900: #0a0a0a;
  --dsw-static-neutral-bluish-875: #0e0e0e;
  --dsw-static-neutral-bluish-850: #131313;
  --dsw-static-neutral-bluish-800: #181818;
  --dsw-static-neutral-bluish-750: #1e1e1e;
  --dsw-static-neutral-bluish-700: #242424;
  --dsw-static-neutral-bluish-600: #383838;
  --dsw-static-neutral-bluish-500: #545454;
  --dsw-static-neutral-bluish-400: #7c7c7c;
  --dsw-static-neutral-bluish-300: #a1a1a1;
  --dsw-static-neutral-bluish-200: #c3c3c3;
  --dsw-static-neutral-bluish-150: #d7d7d7;
  --dsw-static-neutral-bluish-100: #e5e5e5;
  --dsw-static-neutral-bluish-75: #eeeeee;
  --dsw-static-neutral-bluish-60: #f3f3f3;
  --dsw-static-neutral-bluish-50: #f7f7f7;
  --dsw-static-neutral-bluish-00: #ffffff;
  --dsw-static-neutral-bluish-1000: #000000;
  --dsw-static-neutral-800: #131313;
  --dsw-static-neutral-850: #0e0e0e;
  --dsw-static-neutral-900: #0a0a0a;
  --dsw-static-neutral-1000: #000000;
  --dsw-static-red-50: #1c0a0a;
  --dsw-static-red-100: #2a0f0f;
  --dsw-static-red-400: #ff2d2d;
  --dsw-static-red-500: #E10600;
  --dsw-static-red-600: #c00000;
  --dsw-static-red-900: #3a0505;
  --dsw-static-green-500: #2fbf71;
  --dsw-static-green-400: #4dd68a;
  --dsw-static-green-900: #0f2418;
  --dsw-alias-state-business-primary: #E10600;
  --dsw-alias-state-business-tertiary: #2a0f0f;
  --dsw-alias-button-info-fill: #E10600;
  --dsw-alias-button-info-hover: #ff1e1e;
  --dsw-alias-brand-primary-new-colorprimary-new-color: #E10600;
  --dsw-alias-label-primary: #f2f2f2;
  --dsw-alias-label-secondary: rgba(255,255,255,0.62);
  --dsw-alias-label-tertiary: rgba(255,255,255,0.46);
  --dsw-alias-label-caption: rgba(255,255,255,0.40);
  --dsw-alias-label-primary-inverted: #0a0a0a;
  --dsw-alias-label-primary-bluish: #f0f0f0;
  --dsw-alias-button-primary-fill: #E10600;
  --dsw-alias-button-primary-hover: #ff1e1e;
  --dsw-alias-button-primary-dimmed: #2a0f0f;
  --dsw-alias-markdown-code-block: #0c0c0c;
  --dsw-alias-markdown-code-block-banner: #070707;
  --dsw-alias-markdown-inline-code: rgba(255,255,255,0.055);
  --dsw-alias-markdown-placeholder: #141414;
  --dsw-alias-markdown-tag: #141414;
  --dsw-alias-markdown-citation: #1c1c1c;
  --dsw-alias-markdown-code-segment-selected: #1c1c1c;
  --dsw-alias-markdown-code-segment-unselected: #141414;
  --dsw-alias-scrollbar-bg-l1: rgba(255,255,255,0.18);
  --dsw-alias-scrollbar-bg-l2: rgba(255,255,255,0.22);
  --dsw-alias-scrollbar-hover-l1: rgba(225,6,0,0.50);
  --dsw-alias-scrollbar-hover-l2: rgba(225,6,0,0.60);
  --dsw-specific-bubble: #1a1a1a;
  --dsw-specific-bubble-highlight: #242424;
  --dsw-specific-input-major: rgba(16,16,16,0.90);
  --dsw-specific-selector: #141414;
  --dsw-specific-tip: #141414;
  --dsw-specific-menu: #151515;
  --dsw-specific-sidebar-nav-item-hover: rgba(255,255,255,0.035);
  --dsw-specific-sidebar-nav-item-active: rgba(225,6,0,0.08);
  --dsw-specific-sidebar-nav-item-active-accent: #E10600;
  --dsw-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --dsw-shadow-lv2: 0 4px 12px 0 rgba(0,0,0,0.40), 0 2px 8px 0 rgba(0,0,0,0.50);
  --dsw-shadow-lv3: 0 18px 45px 0 rgba(0,0,0,0.45);
}

:root { color-scheme: dark; }
html, body { background: #060606; }
:where(button, [role='button'], a, input, textarea, select):focus-visible { outline: 1px solid rgba(225,6,0,0.70); outline-offset: 1px; }
body { --dsh-scrollbar-width: 4px; }
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-thumb { border-radius: 2px; }

.BynINW_frame { background: #060606; }
.BynINW_sidebarCol { border-right: 1px solid rgba(255,255,255,0.055); }
/* Doubled class names raise specificity to (0,2,0): the app sets an opaque
   background shorthand on these containers, and this must win regardless of
   which stylesheet lands last. */
.BynINW_centerCol.BynINW_centerCol {
  position: relative;
  isolation: isolate;
  background-color: #050505;
  background-image:
    linear-gradient(180deg, rgba(0,0,0,0.28) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.36) 100%),
    linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.90) 25%, rgba(5,5,5,0.76) 48%, rgba(5,5,5,0.44) 65%, rgba(5,5,5,0.18) 80%, rgba(5,5,5,0.10) 100%),
    linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.30)),
    url('/ferrari-background.png');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.BynINW_centerCol.BynINW_centerCol[data-ferrari-view='empty'] {
  background-color: #050505;
  background-image:
    linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.86) 28%, rgba(0,0,0,0.68) 48%, rgba(0,0,0,0.40) 62%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0.10) 100%),
    linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 26%, transparent 74%, rgba(0,0,0,0.14) 100%),
    url('/ferrari-background.png');
  background-size: 100% 100%, 100% 100%, contain;
  background-position: 0 0, 0 0, right 8px center;
  background-repeat: no-repeat;
}

/* Empty-state hero layout: left content zone + right Ferrari safe area */
.BynINW_centerCol[data-ferrari-view='empty'] .Dc7zOa_composerHero {
  align-self: flex-start;
  width: min(760px, calc(100% - var(--ferrari-content-left) - var(--ferrari-safe-right)));
  max-width: 760px;
  margin-left: var(--ferrari-content-left);
  margin-right: auto;
  padding-bottom: 32px;
}
.BynINW_centerCol[data-ferrari-view='empty'] .Hqq-bq_root {
  justify-content: flex-start;
  align-items: center;
  padding-left: 24px;
  padding-right: 0;
}
.BynINW_centerCol[data-ferrari-view='empty'] .Hqq-bq_stack {
  margin: 0;
  max-width: 760px;
  align-items: flex-start;
}
.BynINW_centerCol[data-ferrari-view='empty'] .Hqq-bq_headline {
  justify-content: flex-start;
}
.BynINW_centerCol[data-ferrari-view='empty'] .Dc7zOa_heroWorkspaceRow {
  align-self: flex-start;
  padding-left: 24px;
}
.BynINW_centerCol[data-ferrari-view='empty'] .RlGAzG_root {
  align-items: stretch;
  padding-left: 24px;
  padding-right: 24px;
}
.BynINW_centerCol[data-ferrari-view='empty'] .RlGAzG_card {
  width: 100%;
  max-width: 760px;
  margin: 0;
}

.BynINW_centerCol::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  mix-blend-mode: screen;
  background:
    radial-gradient(42vw 40vh at 82% 38%, rgba(225,6,0,0.20) 0%, rgba(180,0,0,0.10) 24%, rgba(90,0,0,0.045) 48%, transparent 72%),
    radial-gradient(60vw 28vh at 75% 80%, rgba(225,6,0,0.12) 0%, rgba(150,0,0,0.05) 40%, transparent 70%),
    radial-gradient(52vw 26vh at 82% 8%, rgba(225,6,0,0.12) 0%, rgba(150,0,0,0.05) 40%, transparent 70%);
  mask-image: linear-gradient(90deg, transparent 0%, transparent 32%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.7) 58%, #000 72%, #000 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 32%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.7) 58%, #000 72%, #000 100%);
  opacity: 0.24;
  animation: ferrari-ambient 11s ease-in-out infinite alternate;
}
@keyframes ferrari-ambient { from { opacity: 0.18; } to { opacity: 0.30; } }
.BynINW_centerCol[data-ferrari-state='igniting']::before { animation: ferrari-ambient-wake 0.6s ease-out 0.3s forwards; }
@keyframes ferrari-ambient-wake { 0% { opacity: 0.24; } 50% { opacity: 0.38; } 100% { opacity: 0.30; } }
.BynINW_centerCol[data-ferrari-state='generating']::before { animation: ferrari-ambient-active 9s ease-in-out infinite alternate; }
@keyframes ferrari-ambient-active { from { opacity: 0.27; } to { opacity: 0.33; } }
.BynINW_centerCol[data-ferrari-state='complete']::before { animation: ferrari-ambient-off 1.2s ease-out forwards; }
@keyframes ferrari-ambient-off { from { opacity: 0.30; } to { opacity: 0.24; } }

.BynINW_centerCol::after {
  content: "";
  position: absolute;
  left: -20vw;
  bottom: 6vh;
  width: 78vw;
  height: 170px;
  z-index: -1;
  pointer-events: none;
  mix-blend-mode: screen;
  background: linear-gradient(90deg, transparent 0%, rgba(225,6,0,0.07) 18%, rgba(225,6,0,0.24) 38%, rgba(255,70,55,0.42) 50%, rgba(225,6,0,0.24) 62%, rgba(225,6,0,0.07) 82%, transparent 100%);
  filter: blur(8px);
  opacity: 0;
  will-change: transform, opacity;
  animation: ferrari-sweep 7s ease-in-out infinite;
}
@keyframes ferrari-sweep {
  0% { opacity: 0; transform: translateX(-25vw) rotate(-16deg); }
  8% { opacity: 0; transform: translateX(-25vw) rotate(-16deg); }
  18% { opacity: 0.30; }
  34% { opacity: 0.30; transform: translateX(105vw) rotate(-16deg); }
  44% { opacity: 0; transform: translateX(105vw) rotate(-16deg); }
  100% { opacity: 0; transform: translateX(105vw) rotate(-16deg); }
}
.BynINW_centerCol[data-ferrari-view='empty']::after { animation-name: ferrari-sweep-empty; }
@keyframes ferrari-sweep-empty {
  0% { opacity: 0; transform: translateX(-25vw) rotate(-16deg); }
  8% { opacity: 0; transform: translateX(-25vw) rotate(-16deg); }
  18% { opacity: 0.24; }
  34% { opacity: 0.24; transform: translateX(105vw) rotate(-16deg); }
  44% { opacity: 0; transform: translateX(105vw) rotate(-16deg); }
  100% { opacity: 0; transform: translateX(105vw) rotate(-16deg); }
}

.Dc7zOa_root.Dc7zOa_root,
.BynINW_centerCol .Dc7zOa_root { background: transparent; }
.Dc7zOa_root::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  z-index: -1;
  pointer-events: none;
  mix-blend-mode: screen;
  background: radial-gradient(ellipse 70% 62% at 50% 0%, rgba(255,70,50,0.50) 0%, rgba(225,6,0,0.24) 42%, rgba(120,0,0,0.08) 64%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 0%, rgba(0,0,0,0.62) 52%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0,0,0,0.62) 52%, transparent 100%);
  opacity: 0.16;
  transition: opacity 0.6s ease-out;
}
.Dc7zOa_root::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: -1;
  pointer-events: none;
  mix-blend-mode: screen;
  border-radius: 0 0 2px 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(225,6,0,0.0) 8%, rgba(255,90,70,0.9) 30%, rgba(255,255,255,0.95) 50%, rgba(255,70,50,0.9) 70%, rgba(225,6,0,0.0) 92%, transparent 100%);
  filter: blur(1px);
  opacity: 0;
  transform: scaleX(0);
  transform-origin: center center;
  transition: opacity 0.2s ease-out;
}

.BynINW_centerCol[data-ferrari-state='igniting'] .Dc7zOa_root::after {
  animation: ferrari-ceiling-strike 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes ferrari-ceiling-strike {
  0% { opacity: 0; transform: scaleX(0); }
  18% { opacity: 0.85; }
  45% { transform: scaleX(1); opacity: 0.7; }
  100% { opacity: 0.4; transform: scaleX(1); }
}
.BynINW_centerCol[data-ferrari-state='igniting'] .Dc7zOa_root::before {
  animation: ferrari-glow-wake 0.7s ease-out 0.1s both;
}
@keyframes ferrari-glow-wake { 0% { opacity: 0.16; } 45% { opacity: 0.62; } 100% { opacity: 0.5; } }

.BynINW_centerCol[data-ferrari-state='generating'] .Dc7zOa_root::after {
  animation: ferrari-core-pulse 2.4s ease-in-out infinite alternate;
}
@keyframes ferrari-core-pulse { from { opacity: 0.45; transform: scaleX(1); } to { opacity: 0.95; transform: scaleX(1); } }
.BynINW_centerCol[data-ferrari-state='generating'] .Dc7zOa_root::before {
  animation: ferrari-glow-pulse 2.8s ease-in-out infinite alternate;
}
@keyframes ferrari-glow-pulse { from { opacity: 0.3; } to { opacity: 0.72; } }

.BynINW_centerCol[data-ferrari-state='complete'] .Dc7zOa_root::after {
  animation: ferrari-core-off 1.1s ease-out forwards;
}
@keyframes ferrari-core-off { 0% { opacity: 0.7; transform: scaleX(1); } 30% { opacity: 0.85; } 100% { opacity: 0; transform: scaleX(0); } }
.BynINW_centerCol[data-ferrari-state='complete'] .Dc7zOa_root::before {
  animation: ferrari-glow-off 1.1s ease-out forwards;
}
@keyframes ferrari-glow-off { 0% { opacity: 0.5; } 35% { opacity: 0.6; } 100% { opacity: 0.16; } }

.BynINW_centerCol:has([data-streaming]) .Dc7zOa_root::after { animation: ferrari-core-pulse 2.4s ease-in-out infinite alternate; }
.BynINW_centerCol:has([data-state='running']) .Dc7zOa_root::before { animation: ferrari-glow-pulse 2.8s ease-in-out infinite alternate; }

/* Transcript: do not reshape the scroller. xz4KEq_scroll carries
   container-type: inline-size, so changing its padding (or the column width)
   moves the container-query breakpoints the app uses to show the turn rail and
   the timestamps. Only the spacing between turns is themed here. */
.xz4KEq_column { gap: 18px; }

._2H3hWW_root { background: #080808; position: relative; color: #f5f5f5; --ferrari-car-bottom: 128px; }
._2H3hWW_brand, ._2H3hWW_brand svg { color: #f5f5f5; }
._2H3hWW_root:not(._2H3hWW_collapsed) ._2H3hWW_logoRow { height: 112px; position: relative; }
._2H3hWW_root:not(._2H3hWW_collapsed) ._2H3hWW_brand svg { transform: scale(1.15); transform-origin: left center; }
._2H3hWW_root:not(._2H3hWW_collapsed) ._2H3hWW_logoRow::after {
  content: "AI ASSISTANT";
  position: absolute;
  left: 4px;
  bottom: 16px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.44);
  pointer-events: none;
}
._2H3hWW_iconButton { width: 32px; height: 32px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.16); color: rgba(255,255,255,0.60); opacity: 0.70; transition: border-color 0.16s ease, color 0.16s ease, background 0.16s ease, opacity 0.16s ease; }
._2H3hWW_iconButton:hover { background: rgba(255,255,255,0.04); border-color: #E10600; color: #ffffff; opacity: 1; }
._2H3hWW_newSession {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 10px;
  height: 42px;
  margin: 0 8px 8px;
  position: relative;
  color: rgba(255,255,255,0.92);
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
}
._2H3hWW_newSession::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: 0; height: 1px; background: rgba(225,6,0,0.55); transition: background 0.16s ease; }
._2H3hWW_newSession:hover { background: rgba(255,255,255,0.035); border-color: rgba(255,255,255,0.40); }
._2H3hWW_newSession:hover::after { background: #E10600; }
._2H3hWW_newSession:active { transform: scale(0.98); }

._9lTDKa_sectionLabel { color: rgba(255,255,255,0.46); font-size: 12px; font-weight: 400; }
.hIlkoa_sessionRow { border-radius: 4px; }
.hIlkoa_sessionRow .hIlkoa_title { color: rgba(255,255,255,0.72); }
.hIlkoa_sessionRow:hover { background: rgba(255,255,255,0.035); }
.hIlkoa_sessionRow.hIlkoa_selected { position: relative; background: linear-gradient(90deg, rgba(225,6,0,0.16) 0%, rgba(225,6,0,0.04) 100%); }
.hIlkoa_sessionRow.hIlkoa_selected::before { content: ""; position: absolute; left: 0; top: 50%; width: 2px; height: 64%; transform: translateY(-50%); background: #E10600; border-radius: 1px; }
.hIlkoa_sessionRow.hIlkoa_selected .hIlkoa_title { color: rgba(255,255,255,0.96); }
._9lTDKa_iconButton, ._9lTDKa_iconButton { opacity: 0.55; transition: opacity 0.16s ease, color 0.16s ease; }
._9lTDKa_iconButton:hover, ._9lTDKa_iconButton:hover { opacity: 0.95; }

._2H3hWW_footArea { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px; }
.zf92ZW_badge, .zf92ZW_badgeLabel { color: #f5f5f5; }
.zf92ZW_badgeCount { color: rgba(255,255,255,0.55); }
.VOzbGW_trigger, .VOzbGW_triggerLabel { color: #f5f5f5; }

/* Sidebar car illustration — geometry unchanged; the wind tunnel layer mirrors this box exactly */
._2H3hWW_root::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: var(--ferrari-car-bottom);
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 240px;
  height: 88px;
  z-index: 2;
  pointer-events: none;
  user-select: none;
  background-image: url('/ferrari-car.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  opacity: 0.62;
}
._2H3hWW_root._2H3hWW_collapsed::after { display: none; }
._2H3hWW_collapsed ._2H3hWW_root::after { display: none; }

/* ============================================================
   Ferrari Wind Tunnel — sidebar car aerodynamic visualization
   The car is the test object and never moves; only the air does.
   Flow direction: left -> right. Layers: back airflow (z1),
   car (z2), front airflow + pressure + wake (z3).
   ============================================================ */
.ferrari-wt {
  position: absolute;
  left: 50%;
  bottom: var(--ferrari-car-bottom);
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 240px;
  height: 88px;
  pointer-events: none;
  user-select: none;
  overflow: visible;
  --ft-speed: 1;
}
.ferrari-wt-back { z-index: 1; }
.ferrari-wt-front { z-index: 3; }
._2H3hWW_root[data-ferrari-flow='stream'] .ferrari-wt { --ft-speed: 0.78; }

/* visibility: idle = 0, running = 1 (staggered through --ft-delay) */
.ferrari-wt .ft-g,
.ferrari-wt .ft-ground,
.ferrari-wt .ft-wake { opacity: 0; transition: opacity 300ms ease-out; }
.ferrari-wt .ft-pressure { opacity: 0; transition: opacity 240ms ease-out; }
.ferrari-wt .ft-particle { opacity: 0; }

._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-g,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-g {
  opacity: 1;
  transition-delay: var(--ft-delay, 80ms);
}
._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-ground,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-ground {
  opacity: 1;
  transition-delay: 240ms;
}
._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-wake,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-wake {
  opacity: 1;
  transition-delay: 220ms;
}
._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-pressure,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-pressure {
  opacity: 1;
  transition-delay: 300ms;
}

/* wind-down: pressure first, then the airflow, then the wake */
._2H3hWW_root[data-ferrari-state='complete'] .ferrari-wt .ft-pressure { transition-duration: 200ms; transition-delay: 0ms; }
._2H3hWW_root[data-ferrari-state='complete'] .ferrari-wt .ft-g { transition-duration: 420ms; transition-delay: 180ms; }
._2H3hWW_root[data-ferrari-state='complete'] .ferrari-wt .ft-ground { transition-duration: 420ms; transition-delay: 180ms; }
._2H3hWW_root[data-ferrari-state='complete'] .ferrari-wt .ft-wake { transition-duration: 300ms; transition-delay: 350ms; }

/* abrupt cut (stop / failure): the tunnel loses power fast (~380ms) */
._2H3hWW_root.ferrari-wt-abrupt[data-ferrari-state='complete'] .ferrari-wt .ft-pressure { transition-duration: 120ms; transition-delay: 0ms; }
._2H3hWW_root.ferrari-wt-abrupt[data-ferrari-state='complete'] .ferrari-wt .ft-g { transition-duration: 240ms; transition-delay: 60ms; }
._2H3hWW_root.ferrari-wt-abrupt[data-ferrari-state='complete'] .ferrari-wt .ft-ground { transition-duration: 240ms; transition-delay: 60ms; }
._2H3hWW_root.ferrari-wt-abrupt[data-ferrari-state='complete'] .ferrari-wt .ft-wake { transition-duration: 200ms; transition-delay: 120ms; }

/* streamlines: hairline CFD data lines, 80% grey / 20% red */
.ferrari-wt .ft-line {
  fill: none;
  stroke: rgba(220,220,220,0.20);
  stroke-width: 0.7;
  stroke-linecap: round;
  stroke-dasharray: 26 18;
}
.ferrari-wt .ft-line-red {
  stroke: rgba(225,6,0,0.26);
  stroke-width: 0.8;
}
.ferrari-wt .ft-ground {
  fill: none;
  stroke: rgba(225,6,0,0.24);
  stroke-width: 0.9;
  stroke-linecap: round;
  stroke-dasharray: 14 10;
}
.ferrari-wt .ft-wake {
  fill: none;
  stroke: rgba(255,255,255,0.12);
  stroke-width: 0.6;
  stroke-linecap: round;
  stroke-dasharray: 6 8;
}
.ferrari-wt .ft-wake-red { stroke: rgba(225,6,0,0.15); }
.ferrari-wt .ft-particle { fill: rgba(255,255,255,0.90); }

/* only the air texture moves — the paths themselves stay put */
._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-line,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-line {
  animation-name: ft-dash-line;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: calc(var(--ft-dur, 1.8s) * var(--ft-speed, 1));
  animation-delay: var(--ft-phase, 0s);
}
._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-ground,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-ground {
  animation-name: ft-dash-ground;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: calc(var(--ft-dur, 1.4s) * var(--ft-speed, 1));
  animation-delay: var(--ft-phase, 0s);
}
._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-wake,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-wake {
  animation-name: ft-dash-wake, ft-wobble;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-duration: calc(var(--ft-dur, 1.9s) * var(--ft-speed, 1)), 2.1s;
  animation-delay: var(--ft-phase, 0s), 0s;
}
._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-particle,
._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-particle {
  animation-name: ft-fly;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
  animation-duration: calc(var(--ft-dur, 2.2s) * var(--ft-speed, 1));
  animation-delay: var(--ft-phase, 0s);
}

@keyframes ft-dash-line { to { stroke-dashoffset: -44; } }
@keyframes ft-dash-ground { to { stroke-dashoffset: -24; } }
@keyframes ft-dash-wake { to { stroke-dashoffset: -14; } }
@keyframes ft-wobble {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
@keyframes ft-fly {
  0% { transform: translateX(-6px); opacity: 0; }
  12% { opacity: 0.22; }
  82% { opacity: 0.14; }
  100% { transform: translateX(238px); opacity: 0; }
}

/* the tunnel disappears together with the car */
._2H3hWW_root._2H3hWW_collapsed .ferrari-wt { display: none; }
._2H3hWW_collapsed ._2H3hWW_root .ferrari-wt { display: none; }
@media (prefers-reduced-motion: reduce) {
  .ferrari-wt .ft-line,
  .ferrari-wt .ft-ground,
  .ferrari-wt .ft-wake,
  .ferrari-wt .ft-particle { animation: none !important; }
  .ferrari-wt .ft-g,
  .ferrari-wt .ft-ground,
  .ferrari-wt .ft-wake,
  .ferrari-wt .ft-pressure { transition-duration: 200ms; transition-delay: 0ms; }
  ._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-g,
  ._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-g { opacity: 0.12; }
  ._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-ground,
  ._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-ground { opacity: 0.12; }
  ._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-wake,
  ._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-wake { opacity: 0.10; }
  ._2H3hWW_root[data-ferrari-state='igniting'] .ferrari-wt .ft-pressure,
  ._2H3hWW_root[data-ferrari-state='generating'] .ferrari-wt .ft-pressure { opacity: 0.08; }
  .ferrari-wt .ft-particle { opacity: 0 !important; }
}

.Dc7zOa_header { padding: 20px 32px 0 28px; }
.Dc7zOa_crumbCurrent { color: #f3f3f3; font-size: 15px; font-weight: 600; }

/* Readable inherited colour even if a component still resolves a light-mode
   value for itself. */
[data-conversation-scroll] { color: rgba(255,255,255,0.86); }

[data-conversation-scroll] p, [data-conversation-scroll] li { color: rgba(255,255,255,0.82); line-height: 1.8; font-size: 16px; }
[data-conversation-scroll] p { margin: 0 0 18px; }
[data-conversation-scroll] h1, [data-conversation-scroll] h2, [data-conversation-scroll] h3, [data-conversation-scroll] h4 { color: #f4f4f4; font-weight: 600; line-height: 1.4; margin: 1.5em 0 0.6em; }
[data-conversation-scroll] h1 { font-size: 21px; }
[data-conversation-scroll] h2 { font-size: 19px; }
[data-conversation-scroll] h3 { font-size: 17px; }
[data-conversation-scroll] h4 { font-size: 16px; }
[data-conversation-scroll] strong { color: rgba(255,255,255,0.96); font-weight: 600; }
[data-conversation-scroll] a { color: #e6e6e6; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,0.25); transition: color 0.16s ease; }
[data-conversation-scroll] a:hover { color: #E10600; text-decoration-color: #E10600; }
[data-conversation-scroll] blockquote { border-left: 2px solid rgba(225,6,0,0.38); color: rgba(255,255,255,0.60); padding-left: 14px; margin: 0.8em 0; }
[data-conversation-scroll] hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 1.4em 0; }
[data-conversation-scroll] code { background: rgba(255,255,255,0.055); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.82); border-radius: 4px; padding: 2px 5px; font-family: var(--ds-font-family-code); font-size: 0.875em; }
[data-conversation-scroll] ul, [data-conversation-scroll] ol { padding-left: 1.4em; margin: 0.6em 0; }
[data-conversation-scroll] li { margin: 4px 0; }

.XZcbxG_title { color: rgba(255,255,255,0.62); font-size: 13px; font-weight: 400; }
.wY20ga_summary { color: rgba(255,255,255,0.40); font-size: 12px; line-height: 18px; }
.wY20ga_leading { color: #E10600; }
.XZcbxG_chevron { color: rgba(255,255,255,0.40); transition: color 0.16s ease; }
.XZcbxG_row:hover .XZcbxG_title { color: rgba(255,255,255,0.92); }
._3GBCTG_thinkBody { color: rgba(255,255,255,0.40); font-size: 12.5px; line-height: 1.6; }

.md-code-block { background: rgba(8,8,8,0.86); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; margin: 0.8em 0; }
.md-code-block > div:first-child { background: #050505; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; font-size: 12px; color: rgba(255,255,255,0.45); }
.md-code-block > div:first-child button { background: transparent; border: none; color: rgba(255,255,255,0.50); cursor: pointer; font-size: 12px; padding: 2px 4px; transition: color 0.16s ease; }
.md-code-block > div:first-child button:hover { color: #E10600; }
.md-code-block pre, .md-code-block .shiki { margin: 0; padding: 14px 16px; overflow-x: auto; background: transparent; }

[data-conversation-scroll] table { border-collapse: collapse; width: 100%; font-size: 14px; margin: 1em 0; background: transparent; }
[data-conversation-scroll] th { background: rgba(255,255,255,0.055); color: rgba(255,255,255,0.78); font-weight: 500; text-align: left; border: 1px solid rgba(255,255,255,0.09); padding: 8px 12px; }
[data-conversation-scroll] td { color: rgba(255,255,255,0.78); border: 1px solid rgba(255,255,255,0.09); padding: 8px 12px; }
[data-conversation-scroll] tbody tr:hover { background: rgba(225,6,0,0.035); }

.cJsG2q_bubble { border-radius: 12px; color: rgba(255,255,255,0.90); }
.zZmEaW_actions { gap: 16px; margin-top: 14px; }
.xD_KDq_action { background: transparent; border-radius: 0; color: rgba(255,255,255,0.40); width: 22px; height: 22px; padding: 3px; transition: color 0.16s ease, background 0.16s ease; }
.xD_KDq_action:hover { background: rgba(255,255,255,0.025); color: rgba(255,255,255,0.90); }
.xD_KDq_action[data-active] { color: #E10600; }

.Dc7zOa_composerSeat { position: sticky; bottom: 0; z-index: 3; margin-top: 8px; background: linear-gradient(180deg, rgba(6,6,6,0) 0%, rgba(6,6,6,0.55) 22px, rgba(6,6,6,0.92) 48px, rgba(6,6,6,0.97) 100%); }
.RlGAzG_root { align-items: center; padding-left: 48px; padding-right: 48px; padding-bottom: 28px; }
.RlGAzG_card { width: var(--ferrari-chat-width); max-width: 820px; margin: 0 auto; background: rgba(12,12,12,0.82); backdrop-filter: blur(18px) saturate(110%); -webkit-backdrop-filter: blur(18px) saturate(110%); border: 1px solid rgba(225,6,0,0.38); border-radius: 18px; min-height: 110px; box-shadow: 0 18px 50px rgba(0,0,0,0.40), 0 0 20px rgba(225,6,0,0.04); transition: border-color 0.2s ease; }
.RlGAzG_card:focus-within { border-color: rgba(225,6,0,0.72); }

.RlGAzG_card::before {
  content: "";
  position: absolute;
  left: 68%;
  bottom: 8px;
  width: 340px;
  height: 60px;
  z-index: 2;
  pointer-events: none;
  mix-blend-mode: screen;
  background: linear-gradient(90deg, transparent 0%, rgba(225,6,0,0.25) 25%, rgba(255,80,60,0.85) 50%, rgba(255,120,100,0.5) 62%, transparent 100%);
  filter: blur(6px);
  transform: rotate(-16deg);
  opacity: 0;
  will-change: transform, opacity;
}
.RlGAzG_card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2.5px;
  background: conic-gradient(
    from var(--ferrari-border-angle),
    transparent 0deg 260deg,
    rgba(225,6,0,0.10) 290deg,
    rgba(225,6,0,0.40) 320deg,
    rgba(225,6,0,0.85) 345deg,
    rgba(255,255,255,0.9) 358deg,
    rgba(225,6,0,0.85) 360deg
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  filter: drop-shadow(0 0 3px rgba(225,6,0,0.55));
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
}

.BynINW_centerCol[data-ferrari-state='composer-ignition'] .RlGAzG_card {
  animation: ferrari-composer-press 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
@keyframes ferrari-composer-press {
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(0.994) translateY(1px); }
  100% { transform: scale(1) translateY(0); }
}
.BynINW_centerCol[data-ferrari-state='composer-ignition'] .RlGAzG_card::after {
  animation: ferrari-border-runner 720ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;
}
@keyframes ferrari-border-runner {
  0% { --ferrari-border-angle: 0deg; opacity: 0; }
  12% { opacity: 1; }
  100% { --ferrari-border-angle: 360deg; opacity: 1; }
}
.BynINW_centerCol[data-ferrari-state='igniting'] .RlGAzG_card::after,
.BynINW_centerCol[data-ferrari-state='generating'] .RlGAzG_card::after {
  animation: ferrari-border-runner-loop 2.4s linear infinite;
}
@keyframes ferrari-border-runner-loop {
  0% { --ferrari-border-angle: 0deg; opacity: 1; }
  100% { --ferrari-border-angle: 360deg; opacity: 1; }
}
.BynINW_centerCol[data-ferrari-state='complete'] .RlGAzG_card::after {
  animation: ferrari-border-runner-finish 0.9s ease-out forwards;
}
@keyframes ferrari-border-runner-finish {
  0% { --ferrari-border-angle: 0deg; opacity: 1; }
  100% { --ferrari-border-angle: 360deg; opacity: 0; }
}
.BynINW_centerCol[data-ferrari-state='composer-ignition'] .RlGAzG_card::before {
  animation: ferrari-transfer 560ms ease-out 320ms both;
}
@keyframes ferrari-transfer {
  0% { opacity: 0; transform: translateX(0) translateY(0) rotate(-16deg) scale(0.5); }
  12% { opacity: 0.95; }
  50% { opacity: 0.6; }
  100% { opacity: 0; transform: translateX(230px) translateY(-260px) rotate(-16deg) scale(1.1); }
}

.RlGAzG_input::placeholder { color: rgba(255,255,255,0.30); font-size: 15px; }
.RlGAzG_add { color: rgba(255,255,255,0.56); }
.RlGAzG_add:hover { color: #E10600; }
.RlGAzG_modes button, .RlGAzG_tools button:not(.RlGAzG_add) { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.09); border-radius: 8px; color: rgba(255,255,255,0.56); height: 29px; padding: 0 10px; font-size: 12px; transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease; }
.RlGAzG_modes button:hover, .RlGAzG_tools button:not(.RlGAzG_add):hover { background: rgba(255,255,255,0.05); border-color: rgba(225,6,0,0.40); color: rgba(255,255,255,0.94); }
.RlGAzG_modes button[data-active], .RlGAzG_modes button[aria-pressed='true'] { border-color: rgba(225,6,0,0.40); color: rgba(255,255,255,0.94); }
.RlGAzG_primary { background: #E10600; color: #ffffff; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; transition: transform 0.18s ease-out, box-shadow 0.16s ease, background 0.16s ease; }
.RlGAzG_primary:hover:not(:disabled) { background: #ff1e1e; box-shadow: 0 0 14px rgba(225,6,0,0.22); }
.RlGAzG_primary:active:not(:disabled) { transform: scale(0.92); background: #F02A23; box-shadow: 0 0 14px rgba(225,6,0,0.22); }
.RlGAzG_primary:disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.25); }

[role='menu'] { background: rgba(12,12,12,0.95); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.09); border-radius: 8px; box-shadow: 0 18px 45px rgba(0,0,0,0.45); overflow: hidden; }
[role='menuitem'] { background: transparent; border: none; color: rgba(255,255,255,0.78); min-height: 36px; transition: background 0.14s ease, color 0.14s ease; }
[role='menuitem']:hover, [role='menuitem']:focus { background: rgba(255,255,255,0.045); color: #ffffff; }
[role='separator'] { background: rgba(255,255,255,0.08); height: 1px; margin: 4px 0; }

/* Ferrari Model Performance Selector */
.wq12jW_menu[data-ferrari-effort] {
  width: 360px;
  height: 170px;
  max-height: 170px;
  padding: 0;
  flex-direction: row;
  align-items: stretch;
  gap: 0;
  background-color: rgba(9,9,9,0.96);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  background-image: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12));
  background-size: 84% 1px;
  background-position: 8% calc(100% - 24px);
  background-repeat: no-repeat;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px;
  box-shadow: 0 18px 45px rgba(0,0,0,0.48);
  animation: ferrari-model-pop 170ms ease-out;
}
@keyframes ferrari-model-pop {
  from { opacity: 0; transform: translateY(4px) scale(0.99); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.wq12jW_menu[data-ferrari-effort]::before {
  content: "MODEL PERFORMANCE";
  position: absolute;
  top: 16px;
  left: 18px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2.2px;
  color: rgba(255,255,255,0.38);
  pointer-events: none;
}
.wq12jW_menu[data-ferrari-effort]::after {
  content: "";
  position: absolute;
  bottom: 22px;
  left: var(--ferrari-runner-x, 50%);
  width: 44px;
  height: 4px;
  border-radius: 2px;
  transform: translateX(-100%) scaleX(var(--ferrari-scale, 1));
  transform-origin: right center;
  background: linear-gradient(90deg, transparent 0%, transparent 58%, rgba(225,6,0,0.18) 72%, rgba(225,6,0,0.95) 88%, rgba(255,255,255,0.85) 100%);
  box-shadow: 0 0 8px rgba(225,6,0,0.22);
  pointer-events: none;
  transition: none;
}
.wq12jW_menu[data-ferrari-effort][data-ferrari-dir='left']::after {
  transform: translateX(0) scaleX(var(--ferrari-scale, 1));
  transform-origin: left center;
  background: linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(225,6,0,0.95) 12%, rgba(225,6,0,0.18) 28%, transparent 42%, transparent 100%);
}
.wq12jW_menu[data-ferrari-effort][data-ferrari-ready]::after {
  transition: left var(--ferrari-dur, 280ms) cubic-bezier(0.22, 1, 0.36, 1), transform 120ms ease-out, box-shadow 120ms ease-out;
}
.wq12jW_menu[data-ferrari-effort].ferrari-running::after {
  background: linear-gradient(90deg, transparent 0%, rgba(225,6,0,0.10) 22%, rgba(225,6,0,0.30) 52%, rgba(225,6,0,0.95) 82%, rgba(255,255,255,0.85) 100%);
  box-shadow: 0 0 11px rgba(225,6,0,0.30);
}
.wq12jW_menu[data-ferrari-effort].ferrari-running[data-ferrari-dir='left']::after {
  background: linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(225,6,0,0.95) 18%, rgba(225,6,0,0.30) 48%, rgba(225,6,0,0.10) 78%, transparent 100%);
}
.wq12jW_menu[data-ferrari-effort].ferrari-unlock { --ferrari-scale: 0.72; }
.wq12jW_menu[data-ferrari-effort].ferrari-running { --ferrari-scale: 1.55; }
.wq12jW_menu[data-ferrari-effort] .wq12jW_error,
.wq12jW_menu[data-ferrari-effort] .wq12jW_empty {
  display: none;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_option {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  height: auto;
  padding: 0 0 38px;
  gap: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  background: transparent;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_option:focus-visible {
  background: rgba(255,255,255,0.03);
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_optionCopy {
  flex: none;
  align-items: center;
  justify-content: center;
  min-width: 0;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_modelName {
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.42);
  transition: color 150ms ease;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_option[aria-checked='true'] .wq12jW_modelName {
  color: rgba(255,255,255,0.95);
  font-weight: 600;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_option[data-ferrari-preview] .wq12jW_modelName {
  color: rgba(255,255,255,0.95);
  font-weight: 600;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_description {
  display: none;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_check {
  display: none;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_option::after {
  content: "";
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transform: translateX(-50%);
  background: #121212;
  border: 1px solid rgba(255,255,255,0.30);
  pointer-events: none;
  transition: width 140ms ease, height 140ms ease, border-color 140ms ease, background 140ms ease, box-shadow 140ms ease;
}
.wq12jW_menu[data-ferrari-effort] .wq12jW_option[aria-checked='true']::after,
.wq12jW_menu[data-ferrari-effort] .wq12jW_option[data-ferrari-preview]::after {
  width: 8px;
  height: 8px;
  border-color: rgba(225,6,0,0.90);
  background: rgba(225,6,0,0.75);
  box-shadow: 0 0 8px rgba(225,6,0,0.20);
}
.wq12jW_menu[data-ferrari-effort].ferrari-locking .wq12jW_option[data-ferrari-preview]::after {
  animation: ferrari-model-node-lock 130ms ease-out;
}
@keyframes ferrari-model-node-lock {
  0% { transform: translateX(-50%) scale(1); }
  55% { transform: translateX(-50%) scale(1.14); }
  100% { transform: translateX(-50%) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .wq12jW_menu[data-ferrari-effort] { animation: none; }
  .wq12jW_menu[data-ferrari-effort][data-ferrari-ready]::after { transition: left 130ms ease-out; }
  .wq12jW_menu[data-ferrari-effort].ferrari-locking .wq12jW_option[data-ferrari-preview]::after { animation: none; }
  .wq12jW_menu[data-ferrari-effort].ferrari-running { --ferrari-scale: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .BynINW_centerCol::before { animation: none; opacity: 0.26; }
  .BynINW_centerCol::after { animation: none; opacity: 0; }
  .Dc7zOa_root::before { animation: none; transition: none; opacity: 0.30; }
  .Dc7zOa_root::after { animation: none; transition: none; opacity: 0.35; }
  .BynINW_centerCol[data-ferrari-state='igniting'] .Dc7zOa_root::after { animation: none; opacity: 0.7; }
  .BynINW_centerCol[data-ferrari-state='igniting'] .Dc7zOa_root::before { animation: none; opacity: 0.5; }
  .BynINW_centerCol[data-ferrari-state='generating'] .Dc7zOa_root::after { animation: none; opacity: 0.6; }
  .BynINW_centerCol[data-ferrari-state='generating'] .Dc7zOa_root::before { animation: none; opacity: 0.5; }
  .BynINW_centerCol[data-ferrari-state='complete'] .Dc7zOa_root::after { animation: none; opacity: 0.45; }
  .BynINW_centerCol[data-ferrari-state='complete'] .Dc7zOa_root::before { animation: none; opacity: 0.3; }
  .BynINW_centerCol[data-ferrari-state='composer-ignition'] .RlGAzG_card { animation: ferrari-reduced-border 150ms ease-out; }
  .BynINW_centerCol[data-ferrari-state='composer-ignition'] .RlGAzG_card::before,
  .BynINW_centerCol[data-ferrari-state='composer-ignition'] .RlGAzG_card::after { animation: none; opacity: 0; }
  .BynINW_centerCol[data-ferrari-state='igniting'] .RlGAzG_card::after,
  .BynINW_centerCol[data-ferrari-state='generating'] .RlGAzG_card::after { animation: none; opacity: 0; }
  .BynINW_centerCol[data-ferrari-state='complete'] .RlGAzG_card::after { animation: none; opacity: 0; }
}
@keyframes ferrari-reduced-border {
  from { border-color: rgba(225,6,0,0.72); }
  to { border-color: rgba(225,6,0,0.38); }
}

@media (max-height: 850px) {
  ._2H3hWW_root::after { height: 72px; }
}
@media (max-height: 700px) {
  ._2H3hWW_root::after { display: none; }
  .ferrari-wt { display: none; }
}

@media (min-width: 1700px) {
  :root { --ferrari-chat-width: clamp(640px, 52vw, 820px); }
}
@media (max-width: 1200px) {
  :root { --ferrari-chat-width: min(720px, calc(100vw - 200px)); }
}
@media (max-width: 900px) {
  :root { --ferrari-chat-width: calc(100vw - 64px); }
  .RlGAzG_root { padding-bottom: 20px; }
  .BynINW_centerCol { background-image: linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.40) 100%), linear-gradient(90deg, rgba(5,5,5,0.80) 0%, rgba(5,5,5,0.70) 100%), linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url('/ferrari-background.png'); }
}
@media (max-width: 600px) {
  :root { --ferrari-chat-width: calc(100vw - 32px); }
  .RlGAzG_root { padding-left: 12px; padding-right: 12px; padding-bottom: 12px; }
  .BynINW_centerCol { background-image: linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.40) 100%), linear-gradient(90deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.62) 100%), linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url('/ferrari-background.png'); }
}
`

return {
  inject: ['timer'],
  apply(ctx) {
    // Self-healing idempotence. A live style tag means the theme is already
    // mounted (the packaged bundle and the host-injected script can both exist).
    // If that tag was removed — dispose, HMR reload, or a page reset — the next
    // apply recreates it instead of silently doing nothing.
    if (typeof document !== 'undefined'
      && document.querySelector('style[data-plugin="dsh-ferrari-dark-theme"]') !== null) return
    const theme = ctx.get('theme')
    if (theme !== undefined) {
      ctx.effect(() => theme.overrideTokens('ferrari-dark-theme', TOKENS))
    }
    // Flip the host application into its own dark palette. DSH keeps the light
    // and dark token sets in one stylesheet and switches on
    // body[data-ds-dark-theme]; without that attribute the app draws light-mode
    // (near-black) text, which is invisible once this theme paints dark surfaces.
    ctx.effect(() => {
      try {
        const html = document.documentElement
        if (html !== null) {
          html.setAttribute('data-ds-dark-theme', '')
          html.style.colorScheme = 'dark'
        }
        if (document.body !== null && document.body !== undefined) {
          document.body.setAttribute('data-ds-dark-theme', '')
        }
      } catch (error) { /* cosmetic only */ }
      return () => {}
    })
    ctx.effect(() => styles.insert(CSS))

    ctx.effect(() => {
      const root = document.querySelector('.BynINW_centerCol')
      if (root === null) return
      const frame = root.closest('.BynINW_frame')

      let prevBusy = false
      let runStart = 0
      let composerTimer = null
      let ignitionTimer = null
      let completeTimer = null

      const eachSidebar = function (fn) {
        const sb = document.querySelectorAll('._2H3hWW_root')
        for (let i = 0; i < sb.length; i++) fn(sb[i])
      }

      const setState = function (s) {
        root.setAttribute('data-ferrari-state', s)
        if (frame !== null) frame.setAttribute('data-ferrari-state', s)
        eachSidebar(function (el) { el.setAttribute('data-ferrari-state', s) })
      }

      const setFlow = function (v) {
        eachSidebar(function (el) { el.setAttribute('data-ferrari-flow', v) })
      }

      const readPhase = function () {
        const tas = document.querySelectorAll('textarea[data-phase]')
        for (let i = 0; i < tas.length; i++) {
          const p = tas[i].getAttribute('data-phase')
          if (p) return p
        }
        return 'inert'
      }

      const readView = function () {
        const convRoot = document.querySelector('.Dc7zOa_root[data-phase]')
        if (convRoot !== null) {
          return convRoot.getAttribute('data-phase') === 'hero' ? 'empty' : 'conversation'
        }
        return document.querySelector('.Hqq-bq_root') !== null ? 'empty' : 'conversation'
      }

      const busyNow = function () {
        const p = readPhase()
        if (p === 'submitting' || p === 'adjudicating') return true
        return document.querySelector('[data-streaming], [data-state="running"]') !== null
      }

      const streamingNow = function () {
        return document.querySelector('[data-streaming]') !== null
      }

      const tick = function () {
        const busy = busyNow()
        root.setAttribute('data-ferrari-phase', readPhase())
        root.setAttribute('data-ferrari-view', readView())
        setFlow(streamingNow() ? 'stream' : 'compute')

        if (!prevBusy && busy) {
          runStart = Date.now()
          eachSidebar(function (el) { el.classList.remove('ferrari-wt-abrupt') })
          setState('composer-ignition')
          if (composerTimer) { composerTimer(); composerTimer = null }
          if (ignitionTimer) { ignitionTimer(); ignitionTimer = null }
          composerTimer = ctx.timeout(function () {
            composerTimer = null
            setState('igniting')
            ignitionTimer = ctx.timeout(function () {
              ignitionTimer = null
              setState('generating')
            }, 850)
          }, 880)
        } else if (prevBusy && !busy) {
          if (Date.now() - runStart < 2500) {
            eachSidebar(function (el) { el.classList.add('ferrari-wt-abrupt') })
          }
          setState('complete')
          if (composerTimer) { composerTimer(); composerTimer = null }
          if (ignitionTimer) { ignitionTimer(); ignitionTimer = null }
          if (completeTimer) { completeTimer(); completeTimer = null }
          completeTimer = ctx.timeout(function () {
            completeTimer = null
            setState('idle')
          }, 1200)
        }

        prevBusy = busy
      }

      const observer = new MutationObserver(tick)
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['data-phase', 'data-streaming', 'data-state']
      })

      tick()

      return function () {
        observer.disconnect()
        if (composerTimer) composerTimer()
        if (ignitionTimer) ignitionTimer()
        if (completeTimer) completeTimer()
        root.removeAttribute('data-ferrari-state')
        root.removeAttribute('data-ferrari-phase')
        root.removeAttribute('data-ferrari-view')
        if (frame !== null) frame.removeAttribute('data-ferrari-state')
        eachSidebar(function (el) {
          el.removeAttribute('data-ferrari-state')
          el.removeAttribute('data-ferrari-flow')
          el.classList.remove('ferrari-wt-abrupt')
        })
      }
    })

    ctx.effect(() => {
      const findEffortMenu = function () {
        const menus = document.querySelectorAll('.wq12jW_menu')
        for (let i = 0; i < menus.length; i++) {
          const m = menus[i]
          if (m.querySelector('.wq12jW_option') !== null && m.querySelector('.wq12jW_groups') === null && m.querySelector('.wq12jW_cell') === null) {
            return m
          }
        }
        return null
      }

      const currentLevel = function (m) {
        const opts = m.querySelectorAll('.wq12jW_option')
        for (let i = 0; i < opts.length; i++) {
          if (opts[i].getAttribute('aria-checked') === 'true') return i
        }
        return 0
      }

      const setRunnerX = function (m, level) {
        const count = m.querySelectorAll('.wq12jW_option').length
        if (count <= 0) return
        const pos = (level + 0.5) / count * 100
        m.style.setProperty('--ferrari-runner-x', pos + '%')
      }

      let animating = false
      let bypassClick = false

      const triggerOriginal = function (opt) {
        bypassClick = true
        try { opt.click() } finally { bypassClick = false }
      }

      const animateTo = function (m, opts, fromIdx, toIdx) {
        animating = true
        const steps = Math.abs(toIdx - fromIdx)
        const duration = steps >= 2 ? 330 : 280
        const triggerDelay = steps >= 2 ? 260 : 220
        const dir = toIdx > fromIdx ? 'right' : 'left'

        m.style.setProperty('--ferrari-dur', duration + 'ms')
        m.setAttribute('data-ferrari-dir', dir)

        for (let i = 0; i < opts.length; i++) {
          if (i === toIdx) opts[i].setAttribute('data-ferrari-preview', '')
          else opts[i].removeAttribute('data-ferrari-preview')
        }

        m.classList.add('ferrari-unlock')
        ctx.timeout(function () { if (m.classList) m.classList.remove('ferrari-unlock') }, 60)
        ctx.timeout(function () { if (m.classList) m.classList.add('ferrari-running') }, 50)
        setRunnerX(m, toIdx)

        ctx.timeout(function () {
          if (!document.body.contains(m)) { animating = false; return }
          triggerOriginal(opts[toIdx])
        }, triggerDelay)

        ctx.timeout(function () {
          if (m.classList) {
            m.classList.remove('ferrari-running')
            m.classList.add('ferrari-locking')
          }
          ctx.timeout(function () { if (m.classList) m.classList.remove('ferrari-locking') }, 120)
          m.removeAttribute('data-ferrari-dir')
          for (let i = 0; i < opts.length; i++) opts[i].removeAttribute('data-ferrari-preview')
          animating = false
        }, duration)

        ctx.timeout(function () {
          const m2 = findEffortMenu()
          if (m2 === null || !document.body.contains(m2)) return
          if (m2.getAttribute('aria-busy') === 'true') return
          animating = false
          for (let i = 0; i < opts.length; i++) opts[i].removeAttribute('data-ferrari-preview')
          m2.removeAttribute('data-ferrari-dir')
          setRunnerX(m2, currentLevel(m2))
        }, 900)
      }

      const sync = function () {
        const m = findEffortMenu()
        if (m === null) return
        const fresh = !m.hasAttribute('data-ferrari-ready')
        m.setAttribute('data-ferrari-effort', '')
        if (fresh) animating = false
        if (!animating) setRunnerX(m, currentLevel(m))
        if (fresh) m.setAttribute('data-ferrari-ready', '')
      }

      const onCaptureClick = function (e) {
        if (bypassClick) return
        const m = findEffortMenu()
        if (m === null) return
        const t = e.target
        if (t === null || typeof t.closest !== 'function') return
        const opt = t.closest('.wq12jW_option')
        if (opt === null || !m.contains(opt)) return
        const opts = m.querySelectorAll('.wq12jW_option')
        let idx = -1
        for (let i = 0; i < opts.length; i++) { if (opts[i] === opt) { idx = i; break } }
        if (idx < 0) return
        const cur = currentLevel(m)
        if (idx === cur) return
        e.preventDefault()
        e.stopPropagation()
        if (animating) return
        animateTo(m, opts, cur, idx)
      }

      const onKey = function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
        const m = findEffortMenu()
        if (m === null) return
        const rootEl = m.closest('.wq12jW_root')
        if (rootEl === null || !rootEl.contains(e.target)) return
        const opts = m.querySelectorAll('.wq12jW_option')
        if (opts.length < 2) return
        let idx = -1
        for (let i = 0; i < opts.length; i++) { if (opts[i] === document.activeElement) { idx = i; break } }
        if (idx < 0) idx = currentLevel(m)
        const dir = e.key === 'ArrowRight' ? 1 : -1
        const next = opts[idx + dir]
        if (next === undefined) return
        e.preventDefault()
        e.stopPropagation()
        next.focus()
        if (!animating) animateTo(m, opts, currentLevel(m), idx + dir)
      }

      const observer = new MutationObserver(sync)
      observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-checked', 'class', 'aria-busy'] })
      document.addEventListener('click', onCaptureClick, true)
      document.addEventListener('keydown', onKey, true)
      sync()

      return function () {
        observer.disconnect()
        document.removeEventListener('click', onCaptureClick, true)
        document.removeEventListener('keydown', onKey, true)
      }
    })

    ctx.effect(() => {
      const NS = 'http://www.w3.org/2000/svg'

      const BACK_HTML = `
        <g class="ft-g" style="--ft-delay:80ms">
          <path class="ft-line" style="--ft-dur:1.8s;--ft-phase:-0.4s" d="M-8,26 C40,22 70,17 108,17 C150,17 182,23 248,30"/>
          <path class="ft-line" style="--ft-dur:2.1s;--ft-phase:-1.1s" d="M-8,37 C44,33 78,28 114,29 C154,30 188,37 248,43"/>
        </g>
        <g class="ft-g" style="--ft-delay:140ms">
          <path class="ft-line" style="--ft-dur:1.6s;--ft-phase:-0.7s" d="M-8,50 C50,46 92,44 132,46 C172,48 202,54 248,58"/>
          <path class="ft-line ft-line-red" style="--ft-dur:2.4s;--ft-phase:-1.6s" d="M-8,65 C56,61 110,59 158,61 C198,63 224,67 248,70"/>
        </g>
        <path class="ft-ground" style="--ft-dur:1.4s;--ft-phase:-0.5s" d="M-8,84 L248,84"/>
      `

      const FRONT_HTML = `
        <defs>
          <radialGradient id="ft-press" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(225,6,0,0.16)"/>
            <stop offset="55%" stop-color="rgba(225,6,0,0.05)"/>
            <stop offset="100%" stop-color="rgba(225,6,0,0)"/>
          </radialGradient>
        </defs>
        <g class="ft-g" style="--ft-delay:140ms">
          <path class="ft-line" style="--ft-dur:1.9s;--ft-phase:-0.9s" d="M-8,10 C60,7 140,6 248,9"/>
        </g>
        <g class="ft-g" style="--ft-delay:200ms">
          <path class="ft-line" style="--ft-dur:2.2s;--ft-phase:-1.4s" d="M-8,92 C70,90 150,90 248,92"/>
        </g>
        <circle class="ft-pressure" cx="14" cy="52" r="26" fill="url(#ft-press)"/>
        <path class="ft-wake" style="--ft-dur:1.7s;--ft-phase:-0.4s" d="M228,44 C244,42 258,44 276,46"/>
        <path class="ft-wake" style="--ft-dur:2.1s;--ft-phase:-1.0s" d="M230,54 C246,52 260,55 278,56"/>
        <path class="ft-wake ft-wake-red" style="--ft-dur:1.9s;--ft-phase:-1.3s" d="M228,64 C244,62 258,65 276,66"/>
        <circle class="ft-particle" style="--ft-dur:2.0s;--ft-phase:0s" cx="0" cy="20" r="1.1"/>
        <circle class="ft-particle" style="--ft-dur:2.4s;--ft-phase:-0.7s" cx="0" cy="38" r="1"/>
        <circle class="ft-particle" style="--ft-dur:2.2s;--ft-phase:-1.5s" cx="0" cy="62" r="1.1"/>
        <circle class="ft-particle" style="--ft-dur:2.6s;--ft-phase:-2.0s" cx="0" cy="78" r="0.9"/>
      `

      const make = function (cls, inner) {
        const svg = document.createElementNS(NS, 'svg')
        svg.setAttribute('class', 'ferrari-wt ' + cls)
        svg.setAttribute('viewBox', '0 0 240 88')
        svg.setAttribute('preserveAspectRatio', 'none')
        svg.setAttribute('aria-hidden', 'true')
        svg.setAttribute('focusable', 'false')
        svg.innerHTML = inner
        return svg
      }

      const ensure = function () {
        const hosts = document.querySelectorAll('._2H3hWW_root')
        for (let i = 0; i < hosts.length; i++) {
          const host = hosts[i]
          const hasBack = host.querySelector('.ferrari-wt-back') !== null
          const hasFront = host.querySelector('.ferrari-wt-front') !== null
          if (hasBack && hasFront) continue
          if (!hasBack) host.appendChild(make('ferrari-wt-back', BACK_HTML))
          if (!hasFront) host.appendChild(make('ferrari-wt-front', FRONT_HTML))
        }
      }

      ensure()
      const observer = new MutationObserver(ensure)
      observer.observe(document.body, { subtree: true, childList: true })
      const timer = ctx.interval(function () { ensure() }, 800)

      return function () {
        observer.disconnect()
        if (timer) timer()
        const layers = document.querySelectorAll('.ferrari-wt')
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].parentNode !== null) layers[i].parentNode.removeChild(layers[i])
        }
      }
    })
  }
}
