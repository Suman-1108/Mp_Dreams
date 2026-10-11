import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Calendar, Calculator, CheckCircle2, ArrowRight } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Event & Business Services | MP Dream Events & Solutions",
  description:
    "Explore our complete service catalog: Wedding Planning, Apartment Expos, Corporate Seminars, Cultural Stage Shows, and Business Tax Accounting in Chennai.",
};

export default function ServicesPage() {
  const serviceList = [
    {
      id: "event-management",
      title: "Full-Scale Event Management",
      desc: "Complete planning and execution for private functions, stage decor, lighting, audio-visual setups, and catering management.",
      features: [
        "Stage & Theme Decor Design",
        "Professional Sound & Lighting Systems",
        "Artist & Anchor Booking",
        "Catering & Hospitality Support",
      ],
    },
    {
      id: "weddings",
      title: "Weddings & Reception Celebrations",
      desc: "Bespoke wedding planning crafted for traditional, contemporary, and fusion grand receptions in Chennai and ECR beach resorts.",
      features: [
        "Traditional & Theme Mandap Design",
        "Guest Reception & Logistics",
        "Photography & Videography Coordination",
        "Sangeet & Mehendi Night Setup",
      ],
    },
    {
      id: "expo",
      title: "Apartment Events, Expos & Stall Management",
      desc: "Organizing weekend apartment events, community bazaars, and festive exhibitions inside high-density gated apartment complexes for active consumer engagement.",
      features: [
        "Standardized Waterproof Canopy Stalls",
        "Resident Footfall & Community Marketing",
        "Electrical Power Points & Security",
        "Vendor Onboarding & Support",
      ],
    },
    {
      id: "corporate",
      title: "Corporate Seminars & Cultural Functions",
      desc: "Executive corporate events, product launches, dealer meets, and annual employee cultural celebrations.",
      features: [
        "AV & Projector Stage Setup",
        "Branding & Backdrop Printing",
        "Executive VIP Catering",
        "Press & Media Management",
      ],
    },
    {
      id: "accounting",
      title: "Accounting, GST & Corporate Tax Services",
      desc: "Professional financial support services designed to keep event vendors, small businesses, and corporates compliant.",
      features: [
        "GST Registration & Monthly Filings",
        "Corporate Income Tax & TDS Filings",
        "Financial Statement Preparation",
        "Bookkeeping & Payroll Management",
      ],
    },
  ];

  return (
    <div className="py-16 sm:py-24 bg-black text-white min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-amber-400 font-semibold text-xs tracking-widest uppercase">
            Comprehensive Services
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-syne text-white">
            Event Management, Expos & Business Solutions
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Tailored solutions designed to deliver flawless experiences and seamless administrative compliance across Chennai.
          </p>
        </div>

        {/* Services Catalog */}
        <div className="space-y-12">
          {serviceList.map((service, idx) => (
            <div
              key={service.id}
              id={service.id}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-purple-500/40 transition scroll-mt-28 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Service 0{idx + 1}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-syne">{service.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{service.desc}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider text-center transition shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5"
                >
                  Enquire For This Service
                </Link>
                {service.id === "expo" && (
                  <Link
                    href="/vendors/register"
                    className="px-6 py-3.5 rounded-full bg-zinc-900 text-slate-200 hover:text-white border border-zinc-800 font-semibold text-xs text-center transition hover:border-zinc-700"
                  >
                    Vendor Register
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Form */}
        <div className="bg-zinc-950 p-8 sm:p-12 rounded-3xl border border-zinc-900 max-w-4xl mx-auto space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white font-syne">Custom Service Request</h3>
            <p className="text-slate-400 text-xs">
              Need a tailored package combining decor, catering, stall management, or accounting support? Contact us below.
            </p>
          </div>
          <EnquiryForm defaultService="Event Management" />
        </div>

      </div>
    </div>
  );
}
