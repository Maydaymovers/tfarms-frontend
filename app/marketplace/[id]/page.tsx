"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

interface ListingPageProps {
  params: { id: string };
}

export default function ListingPage({ params }: ListingPageProps) {
  const { id } = params;

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get(`/marketplace/listings/${id}`);
        setListing(data || null);
      } catch {
        setListing(null);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Loading listing...</p>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Listing not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">{listing.title}</h1>

      <p className="text-gray-400 mb-4">{listing.description}</p>

      <p className="text-xl font-semibold mb-6">${listing.price}</p>

      <button
        className="p-3 bg-white text-black font-bold rounded"
        onClick={async () => {
          try {
            await api.post("/cart/add", { listingId: id });
            alert("Added to cart");
          } catch {
            alert("Error adding to cart");
          }
        }}
      >
        Add to Cart
      </button>
    </main>
  );
}
