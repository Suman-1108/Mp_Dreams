"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function ClientRegisterForm({
  defaultEventType = "Apartment Expo & Carnival",
}: {
  defaultEventType?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    clientType: "Apartment RWA / Society Committee",
    eventType: defaultEventType,
    location: "Chennai",
    eventDate: "",
    estimatedFootfall: "1,000+ Residents",
    budget: "",
    message: "",
  });

  const [customClientType, setCustomClientType] = useState("");
  const [customEventType, setCustomEventType] = useState("");

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Stall & Vendor Curation",
    "Stage & Lighting Setup",
    "Security & Crowd Management",
  ]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const availableServices = [
    "Stall & Vendor Curation",
    "Stage & Lighting Setup",
    "Sound Systems & AV",
    "Food Counters & Catering",
    "Kids Rides & Carnival Games",
    "Security & Crowd Management",
    "Promotional Banners & Marketing",
    "Event Accounting & GST Support",
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const finalClientType =
        formData.clientType === "Others"
          ? customClientType.trim() || "Others (Custom Client)"
          : formData.clientType;

      const finalEventType =
        formData.eventType === "Others"
          ? customEventType.trim() || "Others (Custom Event)"
          : formData.eventType;

      const formattedMessage = `
[CLIENT REGISTRATION]
Client Type: ${finalClientType}
Organization/Society: ${formData.organization}
Event Type: ${finalEventType}
Target Date: ${formData.eventDate || "Flexible / To be finalized"}
Location/Venue: ${formData.location}
Expected Audience: ${formData.estimatedFootfall}
Approx Budget: ${formData.budget || "Discussion required"}
Services Required: ${selectedServices.join(", ")}
Notes: ${formData.message || "None specified"}
`.trim();

      const payload = {
        name: formData.name,
        organization: formData.organization,
        email: formData.email,
        phone: formData.phone,
        clientType: finalClientType,
        service: `Client Host - ${finalEventType}`,
        eventTitle: formData.organization ? `${formData.organization} - ${finalEventType}` : finalEventType,
        location: formData.location,
        eventDate: formData.eventDate,
        budget: formData.budget,
        message: formattedMessage,
      };

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message:
            "Client Registration Received! Our event management team will review your requirements and share a customized event proposal & quote within 24 hours.",
        });
        setFormData({
          name: "",
          organization: "",
          email: "",
          phone: "",
          clientType: "Apartment RWA / Society Committee",
          eventType: defaultEventType,
          location: "Chennai",
          eventDate: "",
          estimatedFootfall: "1,000+ Residents",
          budget: "",
          message: "",
        });
        setCustomClientType("");
        setCustomEventType("");
        setSelectedServices([
          "Stall & Vendor Curation",
          "Stage & Lighting Setup",
          "Security & Crowd Management",
        ]);
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to submit registration. Please verify your entries.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "An error occurred while connecting to the server. Please try again or reach out on WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {status && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-start space-x-3 border animate-in fade-in ${
            status.type === "success"
              ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/80 border-rose-500/40 text-rose-300"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Organization & Client Profile */}
        <div className="space-y-4">
          <div className="border-b border-zinc-900 pb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 font-outfit">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>1. Organization & Client Profile</span>
            </h3>
            <span className="text-[10px] text-zinc-500 font-semibold">* Required fields</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Client / Organization Type *
              </label>
              <select
                value={formData.clientType}
                onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
              >
                <option value="Apartment RWA / Society Committee">Apartment RWA / Society Committee</option>
                <option value="Corporate Enterprise / Tech Park">Corporate Enterprise / Tech Park</option>
                <option value="Wedding Host / Family Celebration">Wedding Host / Family Celebration</option>
                <option value="College / Educational Institution">College / Educational Institution</option>
                <option value="Brand Retailer / Mall Activation">Brand Retailer / Mall Activation</option>
                <option value="Others">Others (Please specify below)</option>
              </select>

              {formData.clientType === "Others" && (
                <div className="mt-2.5">
                  <label className="block text-xs font-semibold text-amber-400 mb-1">
                    Specify Client Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={customClientType}
                    onChange={(e) => setCustomClientType(e.target.value)}
                    placeholder="e.g. Sports Club, NGO, Cultural Trust..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Society / Company / Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Prestige Bella Vista RWA / Cognizant Chennai"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Authorized Contact Person *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. K. Sundar (Secretary)"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Phone / WhatsApp Number *
              </label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sundar@rwa.org / contact@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Event Requirements */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-zinc-900 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 font-outfit">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>2. Event Scope & Specifications</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Event Type / Purpose *
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm"
              >
                <option value="Apartment Expo & Carnival">Apartment Expo, Flea Market & Carnival</option>
                <option value="Society Cultural / Festive Mela">Diwali / Pongal Festive Community Mela</option>
                <option value="Corporate Annual Day & Gala">Corporate Annual Day & Employee Summit</option>
                <option value="Wedding & Reception Decor">Grand Wedding & Reception Decor</option>
                <option value="Brand Roadshow & Automobile Expo">Brand Roadshow & Automobile Showcase</option>
                <option value="Food & Live Music Festival">Food Fest & Live Music Stage Show</option>
                <option value="Sports Tournament & Marathon">Sports Day / Marathon Setup</option>
                <option value="Others">Others (Please specify below)</option>
              </select>

              {formData.eventType === "Others" && (
                <div className="mt-2.5">
                  <label className="block text-xs font-semibold text-amber-400 mb-1">
                    Specify Event Type *
                  </label>
                  <input
                    type="text"
                    required
                    value={customEventType}
                    onChange={(e) => setCustomEventType(e.target.value)}
                    placeholder="e.g. Sangeet Night, Product Launch, Pet Show..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs shadow-inner"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Venue Location / Community *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. OMR, Porur, Velachery, ECR, Anna Nagar"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Event Date / Month
              </label>
              <input
                type="text"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                placeholder="e.g. Next Month / 15-16 Nov"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Expected Crowd / Resident Units
              </label>
              <input
                type="text"
                value={formData.estimatedFootfall}
                onChange={(e) => setFormData({ ...formData, estimatedFootfall: e.target.value })}
                placeholder="e.g. 500+ Flats, 1,500 Residents"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Approx. Budget (Optional)
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="e.g. ₹50,000 / Zero RWA cost"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Services Required Checklist */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-300">
            Select Services Required from MP Dream Events:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {availableServices.map((service, idx) => {
              const isChecked = selectedServices.includes(service);
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => toggleService(service)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition flex items-center space-x-2.5 ${
                    isChecked
                      ? "bg-purple-950/60 border-purple-500/60 text-purple-200 shadow-sm shadow-purple-950"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      isChecked
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "border-slate-700 bg-slate-800"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="truncate">{service}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Specific Instructions / Requirements */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Special Notes or Specific Event Requirements (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Share any special instructions, club house amenities, sound restrictions, or customized requests..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm resize-none"
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-600/30 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Submitting Client Registration...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Submit Client Event Registration</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-zinc-500 text-center mt-2">
            No obligation. We will provide a complete quotation and scope of work for your committee approval.
          </p>
        </div>
      </form>
    </div>
  );
}
