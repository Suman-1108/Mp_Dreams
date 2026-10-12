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
} from "lucide-react";

interface DashboardEnquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  eventDate?: string;
  location?: string;
  budget?: string;
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
  approverDetails?: {
    name?: string;
    designation?: string;
    organization?: string;
    approvedAt?: string | Date;
    comments?: string;
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enqRes, venRes, evtRes, propRes] = await Promise.all([
        fetch("/api/enquiries"),
        fetch("/api/vendors"),
        fetch("/api/events?admin=true"),
        fetch("/api/proposals"),
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
        setProposals(d.proposals || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const [enqRes, venRes, evtRes, propRes] = await Promise.all([
          fetch("/api/enquiries"),
          fetch("/api/vendors"),
          fetch("/api/events?admin=true"),
          fetch("/api/proposals"),
        ]);
        if (!isMounted) return;
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
          setProposals(d.proposals || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadInitialData();
    return () => {
      isMounted = false;
    };
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

          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-400" : ""}`} />
            <span>Refresh Data</span>
          </button>
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
                        <td className="p-3 font-semibold text-white">{e.name}</td>
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
                  Manage digital proposal links, track committee sign-offs, and monitor event budget authorizations.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold">
                  {proposals.length} Total Proposals
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                  {proposals.filter((p) => p.status === "approved").length} Approved
                </span>
              </div>
            </div>

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
                      <div className="text-xs text-slate-400">Total Budget Quotation:</div>
                      <div className="text-xl font-black text-amber-400 font-outfit">
                        ₹{Number(prop.totalAmount).toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-purple-300">
                        Advance (50%): ₹{Number(prop.advanceRequired).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

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
                          const url = `${window.location.origin}/approval/${prop.token}`;
                          navigator.clipboard.writeText(url);
                          setCopiedToken(prop.token);
                          setTimeout(() => setCopiedToken(null), 3000);
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedToken === prop.token ? "Copied Link!" : "Copy Link"}</span>
                      </button>

                      <a
                        href={`/approval/${prop.token}`}
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
