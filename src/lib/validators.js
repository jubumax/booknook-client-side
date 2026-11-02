export const PASSWORD_RULES = [
    {
        id: "upper",
        label: "At least one uppercase letter (A-Z)",
        error: "Add at least one uppercase letter.",
        test: (value) => /[A-Z]/.test(value),
    },
    {
        id: "lower",
        label: "At least one lowercase letter (a-z)",
        error: "Add at least one lowercase letter.",
        test: (value) => /[a-z]/.test(value),
    },
    {
        id: "length",
        label: "At least 6 characters long",
        error: "Use at least 6 characters.",
        test: (value) => value.length >= 6,
    },
];


export function getPasswordError(password) {
    if (!password) return "Password is required.";

    return PASSWORD_RULES.filter((rule) => !rule.test(password))
        .map((rule) => rule.error)
        .join(" ");
}

export function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}