import { FiBookOpen } from "react-icons/fi";
import EmptyState from "@/components/shared/EmptyState";
import Reveal from "@/components/shared/Reveal";
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
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
            {books.map((book, index) => (
                <Reveal key={book._id} delay={(index % 3) * 0.08} className="h-full">
                    <BookCard book={book} />
                </Reveal>
            ))}
        </div>
    );
}