# Tower journey revision

The owner clarified that the development comprises 43- and 53-storey towers. These heights are now recorded in project.towers. Other project facts remain pending.

The opening has been replaced with a single pinned, scroll-scrubbed architectural journey: Perspective → Arrival → Ascent → Within. Scroll controls image movement, layered image masks, crossfades, upward facade travel and editorial copy. Chapter controls jump to settled views; Skip journey reaches the project introduction. The sequence reverses with upward scrolling. GSAP matchMedia rebuilds for desktop/mobile and removes pinning for reduced motion. Without JavaScript, four semantic image-led chapters remain in normal document flow.

## Changed

- src/components/journey/tower-journey.tsx — camera-like scroll timeline, chapter controls and accessible active scene state.
- src/components/journey/journey.css — full-screen scenes, mobile composition and static fallback.
- src/data/journey.ts — scene copy and replaceable conceptual media.
- src/data/project.ts — supplied tower heights and revised narrative.
- src/data/assets.ts — tower imagery replaces villa-like imagery.
- src/components/hero/hero.tsx — compatible entry point into TowerJourney.
- src/components/editorial/project-introduction.tsx — tower narrative and confirmed height facts.
- public/images/towers-concept.webp, arrival-concept.webp, residence-concept.webp — original generated concepts, about 735 KB total before Next image variants.
- tests/journey.spec.ts and tests/phase2.spec.ts — updated scroll and accessibility coverage.

The recording was inspected more closely at 2–30 seconds, revealing its city → tower → residence/interior progression. No frames, branding or proprietary property assets were incorporated.

These are labelled visual concepts with camera-like 2D motion, not a verified 3D model or an accurate walkthrough of approved plans. Actual geometry, interiors and views can replace the concept media through the asset configuration. The earlier concept image remains on disk but is no longer referenced by the live page.

## Verification

Production build, ESLint and TypeScript passed. Ten Chrome browser checks passed, covering pinned progress in all four chapters, reverse chapter navigation, skip target, theme transition, mobile progression, preference changes removing the pin, 320–1920px overflow, focus trapping/return, reduced motion and no-JavaScript content. Desktop and mobile screenshots inspected. Chapter jump positions were refined to land on fully revealed text.
