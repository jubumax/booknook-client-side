import PrivateRoute from "@/components/auth/PrivateRoute";
import AddBookForm from "@/components/books/AddBookForm";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";


export const metadata = { title: "Add Book" };

export default function AddBookPage() {
    return (
        <>
            <PageHeader
                title="Add a Book"
                subtitle="Share a book from your shelf and let other readers borrow it."
            />

            <Container className="py-12 sm:py-16">
                <div className="mx-auto max-w-3xl">

                    <PrivateRoute>
                        <AddBookForm />
                    </PrivateRoute>

                </div>
            </Container>
        </>
    );
}