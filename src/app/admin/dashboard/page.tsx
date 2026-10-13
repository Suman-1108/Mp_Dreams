"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  Building2,
  Plus,
  CheckCircle2,
  RefreshCw,
  Copy,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { AVAILABLE_SERVICES_MENU, normalizeToken } from "@/lib/sampleProposals";

interface DashboardEnquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  eventDate?: string;
  location?: string;
  budget?: string;
  organization?: string;
  clientType?: string;
  message?: string;
  status: string;
  createdAt?: string;
}

interface DashboardVendor {
  _id: string;
  brandName?: string;
  businessName?: string;
  contactName?: string;
  contactPerson?: string;
  phone: string;
  email: string;
  category: string;
  stallRequirement?: string;
  targetLocations?: string[];
  targetEvent?: string;
  status: string;
  createdAt?: string;
}

interface DashboardEvent {
  _id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  startDate?: string;
  stallPrice?: number;
  totalStalls?: number;
  availableStalls?: number;
  bookedStalls?: number;
  published: boolean;
}

interface DashboardProposal {
  _id: string;
  token: string;
  clientName: string;
  associationName?: string;
  societyName?: string;
  title: string;
  venue?: string;
  eventDate?: string;
  eventDates?: string;
  totalEstimate?: number;
  totalAmount?: number;
  advanceRequired?: number;
  status: string;
  createdAt?: string;
  terms?: string[];
  services?: string[];
  deliverables?: Array<{ item: string; details: string; status?: string }>;
  approverDetails?: {
    name?: string;
    designation?: string;
    organization?: string;
    approvedAt?: string | Date;
    comments?: string;
  };
}

