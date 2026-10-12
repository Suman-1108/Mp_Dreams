import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    await connectDB();

    const proposal = await Proposal.findOne({ token }).lean();

    if (!proposal) {
      return NextResponse.json(
        { message: "Proposal not found or access link expired" },
        { status: 404 }
      );
    }

    return NextResponse.json({ proposal });
  } catch (err: any) {
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

    await connectDB();
    const proposal = await Proposal.findOne({ token });

    if (!proposal) {
      return NextResponse.json(
        { message: "Proposal not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      proposal.status = "approved";
      proposal.approverDetails = {
        name: approverName || "Authorized Representative",
        designation: designation || "Association Committee Member",
        organization: organization || proposal.associationName || proposal.clientName,
        approvedAt: new Date(),
        comments: comments || "Approved online via MP Dream Events Client Approval Portal.",
      };

      proposal.revisionHistory.push({
        action: "Proposal Approved",
        performedBy: approverName || "Client",
        timestamp: new Date(),
        notes: comments || "Digital sign-off completed.",
      });

      await proposal.save();

      return NextResponse.json({
        message: "Proposal approved successfully! Final confirmation document has been generated.",
        proposal,
      });
    } else if (action === "request_changes") {
      proposal.status = "changes_requested";
      proposal.revisionHistory.push({
        action: "Changes Requested",
        performedBy: approverName || "Client",
        timestamp: new Date(),
        notes: comments || "Client requested changes to scope or budget.",
      });

      await proposal.save();

      return NextResponse.json({
        message: "Your change requests have been recorded. MP Dream Events team will revise the proposal shortly.",
        proposal,
      });
    } else if (action === "reject") {
      proposal.status = "rejected";
      proposal.revisionHistory.push({
        action: "Proposal Rejected",
        performedBy: approverName || "Client",
        timestamp: new Date(),
        notes: comments || "Client declined proposal.",
      });

      await proposal.save();

      return NextResponse.json({
        message: "Proposal status updated to declined.",
        proposal,
      });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    console.error("Error processing proposal action:", err);
    return NextResponse.json(
      { message: err?.message || "Failed to process proposal action" },
      { status: 500 }
    );
  }
}
