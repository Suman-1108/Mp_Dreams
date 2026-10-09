"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-slate-300 border-t border-white/10 pt-16 pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-14 w-14 group-hover:scale-105 transition-all duration-300 shrink-0">
                <Image
                  src="/images/logo-transparent.png"
                  alt="MP Dream Events Solutions"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-outfit">
                MP DREAM EVENTS <span className="text-amber-400">& Solutions</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Creating extraordinary event experiences through music, luxury mandap staging, high-density apartment expos, and corporate tax advisory across Chennai.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-purple-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Event & Stall Management Agency</span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm font-outfit uppercase tracking-wider text-purple-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-amber-400 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition">About Company</Link></li>
              <li><Link href="/events" className="hover:text-amber-400 transition">Events Calendar</Link></li>
              <li><Link href="/expo" className="hover:text-amber-400 transition">Apartment Expos</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-400 transition">Photo Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm font-outfit uppercase tracking-wider text-purple-400">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services#weddings" className="hover:text-amber-400 transition">Weddings & Celebrations</Link></li>
              <li><Link href="/expo" className="hover:text-amber-400 transition">Apartment Flea Markets</Link></li>
              <li><Link href="/vendors/register" className="hover:text-amber-400 transition">Stall Vendor Booking</Link></li>
              <li><Link href="/services#corporate" className="hover:text-amber-400 transition">Corporate & Stage Audio-Visuals</Link></li>
              <li><Link href="/accounting" className="hover:text-amber-400 transition">Accounting & GST Services</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm font-outfit uppercase tracking-wider text-purple-400">
              Newsletter & Updates
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Stay updated with upcoming apartment expos, new stall slots, and exclusive offers.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3.5 py-2.5 rounded-l-xl bg-purple-950/60 border border-purple-800/40 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-r-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar matching reference layout */}
        <div className="mt-12 pt-6 border-t border-purple-900/20 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 space-y-3 md:space-y-0">
          <p>© 2026 MP Dream Events & Solutions. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/admin/login" className="hover:text-amber-400 transition">Admin Portal Login</Link>
            <span>•</span>
            <span className="hover:text-slate-400">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
