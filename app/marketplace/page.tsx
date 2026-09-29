"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  formatProductPrice,
  marketplaceProducts,
} from "@/lib/marketplace/products";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(marketplaceProducts.map((item) => item.category))];
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return marketplaceProducts.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch =
        !query ||
        [product.name, product.description, product.farm, product.location]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-lime-300">From our farms to you</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">The marketplace</h1>
        <p className="mt-4 text-base leading-7 text-stone-300">
          Shop fresh harvests and small-batch goods directly from independent growers.
        </p>
      </div>

      <section aria-label="Find products" className="mt-9 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
          <div>
            <label htmlFor="product-search" className="mb-2 block text-sm font-medium text-stone-200">Search products and farms</label>
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try tomatoes or a farm name"
              className="w-full rounded-xl border border-white/10 bg-[#0c130e] px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-lime-300"
            />
          </div>
          <div>
            <label htmlFor="product-category" className="mb-2 block text-sm font-medium text-stone-200">Category</label>
            <select
              id="product-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0c130e] px-4 py-3 text-sm text-white outline-none focus:border-lime-300"
            >
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </section>

      <div className="mb-5 mt-9 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">Fresh from the farms</h2>
        <p className="text-sm text-stone-400" aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
          <p className="text-lg font-medium text-white">No products found</p>
          <p className="mt-2 text-sm text-stone-400">Try a different search or category.</p>
          <button
            type="button"
            onClick={() => { setSearch(""); setCategory("All"); }}
            className="mt-5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-lime-200 hover:border-lime-200/50"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-lime-200/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
            >
              <div aria-hidden="true" className={`grid aspect-[1.55/1] place-items-center bg-gradient-to-br ${product.color} text-7xl transition group-hover:scale-[1.02]`}>
                {product.emoji}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-lime-300">{product.category}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{product.name}</h3>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-white">{formatProductPrice(product.price)}<span className="font-normal text-stone-400">/{product.unit}</span></p>
                </div>
                <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-stone-400">{product.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs">
                  <span className="truncate text-stone-300">{product.farm} · {product.location}</span>
                  <span className="shrink-0 text-lime-200">{product.availability}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
