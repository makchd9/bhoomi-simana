> Superseded for the active tour by [Main tower and Aikyam](tower-clubhouse-rework.md), 29 September 2026. The media history below is retained for provenance.

# Current Simāna implementation — 28 September 2026

This document supersedes the earlier three-wing and low-resolution frame-sequence handoffs.

## Scope and sources

One tower, 58 floors, Simana The Urban Oasis, Bhoomi Properties, Lalbaug. The opening omits floor counts; project facts include the confirmed 58 floors. Wing identity, unit inventory, plans, registration and tower-specific amenity entitlement remain unconfirmed. Older published plans and registrations are retained as historical data but are not shown as this tower’s inventory.

The owner supplied `/Users/dakshshah9/Downloads/Bhoomi Walkthrough.mp4`: 3840 × 2160, 30 fps, 200.867 seconds. It is byte-identical to the earlier Drive download (SHA-256 `b43cebeb89e01965200242a9366507baf6b1097efc7364e149cf7e3b8c7f93e8`). Blur in the previous site came from aggressive web downsampling and portrait cropping, not a different source master.

The [photo folder](https://drive.google.com/drive/folders/15e4U1h1CKUOR-E6abo7m5RMCVOUzH3PJ) is now accessible. All 11 images were downloaded, visually inspected and imported: lift lobby, pool, spa, café, library, banquet, cards room, indoor games, crèche and two meeting-room views. They are architectural renders, not completed-property photographs. Their originals are 3840–7680 pixels wide. Exact IDs and dimensions are recorded in `docs/source/owner-gallery-manifest.json`.

The reference reel is used for full-screen architectural pacing, restrained overlays and spatial presentation. No reference branding, copy, plans or images were copied.

## Active media pipeline

The active journey uses short H.264 video clips, replacing per-frame image downloads. This preserves HD detail while providing browser-decoded, seekable camera motion.

| Chapter | Master seconds | Prepared frames / clip length |
|---|---:|---:|
| Tower | 177 → 173, reversed camera move | 120 / 4 s |
| Arrival | 14 → 20 | 120 / 4 s |
| Landscape | 64 → 70 | 120 / 4 s |
| Water | 85.5 → 90 | 108 / 3.6 s |
| Within / lobby | 120.7 → 125 | 96 / 3.2 s |

- Desktop: 2560 × 1440, target 12 Mbps. Mobile: native portrait crop at 1080 × 1920, target 8 Mbps. Both H.264, 30 fps, a keyframe every six frames and no audio.
- Network-optimised MP4s reside in `public/videos/simana/hd/`. Together, all desktop clips are about 29 MB; all mobile clips about 19 MB. Only the appropriate version is used.
- A clip is attached only after movement begins in that scene. There is no master-video download or initial clip request. Unavailable video leaves the high-resolution still poster visible.
- Seek requests are coalesced to the latest scroll position. `requestVideoFrameCallback` tracks displayed frames; older browsers use the seek completion event. This avoids the old queue of stale image downloads and removes canvas scaling from the active renderer.
- Posters are prepared at 3840 pixels and rendered with Next image quality 90. The earlier HD AVIF frame trial was archived outside public assets; it is not a runtime dependency.
- This is an edited sequence of genuine camera shots, not an invented 3D camera path. Independent orbiting and spatial floor highlighting still require a supplied model.

## Interaction

GSAP/ScrollTrigger controls the six-chapter stage (Tower → Amenities → Arrival → Landscape → Water → Within). Chapter buttons and in-scene links use the existing Lenis instance, with an eased transition instead of jumping instantly. Horizontal arrow keys, Home and End navigate the focused chapter controls. Each chapter has progress feedback. The outgoing image stays opaque beneath the incoming image, avoiding a dip to black; text changes are staggered to avoid overlapping headings.

Reduced-motion visitors and very short landscape viewports get readable static scenes. Reduced motion loads no animation clips. Content remains present without JavaScript. The enquiry only prepares an email draft; nothing is sent or stored.

## Current tower composition and amenities flow

The original foreground tower poster and HD clips are unchanged. `context-towers.tsx` adds two lighter background concept towers representing the user-requested 43- and 53-storey companions. The transparent asset was created with the built-in image-generation tool using the supplied tower as an architectural reference. It is not an architect-issued or dimensioned model. The prompt, source and output path are recorded in `docs/source/companion-towers-generation.json`.

An SVG compositing layer matches the source film's desktop/portrait cropping, applies atmospheric lightening, protects the main tower with an occlusion matte and follows decoded video time. Background towers have no focus targets, highlights or click behaviour. Their relative heights are illustrative; exact floor geometry is not asserted. The opening retains the focus on the 58-floor tower and omits storey counts from its copy.

Amenities is now the second scroll chapter, directly after the building view. The tower discovery button, clickable facade and modal flow are removed from the active page. `amenities-chapter.tsx` reuses the existing eleven owner renders and centralized experience groups, with direct room selection, previous/next controls, horizontal swipe and keyboard arrows. Ordinary vertical scrolling continues to Arrival. No dialog or scroll lock is involved. The Amenities menu navigates directly to this chapter, including the static reduced-motion layout.

Images load as the chapter becomes active. Responsive sizes account for portrait cover cropping. Old explorer and gallery components remain unused legacy files. No active route imports them.

## Recreate assets

```sh
swift scripts/prepare-walkthrough.swift '/path/to/Bhoomi Walkthrough.mp4' /tmp/simana-hd-frames
node scripts/encode-walkthrough.mjs /tmp/simana-hd-frames
swift scripts/encode-walkthrough-video.swift /tmp/simana-hd-frames public/videos/simana/hd
node scripts/prepare-owner-photos.mjs /path/to/downloaded/pngs docs/source/owner-gallery-manifest.json
```

The movie encoder skips existing clips; use a new output directory when preparing a revised edit. All current runtime assets are in the repository; the original master and temporary extraction files are not needed to run the site.

## Validation and remaining content

Run lint/typecheck, production build and browser tests. Coverage includes forward/reverse video seeking, decoded HD dimensions, no initial video download, reduced-motion behaviour, chapter motion, responsive bounds, menu focus, in-scene selection/swipe/keyboard/escape, preserved frame and scroll position, deferred image requests, map activation and local-only enquiry preparation.

The exact tower identity, approved plans, inventory and registration still need confirmation. Photo access is resolved. Preview indexing remains disabled until an approved launch.

Latest verification: lint/typecheck and production build passed. All 19 browser cases were exercised; two tests were corrected to use real wheel input rather than interrupting an in-flight Lenis transition with a programmatic scroll. The four affected navigation/amenities cases then passed. Automated axe scans found zero WCAG 2 A/AA violations on the active amenities chapter at 1440×900, 390×900 and 320×568. Desktop and mobile tower compositions were visually inspected.
