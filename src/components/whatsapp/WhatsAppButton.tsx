"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

interface WhatsAppButtonProps {
  productName: string;
  productUrl?: string;
  priceQar: number;
  whatsappNumber?: string;
  enabled?: boolean;
  className?: string;
  label?: string;
}

export function WhatsAppButton({
  productName,
  productUrl,
  priceQar,
  whatsappNumber = "+97466000000",
  enabled = true,
  className = "btn-whatsapp w-full",
  label = "WhatsApp",
}: WhatsAppButtonProps) {
  if (!enabled) return null;

  const message = `Hi! I'm interested in:\n*${productName}*\nPrice: QAR ${priceQar.toFixed(2)}${productUrl ? `\n${productUrl}` : ""}`;
  const url = getWhatsAppUrl(whatsappNumber, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-sm hover:shadow-md cursor-pointer text-decoration-none ${className}`}
    >
      <MessageCircle size={17} className="flex-shrink-0" />
      <span className="truncate">{label}</span>
    </a>
  );
}
