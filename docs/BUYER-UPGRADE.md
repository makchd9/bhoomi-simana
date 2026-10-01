# Simāna buyer experience upgrade

## What changed

The opening, official vector marks, original camera clips and native media pipeline remain. The opening now leads into concise project facts before the existing reversible Tower / Podium / Clubhouse journey; its Overview control returns to the opening. Full project navigation is separate from the four cinematic chapter controls.

The buyer journey adds reference plans and original downloads, actual/rendered residence imagery, Aikyam context, six amenity categories, qualified views, a full address/map, Bhoomi history and selected projects, verified associates, GoodHomes coverage, FAQs, brochure/site-visit actions, registration records, privacy and legal information. Dedicated static routes share these components and canonical metadata.

## Integration

Configure `LEAD_WEBHOOK_URL` (HTTPS) and optional `LEAD_WEBHOOK_TOKEN` on the server. Rebuild after enabling it, as pages are statically generated with the form's enabled state. A successful webhook response must mean the lead was durably accepted. The endpoint sends name, phone, email, configuration, enquiryType, message, callback, consent, project, source and consentedAt. It does not log lead bodies or persist data locally. Non-2xx, timeout and unconfigured states do not produce success messaging. No third-party CRM credentials have been imported.

Before enabling production lead delivery, configure hosting-level rate limiting/anti-abuse and agree the recipient, retention and privacy wording with the project team. A honeypot, origin check, body-size limit, server validation and timeout are already implemented; these do not replace hosting-level abuse controls. Do not test against a live CRM without a sandbox or explicit authorization.

`NEXT_PUBLIC_SITE_URL` defaults to the supplied Vercel site. Set `SITE_INDEXABLE=true` only after approval of final content and launch. Sitemap includes all real routes. No prices, ratings, availability or possession date appear in structured data.

## Content approval

Read `docs/source/upgrade-audit.md`. Resolve A/B RERA mapping, floor-to-floor height, developer totals, current Purnata plans/inventory and possession through approved documents. Unconfirmed data is excluded or qualified. Testimonials are withheld. The original brochure remains dated reference material. The opening illustration and compressed clubhouse source retain their known quality limits; this upgrade does not invent image detail.

## Verification

Run `npm run check`, `npm run build` and `npm run test:e2e`. Tests cover source-quality media, reversible frame-paced playback, menu/focus behavior, reduced motion, original floor-plan views/downloads, brochure integrity, honest lead states, validation, six deduplicated amenity categories, page metadata and mobile overflow. Local browser checks cover the opening, facts, plans, contact and editorial information pages.

No production deployment is performed by this change.

## Final review — 1 October 2026

- First-time buyer: the opening leads directly into the project identity, location, developer and three key facts. Simāna, Purnata, Aikyam and Bhoomi are explained together.
- Serious buyer: navigation exposes plans, original downloads, the real brochure, amenities, address, developer and registration records without requiring a sales enquiry. Reference plans are distinguished from current availability.
- Luxury presentation: the original film, vector marks, type families and motion language remain. Added information uses editorial typography, rules, whitespace and large visuals. Desktop and mobile captures were inspected.
- Sales journey: contextual links carry residence and enquiry preferences into the form. Call, WhatsApp and the official presentation booking remain usable while the local lead integration is unconfigured. No lead delivery or success state is simulated for visitors.
- SEO and mobile UX: dedicated routes, canonical metadata, semantic content, keyboard controls, reduced-motion behavior and responsive layouts were checked. Search indexing remains opt-in pending launch approval.

Lint, TypeScript and the production build passed. The browser suite initially found a dynamic reduced-motion issue in the hero; it was corrected with a media-query-aware animation lifecycle. All five journey checks then passed, together with the desktop/mobile capture check. The other 32 behavioral checks had passed in the preceding suite, including lead validation and mocked delivery, local requests, floor-plan downloads, responsive overflow, navigation and original-quality playback. No live CRM was contacted. These checks are not a substitute for content approval or a production device/network audit.

Preview captures are in `.21st/previews/buyer-overview-desktop.png`, `.21st/previews/buyer-overview-mobile.png` and `.21st/previews/buyer-residences-desktop.png`.
