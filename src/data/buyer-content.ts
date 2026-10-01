/** Canonical buyer-facing content. Source checks: docs/source/upgrade-audit.md.
 * "verified" means supported by the named public source, not regulatory approval.
 * Unresolved claims are intentionally excluded from the publishing collections. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bhoomi-simana.vercel.app";
export const sources = {
  project: "https://simanabhoomi.com/",
  residences: "https://simanabhoomi.com/residences.html",
  amenities: "https://simanabhoomi.com/amenities.html",
  purnata: "https://purnataatbhoomisimana.com/",
  developer: "https://bhoomi-group.com/about-us/",
  corporateProject: "https://bhoomi-group.com/our-projects/bhoomi-simana/",
};
export const brochure = {
  href: "/documents/purnata-brochure.pdf",
  name: "Purnata at Simāna",
  date: "29 September 2025",
  label: "Purnata brochure · PDF · 37 MB",
};
export const address = {
  name: "Simāna by Bhoomi",
  street: "Western India Spinning and Weaving Mills Compound, GD Ambekar Marg",
  locality: "Lalbaug, Parel",
  city: "Mumbai",
  region: "Maharashtra",
  postalCode: "400033",
  country: "India",
  verified: true,
  source: sources.corporateProject,
};
export const facts = [
  { value: "03", label: "Premium residential towers" },
  { value: "80%", label: "Open space & landscaped greens" },
  { value: "54+", label: "Lifestyle amenities" },
];
export const differentiators = [
  {
    title: "Space to breathe",
    detail:
      "80% open space and landscaped greens bring landscape into the everyday experience of a city home.",
  },
  {
    title: "A broader everyday",
    detail:
      "54+ lifestyle amenities span wellness, sport, family time and shared occasions.",
  },
  {
    title: "Aikyam, together",
    detail:
      "Simāna’s clubhouse brings fitness, indoor recreation and celebrations into a dedicated community destination.",
  },
  {
    title: "A city perspective",
    detail:
      "The project presents open city views. The view from an individual residence depends on its tower, floor and orientation.",
  },
  {
    title: "A bylane address",
    detail:
      "A residential setting off the main thoroughfare, within Lalbaug and Parel’s established urban neighbourhood.",
  },
  {
    title: "Three towers, one address",
    detail:
      "Simāna is the overall development. Purnata is the residential offering within it; Aikyam is its clubhouse.",
  },
  {
    title: "Detail in the façade",
    detail:
      "German Formliner Technology is identified in the project’s architectural specification. Confirm the applicable finish and specification with the project team.",
  },
  {
    title: "Considered access",
    detail:
      "Five dedicated entry and exit gates are part of the published development plan.",
  },
];
export const currentOffering = {
  name: "Purnata",
  configurations: ["3 BHK", "4 BHK"],
  jodi: true,
  description:
    "Purnata is the residential offering within Simāna. Its current project website presents 3 and 4 BHK residences and Jodi options. Live inventory, pricing and the plan applicable to your chosen home are confirmed by the sales team.",
  status: "Ongoing residential development",
  statusSource: sources.corporateProject,
  source: sources.purnata,
  availabilityVerified: false,
};
export const connectivity = [
  "Lalbaug",
  "Parel",
  "Lower Parel",
  "Worli",
  "Coastal Road",
  "Bandra–Worli Sea Link",
  "Eastern Freeway",
  "Atal Setu",
  "Sewri–Worli Connector",
];
export const developer = {
  name: "Bhoomi Group",
  since: "1993",
  source: sources.developer,
  description:
    "Since 1993, Bhoomi has developed homes across Mumbai, Thane and Pune. Its approach brings architecture, engineering and thoughtful planning together, with Simāna continuing that work in Lalbaug.",
  principles: [
    "Architecture & considered design",
    "Engineering & construction",
    "Sustainable practices",
  ],
  projects: [
    { name: "Bhoomi Park", location: "Malad West, Mumbai" },
    { name: "Bhoomi Acres", location: "Thane" },
    { name: "Bhoomi Samarth", location: "Goregaon East, Mumbai" },
    { name: "Bhoomi Harmony", location: "Kurla, Mumbai" },
  ],
};
export const verifiedAssociates = [
  {
    name: "Architect Hafeez Contractor",
    role: "Architecture",
    logo: "aboutlogo1.png",
    source: sources.corporateProject,
  },
  {
    name: "Quality Heightcon Pvt. Ltd. (QHPL)",
    role: "Construction partner",
    logo: "aboutlogo3.png",
    source: sources.corporateProject,
  },
  {
    name: "JW Consultants LLP",
    role: "Structural engineering",
    logo: "aboutlogo4.png",
    source: sources.corporateProject,
  },
];
export const registrations = [
  {
    number: "P51900033361",
    qr: "/images/simana/wing1.jpg",
    href: "https://maharerait.maharashtra.gov.in/public/project/view/36185",
  },
  {
    number: "P51900033360",
    qr: "/images/simana/wing2.jpg",
    href: "https://maharerait.maharashtra.gov.in/public/project/view/36183",
  },
  {
    number: "PR1170002500564",
    qr: "/images/simana/wingc.png",
    href: "https://maharerait.maharashtra.gov.in/project/view/57453",
  },
];
export const registrationNotice =
  "The official project websites publish these registrations but differ on the A/B wing mapping. Confirm the registration applicable to your selected residence with the sales team and MahaRERA before booking.";
export const mahareraUrl = "https://maharera.maharashtra.gov.in/";
export const journal = {
  title: "A Breath Between Towers",
  publisher: "GoodHomes",
  href: "https://www.goodhomes.co.in/home-decor/home-tours/a-breath-between-towers-9662-3.html",
  description:
    "A closer look at Simāna through the lens of home, architecture and urban living. Read the feature published by GoodHomes and linked by the project website.",
};
export const enquiryTypes = [
  "Request Brochure",
  "Request Floor Plan",
  "Request Pricing",
  "Check Availability",
  "Book Site Visit",
  "General Enquiry",
] as const;
export const faqs = [
  [
    "Where is Simāna?",
    "Simāna is at Western India Spinning and Weaving Mills Compound, GD Ambekar Marg, Lalbaug, Parel, Mumbai, Maharashtra 400033.",
  ],
  [
    "What is Purnata?",
    "Purnata is the residential offering within the wider Simāna development by Bhoomi. It is presented as the main tower in this experience.",
  ],
  [
    "Which configurations can I explore?",
    "The Simāna website publishes 2 BHK Premium, 3 BHK Smart and Grand, 4 BHK Superior and 5 BHK Supreme plans. Purnata’s current website presents 3 and 4 BHK residences. Published plans are reference layouts, not a statement of current availability.",
  ],
  [
    "What are the carpet areas?",
    "The published Simāna drawings show 826 sq ft for Premium, 948 sq ft for Smart, 1,133 sq ft for Grand, 1,674 sq ft onwards for Superior and 2,104 sq ft onwards for Supreme. These are project-wide reference plans; confirm the current Purnata plan and carpet area for the residence you select.",
  ],
  [
    "What is Aikyam?",
    "Aikyam is Simāna’s clubhouse, bringing wellness, indoor recreation and social gatherings together. The walkthrough includes the gym, yoga room, squash court and banquet hall.",
  ],
  [
    "How many towers are there?",
    "The published Simāna development comprises three residential towers. This experience focuses on Purnata and the Aikyam clubhouse.",
  ],
  [
    "What amenities are included?",
    "The project describes 54+ lifestyle amenities. Our directory lists the distinct facilities named in the available project material across wellness, sport, family, social, landscape and community categories. Confirm delivery, access and specifications for your residence before booking.",
  ],
  [
    "Are Jodi residences available?",
    "Jodi options are mentioned on the Purnata project website. Applicable combinations, approvals and live availability must be confirmed by the sales team.",
  ],
  [
    "What are the MahaRERA registrations?",
    `${registrations.map((r) => r.number).join(", ")}. ${registrationNotice}`,
  ],
  [
    "How can I view or download a floor plan?",
    "Choose a published plan in The Residences, then select View Floor Plan or Download Floor Plan. The enlarged view also links to the original drawing.",
  ],
  [
    "How do I download the brochure?",
    "Select Download Brochure in the header, residences section or footer. The supplied Purnata brochure dated 29 September 2025 opens directly as a PDF, without a lead form.",
  ],
  [
    "How do I schedule a visit?",
    "Use Book a Private Presentation to open the project’s official booking page, or call or WhatsApp the sales team. You can also choose Book Site Visit in the enquiry form when online enquiries are enabled.",
  ],
  [
    "What is the current project status?",
    "Bhoomi’s corporate project page lists Simāna as an ongoing residential development. For construction progress and the status of a specific tower, request a dated update from the project team.",
  ],
  [
    "What is the possession timeline?",
    "A verified, current tower-specific possession date has not been supplied for this website. Confirm the timeline against the relevant MahaRERA registration and Agreement for Sale.",
  ],
  [
    "How can I contact sales?",
    "Call +91 22 6899 8800 or email sales@simana-bhoomi.com. WhatsApp and the official private-presentation booking link are available in the contact section.",
  ],
] as const;
// Approval queue: none of these values are consumed by public components.
export const pendingVerification = {
  floorToFloorHeight: {
    verified: false,
    simana: "11.8 ft",
    purnata: "11.5 ft",
    sources: [sources.residences, sources.purnata],
  },
  developerStatistics: {
    verified: false,
    simana: ["61+", "12.5 million sq ft", "17,000+"],
    purnata: ["45+ / 50+", "10 million sq ft", "16,000"],
    sources: [sources.project, sources.purnata],
  },
  wingMapping: {
    verified: false,
    simana: { A: "P51900033361", B: "P51900033360" },
    corporate: { A: "P51900033360", B: "P51900033361" },
    sources: [sources.project, sources.corporateProject],
  },
  possession: { verified: false, value: null },
  inventory: { verified: false, value: null },
  greenCertificationConsultant: {
    verified: false,
    value: "Kaizen Design Solutions",
    certificationAwarded: false,
  },
  liaison: { verified: false, value: null },
  testimonials: {
    verified: false,
    names: ["Amit Mehta", "Neha Patel", "Rahul Shah", "Pooja Desai"],
    publish: false,
  },
};
