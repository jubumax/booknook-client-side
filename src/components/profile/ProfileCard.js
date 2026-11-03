"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FiBookmark,
    FiBookOpen,
    FiCalendar,
    FiEdit2,
    FiMail,
} from "react-icons/fi";
import Avatar from "@/components/shared/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/format";
import { getMyBooks } from "@/services/books";
import { getMyBorrows } from "@/services/borrows";
import EditProfileModal from "./EditProfileModal";


const STATS = [
    { key: "books", label: "Books Added", href: "/my-books", icon: FiBookOpen },
    {
        key: "borrows",
        label: "Books Borrowed",
        href: "/my-borrows",
        icon: FiBookmark,
    },
];

export default function ProfileCard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        let ignore = false;

        Promise.allSettled([getMyBooks(), getMyBorrows()]).then(
            ([books, borrows]) => {
                if (ignore) return;
                setStats({
                    books: books.status === "fulfilled" ? books.value.length : null,
                    borrows: borrows.status === "fulfilled" ? borrows.value.length : null,
                });
            },
        );

        return () => {
            ignore = true;
        };
    }, []);

    if (!user) return null;


    return (
        <>
            <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">

                {/* Cover */}
                <div className="h-32 bg-linear-to-br from-primary/80 via-primary to-secondary/80 sm:h-40" />
                <div className="px-6 pb-8 sm:px-10">
                    <div className="-mt-14 flex flex-wrap items-end justify-between gap-4 sm:-mt-16">
                        <Avatar
                            user={user}
                            className="size-28 ring-4 ring-base-100 sm:size-32"
                            textClassName="text-4xl"
                        />
                        
                        <button
                            type="button"
                            onClick={() => setEditOpen(true)}
                            className="btn btn-outline rounded-full"
                        >
                            <FiEdit2 aria-hidden="true" />
                            Edit Profile
                        </button>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold sm:text-3xl">{user.name}</h2>

                    <ul className="mt-3 flex flex-col gap-2 text-sm text-base-content/70 sm:flex-row sm:flex-wrap sm:gap-x-6">
                        <li className="flex items-center gap-2">
                            <FiMail aria-hidden="true" />
                            {user.email}
                        </li>
                        
                        {user.createdAt && (
                            <li className="flex items-center gap-2">
                                <FiCalendar aria-hidden="true" />
                                Member since {formatDate(user.createdAt)}
                            </li>
                        )}
                    </ul>


                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {STATS.map(({ key, label, href, icon: Icon }) => {
                            const value = stats ? (stats[key] ?? "—") : "…";

                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    className="group flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                >

                                    <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <Icon className="size-6" aria-hidden="true" />
                                    </span>

                                    <span>
                                        <span className="block text-2xl font-bold">{value}</span>

                                        <span className="text-sm text-base-content/70 transition-colors group-hover:text-primary">
                                            {label}
                                        </span>
                                    </span>
                                </Link>
                            );

                        })}
                    </div>
                </div>
            </div>


            <EditProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                user={user}
            />
        </>
    );
}