// Ferrari Dark Theme — CLIENT half (pkg-26 / run-27 snapshot)
// This file is the exact `code.client` function body used by cordis_define.
// Usage: read this file and pass its content as code.client when recreating
// the plugin after a DSH restart.
//
// Features in this snapshot (v27):
//  - Dark Ferrari tokens + full CSS theme (background, sidebar, composer,
//    border runner, ceiling ignition, ambient, sweep, empty-state background)
//  - Send → ignition → generating → complete state machine (DOM + MutationObserver)
//  - data-ferrari-view empty/conversation background modes
//  - Model Performance Selector (horizontal OFF/HIGH/MAX slider with runner
//    animation; auto-closes after switch)
//  - Sidebar car.png Wind Tunnel airflow layers (SVG, z-index 1 & 3)
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
}

body, body[data-ds-dark-theme] {
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

.pI_x6G_frame { background: #060606; }
.pI_x6G_sidebarCol { border-right: 1px solid rgba(255,255,255,0.055); }
.pI_x6G_centerCol {
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

.pI_x6G_centerCol[data-ferrari-view='empty'] {
  background-color: #050505;
  background-image:
    linear-gradient(90deg, rgba(5,5,5,0.70) 0%, rgba(5,5,5,0.44) 26%, rgba(5,5,5,0.20) 44%, rgba(5,5,5,0.06) 56%, transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,0.14) 0%, transparent 24%, transparent 76%, rgba(0,0,0,0.16) 100%),
    url('/ferrari-background.png');
  background-size: 100% 100%, 100% 100%, contain;
  background-position: 0 0, 0 0, right 28px center;
  background-repeat: no-repeat;
}

.pI_x6G_centerCol::before {
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
.pI_x6G_centerCol[data-ferrari-state='igniting']::before { animation: ferrari-ambient-wake 0.6s ease-out 0.3s forwards; }
@keyframes ferrari-ambient-wake { 0% { opacity: 0.24; } 50% { opacity: 0.38; } 100% { opacity: 0.30; } }
.pI_x6G_centerCol[data-ferrari-state='generating']::before { animation: ferrari-ambient-active 9s ease-in-out infinite alternate; }
@keyframes ferrari-ambient-active { from { opacity: 0.27; } to { opacity: 0.33; } }
.pI_x6G_centerCol[data-ferrari-state='complete']::before { animation: ferrari-ambient-off 1.2s ease-out forwards; }
@keyframes ferrari-ambient-off { from { opacity: 0.30; } to { opacity: 0.24; } }

.pI_x6G_centerCol::after {
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
.pI_x6G_centerCol[data-ferrari-view='empty']::after { animation-name: ferrari-sweep-empty; }
@keyframes ferrari-sweep-empty {
  0% { opacity: 0; transform: translateX(-25vw) rotate(-16deg); }
  8% { opacity: 0; transform: translateX(-25vw) rotate(-16deg); }
  18% { opacity: 0.24; }
  34% { opacity: 0.24; transform: translateX(105vw) rotate(-16deg); }
  44% { opacity: 0; transform: translateX(105vw) rotate(-16deg); }
  100% { opacity: 0; transform: translateX(105vw) rotate(-16deg); }
}

.wSkVaW_root { background: transparent; }
.wSkVaW_root::before {
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
.wSkVaW_root::after {
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

.pI_x6G_centerCol[data-ferrari-state='igniting'] .wSkVaW_root::after {
  animation: ferrari-ceiling-strike 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes ferrari-ceiling-strike {
  0% { opacity: 0; transform: scaleX(0); }
  18% { opacity: 0.85; }
  45% { transform: scaleX(1); opacity: 0.7; }
  100% { opacity: 0.4; transform: scaleX(1); }
}
.pI_x6G_centerCol[data-ferrari-state='igniting'] .wSkVaW_root::before {
  animation: ferrari-glow-wake 0.7s ease-out 0.1s both;
}
@keyframes ferrari-glow-wake { 0% { opacity: 0.16; } 45% { opacity: 0.62; } 100% { opacity: 0.5; } }

.pI_x6G_centerCol[data-ferrari-state='generating'] .wSkVaW_root::after {
  animation: ferrari-core-pulse 2.4s ease-in-out infinite alternate;
}
@keyframes ferrari-core-pulse { from { opacity: 0.45; transform: scaleX(1); } to { opacity: 0.95; transform: scaleX(1); } }
.pI_x6G_centerCol[data-ferrari-state='generating'] .wSkVaW_root::before {
  animation: ferrari-glow-pulse 2.8s ease-in-out infinite alternate;
}
@keyframes ferrari-glow-pulse { from { opacity: 0.3; } to { opacity: 0.72; } }

.pI_x6G_centerCol[data-ferrari-state='complete'] .wSkVaW_root::after {
  animation: ferrari-core-off 1.1s ease-out forwards;
}
@keyframes ferrari-core-off { 0% { opacity: 0.7; transform: scaleX(1); } 30% { opacity: 0.85; } 100% { opacity: 0; transform: scaleX(0); } }
.pI_x6G_centerCol[data-ferrari-state='complete'] .wSkVaW_root::before {
  animation: ferrari-glow-off 1.1s ease-out forwards;
}
@keyframes ferrari-glow-off { 0% { opacity: 0.5; } 35% { opacity: 0.6; } 100% { opacity: 0.16; } }

.pI_x6G_centerCol:has([data-streaming]) .wSkVaW_root::after { animation: ferrari-core-pulse 2.4s ease-in-out infinite alternate; }
.pI_x6G_centerCol:has([data-state='running']) .wSkVaW_root::before { animation: ferrari-glow-pulse 2.8s ease-in-out infinite alternate; }

.Md3f7G_scroll { padding: 80px 48px 0; }
.Md3f7G_column { width: var(--ferrari-chat-width); max-width: 820px; min-width: 0; margin: 0 auto; gap: 18px; }
.Md3f7G_flowItem { animation: ferrari-reveal 0.2s var(--ds-ease-in-out) both; }
@keyframes ferrari-reveal { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

.hHd-Xa_root { background: #080808; position: relative; color: #f5f5f5; --ferrari-car-bottom: 128px; }
.hHd-Xa_brand, .hHd-Xa_brand svg { color: #f5f5f5; }
.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_logoRow { height: 112px; position: relative; }
.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_brand svg { transform: scale(1.15); transform-origin: left center; }
.hHd-Xa_root:not(.hHd-Xa_collapsed) .hHd-Xa_logoRow::after {
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
.hHd-Xa_iconButton { width: 32px; height: 32px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.16); color: rgba(255,255,255,0.60); opacity: 0.70; transition: border-color 0.16s ease, color 0.16s ease, background 0.16s ease, opacity 0.16s ease; }
.hHd-Xa_iconButton:hover { background: rgba(255,255,255,0.04); border-color: #E10600; color: #ffffff; opacity: 1; }
.hHd-Xa_newSession {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 10px;
  height: 42px;
  margin: 0 8px 8px;
  position: relative;
  color: rgba(255,255,255,0.92);
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
}
.hHd-Xa_newSession::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: 0; height: 1px; background: rgba(225,6,0,0.55); transition: background 0.16s ease; }
.hHd-Xa_newSession:hover { background: rgba(255,255,255,0.035); border-color: rgba(255,255,255,0.40); }
.hHd-Xa_newSession:hover::after { background: #E10600; }
.hHd-Xa_newSession:active { transform: scale(0.98); }

.qDHVXG_sectionLabel { color: rgba(255,255,255,0.46); font-size: 12px; font-weight: 400; }
.YDXeBa_sessionRow { border-radius: 4px; }
.YDXeBa_sessionRow .YDXeBa_title { color: rgba(255,255,255,0.72); }
.YDXeBa_sessionRow:hover { background: rgba(255,255,255,0.035); }
.YDXeBa_sessionRow.YDXeBa_selected { position: relative; background: linear-gradient(90deg, rgba(225,6,0,0.16) 0%, rgba(225,6,0,0.04) 100%); }
.YDXeBa_sessionRow.YDXeBa_selected::before { content: ""; position: absolute; left: 0; top: 50%; width: 2px; height: 64%; transform: translateY(-50%); background: #E10600; border-radius: 1px; }
.YDXeBa_sessionRow.YDXeBa_selected .YDXeBa_title { color: rgba(255,255,255,0.96); }
.qDHVXG_iconButton, .YDXeBa_iconButton { opacity: 0.55; transition: opacity 0.16s ease, color 0.16s ease; }
.qDHVXG_iconButton:hover, .YDXeBa_iconButton:hover { opacity: 0.95; }

.hHd-Xa_footArea { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px; }
.Nqubda_badge, .Nqubda_badgeLabel { color: #f5f5f5; }
.Nqubda_badgeCount { color: rgba(255,255,255,0.55); }
.VOzbGW_trigger, .VOzbGW_triggerLabel { color: #f5f5f5; }

.hHd-Xa_root::after {
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
.hHd-Xa_collapsed .hHd-Xa_root::after { display: none; }

/* Ferrari Wind Tunnel (sidebar car) */
.ferrari-wt {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 112px;
  height: 120px;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 400ms ease-out;
  overflow: visible;
}
.ferrari-wt-back { z-index: 1; }
.ferrari-wt-front { z-index: 3; }
.pI_x6G_frame[data-ferrari-state='igniting'] .ferrari-wt,
.pI_x6G_frame[data-ferrari-state='generating'] .ferrari-wt {
  opacity: 1;
}
.pI_x6G_frame[data-ferrari-state='complete'] .ferrari-wt {
  opacity: 0;
  transition-duration: 650ms;
}
.hHd-Xa_root.hHd-Xa_collapsed .ferrari-wt { display: none; }

.ferrari-wt .ft-line {
  fill: none;
  stroke: rgba(220,220,220,0.20);
  stroke-width: 0.8;
  stroke-linecap: round;
  stroke-dasharray: 26 18;
  animation: ft-dash 2s linear infinite;
}
.ferrari-wt .ft-line-red {
  stroke: rgba(225,6,0,0.26);
}
.ferrari-wt .ft-ground {
  fill: none;
  stroke: rgba(225,6,0,0.24);
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: 14 10;
  animation: ft-dash 1.4s linear infinite;
}
.ferrari-wt .ft-wake {
  fill: none;
  stroke: rgba(255,255,255,0.12);
  stroke-width: 0.7;
  stroke-linecap: round;
  stroke-dasharray: 8 10;
  animation: ft-dash 1.6s linear infinite, ft-wobble 2.1s ease-in-out infinite;
}
.ferrari-wt .ft-particle {
  fill: rgba(255,255,255,0.85);
  animation: ft-fly 2s linear infinite;
}
.ferrari-wt .ft-pressure {
  animation: ft-pressure 3s ease-in-out infinite;
}
@keyframes ft-dash { to { stroke-dashoffset: -44; } }
@keyframes ft-wobble {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
@keyframes ft-fly {
  0% { transform: translateX(-8px); opacity: 0; }
  10% { opacity: 0.2; }
  85% { opacity: 0.14; }
  100% { transform: translateX(236px); opacity: 0; }
}
@keyframes ft-pressure {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.15; }
}

.wSkVaW_header { padding: 20px 32px 0 28px; }
.wSkVaW_crumbCurrent { color: #f3f3f3; font-size: 15px; font-weight: 600; }

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

.QWLzlG_title { color: rgba(255,255,255,0.62); font-size: 13px; font-weight: 400; }
.QWLzlG_summary { color: rgba(255,255,255,0.40); font-size: 12px; line-height: 18px; }
.QWLzlG_leading { color: #E10600; }
.QWLzlG_chevron { color: rgba(255,255,255,0.40); transition: color 0.16s ease; }
.QWLzlG_row:hover .QWLzlG_title { color: rgba(255,255,255,0.92); }
.QWLzlG_thinkBody { color: rgba(255,255,255,0.40); font-size: 12.5px; line-height: 1.6; }

.md-code-block { background: rgba(8,8,8,0.86); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; margin: 0.8em 0; }
.md-code-block > div:first-child { background: #050505; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; font-size: 12px; color: rgba(255,255,255,0.45); }
.md-code-block > div:first-child button { background: transparent; border: none; color: rgba(255,255,255,0.50); cursor: pointer; font-size: 12px; padding: 2px 4px; transition: color 0.16s ease; }
.md-code-block > div:first-child button:hover { color: #E10600; }
.md-code-block pre, .md-code-block .shiki { margin: 0; padding: 14px 16px; overflow-x: auto; background: transparent; }

[data-conversation-scroll] table { border-collapse: collapse; width: 100%; font-size: 14px; margin: 1em 0; background: transparent; }
[data-conversation-scroll] th { background: rgba(255,255,255,0.055); color: rgba(255,255,255,0.78); font-weight: 500; text-align: left; border: 1px solid rgba(255,255,255,0.09); padding: 8px 12px; }
[data-conversation-scroll] td { color: rgba(255,255,255,0.78); border: 1px solid rgba(255,255,255,0.09); padding: 8px 12px; }
[data-conversation-scroll] tbody tr:hover { background: rgba(225,6,0,0.035); }

.gdEzaW_bubble { border-radius: 12px; color: rgba(255,255,255,0.90); }
.p-xYUq_actions { gap: 16px; margin-top: 14px; }
.p-xYUq_action { background: transparent; border-radius: 0; color: rgba(255,255,255,0.40); width: 22px; height: 22px; padding: 3px; transition: color 0.16s ease, background 0.16s ease; }
.p-xYUq_action:hover { background: rgba(255,255,255,0.025); color: rgba(255,255,255,0.90); }
.p-xYUq_action[data-active] { color: #E10600; }

.wSkVaW_composerSeat { position: sticky; bottom: 0; z-index: 3; margin-top: 8px; background: linear-gradient(180deg, rgba(6,6,6,0) 0%, rgba(6,6,6,0.55) 22px, rgba(6,6,6,0.92) 48px, rgba(6,6,6,0.97) 100%); }
.uV2eYG_root { align-items: center; padding-left: 48px; padding-right: 48px; padding-bottom: 28px; }
.uV2eYG_card { width: var(--ferrari-chat-width); max-width: 820px; margin: 0 auto; background: rgba(12,12,12,0.82); backdrop-filter: blur(18px) saturate(110%); -webkit-backdrop-filter: blur(18px) saturate(110%); border: 1px solid rgba(225,6,0,0.38); border-radius: 18px; min-height: 110px; box-shadow: 0 18px 50px rgba(0,0,0,0.40), 0 0 20px rgba(225,6,0,0.04); transition: border-color 0.2s ease; }
.uV2eYG_card:focus-within { border-color: rgba(225,6,0,0.72); }

.uV2eYG_card::before {
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
.uV2eYG_card::after {
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

.pI_x6G_centerCol[data-ferrari-state='composer-ignition'] .uV2eYG_card {
  animation: ferrari-composer-press 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
@keyframes ferrari-composer-press {
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(0.994) translateY(1px); }
  100% { transform: scale(1) translateY(0); }
}
.pI_x6G_centerCol[data-ferrari-state='composer-ignition'] .uV2eYG_card::after {
  animation: ferrari-border-runner 720ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;
}
@keyframes ferrari-border-runner {
  0% { --ferrari-border-angle: 0deg; opacity: 0; }
  12% { opacity: 1; }
  100% { --ferrari-border-angle: 360deg; opacity: 1; }
}
.pI_x6G_centerCol[data-ferrari-state='igniting'] .uV2eYG_card::after,
.pI_x6G_centerCol[data-ferrari-state='generating'] .uV2eYG_card::after {
  animation: ferrari-border-runner-loop 2.4s linear infinite;
}
@keyframes ferrari-border-runner-loop {
  0% { --ferrari-border-angle: 0deg; opacity: 1; }
  100% { --ferrari-border-angle: 360deg; opacity: 1; }
}
.pI_x6G_centerCol[data-ferrari-state='complete'] .uV2eYG_card::after {
  animation: ferrari-border-runner-finish 0.9s ease-out forwards;
}
@keyframes ferrari-border-runner-finish {
  0% { --ferrari-border-angle: 0deg; opacity: 1; }
  100% { --ferrari-border-angle: 360deg; opacity: 0; }
}
.pI_x6G_centerCol[data-ferrari-state='composer-ignition'] .uV2eYG_card::before {
  animation: ferrari-transfer 560ms ease-out 320ms both;
}
@keyframes ferrari-transfer {
  0% { opacity: 0; transform: translateX(0) translateY(0) rotate(-16deg) scale(0.5); }
  12% { opacity: 0.95; }
  50% { opacity: 0.6; }
  100% { opacity: 0; transform: translateX(230px) translateY(-260px) rotate(-16deg) scale(1.1); }
}

.uV2eYG_input::placeholder { color: rgba(255,255,255,0.30); font-size: 15px; }
.uV2eYG_add { color: rgba(255,255,255,0.56); }
.uV2eYG_add:hover { color: #E10600; }
.uV2eYG_modes button, .uV2eYG_tools button:not(.uV2eYG_add) { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.09); border-radius: 8px; color: rgba(255,255,255,0.56); height: 29px; padding: 0 10px; font-size: 12px; transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease; }
.uV2eYG_modes button:hover, .uV2eYG_tools button:not(.uV2eYG_add):hover { background: rgba(255,255,255,0.05); border-color: rgba(225,6,0,0.40); color: rgba(255,255,255,0.94); }
.uV2eYG_modes button[data-active], .uV2eYG_modes button[aria-pressed='true'] { border-color: rgba(225,6,0,0.40); color: rgba(255,255,255,0.94); }
.uV2eYG_primary { background: #E10600; color: #ffffff; width: 40px; height: 40px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; transition: transform 0.18s ease-out, box-shadow 0.16s ease, background 0.16s ease; }
.uV2eYG_primary:hover:not(:disabled) { background: #ff1e1e; box-shadow: 0 0 14px rgba(225,6,0,0.22); }
.uV2eYG_primary:active:not(:disabled) { transform: scale(0.92); background: #F02A23; box-shadow: 0 0 14px rgba(225,6,0,0.22); }
.uV2eYG_primary:disabled { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.25); }

[role='menu'] { background: rgba(12,12,12,0.95); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.09); border-radius: 8px; box-shadow: 0 18px 45px rgba(0,0,0,0.45); overflow: hidden; }
[role='menuitem'] { background: transparent; border: none; color: rgba(255,255,255,0.78); min-height: 36px; transition: background 0.14s ease, color 0.14s ease; }
[role='menuitem']:hover, [role='menuitem']:focus { background: rgba(255,255,255,0.045); color: #ffffff; }
[role='separator'] { background: rgba(255,255,255,0.08); height: 1px; margin: 4px 0; }

/* Ferrari Model Performance Selector */
._7KE1Ra_menu[data-ferrari-effort] {
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
._7KE1Ra_menu[data-ferrari-effort]::before {
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
._7KE1Ra_menu[data-ferrari-effort]::after {
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
._7KE1Ra_menu[data-ferrari-effort][data-ferrari-dir='left']::after {
  transform: translateX(0) scaleX(var(--ferrari-scale, 1));
  transform-origin: left center;
  background: linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(225,6,0,0.95) 12%, rgba(225,6,0,0.18) 28%, transparent 42%, transparent 100%);
}
._7KE1Ra_menu[data-ferrari-effort][data-ferrari-ready]::after {
  transition: left var(--ferrari-dur, 280ms) cubic-bezier(0.22, 1, 0.36, 1), transform 120ms ease-out, box-shadow 120ms ease-out;
}
._7KE1Ra_menu[data-ferrari-effort].ferrari-running::after {
  background: linear-gradient(90deg, transparent 0%, rgba(225,6,0,0.10) 22%, rgba(225,6,0,0.30) 52%, rgba(225,6,0,0.95) 82%, rgba(255,255,255,0.85) 100%);
  box-shadow: 0 0 11px rgba(225,6,0,0.30);
}
._7KE1Ra_menu[data-ferrari-effort].ferrari-running[data-ferrari-dir='left']::after {
  background: linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(225,6,0,0.95) 18%, rgba(225,6,0,0.30) 48%, rgba(225,6,0,0.10) 78%, transparent 100%);
}
._7KE1Ra_menu[data-ferrari-effort].ferrari-unlock { --ferrari-scale: 0.72; }
._7KE1Ra_menu[data-ferrari-effort].ferrari-running { --ferrari-scale: 1.55; }
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_error,
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_empty {
  display: none;
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_option {
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
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_option:focus-visible {
  background: rgba(255,255,255,0.03);
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_optionCopy {
  flex: none;
  align-items: center;
  justify-content: center;
  min-width: 0;
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_modelName {
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.42);
  transition: color 150ms ease;
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_option[aria-checked='true'] ._7KE1Ra_modelName {
  color: rgba(255,255,255,0.95);
  font-weight: 600;
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_option[data-ferrari-preview] ._7KE1Ra_modelName {
  color: rgba(255,255,255,0.95);
  font-weight: 600;
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_description {
  display: none;
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_check {
  display: none;
}
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_option::after {
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
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_option[aria-checked='true']::after,
._7KE1Ra_menu[data-ferrari-effort] ._7KE1Ra_option[data-ferrari-preview]::after {
  width: 8px;
  height: 8px;
  border-color: rgba(225,6,0,0.90);
  background: rgba(225,6,0,0.75);
  box-shadow: 0 0 8px rgba(225,6,0,0.20);
}
._7KE1Ra_menu[data-ferrari-effort].ferrari-locking ._7KE1Ra_option[data-ferrari-preview]::after {
  animation: ferrari-model-node-lock 130ms ease-out;
}
@keyframes ferrari-model-node-lock {
  0% { transform: translateX(-50%) scale(1); }
  55% { transform: translateX(-50%) scale(1.14); }
  100% { transform: translateX(-50%) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  ._7KE1Ra_menu[data-ferrari-effort] { animation: none; }
  ._7KE1Ra_menu[data-ferrari-effort][data-ferrari-ready]::after { transition: left 130ms ease-out; }
  ._7KE1Ra_menu[data-ferrari-effort].ferrari-locking ._7KE1Ra_option[data-ferrari-preview]::after { animation: none; }
  ._7KE1Ra_menu[data-ferrari-effort].ferrari-running { --ferrari-scale: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .Md3f7G_flowItem { animation: none; }
  .pI_x6G_centerCol::before { animation: none; opacity: 0.26; }
  .pI_x6G_centerCol::after { animation: none; opacity: 0; }
  .wSkVaW_root::before { animation: none; transition: none; opacity: 0.30; }
  .wSkVaW_root::after { animation: none; transition: none; opacity: 0.35; }
  .pI_x6G_centerCol[data-ferrari-state='igniting'] .wSkVaW_root::after { animation: none; opacity: 0.7; }
  .pI_x6G_centerCol[data-ferrari-state='igniting'] .wSkVaW_root::before { animation: none; opacity: 0.5; }
  .pI_x6G_centerCol[data-ferrari-state='generating'] .wSkVaW_root::after { animation: none; opacity: 0.6; }
  .pI_x6G_centerCol[data-ferrari-state='generating'] .wSkVaW_root::before { animation: none; opacity: 0.5; }
  .pI_x6G_centerCol[data-ferrari-state='complete'] .wSkVaW_root::after { animation: none; opacity: 0.45; }
  .pI_x6G_centerCol[data-ferrari-state='complete'] .wSkVaW_root::before { animation: none; opacity: 0.3; }
  .pI_x6G_centerCol[data-ferrari-state='composer-ignition'] .uV2eYG_card { animation: ferrari-reduced-border 150ms ease-out; }
  .pI_x6G_centerCol[data-ferrari-state='composer-ignition'] .uV2eYG_card::before,
  .pI_x6G_centerCol[data-ferrari-state='composer-ignition'] .uV2eYG_card::after { animation: none; opacity: 0; }
  .pI_x6G_centerCol[data-ferrari-state='igniting'] .uV2eYG_card::after,
  .pI_x6G_centerCol[data-ferrari-state='generating'] .uV2eYG_card::after { animation: none; opacity: 0; }
  .pI_x6G_centerCol[data-ferrari-state='complete'] .uV2eYG_card::after { animation: none; opacity: 0; }
  .ferrari-wt .ft-line,
  .ferrari-wt .ft-line-red,
  .ferrari-wt .ft-ground,
  .ferrari-wt .ft-wake,
  .ferrari-wt .ft-particle,
  .ferrari-wt .ft-pressure { animation: none; }
  .ferrari-wt .ft-particle { opacity: 0.14; }
  .pI_x6G_frame[data-ferrari-state='igniting'] .ferrari-wt,
  .pI_x6G_frame[data-ferrari-state='generating'] .ferrari-wt { opacity: 0.12; }
  .pI_x6G_frame[data-ferrari-state='complete'] .ferrari-wt { opacity: 0; transition: none; }
}
@keyframes ferrari-reduced-border {
  from { border-color: rgba(225,6,0,0.72); }
  to { border-color: rgba(225,6,0,0.38); }
}

@media (max-height: 850px) {
  .hHd-Xa_root::after { height: 72px; }
}
@media (max-height: 700px) {
  .hHd-Xa_root::after { display: none; }
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
  .Md3f7G_scroll { padding-top: 48px; }
  .uV2eYG_root { padding-bottom: 20px; }
  .pI_x6G_centerCol { background-image: linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.40) 100%), linear-gradient(90deg, rgba(5,5,5,0.80) 0%, rgba(5,5,5,0.70) 100%), linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url('/ferrari-background.png'); }
}
@media (max-width: 600px) {
  :root { --ferrari-chat-width: calc(100vw - 32px); }
  .Md3f7G_scroll { padding: 20px 16px 60px; }
  .uV2eYG_root { padding-left: 12px; padding-right: 12px; padding-bottom: 12px; }
  .pI_x6G_centerCol { background-image: linear-gradient(180deg, rgba(0,0,0,0.30) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.40) 100%), linear-gradient(90deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.62) 100%), linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url('/ferrari-background.png'); }
}
`

return {
  inject: ['timer'],
  apply(ctx) {
    const theme = ctx.get('theme')
    if (theme !== undefined) {
      ctx.effect(() => theme.overrideTokens('ferrari-dark-theme', TOKENS))
    }
    ctx.effect(() => styles.insert(CSS))

    ctx.effect(() => {
      const root = document.querySelector('.pI_x6G_centerCol')
      if (root === null) return
      const frame = root.closest('.pI_x6G_frame')

      let prevBusy = false
      let composerTimer = null
      let ignitionTimer = null
      let completeTimer = null

      const setState = function (s) {
        root.setAttribute('data-ferrari-state', s)
        if (frame !== null) frame.setAttribute('data-ferrari-state', s)
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
        const convRoot = document.querySelector('.wSkVaW_root[data-phase]')
        if (convRoot !== null) {
          return convRoot.getAttribute('data-phase') === 'hero' ? 'empty' : 'conversation'
        }
        return document.querySelector('.pXSMma_root') !== null ? 'empty' : 'conversation'
      }

      const busyNow = function () {
        const p = readPhase()
        if (p === 'submitting' || p === 'adjudicating') return true
        return document.querySelector('[data-streaming], [data-state="running"]') !== null
      }

      const tick = function () {
        const busy = busyNow()
        root.setAttribute('data-ferrari-phase', readPhase())
        root.setAttribute('data-ferrari-view', readView())

        if (!prevBusy && busy) {
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
      }
    })

    ctx.effect(() => {
      const findEffortMenu = function () {
        const menus = document.querySelectorAll('._7KE1Ra_menu')
        for (let i = 0; i < menus.length; i++) {
          const m = menus[i]
          if (m.querySelector('._7KE1Ra_option') !== null && m.querySelector('._7KE1Ra_groups') === null && m.querySelector('._7KE1Ra_cell') === null) {
            return m
          }
        }
        return null
      }

      const currentLevel = function (m) {
        const opts = m.querySelectorAll('._7KE1Ra_option')
        for (let i = 0; i < opts.length; i++) {
          if (opts[i].getAttribute('aria-checked') === 'true') return i
        }
        return 0
      }

      const setRunnerX = function (m, level) {
        const count = m.querySelectorAll('._7KE1Ra_option').length
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
        const opt = t.closest('._7KE1Ra_option')
        if (opt === null || !m.contains(opt)) return
        const opts = m.querySelectorAll('._7KE1Ra_option')
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
        const rootEl = m.closest('._7KE1Ra_root')
        if (rootEl === null || !rootEl.contains(e.target)) return
        const opts = m.querySelectorAll('._7KE1Ra_option')
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
      const host = document.querySelector('.hHd-Xa_root')
      if (host === null) return
      const NS = 'http://www.w3.org/2000/svg'
      const make = function (cls, inner) {
        const svg = document.createElementNS(NS, 'svg')
        svg.setAttribute('class', 'ferrari-wt ' + cls)
        svg.setAttribute('viewBox', '0 0 220 120')
        svg.setAttribute('preserveAspectRatio', 'none')
        svg.setAttribute('aria-hidden', 'true')
        svg.innerHTML = inner
        return svg
      }
      const back = make('ferrari-wt-back', `
        <defs>
          <radialGradient id="ft-press" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(225,6,0,0.16)"/>
            <stop offset="55%" stop-color="rgba(225,6,0,0.06)"/>
            <stop offset="100%" stop-color="rgba(225,6,0,0)"/>
          </radialGradient>
        </defs>
        <circle class="ft-pressure" cx="26" cy="62" r="26" fill="url(#ft-press)"/>
        <path class="ft-line" style="animation-duration:1.8s" d="M-6,42 C40,40 62,28 102,28 C142,28 168,42 226,48"/>
        <path class="ft-line" style="animation-duration:2.3s;animation-delay:-0.7s" d="M-6,52 C44,50 72,34 108,34 C146,34 172,50 226,58"/>
        <path class="ft-line" style="animation-duration:2.0s;animation-delay:-1.1s" d="M-6,64 C60,61 100,56 140,58 C178,60 206,66 226,70"/>
        <path class="ft-line" style="animation-duration:2.6s;animation-delay:-0.4s" d="M-6,80 C56,77 116,75 168,80 C198,83 214,88 226,92"/>
        <path class="ft-ground" d="M-6,98 L226,100"/>
        <path class="ft-wake" style="animation-duration:1.7s" d="M192,50 C206,48 216,50 226,50"/>
        <path class="ft-wake" style="animation-duration:2.0s;animation-delay:-0.8s" d="M194,64 C208,61 218,63 226,64"/>
        <path class="ft-wake" style="animation-duration:1.9s;animation-delay:-1.2s" d="M192,80 C206,78 216,80 226,80"/>
      `)
      const front = make('ferrari-wt-front', `
        <path class="ft-line ft-line-red" style="animation-duration:1.9s" d="M-6,72 C70,67 130,64 180,70 C202,73 214,76 226,79"/>
        <path class="ft-line" style="animation-duration:2.2s;animation-delay:-0.9s" d="M-6,56 C60,53 110,52 160,58 C192,62 210,66 226,69"/>
        <circle class="ft-particle" style="animation-duration:1.9s" cx="0" cy="40" r="1.2"/>
        <circle class="ft-particle" style="animation-duration:2.4s;animation-delay:-0.6s" cx="0" cy="56" r="1.1"/>
        <circle class="ft-particle" style="animation-duration:2.1s;animation-delay:-1.3s" cx="0" cy="86" r="1.2"/>
        <circle class="ft-particle" style="animation-duration:2.7s;animation-delay:-1.8s" cx="0" cy="70" r="1"/>
      `)
      host.appendChild(back)
      host.appendChild(front)
      return function () {
        if (back.parentNode === host) host.removeChild(back)
        if (front.parentNode === host) host.removeChild(front)
      }
    })
  }
}
