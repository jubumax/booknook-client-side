import { Suspense } from "react";
import BooksBrowser from "@/components/books/BooksBrowser";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";
import Spinner from "@/components/shared/Spinner";

export const metadata = { title: "All Books" };

export default function AllBooksPage({ searchParams }) {
    return (
        <>
            <PageHeader
                title="All Books"
                subtitle="Browse every book on the shelf and borrow the one that catches your eye."
            />

            <Container className="py-12 sm:py-16">
                <Suspense fallback={<Spinner label="Loading books..." />}>
                    <BooksBrowser searchParams={searchParams} />
                </Suspense>
            </Container>
        </>
    );
}