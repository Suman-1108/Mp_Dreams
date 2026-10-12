"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Store,
  ArrowRight,
  Filter,
  Sparkles,
  Search,
  Building,
  Car,
  Utensils,
  Smile,
  Flame,
  Palette,
  Trophy,
  Sun,
  Gem,
  BookOpen,
} from "lucide-react";

export interface EventItem {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  description: string;
  location: string;
  startDate: string;
  stallPrice?: number;
  totalStalls?: number;
  availableStalls?: number;
  coverImage?: string;
}

export const EVENT_TYPES_LIST = [
  { id: "all", label: "All Events", shortLabel: "All", icon: Sparkles },
  { id: "apartment", label: "Apartment Bazaars", shortLabel: "Apartment", icon: Store },
  { id: "wedding", label: "Wedding & Bridal", shortLabel: "Weddings", icon: Sparkles },
  { id: "corporate", label: "Corporate & Tech", shortLabel: "Corporate", icon: Building },
  { id: "food-fest", label: "Food & Music Fests", shortLabel: "Food Fest", icon: Utensils },
  { id: "automobile", label: "Car Promotional Displays", shortLabel: "Car Display", icon: Car },
  { id: "kids-carnival", label: "Kids Carnivals", shortLabel: "Kids Fun", icon: Smile },
  { id: "festive-mela", label: "Festive Melas & Diwali", shortLabel: "Festive Melas", icon: Flame },
  { id: "handloom-crafts", label: "Handloom & Crafts", shortLabel: "Handloom", icon: Palette },
  { id: "sports-fitness", label: "Sports & Fitness Expos", shortLabel: "Sports", icon: Trophy },
  { id: "cultural-traditional", label: "Cultural & Pongal Melas", shortLabel: "Cultural", icon: Sun },
  { id: "fashion-lifestyle", label: "Fashion & Lifestyle", shortLabel: "Lifestyle", icon: Gem },
  { id: "book-education", label: "Book Fairs & STEM", shortLabel: "Book Fairs", icon: BookOpen },
];

