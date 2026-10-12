import { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import BusinessDivisions from "@/components/home/BusinessDivisions";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import VendorOpportunitiesSection from "@/components/home/VendorOpportunitiesSection";
import PortfolioTrustSection from "@/components/home/PortfolioTrustSection";
import EnquiryFooterSection from "@/components/home/EnquiryFooterSection";

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

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero Banner */}
      <HeroBanner />

      {/* Section 2: Business Divisions */}
      <BusinessDivisions />

      {/* Section 3: Upcoming Events (Instant 0ms Load with Local Storage Cache) */}
      <UpcomingEventsSection />

      {/* Section 4: Vendor Opportunities */}
      <VendorOpportunitiesSection />

      {/* Section 5: Portfolio and Trust */}
      <PortfolioTrustSection />

      {/* Section 6: Enquiry and Contact */}
      <EnquiryFooterSection />
    </>
  );
}
