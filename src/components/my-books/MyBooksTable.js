"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    FiAlertCircle,
    FiBookOpen,
    FiEdit2,
    FiPlus,
    FiTrash2,
} from "react-icons/fi";
import BookCover from "@/components/books/BookCover";
import EmptyState from "@/components/shared/EmptyState";
import Spinner from "@/components/shared/Spinner";
import { formatDate } from "@/lib/format";
import { deleteBook, getMyBooks, updateBook } from "@/services/books";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditBookModal from "./EditBookModal";


const LOADING_STATE = { status: "loading", books: [], error: "" };

export default function MyBooksTable() {

    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState(LOADING_STATE);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        let ignore = false;

        getMyBooks()
            .then((books) => {
                if (!ignore) setState({ status: "ready", books, error: "" });
            })
            .catch((error) => {
                if (!ignore) {
                    setState({ status: "error", books: [], error: error.message });
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


    const handleUpdate = async (values) => {
        try {
            const updated = await updateBook(editing._id, values);

            setState((prev) => ({
                ...prev,
                books: prev.books.map((book) => {
                    if (book._id !== editing._id) return book;

                    return updated?._id ? updated : { ...book, ...values };
                }),
            }));

            toast.success("Book updated successfully!");
            setEditing(null);
        } catch (error) {
            toast.error(error.message || "Could not update the book. Please try again.");
        }
    };


    const handleDelete = async (book) => {
        try {
            await deleteBook(book._id);

            setState((prev) => ({
                ...prev,
                books: prev.books.filter((item) => item._id !== book._id),
            }));

            toast.success("Book deleted successfully.");
            setDeleting(null);
        } catch (error) {
            toast.error(error.message || "Could not delete the book. Please try again.");
        }
    };

    if (state.status === "loading") {
        return <Spinner fullPage label="Loading your books..." />;
    }

    if (state.status === "error") {
        return (
            <EmptyState
                icon={FiAlertCircle}
                title="Could not load your books"
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


    const { books } = state;

    if (books.length === 0) {
        return (
            <EmptyState
                icon={FiBookOpen}
                title="You have not added any books yet"
                text="Share a book from your shelf and it will show up here, ready to edit or remove."
            >
                <Link href="/add-book" className="btn btn-primary rounded-full">
                    Add Your First Book
                </Link>
            </EmptyState>
        );
    }


    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-base-content/60">
                    You have added {books.length} {books.length === 1 ? "book" : "books"}.
                </p>
                <Link href="/add-book" className="btn btn-primary rounded-full">
                    <FiPlus aria-hidden="true" />
                    Add New Book
                </Link>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-base-300 bg-base-100">

                <table className="table">
                    <thead>
                        <tr className="text-base-content/70">
                            <th>Book</th>
                            <th className="hidden sm:table-cell">Category</th>
                            <th className="hidden md:table-cell">Available / Total</th>
                            <th className="hidden lg:table-cell">Added On</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id} className="hover:bg-base-200/50">
                                <td className="min-w-56">
                                    <div className="flex items-center gap-4">
                                        
                                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-base-300 bg-base-200">
                                            <BookCover
                                                src={book.image}
                                                alt={`Cover of ${book.title}`}
                                                className="size-full"
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <Link
                                                href={`/books/${book._id}`}
                                                className="line-clamp-2 font-semibold transition-colors hover:text-primary"
                                            >
                                                {book.title}
                                            </Link>
                                            <p className="truncate text-sm text-base-content/60">
                                                by {book.author}
                                            </p>
                                        </div>

                                    </div>
                                </td>

                                <td className="hidden sm:table-cell">
                                    <span className="badge badge-soft badge-primary">
                                        {book.category}
                                    </span>
                                </td>

                                <td className="hidden md:table-cell">
                                    {book.availableCopies} / {book.totalCopies}
                                </td>

                                <td className="hidden text-base-content/70 lg:table-cell">
                                    {formatDate(book.createdAt)}
                                </td>

                                <td>
                                    <div className="flex justify-end gap-2">

                                        <button
                                            type="button"
                                            onClick={() => setEditing(book)}
                                            aria-label={`Edit ${book.title}`}
                                            className="btn btn-outline btn-sm rounded-full"
                                        >
                                            <FiEdit2 aria-hidden="true" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setDeleting(book)}
                                            aria-label={`Delete ${book.title}`}
                                            className="btn btn-outline btn-error btn-sm rounded-full"
                                        >
                                            <FiTrash2 aria-hidden="true" />
                                            <span className="hidden sm:inline">Delete</span>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <EditBookModal
                book={editing}
                onClose={() => setEditing(null)}
                onSave={handleUpdate}
            />

            <DeleteConfirmModal
                book={deleting}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
            />
        </>
    );
}