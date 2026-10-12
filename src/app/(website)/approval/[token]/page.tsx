"use client";

import { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  MapPin,
  Users,
  Printer,
  X,
  Phone,
  Mail,
  Building2,
  Sparkles,
} from "lucide-react";

interface ProposalScopeItem {
  item: string;
  description: string;
  amount: number;
}

interface ProposalApproval {
  approverName: string;
  designation: string;
  organization: string;
  approvedAt: string;
  notes?: string;
}

interface ProposalData {
  _id: string;
  token: string;
  title: string;
  clientName: string;
  associationName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  venue: string;
  eventDate: string;
  expectedAttendance?: string;
  residentUnits?: number;
  expectedFootfall?: number;
  totalEstimate?: number;
  totalAmount?: number;
  advanceRequired?: number;
  version?: number;
  status: "draft" | "sent" | "approved" | "changes_requested" | "declined" | "pending" | "rejected";
  createdAt?: string;
  scopeOfWork?: ProposalScopeItem[];
  inclusions?: string[];
  exclusions?: string[];
  terms?: string[];
  termsAndConditions?: string[];
  approvalHistory?: ProposalApproval[];
  approverDetails?: {
    name?: string;
    designation?: string;
    organization?: string;
    approvedAt?: string | Date;
    comments?: string;
  };
  paymentStatus?: string;
}

