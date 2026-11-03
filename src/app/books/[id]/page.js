import { Suspense } from "react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import BookDetails from "@/components/books/BookDetails";
import Container from "@/components/shared/Container";
import Spinner from "@/components/shared/Spinner";


export const metadata = { title: "Book Details" };

async function BookDetailsLoader({ params }) {
    const { id } = await params;

    return (
        <PrivateRoute>
            <BookDetails key={id} id={id} />
        </PrivateRoute>
    );
}


export default function BookDetailsPage({ params }) {
    return (
        <Container className="py-10 sm:py-14">

            <Suspense fallback={<Spinner fullPage label="Loading..." />}>
                <BookDetailsLoader params={params} />
            </Suspense>
            
        </Container>
    );
}