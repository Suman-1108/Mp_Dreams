import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { eventSchema } from "@/lib/validation";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const admin = searchParams.get("admin");

    await connectDB();

    const query: Record<string, unknown> = {};
    if (admin !== "true") {
      query.published = true;
    }
    if (category && category !== "all") {
      query.category = category;
    }

    const events = await Event.find(query).sort({ startDate: 1 }).lean();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ message: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const result = eventSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid event data", errors: result.error.flatten() }, { status: 400 });
    }

    await connectDB();
    const newEvent = await Event.create({
      ...result.data,
      availableStalls: result.data.availableStalls || result.data.totalStalls,
    });

    return NextResponse.json({ message: "Event created successfully", event: newEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ message: "Failed to create event" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updates } = await request.json();
    await connectDB();
    const updated = await Event.findByIdAndUpdate(id, updates, { new: true });
    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
