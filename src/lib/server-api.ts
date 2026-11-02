import "server-only";
import type { ApiResponse } from "./types";

const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, "");

export async function serverApiRequest<T>(path: string): Promise<ApiResponse<T>> {
  const response = await fetch(`${apiBase}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error("The book service is temporarily unavailable.");
  return response.json() as Promise<ApiResponse<T>>;
}

export async function serverPrivateApiRequest<T>(path: string): Promise<ApiResponse<T>> {
  const { auth } = await import("./auth");
  const { headers } = await import("next/headers");
  const result = await auth.api.getToken({ headers: await headers() });
  const response = await fetch(`${apiBase}${path}`, {
    headers: { authorization: `Bearer ${result.token}` },
    cache: "no-store",
  });
  const payload = await response.json() as ApiResponse<T>;
  if (!response.ok || !payload.success) throw new Error(payload.message ?? "The book service is temporarily unavailable.");
  return payload;
}
