# Mamuu — Artist Portfolio · Final Report

React portfolio for the artist **Mamuu** (wordmark `MAMUU`).
Stack: Vite · React · Tailwind CSS · Framer Motion · Three.js (lazy chunk).

```bash
npm install
npm run dev      # dev server
npm run build    # production build (passes)
npm run preview  # port 4199 in this environment
```

---

## 0. Revision 12 — calmer menu wordmark + VCR titles on work imagery (client request)

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

## 0a. Revision 11 — bigger menu wordmark + Works label in VCR (client request)

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

## 0b. Revision 10 — Aurix display face for the five wordmarks (client request)

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

## 0c. Revision 9 — alternating spike morph + bigger star (client request)

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

## 0d. Revision 8 — abstract Y2K star + solid-black social buttons (client request)

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

## 0e. Revision 7 — 3D star hero + MAMUU scramble + wave socials (client request)

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

## 0f. Revision 6 — about/home trim + all-VCR contact (client request)

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

## 0g. Revision 5 — remove all Japanese text (client request)

The katakana label (drawn as SVG) is removed everywhere: the floating mark
next to the home wordmark, both marks in the menu overlay, the
`japaneseLabel` data field, and the `KatakanaMark.jsx` component itself
(deleted). Verified on the production build: zero Japanese characters in the
rendered DOM on home and menu, `npm run build` clean, lint 0 FAIL, inspect
home 0 FAIL / 3 WARN (same three defensible warns as before). Report and
README no longer reference the label.

---

## 0h. Revision 4 — VCR OSD Mono + final polish (client request)

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

## 0i. Revision 3 — monochrome + mac-window chrome + scramble (client request)

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

## 0j. Revision 2 — separate pages

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

1. **Home hero (rev 9)** — an abstract Y2K wireframe star (top and bottom
   spikes stretched long, all six points alternately stretching and
   shrinking) turns faintly behind the `MAMUU` wordmark, slightly tilted;
   the wordmark scrambles into place. The solid-black round contact buttons
   hang below, bobbing like water waves.
2. **Gallery art** — all six placeholder works redrawn around the same creature
   (poster, sticker sheet, riso print, zine spread, palette study, pattern
   tile), grayscale SVG → 1600×900 PNG. No stock imagery anywhere.
3. **Menu** — the Three.js wireframe blob is the creature enlarged: the visitor
   steps *inside* it to navigate. Blob dots render gray (`0x525252`).

Type (rev 4 + rev 10 + rev 12): **VCR OSD Mono** (nav row, menu links, About
prose, `Works` label, work card titles + lightbox title/description —
client requested, self-hosted 400-weight WOFF) + **Aurix** (display, the
five headline wordmarks — client supplied, rev 10, self-hosted regular 400)
+ **Space Grotesk** (display fallback + everything not listed) + **DM Sans**
(text). Micro-labels are small, uppercase, letter-spaced. Palette
(revision 3, client-specified, strictly monochrome): canvas `#FFFFFF`, ink
`#111111`, mute `#737373`, accent `#525252`, line `#E5E5E5`, surface `#F5F5F5`
— white is the main, black the second voice, grays do all the supporting work.

Revision 6 extends VCR OSD Mono to **all Contact text except the
`LET'S CONNECT` display headline** (copy, pill button, microlabel, footer).

The Japanese label was removed in revision 5 (client request): the
`KatakanaMark.jsx` SVG component was deleted and all references dropped.

## 2. Live thing

**Home (rev 9):** the wireframe star is pointer-reactive — moving the cursor
tilts it toward the pointer while the group drifts on all three axes. Its six
spikes alternately stretch and shrink on opposing sine phases (geometry
rebuilt at a 30 fps throttle), so the silhouette keeps trading long and short
points (`src/components/StarVisual.jsx`; reduced motion renders one static
frame; no WebGL falls back to a flat elongated-star SVG). The wordmark
`MAMUU` decodes through the scramble effect on every open.

**Text is alive too (revision 3):** every headline and label scrambles into
place on first open via `ScrambleText.jsx` — rAF-driven character shuffle at a
30 fps throttle, settling left-to-right, final text exposed to screen readers
through `aria-label`, and skipped entirely under `prefers-reduced-motion`.

`Mascot.jsx` (the old pointer-tracking eyes) lost its last import in rev 7 and
is currently unused; the file is kept on disk in case the creature returns.

## 3. Verification — honest results (post-revision-12, production build)

