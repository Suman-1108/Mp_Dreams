import { Metadata } from "next";
import Link from "next/link";
import { Building2, Store, Users, CheckCircle2, ArrowRight } from "lucide-react";
import VendorOpportunitiesSection from "@/components/home/VendorOpportunitiesSection";

export const metadata: Metadata = {
  title: "Apartment Events & Stall Expos Chennai | MP Dream Events",
  description:
    "Organize or participate in premier apartment events and expos in Chennai gated communities. High resident footfall, full stall setup, and targeted marketing.",
};

export default function ExpoPage() {
  const highlights = [
    { title: "1,000+ Resident Families", desc: "Target high-density luxury gated societies across OMR, ECR, Porur & Velachery." },
    { title: "Standard Canopy Stalls", desc: "Sturdy waterproof canopy structures, electrical points, table & chairs provided." },
    { title: "Promotional Banner & App Alerts", desc: "Prior event publicity via society broadcast groups & printed banners." },
    { title: "Full On-Site Staffing", desc: "MP Dream Events staff on-ground to manage security, crowd flow & power supply." },
  ];

  return (
    <div className="py-16 sm:py-24 bg-black text-white space-y-20 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase">
            Gated Community Exhibitions & Events
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            Apartment Events, Expos & Bazaars
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Connecting passionate retail vendors with active buyers right inside apartment communities and gated societies.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-2 hover:border-purple-500/40 transition shadow-lg">
              <div className="text-amber-400 font-extrabold text-lg font-syne">{item.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Vendor Opportunities Component */}
        <VendorOpportunitiesSection />

        {/* Association / RWA Hosting CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-900 max-w-4xl mx-auto text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl font-bold text-white font-syne">Are You An Apartment Society RWA / Committee?</h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Host a vibrant weekend apartment event or festive bazaar in your society complex at zero cost to the RWA! We handle 100% of vendor setup, security, permits, and clean up.
          </p>
          <div>
            <Link
              href="/contact?service=Apartment%20Events%20%26%20Expos"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5"
            >
              <span>Host An Apartment Event / Expo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
