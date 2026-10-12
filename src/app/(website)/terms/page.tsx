import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowRight, Store, Zap, Phone, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Stall Booking Terms & Conditions | MP DREAM EVENTS",
  description:
    "Official terms and conditions for shopping expo stall bookings, apartment flea markets, and exhibition vendors with MP Dream Events & Solutions Chennai.",
};

export default function TermsAndConditionsPage() {
  const termsList = [
    {
      id: "01",
      title: "Booking Confirmation & Availability",
      content:
        "Vendors must submit a booking request for approval. A stall will be confirmed only after the required payment has been received. Stall availability will be updated automatically once a booking is confirmed.",
    },
    {
      id: "02",
      title: "Payment Terms & Invoicing",
      content:
        "The stall rental fee must be paid in full before the event begins. Online payments support UPI, debit & credit cards through our integrated payment gateway. Automated payment receipts and GST invoices are issued upon payment confirmation.",
    },
    {
      id: "03",
      title: "Cancellation and Refund Policy",
      content:
        "Payments are non-refundable after payment confirmation, subject to applicable laws. If an exhibitor cancels the booking, the organizer may offer a stall at the next eligible event instead of a monetary refund, subject to availability and confirmation.",
    },
    {
      id: "04",
      title: "Stall Allocation & Pricing",
      content:
        "Stall locations will be allocated by the event organizer. Standard stalls start from ₹3,500/day, low-budget categories (books, stationery, pickles, toys) at ₹2,000–₹3,000/day, and car promotional displays from ₹8,000–₹20,000. Changes to layout may be made if necessary.",
    },
    {
      id: "05",
      title: "Setup & Dismantling",
      content:
        "Exhibitors must complete stall setup within the permitted schedule before opening to residents and vacate the stall promptly after the event concludes.",
    },
    {
      id: "06",
      title: "Stall Usage & Non-Transferability",
      content:
        "Stalls must be used only for approved business activities. Subletting, sharing, or transferring stall space without prior written approval from the organizer is strictly prohibited.",
    },
    {
      id: "07",
      title: "Included Facilities Guarantee",
      content:
        "The stall rental price includes basic facilities: electricity connection, table, chairs, and other basic stall amenities. No separate charge will apply for these included basic facilities. Any optional premium services will be priced separately.",
    },
    {
      id: "08",
      title: "Cleanliness & Safety",
      content:
        "Exhibitors must maintain hygiene, proper waste disposal, and strictly adhere to all safety and electrical guidelines throughout the event.",
    },
    {
      id: "09",
      title: "Damage & Loss Liability",
      content:
        "Exhibitors are fully responsible for any damage caused to the stall structure, apartment property, or event fixtures by themselves or their staff.",
    },
    {
      id: "10",
      title: "Prohibited Items",
      content:
        "Illegal, hazardous, inflammable, unauthorized, or counterfeit products are strictly prohibited from exhibition premises.",
    },
    {
      id: "11",
      title: "Sales, Cash & Inventory",
      content:
        "Exhibitors are solely responsible for their merchandise, sales, cash collection, UPI QR machines, stock, and personal belongings at all times.",
    },
    {
      id: "12",
      title: "Event Organizer's Rights",
      content:
        "The organizer reserves the right to adjust event schedules, re-organize stall layout, or manage entry when required for public safety or crowd flow.",
    },
    {
      id: "13",
      title: "Unforeseen Circumstances",
      content:
        "In case of cancellation or schedule changes due to natural calamity, government regulations, or unforeseen community circumstances, the organizer will communicate alternative event rollover arrangements to exhibitors.",
    },
    {
      id: "14",
      title: "Legal Compliance",
      content:
        "Exhibitors must comply with all applicable local municipal laws, GST invoicing standards, gated community bylaws, and organizer directives.",
    },
    {
      id: "15",
      title: "Acceptance",
      content:
        "Submission of a booking request and payment of the stall booking fee constitutes complete, legally binding acceptance of these terms and conditions.",
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>OFFICIAL POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-outfit text-white">
            Shopping Expo – Stall Booking <br />
            <span className="text-purple-400">Terms & Conditions</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Please review the official guidelines governing stall reservations, pricing rules, cancellation rollover policy, and included amenities for all MP Dream Events exhibitions.
          </p>
        </div>

        {/* Quick Highlights Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 space-y-1 shadow-sm">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Included Amenities</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Electricity, display table & chairs are included with zero extra facility fee.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 space-y-1 shadow-sm">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Cancellation Rollover</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Non-refundable. If cancelled, rollover to the next eligible event is provided.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 space-y-1 shadow-sm">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official Rates</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Standard stalls from ₹3,500/day. Budget crafts at ₹2,000–₹3,000/day. Cars from ₹8k.
            </p>
          </div>
        </div>

        {/* Numbered Terms Grid */}
        <div className="space-y-4">
          {termsList.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-purple-500/40 transition-all duration-300 flex flex-col sm:flex-row sm:items-start gap-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 font-bold font-outfit text-sm flex items-center justify-center shrink-0">
                {item.id}
              </div>

              <div className="space-y-1.5 flex-grow">
                <h2 className="text-base sm:text-lg font-bold text-white font-outfit">
                  {item.title}
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action & Contact Footer */}
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center space-y-4">
          <h3 className="text-xl font-bold text-white font-outfit">
            Have Questions Regarding Stall Spaces?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Contact M. Prasanth at MP Dream Events Solutions for category validation, floor plan allocation, and corporate displays.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300 font-semibold">
            <Phone className="w-3.5 h-3.5 text-purple-400" />
            <span>M. Prasanth: +91 73389 99723</span>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/vendors/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/30"
            >
              <Store className="w-4 h-4" />
              <span>Apply For Vendor Stall Space</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-purple-500/40 text-xs font-semibold uppercase tracking-wider transition"
            >
              <span>Explore Upcoming Events</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
