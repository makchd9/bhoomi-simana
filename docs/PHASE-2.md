# Phase 2 — premium visual foundation

## Delivered

The initial style-guide preview is now a cinematic hero and opening project story. Existing Next.js infrastructure, design tokens and centralized content models are preserved. The reference recording informed image-led pacing and editorial contrast; no original brand, copy, imagery or exact layout was copied.

### Components

- Navigation: fixed, section-aware contrast; full-screen dialog menu; keyboard focus trap, Escape, focus return and scroll locking. Later chapters open forthcoming notices instead of dead anchors or fabricated sections.
- Hero: responsive 100svh composition, original concept image, data-driven identity/copy, location placeholder, scroll link and optional desktop video with image fallback.
- ProjectIntroduction: masked headline, editable supporting copy, editorial image and project facts sourced from existing data.
- EditorialImage: next/image, responsive sizes, aspect ratio, object position, alt text, priority/lazy loading, failure fallback, optional reveal and parallax.
- SmoothScroll: one dynamically imported Lenis instance coordinated with GSAP; cleanup on unmount/preference change, native touch, anchor handling, and suspension for modal/hidden document.
- MediaFrame: preserved as a compatibility wrapper around EditorialImage.

### Motion

Hero image clip reveal; sequential title/support/metadata entrance; subtle scroll scale and vertical shift; text moves at a different rate. Ivory introduction overlaps the hero boundary. Headline line masks, supporting-copy/fact fade, image reveal and restrained image parallax. Menu uses a quiet full-screen reveal and fast dismissal. GSAP contexts revert on teardown. Reduced motion removes major animation and uses native scrolling; server HTML stays visible without JavaScript.

### Content and imagery

Update src/data/project.ts and src/data/navigation.ts for copy. Register supplied images in src/data/assets.ts. The concept WebP is 257,546 bytes (1536 × 1024), generated specifically for this design and visibly labelled “Not the actual development.” It is not a verified rendering. High-resolution mobile source selection accounts for the tall crop. No real property facts or claims were added.

### Verification

- npm run check: ESLint and strict TypeScript.
- npm run build: static home route production build.
- npm run test:e2e: eight Playwright tests against production; Chrome required locally. Build before running. The test config starts port 3001 if it is not running.
- Coverage: scroll transforms, navigation tone, keyboard focus/return, native-dialog focus wrapping, Escape, mobile anchors, no page/menu overflow at 320/390/768/1024/1920px, reduced motion, menu reopening and no-JavaScript content.
- Screenshots reviewed for desktop hero/introduction and mobile hero/menu/introduction.
- 21st catalog requires sign-in and was unavailable. Local review ran; token definition color notices are informational. No catalog asset was used.

Optional video support is implemented but cannot be visually validated against an approved project video because none was supplied. Chrome responsive emulation was used; physical iOS/Safari validation remains a launch check. No environment issue prevented build or browser validation.

## Ready for Phase 3

The introduction, content models, asset manifest, theme-aware navigation and reusable image/motion components are ready for the architecture narrative. Phase 3 can add approved exterior/detail/entrance/lobby imagery and cinematic transitions without rebuilding the shell. Later project chapters, residence controls, floor plans, maps, amenities, enquiry backend and 3D remain unimplemented. The site stays noindex until real identity/content/domain are supplied.
