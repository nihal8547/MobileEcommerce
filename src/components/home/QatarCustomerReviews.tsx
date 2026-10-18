import { Star, CheckCircle, Quote } from "lucide-react";

const reviews = [
  {
    name: "Jassim Al-Mannai",
    location: "The Pearl, Doha",
    rating: 5,
    product: "iPhone 16 Pro Max 256GB",
    date: "Verified Buyer · Yesterday",
    text: "Ordered at 11 AM and the driver reached my apartment in Porto Arabia by 2 PM! Brand new sealed pack with official Apple Qatar warranty. The best tech store in Doha.",
  },
  {
    name: "Reem Al-Hajri",
    location: "Al Waab, Qatar",
    rating: 5,
    product: "Samsung Galaxy S25 Ultra",
    date: "Verified Buyer · 3 days ago",
    text: "Used Cash on Delivery. Driver brought the POS card machine as requested. Phone is 100% genuine Samsung Gulf version. Super smooth experience!",
  },
  {
    name: "Tariq Mansoor",
    location: "Lusail Marina, Qatar",
    rating: 5,
    product: "Sony WH-1000XM6 ANC",
    date: "Verified Buyer · 1 week ago",
    text: "Saved almost QAR 350 compared to the airport and local mall prices. WhatsApp customer support was very helpful in tracking my delivery.",
  },
];

export function QatarCustomerReviews() {
  return (
    <section className="py-14 sm:py-16 bg-[#fafafa] border-t border-gray-100">
      <div className="container-main">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Trusted Across Qatar
          </h2>
          <p className="text-gray-500 text-sm mt-1.5">
            Over 15,000+ authentic smartphone and gadget deliveries completed in Doha, Lusail &amp; The Pearl.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md border border-gray-200/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, j) => (
                      <Star key={j} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={20} className="text-gray-200" />
                </div>

                {/* Feedback */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-gray-900 text-sm">{rev.name}</span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
                    <CheckCircle size={11} className="text-emerald-600" /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>📍 {rev.location}</span>
                  <span className="text-[11px] text-brand-600 font-medium truncate max-w-[150px]">
                    {rev.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
