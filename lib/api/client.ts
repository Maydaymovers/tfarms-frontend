const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api/proxy";
const USE_PROXY = API_BASE === "/api/proxy";

async function request(path: string, method: string = "GET", body?: any) {
  const res = await fetch(USE_PROXY ? API_BASE : `${API_BASE}${path}`, {
    method: USE_PROXY ? "POST" : method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: USE_PROXY
      ? JSON.stringify({ path, method, body })
      : body
        ? JSON.stringify(body)
        : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
}

export const api = {
  get: (path: string) => request(path, "GET"),
  post: (path: string, body: any) => request(path, "POST", body),
  put: (path: string, body: any) => request(path, "PUT", body),
  delete: (path: string) => request(path, "DELETE"),
};
