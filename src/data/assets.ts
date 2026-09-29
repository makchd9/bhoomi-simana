import { media } from "./source-media";
export const assets = {
  hero: media.elevation,
  introduction: media.elevation,
  heroVideo: "/videos/simana/overview.mp4",
  architecture: [media.elevation, media.lobby],
  interiors: [media.living, media.study, media.kitchen, media.bedroom],
  lifestyle: [media.lifestyle, media.hallmark],
  materials: [],
  model: {
    src: null as string | null,
    floorMeshNames: {} as Record<string, string[]>,
  },
};
