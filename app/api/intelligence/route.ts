import { NextResponse } from "next/server";

export async function GET() {
  const intelligence = {
    riskScore: Math.floor(Math.random() * 100),
    demandForecast: Math.floor(Math.random() * 5000),
    gmvProjection: Math.floor(Math.random() * 200000),
    anomalyProbability: Number((Math.random()).toFixed(2)),
    vendorHealth: Math.floor(Math.random() * 100),
    buyerMomentum: Math.floor(Math.random() * 100),
    timestamp: Date.now(),
  };

  return NextResponse.json(intelligence);
}
