# Editing the site

Edit the root Markdown lessons, `_toc.yml`, `_config.yml`, `src/`, and maintained assets. Root HTML, `app.js`, `site.js`, `search-index.js`, `build-manifest.json`, and `_site/` are generated.

The model explorer uses `src/math.mjs` and `src/option-lab.jsx`. Lattice figures are generated from `scripts/gen_figures.py`; their web exports live in `assets/images/source-figures/`.

## Checks

```sh
npm test
npm run build:pages
npm run dev
npm run check:site
git diff --check
```

Keep payoff distinct from profit and option premium. State the model, units, assumptions, and whether a value is simulated or observed. Changes to formulas require numerical checks; changes to layout or interaction require desktop and mobile browser checks.
