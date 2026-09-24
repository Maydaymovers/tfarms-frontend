"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/api/client";

type PricingResult = {
  recommendedPricePerUnit?: string | number;
  recommendedTotalPrice?: string | number;
  confidence?: string | number;
  notes?: string;
};

export default function PricingScreen() {
  const [form, setForm] = useState({
    cropType: "",
    region: "",
    season: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PricingResult | null>(null);
  const [error, setError] = useState("");

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await api.post("/ai/pricing", {
        cropType: form.cropType,
        region: form.region,
        season: form.season,
        quantity: Number(form.quantity),
      });
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>TFarms Smart Pricing Tool</h1>
      <p>Enter crop details to generate AI-powered pricing.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <label>
          Crop Type
          <input
            name="cropType"
            value={form.cropType}
            onChange={handleChange}
            placeholder="e.g., corn"
            required
          />
        </label>
        <label>
          Region
          <input
            name="region"
            value={form.region}
            onChange={handleChange}
            placeholder="e.g., Lagos"
            required
          />
        </label>
        <label>
          Season
          <input
            name="season"
            value={form.season}
            onChange={handleChange}
            placeholder="e.g., dry"
            required
          />
        </label>
        <label>
          Quantity (kg)
          <input
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="500"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            display: "block",
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            background: "#008000",
            color: "#fff",
            border: "none",
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? "Calculating..." : "Generate Pricing"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <section
          style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}
        >
          <h2>Pricing Results</h2>
          <p>
            <strong>Recommended Price Per Unit:</strong>{" "}
            {result.recommendedPricePerUnit}
          </p>
          <p>
            <strong>Total Price:</strong> {result.recommendedTotalPrice}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>
          <p>
            <strong>Notes:</strong> {result.notes}
          </p>
        </section>
      )}
    </main>
  );
}
