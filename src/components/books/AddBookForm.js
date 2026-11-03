"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { addBook } from "@/services/books";
import BookForm from "./BookForm";

export default function AddBookForm() {
    const router = useRouter();
    const { user } = useAuth();

    const handleAdd = async (values) => {
        try {
            await addBook(values);
            toast.success("Book added successfully!");
            router.push("/my-books");
        } catch (error) {
            toast.error(error.message || "Could not add the book. Please try again.");
        }
    };

    return (
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-10">
            <BookForm
                owner={{ name: user?.name ?? "", email: user?.email ?? "" }}
                submitLabel="Add Book"
                onSubmit={handleAdd}
            />
        </div>
    );
}