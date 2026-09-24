import { NextResponse } from "next/server";
import type { ShockScenario } from "@/lib/sse/types";

export const dynamic = "force-dynamic";

const SCENARIOS: ShockScenario[] = [
  {
    id: "liquidity_crunch",
    name: "Liquidity Crunch",
    severityBand: "High",
    shockVector: "Rapid depletion of marketplace liquidity reserves",
    metrics: {
      gmvImpact: 72,
      liquidityStrain: 94,
      vendorChurnRisk: 41,
      railFragility: 63,
      anomalyAmplification: 52,
      confidenceShock: 58,
    },
    recoveryCurve: [18, 22, 27, 33, 40, 48, 55, 62, 68, 73, 77, 80],
    headline:
      "Marketplace liquidity tightens sharply, triggering strain across payout rails.",
    description:
      "A sudden contraction in available liquidity forces delays, tighter payout windows, and elevated strain across all financial rails.",
  },
  {
    id: "vendor_cascade",
    name: "Vendor Cascade",
    severityBand: "Critical",
    shockVector: "Multi-vendor outage propagation through supply chains",
    metrics: {
      gmvImpact: 81,
      liquidityStrain: 37,
      vendorChurnRisk: 92,
      railFragility: 49,
      anomalyAmplification: 66,
      confidenceShock: 71,
    },
    recoveryCurve: [12, 15, 19, 24, 30, 37, 45, 52, 59, 65, 70, 74],
    headline:
      "Upstream vendor failures cascade through the marketplace, disrupting fulfillment stability.",
    description:
      "A chain reaction of vendor outages destabilizes supply availability, fulfillment reliability, and marketplace continuity.",
  },
  {
    id: "rail_outage",
    name: "Rail Outage",
    severityBand: "High",
    shockVector: "Primary payout rail degradation and fallback congestion",
    metrics: {
      gmvImpact: 54,
      liquidityStrain: 61,
      vendorChurnRisk: 33,
      railFragility: 95,
      anomalyAmplification: 47,
      confidenceShock: 44,
    },
    recoveryCurve: [20, 25, 31, 38, 45, 53, 60, 66, 71, 75, 78, 80],
    headline:
      "A major payout rail outage forces fallback routing and increases congestion.",
    description:
      "A primary payout rail becomes unavailable, forcing fallback routing and causing congestion across secondary rails.",
  },
  {
    id: "confidence_spiral",
    name: "Confidence Spiral",
    severityBand: "Critical",
    shockVector: "Buyer confidence collapse and demand contraction",
    metrics: {
      gmvImpact: 88,
      liquidityStrain: 42,
      vendorChurnRisk: 57,
      railFragility: 38,
      anomalyAmplification: 63,
      confidenceShock: 96,
    },
    recoveryCurve: [10, 13, 17, 22, 28, 35, 43, 50, 57, 63, 68, 72],
    headline:
      "Buyer confidence drops sharply, reducing demand and destabilizing marketplace sentiment.",
    description:
      "A sudden collapse in buyer sentiment reduces demand, increases volatility, and amplifies marketplace uncertainty.",
  },
  {
    id: "anomaly_swarm",
    name: "Anomaly Swarm",
    severityBand: "Moderate",
    shockVector:
      "Clustered anomaly events across marketplace intelligence signals",
    metrics: {
      gmvImpact: 39,
      liquidityStrain: 28,
      vendorChurnRisk: 22,
      railFragility: 31,
      anomalyAmplification: 91,
      confidenceShock: 36,
    },
    recoveryCurve: [30, 34, 38, 43, 48, 53, 58, 62, 66, 69, 72, 74],
    headline:
      "A swarm of anomalies emerges across intelligence signals, increasing operational noise.",
    description:
      "Multiple anomaly clusters appear simultaneously, increasing noise across intelligence systems and complicating stability analysis.",
  },
  {
    id: "gmv_volatility_shock",
    name: "GMV Volatility Shock",
    severityBand: "High",
    shockVector: "Sudden GMV instability driven by external market conditions",
    metrics: {
      gmvImpact: 93,
      liquidityStrain: 46,
      vendorChurnRisk: 51,
      railFragility: 44,
      anomalyAmplification: 57,
      confidenceShock: 62,
    },
    recoveryCurve: [14, 18, 23, 29, 36, 44, 51, 58, 64, 69, 73, 76],
    headline:
      "GMV swings sharply, destabilizing trend analysis and marketplace forecasting.",
    description:
      "External market conditions cause sudden GMV volatility, disrupting trend models and destabilizing predictive layers.",
  },
];

export async function GET(req: Request) {
  // TEMPORARY DEVELOPMENT-ONLY GATE.
  // This is not production authorization and must be replaced by a
  // trusted server-side admin identity/session check.
  const adminHeader = req.headers.get("x-admin");

  if (adminHeader === null) {
    return NextResponse.json(
      { error: "Admin header required" },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  if (adminHeader !== "true") {
    return NextResponse.json(
      { error: "Invalid admin header" },
      {
        status: 403,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const timestamp = Date.now();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        scenarios: SCENARIOS.map(({ id, name, severityBand, shockVector }) => ({
          id,
          name,
          severityBand,
          shockVector,
        })),
        timestamp,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const scenario = SCENARIOS.find((item) => item.id === id);

  if (!scenario) {
    return NextResponse.json(
      { error: "Shock scenario not found", id, timestamp },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return NextResponse.json(
    { scenario, timestamp },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
