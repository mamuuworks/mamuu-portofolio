# Mamuu — Artist Portfolio · Final Report

React portfolio for the artist **Mamuu** (wordmark `MAMUU`).
Stack: Vite · React · Tailwind CSS · Framer Motion · Three.js (in main bundle since rev 14).

```bash
npm install
npm run dev      # dev server
npm run build    # production build (passes)
npm run preview  # port 4199 in this environment
```

---

## 0. Revision 30 — the client's own OC line art as the About page's full-screen gray backdrop (client request)

Client asks: the About page's background should be their own OC line-art SVG,
full screen, with the opacity pulled down so the black lines read as gray.

- **The asset** — downloaded from the client's filebin link and copied
  verbatim to `public/images/about/mamuu-oc.svg` (76 KB, viewBox
  1999.16 × 1981.25, 46 plain-black line paths — no fills, no strokes, no
  raster). Opacity alone turns the ink gray, so the backdrop stays inside
  the strictly monochrome palette.
- **The backdrop** — `src/sections/AboutSection.jsx` gains a decorative
  image (`aria-hidden`, empty `alt`, not draggable, `pointer-events-none`
  `select-none`) fixed to the viewport at `inset-0 z-0`, full size,
  `object-contain` (centred) at **15% opacity**; the section becomes
  `relative` and the content wraps in a `relative z-10` layer so the words
  sit above the drawing. `fixed` is safe here: the page wrapper animates
  opacity only. The contained fit is the client-checked final state: the
  whole character always stays inside the frame, as large as the viewport
  allows (nearly full height on desktop, a centred square behind the words
  on phones). A top-anchored `object-cover` was tried in between and
  cropped the lower body at narrow widths — the client asked for no
  cropping, so it was replaced by the contained fit.
- **Verification** — production build 5.18 s (final, contained fit);
  screenshots re-checked: the character fully visible at desktop and phone
  — nothing cropped — the gray drawing behind the centred words, text
  fully legible; console clean. Gates: lint `0 FAIL · 1 WARN`
  (pre-existing em-dash), inspect about `0 FAIL · 4 WARN` and home
  `0 FAIL · 5 WARN` (both `--allow mono,few-pictures`), chunk
  `ThreeVisual-0HS9sK64.js` 5213 B (unchanged), CSS `index-vQd8ju3m.css`
  20200 B.

## 0a. Revision 29 — every VCR string renders UPPERCASE; the `Works` label returns to VCR, pulled tighter (client request)

Client asks: (a) all text set in VCR OSD Mono should read UPPERCASE, (b) the
Work page's `Works` label should go back to the VCR face and sit closer to
the `MAMUU` wordmark above it.

- **One global rule for the uppercase** — `src/index.css` declares
  `@layer utilities { .font-vcr { text-transform: uppercase; } }`, so every
  VCR OSD Mono string renders in caps without touching a single component:
  nav labels, menu links, About prose, work card title chips, lightbox
  title/description, all Contact copy (`COMMISSIONS…`, `START A PROJECT`,
  socials, the © line, the `MAMUU-WORK` footer) — and the `Works` label.
  Source strings stay mixed-case (`"Works"` and friends), so `ScrambleText`
  shuffling and screen readers are unaffected; the transform is purely
  visual CSS.
- **`Works` label back to VCR OSD Mono** — the client reverses rev 28's
  Aurix switch: `src/sections/WorkSection.jsx` swaps `font-aurix` →
  `font-vcr` and replaces rev 28's `mt-0` with **`-mt-3`**, pulling the
  13 px label up tight under the giant `MAMUU` (screenshot-verified: close,
  no overlap). With the label off Aurix, Aurix now serves only the four
  headline wordmarks and the contact display line, as before rev 28.
- **Verification** — production build 4.10 s; screenshots re-checked at
  desktop/mobile: WORKS in VCR tight under MAMUU; About prose all caps;
  Contact fully caps; menu overlay links caps with the rev 28 fine faint
  line star unchanged; console clean. Gates: lint `0 FAIL · 1 WARN`
  (pre-existing em-dash), inspect home `0 FAIL · 5 WARN`
  (`--allow mono,few-pictures`), chunk `ThreeVisual-W5i2aD-E.js` 5213 B
  (unchanged), CSS `index-Dzri0yaa.css` 20097 B.

## 0b. Revision 28 — finer menu lines, Aurix `Works` label, smaller word-spaced `LET'S CONNECT`, `mamuu-work` footer, the client's real biography (client request)

Four typography/content fixes in one pass:

- **Menu 3D lines thinned to the home star's delicacy** — the client
  found the wireframe too heavy next to the home page's fine lines. The
  four dashed echoes drop from opacities 0.85 / 0.5 / 0.35 / 0.55 to
  **0.3 / 0.18 / 0.12 / 0.16** with finer dash rhythms
  (`[0.2, 0.12]` → `[0.12, 0.08]` and so on), matching the home star's
  faint 0.12 / 0.08 wireframe reading; the flat SVG fallback thins with
  them (strokeWidth 1.4 → 1, lighter opacities, shorter dashes).
  Geometry, scale (2.4), slant, corner pulses and the dust field are
  untouched — a line-weight change only.
- **Work page** — the `Works` microlabel switches from VCR OSD Mono to
  **Aurix**, the same display face as the giant `MAMUU` above it, and
  closes the gap to the wordmark (`mt-2` → `mt-0`).
- **Contact page** — the footer project line reads **`mamuu-work`**
  (was `mamuu-portofolio`, via `portfolio.projectName`);
  `LET'S CONNECT` steps down a size class
  (`clamp(3.4rem, 12vw, 11rem)` → `clamp(2.8rem, 9vw, 8rem)`) and gains
  a clear gap between the two words (`word-spacing: 0.3em`).
- **About biography** replaced with the client-supplied real copy —
  career from age 15 in the creative industry: music videos, motion
  graphics, visualizers, live event visuals (BGAs), Indonesian
  government projects, then international creative clients; now event
  visuals national + international and music videos for indie and
  international VTubers. The placeholder note is retired.

### Files

- `src/components/ThreeVisual.jsx` — echo opacities/dashes, SVG
  fallback, docblock rev 28.
- `src/sections/WorkSection.jsx` — `Works` label class (Aurix, `mt-0`).
- `src/sections/ContactSection.jsx` — headline clamp + word-spacing.
- `src/data/portfolio.js` — `projectName` → `mamuu-work`; new
  client-supplied `biography`.

### Gate

`npm run build` ✓ (7.8 s; `ThreeVisual` lazy chunk **5213 B ≈ 5.1 KB**,
`ThreeVisual-B0dGTazk.js`). lint **0 FAIL · 1 WARN** (em-dash,
pre-existing). inspect home **0 FAIL · 5 WARN** (`--allow
mono,few-pictures`). Screenshot-verified from the production build:
menu at 1440×900, 390×844 and a late frame — the lines now read faint
and fine like the home star's, full-bleed kept, links legible; work
fold — `Works` in Aurix sitting tight under `MAMUU`; contact fold —
the smaller word-spaced `LET'S CONNECT` and footer `MAMUU-WORK`; about
fold — the new biography; console clean.

---

## 0c. Revision 27 — the menu star grows to the home star's size: full-bleed at every width (client request)

The client asked for the menu's 3D to be enlarged again, **as big as the
home page's star**. The home star reads at a fixed apparent size: SPIKE
5.1 at camera z 7.2 (fov 42) ≈ 1.85× the half-height of the viewport —
its spikes run past all four edges. The menu figure now matches that
reading exactly:

- **One scale, both widths: 2.4** (from desktop 1.16 / phone 0.92) —
  the menu silhouette (SPIKE 3.2) at this scale spans ≈ 1.93× the
  half-height, the same size class as the home star. The camera stays at
  z 10.4 and the placement, slant and composition are untouched; only
  the figure scale changed. The home star never shrinks on a phone, so
  the menu star no longer does either: **the scale is identical at both
  widths**, and the spikes run past the screen edges on desktop and
  phone alike, at rest — not only at a pulse peak. Full-bleed is now the
  resting state, matching the home page.
