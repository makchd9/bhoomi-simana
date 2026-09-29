import clubhouseEdits from "../../docs/source/clubhouse-edits.json";
import type { ImageAsset } from "@/types/content";

export const journeyChapters = [
  { id: "overview", label: "Overview" },
  { id: "tower", label: "Tower" },
  { id: "podium", label: "Podium" },
  { id: "clubhouse", label: "Clubhouse" },
] as const;
type Chapter = (typeof journeyChapters)[number]["id"];
type Scene = {
  id: string; chapter: Chapter; label: string; eyebrow: string;
  title: [string, string]; description: string; image: ImageAsset;
  framing?: "complete";
  sequence: { name: string; count: number; preserveView?: boolean } | null;
};
const filmStill = (name: string, alt: string): ImageAsset => ({
  src: `/images/simana/native-v3/${name}.webp`,
  width: 3840, height: 2160, alt,
  caption: "Simāna project film · Artist’s visualisation", placeholder: false,
});
const clubhouseStill = (name: string, alt: string): ImageAsset => ({
  src: `/images/simana/native-v3/club-${name}.webp`, width: 1920, height: 1080, alt,
  caption: "Aikyam · Original clubhouse film", placeholder: false,
  sourceUrl: "https://simanabhoomi.com/img/clubhouse.mp4",
});
const clubSequence = (name: string) => ({ name: `club-${name}`, count: clubhouseEdits.clips.find(clip => clip.name === `club-${name}`)!.frames, preserveView: true });

// Source edits and original timecodes: docs/source/clubhouse-edits.json.
// All Aikyam spaces share one clubhouse chapter.
export const journey: Scene[] = [
  { id: "skyline", chapter: "overview", label: "The ensemble",
    eyebrow: "Lalbaug, Mumbai / Bhoomi Properties", title: ["Life,", "elevated."],
    description: "Simāna. Three towers, one urban oasis. Pool, clubhouse and open spaces at the podium.",
    image: { src: "/images/simana/context/three-towers-side.webp", width: 1672, height: 941,
      alt: "Illustrative side-view composition of three Simāna towers in a straight line, with the pool and Aikyam clubhouse on the podium",
      caption: "Illustrative composition from project renders · Not a surveyed site view", placeholder: false },
    framing: "complete", sequence: null },
  { id: "main-tower", chapter: "tower", label: "Architecture",
    eyebrow: "Purnata / The main tower", title: ["A new", "perspective."],
    description: "Your journey begins at the main tower.",
    image: filmStill("tower", "The Purnata main tower in the original Simāna walkthrough"),
    sequence: { name: "tower", count: 120 } },
  { id: "arrival", chapter: "tower", label: "Arrival",
    eyebrow: "Purnata / The approach", title: ["A different", "pace begins."],
    description: "From the city to a quieter threshold.",
    image: filmStill("threshold", "Original camera approach to the main Simāna tower entrance"),
    sequence: { name: "threshold", count: 108 } },
  { id: "inside", chapter: "tower", label: "Lobby",
    eyebrow: "Purnata / The arrival lobby", title: ["An invitation", "to belong."],
    description: "Step inside the main tower.",
    image: filmStill("interior", "Arrival lobby of the main tower in the supplied walkthrough"),
    sequence: { name: "interior", count: 99 } },
  { id: "spaces", chapter: "podium", label: "Swimming pool",
    eyebrow: "The podium / Pool & open spaces", title: ["Life,", "in the open."],
    description: "The swimming pool, clubhouse and shared spaces bring the podium to life.",
    image: filmStill("water", "Original swimming pool and podium landscape from the project walkthrough"),
    sequence: { name: "water", count: 90 } },
  { id: "clubhouse", chapter: "clubhouse", label: "Aikyam",
    eyebrow: "Aikyam / The club at Simāna", title: ["A place", "to come together."],
    description: "Enter the clubhouse. A different rhythm awaits.",
    image: { src: "/images/simana/native-v3/clubhouse-exterior.webp", width: 3397, height: 2700,
      alt: "Aikyam’s two-level stone and glass facade with planting, reproduced from the Purnata brochure",
      caption: "Purnata brochure · Actual image with representative elements", placeholder: false },
    framing: "complete", sequence: null },
  { id: "club-reception", chapter: "clubhouse", label: "Reception",
    eyebrow: "Aikyam / Welcome inside", title: ["The art", "of arrival."],
    description: "Step through Aikyam’s reception.",
    image: clubhouseStill("reception", "Original Aikyam reception, chandelier and staircase"),
    framing: "complete", sequence: clubSequence("reception") },
  { id: "club-gym", chapter: "clubhouse", label: "Gym",
    eyebrow: "Aikyam / Wellness & recreation", title: ["Room", "to move."],
    description: "The gym. Light, space and a moment for yourself.",
    image: clubhouseStill("gym", "The Aikyam gym with its original equipment and skylight"),
    framing: "complete", sequence: clubSequence("gym") },
  { id: "club-squash", chapter: "clubhouse", label: "Squash court",
    eyebrow: "Aikyam / Wellness & recreation", title: ["Play", "without limits."],
    description: "The double-height squash court.",
    image: clubhouseStill("squash", "The original double-height squash court in Aikyam"),
    framing: "complete", sequence: clubSequence("squash") },
  { id: "club-yoga", chapter: "clubhouse", label: "Yoga room",
    eyebrow: "Aikyam / Wellness & recreation", title: ["Find", "your stillness."],
    description: "The yoga room. A space to pause and reconnect.",
    image: clubhouseStill("yoga", "Original Aikyam yoga room with mats and warm timber finishes"),
    framing: "complete", sequence: clubSequence("yoga") },
  { id: "club-staircase", chapter: "clubhouse", label: "The ascent",
    eyebrow: "Aikyam / The ascent", title: ["Another", "level of togetherness."],
    description: "Follow the staircase to the banquet hall.",
    image: clubhouseStill("staircase", "The original Aikyam staircase leading to the banquet hall"),
    framing: "complete", sequence: clubSequence("staircase") },
  { id: "club-banquet", chapter: "clubhouse", label: "Banquet hall",
    eyebrow: "Aikyam / Gather & celebrate", title: ["Make room", "for the occasion."],
    description: "The banquet hall. A setting for gathering and celebration.",
    image: clubhouseStill("banquet", "Original Aikyam banquet hall with dining tables and chandeliers"),
    framing: "complete", sequence: clubSequence("banquet") },
];

export const scenePositions = journey.map((_, index) => index === 0 ? 0 : (index + 0.34) / journey.length);
export const chapterStarts = journeyChapters.map(chapter => journey.findIndex(scene => scene.chapter === chapter.id));
// Preserve previous deep links without retaining unrelated walkthrough chapters.
export const journeyAliases: Record<string, string> = { garden: "spaces", wellness: "spaces" };
