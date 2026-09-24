import { NextResponse } from "next/server";

export async function GET() {
  const pulse = {
    timestamp: Date.now(),
    recentOrders: Math.floor(Math.random() * 12),
    recentPayouts: Math.floor(Math.random() * 6),
    activeVendors: 800 + Math.floor(Math.random() * 5),
    activeBuyers: 3200 + Math.floor(Math.random() * 10),
  };

  return NextResponse.json(pulse);
}
