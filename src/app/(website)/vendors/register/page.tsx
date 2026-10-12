import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import VendorRegisterForm from "@/components/forms/VendorRegisterForm";
import { CheckCircle2, Store, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vendor Registration | Apartment Expo Stall Booking Chennai",
  description:
    "Register your brand for upcoming apartment expos and flea market stalls across Chennai. Secure prime retail slots in top gated communities.",
};

async function VendorFormWrapper({ searchParams }: { searchParams: Promise<{ event?: string }> }) {
  const resolvedParams = await searchParams;
  const initialEvent = resolvedParams?.event || "";
  return <VendorRegisterForm initialEvent={initialEvent} />;
}

export default function VendorRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Split Registration Switcher Banner */}
        <div className="bg-zinc-950 p-2 sm:p-2.5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row gap-2 items-center justify-between shadow-xl">
          <div className="flex items-center space-x-2 px-3 py-1 text-xs text-zinc-400">
            <span>Select Registration Type:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <div className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 border border-amber-400">
              <Store className="w-3.5 h-3.5 text-slate-950" />
              <span>Vendor Stall Register</span>
            </div>

            <Link
              href="/clients/register"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
            >
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Client Event Register</span>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase">
            Stall Retailer Onboarding
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            Vendor Registration Form
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
            Apply to showcase your apparel, handicrafts, jewelry, food items or commercial products at MP Dream Events apartment exhibitions.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-xs shadow-lg">
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Guaranteed Footfall Societies</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Power & Canopy Table Included</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Category Exclusivity Protection</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-900 shadow-2xl">
          <Suspense fallback={<div className="text-xs text-slate-500">Loading application form...</div>}>
            <VendorFormWrapper searchParams={searchParams} />
          </Suspense>
        </div>

        {/* Alternate link for Clients */}
        <div className="text-center pt-2">
          <p className="text-xs text-zinc-400">
            Are you an Apartment Association (RWA) or Corporate Host wanting to organize an event?{" "}
            <Link
              href="/clients/register"
              className="font-bold text-purple-400 underline underline-offset-4 hover:text-purple-300 transition inline-flex items-center gap-1"
            >
              <span>Go to Client Registration Form</span>
              <ArrowRight className="w-3.5 h-3.5 inline" />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
