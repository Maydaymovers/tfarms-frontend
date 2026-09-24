import { NextResponse } from "next/server";

export async function GET() {
  // Replace this with real DB or external API later
  const data = {
    gmvMonthly: 2500000,
    gmvDaily: Math.round(2500000 / 30),
    vendors: 800,
    buyers: 3200,
    aov: 312,
    weekly: [
      { day: "Mon", value: 82000 },
      { day: "Tue", value: 83000 },
      { day: "Wed", value: 84000 },
      { day: "Thu", value: 85000 },
      { day: "Fri", value: 86000 },
      { day: "Sat", value: 87000 },
      { day: "Sun", value: 88000 },
    ],
  };

  return NextResponse.json(data);
}
