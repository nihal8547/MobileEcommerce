"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

interface WhatsAppButtonProps {
  productName: string;
  productUrl?: string;
  priceQar: number;
  whatsappNumber?: string;
  enabled?: boolean;
}

export function WhatsAppButton({
  productName,
  productUrl,
  priceQar,
  whatsappNumber = "+97466000000",
  enabled = true,
}: WhatsAppButtonProps) {
  if (!enabled) return null;

  const message = `Hi! I'm interested in:\n*${productName}*\nPrice: QAR ${priceQar.toFixed(2)}${productUrl ? `\n${productUrl}` : ""}`;
  const url = getWhatsAppUrl(whatsappNumber, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-whatsapp w-full"
    >
      <MessageCircle size={18} />
      Enquire on WhatsApp
    </a>
  );
}
