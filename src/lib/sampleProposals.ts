export interface ProposalItem {
  _id?: string;
  token: string;
  title: string;
  clientName: string;
  associationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventType: string;
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
  revisionHistory?: {
    action: string;
    performedBy: string;
    timestamp: string | Date;
    notes?: string;
  }[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export const initialSampleProposals: ProposalItem[] = [
  {
    token: "omr-prestige-bella-vista-2026",
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
];

declare global {
  var inMemoryProposalsStore: ProposalItem[] | undefined;
}

if (!globalThis.inMemoryProposalsStore) {
  globalThis.inMemoryProposalsStore = JSON.parse(JSON.stringify(initialSampleProposals));
}

export function normalizeToken(token: string): string {
  try {
    return decodeURIComponent(token)
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-");
  } catch {
    return token.trim().toLowerCase().replace(/[\s_]+/g, "-");
  }
}

export function getFallbackProposalByToken(rawToken: string): ProposalItem | null {
  const norm = normalizeToken(rawToken);
  const list = globalThis.inMemoryProposalsStore || initialSampleProposals;
  return list.find((p) => normalizeToken(p.token) === norm) || null;
}

export function updateFallbackProposal(
  rawToken: string,
  updates: Partial<ProposalItem>
): ProposalItem | null {
  const norm = normalizeToken(rawToken);
  const list = globalThis.inMemoryProposalsStore || initialSampleProposals;
  const index = list.findIndex((p) => normalizeToken(p.token) === norm);
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    ...updates,
    updatedAt: new Date(),
  };
  return list[index];
}

export function getAllFallbackProposals(): ProposalItem[] {
  return globalThis.inMemoryProposalsStore || initialSampleProposals;
}
