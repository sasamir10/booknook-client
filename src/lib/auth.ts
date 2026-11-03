import "server-only";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { authDb, mongoClient } from "./db";
import { serverEnvironment } from "./server-config";

const googleId = serverEnvironment.GOOGLE_CLIENT_ID;
const googleSecret = serverEnvironment.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  appName: "BookNook",
  baseURL: serverEnvironment.BETTER_AUTH_URL,
  secret: serverEnvironment.BETTER_AUTH_SECRET,
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
  trustedOrigins: [serverEnvironment.BETTER_AUTH_URL],
  advanced: { useSecureCookies: process.env.NODE_ENV === "production" },
});
