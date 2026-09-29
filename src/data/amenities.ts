import { media } from "./source-media";
/** Every named facility below appears in the visible amenities page; 54+ is the source's total, not this list's length. */
export const amenityGroups = [
  {
    name: "Wellness",
    image: media.indoorPool,
    title: "Find your own rhythm.",
    description:
      "Water, movement and moments of stillness. Spaces to begin again, every day.",
    items: [
      "Swimming Pool",
      "High-Tech Gym",
      "Meditation Zone",
      "Jogging Track",
      "Steam Room",
      "Reflexology Walk",
      "Sun Lounger Deck",
    ],
  },
  {
    name: "Togetherness",
    image: media.banquet,
    title: "A place to come together.",
    description:
      "From an unhurried conversation to a special occasion, make room for shared moments.",
    items: [
      "Banquet Hall",
      "Private Dining Area",
      "Garden Cafeteria",
      "Indoor Games Lounge",
      "Private Mini Theatre",
      "Open Air Cinema",
      "Library",
      "Senior Citizen Space",
      "Lobby Entrance",
    ],
  },
  {
    name: "Play",
    image: media.pool,
    title: "More room for possibility.",
    description:
      "A collection of active spaces for recreation, play and discovery.",
    items: [
      "Badminton Court",
      "Mini Golf Court",
      "Pickle Ball Court",
      "Squash Court",
      "Skating Rink",
      "Kids’ Play Area",
      "Kids’ Creative Studio",
      "Children’s Pool",
      "Crèche",
    ],
  },
  {
    name: "Landscape",
    image: media.sitout,
    title: "Nature, woven into life.",
    description:
      "Landscaped spaces offer a welcome pause from the pace of the city.",
    items: [
      "Landscaped Garden",
      "Multipurpose Lawn",
      "Miyawaki Forest",
      "Amphitheatre",
    ],
  },
] as const;
export const clubhouseGallery = [
  media.gym,
  media.sitout,
  media.banquet,
  media.yoga,
  media.gym2,
  media.powder,
];
