import { Metadata } from "next";
import Link from "next/link";
import { Award, Target, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | MP Dream Events & Solutions Chennai",
  description:
    "Learn about MP Dream Events & Solutions, Chennai's premier agency for event production, apartment events & expos, stall bookings, and business accounting.",
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase">
            Who We Are
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            About MP Dream Events & Solutions
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Bridging high-quality event execution, commercial stall marketplaces in premium residential hubs, and reliable corporate tax management across Chennai.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4 hover:border-purple-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Target className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white font-syne">Our Mission</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              To deliver unforgettable, stress-free event experiences for families and organizations while creating direct, high-footfall commercial avenues for local retailers, artisans, and vendors in gated communities.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4 hover:border-purple-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white font-syne">Our Vision</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              To become Tamil Nadu&apos;s most trusted multi-service corporate brand for event planning, community exhibition management, and comprehensive business growth advisory.
            </p>
          </div>
        </div>

        {/* Why We Stand Out */}
        <div className="space-y-8 bg-zinc-950 p-8 sm:p-12 rounded-3xl border border-zinc-900">
          <h2 className="text-3xl font-bold text-white text-center font-syne">Core Strengths & Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Dedicated On-Site Team</span>
              </div>
              <p className="text-xs text-slate-400">Professional coordinators present throughout every event for uninterrupted operations.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Gated Community Access</span>
              </div>
              <p className="text-xs text-slate-400">Direct partnerships with RWAs across OMR, ECR, Anna Nagar, Porur & Velachery.</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Dual Business & Tax Support</span>
              </div>
              <p className="text-xs text-slate-400">In-house accounting specialists helping vendors and businesses with GST and income tax compliance.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5"
          >
            <span>Get In Touch With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
