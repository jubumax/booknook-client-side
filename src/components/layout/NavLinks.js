"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";


export default function NavLinks({
    isLoggedIn,
    variant = "desktop",
    onNavigate,
}) {
    const pathname = usePathname();

    const links = NAV_LINKS.filter((link) => !link.private || isLoggedIn);

    const isActive = (href) =>
        href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);

    const isMobile = variant === "mobile";


    return (
        <ul
            className={
                isMobile ? "flex flex-col gap-1" : "flex items-center gap-1"
            }
        >
            {links.map(({ label, href }) => {
                const active = isActive(href);

                return (
                    <li key={href}>
                        <Link
                            href={href}
                            onClick={onNavigate}
                            aria-current={active ? "page" : undefined}
                            className={`block font-medium transition-colors ${isMobile
                                    ? "rounded-xl px-4 py-3 text-base"
                                    : "rounded-full px-4 py-2 text-sm"
                                } ${active
                                    ? "bg-primary/10 text-primary"
                                    : "text-base-content/75 hover:bg-base-200 hover:text-base-content"
                                }`}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}