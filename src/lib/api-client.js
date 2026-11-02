"use client";

import { ApiError, apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export async function authFetch(path, options = {}) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new ApiError("Please log in to continue.", 401);
    }

    return apiFetch(path, { ...options, token: data.token });
}