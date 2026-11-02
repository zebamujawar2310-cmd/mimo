# Brand assets (installed ✅)

| File in `public/`   | Original file (workspace)        | Used for                   |
| ------------------- | -------------------------------- | -------------------------- |
| `hero-bg.webp`      | `made-in-china.webp` (copy kept) | Hero section background    |
| `product-video.mp4` | `operation-vid_new.mp4` (copy kept) | "See it in action" section |

Both assets are installed and referenced by the site. The originals remain
in the project root as backups.

Notes:

- If you replace an asset, keep the same `public/` filename (or update the
  references in `src/components/site/hero.tsx` and
  `src/components/site/video-showcase.tsx`).
- The site never breaks if an asset goes missing — the hero falls back to a
  dark branded background and the video shows a placeholder panel.
- Recommended: keep `product-video.mp4` under ~25 MB and `hero-bg.webp`
  optimized for fast mobile loading.
