"use client";

import { useState } from "react";


export default function Avatar({
    user,
    className = "size-10",
    textClassName = "",
}) {
    const [failedSrc, setFailedSrc] = useState(null);

    const initial = (user?.name || user?.email || "U")
        .trim()
        .charAt(0)
        .toUpperCase();

    if (user?.image && failedSrc !== user.image) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={user.image}
                alt={user.name || "User photo"}
                referrerPolicy="no-referrer"
                onError={() => setFailedSrc(user.image)}
                className={`${className} rounded-full object-cover`}
            />
        );
    }


    return (
        <span
            className={`${className} ${textClassName} grid place-items-center rounded-full bg-primary font-semibold text-primary-content`}
        >
            {initial}
        </span>
    );
}