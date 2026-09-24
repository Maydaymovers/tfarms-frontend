import { NextResponse } from "next/server";

export async function GET() {
  const stability = {
    overallStabilityScore: Math.floor(Math.random() * 100),
    resilienceBand: ["Robust", "Stable", "Fragile", "At Risk"][Math.floor(Math.random() * 4)],
    gmvStability: Math.floor(Math.random() * 100),
    vendorReliability: Math.floor(Math.random() * 100),
    buyerConsistency: Math.floor(Math.random() * 100),
    liquidityResilience: Math.floor(Math.random() * 100),
    volatilityTolerance: Number((Math.random() * 100).toFixed(1)),
    anomalyPersistence: Math.floor(Math.random() * 100),
    forecastConfidence: Math.floor(Math.random() * 100),
    timestamp: Date.now(),
  };

  return NextResponse.json(stability);
}
