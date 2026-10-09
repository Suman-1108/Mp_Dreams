import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Vendor from "@/models/Vendor";
import { vendorSchema } from "@/lib/validation";
import { getAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = vendorSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Please check vendor details.";
      return NextResponse.json({ message: firstError }, { status: 400 });
    }

    await connectDB();
    const vendor = await Vendor.create(result.data);

    return NextResponse.json(
      {
        message: "Vendor application submitted successfully! Our team will contact you shortly.",
        id: vendor._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Vendor registration error:", error);
    return NextResponse.json(
      { message: "Unable to process vendor application at this time." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const vendors = await Vendor.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ vendors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json({ message: "Failed to fetch vendors" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();
    await connectDB();
    const updated = await Vendor.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ vendor: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating vendor:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