export const DEFAULT_12_EVENTS: EventItem[] = [
  {
    _id: "evt-1",
    title: "OMR High-Density Society Grand Festive Bazaar 2026",
    slug: "omr-society-grand-festive-bazaar-2026",
    category: "apartment",
    categoryLabel: "Apartment Bazaar",
    description: "Exclusive 2-day shopping flea market inside luxury gated community with 1,500+ resident families.",
    location: "Navalur, OMR, Chennai",
    startDate: "2026-10-24",
    stallPrice: 3500,
    totalStalls: 25,
    availableStalls: 8,
    coverImage: "/images/gallery/apartment-bazaar.jpg",
  },
  {
    _id: "evt-2",
    title: "Pallavaram Luxury Wedding & Bridal Jewelry Fair 2027",
    slug: "pallavaram-luxury-wedding-bridal-fair",
    category: "wedding",
    categoryLabel: "Wedding & Bridal",
    description: "Premier bridal mandap decor, ethnic silks, customized gold & diamond jewelry collections for wedding shoppers.",
    location: "Pallavaram GST Road, Chennai",
    startDate: "2026-11-08",
    stallPrice: 6000,
    totalStalls: 20,
    availableStalls: 5,
    coverImage: "/images/wedding-stage.jpg",
  },
  {
    _id: "evt-3",
    title: "Guindy Tech Corridor Business & Corporate Tax Summit",
    slug: "guindy-tech-corridor-corporate-tax-summit",
    category: "corporate",
    categoryLabel: "Corporate & Tech",
    description: "Leadership gathering featuring GST strategy workshops, commercial sponsor stalls & executive networking.",
    location: "Guindy Tech Hub, Chennai",
    startDate: "2026-11-15",
    stallPrice: 7500,
    totalStalls: 15,
    availableStalls: 3,
    coverImage: "/images/corporate-stage.jpg",
  },
  {
    _id: "evt-4",
    title: "Hiranandani Promenade Gourmet Food & Acoustic Music Fest",
    slug: "hiranandani-promenade-gourmet-food-music-fest",
    category: "food-fest",
    categoryLabel: "Food & Music",
    description: "Mega gated promenade celebration with live acoustic band, multi-cuisine gourmet food stalls & festive retail.",
    location: "Egattur, OMR, Chennai",
    startDate: "2026-11-22",
    stallPrice: 4500,
    totalStalls: 35,
    availableStalls: 12,
    coverImage: "/images/gallery/food-street.jpg",
  },
  {
    _id: "evt-5",
    title: "Ambattur Tech Park Automobile & Car Promotional Showcase",
    slug: "ambattur-tech-park-automobile-showcase",
    category: "automobile",
    categoryLabel: "Car Display",
    description: "Dedicated 4-seater & 7-seater car display spaces, EV vehicle launches, test-drive registrations & corporate leads.",
    location: "Ambattur Industrial Estate, Chennai",
    startDate: "2026-11-29",
    stallPrice: 8000,
    totalStalls: 18,
    availableStalls: 4,
    coverImage: "/images/corporate-stage.jpg",
  },
  {
    _id: "evt-6",
    title: "Velachery Gated Society Kids Summer Carnival & Fun Fair",
    slug: "velachery-society-kids-carnival-fun-fair",
    category: "kids-carnival",
    categoryLabel: "Kids Carnival",
    description: "Weekend kids carnival with interactive games, toys, children's books, live popcorn counters & family shopping stalls.",
    location: "Velachery Inner Ring Road, Chennai",
    startDate: "2026-12-06",
    stallPrice: 3000,
    totalStalls: 24,
    availableStalls: 7,
    coverImage: "/images/gallery/apartment-carnival.jpg",
  },
  {
    _id: "evt-7",
    title: "Porur Township Grand Pre-Diwali Shopping Mela",
    slug: "porur-township-grand-diwali-mela",
    category: "festive-mela",
    categoryLabel: "Festive Mela",
    description: "Pre-festive shopping extravaganza inside 2,000+ flat residential township with high footfall & festive decor.",
    location: "Porur, Chennai",
    startDate: "2026-12-13",
    stallPrice: 4000,
    totalStalls: 36,
    availableStalls: 14,
    coverImage: "/images/apartment-expo.jpg",
  },
  {
    _id: "evt-8",
    title: "Anna Nagar Handloom, Khadi & Artisan Crafts Exhibition",
    slug: "anna-nagar-handloom-artisan-crafts-expo",
    category: "handloom-crafts",
    categoryLabel: "Handloom & Crafts",
    description: "Direct weaver stalls, traditional terracotta pottery, handmade wooden toys, organic textiles & craft workshops.",
    location: "Anna Nagar East, Chennai",
    startDate: "2026-12-20",
    stallPrice: 2500,
    totalStalls: 30,
    availableStalls: 10,
    coverImage: "/images/gallery/stall-setup.jpg",
  },
  {
    _id: "evt-9",
    title: "ECR Coastal Marathon Expo & Fitness Society League",
    slug: "ecr-coastal-marathon-fitness-expo",
    category: "sports-fitness",
    categoryLabel: "Sports & Fitness",
    description: "Athletic marathon bib expo, sports merchandise, nutritional health supplements & activewear displays.",
    location: "Injambakkam, ECR, Chennai",
    startDate: "2027-01-03",
    stallPrice: 3500,
    totalStalls: 22,
    availableStalls: 8,
    coverImage: "/images/gallery/apartment-cultural.jpg",
  },
  {
    _id: "evt-10",
    title: "Perambur Grand Pongal Cultural Village & Heritage Fair",
    slug: "perambur-pongal-cultural-village-heritage-fair",
    category: "cultural-traditional",
    categoryLabel: "Cultural Village",
    description: "Traditional harvest festival celebrations with clay pottery, handloom cottons, rural folk games & authentic food.",
    location: "Perambur High Road, Chennai",
    startDate: "2027-01-14",
    stallPrice: 3500,
    totalStalls: 32,
    availableStalls: 11,
    coverImage: "/images/gallery/apartment-bazaar.jpg",
  },
  {
    _id: "evt-11",
    title: "Alwarpet Boutique Luxury Lifestyle & Fashion Pop-Up",
    slug: "alwarpet-boutique-luxury-lifestyle-fashion-popup",
    category: "fashion-lifestyle",
    categoryLabel: "Fashion & Lifestyle",
    description: "High-end designer western wear, luxury artisanal accessories, perfumes, cosmetics & jewelry collections.",
    location: "Alwarpet, Chennai",
    startDate: "2027-01-24",
    stallPrice: 5500,
    totalStalls: 20,
    availableStalls: 6,
    coverImage: "/images/gallery/stall-setup.jpg",
  },
  {
    _id: "evt-12",
    title: "Siruseri IT Campus Children's Book Fair & STEM Learning Expo",
    slug: "siruseri-it-campus-childrens-book-stem-expo",
    category: "book-education",
    categoryLabel: "Book & Education",
    description: "Children's books publishers, STEM robotics kits, educational puzzles, stationery & student learning aids.",
    location: "SIPCOT IT Park, Siruseri, Chennai",
    startDate: "2027-02-07",
    stallPrice: 2500,
    totalStalls: 28,
    availableStalls: 9,
    coverImage: "/images/hero-banner.jpg",
  },
];

