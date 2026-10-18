import { Truck, ShieldCheck, Banknote, RotateCcw, Lock, Headphones } from "lucide-react";

const badges = [
  { icon: Truck, title: "Fast Delivery", desc: "Same-day in Doha", color: "text-blue-400" },
  { icon: ShieldCheck, title: "100% Genuine", desc: "Official warranty", color: "text-green-400" },
  { icon: Banknote, title: "Cash on Delivery", desc: "Pay at your door", color: "text-amber-400" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy", color: "text-purple-400" },
  { icon: Lock, title: "Secure Payment", desc: "256-bit SSL", color: "text-brand-400" },
  { icon: Headphones, title: "24/7 Support", desc: "+974 6600 0000", color: "text-rose-400" },
];

export function TrustBadges() {
  return (
    <section className="py-8 bg-gray-900">
      <div className="container-main">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-gray-700 border border-gray-700 rounded-2xl overflow-hidden">
          {badges.map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className="bg-gray-900 px-4 py-5 text-center hover:bg-gray-800 transition-colors">
              <div className="flex justify-center mb-2">
                <Icon size={22} className={color} />
              </div>
              <p className="font-bold text-sm text-white">{title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
