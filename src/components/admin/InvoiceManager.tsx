"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import brandLogo from "@/assets/logo.png";
import {
  InvoiceRecord,
  InvoiceItem,
  numberToWordsIndian,
  DEFAULT_INVOICE_TERMS,
  DEFAULT_BANK_DETAILS,
} from "@/lib/sampleInvoices";
import {
  Plus,
  Receipt,
  FileText,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  Building,
  RotateCw,
  X,
  CreditCard,
  Building2,
  Check,
  Send,
  AlertTriangle,
  Loader2,
  Sparkles,
} from "lucide-react";

interface ProposalRef {
  title: string;
  associationName?: string;
  clientName?: string;
  phone?: string;
  email?: string;
  venue?: string;
  token?: string;
}

interface VendorRef {
  businessName?: string;
  brandName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  category?: string;
  targetEvent?: string;
}

interface EnquiryRef {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  organization?: string;
}

interface Props {
  proposals?: ProposalRef[];
  vendors?: VendorRef[];
  enquiries?: EnquiryRef[];
}

export default function InvoiceManager({ proposals = [], vendors = [], enquiries = [] }: Props) {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewingInvoice, setViewingInvoice] = useState<InvoiceRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Delete Confirmation Modal State & Loading Animation
  const [deleteTarget, setDeleteTarget] = useState<InvoiceRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMsg({ text, type });
    setTimeout(() => {
      setToastMsg((prev) => (prev?.text === text ? null : prev));
    }, 3500);
  };

  // Form State
  const [invoiceType, setInvoiceType] = useState<"invoice" | "receipt">("invoice");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientGst, setClientGst] = useState("");
  const [eventName, setEventName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "partial" | "pending" | "cancelled">("paid");
  const [paymentMode, setPaymentMode] = useState<"upi" | "bank_transfer" | "cash" | "cheque" | "card">("upi");
  const [transactionRef, setTransactionRef] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      description: "Commercial Food/Flea Stall (10x10 ft Canopy, 2 Tables, 2 Chairs, Power)",
      quantity: 1,
      rate: 8000,
      amount: 8000,
    },
  ]);
  const [taxRate, setTaxRate] = useState<number>(0); // 0 or 18%
  const [discount, setDiscount] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(8000);
  const [notes, setNotes] = useState("");
  const [termsText, setTermsText] = useState(DEFAULT_INVOICE_TERMS.join("\n"));

  // Quick autofill source tracker
  const [autofillSource, setAutofillSource] = useState("");

  const printAreaRef = useRef<HTMLDivElement>(null);

  // Generate sequence number
  const generateNumber = (type: "invoice" | "receipt") => {
    const prefix = type === "receipt" ? "MPD-REC" : "MPD-INV";
    const year = new Date().getFullYear();
    const rand = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${year}-${rand}`;
  };

  const openNewInvoiceModal = (type: "invoice" | "receipt" = "invoice") => {
    setInvoiceType(type);
    setInvoiceNumber(generateNumber(type));
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setClientAddress("");
    setClientGst("");
    setEventName("");
    setInvoiceDate(new Date().toISOString().split("T")[0]);
    setDueDate("");
    setPaymentDate(new Date().toISOString().split("T")[0]);
    setPaymentStatus(type === "receipt" ? "paid" : "pending");
    setPaymentMode("upi");
    setTransactionRef("");
    setItems([
      {
        description: type === "receipt"
          ? "Commercial Stall Reservation Fee - Advance Payment"
          : "Commercial Food/Flea Stall (10x10 ft Canopy, 2 Tables, 2 Chairs, Power)",
        quantity: 1,
        rate: 8000,
        amount: 8000,
      },
    ]);
    setTaxRate(0);
    setDiscount(0);
    setAmountPaid(type === "receipt" ? 8000 : 0);
    setNotes(type === "receipt" ? "Payment successfully received with thanks." : "");
    setTermsText(DEFAULT_INVOICE_TERMS.join("\n"));
    setSaveMsg("");
    setAutofillSource("");
    setShowCreateModal(true);
  };

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [items]);

  const taxAmount = useMemo(() => {
    if (!taxRate) return 0;
    const discounted = Math.max(0, subtotal - (Number(discount) || 0));
    return Math.round((discounted * taxRate) / 100);
  }, [subtotal, taxRate, discount]);

  const grandTotal = useMemo(() => {
    const discounted = Math.max(0, subtotal - (Number(discount) || 0));
    return discounted + taxAmount;
  }, [subtotal, discount, taxAmount]);

  const balanceDue = useMemo(() => {
    return Math.max(0, grandTotal - (Number(amountPaid) || 0));
  }, [grandTotal, amountPaid]);

  const amountInWords = useMemo(() => {
    return numberToWordsIndian(invoiceType === "receipt" ? (Number(amountPaid) || grandTotal) : grandTotal);
  }, [grandTotal, amountPaid, invoiceType]);

  // Handle Items Table changes
  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) => {
      const copy = [...prev];
      const cur = { ...copy[index], [field]: value };
      if (field === "quantity" || field === "rate") {
        const q = field === "quantity" ? Number(value) : cur.quantity;
        const r = field === "rate" ? Number(value) : cur.rate;
        cur.amount = (q || 0) * (r || 0);
      }
      copy[index] = cur;
      return copy;
    });
  };

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      { description: "Additional Stall / Equipment Service", quantity: 1, rate: 1000, amount: 1000 },
    ]);
  };

  const removeItemRow = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Quick fill handler
  const handleAutofill = (key: string) => {
    setAutofillSource(key);
    if (!key) return;

    if (key.startsWith("prop:")) {
      const token = key.replace("prop:", "");
      const prop = proposals.find((p) => p.token === token || p.title === token);
      if (prop) {
        setClientName(prop.associationName || prop.clientName || prop.title);
        setClientPhone(prop.phone || "");
        setClientEmail(prop.email || "");
        setEventName(prop.title || prop.venue || "");
        setClientAddress(prop.venue || "Chennai");
      }
    } else if (key.startsWith("ven:")) {
      const phone = key.replace("ven:", "");
      const ven = vendors.find((v) => v.phone === phone);
      if (ven) {
        setClientName(ven.businessName || ven.contactPerson || "Vendor");
        setClientPhone(ven.phone || "");
        setClientEmail(ven.email || "");
        setEventName(ven.targetEvent || "Grand Shopping Carnival");
        setItems([
          {
            description: `${ven.category || "Commercial"} Stall Canopy Setup (${ven.targetEvent || "Carnival"})`,
            quantity: 1,
            rate: 8500,
            amount: 8500,
          },
        ]);
        setAmountPaid(8500);
      }
    } else if (key.startsWith("enq:")) {
      const phone = key.replace("enq:", "");
      const enq = enquiries.find((e) => e.phone === phone);
      if (enq) {
        setClientName(enq.organization ? `${enq.name} (${enq.organization})` : enq.name);
        setClientPhone(enq.phone || "");
        setClientEmail(enq.email || "");
        setItems([
          {
            description: `${enq.service || "Event Management Package"}`,
            quantity: 1,
            rate: 15000,
            amount: 15000,
          },
        ]);
        setAmountPaid(15000);
      }
    }
  };

  // Fetch invoices from backend
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoices?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const d = await res.json();
        setInvoices(d.invoices || []);
      }
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Submit new invoice
  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setSaveMsg("Client name and phone number are required.");
      return;
    }

    setSaving(true);
    setSaveMsg("");

    const termsArray = termsText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: InvoiceRecord = {
      invoiceNumber: invoiceNumber.trim() || generateNumber(invoiceType),
      type: invoiceType,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      clientAddress: clientAddress.trim(),
      clientGst: clientGst.trim(),
      eventName: eventName.trim(),
      invoiceDate,
      dueDate,
      paymentDate,
      paymentStatus,
      paymentMode,
      transactionRef: transactionRef.trim(),
      items,
      subtotal,
      taxRate,
      taxAmount,
      discount,
      grandTotal,
      amountPaid: Number(amountPaid) || 0,
      balanceDue,
      amountInWords,
      notes: notes.trim(),
      terms: termsArray,
      bankDetails: DEFAULT_BANK_DETAILS,
    };

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const d = await res.json();
        setShowCreateModal(false);
        setViewingInvoice(d.invoice || payload);
        fetchInvoices();
      } else {
        const d = await res.json();
        setSaveMsg(d.message || "Failed to save invoice");
      }
    } catch {
      setSaveMsg("Network error saving invoice.");
    } finally {
      setSaving(false);
    }
  };

  // Quick mark as paid
  const handleMarkAsPaid = async (inv: InvoiceRecord) => {
    try {
      const res = await fetch("/api/invoices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceNumber: inv.invoiceNumber,
          paymentStatus: "paid",
          amountPaid: inv.grandTotal,
          balanceDue: 0,
        }),
      });
      if (res.ok) {
        setInvoices((prev) =>
          prev.map((i) =>
            i.invoiceNumber === inv.invoiceNumber
              ? { ...i, paymentStatus: "paid", amountPaid: i.grandTotal, balanceDue: 0 }
              : i
          )
        );
        if (viewingInvoice?.invoiceNumber === inv.invoiceNumber) {
          setViewingInvoice({
            ...viewingInvoice,
            paymentStatus: "paid",
            amountPaid: viewingInvoice.grandTotal,
            balanceDue: 0,
          });
        }
        showToast(`Invoice ${inv.invoiceNumber} marked as fully paid!`);
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating invoice status", "error");
    }
  };

  // Delete invoice with animated loading
  const confirmDeleteInvoice = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/invoices?invoiceNumber=${encodeURIComponent(deleteTarget.invoiceNumber)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInvoices((prev) => prev.filter((i) => i.invoiceNumber !== deleteTarget.invoiceNumber));
        if (viewingInvoice?.invoiceNumber === deleteTarget.invoiceNumber) setViewingInvoice(null);
        showToast(`Invoice ${deleteTarget.invoiceNumber} permanently deleted.`);
        setDeleteTarget(null);
      } else {
        showToast("Failed to delete invoice.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting invoice.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Native Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Filtered List
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.paymentStatus !== statusFilter) return false;
      if (typeFilter !== "all" && inv.type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = inv.invoiceNumber.toLowerCase().includes(q);
        const matchesClient = inv.clientName.toLowerCase().includes(q);
        const matchesPhone = inv.clientPhone.toLowerCase().includes(q);
        const matchesEvent = (inv.eventName || "").toLowerCase().includes(q);
        if (!matchesNum && !matchesClient && !matchesPhone && !matchesEvent) return false;
      }
      return true;
    });
  }, [invoices, statusFilter, typeFilter, searchQuery]);

  // Overall Stats
  const stats = useMemo(() => {
    const totalInvoiced = invoices.reduce((sum, i) => sum + (i.grandTotal || 0), 0);
    const totalCollected = invoices.reduce((sum, i) => sum + (i.amountPaid || 0), 0);
    const totalPending = invoices.reduce((sum, i) => sum + (i.balanceDue || 0), 0);
    return { totalInvoiced, totalCollected, totalPending, count: invoices.length };
  }, [invoices]);

  return (
    <div className="space-y-8">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice-container,
          #printable-invoice-container * {
            visibility: visible;
          }
          #printable-invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 0;
            margin: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Banner & Action Header */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Receipt className="w-4 h-4" />
            <span>Commercial Billing & Official Vouchers</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-outfit">
            Invoices & Payment Receipts Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Issue branded GST-compliant tax invoices and advance payment receipts for apartment carnivals, vendor stalls, car promotional displays, and turnkey event bookings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={fetchInvoices}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-amber-400" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => openNewInvoiceModal("receipt")}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Generate Payment Receipt</span>
          </button>

          <button
            type="button"
            onClick={() => openNewInvoiceModal("invoice")}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Tax Invoice</span>
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Invoiced Billing</div>
          <div className="text-2xl font-black text-white font-outfit">
            ₹{stats.totalInvoiced.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-slate-400">{stats.count} Total Invoices & Receipts</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Revenue Collected</div>
          <div className="text-2xl font-black text-emerald-400 font-outfit">
            ₹{stats.totalCollected.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-emerald-400/80">Paid via UPI & Bank Transfers</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Balance Due / Pending</div>
          <div className="text-2xl font-black text-amber-400 font-outfit">
            ₹{stats.totalPending.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-amber-400/80">Outstanding client balances</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Company GST & Bank</div>
          <div className="text-sm font-bold text-purple-300 font-mono">HDFC0001234</div>
          <div className="text-[10px] text-slate-400">UPI: 7338999723@upi</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by invoice #, client, event, phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Type filters */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-[11px]">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                typeFilter === "all" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter("invoice")}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                typeFilter === "invoice" ? "bg-amber-500/20 text-amber-300" : "text-slate-400 hover:text-white"
              }`}
            >
              Tax Invoices
            </button>
            <button
              onClick={() => setTypeFilter("receipt")}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                typeFilter === "receipt" ? "bg-emerald-500/20 text-emerald-300" : "text-slate-400 hover:text-white"
              }`}
            >
              Receipts
            </button>
          </div>

          {/* Status filters */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden relative">
        {loading ? (
          <div className="p-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <div className="flex items-center space-x-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                <span className="text-xs font-semibold text-amber-300 tracking-wide animate-pulse">
                  Loading invoices & payment records...
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Synchronizing ledger</span>
            </div>

            {/* Skeleton Shimmer Rows */}
            <div className="space-y-3 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-4 animate-pulse"
                >
                  <div className="space-y-2 w-1/4">
                    <div className="h-4 bg-slate-800 rounded w-32" />
                    <div className="h-2.5 bg-slate-800/60 rounded w-20" />
                  </div>
                  <div className="space-y-1.5 w-1/4">
                    <div className="h-3.5 bg-slate-800 rounded w-40" />
                    <div className="h-2.5 bg-slate-800/60 rounded w-28" />
                  </div>
                  <div className="space-y-1.5 w-1/6 hidden sm:block">
                    <div className="h-3 bg-slate-800 rounded w-24" />
                    <div className="h-2 bg-slate-800/60 rounded w-16" />
                  </div>
                  <div className="space-y-1.5 w-24 text-right">
                    <div className="h-4 bg-slate-800 rounded w-16 ml-auto" />
                    <div className="h-2.5 bg-slate-800/60 rounded w-12 ml-auto" />
                  </div>
                  <div className="w-20 h-6 bg-slate-800/80 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Invoices or Receipts Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? "No records match your search query."
                : "Generate your first tax invoice or vendor payment receipt using the buttons above."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Doc # & Type</th>
                  <th className="p-4">Client / Business</th>
                  <th className="p-4">Event / Reference</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Total Amount</th>
                  <th className="p-4 text-right">Paid / Due</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.invoiceNumber} className="hover:bg-slate-950/50 transition">
                    <td className="p-4">
                      <div className="font-mono font-bold text-white">{inv.invoiceNumber}</div>
                      <span
                        className={`inline-block mt-0.5 text-[9px] uppercase px-2 py-0.5 rounded font-extrabold ${
                          inv.type === "receipt"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-950/80 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {inv.type === "receipt" ? "Payment Receipt" : "Tax Invoice"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{inv.clientName}</div>
                      <div className="text-slate-400 text-[11px]">{inv.clientPhone}</div>
                      {inv.clientEmail && <div className="text-slate-500 text-[10px]">{inv.clientEmail}</div>}
                    </td>
                    <td className="p-4">
                      <div className="text-white max-w-xs truncate">{inv.eventName || "General Event"}</div>
                      {inv.transactionRef && (
                        <div className="text-slate-400 font-mono text-[10px]">{inv.transactionRef}</div>
                      )}
                    </td>
                    <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">
                      <div>Issued: {inv.invoiceDate}</div>
                      {inv.dueDate && <div className="text-slate-500 text-[10px]">Due: {inv.dueDate}</div>}
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-white text-sm">
                      ₹{Number(inv.grandTotal).toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 text-right font-mono text-xs">
                      <div className="text-emerald-400 font-semibold">
                        Paid: ₹{Number(inv.amountPaid || 0).toLocaleString("en-IN")}
                      </div>
                      {Number(inv.balanceDue || 0) > 0 ? (
                        <div className="text-amber-400 text-[11px]">
                          Due: ₹{Number(inv.balanceDue).toLocaleString("en-IN")}
                        </div>
                      ) : (
                        <div className="text-slate-500 text-[10px]">Settled</div>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inv.paymentStatus === "paid"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : inv.paymentStatus === "partial"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {inv.paymentStatus === "paid" && <Check className="w-2.5 h-2.5 mr-1" />}
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          type="button"
                          onClick={() => setViewingInvoice(inv)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                          title="View & Print Invoice"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {inv.paymentStatus !== "paid" && (
                          <button
                            type="button"
                            onClick={() => handleMarkAsPaid(inv)}
                            className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 transition"
                            title="Mark as Fully Paid"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(inv)}
                          className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 transition cursor-pointer"
                          title="Delete Invoice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE INVOICE / RECEIPT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      invoiceType === "receipt"
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                    }`}
                  >
                    {invoiceType === "receipt" ? "Official Payment Receipt" : "Commercial Tax Invoice"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1 font-outfit">
                  {invoiceType === "receipt" ? "Generate Payment Receipt" : "Create Tax Invoice"}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                {/* Mode Toggle inside modal */}
                <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setInvoiceType("invoice");
                      setInvoiceNumber(generateNumber("invoice"));
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      invoiceType === "invoice" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Invoice
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInvoiceType("receipt");
                      setInvoiceNumber(generateNumber("receipt"));
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      invoiceType === "receipt" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Receipt
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {saveMsg && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{saveMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveInvoice} className="space-y-6 text-xs">
              {/* Quick Fill Dropdown */}
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-purple-300 text-xs block">
                    ⚡ Quick Autofill from System Records:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Pull client and venue details from society proposals, registered vendors, or customer enquiries.
                  </span>
                </div>
                <select
                  value={autofillSource}
                  onChange={(e) => handleAutofill(e.target.value)}
                  className="w-full sm:w-72 px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/40 text-purple-200 text-xs focus:outline-none"
                >
                  <option value="">Select Record to Autofill...</option>
                  <optgroup label="Apartment Society Proposals">
                    {proposals.map((p, idx) => (
                      <option key={`prop-${idx}`} value={`prop:${p.token || p.title}`}>
                        {p.associationName || p.title}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Vendor Applications">
                    {vendors.map((v, idx) => (
                      <option key={`ven-${idx}`} value={`ven:${v.phone}`}>
                        {v.businessName || v.contactPerson} ({v.category})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Customer Enquiries">
                    {enquiries.map((enq, idx) => (
                      <option key={`enq-${idx}`} value={`enq:${enq.phone}`}>
                        {enq.name} - {enq.service}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Document Identity Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-300 font-semibold">
                      {invoiceType === "receipt" ? "Receipt Number *" : "Invoice Number *"}
                    </label>
                    <button
                      type="button"
                      onClick={() => setInvoiceNumber(generateNumber(invoiceType))}
                      className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                    >
                      <RotateCw className="w-2.5 h-2.5" />
                      <span>Regen</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {invoiceType === "receipt" ? "Receipt Date *" : "Invoice Date *"}
                  </label>
                  <input
                    type="date"
                    required
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    {invoiceType === "receipt" ? "Payment Date" : "Payment Due Date"}
                  </label>
                  <input
                    type="date"
                    value={invoiceType === "receipt" ? paymentDate : dueDate}
                    onChange={(e) => {
                      if (invoiceType === "receipt") setPaymentDate(e.target.value);
                      else setDueDate(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Client & Billed-To Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">
                    Billed To / Client or Society Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. TVS Emerald Peninsula RWA or Vendor Brand Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Client Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. +91 98401 23456"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Client Email (Optional)</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. accounts@client.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Event Name / Venue Reference</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Grand Shopping Carnival & Flea Fair"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Client Address / City</label>
                  <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="e.g. Manapakkam, Chennai - 600125"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Client GSTIN (If registered)</label>
                  <input
                    type="text"
                    value={clientGst}
                    onChange={(e) => setClientGst(e.target.value.toUpperCase())}
                    placeholder="e.g. 33AAAAA0000A1Z5"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white uppercase font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="paid">Fully Paid</option>
                    <option value="partial">Partially Paid (Advance)</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="bank_transfer">Bank Transfer (NEFT/RTGS/IMPS)</option>
                    <option value="cash">Cash Payment</option>
                    <option value="cheque">Cheque / Demand Draft</option>
                    <option value="card">Credit / Debit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Transaction / UTR / Reference No.</label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. UPI/328918291048 or NEFT ref"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Line Items Table */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-200 font-bold uppercase tracking-wider text-xs">
                    Itemized Deliverables & Pricing Breakdown
                  </label>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Line Item</span>
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Item Description</th>
                        <th className="p-3 w-20 text-center">Qty</th>
                        <th className="p-3 w-28 text-right">Unit Rate (₹)</th>
                        <th className="p-3 w-28 text-right">Total (₹)</th>
                        <th className="p-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/30">
                          <td className="p-2.5">
                            <input
                              type="text"
                              required
                              value={item.description}
                              onChange={(e) => updateItem(idx, "description", e.target.value)}
                              placeholder="e.g. Commercial Flea Market Stall (10x10 ft) with Lighting"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              min="1"
                              required
                              value={item.quantity}
                              onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-center focus:outline-none focus:border-amber-500 text-xs"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              min="0"
                              required
                              value={item.rate}
                              onChange={(e) => updateItem(idx, "rate", Number(e.target.value))}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-right font-mono focus:outline-none focus:border-amber-500 text-xs"
                            />
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-white pr-4">
                            ₹{Number(item.amount).toLocaleString("en-IN")}
                          </td>
                          <td className="p-2.5 text-center">
                            {items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItemRow(idx)}
                                className="p-1 rounded text-slate-500 hover:text-red-400 transition"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Calculation Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      Client Notes & Payment Comments
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Stall #14 allocated near clubhouse gate. Includes 2 chairs & 5A plug point."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">
                      Terms & Conditions (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={termsText}
                      onChange={(e) => setTermsText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-[11px] leading-relaxed font-mono"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="font-bold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-sans">Special Discount (₹):</span>
                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                      className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-right text-white font-mono text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-sans">GST Applicable:</span>
                    <select
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white text-xs"
                    >
                      <option value={0}>0% (Exempt / Vendor Stall)</option>
                      <option value={18}>18% GST (9% CGST + 9% SGST)</option>
                    </select>
                  </div>

                  {taxRate > 0 && (
                    <div className="flex justify-between text-purple-300 text-[11px]">
                      <span>GST Amount (18%):</span>
                      <span>₹{taxAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-bold text-amber-400 pt-2 border-t border-slate-800">
                    <span>Grand Total:</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-emerald-400 font-sans font-bold">Amount Paid (₹):</span>
                    <input
                      type="number"
                      min="0"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(Number(e.target.value) || 0)}
                      className="w-28 px-2 py-1 rounded bg-slate-900 border border-emerald-500/40 text-right text-emerald-300 font-mono text-xs font-bold"
                    />
                  </div>

                  <div className="flex justify-between text-xs font-bold pt-1 border-t border-slate-800">
                    <span className="text-slate-400 font-sans">Balance Due:</span>
                    <span className={balanceDue > 0 ? "text-amber-400" : "text-emerald-400"}>
                      ₹{balanceDue.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 font-sans pt-1 italic">
                    In Words: <strong className="text-slate-300 font-normal">{amountInWords}</strong>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs transition shadow-lg shadow-amber-500/20 flex items-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {saving
                      ? "Generating..."
                      : invoiceType === "receipt"
                      ? "Generate & View Receipt"
                      : "Create & View Invoice"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE / RECEIPT PREVIEW MODAL */}
      {viewingInvoice && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-6 max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Modal Actions Bar (hidden when printing) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 no-print">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-white text-sm">
                  {viewingInvoice.invoiceNumber}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    viewingInvoice.type === "receipt"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-950 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {viewingInvoice.type === "receipt" ? "Payment Receipt" : "Tax Invoice"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {viewingInvoice.paymentStatus !== "paid" && (
                  <button
                    type="button"
                    onClick={() => handleMarkAsPaid(viewingInvoice)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Paid</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewingInvoice(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRINTABLE A4 INVOICE CONTAINER */}
            <div
              id="printable-invoice-container"
              ref={printAreaRef}
              className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl font-sans text-xs leading-relaxed border border-slate-200"
            >
              {/* Header: Brand & Document Title */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
                <div className="flex items-start space-x-4">
                  <div className="relative h-16 w-16 shrink-0">
                    <Image
                      src={brandLogo}
                      alt="MP Dream Events & Solutions"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-900 uppercase font-outfit">
                      MP DREAM EVENTS & SOLUTIONS
                    </h1>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Turnkey Event Management, Flea Markets & Apartment Expos
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Chennai, Tamil Nadu • Phone: +91 73389 99723
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Email: info@mpdreamevents.com • Web: mpdreamevents.com
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <span
                    className={`inline-block text-xs uppercase font-extrabold px-3 py-1 rounded-md tracking-wider ${
                      viewingInvoice.type === "receipt"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-900 border border-amber-300"
                    }`}
                  >
                    {viewingInvoice.type === "receipt" ? "OFFICIAL PAYMENT RECEIPT" : "TAX INVOICE"}
                  </span>
                  <div className="text-base font-black font-mono text-slate-900">
                    {viewingInvoice.invoiceNumber}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Date: <strong className="text-slate-900">{viewingInvoice.invoiceDate}</strong>
                  </div>
                  {viewingInvoice.dueDate && (
                    <div className="text-[11px] text-slate-600">
                      Due Date: <strong className="text-slate-900">{viewingInvoice.dueDate}</strong>
                    </div>
                  )}
                  {viewingInvoice.paymentDate && (
                    <div className="text-[11px] text-slate-600">
                      Payment Date: <strong className="text-slate-900">{viewingInvoice.paymentDate}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Billed To & Payment Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Billed To / Recipient:
                  </span>
                  <div className="text-sm font-extrabold text-slate-900">{viewingInvoice.clientName}</div>
                  <div className="text-slate-700">Phone: {viewingInvoice.clientPhone}</div>
                  {viewingInvoice.clientEmail && (
                    <div className="text-slate-700">Email: {viewingInvoice.clientEmail}</div>
                  )}
                  {viewingInvoice.clientAddress && (
                    <div className="text-slate-700">Address: {viewingInvoice.clientAddress}</div>
                  )}
                  {viewingInvoice.clientGst && (
                    <div className="text-slate-700 font-mono text-[11px]">GSTIN: {viewingInvoice.clientGst}</div>
                  )}
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Event & Settlement Details:
                  </span>
                  {viewingInvoice.eventName && (
                    <div className="text-xs font-bold text-slate-900">{viewingInvoice.eventName}</div>
                  )}
                  <div className="text-slate-700">
                    Payment Mode: <strong className="uppercase font-mono">{viewingInvoice.paymentMode.replace("_", " ")}</strong>
                  </div>
                  {viewingInvoice.transactionRef && (
                    <div className="text-slate-700">
                      Ref / UTR: <strong className="font-mono">{viewingInvoice.transactionRef}</strong>
                    </div>
                  )}
                  <div className="pt-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                        viewingInvoice.paymentStatus === "paid"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : viewingInvoice.paymentStatus === "partial"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                      }`}
                    >
                      Payment Status: {viewingInvoice.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="py-6 border-b border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-slate-900 uppercase font-extrabold text-[10px]">
                      <th className="py-2.5">#</th>
                      <th className="py-2.5">Item Description</th>
                      <th className="py-2.5 text-center">Qty</th>
                      <th className="py-2.5 text-right">Unit Rate (₹)</th>
                      <th className="py-2.5 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {viewingInvoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 text-slate-500">{idx + 1}</td>
                        <td className="py-3 font-semibold text-slate-900">{item.description}</td>
                        <td className="py-3 text-center text-slate-700">{item.quantity}</td>
                        <td className="py-3 text-right font-mono text-slate-700">
                          ₹{Number(item.rate).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 text-right font-mono font-bold text-slate-900">
                          ₹{Number(item.amount).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200">
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                    <span className="font-bold text-slate-900 block uppercase text-[10px] tracking-wider">
                      Official Bank Transfer Details:
                    </span>
                    <div className="text-slate-700">Bank: <strong>{DEFAULT_BANK_DETAILS.bankName}</strong></div>
                    <div className="text-slate-700">A/C Name: <strong>{DEFAULT_BANK_DETAILS.accountName}</strong></div>
                    <div className="text-slate-700">A/C No: <strong className="font-mono">{DEFAULT_BANK_DETAILS.accountNumber}</strong></div>
                    <div className="text-slate-700">IFSC: <strong className="font-mono">{DEFAULT_BANK_DETAILS.ifsc}</strong></div>
                    <div className="text-slate-700">UPI ID: <strong className="font-mono text-purple-700">{DEFAULT_BANK_DETAILS.upiId}</strong></div>
                  </div>

                  {viewingInvoice.notes && (
                    <div className="text-[11px] text-slate-600 italic">
                      Notes: {viewingInvoice.notes}
                    </div>
                  )}
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>₹{Number(viewingInvoice.subtotal).toLocaleString("en-IN")}</span>
                  </div>

                  {Number(viewingInvoice.discount || 0) > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount:</span>
                      <span>- ₹{Number(viewingInvoice.discount).toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {Number(viewingInvoice.taxRate || 0) > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>GST ({viewingInvoice.taxRate}%):</span>
                      <span>₹{Number(viewingInvoice.taxAmount).toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t-2 border-slate-900">
                    <span>Grand Total:</span>
                    <span>₹{Number(viewingInvoice.grandTotal).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-emerald-800 font-bold">
                    <span>Amount Paid:</span>
                    <span>₹{Number(viewingInvoice.amountPaid || 0).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                    <span>Balance Due:</span>
                    <span className={Number(viewingInvoice.balanceDue) > 0 ? "text-amber-700" : "text-emerald-700"}>
                      ₹{Number(viewingInvoice.balanceDue || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-500 font-sans pt-1">
                    Amount in Words: <strong className="text-slate-800 font-semibold">{viewingInvoice.amountInWords || numberToWordsIndian(viewingInvoice.grandTotal)}</strong>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions & Signatures */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                <div className="space-y-1 text-[10px] text-slate-500">
                  <span className="font-bold text-slate-700 uppercase tracking-wider block">
                    Terms & Guidelines:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {(viewingInvoice.terms && viewingInvoice.terms.length > 0
                      ? viewingInvoice.terms
                      : DEFAULT_INVOICE_TERMS
                    ).map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-right space-y-2">
                  <div className="inline-block p-4 rounded-xl border border-dashed border-slate-300 text-center min-w-[200px]">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-8">
                      Authorized Signatory
                    </div>
                    <div className="text-xs font-black text-slate-900 font-outfit uppercase">
                      MP DREAM EVENTS & SOLUTIONS
                    </div>
                    <div className="text-[9px] text-slate-500">Official Computer Generated Stamp</div>
                  </div>
                </div>
              </div>

              {/* Watermark badge at bottom */}
              <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
                This is a digitally generated document issued by MP Dream Events & Solutions. Chennai, India.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM DELETE CONFIRMATION MODAL WITH ANIMATED SPINNER */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-3 text-rose-400">
              <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Delete Invoice Record</h3>
                <p className="text-[11px] text-slate-400">This action is permanent and cannot be undone.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Document #:</span>
                <span className="font-mono font-bold text-white">{deleteTarget.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Client:</span>
                <span className="font-bold text-white truncate max-w-[200px]">{deleteTarget.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount:</span>
                <span className="font-mono font-bold text-amber-400">
                  ₹{Number(deleteTarget.grandTotal).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDeleteInvoice}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-rose-600/30 flex items-center space-x-2 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Deleting Record...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white shadow-2xl animate-in slide-in-from-bottom-5 duration-300 text-xs">
          {toastMsg.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span className="font-medium">{toastMsg.text}</span>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
