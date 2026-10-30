# mamuu-portofolio

**Mamuu — Artist Portfolio.** A personal portfolio for an independent illustrator
and character artist: oversized typography, an original m-shaped mascot
(`Mamuu OC`), six artwork slots with an accessible lightbox, and a full-screen
menu guarded by a small Three.js companion.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Stack

- React 18 + Vite 5 (JavaScript / JSX)
- Tailwind CSS 3
- Framer Motion (interface + section transitions)
- Three.js (menu visual only, hand-rolled — no R3F)
- Lucide React (close icons), self-drawn SVGs everywhere else
- Fonts: Space Grotesk (display) + DM Sans (text), self-hosted via Fontsource

## Make it yours

Everything personal lives in **`src/data/portfolio.js`**:

- name, wordmark (`MAMUU`), biography (currently temporary copy)
- social links — X, Instagram, Email, VGen (placeholders until real accounts exist)
- the six gallery entries

### Artwork

Drop real artwork into `public/images/works/` as `work-01.webp … work-06.webp`
(16:9, ~1600×900), then set each entry's `image` in `src/data/portfolio.js`.
While `image` is `null`, an original SVG placeholder scene is rendered — no slot
is ever empty.

### Character

Drop the real `Mamuu OC` illustration into `public/images/character/` and set
`portfolio.characterImage`. Until then an original SVG character is shown.

## Structure

```
src/
├── components/    Navigation, MenuOverlay, ThreeVisual, SocialLinks,
│                  ArtworkCard, ArtworkLightbox, Mascot, CharacterPortrait, WorksArt
├── sections/      Home, Work, About, Contact
├── data/          portfolio.js — all content and links
├── lib/           scrollTo helper
├── App.jsx        section order, active-section tracking, menu state
├── main.jsx
└── index.css      tokens, base styles, reduced-motion fallbacks
```

## Notes

- Full-screen menu: Escape closes, focus is trapped and restored, scroll is
  locked while open. The Three.js scene only exists while the menu is open and
  is fully disposed on close; with reduced motion it renders a single still
  frame; without WebGL it falls back to a flat SVG shape.
- Lightbox: Escape / backdrop click close, focus trap, focus returns to the
  artwork card.
- `prefers-reduced-motion` is respected globally (CSS + Framer Motion
  `MotionConfig` + a still Three.js frame).
- Placeholders: social URLs, biography, artwork titles and descriptions are
  sample content — replace before launch.
