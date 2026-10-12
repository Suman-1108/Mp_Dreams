"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Store,
  FileText,
  X,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Zap,
  Receipt,
} from "lucide-react";

export const STALL_PRICING_OPTIONS = [
  {
    key: "standard",
    label: "Standard Commercial Stall (Starting from ₹3,499 / day)",
    priceText: "Starting from ₹3,499 / day",
    details: "Apparel, designer wear, jewelry, organic foods, cosmetics & commercial retail brands.",
    facilities: "Table (6x3 ft), vendor chairs, electricity connection & LED lighting included (No extra fee).",
  },
  {
    key: "budget",
    label: "Low-Budget Category Stall (₹2,000 – ₹3,000 / day)",
    priceText: "₹2,000 – ₹3,000 / day",
    details: "Books & stationery, homemade pickles, kids toys, handmade artisan crafts.",
    facilities: "Table, chairs & electricity connection included (No extra fee).",
  },
  {
    key: "car_4seater",
    label: "4-Seater Car Promotional Display (Original ₹12,000 | Offer ₹9,999)",
    priceText: "₹9,999 / vehicle (Offer Price)",
    details: "Automobile dealerships, compact sedans & hatchbacks test-drive showcase.",
    facilities: "Central courtyard vehicle spot, resident test-drive access rights & banner space.",
  },
  {
    key: "car_7seater",
    label: "7-Seater Car Promotional Display (Original ₹14,000 | Offer ₹11,999)",
    priceText: "₹11,999 / vehicle (Offer Price)",
    details: "SUVs, MPVs, family 7-seater vehicles & luxury test-drive showcase.",
    facilities: "Prime central venue placement, promotional standee space & test-drive permissions.",
  },
  {
    key: "car_premium",
    label: "Premium Branded Car Promotional Display (₹15,000 – ₹30,000 / car)",
    priceText: "₹15,000 – ₹30,000 / vehicle",
    details: "Luxury car brands, premium EV showcase, executive brand activations.",
    facilities: "Main entrance arch placement, stage branding, VIP resident lead capture rights.",
  },
];

export const STALL_TERMS_AND_CONDITIONS = [
  {
    num: "01",
    title: "Booking Confirmation",
    desc: "Vendors must submit a booking request for approval. Stall booking will be confirmed only after receipt of the required advance/full payment. Stall availability updates automatically upon confirmation.",
  },
  {
    num: "02",
    title: "Payment Terms",
    desc: "The stall rental fee must be paid before the event begins. Online payments support UPI, debit & credit cards through the integrated payment gateway. Payment receipts and GST invoices are generated automatically.",
  },
  {
    num: "03",
    title: "Cancellation and Refund Policy",
    desc: "Payments are non-refundable after payment confirmation, subject to applicable laws. If an exhibitor cancels the booking, the organizer may offer a stall at the next eligible event instead of a monetary refund, subject to availability and confirmation.",
  },
  {
    num: "04",
    title: "Stall Allocation",
    desc: "Stall locations will be allocated by the event organizer. Category capping is enforced to avoid saturated internal competition. Changes may be made if necessary.",
  },
  {
    num: "05",
    title: "Setup & Dismantling",
    desc: "Exhibitors must complete stall setup within the permitted time and vacate the stall after the event.",
  },
  {
    num: "06",
    title: "Stall Usage",
    desc: "Stalls must be used only for approved business activities. Subletting or transferring stalls without prior approval is prohibited.",
  },
  {
    num: "07",
    title: "Included Facilities",
    desc: "The stall rental price includes electricity connection, table and chairs, and other basic stall amenities. No separate charge applies for these included basic facilities. Any optional premium services will be identified separately.",
  },
  {
    num: "08",
    title: "Cleanliness & Safety",
    desc: "Exhibitors must maintain cleanliness and follow all safety rules throughout the event.",
  },
  {
    num: "09",
    title: "Damage & Loss",
    desc: "Exhibitors are responsible for any damage caused to the stall, venue, or event property by themselves or their staff.",
  },
  {
    num: "10",
    title: "Prohibited Items",
    desc: "Illegal, hazardous, or unauthorized products are strictly prohibited.",
  },
  {
    num: "11",
    title: "Sales & Inventory",
    desc: "Exhibitors are solely responsible for their products, sales, stock, cash, and personal belongings.",
  },
  {
    num: "12",
    title: "Event Organizer's Rights",
    desc: "The organizer reserves the right to modify the event schedule, stall layout, or arrangements when required.",
  },
  {
    num: "13",
    title: "Unforeseen Circumstances",
    desc: "In case of cancellation or changes due to unforeseen circumstances, the organizer will communicate the applicable arrangements to exhibitors.",
  },
  {
    num: "14",
    title: "Compliance",
    desc: "Exhibitors must comply with applicable laws, venue regulations, and organizer instructions.",
  },
  {
    num: "15",
    title: "Acceptance",
    desc: "Payment of the stall booking fee constitutes acceptance of these terms and conditions.",
  },
];

