import { Metadata } from "next";
import Link from "next/link";
import UpcomingEventsSection from "@/components/home/UpcomingEventsSection";
import {
  Store,
  Sparkles,
  Building,
  Utensils,
  Car,
  Smile,
  Flame,
  Palette,
  Trophy,
  Sun,
  Gem,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "12 Event Types & Upcoming Apartment Expos Calendar | MP DREAM EVENTS",
  description:
    "Explore our 12 signature event categories and confirmed apartment events, flea markets, and community expos across Chennai. Reserve vendor stall spaces online.",
};

const TWELVE_EVENT_TYPES = [
  {
    num: "01",
    title: "Apartment Gated Society Bazaars",
    category: "apartment",
    icon: Store,
    pricing: "From ₹3,500 / day",
    audience: "1,500 – 3,000+ Resident Families",
    desc: "Vibrant weekend canopy flea markets hosted inside luxury residential townships with verified resident shoppers.",
    popularItems: "Apparel, organic produce, home decor, handmade snacks & jewelry",
  },
  {
    num: "02",
    title: "Luxury Wedding & Bridal Expos",
    category: "wedding",
    icon: Sparkles,
    pricing: "From ₹6,000 / day",
    audience: "3,000 – 8,000+ Wedding Shoppers",
    desc: "Grand matrimonial showcases featuring mandap decor, ethnic Kanchipuram silks, bridal makeup, and jewelry collections.",
    popularItems: "Silks, bridal designer wear, gold/diamond jewelry, photography",
  },
  {
    num: "03",
    title: "Corporate Tech & Business Summits",
    category: "corporate",
    icon: Building,
    pricing: "From ₹7,500 / day",
    audience: "1,000 – 2,500+ Corporate Professionals",
    desc: "High-impact tech park symposiums with GST & tax workshops, AV auditoriums, B2B sponsor stalls, and executive networking.",
    popularItems: "B2B tech services, financial products, gadgets, corporate gifts",
  },
  {
    num: "04",
    title: "Gourmet Food & Live Music Fests",
    category: "food-fest",
    icon: Utensils,
    pricing: "From ₹4,500 / day",
    audience: "4,000 – 10,000+ Foodies & Families",
    desc: "Open-air weekend culinary carnivals featuring acoustic band performances, multi-cuisine food trucks, and chef pop-ups.",
    popularItems: "Artisanal bakery, regional street food, mocktails, desserts & snacks",
  },
  {
    num: "05",
    title: "Automobile & Car Promotional Expos",
    category: "automobile",
    icon: Car,
    pricing: "₹8,000 – ₹20,000 / vehicle",
    audience: "High-income Car Buyers & IT Execs",
    desc: "Prime vehicle courtyard displays inside high-density apartment communities and tech parks with test-drive lead generation.",
    popularItems: "4-seater sedans, 7-seater SUVs, electric vehicles & luxury cars",
  },
  {
    num: "06",
    title: "Kids Carnivals & Family Fun Fairs",
    category: "kids-carnival",
    icon: Smile,
    pricing: "From ₹3,000 / day",
    audience: "1,200 – 2,800+ Kids & Parents",
    desc: "Exciting family weekend carnivals with bouncy castles, magic shows, student competitions, live popcorn, and toy stalls.",
    popularItems: "Educational toys, board games, storybooks, party favors & candy",
  },
  {
    num: "07",
    title: "Grand Diwali & Festive Shopping Melas",
    category: "festive-mela",
    icon: Flame,
    pricing: "From ₹4,000 / day",
    audience: "3,500 – 8,000+ Festive Shoppers",
    desc: "Pre-festive shopping bazaars inside large apartment societies with festive lighting, diyas, fireworks displays, and sweets.",
    popularItems: "Ethnic festive attire, brass diyas, dry fruits, gift hampers & sweets",
  },
  {
    num: "08",
    title: "Handloom, Khadi & Artisan Crafts",
    category: "handloom-crafts",
    icon: Palette,
    pricing: "₹2,000 – ₹2,500 / day (Budget Tier)",
    audience: "2,000 – 5,000+ Eco-conscious Buyers",
    desc: "Authentic exhibitions dedicated to direct weavers, traditional terracotta pottery, handmade wooden toys, and organic khadi.",
    popularItems: "Cotton handlooms, terracotta art, woodwork, handmade soaps",
  },
  {
    num: "09",
    title: "Sports Tournaments & Marathon Expos",
    category: "sports-fitness",
    icon: Trophy,
    pricing: "From ₹3,500 / day",
    audience: "1,500 – 4,000+ Athletes & Runners",
    desc: "Society badminton & cricket tournaments, 10K/half marathon bib distribution expos, and healthy lifestyle showcases.",
    popularItems: "Sports apparel, running gear, protein supplements & gym equipment",
  },
  {
    num: "10",
    title: "Cultural Village & Pongal Melas",
    category: "cultural-traditional",
    icon: Sun,
    pricing: "From ₹3,500 / day",
    audience: "2,500 – 6,000+ Society Residents",
    desc: "Traditional Tamil heritage celebrations with clay pot Pongal cooking, folk dances (Karagattam, Oyilattam), and rustic village stalls.",
    popularItems: "Clay cookware, sugarcane, traditional sweets, ethnic dhotis & sarees",
  },
  {
    num: "11",
    title: "Boutique Fashion & Lifestyle Pop-Ups",
    category: "fashion-lifestyle",
    icon: Gem,
    pricing: "From ₹5,500 / day",
    audience: "2,000 – 5,500+ Luxury Shoppers",
    desc: "Curated premium lifestyle pop-up exhibits featuring boutique western wear, designer bags, niche perfumes, and silver jewelry.",
    popularItems: "Designer couture, imported cosmetics, fashion accessories, luxury shoes",
  },
  {
    num: "12",
    title: "Children's Book Fairs & STEM Expos",
    category: "book-education",
    icon: BookOpen,
    pricing: "₹2,000 – ₹2,500 / day (Budget Tier)",
    audience: "1,800 – 4,500+ Students & Parents",
    desc: "Interactive educational exhibits featuring national book publishers, STEM robotics kits, student science experiments, and stationery.",
    popularItems: "Children's literature, STEM robotics, stationery, school backpacks",
  },
];

