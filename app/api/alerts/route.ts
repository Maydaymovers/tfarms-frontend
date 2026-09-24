import { NextResponse } from "next/server";

export async function GET() {
  const alerts = [];

  // Randomized conditions for demo
  const heat = Math.floor(Math.random() * 100);
  const volatility = Math.random() * 3;
  const liquidity = 385000 + Math.floor(Math.random() * 20000);
  const demand = Math.floor(Math.random() * 100);

  if (heat > 75) alerts.push("High marketplace heat detected");
  if (volatility > 2.2) alerts.push("Volatility spike in GMV");
  if (liquidity < 390000) alerts.push("Liquidity drop detected");
  if (demand > 80) alerts.push("Demand pressure surge");

  return NextResponse.json({
    timestamp: Date.now(),
    alerts,
  });
}
