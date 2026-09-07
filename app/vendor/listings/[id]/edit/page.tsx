"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

interface EditListingProps {
  params: { id: string };
}

export default function EditListingPage({ params }: EditListingProps) {
  const { id } = params;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    async function loadListing() {
      try {
        const data = await api.get(`/vendor/listings/${id}`);
        setForm({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
        });
      } catch {
        setResult("Error loading listing");
      }
      setLoading(false);
    }

    loadListing();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setResult(null);

    try {
      await api.put(`/vendor/listings/${id}`, form);
      setResult("Listing updated successfully");
    } catch {
      setResult("Error updating listing");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <p className="text-gray-400">Loading listing...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Edit Listing</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          className="p-3 rounded bg-gray-800 text-white h-32"
        />

        <input
          type="text"
          placeholder="Price"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="p-3 bg-white text-black font-bold rounded"
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Listing"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-900">
          <p className="text-gray-300">{result}</p>
        </div>
      )}
    </main>
  );
}
