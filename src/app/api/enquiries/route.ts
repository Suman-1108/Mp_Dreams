import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { enquirySchema } from "@/lib/validation";
import { getAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Please check your enquiry details.";
      return NextResponse.json(
        { message: firstError, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    await connectDB();

    const enquiry = await Enquiry.create(result.data);

    return NextResponse.json(
      {
        message: "Your enquiry has been successfully submitted.",
        id: enquiry._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry submission failed:", error);

    return NextResponse.json(
      { message: "Unable to submit your enquiry right now. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({ enquiries }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    return NextResponse.json({ message: "Error fetching enquiries" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ message: "Missing id or status" }, { status: 400 });
    }

    await connectDB();
    const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });

    return NextResponse.json({ message: "Updated status", enquiry: updated }, { status: 200 });
  } catch (error) {
    console.error("Failed to update enquiry status:", error);
    return NextResponse.json({ message: "Error updating status" }, { status: 500 });
  }
}