export default function EventsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* ========================================================
          HERO BANNER: 12 EVENT TYPES OVERVIEW
          ======================================================== */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-purple-950/20 via-black to-black border-b border-zinc-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Complete Event Management Spectrum</span>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-outfit text-white">
              12 Signature Event Types We Organize
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              From gated apartment flea markets and luxury automobile displays to grand wedding fairs and kids carnivals across Chennai.
            </p>
          </div>

          {/* Key Guarantees Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">All-Inclusive Basic Stalls</p>
                <p className="text-[11px] text-zinc-400">Power, table & chairs included (₹0 extra)</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Official Pricing Scale</p>
                <p className="text-[11px] text-zinc-400">Low-budget ₹2,000 | Standard ₹3,500+</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center gap-3">
              <Store className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Chennai Wide Coverage</p>
                <p className="text-[11px] text-zinc-400">OMR, ECR, Porur, Guindy & Anna Nagar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          12 SIGNATURE EVENT TYPES MATRIX
          ======================================================== */}
      <section className="py-16 sm:py-20 bg-zinc-950/50 border-b border-zinc-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-purple-400 font-bold text-xs tracking-widest uppercase mb-1">
                OUR COMPREHENSIVE SPECIALTIES
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-outfit text-white">
                Explore The 12 Types of Events
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Each event format is customized with specialized stall setups, footfall marketing, security, and power infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TWELVE_EVENT_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.num}
                  className="p-6 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-purple-950/20"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-zinc-600 font-outfit">
                        {type.num}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors font-outfit">
                        {type.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {type.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-zinc-900 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Footfall:</span>
                        <span className="font-semibold text-zinc-200 text-[11px]">{type.audience}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Pricing:</span>
                        <span className="font-bold text-amber-400 text-[11px]">{type.pricing}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Top Categories:</span>
                        <p className="text-[11px] text-zinc-400 leading-tight italic">{type.popularItems}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-900">
                    <Link
                      href={`/vendors/register?category=${encodeURIComponent(type.title)}`}
                      className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-purple-600 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 border border-zinc-800 hover:border-purple-500"
                    >
                      <span>Book Stall in this Type</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          LIVE UPCOMING EVENTS CALENDAR (ALL 12 EVENTS + FILTERS)
          ======================================================== */}
      <UpcomingEventsSection showAllInitially={true} />

      {/* ========================================================
          APARTMENT RWA & CORPORATE CLIENT PROPOSAL BANNER
          ======================================================== */}
      <section className="py-16 bg-gradient-to-b from-black to-zinc-950 border-t border-zinc-900">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-purple-900/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <div className="text-purple-400 text-xs font-bold tracking-widest uppercase">
                APARTMENT ASSOCIATIONS & CORPORATE HR
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-outfit">
                Host An Event In Your Society Or Tech Park
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Get a customized event proposal, canopy stall layout map, vendor list, and transparent budget quotation with our digital approval portal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/30"
              >
                Request Society Proposal
              </Link>
              <Link
                href="/approval/omr-prestige-bella-vista-2026"
                className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Preview Client Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
