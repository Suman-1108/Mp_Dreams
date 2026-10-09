import { Metadata } from "next";
import Image from "next/image";
import AdminLoginForm from "@/components/forms/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | MP Dream Events & Solutions",
  description: "Secure login portal for MP Dream Events administration and content management.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-900 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="relative h-20 w-20 mx-auto">
            <Image
              src="/images/logo-transparent.png"
              alt="MP Dream Events Solutions"
              fill
              priority
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-syne">
            MP Dream Events <span className="text-amber-400">Admin</span>
          </h1>
          <p className="text-slate-400 text-xs">
            Enter authorized management credentials to access control panel
          </p>
        </div>

        {/* Form */}
        <AdminLoginForm />

      </div>
    </div>
  );
}
