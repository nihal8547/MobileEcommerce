import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { WhatsAppFloat } from "@/components/whatsapp/WhatsAppFloat";
import { CartProvider } from "@/components/providers/CartProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MobileShop Qatar — Premium Smartphones & Gadgets",
    template: "%s | MobileShop Qatar",
  },
  description:
    "Qatar's #1 online mobile store. Shop the latest iPhones, Samsung, and gadgets with free delivery in Doha. COD available. Best prices guaranteed.",
  keywords: ["mobile shop qatar", "smartphones doha", "buy iPhone qatar", "Samsung Qatar", "mobile accessories"],
  openGraph: {
    type: "website",
    locale: "en_QA",
    siteName: "MobileShop Qatar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.variable} ${syne.variable}`}>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "#f9fafb",
                borderRadius: "12px",
                padding: "14px 18px",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
