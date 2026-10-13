export interface ProposalItem {
  _id?: string;
  token: string;
  title: string;
  clientName: string;
  associationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventType?: string;
  eventDate: string;
  venue: string;
  expectedAttendance: string;
  totalAmount: number;
  advanceRequired: number;
  scopeOfWork: {
    item: string;
    description: string;
    amount: number;
  }[];
  inclusions: string[];
  exclusions: string[];
  terms: string[];
  services?: string[];
  status: "pending" | "approved" | "changes_requested" | "rejected";
  approverDetails?: {
    name?: string;
    designation?: string;
    organization?: string;
    approvedAt?: string | Date;
    comments?: string;
  };
  paymentStatus: "pending" | "advance_paid" | "fully_paid";
  version: number;
  aliases?: string[];
  revisionHistory?: {
    action: string;
    performedBy: string;
    timestamp: string | Date;
    notes?: string;
  }[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const AVAILABLE_SERVICES_MENU = [
  "Stall & Vendor Curation",
  "Stage & Lighting Setup",
  "Sound Systems & AV",
  "Food Counters & Catering",
  "Kids Rides & Carnival Games",
  "Security & Crowd Management",
  "Promotional Banners & Marketing",
  "Event Accounting & GST Support",
  "Electrical & Silent Generator Backup",
  "Zero-Waste Post-Event Cleaning",
];

export const initialSampleProposals: ProposalItem[] = [
  {
    token: "omr-prestige-bella-vista-2026",
    aliases: [
      "omr-prestige-bella-vista-2026",
      "prestige-bella-vista",
      "prestige-bella-vista-rwa",
      "pbv-rwa-chennai",
    ],
    title: "OMR Prestige Bella Vista Mega Apartment Shopping Expo & Carnival",
    clientName: "Prestige Bella Vista Residents Welfare Association",
    associationName: "PBV-RWA Chennai",
    contactPerson: "K. R. Narayanan (Secretary)",
    email: "pbv.association@gmail.com",
    phone: "+91 98401 23456",
    eventType: "Gated Apartment Festival & Flea Market",
    eventDate: "Saturday & Sunday, 24-25 October 2026",
    venue: "Central Clubhouse Arena & Open Amphitheater, Porur-OMR, Chennai",
    expectedAttendance: "2,000+ Resident Families (Approx. 6,500 Attendees)",
    totalAmount: 185000,
    advanceRequired: 92500,
    services: [
      "Stall & Vendor Curation",
      "Stage & Lighting Setup",
      "Sound Systems & AV",
      "Kids Rides & Carnival Games",
      "Security & Crowd Management",
      "Electrical & Silent Generator Backup",
      "Promotional Banners & Marketing",
      "Zero-Waste Post-Event Cleaning",
    ],
    scopeOfWork: [
      {
        item: "Stall Fabrication & Canopy Setup",
        description: "25 weather-safe commercial canopies (10x10 ft) with tables, frilled covers, and vendor chairs.",
        amount: 65000,
      },
      {
        item: "Electrical Infrastructure & Illumination",
        description: "Main power junction box, LED floodlights, individual stall sockets, and silent generator backup.",
        amount: 32000,
      },
      {
        item: "Professional Audio, Stage & Resident DJ",
        description: "JBL line-array sound system, cordless mics, cultural program stage setup, and evening family DJ.",
        amount: 38000,
      },
      {
        item: "Kids Carnival & Interactive Games",
        description: "Giant bouncy castle, live popcorn & cotton candy counter, ring toss, face painting artist, and game host.",
        amount: 28000,
      },
      {
        item: "Ground Operations & Marshals",
        description: "Dedicated MP Dream Events ground marshals for crowd coordination, vendor load-in, and cleaning crew.",
        amount: 22000,
      },
    ],
    inclusions: [
      "25 Commercial vendor stalls with covered canopies, display tables, and lighting.",
      "Complete electrical distribution, plug sockets, and generator backup.",
      "Professional audio system, stage backdrop, and evening family entertainment DJ.",
      "Kids games zone: bouncy castle, face painter, popcorn, and cotton candy.",
      "On-ground event coordination crew, security marshals, and cleaning management.",
      "Official promotional digital creative flyers formatted for Association WhatsApp groups.",
    ],
    exclusions: [
      "Direct retail product sales revenue settlements (managed directly by individual stall vendors).",
      "Special external municipal police permissions (handled jointly by RWA).",
      "Personal resident purchases or private catering requests.",
    ],
    terms: [
      "Stall setup will begin 12 hours prior to the event commencement.",
      "50% advance payment required upon proposal sign-off to initiate vendor booking and fabrication.",
      "Remaining 50% balance payable on the morning of Day 1 of the event.",
      "MP Dream Events provides full event liability coverage and experienced ground coordinators.",
      "In case of inclement weather, rescheduling to the following weekend is supported at zero cancellation fee.",
    ],
    status: "pending",
    paymentStatus: "pending",
    version: 1,
    revisionHistory: [
      {
        action: "Proposal Generated",
        performedBy: "MP Dream Events Executive Team",
        timestamp: new Date("2026-10-10T10:00:00Z"),
        notes: "Official proposal dispatched for RWA Committee digital approval sign-off.",
      },
    ],
  },
  {
    token: "hiranandani-upscale-fest-2026",
    aliases: [
      "hiranandani-upscale-fest-2026",
      "hiranandani-upscale",
      "hiranandani-rwa-navalur",
      "hiranandani-navalur",
    ],
    title: "Hiranandani Upscale Diwali Food & Artisan Flea Fair",
    clientName: "House of Hiranandani Community Management Committee",
    associationName: "Hiranandani RWA Navalur",
    contactPerson: "Dr. S. Sundaram (President)",
    email: "hiranandani.events@chennai.in",
    phone: "+91 97890 54321",
    eventType: "Community Festival & Organic Food Fair",
    eventDate: "Sunday, 8 November 2026",
    venue: "Main Central Boulevard & Promenade, Egattur, OMR, Chennai",
    expectedAttendance: "1,500+ Resident Families",
    totalAmount: 125000,
    advanceRequired: 62500,
    services: [
      "Stall & Vendor Curation",
      "Food Counters & Catering",
      "Stage & Lighting Setup",
      "Sound Systems & AV",
      "Promotional Banners & Marketing",
      "Zero-Waste Post-Event Cleaning",
    ],
    scopeOfWork: [
      {
        item: "Food & Artisan Canopy Stalls",
        description: "18 customized designer canopies with heavy duty wooden tables and halogen spot lights.",
        amount: 48000,
      },
      {
        item: "Fairy Lights Arch & Boulevard Branding",
        description: "Atmospheric warm fairy light overhead canopy over 150 meters and entrance balloon arch.",
        amount: 35000,
      },
      {
        item: "Acoustic Live Music & Sound System",
        description: "Live unplugged music band setup, subtle background music, and stage sound engineering.",
        amount: 25000,
      },
      {
        item: "Waste Disposal & Sanitation Management",
        description: "Color-coded wet/dry dustbins, continuous ground cleaning marshals, and post-event clearance.",
        amount: 17000,
      },
    ],
    inclusions: [
      "18 stalls with covered roofing, power connection, and display tables.",
      "Boulevard lighting illumination and entrance arch decor.",
      "Acoustic music setup and sound system.",
      "Complete venue sanitation and waste management.",
    ],
    exclusions: ["Special liquor permits or unauthorized commercial fireworks."],
    terms: [
      "50% advance upon digital approval; balance on event completion.",
      "Eco-friendly event guidelines to be observed by all participating vendors.",
    ],
    status: "approved",
    approverDetails: {
      name: "Dr. S. Sundaram",
      designation: "President, RWA",
      organization: "House of Hiranandani Community Management",
      approvedAt: new Date("2026-10-05T11:30:00Z"),
      comments: "Approved by RWA executive committee unanimously. Looking forward to a great bazaar!",
    },
    paymentStatus: "advance_paid",
    version: 1,
    revisionHistory: [
      {
        action: "Proposal Generated",
        performedBy: "MP Dream Events Executive Team",
        timestamp: new Date("2026-10-01T09:00:00Z"),
        notes: "Draft sent to committee.",
      },
      {
        action: "Proposal Approved",
        performedBy: "Dr. S. Sundaram (President, RWA)",
        timestamp: new Date("2026-10-05T11:30:00Z"),
        notes: "Digital signature and sign-off confirmed by RWA executive committee.",
      },
    ],
  },
  {
    token: "tvs-emerald-peninsula-apartment-association",
    aliases: [
      "tvs-emerald-peninsula-apartment-association",
      "mp-peninsula-tvs-2026",
      "mp-%20peninsula-tvs-2026",
      "mp-peninsula-tvs",
      "tvs-emerald-peninsula",
      "tvs-emerald-peninsula-rwa",
    ],
    title: "TVS Emerald Peninsula Grand Apartment Lifestyle & Food Carnival 2026",
    clientName: "TVS Emerald Peninsula Apartment Association",
    associationName: "TVS Emerald Peninsula Apartment Association",
    contactPerson: "Executive Committee / Association Secretary",
    email: "peninsula.rwa@gmail.com",
    phone: "+91 73389 99723",
    eventType: "Gated Apartment Festival & Pop-up Flea Expo",
    eventDate: "Saturday & Sunday, 21-22 November 2026",
    venue: "Central Podium Arena & Clubhouse Lawns, Manapakkam, Chennai",
    expectedAttendance: "800+ Resident Families (Approx. 2,800 Attendees)",
    totalAmount: 140000,
    advanceRequired: 70000,
    services: [
      "Stall & Vendor Curation",
      "Stage & Lighting Setup",
      "Sound Systems & AV",
      "Kids Rides & Carnival Games",
      "Electrical & Silent Generator Backup",
      "Security & Crowd Management",
      "Zero-Waste Post-Event Cleaning",
    ],
    scopeOfWork: [
      {
        item: "Commercial Pop-Up Canopies & Stalls",
        description: "20 weatherproof outdoor canopies (10x10 ft) with tables, frilled covers, and vendor chairs.",
        amount: 52000,
      },
      {
        item: "Electrical Infrastructure & Lighting Setup",
        description: "Central power distribution junction box, warm LED ambiance floodlights, and silent generator backup.",
        amount: 28000,
      },
      {
        item: "Audio Equipment & Evening Music Atmosphere",
        description: "JBL high-clarity sound system, cordless microphones for announcements, and family DJ entertainment.",
        amount: 30000,
      },
      {
        item: "Kids Entertainment & Fun Carnival Activities",
        description: "Bouncy castle, live popcorn & cotton candy machines, interactive games host, and art activity zone.",
        amount: 20000,
      },
      {
        item: "On-Ground Management & Cleanliness Crew",
        description: "Dedicated MP Dream Events marshals for crowd safety, vendor loading, and zero-waste post-event cleanup.",
        amount: 10000,
      },
    ],
    inclusions: [
      "20 Premium commercial vendor canopies equipped with tables, lighting, and power outlets.",
      "Complete electrical distribution box and silent diesel generator backup.",
      "Professional sound system, announcement microphones, and family entertainment DJ.",
      "Kids carnival games, bouncy castle, complimentary popcorn, and cotton candy.",
      "Dedicated on-ground operations marshals and 100% waste clearance crew.",
      "Zero cost and zero financial liability for the Residents Welfare Association.",
    ],
    exclusions: [
      "Individual vendor retail transactions (settled directly with vendors).",
      "Private resident catering or exclusive apartment clubhouse bookings.",
    ],
    terms: [
      "Stall setup begins 12 hours prior to the event commencement with zero obstruction to resident parking or pathways.",
      "Zero financial liability for TVS Emerald Peninsula RWA; all commercial vendor stall fees handled by MP Dream Events.",
      "Strict compliance with society quiet hours post 10:00 PM for all audio equipment.",
      "Dedicated MP Dream Events cleaning marshals will ensure 100% waste clearance post-event.",
      "Vendor vehicles and staff verified with security gate passes provided in advance.",
    ],
    status: "pending",
    paymentStatus: "pending",
    version: 1,
    revisionHistory: [
      {
        action: "Proposal Generated",
        performedBy: "MP Dream Events Executive Team",
        timestamp: new Date("2026-10-12T10:00:00Z"),
        notes: "Official proposal generated for TVS Emerald Peninsula RWA digital review & approval.",
      },
    ],
  },
];

declare global {
  var inMemoryProposalsStore: ProposalItem[] | undefined;
}

if (!globalThis.inMemoryProposalsStore) {
  globalThis.inMemoryProposalsStore = JSON.parse(JSON.stringify(initialSampleProposals));
}

export function normalizeToken(token: string): string {
  if (!token) return "";
  try {
    return decodeURIComponent(token)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  } catch {
    return token
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}

export function proposalMatchesToken(p: ProposalItem, norm: string, stripped: string, rawLower: string): boolean {
  const pNorm = normalizeToken(p.token);
  if (pNorm === norm || pNorm.replace(/-/g, "") === stripped || p.token.toLowerCase() === rawLower) {
    return true;
  }
  // Check aliases
  if (p.aliases && p.aliases.some((a) => {
    const aNorm = normalizeToken(a);
    return aNorm === norm || aNorm.replace(/-/g, "") === stripped || a.toLowerCase() === rawLower;
  })) {
    return true;
  }
  // Check associationName
  const pAssoc = normalizeToken(p.associationName || "");
  if (pAssoc && (pAssoc === norm || norm.includes(pAssoc) || pAssoc.includes(norm))) {
    return true;
  }
  // Check clientName
  const pClient = normalizeToken(p.clientName || "");
  if (pClient && (pClient === norm || norm.includes(pClient) || pClient.includes(norm))) {
    return true;
  }
  // Check title
  const pTitle = normalizeToken(p.title || "");
  if (pTitle && (pTitle === norm || norm.includes(pTitle) || pTitle.includes(norm))) {
    return true;
  }
  // Society-specific fallback heuristics
  if (norm.includes("tvs") && norm.includes("peninsula") && (pAssoc.includes("peninsula") || pNorm.includes("peninsula") || (p.aliases && p.aliases.some(a => a.includes("peninsula"))))) {
    return true;
  }
  if (norm.includes("bella-vista") && (pAssoc.includes("bella-vista") || pNorm.includes("bella-vista"))) {
    return true;
  }
  if (norm.includes("hiranandani") && (pAssoc.includes("hiranandani") || pNorm.includes("hiranandani"))) {
    return true;
  }
  return false;
}

export function getFallbackProposalByToken(rawToken: string): ProposalItem | null {
  if (!rawToken) return null;
  const norm = normalizeToken(rawToken);
  const stripped = norm.replace(/-/g, "");
  const rawLower = rawToken.trim().toLowerCase();
  const list = [
    ...(globalThis.inMemoryProposalsStore || []),
    ...initialSampleProposals,
  ];

  return list.find((p) => proposalMatchesToken(p, norm, stripped, rawLower)) || null;
}

export function updateFallbackProposal(
  rawToken: string,
  updates: Partial<ProposalItem>
): ProposalItem | null {
  if (!rawToken) return null;
  const norm = normalizeToken(rawToken);
  const stripped = norm.replace(/-/g, "");
  const rawLower = rawToken.trim().toLowerCase();

  if (!globalThis.inMemoryProposalsStore) {
    globalThis.inMemoryProposalsStore = JSON.parse(JSON.stringify(initialSampleProposals));
  }
  const list: ProposalItem[] = globalThis.inMemoryProposalsStore || [];
  globalThis.inMemoryProposalsStore = list;

  let index = list.findIndex((p) => proposalMatchesToken(p, norm, stripped, rawLower));

  if (index === -1) {
    const fromInitial = initialSampleProposals.find((p) => proposalMatchesToken(p, norm, stripped, rawLower));
    if (fromInitial) {
      list.unshift(JSON.parse(JSON.stringify(fromInitial)));
      index = 0;
    } else {
      return null;
    }
  }

  const currentItem = list[index];
  if (!currentItem) return null;

  list[index] = {
    ...currentItem,
    ...updates,
    updatedAt: new Date(),
  };
  return list[index];
}

export function getAllFallbackProposals(): ProposalItem[] {
  const store = globalThis.inMemoryProposalsStore || [];
  const map = new Map<string, ProposalItem>();
  for (const p of initialSampleProposals) {
    map.set(normalizeToken(p.token), p);
  }
  for (const p of store) {
    map.set(normalizeToken(p.token), p);
  }
  return Array.from(map.values());
}
