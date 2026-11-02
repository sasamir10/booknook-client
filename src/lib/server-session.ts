import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export function assertAuthEnvironment() {
  if (!process.env.MONGODB_URI || !process.env.BETTER_AUTH_SECRET || !process.env.BETTER_AUTH_URL) {
    throw new Error("Set MONGODB_URI, BETTER_AUTH_SECRET, and BETTER_AUTH_URL before using authentication.");
  }
}

export async function getSession() {
  assertAuthEnvironment();
  return auth.api.getSession({ headers: await headers() });
}

export async function requireSession(destination: string) {
  const session = await getSession();
  if (!session) redirect(`/login?callbackUrl=${encodeURIComponent(destination)}`);
  return session;
}
