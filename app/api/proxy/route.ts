import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { path, method = "GET", body } = await req.json();

    const backendUrl = process.env.TFARMS_BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(`${backendUrl}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { error: "Proxy request failed", details: String(err) },
      { status: 500 }
    );
  }
}
