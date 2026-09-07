"use client";

import { useState } from "react";
import { api } from "@/lib/api/client";

export default function NewListingPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post("/vendor/listings/new", form);
      setResult("Listing created successfully");
    } catch (err: any) {
      setResult("Error creating listing");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Create New Listing</h1>

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
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Listing"}
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
