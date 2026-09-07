"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/admin/vendors");
        setVendors(data.vendors || []);
      } catch {
        setVendors([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function approveVendor(id: string) {
    try {
      await api.post(`/admin/vendors/${id}/approve`);
      setVendors((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, status: "approved" } : v
        )
      );
    } catch {
      alert("Error approving vendor");
    }
  }

  async function suspendVendor(id: string) {
    try {
      await api.post(`/admin/vendors/${id}/suspend`);
      setVendors((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, status: "suspended" } : v
        )
      );
    } catch {
      alert("Error suspending vendor");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Manage Vendors</h1>

      {loading && <p className="text-gray-400">Loading vendors...</p>}

      {!loading && vendors.length === 0 && (
        <p className="text-gray-400">No vendors found.</p>
      )}

      <div className="space-y-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="border border-gray-700 p-6 rounded-lg bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">{vendor.name}</h2>
            <p className="text-gray-400 mb-2">Email: {vendor.email}</p>
            <p className="text-gray-400 mb-4">
              Status: <span className="font-bold text-white">{vendor.status}</span>
            </p>

            {vendor.status === "pending" && (
              <button
                className="p-2 bg-white text-black font-bold rounded mr-3"
                onClick={() => approveVendor(vendor.id)}
              >
                Approve
              </button>
            )}

            {vendor.status !== "suspended" && (
              <button
                className="p-2 bg-red-500 text-white font-bold rounded"
                onClick={() => suspendVendor(vendor.id)}
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
