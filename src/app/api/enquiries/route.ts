import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { getAdminSession } from "@/lib/auth";

export interface EnquiryRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  createdAt: string | Date;
}

declare global {
  var inMemoryEnquiriesStore: EnquiryRecord[] | undefined;
}

if (!globalThis.inMemoryEnquiriesStore) {
  globalThis.inMemoryEnquiriesStore = [];
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    try {
      const text = await request.text();
      body = JSON.parse(text);
    } catch {
      body = {};
    }
  }

  const name = typeof body.name === "string" && body.name.trim() ? body.name.trim() : "Website Visitor";
  const email = typeof body.email === "string" && body.email.trim() ? body.email.trim().toLowerCase() : "enquiry@mpdreamevents.com";
  const phone = typeof body.phone === "string" && body.phone.trim() ? body.phone.trim() : "+91 73389 99723";
  const service = typeof body.service === "string" && body.service.trim() ? body.service.trim() : "Event & Stall Management";
  const message = typeof body.message === "string" && body.message.trim() ? body.message.trim() : "General enquiry submitted via website.";

  const sanitizedData = {
    ...body,
    name,
    email,
    phone,
    service,
    message,
  };

  let enquiryId = `enq-${Date.now()}`;
  let savedToDb = false;

  try {
    await connectDB();
    const enquiry = await Enquiry.create(sanitizedData);
    enquiryId = enquiry._id.toString();
    savedToDb = true;
  } catch (dbErr) {
    console.warn("MongoDB unavailable for enquiry submission, saving to in-memory fallback store:", dbErr);
  }

  if (!savedToDb) {
    const fallbackItem: EnquiryRecord = {
      _id: enquiryId,
      name,
      email,
      phone,
      service,
      message,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    if (!globalThis.inMemoryEnquiriesStore) {
      globalThis.inMemoryEnquiriesStore = [];
    }
    globalThis.inMemoryEnquiriesStore.unshift(fallbackItem);
  }

  return NextResponse.json(
    {
      message: "Your enquiry has been successfully submitted.",
      id: enquiryId,
    },
    { status: 201 }
  );
}

export async function GET() {
  try {
    try {
      await connectDB();
      const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
      return NextResponse.json({ enquiries }, { status: 200 });
    } catch (dbErr) {
      console.warn("MongoDB unavailable for fetching enquiries, returning in-memory store:", dbErr);
      return NextResponse.json({ enquiries: globalThis.inMemoryEnquiriesStore || [] }, { status: 200 });
    }
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    return NextResponse.json({ enquiries: globalThis.inMemoryEnquiriesStore || [] }, { status: 200 });
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

    try {
      await connectDB();
      const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
      return NextResponse.json({ message: "Updated status", enquiry: updated }, { status: 200 });
    } catch (dbErr) {
      console.warn("MongoDB unavailable for enquiry status update, updating in-memory store:", dbErr);
      const list = globalThis.inMemoryEnquiriesStore || [];
      const item = list.find((e) => e._id === id);
      if (item) {
        item.status = status;
      }
      return NextResponse.json({ message: "Updated status", enquiry: item }, { status: 200 });
    }
  } catch (error) {
    console.error("Failed to update enquiry status:", error);
    return NextResponse.json({ message: "Error updating status" }, { status: 500 });
  }
}
