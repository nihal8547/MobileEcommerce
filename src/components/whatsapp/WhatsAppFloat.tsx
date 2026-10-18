"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  X,
  Phone,
  Send,
  ShieldCheck,
  Truck,
  CheckCheck,
  Sparkles,
} from "lucide-react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+97455001234";

const QUICK_QUERIES = [
  {
    label: "🚚 Same-Day Delivery in Doha?",
    text: "Hi MobileShop Qatar, I would like to inquire about same-day delivery options in Doha.",
  },
  {
    label: "📱 Check stock & best price",
    text: "Hi, could you please confirm availability and best price for a phone?",
  },
  {
    label: "🛡️ Qatar Agency Warranty check",
    text: "Hi, I want to verify official Qatar warranty coverage for a product.",
  },
  {
    label: "🛍️ Order directly via WhatsApp",
    text: "Hello, I want to place an order directly with a sales representative.",
  },
];

export function WhatsAppFloat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");

  if (pathname?.startsWith("/admin")) return null;

  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  const handleLaunchWhatsApp = (customText?: string) => {
    const textToSend = customText || userQuery || "Hi MobileShop Qatar! I need assistance with an order.";
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, "_blank");
    setOpen(false);
    setUserQuery("");
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* WhatsApp Chat Popup Box */}
      {open && (
        <div className="bg-white rounded-3xl shadow-2xl w-[90vw] max-w-[340px] sm:w-[360px] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 flex flex-col">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                  <MessageCircle size={22} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-sm leading-none">
                    MobileShop Qatar
                  </p>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-emerald-200 font-semibold">
                    🇶🇦 Doha
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200 mt-1 flex items-center gap-1">
                  <span>Replies instantly · 9 AM – 11 PM</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white/90"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Canvas */}
          <div className="p-4 bg-[#ECE5DD]/40 flex flex-col gap-3 min-h-[220px] max-h-[360px] overflow-y-auto">
            {/* Welcome Bubble from Agent */}
            <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-xs border border-gray-100 max-w-[88%] self-start relative">
              <p className="text-xs text-gray-800 leading-relaxed">
                👋 <strong>Marhaba!</strong> Welcome to MobileShop Qatar Customer Care.
              </p>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                How can we assist you with your tech purchase, Doha same-day delivery, or official warranty today?
              </p>
              <div className="flex items-center justify-end gap-1 mt-1.5 text-[10px] text-gray-400">
                <span>Just now</span>
                <CheckCheck size={13} className="text-blue-500" />
              </div>
            </div>

            {/* Quick Query Suggestions */}
            <div className="flex flex-col gap-1.5 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-1">
                Frequently Asked:
              </p>
              {QUICK_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLaunchWhatsApp(q.text)}
                  className="text-left text-xs font-semibold text-gray-700 hover:text-emerald-800 bg-white hover:bg-emerald-50/80 p-2.5 rounded-xl border border-gray-200/80 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat Input & Send */}
          <div className="p-3 bg-white border-t border-gray-100 flex flex-col gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLaunchWhatsApp();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center flex-shrink-0 transition-colors shadow-xs cursor-pointer active:scale-95"
                aria-label="Send via WhatsApp"
              >
                <Send size={16} />
              </button>
            </form>

            {/* Direct Phone Backup */}
            <a
              href="tel:+97455001234"
              className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-gray-900 pt-1 transition-colors"
            >
              <Phone size={12} className="text-emerald-600" />
              <span>Direct Phone: +974 5500 1234</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="relative group">
        {/* Pulsing Aura */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        )}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 sm:w-15 sm:h-15 rounded-full text-white shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center relative cursor-pointer ${
            open
              ? "bg-gray-800 hover:bg-gray-900 rotate-90"
              : "bg-[#25D366] hover:bg-[#20ba5a] hover:scale-105 shadow-emerald-500/30"
          }`}
          aria-label={open ? "Close WhatsApp Menu" : "Open WhatsApp Chat"}
        >
          {open ? (
            <X size={24} />
          ) : (
            <>
              <MessageCircle size={28} />
              {/* Online Green Pulsing Indicator */}
              <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </span>
            </>
          )}
        </button>

        {/* Hover Tooltip when closed */}
        {!open && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            <span>💬 Chat on WhatsApp</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-4 border-transparent border-l-gray-900" />
          </div>
        )}
      </div>
    </div>
  );
}
