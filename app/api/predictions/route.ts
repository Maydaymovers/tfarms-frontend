import { NextResponse } from "next/server";

export async function GET() {
  const predictions = {
    gmvNextHour: Math.floor(Math.random() * 20000),
    gmvTomorrow: Math.floor(Math.random() * 300000),
    buyerMomentumForecast: Math.floor(Math.random() * 100),
    vendorLoadForecast: Math.floor(Math.random() * 100),
    volatilityOutlook: Number(Math.random().toFixed(2)),
    liquidityForecast: 380000 + Math.floor(Math.random() * 30000),
    anomalyAdjustedRisk: Math.floor(Math.random() * 100),
    timestamp: Date.now(),
  };

  return NextResponse.json(predictions);
}
