"use client";

import { useEffect, useId, useRef } from "react";
import { FiX } from "react-icons/fi";

const SIZES = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
};


export default function Modal({
    open,
    onClose,
    title,
    description,
    size = "md",
    children,
}) {
    const dialogRef = useRef(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);


    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            aria-labelledby={titleId}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className={`modal-box w-full ${SIZES[size]}`}>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
                >
                    <FiX className="size-4" />
                </button>

                <h3 id={titleId} className="pr-8 text-2xl font-bold">
                    {title}
                </h3>
                {description && (
                    <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                        {description}
                    </p>
                )}

                <div className="mt-5">{open ? children : null}</div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button aria-label="Close dialog">close</button>
            </form>
        </dialog>
    );
}