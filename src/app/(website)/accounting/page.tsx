import { Metadata } from "next";
import Link from "next/link";
import { Calculator, CheckCircle2, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Accounting & Tax Services Chennai | MP Dream Events & Solutions",
  description:
    "Professional business accounting, GST registration, monthly returns, corporate tax filings, and bookkeeping services in Chennai for event vendors and enterprises.",
};

export default function AccountingPage() {
  const services = [
    {
      title: "GST Registration & Monthly Filing",
      desc: "Hassle-free GST setup, GSTR-1, GSTR-3B filings, input tax credit reconciliation, and audit support.",
    },
    {
      title: "Income Tax & Corporate Filings",
      desc: "Annual IT returns for sole proprietors, partnerships, LLPs, and Private Limited companies.",
    },
    {
      title: "Bookkeeping & Financial Statements",
      desc: "Systematic monthly ledger maintenance, profit & loss accounts, balance sheets, and bank reconciliations.",
    },
    {
      title: "Payroll & TDS Compliance",
      desc: "Salary processing, Form 16 issuance, quarterly TDS return filings, and employee tax planning.",
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-black text-white space-y-16 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-emerald-400 font-semibold text-xs tracking-widest uppercase">
            Financial & Tax Advisory
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            Business Accounting & Tax Solutions
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Keep your corporate finances audit-ready and legally compliant with our specialized tax consultants in Chennai.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-3 hover:border-emerald-500/40 transition shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white font-syne">{item.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Embedded Enquiry Form */}
        <div className="bg-zinc-950 p-8 sm:p-12 rounded-3xl border border-zinc-900 max-w-4xl mx-auto space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white font-syne">Consult Our Tax Accountant</h2>
            <p className="text-slate-400 text-xs">
              Request a free initial consultation for your business accounting and GST filings.
            </p>
          </div>
          <EnquiryForm defaultService="Accounting & Tax" />
        </div>

      </div>
    </div>
  );
}
