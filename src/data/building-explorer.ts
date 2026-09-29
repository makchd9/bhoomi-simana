import { projectGallery } from "./project-gallery";

// Exploration groups, not floor assignments or confirmed tower entitlements.
export const explorationGroups = [
  { id: "wellness", title: "Wellness", spaces: ["pool", "spa"] },
  { id: "social", title: "Gather", spaces: ["cafe", "banquet", "cards-room"] },
  { id: "quiet", title: "Unwind", spaces: ["library", "meeting-room", "meeting-room-tv"] },
  { id: "family", title: "Play", spaces: ["indoor-games", "creche"] },
  { id: "arrival", title: "Arrive", spaces: ["lift-lobby"] },
] as const;
export const explorationSpaces = explorationGroups.flatMap(group =>
  group.spaces.map(id => ({ ...projectGallery.find(space => space.id === id)!, group: group.id })),
);
export const scenePortals: Record<string, { label: string; space: string; point: [number, number] }> = {
  skyline: { label: "Explore amenities", space: "pool", point: [.535, .405] },
  wellness: { label: "Pool & spa", space: "pool", point: [.64, .36] },
  inside: { label: "Step inside", space: "lift-lobby", point: [.61, .36] },
};
