const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export class ApiError extends Error {
    constructor(message, status = 0) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}


export async function apiFetch(path, {
    method = "GET",
    body,
    token
} = {}) {
    const headers = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;

    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            cache: "no-store",      // for all time new data!
        });
    } catch {
        throw new ApiError(
            "Could not reach the server. Please check your connection and try again.",
        );
    }

    let data = null;
    try {
        data = await response.json();
    } catch {
        /* nothing in body! */
    }

    if (!response.ok) {
        const message =
            response.status === 401
                ? "Your session has expired. Please log in again."
                : data?.message || "Something went wrong. Please try again.";
        throw new ApiError(message, response.status);
    }

    return data;
}