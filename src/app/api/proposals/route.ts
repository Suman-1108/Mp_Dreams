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

    if (proposals.length === 0) {
      // Seed sample proposals
      await Proposal.insertMany(initialSampleProposals);
      proposals = await Proposal.find().sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json({ proposals });
  } catch (err) {
    console.error("Error fetching proposals:", err);
    return NextResponse.json({ proposals: getAllFallbackProposals() });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rawToken =
      body.token ||
      `${body.associationName || body.clientName || "proposal"}-${Date.now()}`;
    const token = normalizeToken(rawToken);

    let newProposal = null;
    try {
      await connectDB();
      newProposal = await Proposal.create({
        ...body,
        token,
        version: 1,
      });
    } catch (dbErr) {
      console.warn("MongoDB unavailable for creating proposal, storing in memory:", dbErr);
    }

    const fallbackProposal: ProposalItem = {
      ...body,
      token,
      version: 1,
      status: body.status || "pending",
      paymentStatus: body.paymentStatus || "pending",
      createdAt: new Date().toISOString(),
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
    // Prepend to fallback store
    globalThis.inMemoryProposalsStore.unshift(fallbackProposal);

    return NextResponse.json(
      {
        message: "Proposal created successfully! Unique client approval link is active.",
        proposal: newProposal || fallbackProposal,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error creating proposal:", err);
    const message = err instanceof Error ? err.message : "Failed to create proposal";
    return NextResponse.json({ message }, { status: 500 });
  }
}
