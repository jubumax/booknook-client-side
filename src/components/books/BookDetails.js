"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FiAlertCircle,
    FiArrowLeft,
    FiBookmark,
    FiBookOpen,
    FiCalendar,
} from "react-icons/fi";
import EmptyState from "@/components/shared/EmptyState";
import Spinner from "@/components/shared/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/format";
import { getBook } from "@/services/books";
import BookCover from "./BookCover";
import BorrowModal from "./BorrowModal";


const LOADING_STATE = { status: "loading", book: null, error: "", code: 0 };

export default function BookDetails({ id }) {
    const { user } = useAuth();
    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState(LOADING_STATE);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let ignore = false;

        getBook(id)
            .then((book) => {
                if (!ignore) setState({ status: "ready", book, error: "", code: 0 });
            })
            .catch((error) => {
                if (!ignore) {
                    setState({
                        status: "error",
                        book: null,
                        error: error.message,
                        code: error.status ?? 0,
                    });
                }
            });

        return () => {
            ignore = true;
        };
    }, [id, attempt]);

    const retry = () => {
        setState(LOADING_STATE);
        setAttempt((count) => count + 1);
    };


    const handleBorrowed = () => {
        setState((prev) =>
            prev.book
                ? {
                    ...prev,
                    book: {
                        ...prev.book,
                        availableCopies: Math.max(prev.book.availableCopies - 1, 0),
                    },
                }
                : prev,
        );
    };

    if (state.status === "loading") {
        return <Spinner fullPage label="Loading book details..." />;
    }

    if (state.status === "error") {
        const notFound = state.code === 404 || state.code === 400;

        return (
            <EmptyState
                icon={notFound ? FiBookOpen : FiAlertCircle}
                title={notFound ? "Book not found" : "Could not load this book"}
                text={
                    notFound
                        ? "This book may have been removed by its owner."
                        : state.error
                }
            >
                <div className="flex flex-wrap justify-center gap-3">
                    {!notFound && (
                        <button
                            type="button"
                            onClick={retry}
                            className="btn btn-primary rounded-full"
                        >
                            Try Again
                        </button>
                    )}
                    <Link href="/books" className="btn btn-outline rounded-full">
                        Back to All Books
                    </Link>
                </div>
            </EmptyState>
        );
    }

    const { book } = state;
    const available = book.availableCopies > 0;
    const ownerName = book.addedBy?.name || "A BookNook reader";
    const ownerInitial = ownerName.trim().charAt(0).toUpperCase();


    return (
        <>
            <Link
                href="/books"
                className="inline-flex items-center gap-2 text-sm font-medium text-base-content/70 transition-colors hover:text-primary"
            >
                <FiArrowLeft aria-hidden="true" />
                Back to All Books
            </Link>


            <div className="mt-6 grid gap-10 lg:grid-cols-5 lg:gap-14">

                {/* Cover */}
                <div className="lg:col-span-2">
                    <div className="mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-xl lg:sticky lg:top-24">
                        <BookCover
                            src={book.image}
                            alt={`Cover of ${book.title}`}
                            className="size-full"
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-3">
                    <span className="badge badge-soft badge-primary">{book.category}</span>

                    <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                        {book.title}
                    </h1>
                    <p className="mt-2 text-lg text-base-content/70">by {book.author}</p>

                    <div className="mt-6 grid max-w-md grid-cols-2 gap-3">

                        <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                            <p className="text-xs uppercase tracking-wider text-base-content/60">
                                Total Copies
                            </p>
                            <p className="mt-1 text-2xl font-bold">{book.totalCopies}</p>
                        </div>
                        
                        <div
                            className={`rounded-2xl border p-4 ${available
                                ? "border-success/30 bg-success/10"
                                : "border-error/30 bg-error/10"
                                }`}
                        >
                            <p className="text-xs uppercase tracking-wider text-base-content/60">
                                Available
                            </p>
                            <p
                                className={`mt-1 text-2xl font-bold ${available ? "text-success" : "text-error"
                                    }`}
                            >
                                {book.availableCopies}
                            </p>
                        </div>

                    </div>

                    <h2 className="mt-10 text-xl font-semibold">About this book</h2>
                    <p className="mt-3 whitespace-pre-line leading-relaxed text-base-content/80">
                        {book.description}
                    </p>

                    {/* Added by */}
                    <div className="mt-8 flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200/50 p-4">
                        
                        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-content">
                            {ownerInitial}
                        </span>

                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-wider text-base-content/60">
                                Added by
                            </p>
                            <p className="truncate font-semibold">{ownerName}</p>
                            {book.addedBy?.email && (
                                <p className="truncate text-sm text-base-content/70">
                                    {book.addedBy.email}
                                </p>
                            )}
                        </div>
                        
                        <p className="ml-auto hidden items-center gap-1.5 text-sm text-base-content/60 sm:flex">
                            <FiCalendar aria-hidden="true" />
                            {formatDate(book.createdAt)}
                        </p>

                    </div>

                    {/* Borrow */}
                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            disabled={!available}
                            className="btn btn-primary btn-lg w-full rounded-full px-8 sm:w-auto"
                        >
                            <FiBookmark aria-hidden="true" />
                            {available ? "Borrow This Book" : "Not Available"}
                        </button>

                        {!available && (
                            <p className="mt-3 text-sm text-base-content/60">
                                All copies are borrowed right now. Please check back later.
                            </p>
                        )}
                    </div>

                </div>
            </div>


            <BorrowModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                book={book}
                user={user}
                onBorrowed={handleBorrowed}
            />
        </>
    );
}