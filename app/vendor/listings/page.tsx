"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

export default function VendorListingsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/vendor/listings");
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
      <h1 className="text-4xl font-bold mb-8">Your Listings</h1>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && listings.length === 0 && (
        <p className="text-gray-400">You have no listings yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-4">{item.description}</p>

            <button className="p-2 bg-white text-black font-bold rounded mb-2">
              Edit Listing
            </button>

            <button
              className="p-2 bg-red-500 text-white font-bold rounded"
              onClick={async () => {
                const confirmed = confirm(
                  "Are you sure you want to delete this listing?"
                );
                if (!confirmed) return;

                try {
                  await api.delete(`/vendor/listings/${item.id}`);
                  alert("Listing deleted");
                  setListings((prev) => prev.filter((l) => l.id !== item.id));
                } catch {
                  alert("Error deleting listing");
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
