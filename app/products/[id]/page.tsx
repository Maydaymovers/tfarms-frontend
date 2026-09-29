import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatProductPrice,
  marketplaceProducts,
} from "@/lib/marketplace/products";

export function generateStaticParams() {
  return marketplaceProducts.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = marketplaceProducts.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm text-stone-400 transition hover:text-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300">
        <span aria-hidden="true">←</span> Back to marketplace
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div aria-hidden="true" className={`grid min-h-72 place-items-center rounded-3xl border border-white/10 bg-gradient-to-br ${product.color} text-9xl sm:min-h-[28rem]`}>
          {product.emoji}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-lime-300">{product.category} · {product.availability}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-300">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold text-white">{formatProductPrice(product.price)}<span className="text-base font-normal text-stone-400"> / {product.unit}</span></p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Grown by</p>
            <p className="mt-2 text-lg font-medium text-white">{product.farm}</p>
            <p className="mt-1 text-sm text-stone-400">{product.location}</p>
          </div>
          <p className="mt-6 text-sm leading-6 text-stone-400">Product details in this marketplace preview use sample data. Ordering will be available when the marketplace backend is connected.</p>
          <Link href="/marketplace" className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300">
            Continue browsing
          </Link>
        </div>
      </div>
    </main>
  );
}
