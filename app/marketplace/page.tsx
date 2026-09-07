"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api/client";

export default function MarketplacePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/marketplace/listings");
        setListings(data.listings || []);
      } catch {
        setListings([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Marketplace</h1>

      {loading && <p className="text-gray-400">Loading listings...</p>}

      {!loading && listings.length === 0 && (
        <p className="text-gray-400">No listings available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <Link
            key={item.id}
            href={`/marketplace/${item.id}`}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900 block"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <p className="text-white font-bold">${item.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
