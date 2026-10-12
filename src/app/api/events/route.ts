import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { eventSchema } from "@/lib/validation";
import { getAdminSession } from "@/lib/auth";

export const DEFAULT_FALLBACK_EVENTS = [
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const admin = searchParams.get("admin");

    await connectDB();

    const query: Record<string, unknown> = {};
    if (admin !== "true") {
      query.published = true;
    }
    if (category && category !== "all") {
      query.category = category;
    }

    const events = await Event.find(query).sort({ startDate: 1 }).lean();
    
    if (events.length === 0 && admin !== "true") {
      let filtered = DEFAULT_FALLBACK_EVENTS;
      if (category && category !== "all") {
        filtered = DEFAULT_FALLBACK_EVENTS.filter((e) => e.category === category);
      }
      return NextResponse.json({ events: filtered }, { status: 200 });
    }

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.warn("Database unavailable or timed out, returning fallback events:", error);
    let filtered = DEFAULT_FALLBACK_EVENTS;
    try {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get("category");
      if (category && category !== "all") {
        filtered = DEFAULT_FALLBACK_EVENTS.filter((e) => e.category === category);
      }
    } catch {}
    return NextResponse.json({ events: filtered, source: "fallback" }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const result = eventSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid event data", errors: result.error.flatten() }, { status: 400 });
    }

    await connectDB();
    const newEvent = await Event.create({
      ...result.data,
      availableStalls: result.data.availableStalls || result.data.totalStalls,
    });

    return NextResponse.json({ message: "Event created successfully", event: newEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ message: "Failed to create event" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, published } = body;

    await connectDB();
    const updated = await Event.findByIdAndUpdate(id, { published }, { new: true });
    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ message: "Failed to update event" }, { status: 500 });
  }
}
