# Simāna content migration — 24 September 2026

Source: https://simanabhoomi.com/ and its visible About, Residences, Amenities, Contact and Blog pages. `site-inventory.json` records their text, media and links. The user's clarification confirms scope includes A, B and C wings. This replaces the earlier two-tower concept brief.

## Migrated
- Three residential wings and their source-listed MahaRERA registrations, with source QR images.
- 80% open space and landscaped greens; 54+ lifestyle amenities; 11.8 ft **floor-to-floor** height; strategic bylane location; German Formliner Technology; five entry/exit gates; Aikyam clubhouse.
- Five published plan types: 2 BHK Premium (826 sq ft), 3 BHK Smart (948), 3 BHK Grand (1,133), 4 BHK Superior (1,674 onwards), 5 BHK Supreme (2,104 onwards). Areas and flat labels were read from the original plan JPGs. Smart's drawing labels two bedrooms and a study; this distinction is disclosed.
- Architecture, arrival, interiors, amenities, Aikyam gallery and harbour view using supplied-site assets. Actual / rendered / shot at Bhoomi property labels are preserved in the media registry and UI. Captions describe the source's classification, not independent site inspection.
- All 29 unique visible amenities. “54+” is the project's published aggregate; no missing amenities invented to reach that number. The source's duplicate carousel entries are deduplicated.
- Bhoomi Group history and figures, associates with original logos, four published testimonials, eight video links and the GoodHomes press link.
- Main and sales telephone numbers, sales email, social channels, Purnata, published appointment URL, click-to-load Google Maps and project disclaimer.
- Official project film is local and loads only after the visitor opens the film viewer.

## Deliberately not asserted
- No 43/53 height claim, floor count or invented wing-to-height mapping. No floor inventory, unit availability, wing assignments, orientations or prices inferred from typology plans.
- No nearby travel times: the source's location-distance block is commented out, not visible published content. Directions use the site's embedded map instead.
- No certification rating inferred from the “Green Building Certification” associate role.
- No timed promotional popup or stale carnival promotion imported.
- No downloadable brochure PDF was exposed by the source; its brochure button opens an enquiry form. Published plan JPG downloads and contact links are provided.
- No privacy/terms URL was exposed. The published project disclaimer is retained; no legal policy invented.
- No actual 3D model is available. The existing asset configuration retains the model integration slot. The opening is an image-led scroll sequence, not a measured 3D walkthrough. Generated concept imagery is no longer used by the page.

## Data and asset maintenance
- `src/data/project.ts`: identity, wings, registrations, hallmarks, developer, associates, contacts, disclaimer.
- `src/data/source-media.ts`: image metadata and source labels/URLs. Low-resolution original assets are not AI-upscaled or misrepresented as new project photography. Replace these with original high-resolution approved files when available.
- `src/data/residences.ts`: published plan collection and interior slides.
- `src/data/amenities.ts`, `location.ts`, `stories.ts`: complete published facility list, map, testimonials and press.
- Assets live in `public/images/simana` and `public/videos/simana`; original source names retained for traceability. Source inventory may contain unused/duplicate assets; only selected editorial images are requested by the UI.
- Enquiry form validates locally and prepares a visitor-controlled mailto draft. No request is submitted to a server; nothing is persisted. Published external WhatsApp and appointment actions are visitor-initiated.

## Verification
Production build, ESLint, TypeScript and browser tests cover reversible scrolling, reduced motion, no-JavaScript content, mobile menus, 320–1920 px layouts, plan selection/enlargement/download targets, galleries, amenities, lazy map, three registrations, enquiry draft preparation and no initial video download. Preview stays noindex until launch configuration is explicitly enabled.


## Motion refinement

The latest opening uses extracted official project-film and residence-film frames for scroll-scrubbed movement. See `docs/reference-refinement.md` for source time ranges, labels and caching. The no-model limitation remains. The previous generated-image and static-slide motion descriptions are historical.
