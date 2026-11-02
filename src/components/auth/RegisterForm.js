"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FiCheckCircle,
    FiCircle,
    FiImage,
    FiLock,
    FiMail,
    FiUser,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/utils";
import {
    PASSWORD_RULES,
    getPasswordError,
    isValidEmail,
    isValidUrl,
} from "@/lib/validators";
import FormField from "./FormField";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";


function PasswordChecklist({ password }) {
    return (
        <ul className="mt-2 space-y-1 text-xs">
            {PASSWORD_RULES.map((rule) => {
                const passed = rule.test(password);

                return (
                    <li
                        key={rule.id}
                        className={`flex items-center gap-2 transition-colors ${passed ? "text-success" : "text-base-content/60"
                            }`}
                    >

                        {passed ? (
                            <FiCheckCircle className="size-3.5" />
                        ) : (
                            <FiCircle className="size-3.5" />
                        )}
                        {rule.label}
                    </li>
                );
            })}
        </ul>
    );
}


export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get("redirect");
    const { isLoggedIn } = useAuth();

    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) router.replace("/");
    }, [isLoggedIn, router]);

    // Remembers desired route in login after register
    const loginHref = redirectParam
        ? `/login?redirect=${encodeURIComponent(getSafeRedirect(redirectParam))}`
        : "/login";


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (errors.password) {
            setErrors((prev) => ({ ...prev, password: "" }));
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") ?? "").trim();
        const email = String(form.get("email") ?? "").trim();
        const image = String(form.get("photoURL") ?? "").trim();

        const nextErrors = {};
        if (name.length < 2) nextErrors.name = "Please enter your full name.";
        if (!isValidEmail(email)) {
            nextErrors.email = "Please enter a valid email address.";
        }
        if (!isValidUrl(image)) {
            nextErrors.photoURL =
                "Enter a valid photo URL starting with http:// or https://";
        }
        const passwordError = getPasswordError(password);
        if (passwordError) nextErrors.password = passwordError;

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;         // If invalid > not register!

        setLoading(true);
        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
            return;
        }

        toast.success("Account created! Please log in to continue.");
        router.push(loginHref);
    };


    return (
        <>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField id="name" label="Name" icon={FiUser} error={errors.name}>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        className="grow"
                    />
                </FormField>

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
                    id="photoURL"
                    label="Photo URL"
                    icon={FiImage}
                    error={errors.photoURL}
                >
                    <input
                        id="photoURL"
                        name="photoURL"
                        type="url"
                        autoComplete="off"
                        placeholder="https://example.com/your-photo.jpg"
                        aria-invalid={Boolean(errors.photoURL)}
                        className="grow"
                    />
                </FormField>

                <div>
                    <FormField
                        id="password"
                        label="Password"
                        icon={FiLock}
                        error={errors.password}
                    >
                        <PasswordInput
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={password}
                            onChange={handlePasswordChange}
                            aria-invalid={Boolean(errors.password)}
                        />
                    </FormField>
                    <PasswordChecklist password={password} />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full rounded-full"
                >
                    {loading ? (
                        <>
                            <span className="loading loading-spinner loading-sm" />
                            Creating account...
                        </>
                    ) : (
                        "Register"
                    )}
                </button>
            </form>

            <div className="divider my-6 text-sm text-base-content/50">OR</div>


            <GoogleButton callbackURL="/" label="Sign up with Google" />

            <p className="mt-6 text-center text-sm text-base-content/70">
                Already have an account?{" "}
                <Link
                    href={loginHref}
                    className="font-semibold text-primary hover:underline"
                >
                    Login
                </Link>
            </p>
            
        </>
    );
}