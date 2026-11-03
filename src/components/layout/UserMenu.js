"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiLogOut, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Avatar from "@/components/shared/Avatar";


export default function UserMenu({ user }) {
    const [open, setOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();

    // dropdown will off by 'outside click' or by pressing 'Esc'

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    
    const handleLogout = async () => {
        setLoggingOut(true);
        const { error } = await authClient.signOut();
        setLoggingOut(false);
        setOpen(false);

        if (error) {
            toast.error("Could not log you out. Please try again.");
            return;
        }

        toast.success("You have been logged out.");
        router.push("/");
    };


    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Open user menu"
                className="rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-base-100 transition hover:ring-primary/40 focus-visible:ring-primary"
            >
                <Avatar user={user} />
            </button>

            <div
                role="menu"
                className={`absolute right-0 z-50 mt-3 w-64 origin-top-right rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl transition-all duration-200 ${open
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0"
                    }`}
            >
                <div className="flex items-center gap-3 rounded-xl bg-base-200/70 p-3">

                    <Avatar user={user} className="size-11" />

                    <div className="min-w-0">
                        <p className="truncate font-semibold">{user.name}</p>
                        <p className="truncate text-xs text-base-content/60">
                            {user.email}
                        </p>
                    </div>

                </div>

                <div className="mt-2 flex flex-col gap-1">
                    <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-base-200"
                    >
                        <FiUser className="size-4" aria-hidden="true" />
                        My Profile
                    </Link>

                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-error transition-colors hover:bg-error/10 disabled:opacity-60"
                    >
                        <FiLogOut className="size-4" aria-hidden="true" />
                        {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                </div>

            </div>
        </div>
    );
}