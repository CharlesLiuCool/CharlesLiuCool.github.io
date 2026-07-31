---
name: graphing-components
description: How to embed math graphs/plots in MDX notes/projects on this site
metadata:
  type: reference
---

Two reusable graphing components live in `src/components/research/`, usable from any MDX note/project by importing them.

- **`Plot.astro`** — build-time static function plotter (no client JS). Pass `curves` as real JS functions (evaluated at build), `points`, `domain`/`range` (range auto-fits), `xLabel`/`yLabel`/`caption` (KaTeX), optional `xTicks`/`yTicks`. Colors are token names: `accent`, `info`, `positive`, `caution`, `negative`, `muted` — theme-aware automatically. Multi-statement arrow bodies work in MDX props: `fn: (x) => { ...; return s; }`.
- **`Interpolator.astro`** — interactive Lagrange playground (self-contained vanilla JS, one instance per page). Draggable nodes (vertical), live polynomial, optional basis-polynomial overlay + reset. Props: `points`, `domain`, `range`, `basis`, `caption`.

Both match the paper-and-ink design tokens in `src/styles/tokens.css` and render KaTeX at build time like the other research components. Example usage is in `src/content/notes/low-degree-extension.mdx` (Lagrange basis, arbitrary-table LDE, multilinear χ₀/χ₁).
