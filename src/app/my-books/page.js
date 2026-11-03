import PrivateRoute from "@/components/auth/PrivateRoute";
import Container from "@/components/shared/Container";
import PageHeader from "@/components/shared/PageHeader";
import MyBooksTable from "@/components/my-books/MyBooksTable";


export const metadata = { title: "My Books" };

export default function MyBooksPage() {

    return (
        <>
            <PageHeader
                title="My Books"
                subtitle="Manage the books you have added to the library."
            />

            <Container className="py-12 sm:py-16">

                <PrivateRoute>
                    <MyBooksTable />
                </PrivateRoute>

            </Container>
        </>
    );
    
}