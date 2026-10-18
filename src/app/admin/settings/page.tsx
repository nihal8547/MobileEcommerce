"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import {
  MessageCircle,
  CreditCard,
  Truck,
  Save,
  CheckCircle,
  Store,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Bell,
} from "lucide-react";
import toast from "react-hot-toast";

interface StoreSettingsData {
  storeName: string;
  supportPhone: string;
  supportEmail: string;
  storeLocation: string;
  currency: string;
  whatsappEnabled: boolean;
  whatsappNumber: string;
  whatsappGreeting: string;
  codEnabled: boolean;
  onlinePayEnabled: boolean;
  standardDeliveryQar: number;
  expressDeliveryQar: number;
  freeDeliveryAboveQar: number;
  announcementText: string;
}

const DEFAULT_SETTINGS: StoreSettingsData = {
  storeName: "MobileShop Qatar",
  supportPhone: "+974 6600 0000",
  supportEmail: "support@mobileshop.qa",
  storeLocation: "Al Sadd, Doha, Qatar",
  currency: "QAR",
  whatsappEnabled: true,
  whatsappNumber: "+97466000000",
  whatsappGreeting: "Salam! How can we assist you with Qatar mobile orders?",
  codEnabled: true,
  onlinePayEnabled: true,
  standardDeliveryQar: 15,
  expressDeliveryQar: 30,
  freeDeliveryAboveQar: 200,
  announcementText: "Free delivery on orders above QAR 200 in Doha · 100% Genuine Qatar Agency Warranty",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettingsData>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("mobileshop_admin_settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
        return;
      }
    } catch {
      // Ignore
    }
  }, []);

  const update = <K extends keyof StoreSettingsData>(key: K, value: StoreSettingsData[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);

    try {
      localStorage.setItem("mobileshop_admin_settings", JSON.stringify(settings));

      // Attempt API sync
      try {
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        });
      } catch {
        // API sync optional in local demo
      }

      await new Promise((r) => setTimeout(r, 400));
      setSaved(true);
      toast.success("Store settings updated and saved!");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem("mobileshop_admin_settings", JSON.stringify(DEFAULT_SETTINGS));
    } catch {
      // Ignore
    }
    toast.success("Reset to factory Qatar settings!");
  };

  return (
    <AdminLayout>
      {/* Title & Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Configure WhatsApp channel, delivery pricing in QAR, and store branding
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            type="button"
            className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw size={15} />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md cursor-pointer ${
              saved
                ? "bg-emerald-600 text-white"
                : "btn-primary"
            }`}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : saved ? (
              <>
                <CheckCircle size={16} />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-4xl">
        {/* General Store Identity */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-card">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
              <Store size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">Store Identity & Contact</h2>
              <p className="text-xs text-gray-500">Public store information displayed across Qatar</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => update("storeName", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Currency Symbol</label>
              <input
                type="text"
                value={settings.currency}
                onChange={(e) => update("currency", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Hotline Phone</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => update("supportPhone", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => update("supportEmail", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Store Location in Doha</label>
              <input
                type="text"
                value={settings.storeLocation}
                onChange={(e) => update("storeLocation", e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-card">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <MessageCircle size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">WhatsApp Direct Channel</h2>
              <p className="text-xs text-gray-500">
                Direct buyer connection & floating WhatsApp widget
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              onClick={() => update("whatsappEnabled", !settings.whatsappEnabled)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">Enable WhatsApp Live Chat</p>
                <p className="text-xs text-gray-500">
                  Activates floating button and direct product order links
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.whatsappEnabled}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                  settings.whatsappEnabled ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    settings.whatsappEnabled ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp Hotline Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => update("whatsappNumber", e.target.value)}
                  placeholder="+97466000000"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-mono"
                />
                <p className="text-[11px] text-gray-400 mt-1">Include country code: +974</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Default Customer Greeting
                </label>
                <input
                  type="text"
                  value={settings.whatsappGreeting}
                  onChange={(e) => update("whatsappGreeting", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Rates & Free Threshold */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-card">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Truck size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">Delivery Pricing & Doha Zones</h2>
              <p className="text-xs text-gray-500">Shipping rates in QAR applied at checkout</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Standard Delivery (QAR)
              </label>
              <input
                type="number"
                min={0}
                value={settings.standardDeliveryQar}
                onChange={(e) => update("standardDeliveryQar", Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-sans"
              />
              <p className="text-[11px] text-gray-400 mt-1">3-5 business days across Qatar</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Express Delivery (QAR)
              </label>
              <input
                type="number"
                min={0}
                value={settings.expressDeliveryQar}
                onChange={(e) => update("expressDeliveryQar", Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-sans"
              />
              <p className="text-[11px] text-gray-400 mt-1">Same-day delivery in Doha</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Free Delivery Above (QAR)
              </label>
              <input
                type="number"
                min={0}
                value={settings.freeDeliveryAboveQar}
                onChange={(e) => update("freeDeliveryAboveQar", Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 font-sans"
              />
              <p className="text-[11px] text-gray-400 mt-1">Orders above this get free shipping</p>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-card">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <CreditCard size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">Payment Methods</h2>
              <p className="text-xs text-gray-500">Toggle accepted customer payment options</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div
              onClick={() => update("codEnabled", !settings.codEnabled)}
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">Cash on Delivery (COD)</p>
                <p className="text-xs text-gray-500">Pay cash/card to courier at doorstep</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.codEnabled}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                  settings.codEnabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    settings.codEnabled ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div
              onClick={() => update("onlinePayEnabled", !settings.onlinePayEnabled)}
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/70 transition-colors cursor-pointer select-none"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">Online Card Payment</p>
                <p className="text-xs text-gray-500">VISA, MasterCard, QPAY gateway</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.onlinePayEnabled}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                  settings.onlinePayEnabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    settings.onlinePayEnabled ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Announcement Ticker Text */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-card">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#8b1a3f]">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base">Store Announcement Bar</h2>
              <p className="text-xs text-gray-500">Scrolling marquee banner at the very top of the store</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Marquee Notification Text
            </label>
            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) => update("announcementText", e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
