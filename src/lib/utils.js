export function getSafeRedirect(value, fallback = "/") {

    if (!value || typeof value !== "string") return fallback;

    if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {

        return fallback;

    }

    return value;
}