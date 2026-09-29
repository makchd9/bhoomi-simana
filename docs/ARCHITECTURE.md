# Architecture & delivery

Current status: Phase 2 is implemented. See [PHASE-2.md](PHASE-2.md) for the current component architecture, verification and Phase 3 handoff. The phase sequence below records the original plan.

## Phase 1 — implemented

Next.js App Router, strict TypeScript, React and Tailwind CSS. The root layout and preview are server components. Semantic CSS tokens are exposed through Tailwind's theme. Shared primitives are Section, Eyebrow, ActionLink and MediaFrame. The preview exercises light/dark surfaces, serif/sans hierarchy, image composition, spacing, anchor navigation and content-empty states.

Content lives in `src/data`; reusable contracts in `src/types/content.ts`. Missing scalar facts use null; missing collections use empty arrays. Placeholder editorial copy is explicitly separate from factual fields. Project media paths belong to `src/data/assets.ts`, with all assets under `public`. Placeholder labels must stay visible until approved project assets replace them.

## Next phases

2. Navigation and hero: client menu with focus trapping/restoration, section-aware contrast, video fallback, image reveal and parallax. Replace the Phase 1 preview; preserve the design tokens.
3. Introduction and architecture: server-rendered narratives with scoped GSAP client wrappers and cleanup.
4. Location: render the placeholder map against LocationMapProps; adopt a provider only when configured. Coordinates use longitude, latitude order.
5. Residences: floor/apartment selection from data. No invented inventory. Validate floor-to-residence references; use labelled plan placeholders. Detail dialog supports Escape, focus trap and touch.
6. Interiors/lifestyle: large-image storytelling; desktop pinning/horizontal travel only when useful. Mobile uses normal document flow.
7. Amenities: only supplied entries; omit public section when empty.
8. Enquiry/footer: frontend validation; explicit unsent state until EnquiryAdapter is configured. No localStorage, logs or mock-success submission. Only show valid contact/social URLs.
9. 3D: user-initiated client boundary with next/dynamic, ssr:false. Canvas, useGLTF, Bounds, lighting, OrbitControls, floor mesh mapping and error boundary live inside the lazy chunk. Model path comes from assets.model.src and points to /models/*.glb. Null renders an honest development placeholder. Never import Three at the root.
10. Optimize and launch: verify responsive screenshots, keyboard flow, reduced-motion, media fallbacks and interaction state. Add approved OG media, canonical, sitemap and fact-based structured data only after real identity/domain/data are supplied. Remove noindex deliberately at launch.

## Motion boundary

Use src/lib/motion.ts for timing. GSAP matchMedia gates motion and desktop pinning. useGSAP scopes and reverts animations on unmount. A single optional Lenis provider integrates with GSAP's ticker; cleanup removes the callback and destroys Lenis. Reduced-motion gets native scrolling with no pinning/parallax. Content must remain visible when JavaScript fails. Implement these behaviours in Phases 2–3, not globally in Phase 1.

## Deployment

No backend or deployment is configured. The preview intentionally uses noindex. The supplied NEXT_PUBLIC_SITE_URL is reserved for Phase 10; do not invent a canonical domain or property schema. No map service, analytics, enquiry endpoint or external media request is active.
