# Public-readiness review — 2026-09-23

Scope: remove import notices from all lessons, preserve author credit, repair web references and verify reader-facing rendering and interactions.

## Editorial and mathematical corrections

- GBM: prices are Lognormal; log returns are Normal under constant parameters.
- Bachelier: the displayed zero-drift process is a forward under constant interest rates, not an arbitrary spot process.
- BAW: premium PDE holds in the continuation region; select the positive root using the zero-price boundary. State displayed American Call formula domains and the zero-rate BAW limit.
- Replace obsolete source section numbers with the corresponding web topics and number figure captions consistently.
- Preserve the original downloadable PDF; corrections in this review apply to the web lessons.

Primary implementation references for American Call domain checks:
- https://github.com/lballabio/QuantLib/blob/master/ql/pricingengines/vanilla/baroneadesiwhaleyengine.cpp
- https://github.com/lballabio/QuantLib/blob/master/ql/pricingengines/vanilla/bjerksundstenslandengine.cpp

## Implementation

- Keep equation labels and produce numbered cross-page links; reject invalid math and missing local fragment targets during build/export.
- Repair glossary headings and home heading hierarchy.
- Use actual mobile viewport settings and include light/dark color-contrast checks.
- Fix negative/zero Bachelier strike grids and incompatible model switching; label the discounted-intrinsic comparison explicitly.

## Verification

Run `npm test`, `npm run build:pages`, and `npm run check:site` with the project preview running. The latter includes negative/zero-price model-switch regression checks at desktop/mobile widths. Publication must additionally verify the Publish book workflow and live pages.
