import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Vendor from "@/models/Vendor";
import { vendorSchema } from "@/lib/validation";
import { getAdminSession } from "@/lib/auth";

export interface VendorRecord {
  _id: string;
  businessName: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  stallRequirement?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string | Date;
}

declare global {
  var inMemoryVendorsStore: VendorRecord[] | undefined;
}

if (!globalThis.inMemoryVendorsStore) {
  globalThis.inMemoryVendorsStore = [];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = vendorSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Please check vendor details.";
      return NextResponse.json({ message: firstError }, { status: 400 });
    }

    let vendorId = `ven-${Date.now()}`;
    let savedToDb = false;

    try {
      await connectDB();
      const vendor = await Vendor.create(result.data);
      vendorId = vendor._id.toString();
      savedToDb = true;
    } catch (dbErr) {
      console.warn("MongoDB unavailable for vendor registration, saving in-memory:", dbErr);
    }

    if (!savedToDb) {
      const fallbackVendor: VendorRecord = {
        _id: vendorId,
        ...result.data,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      if (!globalThis.inMemoryVendorsStore) {
        globalThis.inMemoryVendorsStore = [];
      }
      globalThis.inMemoryVendorsStore.unshift(fallbackVendor);
    }

    return NextResponse.json(
      {
        message: "Vendor application submitted successfully! Our team will contact you shortly.",
        id: vendorId,
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
    try {
      await connectDB();
      const vendors = await Vendor.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ vendors }, { status: 200 });
    } catch (dbErr) {
      console.warn("MongoDB unavailable for fetching vendors, returning in-memory store:", dbErr);
      return NextResponse.json({ vendors: globalThis.inMemoryVendorsStore || [] }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json({ vendors: globalThis.inMemoryVendorsStore || [] }, { status: 200 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();

    try {
      await connectDB();
      const updated = await Vendor.findByIdAndUpdate(id, { status }, { new: true });
      return NextResponse.json({ vendor: updated }, { status: 200 });
    } catch (dbErr) {
      console.warn("MongoDB unavailable for vendor status update, updating in-memory store:", dbErr);
      const list = globalThis.inMemoryVendorsStore || [];
      const item = list.find((v) => v._id === id);
      if (item) {
        item.status = status;
      }
      return NextResponse.json({ vendor: item }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating vendor:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
