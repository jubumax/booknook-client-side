"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "@/components/shared/Logo";
import { authClient } from "@/lib/auth-client";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";


export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    const user = session?.user;
    const isLoggedIn = Boolean(user);
    const closeMobile = () => setMobileOpen(false);


    return (
        <header className="sticky top-0 z-50 border-b border-base-300/70 bg-base-100/80 backdrop-blur-lg">
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
            >
                <Logo />

                <div className="hidden lg:block">
                    <NavLinks isLoggedIn={isLoggedIn} />
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <ThemeToggle />

                    {isPending ? (
                        <div className="skeleton size-10 rounded-full" />
                    ) : isLoggedIn ? (
                        <UserMenu user={user} />
                    ) : (
                        <div className="hidden items-center gap-2 sm:flex">
                            <Link href="/login" className="btn btn-ghost rounded-full">
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-primary rounded-full">
                                Register
                            </Link>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        className="btn btn-ghost btn-circle lg:hidden"
                    >
                        {mobileOpen ? (
                            <FiX className="size-5" />
                        ) : (
                            <FiMenu className="size-5" />
                        )}
                    </button>
                </div>
            </nav>


            {/* Mobile / tablet menu */}
            <div
                id="mobile-menu"
                className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div inert={!mobileOpen} className="overflow-hidden">
                    <div className="mx-auto max-w-7xl border-t border-base-300/70 px-4 pb-4 pt-3 sm:px-6">
                        <NavLinks
                            isLoggedIn={isLoggedIn}
                            variant="mobile"
                            onNavigate={closeMobile}
                        />

                        {!isPending && !isLoggedIn && (
                            <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
                                <Link
                                    href="/login"
                                    onClick={closeMobile}
                                    className="btn btn-outline rounded-full"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={closeMobile}
                                    className="btn btn-primary rounded-full"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}