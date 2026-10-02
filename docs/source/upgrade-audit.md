# Simāna master upgrade — source audit, 1 October 2026

This audit supersedes earlier content-migration notes where they differ. Public source support is not a regulatory or owner approval. Raw HTML snapshots are in `docs/source/upgrade-audit/`.

## Canonical content and source decisions

- `src/data/buyer-content.ts` is the buyer-content registry, with public sources and a separate `pendingVerification` approval queue. `residences.ts` owns the published drawings; `amenities.ts` owns the named facility directory. `project.ts` retains shared identity and contact details.
- Simāna is the three-tower development; Purnata is its residential offering/main-tower experience; Aikyam is the clubhouse; Bhoomi is the developer. The master upgrade supersedes the earlier withholding of all project-wide plans and registrations for a single-tower site.
- Project highlights (three towers, 80% open space/landscaped greens, 54+ amenities, bylane address, German Formliner, five gates): https://simanabhoomi.com/index.html. Views are explicitly qualified by tower, floor and orientation. No general sea-view promise.
- Published plans: https://simanabhoomi.com/residences.html. Five original 1536×1090 drawings were visually checked: Premium 826 sq ft, Smart 948, Grand 1133, Superior 1674 onwards, Supreme 2104 onwards. **Type A/B are the two 3 BHK plans**, not two 2 BHK plans as stated in the brief. Smart drawing labels two bedrooms and a study; the public UI discloses this.
- Purnata's current website presents 3/4 BHK and Jodi options: https://purnataatbhoomisimana.com/. No current inventory, pricing, entitlement or possession date is asserted. Its area ranges are not conflated with the older project-wide drawings.
- Amenities: https://simanabhoomi.com/amenities.html, owner-confirmed clubhouse rooms and existing yoga photography. Thirty distinct named facilities across six categories; 54+ is the source's overall claim, not an invented list of 54 entries. No repeated carousel entries.
- Address: https://bhoomi-group.com/our-projects/bhoomi-simana/ and Purnata corroborate GD Ambekar Marg, Western India Mills compound, Lalbaug/Parel, Mumbai 400033. Old contact-page structured data uses Dr Ambedkar Marg; this variant is not repeated. Full expanded compound name follows Purnata.
- Connections are destination names only. No travel times, distances, infrastructure opening dates or operational claims added.
- Corporate history: https://bhoomi-group.com/about-us/ supports establishment in 1993. Corporate project page lists Simāna as ongoing. Developer totals differ across websites; none are published as confirmed.
- Selected project names/locations: https://bhoomi-group.com/ (Park, Acres, Samarth, Harmony). No completion dates or status inferred.
- Associates: corporate Simāna page supports Architect Hafeez Contractor, Quality Heightcon Pvt. Ltd. and JW Consultants LLP. Existing original logos retained. Anonymous liaison logo and unconfirmed certification claims omitted.
- GoodHomes article: old blog page links https://www.goodhomes.co.in/home-decor/home-tours/a-breath-between-towers-9662-3.html. Original short synopsis links out; no fabricated articles or copied full text.
- Testimonials: names on old site are not proof of consent/authenticity. All public testimonial collections are empty pending approval.

## Registration discrepancy — approval needed before deployment

Old Simāna: A=P51900033361, B=P51900033360.
Purnata and Bhoomi corporate: A=P51900033360, B=P51900033361.
C number is PR1170002500564 (one duplicated Purnata block contains a shortened typo).

Public UI lists the three full numbers without assigning the disputed wings, explains the discrepancy, and links original QR-encoded official records. QR codes were decoded, not regenerated:
- `wing1.jpg` → https://maharerait.maharashtra.gov.in/public/project/view/36185
- `wing2.jpg` → https://maharerait.maharashtra.gov.in/public/project/view/36183
- `wingc.png` → https://maharerait.maharashtra.gov.in/project/view/57453

The official detail pages were inaccessible to the research browser. Do not treat QR decoding as independent validation of tower mapping. Obtain the approved wing schedule before setting the final labels.

## Other approval gates

- Floor-to-floor: Simāna 11.8 ft, Purnata 11.5 ft. Neither published as the selected value.
- Developer totals: Simāna 61+ / 12.5m sq ft / 17,000+; Purnata blocks 45+/50+ / 10m / 16,000. Await a dated corporate-approved set.
- Inventory, possession, pricing, certification status, liaison identity and testimonials remain unconfirmed.

## Brochure fidelity

`public/documents/purnata-brochure.pdf` is an optimized derivative of the owner's `29.09.2025_PURNATA BROCHURE c2c.pdf`, not a generated replacement. All 22 pages, extracted text, vectors and original layout retained. Large embedded raster images converted from CMYK to RGB and capped at 3200px, JPEG 88; soft masks preserved. Result: 37,259,288 bytes versus approximately 186MB original. Pages 1,2,9,17,21 rendered and compared; mean RGB difference at review size 0–2.34/255. Original content (including any historical claims) is not edited; the date and confirmation caveat accompany the download.

## Lead integration

No external CRM submission was performed. No credentials were copied from the old site's Salesforce form. `POST /api/enquiry` accepts same-origin, size-limited validated JSON and forwards only when a server-side HTTPS webhook is explicitly configured. Frontend shows an honest disabled state otherwise; direct telephone, email, WhatsApp and official booking remain active. See `docs/BUYER-UPGRADE.md` for integration and launch requirements.

## Owner-approved final refinement — 1 October 2026

This update supersedes the earlier pending developer-total and wing-mapping decisions above. The owner explicitly approved the old Simāna figures and A/B mapping in this chat on 1 October 2026:

- 61+ landmark projects completed, 12.5M+ sq. ft. delivered, 17,000+ families housed; Mumbai, Thane, Pune; since 1993.
- A Wing: P51900033361; B Wing: P51900033360; C Wing: PR1170002500564.

Rechecked `https://simanabhoomi.com/about.html` and `/contact.html`: these match the approved data. The conflicting Purnata/corporate values remain recorded in the internal data audit, with the owner's resolution. The original QR assets and their decoded direct record URLs remain unchanged. The official record endpoints could not be read by the web tool during this pass; the wing mapping is owner-confirmed, not independently revalidated against the registry. Public development notes have been replaced with the approved labels and links.

The supplied brochure, pages 5 and 7, was visually rendered and inspected against the two new screenshots. The map is rendered directly from page 5's right-hand panel at 2592 × 2592, saved losslessly as `public/images/simana/location-brochure.webp` (about 407 KB). No labels, route geometry or pins were generated. The illustration is dated, not to scale, and may depict proposed connections. The live Google Maps interaction remains separate and opt-in. Nearby names are transcribed into four compact categories; distances/times are not asserted.

Page 7 supports the non-MCGM parking statement and Jain temple with a 5,000 sq. ft. Upashraya. These are incorporated in the existing facts area; parking allocation remains subject to sale documents. Lobby, clubhouse, gym/yoga/banquet/kids facilities and qualified city/sea views were already represented. The brochure's “50+” amenity headline is a lower-bound description consistent with the project's published 54+ figure, not a separate numeric total.

Corporate brand references now use Bhoomi Group. Existing external URLs and original image captions identifying photography shot at a Bhoomi property are source attribution, not corporate naming errors, and remain intact. Logos and source PDFs are unchanged.

The local repository has an enquiry API and server webhook integration but no configured delivery endpoint. No credentials or third-party recipient have been invented. The compact form retains honest disabled delivery, adds inline validation, supports Indian mobile prefixes, distinguishes the two 3 BHK plan preferences and protects against repeat submission. The optional callback field has been removed from the UI; the API remains backwards compatible.
