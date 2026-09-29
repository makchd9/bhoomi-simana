/** Shared motion vocabulary. Heavy engines are imported only by client features. */
export const motion = {
  duration: { interaction: 0.25, reveal: 1.2, cinematic: 1.8 },
  ease: "power3.out",
  revealDistance: 28,
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;
