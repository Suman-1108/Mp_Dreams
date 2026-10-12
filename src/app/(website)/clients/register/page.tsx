import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ClientRegisterForm from "@/components/forms/ClientRegisterForm";
import { Building2, Store, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Registration | Host an Event, Apartment Expo & Decor Chennai",
  description:
    "Register your apartment association, corporate firm, or celebration with MP Dream Events. Host vibrant society expos, wedding celebrations, and corporate galas across Chennai.",
};

export default function ClientRegisterPage() {
  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Split Registration Switcher Banner */}
        <div className="bg-zinc-950 p-2 sm:p-2.5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row gap-2 items-center justify-between shadow-xl">
          <div className="flex items-center space-x-2 px-3 py-1 text-xs text-zinc-400">
            <span>Select Registration Type:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <Link
              href="/vendors/register"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
            >
              <Store className="w-3.5 h-3.5 text-purple-400" />
              <span>Vendor Stall Register</span>
            </Link>

            <div className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500">
              <Building2 className="w-3.5 h-3.5 text-white" />
              <span>Client Event Register</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-purple-400 font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Association, Corporate & Celebration Booking</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-outfit text-white">
            Client Event Registration
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl mx-auto">
            Plan a vibrant apartment expo, festive bazaar, grand wedding reception, or corporate function with zero operational hassles.
          </p>
        </div>

        {/* Key Client Benefits Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-xs shadow-lg">
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Zero RWA Cost Expo Model</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Dedicated Ground Crew & AV</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Custom Quotations & Approvals</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-900 shadow-2xl">
          <Suspense fallback={<div className="text-xs text-slate-500">Loading client registration form...</div>}>
            <ClientRegisterForm />
          </Suspense>
        </div>

        {/* Alternate link for Vendors */}
        <div className="text-center pt-2">
          <p className="text-xs text-zinc-400">
            Are you a retail brand, food vendor, or artisan wanting to book stall space?{" "}
            <Link
              href="/vendors/register"
              className="font-bold text-amber-400 underline underline-offset-4 hover:text-amber-300 transition inline-flex items-center gap-1"
            >
              <span>Go to Vendor Registration Form</span>
              <ArrowRight className="w-3.5 h-3.5 inline" />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
