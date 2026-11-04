import Link from "next/link";
import { Suspense } from "react";
import { FiAlertCircle } from "react-icons/fi";
import BookGrid from "@/components/books/BookGrid";
import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";
import SectionHeading from "@/components/shared/SectionHeading";
import Spinner from "@/components/shared/Spinner";
import { getBooks } from "@/services/books";
import Reveal from "../shared/Reveal";


async function LatestBooks() {
    let books = null;

    try {
        books = await getBooks({ limit: 6 });
    } catch {
        /* error state */
    }

    // Page won't crash if server gets off
    if (!books) {
        return (
            <EmptyState
                icon={FiAlertCircle}
                title="Could not load the books"
                text="Something went wrong while fetching the latest books. Please refresh the page in a moment."
            />
        );
    }

    return (
        <BookGrid
            books={books}
            emptyTitle="The shelf is empty"
            emptyText="No one has added a book yet. Be the first to share one."
            emptyAction={
                <Link href="/add-book" className="btn btn-primary rounded-full">
                    Add a Book
                </Link>
            }
        />
    );
}


export default function NewArrivals() {

    return (
        <section className="py-16 sm:py-20">
            <Container>

                <Reveal>
                    <SectionHeading
                        eyebrow="Fresh on the shelf"
                        title="New Arrivals"
                        subtitle="The latest books our readers have added to the library."
                    />
                </Reveal>

                <div className="mt-10">
                    <Suspense fallback={<Spinner label="Loading new arrivals..." />}>
                        <LatestBooks />
                    </Suspense>
                </div>

                <div className="mt-10 text-center">
                    <Reveal className="mt-10 text-center">
                        <Link
                            href="/books"
                            className="btn btn-primary btn-lg rounded-full px-8"
                        >
                            See All Books
                        </Link>
                    </Reveal>
                </div>
                
            </Container>
        </section>
    );
}