import { NextResponse } from "next/server";

export async function GET() {
  const sampleActions = [
    "Viewed Product",
    "Added to Cart",
    "Started Checkout",
    "Completed Purchase",
    "Favorited Vendor",
    "Searched for Crop",
  ];

  const activity = {
    id: Math.floor(Math.random() * 1000000),
    buyerId: Math.floor(Math.random() * 50000),
    action: sampleActions[Math.floor(Math.random() * sampleActions.length)],
    timestamp: Date.now(),
  };

  return NextResponse.json(activity);
}
