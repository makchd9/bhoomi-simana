# Walkthrough quality and motion correction

Owner requested smoother frame shifts and sharper imagery; confirmed using the best available website clubhouse film.

## Fixes

- Frame-difference audit revealed hard camera cuts in seven old clips: threshold (two cuts), water, lobby, clubhouse reception, squash, yoga and staircase. These were source edits, not just browser performance. Every active shot is now one continuous camera view.
- Main-tower and pool desktop clips retain the supplied master’s full **3840×2160** resolution, replacing 2560×1440. Mobile retains a dedicated 1080×1920 crop. Main encoding targets 65 Mbps desktop / 24 Mbps mobile; H.264, 30 fps, every frame a keyframe, no frame reordering.
- Clubhouse stays at its true source resolution of **1920×1080**. Encoding targets 18 Mbps with independently decodable frames to avoid further compression/seek degradation. This does not recreate detail already absent from the heavily compressed public film. No fake 4K upscale, sharpen halos, invented frames or altered interiors.
- Camera shots are no longer all stretched to a fixed three-second duration; frame counts match their trimmed duration. The clubhouse source itself is 24 fps, so its original cadence remains a source limit.
- Video seeking is paced with requestAnimationFrame, eased toward the scroll position and capped at two frames per decode request. Reversing scroll follows the same path. The poster is retained until a requested video frame has actually decoded; the initial decoder frame cannot flash over it.
- Direct navigation warms the destination clip; ordinary scrolling warms the adjacent clip. Images use quality 95. Posters match the new first frames and retain 4K detail where available.
- Versioned media paths avoid stale browser caches. No initial video transfer and no animation transfer for reduced-motion visitors.

## Reproduction

Use `scripts/prepare-walkthrough-continuous.swift` with the original Bhoomi master, followed by `scripts/encode-walkthrough-quality.swift`. Clubhouse edit points and counts are centralized in `docs/source/clubhouse-edits.json`, consumed by both the encoder and scene data. Outputs live under `public/videos/simana/hd-v2/`, with matching posters in `public/images/simana/journey-v2/` and `public/images/simana/clubhouse-v2/`.

## Frame audit

Mean absolute RGB frame differences at 96×54 pixels, consecutive output frames. Old discontinuities peaked at 15–68; after trimming, all ten shots have maximum differences below 4.2. This metric detects hard cuts, not perceived sharpness or a guarantee of device frame rate.

tower.mp4 max delta 0.5725308641975309 possible cuts []
threshold.mp4 max delta 2.0541409465020575 possible cuts []
water.mp4 max delta 2.6878215020576133 possible cuts []
interior.mp4 max delta 0.9469521604938271 possible cuts []
club-reception.mp4 max delta 2.4166666666666665 possible cuts []
club-gym.mp4 max delta 1.964377572016461 possible cuts []
club-squash.mp4 max delta 4.183899176954733 possible cuts []
club-yoga.mp4 max delta 1.786008230452675 possible cuts []
club-staircase.mp4 max delta 2.3355838477366255 possible cuts []
club-banquet.mp4 max delta 1.851466049382716 possible cuts []

## Verification

- Lint, TypeScript checks and production build passed; all 21 browser tests passed.
- Forward/reverse scroll testing verifies seek steps stay within two frames and settle on the requested frame.
- Local Chrome at 1440×900 decoded the tower at 3840×2160. A single scroll-burst sample displayed 40 frames, with a 25 ms median display interval and 50.5 ms 95th percentile, settling exactly at frame 82. These are local measurements, not a cross-device performance guarantee. Raw measurements: `playback-metrics-v2.json`.
- Manually inspected mobile pool playback at 1080×1920 and the desktop tower screenshot in `.21st/previews/walkthrough-4k-desktop.png`.
