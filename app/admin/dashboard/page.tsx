"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/admin/stats");
        setStats(data || {});
      } catch {
        setStats(null);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Loading admin dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-2">Vendors</h2>
          <p className="text-white text-3xl font-bold">{stats.vendors || 0}</p>
        </div>

        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-2">Listings</h2>
          <p className="text-white text-3xl font-bold">{stats.listings || 0}</p>
        </div>

        <div className="border border-gray-700 p-6 rounded-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-white text-3xl font-bold">{stats.orders || 0}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link
          href="/admin/vendors"
          className="block p-3 bg-white text-black font-bold rounded"
        >
          Manage Vendors
        </Link>

        <Link
          href="/admin/listings"
          className="block p-3 bg-white text-black font-bold rounded"
        >
          Moderate Listings
        </Link>

        <Link
          href="/admin/payouts"
          className="block p-3 bg-white text-black font-bold rounded"
        >
          Review Payouts
        </Link>
      </div>
    </main>
  );
}
