import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { authDb, mongoClient } from "./db";

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  appName: "BookNook",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "development-only-set-a-real-better-auth-secret",
  database: mongodbAdapter(authDb, { client: mongoClient }),
  emailAndPassword: { enabled: true },
  ...(googleId && googleSecret ? { socialProviders: { google: { clientId: googleId, clientSecret: googleSecret } } } : {}),
  plugins: [jwt({
    jwt: {
      getSubject: (session) => session.user.id,
      definePayload: ({ user }) => ({ id: user.id, name: user.name, email: user.email }),
      expirationTime: "15m",
    },
  })],
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
  advanced: { useSecureCookies: process.env.NODE_ENV === "production" },
});
