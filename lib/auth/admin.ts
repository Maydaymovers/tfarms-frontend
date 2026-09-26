import { NextResponse } from "next/server";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

// Reuse the backend's existing admin-only stats endpoint as the trusted
// server-side authorization check for local analytics routes.
const ADMIN_AUTH_PATH = "/admin/stats";

function getBackendUrl() {
  const candidates = [
    process.env.TFARMS_BACKEND_URL,
    process.env.NEXT_PUBLIC_API_URL,
  ];

  for (const candidate of candidates) {
    if (
      candidate &&
      candidate !== "/api/proxy" &&
      (candidate.startsWith("http://") || candidate.startsWith("https://"))
    ) {
      return `${candidate.replace(/\/+$/, "")}${ADMIN_AUTH_PATH}`;
    }
  }

  return null;
}

export async function requireAdminAuthorization(req: Request) {
  const backendUrl = getBackendUrl();

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Admin authorization backend not configured" },
      {
        status: 500,
        headers: NO_STORE_HEADERS,
      }
    );
  }

  const headers = new Headers({
    Accept: "application/json",
  });
  const cookie = req.headers.get("cookie");
  const authorization = req.headers.get("authorization");

  if (cookie) {
    headers.set("cookie", cookie);
  }

  if (authorization) {
    headers.set("authorization", authorization);
  }

  let response: Response;

  try {
    response = await fetch(backendUrl, {
      method: "GET",
      headers,
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return NextResponse.json(
      { error: "Admin authorization check failed" },
      {
        status: 502,
        headers: NO_STORE_HEADERS,
      }
    );
  }

  if (response.ok) {
    return null;
  }

  if (response.status === 401 || response.status === 403) {
    return NextResponse.json(
      { error: response.status === 401 ? "Unauthorized" : "Forbidden" },
      {
        status: response.status,
        headers: NO_STORE_HEADERS,
      }
    );
  }

  return NextResponse.json(
    { error: "Admin authorization check failed" },
    {
      status: 502,
      headers: NO_STORE_HEADERS,
    }
  );
}
