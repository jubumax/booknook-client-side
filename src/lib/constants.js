export const SITE = {
    name: "BookNook",
    tagline: "Add a book, borrow a book, return a book.",
    description:
        "A small online library where you can add, borrow or return a book.",
};

export const THEME_KEY = "booknook-theme";

export const THEMES = {
    light: "booknook-light",
    dark: "booknook-dark",
};

export const NAV_LINKS = [
    { label: "Home", href: "/", private: false },
    { label: "All Books", href: "/books", private: false },
    { label: "Add Book", href: "/add-book", private: true },
    { label: "My Books", href: "/my-books", private: true },
    { label: "My Borrows", href: "/my-borrows", private: true },
];

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];