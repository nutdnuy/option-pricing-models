# Option Pricing Models

A standalone QuantCorner reading site in Thai based on Triphop Mahithitarmmatorn's paper “แบบจำลองการกำหนดราคาออปชัน: จากบาเชอลิเยถึงการประมาณค่าออปชันแบบอเมริกัน”. The site turns the LaTeX paper into five web lessons with searchable equations, source-faithful lattice figures, dark/light themes, and an interactive European Call model explorer.

- Website: https://nutdnuy.github.io/option-pricing-models/
- Repository: https://github.com/nutdnuy/option-pricing-models
- Local project: `~/Desktop/QuantConnet Content/option-pricing-models`

## Run locally

```sh
npm ci
npm test
npm run build:pages
npm run dev
```

The preview runs at http://127.0.0.1:8766/. With it running, use `npm run check:site` for desktop/mobile, accessibility, search, theme, image, and interaction checks.

## Contents

| Source | Lesson |
| --- | --- |
| `intro.md` | Series landing page and model chronology |
| `foundations.md` | Payoff, risk-neutral valuation and Bachelier |
| `european-models.md` | Black–Scholes–Merton, Black-76 and model explorer |
| `lattice-models.md` | Binomial, Trinomial and convergence |
| `american-approximations.md` | Barone-Adesi-Whaley and Bjerksund-Stensland |
| `unifying-theory.md` | Feynman–Kac, Green function and European–American relations |
| `glossary.md` | Stable definitions used across the site |

The original user-supplied PDF is retained under `downloads/`. Generated root HTML/JavaScript and `_site/` are build outputs.

## Public review

The web lessons include documented mathematical and editorial corrections. See [the September 2026 review](data/public-review-2026-09-23.md). Original source figures and the downloadable paper remain unchanged. `build:pages` validates equation references and local anchors; `check:site` checks actual desktop/mobile viewports in light and dark themes.

## Interactive visualizations

Four additional labs bring this series to five interactive labs. Each new lab supports reset, keyboard controls, responsive SVG and offline export. Line charts include a sample-value table.

- [Payoff vs profit](foundations.html#payoff-lab): Signed intrinsic payoff and profit after the user-specified premium; no financing or fees.
- [Normal vs lognormal](foundations.html#distribution-lab): Analytic risk-neutral GBM terminal density and a Normal/ABM endpoint with equal mean and normal volatility S0*sigma; tails cropped only for chart display.
- [Binomial tree](lattice-models.html#tree-lab): CRR up=exp(sigma*sqrt(dt)), down=1/up, q=(exp(r*dt)-down)/(up-down); backward induction and American exercise max. No dividend.
- [Convergence](lattice-models.html#convergence-lab): European CRR versus BSM Call/Put with identical parameters, prices at steps 5,10,...,N.

Implementation: `src/interactive-viz.jsx`, `src/viz-math.mjs`, and `src/viz-ui.jsx`. See `data/interactive-viz-provenance.json` for methods and assumptions. Numerical checks run through `npm test`; browser and offline checks through `npm run check:site`.
