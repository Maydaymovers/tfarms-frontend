"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

export default function AdminListingsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/admin/listings");
        setListings(data.listings || []);
      } catch {
        setListings([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function approveListing(id: string) {
    try {
      await api.post(`/admin/listings/${id}/approve`, {});
      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "approved" } : l
        )
      );
    } catch {
      alert("Error approving listing");
    }
  }

  async function rejectListing(id: string) {
    try {
      await api.post(`/admin/listings/${id}/reject`, {});
      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "rejected" } : l
        )
      );
    } catch {
      alert("Error rejecting listing");
    }
  }

  async function suspendListing(id: string) {
    try {
      await api.post(`/admin/listings/${id}/suspend`, {});
      setListings((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: "suspended" } : l
        )
      );
    } catch {
      alert("Error suspending listing");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Moderate Listings</h1>

      {loading && <p className="text-gray-400">Loading listings...</p>}

      {!loading && listings.length === 0 && (
        <p className="text-gray-400">No listings found.</p>
      )}

      <div className="space-y-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">{listing.title}</h2>
            <p className="text-gray-400 mb-2">{listing.description}</p>
            <p className="text-gray-400 mb-4">
              Status: <span className="font-bold text-white">{listing.status}</span>
            </p>

            {listing.status === "pending" && (
              <button
                className="p-2 bg-white text-black font-bold rounded mr-3"
                onClick={() => approveListing(listing.id)}
              >
                Approve
              </button>
            )}

            {listing.status !== "rejected" && (
              <button
                className="p-2 bg-yellow-500 text-black font-bold rounded mr-3"
                onClick={() => rejectListing(listing.id)}
              >
                Reject
              </button>
            )}

            {listing.status !== "suspended" && (
              <button
                className="p-2 bg-red-500 text-white font-bold rounded"
                onClick={() => suspendListing(listing.id)}
              >
                Suspend
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
