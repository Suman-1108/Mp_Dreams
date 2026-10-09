import { Metadata } from "next";
import { Suspense } from "react";
import VendorRegisterForm from "@/components/forms/VendorRegisterForm";
import { CheckCircle2 } from "lucide-react";

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
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
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

      </div>
    </div>
  );
}
