import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import VendorRegisterForm from "@/components/forms/VendorRegisterForm";
import ClientRegisterForm from "@/components/forms/ClientRegisterForm";
import { Store, Building2, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Registration Hub | Vendor Stalls & Client Event Booking Chennai",
  description:
    "Register for MP Dream Events in Chennai. Book exhibition stall spaces as a vendor or host an apartment expo, wedding, or corporate event as a client.",
};

async function RegistrationView({ searchParams }: { searchParams: Promise<{ type?: string; event?: string }> }) {
  const resolved = await searchParams;
  const activeType = resolved?.type === "client" ? "client" : "vendor";
  const initialEvent = resolved?.event || "";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Registration Type Tabs */}
      <div className="bg-zinc-950 p-2 sm:p-2.5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row gap-2 items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-2 px-3 py-1 text-xs text-zinc-400">
          <span>Choose Your Registration:</span>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <Link
            href="/register?type=vendor"
            className={`flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeType === "vendor"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 border border-amber-400"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <Store className={`w-4 h-4 ${activeType === "vendor" ? "text-slate-950" : "text-amber-400"}`} />
            <span>Vendor Registration</span>
          </Link>

          <Link
            href="/register?type=client"
            className={`flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeType === "client"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeType === "client" ? "text-white" : "text-purple-400"}`} />
            <span>Client Registration</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Header based on activeType */}
      {activeType === "vendor" ? (
        <div className="text-center space-y-4">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Store className="w-4 h-4 text-amber-400" />
            <span>Exhibitor & Retail Stall Booking</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            Vendor Stall Registration
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
            Book prime retail display slots at upcoming high-footfall apartment festivals, flea markets, and lifestyle expos across Chennai.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-xs shadow-lg text-left">
            <div className="flex items-center space-x-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>1,000+ Resident Footfall</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Canopy, Table & Power Included</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Strict Category Exclusivity</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-purple-400 font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Association, Corporate & Celebration Hosting</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-outfit text-white">
            Client Event Registration
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
            Register your apartment association (RWA), corporate firm, or celebration to host seamless, high-engagement events.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-xs shadow-lg text-left">
            <div className="flex items-center space-x-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Zero Cost RWA Expo Model</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Turnkey Event Management</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Formal Proposals & Audited Flow</span>
            </div>
          </div>
        </div>
      )}

      {/* Active Form */}
      <div className="bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-900 shadow-2xl">
        {activeType === "vendor" ? (
          <VendorRegisterForm initialEvent={initialEvent} />
        ) : (
          <ClientRegisterForm />
        )}
      </div>

    </div>
  );
}

export default function RegistrationHubPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; event?: string }>;
}) {
  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <Suspense fallback={<div className="text-center py-20 text-xs text-slate-500">Loading registration portal...</div>}>
        <RegistrationView searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
