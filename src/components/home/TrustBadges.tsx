const badges = [
  { icon: "🚚", title: "Fast Delivery", desc: "Same-day in Doha", color: "text-blue-600" },
  { icon: "✅", title: "100% Genuine", desc: "Official warranty", color: "text-green-600" },
  { icon: "💵", title: "Cash on Delivery", desc: "Pay at your door", color: "text-amber-600" },
  { icon: "🔄", title: "Easy Returns", desc: "7-day return policy", color: "text-purple-600" },
  { icon: "🔒", title: "Secure Payment", desc: "256-bit SSL", color: "text-brand-600" },
  { icon: "📞", title: "24/7 Support", desc: "+974 6600 0000", color: "text-rose-600" },
];

export function TrustBadges() {
  return (
    <section className="py-8 bg-gray-900">
      <div className="container-main">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-gray-700 border border-gray-700 rounded-2xl overflow-hidden">
          {badges.map((badge, i) => (
            <div key={i} className="bg-gray-900 px-4 py-5 text-center hover:bg-gray-800 transition-colors">
              <div className="text-2xl mb-1.5">{badge.icon}</div>
              <p className={`font-bold text-sm text-white`}>{badge.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