- **Everything else kept** — the dashed line-wireframe family (no solid
  fills, the menu stays the line companion of the home's solid star),
  the six random corner clocks (±15%), the stardust field (rev 26's
  wider spread), the held slant with sway, breathing, pointer tilt,
  reduced-motion posed frame and flat SVG fallback. The nav links ride
  on top and stay legible.

### Files

- `src/components/ThreeVisual.jsx` — `scaleNow` 2.4 at both widths,
  docblock updated (rev 27).

### Gate

`npm run build` ✓ (6.8 s; `ThreeVisual` lazy chunk **5216 B ≈ 5.1 KB**,
`ThreeVisual-r0N7QGPd.js`). lint **0 FAIL · 1 WARN** (em-dash,
pre-existing). inspect home **0 FAIL · 5 WARN** (`--allow
mono,few-pictures`). Menu re-screenshot-verified at 1440×900 and
390×844 and compared side-by-side with the home page's own screenshot:
the menu star now reads at the home star's size — body filling the
centre, spikes exiting all edges on both widths — with the links fully
legible on top; the late frame still shows the corners at different
random lengths; console clean.

---

## 0d. Revision 26 — the menu star enlarged again: scale up at both widths, spikes may kiss the edges at a pulse peak (client request)

The client asked for the menu's 3D to be **bigger again**. Rev 25's near
full-bleed figure grows once more, without touching the verified camera
frame:

- **Scale up at every width** — desktop 1.05 → **1.16** (+10%), phone
  0.82 → **0.92** (+12%). The camera stays at z 10.4 (its frame was
  verified across rev 25's two screenshots); the growth is pure figure
  scale, so the composition, slant and placement (desktop `x +1.2, y
  +0.1`, phone `x 0, y +0.25`) are unchanged. On desktop the star now
  spans roughly 85–90% of the viewport height at rest; at a pulse peak
  the longest spike runs past the screen edge — the deliberate
  full-bleed reading of "nearly fills the screen" (the same behaviour
  the phone's side points have had since rev 25). On the phone the star
  fills the screen even more, side points still running off the edges,
  links riding on top.
- **Dust follows the bigger canvas** — the stardust field spreads wider
  again (`6.2 × 3.3`, from 5.6 × 3.0).
- **Everything else kept** — the dashed line-wireframe family, the home
  star's proportions, the six random corner clocks (±15%), the held
  slant with sway, breathing, pointer tilt, reduced-motion posed frame
  and flat SVG fallback.

### Files

- `src/components/ThreeVisual.jsx` — `scaleNow` 0.92/1.16, dust spread,
  docblock updated (rev 26).

### Gate

`npm run build` ✓ (4.8 s; `ThreeVisual` lazy chunk now **5223 B ≈ 5.1 KB**,
`ThreeVisual-BYQ5M6ar.js`). lint **0 FAIL · 1 WARN** (em-dash,
pre-existing). inspect home **0 FAIL · 5 WARN** (`--allow
mono,few-pictures`). Menu re-screenshot-verified at 1440×900 and 390×844:
desktop at rest spans ~85–90% of the height (top spike ~90/900, bottom
~855/900), the late frame catches a pulse peak with the bottom spike
running past the edge (full-bleed, links still fully legible), corner
lengths differ frame to frame, phone full-bleed kept, console clean.

---

## 0e. Revision 25 — the menu star becomes a near full-screen background at every width, its corners pulsing at random (client request)

The client asked for the menu's 3D to become a **background that nearly
fills the screen** — **never shrinking on a phone**, still the background
there — and for **every corner to shrink and grow at random**. The rev 24
half-page placement gives way to a near full-bleed figure:

- **Near full-screen at both widths** — the camera pulls back
  (z 8.9 → 10.4) and the figure grows (desktop scale 1.05, phone 0.82 —
  the phone had sat at 0.6–0.72 before): the star spans roughly 80–90% of
  the viewport height on desktop, and on a phone it fills the screen with
  the side points running off the edges — a full-bleed background the
  links ride on top of. The menu links therefore return to centre on
  mobile (rev 24's lower-half placement is undone); the bold VCR OSD Mono
  links stay legible over the thin dashed lines.
- **Random corner pulses** — six independent clocks (two superimposed
  sines each, random speeds `0.45–0.85` and `1.05–1.65` rad·s⁻¹ and random
  phases) drive each corner's length around its resting size (±15%,
  `PULSE`). Per frame, every vertex of the **shared** wireframe is
  re-scaled by the pulse of its nearest corner with a smooth falloff
  (full at a corner tip, none in a valley — the valleys stay still), so
  all four echoes breathe together while counter-rotating reads the pulses
  at four different angles. Dash distances recomputed each frame.
- **Everything else kept** — the dashed line-wireframe family (no solid
  fills), the home star's proportions (SPIKE 3.2 / SIDE 1.95 / INNER 0.85
  with jitter), the held slant `−0.16` with slow sway, the x lean and
  pointer tilt, breathing scale, the dust field spread wider
  (`5.6 × 3.0`) for the bigger canvas, the posed-frame reduced-motion
  fallback (corners frozen at varied sizes) and the flat SVG fallback.
- **Placement** — desktop `x +1.2, y +0.1` (in from rev 24's +2.0 — the
  links keep the left, the star owns nearly everything else); phone
  `x 0, y +0.25`.

### Files

- `src/components/ThreeVisual.jsx` — camera z, figure placement/scale,
  `PULSE`/`pulseDefs`/`cornerScale`/`applyCorners` (shared-geometry
  corner pulses), dust spread; docblock updated.
- `src/components/MenuOverlay.jsx` — docblock updated; mobile nav back to
  centred (links ride on the full-bleed star).

### Gate

`npm run build` ✓ (2.9–3.65 s; `ThreeVisual` lazy chunk 5221 B ≈ 5.1 KB,
`ThreeVisual-Ir-gjK0K.js`, main bundle ~822 KB — Three.js in main since
rev 14, documented). lint **0 FAIL · 1 WARN** (em-dash, pre-existing).
inspect home **0 FAIL · 5 WARN** (`--allow mono,few-pictures` — same
defended set). Menu re-screenshot-verified via `/?menu=1#/` at 1440×900
and 390×844 across **two iterations** (first cut scale 1.0 / 0.78 — grown
after; corner pulses verified across two settle times: corner lengths
differ frame to frame, valleys still, no top/bottom clipping — desktop
spike ends ~870/900, phone side points intentionally full-bleed), links
legible over the lines at both widths, console clean.

---

## 0f. Revision 24 — the menu's geometry returns to lines only, shaped as the home star, slanted, filling half the page (client request)

The client asked for the menu geometry to go back to **lines only, like
before** — but now shaped as the **home page's six-pointed star** (the top
and bottom spikes run longer than the four side points), **slanted**, and
enlarged to fill **about half of the menu page — on mobile just the same**.
The rev 23 solid waving star is replaced by a **dashed line-wireframe
family**; no solid fills anywhere:

- **The home star's proportions** — the twelve-vertex outline
  (`starLineShape`) uses the home star's figure: top/bottom spikes
  (vertices on the y axis, `|cos angle| < 0.35`) at SPIKE 3.2, side points
  at SIDE 1.95, inner valleys at INNER 0.85, with a small per-vertex jitter
  (`sin(i·2.3 + 1.1)·0.035`) so the silhouette stays its own.
- **Lines from a solid, used once** — the outline is extruded (depth 0.5,
  bevel 0.06) and reduced to its sharp edges (`EdgesGeometry`, 14°); the
  solid is disposed immediately and **one shared wireframe geometry serves
  every echo**.
- **Four dashed echoes** (`LineDashedMaterial`,
  `computeLineDistances`, `frustumCulled = false`) at scales
  1.0 / 0.84 / 0.68 / 0.5, three ink + one deepest-gray `#a3a3a3`, opacities
  0.85 / 0.5 / 0.35 / 0.55, dash arrays `[0.2, 0.12] / [0.12, 0.16] /
  [0.26, 0.18] / [0.14, 0.14]`, each counter-rotating on its own clock
  (+0.05 / −0.08 / +0.11 / −0.14 rad·s⁻¹, phases 0 / 2.1 / 4.2 / 1.0) at
  depths z 0 / −0.35 / −0.7 / −1.05.
- **The slant, held** — the whole figure holds `rotation.z = −0.16` (with a
  slow sway `sin(t·0.35)·0.06`), leans in x (`−0.42 + py·0.14`) and tilts
  with the pointer (`rotation.y = px·0.3`); breathing scale 1 ± 0.012
  non-uniform y (the mobile scale factors into **both** the initial
  `setScalar` and the breathe line — the rev 23 lesson).
- **The dust field stays** — 150 (90 on a phone) light motes `#d3d4d4`
  behind the figure, opacity pulsing, slow rotation — the stardust family
  tie.
- **Placement** — desktop right of centre (`x +2.0`, `y +0.3` — raised from
  +0.2 after the bottom spike touched the viewport edge at 893/900, camera
  z 8.9) filling the right half; phone top half (`scale 0.6`, `y +1.45`) —
  the star owns the upper half and the links were **pushed into the lower
  half** (`MenuOverlay` nav: `justify-center` →
  `justify-end gap-3 pb-6 md:gap-5 md:justify-center md:pb-0`), so the
  background takes half the menu page at both widths as asked.
- **Fallbacks** — reduced motion renders one posed frame
  (`renderFrame(2.4)`, echoes askew, dust mid-drift); WebGL failure draws a
  flat SVG of the same four dashed star outlines (same jitter function,
  group rotated `−9°`) with dust dots; everything is disposed on unmount.

### Files

- `src/components/ThreeVisual.jsx` — rewritten: `starLineShape` /
  `starWireframe` + four dashed counter-rotating echoes replace the rev 23
  solid waving star and ghost; static SVG fallback redrawn as dashed
  outlines.
- `src/components/MenuOverlay.jsx` — docblock updated; nav classes changed
  on mobile (links pushed to the lower half).

### Gate

`npm run build` ✓ (2.38–2.45 s; `ThreeVisual` lazy chunk 4537 B ≈ 4.5 KB,
`ThreeVisual-Cy239EXv.js`, main bundle ~822 KB — Three.js in main since
rev 14, documented). lint **0 FAIL · 1 WARN** (em-dash, pre-existing).
inspect home **0 FAIL · 5 WARN** (`--allow mono,few-pictures` — same
defended set as before). Menu re-screenshot-verified via `/?menu=1#/` at
1440×900 and 390×844 across **three fix iterations**: first cut overlapped
every phone link and clipped the top spike (fixed by SPIKE 3.3→3.2, mobile
scale 0.72→0.6, y +1.45, nav pushed low); then the desktop bottom spike
touched the viewport edge (fixed by y +0.2→+0.3). Final: slanted dashed
star fills the right half with top/bottom clearance, echoes
counter-rotate across two settle times, phone star owns the top half with
HOME/WORK/ABOUT/CONTACT legible below, console clean.

---

## 0g. Revision 23 — the menu's star becomes solid 3D like the home page, bigger, waving (client request)

The client asked for the menu's star to become **abstract geometry like the
home page's, bigger, with an abstract 3D wave motion**. The rev 22 dashed
mandala is replaced by a **solid waving star**:

- **Extruded solid hexagram** — the home star's figure family
  (`ExtrudeGeometry`, bevelled, depth 0.5), enlarged to R 2.7 (the mandala's
  outer echo was 2.75 but of hairline rings; this is a full solid mass).
  Per-point radius jitter (`sin(i·2.3 + 1.1)·0.04`) keeps the silhouette its
  own — never an exact copy of the home star.
- **The travelling wave** — every vertex ripples outward each frame
  (`applyWave`): two superimposed sine fields (fast/short `d·1.5 − t·2.0`
  amp 0.15, slow/long `d·0.85 − t·1.25` amp 0.09) displace z lagging with
  radius, and a gentle radial pulse (`d·1.15 − t·1.4`, ±3.5%) breathes the
  silhouette — swellings travel through the star's body like water. Normals
  untouched (basic material), meshes `frustumCulled = false` since the wave
  pushes vertices past the resting bounds.
- **Counter-phase ghost** — the same silhouette in `#a3a3a3` at 0.3,
  offset back and up-left (`−0.28, +0.22, −0.55`), waving deeper (`×1.5`)
  on a shifted clock (`t + 1.9`) — depth without any line or shadow.
- **Motion** — pointer tilt (`rotation.y ± 0.3`, `rotation.x −0.22 +
  py·0.16`), a slow abstract sway (`rotation.z = sin(t·0.35)·0.07`),
  breathing scale 1 ± 0.015 non-uniform y, and the rev 22 dust field
  (150 light motes `#d3d4d4`, z −0.6…−1.4) kept as the stardust family tie.
- **Placement** — desktop right of centre (`x +2.0`, `y +0.05`, camera
  z 8.9) filling the right half; phone higher and smaller (`scale 0.42`,
  `y +2.05`) so the solid ink figure never sits behind the ink links.
- **Fallbacks unchanged** — reduced motion renders one posed frame
  (wave mid-travel, ghost askew); WebGL failure draws a flat SVG of the
  same wavy star (ink polygon + offset gray ghost + dust dots); everything
  (geometries, materials, mote texture, renderer) is disposed on unmount.

### Files

- `src/components/ThreeVisual.jsx` — rewritten: extruded waving star +
  counter-phase ghost + dust field replace the rev 22 dashed mandala;
  `starShape`/`wavyStarGeometry`/`applyWave` helpers; docblock + static
  fallback updated.
- `src/components/MenuOverlay.jsx` — docblock only.

### Gate

`npm run build` ✓ (4.31–5.56 s; `ThreeVisual` lazy chunk 4.4 KB, main
bundle ~822 KB — Three.js in main since rev 14, documented). lint **0
FAIL · 1 WARN** (em-dash, pre-existing). inspect home **0 FAIL · 5 WARN**
(`--allow mono,few-pictures` — same defended set as rev 22). Menu
re-screenshot-verified via `/?menu=1#/` at 1440×900 and 390×844: solid
waving star fills the right half, wave verified across two settle times
(silhouette bends shift), ghost visible, phone star fully above the links
(first cut overlapped HOME — fixed by scale 0.42 / y +2.05), no edge
clipping (first cut bled off top/bottom — fixed by R 2.7 / camera z 8.9),
console clean.

---

## 0h. Revision 22 — the menu becomes a six-pointed star again, as an abstract hexagram mandala (client request)

The client asked for the menu's 3D to be a **six-pointed star like the home
page — but not too similar: a unique abstract variation**. The rev 21 spiral
galaxy is replaced by a **hexagram mandala**: the home star's six points
echoed as geometry instead of extruded morphing silhouette.

- **Four concentric hexagram echoes** — 12-vertex (six-point) star rings as
  `THREE.LineLoop` dashed lines (lightest outside → ink at the heart:
  `#a3a3a3` 0.5 → `#737373` 0.62 → `#525252` 0.78 → `#111111` 0.9), radii
  2.75 / 2.15 / 1.58 / 1.05. Each ring jitters its radii per-vertex
  (`Math.sin(i·2.7 + seed·1.9)·0.05`) so the echoes never repeat each other
  exactly — the abstraction.
- **Counter-rotation** — the rings turn at ±0.055 / 0.075 / 0.1 / 0.135, so
  their dashes keep slipping in and out of alignment: a slow abstract
  shimmer, not one rigid figure.
- **Stardust on the points** — round motes (the same soft radial sprite as
  rev 21) sit on the outer points of the outermost and third rings.
- **Solid heart** — a mini-star (R 0.5) fills the centre, triangulated as a
  fan from an added centre vertex so the concave silhouette renders clean.
- **Dust field behind** — ~150 light motes (`#d3d4d4`, z −0.6…−1.4), the
  stardust family tie to the home intro, slowly drifting.
- **Motion** — the whole mandala breathes (scale 1 ± 0.02, non-uniform y)
  and tilts with the pointer (`rotation.y ± 0.3`, `rotation.x −0.3 +
  py·0.18`), as the blob and the galaxy did before it.
- **Placement unchanged** — right of centre on desktop (`x +2.3`,
  `y +0.15`), higher and smaller on a phone (`scale 0.8`, `y +1.1`).
- **Fallbacks unchanged** — reduced motion renders one posed frame; WebGL
  failure draws a flat SVG of the same mandala (four dashed polygons +
  solid heart); everything (geometries, materials, mote texture, renderer)
  is disposed on unmount.

### Files

- `src/components/ThreeVisual.jsx` — rewritten: dashed hexagram echoes +
  solid fan-triangulated heart + mote/dust points replace the rev 21
  galaxy clouds and comet; docblock + static fallback updated.
- `src/components/MenuOverlay.jsx` — docblock only.

### Gate

`npm run build` ✓ (4.38 s; `ThreeVisual` lazy chunk 5.2 KB, main bundle
~822 KB — Three.js in main since rev 14, documented). lint **0 FAIL ·
1 WARN** (em-dash, pre-existing). inspect home **0 FAIL · 5 WARN**
(`--allow mono,few-pictures` — same defended set as rev 21). Menu
re-screenshot-verified via `/?menu=1#/` at 1440×900 and 390×844: mandala
renders, counter-rotated echoes verified across two settle times (dash
alignment shifts), solid heart clean, no overlap with the links, console
clean.

---

## 0i. Revision 21 — the menu's 3D geometry becomes its own stardust variation (client request)

The client asked for the menu page's Three.js geometry to be replaced with
**stardust like the home intro — but not a copy: a unique variation**. The
wireframe icosahedron blob + satellite dot are gone. The menu now carries a
**slow spiral galaxy of dust**:

- **Three kinds of cloud, one galaxy** — a dense dark **core** (ink
  `#111111`, ~280 motes), two counter-rotating **spiral arms** winding out
  of it (accent/mute grays, ~430 motes each) and a sparse lighter **halo**
  (`#a3a3a3`/`#d3d4d4`, ~290 motes) — round soft-sprite motes, never
  squares, strictly monochrome on the white canvas.
- **Motion** — the whole disc turns slowly (`t · 0.05`), the arms shear
  against it (`±0.035–0.045`), every cloud **twinkles** (its opacity
  breathes on its own phase), the disc is seen from slightly above
  (`rotation.x −0.55`) and tilts with the pointer like the old blob did.
- **Shooting star** — every 4–8 s a tiny **comet** (round dark head +
  tapered triangular gray tail, never a straight hairline rule) crosses the
  field on a descending diagonal inside the galaxy's neighbourhood, fading
  in and out (`sin(π·p)`).
- **Placement** — the links column owns the left half, so the galaxy sits
  right of centre on desktop (`x +2.3`) and hovers higher and smaller on a
  phone (`scale 0.78`, `y +1.1`).
- **Fallbacks** — reduced motion renders one posed frame; WebGL failure
  draws a flat SVG of the same field (scattered gray circles + comet);
  everything (geometry, materials, mote texture, renderer) is disposed on
  unmount as before.

### Files

- `src/components/ThreeVisual.jsx` — rewritten: Points clouds + comet group
  replace the distorted icosahedron and satellite; `makeMoteTexture`
  (canvas radial sprite); docblock + static fallback updated.
- `src/components/MenuOverlay.jsx` — docblock only.

### Gate

`npm run build` ✓ (3.42 s). lint **0 FAIL · 1 WARN** (em-dash,
pre-existing). inspect home **0 FAIL · 5 WARN** (`--allow mono,few-pictures`
— same defended set as rev 20). Menu re-screenshot-verified via `?menu=1`
(the deep link is a real query: `/?menu=1#/`) at 1440×900 and 390×844:
galaxy behind the links, no hairline artifacts, comet verified mid-flight
(head + taper), mobile galaxy above the links, console clean.

---

## 0j. Revision 20 — the circle stops at MEDIUM and transforms into the stardust directly, quicker still (client request)

The client reviewed rev 19's intro with two changes: the black circle
should **never reach full size** — it becomes **medium**, then transforms
into the stardust directly — and the pace should stay quick, not too slow:

- **Appear (0–0.35 s):** unchanged — the circle fades in as a tiny dot
  (~16 %) at the canvas centre.
- **Grow (0.35–0.95 s):** 0.6 s of smoothstep growth that **stops at
  55 %** (`S_MED`) — the circle never becomes large.
- **Asterisk (0.65–1.0 s):** spins down onto the medium disc, sized to it,
  then **grows with it** as the disc becomes the stardust
  (`S_MED + (1 − S_MED) · EASE_OUT(pb)`).
- **Become the stardust (0.95–1.75 s):** from the medium size the disc
  swells ×1.25 while fading into the burst — the medium circle transforms
  into the stardust directly — while the star assembly drifts centre →
  left.
- **Text (1.15–1.85 s):** glyphs + マムー rise from behind the stardust
  sliding right. Total run **~1.9 s** (was ~2.2 s).

### Files

- `src/components/LogoIntro.jsx` — new `S_MED = 0.55` growth ceiling
  (rev 19 grew to 1.0); `pg` over 0.6 s (was 0.9 s); the asterisk lands at
  the medium size and scales up through the burst phase; every `PHASE`
  window pulled earlier; docblock + comments updated to rev 20.
- `src/sections/HomeSection.jsx` — comment only.
- `/tmp/opencode/introshot.mjs` — freeze points retimed (0.2 / 0.65 /
  0.95 / 1.4 / 1.75 / 2.3 s; the "grown" shot became a "medium" shot).

### Gate

`npm run build` ✓ (3.36 s). lint **0 FAIL · 1 WARN** (em-dash,
pre-existing). inspect home **0 FAIL · 5 WARN** with `--allow
mono,few-pictures` — the meter escalated both to FAIL this run because the
home hero is all canvas (monoShare 1 over the nav's VCR OSD Mono, and 0
raster pictures); both are deliberate, client-mandated choices, defended
below. The five remaining warns are the same defended set as rev 19
(first-action, no-footage, no-hero, small-title, still-page;
font-not-dealt did not appear this run). All phases re-screenshot-verified
via `?logoT` at 1440×900 and 390×844: t=0.65 s mid-growth at the centre,
t=0.95 s the disc at **medium** with the asterisk landing — never large,
t=1.4 s the medium disc transforming into the stardust and drifting left
with the glyphs + マムー emerging from behind, t=1.75 s the glyphs nearly
landed, settled identical to rev 19's lockup. Mobile settled correct.

---

## 0k. Revision 19 — the circle grows INTO the stardust (centre → left), text emerges from behind it to the right, quicker (client request)

The client reviewed rev 18's intro with three changes: the circle should
grow **into** the stardust (not dissolve in place), the speed should not be
"too slow", and — while that happens — the M + katakana should **emerge to
the right from behind the stardust**, with the circle-that-becomes-stardust
travelling **from the canvas centre to the left**:

- **Appear (0–0.35 s):** the circle fades in as a tiny dot (~16 % of full
  size) at the **centre of the canvas** — not at the lockup's left home.
- **Grow (0.35–1.25 s):** 0.9 s of smoothstep growth — still clearly
  staged, but quicker (rev 18's 1.4 s read as slow).
- **Asterisk (0.9–1.6 s):** spins down onto the grown disc.
- **Become the stardust (1.25–2.1 s):** the disc **swells ×1.25 while
  fading into the burst** — it literally becomes the stardust — while the
  whole star assembly drifts centre → left to its home (`EASE_OUT` on the
  drift).
- **Text (1.45–2.2 s):** the glyphs + マムー start **behind** the stardust
  (bottom layer, rev 15 order) and slide **rightward** into place —
  `baseX − (1 − EASE_OUT(pt)) · slide`. Total run **~2.2 s** (was ~3.2 s).

### Files

- `src/components/LogoIntro.jsx` — new `star` THREE.Group holding the disc,
  asterisk and burst so they travel as one assembly; `parts.driftX` computed
  from the lockup centre to the star's home after the camera Box3 fit;
  `renderFrame` sets `parts.star.position.x` per the drift and the text
  direction flipped to `−slide`; the text pivot stays **outside** the star
  group so the glyphs can rise from behind the moving star; `applyFinal`
  resets the star's position; `pb` computed once at the top; docblock +
  comments updated to rev 19.
- `src/sections/HomeSection.jsx` — comment only.
- `/tmp/opencode/introshot.mjs` — freeze points retimed (0.2 / 0.8 / 1.3 /
  1.7 / 2.05 / 2.6 s).

### Gate

`npm run build` ✓ (3.51 s). lint **0 FAIL · 1 WARN** (em-dash,
pre-existing). inspect home **0 FAIL · 6 WARN** — the same six defended
warns as rev 18 (first-action, no-footage, no-hero, font-not-dealt,
small-title, still-page). All phases re-screenshot-verified via `?logoT` at
1440×900 and 390×844: t=0.2 s a tiny dot at the canvas **centre**, t=0.8 s
visibly mid-growth still centred, t=1.3 s full disc + asterisk landing still
centred, t=1.7 s the stardust expanded and drifting left with the glyphs +
マムー emerging from behind it to the right, t=2.05 s the star at its left
home with the glyphs nearly landed, settled identical to rev 18's lockup.
Mobile settled correct.

---

## 0l. Revision 18 — the circle appears small first, then grows slowly (client request)

The client reviewed rev 17's intro and read the entrance as "masih sama
saja" — the circle still seemed to just pop in at size. The numbers agreed:
`EASE_BACK` (a back ease with overshoot) reaches **≈ 96 % of full size 0.3 s
in**, inside a 0.55 s window, so the growth was physically invisible. Rev 18
makes the growth the longest beat of the intro:

- **Appear (0–0.5 s):** the circle fades in as a clearly small dot, ~16 % of
  full size.
- **Grow (0.5–1.9 s):** a slow smoothstep to full size — 1.4 s of visible
  growth, no overshoot, no back ease.
- **Stardust (1.9–2.8 s):** as before, the burst expands while the disc
  dissolves in place.

The rest of the timeline is retimed to follow the slower entrance: asterisk
1.15–2.05 s (lands on the grown disc), burst 1.9–2.9 s, dissolve 2.0–2.8 s,
glyphs + マムー 2.4–3.2 s. Total run ~3.2 s to settle (was ~2.4 s).

### Files

- `src/components/LogoIntro.jsx` — circle entrance rewritten: constant
  `S_SMALL = 0.16`, growth via a hand-rolled smoothstep `pg * pg * (3 - 2 *
  pg)` over `[0.5, 1.9]` s; `EASE_BACK` no longer drives the circle
  (removed the now-unused `pc`); `PHASE` retimed as above; docblock +
  inline comments updated to rev 18.
- `src/sections/HomeSection.jsx` — comment only.
- `/tmp/opencode/introshot.mjs` — freeze points retimed to the new
  timeline (0.25 / 1.0 / 1.95 / 2.45 / 3.0 / 3.6 s).

### Gate

`npm run build` ✓ (4.3 s). lint **0 FAIL · 1 WARN** (em-dash, pre-existing).
inspect home **0 FAIL · 6 WARN** — the five defended warns carried since
rev 13 (first-action, no-footage, no-hero, small-title, still-page) plus a
new `font-not-dealt` (the meter's randomly dealt sheet was Imbue/Albert
Sans while the page renders VCR OSD Mono): VCR is the deliberate
client-requested identity face (rev 4) — defended. All phases
re-screenshot-verified via `?logoT` at 1440×900 and 390×844: t=0.25 s a tiny
faint dot, t=1.0 s visibly mid-growth, t=1.95 s full disc with the asterisk
landing, t=2.45 s burst with the disc dissolving, t=3.0 s glyphs + マムー
sliding in, settled correct. The growth now reads exactly as the client
asked: small appears first → slowly grows → stardust.

---

## 0m. Revision 17 — medium-size circle + マムー in the Aurix-first stack (client request)

Two changes to the home intro, both client-requested:

- **The circle never grows big.** Rev 16 kept enlarging the disc (×1 →
  ×1.5) while it dissolved into the burst; rev 17 drops that growth. The
  circle now plays **small → medium, and that is its final size** — during
  the burst expansion it dissolves **in place**, so the sequence reads as
  small → medium → stardust with no big disc at any point.
- **マムー is drawn with Aurix first in the font stack** (client request):
  `"Aurix", "Mamuu Katakana", …`. Aurix is now explicitly awaited through
  `document.fonts.load` before the texture is rasterised (it is declared in
  CSS but may not be fetched yet on the home page). Aurix itself carries no
  kana coverage (verified against its cmap — Latin only), so the glyphs are
  still painted by the 1.6 KB 3-glyph subset; the stack order honours the
  request and future-proofs the drawing if Aurix ever gains kana.

### Files

- `src/components/LogoIntro.jsx` — circle scale holds at `EASE_BACK(pc)`
  (no dissolve-phase growth); katakana stack Aurix-first + Aurix font load;
  comments updated.
- `src/sections/HomeSection.jsx` — comment only.

### Gate

`npm run build` ✓ (3.5 s). lint **0 FAIL · 1 WARN** (em-dash, pre-existing).
inspect home **0 FAIL · 5 WARN** — the same five defended warns as rev 14–16.
All intro phases + settled re-screenshot-verified via `?logoT` at 1440×900
and 390×844: the disc reads small → medium and dissolves in place (the
burst-phase ghost is visibly smaller than rev 16's), マムー renders
correctly beside the wordmark's end. Fallback SVG unchanged from rev 16.

---

## 0n. Revision 16 — the circle grows into the stardust + マムー restored (client request)

Two changes to the home intro, both client-requested:

- **The black circle grows into the stardust.** In rev 15 the disc shrank
  away while the starburst expanded over it; now it **keeps growing** (scale
  ×1 → ×1.5, easeOutCubic) as it fades out during the burst expansion — the
  circle reads as *becoming* the starburst, never as being covered by it.
- **The katakana マムー is back**, at its exact original spot from the
  client file — `translate(1256.9966 516.0573)`, 54 SVG units, the light
  `#d3d4d4` — small, beside the end of the wordmark. SVGLoader cannot turn
  `<text>` into geometry and no Japanese font ships with the site, so the
  run is rasterised into a **canvas texture** (drawn at 4× resolution) and
  placed as a textured plane inside the glyphs' pivot: it slides in with
  them and shares their bottom layer (asterisk > burst > text, rev 15).

### Font

`public/fonts/mamuu-katakana.woff2` — a **1.6 KB woff2 subset carrying
exactly the three glyphs マ・ム・ー** (Noto Sans JP 400, Google Fonts CSS API
`text=` subsetting), loaded through the `FontFace` API under the family
name `Mamuu Katakana` (promise cached, remounts never re-fetch). On load
failure the intro keeps playing and the texture falls back to whatever
Japanese system font the machine has. This is the single deliberate
exception to rev 5's "no Japanese" rule, requested by the client.

### Files

- `src/components/LogoIntro.jsx` — effect restructured to async (font load
  before scene build); `drawKatakana()` texture plane; circle grow-math in
  `renderFrame`; `applyFinal()` and the texture/`map` disposal kept in sync.
- `public/images/logo/mamuu-logo-black.svg` — the static fallback now also
  carries マムー, using the same subset **embedded as a data-URI `@font-face`**
  (an SVG loaded as `<img>` may not fetch external resources).
- `src/sections/HomeSection.jsx` — comment only.

### Gate

`npm run build` ✓ (3.4 s). lint **0 FAIL · 1 WARN** (em-dash, pre-existing).
inspect home **0 FAIL · 5 WARN** — the same five defended warns as rev 14/15.
All intro phases + settled re-screenshot-verified via `?logoT` at 1440×900
and 390×844 (マムー renders correctly — no tofu); the fallback SVG verified
rendered standalone with the embedded font. Console clean.

---

## 0o. Revision 15 — smaller logo, circle dissolves into the stardust, new layer order (client request)

Three changes to the rev 14 intro, all client-requested:

- **The logo is smaller** on screen: the hero span drops from
  `w-[min(92vw,1150px)]` to `w-[min(76vw,760px)]`.
- **The circle becomes the stardust**: the disc now appears small (it starts
  tiny and grows in, 0–0.55 s), then during the starburst expansion
  (0.95–1.85 s) it **dissolves away** (opacity + scale out, 0.95–1.6 s) — the
  expanding starburst *replaces* the circle instead of emerging from behind a
  persisting disc.
- **Layer order is now asterisk (top) → starburst → glyphs (bottom)**: z
  indices in `LogoIntro.jsx` changed from asterisk 2 / burst 1 / text 3 to
  asterisk 3 / burst 2 / text 1. This restores the client SVG's own draw
  order (glyphs are painted first, the asterisk last), so the burst now
  overlaps the first glyph exactly as in the original artwork.

Phase times re-timed: circle 0–0.55, asterisk 0.45–1.35, burst 0.95–1.85,
dissolve 0.95–1.6, glyphs 1.6–2.4. `applyFinal()` matches (no disc remains).

### Gate

`npm run build` ✓ (3.6 s). lint **0 FAIL · 1 WARN** (em-dash, pre-existing).
inspect home **0 FAIL · 5 WARN** — same five as rev 14 (`first-action`,
`no-footage`, `no-hero`, `small-title`, `still-page`). All intro phases +
settled re-screenshot-verified via `?logoT` at 1440×900 and 390×844; console
clean.

---

## 0p. Revision 14 — the client's SVG logo as an animated Three.js home intro (client request)

The home `MAMUU` wordmark (Aurix + `ScrambleText`, rev 10) is replaced by the
client's own logo, supplied as `LOGO mamuuu.svg` (viewBox `0 0 1419 854.8`),
played as a **one-time Three.js intro on first page load**:

**black circle** scales in (0–0.55 s, easeOutBack) → **asterisk** spins down
onto the disc (0.45–1.35 s, −2.25π → 0, easeOutCubic, then idles at 0.1 rad/s)
→ **starburst** spikes expand behind it (1.15–2.05 s, 0.12 → 1, easeOutBack)
→ the three **glyphs** slide in from the side (1.75–2.55 s, easeOutCubic).

### Files

- `src/assets/mamuu-logo.svg` — the client SVG verbatim, imported `?raw` and
  parsed with `SVGLoader` (shapes → `ShapeGeometry`, y-flip, `DoubleSide`).
- `src/components/LogoIntro.jsx` — the intro canvas: per-element pivot groups
  at bbox centres, `OrthographicCamera` fitted to the lockup with letterboxing
  (lockup aspect preserved on any canvas ratio), DPR capped at 1.8, full GPU
  dispose on unmount. Any error → `console.warn` + static fallback image.
- `public/images/logo/mamuu-logo-black.svg` — faithful static fallback
  (glyph + asterisk `#d3d4d4`, starburst `#111111`, no `<text>`/`<defs>`).
- `src/sections/HomeSection.jsx` — `h1` is now an sr-only
  "Mamuu, illustrator and character artist" plus an `aria-hidden` span
  (`aspect-[1419/855] w-[min(92vw,1150px)]`) holding the canvas; home no
  longer uses `ScrambleText`. Star backdrop + wave socials unchanged.

### Faithfulness decisions

- Client scheme kept: glyph + asterisk `#d3d4d4` (the SVG's `.cls-2`), circle
  + starburst ink `#111111`; the asterisk sits **on top** of the burst, the
  glyphs above both (ink glyphs vanish into the disc — light is required for
  legibility). The SVG's マムー `<text>` is skipped: the font isn't shipped and
  Japanese text was removed in rev 5.
- Element classification is **order-based, no x thresholds**: widest element =
  starburst; of the rest, leftmost = asterisk, rightmost = wordmark. (The
  first glyph's curves reach x≈620.8 though its path data starts at 734.7 —
  the original `<650` threshold misclassified it, threw "unexpected logo
  structure" and silently fell back. Root cause of the freeze bug.)

### Behaviour

- Plays **once per page load**; `applyFinal()` renders the settled lockup
  immediately under `prefers-reduced-motion`; no-WebGL/error → static
  fallback SVG.
- `?logoT=<seconds>` (in `location.search` or the hash) freezes the intro at
  time *t* — dev/screenshot aid, verified via a data-attr probe (`textX`
  reaches its final `951.25` at `t=3.4`).

### Gate

`npm run build` ✓ (3.4 s). lint **0 FAIL · 1 WARN** (em-dash). inspect home
**0 FAIL · 5 WARN** — `first-action`, `no-footage`, `no-hero`, `small-title`,
`still-page` (`no-hero`/`small-title` are new: the h1 *is* the logo canvas
plus sr-only text — the hero is the brand mark itself). Bundles: main
`index-*.js` 821 KB (LogoIntro lives in the main chunk), `StarVisual-*.js`
2.7 KB, `ThreeVisual-*.js` 2.5 KB. All five intro phases + settled state
screenshot-verified at 1440×900 and 390×844; console clean.

---

## 0q. Revision 13 — real contact links + email (client request)

The placeholder destinations in `portfolio.socialLinks` are now the client's
real accounts, flowing to every consumer (contact pill button `mailto:`,
contact + home + menu-overlay social rows):

| Channel | Value |
|---|---|
| Email | `mailto:sayhitomamuu@gmail.com` |
| X | `https://x.com/mamsenpai` |
| Instagram | `https://www.instagram.com/mamsenpai` |
| VGen | `https://vgen.co/mamsenpai` |

Single-file change (`src/data/portfolio.js`) — no component edits. Verified
in the production bundle (3× `mamsenpai`, 1× `sayhitomamuu`). Gate on the
production build: lint **0 FAIL · 1 WARN**; inspect contact **0 FAIL · 4
WARN** (unchanged list). No visual change expected — hrefs only.

---

## 0r. Revision 12 — calmer menu wordmark + VCR titles on work imagery (client request)

Two follow-ups to rev 11:

1. **Menu wordmark brought down a size** — rev 11's `MAMUU` at
   `clamp(2.25rem, 6.5vw, 4.5rem)` read too loud above the menu links; it
   now sits at `clamp(1.5rem, 3.5vw, 2.5rem)`, still full-ink Aurix with
   −0.02em tracking, so the overlay leads with HOME/CONTACT/WORK/ABOUT and
   the wordmark stays a quiet signature.
2. **Work imagery text → VCR OSD Mono** — the lightbox title (`h3`) and
   description, and the hover/focus title chip on each mac-window card,
   previously DM Sans/Space Grotesk, now set in VCR OSD Mono
   (`font-vcr`; `font-bold` dropped — the face has one weight). Sizes,
   tracking and behaviour unchanged. The `Works` microlabel and section
   wordmark are untouched (rev 10/11).

Gate re-run on the production build: lint **0 FAIL · 1 WARN** (em-dash);
inspect work **0 FAIL · 6 WARN** — one fewer than rev 11: `font-count`
cleared because the grid/lightbox now share the system faces already on
the page (no additional family ships). Remaining list: `micro-label`,
`first-action`, `no-footage`, `small-title`, `name-only-title`,
`still-page` (defenses unchanged, §3). Work fold, lightbox open state,
and menu overlay (desktop 1440×900 + mobile 390×844 via CDP) re-checked
in screenshots: wordmark modest, imagery titles/descriptions render in
VCR OSD Mono. Home / about / contact untouched.

---

## 0s. Revision 11 — bigger menu wordmark + Works label in VCR (client request)

Two follow-ups to rev 10:

1. **Menu wordmark enlarged** — the overlay's `MAMUU` was still sitting at
   the 13 px microlabel size; it now renders display-size in Aurix
   (`clamp(2.25rem, 6.5vw, 4.5rem)`, full ink, −0.02em tracking), clearly
   visible above the menu links while staying subordinate to them.
2. **Work page `Works` label → VCR OSD Mono** — the microlabel under the big
   `MAMUU` now sets the client system face inline (`.microlabel`'s DM Sans
   would beat a utility class); size, tracking and the scramble decode are
   unchanged.

Gate re-run on the production build: lint **0 FAIL · 1 WARN** (em-dash);
inspect work **0 FAIL · 7 WARN** (same list as before — `micro-label` still
defended: the label is a client brand device, now in the client's own face).
Work fold + menu overlay (desktop 1440×900 and mobile 390×844 via CDP)
screenshots re-checked: wordmark reads clearly in Aurix, `WORKS` renders in
VCR OSD Mono. Home / about / contact untouched.

---

## 0t. Revision 10 — Aurix display face for the five wordmarks (client request)

Client supplied the Aurix free font and asked that the five headline
wordmarks switch to it: home `MAMUU`, about `ABOUT ME`, work `MAMUU`,
contact `LET'S CONNECT`, menu-overlay `MAMUU`. One shared change, five places:

- `public/fonts/Aurixfree-Regular.otf` self-hosted (8.9 KB, regular 400
  only — a Calligraphr font: letters + ` !"',.:;?` only, **no digits or
  dash**, so it is used strictly as the display face with Space Grotesk as
  its fallback).
- New `font-aurix` utility in `tailwind.config.js`
  (`"Aurix" → "Space Grotesk Variable" → "Space Grotesk"`); `@font-face`
  added in `src/index.css`. `font-display: swap`; no `font-weight: bold`
  on the headings any more (the font has one weight — synthetic bold
  would distort it).
- The four section headings swapped `font-display` → `font-aurix` and
  dropped `font-bold`. The menu-overlay wordmark, whose `.microlabel`
  class would beat a utility, sets the family inline.
- Scramble decode, sizes, tracking and everything else unchanged.

Gate re-run on the production build: lint **0 FAIL · 1 WARN** (em-dash,
as before); inspect home / work / about / contact all **0 FAIL**
(4 · 7 · 4 · 4 WARN — the same list as rev 9; `font-count` on work now
counts 4 typefaces, same accepted defense). Fold screenshots of all four
pages + CDP captures of the menu overlay at 1440×900 and 390×844 checked:
Aurix renders on every wordmark, menu links stay in VCR OSD Mono.

---

## 0u. Revision 9 — alternating spike morph + bigger star (client request)

Two changes to the home backdrop only:

1. **Spikes alternately stretch and shrink** — the silhouette is now rebuilt
   live at a 30 fps throttle: each of the six outer points oscillates on its
   own sine phase, adjacent points on opposite phase (step π), so while one
   spike stretches its neighbours shrink — the star keeps trading which
   points read long, abstractly, like a slow pulse. The inner waist vertices
   breathe against them on their own phases. Reduced motion keeps one static
   frame. The rebuilt `THREE.Shape` is extruded once per step, swapped into
   both meshes and the old geometry disposed — no leak.
2. **Bigger star** — camera moves closer (z 8 → 7.2) and the base radii grow:
   Y2K spikes 4.3 → 5.1, side points 2.4 → 2.9, inner waist 1.15 → 1.2.

Gate re-run on the production build: lint **0 FAIL · 1 WARN** (em-dash, as
before); inspect home **0 FAIL · 4 WARN** (`first-action`, `name-only-title`,
`no-footage`, `still-page`; 10 moving elements — 3 CSS wave bobs + 7
scripted). Desktop + mobile fold screenshots checked. Work / about / contact
untouched; `HomeSection.jsx` unchanged in this revision.

---

## 0v. Revision 8 — abstract Y2K star + solid-black social buttons (client request)

Four changes to the rev-7 home:

1. **Y2K silhouette** — the star shape now carries two long spikes: the top
   and bottom points stretch to radius 4.3 while the four side points stay
   at 2.4, and the inner radius drops to 1.15 so every point tapers slim —
   the classic stretched Y2K star.
2. **Less literal, more alive** — the wireframe is fainter (main layer
   opacity 0.12, a smaller counter-rotating echo layer at 0.08 adds fullness
   without crispness) and it never settles: slow drift on all three axes
   around a slight permanent tilt (rotation.z base 0.14) plus non-uniform
   breathing on x/y, so the silhouette keeps morphing abstractly. The
   orbiting satellite dot is **removed**.
3. **Solid-black contact buttons** — the three round social buttons below
   `MAMUU` now sit on `bg-ink` with a solid `border-ink` ring (no
   transparency) and **white icons** (`text-canvas`, hover included).
4. No-WebGL fallback SVG redrawn to the same elongated-star silhouette.

One build bug found and fixed on the way: `starShape()` destructured its
parameter without a `= {}` default, so the argument-less call threw
(`Cannot read properties of undefined (reading 'outer')`) and crashed the
home page — caught by the inspector's console check, fixed, re-run clean.

Gate re-run on the production build: lint **0 FAIL · 1 WARN** (em-dash, as
before); inspect home **0 FAIL · 4 WARN** (`first-action`, `name-only-title`,
`no-footage`, `still-page`; 10 moving elements — 3 CSS wave bobs + 7
scripted). Work/about/contact untouched.

---

## 0w. Revision 7 — 3D star hero + MAMUU scramble + wave socials (client request)

The home page is rebuilt around one new request: replace the m-wordmark +
mascot hero with a **3D wireframe six-pointed star** backdrop (same family as
the menu's wireframe blob), the wordmark **MAMUU** decoded by the scramble
effect over it, and the contact icons moved **below the wordmark** with round
borders and a water-wave bob.

1. **`StarVisual.jsx` (new)** — THREE.Shape hexagram (12 vertices, outer 2.6 /
   inner 1.5) → `ExtrudeGeometry` (depth 0.55, bevel 0.12) rendered wireframe
   (`0x171717`, opacity 0.2) plus one small satellite dot (Icosahedron 0.17,
   `0x525252`, opacity 0.75 — shrunk after the first screenshot showed the
   original 0.3 solid too heavy). Pointer movement tilts the star toward the
   cursor; the group breathes (±3.5 %); static render under reduced motion;
   full disposal on unmount. No WebGL → flat SVG star fallback.
2. **`HomeSection.jsx` rewritten** — lazy `StarVisual` in `Suspense`, centred
   `MAMUU` h1 at `clamp(3.4rem, 13vw, 10rem)` decoded by `ScrambleText`, and
   the three social icons (x · instagram · email) centred below with
   `rounded-full` + `border-ink/30` rings. The old hero is gone: blob SVG,
   scatter accents, mascot overlay, bottom socials row.
3. **Wave bob** — `.socials-wave` in `index.css`: each `li` bobs
   `translateY(0 → -7px)` over 2.8 s with 0.22 s stagger so the three rings
   rise and fall like water waves. The animation lives on the `li` (not the
   anchor) so the icons' own hover transform still works;
   `prefers-reduced-motion` switches it off.

Build note: Vite now emits one shared `three.module-*.js` chunk (~492 KB)
consumed by both visuals — `StarVisual` (home, 2.4 KB) and `ThreeVisual`
(menu, 2.5 KB) — so Three.js is not duplicated. `Mascot.jsx` has no remaining
imports (file kept on disk, marked unused in §6). The round social borders
pass the gate: `hairline` only matches directional/1px utilities, and
`outlined-box` did not fire on the inspect run.

Gate re-run on the production build: lint **0 FAIL · 1 WARN** (em-dash, as
before); inspect **0 FAIL** on home — 4 WARN (`first-action`,
`name-only-title`, `no-footage`, `still-page`; 10 moving elements, up from
3). Work/about/contact untouched by this revision; latest runs 0 FAIL
(table in §3).

---

## 0x. Revision 6 — about/home trim + all-VCR contact (client request)

Three changes shipped:

1. **About** — the accent dot under the `ABOUT ME` heading is removed, and the
   tagline line below the biography is removed. Heading + biography only.
2. **Contact** — every line is set in VCR OSD Mono except the `LET'S CONNECT`
   display headline: supporting copy, the black pill button (weight 400 —
   VCR has no bold, no faux-bold), the socials microlabel and both footer
   lines.
3. **Home** — the tagline line under the hero is removed; the socials row now
   closes the bottom frame on its own. The two left scatter accents were
   pulled out to the shared margin so the composition keeps equal outer
   margins after the trim.

Gate re-run on the production build: lint **0 FAIL · 1 WARN** (em-dash, as
before); inspect **0 FAIL** on all four pages — home 3 WARN, work 7 WARN,
about 4 WARN, contact 4 WARN (all defensible, table in §3).

---

## 0y. Revision 5 — remove all Japanese text (client request)

The katakana label (drawn as SVG) is removed everywhere: the floating mark
next to the home wordmark, both marks in the menu overlay, the
`japaneseLabel` data field, and the `KatakanaMark.jsx` component itself
(deleted). Verified on the production build: zero Japanese characters in the
rendered DOM on home and menu, `npm run build` clean, lint 0 FAIL, inspect
home 0 FAIL / 3 WARN (same three defensible warns as before). Report and
README no longer reference the label.

---

## 0z. Revision 4 — VCR OSD Mono + final polish (client request)

Four changes requested and shipped:

1. **No active dot in the navigation** — the small accent dot next to the active
   page button is removed (`Navigation.jsx`). `aria-current` is still set for
   screen readers. Hover on nav buttons was already gray (`hover:text-accent`,
   `#525252`) — every hover in the app resolves to that gray token.
2. **No cream anywhere; About and Menu backgrounds are white** — verified by
   grep: no `#F7F5F0`/`#EFEBE4`/orange remain anywhere in `src/`. The About
   section's `bg-surface` was the last non-white full-page ground; it is now
   `bg-canvas` (`#FFFFFF`). The menu overlay is already `bg-canvas`. What is
   left of `surface` `#F5F5F5` is only the mac-window chrome tone steps.
3. **Menu link hover is gray** — overlay links use `group-hover:text-accent`
   (`#525252`); confirmed against every `hover:` in `src/` (nav, overlay,
   socials, lightbox, cards) — all gray or transform-only.
4. **VCR OSD Mono for navigation, menu links and the About prose** —
   self-hosted `public/fonts/VCR_OSD_MONO.woff` (23 KB, one 400 weight,
   preloaded in `index.html`), `fontFamily.vcr` token in
   `tailwind.config.js`. Applied to: the nav row (`MENU WORK ABOUT`), the
   four overlay links (resized to `clamp(2.6rem, 8.5vw, 6.75rem)`, weight 400
   — the font has no bold), and the three About biography paragraphs. The
   skill's `mono` rule is waived with an inline `taste-skill-ignore` comment
   in `index.css` and `--allow mono` in the inspector runs — the face is a
   client requirement, so it is brand, not a tell.

## 0aa. Revision 3 — monochrome + mac-window chrome + scramble (client request)

Six changes requested and shipped:

1. **Top nav without HOME/CONTACT buttons** — `Navigation.jsx` now renders
   `MENU + WORK + ABOUT` only (from `navSections` in `src/data/portfolio.js`).
   HOME and CONTACT moved into the full-screen menu overlay
   (`MenuOverlay.jsx` → HOME · WORK · ABOUT · CONTACT). Deep links
   (`?menu=1`, `#/contact`) still work.
2. **Strictly monochrome palette** — white main, black second, gray complement.
   Tokens everywhere: canvas `#FFFFFF`, ink `#111111`, mute `#737373`,
   accent `#525252`, line `#E5E5E5`, surface `#F5F5F5`. The old coral `#E85D4A`
   and warm-paper set are gone from `index.css`, `tailwind.config.js`,
   `index.html` (theme-color + body bg), `public/favicon.svg` (black bg, white m),
   `Mascot.jsx` (m body `#D4D4D4`, blush `#B8B8B8`), `ThreeVisual.jsx`
   (dot `0x525252`, fallback blob `#525252`), `WorksArt.jsx`, all `art/*.svg`
   (grayscale recolour), and `HomeSection.jsx` (star `#A3A3A3`, squiggle `#737373`).
3. **Work header centred, caption removed** — `WorkSection.jsx` header is a
   centred column: small microlabel, `MAMUU` wordmark, `Works` title. The line
   "Six pieces. Hover for a title, click to step closer." is deleted.
4. **Mac-style window frames around the work images** — `ArtworkCard.jsx` wraps
   each piece in a rounded card with a title bar of three gray dots
   (`bg-mute/40`), like a macOS window. `ArtworkLightbox.jsx` uses the same
   chrome, with the close ✕ inside its title bar. **No borders anywhere** —
   the chrome is built from tone steps (`bg-surface` card on `#FFFFFF` canvas),
   because 1 px outlines fail both `lint.mjs` (`hairline`) and `inspect.mjs`
   (`outlined-box`).
5. **Contact rebuilt without the giant MAMUU** — `ContactSection.jsx` is one
   `min-h-svh` viewport: `CONTACT` h1 (`clamp(3.4rem, 12vw, 11rem)`), short
   copy, a black pill mailto button **"Start a project"**, social links
   (X · Instagram · VGen), caption, and the footer row inside the section.
   The huge wordmark footer is gone. The pill button also fixes the
   `empty-screens` / `first-action` inspector findings.
6. **Scramble-in text effect on first open** — new `ScrambleText.jsx`
   (requestAnimationFrame, 30 fps throttle, glyph set `#%&@$+=*XYZMWAQK`,
   settles left-to-right). Applied to nav labels, home "m" + tagline,
   work MAMUU + `Works`, about h1 + biography + tagline, contact h1 + copy +
   caption. Accessible: `aria-label={text}` on the live element;
   `prefers-reduced-motion` renders the final text immediately.

Also fixed in this revision:

- **About tagline contrast** — `text-mute` (`#7373737` on white ≈ 4.3:1)
  → `text-ink/80`, passes the contrast check.
- **About biography stagger** — the sentence splitter regex is now exactly
  `/[^.]+\./g` (the earlier pattern had an escaping bug); the bio reveals as
  three sentences.
- **Six work PNGs regenerated** at 1600×900 from the grayscale SVGs
  (`public/images/works/work-01..06.png`), so the raster assets match the
  monochrome art.

## 0ab. Revision 2 — separate pages

Historical (kept for context):

1. Centred navbar row; active-page accent dot.
2. Hash routing in `App.jsx` (`PAGES`, `pageFromHash()`): `#/` home,
   `#/work`, `#/about`, `#/contact`; deep links work; `navigate()` swaps the
   hash, closes the menu, scrolls to top.
3. About page: no image, centred `min-h-svh`, sentence-by-sentence reveal.

Consequences from that round, still true: per-page `h1`s; deleted unused
`src/lib/scrollTo.js` + `CharacterPortrait.jsx`; home idle micro-motion loops;
`SocialLinks.jsx` `animated` prop.

## 1. Direction

**The idea: the "m" creature and the star — Mamuu's name and mark, in pure
grayscale.**

Mamuu's name is drawn as a creature — an "m" with eyes. The mark recurs:

1. **Home hero (rev 20)** — the client's own SVG logo, played once as a
   Three.js intro (a tiny circle fades in at the canvas centre and grows
   only to a **medium** size → spinning
   asterisk → the medium disc swelling INTO the stardust while the whole star
   drifts centre → left →
   glyphs rising from behind
   the stardust and sliding right, with the katakana マムー at its original
   spot;
   asterisk on top, burst under it, glyphs at the bottom) inside the `h1`,
   sized down per client (`w-[min(76vw,760px)]`); the rev 9 abstract Y2K
   wireframe star still turns faintly behind it, slightly tilted. The
   solid-black round contact buttons hang below, bobbing like water waves.
2. **Gallery art** — all six placeholder works redrawn around the same creature
   (poster, sticker sheet, riso print, zine spread, palette study, pattern
   tile), grayscale SVG → 1600×900 PNG. No stock imagery anywhere.
3. **Menu** — since rev 27 the geometry is a **full-screen background at
   the home star's size** of **lines only**, shaped as the home star: the
   six-pointed silhouette with the home star's proportions (longer
   top/bottom spikes, SPIKE 3.2 / SIDE 1.95 / INNER 0.85, per-point jitter)
   drawn as a slanted dashed line-wireframe — four counter-rotating echoes
   of one shared `EdgesGeometry` (three ink + one deepest-gray), no solid
   fills, the lines fined down to the home star's faint reading (rev 28)
   — spanning ≈ 1.9× the half-height at every width (the same size
   class as the home star: spikes run past all four edges at rest, on
   desktop and phone alike — it never shrinks), with **every corner
   shrinking/growing at random** (six independent clocks, ±15%, valleys
   still), the stardust dust field kept, a held slant with a slow sway,
   breathing and pointer tilt.

Type (rev 4 + rev 10 + rev 12): **VCR OSD Mono** (nav row, menu links, About
prose, work card titles + lightbox title/description —
client requested, self-hosted 400-weight WOFF; all VCR strings render
UPPERCASE via a global rule since rev 29) + **Aurix** (display, the
four remaining headline wordmarks — work, about, contact, menu — the
Work page's `Works` label returned to VCR OSD Mono in rev 29; home now
shows the client's SVG logo instead — client supplied, rev 10, self-hosted
regular 400)
+ **Space Grotesk** (display fallback + everything not listed) + **DM Sans**
(text). Micro-labels are small, uppercase, letter-spaced. Palette
(revision 3, client-specified, strictly monochrome): canvas `#FFFFFF`, ink
`#111111`, mute `#737373`, accent `#525252`, line `#E5E5E5`, surface `#F5F5F5`
— white is the main, black the second voice, grays do all the supporting work.

Revision 6 extends VCR OSD Mono to **all Contact text except the
`LET'S CONNECT` display headline** (copy, pill button, microlabel, footer).

The Japanese body text was removed in revision 5 (client request): the
`KatakanaMark.jsx` SVG component was deleted and all references dropped.
Revision 16 reintroduces the client file's small マムー beside the home
wordmark (canvas texture + a self-hosted 3-glyph woff2 subset) — the one
deliberate exception, requested by the client. Revision 17 draws it with
Aurix first in the font stack, per client (Aurix has no kana, so the subset
still paints it).

## 2. Live thing

**Home (rev 14):** the wireframe star is pointer-reactive — moving the cursor
tilts it toward the pointer while the group drifts on all three axes. Its six
spikes alternately stretch and shrink on opposing sine phases (geometry
rebuilt at a 30 fps throttle), so the silhouette keeps trading long and short
points (`src/components/StarVisual.jsx`; reduced motion renders one static
frame; no WebGL falls back to a flat elongated-star SVG). The brand mark is
the client's SVG logo, played once as a Three.js intro (`LogoIntro.jsx`,
rev 20): a tiny circle fades in at the canvas centre, grows to a medium size (never full) →
spinning asterisk onto the medium disc → the disc swelling INTO the stardust while
the whole star drifts centre → left → glyphs with the
katakana マムー rising from behind the stardust and sliding right; reduced motion
renders the settled lockup immediately; errors fall back to a static logo
image).

**Text is alive too (revision 3):** every headline and label scrambles into
place on first open via `ScrambleText.jsx` — rAF-driven character shuffle at a
30 fps throttle, settling left-to-right, final text exposed to screen readers
through `aria-label`, and skipped entirely under `prefers-reduced-motion`.
Since rev 14 the home `h1` is exempt: it is the logo canvas and never
scrambles.

`Mascot.jsx` (the old pointer-tracking eyes) lost its last import in rev 7 and
is currently unused; the file is kept on disk in case the creature returns.

## 3. Verification — honest results (post-revision-20, production build)

### Build
`npm run build` — **passes**. Main bundle ~821 KB: since rev 14 `LogoIntro`
imports Three.js directly, so the library now ships in the main chunk
(`StarVisual` 2.7 KB and `ThreeVisual` 5213 B ≈ 5.1 KB — the menu dashed
line star since rev 24/28 — remain lazy chunks).
The chunk-size warning is expected and accepted.

### lint.mjs — 0 FAIL · 1 WARN
| Level | Rule | Verdict |
|---|---|---|
| WARN | em-dash | Accepted — comments and copy only, no visual impact |

### inspect.mjs — per page, 0 FAIL everywhere
Production build served by `vite preview` (port 4199). Runs use
`--allow few-pictures,mono` (home / about / contact) and `--allow mono` (work)
— see the defenses below.

| Page | Result | Remaining warns | Defense |
|---|---|---|---|
| Home `#/` | **0 FAIL** · 5 WARN | `first-action`, `no-footage`, `no-hero`, `small-title`, `still-page` | Portfolio pages lead with identity; MENU is the first control. No honest footage exists for a not-yet-real artist catalogue. `font-not-dealt` (flaky — present since rev 18, absent this run): the meter's randomly dealt specimen sheet was Imbue/Albert Sans while the page renders VCR OSD Mono — VCR is the deliberate client-requested identity face (rev 4), not an undealt default. `no-hero`/`small-title` (rev 14): the h1 *is* the hero — the client's SVG logo rendered on a canvas with sr-only text, so the meter can't measure a "large text" title. The intro (a tiny circle fading in at the centre → growth to a **medium** size → asterisk
→ the medium disc swelling INTO the stardust while the star drifts centre → left → glyphs + マムー rising from behind the stardust and sliding right),
the morphing star
and the wave bob keep 10 elements moving — `still-page` fires only because the hero is a single viewport with no scroll. `few-pictures` is allowed because the gallery is its own page (`#/work`, 6 real raster works); home is a hero, not the catalogue. |
| Work `#/work` | **0 FAIL** · 6 WARN | `micro-label`, `first-action`, `no-footage`, `small-title`, `name-only-title`, `still-page` | The huge `MAMUU` + `Works` header *is* the wordmark-as-title device; the microlabel is the client brand requirement — set in VCR OSD Mono again, pulled tighter under the wordmark (rev 29). Pieces animate in and the lightbox opens — the grid isn't inert. `font-count` cleared in rev 12 (imagery text shares the system faces). |
| About `#/about` | **0 FAIL** · 4 WARN | `first-action`, `name-only-title`, `no-footage`, `still-page` | Same brand/footage defenses. Rev 6 removed the dot and tagline at the client's request — the page is deliberately sparse; 9 elements still move (staggered nav labels, scrambled h1, four sentence blocks). `few-pictures` allowed — the page's one artwork is the client's own OC line-art SVG (rev 30 backdrop), which the meter counts as a drawing rather than a raster picture; the gallery lives at `#/work`. |
| Contact `#/contact` | **0 FAIL** · 4 WARN | `micro-label`, `no-footage`, `off-centre`, `still-page` | Microlabel is brand; no footage exists; staggered nav + scramble + button hover give motion. `off-centre` is a 16 px difference between the optical edges of the centred display headline — letterform side-bearings, not a layout error. `few-pictures` allowed — contact is a single call-to-action viewport by design. |

`mono`: VCR OSD Mono is the client-requested brand face (rev 4) — waived with
an inline `taste-skill-ignore` comment on the `@font-face` line and the
`--allow mono` flag. `font-count`: cleared since rev 12 — the imagery text
dropped its dedicated display usage and the page ships the two
client-requested faces (VCR OSD Mono, Aurix) over the two system faces
(Space Grotesk, DM Sans), same total the meter stopped counting.

### Screenshot review (headless Chrome)
Reviewed after the final build, every listed capture opened:

- Home desktop + mobile fold (rev 20): the client's SVG logo, sized down per
  client — black starburst, light asterisk on top, three light glyphs under
  the burst, the small katakana マムー beside the wordmark's end — settled
  over the faint rev 9 wireframe star; three **solid-black circular buttons
  with white icons** below it (x · instagram · email), centred VCR nav above
  (MENU · WORK · ABOUT). All six intro phases screenshot-verified via the
  `?logoT` freeze (tiny dot at the canvas centre → visibly mid-growth →
  medium disc with the asterisk landing, still centred → the medium disc
  transforming into the stardust while drifting left, glyphs + マムー
  emerging from behind it to
  the right → glyphs nearly landed at the left home →
  settled, unchanged from rev 19) at 1440×900 and 390×844; the static fallback SVG
  (WebGL-off path) verified standalone, katakana rendering through its
  embedded data-URI font.
- Work desktop fold: centred MAMUU (Aurix) with the `Works` label in
  VCR OSD Mono tight beneath it (rev 29), six mac-window cards with three gray dots each; hover/focus
  title chips in VCR OSD Mono (rev 12); grayscale art.
- About desktop + mobile fold (rev 30): the client's own OC line art as a
  full-screen backdrop at 15% opacity — the black lines read as gray under
  the words (`object-contain`, the whole character always inside the
  frame, nothing cropped); centred word page, biography set in VCR OSD
  Mono, no nav dot, no accent dot under the heading and no tagline (rev 6).
- Contact desktop + mobile fold: `LET'S CONNECT` in display face,
  stepped down and word-spaced (rev 28), **every
  other line in VCR OSD Mono** (rev 6); black pill "Start a project"; socials
  row; footer row inside the viewport.
- **Menu overlay (`?menu=1`, re-verified in rev 4 via CDP with real settle
  time at 1440×900 and 390×844):** HOME · WORK · ABOUT · CONTACT all settled
  and legible in VCR OSD Mono, the full-bleed dashed line-wireframe
  star behind (rev 27, at the home star's size, corners pulsing at random),
  fully monochrome.
- Console clean.

## 4. Features

- **Four pages, hash-routed** — `#/`, `#/work`, `#/about`, `#/contact`;
  deep-linkable, one section mounted at a time, fade between pages, scroll
  resets to top.
- **Home** — the client's SVG logo as a one-time Three.js intro
  (`LogoIntro.jsx`: a tiny circle fades in first, then grows slowly to full
  size → spinning asterisk →
  the disc dissolving in place as the starburst takes over → glyphs sliding in from
  the side, with the katakana マムー at its original spot via a
  canvas texture + self-hosted 3-glyph woff2 subset, Aurix first in the stack —
  rev 17; asterisk on
  top, burst under it, glyphs at the bottom — rev 15; growth stays a staged
  beat while the disc swells into the stardust, the star drifts centre →
  left and the glyphs rise from behind it sliding right, ~1.9 s — rev 20;
  plays once per page
  load, `?logoT=<t>` freezes it for screenshots, reduced motion renders the
  settled lockup, errors fall back to a static logo image), the abstract Y2K
  wireframe star backdrop behind it (lazy `StarVisual`: long
  top/bottom spikes that alternately stretch and shrink on opposing phases,
  two counter-rotating layers, axis drift, geometry rebuilt at 30 fps), and
  the three contact buttons below as solid-black circles with white icons
  bobbing on the `.socials-wave` keyframes (rev 9); all degrade under reduced
  motion.
- **Navigation** — fixed, centred, set in VCR OSD Mono: MENU + WORK + ABOUT,
  no active dot (rev 4); labels enter with a staggered rise (rev 6);
  `aria-current` kept for screen readers; skip link to `#main`. HOME and
  CONTACT live in the overlay.
- **About** — the client's own OC line art SVG as a full-screen fixed
  backdrop at 15% opacity so the ink reads gray (rev 30,
  `object-contain`, nothing cropped, decorative `aria-hidden` img); heading +
  biography over it: the accent dot and tagline were removed in rev 6
  (client request); sentences still reveal staggered.
- **Contact** — display headline `LET'S CONNECT` set in Aurix (rev 10),
  stepped down a size class and word-spaced (rev 28);
  every other line (copy, pill button, microlabel, footer) is VCR OSD Mono
  (rev 6).
- **Work** — six slots, 16:9, 3/2/1-col rhythm, **mac-window cards** (rounded
  tone-step frame, three-dot title bar, no borders); `Works` microlabel in
  VCR OSD Mono again, pulled tighter (`-mt-3`) under the wordmark (rev 29;
  Aurix rev 28, VCR rev 11); card titles + lightbox title/description in VCR
  OSD Mono (rev 12); **accessible lightbox**
  (ESC + backdrop close, focus trap, focus restored, same window chrome).
- **Menu overlay** — full-screen; wordmark `MAMUU` in Aurix, compact
  display size (rev 12, down from rev 11's larger cut); the `ThreeVisual`
  wrapper loads lazily on first open (Three.js itself ships in the main
  bundle since rev 14) and is fully disposed on close; since rev 27 the
  visual is the full-bleed dashed line-wireframe star family (the
  home star's proportions, slanted, corners pulsing at random, four
  counter-rotating echoes, lines fined to the home star's delicacy in
  rev 28); ESC to close; focus
  trap; body scroll locked; reduced-motion and no-WebGL fallbacks; deep link
  `?menu=1`.
- **ScrambleText** — first-open decode effect on headlines/labels (§2),
  a11y-safe, reduced-motion-safe.
- **Responsive** — verified 1440 / 768 / 390; no horizontal overflow.
- **Reduced motion** — `MotionConfig reducedMotion="user"` + per-element
  fallbacks; idle loops, staggers, and scramble degrade gracefully.
- **A11y** — semantic landmarks, one `h1` per page, `aria-current` on nav,
  aria-labels, focus management, dialog semantics.

## 5. Placeholders to swap with real content

Everything client-specific lives in **`src/data/portfolio.js`** (single config
file):

| What | Where |
|---|---|
| 6 work images (grayscale placeholders, 1600×900) | `public/images/works/work-01.png … work-06.png` (originals as SVG in `art/`) |
| Work titles + descriptions | `src/data/portfolio.js` → `works` |
| Nav labels (top bar + overlay) | `src/data/portfolio.js` → `navSections` (top bar), `sections` (overlay) |
| Email + social URLs (X, Instagram, VGen) — **real accounts since rev 13**: `sayhitomamuu@gmail.com`, `x.com/mamsenpai`, `instagram.com/mamsenpai`, `vgen.co/mamsenpai` | `src/data/portfolio.js` → `socialLinks` |

Note: the About page's only imagery is the client's own OC line-art backdrop
(rev 30) — no portrait photograph (client decision); the old
`public/images/character/character.png` is unused and can be deleted.

## 6. File map

```
mamuu-portofolio/
├── REPORT.md                  ← this file
├── index.html                 (title: "Mamuu — Artist Portfolio"; #FFFFFF theme)
├── package.json               (name: mamuu-portofolio)
├── art/                       ← 7 grayscale SVG sources for the placeholder PNGs
├── public/fonts/              ← VCR_OSD_MONO.woff (self-hosted, 400 only,
│                                preloaded) + Aurixfree-Regular.otf (rev 10)
│                                + mamuu-katakana.woff2 (rev 16: 3-glyph
│                                マムー subset for the intro texture)
├── public/images/works/       ← work-01..06.png, 1600×900 (swap targets)
├── public/images/logo/        ← mamuu-logo-black.svg (rev 14 static logo fallback; rev 16 adds マムー with embedded font)
├── public/images/about/       ← mamuu-oc.svg (rev 30: the client's own OC line art, full-screen About backdrop)
├── public/favicon.svg         (black bg, white m)
├── src/
│   ├── App.jsx                ← hash router (PAGES, pageFromHash, navigate), ?menu=1
│   ├── data/portfolio.js      ← ALL content + links + navSections/sections (edit here)
│   ├── assets/mamuu-logo.svg  ← client SVG verbatim (rev 14; ?raw source for LogoIntro)
│   ├── components/
│   │   ├── Navigation.jsx     ← centred MENU + WORK + ABOUT in VCR OSD Mono (no dot, staggered entrance)
│   │   ├── ScrambleText.jsx   ← first-open decode effect (rAF, 30 fps, a11y-safe)
│   │   ├── LogoIntro.jsx      ← rev 20 home intro: client SVG → Three.js (tiny circle at centre grows to a MEDIUM size → asterisk → disc swells INTO stardust + star drifts centre→left → glyphs + マムー rise from behind sliding right, Aurix-first; asterisk on top)
│   │   ├── StarVisual.jsx     ← rev 9 home backdrop: morphing Y2K wireframe star (lazy wrapper)
│   │   ├── ArtworkCard.jsx    ← mac-window card (tone steps, 3 dots, no border)
│   │   ├── ArtworkLightbox.jsx (window-style dialog, ✕ in title bar)
│   │   ├── WorksArt.jsx       ← grayscale SVG artwork for the six slots
│   │   ├── Mascot.jsx         ← UNUSED since rev 7 (kept on disk, no imports)
│   │   ├── SocialLinks.jsx    ← optional `animated` stagger; rev 7 adds rings via className
│   │   ├── MenuOverlay.jsx    ← HOME/WORK/ABOUT/CONTACT (lazy Three.js full-screen line star, focus trap)
│   │   └── ThreeVisual.jsx    ← rev 28 menu star: home-proportioned six-point silhouette (SPIKE 3.2 / SIDE 1.95 / INNER 0.85, jitter) as full-bleed slanted fine-dashed line-wireframe, lines fined to the home star's faint reading (scale 2.4 at both widths — the home star's size, spikes run past the edges) — 4 counter-rotating echoes of one shared EdgesGeometry whose corners pulse at random (6 clocks, ±15%), dust field; posed frame for reduced motion + flat SVG fallback; full disposal incl. mote texture (lazy; three in main bundle)
│   └── sections/
│       ├── HomeSection.jsx    (rev 20: client SVG logo intro — circle at centre grows to medium → swells into stardust + drifts left → glyphs + マムー rise from behind sliding right, sized down + Y2K star backdrop + black round wave socials)
│       ├── WorkSection.jsx    (centred MAMUU + VCR `Works` label pulled tight, 6 mac-window cards)
│       ├── AboutSection.jsx   (client OC line art as full-screen 15%-opacity backdrop, centred VCR prose over it, sentence stagger, no dot/tagline)
│       └── ContactSection.jsx (one viewport, all-VCR text except the display headline; footer mamuu-work)
└── .taste-skill/              ← inspect/ screenshots + report.json; menu/ overlay shots
```

Deleted earlier: `src/lib/scrollTo.js`, `src/components/CharacterPortrait.jsx`.

## 7. Known limitations

- Three.js is heavy — since rev 14 it ships inside the main bundle (~821 KB
  total) because `LogoIntro` imports it directly; inherent to Three.js.
- The home logo intro (rev 20) needs WebGL: under `prefers-reduced-motion`
  it renders the settled lockup immediately (`applyFinal()`), and on error
  or missing WebGL it falls back to the static
  `public/images/logo/mamuu-logo-black.svg`.
- Placeholder art is original but **must** be replaced with Mamuu's real work
  before launch. Social URLs and the email are the client's real accounts
  since rev 13 (`src/data/portfolio.js` → `socialLinks`).
- Do not add borders to the window frames — the chrome is tone-step based on
  purpose (`lint.mjs` `hairline` and `inspect.mjs` `outlined-box` both fail on
  1 px outlines). Keep using `bg-surface` / `bg-line` for structure. (The
  home social buttons are the client-requested exception — since rev 8 they
  are solid black circles with white icons; they passed both checks.)
- Hash routing (`#/work`) was chosen over a router dependency to keep the
  build dependency-free; if real paths (`/work`) are wanted later, swap in a
  router and server rewrites.
- VCR OSD Mono ships with a **single 400 weight** — no bold/italic exists.
  Emphasis in the VCR-set text must come from size or colour, not weight.
- `npm run preview` uses port 4199 in this environment; a second preview runs
  on 4173. (Earlier note: 4173 was held by a ghost `vite preview` of the
  deleted first copy `/root/mammu-porto`, which served the old orange build —
  that stale server was killed and 4173 now serves this project.)
