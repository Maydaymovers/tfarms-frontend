"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/cart");
        setItems(data.items || []);
      } catch {
        setItems([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const order = await api.post("/checkout", {
        buyer: form,
        items,
        total,
      });

      router.push(`/order-confirmation?orderId=${order.id || "placeholder"}`);
    } catch {
      alert("Error completing checkout");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Loading checkout...</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="mb-10">
        <p className="text-xl mb-2">Order Total: ${total.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <textarea
          placeholder="Shipping Address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="p-3 rounded bg-gray-800 text-white h-32"
        />

        <button
          type="submit"
          className="p-3 bg-white text-black font-bold rounded"
          disabled={saving}
        >
          {saving ? "Processing..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}
