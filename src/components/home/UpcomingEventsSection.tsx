import Link from "next/link";
import Image from "next/image";
import { MapPin, Store, ArrowRight } from "lucide-react";

interface EventItem {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  startDate: string;
  stallPrice?: number;
  totalStalls?: number;
  availableStalls?: number;
  coverImage?: string;
}

export default function UpcomingEventsSection({ events = [] }: { events?: EventItem[] }) {
  const displayEvents = events.length > 0 ? events : [
    {
      _id: "demo-1",
      title: "OMR Apartment Festive Shopping Expo 2026",
      slug: "omr-apartment-festive-shopping-expo-2026",
      category: "apartment",
      description: "Exclusive 2-day shopping flea market inside luxury gated community with 1500+ resident families.",
      location: "Navalur, OMR, Chennai",
      startDate: "2026-10-24",
      stallPrice: 3500,
      totalStalls: 25,
      availableStalls: 8,
      coverImage: "/images/apartment-expo.jpg",
    },
    {
      _id: "demo-2",
      title: "Chennai Corporate Business & Tax Summit",
      slug: "chennai-corporate-tax-summit-2026",
      category: "corporate",
      description: "Leadership gathering featuring GST strategy workshops, commercial stalls & executive networking.",
      location: "Guindy Tech Hub, Chennai",
      startDate: "2026-11-05",
      stallPrice: 7500,
      totalStalls: 15,
      availableStalls: 3,
      coverImage: "/images/corporate-stage.jpg",
    },
    {
      _id: "demo-3",
      title: "Anna Nagar Community Artisan & Food Fair",
      slug: "anna-nagar-community-artisan-fair",
      category: "community",
      description: "Bustling weekend pop-up exhibition featuring organic foods, handmade crafts & jewelries.",
      location: "Anna Nagar East, Chennai",
      startDate: "2026-11-14",
      stallPrice: 4000,
      totalStalls: 30,
      availableStalls: 12,
      coverImage: "/images/wedding-stage.jpg",
    },
    {
      _id: "demo-4",
      title: "Porur Township Grand Diwali Bazaar",
      slug: "porur-township-diwali-bazaar",
      category: "apartment",
      description: "Pre-festive shopping extravaganza inside 2000+ flat residential township.",
      location: "Porur, Chennai",
      startDate: "2026-11-28",
      stallPrice: 4500,
      totalStalls: 35,
      availableStalls: 15,
      coverImage: "/images/hero-banner.jpg",
    },
  ];

  return (
    <section className="py-20 bg-black text-white border-b border-zinc-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-purple-400 font-bold text-xs tracking-widest uppercase mb-1">
              UPCOMING EXPOS & EXHIBITIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-syne">
              Catch Live Events & Expos
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition"
          >
            <span>View All Scheduled Events</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event) => {
            const dateObj = new Date(event.startDate);
            const dayNum = dateObj.getDate() || 24;
            const monthStr = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase() || "OCT";
            const bgImg = event.coverImage || "/images/apartment-expo.jpg";

            return (
              <div
                key={event._id || event.slug}
                className="dark-glass-card dark-glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Header with Date Overlay */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={bgImg}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Top Bar with Date Block */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-baseline space-x-1.5 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800">
                      <span className="text-2xl font-black text-amber-400 font-syne leading-none">{dayNum}</span>
                      <span className="text-[10px] font-bold text-purple-300 tracking-wider">{monthStr}</span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-zinc-800">
                      <ArrowRight className="w-3.5 h-3.5 text-purple-300 group-hover:text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
                      {event.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-2 leading-snug font-syne">
                      {event.title}
                    </h3>

                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-zinc-900 text-xs text-slate-300">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    {event.stallPrice !== undefined && (
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Stall: <strong className="text-white">₹{event.stallPrice.toLocaleString("en-IN")}</strong></span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/vendors/register?event=${encodeURIComponent(event.title)}`}
                    className="w-full text-center py-2.5 px-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition block mt-2 shadow-lg shadow-purple-600/20"
                  >
                    Book Stall Slot
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
