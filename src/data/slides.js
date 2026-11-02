import { FiBookOpen, FiPlusCircle, FiRotateCcw } from "react-icons/fi";

export const SLIDES = [
    {
        id: "discover",
        eyebrow: "Welcome to BookNook",
        title: "Your next favourite book is on a neighbour's shelf",
        text: "BookNook is a small online library. See what readers are sharing and borrow a story for a few days.",
        icon: FiBookOpen,
        background: "from-primary/15 via-base-100 to-accent/20",
        books: ["bg-primary", "bg-secondary", "bg-accent"],
    },
    {
        id: "share",
        eyebrow: "Add a book",
        title: "Got books gathering dust? Give them a second life",
        text: "Add a book to the shelf in under a minute and let other readers enjoy the story you loved.",
        icon: FiPlusCircle,
        background: "from-secondary/15 via-base-100 to-primary/15",
        books: ["bg-secondary", "bg-primary", "bg-accent"],
    },
    {
        id: "borrow",
        eyebrow: "Borrow & return",
        title: "Borrow today, return when you are done",
        text: "Pick a title, keep it for a week and hand it back when you finish. No fees and no fuss.",
        icon: FiRotateCcw,
        background: "from-accent/20 via-base-100 to-secondary/15",
        books: ["bg-accent", "bg-secondary", "bg-primary"],
    },
];