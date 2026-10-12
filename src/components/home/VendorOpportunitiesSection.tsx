import Link from "next/link";
import { ArrowRight, Check, Zap, ShieldCheck } from "lucide-react";

export default function VendorOpportunitiesSection() {
  const steps = [
    {
      num: "01.",
      title: "Understand Your Goals",
      desc: "We analyze your brand, product category, and target audience to recommend the highest footfall gated apartment festivals in Chennai that match your vision.",
    },
    {
      num: "02.",
      title: "Plan & Slot Allocation",
      desc: "Select your preferred canopy stall layout. We enforce category capping so your brand never faces saturated in-event competition.",
    },
    {
      num: "03.",
      title: "Turnkey Stall Setup",
      desc: "Arrive on event day to a ready-to-sell space equipped with covered weather-safe canopies, decorated tables, bright illumination, and electrical points.",
    },
    {
      num: "04.",
      title: "Launch & Drive Sales",
      desc: "Open your counter to 1,500+ resident families, conduct live demonstrations, take direct instant digital payments, and grow your repeat customer base.",
    },
  ];

  const categories = [
    "Apparel & Fashion Wear",
    "Handicrafts & Home Decor",
    "Jewelry & Accessories",
    "Organic & Gourmet Foods",
    "Books, Stationery & Pickles",
    "Car Promotional Displays",
  ];

  const stallPackages = [
    {
      name: "Low-Budget Stall",
      subtitle: "For books & stationery, homemade pickles, kids toys & craft artisans.",
      badge: "Artisans & Small Creators",
      originalPrice: "₹5,000",
      offerPrice: "₹3,499",
      discount: "30% OFF",
      priceSub: "/ day / stall",
      features: [
        "1 Canopy Display Table (6x3 ft)",
        "Vendor Chairs & Setup included",
        "Continuous Electricity Connection",
        "1,000+ Resident Footfall Audience",
        "WhatsApp Notice & Resident Announcement",
        "No Hidden / Extra Facility Fee",
      ],
      planKey: "budget",
      isPopular: false,
    },
    {
      name: "Standard Stall",
      subtitle: "For apparel & fashion, designer jewelry, gourmet foods & commercial retail.",
      badge: "Most Popular",
      originalPrice: "₹10,000",
      offerPrice: "₹7,999",
      discount: "20% OFF",
      priceSub: "/ day / stall",
      features: [
        "Prime Walkway / Clubhouse Slot",
        "Dedicated Power Sockets & LED Lighting",
        "Complete Table & Chair Amenities included",
        "Strict Category Exclusivity Capping",
        "High-Intent Resident Footfall Access",
        "Official Event Day Ground Assistance",
      ],
      planKey: "standard",
      isPopular: true,
    },
    {
      name: "Car Promotional Displays",
      subtitle: "Automobile dealerships, test-drive promotions & corporate brand activations.",
      badge: "Automobile & Corporate",
      originalPrice: "₹13,999",
      offerPrice: "₹9,999",
      discount: "29% OFF",
      priceSub: "/ vehicle showcase",
      features: [
        <span key="feat-4seater">
          4-Seater Car Display: <span className="line-through text-zinc-500">₹12,000</span>{" "}
          <span className="text-emerald-400 font-bold">offer 9,999</span>
        </span>,
        <span key="feat-7seater">
          7-Seater Car Display: <span className="line-through text-zinc-500">₹14,000</span>{" "}
          <span className="text-emerald-400 font-bold">offer 11,999</span>
        </span>,
        "Premium Branded Car: ₹15,000 – ₹30,000",
        "Central Courtyard Vehicle Placement",
        "Resident Test-Drive Access Rights",
        "Entrance Arch & Stage Branding Options",
      ],
      planKey: "car-display",
      isPopular: false,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-black text-white relative border-b border-zinc-900 selection:bg-purple-600 selection:text-white">
      {/* Background glow wrapped in a separate clipped container so sticky pinning works reliably */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-purple-900/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-950/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            PART 1: HOW WE WORK (Sticky Left Side, Scrolling Steps on Right)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-16 sm:pb-20 border-b border-zinc-900">
          
          {/* Left Column: Pinned Sticky as the Right Steps Scroll */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28 self-start pt-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              <span>HOW WE WORK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] font-outfit">
              From concept to launch, <br />
              <span className="text-purple-400">step by step</span>
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A hassle-free 4-step execution roadmap for vendors, designers, and local entrepreneurs to showcase their products inside Chennai&apos;s premier gated communities and mega expos.
            </p>

            {/* Popular categories tags */}
            <div className="pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Popular Categories in Demand
              </p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-purple-950/30 text-zinc-300 border border-purple-900/40 hover:border-purple-500/50 hover:text-purple-200 transition"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/vendors/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/30 transform hover:-translate-y-0.5"
              >
                <span>Apply For Vendor Stall Space</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Steps that scroll down smoothly past the pinned left column */}
          <div className="lg:col-span-7 flex flex-col">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className={`py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-start group ${
                  idx !== 0 ? "border-t border-zinc-900" : ""
                }`}
              >
                {/* Step Number on Left */}
                <div className="sm:col-span-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-400 group-hover:text-purple-300 font-outfit transition-colors">
                  {item.num}
                </div>

                {/* Step Content on Right */}
                <div className="sm:col-span-9 space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 font-outfit transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ========================================================
            PART 2: STALL PACKAGES & TRANSPARENT PRICING
            ======================================================== */}
        <div className="pt-12 sm:pt-16">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              <span>OFFICIAL STALL RATES & PACKAGES</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-outfit">
              Plans that <span className="text-purple-400">Fit Your Needs</span>
            </h3>

            <p className="text-zinc-400 text-xs sm:text-sm">
              Transparent per-day event stall rentals. All stalls include electricity connection, tables, and chairs with no extra facility fee.
            </p>
          </div>

          {/* 3 Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {stallPackages.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-zinc-950 border-2 border-purple-500 shadow-xl shadow-purple-950/40 sm:-translate-y-1.5"
                    : "bg-zinc-950 border border-zinc-900 shadow-lg hover:border-purple-500/50 hover:shadow-purple-950/20 hover:-translate-y-1"
                }`}
              >
                {/* Popular Pill */}
                {plan.isPopular && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-purple-600/40">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Title & Description */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg font-bold text-white font-outfit">
                        {plan.name}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30">
                        {plan.badge}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed pt-1">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Block with Struck-out Original Price & Offer Price */}
                  <div className="pt-4 pb-2 border-t border-zinc-900 my-4 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">Original:</span>
                      <span className="text-base sm:text-lg font-bold text-zinc-500 line-through decoration-rose-500/80 decoration-2 font-outfit">
                        {plan.originalPrice}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                        {plan.discount}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-outfit tracking-tight">
                        {plan.offerPrice}
                      </div>
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/20">
                        Offer Price
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-500 font-medium">
                      {plan.priceSub}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        {/* Purple Themed Circular Check Icon */}
                        <div className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-purple-400 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-2">
                  <Link
                    href={`/vendors/register?plan=${plan.planKey}`}
                    className={`w-full inline-flex items-center justify-center py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                      plan.isPopular
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30"
                        : "bg-zinc-900 hover:bg-purple-950/60 text-white border border-zinc-800 hover:border-purple-500/50 hover:text-purple-200"
                    }`}
                  >
                    <span>Book This Stall</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights & Guarantees bar */}
          <div className="mt-8 p-4 rounded-2xl bg-zinc-950/80 border border-purple-900/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
            <div className="flex items-center space-x-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Included Amenities:</strong> Electricity connection, table, and chairs with no separate fees.</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong>Cancellation Rollover:</strong> If you cancel, your stall can be rescheduled to the next eligible event.</span>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-400">
              Need custom booth dimensions, continuous live food counters, or multi-day discounts?{" "}
              <Link href="/contact" className="font-semibold text-purple-400 underline underline-offset-4 hover:text-purple-300 transition">
                Contact M. Prasanth (+91 73389 99723)
              </Link>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
