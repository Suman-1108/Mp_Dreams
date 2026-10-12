import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

// Sample seed proposals to ensure immediate availability
const sampleProposals = [
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
  },
];

export async function GET() {
  try {
    await connectDB();
    let proposals = await Proposal.find().sort({ createdAt: -1 }).lean();

    if (proposals.length === 0) {
      // Seed sample proposals
      await Proposal.insertMany(sampleProposals);
      proposals = await Proposal.find().sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json({ proposals });
  } catch (err) {
    console.error("Error fetching proposals:", err);
    return NextResponse.json({ proposals: sampleProposals });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const token =
      body.token ||
      `${body.clientName || "proposal"}-${Date.now()}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newProposal = await Proposal.create({
      ...body,
      token,
      version: 1,
    });

    return NextResponse.json(
      { message: "Proposal created successfully", proposal: newProposal },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating proposal:", err);
    return NextResponse.json(
      { message: err?.message || "Failed to create proposal" },
      { status: 500 }
    );
  }
}
