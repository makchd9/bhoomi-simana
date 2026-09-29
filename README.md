# Simāna — The Urban Oasis

A full-screen architectural scroll experience for one 58-floor tower in Lalbaug, by Bhoomi Properties. The journey uses short HD clips prepared from the owner's local 4K master, followed by concise project information and a private enquiry. Two lighter concept companion towers sit behind the unchanged main tower. Amenities is the next scroll chapter, showing all eleven owner-supplied renders without a popup.

[Current architecture, sources and media preparation](docs/single-tower-rework.md)

## Run

```sh
npm ci
npm run dev
```

## Verify and preview

```sh
npm run check
npm run build
npm run test:e2e
npm run start -- --hostname 127.0.0.1 --port 3001
```

Playwright uses installed Google Chrome. Local preview: http://127.0.0.1:3001.

## Editing

- `src/data/project.ts`: confirmed identity and single-tower scope.
- `src/data/journey.ts`: chapter copy and clip frame counts.
- `src/data/project-gallery.ts`: supplied image catalog.
- `src/data/building-explorer.ts`: experience groups for the amenities chapter.
- `src/lib/video-sequence.ts`: lazy clip loading and scroll-controlled seeking.
- `src/components/journey/`: six-chapter cinematic stage, background tower compositing and amenities controls.
- `src/app/immersive.css`: current art direction.
- `public/videos/simana/hd/`: desktop and portrait mobile clips.
- `public/images/simana/journey-hd/`: high-resolution posters.
- `public/images/simana/spaces/`: owner-supplied renders.

Older phase documents and data describe superseded scopes. The current handoff above takes precedence. The legacy frame utility is not loaded by the active journey.

Amenity images load when their chapter is reached; motion media loads on interaction. Reduced motion uses still images, and server content remains available without JavaScript. The original 1.7 GB video and Three.js are never downloaded by the homepage. Google Maps loads only on request. Enquiries prepare an email draft and are not stored or submitted by the site.

Tower-specific plans, inventory and registration remain unconfirmed. No floor geometry or unit dimensions have been invented. Previews are noindex; set `SITE_INDEXABLE=true` at build time only for the approved launch. Canonical URLs use https://simanabhoomi.com/.
