export type ServerEnvironment = {
  MONGODB_URI: string;
  DB_NAME: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  IMGBB_API_KEY?: string;
  NEXT_PUBLIC_API_BASE_URL: string;
};

const developmentAuthUrl = "http://localhost:3000";
const developmentApiUrl = "http://localhost:4000";

function isMongoUri(value: string): boolean {
  try {
    const uri = new URL(value);
    return (uri.protocol === "mongodb:" || uri.protocol === "mongodb+srv:") && Boolean(uri.hostname);
  } catch {
    return false;
  }
}

function isOrigin(value: string, production: boolean): boolean {
  try {
    const url = new URL(value);
    return url.origin === value && (!production || url.protocol === "https:");
  } catch {
    return false;
  }
}

export function loadServerEnvironment(source: Record<string, string | undefined>): ServerEnvironment {
  const mode = source.NODE_ENV;
  if (mode !== "development" && mode !== "production" && mode !== "test") {
    throw new Error("Invalid client server environment: NODE_ENV must be set to development, test, or production.");
  }
  const production = mode === "production";
  const problems: string[] = [];
  const mongoUri = source.MONGODB_URI?.trim();
  const databaseName = source.DB_NAME?.trim();
  const authSecret = source.BETTER_AUTH_SECRET;
  const authUrl = source.BETTER_AUTH_URL?.trim() || (production ? undefined : developmentAuthUrl);
  const apiUrl = source.NEXT_PUBLIC_API_BASE_URL?.trim() || (production ? undefined : developmentApiUrl);
  const googleClientId = source.GOOGLE_CLIENT_ID?.trim() || undefined;
  const googleClientSecret = source.GOOGLE_CLIENT_SECRET?.trim() || undefined;
  const imgbbApiKey = source.IMGBB_API_KEY?.trim() || undefined;

  if (!mongoUri) problems.push("MONGODB_URI is required.");
  else if (!isMongoUri(mongoUri)) problems.push("MONGODB_URI must be a valid mongodb:// or mongodb+srv:// URI.");

  if (!databaseName) problems.push("DB_NAME is required.");
  else if (!/^[A-Za-z0-9_-]{1,63}$/.test(databaseName)) problems.push("DB_NAME must contain 1–63 letters, numbers, underscores, or hyphens.");

  if (!authSecret?.trim()) problems.push("BETTER_AUTH_SECRET is required.");
  else if (production && authSecret.trim().length < 32) problems.push("BETTER_AUTH_SECRET must be at least 32 characters in production.");

  if (!authUrl) problems.push("BETTER_AUTH_URL is required in production.");
  else if (!isOrigin(authUrl, production)) problems.push(production ? "BETTER_AUTH_URL must be an HTTPS origin in production." : "BETTER_AUTH_URL must be an origin URL.");

  if (!apiUrl) problems.push("NEXT_PUBLIC_API_BASE_URL is required in production.");
  else if (!isOrigin(apiUrl, production)) problems.push(production ? "NEXT_PUBLIC_API_BASE_URL must be an HTTPS origin in production." : "NEXT_PUBLIC_API_BASE_URL must be an origin URL.");

  if (production && !googleClientId) problems.push("GOOGLE_CLIENT_ID is required in production.");
  if (production && !googleClientSecret) problems.push("GOOGLE_CLIENT_SECRET is required in production.");
  if (production && !imgbbApiKey) problems.push("IMGBB_API_KEY is required in production.");

  if (!production && Boolean(googleClientId) !== Boolean(googleClientSecret)) {
    problems.push("Set both GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google OAuth.");
  }

  if (problems.length) throw new Error(`Invalid client server environment: ${problems.join(" ")}`);

  return {
    MONGODB_URI: mongoUri!,
    DB_NAME: databaseName!,
    BETTER_AUTH_SECRET: authSecret!.trim(),
    BETTER_AUTH_URL: authUrl!,
    NEXT_PUBLIC_API_BASE_URL: apiUrl!,
    ...(googleClientId && googleClientSecret ? { GOOGLE_CLIENT_ID: googleClientId, GOOGLE_CLIENT_SECRET: googleClientSecret } : {}),
    ...(imgbbApiKey ? { IMGBB_API_KEY: imgbbApiKey } : {}),
  };
}

