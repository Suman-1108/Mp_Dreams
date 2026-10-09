import { Metadata } from "next";
import { Suspense } from "react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | MP Dream Events & Solutions Chennai",
  description:
    "Get in touch with MP Dream Events & Solutions in Chennai. Call +91 73389 99723 or send an official enquiry for event planning, stall bookings, or tax advisory.",
};

async function FormWrapper({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const resolvedParams = await searchParams;
  const defaultService = resolvedParams?.service || "Event Management";
  return <EnquiryForm defaultService={defaultService} />;
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917338999723";

  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            Contact MP Dream Events & Solutions
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            We are here to answer your questions, assist with stall reservations, or plan your next event in Chennai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Info side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-3 shadow-lg">
              <div className="flex items-center space-x-3 text-amber-400">
                <Phone className="w-5 h-5" />
                <span className="font-bold text-white text-base">Phone Call</span>
              </div>
              <p className="text-xs text-slate-400">Speak directly with our event manager:</p>
              <a href="tel:+917338999723" className="text-amber-400 font-bold text-lg block hover:underline">
                +91 73389 99723
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-3 shadow-lg">
              <div className="flex items-center space-x-3 text-emerald-400">
                <MessageCircle className="w-5 h-5" />
                <span className="font-bold text-white text-base">WhatsApp Instant Chat</span>
              </div>
              <p className="text-xs text-slate-400">Send us a direct message on WhatsApp:</p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold text-sm block hover:underline"
              >
                +91 73389 99723 (Click to Chat)
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-3 shadow-lg">
              <div className="flex items-center space-x-3 text-purple-400">
                <Mail className="w-5 h-5" />
                <span className="font-bold text-white text-base">Official Email</span>
              </div>
              <a href="mailto:mpdreameventssolutions@gmail.com" className="text-slate-200 text-sm font-semibold block hover:text-amber-400 break-all">
                mpdreameventssolutions@gmail.com
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-3 shadow-lg">
              <div className="flex items-center space-x-3 text-purple-400">
                <MapPin className="w-5 h-5" />
                <span className="font-bold text-white text-base">Location</span>
              </div>
              <p className="text-slate-300 text-sm">Chennai, Tamil Nadu, India</p>
            </div>
          </div>

          {/* Form side */}
          <div className="lg:col-span-7 bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-900 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 font-syne">Send an Official Message</h2>
            <Suspense fallback={<div className="text-xs text-slate-500">Loading form...</div>}>
              <FormWrapper searchParams={searchParams} />
            </Suspense>
          </div>

        </div>

      </div>
    </div>
  );
}
