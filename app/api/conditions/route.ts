import { NextResponse } from "next/server";

export async function GET() {
  const conditions = {
    heatIndex: Math.floor(Math.random() * 100),
    volatility: (Math.random() * 3).toFixed(2),
    liquidity: 385000 + Math.floor(Math.random() * 20000),
    demandPressure: Math.floor(Math.random() * 100),
    timestamp: Date.now(),
  };

  return NextResponse.json(conditions);
}