function ProposalApprovalView({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);

  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Approval Modal States
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Approver form inputs
  const [approverName, setApproverName] = useState("");
  const [designation, setDesignation] = useState("President / Secretary, RWA");
  const [organization, setOrganization] = useState("");
  const [comments, setComments] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Change request input
  const [changeNotes, setChangeNotes] = useState("");

  const refetchProposal = async () => {
    try {
      const res = await fetch(`/api/proposals/${token}`);
      if (res.ok) {
        const data = await res.json();
        setProposal(data.proposal);
        setOrganization(data.proposal.associationName || data.proposal.clientName || "");
      }
    } catch {
      // keep existing state
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/proposals/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setProposal(data.proposal);
        setOrganization(data.proposal.associationName || data.proposal.clientName || "");
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Proposal link not found or access token expired. Please contact MP Dream Events.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/proposals/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          approverName,
          designation,
          organization,
          comments,
        }),
      });

      if (res.ok) {
        setShowApproveModal(false);
        await refetchProposal();
      } else {
        alert("Failed to submit approval. Please try again.");
      }
    } catch {
      alert("Error processing approval request.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeNotes.trim()) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/proposals/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request_changes",
          comments: changeNotes,
        }),
      });

      if (res.ok) {
        setShowChangesModal(false);
        await refetchProposal();
      } else {
        alert("Failed to submit change request.");
      }
    } catch {
      alert("Error submitting request.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
        <p className="text-zinc-400 text-sm">Loading Client Proposal & Quotation...</p>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <h1 className="text-2xl font-bold font-outfit">Proposal Not Found</h1>
        <p className="text-zinc-400 text-sm max-w-md">{error}</p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs uppercase"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  const isApproved = proposal.status === "approved";
  const isChangesRequested = proposal.status === "changes_requested";

  return (
    <div className="py-12 sm:py-20 bg-black text-white min-h-screen relative selection:bg-purple-600 selection:text-white print:bg-white print:text-black">
      {/* Background Atmosphere */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none print:hidden" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none print:hidden" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Top Action & Verification Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 print:hidden">
          <div className="flex items-center space-x-2.5">
            <Building2 className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {proposal.associationName || proposal.clientName}
              </div>
              <div className="text-[11px] text-zinc-400">
                Official Event Proposal & Quotation Review Portal
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>

            {isApproved ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approved</span>
              </span>
            ) : isChangesRequested ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Revision Requested</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>Pending Approval</span>
              </span>
            )}
          </div>
        </div>

        {/* Official Document Banner / Certificate */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-6 shadow-2xl print:border print:border-black print:p-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-zinc-900 pb-6 print:border-black">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-[11px] font-bold uppercase tracking-widest print:hidden">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>MP DREAM EVENTS & SOLUTIONS</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight print:text-black">
                {proposal.title}
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm print:text-gray-700">
                Prepared exclusively for: <strong className="text-white print:text-black">{proposal.clientName}</strong> ({proposal.associationName})
              </p>
            </div>

            <div className="text-left md:text-right space-y-1 text-xs text-zinc-400 print:text-black shrink-0">
              <div>Proposal Reference: <strong className="font-mono text-white print:text-black">{proposal.token}</strong></div>
              <div>Date Issued: <strong className="text-white print:text-black">{proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Active"}</strong></div>
              <div>Version: <strong className="text-white print:text-black">v{proposal.version || 1}.0</strong></div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-900 flex items-center space-x-3 print:border-black">
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 flex items-center justify-center text-purple-400 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400 font-medium">Event Date</div>
                <div className="text-sm font-bold text-white print:text-black">{proposal.eventDate}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-900 flex items-center space-x-3 print:border-black">
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400 font-medium">Event Venue</div>
                <div className="text-sm font-bold text-white print:text-black truncate max-w-[200px]">{proposal.venue}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-900 flex items-center space-x-3 print:border-black">
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 flex items-center justify-center text-purple-400 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400 font-medium">Expected Footfall</div>
                <div className="text-sm font-bold text-white print:text-black">{proposal.expectedAttendance}</div>
              </div>
            </div>
          </div>

          {/* Scope of Work & Quotation Table */}
          <div className="space-y-3 pt-2">
            <h2 className="text-lg font-bold text-white font-outfit print:text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Scope of Work & Quotation Breakdown</span>
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-zinc-900 print:border-black">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-300 print:bg-gray-100 print:text-black">
                  <tr>
                    <th className="py-3 px-4 font-bold">#</th>
                    <th className="py-3 px-4 font-bold">Item & Deliverable</th>
                    <th className="py-3 px-4 font-bold">Description / Technical Specification</th>
                    <th className="py-3 px-4 font-bold text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300 print:divide-gray-300 print:text-black">
                  {proposal.scopeOfWork?.map((row: ProposalScopeItem, idx: number) => (
                    <tr key={idx} className="hover:bg-zinc-900/30">
                      <td className="py-3 px-4 font-mono text-zinc-500">{String(idx + 1).padStart(2, "0")}</td>
                      <td className="py-3 px-4 font-bold text-white print:text-black">{row.item}</td>
                      <td className="py-3 px-4 text-zinc-400 print:text-gray-700 leading-relaxed max-w-md">{row.description}</td>
                      <td className="py-3 px-4 font-extrabold text-right text-white font-outfit print:text-black">
                        ₹{Number(row.amount).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-zinc-900/60 font-bold border-t border-zinc-800 print:bg-gray-100 print:border-black">
                  <tr>
                    <td colSpan={3} className="py-3.5 px-4 text-right text-white uppercase tracking-wider text-xs print:text-black">
                      Total Agreed Event Budget:
                    </td>
                    <td className="py-3.5 px-4 text-right text-lg font-black text-amber-400 font-outfit print:text-black">
                      ₹{Number(proposal.totalAmount).toLocaleString("en-IN")}
                    </td>
                  </tr>
                  <tr className="text-zinc-400 text-[11px] print:text-black">
                    <td colSpan={3} className="py-2 px-4 text-right">
                      Advance Required to Initiate Fabrication & Vendor Procurement (50%):
                    </td>
                    <td className="py-2 px-4 text-right font-bold text-purple-300 print:text-black">
                      ₹{Number(proposal.advanceRequired).toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-900 space-y-2.5 print:border-black">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Included in This Quotation</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300 print:text-black">
                {proposal.inclusions?.map((inc: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-900 space-y-2.5 print:border-black">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Exclusions / Client Responsibilities</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300 print:text-black">
                {proposal.exclusions?.map((exc: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Proposal Terms */}
          <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 space-y-2 text-xs print:border-black">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] print:text-black">
              Payment & Execution Terms
            </div>
            <ul className="space-y-1.5 text-zinc-400 print:text-black">
              {proposal.terms?.map((t: string, i: number) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Approver Sign-off Audit Box if Already Approved */}
          {isApproved && (
            <div className="p-6 rounded-2xl bg-emerald-950/20 border-2 border-emerald-500/50 space-y-3 print:border-black">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Digitally Approved & Signed Off</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
                <div>
                  <span className="text-zinc-500 block">Authorized Approver:</span>
                  <strong className="text-white print:text-black">{proposal.approverDetails?.name}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Designation:</span>
                  <strong className="text-white print:text-black">{proposal.approverDetails?.designation}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Organization:</span>
                  <strong className="text-white print:text-black">{proposal.approverDetails?.organization}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block">Approval Timestamp:</span>
                  <strong className="text-white print:text-black">
                    {proposal.approverDetails?.approvedAt
                      ? new Date(proposal.approverDetails.approvedAt).toLocaleString("en-IN")
                      : "Verified"}
                  </strong>
                </div>
              </div>

              {proposal.approverDetails?.comments && (
                <div className="pt-2 text-xs text-zinc-300 italic border-t border-emerald-900/40">
                  &ldquo;{proposal.approverDetails.comments}&rdquo;
                </div>
              )}
            </div>
          )}

          {/* Approval Action Bar for Pending Proposals */}
          {!isApproved && (
            <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div>
                <p className="text-xs text-zinc-400">
                  Please review the complete scope, pricing, and terms above. Once satisfied, authorize the proposal to proceed with vendor procurement.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowChangesModal(true)}
                  className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider border border-zinc-800 transition"
                >
                  Request Changes
                </button>

                <button
                  type="button"
                  onClick={() => setShowApproveModal(true)}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/40 transition transform hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Authorize Event</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Coordinator Contact Card */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs print:hidden">
          <div className="space-y-1">
            <span className="font-bold text-white text-sm">MP Dream Events Solutions Coordination Desk</span>
            <p className="text-zinc-400">Questions about technical setup, stall dimensions, or schedule alterations?</p>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <a
              href="tel:+917338999723"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>+91 73389 99723</span>
            </a>
            <a
              href="mailto:mpdreamevents@gmail.com"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Desk</span>
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================
          APPROVE & AUTHORIZE MODAL
          ======================================================== */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-purple-500/40 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white font-outfit">
                  Authorize & Approve Proposal
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowApproveModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApprove} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Authorized Signatory Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                  placeholder="e.g. K. R. Narayanan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. RWA Secretary"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    Organization / Association *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Prestige Bella Vista RWA"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Approval Notes / Committee Remarks (Optional)
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="e.g. Approved by RWA executive committee on 11 Oct 2026."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-purple-700 bg-black text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                  />
                  <span className="text-[11px] text-zinc-300 leading-tight">
                    I confirm that I am an authorized representative of <strong>{organization || "the association"}</strong>, and by submitting this digital signature, approve the event scope of work, budget of <strong>₹{Number(proposal.totalAmount).toLocaleString("en-IN")}</strong>, and execution terms. *
                  </span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowApproveModal(false)}
                  className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !agreedTerms || !approverName.trim()}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wider disabled:opacity-50 transition"
                >
                  {actionLoading ? "Signing & Confirming..." : "Confirm & Authorize"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          REQUEST CHANGES MODAL
          ======================================================== */}
      {showChangesModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-outfit">
                Request Scope / Quotation Revision
              </h3>
              <button
                type="button"
                onClick={() => setShowChangesModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestChanges} className="p-6 space-y-4 text-xs">
              <p className="text-zinc-400">
                Please specify any alterations needed regarding stall count, electrical power, entertainment schedules, or budget constraints:
              </p>

              <div>
                <textarea
                  rows={4}
                  required
                  value={changeNotes}
                  onChange={(e) => setChangeNotes(e.target.value)}
                  placeholder="e.g. Please add 5 extra artisan stalls near Block B and shift DJ commencement to 5:00 PM."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowChangesModal(false)}
                  className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !changeNotes.trim()}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider disabled:opacity-50 transition"
                >
                  {actionLoading ? "Submitting Request..." : "Submit Revision Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ClientProposalApprovalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-zinc-400 text-sm">Loading Client Proposal & Quotation...</p>
        </div>
      }
    >
      <ProposalApprovalView params={params} />
    </Suspense>
  );
}