function getOfflineProposalFallback(payload: Record<string, unknown>) {
  return {
    ...payload,
    _id: `offline-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [enquiries, setEnquiries] = useState<DashboardEnquiry[]>([]);
  const [vendors, setVendors] = useState<DashboardVendor[]>([]);
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [proposals, setProposals] = useState<DashboardProposal[]>([]);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [createdProposalLink, setCreatedProposalLink] = useState<string | null>(null);

  const [proposalServices, setProposalServices] = useState<string[]>([
    "Stall & Vendor Curation",
    "Stage & Lighting Setup",
    "Sound Systems & AV",
    "Kids Rides & Carnival Games",
    "Security & Crowd Management",
    "Electrical & Silent Generator Backup",
  ]);

  const toggleProposalService = (service: string) => {
    setProposalServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: "",
    slug: "",
    category: "apartment",
    description: "",
    location: "Chennai",
    startDate: "",
    stallPrice: 3500,
    totalStalls: 20,
    published: true,
  });
  const [eventCreating, setEventCreating] = useState(false);
  const [eventMsg, setEventMsg] = useState("");

  // New Proposal Form State
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    associationName: "",
    clientName: "",
    token: "",
    contactPerson: "",
    phone: "",
    email: "",
    eventDate: "",
    venue: "",
    expectedAttendance: "1,500+ Resident Families (Approx. 4,500 Attendees)",
    scopeOfWorkText: "Stall Canopies: 20 commercial weather-safe canopies (10x10 ft) with tables & chairs\nPower Infrastructure: Power distribution boxes, LED floodlights & silent generator backup\nAudio & Resident PA: High-clarity sound system, cordless mics & cultural program stage\nKids Carnival Zone: Bouncy castle, interactive carnival games, popcorn & candy counter\nGround Marshals: Dedicated coordination crew for crowd safety, vendor load-in & cleaning",
    inclusionsText: "20 Commercial vendor canopies with tables, frilled covers, and lighting\nComplete electrical distribution and silent generator backup\nProfessional audio system and family DJ setup for evening cultural programs\nKids games and entertainment zone\nDedicated on-ground event management crew and cleaning team",
    exclusionsText: "Direct vendor sales settlements (handled directly with vendors)\nResident private purchases or individual apartment catering\nSpecial municipal police permissions (handled jointly with RWA)",
    termsText: "Stall setup will begin 12 hours prior to the event commencement with zero obstruction to resident parking.\nZero cost and zero financial liability for the Residents Welfare Association; all commercial vendor stall fees handled directly by MP Dream Events.\nStrict adherence to society quiet hours after 10:00 PM for all audio equipment.\nDedicated MP Dream Events cleaning marshals will ensure 100% waste clearance post-event.\nVendor vehicles and staff verified and security gate passes submitted to security office in advance.",
  });
  const [proposalCreating, setProposalCreating] = useState(false);
  const [proposalMsg, setProposalMsg] = useState("");

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setProposalCreating(true);
    setProposalMsg("");

    try {
      const scopeItems = newProposal.scopeOfWorkText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((line) => {
          const parts = line.split(":");
          return {
            item: parts[0]?.trim() || "Event Service",
            description: parts.slice(1).join(":").trim() || line,
            amount: 0,
          };
        });

      const inclusions = newProposal.inclusionsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const exclusions = newProposal.exclusionsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const terms = newProposal.termsText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const rawSlug = newProposal.token.trim() || `${newProposal.associationName || newProposal.title}`;
      const slug = rawSlug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const payload = {
        title: newProposal.title,
        associationName: newProposal.associationName,
        clientName: newProposal.clientName || newProposal.associationName,
        token: slug,
        contactPerson: newProposal.contactPerson,
        phone: newProposal.phone,
        email: newProposal.email,
        eventDate: newProposal.eventDate,
        venue: newProposal.venue,
        expectedAttendance: newProposal.expectedAttendance,
        scopeOfWork: scopeItems,
        inclusions,
        exclusions,
        terms,
        services: proposalServices,
        totalAmount: 0,
        advanceRequired: 0,
        status: "pending",
      };

      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const createdProp = data.proposal || getOfflineProposalFallback(payload);
        const activeLink = data.link || `/approval/${slug}`;
        setCreatedProposalLink(activeLink);

        // Cache created proposal in browser storage for instant availability
        if (typeof window !== "undefined") {
          try {
            const offlineList = JSON.parse(localStorage.getItem("mp_offline_proposals") || "[]");
            const filtered = offlineList.filter((p: DashboardProposal) => normalizeToken(p.token) !== slug);
            filtered.unshift(createdProp);
            localStorage.setItem("mp_offline_proposals", JSON.stringify(filtered));
          } catch {}
        }

        setProposalMsg(`Proposal created successfully! Client approval link is active: ${activeLink}`);
        setShowNewProposalForm(false);
        setNewProposal({
          title: "",
          associationName: "",
          clientName: "",
          token: "",
          contactPerson: "",
          phone: "",
          email: "",
          eventDate: "",
          venue: "",
          expectedAttendance: "1,500+ Resident Families (Approx. 4,500 Attendees)",
          scopeOfWorkText: "Stall Canopies: 20 commercial weather-safe canopies (10x10 ft) with tables & chairs\nPower Infrastructure: Power distribution boxes, LED floodlights & silent generator backup\nAudio & Resident PA: High-clarity sound system, cordless mics & cultural program stage\nKids Carnival Zone: Bouncy castle, interactive carnival games, popcorn & candy counter\nGround Marshals: Dedicated coordination crew for crowd safety, vendor load-in & cleaning",
          inclusionsText: "20 Commercial vendor canopies with tables, frilled covers, and lighting\nComplete electrical distribution and silent generator backup\nProfessional audio system and family DJ setup for evening cultural programs\nKids games and entertainment zone\nDedicated on-ground event management crew and cleaning team",
          exclusionsText: "Direct vendor sales settlements (handled directly with vendors)\nResident private purchases or individual apartment catering\nSpecial municipal police permissions (handled jointly with RWA)",
          termsText: "Stall setup will begin 12 hours prior to the event commencement with zero obstruction to resident parking.\nZero cost and zero financial liability for the Residents Welfare Association; all commercial vendor stall fees handled directly by MP Dream Events.\nStrict adherence to society quiet hours after 10:00 PM for all audio equipment.\nDedicated MP Dream Events cleaning marshals will ensure 100% waste clearance post-event.\nVendor vehicles and staff verified and security gate passes submitted to security office in advance.",
        });
        await fetchData();
      } else {
        const d = await res.json();
        setProposalMsg(d.message || "Failed to create proposal");
      }
    } catch {
      setProposalMsg("Network error creating proposal");
    } finally {
      setProposalCreating(false);
    }
  };

  const safeCopy = (text: string, tokenKey: string = "new-created") => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          setCopiedToken(tokenKey);
          setTimeout(() => setCopiedToken(null), 3000);
        }).catch(() => {
          fallbackCopy(text, tokenKey);
        });
      } else {
        fallbackCopy(text, tokenKey);
      }
    } catch {
      fallbackCopy(text, tokenKey);
    }
  };

  const fallbackCopy = (text: string, tokenKey: string) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedToken(tokenKey);
      setTimeout(() => setCopiedToken(null), 3000);
    } catch (e) {
      console.warn("Copy fallback failed:", e);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const now = Date.now();
      const [enqRes, venRes, evtRes, propRes] = await Promise.all([
        fetch(`/api/enquiries?t=${now}`, { cache: "no-store" }),
        fetch(`/api/vendors?t=${now}`, { cache: "no-store" }),
        fetch(`/api/events?admin=true&t=${now}`, { cache: "no-store" }),
        fetch(`/api/proposals?t=${now}`, { cache: "no-store" }),
      ]);

      if (enqRes.ok) {
        const d = await enqRes.json();
        setEnquiries(d.enquiries || []);
      }
      if (venRes.ok) {
        const d = await venRes.json();
        setVendors(d.vendors || []);
      }
      if (evtRes.ok) {
        const d = await evtRes.json();
        setEvents(d.events || []);
      }
      if (propRes.ok) {
        const d = await propRes.json();
        let list = d.proposals || [];
        if (typeof window !== "undefined") {
          try {
            const offline = JSON.parse(localStorage.getItem("mp_offline_proposals") || "[]");
            const existingTokens = new Set(list.map((p: DashboardProposal) => normalizeToken(p.token)));
            const extra = offline.filter((p: DashboardProposal) => !existingTokens.has(normalizeToken(p.token)));
            list = [...extra, ...list];
          } catch {}
        }
        setProposals(list);
      }
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLastRefreshedAt(timeStr);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateEnquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setEnquiries(enquiries.map((e) => (e._id === id ? { ...e, status } : e)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateVendorStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/vendors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setVendors(vendors.map((v) => (v._id === id ? { ...v, status } : v)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventCreating(true);
    setEventMsg("");

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      if (res.ok) {
        setEventMsg("Event published successfully!");
        setNewEvent({
          title: "",
          slug: "",
          category: "apartment",
          description: "",
          location: "Chennai",
          startDate: "",
          stallPrice: 3500,
          totalStalls: 20,
          published: true,
        });
        fetchData();
      } else {
        setEventMsg(data.message || "Failed to create event");
      }
    } catch {
      setEventMsg("Server error creating event");
    } finally {
      setEventCreating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-slate-100 font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">
              {activeTab === "overview" ? "Dashboard Overview" : activeTab.replace("-", " ")}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              MP Dream Events & Solutions Administration Hub
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lastRefreshedAt && (
              <span className="text-[11px] text-slate-400 hidden sm:inline-block">
                Last updated: <strong className="text-slate-300 font-mono">{lastRefreshedAt}</strong>
              </span>
            )}
            <button
              onClick={fetchData}
              disabled={loading || refreshing}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition hover:border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing || loading ? "animate-spin text-amber-400" : "text-slate-400"}`} />
              <span>{refreshing ? "Refreshing..." : "Refresh Data"}</span>
            </button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400">Total Enquiries</div>
                <div className="text-3xl font-black text-amber-400">{enquiries.length}</div>
                <div className="text-[11px] text-emerald-400 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  <span>{enquiries.filter((e) => e.status === "new").length} New Uncontacted</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400">Vendor Applications</div>
                <div className="text-3xl font-black text-indigo-400">{vendors.length}</div>
                <div className="text-[11px] text-slate-400">Registered stall applicants</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400">Total Events</div>
                <div className="text-3xl font-black text-emerald-400">{events.length}</div>
                <div className="text-[11px] text-emerald-400">Active & published calendar</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400">Stall Availability</div>
                <div className="text-3xl font-black text-purple-400">
                  {events.reduce((acc, ev) => acc + (ev.availableStalls || ev.totalStalls || 0), 0)}
                </div>
                <div className="text-[11px] text-slate-400">Open stall slots</div>
              </div>
            </div>

            {/* Recent Enquiries & Vendor snippet */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-base">Recent Enquiries</h3>
                {enquiries.length === 0 ? (
                  <p className="text-xs text-slate-500">No enquiries submitted yet.</p>
                ) : (
                  <div className="space-y-3">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div key={enq._id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-white">{enq.name}</div>
                          <div className="text-slate-400">{enq.service} • {enq.phone}</div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          enq.status === "new" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" : "bg-emerald-500/10 text-emerald-400"
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-base">Recent Vendor Applications</h3>
                {vendors.length === 0 ? (
                  <p className="text-xs text-slate-500">No vendor applications registered yet.</p>
                ) : (
                  <div className="space-y-3">
                    {vendors.slice(0, 4).map((v) => (
                      <div key={v._id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-white">{v.businessName}</div>
                          <div className="text-slate-400">{v.category} • {v.phone}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                          {v.status || "pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div className="space-y-10">
            {/* Create Event Form */}
            <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>Create & Publish New Event / Expo</span>
              </h3>

              {eventMsg && (
                <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-300 text-xs">
                  {eventMsg}
                </div>
              )}

              <form onSubmit={handleCreateEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={(e) => {
                      const t = e.target.value;
                      setNewEvent({ ...newEvent, title: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g, "-") });
                    }}
                    placeholder="Grand Chennai Apartment Expo 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.slug}
                    onChange={(e) => setNewEvent({ ...newEvent, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Category *</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="apartment">Apartment Expo</option>
                    <option value="wedding">Wedding & Reception</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="community">Community Fair</option>
                    <option value="expo">General Exhibition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Venue / Location *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Stall Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    value={newEvent.stallPrice}
                    onChange={(e) => setNewEvent({ ...newEvent, stallPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Total Stalls Capacity *</label>
                  <input
                    type="number"
                    min="0"
                    value={newEvent.totalStalls}
                    onChange={(e) => setNewEvent({ ...newEvent, totalStalls: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 mb-1 font-semibold">Event Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Details about footfall expectation, resident count, stall sizes..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={eventCreating}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition"
                  >
                    {eventCreating ? "Saving Event..." : "Publish Event"}
                  </button>
                </div>
              </form>
            </div>

            {/* List of Events */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base">Published & Managed Events</h3>
              {events.length === 0 ? (
                <p className="text-xs text-slate-500">No events found in database.</p>
              ) : (
                <div className="space-y-3">
                  {events.map((ev) => (
                    <div key={ev._id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="font-bold text-white text-sm">{ev.title}</div>
                        <div className="text-slate-400 mt-0.5">
                          {ev.category} • {ev.location} • ₹{ev.stallPrice} • {ev.totalStalls} Stalls Total
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                        {ev.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ENQUIRIES TAB */}
        {activeTab === "enquiries" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Customer Enquiries List</h3>
            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-500">No customer enquiries received yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {enquiries.map((e) => (
                      <tr key={e._id} className="hover:bg-slate-950/50">
                        <td className="p-3 font-semibold text-white">
                          {e.name}
                          {e.organization && (
                            <span className="block text-[11px] text-purple-400 font-normal">
                              {e.organization} {e.clientType ? `(${e.clientType})` : ""}
                            </span>
                          )}
                        </td>
                        <td className="p-3">{e.phone}<br/><span className="text-slate-500 text-[11px]">{e.email}</span></td>
                        <td className="p-3 text-amber-400 font-medium">{e.service}</td>
                        <td className="p-3 max-w-xs truncate text-slate-400">{e.message}</td>
                        <td className="p-3">
                          <select
                            value={e.status}
                            onChange={(evt) => updateEnquiryStatus(e._id, evt.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* VENDORS TAB */}
        {activeTab === "vendors" && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Vendor Applications List</h3>
            {vendors.length === 0 ? (
              <p className="text-xs text-slate-500">No vendor applications recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Business</th>
                      <th className="p-3">Contact Person</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Target Event</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {vendors.map((v) => (
                      <tr key={v._id} className="hover:bg-slate-950/50">
                        <td className="p-3 font-semibold text-white">{v.businessName}</td>
                        <td className="p-3">{v.contactPerson}<br/><span className="text-slate-500 text-[11px]">{v.phone}</span></td>
                        <td className="p-3 text-indigo-400 font-medium">{v.category}</td>
                        <td className="p-3 text-slate-400">{v.targetEvent || "Any"}</td>
                        <td className="p-3">
                          <select
                            value={v.status || "pending"}
                            onChange={(evt) => updateVendorStatus(v._id, evt.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CLIENT PROPOSALS & APPROVALS TAB */}
        {activeTab === "proposals" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div>
                <h3 className="font-bold text-white text-base font-outfit">
                  Apartment Association & Client Proposal Approvals
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Create custom apartment event proposals, customize terms per society, and track client permissions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={fetchData}
                  disabled={loading || refreshing}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-amber-400" : ""}`} />
                  <span>{refreshing ? "Refreshing..." : "Refresh Proposals"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowNewProposalForm(!showNewProposalForm);
                    setProposalMsg("");
                    setCreatedProposalLink(null);
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showNewProposalForm ? "Close Form" : "Create Apartment Proposal"}</span>
                </button>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold">
                    {proposals.length} Total
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                    {proposals.filter((p) => p.status === "approved").length} Approved
                  </span>
                </div>
              </div>
            </div>

            {/* Persistent Created / Active Proposal Banner */}
            {proposalMsg && (
              <div className="p-4 rounded-2xl text-xs font-semibold bg-emerald-950/60 border-2 border-emerald-500/50 text-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-white text-sm">Proposal Successfully Created & Active!</span>
                    <span className="text-emerald-300 text-xs">{proposalMsg}</span>
                  </div>
                </div>

                {createdProposalLink && (
                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                    <a
                      href={createdProposalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg shadow-purple-600/30"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Proposal Link ↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        const full = `${window.location.origin}${createdProposalLink}`;
                        safeCopy(full, "new-created");
                      }}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedToken === "new-created" ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CREATE NEW APARTMENT PROPOSAL FORM */}
            {showNewProposalForm && (
              <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-purple-500/40 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="text-base font-bold text-white font-outfit flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>Create New Apartment Proposal (Client Approval Portal)</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enter society details and configure unique terms and conditions tailored for this specific apartment.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-950/60 text-purple-300 border border-purple-500/30">
                    Vendor-Funded / Free for RWA
                  </span>
                </div>

                {proposalMsg && (
                  <div className="p-3.5 rounded-xl text-xs font-semibold bg-purple-950/40 border border-purple-500/40 text-purple-300">
                    {proposalMsg}
                  </div>
                )}

                <form onSubmit={handleCreateProposal} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Apartment / Society Name *</label>
                    <input
                      type="text"
                      required
                      value={newProposal.associationName}
                      onChange={(e) => {
                        const val = e.target.value;
                        const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                        setNewProposal({
                          ...newProposal,
                          associationName: val,
                          clientName: val,
                          title: newProposal.title && newProposal.title !== `${newProposal.associationName} Mega Shopping Carnival & Flea Fair 2026` ? newProposal.title : `${val} Mega Shopping Carnival & Flea Fair 2026`,
                          token: autoSlug,
                        });
                      }}
                      placeholder="e.g. TVS Emerald Peninsula Apartment Association"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Proposal Title *</label>
                    <input
                      type="text"
                      required
                      value={newProposal.title}
                      onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                      placeholder="e.g. TVS Emerald Peninsula Grand Shopping Carnival 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-slate-300 font-semibold">Unique Proposal URL Token</label>
                      <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                        Auto-Generated
                      </span>
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={newProposal.token}
                      placeholder="Auto-generated from society name (e.g. tvs-emerald-peninsula-apartment-association)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-purple-300 font-mono focus:outline-none cursor-default select-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Client approval link will be: <strong className="text-purple-400 font-mono">/approval/{newProposal.token || "auto-generated-token"}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Event Date(s) *</label>
                    <input
                      type="text"
                      required
                      value={newProposal.eventDate}
                      onChange={(e) => setNewProposal({ ...newProposal, eventDate: e.target.value })}
                      placeholder="e.g. Saturday & Sunday, 14-15 Nov 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Venue Inside Apartment *</label>
                    <input
                      type="text"
                      required
                      value={newProposal.venue}
                      onChange={(e) => setNewProposal({ ...newProposal, venue: e.target.value })}
                      placeholder="e.g. Central Clubhouse Arena & Open Promenade"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Expected Footfall / Audience</label>
                    <input
                      type="text"
                      value={newProposal.expectedAttendance}
                      onChange={(e) => setNewProposal({ ...newProposal, expectedAttendance: e.target.value })}
                      placeholder="e.g. 1,500+ Resident Families (Approx. 4,500 Attendees)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">RWA Contact Person</label>
                    <input
                      type="text"
                      value={newProposal.contactPerson}
                      onChange={(e) => setNewProposal({ ...newProposal, contactPerson: e.target.value })}
                      placeholder="e.g. K. R. Narayanan (Secretary)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">RWA Contact Phone</label>
                    <input
                      type="text"
                      value={newProposal.phone}
                      onChange={(e) => setNewProposal({ ...newProposal, phone: e.target.value })}
                      placeholder="e.g. +91 98401 23456"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">RWA Contact Email</label>
                    <input
                      type="email"
                      value={newProposal.email}
                      onChange={(e) => setNewProposal({ ...newProposal, email: e.target.value })}
                      placeholder="e.g. rwa.secretary@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1 font-semibold">
                      Scope of Work & Deliverables (One line per deliverable: Item: Description) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={newProposal.scopeOfWorkText}
                      onChange={(e) => setNewProposal({ ...newProposal, scopeOfWorkText: e.target.value })}
                      placeholder="Stall Canopies: 20 weather-safe canopies with tables & chairs&#10;Power Supply: Main power junction box & silent generator backup"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 mb-1 font-semibold">
                      Complimentary Deliverables Included (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={newProposal.inclusionsText}
                      onChange={(e) => setNewProposal({ ...newProposal, inclusionsText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-[11px]"
                    />
                  </div>

                  {/* SELECT SERVICES REQUIRED FROM MP DREAM EVENTS */}
                  <div className="sm:col-span-2 space-y-2.5 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="block text-purple-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Select Services Required from MP Dream Events:</span>
                      </label>
                      <span className="text-[10px] text-purple-400 font-semibold px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30">
                        {proposalServices.length} Services Selected
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Select all turnkey event services included for this society&apos;s proposal:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                      {AVAILABLE_SERVICES_MENU.map((srv, idx) => {
                        const isChecked = proposalServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => toggleProposalService(srv)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-medium transition flex items-center space-x-2.5 ${
                              isChecked
                                ? "bg-purple-950/60 border-purple-500/60 text-purple-200 shadow-sm"
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
                            <span className="truncate">{srv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CUSTOMIZABLE TERMS & CONDITIONS PER APARTMENT */}
                  <div className="sm:col-span-2 p-4 rounded-xl bg-purple-950/20 border border-purple-500/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-purple-300 font-bold text-xs uppercase tracking-wider">
                        Apartment-Specific Guidelines & Terms (Customizable for Each Society) *
                      </label>
                      <span className="text-[10px] text-amber-400 font-semibold">
                        Different per apartment
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Customize quiet hours, gate entry pass regulations, cleaning responsibilities, or zero-cost clauses specifically for this apartment. Enter one term per line.
                    </p>
                    <textarea
                      rows={5}
                      required
                      value={newProposal.termsText}
                      onChange={(e) => setNewProposal({ ...newProposal, termsText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-[11px] leading-relaxed"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowNewProposalForm(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={proposalCreating}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wider text-xs transition shadow-lg shadow-purple-600/30"
                    >
                      {proposalCreating ? "Publishing Proposal..." : "Generate & Publish Proposal Link"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Proposals Cards List */}
            <div className="space-y-4">
              {proposals.map((prop) => (
                <div
                  key={prop.token}
                  className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {prop.associationName || prop.clientName}
                        </span>
                        {prop.status === "approved" ? (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approved & Signed</span>
                          </span>
                        ) : prop.status === "changes_requested" ? (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                            Revisions Requested
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
                            Pending Approval
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-white font-outfit">
                        {prop.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Date: <strong className="text-white">{prop.eventDate}</strong> • Venue: <strong className="text-white">{prop.venue}</strong>
                      </p>
                    </div>

                    <div className="text-left md:text-right space-y-1 shrink-0">
                      <span className="inline-block px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
                        Client Approval Portal
                      </span>
                      <div className="text-[11px] text-emerald-400 font-semibold">
                        Zero Cost to Association (Vendor-Paid Stalls)
                      </div>
                      {prop.terms && (
                        <div className="text-[10px] text-slate-400">
                          {prop.terms.length} Custom Apartment Guidelines
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Included Services Tags */}
                  {prop.services && prop.services.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-semibold text-slate-400">Services Included:</span>
                      {prop.services.map((srv, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/20"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Approver Details if Approved */}
                  {prop.status === "approved" && prop.approverDetails && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-emerald-400 font-bold block">
                          Signed by: {prop.approverDetails.name} ({prop.approverDetails.designation})
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {prop.approverDetails.organization} • {prop.approverDetails.approvedAt ? new Date(prop.approverDetails.approvedAt).toLocaleString("en-IN") : "Verified"}
                        </span>
                      </div>
                      {prop.approverDetails.comments && (
                        <div className="text-[11px] text-slate-300 italic max-w-sm truncate">
                          &ldquo;{prop.approverDetails.comments}&rdquo;
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <span className="font-mono text-[11px]">/approval/{prop.token}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          const url = `${window.location.origin}/approval/${encodeURIComponent(prop.token)}`;
                          safeCopy(url, prop.token);
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedToken === prop.token ? "Copied Link!" : "Copy Link"}</span>
                      </button>

                      <a
                        href={`/approval/${encodeURIComponent(prop.token)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Client Portal</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STALL BOOKINGS & GALLERY placeholder tabs */}
        {(activeTab === "bookings" || activeTab === "gallery") && (
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-3">
            <Building2 className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-white capitalize">{activeTab} Management</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Real-time stall locking and asset upload interfaces are ready for automated payment gateway integration in Phase 2.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
