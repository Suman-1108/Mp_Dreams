import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Image as ImageIcon, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Event & Expo Photo Gallery | MP Dream Events Chennai",
  description:
    "View photos and highlights from our past wedding decors, apartment festive bazaars, stall setups, and corporate functions in Chennai.",
};

export default function GalleryPage() {
  const galleryCategories = [
    { title: "Weddings & Receptions", count: "Stage & Mandap Decor" },
    { title: "Apartment Events & Expos", count: "Flea Market Stalls & Resident Crowds" },
    { title: "Corporate Events", count: "Seminars & Stage Audio-Visuals" },
    { title: "Stall Structures", count: "Canopy & Retail Display Setups" },
  ];

  const galleryItems = [
    {
      title: "Royal Golden Mandap Decor",
      category: "Weddings & Receptions",
      location: "ECR Beach Resort, Chennai",
    },
    {
      title: "Festive Diwali Bazaar Flea Market",
      category: "Apartment Events & Expos",
      location: "OMR Luxury Gated Society",
    },
    {
      title: "Annual Executive Corporate Summit",
      category: "Corporate Events",
      location: "Guindy Tech Park Venue",
    },
    {
      title: "Artisan Handicrafts Stall Showcase",
      category: "Stall Structures",
      location: "Anna Nagar Expo Complex",
    },
    {
      title: "Floral Entrance Arch Setup",
      category: "Weddings & Receptions",
      location: "Velachery Convention Center",
    },
    {
      title: "Weekend Organic Food Festival",
      category: "Apartment Events & Expos",
      location: "Porur Apartment Township",
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase">
            Visual Highlights & Memories
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            Event & Expo Photo Gallery
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Take a visual tour of our beautifully staged weddings, apartment events, flea markets, and corporate events across Chennai.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
            All Photos
          </span>
          {galleryCategories.map((c, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-zinc-950 text-slate-300 hover:text-white border border-zinc-900 text-xs font-semibold cursor-pointer transition hover:border-zinc-800"
            >
              {c.title}
            </span>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-zinc-950 rounded-3xl p-6 border border-zinc-900 hover:border-amber-500/40 transition flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-full h-48 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:scale-[1.02] transition-transform">
                  <div className="text-center space-y-2 text-slate-400">
                    <Camera className="w-8 h-8 mx-auto text-amber-400" />
                    <span className="text-xs font-semibold block">{item.title}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider font-syne">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5 font-syne">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
          >
            Plan Your Next Event With Us
          </Link>
        </div>

      </div>
    </div>
  );
}
