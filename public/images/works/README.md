# Artwork images

The six current files are **generated placeholders** — original illustrations
drawn for this project (sources live in `art/*.svg`, rasterized at 1600×900).

Replace them with real artwork, same names, and no code change is needed:

```
work-01.png … work-06.png   (16:9, ~1600×900, under ~300 KB)
```

WebP also works: change the `image` paths in `src/data/portfolio.js`.
If an entry's `image` is set to `null`, the site falls back to the inline
SVG scene in `src/components/WorksArt.jsx` — no slot is ever empty.
