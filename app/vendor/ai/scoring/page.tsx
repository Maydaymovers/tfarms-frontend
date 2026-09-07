"use client";

import { useState } from "react";
import { api } from "@/lib/api/client";

export default function AiListingScoringPage() {
	const [form, setForm] = useState({
		title: "",
		description: "",
		price: "",
	});

	const [result, setResult] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	function updateField(key: string, value: string) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setResult(null);

		try {
			// Placeholder backend call
			const response = await api.post("/ai/scoring", form);
			setResult(response.score || "AI listing score placeholder");
		} catch (err: any) {
			setResult("Error generating listing score");
		}

		setLoading(false);
	}

	return (
		<main className="min-h-screen bg-black text-white p-10">
			<h1 className="text-4xl font-bold mb-8">AI Listing Scoring</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
				<input
					type="text"
					placeholder="Listing Title"
					value={form.title}
					onChange={(e) => updateField("title", e.target.value)}
					className="p-3 rounded bg-gray-800 text-white"
				/>

				<textarea
					placeholder="Listing Description"
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

				<button
					type="submit"
					className="p-3 bg-white text-black font-bold rounded"
					disabled={loading}
				>
					{loading ? "Scoring..." : "Score Listing"}
				</button>
			</form>

			{result && (
				<div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-900">
					<h2 className="text-2xl font-semibold mb-2">AI Score</h2>
					<p className="text-gray-300">{result}</p>
				</div>
			)}
		</main>
	);
}
