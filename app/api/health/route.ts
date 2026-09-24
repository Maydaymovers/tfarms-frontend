import { NextResponse } from "next/server";

export async function GET() {
  const health = {
    overallScore: Math.floor(Math.random() * 100),
    riskLevel: ["Low", "Moderate", "High"][Math.floor(Math.random() * 3)],
    gmvTrend: ["Stable", "Rising", "Volatile"][Math.floor(Math.random() * 3)],
    liquidityState: ["Healthy", "Watch", "Critical"][Math.floor(Math.random() * 3)],
    vendorStability: Math.floor(Math.random() * 100),
    buyerConfidence: Math.floor(Math.random() * 100),
    volatilityPressure: Number((Math.random() * 100).toFixed(1)),
    anomalyPresence: Math.random() > 0.5,
    forecastConfidence: Math.floor(Math.random() * 100),
    timestamp: Date.now(),
  };

  return NextResponse.json(health);
}
