"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle, FiBookmark, FiRotateCcw } from "react-icons/fi";
import BookCover from "@/components/books/BookCover";
import EmptyState from "@/components/shared/EmptyState";
import Spinner from "@/components/shared/Spinner";
import { formatDate } from "@/lib/format";
import { getMyBorrows, returnBook } from "@/services/borrows";


const DAY_MS = 24 * 60 * 60 * 1000;
const LOADING_STATE = { status: "loading", borrows: [], error: "", now: 0 };

function getDueInfo(returnDate, now) {
    
    const due = new Date(returnDate).getTime();
    if (Number.isNaN(due) || !now) return null;

    const daysLeft = Math.ceil((due - now) / DAY_MS);

    if (daysLeft < 0) return { label: "Overdue", tone: "badge-error" };
    if (daysLeft === 0) return { label: "Due today", tone: "badge-warning" };
    return {
        label: `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`,
        tone: "badge-success",
    };
}


export default function BorrowsTable() {

    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState(LOADING_STATE);
    const [returningId, setReturningId] = useState(null);

    useEffect(() => {
        let ignore = false;

        getMyBorrows()
            .then((borrows) => {
                if (!ignore) {
                    setState({ status: "ready", borrows, error: "", now: Date.now() });
                }
            })
            .catch((error) => {
                if (!ignore) {
                    setState({
                        status: "error",
                        borrows: [],
                        error: error.message,
                        now: 0,
                    });
                }
            });

        return () => {
            ignore = true;
        };
    }, [attempt]);

    const retry = () => {
        setState(LOADING_STATE);
        setAttempt((count) => count + 1);
    };


    const handleReturn = async (borrow) => {
        setReturningId(borrow._id);

        try {
            await returnBook(borrow._id);

            setState((prev) => ({
                ...prev,
                borrows: prev.borrows.filter((item) => item._id !== borrow._id),
            }));

            toast.success(`"${borrow.bookTitle}" returned. Thank you!`);
        } catch (error) {
            toast.error(error.message || "Could not return the book. Please try again.");
        } finally {
            setReturningId(null);
        }
    };

    if (state.status === "loading") {
        return <Spinner fullPage label="Loading your borrowed books..." />;
    }

    if (state.status === "error") {
        return (
            <EmptyState
                icon={FiAlertCircle}
                title="Could not load your borrows"
                text={state.error}
            >
                <button
                    type="button"
                    onClick={retry}
                    className="btn btn-primary rounded-full"
                >
                    Try Again
                </button>
            </EmptyState>
        );
    }

    const { borrows, now } = state;

    if (borrows.length === 0) {
        return (
            <EmptyState
                icon={FiBookmark}
                title="You have not borrowed any books"
                text="Pick a book from the shelf and it will show up here until you return it."
            >
                <Link href="/books" className="btn btn-primary rounded-full">
                    Browse Books
                </Link>
            </EmptyState>
        );
    }


    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-base-content/60">
                    You have borrowed {borrows.length}{" "}
                    {borrows.length === 1 ? "book" : "books"}.
                </p>
                
                <Link href="/books" className="btn btn-outline rounded-full">
                    Browse More Books
                </Link>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
                <table className="table">

                    <thead>
                        <tr className="text-base-content/70">
                            <th>Image</th>
                            <th>Title</th>
                            <th className="hidden sm:table-cell">Borrow Date</th>
                            <th>Return Date</th>
                            <th className="text-right">Return Book</th>
                        </tr>
                    </thead>

                    <tbody>
                        {borrows.map((borrow) => {
                            const due = getDueInfo(borrow.returnDate, now);
                            const returning = returningId === borrow._id;

                            return (
                                <tr key={borrow._id} className="hover:bg-base-200/50">
                                    <td>
                                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-base-300 bg-base-200">
                                            <BookCover
                                                src={borrow.bookImage}
                                                alt={`Cover of ${borrow.bookTitle}`}
                                                className="size-full"
                                            />
                                        </div>
                                    </td>

                                    <td className="min-w-44">
                                        <Link
                                            href={`/books/${borrow.bookId}`}
                                            className="line-clamp-2 font-semibold transition-colors hover:text-primary"
                                        >
                                            {borrow.bookTitle}
                                        </Link>
                                    </td>

                                    <td className="hidden whitespace-nowrap text-base-content/70 sm:table-cell">
                                        {formatDate(borrow.borrowDate)}
                                    </td>

                                    <td className="whitespace-nowrap">
                                        <p>{formatDate(borrow.returnDate)}</p>
                                        {due && (
                                            <span className={`badge badge-soft badge-sm mt-1 ${due.tone}`}>
                                                {due.label}
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleReturn(borrow)}
                                                disabled={returning}
                                                aria-label={`Return ${borrow.bookTitle}`}
                                                className="btn btn-primary btn-sm rounded-full"
                                            >
                                                {returning ? (
                                                    <span className="loading loading-spinner loading-xs" />
                                                ) : (
                                                    <FiRotateCcw aria-hidden="true" />
                                                )}
                                                
                                                <span className="hidden sm:inline">
                                                    {returning ? "Returning..." : "Return Book"}
                                                </span>
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}