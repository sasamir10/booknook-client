import assert from "node:assert/strict";
import test from "node:test";
import { loginSchema, passwordSchema, registerSchema } from "./validators";
import { safeCallbackUrl } from "./utils";

test("registration enforces the assignment password rules", () => {
  assert.equal(registerSchema.safeParse({ name: "Rae Reader", email: "rae@example.com", password: "Reader1" }).success, true);
  assert.equal(passwordSchema.safeParse("reader1").success, false);
  assert.equal(passwordSchema.safeParse("READER1").success, false);
  assert.equal(passwordSchema.safeParse("Read1").success, false);
});

test("login rejects invalid email and an empty password", () => {
  assert.equal(loginSchema.safeParse({ email: "not-an-email", password: "x" }).success, false);
  assert.equal(loginSchema.safeParse({ email: "rae@example.com", password: "secret" }).success, true);
});

test("callback destinations stay on the BookNook origin", () => {
  assert.equal(safeCallbackUrl("/books/abc?from=login"), "/books/abc?from=login");
  assert.equal(safeCallbackUrl("//outside.example"), "/");
  assert.equal(safeCallbackUrl("https://outside.example"), "/");
});
