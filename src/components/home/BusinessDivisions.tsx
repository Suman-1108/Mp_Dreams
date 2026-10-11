import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BusinessDivisions() {
  const divisions = [
    {
      title: "Weddings & Celebrations",
      desc: "Luxury mandap decor, stage lighting, catering coordination & reception management.",
      image: "/images/wedding-stage.jpg",
      link: "/services#weddings",
    },
    {
      title: "Apartment Events & Expos",
      desc: "Organizing weekend apartment events, community bazaars, and high-footfall canopy stalls.",
      image: "/images/apartment-expo.jpg",
      link: "/expo",
    },
    {
      title: "Corporate & Cultural Events",
      desc: "Executive corporate meets, product launches, AV stage setups & annual functions.",
      image: "/images/corporate-stage.jpg",
      link: "/services#corporate",
    },
    {
      title: "Accounting & Tax Services",
      desc: "Comprehensive business accounting, GST returns, corporate tax filings & bookkeeping.",
      image: "/images/hero-banner.jpg",
      link: "/accounting",
    },
  ];

  return (
    <section className="py-20 bg-black text-white border-b border-zinc-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="text-purple-400 font-bold text-xs tracking-widest uppercase">
            OUR SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-syne text-white">
            Excellence for Every Occasion
          </h2>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 rounded-3xl overflow-hidden flex flex-col justify-between group border border-zinc-900 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-950/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Image Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors font-syne">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-end">
                  <Link
                    href={item.link}
                    className="w-9 h-9 rounded-full bg-zinc-900 group-hover:bg-purple-600 flex items-center justify-center transition border border-zinc-800"
                  >
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
