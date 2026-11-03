"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiUser } from "react-icons/fi";
import FormField from "@/components/auth/FormField";
import Modal from "@/components/shared/Modal";
import { BORROW_DAYS } from "@/lib/constants";
import { borrowBook } from "@/services/borrows";
import BookCover from "./BookCover";


export default function BorrowModal({ open, onClose, book, user, onBorrowed }) {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await borrowBook(book._id);
            toast.success(
                `You borrowed "${book.title}". Please return it within ${BORROW_DAYS} days.`,
            );
            onBorrowed();
            onClose();

        } catch (error) {
            toast.error(
                error.message || "Could not borrow the book. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Borrow This Book"
            description="Check your details and confirm to borrow this book."
        >
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-4 rounded-2xl bg-base-200/70 p-3">
                
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                        <BookCover
                            src={book.image}
                            alt={`Cover of ${book.title}`}
                            className="size-full"
                        />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-semibold">{book.title}</p>
                        <p className="truncate text-sm text-base-content/70">
                            by {book.author}
                        </p>
                    </div>
                </div>

                <FormField id="borrowName" label="Your Name" icon={FiUser} readOnly>
                    <input
                        id="borrowName"
                        type="text"
                        value={user?.name ?? ""}
                        readOnly
                        className="grow cursor-not-allowed"
                    />
                </FormField>

                <FormField id="borrowEmail" label="Your Email" icon={FiMail} readOnly>
                    <input
                        id="borrowEmail"
                        type="email"
                        value={user?.email ?? ""}
                        readOnly
                        className="grow cursor-not-allowed"
                    />
                </FormField>

                <p className="text-sm leading-relaxed text-base-content/70">
                    You can keep this book for {BORROW_DAYS} days. The return date will
                    be saved in My Borrows.
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="btn btn-ghost rounded-full"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary rounded-full px-8"
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                Borrowing...
                            </>
                        ) : (
                            "Confirm Borrow"
                        )}
                    </button>

                </div>
            </form>
        </Modal>
    );
}