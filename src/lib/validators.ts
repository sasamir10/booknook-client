import { z } from "zod";
import { categories } from "./types";

export const passwordSchema = z.string().min(6, "Use at least 6 characters.").regex(/[A-Z]/, "Add at least one uppercase letter.").regex(/[a-z]/, "Add at least one lowercase letter.");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.email("Enter a valid email address."),
  image: z.url("Enter a valid photo URL.").optional().or(z.literal("")),
  password: passwordSchema,
});

export const loginSchema = z.object({ email: z.email("Enter a valid email address."), password: z.string().min(1, "Enter your password.") });

export const bookSchema = z.object({
  title: z.string().trim().min(1, "Add the book title.").max(160),
  author: z.string().trim().min(1, "Add the author name.").max(120),
  category: z.enum(categories),
  description: z.string().trim().min(10, "Write at least 10 characters.").max(1200),
  totalCopies: z.number().int().min(1, "At least one copy is required.").max(10000),
});

export type BookFormValues = z.infer<typeof bookSchema>;