### Build
`npm run build` — **passes**. Main bundle ~286 KB; Three.js sits in one shared
`three.module-*.js` chunk (~492 KB) consumed lazily by both visuals —
`StarVisual` (home, 2.4 KB) and `ThreeVisual` (menu, 2.5 KB) — so the library
is never duplicated. The chunk-size warning is expected and accepted.

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
| Home `#/` | **0 FAIL** · 4 WARN | `first-action`, `name-only-title`, `no-footage`, `still-page` | Portfolio pages lead with identity; MENU is the first control. No honest footage exists for a not-yet-real artist catalogue. The morphing star + scramble + wave bob keep 10 elements moving (rev 9) — the "still" warn fires only because the hero is a single viewport with no scroll. `few-pictures` is allowed because the gallery is its own page (`#/work`, 6 real raster works); home is a hero, not the catalogue. |
| Work `#/work` | **0 FAIL** · 6 WARN | `micro-label`, `first-action`, `no-footage`, `small-title`, `name-only-title`, `still-page` | The huge `MAMUU` + `Works` header *is* the wordmark-as-title device; the microlabel is the client brand requirement (VCR OSD Mono since rev 11). Pieces animate in and the lightbox opens — the grid isn't inert. `font-count` cleared in rev 12 (imagery text shares the system faces). |
| About `#/about` | **0 FAIL** · 4 WARN | `first-action`, `name-only-title`, `no-footage`, `still-page` | Same brand/footage defenses. Rev 6 removed the dot and tagline at the client's request — the page is deliberately sparse; 9 elements still move (staggered nav labels, scrambled h1, four sentence blocks). `few-pictures` allowed — a words-only About page is the client decision, the gallery lives at `#/work`. |
| Contact `#/contact` | **0 FAIL** · 4 WARN | `micro-label`, `no-footage`, `off-centre`, `still-page` | Microlabel is brand; no footage exists; staggered nav + scramble + button hover give motion. `off-centre` is a 16 px difference between the optical edges of the centred display headline — letterform side-bearings, not a layout error. `few-pictures` allowed — contact is a single call-to-action viewport by design. |

`mono`: VCR OSD Mono is the client-requested brand face (rev 4) — waived with
an inline `taste-skill-ignore` comment on the `@font-face` line and the
`--allow mono` flag. `font-count`: cleared since rev 12 — the imagery text
dropped its dedicated display usage and the page ships the two
client-requested faces (VCR OSD Mono, Aurix) over the two system faces
(Space Grotesk, DM Sans), same total the meter stopped counting.

### Screenshot review (headless Chrome)
Reviewed after the final build, every listed capture opened:

- Home desktop + mobile fold (rev 9): faint abstract Y2K star — larger in
  frame, long top/bottom spikes alternating with the shorter side points,
  slight tilt, no satellite dot — behind centred `MAMUU`; three
  **solid-black circular buttons with white icons** below it
  (x · instagram · email), centred VCR nav above (MENU · WORK · ABOUT).
- Work desktop fold: centred MAMUU (Aurix) + `Works` in VCR OSD Mono
  (rev 11), six mac-window cards with three gray dots each; hover/focus
  title chips in VCR OSD Mono (rev 12); grayscale art.
- About desktop fold: centred word page, **white ground**, biography set in
  VCR OSD Mono, no nav dot, no accent dot under the heading and no tagline
  (rev 6).
- Contact desktop + mobile fold: `LET'S CONNECT` in display face, **every
  other line in VCR OSD Mono** (rev 6); black pill "Start a project"; socials
  row; footer row inside the viewport.
- **Menu overlay (`?menu=1`, re-verified in rev 4 via CDP with real settle
  time at 1440×900 and 390×844):** HOME · WORK · ABOUT · CONTACT all settled
  and legible in VCR OSD Mono, gray wireframe blob behind, fully monochrome.
- Console clean.

## 4. Features

- **Four pages, hash-routed** — `#/`, `#/work`, `#/about`, `#/contact`;
  deep-linkable, one section mounted at a time, fade between pages, scroll
  resets to top.
- **Home** — abstract Y2K wireframe star backdrop (lazy `StarVisual`: long
  top/bottom spikes that alternately stretch and shrink on opposing phases,
  two counter-rotating layers, axis drift, geometry rebuilt at 30 fps,
  WebGL/`three` in the shared chunk), `MAMUU` wordmark set in Aurix (rev 10)
  and decoded by `ScrambleText`, and the three contact buttons below as
  solid-black circles with white icons bobbing on the `.socials-wave`
  keyframes (rev 9); all degrade under reduced motion.
- **Navigation** — fixed, centred, set in VCR OSD Mono: MENU + WORK + ABOUT,
  no active dot (rev 4); labels enter with a staggered rise (rev 6);
  `aria-current` kept for screen readers; skip link to `#main`. HOME and
  CONTACT live in the overlay.
