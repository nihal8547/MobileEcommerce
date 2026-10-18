"use client";

const offers = [
  "🎉 Free Delivery on orders above QAR 200 in Doha",
  "📱 Latest iPhone 16 Pro now available — Limited Stock!",
  "💳 0% Installment plans available",
  "🚚 Express same-day delivery in Qatar",
  "✅ Genuine products with official warranty",
  "🏷️ Up to 40% OFF on selected accessories",
];

export function AnnouncementBar() {
  const doubled = [...offers, ...offers];
  return (
    <div className="bg-[#8b1a3f] text-white py-2 overflow-hidden relative">
      <div
        className="flex gap-12 whitespace-nowrap animate-ticker"
        style={{ width: "max-content" }}
      >
        {doubled.map((offer, i) => (
          <span key={i} className="text-sm font-medium flex-shrink-0 px-4">
            {offer}
          </span>
        ))}
      </div>
    </div>
  );
}
