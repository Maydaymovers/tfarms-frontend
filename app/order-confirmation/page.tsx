"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

export default function OrderConfirmationPage({ searchParams }: any) {
  const orderId = searchParams.orderId;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get(`/orders/${orderId}`);
        setOrder(data || null);
      } catch {
        setOrder(null);
      }
      setLoading(false);
    }
    load();
  }, [orderId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Loading order...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Order not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Order Confirmed</h1>

      <p className="text-gray-300 mb-6">
        Thank you for your purchase! Your order ID is:
      </p>

      <p className="text-white font-bold text-xl mb-10">{orderId}</p>

      <div className="space-y-6">
        {order.items?.map((item: any) => (
          <div
            key={item.id}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <p className="text-white font-bold">${item.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-xl font-semibold">
          Total Paid: ${order.total?.toFixed(2)}
        </p>
      </div>
    </main>
  );
}
