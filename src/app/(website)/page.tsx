import { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import HeroBanner from "@/components/home/HeroBanner";
import BusinessDivisions from "@/components/home/BusinessDivisions";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import VendorOpportunitiesSection from "@/components/home/VendorOpportunitiesSection";
import PortfolioTrustSection from "@/components/home/PortfolioTrustSection";
import EnquiryFooterSection from "@/components/home/EnquiryFooterSection";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const metadata: Metadata = {
  title: "MP DREAM EVENTS & Solutions | Premier Event & Stall Management Chennai",
  description:
    "Leading event management company in Chennai specializing in luxury weddings, corporate events, apartment stall exhibitions, flea markets, and corporate tax & accounting solutions.",
  keywords: [
    "event management company in Chennai",
    "apartment exhibition organizers in Chennai",
    "wedding planners Chennai",
    "stall vendor registration Chennai",
    "flea market organizers Chennai",
    "accounting and tax services Chennai",
  ],
};

async function HomepageEventsFetcher() {
  await connection();
  let events: any[] = [];
  try {
    await connectDB();
    const dbEvents = await Event.find({ published: true }).sort({ startDate: 1 }).limit(6).lean();
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
    console.warn("Could not fetch DB events:", err);
  }
  return <UpcomingEventsSection events={events} />;
}

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero Banner */}
      <HeroBanner />

      {/* Section 2: Business Divisions */}
      <BusinessDivisions />

      {/* Section 3: Upcoming Events */}
      <Suspense fallback={<div className="py-12 text-center text-xs text-slate-500">Loading events...</div>}>
        <HomepageEventsFetcher />
      </Suspense>

      {/* Section 4: Vendor Opportunities */}
      <VendorOpportunitiesSection />

      {/* Section 5: Portfolio and Trust */}
      <PortfolioTrustSection />

      {/* Section 6: Enquiry and Contact */}
      <EnquiryFooterSection />
    </>
  );
}
