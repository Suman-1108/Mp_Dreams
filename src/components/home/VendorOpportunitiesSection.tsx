import Link from "next/link";
import { ShoppingBag, Users, Zap, Award, CheckCircle, ArrowRight } from "lucide-react";

export default function VendorOpportunitiesSection() {
  const stallCategories = [
    { title: "Apparel & Fashion Wear", count: "Ethnic & Western Collections" },
    { title: "Handicrafts & Home Decor", count: "Artisan & Handmade Goods" },
    { title: "Jewelry & Accessories", count: "Custom & Fashion Jewelry" },
    { title: "Organic & Gourmet Foods", count: "Artisanal Snacks & Beverages" },
    { title: "Kids Toys & Educational", count: "Games, Books & Stationery" },
    { title: "Wellness & Cosmetics", count: "Skincare & Herbal Products" },
  ];

  const steps = [
    { step: "01", title: "Submit Vendor Form", desc: "Select your target event or community expo in Chennai." },
    { step: "02", title: "Slot Confirmation", desc: "Our team reviews your product category and assigns stall space." },
    { step: "03", title: "Setup & Showcase", desc: "Arrive on event day to full electrical & table setup for high footfall sales." },
  ];

  return (
    <section className="py-24 bg-black text-white relative border-b border-zinc-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase">
            Vendor & Retailer Opportunities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-syne text-white">
            Grow Your Brand at High-Footfall Apartment Expos
          </h2>
          <p className="text-slate-400 text-base">
            Reach thousands of gated community residents directly. High intent buyers, prime weekend slots, and organized stall management.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white mb-6 text-center font-syne">
            Popular Stall Categories in Demand
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stallCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-amber-500/50 transition flex items-center space-x-4 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{cat.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Step Process */}
        <div className="bg-zinc-950 p-8 sm:p-12 rounded-3xl border border-zinc-900">
          <h3 className="text-2xl font-bold text-white text-center mb-10 font-syne">
            3-Step Easy Vendor Registration Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <div key={idx} className="relative space-y-3">
                <div className="text-4xl font-black text-amber-500/40 tracking-widest font-syne">{s.step}</div>
                <h4 className="text-lg font-bold text-white font-syne">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center pt-8 border-t border-zinc-900">
            <Link
              href="/vendors/register"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              <span>Apply For Vendor Stall Space</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
