"use client";

import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "@/components/shared/Modal";


export default function DeleteConfirmModal({ book, onClose, onConfirm }) {

    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm(book);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal open={Boolean(book)} onClose={onClose} title="Delete this book?" size="sm">

            {book && (
                <>

                    <div className="flex items-start gap-4">
                        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-error/10 text-error">
                            <FiAlertTriangle className="size-6" aria-hidden="true" />
                        </span>

                        <p className="leading-relaxed text-base-content/80">
                            <span className="font-semibold">&ldquo;{book.title}&rdquo;</span>{" "}
                            will be removed from the library for good. This action cannot be
                            undone.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="btn btn-ghost rounded-full"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={loading}
                            className="btn btn-error rounded-full px-8"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    Deleting...
                                </>
                            ) : (
                                "Yes, Delete"
                            )}
                        </button>
                    </div>

                </>
            )}
        </Modal>
    );
}