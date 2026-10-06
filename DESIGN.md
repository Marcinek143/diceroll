---
name: Atelier Dice Studio
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#36393f'
  surface-container-lowest: '#0b0e13'
  surface-container-low: '#191c21'
  surface-container: '#1d2025'
  surface-container-high: '#272a30'
  surface-container-highest: '#32353b'
  on-surface: '#e1e2e9'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e1e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#c9c6c0'
  on-secondary: '#31312c'
  secondary-container: '#474742'
  on-secondary-container: '#b7b5af'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00b982'
  on-tertiary-container: '#00422c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e5e2db'
  secondary-fixed-dim: '#c9c6c0'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#474742'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#111319'
  on-background: '#e1e2e9'
  surface-variant: '#32353b'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-mono-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.04em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system crafts an atmosphere of quiet luxury and artisanal craftsmanship for modern tabletop gaming and simulation. Inspired by the intersection of high-end consumer hardware design and heritage board game bespoke cabinetry, the aesthetic avoids garish casino neon, skeuomorphic felt cliches, and hyper-gamified fantasy tropes. Instead, it positions 3D dice physics within an intentional, calm, and distraction-free spatial environment.

The personality balances three distinct traits:
- **Precision Engineered:** Utilitarian clarity, crisp geometry, and effortless responsiveness reminiscent of boutique industrial tools.
- **Sensory & Tactile:** Micro-interactions emphasize physics, micro-elevations, cushioned landings, and subtle mechanical feedback.
- **Restrained Elegance:** Expansive near-black canvases, meticulous typography, and disciplined emerald focal points guide user attention directly to the tactile thrill of the roll.

The target audience comprises tabletop roleplayers, board game enthusiasts, mathematicians, and collectors who value focused software tools with museum-grade polish.

## Colors

The palette establishes an ultra-refined dark room wherein the rolling tray acts as the physical centerpiece. 

- **Primary Accent (`#10b981`, `#059669`, `#34d399`):** A curated spectrum of organic emerald and jade. Reserved strictly for decisive interactions—triggering rolls, selecting active dice, and communicating success states. It glows with quiet energy against dark planes rather than flashing neon.
- **Secondary / Dice Ivory (`#f8f5ee`, `#ebe5d8`):** A warm, heavy bone porcelain tone applied to the 3D dice bodies, highlighted badges, and critical readouts. Offsets cold digital screens with tactile warmth.
- **Surface & Canvas Neutrals:**
  - Void Canvas: `#0d1015` (Deepest charcoal/black canvas baseline)
  - Surface Panel: `#12161d` (Floating UI panels, sidebars, sheets)
  - Tray Well Surface: `#151a21` to `#1a2029` (Low-reflection matte rolling ground)
- **Text & Metadata Hierarchy:**
  - Primary Typography: `#ffffff` (Crisp, uncompromised contrast)
  - Secondary / Supporting: `#94a3b8` (Balanced silver-gray slate)
  - Muted / Disabled / Metadata: `#64748b`
- **Structural Trims & Glass:**
  - Hairline borders utilize translucent white overlays: `rgba(255, 255, 255, 0.08)` for dormant boundaries, stepping to `rgba(255, 255, 255, 0.14)` for hover and focus borders.

## Typography

Typography delivers a high-precision, technical editorial feel. **Inter** serves as the core linguistic face, leveraging negative tracking on headlines to yield a taut, engineered presence. Tabular and arithmetic elements—such as dice roll tallies, probability percentages, physics modifier readouts, and seed codes—transition into **JetBrains Mono** to ground numerical readouts with clinical certainty.

### Hierarchy & Usage Principles
- **Display Scale:** Applied exclusively to the grand total of the rolled pool or heroic single-result revelations.
- **Headlines:** Clean, medium-weight structure for modal heads, configuration titles, and tray profiles.
- **Body:** Neutral and legible, prioritizing vertical rhythm and generous line-height on deep-gray surfaces.
- **Monospaced Data Labels:** Used in all-caps or tabular configurations for modifiers, dice formulas (e.g., `4d20 + 2`), and real-time physics velocities.

## Layout & Spacing

The spatial engine utilizes an adaptive stage-and-dock architecture. The 3D rolling tray occupies the central spatial plane, bounded by floating HUD docks and utility panels.

### Viewport Behavior
- **Desktop (1024px+):** The 3D viewport spans 100% of the canvas height. Floating navigation docks hover 2rem inward from margins. Floating control pallets conform to a 12-column subgrid with 1.5rem gutters, allowing configuration panels to slide gracefully alongside the tray without occluding the primary drop trajectory.
- **Tablet (768px - 1023px):** Lateral margins scale down to 1.5rem. Control docks condense into a single floating horizontal capsule anchored at the bottom edge.
- **Mobile (< 768px):** The stage becomes dominant. Menus, modifiers, and die selectors collapse into an expansive bottom sheet overlay using 1rem edge margins and 0.75rem gutters. Floating actions remain within direct thumb-reach zones.

