"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.67 20.16 9.32 19.8 8.14 19.11L7.86 18.94L4.74 19.76L5.57 16.72L5.38 16.42C4.62 15.2 4.22 13.58 4.22 11.91C4.22 7.37 7.92 3.67 12.05 3.67ZM8.83 7.37C8.63 7.37 8.44 7.38 8.27 7.72C8.07 8.12 7.5 8.68 7.5 9.82C7.5 10.96 8.33 12.06 8.45 12.21C8.57 12.37 10.05 14.65 12.35 15.65C14.26 16.48 14.65 16.32 15.07 16.28C15.49 16.24 16.42 15.73 16.61 15.2C16.81 14.67 16.81 14.22 16.75 14.12C16.69 14.02 16.53 13.96 16.29 13.84C16.05 13.72 14.87 13.14 14.65 13.06C14.43 12.98 14.27 12.94 14.11 13.18C13.95 13.42 13.48 13.96 13.34 14.12C13.2 14.28 13.06 14.3 12.82 14.18C12.58 14.06 11.81 13.81 10.9 12.99C10.19 12.35 9.71 11.57 9.57 11.33C9.43 11.09 9.55 10.96 9.67 10.84C9.78 10.73 9.92 10.55 10.04 10.41C10.16 10.27 10.2 10.17 10.28 10.01C10.36 9.85 10.32 9.71 10.26 9.59C10.2 9.47 9.73 8.31 9.53 7.83C9.33 7.35 9.13 7.42 8.99 7.41C8.85 7.4 8.7 7.37 8.83 7.37Z" />
    </svg>
  );
}

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917338999723";
  const instagramUrl = "https://www.instagram.com/mpdreamevents_solutions/";

  return (
    <footer className="bg-black text-slate-300 border-t border-white/10 pt-16 pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-3.5 group">
              <div className="relative h-[72px] w-[72px] sm:h-[84px] sm:w-[84px] group-hover:scale-105 transition-all duration-300 shrink-0">
                <Image
                  src="/images/logo-transparent.png"
                  alt="MP Dream Events Solutions"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-outfit">
                MP DREAM EVENTS <span className="text-amber-400">& Solutions</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Creating extraordinary event experiences through vibrant apartment events, luxury mandap staging, community carnivals, and corporate tax advisory across Chennai.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-purple-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Event & Stall Management Agency</span>
            </div>

            {/* Social Media Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition transform hover:-translate-y-0.5 shadow-sm group"
                aria-label="Chat with MP Dream Events on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-bold transition transform hover:-translate-y-0.5 shadow-sm group"
                aria-label="Follow MP Dream Events on Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
              </a>
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
              <li><Link href="/expo" className="hover:text-amber-400 transition">Apartment Events</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-400 transition">Photo Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition">Contact Support</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm font-outfit uppercase tracking-wider text-purple-400">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services#weddings" className="hover:text-amber-400 transition">Weddings & Celebrations</Link></li>
              <li><Link href="/expo" className="hover:text-amber-400 transition">Apartment Events & Bazaars</Link></li>
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
              Stay updated with upcoming apartment events, new stall slots, and exclusive community festivals.
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

            {/* Social channels section in col 4 */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                Connect Directly
              </span>
              <div className="flex flex-col space-y-2 text-xs">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition group"
                >
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400 shrink-0" />
                  </span>
                  <span>WhatsApp: +91 73389 99723</span>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-300 hover:text-pink-400 transition group"
                >
                  <span className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 group-hover:bg-pink-500/20">
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  </span>
                  <span className="truncate">Instagram: @mpdreamevents_solutions</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar matching reference layout */}
        <div className="mt-12 pt-6 border-t border-purple-900/20 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 space-y-3 md:space-y-0">
          <p>© 2026 MP Dream Events & Solutions. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition flex items-center space-x-1"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
            <span>•</span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-400 transition flex items-center space-x-1"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <span>•</span>
            <Link href="/terms" className="hover:text-purple-400 transition">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
