"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight, Menu, X } from "lucide-react";
import brandLogo from "@/assets/logo.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Events", fullName: "Events Calendar", href: "/events" },
    { name: "Apartment Events", href: "/expo" },
    { name: "Vendor Register", fullName: "Vendor Registration (Stall Booking)", href: "/vendors/register" },
    { name: "Client Register", fullName: "Client Registration (Host An Event)", href: "/clients/register" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 text-white shadow-xl transition-all">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 px-4 py-1.5 text-xs font-semibold tracking-wide text-white border-b border-white/5">
        <div className="w-full max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full shrink-0 tracking-wider">
               EVENTS & SOLUTIONS
            </span>
            <span className="hidden sm:inline text-slate-200 text-xs">
              CHENNAI&apos;S PREMIER APARTMENT EVENTS, & STALL MANAGEMENT
            </span>
            <span className="sm:hidden text-[11px] text-slate-200">
              Apartment Events & Celebrations Chennai
            </span>
          </div>
          <Link
            href="/contact"
            className="flex items-center space-x-1 bg-white/15 hover:bg-white/25 text-amber-300 px-3 py-1 rounded-full text-xs font-bold transition border border-amber-300/30 shrink-0"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[76px] py-2 gap-4">

          {/* Official Brand Logo (Transparent) */}
          <Link href="/" className="flex items-center space-x-3.5 group shrink-0 select-none py-1">
            <div className="relative h-[56px] w-[56px] sm:h-[62px] sm:w-[62px] lg:h-[66px] lg:w-[66px] group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_14px_rgba(245,158,11,0.3)]">
              <Image
                src={brandLogo}
                alt="MP Dream Events Solutions"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-white font-outfit leading-tight group-hover:text-amber-400 transition-colors">
                MP DREAM <span className="text-amber-400 font-black">EVENTS</span>
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-400 font-semibold leading-none mt-0.5">
                  Events & Solutions
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5 font-medium text-xs xl:text-[13px] tracking-tight shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition duration-150 ${isActive
                      ? "text-purple-300 bg-purple-950/80 border border-purple-500/40 font-bold shadow-sm shadow-purple-500/20"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Actions (Desktop) */}
          <div className="hidden xl:flex items-center space-x-3 shrink-0">
            <a
              href="tel:+917338999723"
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white flex items-center space-x-1.5 transition whitespace-nowrap rounded-lg hover:bg-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="whitespace-nowrap font-bold tracking-tight">+91 73389 99723</span>
            </a>

            <Link
              href="/vendors/register"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-600/30 transition transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              Book Stall Space
            </Link>
          </div>

          {/* Tablet & Mobile quick actions + menu button */}
          <div className="flex xl:hidden items-center space-x-2">
            <a
              href="tel:+917338999723"
              className="p-2 rounded-lg text-purple-400 hover:bg-white/10 transition"
              aria-label="Call MP Dream Events"
            >
              <Phone className="w-4 h-4" />
            </a>
            <Link
              href="/vendors/register"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] uppercase tracking-wider shadow-sm transition whitespace-nowrap"
            >
              Book Stall
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/15 border border-white/10 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg transition text-sm font-semibold ${isActive
                    ? "bg-purple-950/80 text-purple-300 border border-purple-500/30 font-bold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {link.fullName || link.name}
              </Link>
            );
          })}

          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col space-y-2">
            <a
              href="tel:+917338999723"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition border border-white/10"
            >
              <Phone className="w-4 h-4 text-purple-400" />
              <span>Call: +91 73389 99723</span>
            </a>
            <Link
              href="/vendors/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Vendor Stall Register
            </Link>
            <Link
              href="/clients/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-600/30"
            >
              Client Event Register (RWA / Hosts)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
