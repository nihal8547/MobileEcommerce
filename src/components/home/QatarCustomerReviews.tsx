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
    <section className="py-12 bg-surface-secondary border-t border-gray-100">
      <div className="container-main">
        <div className="text-center max-w-xl mx-auto mb-8">
          <p className="text-brand-500 text-xs font-extrabold uppercase tracking-wider mb-1">
            Customer Testimonials
          </p>
          <h2 className="section-title">Loved by Shoppers Across Qatar</h2>
          <p className="text-gray-500 text-sm mt-1">
            Over 15,000 satisfied mobile & gadget orders delivered safely in Doha & beyond
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-card-hover transition-all duration-300"
            >
              <div>
                {/* Rating & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-yellow-400">
                    {Array.from({ length: rev.rating }).map((_, j) => (
                      <Star key={j} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={20} className="text-brand-200" />
                </div>

                {/* Feedback */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{rev.name}</p>
                    <p className="text-xs text-gray-400 font-medium">📍 {rev.location}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={11} /> Verified
                  </span>
                </div>
                <p className="text-[11px] text-brand-600 font-medium mt-1 truncate">
                  Purchased: {rev.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
