import { NextResponse } from "next/server";

export async function GET() {
  const stress = {
    cyclePressure: Math.floor(Math.random() * 100),
    liquidityShock: Math.floor(Math.random() * 100),
    vendorOutageRate: Math.floor(Math.random() * 100),
    buyerConfidenceDip: Math.floor(Math.random() * 100),
    anomalyClusterLoad: Math.floor(Math.random() * 100),
    payoutRailCongestion: Math.floor(Math.random() * 100),
    stressBand: ["Low", "Moderate", "High", "Critical"][Math.floor(Math.random() * 4)],
    recoveryCurve: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
    headline: [
      "Market conditions remain manageable under current load.",
      "The system is absorbing elevated stress without severe disruption.",
      "Stress is intensifying across liquidity and payout rails.",
      "Critical stress thresholds are being approached across multiple channels.",
    ][Math.floor(Math.random() * 4)],
    timestamp: Date.now(),
  };

  return NextResponse.json(stress);
}
