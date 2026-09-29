> Playback/media settings updated after visual feedback: see [quality and motion correction](source/walkthrough-quality-v2.md). The narrative and source provenance below are retained.

# Main tower and Aikyam — 29 September 2026

This supersedes the triangular companion-tower study and still-image Amenities chapter in `single-tower-rework.md`. The project remains a local preview; no publishing or enquiry backend was added.

## Experience

Six navigation chapters contain twelve original-camera scenes:

1. Overview: three towers in a straight row, seen from the long side; pool and clubhouse visible on the podium.
2. Main tower: existing HD architectural shot, entrance approach and arrival lobby.
3. Podium: existing HD pool/landscape camera movement.
4. Clubhouse: Aikyam exterior from the supplied brochure, then original reception footage.
5. Ground floor: gym, double-height squash court and yoga room.
6. First floor: original staircase shot followed by the banquet hall.

Only the main residential tower and clubhouse have walkthroughs. The two supporting towers appear as context in the opening. Their previously supplied heights remain absent from the opening copy. Floor assignments and the squash court's double height were expressly confirmed by the owner in this request.

`src/data/journey.ts` defines scenes, groups, captions, framing and navigation. The existing GSAP/ScrollTrigger, Lenis, video decoder and EditorialImage components are reused. Each room can be selected directly or reached by scrolling. There is no amenity-discovery modal or building hotspot. Chapter buttons retain arrow/Home/End support; rooms are standard keyboard-accessible buttons.

Camera motion is reversible and driven by scroll position. Image transitions run briefly in elapsed time so stopping at a boundary does not freeze a half-transparent room or unreadable text. Reduced motion and short viewports use static, accessible scenes. Mobile preserves complete clubhouse video frames and all three tower silhouettes. Existing main-tower portrait clips remain unchanged.

## Source fidelity

- **Opening composite:** `public/images/simana/context/three-towers-side.webp`. Built-in image generation composited the two published towers (`https://simanabhoomi.com/img/view4.webp`), supplied main-tower frames and official Aikyam exterior into the owner's requested linear arrangement. This is an **illustrative composition**, not an architect-approved side elevation, measured model or surveyed site layout. That distinction is visible on the page. Exact prompt, references and tool provenance are in `docs/source/side-view-composition.json`. The retired generated-background overlay is not rendered.
- **Main tower/pool:** existing owner-supplied 3840×2160 master, `Bhoomi Walkthrough.mp4`. Existing HD clips and original camera views are unchanged. The two background towers are not added to this footage.
- **Clubhouse exterior:** cropped image area from PDF spread 14 of `29.09.2025_PURNATA BROCHURE c2c.pdf`. The brochure's actual/representative-image distinction is retained. No generated clubhouse interior was used.
- **Clubhouse interiors:** `https://simanabhoomi.com/img/clubhouse.mp4`, 1920×1080, 24 fps. Six selected camera shots are retimed into 3-second, 30-fps H.264 clips with a keyframe every six frames. Source framing, rooms, finishes and outlooks are preserved. The public film is compressed; these clips preserve available source quality and are not represented as a new 4K master.
- **Views/location:** existing location content and supplied outlook imagery have not been replaced with generated sea or skyline views.

The tour is an edit of source camera shots with transitions, not a reconstructed continuous 3D path. No invented unit dimensions, inventory, floor plans or registration claims were added.

## Recreate the clubhouse media

Download the official film to a local source file, then:

```sh
swift scripts/prepare-clubhouse.swift /path/to/clubhouse.mp4 docs/source/clubhouse-edits.json /path/to/output
```

The script emits seekable MP4s and first-frame PNG posters. WebP posters are stored in `public/images/simana/clubhouse/`; video clips are in `public/videos/simana/hd/`. The new six clips total approximately 10 MB; each loads only when its scene needs camera motion. The 156-second source film is never loaded by the page. Reduced-motion visitors download no animation clips.

## Verification

Lint, TypeScript, production build and browser tests cover chapter navigation, room selection, forward/reverse scrubbing, confirmed floor labels, responsive framing, resize at a transition, reduced-motion teardown, no-JavaScript content, deferred video loading, menu focus, map loading and local-only enquiry preparation. Desktop and phone layouts are also visually reviewed. Completed: lint and TypeScript passed; production build passed; all 20 browser cases passed. The eight motion/clubhouse cases also passed after the responsive refinements. Automated WCAG A/AA scans found zero violations in seven tested states across 1440×900, 390×844 and 320×568, with no page errors or horizontal overflow. The final mobile crop and short-height static layout were visually inspected. Machine-readable results are in `docs/source/tour-accessibility-audit.json`; screenshots are in `.21st/previews/side-tour-*`.
