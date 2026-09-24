import { NextResponse } from "next/server";

export async function GET() {
  const events: string[] = [];

  // Simulated automation triggers
  const demandPressure = Math.floor(Math.random() * 100);
  const volatility = Math.random() * 3;
  const liquidity = 385000 + Math.floor(Math.random() * 20000);

  if (demandPressure > 70) {
    events.push("Auto-Boost Vendors triggered (high demand pressure)");
  }

  if (volatility > 2.0) {
    events.push("Auto-Throttle Buyers triggered (volatility spike)");
  }

  if (liquidity < 390000) {
    events.push("Auto-Reset Conditions triggered (liquidity drop)");
  }

  if (events.length === 0) {
    events.push("No automations triggered this cycle");
  }

  return NextResponse.json({
    timestamp: Date.now(),
    events,
  });
}