export default function UpcomingEventsSection({
  events = [],
  showAllInitially = false,
}: {
  events?: EventItem[];
  showAllInitially?: boolean;
}) {
  const [allEvents, setAllEvents] = useState<EventItem[]>(() => {
    return events.length > 0 ? events : DEFAULT_12_EVENTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleLimit, setVisibleLimit] = useState<number>(showAllInitially ? 12 : 8);

  useEffect(() => {
    let isMounted = true;

    // 1. Load from localStorage cache
    const timer = setTimeout(() => {
      try {
        const cached = localStorage.getItem("mp_events_cache_v2");
        if (cached && isMounted) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length >= 12) {
            setAllEvents(parsed);
          }
        }
      } catch (err) {
        console.warn("Could not read local cache:", err);
      }
    }, 0);

    // 2. Fetch fresh events in background and update cache
    fetch("/api/events")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        if (data?.events && Array.isArray(data.events) && data.events.length > 0) {
          setAllEvents(data.events);
          try {
            localStorage.setItem("mp_events_cache_v2", JSON.stringify(data.events));
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Filter events based on active category and search
  const filteredEvents = useMemo(() => {
    return allEvents.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory ||
        (selectedCategory === "apartment" && (item.category === "apartment" || item.category === "community")) ||
        (selectedCategory === "fashion-lifestyle" && item.category === "expo") ||
        (selectedCategory === "kids-carnival" && item.category === "family");

      const matchesSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allEvents, selectedCategory, searchQuery]);

  const displayedEvents = filteredEvents.slice(0, visibleLimit);

  // Helper to format category badge label
  const getCategoryBadge = (cat: string) => {
    const found = EVENT_TYPES_LIST.find((t) => t.id === cat);
    return found ? found.shortLabel : cat.replace("-", " ").toUpperCase();
  };

  return (
    <section className="py-16 sm:py-20 bg-black text-white border-b border-zinc-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>12 Signature Event Types & Live Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-outfit text-white">
              Upcoming Apartment Events & Expos
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Explore 12 distinct event categories across gated societies, tech corridors, and festival grounds in Chennai. Reserve your vendor stall with zero hidden fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event or area..."
                className="pl-9 pr-4 py-2.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 w-full sm:w-56"
              />
            </div>

            <Link
              href="/events"
              className="inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white transition whitespace-nowrap"
            >
              <span>All 12 Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ========================================================
            12 EVENT TYPE FILTER PILLS (HORIZONTAL SCROLL ON MOBILE)
            ======================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5 text-purple-400">
              <Filter className="w-3.5 h-3.5" />
              Filter by Event Type ({EVENT_TYPES_LIST.length - 1} Categories)
            </span>
            <span className="text-zinc-500 text-[11px]">
              Showing {filteredEvents.length} of {allEvents.length} Events
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
            {EVENT_TYPES_LIST.map((type) => {
              const Icon = type.icon;
              const isActive = selectedCategory === type.id;
              
              // Count matching events
              const count =
                type.id === "all"
                  ? allEvents.length
                  : allEvents.filter((e) => e.category === type.id).length;

              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedCategory(type.id);
                    setVisibleLimit(12);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30 scale-105"
                      : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-purple-400"}`} />
                  <span>{type.shortLabel}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? "bg-black/40 text-purple-200" : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            EVENTS CARDS GRID
            ======================================================== */}
        {displayedEvents.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-zinc-950 border border-zinc-900 p-8 space-y-3">
            <p className="text-base text-zinc-300 font-semibold">No scheduled events match your current filter.</p>
            <p className="text-xs text-zinc-500">Try selecting &quot;All Events&quot; or clearing your search keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-2 px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedEvents.map((event) => {
              const dateObj = new Date(event.startDate);
              const dayNum = isNaN(dateObj.getDate()) ? 24 : dateObj.getDate();
              const monthStr = isNaN(dateObj.getTime())
                ? "NOV"
                : dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
              const bgImg = event.coverImage || "/images/gallery/apartment-bazaar.jpg";
              const availStalls = event.availableStalls ?? 8;
              const totalStalls = event.totalStalls ?? 25;

              return (
                <div
                  key={event._id || event.slug}
                  className="bg-zinc-950 rounded-3xl overflow-hidden flex flex-col justify-between group border border-zinc-900 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-950/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Header with Date Overlay */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={bgImg}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                    {/* Top Bar with Date Block & Available Counter */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <div className="flex items-baseline space-x-1.5 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800">
                        <span className="text-2xl font-black text-amber-400 font-outfit leading-none">{dayNum}</span>
                        <span className="text-[10px] font-bold text-purple-300 tracking-wider">{monthStr}</span>
                      </div>

                      <div className="bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400">
                          {availStalls} Stalls Left
                        </span>
                      </div>
                    </div>

                    {/* Bottom Category Badge Overlay */}
                    <div className="absolute bottom-3 left-3.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-300 bg-purple-950/90 border border-purple-800/80 px-2.5 py-1 rounded-full shadow-md">
                        {getCategoryBadge(event.category)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug font-outfit line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Info Rows */}
                    <div className="space-y-2 pt-3 border-t border-zinc-900/90 text-xs text-zinc-300">
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center space-x-1.5 text-zinc-400">
                          <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-[11px] text-zinc-400">Total: {totalStalls} Stalls</span>
                        </div>

                        {event.stallPrice !== undefined && (
                          <div className="text-right">
                            <span className="text-[10px] text-zinc-500 uppercase block leading-none">Starting from</span>
                            <span className="text-sm font-black text-amber-400 font-outfit">
                              ₹{event.stallPrice.toLocaleString("en-IN")}/day
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link
                        href={`/vendors/register?event=${encodeURIComponent(event.title)}`}
                        className="w-full text-center py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/20 group-hover:shadow-purple-600/40"
                      >
                        <span>Book Stall Slot</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More / Show All 12 Button */}
        {filteredEvents.length > visibleLimit && (
          <div className="text-center pt-6">
            <button
              onClick={() => setVisibleLimit(filteredEvents.length)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-purple-500/40 text-purple-300 hover:text-white font-bold text-xs uppercase tracking-wider transition shadow-lg"
            >
              <span>View All {filteredEvents.length} Events ({filteredEvents.length - visibleLimit} More)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
