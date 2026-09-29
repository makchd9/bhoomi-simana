export const project = {
  name: "Simana The Urban Oasis",
  developer: "Bhoomi Properties",
  location: "Lalbaug",
  architect: "Hafeez Contractor",
  type: "A 58-floor residential tower",
  floors: 58,
  // Owner-confirmed scope. Wing identity, inventory and registration await confirmation.
  towers: [] as { id: string; name: string; registration: string; qr: string }[],
  configurations: [] as string[],
  inventoryConfirmed: false,
  language: "en",
  source: "https://simanabhoomi.com/",
  contact: {
    email: "sales@simana-bhoomi.com",
    phone: "+91 22 6899 8800",
    phoneHref: "tel:+912268998800",
    salesPhone: "+91 99300 92222",
    salesPhoneHref: "tel:+919930092222",
    whatsapp:
      "https://wa.me/919930092222?text=Hi%2C%20I%20am%20interested%20in%20Simana%20by%20Bhoomi.%20Please%20share%20details.",
    instagram: "https://www.instagram.com/simana_bhoomi/",
    appointment: "https://purnataatbhoomisimana.com/visitor-form/",
  },
  copy: {
    heroCaption: "Architecture. Light. Life.",
    introEyebrow: "An urban oasis / Lalbaug, Mumbai",
    introductionLines: ["A quieter rhythm.", "A fuller life."],
    introductionBody:
      "Purnata, the main tower at Simāna. Fifty-eight floors above Lalbaug, with life unfolding around the podium and the Aikyam clubhouse. By Bhoomi Properties.",
    contentNotice:
      "Explore the architecture through the supplied Simāna walkthrough, then arrange a personal introduction to the residences.",
    imageNote: "Rendered image of actual elevation",
    factsNotice:
      "Tower scope supplied by the project owner. Residence plans and availability will follow confirmation.",
    chapterEnd: "Space to live differently",
    statement: "A considered approach to contemporary living.",
  },
  hallmarks: [
    { value: "80%", label: "Open space & landscaped greens" },
    { value: "54+", label: "Lifestyle amenities" },
    { value: "11.8 ft", label: "Floor-to-floor height" },
  ],
  details: [
    "Strategic bylane location",
    "German Formliner Technology",
    "5 dedicated entry & exit gates",
    "Aikyam signature clubhouse",
  ],
  developerStats: [
    ["1993", "The beginning"],
    ["61+", "Completed projects"],
    ["12.5m", "Sq ft delivered"],
    ["17,000+", "Families housed"],
  ],
  disclaimer:
    "The plans, specifications, images, dimensions and other details are indicative and subject to approval from the concerned authorities. The Developer/Promoter reserves the right to amend, modify or revise them in the interest of the project without prior notice. This material does not constitute an offer, invitation to offer or contract. Transactions are governed solely by the Agreement for Sale. Sanctioned plans, specifications and approvals are available on the MahaRERA website.",
};
export const projectLabel = project.name;
export const socials = [
  ["Instagram", project.contact.instagram],
  ["Facebook", "https://www.facebook.com/SimanaBhoomi/"],
  [
    "LinkedIn",
    "https://in.linkedin.com/company/sim%C4%81na-by-bhoomi-properties",
  ],
  ["YouTube", "https://www.youtube.com/@SIMANA-TheUrbanOasis"],
];
export const associates = [
  {
    name: "Architect Hafeez Contractor",
    role: "Architect",
    logo: "aboutlogo1.png",
  },
  { name: "QHPL", role: "Construction partner", logo: "aboutlogo3.png" },
  { name: "J+W", role: "Structural consultant", logo: "aboutlogo4.png" },
  {
    name: "Kaizen Design Solutions",
    role: "Green building certification consultant",
    logo: "aboutlogo5.png",
  },
  {
    name: "Liaison partner logo",
    role: "Liaison partner",
    logo: "aboutlogo6.png",
  },
];
