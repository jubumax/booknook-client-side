"use client";

import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";

export default function BookCover({ src, alt, className = "" }) {
    const [failedSrc, setFailedSrc] = useState(null);

    if (!src || failedSrc === src) {
        return (
            <div
                role="img"
                aria-label={alt}
                className={`grid place-items-center bg-linear-to-br from-primary/15 to-accent/25 text-primary ${className}`}
            >
                <FiBookOpen className="size-10 opacity-70" aria-hidden="true" />
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailedSrc(src)}
            className={`object-cover ${className}`}
        />
    );
}