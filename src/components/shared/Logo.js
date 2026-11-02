import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";
import { SITE } from "@/lib/constants";

export default function Logo({ className = "" }) {
    return (
        
        <Link
            href="/"
            aria-label={`${SITE.name} home`}
            className={`group inline-flex items-center gap-2.5 ${className}`}
        >

            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content shadow-sm transition-transform duration-300 group-hover:-rotate-6">
                <FiBookOpen className="size-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight">
                Book<span className="text-primary">Nook</span>
            </span>
        </Link>
    );
}