## Elevation & Depth

Depth is tactile, physical, and restrained. Rather than exaggerated volumetric lighting, this design system establishes three-dimensional authority through micro-bevels, acoustic absorption metaphors, and soft ambient occlusions.

- **Level 0 (Stage Horizon / Canvas - `#0d1015`):** Ground floor; completely absorptive and neutral.
- **Level 1 (Recessed Rolling Chamber - `#151a21`):** Sunken tray surface. Conveyed using an inset inner shadow: `inset 0 4px 20px rgba(0, 0, 0, 0.65), inset 0 0 0 1px rgba(255, 255, 255, 0.04)`. This creates a beveled lip around the 3D physics boundary.
- **Level 2 (Floating Controls & Cards - `#12161d`):** Elevated overlays utilizing ultra-subtle backdrops: `backdrop-filter: blur(16px)`, backed by `box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)`.
- **Level 3 (Interactive Modals & Active Floating Sheets):** High-layer elevation: `box-shadow: 0 24px 48px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12)`.
- **Specular Edge Highlights:** No solid outer borders are permitted. All perimeter definition relies on 1px translucent gradient hairline strokes (`rgba(255, 255, 255, 0.08)` down to `rgba(255, 255, 255, 0.02)`), simulating light catching precision-milled aluminum edges.

## Shapes

The design system adopts a calibrated **Rounded (Level 2)** shape standard:
- Standard elements (buttons, segmented toggles, text inputs): `0.5rem` (8px).
- Containers, modal windows, and the dice tray frame: `1rem` (16px) to `1.5rem` (24px).
- Small inline status badges and pill action indicators: Full pill radii (`9999px`).

Geometric profiles mimic refined modern consumer hardware—generous corner radii that stay strictly disciplined, eliminating juvenile bubble aesthetics while softening structural harshness.

## Components

### Buttons
- **Primary Hero (Roll Trigger):** Background set to `#10b981`, text in absolute white `#ffffff`, font weight `500`. Subtle top edge highlight via `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25)`. Hover transitions to `#059669` with an ambient glow of `0 0 24px rgba(16, 185, 129, 0.35)`. Active state subtly presses inward by `scale(0.98)`.
- **Secondary / Utility Button:** Glass foundation (`rgba(255, 255, 255, 0.04)`), text in `#ffffff`, border `1px solid rgba(255, 255, 255, 0.08)`. On hover, background shifts to `rgba(255, 255, 255, 0.08)` and border to `rgba(255, 255, 255, 0.16)`.
- **Ghost Button:** Zero surface fill, `#94a3b8` text, transitioning to `#ffffff` and subtle hover background `rgba(255, 255, 255, 0.04)`.

### Dice Selector Chips
- Compact modular tokens displaying die geometry (d4, d6, d8, d10, d12, d20, d100).
- Unselected: Dark surface `#12161d`, border `rgba(255, 255, 255, 0.08)`, secondary text `#94a3b8`.
- Selected / In Pool: Border illuminates with `#10b981`, background receives subtle emerald tint `rgba(16, 185, 129, 0.08)`, count badge appears in Ivory `#f8f5ee` with dark recessed counter `#1a1d20`.

### Roll Log & History List
- Clean horizontal rows on transparent backgrounds separated by `1px solid rgba(255, 255, 255, 0.04)`.
- Left-hand side exhibits formula (`3d6 + 2`) in `JetBrains Mono` (`#94a3b8`).
- Right-hand side features total result in large ivory text (`#f8f5ee`), with critical success outcomes framed in a soft emerald pill badge.

### Inputs & Modifier Controls
- Precision stepper controls for numerical adjustments (+/-). Stepper buttons match secondary button mechanics.
- Input wells: Deepest black background `#0d1015`, hairline border `1px solid rgba(255, 255, 255, 0.08)`, mono numerals centered in `#ffffff`. Focus state highlights border to `#10b981` without garish browser-default rings.

### Cards & Control Palettes
- Surface: `#12161d` with 16px corner radius.
- Padding: `1.5rem` desktop, `1rem` mobile.
- Headers: Clean 18px medium text with subtle subline in `#94a3b8`. Separated from body by hairline divider.

### Specialized App Component: Result Flash Toast
- Anchored overhead above the 3D rolling tray.
- Appears upon physics rest state: Glass container (`rgba(18, 22, 29, 0.9)`), backdrop blur `24px`, micro-border in `rgba(255, 255, 255, 0.12)`.
- Reveals single dice breakdowns in ivory pips with the aggregated sum boldly displayed in `display-lg` typography.