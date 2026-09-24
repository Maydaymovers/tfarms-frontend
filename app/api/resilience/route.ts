import { NextResponse } from "next/server";

export async function GET() {
  const resilience = {
    overallResilienceScore: Math.floor(Math.random() * 100),
    recoveryReadiness: Math.floor(Math.random() * 100),
    liquidityBuffer: Math.floor(Math.random() * 100),
    marketStressTolerance: Math.floor(Math.random() * 100),
    vendorRecoveryIndex: Math.floor(Math.random() * 100),
    buyerConfidenceRetention: Math.floor(Math.random() * 100),
    anomalyAbsorption: Math.floor(Math.random() * 100),
    resilienceBand: ["Robust", "Stable", "Fragile", "At Risk"][Math.floor(Math.random() * 4)],
    summary: [
      "Resilience metrics are refreshed for the current marketplace cycle.",
      "Recovery capacity is being monitored across vendors, buyers, liquidity, and anomalies.",
    ],
    timestamp: Date.now(),
  };

  return NextResponse.json(resilience);
}
