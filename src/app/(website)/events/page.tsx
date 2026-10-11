import { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";

export const metadata: Metadata = {
  title: "Upcoming Apartment Events & Expos Calendar | MP DREAM EVENTS",
  description:
    "Explore scheduled apartment events, exhibitions, flea markets, and community expos in Chennai. Reserve vendor stall spaces online.",
};

async function EventsListFetcher() {
  await connection();
  let events: any[] = [];
  try {
    await connectDB();
    const dbEvents = await Event.find({ published: true }).sort({ startDate: 1 }).lean();
    events = dbEvents.map((ev: any) => ({
      _id: ev._id.toString(),
      title: ev.title,
      slug: ev.slug,
      category: ev.category,
      description: ev.description,
      location: ev.location,
      startDate: ev.startDate ? new Date(ev.startDate).toISOString() : "2026-10-24",
      stallPrice: ev.stallPrice || 3500,
      totalStalls: ev.totalStalls || 20,
      availableStalls: ev.availableStalls || 10,
    }));
  } catch (err) {
    console.warn("Could not load database events:", err);
  }
  return <UpcomingEventsSection events={events} />;
}

export default function EventsPage() {
  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-purple-400 font-bold text-xs tracking-widest uppercase">
            LIVE SCHEDULE & STALL BOOKINGS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-outfit">
            Upcoming Apartment Events & Expos Calendar
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Browse our confirmed apartment events, community exhibitions, and stall bazaars across gated communities in Chennai.
          </p>
        </div>

        {/* Dynamic Events Grid with Suspense */}
        <Suspense fallback={<div className="text-center text-xs text-slate-500 py-12">Loading event schedule...</div>}>
          <EventsListFetcher />
        </Suspense>

      </div>
    </div>
  );
}
