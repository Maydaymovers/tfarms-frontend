import { NextResponse } from "next/server";

export async function GET() {
  const treasury = {
    float: 385000,
    pendingPayouts: 122000,
    completedPayouts: 263000,
    avgPayoutTimeHours: 7.4,
  };

  return NextResponse.json(treasury);
}
