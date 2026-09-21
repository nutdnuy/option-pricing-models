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