- **About** — heading + biography only: the accent dot and tagline were
  removed in rev 6 (client request); sentences still reveal staggered.
- **Contact** — display headline `LET'S CONNECT` set in Aurix (rev 10);
  every other line (copy, pill button, microlabel, footer) is VCR OSD Mono
  (rev 6).
- **Work** — six slots, 16:9, 3/2/1-col rhythm, **mac-window cards** (rounded
  tone-step frame, three-dot title bar, no borders); `Works` microlabel in
  VCR OSD Mono (rev 11); card titles + lightbox title/description in VCR
  OSD Mono (rev 12); **accessible lightbox**
  (ESC + backdrop close, focus trap, focus restored, same window chrome).
- **Menu overlay** — full-screen; wordmark `MAMUU` in Aurix, compact
  display size (rev 12, down from rev 11's larger cut); Three.js lazy
  chunk loads *only* on first
  open and is fully disposed on close; ESC to close; focus trap; body scroll
  locked; reduced-motion and no-WebGL fallbacks; deep link `?menu=1`.
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
| Bio (About page) | `src/data/portfolio.js` → `biography` |
| Nav labels (top bar + overlay) | `src/data/portfolio.js` → `navSections` (top bar), `sections` (overlay) |
| Email address (currently `hello@example.com`, pill button target) | `src/data/portfolio.js` → `socialLinks.email` |
| Social URLs (X, Instagram, VGen — currently `#` placeholders) | `src/data/portfolio.js` → `socialLinks` |

Note: the About page intentionally shows **no portrait** (client decision); the
old `public/images/character/character.png` is unused and can be deleted.

## 6. File map

```
mamuu-portofolio/
├── REPORT.md                  ← this file
├── index.html                 (title: "Mamuu — Artist Portfolio"; #FFFFFF theme)
├── package.json               (name: mamuu-portofolio)
├── art/                       ← 7 grayscale SVG sources for the placeholder PNGs
├── public/fonts/              ← VCR_OSD_MONO.woff (self-hosted, 400 only,
│                                preloaded) + Aurixfree-Regular.otf (rev 10)
├── public/images/works/       ← work-01..06.png, 1600×900 (swap targets)
├── public/favicon.svg         (black bg, white m)
├── src/
│   ├── App.jsx                ← hash router (PAGES, pageFromHash, navigate), ?menu=1
│   ├── data/portfolio.js      ← ALL content + links + navSections/sections (edit here)
│   ├── components/
│   │   ├── Navigation.jsx     ← centred MENU + WORK + ABOUT in VCR OSD Mono (no dot, staggered entrance)
│   │   ├── ScrambleText.jsx   ← first-open decode effect (rAF, 30 fps, a11y-safe)
│   │   ├── StarVisual.jsx     ← rev 9 home backdrop: morphing Y2K wireframe star (lazy three chunk)
│   │   ├── ArtworkCard.jsx    ← mac-window card (tone steps, 3 dots, no border)
│   │   ├── ArtworkLightbox.jsx (window-style dialog, ✕ in title bar)
│   │   ├── WorksArt.jsx       ← grayscale SVG artwork for the six slots
│   │   ├── Mascot.jsx         ← UNUSED since rev 7 (kept on disk, no imports)
│   │   ├── SocialLinks.jsx    ← optional `animated` stagger; rev 7 adds rings via className
│   │   ├── MenuOverlay.jsx    ← HOME/WORK/ABOUT/CONTACT (lazy Three.js, focus trap)
│   │   └── ThreeVisual.jsx    ← gray wireframe blob, full disposal (shares the three chunk)
│   └── sections/
│       ├── HomeSection.jsx    (rev 8: Y2K star backdrop + MAMUU scramble + black round wave socials)
│       ├── WorkSection.jsx    (centred MAMUU + Works, 6 mac-window cards)
│       ├── AboutSection.jsx   (centred on white, no image, VCR prose, sentence stagger, no dot/tagline)
│       └── ContactSection.jsx (one viewport, all-VCR text except display headline)
└── .taste-skill/              ← inspect/ screenshots + report.json; menu/ overlay shots
```

Deleted earlier: `src/lib/scrollTo.js`, `src/components/CharacterPortrait.jsx`.

## 7. Known limitations

- The Three.js chunk is large (~492 KB shared by home star + menu blob) —
  inherent to Three.js; mitigated by lazy loading and by sharing one chunk
  between both visuals.
- Placeholder art is original but **must** be replaced with Mamuu's real work
  before launch; social URLs are `#` and the email is `hello@example.com`
  until real ones are provided.
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
