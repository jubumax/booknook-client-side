"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 3500,
                style: {
                    background: "var(--color-base-100)",
                    color: "var(--color-base-content)",
                    border: "1px solid var(--color-base-300)",
                    borderRadius: "999px",
                    padding: "10px 18px",
                    fontSize: "0.9rem",
                },
            }}
        />
    );
}