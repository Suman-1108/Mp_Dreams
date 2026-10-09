"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Zap } from "lucide-react";

export default function EnquiryFooterSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917338999723";

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 24,
    seconds: 36,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: (prev.minutes - 1 + 60) % 60 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Countdown Banner */}
        <div className="dark-glass-card p-8 sm:p-10 rounded-3xl border border-zinc-800 bg-[#0a0514] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="text-amber-400 font-bold text-xs tracking-widest uppercase flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>LET'S MAKE YOUR EVENT UNFORGETTABLE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase font-syne text-white">
              Book MP Dream Events For Your Next Event
            </h3>
            <p className="text-slate-300 text-xs">
              From intimate celebrations to large-scale gated community expos, let's create an extraordinary experience together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Live Countdown Clock */}
            <div className="flex items-center space-x-3 bg-black px-4 py-2.5 rounded-2xl border border-zinc-800">
              <div className="text-center">
                <div className="text-lg font-black text-amber-400 font-syne">{String(timeLeft.days).padStart(2, "0")}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Days</div>
              </div>
              <span className="text-purple-500 font-bold">:</span>
              <div className="text-center">
                <div className="text-lg font-black text-amber-400 font-syne">{String(timeLeft.hours).padStart(2, "0")}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Hours</div>
              </div>
              <span className="text-purple-500 font-bold">:</span>
              <div className="text-center">
                <div className="text-lg font-black text-amber-400 font-syne">{String(timeLeft.minutes).padStart(2, "0")}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Mins</div>
              </div>
              <span className="text-purple-500 font-bold">:</span>
              <div className="text-center">
                <div className="text-lg font-black text-amber-400 font-syne">{String(timeLeft.seconds).padStart(2, "0")}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Secs</div>
              </div>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/40 shrink-0 flex items-center space-x-2"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Contact Form & Direct Touch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-purple-400 font-bold text-xs tracking-widest uppercase">
                DIRECT CONTACT
              </div>
              <h3 className="text-3xl font-black uppercase font-syne text-white">
                Get In Touch With Us
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Connect directly with our event manager or stall allocation coordinator across Chennai.
              </p>
            </div>

            <div className="space-y-4">
              <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Direct Phone Call</div>
                  <a href="tel:+917338999723" className="font-bold text-white text-sm hover:text-amber-400">
                    +91 73389 99723
                  </a>
                </div>
              </div>

              <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">WhatsApp Direct</div>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 text-xs hover:underline"
                  >
                    +91 73389 99723 (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Official Email</div>
                  <a href="mailto:mpdreameventssolutions@gmail.com" className="font-bold text-white text-xs hover:text-amber-400 break-all">
                    mpdreameventssolutions@gmail.com
                  </a>
                </div>
              </div>

              <div className="dark-glass-card p-4 rounded-2xl flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Primary Office</div>
                  <div className="font-bold text-white text-xs">Chennai, Tamil Nadu, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 dark-glass-card p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-4 font-syne">Submit an Official Enquiry</h3>
            <EnquiryForm />
          </div>

        </div>

      </div>
    </section>
  );
}
