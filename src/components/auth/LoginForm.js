"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiLock, FiMail } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/utils";
import { isValidEmail } from "@/lib/validators";
import FormField from "./FormField";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";


export default function LoginForm() {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get("redirect");
    const redirectTo = getSafeRedirect(redirectParam);
    const { isLoggedIn } = useAuth();


    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) router.replace(redirectTo);
    }, [isLoggedIn, redirectTo, router]);

    const registerHref = redirectParam
        ? `/register?redirect=${encodeURIComponent(redirectTo)}`
        : "/register";

        
    const handleForgotPassword = () => {
        toast("Password reset is currently unavailable!");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const email = String(form.get("email") ?? "").trim();
        const password = String(form.get("password") ?? "");

        const nextErrors = {};
        if (!isValidEmail(email)) {
            nextErrors.email = "Please enter a valid email address.";
        }
        if (!password) {
            nextErrors.password = "Please enter your password.";
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setLoading(true);
        const { error } = await authClient.signIn.email({ email, password });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Invalid email or password.");
            return;
        }

        toast.success("Welcome back! You are now logged in.");
        router.replace(redirectTo);
    };


    return (
        <>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField id="email" label="Email" icon={FiMail} error={errors.email}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="grow"
                    />
                </FormField>

                <FormField
                    id="password"
                    label="Password"
                    icon={FiLock}
                    error={errors.password}
                    labelAction={
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Forgot password?
                        </button>
                    }
                >
                    <PasswordInput
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        aria-invalid={Boolean(errors.password)}
                    />
                </FormField>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full rounded-full"
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner loading-sm" />
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>

            <div className="divider my-6 text-sm text-base-content/50">OR</div>

            <GoogleButton callbackURL={redirectTo} label="Continue with Google" />

            <p className="mt-6 text-center text-sm text-base-content/70">
                Don&apos;t have an account?{" "}
                <Link
                    href={registerHref}
                    className="font-semibold text-primary hover:underline"
                >
                    Register
                </Link>
            </p>
        </>
    );
}