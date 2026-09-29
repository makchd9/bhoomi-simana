import { media } from "./source-media";
/** Published plan types, not live unit availability. Areas transcribed from the source plan images. */
export const residences = [
  {
    id: "premium",
    configuration: "2 BHK",
    name: "Premium",
    area: 826,
    onwards: false,
    planNumbers: "3 / 4",
    plan: "/images/simana/Floor-plans1.jpg",
    note: "Two bedrooms with a separate kitchen and living–dining space.",
  },
  {
    id: "smart",
    configuration: "3 BHK",
    name: "Smart",
    area: 948,
    onwards: false,
    planNumbers: "1 / 6",
    plan: "/images/simana/Floor-plans2.jpg",
    note: "Marketed as 3 BHK Smart (Type A). The published drawing labels two bedrooms and a study room.",
  },
  {
    id: "grand",
    configuration: "3 BHK",
    name: "Grand",
    area: 1133,
    onwards: false,
    planNumbers: "2 / 5",
    plan: "/images/simana/Floor-plans3.jpg",
    note: "The 3 BHK Grand (Type B) plan brings three bedrooms around a central living and dining space.",
  },
  {
    id: "superior",
    configuration: "4 BHK",
    name: "Superior",
    area: 1674,
    onwards: true,
    planNumbers: "2",
    plan: "/images/simana/Floor-plans4.jpg",
    note: "Explore the published four-bedroom Superior layout, with carpet area starting at 1,674 sq ft.",
  },
  {
    id: "supreme",
    configuration: "5 BHK",
    name: "Supreme",
    area: 2104,
    onwards: true,
    planNumbers: "1 / 3",
    plan: "/images/simana/Floor-plans5.jpg",
    note: "Explore the published five-bedroom Supreme layout, with carpet area starting at 2,104 sq ft.",
  },
] as const;
export const interiors = [
  {
    label: "Living & dining",
    title: "Room for your everyday.",
    description:
      "Thoughtfully planned spaces bring together moments of gathering and quiet retreat.",
    image: media.living,
  },
  {
    label: "Study",
    title: "A moment to yourself.",
    description: "A place to read, reflect and settle into your own rhythm.",
    image: media.study,
  },
  {
    label: "Kitchen",
    title: "At the heart of home.",
    description:
      "An intimate look at the materials, cabinetry and details within.",
    image: media.kitchen,
  },
  {
    label: "Guest bedroom",
    title: "A quieter kind of comfort.",
    description: "An interior vision of a composed, welcoming guest room.",
    image: media.bedroom,
  },
];
