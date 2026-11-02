"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { THEME_KEY, THEMES } from "@/lib/constants";


export default function ThemeToggle() {
    const toggleTheme = () => {
        const root = document.documentElement;
        const next =
            root.dataset.theme === THEMES.dark ? THEMES.light : THEMES.dark;

        root.dataset.theme = next;

        try {
            localStorage.setItem(THEME_KEY, next);
        } catch {
            /* This part will work if storage is off */
        }
    };


    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            title="Toggle theme"
            className="btn btn-ghost btn-circle"
        >
            <FiMoon className="size-5 dark:hidden" />
            <FiSun className="hidden size-5 dark:block" />
        </button>
    );
}