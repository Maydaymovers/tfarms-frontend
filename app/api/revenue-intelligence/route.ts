import { NextResponse } from "next/server";
import { requireAdminAuthorization } from "@/lib/auth/admin";
import type { RevenueIntelligenceData } from "@/lib/revenue/types";

export const dynamic = "force-dynamic";

const DATA: RevenueIntelligenceData = {
  dailyGmv: {
    date: "2026-09-24",
    value: 124560,
    deltaPercent: 6.8,
  },
  forecastPoints: [
    { label: "W1", gmv: 121000 },
    { label: "W2", gmv: 123500 },
    { label: "W3", gmv: 126200 },
    { label: "W4", gmv: 128900 },
    { label: "W5", gmv: 131100 },
    { label: "W6", gmv: 133400 },
  ],
  vendorLeaderboard: [
    { vendorId: "v-102", vendorName: "Prairie Harvest", revenue: 28640, orders: 214 },
    { vendorId: "v-044", vendorName: "Everfield Organics", revenue: 24110, orders: 189 },
    { vendorId: "v-087", vendorName: "Delta Growers Co", revenue: 19870, orders: 163 },
    { vendorId: "v-011", vendorName: "Northline Farms", revenue: 16540, orders: 141 },
  ],
  listingLeaderboard: [
    {
      listingId: "lst-403",
      listingTitle: "Grade A Almond Bulk Pack",
      vendorName: "Prairie Harvest",
      revenue: 11240,
      unitsSold: 248,
    },
    {
      listingId: "lst-221",
      listingTitle: "Cold-Pressed Olive Oil",
      vendorName: "Everfield Organics",
      revenue: 9840,
      unitsSold: 176,
    },
    {
      listingId: "lst-319",
      listingTitle: "Organic Oat Flour",
      vendorName: "Delta Growers Co",
      revenue: 9010,
      unitsSold: 211,
    },
  ],
  pricingInefficiencies: [
    {
      listingId: "lst-118",
      listingTitle: "Sunflower Seed Crates",
      currentPrice: 38,
      suggestedPrice: 42,
      revenueGap: 1290,
    },
    {
      listingId: "lst-287",
      listingTitle: "Raw Honey Sampler",
      currentPrice: 31,
      suggestedPrice: 28,
      revenueGap: -740,
    },
    {
      listingId: "lst-355",
      listingTitle: "Premium Grain Blend",
      currentPrice: 58,
      suggestedPrice: 61,
      revenueGap: 860,
    },
  ],
  abandonedCarts: {
    carts: 187,
    estimatedLostRevenue: 17420,
    recoveryOpportunityPercent: 38,
  },
  payoutBottlenecks: [
    {
      vendorId: "v-044",
      vendorName: "Everfield Organics",
      pendingAmount: 8420,
      avgDelayHours: 27,
    },
    {
      vendorId: "v-067",
      vendorName: "Canopy Co-op",
      pendingAmount: 6140,
      avgDelayHours: 22,
    },
    {
      vendorId: "v-102",
      vendorName: "Prairie Harvest",
      pendingAmount: 4920,
      avgDelayHours: 19,
    },
  ],
  categoryBreakdown: [
    { category: "Dry Goods", gmv: 46200, sharePercent: 37.1 },
    { category: "Oils & Condiments", gmv: 28640, sharePercent: 23.0 },
    { category: "Sweeteners", gmv: 21470, sharePercent: 17.2 },
    { category: "Baking Inputs", gmv: 18250, sharePercent: 14.7 },
    { category: "Specialty", gmv: 10000, sharePercent: 8.0 },
  ],
};

export async function GET(req: Request) {
  const authorizationError = await requireAdminAuthorization(req);

  if (authorizationError) {
    return authorizationError;
  }

  return NextResponse.json(
    {
      data: DATA,
      timestamp: Date.now(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
