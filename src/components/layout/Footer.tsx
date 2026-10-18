import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Smartphones", href: "/category/smartphones" },
    { label: "Tablets", href: "/category/tablets" },
    { label: "Audio & Headphones", href: "/category/audio" },
    { label: "Wearables", href: "/category/wearables" },
    { label: "Accessories", href: "/category/accessories" },
    { label: "Offers & Deals", href: "/offers" },
  ],
  help: [
    { label: "Track Your Order", href: "/account/orders" },
    { label: "Return Policy", href: "/returns" },
    { label: "Warranty Info", href: "/warranty" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About MobileShop", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Careers", href: "/careers" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="container-main py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                  MobileShop
                </div>
                <div className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">Qatar</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Qatar&apos;s trusted mobile store. Genuine products, best prices, fast delivery across Doha and all Qatar.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="tel:+97466000000" className="flex items-center gap-2.5 hover:text-brand-400 transition-colors">
                <Phone size={14} className="text-brand-500" />
                +974 6600 0000
              </a>
              <a href="mailto:hello@mobileshopqatar.com" className="flex items-center gap-2.5 hover:text-brand-400 transition-colors">
                <Mail size={14} className="text-brand-500" />
                hello@mobileshopqatar.com
              </a>
              <span className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-500 mt-0.5 flex-shrink-0" />
                Al Waab Street, Doha, Qatar
              </span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Help</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {["VISA", "MC", "AMEX", "mada"].map((card) => (
                  <span key={card} className="px-2.5 py-1 bg-gray-800 border border-gray-700 rounded text-xs font-bold text-gray-300">
                    {card}
                  </span>
                ))}
                <span className="px-2.5 py-1 bg-gray-800 border border-gray-700 rounded text-xs font-bold text-gray-300">COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-main py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2024 MobileShop Qatar. All rights reserved. Doha, State of Qatar 🇶🇦
          </p>
          <a
            href="https://wa.me/97466000000?text=Hi!%20I%20need%20help%20with%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#25D366] hover:text-[#20ba5a] transition-colors"
          >
            <MessageCircle size={14} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
