"use client";

import { useState } from "react";
import { api } from "@/lib/api/client";

export default function AiMarketplaceInsightsPage() {
	const [result, setResult] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function fetchInsights() {
		setLoading(true);
		setResult(null);

		try {
			// Placeholder backend call
			const response = await api.get("/ai/insights");
			setResult(response.insights || "AI marketplace insights placeholder");
		} catch (err: any) {
			setResult("Error fetching marketplace insights");
		}

		setLoading(false);
	}

	return (
		<main className="min-h-screen bg-black text-white p-10">
			<h1 className="text-4xl font-bold mb-8">AI Marketplace Insights</h1>

			<button
				onClick={fetchInsights}
				className="p-3 bg-white text-black font-bold rounded"
				disabled={loading}
			>
				{loading ? "Analyzing..." : "Generate Insights"}
			</button>

			{result && (
				<div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-900">
					<h2 className="text-2xl font-semibold mb-2">Insights</h2>
					<p className="text-gray-300 whitespace-pre-line">{result}</p>
				</div>
			)}
		</main>
	);
}
