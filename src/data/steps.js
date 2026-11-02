import { FiBookmark, FiRotateCcw, FiSearch, FiUserPlus } from "react-icons/fi";

export const BORROW_STEPS = [
    {
        title: "Create an account",
        text: "Register in a minute with your email or Google account.",
        icon: FiUserPlus,
    },
    {
        title: "Find a book",
        text: "Browse the shelf and open any title to read its details.",
        icon: FiSearch,
    },
    {
        title: "Borrow it",
        text: "Confirm your borrow and the book is yours for a week.",
        icon: FiBookmark,
    },
    {
        title: "Return it",
        text: "Finished reading? Return it so the next reader can enjoy it.",
        icon: FiRotateCcw,
    },
];