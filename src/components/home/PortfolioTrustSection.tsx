import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck, Clock, Users, ArrowRight, Award, Play, Sparkles } from "lucide-react";

export default function PortfolioTrustSection() {
  const testimonials = [
    {
      name: "Jessica M.",
      role: "Wedding Planning Client",
      quote:
        "Absolutely incredible! MP Dream Events kept the energy alive all night for our wedding reception. Our guests are still talking about it!",
      rating: 5,
    },
    {
      name: "Mark T.",
      role: "Corporate Lead & RWA President",
      quote:
        "Professional, talented, and knows exactly how to manage footfall and stall vendors. Best event team we've ever hired in Chennai!",
      rating: 5,
    },
    {
      name: "Sophia R.",
      role: "Apartment Event Stall Vendor",
      quote:
        "An unforgettable experience! The footfall, the stall setup, the vibe — everything was perfect for our retail brand.",
      rating: 5,
    },
  ];

  return (
    <>
      {/* 1. Dark Featured Split Section */}
      <section className="py-20 bg-black text-white border-b border-zinc-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Media Card */}
            <div className="lg:col-span-6 relative">
              <div className="dark-glass-card p-8 rounded-3xl border border-zinc-800 relative overflow-hidden group">
                <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt="MP Dream Events Showcase"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-xl shadow-purple-600/50 group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 text-purple-300 border border-zinc-800 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Music & Events Creates Connections</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase font-syne text-white">
                    Memorable Apartment Events & Celebrations
                  </h3>
                </div>
              </div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <div className="text-purple-400 font-bold text-xs tracking-widest uppercase">
                  ABOUT MP DREAM EVENTS
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase font-syne text-white leading-tight">
                  More Than Events, It's a Movement
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I'm MP Dream Events, a passionate event management team with a mission to bring people together through the power of extraordinary celebrations, high-footfall apartment events, community festivals, and weddings.
                </p>
              </div>

              {/* Stacked Stats Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-white font-syne">150+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Events Performed</div>
                  </div>
                </div>

                <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-white font-syne">10+ Years</div>
                    <div className="text-[11px] text-slate-400 font-medium">Experience</div>
                  </div>
                </div>

                <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-white font-syne">50K+</div>
                    <div className="text-[11px] text-slate-400 font-medium">Happy Attendees</div>
                  </div>
                </div>

                <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-white font-syne">100%</div>
                    <div className="text-[11px] text-slate-400 font-medium">Client Trust</div>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/40"
                >
                  <span>My Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Pure Black Testimonials Section */}
      <section className="py-20 bg-black text-white border-b border-zinc-900">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-2">
            <div className="text-purple-400 font-bold text-xs tracking-widest uppercase">
              WHAT PEOPLE SAY
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-syne text-white">
              Real Vibes. Real People.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900 shadow-xl flex flex-col justify-between space-y-6 hover:border-purple-500/50 hover:shadow-2xl transition"
              >
                <div className="space-y-3">
                  <div className="flex space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900">
                  <div className="font-bold text-white text-sm font-syne">{t.name}</div>
                  <div className="text-xs text-purple-400 font-semibold">{t.role}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