export default function VendorRegisterForm({
  initialEvent = "",
  initialCategory = "",
}: {
  initialEvent?: string;
  initialCategory?: string;
}) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: initialCategory || "Apparel & Fashion",
    stallType: "standard",
    targetEvent: initialEvent,
    city: "Chennai",
    notes: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const selectedStall = STALL_PRICING_OPTIONS.find((s) => s.key === formData.stallType) || STALL_PRICING_OPTIONS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setStatus({
        type: "error",
        message: "Please read and agree to the Stall Booking Terms & Conditions before submitting.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const selectedOption = STALL_PRICING_OPTIONS.find((s) => s.key === formData.stallType);
      const finalCategory =
        formData.category === "Others"
          ? customCategory.trim() || "Others (Custom Category)"
          : formData.category;

      const payload = {
        ...formData,
        category: finalCategory,
        stallType: selectedOption?.label || formData.stallType,
      };

      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: data.message || "Vendor application submitted! Our stall allocation team will verify and send the payment confirmation link.",
        });
        setFormData({
          businessName: "",
          contactPerson: "",
          email: "",
          phone: "",
          category: "Apartment Gated Society Bazaars",
          stallType: "standard",
          targetEvent: "",
          city: "Chennai",
          notes: "",
        });
        setCustomCategory("");
        setAgreedToTerms(false);
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
    <>
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
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
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
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
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
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
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
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>
        </div>

        {/* Product Category & Stall Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Product Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
            >
              <option value="Apartment Gated Society Bazaars">Apartment Society Flea Markets</option>
              <option value="Luxury Wedding & Bridal Expos">Wedding & Bridal Silks / Jewelry</option>
              <option value="Corporate Tech & Business Summits">Corporate, B2B & Financial Services</option>
              <option value="Gourmet Food & Live Music Fests">Food, Bakery, Gourmet & Beverages</option>
              <option value="Automobile & Car Promotional Expos">Automobile / Car Promotional Display</option>
              <option value="Kids Carnivals & Family Fun Fairs">Kids Toys, Games & Student Learning</option>
              <option value="Grand Diwali & Festive Shopping Melas">Festive Shopping, Diyas, Sweets & Hampers</option>
              <option value="Handloom, Khadi & Artisan Crafts">Handloom, Khadi & Terracotta (Low-Budget)</option>
              <option value="Sports Tournaments & Marathon Expos">Sports, Fitness & Activewear</option>
              <option value="Cultural Village & Pongal Melas">Cultural, Traditional Crafts & Heritage</option>
              <option value="Boutique Fashion & Lifestyle Pop-Ups">Boutique Western Fashion & Luxury Accessories</option>
              <option value="Children's Book Fairs & STEM Expos">Books, Stationery & Pickles (Low-Budget)</option>
              <option value="Others">Others (Please specify below)</option>
            </select>

            {formData.category === "Others" && (
              <div className="mt-2.5">
                <label className="block text-xs font-semibold text-amber-400 mb-1">
                  Specify Your Product Category *
                </label>
                <input
                  type="text"
                  required
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="e.g. Handmade Terracotta, Pet Care, Custom Fragrances, etc."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Target Event / Location</label>
            <input
              type="text"
              value={formData.targetEvent}
              onChange={(e) => setFormData({ ...formData, targetEvent: e.target.value })}
              placeholder="e.g. OMR Apartment Event / Expo / Any upcoming"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>
        </div>

        {/* Stall Format & Price Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Choose Stall Package / Format *
          </label>
          <select
            value={formData.stallType}
            onChange={(e) => setFormData({ ...formData, stallType: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-purple-500/40 text-white focus:outline-none focus:border-purple-400 text-sm font-medium"
          >
            {STALL_PRICING_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Pricing & Inclusions Highlight Box */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-900/40 space-y-2.5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-900 pb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Estimated Rate:
            </span>
            <span className="text-sm font-extrabold text-amber-400 font-outfit">
              {selectedStall.priceText}
            </span>
          </div>

          <div className="text-xs text-zinc-400 leading-relaxed">
            {selectedStall.details}
          </div>

          <div className="flex items-start gap-2 pt-1 text-xs text-emerald-400">
            <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span><strong>Included Facilities:</strong> {selectedStall.facilities}</span>
          </div>

          <div className="flex items-start gap-2 text-xs text-purple-300">
            <Receipt className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />
            <span><strong>Booking Flow:</strong> Request Approval → Online Payment (UPI / Card) → Auto Invoice & Receipt.</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Showcase / Additional Notes</label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Briefly describe your items, special power requirements, or custom space requests..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm resize-none"
          />
        </div>

        {/* ========================================================
            SHOPPING EXPO – STALL BOOKING TERMS & CONDITIONS SECTION
            ======================================================== */}
        <div className="pt-2 space-y-3">
          <div className="rounded-2xl bg-zinc-950 border border-purple-900/40 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Shopping Expo – Stall Booking Terms & Conditions</span>
              </div>
              <button
                type="button"
                onClick={() => setTermsExpanded(!termsExpanded)}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition"
              >
                <span>{termsExpanded ? "Collapse" : "View 15 Clauses"}</span>
                {termsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Scrollable Terms Preview */}
            {termsExpanded && (
              <div className="max-h-56 overflow-y-auto space-y-3 pr-2 text-xs text-zinc-300 border-t border-zinc-900 pt-3 scrollbar-thin">
                {STALL_TERMS_AND_CONDITIONS.map((term) => (
                  <div key={term.num} className="space-y-0.5">
                    <p className="font-bold text-white">
                      {term.num}. {term.title}:{" "}
                      <span className="font-normal text-zinc-400">{term.desc}</span>
                    </p>
                  </div>
                ))}
                <div className="pt-1 text-right">
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-[11px] text-purple-400 hover:underline inline-flex items-center gap-1"
                  >
                    Open Terms & Conditions in new tab →
                  </Link>
                </div>
              </div>
            )}

            {/* Checkbox agreement */}
            <div className="pt-2 border-t border-zinc-900">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-purple-700 bg-zinc-900 text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer shrink-0"
                />
                <span className="text-xs text-slate-300 leading-relaxed group-hover:text-white transition">
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true);
                    }}
                    className="text-purple-400 font-bold underline underline-offset-2 hover:text-purple-300"
                  >
                    Shopping Expo – Stall Booking Terms & Conditions
                  </button>
                  . I understand that booking will be confirmed only after receipt of payment, advance is non-refundable, and eligible for stall rollover to the next event upon cancellation. *
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !agreedToTerms}
          className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm uppercase tracking-wider transition shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Application...</span>
            </>
          ) : (
            <>
              <Store className="w-4 h-4" />
              <span>Submit & Agree to Stall Booking</span>
            </>
          )}
        </button>
      </form>

      {/* ========================================================
          FULL TERMS & CONDITIONS MODAL
          ======================================================== */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-purple-500/40 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-outfit">
                  Shopping Expo – Stall Booking Terms & Conditions
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 text-xs text-zinc-300 leading-relaxed">
              <p className="text-purple-300 font-semibold bg-purple-950/40 p-3 rounded-xl border border-purple-500/30">
                Please review all 15 clauses before confirming your stall booking with MP Dream Events & Solutions.
              </p>

              {STALL_TERMS_AND_CONDITIONS.map((term) => (
                <div key={term.num} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <div className="font-bold text-white text-xs">
                    <span className="text-purple-400 font-mono mr-1.5">{term.num}.</span>
                    {term.title}
                  </div>
                  <p className="text-zinc-400 text-xs pl-5">{term.desc}</p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-zinc-900 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/terms"
                target="_blank"
                className="text-xs text-purple-400 hover:underline"
              >
                View dedicated terms page ↗
              </Link>
              <button
                type="button"
                onClick={() => {
                  setAgreedToTerms(true);
                  setShowTermsModal(false);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-purple-600/30"
              >
                I Understand & Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
