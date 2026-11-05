"use client";

import { authClient } from "@/lib/auth-client";
import { safeCallbackUrl } from "@/lib/utils";
import { loginSchema, registerSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, BookOpen, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
    const isRegister = mode === "register";
    const router = useRouter();
    const search = useSearchParams();
    const callbackUrl = safeCallbackUrl(search.get("callbackUrl"));
    const [busy, setBusy] = useState(false);
    const loginForm = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });
    const registerForm = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: "", email: "", image: "", password: "" },
    });

    async function submitLogin(values: LoginValues) {
        setBusy(true);
        const result = await authClient.signIn.email({
            email: values.email,
            password: values.password,
        });
        setBusy(false);
        if (result.error) {
            toast.error(
                result.error.message ??
                    "We couldn’t sign you in. Check your email and password.",
            );
            return;
        }
        toast.success("Welcome back to the library.");
        router.replace(callbackUrl);
        router.refresh();
    }

    async function submitRegister(values: RegisterValues) {
        setBusy(true);
        const result = await authClient.signUp.email({
            name: values.name,
            email: values.email,
            password: values.password,
            image: values.image || undefined,
        });
        if (result.error) {
            setBusy(false);
            toast.error(
                result.error.message ?? "We couldn’t create your account.",
            );
            return;
        }
        // Better Auth creates a session on sign-up; the assignment sends password users to Login.
        await authClient.signOut();
        setBusy(false);
        toast.success("Your account is ready. Sign in to start exploring.");
        router.push("/login?registered=1");
    }

    async function googleSignIn() {
        setBusy(true);
        const result = await authClient.signIn.social({
            provider: "google",
            callbackURL: isRegister ? "/" : callbackUrl,
        });
        if (result.error) {
            setBusy(false);
            toast.error(
                result.error.message ??
                    "Google sign-in is unavailable. Check the OAuth configuration.",
            );
        }
    }

    const nameError = registerForm.formState.errors.name?.message;
    const imageError = registerForm.formState.errors.image?.message;
    const emailError = isRegister
        ? registerForm.formState.errors.email?.message
        : loginForm.formState.errors.email?.message;
    const passwordError = isRegister
        ? registerForm.formState.errors.password?.message
        : loginForm.formState.errors.password?.message;
    const emailRegistration = isRegister
        ? registerForm.register("email")
        : loginForm.register("email");
    const passwordRegistration = isRegister
        ? registerForm.register("password")
        : loginForm.register("password");
    const onSubmit = isRegister
        ? registerForm.handleSubmit(submitRegister)
        : loginForm.handleSubmit(submitLogin);

    return (
        <div className="grid min-h-[calc(100vh-76px)] bg-[#f4f3ec] lg:grid-cols-[.9fr_1.1fr]">
            <aside className="relative hidden overflow-hidden bg-[#244c3e] p-12 text-white lg:flex lg:flex-col lg:justify-between">
                <div className="absolute -right-24 top-28 size-[500px] rounded-full border border-white/10" />
                <div className="absolute -right-8 top-44 size-[360px] rounded-full border border-white/10" />
                <div className="relative">
                    <Link href="/" className="flex w-fit items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-[#dce9b8] text-[#244c3e]">
                            <BookOpen size={22} />
                        </span>
                        <span className="font-display text-2xl font-bold">
                            BookNook
                        </span>
                    </Link>
                    <p className="eyebrow mt-28 !text-[#dce9b8]">
                        A small online library
                    </p>
                    <h2 className="font-display mt-4 max-w-xl text-6xl font-bold leading-[1.05]">
                        A good story makes a little room for everyone.
                    </h2>
                    <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
                        Meet your next favorite, add the books you love, and
                        keep the best stories moving.
                    </p>
                </div>
                <p className="relative text-xs text-white/60">
                    A quiet corner for curious minds.
                </p>
                <span className="absolute bottom-24 right-20 grid size-24 rotate-12 place-items-center rounded-[28px] border border-white/20 bg-white/5 text-[#dce9b8]">
                    <Sparkles size={33} />
                </span>
            </aside>
            <div className="flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14">
                <div className="w-full max-w-[440px]">
                    <Link
                        href="/"
                        className="mb-10 flex w-fit items-center gap-2 font-display text-xl font-bold lg:hidden"
                    >
                        <span className="grid size-9 place-items-center rounded-xl bg-[#244c3e] text-[#dce9b8]">
                            <BookOpen size={18} />
                        </span>
                        BookNook
                    </Link>
                    <p className="eyebrow">
                        {isRegister ? "Make yourself at home" : "Welcome back"}
                    </p>
                    <h1 className="font-display mt-3 text-4xl font-bold">
                        {isRegister
                            ? "Join the library"
                            : "Pick up where you left off."}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-[#6b796e]">
                        {isRegister
                            ? "Create an account to borrow, share, and keep track of your reads."
                            : "Sign in to find your next story and manage your borrowed books."}
                    </p>
                    <button
                        type="button"
                        disabled={busy}
                        onClick={() => void googleSignIn()}
                        className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-[#dce1d7] bg-white px-4 py-3 text-sm font-bold transition hover:bg-[#fafbf6] disabled:opacity-50"
                    >
                        <GoogleMark /> Continue with Google
                    </button>
                    <div className="my-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#929c91]">
                        <span className="h-px flex-1 bg-[#e0e4da]" />
                        or use email
                        <span className="h-px flex-1 bg-[#e0e4da]" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4" noValidate>
                        {isRegister && (
                            <Field label="Full name" error={nameError}>
                                <input
                                    className="input-shell"
                                    placeholder="Your name"
                                    autoComplete="name"
                                    {...registerForm.register("name")}
                                />
                            </Field>
                        )}
                        <Field label="Email address" error={emailError}>
                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#859187]"
                                />
                                <input
                                    className="input-shell !pl-12"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    {...emailRegistration}
                                />
                            </div>
                        </Field>
                        {isRegister && (
                            <Field label="Photo URL" error={imageError}>
                                <input
                                    className="input-shell"
                                    placeholder="https://… (optional)"
                                    {...registerForm.register("image")}
                                />
                            </Field>
                        )}
                        <Field label="Password" error={passwordError}>
                            <input
                                type="password"
                                className="input-shell"
                                placeholder={
                                    isRegister
                                        ? "At least 6 characters"
                                        : "Your password"
                                }
                                autoComplete={
                                    isRegister
                                        ? "new-password"
                                        : "current-password"
                                }
                                {...passwordRegistration}
                            />
                        </Field>
                        {!isRegister && (
                            <p className="-mt-1 text-right text-xs text-[#879387]">
                                Forgot password? Password reset is currently not
                                enabled
                            </p>
                        )}
                        {isRegister && (
                            <p className="text-xs leading-5 text-[#829083]">
                                Use at least 6 characters, including one
                                uppercase and one lowercase letter.
                            </p>
                        )}
                        <button
                            disabled={busy}
                            className="button-primary w-full !rounded-xl !py-3.5"
                        >
                            {busy
                                ? "Please wait…"
                                : isRegister
                                  ? "Create account"
                                  : "Log in"}
                            <ArrowRight size={15} />
                        </button>
                    </form>
                    <p className="mt-7 text-center text-sm text-[#6b796e]">
                        {isRegister
                            ? "Already a member? "
                            : "New to BookNook? "}
                        <Link
                            href={
                                isRegister
                                    ? "/login"
                                    : `/register?callbackUrl=${encodeURIComponent(callbackUrl)}`
                            }
                            className="font-bold text-[#315d48] hover:underline"
                        >
                            {isRegister ? "Log in" : "Create an account"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="form-label">{label}</span>
            {children}
            {error && <span className="form-error block">{error}</span>}
        </label>
    );
}
function GoogleMark() {
    return (
        <span className="font-black text-lg">
            <span className="text-[#4285f4]">G</span>
        </span>
    );
}
