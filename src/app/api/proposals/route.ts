import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import {
  getAllFallbackProposals,
  initialSampleProposals,
  normalizeToken,
  ProposalItem,
} from "@/lib/sampleProposals";


export async function GET() {
  try {
    await connectDB();
    let proposals = await Proposal.find().sort({ createdAt: -1 }).lean();

    // Ensure all initial sample proposals exist in MongoDB with their aliases
    for (const sample of initialSampleProposals) {
      const sToken = normalizeToken(sample.token);
      try {
        await Proposal.findOneAndUpdate(
          { token: sToken },
          { ...sample, token: sToken, aliases: sample.aliases || [sToken] },
          { upsert: true, new: true }
        );
      } catch {}
    }

    // Also sync any proposals stored in in-memory store if DB is now online
    if (globalThis.inMemoryProposalsStore && globalThis.inMemoryProposalsStore.length > 0) {
      for (const memProp of globalThis.inMemoryProposalsStore) {
        const mToken = normalizeToken(memProp.token);
        try {
          await Proposal.findOneAndUpdate(
            { token: mToken },
            { ...memProp, token: mToken },
            { upsert: true, new: true }
          );
        } catch {}
      }
    }

    proposals = await Proposal.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { proposals },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching proposals from MongoDB, using fallback store:", err);
    return NextResponse.json(
      { proposals: getAllFallbackProposals() },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = (body.title || "").trim() || "Apartment Shopping Expo Proposal";
    const associationName =
      (body.associationName || "").trim() ||
      (body.clientName || "").trim() ||
      "Residents Welfare Association";
    const clientName = (body.clientName || "").trim() || associationName;

    const rawToken =
      (body.token || "").trim() ||
      `${associationName || title}-${Date.now()}`;
    const token = normalizeToken(rawToken);

    const contactPerson = (body.contactPerson || "").trim() || "RWA Secretary / Committee";
    const email = (body.email || "").trim() || "mpdreameventssolutions@gmail.com";
    const phone = (body.phone || "").trim() || "+91 73389 99723";
    const eventDate = (body.eventDate || "").trim() || "Upcoming Weekend";
    const venue = (body.venue || "").trim() || "Central Society Arena / Clubhouse";
    const expectedAttendance =
      (body.expectedAttendance || "").trim() || "1,200+ Resident Families (Approx. 4,000 Attendees)";

    const scopeOfWork = Array.isArray(body.scopeOfWork) && body.scopeOfWork.length > 0
      ? body.scopeOfWork
      : [
          {
            item: "Commercial Pop-Up Canopies & Stalls",
            description: "20 weatherproof outdoor canopies (10x10 ft) with tables, frilled covers & chairs.",
            amount: 0,
          },
          {
            item: "Electrical Infrastructure & Lighting Setup",
            description: "Central power distribution junction box, LED floodlights & silent generator backup.",
            amount: 0,
          },
          {
            item: "Audio Equipment & Resident PA",
            description: "High-clarity sound system, announcement microphones & evening family DJ.",
            amount: 0,
          },
        ];

    const inclusions = Array.isArray(body.inclusions) && body.inclusions.length > 0
      ? body.inclusions
      : [
          "20 Commercial vendor canopies with tables, lighting & power connections.",
          "Complete electrical distribution and silent generator backup.",
          "Professional audio system and family DJ setup.",
          "Dedicated on-ground operations marshals & 100% waste clearance crew.",
          "Zero cost and zero financial liability for the Residents Welfare Association.",
        ];

    const exclusions = Array.isArray(body.exclusions) && body.exclusions.length > 0
      ? body.exclusions
      : [
          "Direct vendor sales settlements (handled directly with vendors).",
          "Special external municipal permissions (handled jointly with RWA).",
        ];

    const terms = Array.isArray(body.terms) && body.terms.length > 0
      ? body.terms
      : [
          "Stall setup begins 12 hours prior to event commencement with zero obstruction to resident parking.",
          "Zero financial liability for the Residents Welfare Association.",
          "Strict adherence to society quiet hours post 10:00 PM for audio equipment.",
          "Dedicated MP Dream Events cleaning marshals ensure 100% waste clearance post-event.",
          "Vendor staff and vehicles verified with security gate passes in advance.",
        ];

    const services = Array.isArray(body.services) && body.services.length > 0
      ? body.services
      : [
          "Stall & Vendor Curation",
          "Stage & Lighting Setup",
          "Sound Systems & AV",
          "Kids Rides & Carnival Games",
          "Security & Crowd Management",
          "Electrical & Silent Generator Backup",
        ];

    const aliases = Array.from(new Set([
      token,
      normalizeToken(associationName),
      normalizeToken(clientName),
      normalizeToken(title),
      ...(Array.isArray(body.aliases) ? body.aliases.map((a: string) => normalizeToken(a)) : []),
    ])).filter(Boolean);

    const payload = {
      title,
      associationName,
      clientName,
      token,
      aliases,
      contactPerson,
      email,
      phone,
      eventType: body.eventType || "Apartment Expo & Carnival",
      eventDate,
      venue,
      expectedAttendance,
      scopeOfWork,
      inclusions,
      exclusions,
      terms,
      services,
      totalAmount: typeof body.totalAmount === "number" ? body.totalAmount : 0,
      advanceRequired: typeof body.advanceRequired === "number" ? body.advanceRequired : 0,
      status: body.status || "pending",
      paymentStatus: body.paymentStatus || "pending",
      version: 1,
      createdAt: new Date().toISOString(),
    };

    let savedDbDoc = null;
    try {
      await connectDB();
      // Upsert into MongoDB so it is always persisted and never fails on duplicate key
      savedDbDoc = await Proposal.findOneAndUpdate(
        { token },
        { ...payload, token, version: 1 },
        { upsert: true, new: true, runValidators: false }
      );
      console.log(`[Proposal] Successfully persisted to MongoDB: token=${token}`);
    } catch (dbErr) {
      console.warn("MongoDB unavailable or error saving proposal, saving in memory store:", dbErr);
    }

    const fallbackProposal: ProposalItem = {
      ...payload,
      _id: savedDbDoc ? savedDbDoc._id.toString() : `offline-${Date.now()}`,
      revisionHistory: [
        {
          action: "Proposal Created",
          performedBy: "Admin",
          timestamp: new Date().toISOString(),
          notes: "Created via Admin Management Portal with customized terms.",
        },
      ],
    };

    if (!globalThis.inMemoryProposalsStore) {
      globalThis.inMemoryProposalsStore = [...initialSampleProposals];
    }
    const existingIdx = globalThis.inMemoryProposalsStore.findIndex(
      (p) => normalizeToken(p.token) === token
    );
    if (existingIdx >= 0) {
      globalThis.inMemoryProposalsStore[existingIdx] = fallbackProposal;
    } else {
      globalThis.inMemoryProposalsStore.unshift(fallbackProposal);
    }

    const returnProposal = savedDbDoc ? savedDbDoc.toObject ? savedDbDoc.toObject() : savedDbDoc : fallbackProposal;

    return NextResponse.json(
      {
        message: "Proposal created successfully! Unique client approval link is active.",
        proposal: returnProposal,
        link: `/approval/${token}`,
        token,
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: unknown) {
    console.error("Error creating proposal:", err);
    const message = err instanceof Error ? err.message : "Failed to create proposal";
    return NextResponse.json({ message }, { status: 500 });
  }
}
