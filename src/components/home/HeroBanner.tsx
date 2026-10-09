import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-white/10 bg-black">
      
      {/* Background Image */}
      <Image
        src="/images/hero-banner.jpg"
        alt="MP Dream Events Concert Stage"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Cinematic Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container - Text on Left Side */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl text-left space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-900/60 backdrop-blur-md border border-purple-500/40 text-purple-200 text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>CHENNAI&apos;S PREMIER EVENT MANAGEMENT & APARTMENT EXPOS</span>
            </div>

          {/* Headline - Left Aligned */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.15] font-outfit text-white">
              CREATING{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                EXTRAORDINARY
              </span>{" "}
              EXPERIENCES & EXPOS
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-slate-200/90 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              Creating extraordinary experiences through grand event planning, luxury wedding decor, high-footfall apartment stall expos, and business solutions across Chennai.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/events"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-xs uppercase tracking-wider shadow-sm transition flex items-center space-x-2 group"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center group-hover:bg-purple-500 transition">
                  <Play className="w-3 h-3 text-amber-300 fill-amber-300 group-hover:text-white group-hover:fill-white" />
                </div>
                <span>Explore Expos</span>
              </Link>

              <Link
                href="/vendors/register"
                className="px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition transform hover:-translate-y-0.5"
              >
                Book Stall
              </Link>
            </div>

          {/* Left Aligned Stats Row */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">150+</div>
                <div className="text-xs text-purple-200 font-medium mt-0.5">Events Managed</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-outfit">50+</div>
                <div className="text-xs text-purple-200 font-medium mt-0.5">Apartment Expos</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-outfit">500+</div>
                <div className="text-xs text-purple-200 font-medium mt-0.5">Vendor Partners</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-outfit">100%</div>
                <div className="text-xs text-purple-200 font-medium mt-0.5">Satisfaction</div>
              </div>
            </div>

          </div>
      </div>

      {/* Floating Bottom-Right Feature Badge */}
      <div className="hidden lg:flex items-center space-x-3 bg-slate-950/60 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl text-white shadow-xl absolute bottom-8 right-8 max-w-sm z-10">
        <div className="w-9 h-9 rounded-full bg-purple-600/80 flex items-center justify-center shrink-0 shadow-md">
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>
        <div>
          <div className="text-xs font-bold text-white font-outfit">Chennai&apos;s #1 Live Event Stage</div>
          <div className="text-[11px] text-purple-200 font-medium">Concerts, Luxury Receptions & Gated Expos</div>
        </div>
      </div>

    </section>
  );
}
