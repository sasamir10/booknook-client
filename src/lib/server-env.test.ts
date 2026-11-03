import assert from "node:assert/strict";
import test from "node:test";
import { loadServerEnvironment } from "./server-env";

const productionEnvironment: NodeJS.ProcessEnv = {
  NODE_ENV: "production",
  MONGODB_URI: "mongodb+srv://user:password@cluster.example.test/booknook",
  DB_NAME: "booknook",
  BETTER_AUTH_SECRET: "a-production-secret-with-more-than-32-characters",
  BETTER_AUTH_URL: "https://books.example.test",
  NEXT_PUBLIC_API_BASE_URL: "https://api.example.test",
  GOOGLE_CLIENT_ID: "google-client-id",
  GOOGLE_CLIENT_SECRET: "google-client-secret",
  IMGBB_API_KEY: "imgbb-api-key",
};

test("production environment accepts complete secure configuration", () => {
  const config = loadServerEnvironment(productionEnvironment);
  assert.equal(config.BETTER_AUTH_URL, "https://books.example.test");
  assert.equal(config.DB_NAME, "booknook");
});

test("production environment reports missing names without exposing supplied secrets", () => {
  const incomplete = { ...productionEnvironment, BETTER_AUTH_SECRET: undefined, GOOGLE_CLIENT_SECRET: undefined };
  assert.throws(() => loadServerEnvironment(incomplete), (error: unknown) => {
    assert.ok(error instanceof Error);
    assert.match(error.message, /BETTER_AUTH_SECRET/);
    assert.match(error.message, /GOOGLE_CLIENT_SECRET/);
    assert.doesNotMatch(error.message, /production-secret|google-client-secret/);
    return true;
  });
});

test("production rejects localhost and non-HTTPS origins", () => {
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, BETTER_AUTH_URL: "http://localhost:3000" }), /BETTER_AUTH_URL must be an HTTPS origin/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, NEXT_PUBLIC_API_BASE_URL: "http://api.example.test" }), /NEXT_PUBLIC_API_BASE_URL must be an HTTPS origin/);
});

test("production requires database, Google OAuth, and ImgBB settings", () => {
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, MONGODB_URI: undefined }), /MONGODB_URI is required/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, MONGODB_URI: "mongodb://" }), /MONGODB_URI must be a valid/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, DB_NAME: "" }), /DB_NAME is required/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, BETTER_AUTH_URL: undefined }), /BETTER_AUTH_URL is required/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, NEXT_PUBLIC_API_BASE_URL: undefined }), /NEXT_PUBLIC_API_BASE_URL is required/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, GOOGLE_CLIENT_ID: undefined }), /GOOGLE_CLIENT_ID is required/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, IMGBB_API_KEY: undefined }), /IMGBB_API_KEY is required/);
  assert.throws(() => loadServerEnvironment({ ...productionEnvironment, BETTER_AUTH_SECRET: "too-short" }), /BETTER_AUTH_SECRET must be at least 32 characters/);
});

test("development keeps local defaults and allows Google OAuth to be omitted", () => {
  const config = loadServerEnvironment({
    NODE_ENV: "development",
    MONGODB_URI: "mongodb://127.0.0.1:27017/booknook?replicaSet=rs0",
    DB_NAME: "booknook",
    BETTER_AUTH_SECRET: "local-development-secret",
  });
  assert.equal(config.BETTER_AUTH_URL, "http://localhost:3000");
  assert.equal(config.NEXT_PUBLIC_API_BASE_URL, "http://localhost:4000");
  assert.equal(config.GOOGLE_CLIENT_ID, undefined);
});

test("server environment requires an explicit runtime mode", () => {
  assert.throws(() => loadServerEnvironment({}), /NODE_ENV must be set/);
});
