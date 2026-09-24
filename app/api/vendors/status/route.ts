import { NextResponse } from "next/server";

export async function GET() {
  const events = [
    "Stock Depleted",
    "Inventory Replenished",
    "New Listing Added",
    "Price Adjusted",
    "Feed Synced",
    "Visibility Boost",
  ];

  const vendorStatus = {
    id: Math.floor(Math.random() * 1000000),
    vendorId: Math.floor(Math.random() * 800),
    event: events[Math.floor(Math.random() * events.length)],
    timestamp: Date.now(),
  };

  return NextResponse.json(vendorStatus);
}
