"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";


export default function GoogleButton({
    callbackURL = "/",
    label = "Continue with Google",
}) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL,
        });

        if (error) {
            setLoading(false);
            toast.error(error.message || "Google sign-in failed. Please try again.");
        }
    };

    
    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="btn btn-outline w-full rounded-full"
        >
            {loading ? (
                <span className="loading loading-spinner loading-sm" />
            ) : (
                <FcGoogle className="size-5" />
            )}
            {label}
        </button>
    );
}