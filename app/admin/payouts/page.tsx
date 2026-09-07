"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/admin/payouts");
        setPayouts(data.payouts || []);
      } catch {
        setPayouts([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function approvePayout(id: string) {
    try {
      await api.post(`/admin/payouts/${id}/approve`);
      setPayouts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "approved" } : p
        )
      );
    } catch {
      alert("Error approving payout");
    }
  }

  async function holdPayout(id: string) {
    try {
      await api.post(`/admin/payouts/${id}/hold`);
      setPayouts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "held" } : p
        )
      );
    } catch {
      alert("Error holding payout");
    }
  }

  async function releasePayout(id: string) {
    try {
      await api.post(`/admin/payouts/${id}/release`);
      setPayouts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "released" } : p
        )
      );
    } catch {
      alert("Error releasing payout");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Review Payouts</h1>

      {loading && <p className="text-gray-400">Loading payouts...</p>}

      {!loading && payouts.length === 0 && (
        <p className="text-gray-400">No payouts found.</p>
      )}

      <div className="space-y-6">
        {payouts.map((payout) => (
          <div
            key={payout.id}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Vendor: {payout.vendorName}
            </h2>

            <p className="text-gray-400 mb-2">Amount: ${payout.amount}</p>

            <p className="text-gray-400 mb-4">
              Status: <span className="font-bold text-white">{payout.status}</span>
            </p>

            {payout.status === "pending" && (
              <button
                className="p-2 bg-white text-black font-bold rounded mr-3"
                onClick={() => approvePayout(payout.id)}
              >
                Approve
              </button>
            )}

            {payout.status !== "held" && (
              <button
                className="p-2 bg-yellow-500 text-black font-bold rounded mr-3"
                onClick={() => holdPayout(payout.id)}
              >
                Hold
              </button>
            )}

            {payout.status !== "released" && (
              <button
                className="p-2 bg-green-600 text-white font-bold rounded"
                onClick={() => releasePayout(payout.id)}
              >
                Release
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
