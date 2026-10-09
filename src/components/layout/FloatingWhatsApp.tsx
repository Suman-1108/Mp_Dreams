"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917338999723";
  const defaultMessage = encodeURIComponent("Hello MP Dream Events! I would like to enquire about your event and stall management services.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 transition-all transform hover:scale-105 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-slate-950 stroke-emerald-500" />
      <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">
        WhatsApp Us
      </span>
    </a>
  );
}
