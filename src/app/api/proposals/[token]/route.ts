import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import {
  normalizeToken,
  getFallbackProposalByToken,
  updateFallbackProposal,
  ProposalItem,
} from "@/lib/sampleProposals";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const normToken = normalizeToken(token);

    try {
      await connectDB();
      const proposal = await Proposal.findOne({
        $or: [{ token }, { token: normToken }],
      }).lean();

      if (proposal) {
        return NextResponse.json({ proposal });
      }
    } catch (dbErr) {
      console.warn("MongoDB connection unavailable for proposal, checking fallback:", dbErr);
    }

    const fallback = getFallbackProposalByToken(token);
    if (fallback) {
      return NextResponse.json({ proposal: fallback });
    }

    return NextResponse.json(
      { message: "Proposal not found or access link expired" },
      { status: 404 }
    );
  } catch (err: unknown) {
    console.error("Error fetching proposal:", err);
    return NextResponse.json(
      { message: "Failed to fetch proposal details" },
      { status: 500 }
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
    const { action, approverName, designation, organization, comments } = body;
    const normToken = normalizeToken(token);

    const fallback = getFallbackProposalByToken(token);
    let proposalData: ProposalItem | null = fallback;

    let dbProposal = null;
    try {
      await connectDB();
      dbProposal = await Proposal.findOne({
        $or: [{ token }, { token: normToken }],
      });
    } catch (dbErr) {
      console.warn("MongoDB unavailable during proposal update, updating in-memory:", dbErr);
    }

    if (!dbProposal && !fallback) {
      return NextResponse.json(
        { message: "Proposal not found" },
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
        dbProposal.approverDetails = approverDetails;
        dbProposal.revisionHistory.push(historyEntry);
        await dbProposal.save();
        proposalData = dbProposal.toObject();
      }

      const updatedFallback = updateFallbackProposal(token, {
        status: "approved",
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
