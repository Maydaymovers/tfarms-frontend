import { NextResponse } from "next/server";

export async function GET() {
  // Replace with real DB later
  const vendors = [
    { name: "Green Valley Farms", gmv: 420000 },
    { name: "Sunrise Organics", gmv: 310000 },
    { name: "Delta Crop Co.", gmv: 275000 },
    { name: "Magnolia Harvest", gmv: 190000 },
    { name: "Riverbend Produce", gmv: 160000 },
  ];

  return NextResponse.json(vendors);
}
