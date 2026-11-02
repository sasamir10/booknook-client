import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";
import { assertAuthEnvironment } from "@/lib/server-session";

const handlers = toNextJsHandler(auth);

export const runtime = "nodejs";

async function configured(handler: (request: Request) => Promise<Response>, request: Request) {
  try { assertAuthEnvironment(); } catch (error) {
    return Response.json({ message: error instanceof Error ? error.message : "Authentication is not configured." }, { status: 503 });
  }
  return handler(request);
}

export const GET = (request: Request) => configured(handlers.GET, request);
export const POST = (request: Request) => configured(handlers.POST, request);
