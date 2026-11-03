import { loadServerEnvironment } from "./lib/server-env";

export function register(): void {
  if (process.env.NEXT_RUNTIME === "nodejs") loadServerEnvironment(process.env);
}
