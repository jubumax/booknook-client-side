import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaXTwitter,
} from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const COPYRIGHT_YEAR = new Date().getFullYear();

export const ABOUT_TEXT =
    "BookNook is a cosy online library where readers share the books on their shelves and borrow new ones for a few days. Add a book, borrow a book, return a book.";

export const FOOTER_LINKS = [
    { label: "Home", href: "/" },
    { label: "All Books", href: "/books" },
    { label: "Add Book", href: "/add-book" },
    { label: "My Borrows", href: "/my-borrows" },
];


export const CONTACT_INFO = [
    {
        label: "Email",
        value: "contact.jubumax@gmail.com",
        href: "mailto:contact.jubumax@gmail.com",
        icon: FiMail,
    },
    {
        label: "Phone",
        value: "+880 1600 123 000",
        href: "tel:+8801600123000",
        icon: FiPhone,
    },
    {
        label: "Address",
        value: "Tangail sadar, Dhaka, Bangladesh",
        href: null,
        icon: FiMapPin,
    },
];

export const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/jubumax", icon: FaGithub },
    { label: "Linkedin", href: "https://linkedin.com/in/jubumax", icon: FaLinkedin },
    { label: "Instagram", href: "https://instagram.com/", icon: FaInstagram },
    // { label: "X", href: "https://x.com", icon: FaXTwitter },
];