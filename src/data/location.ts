export const location = {
  name: "Lalbaug, Mumbai",
  sourceDescription:
    "At the heart of Parel, South Mumbai. A strategic bylane setting with the city around you.",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.678476199397!2d72.8367180742495!3d18.989801954674792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfdba2885c0d%3A0xd56d5d9b844e7dbd!2sSIM%C4%80NA-%20The%20Urban%20Oasis%20by%20Bhoomi!5e0!3m2!1sen!2sin!4v1766080463191!5m2!1sen!2sin",
  directions:
    "https://www.google.com/maps/search/?api=1&query=SIMANA+The+Urban+Oasis+by+Bhoomi+Lalbaug+Mumbai",
};

/** Named destinations transcribed from the owner-supplied Purnata brochure,
 * 29 September 2025, page 5. No live route distances or times are inferred. */
export const nearbyCategories = [
  { name: "Business & commercial", places: ["Lower Parel", "Worli"] },
  { name: "Healthcare", places: ["KEM Hospital", "Tata Memorial Hospital", "Wadia Hospital"] },
  { name: "Education", places: ["JBCN", "Christ Church School", "Aditya Birla World Academy"] },
  { name: "Retail & leisure", places: ["Phoenix Mall", "Palladium Mall", "Mahalaxmi Racecourse"] },
] as const;

export const illustratedMap = {
  src: "/images/simana/location-brochure.webp",
  width: 2592,
  height: 2592,
  kind: "Illustration",
  alt: "Simāna location illustration showing the project at Lalbaug, surrounding Mumbai neighbourhoods, rail connections and landmarks",
  caption: "Project location illustration · Purnata brochure, September 2025 · Not to scale. Proposed connections shown are not a statement of current operation.",
};
