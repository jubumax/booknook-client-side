"use client";

import { authClient } from "@/lib/auth-client";

export function useAuth() {
    const { data: session, isPending } = authClient.useSession();

    return {
        session,
        user: session?.user ?? null,
        isLoggedIn: Boolean(session?.user),
        isPending,
    };
}