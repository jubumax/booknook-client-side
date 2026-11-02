import { FiClock, FiFeather, FiGrid, FiSmile, FiZap } from "react-icons/fi";

export const TOP_CATEGORIES = [
    {
        name: "Fiction",
        text: "Novels and stories that sweep you away.",
        icon: FiFeather,
        tone: "bg-primary/10 text-primary",
    },
    {
        name: "Science",
        text: "Curious minds, big ideas and discoveries.",
        icon: FiZap,
        tone: "bg-info/10 text-info",
    },
    {
        name: "History",
        text: "People, places and the stories behind today.",
        icon: FiClock,
        tone: "bg-secondary/10 text-secondary",
    },
    {
        name: "Kids",
        text: "Picture books and adventures for young readers.",
        icon: FiSmile,
        tone: "bg-accent/20 text-warning",
    },
    {
        name: "Others",
        text: "Everything else worth a spot on the shelf.",
        icon: FiGrid,
        tone: "bg-success/10 text-success",
    },
];