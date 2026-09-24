import { NextResponse } from "next/server";

export async function GET() {
  // Randomized anomaly flags for now
  const gmvIrregularity = Math.random() > 0.85;
  const vendorOutageRisk = Math.random() > 0.9;
  const buyerSurgeRisk = Math.random() > 0.8;
  const liquidityDip = Math.random() > 0.88;
  const volatilitySpike = Math.random() > 0.87;
  const intelligenceMismatch = Math.random() > 0.9;

  const summary: string[] = [];

  if (gmvIrregularity) summary.push("GMV irregularity detected");
  if (vendorOutageRisk) summary.push("Vendor outage risk detected");
  if (buyerSurgeRisk) summary.push("Buyer surge risk detected");
  if (liquidityDip) summary.push("Liquidity dip detected");
  if (volatilitySpike) summary.push("Volatility spike detected");
  if (intelligenceMismatch) summary.push("Intelligence mismatch detected");

  if (summary.length === 0) {
    summary.push("No anomalies detected this cycle");
  }

  return NextResponse.json({
    gmvIrregularity,
    vendorOutageRisk,
    buyerSurgeRisk,
    liquidityDip,
    volatilitySpike,
    intelligenceMismatch,
    summary,
    timestamp: Date.now(),
  });
}
