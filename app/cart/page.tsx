"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import Link from "next/link";

export default function CartPage() {
	const [items, setItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			try {
				const data = await api.get("/cart");
				setItems(data.items || []);
			} catch {
				setItems([]);
			}
			setLoading(false);
		}
		load();
	}, []);

	async function removeItem(id: string) {
		try {
			await api.delete(`/cart/${id}`);
			setItems((prev) => prev.filter((i) => i.id !== id));
		} catch {
			alert("Error removing item");
		}
	}

	const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

	return (
		<main className="min-h-screen bg-black text-white p-10">
			<h1 className="text-4xl font-bold mb-8">Your Cart</h1>

			{loading && <p className="text-gray-400">Loading cart...</p>}

			{!loading && items.length === 0 && (
				<p className="text-gray-400">Your cart is empty.</p>
			)}

			<div className="space-y-6">
				{items.map((item) => (
					<div
						key={item.id}
						className="border border-gray-700 p-6 rounded-lg bg-gray-900"
					>
						<h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
						<p className="text-gray-400 mb-4">{item.description}</p>
						<p className="text-white font-bold mb-4">${item.price}</p>

						<button
							className="p-2 bg-red-500 text-white font-bold rounded"
							onClick={() => removeItem(item.id)}
						>
							Remove
						</button>
					</div>
				))}
			</div>

			{items.length > 0 && (
				<div className="mt-10">
					<p className="text-xl mb-4">Total: ${total.toFixed(2)}</p>

					<Link
						href="/checkout"
						className="p-3 bg-white text-black font-bold rounded inline-block"
					>
						Proceed to Checkout
					</Link>
				</div>
			)}
		</main>
	);
}
