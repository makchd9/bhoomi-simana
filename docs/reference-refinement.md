# Reference-led visual refinement

The owner's feedback: the experience still did not match the reference, small text was hard to read, and colours needed improvement.

## Reference observations
The supplied reel presents architecture as the main visual, with restrained text panels, residence exploration and camera movement into the building. Previous oversized headlines over darkened static photographs did not reproduce that behaviour. No reference branding, footage, floor plans or layout were copied.

## Implemented direction
- Solid neutral charcoal `#171c1d` and off-white `#f5f5f0`, with natural, unfiltered project imagery. The original ivory wash remains removed.
- Persistent editorial side panel on desktop; dedicated image and text areas on mobile. Text does not overlay a bright/busy photograph. Metadata uses 10–12 px text, descriptions use 14–16 px, controls retain touch targets.
- More compact headlines, genuine project wordmark text, opaque navigation, larger form labels and readable image credits.
- Four reversible chapters: Perspective, Arrival, Outlook, Within. The elevation opens the journey. The following three scenes are scrubbed camera footage from the official project films, not fake 3D geometry or a claim of a continuous physically mapped route.
- The rest of the website uses the same visual hierarchy: image-first galleries with adjacent copy, larger residence controls, clearer project facts and a restrained amenities directory. Source content and all three wings retained.

## Motion assets
Frames were extracted from these owner-supplied-site films, not generated:
- https://simanabhoomi.com/img/website-home-banner.mp4 — arrival at 4.65–5.9 seconds (48 frames); balcony outlook at 9.8–12.3 seconds (64 frames). These are rendered visualisations.
- https://simanabhoomi.com/img/residence.mp4 — actual furnished residence footage at 0.1–7 seconds (96 frames).

Source cuts/fades are excluded from the selected clips. `scripts/extract-journey.swift` and `scripts/encode-journey.mjs` reproduce both responsive WebP sizes. The 208 frames are stored in `public/images/simana/journey`; the runtime requests only the selected size and frames around the current scroll position.

The canvas loader keeps at most 14 decoded frames per active sequence, limits concurrency to three requests, trims inactive caches, disposes on unmount and retains the poster on errors. It draws without React rerenders on every scroll tick. Reduced-motion visitors see static images and do not request animation sequences. There is no initial full-video download and no Three.js bundle on this route.

## Remaining asset boundary
The source elevation image is low resolution. A high-resolution approved elevation and a dedicated exterior-to-interior walkthrough render/GLB are required for the full uninterrupted spatial flight seen in the reference. Do not invent that architecture or describe this montage as a measured model.

## Validation
Production build, lint and TypeScript; 12 existing browser checks plus three cinematic checks for frame scrubbing in both directions, reduced-motion asset loading, and mobile copy/control fit. Manual screenshots at 1440×1000 and 390×844; layout coverage from 320 to 1920 pixels. Automated axe colour-contrast checks at 390 and 1440 pixels reported no violations. This is a targeted audit, not a claim of exhaustive accessibility certification.

## 28 September 2026 — original asset handoff

The owner confirmed they can obtain the original model or walkthrough. The remaining requirement is the reference's spatial interaction, not further palette changes. `docs/architect-asset-brief.md` describes the exact handoff. Inspect the delivered scene/film before designing another approximation. A GLB with floor object mappings can support real selection; a film can support only its authored camera path. The existing implementation remains intact while awaiting the source asset.
