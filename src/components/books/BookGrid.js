import { FiBookOpen } from "react-icons/fi";
import EmptyState from "@/components/shared/EmptyState";
import BookCard from "./BookCard";


export default function BookGrid({
    books,
    emptyTitle = "No books here yet",
    emptyText = "Check back soon, new books are added all the time.",
    emptyAction,
}) {
    if (!books?.length) {
        return (
            <EmptyState icon={FiBookOpen} title={emptyTitle} text={emptyText}>
                {emptyAction}
            </EmptyState>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    );
}