import { NextResponse } from "next/server";

export async function GET() {
  const categories = [
    { name: "Vegetables", gmv: 950000 },
    { name: "Fruits", gmv: 720000 },
    { name: "Grains", gmv: 410000 },
    { name: "Livestock", gmv: 290000 },
    { name: "Dairy", gmv: 180000 },
  ];

  return NextResponse.json(categories);
}
