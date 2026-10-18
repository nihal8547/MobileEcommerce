"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { useState } from "react";
import { MessageCircle, CreditCard, Truck, Save, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    // WhatsApp
    whatsappEnabled: true,
    whatsappNumber: "+97466000000",
    // Payment
    codEnabled: true,
    onlinePayEnabled: true,
    // Delivery
    standardDeliveryQar: 15,
    expressDeliveryQar: 30,
    freeDeliveryAboveQar: 200,
    // Store
    storeName: "MobileShop Qatar",
    currency: "QAR",
    announcementText: "🚚 Free delivery on orders above QAR 200",
  });

  const handleSave = async () => {
    // In production: PATCH /api/settings
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key: string, value: string | number | boolean) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Configure WhatsApp, payments, and delivery</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "btn-primary"
          }`}
        >
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl">
        {/* WhatsApp */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <MessageCircle size={18} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">WhatsApp Integration</h2>
              <p className="text-xs text-gray-500">Direct customer connection via WhatsApp</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Enable WhatsApp Button</p>
                <p className="text-xs text-gray-500">Shows on product pages and floating button</p>
              </div>
              <button
                onClick={() => update("whatsappEnabled", !settings.whatsappEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  settings.whatsappEnabled ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  settings.whatsappEnabled ? "left-7" : "left-1"
                }`} />
              </button>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp Number</label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-600 shrink-0">
                  🇶🇦
                </span>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => update("whatsappNumber", e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-mono"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Include country code, e.g. +97466000000</p>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <CreditCard size={18} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Payment Methods</h2>
              <p className="text-xs text-gray-500">Toggle accepted payment options</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                key: "codEnabled",
                label: "Cash on Delivery (COD)",
                desc: "Customer pays at the door",
                enabled: settings.codEnabled,
              },
              {
                key: "onlinePayEnabled",
                label: "Online Payment",
                desc: "VISA, MasterCard, mada, AMEX",
                enabled: settings.onlinePayEnabled,
              },
            ].map(({ key, label, desc, enabled }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <button
                  onClick={() => update(key, !enabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${enabled ? "bg-blue-500" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${enabled ? "left-7" : "left-1"}`} />
                </button>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Truck size={18} className="text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Delivery Pricing</h2>
              <p className="text-xs text-gray-500">Set delivery fees in QAR</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "standardDeliveryQar", label: "Standard Delivery (QAR)", desc: "3-5 business days" },
              { key: "expressDeliveryQar", label: "Express Delivery (QAR)", desc: "Same day in Doha" },
              { key: "freeDeliveryAboveQar", label: "Free Delivery Above (QAR)", desc: "Standard becomes free" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <p className="text-xs text-gray-400 mb-1.5">{desc}</p>
                <input
                  type="number"
                  value={(settings as Record<string, string | number | boolean>)[key] as number}
                  onChange={(e) => update(key, Number(e.target.value))}
                  min={0}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Store */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-card">
          <h2 className="font-semibold text-gray-900 mb-4">Store Information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Announcement Bar Text</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => update("announcementText", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
