"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  MessageSquare,
  Building2,
  Image as ImageIcon,
  LogOut,
  Store,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/me", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "events", label: "Event & Expo Management", icon: Calendar },
    { id: "vendors", label: "Vendor Applications", icon: Store },
    { id: "enquiries", label: "Customer Enquiries", icon: MessageSquare },
    { id: "bookings", label: "Stall Reservations", icon: Building2 },
    { id: "gallery", label: "Gallery & Assets", icon: ImageIcon },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between p-4 min-h-screen text-slate-300 shrink-0">
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center space-x-3 px-2 py-2 border-b border-zinc-900 pb-4">
          <div className="relative h-11 w-11 shrink-0">
            <Image
              src="/images/logo-transparent.png"
              alt="MP Dream Events"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div className="font-extrabold text-white text-xs">MP DREAM EVENTS</div>
            <div className="text-[10px] text-amber-400 uppercase font-semibold">Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout & Back link */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <span>View Public Website ↗</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
