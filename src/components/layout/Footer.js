import Link from "next/link";
import Logo from "@/components/shared/Logo";
import {
    ABOUT_TEXT,
    CONTACT_INFO,
    COPYRIGHT_YEAR,
    FOOTER_LINKS,
    SOCIAL_LINKS,
} from "@/data/footer";
import { SITE } from "@/lib/constants";


export default function Footer() {
    return (
        <footer className="border-t border-base-300 bg-base-200/60">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">

                    {/* Logo + about + social */}
                    <div className="sm:col-span-2 lg:col-span-5">
                        <Logo />

                        <p className="mt-4 max-w-md leading-relaxed text-base-content/70">
                            {ABOUT_TEXT}
                        </p>

                        <ul className="mt-6 flex items-center gap-3">
                            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        title={label}
                                        className="grid size-10 place-items-center rounded-full border border-base-300 bg-base-100 text-base-content/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-content"
                                    >
                                        <Icon className="size-4" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Quick links Section */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg font-semibold">Quick Links</h3>

                        <ul className="mt-5 space-y-3">
                            {FOOTER_LINKS.map(({ label, href }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-base-content/70 transition-colors hover:text-primary"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>


                    {/* Contact Section */}
                    <div className="lg:col-span-4">
                        <h3 className="text-lg font-semibold">Contact Us</h3>

                        <ul className="mt-5 space-y-4">
                            {CONTACT_INFO.map(
                                ({ label, value, href, icon: Icon }) => {
                                const Tag = href ? "a" : "div";

                                return (
                                    <li key={label}>
                                        <Tag
                                            {...(href ? { href } : {})}
                                            className={`flex items-start gap-3 text-base-content/70 ${href ? "transition-colors hover:text-primary" : ""
                                                }`}
                                        >
                                            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                                                <Icon className="size-4" aria-hidden="true" />
                                            </span>
                                            <span className="pt-1.5 text-sm leading-snug">
                                                {value}
                                            </span>
                                        </Tag>
                                    </li>
                                );
                            })}
                        </ul>
                        
                    </div>
                </div>
            </div>


            {/* Copyright Section */}
            <div className="border-t border-base-300">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-sm text-base-content/60 sm:flex-row sm:px-6 sm:text-left lg:px-8">
                    <p>
                        © {COPYRIGHT_YEAR} {SITE.name} • All rights reserved
                    </p>
                    <p>Add a book • Borrow a book • Return a book</p>
                </div>
            </div>
        </footer>
    );
}