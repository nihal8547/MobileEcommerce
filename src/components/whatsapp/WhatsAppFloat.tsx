"use client";

import { useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+97466000000";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hi MobileShop Qatar! I need help.")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl p-5 w-72 border border-gray-100 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm" style={{ fontFamily: "var(--font-syne)" }}>MobileShop Qatar</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  Online — replies instantly
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="bg-[#e7f8ec] rounded-xl p-3 mb-4">
            <p className="text-sm text-gray-700">
              👋 Hello! Welcome to <strong>MobileShop Qatar</strong>. How can we help you today?
            </p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full text-sm py-3"
          >
            <MessageCircle size={16} />
            Start Chat on WhatsApp
          </a>
          <a
            href="tel:+97466000000"
            className="flex items-center justify-center gap-2 mt-2.5 text-sm text-gray-600 hover:text-brand-500 transition-colors"
          >
            <Phone size={14} />
            +974 6600 0000
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center relative"
        aria-label="WhatsApp Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse-slow"></span>
          </span>
        )}
      </button>
    </div>
  );
}
