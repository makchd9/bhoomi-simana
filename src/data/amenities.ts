import { media } from "./source-media";
import { projectGallery } from "./project-gallery";
import { journey } from "./journey";
const space = (id: string) => projectGallery.find((p) => p.id === id)!.image;
/** 30 unique named facilities are source-backed. 54+ is the published project total,
 * not the length of this directory. No unnamed facilities have been invented. */
export const amenityGroups = [
  {
    name: "Wellness",
    image: space("pool"),
    title: "Find your own rhythm.",
    description: "Spaces for movement, water and a quieter moment.",
    items: [
      "Swimming Pool",
      "High-Tech Gym",
      "Meditation Zone",
      "Steam Room",
      "Reflexology Walk",
      "Yoga Room",
    ],
  },
  {
    name: "Sports & recreation",
    image: journey.find((s) => s.id === "club-squash")!.image,
    title: "Make room for play.",
    description: "From an individual routine to a game shared with friends.",
    items: [
      "Badminton Court",
      "Squash Court",
      "Pickleball Court",
      "Mini Golf Court",
      "Skating Rink",
      "Jogging Track",
    ],
  },
  {
    name: "Family & children",
    image: space("creche"),
    title: "A world to grow into.",
    description:
      "Places for younger residents to play, create and spend time together.",
    items: [
      "Crèche",
      "Kids’ Play Area",
      "Kids’ Creative Studio",
      "Children’s Pool",
    ],
  },
  {
    name: "Social & entertainment",
    image: space("banquet"),
    title: "Life, shared.",
    description:
      "Settings for everyday gatherings and the occasions worth remembering.",
    items: [
      "Banquet Hall",
      "Amphitheatre",
      "Open Air Cinema",
      "Private Mini Theatre",
      "Private Dining Area",
      "Indoor Games Lounge",
    ],
  },
  {
    name: "Landscape & leisure",
    image: space("cafe"),
    title: "A pause in the city.",
    description: "Green spaces and places to sit, wander and linger.",
    items: [
      "Landscaped Garden",
      "Miyawaki Forest",
      "Multipurpose Lawn",
      "Garden Cafeteria",
      "Sun Lounger Deck",
    ],
  },
  {
    name: "Community",
    image: space("library"),
    title: "The art of belonging.",
    description:
      "Shared spaces for a familiar face, a good book or a welcome home.",
    items: ["Senior Citizen Space", "Library", "Lobby Entrance"],
  },
] as const;
export const amenityDescriptions: Record<string, string> = {
  "Swimming Pool": "A shared setting for swimming and leisure.",
  "High-Tech Gym": "A dedicated space for your fitness routine.",
  "Meditation Zone": "A place for a quiet pause.",
  "Steam Room": "A space within the wellness offering.",
  "Reflexology Walk": "A walking feature in the landscape.",
  "Yoga Room": "A dedicated room for yoga practice.",
  "Badminton Court": "A setting for badminton.",
  "Squash Court": "A double-height court inside Aikyam.",
  "Pickleball Court": "A court for the shared game.",
  "Mini Golf Court": "A recreational putting space.",
  "Skating Rink": "A dedicated area for skating.",
  "Jogging Track": "A route for your daily movement.",
  Crèche: "A space planned for younger children.",
  "Kids’ Play Area": "A setting for active play.",
  "Kids’ Creative Studio": "Room for children’s creative activities.",
  "Children’s Pool": "A separate pool space for children.",
  "Banquet Hall": "A venue for gatherings and celebrations.",
  Amphitheatre: "An open setting for shared occasions.",
  "Open Air Cinema": "A setting for outdoor screenings.",
  "Private Mini Theatre": "An indoor space for film viewing.",
  "Private Dining Area": "A space for dining together.",
  "Indoor Games Lounge": "Room for games and recreation.",
  "Landscaped Garden": "Planting and open space within the development.",
  "Miyawaki Forest": "A planted feature in the landscape plan.",
  "Multipurpose Lawn": "An open lawn for varied uses.",
  "Garden Cafeteria": "A place to gather beside the landscape.",
  "Sun Lounger Deck": "A setting for poolside leisure.",
  "Senior Citizen Space": "A shared setting for older residents.",
  Library: "A place for books and quiet time.",
  "Lobby Entrance": "The shared arrival to the residences.",
};
export const clubhouseGallery = [
  media.gym,
  media.sitout,
  media.banquet,
  media.yoga,
  media.gym2,
  media.powder,
];
