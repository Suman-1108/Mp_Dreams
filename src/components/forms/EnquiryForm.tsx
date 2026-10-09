"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface EnquiryFormProps {
  defaultService?: string;
  eventTitle?: string;
}

export default function EnquiryForm({ defaultService = "Event Management", eventTitle = "" }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    message: "",
    eventTitle: eventTitle,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: data.message || "Thank you! Your enquiry has been received. We will call you back shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: defaultService,
          message: "",
          eventTitle: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to submit enquiry. Please check your inputs.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again or reach out on WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status && (
        <div
          className={`p-4 rounded-xl text-xs flex items-start space-x-3 ${
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
          <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="ramesh@example.com"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Interested Service *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 text-xs"
          >
            <option value="Event Management">Event Management & Decor</option>
            <option value="Wedding Planning">Wedding & Reception</option>
            <option value="Apartment Expo Stall">Apartment Expo / Stall Booking</option>
            <option value="Corporate Event">Corporate Seminars & Cultural</option>
            <option value="Accounting & Tax">Accounting & Tax Services</option>
            <option value="General Enquiry">Other Enquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Enquiry / Event Details *</label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your expected event date, estimated guest count or stall requirements..."
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-xs resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/40 flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Enquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Official Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
