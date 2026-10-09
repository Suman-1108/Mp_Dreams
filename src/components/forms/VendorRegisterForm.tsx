"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Store } from "lucide-react";

export default function VendorRegisterForm({ initialEvent = "" }: { initialEvent?: string }) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "Apparel & Fashion",
    stallType: "Standard Premium Stall",
    targetEvent: initialEvent,
    city: "Chennai",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: data.message || "Vendor application submitted! Our stall allocation team will reach out shortly.",
        });
        setFormData({
          businessName: "",
          contactPerson: "",
          email: "",
          phone: "",
          category: "Apparel & Fashion",
          stallType: "Standard Premium Stall",
          targetEvent: "",
          city: "Chennai",
          notes: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Submission failed. Please check form fields.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status && (
        <div
          className={`p-4 rounded-xl text-sm flex items-start space-x-3 ${
            status.type === "success"
              ? "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
              : "bg-rose-950/80 border border-rose-800 text-rose-300"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Brand / Business Name *</label>
          <input
            type="text"
            required
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="e.g. Silk Crafts Chennai"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Person Name *</label>
          <input
            type="text"
            required
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            placeholder="e.g. Ananya Sundaram"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp Number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ananya@brand.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
          >
            <option value="Apparel & Fashion">Apparel & Fashion Wear</option>
            <option value="Handicrafts & Decor">Handicrafts & Home Decor</option>
            <option value="Jewelry & Accessories">Jewelry & Accessories</option>
            <option value="Food & Beverages">Organic Food & Snacks</option>
            <option value="Kids & Toys">Kids Toys & Books</option>
            <option value="Cosmetics & Wellness">Cosmetics & Skincare</option>
            <option value="Services & Financial">Commercial Services</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Target Event / Location</label>
          <input
            type="text"
            value={formData.targetEvent}
            onChange={(e) => setFormData({ ...formData, targetEvent: e.target.value })}
            placeholder="e.g. OMR Apartment Expo / Any upcoming"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Product Showcase / Additional Notes</label>
        <textarea
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Briefly describe your items, price range, or special power requirements..."
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Application...</span>
          </>
        ) : (
          <>
            <Store className="w-4 h-4" />
            <span>Submit Vendor Application</span>
          </>
        )}
      </button>
    </form>
  );
}
