import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";
import BookGrid from "@/components/books/BookGrid";
import EmptyState from "@/components/shared/EmptyState";
import { CATEGORIES } from "@/lib/constants";
import { getBooks } from "@/services/books";

export default async function BooksBrowser({ searchParams }) {
    const { category: categoryParam } = await searchParams;
    const category = CATEGORIES.includes(categoryParam) ? categoryParam : null;

    let books = null;

    try {
        books = await getBooks();
    } catch {
        /* error state */
    }

    // Page won't crash if server gets off
    if (!books) {
        return (
            <EmptyState
                icon={FiAlertCircle}
                title="Could not load the books"
                text="Something went wrong while fetching the books. Please refresh the page in a moment."
            />
        );
    }

    const visibleBooks = category
        ? books.filter((book) => book.category === category)
        : books;

    const filters = [
        { label: "All", href: "/books", count: books.length, active: !category },
        ...CATEGORIES.map((name) => ({
            label: name,
            href: `/books?category=${encodeURIComponent(name)}`,
            count: books.filter((book) => book.category === name).length,
            active: category === name,
        })),
    ];


    return (
        <>
            <nav aria-label="Filter books by category">
                <ul className="flex flex-wrap gap-2">

                    {filters.map(({ label, href, count, active }) => (
                        <li key={label}>
                            <Link
                                href={href}
                                scroll={false}
                                aria-current={active ? "true" : undefined}
                                className={`btn btn-sm rounded-full ${active ? "btn-primary" : "btn-outline border-base-300"
                                    }`}
                            >

                                {label}
                                <span className="text-xs opacity-70">{count}</span>
                            </Link>
                        </li>
                    ))}

                </ul>
            </nav>

            <p className="mt-6 text-sm text-base-content/60">
                Showing {visibleBooks.length}{" "}
                {visibleBooks.length === 1 ? "book" : "books"}
                {category ? ` in ${category}` : ""}
            </p>

            <div className="mt-4">
                <BookGrid
                    books={visibleBooks}
                    emptyTitle={category ? `No ${category} books yet` : "The shelf is empty"}
                    emptyText={
                        category
                            ? "Nobody has added a book in this category yet."
                            : "No one has added a book yet. Be the first to share one."
                    }
                    emptyAction={
                        <Link
                            href={category ? "/books" : "/add-book"}
                            className="btn btn-primary rounded-full"
                        >
                            {category ? "View All Books" : "Add a Book"}
                        </Link>
                    }
                />
            </div>
        </>
    );
}