import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import {
  normalizeToken,
  getFallbackProposalByToken,
  updateFallbackProposal,
  proposalMatchesToken,
  ProposalItem,
} from "@/lib/sampleProposals";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const rawToken = token || "";
    const cleanToken = normalizeToken(rawToken);
    const decodedToken = decodeURIComponent(rawToken).trim().toLowerCase();
    const strippedToken = cleanToken.replace(/-/g, "");

    const escaped = cleanToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const fuzzyPattern = new RegExp(`^${escaped.replace(/-/g, "[- ]*")}$`, "i");

    let proposal = null;
    try {
      await connectDB();
      proposal = await Proposal.findOne({
        $or: [
          { token: cleanToken },
          { token: rawToken },
          { token: decodedToken },
          { aliases: cleanToken },
          { aliases: rawToken },
          { aliases: decodedToken },
          { token: { $regex: fuzzyPattern } },
        ],
      }).lean();

      // If still not found by direct match, search by matching stripped alphanumeric tokens or fuzzy proposal matches
      if (!proposal) {
        const allProps = await Proposal.find().lean();
        proposal = allProps.find((p: unknown) => {
          return proposalMatchesToken(p as ProposalItem, cleanToken, strippedToken, decodedToken);
        }) || null;
      }
    } catch (dbErr) {
      console.warn("MongoDB connection unavailable for proposal, checking fallback:", dbErr);
    }

    if (proposal) {
      return NextResponse.json(
        { proposal },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    const fallback =
      getFallbackProposalByToken(rawToken) ||
      getFallbackProposalByToken(cleanToken) ||
      getFallbackProposalByToken(decodedToken);

    if (fallback) {
      // Upsert into MongoDB so it stays permanently in database
      try {
        await connectDB();
        await Proposal.findOneAndUpdate(
          { token: normalizeToken(fallback.token) },
          { ...fallback, token: normalizeToken(fallback.token) },
          { upsert: true, new: true, runValidators: false }
        );
      } catch {}

      return NextResponse.json(
        { proposal: fallback },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      { message: "Proposal link not found. Please verify the link with MP Dream Events." },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: unknown) {
    console.error("Error fetching proposal:", err);
    return NextResponse.json(
      { message: "Failed to fetch proposal details" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await req.json();
    const { action, approverName, designation, organization, comments, services } = body;
    const cleanToken = normalizeToken(token);
    const escaped = cleanToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const fuzzyPattern = new RegExp(`^${escaped.replace(/-/g, "[- ]*")}$`, "i");

    const fallback = getFallbackProposalByToken(token) || getFallbackProposalByToken(cleanToken);
    let proposalData: ProposalItem | null = fallback;

    let dbProposal = null;
    try {
      await connectDB();
      dbProposal = await Proposal.findOne({
        $or: [
          { token: cleanToken },
          { token: token },
          { token: { $regex: fuzzyPattern } },
        ],
      });
    } catch (dbErr) {
      console.warn("MongoDB unavailable during proposal update, updating in-memory:", dbErr);
    }

    if (!dbProposal && !fallback) {
      return NextResponse.json(
        { message: "Proposal link not found. Please check with MP Dream Events." },
        { status: 404 }
      );
    }

    if (action === "approve") {
      const approverDetails = {
        name: approverName || "Authorized Representative",
        designation: designation || "Association Committee Member",
        organization: organization || (dbProposal?.associationName || fallback?.associationName || fallback?.clientName || "Residents Welfare Association"),
        approvedAt: new Date(),
        comments: comments || "Approved online via MP Dream Events Client Approval Portal.",
      };

      const historyEntry = {
        action: "Proposal Approved",
        performedBy: approverName || "Client",
        timestamp: new Date(),
        notes: comments || "Digital sign-off completed.",
      };

      if (dbProposal) {
        dbProposal.status = "approved";
        if (Array.isArray(services) && services.length > 0) {
          dbProposal.services = services;
        }
        dbProposal.approverDetails = approverDetails;
        dbProposal.revisionHistory.push(historyEntry);
        await dbProposal.save();
        proposalData = dbProposal.toObject();
      }

      const updatedFallback = updateFallbackProposal(token, {
        status: "approved",
        services: Array.isArray(services) && services.length > 0 ? services : fallback?.services,
        approverDetails,
        revisionHistory: [
          ...(fallback?.revisionHistory || []),
          historyEntry,
        ],
      });

      if (!proposalData) {
        proposalData = updatedFallback;
      }

      return NextResponse.json({
        message: "Proposal approved successfully! Final confirmation document has been generated.",
        proposal: proposalData,
      });
    } else if (action === "request_changes") {
      const historyEntry = {
        action: "Changes Requested",
        performedBy: approverName || "Client",
        timestamp: new Date(),
        notes: comments || "Client requested changes to scope or budget.",
      };

      if (dbProposal) {
        dbProposal.status = "changes_requested";
        dbProposal.revisionHistory.push(historyEntry);
        await dbProposal.save();
        proposalData = dbProposal.toObject();
      }

      const updatedFallback = updateFallbackProposal(token, {
        status: "changes_requested",
        revisionHistory: [
          ...(fallback?.revisionHistory || []),
          historyEntry,
        ],
      });

      if (!proposalData) {
        proposalData = updatedFallback;
      }

      return NextResponse.json({
        message: "Your change requests have been recorded. MP Dream Events team will revise the proposal shortly.",
        proposal: proposalData,
      });
    } else if (action === "reject") {
      const historyEntry = {
        action: "Proposal Rejected",
        performedBy: approverName || "Client",
        timestamp: new Date(),
        notes: comments || "Client declined proposal.",
      };

      if (dbProposal) {
        dbProposal.status = "rejected";
        dbProposal.revisionHistory.push(historyEntry);
        await dbProposal.save();
        proposalData = dbProposal.toObject();
      }

      const updatedFallback = updateFallbackProposal(token, {
        status: "rejected",
        revisionHistory: [
          ...(fallback?.revisionHistory || []),
          historyEntry,
        ],
      });

      if (!proposalData) {
        proposalData = updatedFallback;
      }

      return NextResponse.json({
        message: "Proposal status updated to declined.",
        proposal: proposalData,
      });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    console.error("Error processing proposal action:", err);
    const message = err instanceof Error ? err.message : "Failed to process proposal action";
    return NextResponse.json({ message }, { status: 500 });
  }
}
