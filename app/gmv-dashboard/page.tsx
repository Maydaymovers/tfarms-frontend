"use client";

import { useState } from "react";
import type { ForecastPoint } from "@/lib/revenue/types";

const ranges = ["7 days", "30 days", "90 days"] as const;
type Range = (typeof ranges)[number];

const trendData: Record<Range, ForecastPoint[]> = {
  "7 days": [
    { label: "Mon", gmv: 18100 },
    { label: "Tue", gmv: 22400 },
    { label: "Wed", gmv: 20100 },
    { label: "Thu", gmv: 25800 },
    { label: "Fri", gmv: 28600 },
    { label: "Sat", gmv: 24400 },
    { label: "Sun", gmv: 30100 },
  ],
  "30 days": [
    { label: "Sep 1", gmv: 68100 },
    { label: "Sep 6", gmv: 74900 },
    { label: "Sep 11", gmv: 71300 },
    { label: "Sep 16", gmv: 84200 },
    { label: "Sep 21", gmv: 92300 },
    { label: "Sep 26", gmv: 105400 },
  ],
  "90 days": [
    { label: "Jul", gmv: 215000 },
    { label: "Mid Jul", gmv: 242000 },
    { label: "Aug", gmv: 238000 },
    { label: "Mid Aug", gmv: 286000 },
    { label: "Sep", gmv: 304000 },
    { label: "Now", gmv: 356000 },
  ],
};

const metrics = [
  { label: "Gross merchandise value", value: "$124,560", change: "+6.8%", note: "vs. previous day" },
  { label: "Orders fulfilled", value: "842", change: "+4.2%", note: "vs. previous period" },
  { label: "Active farm partners", value: "128", change: "+12", note: "this month" },
  { label: "Average order value", value: "$148", change: "+2.1%", note: "vs. previous period" },
];

const categories = [
  { name: "Fresh produce", amount: "$56,052", percent: 45 },
  { name: "Pantry & preserves", amount: "$31,140", percent: 25 },
  { name: "Dairy & eggs", amount: "$22,421", percent: 18 },
  { name: "Bakery & grains", amount: "$14,947", percent: 12 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function GmvDashboardPage() {
  const [range, setRange] = useState<Range>("7 days");
  const points = trendData[range];
  const values = points.map((point) => point.gmv);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const spread = maximum - minimum || 1;
  const coordinates = points.map((point, index) => ({
    ...point,
    x: 8 + (index / Math.max(points.length - 1, 1)) * 84,
    y: 86 - ((point.gmv - minimum) / spread) * 64,
  }));
  const polyline = coordinates.map(({ x, y }) => `${x},${y}`).join(" ");
  const areaPath = `M ${coordinates[0].x},90 ${coordinates.map(({ x, y }) => `L ${x},${y}`).join(" ")} L ${coordinates[coordinates.length - 1].x},90 Z`;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-lime-300">Marketplace performance</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">GMV dashboard</h1>
          <p className="mt-3 text-sm text-stone-400">A clear view of marketplace activity and growth.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-stone-300">
          <span aria-hidden="true" className="size-2 rounded-full bg-lime-300" />
          Sample dashboard data
        </span>
      </div>

      <section aria-label="Key marketplace metrics" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-sm text-stone-400">{metric.label}</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{metric.value}</p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <span className="font-medium text-lime-300">{metric.change}</span>
              <span className="text-stone-500">{metric.note}</span>
            </p>
          </article>
        ))}
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
        <section aria-labelledby="gmv-trend-heading" className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 id="gmv-trend-heading" className="text-lg font-semibold text-white">GMV trend</h2>
              <p className="mt-1 text-sm text-stone-400">Gross merchandise value over time</p>
            </div>
            <div role="group" aria-label="Trend date range" className="inline-flex rounded-full border border-white/10 bg-[#0c130e] p-1">
              {ranges.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={range === item}
                  onClick={() => setRange(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${range === item ? "bg-lime-300 text-emerald-950" : "text-stone-400 hover:text-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-semibold text-white">{formatCurrency(points[points.length - 1].gmv)}</p>
              <p className="text-sm text-lime-300">↑ 6.8%</p>
            </div>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="mt-5 h-56 w-full overflow-visible"
              role="img"
              aria-label={`${range} GMV trend: ${points.map((point) => `${point.label} ${formatCurrency(point.gmv)}`).join(", ")}`}
            >
              {[22, 43, 64, 90].map((y) => (
                <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="1 2" vectorEffect="non-scaling-stroke" />
              ))}
              <path d={areaPath} fill="url(#gmv-area)" />
              <defs>
                <linearGradient id="gmv-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#bef264" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline points={polyline} fill="none" stroke="#bef264" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {coordinates.map((point) => <circle key={point.label} cx={point.x} cy={point.y} r="1.2" fill="#bef264" stroke="#101810" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />)}
            </svg>
            <div className="mt-2 flex justify-between gap-2 text-xs text-stone-500" aria-hidden="true">
              {points.map((point) => <span key={point.label}>{point.label}</span>)}
            </div>
          </div>
        </section>

        <section aria-labelledby="category-heading" className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <h2 id="category-heading" className="text-lg font-semibold text-white">GMV by category</h2>
          <p className="mt-1 text-sm text-stone-400">Share of daily marketplace sales</p>
          <ul className="mt-7 space-y-6">
            {categories.map((item) => (
              <li key={item.name}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="text-stone-200">{item.name}</span>
                  <span className="font-medium text-white">{item.amount}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label={`${item.name} share of GMV`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.percent}>
                  <div className="h-full rounded-full bg-lime-300" style={{ width: `${item.percent}%` }} />
                </div>
                <p className="mt-1 text-right text-xs text-stone-500">{item.percent}%</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="top-farms-heading" className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 px-5 py-5 sm:px-7">
          <div>
            <h2 id="top-farms-heading" className="text-lg font-semibold text-white">Leading farm partners</h2>
            <p className="mt-1 text-sm text-stone-400">Top contributors to marketplace GMV this month</p>
          </div>
          <span className="text-xs text-stone-500">Illustrative sample</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium sm:px-7">Farm</th>
                <th scope="col" className="px-5 py-3 font-medium">Category</th>
                <th scope="col" className="px-5 py-3 text-right font-medium sm:px-7">GMV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-stone-300">
              {[
                ["Cedar Ridge Farm", "Fresh produce", "$28,640"],
                ["Everfield Organics", "Greens & herbs", "$24,110"],
                ["Delta Growers Co.", "Seasonal fruit", "$19,870"],
                ["Northline Farms", "Dairy & eggs", "$16,540"],
              ].map(([farm, category, gmv], index) => (
                <tr key={farm}>
                  <td className="px-5 py-4 sm:px-7"><span className="mr-3 text-xs text-stone-500">{String(index + 1).padStart(2, "0")}</span><span className="font-medium text-white">{farm}</span></td>
                  <td className="px-5 py-4">{category}</td>
                  <td className="px-5 py-4 text-right font-medium text-white sm:px-7">{gmv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="mt-5 text-xs leading-5 text-stone-500">Dashboard figures are typed sample data for this frontend preview and are not connected to a live reporting service.</p>
    </main>
  );
}
