"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  ForecastPoint,
  RevenueIntelligenceData,
  RevenueIntelligenceResponse,
} from "@/lib/revenue/types";

function toCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getForecastPolyline(points: ForecastPoint[]) {
  if (points.length === 0) {
    return "";
  }

  const width = 100;
  const height = 36;
  const values = points.map((item) => item.gmv);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return points
    .map((item, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - ((item.gmv - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function RevenueIntelligencePanel() {
  const [data, setData] = useState<RevenueIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const forecastLine = useMemo(
    () => getForecastPolyline(data?.forecastPoints ?? []),
    [data]
  );

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function loadRevenueIntelligence() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/revenue-intelligence", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load revenue intelligence");
        }

        const payload: RevenueIntelligenceResponse = await response.json();

        if (!cancelled) {
          setData(payload.data);
        }
      } catch (err) {
        if (!cancelled && !controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Failed to load revenue intelligence"
          );
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRevenueIntelligence();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return (
    <section className="mb-10 rounded-lg border border-amber-600/40 bg-gray-900 p-6 shadow-md shadow-amber-700/10">
      <h2 className="mb-4 text-2xl font-semibold text-amber-300">
        Revenue Intelligence
      </h2>

      {loading && <p className="text-gray-400">Loading revenue intelligence...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && data && (
        <div className="space-y-6">
          <div className="rounded-md border border-gray-700 bg-black/40 p-4">
            <p className="text-sm uppercase tracking-wide text-gray-400">Daily GMV</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {toCurrency(data.dailyGmv.value)}
            </p>
            <p className="mt-1 text-sm text-amber-200">
              {data.dailyGmv.date} • {data.dailyGmv.deltaPercent >= 0 ? "+" : ""}
              {data.dailyGmv.deltaPercent}% vs prior day
            </p>
          </div>

          <div className="rounded-md border border-gray-700 bg-black/40 p-4">
            <p className="mb-3 text-sm font-medium text-gray-300">Revenue forecast</p>
            <svg
              viewBox="0 0 100 36"
              className="h-36 w-full"
              role="img"
              aria-label={`Revenue forecast points: ${data.forecastPoints
                .map((point) => `${point.label} ${point.gmv}`)
                .join(", ")}`}
            >
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={forecastLine}
              />
            </svg>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-400 md:grid-cols-3">
              {data.forecastPoints.map((point) => (
                <p key={point.label}>
                  {point.label}: {toCurrency(point.gmv)}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-md border border-gray-700 bg-black/40 p-4">
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Abandoned carts
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-300">
                {data.abandonedCarts.carts}
              </p>
              <p className="text-sm text-gray-300">
                Lost revenue: {toCurrency(data.abandonedCarts.estimatedLostRevenue)}
              </p>
              <p className="text-sm text-gray-300">
                Recovery opportunity: {data.abandonedCarts.recoveryOpportunityPercent}%
              </p>
            </div>

            <div className="rounded-md border border-gray-700 bg-black/40 p-4">
              <p className="text-sm uppercase tracking-wide text-gray-400">
                Payout bottlenecks
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-300">
                {data.payoutBottlenecks.length}
              </p>
              <p className="text-sm text-gray-300">
                Delayed amount: {toCurrency(
                  data.payoutBottlenecks.reduce(
                    (sum, item) => sum + item.pendingAmount,
                    0
                  )
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-md border border-gray-700 bg-black/40 p-4">
              <h3 className="mb-2 text-sm font-medium text-amber-300">
                Vendor leaderboard
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {data.vendorLeaderboard.map((item) => (
                  <li key={item.vendorId}>
                    <p className="font-medium text-white">{item.vendorName}</p>
                    <p>
                      {toCurrency(item.revenue)} • {item.orders} orders
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-gray-700 bg-black/40 p-4">
              <h3 className="mb-2 text-sm font-medium text-amber-300">
                Listing leaderboard
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {data.listingLeaderboard.map((item) => (
                  <li key={item.listingId}>
                    <p className="font-medium text-white">{item.listingTitle}</p>
                    <p>
                      {toCurrency(item.revenue)} • {item.unitsSold} units
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-gray-700 bg-black/40 p-4">
              <h3 className="mb-2 text-sm font-medium text-amber-300">
                Category breakdown
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {data.categoryBreakdown.map((item) => (
                  <li key={item.category}>
                    <p className="font-medium text-white">{item.category}</p>
                    <p>
                      {toCurrency(item.gmv)} • {item.sharePercent}% share
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-md border border-gray-700 bg-black/40 p-4">
            <h3 className="mb-2 text-sm font-medium text-amber-300">
              Pricing inefficiencies
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {data.pricingInefficiencies.map((item) => (
                <li key={item.listingId}>
                  <p className="font-medium text-white">{item.listingTitle}</p>
                  <p>
                    Current {toCurrency(item.currentPrice)} → Suggested{" "}
                    {toCurrency(item.suggestedPrice)} • Revenue gap{" "}
                    {item.revenueGap >= 0 ? "+" : ""}
                    {toCurrency(item.revenueGap)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
