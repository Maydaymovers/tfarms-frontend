"use client";

import { useState } from "react";
import { api } from "@/lib/api/client";

export default function AiPricingAssistantPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Placeholder backend call
      const response = await api.post("/ai/pricing", { query: input });
      setResult(response.recommendation || "AI pricing result placeholder");
    } catch (err: any) {
      setResult("Error fetching pricing recommendation");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">AI Pricing Assistant</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Describe your product (e.g., organic corn, 50 lbs)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="p-3 bg-white text-black font-bold rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Get AI Pricing"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">AI Recommendation</h2>
          <p className="text-gray-300">{result}</p>
        </div>
      )}
    </main>
  );
}
