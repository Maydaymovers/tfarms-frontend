"use client";

import { useState } from "react";
import { api } from "@/lib/api/client";

export default function AiIntelligenceDashboardPage() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>(null);

	async function fetchIntelligence() {
		setLoading(true);
		setData(null);

		try {
			// Placeholder backend call
			const response = await api.get("/ai/intelligence");
			setData(response || { message: "AI intelligence placeholder" });
		} catch (err: any) {
			setData({ error: "Error fetching intelligence dashboard" });
		}

		setLoading(false);
	}

	return (
		<main className="min-h-screen bg-black text-white p-10">
			<h1 className="text-4xl font-bold mb-8">AI Intelligence Dashboard</h1>

			<button
				onClick={fetchIntelligence}
				className="p-3 bg-white text-black font-bold rounded"
				disabled={loading}
			>
				{loading ? "Analyzing..." : "Generate Full Intelligence Report"}
			</button>

			{data && (
				<div className="mt-10 space-y-6">
					{/* Pricing */}
					<section className="p-6 border border-gray-700 rounded-lg bg-gray-900">
						<h2 className="text-2xl font-semibold mb-2">AI Pricing Insights</h2>
						<p className="text-gray-300">
							{data.pricing || "Pricing insights placeholder"}
						</p>
					</section>

					{/* Listing Scoring */}
					<section className="p-6 border border-gray-700 rounded-lg bg-gray-900">
						<h2 className="text-2xl font-semibold mb-2">AI Listing Score</h2>
						<p className="text-gray-300">
							{data.scoring || "Listing score placeholder"}
						</p>
					</section>

					{/* Marketplace Insights */}
					<section className="p-6 border border-gray-700 rounded-lg bg-gray-900">
						<h2 className="text-2xl font-semibold mb-2">Marketplace Insights</h2>
						<p className="text-gray-300 whitespace-pre-line">
							{data.insights || "Marketplace insights placeholder"}
						</p>
					</section>

					{/* Vendor Performance */}
					<section className="p-6 border border-gray-700 rounded-lg bg-gray-900">
						<h2 className="text-2xl font-semibold mb-2">Vendor Performance</h2>
						<p className="text-gray-300">
							{data.performance || "Vendor performance placeholder"}
						</p>
					</section>

					{/* Opportunities */}
					<section className="p-6 border border-gray-700 rounded-lg bg-gray-900">
						<h2 className="text-2xl font-semibold mb-2">Recommended Opportunities</h2>
						<p className="text-gray-300">
							{data.opportunities || "Opportunities placeholder"}
						</p>
					</section>
				</div>
			)}
		</main>
	);
}
