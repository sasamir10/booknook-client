import { authClient } from "./auth-client";
import type { ApiResponse } from "./types";

const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, "");

export async function apiRequest<T>(path: string, init: RequestInit = {}, authenticated = true): Promise<ApiResponse<T>> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  if (authenticated) {
    const tokenResult = await authClient.token();
    if (tokenResult.error || !tokenResult.data?.token) throw new Error("Your session could not be verified. Please sign in again.");
    headers.set("authorization", `Bearer ${tokenResult.data.token}`);
  }

  const response = await fetch(`${apiBase}${path}`, { ...init, headers, cache: "no-store" });
  const payload = await response.json().catch(() => ({ success: false, message: "The server returned an unreadable response." })) as ApiResponse<T>;
  if (!response.ok || !payload.success) throw new Error(payload.message ?? "The request could not be completed.");
  return payload;
}

