import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { command } = await req.json();

  let result = "Unknown command";

  switch (command) {
    case "boost_vendors":
      result = "Vendor visibility boosted for 60 seconds";
      break;

    case "slow_buyers":
      result = "Buyer activity temporarily throttled";
      break;

    case "simulate_gmv_spike":
      result = "GMV spike simulation triggered";
      break;

    case "ack_alerts":
      result = "All active alerts acknowledged";
      break;

    case "reset_conditions":
      result = "Marketplace conditions reset";
      break;
  }

  return NextResponse.json({
    timestamp: Date.now(),
    command,
    result,
  });
}
