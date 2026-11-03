import "server-only";
import { loadServerEnvironment } from "./server-env";

export const serverEnvironment = loadServerEnvironment(process.env);
